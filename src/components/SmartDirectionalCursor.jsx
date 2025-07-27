import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

const SmartDirectionalCursor = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [direction, setDirection] = useState('none'); // 'up', 'down', 'both', 'none'
    const [isHovering, setIsHovering] = useState(false);
    const [animationFrame, setAnimationFrame] = useState(0);
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

    // 滚动力度检测
    const handleWheelForce = useCallback((event) => {
        const force = Math.min(Math.abs(event.deltaY) / 100, 1); // 标准化滚动力度
        setScrollIntensity(force);
        setLastScrollTime(Date.now());
        
        // 清除之前的衰减定时器
        if (scrollDecayTimerRef.current) {
            clearTimeout(scrollDecayTimerRef.current);
        }
        
        // 设置力度衰减
        scrollDecayTimerRef.current = setTimeout(() => {
            setScrollIntensity(0);
        }, 500); // 0.5秒后衰减
    }, []);

    // 鼠标位置跟踪
    const handleMouseMove = useCallback((e) => {
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

    // 动画循环
    useEffect(() => {
        const animate = () => {
            setAnimationFrame(prev => prev + 1);
            
            // 光晕强度动画
            if (isHovering) {
                glowIntensityRef.current = Math.min(glowIntensityRef.current + 0.05, 1);
            } else {
                glowIntensityRef.current = Math.max(glowIntensityRef.current - 0.03, 0.3);
            }
            
            // 滚动力度自然衰减
            const timeSinceScroll = Date.now() - lastScrollTime;
            if (timeSinceScroll > 100) {
                setScrollIntensity(prev => Math.max(prev - 0.02, 0));
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

    // 渲染强力箭头指示器 - 汽车仪表盘风格
    const renderPowerDirectionalIndicator = () => {
        const baseSize = 256; // 保持256px直径 - 超大尺寸！
        const hoverScale = isHovering ? 1.03 : 1; // 更小的悬停缩放，减少突兀
        const forceScale = 1 + scrollIntensity * 0.15; // 更小的力度缩放
        const totalScale = hoverScale * forceScale;
        const size = baseSize * totalScale;
        
        const glowIntensity = glowIntensityRef.current;
        const pulseScale = 1 + Math.sin(animationFrame * 0.15) * 0.06 * glowIntensity; // 减小脉冲幅度
        
        // 动态颜色基于滚动力度
        const baseColor = '#00f5ff'; // 科技蓝
        const forceColor = `hsl(${180 + scrollIntensity * 60}, 100%, ${50 + scrollIntensity * 30}%)`; // 蓝到青到白
        const shadowIntensity = 15 + scrollIntensity * 60; // 减少阴影强度
        const shadowBlur = 8 + scrollIntensity * 30; // 减少模糊半径
        
        const containerStyle = {
            width: `${size}px`,
            height: `${size}px`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${pulseScale})`,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 ${shadowBlur}px ${forceColor}${Math.floor(shadowIntensity * 2.55).toString(16).padStart(2, '0')})`,
        };

        const createArrow = (direction, intensity = 1) => {
            const arrowSize = 48 * totalScale; // 进一步减小箭头尺寸，减轻厚重感
            const strokeWidth = 2 + scrollIntensity * 1.5; // 更细的线宽，更轻盈
            
            // 根据方向绘制不同的箭头路径
            const arrowPath = direction === 'up' 
                ? "M12 5L12 19M12 5L8 9M12 5L16 9" // 向上箭头（12点方向）
                : "M12 19L12 5M12 19L8 15M12 19L16 15"; // 向下箭头（6点方向）
            
            return (
                <div
                    style={{
                        position: 'absolute',
                        width: `${arrowSize}px`,
                        height: `${arrowSize}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        opacity: intensity * 0.85, // 降低透明度，减轻厚重感
                    }}
                >
                    <svg width={arrowSize} height={arrowSize} viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id={`arrowGradient${direction}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={baseColor} stopOpacity={0.6} />
                                <stop offset="50%" stopColor={forceColor} stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.4} />
                            </linearGradient>
                            <filter id={`glow${direction}`}>
                                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                                <feMerge> 
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path
                            d={arrowPath}
                            stroke={`url(#arrowGradient${direction})`}
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            filter={`url(#glow${direction})`}
                            opacity={intensity}
                        />
                    </svg>
                </div>
            );
        };

        return (
            <div style={containerStyle}>
                {/* 外圈能量环 - 更轻盈 */}
                <div
                    style={{
                        position: 'absolute',
                        width: `${size + 60}px`, // 减小外圈扩展
                        height: `${size + 60}px`,
                        borderRadius: '50%',
                        background: `conic-gradient(from ${animationFrame * 2}deg, 
                            ${forceColor}00 0deg, 
                            ${forceColor}30 ${scrollIntensity * 180}deg, 
                            ${forceColor}60 ${scrollIntensity * 360}deg, 
                            ${forceColor}00 360deg)`,
                        animation: scrollIntensity > 0.1 ? 'spin 2s linear infinite' : 'none',
                        opacity: glowIntensity * 0.6, // 降低外圈透明度
                    }}
                />
                
                {/* 中心核心 - 更小更轻 */}
                <div
                    style={{
                        position: 'absolute',
                        width: `${size * 0.3}px`, // 减小中心核心尺寸
                        height: `${size * 0.3}px`,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${forceColor}40, ${baseColor}15)`, // 降低渐变透明度
                        border: `1.5px solid ${forceColor}`, // 更细的边框
                        boxShadow: `
                            inset 0 0 ${8 + scrollIntensity * 15}px ${forceColor}30,
                            0 0 ${15 + scrollIntensity * 30}px ${forceColor}40
                        `, // 减少发光强度
                        backdropFilter: 'blur(2px)', // 减少模糊
                        opacity: 0.8, // 增加透明度
                    }}
                />

                {/* 力度指示环 - 更轻盈 */}
                {scrollIntensity > 0.15 && ( // 提高触发阈值
                    <div
                        style={{
                            position: 'absolute',
                            width: `${size * 0.7}px`, // 减小环的尺寸
                            height: `${size * 0.7}px`,
                            borderRadius: '50%',
                            border: `2px solid transparent`, // 更细的边框
                            borderTopColor: forceColor,
                            borderRightColor: scrollIntensity > 0.4 ? forceColor : 'transparent', // 调整阈值
                            borderBottomColor: scrollIntensity > 0.7 ? forceColor : 'transparent',
                            borderLeftColor: scrollIntensity > 0.95 ? forceColor : 'transparent',
                            animation: 'spin 1.2s linear infinite', // 稍慢的旋转
                            opacity: scrollIntensity * 0.8, // 降低透明度
                        }}
                    />
                )}

                {/* 方向箭头 - 12点/6点方向 */}
                {direction === 'up' && createArrow('up')} {/* 正上方（12点钟方向） */}
                {direction === 'down' && createArrow('down')} {/* 正下方（6点钟方向） */}
                {direction === 'both' && (
                    <>
                        {/* 双箭头显示，减少透明度叠加 */}
                        {createArrow('up', 0.6)} {/* 上箭头，减少透明度 */}
                        {createArrow('down', 0.6)}  {/* 下箭头，减少透明度 */}
                    </>
                )}
                
                {/* 无方向时的脉冲中心 - 更轻盈 */}
                {direction === 'none' && (
                    <div
                        style={{
                            position: 'absolute',
                            width: `${16 + scrollIntensity * 8}px`, // 减小中心点尺寸
                            height: `${16 + scrollIntensity * 8}px`,
                            borderRadius: '50%',
                            background: forceColor,
                            boxShadow: `0 0 ${30 + scrollIntensity * 50}px ${forceColor}`, // 减少发光强度
                            animation: 'pulse 2s ease-in-out infinite', // 稍慢的脉冲
                            opacity: 0.8, // 增加透明度
                        }}
                    />
                )}

                {/* 滚动力度数值显示 - 减小字体 */}
                {scrollIntensity > 0.25 && ( // 提高显示阈值
                    <div
                        style={{
                            position: 'absolute',
                            bottom: `-${size * 0.15}px`, // 调整位置
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: forceColor,
                            fontSize: '14px', // 减小字体
                            fontWeight: '500', // 减轻字重
                            textShadow: `0 0 10px ${forceColor}`, // 减少文字发光
                            fontFamily: 'monospace',
                            opacity: scrollIntensity * 0.8, // 降低透明度
                        }}
                    >
                        {Math.round(scrollIntensity * 100)}%
                    </div>
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
            
            {/* 主光标 - 居中定位 */}
            <div
                className={`power-cursor ${isHovering ? 'hovering' : ''}`}
                style={{
                    left: cursorPosition.x,
                    top: cursorPosition.y,
                    transform: `translate(-50%, -50%)`, // 完全居中
                    transition: 'transform 0.1s ease-out',
                }}
            >
                {renderPowerDirectionalIndicator()}
            </div>

            {/* 能量轨迹粒子 - 适配256px超大光标 */}
            {scrollIntensity > 0.3 && (
                <>
                    {[...Array(Math.floor(scrollIntensity * 12))].map((_, i) => ( // 增加粒子数量
                        <div
                            key={i}
                            style={{
                                position: 'fixed',
                                left: cursorPosition.x + (Math.random() - 0.5) * 80, // 增大粒子散布范围，适配256px
                                top: cursorPosition.y + (Math.random() - 0.5) * 80,
                                width: `${4 + Math.random() * 6}px`, // 增大粒子尺寸
                                height: `${4 + Math.random() * 6}px`,
                                borderRadius: '50%',
                                background: `hsl(${180 + scrollIntensity * 60}, 100%, ${70 + Math.random() * 30}%)`,
                                pointerEvents: 'none',
                                zIndex: 9998,
                                animation: `float ${1 + Math.random()}s ease-in-out infinite`,
                                opacity: scrollIntensity * (0.6 + Math.random() * 0.4),
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    ))}
                </>
            )}
        </>
    );
};

export default SmartDirectionalCursor;
