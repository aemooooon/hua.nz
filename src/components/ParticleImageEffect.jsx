import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ParticleImageEffect = ({ png }) => {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let particles = [];

        const drawScene = () => {
            const img = new Image();
            img.src = png;

            img.onload = () => {
                canvas.width = img.width * 2;
                canvas.height = img.height * 2;

                ctx.drawImage(img, 0, 0);

                const data = ctx.getImageData(0, 0, img.width, img.height);
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let y = 0; y < data.height; y += 2) {
                    for (let x = 0; x < data.width; x += 2) {
                        const r = data.data[(y * 4 * data.width) + (x * 4)];
                        const g = data.data[(y * 4 * data.width) + (x * 4) + 1];
                        const b = data.data[(y * 4 * data.width) + (x * 4) + 2];

                        const particle = {
                            x0: x,
                            y0: y,
                            x1: img.width / 2,
                            y1: img.height / 2,
                            color: `rgb(${r}, ${g}, ${b})`,
                            speed: Math.random() * 4 + 2,
                        };

                        gsap.to(particle, {
                            x1: particle.x0,
                            y1: particle.y0,
                            duration: particle.speed,
                            delay: y / 130,
                            ease: "elastic.out",
                        });

                        particles.push(particle);
                    }
                }

                requestAnimationFrame(render);
            };
        };

        const render = () => {
            requestAnimationFrame(render);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x1 * 2, particle.y1 * 2, 2, 2);
            });
        };

        drawScene();

        return () => {
            particles = [];
        };
    }, [png]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        />
    );
};

export default ParticleImageEffect;
