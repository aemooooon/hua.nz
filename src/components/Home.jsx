import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ShaderLoadingEffect from "./ShaderLoadingEffect"; // 假设你已经实现了 ShaderLoadingEffect 组件
import imageSrc from "./hua_icon_base64";
import hoverImageSrc from "../assets/images/hua_500w1.jpg";
import portfolioMusic from "../assets/audio.mp3";

const Home = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.volume = 0.6;
        }

        return () => {
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    return (
        <section className="flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-12 p-8 sm:p-12 md:p-24 lg:p-36 h-full z-1 fixed top-0 left-0 w-full">
            <div className="order-2 lg:order-1 text-white space-y-4 sm:space-y-6 text-center lg:text-left animate-slideIn">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-beauRivage mb-4 sm:mb-6">Hua Wang</h1>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 font-mono">Software Engineer</h2>
                <p className="mt-2 sm:mt-4 leading-normal text-base sm:text-lg font-poppins">
                    I am a skilled, detail-oriented and reliable software engineer with 3 years of experience,
                    especially in full-stack development. My expertise includes implementing Web APIs with several
                    languages, building UI/UX based on the modern frontend framework and designing CI/CD pipelines with
                    cloud services.
                </p>
                <div className="mt-8 sm:mt-12 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
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
                            className="w-8 h-8 sm:w-10 sm:h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px] sm:text-[24px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                        >
                            <i className="ri-github-fill"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aemonwang"
                            target="_blank"
                            rel="noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[18px] sm:text-[20px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                        >
                            <i className="ri-linkedin-fill"></i>
                        </a>
                        <a
                            href="mailto:aemooooon@gmail.com"
                            rel="noreferrer"
                            className="w-8 h-8 sm:w-10 sm:h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[18px] sm:text-[20px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                        >
                            <i className="ri-google-fill"></i>
                        </a>
                        <audio ref={audioRef} src={portfolioMusic} preload="auto" />
                    </div>
                </div>
            </div>

            <div className="order-1 lg:order-2 animate-zoomIn">
                <div onClick={togglePlay} className="relative w-[25vw] h-[25vw] max-w-[500px] max-h-[500px] border-4 border-secondary rounded-full shadow-md overflow-hidden bg-light animate-hueRotate">
                    <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                </div>
            </div>
        </section>
    );
};
Home.propTypes = {
    hua: PropTypes.string.isRequired,
};

export default Home;
