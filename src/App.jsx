import React, { useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
import Home from "./components/Home";
import portfolioMusic from "./assets/audio.mp3";
import { debounce } from "lodash";
const Project = React.lazy(() => import("./components/Project"));
const AudioVisualizer = React.lazy(() => import("./components/AudioVisualizer"));

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

        const handleResize = debounce(() => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                if (effectInstance?.onResize) {
                    effectInstance.onResize(window.innerWidth, window.innerHeight);
                }
            }
        }, 200);

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
            if (!effectInstance) {
                effectInstance = new EffectFuse(canvas, params);
                effectInstance.start();
            }
        } else if (currentEffect === "effectmonjori") {
            canvas = createCanvas();
            const params = {
                animationSpeed: 0.6,
                colors: threeColors,
            };
            if (!effectInstance) {
                effectInstance = new EffectMonjori(canvas, params);
            }
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            if (effectInstance?.stop) {
                effectInstance.stop();
            }
            if (canvas?.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, [currentEffect]);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <AudioVisualizer canvasId="audioCanvas" musicFile={portfolioMusic} />{" "}
            </Suspense>
            {activeSection === "home" && (
                <Home setActiveSection={setActiveSection} setCurrentEffect={setCurrentEffect} />
            )}
            {activeSection === "project" && (
                <Suspense fallback={<div>Loading...</div>}>
                    <Project setActiveSection={setActiveSection} setCurrentEffect={setCurrentEffect} />
                </Suspense>
            )}
        </>
    );
};

export default App;
