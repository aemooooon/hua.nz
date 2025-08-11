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
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

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

            // 设置 canvas 的宽度和高度
            canvas.style.width = `${newWidth}px`;
            canvas.style.height = `${newHeight}px`;
        };

        // 初始化时调用一次
        handleResize();

        // 监听 resize 事件
        window.addEventListener("resize", handleResize);

        // 清理事件监听器
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [aspectRatio]);

    // 鼠标悬停时显示图片并重新触发动画
    const handleMouseEnter = () => {
        setIsHovered(true); // 显示图片
        gsap.fromTo(
            hoverImgRef.current,
            { 
                opacity: 0, 
                transform: "translate(-50%, -50%) scale(0.9)" // 保持居中，从小开始
            },
            { 
                opacity: 1, 
                transform: "translate(-50%, -50%) scale(1.0)", // 保持居中，放大到正常
                duration: 0.8, 
                ease: "elastic.out"
            }
        );

        // 重新触发动画
        const png = new Image();
        png.onload = () => {
            const offscreen = new OffscreenCanvas(png.width, png.height);
            const offscreenCtx = offscreen.getContext("2d");
            offscreenCtx.drawImage(png, 0, 0);

            const imageBitmap = offscreen.transferToImageBitmap();
            workerRef.current.postMessage({ imageBitmap, width: png.width, height: png.height }, [imageBitmap]);
        };
        png.src = imageSrc;
    };

    // 鼠标离开时隐藏图片
    const handleMouseLeave = () => {
        if (hoverImgRef.current) {
            gsap.to(hoverImgRef.current, {
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.9)", // 保持居中，缩小消失
                duration: 0.8,
                ease: "elastic.out",
                onComplete: () => setIsHovered(false), // 动画完成后隐藏图片
            });
        }
    };

    return (
        <div
            style={{ position: "relative", width: "100%", height: "100%" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
            
            {/* Canvas */}
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
                    transform: "translate(-50%, -50%) scale(1.5)", // 修复：统一使用-50%居中
                    opacity: isLoading ? 0 : 1, // 加载时隐藏canvas
                    transition: "opacity 0.3s ease"
                }}
            />

            {/* 覆盖图片 */}
            <img
                ref={hoverImgRef}
                src={hoverImageSrc}
                alt="Hover Image"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // 修复：统一使用-50%居中
                    opacity: 0, // 初始状态
                    visibility: isHovered ? "visible" : "hidden", // 控制可见性
                    transition: "opacity 0.8s ease, transform 0.8s ease", // 添加过渡效果
                    pointerEvents: "none", // 防止图片遮挡 Canvas 的交互
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 确保图片正确填充
                    borderRadius: "inherit" // 继承父容器的圆角
                }}
            />
        </div>
    );
};

EffectAvatar.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    hoverImageSrc: PropTypes.string.isRequired,
};

export default EffectAvatar;
