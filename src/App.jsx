import { useEffect, Suspense, lazy } from "react";
import * as THREE from "three";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
import EffectHeartBeats from "./components/EffectHeartBeats";
import { EffectLorenzAttractor } from "./components/EffectLorenzAttractor";
import NavigationCube from "./components/NavigationCube";
import AudioController from "./components/AudioController";
import ThemeLanguageToggle from "./components/ThemeLanguageToggle";
import { AppProvider, useApp } from "./contexts/AppContext";
import portfolioMusic from "./assets/audio.mp3";
import { debounce } from "lodash";
import { FaSpinner } from "react-icons/fa";

// 懒加载组件
const HomePage = lazy(() => import("./components/HomePage"));
const Project = lazy(() => import("./components/Project"));
const Gallery = lazy(() => import("./components/Gallery"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const BlogPage = lazy(() => import("./components/BlogPage"));
const AudioVisualizer = lazy(() => import("./components/AudioVisualizer"));

const AppContent = () => {
    const { currentEffect, activeSection, content } = useApp();

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
                const { r, g, b } = color;
                return { r, g, b };
            });
        }

        const threeColors = [
            new THREE.Color(0x1d2012),
            new THREE.Color(0xafcc8f),
            new THREE.Color(0x7ca65c),
            new THREE.Color(0x5d7d4b),
            new THREE.Color(0x768e90),
        ];
        const rgbColors = convertColorsToRGBFormat(threeColors);

        // 清理之前的效果
        if (effectInstance?.stop) {
            effectInstance.stop();
        }
        if (canvas?.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }

        // 创建新效果
        canvas = createCanvas();
        
        switch (currentEffect) {
            case "effectfuse": {
                const fuseParams = {
                    brightness: 0.61,
                    blobiness: 1.6,
                    particles: 16,
                    energy: 1.11,
                    scanlines: false,
                    colors: rgbColors,
                };
                effectInstance = new EffectFuse(canvas, fuseParams);
                effectInstance.start();
                break;
            }
                
            case "effectmonjori": {
                const monjoriParams = {
                    animationSpeed: 0.6,
                    colors: threeColors,
                };
                effectInstance = new EffectMonjori(canvas, monjoriParams);
                break;
            }
                
            case "effectheartbeats":
                effectInstance = new EffectHeartBeats(canvas);
                break;
                
            case "effectlorenz":
                effectInstance = new EffectLorenzAttractor(canvas);
                break;
                
            default: {
                const defaultParams = {
                    brightness: 0.61,
                    blobiness: 1.6,
                    particles: 16,
                    energy: 1.11,
                    scanlines: false,
                    colors: rgbColors,
                };
                effectInstance = new EffectFuse(canvas, defaultParams);
                effectInstance.start();
                break;
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

    const renderActiveSection = () => {
        const LoadingSpinner = (
            <div className="w-full h-full flex justify-center items-center z-[9999]">
                <FaSpinner className="animate-spin text-green-500 text-4xl" />
                <p className="mt-4 text-green-400">{content.ui.loading}</p>
            </div>
        );

        switch (activeSection) {
            case "home":
                return (
                    <Suspense fallback={LoadingSpinner}>
                        <HomePage />
                    </Suspense>
                );
            case "projects":
                return (
                    <Suspense fallback={LoadingSpinner}>
                        <Project setActiveSection={() => {}} setCurrentEffect={() => {}} />
                    </Suspense>
                );
            case "gallery":
                return (
                    <Suspense fallback={LoadingSpinner}>
                        <Gallery />
                    </Suspense>
                );
            case "contact":
                return (
                    <Suspense fallback={LoadingSpinner}>
                        <ContactPage />
                    </Suspense>
                );
            case "about":
                return (
                    <Suspense fallback={LoadingSpinner}>
                        <AboutPage />
                    </Suspense>
                );
            case "blog":
                return (
                    <Suspense fallback={LoadingSpinner}>
                        <BlogPage />
                    </Suspense>
                );
            default:
                return (
                    <Suspense fallback={LoadingSpinner}>
                        <HomePage />
                    </Suspense>
                );
        }
    };

    return (
        <div className="dark:bg-background-dark bg-background-light dark:text-foreground-dark text-foreground-light min-h-screen transition-colors duration-300">
            {/* 3D导航立方体 */}
            <NavigationCube />

            {/* 音频控制器 */}
            <AudioController />

            {/* 主题和语言切换 */}
            <ThemeLanguageToggle />

            {/* 音频可视化器 */}
            <Suspense fallback={null}>
                <AudioVisualizer canvasId="audioCanvas" musicFile={portfolioMusic} />
            </Suspense>

            {/* 当前活动的内容组件 */}
            {renderActiveSection()}
        </div>
    );
};

const App = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;
