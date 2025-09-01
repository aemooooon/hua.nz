/**
 * =====================================================================================
 * SmartDirectionalCursor - 智能方向指示光标组件
 * =====================================================================================
 *
 * 【功能概述】
 * 一个替代系统默认光标的智能导航助手，为单页应用提供可视化的滚动引导。
 * 通过动态箭头、进度环和实时数值显示，帮助用户理解当前位置和可用操作。
 *
 * 【核心特性】
 * 🎯 智能方向指示 - 显示可用的导航方向（上/下/双向）
 * 📊 实时滚动反馈 - 显示真实的滚动力度数值
 * 🎨 动态视觉反馈 - 基于滚动强度的进度环和颜色变化
 * 🚨 边界智能检测 - 区分页面边界和内容边界
 * 🖱️ 智能交互适配 - 在可点击元素上自动切换原生光标
 * ⚡ 超敏感响应 - 优化的滚动力度检测算法
 *
 * 【视觉组成】
 * • 外层细环：光标边界指示，始终可见
 * • 内层粗环：滚动强度进度，动态显示
 * • 方向箭头：导航方向指示，支持单向/双向
 * • 数值显示：实时滚动力度，根据方向定位
 * • 中心提示点：永久定位参考
 * • 可点击提示：小绿点提示交互元素
 *
 * 【行为规则】
 * • 普通区域：显示完整智能光标
 * • 可点击元素：光标变淡 + 显示提示点 + 恢复原生光标
 * • 移动设备：自动隐藏（触摸优先）
 * • 3D模式：完全隐藏（指针锁定时）
 *
 * 【性能优化】
 * • 240fps 滚动响应（4ms节流）
 * • 硬件加速渲染（transform3d）
 * • 智能缓存机制（DOM查询、可点击检测）
 * • 内存自动清理（引用管理、定时器清理）
 * • 动画帧优化（requestAnimationFrame）
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useTheme } from '../../hooks/useTheme';

// 性能优化：将选择器定义移到组件外部，避免重复创建
const CLICKABLE_SELECTORS = [
    'a',
    'button',
    'input',
    'select',
    'textarea',
    '[onclick]',
    '[role="button"]',
    '[role="link"]',
    '[role="menuitem"]',
    '[tabindex]:not([tabindex="-1"])',
    '.clickable',
    '.btn',
    '.button',
    '.cursor-pointer',
    'summary',
    'label',
    '[data-clickable="true"]',
];

const EXCLUDE_SELECTORS = [
    'canvas',
    'svg',
    'img',
    'video',
    '.hero-cube',
    '.effect-avatar',
    '.lorenz-attractor',
    '[data-no-custom-cursor="true"]',
    '[style*="pointer-events: none"]',
    '[style*="pointerEvents: none"]',
    '.h-screen.w-screen',
    '.overflow-hidden',
    '.background-container',
    '.bg-container',
];

const SmartDirectionalCursor = () => {
    // ==================== 主题系统 ====================

    /** 获取当前主题色配置 */
    const { getThemeColors } = useTheme();
    const themeColors = getThemeColors();

    // ==================== 应用状态 ====================

    /** 获取当前section和语言 */
    const { currentSection, language } = useAppStore();

    /** 检查是否在首页 */
    const isHomePage = currentSection === 0;

    /** 获取提示文本 */
    const getHintText = () => {
        if (language === 'zh') {
            return '向下滚动探索更多...';
        } else {
            return 'Scroll down to explore...';
        }
    };

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

    /** 从全局状态获取当前section索引、所有sections数组、3D模式状态、语言和内容 */
    const { sections, isPointerLocked } = useAppStore();

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

    /** 位置缓存，避免对相近位置重复检测 */
    const positionCache = useRef({ x: -1, y: -1, result: false, timestamp: 0 });

    /** 存储最新状态值的refs，避免闭包问题 */
    const stateRefs = useRef({
        currentScrollDelta: 0,
        animatedValue: 0,
        isAnimatingDown: false,
        scrollIntensity: 0,
    });

    // 同步状态到refs
    useEffect(() => {
        stateRefs.current = {
            currentScrollDelta,
            animatedValue,
            isAnimatingDown,
            scrollIntensity,
        };
    }, [currentScrollDelta, animatedValue, isAnimatingDown, scrollIntensity]);

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
        // 性能优化：检查位置缓存，如果位置变化很小则使用缓存结果
        const cache = positionCache.current;
        const now = performance.now();
        const distance = Math.sqrt(Math.pow(x - cache.x, 2) + Math.pow(y - cache.y, 2));

        // 如果距离小于10px且缓存时间在50ms内，使用缓存结果
        if (distance < 10 && now - cache.timestamp < 50) {
            return cache.result;
        }

        const element = document.elementFromPoint(x, y);
        if (!element) {
            // 更新缓存
            positionCache.current = { x, y, result: false, timestamp: now };
            return false;
        }

        // 检查元素缓存
        if (clickableElementCache.current.has(element)) {
            const result = clickableElementCache.current.get(element);
            // 更新位置缓存
            positionCache.current = { x, y, result, timestamp: now };
            return result;
        }

        // 定义可点击元素的选择器（使用预定义常量优化性能）
        const clickableSelectors = CLICKABLE_SELECTORS;

        // 排除某些不应该被视为可点击的元素（使用预定义常量优化性能）
        const excludeSelectors = EXCLUDE_SELECTORS;

        // 首先进行快速检查：是否有明确的排除标记
        if (
            element.hasAttribute('data-no-custom-cursor') ||
            element.hasAttribute('data-hero-cube-canvas') ||
            element.classList.contains('hero-cube-canvas')
        ) {
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
        if (
            elementStyle.cursor === 'none' &&
            (element.classList.contains('h-screen') ||
                element.classList.contains('w-screen') ||
                element.classList.contains('overflow-hidden'))
        ) {
            clickableElementCache.current.set(element, false);
            return false;
        }

        // 特殊情况：检查是否是 Three.js 的 Canvas（通常有特定的类名或属性）
        if (element.tagName.toLowerCase() === 'canvas') {
            const parentElement = element.parentElement;
            // 检查是否是 HeroCube 的 Canvas
            if (
                parentElement &&
                (parentElement.classList.contains('hero-cube') ||
                    parentElement.hasAttribute('data-hero-cube') ||
                    parentElement.style.pointerEvents === 'none' ||
                    element.style.pointerEvents === 'none')
            ) {
                clickableElementCache.current.set(element, false);
                return false;
            }
        }

        let isClickable = false;

        // 检查元素本身或其父元素是否匹配可点击选择器
        let currentElement = element;
        let depth = 0;
        while (currentElement && currentElement !== document.body && depth < 5) {
            // 限制深度避免性能问题

            // 首先检查是否是应该排除的元素
            if (
                excludeSelectors.some(selector => {
                    try {
                        return currentElement.matches(selector);
                    } catch {
                        return false;
                    }
                })
            ) {
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
                if (
                    style.cursor === 'none' &&
                    (classes.contains('h-screen') || classes.contains('w-screen'))
                ) {
                    isClickable = false;
                    break;
                }

                // 如果只包含布局类名，没有实际交互内容，也排除
                const layoutOnlyClasses = [
                    'h-screen',
                    'w-screen',
                    'overflow-hidden',
                    'relative',
                    'absolute',
                    'fixed',
                ];
                const hasOnlyLayoutClasses = Array.from(classes).every(
                    cls =>
                        layoutOnlyClasses.includes(cls) ||
                        cls.startsWith('bg-') ||
                        cls.startsWith('backdrop-')
                );

                if (hasOnlyLayoutClasses && style.cursor === 'none') {
                    isClickable = false;
                    break;
                }
            }

            // 检查标签和属性
            if (
                clickableSelectors.some(selector => {
                    try {
                        return currentElement.matches(selector);
                    } catch {
                        return false;
                    }
                })
            ) {
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
                    if (
                        currentElement.hasAttribute('onclick') ||
                        currentElement.hasAttribute('role') ||
                        currentElement.hasAttribute('tabindex') ||
                        currentElement.classList.contains('clickable') ||
                        currentElement.classList.contains('btn') ||
                        currentElement.classList.contains('button') ||
                        ['a', 'button', 'input', 'select', 'textarea'].includes(tagName)
                    ) {
                        isClickable = true;
                        break;
                    }
                }
            }

            // 检查是否有点击事件监听器（通过常见的React/Vue属性）
            if (
                currentElement.onclick ||
                currentElement.getAttribute('data-testid') ||
                currentElement.classList.contains('cursor-pointer')
            ) {
                isClickable = true;
                break;
            }

            currentElement = currentElement.parentElement;
            depth++;
        }

        // 调试信息 - 仅在开发环境输出可点击元素检测结果
        if (import.meta.env.DEV && isClickable) {
            console.log('🖱️ Clickable element detected:', element.tagName, element.className);
        }

        // 缓存结果
        clickableElementCache.current.set(element, isClickable);

        // 更新位置缓存
        positionCache.current = { x, y, result: isClickable, timestamp: performance.now() };

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
            atContentBottom =
                currentContainer.scrollTop >=
                currentContainer.scrollHeight - currentContainer.clientHeight - 5;
        }

        // 边界状态计算
        const isTopBoundary = !canGoUp && (!hasContentToScroll || atContentTop);
        const isBottomBoundary = !canGoDown && (!hasContentToScroll || atContentBottom);
        const hasNowhereToGo = !canGoUp && !canGoDown && !hasContentToScroll;

        return {
            isTopBoundary,
            isBottomBoundary,
            hasNowhereToGo,
            hasContentToScroll,
        };
    }, [currentSection, sections.length]);

    /**
     * 🎬 数值递减动画函数
     * 从当前累积值开始，逐步递减到0
     * 创造平滑的视觉反馈效果
     *
     * 注意：当前使用立即清零模式，此函数暂时不使用
     * 保留此函数以备将来可能的平滑动画需求
     */
    // eslint-disable-next-line no-unused-vars
    const startCountdownAnimation = useCallback(() => {
        // 如果已经在动画中，先停止
        if (countdownAnimationRef.current) {
            cancelAnimationFrame(countdownAnimationRef.current);
            countdownAnimationRef.current = null;
        }

        setIsAnimatingDown(true);

        const startValue = Math.abs(currentScrollDelta);
        if (startValue === 0) {
            setIsAnimatingDown(false);
            setAnimatedValue(0);
            setCurrentScrollDelta(0);
            setScrollIntensity(0);
            return;
        }

        const startTime = performance.now();
        const duration = Math.min(startValue * 2, 600); // 根据数值大小调整动画时长

        const animate = () => {
            const now = performance.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 使用更平滑的缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(startValue * (1 - easeOutQuart));

            setAnimatedValue(currentValue);

            if (progress < 1) {
                countdownAnimationRef.current = requestAnimationFrame(animate);
            } else {
                // 动画完成，重置所有状态
                setAnimatedValue(0);
                setCurrentScrollDelta(0);
                setIsAnimatingDown(false);

                setTimeout(() => {
                    setScrollIntensity(0);
                    setScrollDirection(null);
                    setTimeout(() => {
                        setAnimatedValue(0);
                        setCurrentScrollDelta(0);
                    }, 100);
                }, 50);

                countdownAnimationRef.current = null;
            }
        };

        countdownAnimationRef.current = requestAnimationFrame(animate);
    }, [currentScrollDelta]); // 只需要currentScrollDelta作为依赖

    // ==================== 副作用和事件处理 ====================

    /**
     * 📊 方向状态同步
     * 当currentSection发生变化时，自动更新可用的导航方向
     */
    useEffect(() => {
        setDirection(getAvailableDirections());
    }, [getAvailableDirections]);

    /**
     * 🎡 滚轮事件处理器
     *
     * 处理滚轮操作，提供超敏感的滚动力度检测和即时视觉反馈。
     * 采用智能敏感度算法，确保轻微滚动也能产生明显的视觉响应。
     *
     * 敏感度算法：
     * • 基础阈值：30单位达到最大强度（原80单位）
     * • 轻微滚动（<10）：2倍敏感度放大
     * • 中等滚动（10-30）：1.5倍敏感度放大
     * • 强力滚动（>100）：0.8倍适度限制
     *
     * 响应特性：
     * • 4ms节流，240fps响应频率
     * • 100ms延迟后数值消失
     * • 实时方向检测和数值显示
     */
    const handleWheelForce = useCallback(event => {
        // 获取真实的滚动增量值
        const rawDelta = event.deltaY;

        // 🚀 超敏感度计算 - 降低阈值，提高反应灵敏度
        // 原来需要80单位才达到最大强度，现在只需要30单位
        const baseSensitivity = Math.min(Math.abs(rawDelta) / 30, 1);

        // 🎯 智能力度放大 - 根据滚动速度动态调整
        const scrollSpeed = Math.abs(rawDelta);
        let sensitivityMultiplier = 1;

        if (scrollSpeed < 10) {
            // 轻微滚动：放大2倍敏感度，让细微滚动也有明显反馈
            sensitivityMultiplier = 2;
        } else if (scrollSpeed < 30) {
            // 中等滚动：放大1.5倍敏感度
            sensitivityMultiplier = 1.5;
        } else if (scrollSpeed > 100) {
            // 强力滚动：适当限制避免过度反应
            sensitivityMultiplier = 0.8;
        }

        // 计算最终视觉强度
        const visualIntensity = Math.min(baseSensitivity * sensitivityMultiplier, 1);

        // 确定滚动方向：deltaY > 0为向下，< 0为向上
        const direction = rawDelta > 0 ? 'down' : 'up';

        // 🏎️ 优化性能节流：限制更新频率到120fps（提升响应性和性能平衡）
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

        if (import.meta.env.DEV) {
            console.log('🔄 Scroll event:', {
                delta: roundedDelta,
                intensity: visualIntensity.toFixed(2),
                direction,
            });
        }

        // 保留累积逻辑用于其他功能（如边界检测）
        setAccumulatedScroll(prev => {
            const newTotal = prev + roundedDelta;
            return Math.max(-9999, Math.min(9999, newTotal));
        });

        // 清理并重设衰减定时器
        if (scrollDecayTimerRef.current) {
            clearTimeout(scrollDecayTimerRef.current);
            scrollDecayTimerRef.current = null;
        }

        // 🚀 立即消失模式：停止滚动100ms后清除数值显示
        scrollDecayTimerRef.current = setTimeout(() => {
            // 立即清零所有滚动相关数值
            setCurrentScrollDelta(0);
            setAnimatedValue(0);
            setScrollIntensity(0);
            setIsAnimatingDown(false);
            scrollDecayTimerRef.current = null;
        }, 100);
    }, []);

    /**
     * 🖱️ 鼠标移动跟踪器
     * 实时跟踪鼠标位置，让光标能跟随鼠标移动
     * 同时检测是否悬停在可点击元素上
     *
     * 性能优化：16ms节流，60fps更新频率
     */
    const handleMouseMove = useCallback(
        e => {
            const now = performance.now();
            if (now - (handleMouseMove.lastTime || 0) < 16) return;
            handleMouseMove.lastTime = now;

            const newPosition = { x: e.clientX, y: e.clientY };

            // 检测是否悬停在可点击元素上
            const isOverClickableElement = isClickableElement(e.clientX, e.clientY);

            // 批量更新状态以减少重新渲染
            setCursorPosition(newPosition);
            setIsOverClickable(isOverClickableElement);

            if (!isVisible) {
                setIsVisible(true);
            }
        },
        [isVisible, isClickableElement]
    );

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
            if (timeSinceScroll > 50) {
                // 增加检查间隔，减少计算频率
                // 性能优化：减少状态更新频率，只在必要时更新
                const newIntensity = Math.max(scrollIntensity - 0.03, 0); // 降低衰减率，减少更新频率
                if (now - lastIntensityUpdate > 50 && newIntensity !== scrollIntensity) {
                    // 进一步限制更新频率
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

    useEffect(() => {
        if (!isAnimatingDown && currentScrollDelta !== 0 && scrollIntensity === 0) {
            const cleanupTimeout = setTimeout(() => {
                setCurrentScrollDelta(0);
                setAnimatedValue(0);
                setScrollDirection(null);
            }, 1500);

            return () => clearTimeout(cleanupTimeout);
        }
    }, [isAnimatingDown, currentScrollDelta, scrollIntensity]);

    /**
     * 🎨 智能光标渲染器
     *
     * 组件的视觉核心，负责渲染完整的智能光标系统。
     *
     * 视觉层次：
     * 1. 底层：细线边界圆环（0.2px，半透明）
     * 2. 进度层：粗线强度圆环（5px，动态显示）
     * 3. 箭头层：方向指示箭头（SVG路径）
     * 4. 数值层：实时滚动数值（等宽字体）
     * 5. 提示层：中心定位点（永久显示）
     *
     * 颜色系统：
     * • 正常状态：使用主题色系（primary/accent/secondary）
     * • 警告状态：红色系（#ff4444），用于边界警告
     * • 动态渐变：根据滚动强度在色彩间插值
     *
     * 交互反馈：
     * • 数值定位：向下滚动显示在右侧，向上滚动显示在左侧
     * • 进度环：根据滚动方向旋转起始点
     * • 边界警告：无效方向滚动时显示红色
     */
    const renderPowerDirectionalIndicator = () => {
        // 基础尺寸计算
        const baseSize = 133;
        const hoverScale = isHovering ? 1.02 : 1;
        const size = baseSize * hoverScale;

        // 边界状态检测
        const boundaryState = isAtAbsoluteBoundary();

        /**
         * 边界警告逻辑
         * 仅在无效方向滚动时显示红色警告：
         * • 首页向上滚动 → 红色警告
         * • 末页向下滚动 → 红色警告
         * • 单页无内容滚动 → 红色警告
         */
        const shouldShowBoundaryWarning =
            (boundaryState.isTopBoundary && scrollDirection === 'up' && scrollIntensity > 0) ||
            (boundaryState.isBottomBoundary && scrollDirection === 'down' && scrollIntensity > 0) ||
            (boundaryState.hasNowhereToGo && scrollIntensity > 0);

        /**
         * 颜色生成器 - 动态计算光标颜色
         */

        // 辅助函数：将hex颜色转换为RGB数组
        const hexToRgb = hex => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
                : [255, 255, 255]; // 默认返回白色
        };

        const getBaseColor = () => {
            if (shouldShowBoundaryWarning && scrollIntensity > 0) {
                return '#ff4444'; // 边界警告红色
            }
            return themeColors.primary; // 使用主题主色
        };

        const getProgressColor = () => {
            if (shouldShowBoundaryWarning && scrollIntensity > 0) {
                return '#ff4444'; // 边界警告红色
            }
            return themeColors.accent; // 使用主题辅助色
        };

        // 颜色和样式配置
        const baseColor = getBaseColor();
        const progressColor = getProgressColor();

        const getDisplayValue = () => {
            const valueToShow = isAnimatingDown ? animatedValue : currentScrollDelta;
            if (valueToShow === 0) return null;
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
        // 改进显示条件：仅在有实际滚动数值时显示
        const shouldShowValue =
            displayValue !== null &&
            (scrollIntensity > 0 ||
                Math.abs(currentScrollDelta) > 0 ||
                isAnimatingDown ||
                Math.abs(animatedValue) > 0);
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
         * 箭头生成器
         *
         * 创建SVG方向箭头，支持动态颜色和透明度。
         *
         * @param {string} direction - 箭头方向（'up'|'down'）
         * @param {number} intensity - 透明度强度（0-1）
         *
         * 特性：
         * • SVG路径绘制，确保清晰度
         * • 动态颜色渐变（主题色 ↔ 警告色）
         * • 硬件加速优化
         */
        const createArrow = (direction, intensity = 1) => {
            const arrowSize = 256 * hoverScale; // 大容器确保箭头能伸出圆圈

            // SVG路径定义：长竖线 + 箭头尖端（调整尖端长度，让两边更短更尖锐）
            const arrowPath =
                direction === 'up'
                    ? 'M12 22L12 2M10 4L12 2L14 4' // 向上：从底部到顶部 + 上箭头尖（10-14，更短更尖）
                    : 'M12 2L12 22M10 20L12 22L14 20'; // 向下：从顶部到底部 + 下箭头尖（10-14，更短更尖）

            /**
             * 动态颜色计算
             * 根据滚动状态和边界检测结果计算箭头颜色：
             * • 静态：主题主色
             * • 正常滚动：主题色渐变
             * • 边界警告：红色渐变
             */
            const getArrowColor = () => {
                if (scrollIntensity === 0) {
                    return themeColors.primary; // 静态时使用主题主色
                }

                if (shouldShowBoundaryWarning) {
                    // 边界警告：计算红色渐变
                    const lightRed = [255, 68, 68]; // #ff4444 RGB
                    const darkRed = [180, 20, 20]; // 深红色 RGB

                    const r = Math.round(
                        lightRed[0] + (darkRed[0] - lightRed[0]) * scrollIntensity
                    );
                    const g = Math.round(
                        lightRed[1] + (darkRed[1] - lightRed[1]) * scrollIntensity
                    );
                    const b = Math.round(
                        lightRed[2] + (darkRed[2] - lightRed[2]) * scrollIntensity
                    );

                    return `rgb(${r}, ${g}, ${b})`;
                } else {
                    // 正常状态：计算主题色渐变
                    const lightColor = hexToRgb(themeColors.accent); // 主题辅助色
                    const darkColor = hexToRgb(themeColors.secondary); // 主题次要色

                    const r = Math.round(
                        lightColor[0] + (darkColor[0] - lightColor[0]) * scrollIntensity
                    );
                    const g = Math.round(
                        lightColor[1] + (darkColor[1] - lightColor[1]) * scrollIntensity
                    );
                    const b = Math.round(
                        lightColor[2] + (darkColor[2] - lightColor[2]) * scrollIntensity
                    );

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
                            vectorEffect: 'non-scaling-stroke',
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

        // ==================== 光标视觉结构 ====================

        return (
            <div style={containerStyle}>
                {/* 进度圆环系统：双层设计，底层边界 + 上层进度 */}
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
                    {/* 底层：细线边界圆环 */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={(size - 4) / 2}
                        fill="none"
                        stroke={baseColor}
                        strokeWidth={strokeWidth}
                        opacity="0.8"
                    />

                    {/* 上层：滚动强度进度环 */}
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
                                transition:
                                    'stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                willChange: 'stroke-dashoffset',
                            }}
                        />
                    )}
                </svg>

                {/* 实时滚动数值：根据方向动态定位显示 */}
                {shouldShowValue && (
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: '600',
                            fontFamily: 'Monaco, "SF Mono", "Consolas", monospace',
                            color: progressColor,
                            opacity: 0.95,
                            zIndex: 15,
                            textShadow: `0 0 6px ${progressColor}40`,
                            transform: numberPosition,
                            willChange: 'opacity, transform',
                            minWidth: '32px',
                            textAlign: 'center',
                            transition: isAnimatingDown ? 'none' : 'all 0.2s ease-out',
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

                {/* 方向箭头系统：根据导航状态显示对应箭头 */}
                {direction === 'up' && createArrow('up')}
                {direction === 'down' && createArrow('down')}
                {direction === 'both' && (
                    <>
                        {createArrow('up', 0.7)}
                        {createArrow('down', 0.7)}
                    </>
                )}

                {/* 无方向状态：显示简单中心点 */}
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

                {/* 中央定位提示点：永久显示的定位参考 */}
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

    // ==================== 主渲染逻辑 ====================

    if (!isVisible) return null;

    return (
        <>
            {/*
             * CSS 样式定义
             * 包含所有必要的动画和响应式样式
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
                
                @keyframes gentle-pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                
                .power-cursor {
                    position: fixed;
                    pointer-events: none; /* 不阻挡鼠标事件 */
                    z-index: 9999; /* 最高层级 */
                    mix-blend-mode: screen; /* 视觉混合模式 */
                    ${isPointerLocked ? 'display: none !important;' : ''} /* 3D模式时隐藏 */
                }
                
                .power-cursor.hovering {
                    filter: brightness(1.2) contrast(1.1); /* 悬停时增强效果 */
                }
                
                .power-cursor.over-clickable {
                    opacity: 0.3; /* 在可点击元素上变淡 */
                    transform: translate3d(-50%, -50%, 0) scale(0.8); /* 缩小效果 */
                }
                
                .clickable-hint {
                    position: fixed;
                    pointer-events: none;
                    z-index: 9998;
                    width: 1rem; /* 16px */
                    height: 1rem; /* 16px */
                    border-radius: 50%;
                    background: var(--theme-primary); /* 主题色 */
                    opacity: 0.9; 
                    box-shadow: 0 0 6px var(--theme-primary); /* 主题色光晕 */
                    transform: translate3d(-50%, -50%, 0);
                    ${isPointerLocked ? 'display: none !important;' : ''} /* 3D模式时隐藏 */
                }
                
                /* 移动设备适配：在触摸设备上隐藏光标 */
                @media (hover: none) and (pointer: coarse) {
                    .power-cursor, .clickable-hint {
                        display: none !important;
                    }
                }
            `}</style>

            {/* 可点击元素提示点 */}
            {isOverClickable && (
                <div
                    className="clickable-hint"
                    style={{
                        left: cursorPosition.x,
                        top: cursorPosition.y,
                    }}
                />
            )}

            {/* 主光标容器：跟随鼠标的智能光标 */}
            <div
                className={`power-cursor ${isHovering ? 'hovering' : ''} ${isOverClickable ? 'over-clickable' : ''}`}
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: `translate3d(-50%, -50%, 0)`, // 居中定位 + 硬件加速
                    willChange: 'transform', // 性能优化提示
                }}
            >
                {renderPowerDirectionalIndicator()}
            </div>

            {/* 首页提示文本：仅在桌面端首页显示 */}
            {isHomePage && direction === 'down' && (
                <div
                    style={{
                        position: 'fixed',
                        left: cursorPosition.x, // 与光标水平对齐
                        top: cursorPosition.y - 120, // 在光标上方16px
                        transform: 'translate(-50%, -50%)', // 水平和垂直居中
                        color: themeColors.primary,
                        fontSize: '14px',
                        fontWeight: '500',
                        fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        opacity: 0.8,
                        pointerEvents: 'none',
                        zIndex: 9998,
                        textShadow: `0 0 8px ${themeColors.primary}40`,
                        animation: 'gentle-pulse 2s ease-in-out infinite',
                        whiteSpace: 'nowrap',
                        userSelect: 'none',
                    }}
                >
                    {getHintText()}
                </div>
            )}
        </>
    );
};

/**
 * =====================================================================================
 *
 * 组件导出
 *
 * SmartDirectionalCursor - 智能方向指示光标
 *
 * 集成要求：
 * • 页面需要有多个section结构
 * • useAppStore包含currentSection和sections状态
 * • 页面容器使用'.scroll-mode-auto'类名
 * • 主题系统配置CSS变量（--theme-primary等）
 *
 * 核心特性：
 * • 240fps超敏感滚动响应
 * • 硬件加速渲染优化
 * • 智能边界检测
 * • 移动端自适应隐藏
 * • 可点击元素智能识别
 *
 * =====================================================================================
 */

export default SmartDirectionalCursor;
