import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';

const SmartDirectionalCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [direction, setDirection] = useState('none'); // 'up', 'down', 'both', 'none'
    const [isHovering, setIsHovering] = useState(false);
    const [scrollIntensity, setScrollIntensity] = useState(0); // 滚动力度 0-1
    const [lastScrollTime, setLastScrollTime] = useState(0);
    
    const { currentSection, sections } = useAppStore();
    const animationFrameRef = useRef();
    const glowIntensityRef = useRef(0);
    const scrollDecayTimerRef = useRef();

    // 根据当前位置判断可用的方向和边界状态
    const getAvailableDirections = useCallback(() => {
        const canGoUp = currentSection > 0;
        const canGoDown = currentSection < sections.length - 1;
        
        if (canGoUp && canGoDown) return 'both';
        if (canGoUp) return 'up';
        if (canGoDown) return 'down';
        return 'none';
    }, [currentSection, sections.length]);

    // 简化的边界检测 - 只检测真正无法滚动的绝对边界
    const isAtAbsoluteBoundary = useCallback(() => {
        const canGoUp = currentSection > 0;
        const canGoDown = currentSection < sections.length - 1;
        
        // 检测当前页面的内容滚动状态
        const currentContainer = document.querySelector('.scroll-mode-auto');
        let hasContentToScroll = false;
        let atContentTop = true;
        let atContentBottom = true;
        
        if (currentContainer) {
            hasContentToScroll = currentContainer.scrollHeight > currentContainer.clientHeight + 10;
            atContentTop = currentContainer.scrollTop <= 5;
            atContentBottom = currentContainer.scrollTop >= (currentContainer.scrollHeight - currentContainer.clientHeight - 5);
        }
        
        // 只有在以下情况才被认为是绝对边界：
        // 1. 在第一页且内容到达顶部或没有内容可滚动，无法继续向上
        // 2. 在最后一页且内容到达底部或没有内容可滚动，无法继续向下
        // 3. 只有一页且没有内容可滚动
        
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

    // 更新方向状态
    useEffect(() => {
        setDirection(getAvailableDirections());
    }, [getAvailableDirections]);

    // 滚动力度检测 - 优化性能和响应速度
    const handleWheelForce = useCallback((event) => {
        const force = Math.min(Math.abs(event.deltaY) / 80, 1); // 降低除数，提高灵敏度
        
        // 减少节流时间，提高响应速度
        const now = performance.now();
        if (now - (handleWheelForce.lastTime || 0) < 8) return; // 从16ms减少到8ms，提高到120fps
        handleWheelForce.lastTime = now;
        
        setScrollIntensity(force);
        setLastScrollTime(now);
        
        // 清除之前的衰减定时器
        if (scrollDecayTimerRef.current) {
            clearTimeout(scrollDecayTimerRef.current);
        }
        
        // 减少衰减时间，更快响应
        scrollDecayTimerRef.current = setTimeout(() => {
            setScrollIntensity(0);
        }, 200); // 从300ms减少到200ms，更快衰减
    }, []);

    // 鼠标位置跟踪 - 优化性能
    const handleMouseMove = useCallback((e) => {
        // 节流处理，避免过于频繁的位置更新
        const now = performance.now();
        if (now - (handleMouseMove.lastTime || 0) < 8) return; // 限制到120fps，更流畅
        handleMouseMove.lastTime = now;
        
        setCursorPosition({ x: e.clientX, y: e.clientY });
        
        if (!isVisible) {
            setIsVisible(true);
        }
    }, [isVisible]);

    // 鼠标进入/离开事件
    const handleMouseEnter = useCallback(() => {
        setIsVisible(true);
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false);
        setIsHovering(false);
    }, []);

    // 优化动画循环 - 提高帧率和响应速度
    useEffect(() => {
        const animate = () => {
            // 提高动画帧率，减少延迟
            const now = performance.now();
            if (now - (animate.lastTime || 0) < 16) { // 提高到60fps，更流畅
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            animate.lastTime = now;
            
            // 光晕强度动画 - 更快响应
            if (isHovering) {
                glowIntensityRef.current = Math.min(glowIntensityRef.current + 0.12, 1); // 增加步长
            } else {
                glowIntensityRef.current = Math.max(glowIntensityRef.current - 0.08, 0.3); // 增加步长
            }
            
            // 滚动力度自然衰减 - 更快衰减
            const timeSinceScroll = now - lastScrollTime;
            if (timeSinceScroll > 30) { // 从50ms减少到30ms，更快开始衰减
                setScrollIntensity(prev => Math.max(prev - 0.05, 0)); // 增加衰减步长
            }
            
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        
        animationFrameRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isHovering, lastScrollTime]);

    // 隐藏默认光标
    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    // 事件监听器
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

    // 隐藏默认光标
    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    // 渲染进度指示器光标 - 缩小尺寸，进度圆圈效果，支持边界红色提示
    const renderPowerDirectionalIndicator = () => {
        const baseSize = 133; // 缩小为原来的三分之二 (200 * 2/3 ≈ 133)
        const hoverScale = isHovering ? 1.02 : 1; // 微小的悬停缩放
        const size = baseSize * hoverScale; // 移除力度缩放
        
        // 边界状态检测 - 使用简化的边界检测
        const boundaryState = isAtAbsoluteBoundary();
        
        // 检测是否在绝对无法滚动的边界
        const shouldShowBoundaryWarning = (
            // 向上滚动但已到达绝对顶部边界
            (boundaryState.isTopBoundary && scrollIntensity > 0) ||
            // 向下滚动但已到达绝对底部边界  
            (boundaryState.isBottomBoundary && scrollIntensity > 0) ||
            // 没有任何地方可以滚动
            (boundaryState.hasNowhereToGo && scrollIntensity > 0)
        );
        
        // 进度圆圈颜色配置 - 根据边界状态和滚动强度调整
        const getBaseColor = () => {
            if (shouldShowBoundaryWarning && scrollIntensity > 0) {
                // 边界状态且有滚动力度时显示红色
                return '#ff4444';
            }
            return '#ffffff'; // 正常状态为白色
        };
        
        const getProgressColor = () => {
            if (shouldShowBoundaryWarning && scrollIntensity > 0) {
                // 边界状态时进度条也显示红色
                return '#ff4444';
            }
            return '#00ff88'; // 正常状态为绿色
        };
        
        const baseColor = getBaseColor();
        const progressColor = getProgressColor();
        const percentage = Math.round(scrollIntensity * 100); // 滚动强度百分比
        const strokeWidth = 1; // 箭头线条宽度
        const progressStrokeWidth = 5; // 进度圆弧使用更粗的线条，更加突出
        
        const containerStyle = {
            width: `${size}px`,
            height: `${size}px`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translate3d(0, 0, 0)', // 触发硬件加速
            willChange: 'transform', // 优化提示
        };

        const createArrow = (direction, intensity = 1) => {
            const arrowSize = 80 * hoverScale; // 缩小箭头尺寸 (120 * 2/3 = 80)
            
            // 简化的长箭头路径 - 类似手画的勾形
            const arrowPath = direction === 'up' 
                ? "M12 22L12 2M8 6L12 2L16 6" // 向上箭头：长竖线 + 简单的勾形顶部
                : "M12 2L12 22M8 18L12 22L16 18"; // 向下箭头：长竖线 + 简单的勾形底部
            
            // 箭头颜色：根据滚动力度和边界状态实时变化
            const getArrowColor = () => {
                if (scrollIntensity === 0) {
                    return '#ffffff'; // 无滚动时为白色
                }
                
                // 只有在绝对边界时显示红色，其他情况都显示绿色
                if (shouldShowBoundaryWarning) {
                    // 绝对边界状态时显示红色渐变
                    const lightRed = [255, 68, 68];   // #ff4444 的 RGB 值
                    const darkRed = [180, 20, 20];    // 深红色的 RGB 值
                    
                    const r = Math.round(lightRed[0] + (darkRed[0] - lightRed[0]) * scrollIntensity);
                    const g = Math.round(lightRed[1] + (darkRed[1] - lightRed[1]) * scrollIntensity);
                    const b = Math.round(lightRed[2] + (darkRed[2] - lightRed[2]) * scrollIntensity);
                    
                    return `rgb(${r}, ${g}, ${b})`;
                } else {
                    // 正常状态（包括有内容可滚动时）显示绿色渐变
                    const lightGreen = [0, 255, 136]; // #00ff88 的 RGB 值
                    const darkGreen = [0, 180, 60];   // 深绿色的 RGB 值
                    
                    const r = Math.round(lightGreen[0] + (darkGreen[0] - lightGreen[0]) * scrollIntensity);
                    const g = Math.round(lightGreen[1] + (darkGreen[1] - lightGreen[1]) * scrollIntensity);
                    const b = Math.round(lightGreen[2] + (darkGreen[2] - lightGreen[2]) * scrollIntensity);
                    
                    return `rgb(${r}, ${g}, ${b})`;
                }
            };
            
            const arrowColor = getArrowColor();
            
            return (
                <div
                    style={{
                        position: 'absolute',
                        width: `${arrowSize}px`,
                        height: `${arrowSize}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: intensity * 0.8, // 箭头透明度设为 0.8
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
                            opacity={0.8} // 设置箭头透明度为 0.8
                            style={{
                                transition: 'stroke 0.1s ease-out', // 颜色变化动画
                                willChange: 'stroke',
                            }}
                        />
                    </svg>
                </div>
            );
        };

        return (
            <div style={containerStyle}>
                {/* 进度圆圈指示器 - SVG实现 */}
                <svg
                    width={size}
                    height={size}
                    style={{
                        position: 'absolute',
                        transform: 'rotate(-90deg)', // 从12点钟方向开始
                    }}
                >
                    {/* 底层白色圆圈 */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={(size - 4) / 2}
                        fill="none"
                        stroke={baseColor}
                        strokeWidth={strokeWidth}
                        opacity="0.4"
                    />
                    
                    {/* 进度圆弧 - 根据滚动强度显示 */}
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
                                transition: 'stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // 更快更流畅的贝塞尔曲线
                                willChange: 'stroke-dashoffset', // 提示浏览器优化
                            }}
                        />
                    )}
                </svg>

                {/* 滚动强度百分比显示 - 显示在圆圈中心 */}
                {scrollIntensity > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '600',
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

                {/* 方向箭头 - 固定尺寸 */}
                {direction === 'up' && createArrow('up')}
                {direction === 'down' && createArrow('down')}
                {direction === 'both' && (
                    <>
                        {createArrow('up', 0.7)}
                        {createArrow('down', 0.7)}
                    </>
                )}
                
                {/* 无方向时的简单中心点 */}
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

    if (!isVisible) return null;

    return (
        <>
            {/* CSS 动画定义 */}
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
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: screen;
                }
                
                .power-cursor.hovering {
                    filter: brightness(1.2) contrast(1.1);
                }
                
                /* 移动设备隐藏 */
                @media (hover: none) and (pointer: coarse) {
                    .power-cursor {
                        display: none !important;
                    }
                }
            `}</style>
            
            {/* 主光标 - 居中定位，性能优化 */}
            <div
                className={`power-cursor ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: `translate3d(-50%, -50%, 0)`, // 使用 translate3d 触发硬件加速
                    willChange: 'transform', // 优化提示
                }}
            >
                {renderPowerDirectionalIndicator()}
            </div>
        </>
    );
};

export default SmartDirectionalCursor;
