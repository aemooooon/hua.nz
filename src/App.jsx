import { useEffect, useState } from "react";
import * as THREE from "three";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
import { EffectLorenzAttractor } from "./components/EffectLorenzAttractor";
import EffectHeartBeats from "./components/EffectHeartBeats";
import hua from "./assets/images/hua.jpeg";
import PortfolioCard from "./components/PortfolioCard";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import aqi1 from "./assets/images/aqi/AQI1.jpg";
import aqi2 from "./assets/images/aqi/AQI2.jpg";
import aqi3 from "./assets/images/aqi/AQI3.jpg";
import aqi4 from "./assets/images/aqi/AQI4.jpg";
import aqi5 from "./assets/images/aqi/AQI5.jpg";
import imageSrc from "./components/hua_icon_base64";
import hoverImageSrc from "./assets/images/hua_500w1.jpg";

const App = () => {
    const [currentEffect, setCurrentEffect] = useState("effectfuse");
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const portfolioData = [
        {
            title: "Frontend Project",
            description: "Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",
            techUsed: "HTML5, CSS3, JavaScript",
            imgSrc: aqi1,
        },
        {
            title: "Full Stack Project",
            description: "Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",
            techUsed: "Next.js, Tailwind.css, Node.js",
            imgSrc: aqi2,
        },
        {
            title: "Frontend Project",
            description: "Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",
            techUsed: "React.js, Tailwind.css",
            imgSrc: aqi3,
        },
        {
            title: "Frontend Project",
            description: "Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",
            techUsed: "HTML5, Bootstrap, JavaScript",
            imgSrc: aqi4,
        },
        {
            title: "Frontend Project",
            description: "Lorem ipsum dolor sit amet consectetur volup adipisicing elit. Placeat el voluptatem.",
            techUsed: "Next.js, Tailwind.css",
            imgSrc: aqi5,
        },
    ];

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
            <header className="fixed top-0 left-0 w-full pt-10 px-10 z-10 bg-primary-dark text-white flex justify-between items-center">
                <span
                    className="text-2xl font-bold font-audiowide cursor-pointer animate-slideIn"
                    onClick={() => {
                        setCurrentEffect("effectfuse");
                        setActiveSection("home");
                    }}
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
                    <button
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectfuse");
                            setActiveSection("home");
                        }}
                    >
                        Home
                    </button>
                    <button
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectmonjori");
                            setActiveSection("project");
                        }}
                    >
                        Project
                    </button>
                    <button
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectlorenzattractor");
                            setActiveSection("about");
                        }}
                    >
                        About
                    </button>
                    <button
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("heartEffect");
                            setActiveSection("contact");
                        }}
                    >
                        Contact
                    </button>
                </nav>
            </header>

            {activeSection === "home" && <Home hua={hua} />}

            {activeSection === "about" && <About />}

            {activeSection === "project" && (
                <section
                    className="my-36 mx-12 text-white overflow-y-auto"
                    style={{ maxHeight: "calc(100vh - 300px)" }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
                        {portfolioData.map((item, index) => (
                            <PortfolioCard key={index} {...item} />
                        ))}
                    </div>
                </section>
            )}

            {activeSection === "contact" && <Contact imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />}
        </>
    );
};

export default App;
