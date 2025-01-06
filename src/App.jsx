import { useEffect, useState } from "react";
import * as THREE from "three";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
import { EffectLorenzAttractor } from "./components/EffectLorenzAttractor";
import EffectPixelDistortion from "./components/EffectPixelDistortion";
import EffectHeartBeats from "./components/EffectHeartBeats";
import hua from "./assets/images/hua.jpeg";

const App = () => {
    const [currentEffect, setCurrentEffect] = useState("effectfuse");
    const [menuOpen, setMenuOpen] = useState(false);

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
                brightness: 0.6,
                blobiness: 1.5,
                particles: 37,
                energy: 1.01,
                scanlines: true,
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
            <header className="fixed top-0 left-0 w-full p-12 z-10 bg-primary-dark text-white flex justify-between items-center animate-slideIn">
                <span
                    className="text-2xl font-bold font-audiowide cursor-pointer"
                    onClick={() => setCurrentEffect("effectfuse")}
                >
                    Portfolio.
                </span>
                <div className="lg:hidden">
                    <button className="text-3xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
                        &#9776;
                    </button>
                </div>
                <nav
                    className={`lg:flex space-x-4 absolute lg:static top-[60px] left-0 bg-primary-dark w-full lg:w-auto lg:bg-transparent flex-col lg:flex-row items-center text-center transition-transform duration-300 transform lg:translate-x-0 ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <a
                        href="#"
                        className="hover-effect block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectfuse");
                        }}
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="hover-effect block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectlorenzattractor");
                        }}
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="hover-effect block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectmonjori");
                        }}
                    >
                        Project
                    </a>
                    <a
                        href="#"
                        className="hover-effect block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("heartEffect");
                        }}
                    >
                        Contact
                    </a>
                </nav>
            </header>

            <section className="flex flex-col lg:flex-row justify-center items-center gap-12 p-12 h-full animate-slideIn text-white z-1">
                <div className="order-2 lg:order-1 text-primary-dark space-y-6 text-center lg:text-left">
                    <h1 className="text-6xl font-bold font-beauRivage mb-6">Hua Wang</h1>
                    <h2 className="text-3xl font-semibold mb-6 font-mono">Web Developer / Data Engineer</h2>
                    <p className="mt-4 leading-normal text-lg font-poppins">
                        I am a skilled and reliable software engineer with over 4 years of experience specializing in
                        full stack development. My expertise includes building scalable APIs, integrating with cloud
                        services, and designing CI/CD pipelines.
                    </p>
                    <div className="mt-12 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                        <a
                            href="#"
                            className="btn bg-primary text-light px-4 py-2 rounded shadow-lg hover:bg-secondary"
                        >
                            Download CV
                        </a>
                        <div className="social-icons flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-primary inline-flex items-center justify-center p-2 border-1 border-primary rounded-full text-[20px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                            >
                                <i className="ri-github-fill"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-primary inline-flex items-center justify-center p-2 border-1 border-primary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                            >
                                <i className="ri-linkedin-fill"></i>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-primary inline-flex items-center justify-center p-2 border-1 border-primary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                            >
                                <i className="ri-google-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <div className="relative w-[25vw] h-[25vw] border-4 border-primary-dark rounded-full shadow-md overflow-hidden bg-light animate-hueRotate">
                        <EffectPixelDistortion
                            src={hua}
                            style={{ width: "100%", height: "100%", cursor: "all-scroll" }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default App;
