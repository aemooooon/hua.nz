import { useEffect, useState } from "react";
import * as THREE from "three";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
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
            newCanvas.style.zIndex = "-10";
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
            <div
                className="text-2xl font-bold font-audiowide text-white fixed top-0 right-0 mt-6 mr-12 cursor-pointer z-10"
                onClick={() => {
                    setCurrentEffect("effectmonjori");
                    setActiveSection("project");
                }}
                style={{display: activeSection === "home" ? "block" : "none"}}
            >
                about me
            </div>

            {activeSection === "home" && <Home hua={hua} />}

            {activeSection === "project" && <Project setActiveSection={setActiveSection} setCurrentEffect={setCurrentEffect} />}
        </>
    );
};

export default App;
