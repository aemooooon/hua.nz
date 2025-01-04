import { useEffect } from "react";
import { WebGLBackground } from "./webGLBackground";
import hua from "./assets/images/hua.jpeg";
import "./styles/App.css";

const App = () => {
    useEffect(() => {
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

        const webglBackground = new WebGLBackground(params);
        webglBackground.start();

        return () => {};
    }, []);
    
    return (
        <>
            <header className="animated">
                <a href="/" className="logo audiowide-regular">
                    Portfolio.
                </a>
                <nav className="navbar">
                    <a href="" className="active">
                        Home
                    </a>
                    <a href="">Project</a>
                    <a href="">About</a>
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
                        <img src={hua} alt="" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default App;
