import { useEffect, useRef, useState } from "react";

const AudioVisualizer = ({ canvasId, musicFile }) => {
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const sourceRef = useRef(null);
    const animationRef = useRef(null);
    const staticAnimationRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Tailwind 颜色数组
    const colors = [
        "#1d2012", // primaryDark
        "#afcc8f", // primary
        "#7ca65c", // secondary
        "#5d7d4b", // accent
        "#768e90", // muted
    ];

    const [currentColor, setCurrentColor] = useState("transparent"); // 初始背景透明

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

        drawMusicSymbol(); // 默认显示音乐符号

        return () => {
            cancelAnimationFrame(animationRef.current);
            cancelAnimationFrame(staticAnimationRef.current);
        };
    }, []);

    // **🎵 绘制音乐符号（白色，透明背景）**
    const drawMusicSymbol = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "transparent"; // **透明背景**
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.lineWidth = 5;

        // **🎵 画八分音符（优化版）**
        const noteWidth = 16;
        const noteHeight = 8;
        const stemHeight = 50;
        const offsetX = canvas.width / 2;
        const offsetY = canvas.height / 2 + 30;

        // **音符头（椭圆）**
        ctx.beginPath();
        ctx.ellipse(offsetX - 20, offsetY, noteWidth, noteHeight, Math.PI / 8, 0, Math.PI * 2);
        ctx.ellipse(offsetX + 20, offsetY - 5, noteWidth, noteHeight, Math.PI / 8, 0, Math.PI * 2);
        ctx.fill();

        // **音符竖线**
        ctx.beginPath();
        ctx.moveTo(offsetX - 20, offsetY);
        ctx.lineTo(offsetX - 20, offsetY - stemHeight);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(offsetX + 20, offsetY - 5);
        ctx.lineTo(offsetX + 20, offsetY - stemHeight - 5);
        ctx.stroke();

        // **音符的横杆（连接竖线的曲线）**
        ctx.beginPath();
        ctx.moveTo(offsetX - 20, offsetY - stemHeight);
        ctx.quadraticCurveTo(offsetX + 40, offsetY - stemHeight - 12, offsetX + 20, offsetY - stemHeight - 5);
        ctx.stroke();
    };

    // **🎨 音频可视化**
    const drawVisualizer = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const analyser = analyserRef.current;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const renderFrame = () => {
            animationRef.current = requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // **渐变背景**
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, currentColor);
            gradient.addColorStop(1, "#171f2b");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // **对称绘制音频条**
            const barWidth = (canvas.width / bufferLength) * 2;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = dataArray[i] * 1.2;
                const r = Math.min(255, barHeight * 2);
                const g = 255 - barHeight;
                const b = barHeight + 50;

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;

                // **上部分**
                ctx.fillRect(i * barWidth, canvas.height / 2 - barHeight / 2, barWidth, barHeight / 2);
                // **下部分（镜像对称）**
                ctx.fillRect(i * barWidth, canvas.height / 2, barWidth, barHeight / 2);
            }
        };

        renderFrame();
    };

    // **🎵 播放/暂停控制**
    const togglePlay = () => {
        if (!audioRef.current) return;
        const audioContext = audioContextRef.current;

        if (isPlaying) {
            audioRef.current.pause();
            cancelAnimationFrame(animationRef.current);
            setCurrentColor("transparent"); // **停止时恢复透明背景**
            drawMusicSymbol();
        } else {
            audioContext.resume().then(() => {
                audioRef.current.play();
                cancelAnimationFrame(staticAnimationRef.current);
                setCurrentColor(colors[Math.floor(Math.random() * colors.length)]); // **播放时切换背景颜色**
                drawVisualizer();
            });
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div
            className="absolute top-[-20px] z-50 left-1/2 cursor-pointer transform -translate-x-1/2"
            onClick={togglePlay}
        >
            <canvas
                id={canvasId}
                title="Click to Play/Pause Music"
                ref={canvasRef}
                className="w-[60px] h-[40px] z-50 rounded-3xl hover:border-4 hover:border-primary transition-all duration-1000 bg-transparent"
            ></canvas>
            <audio ref={audioRef} src={musicFile} loop={true} />
        </div>
    );
};

export default AudioVisualizer;
