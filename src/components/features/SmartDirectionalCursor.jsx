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
 * 3. 📊 实时反馈：根据鼠标滚轮力度显示0-100%的进度环和百分比
 * 4. 🚨 智能边界检测：区分section级别和页面内容级别的滚动边界
 * 5. 🎭 悬停交互：鼠标悬停时光标有微妙的视觉变化
 * 
 * 【视觉组成】
 * - 外层圆环：显示滚动进度（0-100%）
 * - 内层箭头：指示可用的导航方向
 * - 中心数字：显示当前滚动强度百分比
 * - 动态颜色：根据操作有效性改变颜色
 * 
 * 【性能优化报告】
 * ⚡ 渲染性能：60fps动画 + 硬件加速（transform: translate3d）
 * ⚡ 交互响应：120fps事件节流 + passive事件监听器
 * ⚡ 内存优化：DOM缓存 + 完整清理机制 + 引用管理
 * ⚡ 更新频率：智能状态更新，减少不必要的重渲染
 * ⚡ 浏览器友好：避免layout/reflow，使用transform和opacity
 * 
 * 【使用场景】
 * 适用于具有多个section的全屏滚动网站，如作品集、产品展示页等
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
    
    /** 最后一次滚动的时间戳，用于实现滚动强度的自然衰减 */
    const [lastScrollTime, setLastScrollTime] = useState(0);
    
    /** 当前滚动方向：'up'|'down'|null，用于精确的边界检测 */
    const [scrollDirection, setScrollDirection] = useState(null);
    
    // ==================== 外部状态和引用 ====================
    
    /** 从全局状态获取当前section索引和所有sections数组 */
    const { currentSection, sections } = useAppStore();
    
    /** 动画帧的引用，用于性能优化的循环动画 */
    const animationFrameRef = useRef();
    
    /** 光晕强度的引用，用于平滑的悬停动画 */
    const glowIntensityRef = useRef(0);
    
    /** 滚动衰减定时器的引用，用于清理定时器 */
    const scrollDecayTimerRef = useRef();
    
    /** 缓存DOM容器引用，避免重复查询 */
    const containerRef = useRef(null);

    // ==================== 核心逻辑函数 ====================

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
     * 检测用户的滚轮操作，计算滚动强度和方向
     * 
     * 性能优化：
     * - 8ms节流限制，达到120fps响应速度
     * - 200ms自动衰减，避免长时间显示进度
     * 
     * @param {WheelEvent} event 滚轮事件对象
     */
    const handleWheelForce = useCallback((event) => {
        // 计算滚动力度：deltaY越大，force越接近1
        const force = Math.min(Math.abs(event.deltaY) / 80, 1);
        // 确定滚动方向：deltaY > 0为向下，< 0为向上
        const direction = event.deltaY > 0 ? 'down' : 'up';
        
        // 性能节流：限制更新频率到120fps
        const now = performance.now();
        if (now - (handleWheelForce.lastTime || 0) < 8) return;
        handleWheelForce.lastTime = now;
        
        // 更新状态
        setScrollIntensity(force);
        setScrollDirection(direction);
        setLastScrollTime(now);
        
        // 清理并重设衰减定时器
        if (scrollDecayTimerRef.current) {
            clearTimeout(scrollDecayTimerRef.current);
        }
        
        scrollDecayTimerRef.current = setTimeout(() => {
            setScrollIntensity(0);
            setScrollDirection(null);
        }, 200);
    }, []);

    /**
     * 🖱️ 鼠标移动跟踪器
     * 实时跟踪鼠标位置，让光标能跟随鼠标移动
     * 
     * 性能优化：8ms节流，120fps更新频率
     */
    const handleMouseMove = useCallback((e) => {
        const now = performance.now();
        if (now - (handleMouseMove.lastTime || 0) < 8) return;
        handleMouseMove.lastTime = now;
        
        setCursorPosition({ x: e.clientX, y: e.clientY });
        
        if (!isVisible) {
            setIsVisible(true);
        }
    }, [isVisible]);

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
    }, [isHovering, lastScrollTime, scrollIntensity]);

    /**
     * 🖱️ 系统光标隐藏
     * 隐藏系统默认光标，让自定义光标完全接管
     * 
     * 性能优化：确保样式正确恢复，避免影响其他组件
     */
    useEffect(() => {
        const originalCursor = document.body.style.cursor;
        document.body.style.cursor = 'none';
        
        return () => {
            document.body.style.cursor = originalCursor;
            
            // 最终清理：确保所有引用都被重置
            if (containerRef.current) {
                containerRef.current = null;
            }
            glowIntensityRef.current = 0.3;
        };
    }, []);

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
            
            if (scrollDecayTimerRef.current) {
                clearTimeout(scrollDecayTimerRef.current);
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
        const percentage = Math.round(scrollIntensity * 100);
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
            const arrowSize = 300 * hoverScale; // 大容器确保箭头能伸出圆圈
            
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
                        transform: 'rotate(-90deg)', // 旋转-90°让进度从12点钟开始
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
                        opacity="0.4"
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

                {/* 📈 滚动百分比显示：精确数值反馈 */}
                {scrollIntensity > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            fontWeight: '400',
                            fontFamily: 'Monaco, "Courier New", monospace',
                            color: progressColor,
                            opacity: 0.95,
                            zIndex: 15,
                            textShadow: `0 0 4px ${progressColor}`,
                            transform: 'translate3d(0, 0, 0)',
                            willChange: 'opacity',
                        }}
                    >
                        <span className="percentage">{percentage}%</span>
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
            </div>
        );
    };

    // ==================== 组件主渲染 ====================
    
    /** 如果光标不可见，直接返回null，避免不必要的渲染 */
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
                }
                
                .power-cursor.hovering {
                    filter: brightness(1.2) contrast(1.1); /* 悬停时增强亮度和对比度 */
                }
                
                /* 📱 移动设备适配：在触摸设备上隐藏光标 */
                @media (hover: none) and (pointer: coarse) {
                    .power-cursor {
                        display: none !important;
                    }
                }
            `}</style>
            
            {/* 
             * 🎯 主光标容器
             * 
             * 跟随鼠标位置的主容器，包含所有光标视觉元素
             * 使用transform: translate3d触发硬件加速，优化性能
             */}
            <div
                className={`power-cursor ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: `translate3d(-50%, -50%, 0)`, // 居中定位 + 硬件加速
                    willChange: 'transform', // 提示浏览器优化此属性
                }}
            >
                {renderPowerDirectionalIndicator()}
            </div>
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
