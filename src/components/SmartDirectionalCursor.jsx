import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

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

    // 根据当前位置判断可用的方向
    const getAvailableDirections = useCallback(() => {
        const canGoUp = currentSection > 0;
        const canGoDown = currentSection < sections.length - 1;
        
        if (canGoUp && canGoDown) return 'both';
        if (canGoUp) return 'up';
        if (canGoDown) return 'down';
        return 'none';
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

    // 渲染进度指示器光标 - 固定尺寸，进度圆圈效果
    const renderPowerDirectionalIndicator = () => {
        const baseSize = 200; // 固定尺寸，不受滚动强度影响
        const hoverScale = isHovering ? 1.02 : 1; // 微小的悬停缩放
        const size = baseSize * hoverScale; // 移除力度缩放
        
        // 进度圆圈颜色配置
        const baseColor = '#00f5ff'; // 青色基础圆圈
        const progressColor = '#00ff88'; // 绿色进度色
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
            const arrowSize = 120 * hoverScale; // 固定尺寸，只受悬停影响
            
            // 简化的长箭头路径 - 类似手画的勾形
            const arrowPath = direction === 'up' 
                ? "M12 22L12 2M8 6L12 2L16 6" // 向上箭头：长竖线 + 简单的勾形顶部
                : "M12 2L12 22M8 18L12 22L16 18"; // 向下箭头：长竖线 + 简单的勾形底部
            
            // 箭头颜色：固定为白色，不受滚动强度影响
            const arrowColor = '#ffffff';
            
            return (
                <div
                    style={{
                        position: 'absolute',
                        width: `${arrowSize}px`,
                        height: `${arrowSize}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: intensity * 0.9,
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
                            opacity={intensity}
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
                    {/* 底层青色圆圈 */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={(size - 4) / 2}
                        fill="none"
                        stroke={baseColor}
                        strokeWidth={strokeWidth}
                        opacity="0.6"
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
                        {percentage}%
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
