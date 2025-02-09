import { useEffect, useState } from "react";
import * as THREE from "three";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
import { EffectLorenzAttractor } from "./components/EffectLorenzAttractor";
import EffectHeartBeats from "./components/EffectHeartBeats";
import EffectPixelDistortion from "./components/EffectPixelDistortion";
import hua from "./assets/images/hua.jpeg";
import Home from "./components/Home";
import Project from "./components/Project";

const App = () => {
    const [currentEffect, setCurrentEffect] = useState("effectfuse");
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        let effectInstance;
        let canvas;

        const createCanvas = () => {
            const newCanvas = document.createElement("canvas");
            newCanvas.style.position = "fixed";
            newCanvas.style.top = "0";
            newCanvas.style.left = "0";
            newCanvas.style.width = "100%";
            newCanvas.style.height = "100%";
            newCanvas.style.zIndex = "-1";
            document.body.appendChild(newCanvas);
            return newCanvas;
        };

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // If the effectInstance has a method to handle resizing
                if (effectInstance && effectInstance.onResize) {
                    effectInstance.onResize(window.innerWidth, window.innerHeight);
                }
            }
        };

        function convertColorsToRGBFormat(colors) {
            return colors.map((color) => {
                const { r, g, b } = color; // THREE.Color 已经将颜色存储为 0-1 范围的浮点数
                return { r, g, b };
            });
        }

        const threeColors = [
            new THREE.Color(0x1d2012), // 深绿色
            new THREE.Color(0xafcc8f), // 浅绿色
            new THREE.Color(0x7ca65c), // 中绿色
            new THREE.Color(0x5d7d4b), // 次中绿色
            new THREE.Color(0x768e90), // 蓝绿色
        ];
        const rgbColors = convertColorsToRGBFormat(threeColors);

        if (currentEffect === "effectfuse") {
            canvas = createCanvas();
            const params = {
                brightness: 0.61,
                blobiness: 1.6,
                particles: 16,
                energy: 1.11,
                scanlines: false,
                colors: rgbColors,
            };
            effectInstance = new EffectFuse(canvas, params);
            effectInstance.start();
        } else if (currentEffect === "effectmonjori") {
            canvas = createCanvas();
            const params = {
                animationSpeed: 0.618,
                colors: threeColors,
            };
            effectInstance = new EffectMonjori(canvas, params);
        } else if (currentEffect === "effectlorenzattractor") {
            canvas = createCanvas();
            const params = {
                fireballColor: new THREE.Color(0xafcc8f),
                particleColors: threeColors,
            };
            effectInstance = new EffectLorenzAttractor(canvas, params);
            effectInstance.start();
        } else if (currentEffect === "heartEffect") {
            canvas = createCanvas();
            const params = {
                width: 180,
                height: 130,
                color: "#7CA65C",
                particles: {
                    length: 600,
                    duration: 2,
                    velocity: 300,
                    effect: -0.8,
                    size: 25,
                },
            };
            effectInstance = new EffectHeartBeats(canvas, params);
            effectInstance.start();
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            if (effectInstance && effectInstance.stop) {
                effectInstance.stop();
            }
            if (canvas) {
                document.body.removeChild(canvas);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, [currentEffect]);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-10 bg-primary-dark text-white flex justify-between items-center">
                <div
                    className="animate-zoomIn cursor-pointer"
                    onClick={() => {
                        setCurrentEffect("effectfuse");
                        setActiveSection("home");
                    }}
                >
                    <div className="relative w-[60px] h-[60px] mt-4 ml-4 border-4 border-secondary rounded-full shadow-md overflow-hidden bg-light animate-hueRotate">
                        <EffectPixelDistortion src={hua} />
                    </div>
                </div>
                <div
                    className="text-2xl font-bold font-audiowide pr-12 cursor-pointer animate-slideIn"
                    onClick={() => {
                        setCurrentEffect("effectmonjori");
                        setActiveSection("project");
                    }}
                >
                    Portfolio.
                </div>
            </header>

            {activeSection === "home" && <Home hua={hua} />}

            {activeSection === "project" && <Project />}
        </>
    );
};

export default App;
