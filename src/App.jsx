import { useEffect, useState } from "react";
import * as THREE from "three";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
import { EffectLorenzAttractor } from "./components/EffectLorenzAttractor";
import EffectPixelDistortion from "./components/EffectPixelDistortion";
import EffectHeartBeats from "./components/EffectHeartBeats";
import hua from "./assets/images/hua.jpeg";
import PortfolioCard from "./components/PortfolioCard";
import aqi1 from "./assets/images/aqi/AQI1.jpg";
import aqi2 from "./assets/images/aqi/AQI2.jpg";
import aqi3 from "./assets/images/aqi/AQI3.jpg";
import aqi4 from "./assets/images/aqi/AQI4.jpg";
import aqi5 from "./assets/images/aqi/AQI5.jpg";

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
            <header className="fixed top-0 left-0 w-full pt-20 px-24 z-10 bg-primary-dark text-white flex justify-between items-center">
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
                    <a
                        href="#"
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectfuse");
                            setActiveSection("home");
                        }}
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectmonjori");
                            setActiveSection("project");
                        }}
                    >
                        Project
                    </a>
                    <a
                        href="#"
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectlorenzattractor");
                            setActiveSection("gallery");
                        }}
                    >
                        Gallery
                    </a>
                    <a
                        href="#"
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("effectlorenzattractor");
                            setActiveSection("about");
                        }}
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="font-audiowide text-lg hover:underline underline-offset-8 block lg:inline-block p-2 lg:p-0"
                        onClick={() => {
                            setMenuOpen(false);
                            setCurrentEffect("heartEffect");
                            setActiveSection("contact");
                        }}
                    >
                        Contact
                    </a>
                </nav>
            </header>

            {activeSection === "home" && (
                <section className="flex flex-col lg:flex-row justify-center items-center gap-12 p-36 h-full text-white z-1">
                    <div className="order-2 lg:order-1 text-primary-dark space-y-6 text-center lg:text-left animate-slideIn">
                        <h1 className="text-6xl font-bold font-beauRivage mb-6">Hua Wang</h1>
                        <h2 className="text-3xl font-semibold mb-6 font-mono">Software Engineer / Web Developer / Data Engineer</h2>
                        <p className="mt-4 leading-normal text-lg font-poppins">
                            I am a skilled, detail-oriented and reliable software engineer with 3 years of experience,
                            especially in full-stack development. My expertise includes implementing Web APIs with
                            several languages, building UI/UX based on the modern frontend framework and designing CI/CD
                            pipelines with cloud services.
                        </p>
                        <div className="mt-12 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                            <a
                                href="/Hua_Wang_Software_Engineer.pdf"
                                target="_blank"
                                download={true}
                                className="btn border-solid border-2 border-secondary text-light px-4 py-2 rounded shadow-lg hover:bg-secondary"
                            >
                                Download CV
                            </a>
                            <div className="flex space-x-4">
                                <a
                                    href="https://github.com/aemooooon"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[24px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                                >
                                    <i className="ri-github-fill"></i>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/aemonwang"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                                >
                                    <i className="ri-linkedin-fill"></i>
                                </a>
                                <a
                                    href="mailto:aemooooon@gmail.com"
                                    rel="noreferrer"
                                    className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                                >
                                    <i className="ri-google-fill"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 animate-zoomIn">
                        <div className="relative w-[25vw] h-[25vw] border-4 border-secondary rounded-full shadow-md overflow-hidden bg-light animate-hueRotate">
                            <EffectPixelDistortion
                                src={hua}
                                style={{ width: "100%", height: "100%", cursor: "all-scroll" }}
                            />
                        </div>
                    </div>
                </section>
            )}

            {activeSection === "about" && (
                <section className="flex justify-center items-center p-12 h-full text-white">
                    <h1>About Section Placeholder</h1>
                </section>
            )}

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

            {activeSection === "gallery" && (
                <section className="flex justify-center items-center p-12 h-full text-white">
                    <h1>Gallery</h1>
                </section>
            )}

            {activeSection === "contact" && (
                <section className="py-8 lg:py-20 h-full text-white">
                    <div className="flex justify-center items-center h-full">
                        <form className="flex flex-col justify-center items-center w-full max-w-4xl">
                            <h3 className="text-4xl font-semibold text-primary mb-12">Let&#39;s Work Together!</h3>
                            <div className="flex space-x-4 justify-center items-center mb-12">
                                <a
                                    href="https://github.com/aemooooon"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[24px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                                >
                                    <i className="ri-github-fill"></i>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/aemonwang"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                                >
                                    <i className="ri-linkedin-fill"></i>
                                </a>
                                <a
                                    href="mailto:aemooooon@gmail.com"
                                    rel="noreferrer"
                                    className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                                >
                                    <i className="ri-google-fill"></i>
                                </a>
                            </div>
                            <div className="flex flex-wrap gap-6 w-full">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    className="flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    className="flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    required
                                    className="flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Email Subject"
                                    required
                                    className="flex-1 min-w-[20rem] p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    required
                                    className="w-full p-4 bg-gray-800 rounded-md text-lg text-white placeholder-gray-400 resize-none h-40 focus:ring-2 focus:ring-primary focus:outline-none"
                                ></textarea>
                            </div>
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="btn bg-secondary text-light px-8 py-3 rounded font-semibold shadow-lg hover:bg-accent transition-all"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
};

export default App;
