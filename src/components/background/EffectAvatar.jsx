import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import CircularLoadingIndicator from "../ui/CircularLoadingIndicator";

/**
 * EffectAvatar - 粒子动画头像效果组件
 * 移动自原Avatar组件，统一放置在background文件夹下
 */
const EffectAvatar = ({ imageSrc, hoverImageSrc }) => {
    const canvasRef = useRef(null);
    const hoverImgRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态
    const workerRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        workerRef.current = new Worker(new URL("../../workers/particleWorker.js?worker", import.meta.url));
        workerRef.current.onmessage = (event) => {
            const particles = event.data;
            particles.forEach((particle) => {
                gsap.to(particle, {
                    duration: particle.speed,
                    x1: particle.x0,
                    y1: particle.y0,
                    delay: particle.y0 / 130,
                    ease: "elastic.out",
                });
            });
            particlesRef.current = particles;
        };

        return () => {
            workerRef.current.terminate();
        };
    }, []);

    useEffect(() => {
        const png = new Image();
        png.onload = () => {
            const canvas = canvasRef.current;
            canvas.width = png.width * 2;
            canvas.height = png.height * 2;
            setAspectRatio(png.width / png.height);

            const offscreen = new OffscreenCanvas(png.width, png.height);
            const offscreenCtx = offscreen.getContext("2d");
            offscreenCtx.drawImage(png, 0, 0);

            const imageBitmap = offscreen.transferToImageBitmap();
            workerRef.current.postMessage({ imageBitmap, width: png.width, height: png.height }, [imageBitmap]);
            
            // 图片加载完成，隐藏加载指示器
            setIsLoading(false);
        };
        png.onerror = () => {
            // 图片加载失败，也隐藏加载指示器
            setIsLoading(false);
        };
        png.src = imageSrc;
    }, [imageSrc]);

    // 渲染粒子
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach((particle) => {
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x1 * 2, particle.y1 * 2, 2, 2);
            });
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }, [particlesRef]);

    // 监听浏览器缩放事件
    useEffect(() => {
        let resizeTimeout;
        
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            // 防抖处理，避免频繁触发
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // 获取父容器的宽度
                const parentWidth = canvas.parentElement.clientWidth;
                const parentHeight = canvas.parentElement.clientHeight;

                // 根据宽高比计算 canvas 的新宽度和高度
                let newWidth, newHeight;
                if (parentWidth / parentHeight > aspectRatio) {
                    // 父容器宽度过大，以高度为基准
                    newHeight = parentHeight;
                    newWidth = newHeight * aspectRatio;
                } else {
                    // 父容器高度过大，以宽度为基准
                    newWidth = parentWidth;
                    newHeight = newWidth / aspectRatio;
                }

                // 设置 canvas 的显示尺寸
                canvas.style.width = `${newWidth}px`;
                canvas.style.height = `${newHeight}px`;

                // 重要：Canvas的内部分辨率需要保持固定，因为粒子坐标是基于原始图片计算的
                // 不需要改变 canvas.width 和 canvas.height，它们应该保持与原始图片尺寸一致
                
                console.log('Canvas resized:', {
                    displaySize: `${newWidth}x${newHeight}`,
                    internalSize: `${canvas.width}x${canvas.height}`,
                    aspectRatio,
                    parentSize: `${parentWidth}x${parentHeight}`
                });
            }, 100); // 100ms防抖
        };

        // 初始化时调用一次
        handleResize();

        // 监听 resize 事件
        window.addEventListener("resize", handleResize);

        // 清理事件监听器
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [aspectRatio]);

    // 鼠标悬停时显示清晰照片
    const handleMouseEnter = () => {
        console.log('🎯 Mouse Enter - 显示清晰照片');
        setIsHovered(true);
        
        // 立即停止任何进行中的动画
        const hoverContainer = hoverImgRef.current?.parentElement;
        if (hoverContainer) {
            gsap.killTweensOf(hoverContainer); // 停止所有相关动画
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
    };

    // 鼠标离开时隐藏图片，显示粒子动画
    const handleMouseLeave = () => {
        console.log('🎯 Mouse Leave - 显示粒子动画');
        const hoverContainer = hoverImgRef.current?.parentElement;
        if (hoverContainer) {
            gsap.killTweensOf(hoverContainer); // 停止所有相关动画
            gsap.to(hoverContainer, {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.9)",
                duration: 0.8,
                ease: "elastic.out",
                onComplete: () => {
                    setIsHovered(false);
                    console.log('✅ 粒子动画已恢复显示');
                }
            });
        }
    };

    return (
        <div
            style={{ 
                position: "relative", 
                width: "100%", 
                height: "100%", 
                zIndex: 10 // 设置高z-index确保在所有光晕效果之上
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // 确保hover事件能够正确触发
            onMouseOver={(e) => {
                // 只有当鼠标真正进入容器时才触发
                if (e.currentTarget === e.target || e.currentTarget.contains(e.target)) {
                    if (!isHovered) {
                        handleMouseEnter();
                    }
                }
            }}
        >
            {/* 加载指示器 */}
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
            
            {/* Canvas - 粒子动画背景 */}
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
                    transform: "translate(-50%, -30%) scale(1.5)", // 调整垂直偏移到-30%
                    opacity: isLoading ? 0 : (isHovered ? 0.1 : 1), // hover时几乎完全透明，确保清晰照片可见
                    transition: "opacity 0.5s ease", // 稍微加快切换速度
                    zIndex: -1 // 设置负z-index，确保在hover图片后面
                }}
            />

            {/* 清晰照片容器 - hover时显示 */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%", // 容器圆形
                    overflow: "hidden", // 裁剪超出部分
                    opacity: isHovered ? 1 : 0, // 明确的显示/隐藏状态
                    visibility: isHovered ? "visible" : "hidden", // 确保完全隐藏
                    transition: "opacity 0.5s ease, visibility 0.5s ease", // 同步过渡
                    pointerEvents: "none", // 不阻挡鼠标事件
                    zIndex: 2 // 最高层级，确保在粒子之上
                }}
            >
                <img
                    ref={hoverImgRef}
                    src={hoverImageSrc}
                    alt="Hover Image"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%", // 填满圆形容器
                        height: "100%", // 填满圆形容器
                        objectFit: "cover", // 裁剪图片以填满圆形，保持比例
                        pointerEvents: "none"
                    }}
                />
            </div>
        </div>
    );
};

EffectAvatar.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    hoverImageSrc: PropTypes.string.isRequired,
};

export default EffectAvatar;
