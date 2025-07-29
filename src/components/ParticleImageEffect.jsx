import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

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
                // Set canvas to a square size to accommodate circular particle area
                const canvasSize = 400;
                canvas.width = canvasSize;
                canvas.height = canvasSize;
                
                // Calculate circle parameters
                const radius = canvasSize / 2 - 20; // Leave some margin
                const centerX = canvasSize / 2;
                const centerY = canvasSize / 2;

                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Create a temporary canvas to extract image data
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = img.width;
                tempCanvas.height = img.height;
                tempCtx.drawImage(img, 0, 0);

                const data = tempCtx.getImageData(0, 0, img.width, img.height);
                const step = 3; // Sample every 3rd pixel for performance

                for (let y = 0; y < data.height; y += step) {
                    for (let x = 0; x < data.width; x += step) {
                        const pixelIndex = (y * data.width + x) * 4;
                        const r = data.data[pixelIndex];
                        const g = data.data[pixelIndex + 1];
                        const b = data.data[pixelIndex + 2];
                        const a = data.data[pixelIndex + 3];

                        // Only process non-transparent pixels
                        if (a > 50) {
                            // Map image coordinates to circular area
                            // Normalize image coordinates to [-1, 1] range
                            const normalizedX = (x / data.width) * 2 - 1;
                            const normalizedY = (y / data.height) * 2 - 1;
                            
                            // Calculate distance from center in normalized space
                            const distanceFromCenter = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
                            
                            // Only include pixels that would fit within the circle
                            if (distanceFromCenter <= 1) {
                                // Map to circle coordinates
                                const finalX = centerX + (normalizedX * radius);
                                const finalY = centerY + (normalizedY * radius);

                                const particle = {
                                    x0: finalX,
                                    y0: finalY,
                                    x1: centerX, // Start at center
                                    y1: centerY,
                                    color: `rgba(${r}, ${g}, ${b}, ${a / 255})`,
                                    speed: Math.random() * 3 + 1.5,
                                };

                                gsap.to(particle, {
                                    x1: particle.x0,
                                    y1: particle.y0,
                                    duration: particle.speed,
                                    delay: (distanceFromCenter * 100) / 130, // Delay based on distance from center
                                    ease: "elastic.out",
                                });

                                particles.push(particle);
                            }
                        }
                    }
                }

                requestAnimationFrame(render);
            };
        };

        const render = () => {
            requestAnimationFrame(render);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle) => {
                // Check if particle is within circular boundary before rendering
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = canvas.width / 2 - 20;
                
                const distanceFromCenter = Math.sqrt(
                    (particle.x1 - centerX) ** 2 + (particle.y1 - centerY) ** 2
                );
                
                if (distanceFromCenter <= radius) {
                    ctx.fillStyle = particle.color;
                    const particleSize = Math.max(1, radius / 150);
                    ctx.fillRect(
                        particle.x1 - particleSize / 2, 
                        particle.y1 - particleSize / 2, 
                        particleSize, 
                        particleSize
                    );
                }
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
                borderRadius: "50%", // Make canvas visually circular
                border: "2px solid #333", // Optional: add border to visualize the circle
            }}
        />
    );
};

ParticleImageEffect.propTypes = {
    png: PropTypes.string.isRequired,
};

export default ParticleImageEffect;
