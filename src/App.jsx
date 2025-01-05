import { useEffect, useState } from "react";
import { EffectFuse } from "./components/EffectFuse";
import { EffectMonjori } from "./components/EffectMonjori";
import EffectPixelDistortion from "./components/EffectPixelDistortion";
import EffectHeartBeats from "./components/EffectHeartBeats";
import hua from "./assets/images/hua.jpeg";
import "./styles/App.css";

const App = () => {
    const [currentEffect, setCurrentEffect] = useState("effectfuse");

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

        if (currentEffect === "effectfuse") {
            canvas = createCanvas();
            const params = {
                brightness: 0.6,
                blobiness: 1.5,
                particles: 10,
                energy: 1.01,
                scanlines: true,
                colors: [
                    { r: 1, g: 0, b: 0 },
                    { r: 0, g: 1, b: 0 },
                    { r: 0, g: 0, b: 1 },
                    { r: 1, g: 1, b: 0 },
                    { r: 0, g: 1, b: 1 },
                    { r: 1, g: 0, b: 1 },
                ],
            };
            effectInstance = new EffectFuse(canvas, params);
            effectInstance.start();
        } else if (currentEffect === "effectmonjori") {
            canvas = createCanvas();
            const params = { animationSpeed: 0.618 };
            effectInstance = new EffectMonjori(canvas, params);
        } else if (currentEffect === "effectlorenzattractor") {
            canvas = createCanvas();
            import("./components/EffectLorenzAttractor").then(({ EffectLorenzAttractor }) => {
                effectInstance = new EffectLorenzAttractor(canvas);
            });
        } else if (currentEffect === "heartEffect") {
            canvas = createCanvas();
            const params = {
                width: 180,
                height: 130,
                color: "#ff69b4", // Customizable heart color
                particles: {
                    length: 500,
                    duration: 2,
                    velocity: 120,
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
            <header className="animated">
                <a href="/" className="logo audiowide-regular" onClick={() => setCurrentEffect("bgshader01")}>
                    Portfolio.
                </a>
                <nav className="navbar">
                    <a href="" className="active" onClick={() => setCurrentEffect("effectfuse")}>
                        Home
                    </a>
                    <a href="#" onClick={() => setCurrentEffect("effectlorenzattractor")}>
                        About
                    </a>
                    <a href="#" onClick={() => setCurrentEffect("effectmonjori")}>
                        Project
                    </a>
                    <a href="#" onClick={() => setCurrentEffect("heartEffect")}>
                        Contact
                    </a>
                </nav>
            </header>

            <section className="home animated">
                <div className="home-detail">
                    <h1 className="beau-rivage-regular mb-6">Hua Wang</h1>
                    <h2>Web Developer / Data Engineer</h2>
                    <p>
                        I am a skilled and reliable software engineer with over 4 years of experience specializing in
                        full stack development. My expertise includes building scalable APIs with several languages,
                        integrating with cloud services, and designing CI/CD pipelines. I am passionate about solving
                        complex problems, optimizing performance, and collaborating across teams to deliver high-quality
                        software solutions.
                    </p>
                    <div className="download-social">
                        <a href="#" className="btn">
                            Download CV
                        </a>
                        <div className="social-icons">
                            <a href="#">
                                <i className="ri-github-fill"></i>
                            </a>
                            <a href="#">
                                <i className="ri-linkedin-fill"></i>
                            </a>
                            <a href="#">
                                <i className="ri-google-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="home-img">
                    <div className="img-box">
                        {/* <ParticleImageEffect png={pngBase64} /> */}
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
