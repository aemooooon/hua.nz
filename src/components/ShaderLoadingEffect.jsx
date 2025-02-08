import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ShaderLoadingEffect = ({ imageSrc }) => {
    const canvasRef = useRef(null);
    const [particles, setParticles] = useState([]);

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

    // 鼠标悬停时重新触发动画
    const handleMouseEnter = () => {
        const png = new Image();
        png.onload = () => {
            initializeParticles(png);
        };
        png.src = imageSrc;
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseEnter={handleMouseEnter} // 监听鼠标点击事件
            style={{
                width: "100%",
                height: "100%",
                cursor: "pointer", // 添加鼠标指针样式
            }}
        />
    );
};

export default ShaderLoadingEffect;