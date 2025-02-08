import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ShaderLoadingEffect = ({ imageSrc, hoverImageSrc }) => {
    const canvasRef = useRef(null);
    const hoverImgRef = useRef(null); // 引用 hover img
    const [particles, setParticles] = useState([]);
    const [isHovered, setIsHovered] = useState(false); // 控制图片显示状态

    // 初始化粒子动画
    const initializeParticles = (png) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = png.width * 2;
        canvas.height = png.height * 2;
        ctx.drawImage(png, 0, 0);

        const data = ctx.getImageData(0, 0, png.width, png.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const newParticles = [];
        for (let y = 0, y2 = data.height; y < y2; y += 8) {
            for (let x = 0, x2 = data.width; x < x2; x += 8) {
                const particle = {
                    x0: x,
                    y0: y,
                    x1: png.width / 2,
                    y1: png.height / 2,
                    color: `rgb(${data.data[y * 4 * data.width + x * 4]}, ${
                        data.data[y * 4 * data.width + x * 4 + 1]
                    }, ${data.data[y * 4 * data.width + x * 4 + 2]})`,
                    speed: Math.random() * 4 + 2,
                };
                gsap.to(particle, {
                    duration: particle.speed,
                    x1: particle.x0,
                    y1: particle.y0,
                    delay: y / 130,
                    ease: "elastic.out", // 使用 GSAP 的弹性缓动
                });
                newParticles.push(particle);
            }
        }
        setParticles(newParticles);
    };

    // 加载图片并初始化粒子
    useEffect(() => {
        const png = new Image();
        png.onload = () => {
            initializeParticles(png);
        };
        png.src = imageSrc;
    }, [imageSrc]);

    // 渲染粒子
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x1 * 2, particle.y1 * 2, 2, 2);
            });
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    }, [particles]);

    // 鼠标悬停时显示图片并重新触发动画
    const handleMouseEnter = () => {
        setIsHovered(true); // 显示图片
        gsap.fromTo(
            hoverImgRef.current,
            { opacity: 0, scale: 0.8 }, // 初始状态
            { opacity: 1, scale: 1.1, duration: 0.8, ease: "power2.out" } // 结束状态
        );

        // 重新触发动画
        const png = new Image();
        png.onload = () => {
            initializeParticles(png);
        };
        png.src = imageSrc;
    };

    // 鼠标离开时隐藏图片
    const handleMouseLeave = () => {
        gsap.to(hoverImgRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => setIsHovered(false), // 动画完成后隐藏图片
        });
    };

    return (
        <div
            style={{ position: "relative", width: "100%", height: "100%" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    objectFit: "cover",
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
                    transform: "translate(-50%, -50%) scale(0.8)", // 初始状态
                    opacity: 0, // 初始状态
                    visibility: isHovered ? "visible" : "hidden", // 控制可见性
                    transition: "opacity 0.8s ease, transform 0.8s ease", // 添加过渡效果
                    pointerEvents: "none", // 防止图片遮挡 Canvas 的交互
                }}
            />
        </div>
    );
};

export default ShaderLoadingEffect;