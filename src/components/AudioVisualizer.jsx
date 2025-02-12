import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import NoteIcon from "../assets/images/music_headset.svg";

const AudioVisualizer = ({ canvasId, musicFile }) => {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);
    const staticAnimationRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const audioContext = audioContextRef.current;

        if (!analyserRef.current) {
            analyserRef.current = audioContext.createAnalyser();
            analyserRef.current.fftSize = 512;
        }

        const analyser = analyserRef.current;

        if (!sourceRef.current && audioRef.current) {
            sourceRef.current = audioContext.createMediaElementSource(audioRef.current);
            sourceRef.current.connect(analyser);
            analyser.connect(audioContext.destination);
        }

        if (isPlaying) {
            drawVisualizer();
        }

        return () => {
            cancelAnimationFrame(animationRef.current);
            cancelAnimationFrame(staticAnimationRef.current);
        };
    }, [isPlaying]);

    // **🎨 音频可视化**
    const drawVisualizer = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // **💡 设置 canvas 宽高**
        canvas.width = 200;
        canvas.height = 20;

        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            animationRef.current = requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // **中间参考线**
            const centerY = canvas.height / 2;
            const barWidth = canvas.width / bufferLength;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] / 1.8;
                const x = i * barWidth;

                // **💡 让波形围绕中心点振动**
                ctx.fillStyle = `rgba(50, 255, 100, 0.7)`;
                ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
            }
        };

        renderFrame();
    };

    // **🎵 播放/暂停控制**
    const togglePlay = () => {
        if (!audioRef.current) return;

        // **确保 audioContext 已创建**
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const audioContext = audioContextRef.current;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // **确保 AudioContext 处于 running 状态**
            if (audioContext.state === "suspended") {
                audioContext.resume().then(() => {
                    audioRef.current.play().then(() => {
                        drawVisualizer();
                    });
                });
            } else {
                audioRef.current.play().then(() => {
                    drawVisualizer();
                });
            }
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div
            className="absolute top-[-10px] z-50 left-1/2 cursor-pointer transform -translate-x-1/2"
            onClick={togglePlay}
        >
            {!isPlaying ? (
                <img
                    src={NoteIcon}
                    alt="Music Icon"
                    className="w-10 h-10 filter mx-auto invert hover:scale-120 hover:animate-spin"
                />
            ) : (
                <canvas
                    id={canvasId}
                    title="Click to Play/Pause Music"
                    ref={canvasRef}
                    className="w-[200px] h-[20px] z-50 left-1/2 transform -translate-x-1/2 transition-all duration-500 animate-zoomIn"
                ></canvas>
            )}
            <audio ref={audioRef} src={musicFile} loop={true} />
        </div>
    );
};
AudioVisualizer.propTypes = {
    canvasId: PropTypes.string.isRequired,
    musicFile: PropTypes.string.isRequired,
};

export default AudioVisualizer;
