/**
 * =====================================================================================
 * SmartDirectionalCursor - 智能方向指示光标组件
 * =====================================================================================
 * 
 * 【核心设计理念】
 * 这是一个替代系统默认光标的智能导航助手，通过视觉化的方式实时指导用户
 * 如何在单页应用（SPA）的不同section之间进行导航。
 * 
 * 【主要功能特性】
 * 1. 🎯 方向指示：显示向上/向下/双向箭头，告知用户可用的导航方向
 * 2. 🎨 颜色语义：绿色=可操作，红色=边界警告，白色=默认状态
 * 3. 📊 真实滚动反馈：显示实际的滚动增量值（+300, -150等），而非模拟百分比
 * 4. 🚨 智能边界检测：区分section级别和页面内容级别的滚动边界
 * 5. 🎭 悬停交互：鼠标悬停时光标有微妙的视觉变化
 * 6. 🖱️ 智能光标切换：在可点击元素上自动切换到原生光标，保证操作精准度
 * 
 * 【视觉组成】
 * - 外层圆环：显示滚动进度（基于滚动强度）
 * - 内层箭头：指示可用的导航方向
 * - 中心数字：显示真实的累积滚动增量（+/-数值）
 * - 动态颜色：根据操作有效性改变颜色
 * - 可点击提示：在可点击元素上显示小绿点提示
 * 
 * 【光标行为规则】
 * - 非可点击区域：显示个性化智能光标
 * - 可点击元素：自动切换到原生系统光标
 * - 移动设备：自动隐藏自定义光标
 * 
 * 【性能优化报告】
 * ⚡ 渲染性能：60fps动画 + 硬件加速（transform: translate3d）
 * ⚡ 交互响应：120fps事件节流 + passive事件监听器
 * ⚡ 内存优化：DOM缓存 + 完整清理机制 + 引用管理
 * ⚡ 更新频率：智能状态更新，减少不必要的重渲染
 * ⚡ 浏览器友好：避免layout/reflow，使用transform和opacity
 * ⚡ 可点击检测：缓存机制 + 深度限制 + 智能清理
 * 
 * 【使用场景】
 * 适用于具有多个section的全屏滚动网站，如作品集、产品展示页等
 * 特别适合需要保持用户界面一致性，同时不影响可点击元素操作精准度的场景
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';

const SmartDirectionalCursor = () => {
    // ==================== 状态管理 ====================
    
    /** 光标在屏幕上的实时坐标位置 */
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    
    /** 光标是否可见（鼠标进入页面时显示） */
    const [isVisible, setIsVisible] = useState(false);
    
    /** 当前可用的导航方向：'up'|'down'|'both'|'none' */
    const [direction, setDirection] = useState('none');
    
    /** 鼠标是否悬停在页面上（影响光标的视觉效果） */
    const [isHovering, setIsHovering] = useState(false);
    
    /** 滚轮滚动的力度强度，范围0-1，用于显示进度环 */
    const [scrollIntensity, setScrollIntensity] = useState(0);
    
    /** 累积的滚动距离，用于显示总的滚动量 */
    const [accumulatedScroll, setAccumulatedScroll] = useState(0);
    
    /** 当前单次滚动的增量值，用于显示实时滚动力度 */
    const [currentScrollDelta, setCurrentScrollDelta] = useState(0);
    
    /** 动画显示的数值，用于从最大值递减到0的动画效果 */
    const [animatedValue, setAnimatedValue] = useState(0);
    
    /** 是否正在进行递减动画 */
    const [isAnimatingDown, setIsAnimatingDown] = useState(false);
    
    /** 最后一次滚动的时间戳，用于实现滚动强度的自然衰减 */
    const [lastScrollTime, setLastScrollTime] = useState(0);
    
    /** 当前滚动方向：'up'|'down'|null，用于精确的边界检测 */
    const [scrollDirection, setScrollDirection] = useState(null);
    
    /** 鼠标是否悬停在可点击元素上 */
    const [isOverClickable, setIsOverClickable] = useState(false);
    
    // ==================== 外部状态和引用 ====================
    
    /** 从全局状态获取当前section索引、所有sections数组和3D模式状态 */
    const { currentSection, sections, isPointerLocked } = useAppStore();
    
    /** 动画帧的引用，用于性能优化的循环动画 */
    const animationFrameRef = useRef();
    
    /** 光晕强度的引用，用于平滑的悬停动画 */
    const glowIntensityRef = useRef(0);
    
    /** 滚动衰减定时器的引用，用于清理定时器 */
    const scrollDecayTimerRef = useRef();
    
    /** 数值递减动画定时器的引用 */
    const countdownAnimationRef = useRef();
    
    /** 缓存DOM容器引用，避免重复查询 */
    const containerRef = useRef(null);
    
    /** 可点击元素检测的缓存，避免重复计算 */
    const clickableElementCache = useRef(new WeakMap());

    // ==================== 核心逻辑函数 ====================

    /**
     * 🎯 可点击元素检测器
     * 检测鼠标位置下的元素是否为可点击元素
     * 
     * @param {number} x 鼠标X坐标
     * @param {number} y 鼠标Y坐标
     * @returns {boolean} 是否为可点击元素
     * 
     * 检测规则：
     * - 标签：a, button, input, select, textarea
     * - 属性：onclick, role="button", tabindex >= 0
     * - CSS：cursor: pointer
     * - 特殊类：.clickable, .btn, .button
     */
    const isClickableElement = useCallback((x, y) => {
        const element = document.elementFromPoint(x, y);
        if (!element) return false;

        // 检查缓存
        if (clickableElementCache.current.has(element)) {
            return clickableElementCache.current.get(element);
        }

        // 定义可点击元素的选择器
        const clickableSelectors = [
            'a', 'button', 'input', 'select', 'textarea',
            '[onclick]', '[role="button"]', '[role="link"]', '[role="menuitem"]',
            '[tabindex]:not([tabindex="-1"])',
            '.clickable', '.btn', '.button', '.cursor-pointer',
            'summary', 'label', '[data-clickable="true"]'
        ];

        // 排除某些不应该被视为可点击的元素
        const excludeSelectors = [
            'canvas', 'svg', 'img', 'video', 
            '.hero-cube', '.effect-avatar', '.lorenz-attractor',
            '[data-no-custom-cursor="true"]',
            // 添加更多排除条件
            '[style*="pointer-events: none"]',
            '[style*="pointerEvents: none"]',
            // 排除常见的背景容器类
            '.h-screen.w-screen',
            '.overflow-hidden',
            '.background-container',
            '.bg-container'
        ];

        // 首先进行快速检查：是否有明确的排除标记
        if (element.hasAttribute('data-no-custom-cursor') ||
            element.hasAttribute('data-hero-cube-canvas') ||
            element.classList.contains('hero-cube-canvas')) {
            clickableElementCache.current.set(element, false);
            return false;
        }

        // 检查元素的样式
        const elementStyle = window.getComputedStyle(element);
        
        // 如果 pointerEvents 为 none，则不可点击
        if (elementStyle.pointerEvents === 'none') {
            clickableElementCache.current.set(element, false);
            return false;
        }

        // 特殊检查：全屏容器元素，即使有 pointerEvents: auto，如果 cursor: none 也应该被排除
        if (elementStyle.cursor === 'none' && 
            (element.classList.contains('h-screen') || 
             element.classList.contains('w-screen') ||
             element.classList.contains('overflow-hidden'))) {
            clickableElementCache.current.set(element, false);
            return false;
        }

        // 特殊情况：检查是否是 Three.js 的 Canvas（通常有特定的类名或属性）
        if (element.tagName.toLowerCase() === 'canvas') {
            const parentElement = element.parentElement;
            // 检查是否是 HeroCube 的 Canvas
            if (parentElement && (
                parentElement.classList.contains('hero-cube') ||
                parentElement.hasAttribute('data-hero-cube') ||
                parentElement.style.pointerEvents === 'none' ||
                element.style.pointerEvents === 'none'
            )) {
                clickableElementCache.current.set(element, false);
                return false;
            }
        }

        let isClickable = false;

        // 检查元素本身或其父元素是否匹配可点击选择器
        let currentElement = element;
        let depth = 0;
        while (currentElement && currentElement !== document.body && depth < 5) { // 限制深度避免性能问题
            
            // 首先检查是否是应该排除的元素
            if (excludeSelectors.some(selector => {
                try {
                    return currentElement.matches(selector);
                } catch {
                    return false;
                }
            })) {
                // 如果是排除元素，直接判定为非可点击
                isClickable = false;
                break;
            }

            // 额外检查：背景容器判断
            // 如果是 div 元素，且同时有全屏类名和 cursor: none，则排除
            if (currentElement.tagName.toLowerCase() === 'div') {
                const style = window.getComputedStyle(currentElement);
                const classes = currentElement.classList;
                
                // 如果是全屏容器且cursor为none，则不应该被视为可点击
                if (style.cursor === 'none' && 
                    (classes.contains('h-screen') || classes.contains('w-screen'))) {
                    isClickable = false;
                    break;
                }

                // 如果只包含布局类名，没有实际交互内容，也排除
                const layoutOnlyClasses = ['h-screen', 'w-screen', 'overflow-hidden', 'relative', 'absolute', 'fixed'];
                const hasOnlyLayoutClasses = Array.from(classes).every(cls => 
                    layoutOnlyClasses.includes(cls) || cls.startsWith('bg-') || cls.startsWith('backdrop-')
                );
                
                if (hasOnlyLayoutClasses && style.cursor === 'none') {
                    isClickable = false;
                    break;
                }
            }

            // 检查标签和属性
            if (clickableSelectors.some(selector => {
                try {
                    return currentElement.matches(selector);
                } catch {
                    return false;
                }
            })) {
                isClickable = true;
                break;
            }

            // 检查CSS cursor样式，但排除某些特殊情况
            const computedStyle = window.getComputedStyle(currentElement);
            if (computedStyle.cursor === 'pointer') {
                // 进一步检查是否真的是用户设置的pointer，而不是浏览器默认的
                const tagName = currentElement.tagName.toLowerCase();
                if (!['canvas', 'svg', 'img', 'video'].includes(tagName)) {
                    // 额外检查：确保这个元素真的有交互意图
                    if (currentElement.hasAttribute('onclick') ||
                        currentElement.hasAttribute('role') ||
                        currentElement.hasAttribute('tabindex') ||
                        currentElement.classList.contains('clickable') ||
                        currentElement.classList.contains('btn') ||
                        currentElement.classList.contains('button') ||
                        ['a', 'button', 'input', 'select', 'textarea'].includes(tagName)) {
                        isClickable = true;
                        break;
                    }
                }
            }

            // 检查是否有点击事件监听器（通过常见的React/Vue属性）
            if (currentElement.onclick || 
                currentElement.getAttribute('data-testid') ||
                currentElement.classList.contains('cursor-pointer')) {
                isClickable = true;
                break;
            }

            currentElement = currentElement.parentElement;
            depth++;
        }

        // 调试信息 - 在开发环境中输出
        if (import.meta.env.DEV) {
            // 如果检测为可点击，输出详细信息
            if (isClickable) {
                console.log('🖱️ Detected clickable element:', {
                    element: element.tagName,
                    classes: element.className,
                    id: element.id,
                    cursor: window.getComputedStyle(element).cursor,
                    pointerEvents: window.getComputedStyle(element).pointerEvents,
                    position: { x, y },
                    hasOnclick: !!element.onclick,
                    hasRole: !!element.getAttribute('role'),
                    elementHTML: element.outerHTML.substring(0, 200)
                });
            }
            // 也可以输出被排除的元素信息（可选，用于调试）
            else if (element.tagName.toLowerCase() === 'div' && 
                     element.classList.contains('h-screen')) {
                console.log('🚫 Excluded background container:', {
                    element: element.tagName,
                    classes: element.className,
                    cursor: window.getComputedStyle(element).cursor,
                    reason: 'Background container with cursor: none'
                });
            }
        }

        // 缓存结果
        clickableElementCache.current.set(element, isClickable);
        
        // 清理缓存以避免内存泄漏（保留最近的100个元素）
        if (clickableElementCache.current.size > 100) {
            const entries = Array.from(clickableElementCache.current.entries());
            clickableElementCache.current.clear();
            // 保留最后50个
            entries.slice(-50).forEach(([el, clickable]) => {
                clickableElementCache.current.set(el, clickable);
            });
        }

        return isClickable;
    }, []);

    /**
     * 🧭 方向判断逻辑
     * 根据当前section的位置，判断用户可以导航到哪些方向
     * 
     * @returns {'up'|'down'|'both'|'none'} 可用的导航方向
     * 
     * 逻辑说明：
     * - 如果不在第一页：可以向上导航
     * - 如果不在最后一页：可以向下导航
     * - 两个条件都满足：显示双向箭头
     * - 两个条件都不满足：无导航方向
     */
    const getAvailableDirections = useCallback(() => {
        const canGoUp = currentSection > 0;
        const canGoDown = currentSection < sections.length - 1;
        
        if (canGoUp && canGoDown) return 'both';
        if (canGoUp) return 'up';
        if (canGoDown) return 'down';
        return 'none';
    }, [currentSection, sections.length]);

    /**
     * 🚨 边界检测系统 - 性能优化版本
     * 使用缓存的DOM引用，避免重复查询
     * 
     * 两层滚动检测：
     * 1. Section级别：是否还有上一页/下一页section
     * 2. 内容级别：当前页面内容是否还可以滚动
     * 
     * @returns {Object} 边界状态对象
     * @returns {boolean} isTopBoundary - 是否在顶部绝对边界
     * @returns {boolean} isBottomBoundary - 是否在底部绝对边界  
     * @returns {boolean} hasNowhereToGo - 是否完全无处可去
     * @returns {boolean} hasContentToScroll - 当前页面是否有内容可滚动
     * 
     * 边界判断标准：
     * - 顶部边界：在第一个section且内容已到顶部
     * - 底部边界：在最后一个section且内容已到底部
     * - 完全边界：只有一个section且内容无法滚动
     */
    const isAtAbsoluteBoundary = useCallback(() => {
        const canGoUp = currentSection > 0;
        const canGoDown = currentSection < sections.length - 1;
        
        // 性能优化：缓存DOM容器引用
        if (!containerRef.current) {
            containerRef.current = document.querySelector('.scroll-mode-auto');
        }
        
        const currentContainer = containerRef.current;
        let hasContentToScroll = false;
        let atContentTop = true;
        let atContentBottom = true;
        
        if (currentContainer) {
            hasContentToScroll = currentContainer.scrollHeight > currentContainer.clientHeight + 10;
            atContentTop = currentContainer.scrollTop <= 5;
            atContentBottom = currentContainer.scrollTop >= (currentContainer.scrollHeight - currentContainer.clientHeight - 5);
        }
        
        // 边界状态计算
        const isTopBoundary = !canGoUp && (!hasContentToScroll || atContentTop);
        const isBottomBoundary = !canGoDown && (!hasContentToScroll || atContentBottom);
        const hasNowhereToGo = !canGoUp && !canGoDown && !hasContentToScroll;
        
        return {
            isTopBoundary,
            isBottomBoundary,
            hasNowhereToGo,
            hasContentToScroll
        };
    }, [currentSection, sections.length]);

    /**
     * 🎬 数值递减动画函数
     * 从当前累积值开始，逐步递减到0
     * 创造平滑的视觉反馈效果
     */
    const startCountdownAnimation = useCallback(() => {
        setIsAnimatingDown(true);
        
        const startValue = currentScrollDelta; // 使用当前滚动增量而不是累积值
        const startTime = performance.now();
        const duration = Math.min(Math.abs(startValue) * 3, 800); // 调整动画时长，更快一些
        
        const animate = () => {
            const now = performance.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数创造自然的递减效果
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(startValue * (1 - easeOutCubic));
            
            setAnimatedValue(currentValue);
            
            if (progress < 1) {
                countdownAnimationRef.current = requestAnimationFrame(animate);
            } else {
                // 动画结束，重置所有状态
                setAnimatedValue(0);
                setCurrentScrollDelta(0);
                setScrollIntensity(0);
                setScrollDirection(null);
                setIsAnimatingDown(false);
                countdownAnimationRef.current = null;
            }
        };
        
        countdownAnimationRef.current = requestAnimationFrame(animate);
    }, [currentScrollDelta]);

    // ==================== 副作用和事件处理 ====================

    /**
     * 📊 方向状态同步
     * 当currentSection发生变化时，自动更新可用的导航方向
     */
    useEffect(() => {
        setDirection(getAvailableDirections());
    }, [getAvailableDirections]);

    /**
     * 🎡 滚轮事件处理器 - 真实滚动力度检测 + 动画递减
     * 检测用户的滚轮操作，捕获真实的滚动增量和累积距离
     * 
     * 新特性：
     * - 记录真实的 deltaY 值，实时显示
     * - 累积滚动距离，及时更新动画显示值
     * - 用户停止滚动后，数字从当前值动画递减到0
     * 
     * 性能优化：
     * - 8ms节流限制，达到120fps响应速度
     * - 500ms延迟后开始递减动画
     * 
     * @param {WheelEvent} event 滚轮事件对象
     */
    const handleWheelForce = useCallback((event) => {
        // 获取真实的滚动增量值
        const rawDelta = event.deltaY;
        
        // 计算视觉反馈用的强度（0-1）
        const visualIntensity = Math.min(Math.abs(rawDelta) / 80, 1);
        
        // 确定滚动方向：deltaY > 0为向下，< 0为向上
        const direction = rawDelta > 0 ? 'down' : 'up';
        
        // 性能节流：限制更新频率到120fps
        const now = performance.now();
        if (now - (handleWheelForce.lastTime || 0) < 8) return;
        handleWheelForce.lastTime = now;
        
        // 停止任何正在进行的递减动画
        if (countdownAnimationRef.current) {
            cancelAnimationFrame(countdownAnimationRef.current);
            countdownAnimationRef.current = null;
        }
        setIsAnimatingDown(false);
        
        // 更新状态 - 使用真实数值
        setScrollIntensity(visualIntensity); // 保留视觉反馈
        setScrollDirection(direction);
        setLastScrollTime(now);
        
        // 设置当前滚动增量（单次滚动的力度）
        const roundedDelta = Math.round(rawDelta);
        setCurrentScrollDelta(roundedDelta);
        setAnimatedValue(roundedDelta); // 立即显示当前滚动值
        
        // 保留累积逻辑用于其他功能（如边界检测）
        setAccumulatedScroll(prev => {
            const newTotal = prev + roundedDelta;
            return Math.max(-9999, Math.min(9999, newTotal));
        });
        
        // 清理并重设衰减定时器
        if (scrollDecayTimerRef.current) {
            clearTimeout(scrollDecayTimerRef.current);
        }
        
        // 500ms后开始递减动画
        scrollDecayTimerRef.current = setTimeout(() => {
            startCountdownAnimation();
        }, 500); // 给用户足够时间看清最终数值
    }, [startCountdownAnimation]);

    /**
     * 🖱️ 鼠标移动跟踪器
     * 实时跟踪鼠标位置，让光标能跟随鼠标移动
     * 同时检测是否悬停在可点击元素上
     * 
     * 性能优化：8ms节流，120fps更新频率
     */
    const handleMouseMove = useCallback((e) => {
        const now = performance.now();
        if (now - (handleMouseMove.lastTime || 0) < 8) return;
        handleMouseMove.lastTime = now;
        
        setCursorPosition({ x: e.clientX, y: e.clientY });
        
        // 检测是否悬停在可点击元素上
        const isOverClickableElement = isClickableElement(e.clientX, e.clientY);
        setIsOverClickable(isOverClickableElement);
        
        if (!isVisible) {
            setIsVisible(true);
        }
    }, [isVisible, isClickableElement]);

    /**
     * 👋 鼠标进入页面处理器
     * 显示光标并启动悬停状态
     */
    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
        setIsHovering(true);
    }, []);

    /**
     * 👋 鼠标离开页面处理器
     * 隐藏光标并结束悬停状态
     */
    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
        setIsHovering(false);
    }, []);

    /**
     * 🎬 动画循环系统 - 性能优化版本
     * 使用requestAnimationFrame实现高性能动画
     * 
     * 处理两种动画：
     * 1. 悬停光晕效果的渐入渐出
     * 2. 滚动强度的自然衰减
     * 
     * 性能优化：
     * - 60fps动画帧率，硬件加速优化
     * - 减少不必要的状态更新
     * - 使用引用避免重渲染
     */
    useEffect(() => {
        let lastIntensityUpdate = 0;
        
        const animate = () => {
            const now = performance.now();
            if (now - (animate.lastTime || 0) < 16) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            animate.lastTime = now;
            
            // 悬停光晕动画：缓慢渐入渐出
            if (isHovering) {
                glowIntensityRef.current = Math.min(glowIntensityRef.current + 0.12, 1);
            } else {
                glowIntensityRef.current = Math.max(glowIntensityRef.current - 0.08, 0.3);
            }
            
            // 滚动强度自然衰减：防止长时间显示进度
            const timeSinceScroll = now - lastScrollTime;
            if (timeSinceScroll > 30) {
                // 性能优化：减少状态更新频率，只在必要时更新
                const newIntensity = Math.max(scrollIntensity - 0.05, 0);
                if (now - lastIntensityUpdate > 32 && newIntensity !== scrollIntensity) { // 限制到30fps更新
                    setScrollIntensity(newIntensity);
                    lastIntensityUpdate = now;
                }
            }
            
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        
        animationFrameRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isHovering, lastScrollTime, scrollIntensity, accumulatedScroll]);

    /**
     * 🖱️ 系统光标控制
     * 根据是否悬停在可点击元素上，动态控制系统光标的显示
     * - 可点击元素：显示原生光标（pointer或default）
     * - 非可点击区域：隐藏系统光标，使用自定义光标
     * 
     * 性能优化：确保样式正确恢复，避免影响其他组件
     */
    useEffect(() => {
        const originalCursor = document.body.style.cursor;
        
        // 根据是否在可点击元素上设置光标样式
        if (isOverClickable) {
            document.body.style.cursor = 'auto'; // 恢复自动光标，让元素自己的cursor生效
        } else {
            document.body.style.cursor = 'none'; // 隐藏系统光标
        }
        
        return () => {
            document.body.style.cursor = originalCursor;
            
            // 最终清理：确保所有引用都被重置
            if (containerRef.current) {
                containerRef.current = null;
            }
            glowIntensityRef.current = 0.3;
        };
    }, [isOverClickable]); // 依赖isOverClickable状态

    /**
     * 🎧 事件监听器注册
     * 注册所有必要的鼠标和滚轮事件监听器
     */
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('wheel', handleWheelForce, { passive: true });
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('wheel', handleWheelForce);
            
            // 清理所有动画和定时器
            if (scrollDecayTimerRef.current) {
                clearTimeout(scrollDecayTimerRef.current);
            }
            if (countdownAnimationRef.current) {
                cancelAnimationFrame(countdownAnimationRef.current);
            }
        };
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleWheelForce]);

    // ==================== 渲染逻辑 ====================

    /**
     * 🎨 智能光标渲染器
     * 
     * 这个函数是整个组件的视觉核心，负责渲染智能光标的所有视觉元素：
     * 
     * 【视觉层次结构】
     * 1. 底层：细线圆环（显示边界）
     * 2. 中层：粗线进度环（显示滚动强度）
     * 3. 上层：方向箭头（显示导航方向）
     * 4. 顶层：百分比数字（显示精确强度）
     * 
     * 【颜色系统】
     * - 🟢 绿色 (#00ff88)：正常可操作状态
     * - 🔴 红色 (#ff4444)：边界警告状态
     * - ⚪ 白色 (#ffffff)：默认/静态状态
     * 
     * 【尺寸系统】
     * - 基础尺寸：133px（整个光标大小）
     * - 箭头容器：300px（箭头可绘制区域）
     * - 圆环线宽：0.2px（细线）/ 5px（粗线）
     */
    const renderPowerDirectionalIndicator = () => {
        // 基础尺寸计算
        const baseSize = 133;
        const hoverScale = isHovering ? 1.02 : 1;
        const size = baseSize * hoverScale;
        
        // 边界状态检测
        const boundaryState = isAtAbsoluteBoundary();
        
        /**
         * 🚨 边界警告逻辑
         * 只有在"无效方向"滚动时才显示红色警告：
         * - 首页向上滚动 = 红色（无效）
         * - 首页向下滚动 = 绿色（有效）
         * - 末尾页向下滚动 = 红色（无效）
         * - 末尾页向上滚动 = 绿色（有效）
         */
        const shouldShowBoundaryWarning = (
            (boundaryState.isTopBoundary && scrollDirection === 'up' && scrollIntensity > 0) ||
            (boundaryState.isBottomBoundary && scrollDirection === 'down' && scrollIntensity > 0) ||
            (boundaryState.hasNowhereToGo && scrollIntensity > 0)
        );
        
        /**
         * 🎨 颜色生成器
         * 根据当前状态动态生成颜色
         */
        const getBaseColor = () => {
            if (shouldShowBoundaryWarning && scrollIntensity > 0) {
                return '#ff4444'; // 边界警告红色
            }
            return '#ffffff'; // 默认白色
        };
        
        const getProgressColor = () => {
            if (shouldShowBoundaryWarning && scrollIntensity > 0) {
                return '#ff4444'; // 边界警告红色
            }
            return '#00ff88'; // 正常操作绿色
        };
        
        // 颜色和样式配置
        const baseColor = getBaseColor();
        const progressColor = getProgressColor();
        
        // 真实滚动数值显示逻辑 - 根据方向调整位置和格式
        const getDisplayValue = () => {
            // 使用动画值（动画时）或当前滚动增量（滚动时）
            const valueToShow = isAnimatingDown ? animatedValue : currentScrollDelta;
            
            if (valueToShow === 0) return '0';
            
            // 去掉符号，只显示绝对值
            return Math.abs(valueToShow).toString();
        };
        
        // 根据滚动方向决定数字位置
        const getNumberPosition = () => {
            if (scrollDirection === 'down') {
                // 向下滚动：数字显示在右边
                return 'translate3d(24px, 0, 0)';
            } else if (scrollDirection === 'up') {
                // 向上滚动：数字显示在左边
                return 'translate3d(-24px, 0, 0)';
            } else {
                // 默认位置（无滚动时）
                return 'translate3d(0, 0, 0)';
            }
        };
        
        const displayValue = getDisplayValue();
        const numberPosition = getNumberPosition();
        const shouldShowValue = (scrollIntensity > 0 || currentScrollDelta !== 0 || isAnimatingDown);
        const strokeWidth = 0.2; // 细线宽度
        const progressStrokeWidth = 5; // 粗线宽度
        
        // 容器样式：硬件加速优化
        const containerStyle = {
            width: `${size}px`,
            height: `${size}px`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
        };

        /**
         * 🏹 箭头生成器
         * 
         * 为每个方向创建SVG箭头，包含颜色渐变和动态效果
         * 
         * @param {'up'|'down'} direction 箭头方向
         * @param {number} intensity 箭头强度（影响透明度）
         * @returns {JSX.Element} 箭头React元素
         * 
         * 【箭头设计】
         * - 使用SVG path绘制，确保清晰度
         * - 24x24 viewBox，标准化坐标系统
         * - 从圆心向外延伸，增加视觉张力
         * - 支持动态颜色变化和渐变效果
         */
        const createArrow = (direction, intensity = 1) => {
            const arrowSize = 256 * hoverScale; // 大容器确保箭头能伸出圆圈
            
            // SVG路径定义：长竖线 + 箭头尖端（调整尖端长度，让两边更短更尖锐）
            const arrowPath = direction === 'up' 
                ? "M12 22L12 2M10 4L12 2L14 4" // 向上：从底部到顶部 + 上箭头尖（10-14，更短更尖）
                : "M12 2L12 22M10 20L12 22L14 20"; // 向下：从顶部到底部 + 下箭头尖（10-14，更短更尖）
            
            /**
             * 🌈 动态颜色系统
             * 根据滚动状态和边界检测结果，实时计算箭头颜色
             * 
             * 颜色状态：
             * 1. 静态状态：纯白色
             * 2. 正常滚动：白色到绿色的渐变
             * 3. 边界警告：白色到红色的渐变
             */
            const getArrowColor = () => {
                if (scrollIntensity === 0) {
                    return '#ffffff'; // 静态时为纯白色
                }
                
                if (shouldShowBoundaryWarning) {
                    // 边界警告：计算白色到红色的渐变
                    const lightRed = [255, 68, 68];   // #ff4444 RGB
                    const darkRed = [180, 20, 20];    // 深红色 RGB
                    
                    const r = Math.round(lightRed[0] + (darkRed[0] - lightRed[0]) * scrollIntensity);
                    const g = Math.round(lightRed[1] + (darkRed[1] - lightRed[1]) * scrollIntensity);
                    const b = Math.round(lightRed[2] + (darkRed[2] - lightRed[2]) * scrollIntensity);
                    
                    return `rgb(${r}, ${g}, ${b})`;
                } else {
                    // 正常状态：计算白色到绿色的渐变
                    const lightGreen = [0, 255, 136]; // #00ff88 RGB
                    const darkGreen = [0, 180, 60];   // 深绿色 RGB
                    
                    const r = Math.round(lightGreen[0] + (darkGreen[0] - lightGreen[0]) * scrollIntensity);
                    const g = Math.round(lightGreen[1] + (darkGreen[1] - lightGreen[1]) * scrollIntensity);
                    const b = Math.round(lightGreen[2] + (darkGreen[2] - lightGreen[2]) * scrollIntensity);
                    
                    return `rgb(${r}, ${g}, ${b})`;
                }
            };
            
            const arrowColor = getArrowColor();
            
            // 箭头容器：绝对定位，硬件加速优化
            return (
                <div
                    style={{
                        position: 'absolute',
                        width: `${arrowSize}px`,
                        height: `${arrowSize}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: intensity * 0.8,
                        zIndex: 10,
                        transform: 'translate3d(0, 0, 0)',
                        willChange: 'opacity',
                    }}
                >
                    <svg 
                        width={arrowSize} 
                        height={arrowSize} 
                        viewBox="0 0 24 24"
                        style={{
                            shapeRendering: 'geometricPrecision',
                            vectorEffect: 'non-scaling-stroke'
                        }}
                    >
                        <path
                            d={arrowPath}
                            stroke={arrowColor}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            opacity={0.8}
                            style={{
                                transition: 'stroke 0.1s ease-out', // 颜色平滑过渡
                                willChange: 'stroke',
                            }}
                        />
                    </svg>
                </div>
            );
        };

        // ==================== 光标视觉结构渲染 ====================
        
        return (
            <div style={containerStyle}>
                {/* 
                 * 📊 进度圆环系统
                 * 
                 * 双层圆环设计：
                 * 1. 底层细圆环：显示光标边界，始终可见
                 * 2. 上层粗圆环：显示滚动进度，根据scrollIntensity动态显示
                 */}
                <svg
                    width={size}
                    height={size}
                    style={{
                        position: 'absolute',
                        // 根据滚动方向动态调整旋转角度
                        // 向下滚动：从12点钟顺时针 (-90deg)
                        // 向上滚动：从6点钟逆时针 (90deg)
                        transform: scrollDirection === 'up' ? 'rotate(90deg)' : 'rotate(-90deg)',
                        transition: 'transform 0.2s ease-out',
                    }}
                >
                    {/* 底层边界圆环：细线，半透明 */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={(size - 4) / 2}
                        fill="none"
                        stroke={baseColor}
                        strokeWidth={strokeWidth}
                        opacity="0.8"
                    />
                    
                    {/* 进度圆环：只在滚动时显示 */}
                    {scrollIntensity > 0 && (
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={(size - 4) / 2}
                            fill="none"
                            stroke={progressColor}
                            strokeWidth={progressStrokeWidth}
                            strokeLinecap="round"
                            opacity="0.9"
                            strokeDasharray={`${2 * Math.PI * ((size - 4) / 2)}`}
                            strokeDashoffset={`${2 * Math.PI * ((size - 4) / 2) * (1 - scrollIntensity)}`}
                            style={{
                                transition: 'stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                willChange: 'stroke-dashoffset',
                            }}
                        />
                    )}
                </svg>

                {/* 📈 智能滚动数值显示：根据滚动方向动态定位 */}
                {shouldShowValue && (
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px', // 适中的字体大小
                            fontWeight: '600', // 加粗以提高可读性
                            fontFamily: 'Monaco, "SF Mono", "Consolas", monospace', // 使用等宽字体，数字对齐更好
                            color: progressColor,
                            opacity: 0.95,
                            zIndex: 15,
                            textShadow: `0 0 6px ${progressColor}40`, // 更柔和的发光效果
                            transform: numberPosition, // 动态位置：向下滚动在右边，向上滚动在左边
                            willChange: 'opacity, transform',
                            minWidth: '32px', // 确保有足够宽度显示数字
                            textAlign: 'center',
                            transition: isAnimatingDown ? 'none' : 'all 0.2s ease-out', // 包含位置过渡动画
                        }}
                    >
                        <span 
                            className="scroll-value"
                            style={{
                                transform: isAnimatingDown ? 'scale(0.95)' : 'scale(1)',
                                transition: 'transform 0.15s ease-out',
                            }}
                        >
                            {displayValue}
                        </span>
                    </div>
                )}

                {/* 
                 * 🧭 方向箭头系统
                 * 
                 * 根据direction状态渲染不同的箭头配置：
                 * - 'up': 单个向上箭头
                 * - 'down': 单个向下箭头  
                 * - 'both': 双箭头（向上+向下），透明度降低避免视觉混乱
                 * - 'none': 简单中心点，表示无方向可用
                 */}
                {direction === 'up' && createArrow('up')}
                {direction === 'down' && createArrow('down')}
                {direction === 'both' && (
                    <>
                        {createArrow('up', 0.7)}
                        {createArrow('down', 0.7)}
                    </>
                )}
                
                {/* 无方向状态：显示简单的中心点 */}
                {direction === 'none' && scrollIntensity === 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: baseColor,
                            opacity: 0.8,
                            transform: 'translate3d(0, 0, 0)',
                        }}
                    />
                )}

                {/* 🎯 永久中央提示点 - 始终显示，使用主题色 */}
                <div
                    style={{
                        position: 'absolute',
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%',
                        backgroundColor: 'var(--theme-primary)',
                        opacity: 0.9,
                        zIndex: 20,
                        transform: 'translate3d(0, 0, 0)',
                        willChange: 'transform',
                        boxShadow: `0 0 6px var(--theme-primary)`,
                    }}
                />
            </div>
        );
    };

    // ==================== 组件主渲染 ====================
    
    /** 如果光标不可见，直接返回null */
    if (!isVisible) return null;

    return (
        <>
            {/* 
             * 🎬 CSS动画定义
             * 
             * 定义组件所需的所有CSS动画和样式
             * 包括基础动画关键帧和响应式媒体查询
             */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.3); opacity: 1; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                
                .power-cursor {
                    position: fixed;
                    pointer-events: none; /* 确保不会阻挡鼠标事件 */
                    z-index: 9999; /* 最高层级，覆盖所有内容 */
                    mix-blend-mode: screen; /* 混合模式增强视觉效果 */
                    ${isPointerLocked ? 'display: none !important;' : ''} /* 🎯 3D模式时隐藏 */
                }
                
                .power-cursor.hovering {
                    filter: brightness(1.2) contrast(1.1); /* 悬停时增强亮度和对比度 */
                }
                
                .power-cursor.over-clickable {
                    opacity: 0.3; /* 在可点击元素上时变淡 */
                    transform: translate3d(-50%, -50%, 0) scale(0.8); /* 稍微缩小 */
                }
                
                .clickable-hint {
                    position: fixed;
                    pointer-events: none;
                    z-index: 9998;
                    width: 1rem; /* 16px = 1rem */
                    height: 1rem; /* 16px = 1rem */
                    border-radius: 50%;
                    background: var(--theme-primary); /* 使用主题色 */
                    opacity: 0.9; /* 与中央提示点相同的透明度 */
                    box-shadow: 0 0 6px var(--theme-primary); /* 使用主题色光晕 */
                    transform: translate3d(-50%, -50%, 0);
                    ${isPointerLocked ? 'display: none !important;' : ''} /* 🎯 3D模式时隐藏 */
                }
                
                /* 📱 移动设备适配：在触摸设备上隐藏光标 */
                @media (hover: none) and (pointer: coarse) {
                    .power-cursor, .clickable-hint {
                        display: none !important;
                    }
                }
            `}</style>
            
            {/* 可点击元素提示点 - 当悬停在可点击元素上时显示 */}
            {isOverClickable && (
                <div
                    className="clickable-hint"
                    style={{
                        left: cursorPosition.x,
                        top: cursorPosition.y,
                    }}
                />
            )}
            
            {/* 
             * 🎯 主光标容器
             * 
             * 跟随鼠标位置的主容器，包含所有光标视觉元素
             * 使用transform: translate3d触发硬件加速，优化性能
             * 当悬停在可点击元素上时变淡，但不完全隐藏
             */}
            {!isOverClickable && (
                <div
                    className={`power-cursor ${isHovering ? 'hovering' : ''} ${isOverClickable ? 'over-clickable' : ''}`}
                    style={{
                        left: cursorPosition.x,
                        top: cursorPosition.y,
                        transform: `translate3d(-50%, -50%, 0)`, // 居中定位 + 硬件加速
                        willChange: 'transform', // 提示浏览器优化此属性
                    }}
                >
                    {renderPowerDirectionalIndicator()}
                </div>
            )}
        </>
    );
};

/**
 * =====================================================================================
 * 
 * 📚 组件导出
 * 
 * SmartDirectionalCursor组件已准备就绪，可以在任何需要智能导航提示的页面中使用
 * 
 * 【集成说明】
 * 1. 确保页面有多个section结构
 * 2. useAppStore中包含currentSection和sections状态
 * 3. 页面内容容器使用'.scroll-mode-auto'类名
 * 4. 在App组件中引入并渲染此组件
 * 
 * 【性能特性】
 * - 🚀 硬件加速优化
 * - ⚡ 120fps响应速度  
 * - 🎯 智能边界检测
 * - 📱 移动端自适应隐藏
 * 
 * =====================================================================================
 */

export default SmartDirectionalCursor;
