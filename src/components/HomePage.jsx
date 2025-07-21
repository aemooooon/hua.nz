import { Suspense, lazy } from "react";
import { useApp } from "../contexts/AppContext";
import imageSrc from "./hua_icon_base64";
import hoverImageSrc from "../assets/images/hua_500w1.jpg";
import { FaSpinner } from "react-icons/fa";

const ShaderLoadingEffect = lazy(() => import("./ShaderLoadingEffect"));

const HomePage = () => {
    const { content } = useApp();

    return (
        <section className="flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-12 p-6 sm:p-8 md:p-12 lg:p-16 h-full fixed top-0 left-0 w-full z-10">
            {/* 文字内容区域 */}
            <div className="order-2 lg:order-1 text-white space-y-6 text-center lg:text-left animate-slideIn content-section p-8 max-w-2xl">
                <h1 
                    className="font-bold font-beauRivage mb-6 text-white" 
                    style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
                >
                    {content.home.name}
                </h1>
                
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold mb-6 font-mono text-green-300">
                    {content.home.title}
                </h2>
                
                <div className="text-enhanced p-6">
                    <p className="leading-relaxed text-lg font-poppins text-gray-100">
                        {content.home.shortBio}
                    </p>
                </div>

                <div className="text-enhanced p-6">
                    <p className="leading-relaxed text-base font-poppins text-gray-200">
                        {content.home.description}
                    </p>
                </div>

                {/* 位置信息 */}
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-green-400">
                    <span className="text-xl">📍</span>
                    <span className="text-lg">{content.home.location}</span>
                </div>
            </div>

            {/* 头像区域 */}
            <div className="order-1 lg:order-2 animate-zoomIn">
                <div className="relative w-[35vw] h-[35vw] md:w-[30vw] md:h-[30vw] max-w-[400px] max-h-[400px] border-4 border-secondary rounded-full shadow-2xl overflow-hidden bg-light animate-hueRotate">
                    <Suspense 
                        fallback={
                            <div className="w-full h-full flex items-center justify-center">
                                <FaSpinner className="animate-spin text-green-500 text-4xl" />
                            </div>
                        }
                    >
                        <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default HomePage;
