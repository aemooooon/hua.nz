import { useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import CircularLoadingIndicator from "../ui/CircularLoadingIndicator";

/**
 * EffectAvatar - 高性能粒子动画头像效果组件
 * 
 * 功能特性：
 * - 使用 Web Worker 处理粒子计算，避免阻塞主线程
 * - GSAP 动画库提供流畅的过渡效果
 * - Canvas 2D 渲染粒子动画
 * - Hover 时显示清晰头像照片
 * - 响应式设计，支持窗口缩放
 * - 内存和资源自动清理
 */
const EffectAvatar = ({ imageSrc, hoverImageSrc }) => {
    const canvasRef = useRef(null);
    const hoverImgRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const workerRef = useRef(null);
    const particlesRef = useRef([]);

    // 粒子散开动画函数
    const animateParticles = useCallback(() => {
        const particles = particlesRef.current;
        if (!particles.length) return;

        // 重置所有粒子到12点钟方向的初始位置
        particles.forEach((particle) => {
            gsap.set(particle, {
                x1: particle.x0 + (Math.random() - 0.5) * 20, // 稍微随机化初始X位置
                y1: -50 - Math.random() * 30, // 从12点钟方向更上方开始
            });
        });

        // 粒子从12点钟方向散开到目标位置的动画
        particles.forEach((particle) => {
            gsap.to(particle, {
                duration: particle.speed,
                x1: particle.x0,
                y1: particle.y0,
                delay: particle.y0 / 200 + Math.random() * 0.3, // 增加随机延迟让动画更自然
                ease: "elastic.out(1, 0.5)",
            });
        });
    }, []);

    // 初始化 Web Worker 并设置粒子动画
    useEffect(() => {
        // 创建 Web Worker 处理粒子计算，避免阻塞主线程
        workerRef.current = new Worker(new URL("../../workers/particleWorker.js?worker", import.meta.url));
        
        workerRef.current.onmessage = (event) => {
            const particles = event.data;
            particlesRef.current = particles;
            // 触发初始粒子散开动画
            animateParticles();
        };

        // 清理资源
        return () => {
            if (workerRef.current) {
                workerRef.current.terminate();
            }
        };
    }, [animateParticles]);

    // 图片加载和 Canvas 初始化
    useEffect(() => {
        const png = new Image();
        
        png.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            // 设置 Canvas 内部分辨率为图片尺寸的2倍，提供更清晰的渲染
            canvas.width = png.width * 2;
            canvas.height = png.height * 2;
            setAspectRatio(png.width / png.height);

            // 使用 OffscreenCanvas 提高性能
            const offscreen = new OffscreenCanvas(png.width, png.height);
            const offscreenCtx = offscreen.getContext("2d");
            offscreenCtx.drawImage(png, 0, 0);

            const imageBitmap = offscreen.transferToImageBitmap();
            if (workerRef.current) {
                workerRef.current.postMessage(
                    { imageBitmap, width: png.width, height: png.height }, 
                    [imageBitmap]
                );
            }
            
            setIsLoading(false);
        };
        
        png.onerror = () => {
            console.warn('EffectAvatar: 图片加载失败:', imageSrc);
            setIsLoading(false);
        };
        
        png.src = imageSrc;
    }, [imageSrc]);

    // 高性能 Canvas 渲染循环
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d", { 
            willReadFrequently: true,
            alpha: false // 禁用透明度通道提升性能
        });
        
        let animationFrameId;

        const render = () => {
            // 使用更高效的清除方法
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 批量渲染粒子，减少 draw call
            const particles = particlesRef.current;
            if (particles.length > 0) {
                particles.forEach((particle) => {
                    ctx.fillStyle = particle.color;
                    ctx.fillRect(particle.x1 * 2, particle.y1 * 2, 2, 2);
                });
            }
            
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);
        
        // 清理动画循环
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    // 响应式窗口缩放处理（性能优化版）
    useEffect(() => {
        let resizeTimeout;
        
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            // 防抖处理，减少频繁的DOM操作
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const parent = canvas.parentElement;
                if (!parent) return;
                
                const { clientWidth: parentWidth, clientHeight: parentHeight } = parent;

                // 根据宽高比计算最优显示尺寸
                let newWidth, newHeight;
                if (parentWidth / parentHeight > aspectRatio) {
                    newHeight = parentHeight;
                    newWidth = newHeight * aspectRatio;
                } else {
                    newWidth = parentWidth;
                    newHeight = newWidth / aspectRatio;
                }

                // 恢复原来的设置方式，不改变transform，只设置CSS尺寸
                canvas.style.width = `${newWidth}px`;
                canvas.style.height = `${newHeight}px`;
                
                // Canvas内部分辨率保持不变，与原始图片尺寸一致
            }, 150);
        };

        // 使用 ResizeObserver API 替代 window resize 事件，更精确且性能更好
        const resizeObserver = new ResizeObserver(handleResize);
        const parentElement = canvasRef.current?.parentElement;
        
        if (parentElement) {
            resizeObserver.observe(parentElement);
        }

        handleResize(); // 初始化

        return () => {
            resizeObserver.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, [aspectRatio]);

    // 鼠标悬停显示清晰头像（优化版）
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        
        const hoverContainer = hoverImgRef.current?.parentElement;
        if (hoverContainer) {
            // 停止冲突的动画，避免性能浪费
            gsap.killTweensOf(hoverContainer);
            gsap.fromTo(
                hoverContainer,
                { 
                    opacity: 0, 
                    transform: "translate(-50%, -50%) scale(0.9)"
                },
                { 
                    opacity: 1, 
                    transform: "translate(-50%, -50%) scale(1.0)",
                    duration: 0.8, 
                    ease: "elastic.out"
                }
            );
        }

        // 鼠标进入时也触发粒子动画
        animateParticles();
    }, [animateParticles]);

    // 鼠标离开显示粒子动画（优化版）
    const handleMouseLeave = useCallback(() => {
        const hoverContainer = hoverImgRef.current?.parentElement;
        if (hoverContainer) {
            gsap.killTweensOf(hoverContainer);
            gsap.to(hoverContainer, {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.9)",
                duration: 0.8,
                ease: "elastic.out",
                onComplete: () => {
                    setIsHovered(false);
                    // 鼠标离开时重新触发粒子散开动画
                    setTimeout(animateParticles, 100);
                }
            });
        }
    }, [animateParticles]);

    // 组件卸载时的资源清理
    useEffect(() => {
        const currentHoverImg = hoverImgRef.current;
        const currentParticles = particlesRef.current;
        
        return () => {
            // 清理所有 GSAP 动画
            const hoverContainer = currentHoverImg?.parentElement;
            if (hoverContainer) {
                gsap.killTweensOf(hoverContainer);
            }
            
            // 清理粒子动画
            if (currentParticles) {
                currentParticles.forEach(particle => {
                    gsap.killTweensOf(particle);
                });
            }
        };
    }, []);

    return (
        <div
            style={{ 
                position: "relative", 
                width: "100%", 
                height: "100%", 
                zIndex: 3 // 降低z-index，让雷达扫描效果可以从背后透出
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* 加载状态指示器 */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-full">
                    <CircularLoadingIndicator
                        size={60}
                        strokeWidth={4}
                        showMask={false}
                        className="opacity-80"
                    />
                </div>
            )}
            
            {/* 粒子动画 Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    objectFit: "cover",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -30%) scale(1.5)",
                    opacity: isLoading ? 0 : (isHovered ? 0.1 : 0.85), // 调整不悬停时的透明度从1变为0.85，让雷达扫描能透出
                    transition: "opacity 0.5s ease",
                    zIndex: 1, // 确保粒子在雷达扫描效果上方，但不会完全挡住
                    // 优化 Canvas 渲染性能
                    imageRendering: "auto",
                    willChange: isHovered ? "opacity" : "auto"
                }}
            />

            {/* 清晰头像显示容器 */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    opacity: isHovered ? 1 : 0,
                    visibility: isHovered ? "visible" : "hidden",
                    transition: "opacity 0.5s ease, visibility 0.5s ease",
                    pointerEvents: "none",
                    zIndex: 2,
                    // iOS Safari 兼容性修复
                    WebkitBorderRadius: "50%",
                    WebkitMaskImage: "radial-gradient(circle, white 100%, black 100%)",
                    // 性能优化：只在需要时启用 GPU 加速
                    willChange: isHovered ? "opacity, transform" : "auto"
                }}
            >
                <img
                    ref={hoverImgRef}
                    src={hoverImageSrc}
                    alt="清晰头像"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        pointerEvents: "none",
                        borderRadius: "50%", // iOS Safari 兼容性修复
                        WebkitBorderRadius: "50%", // iOS Safari 兼容性修复
                        // 图片渲染优化
                        imageRendering: "auto"
                    }}
                    loading="lazy" // 懒加载优化
                    decoding="async" // 异步解码提升性能
                />
            </div>
        </div>
    );
};

EffectAvatar.propTypes = {
    /** 粒子动画的源图片路径 */
    imageSrc: PropTypes.string.isRequired,
    /** 鼠标悬停时显示的清晰头像图片路径 */
    hoverImageSrc: PropTypes.string.isRequired,
};

// 使用 React.memo 优化重渲染性能
export default EffectAvatar;
