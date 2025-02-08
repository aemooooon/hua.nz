import ShaderLoadingEffect from "./ShaderLoadingEffect";
import hua_icon_base64 from "./hua_icon_base64";

const About = () => {
    const imageSrc = hua_icon_base64;

    return (
        <>
            <section className="flex flex-col md:flex-row justify-center items-center p-12 h-full text-white gap-6">
                {/* 第一栏 */}
                <div className="w-full md:w-1/3 h-[50vh] md:h-[60vh] flex justify-center items-center overflow-hidden rounded-lg shadow-lg">
                    <div className="p-4">
                        <ShaderLoadingEffect imageSrc={imageSrc} />
                    </div>
                </div>

                {/* 第二栏 */}
                <div className="bg-white/10 backdrop-blur border-white/38 w-full md:w-1/3 h-[50vh] md:h-[60vh] font-beauRivage text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white-600 leading-relaxed tracking-wide text-justify p-8 rounded-lg shadow-lg overflow-y-auto">
                    Most of my works and projects are in the realm of Web Development. Some of these projects adhere to
                    older practices predating ES6, employing a tech stack that broadly includes frontend technologies
                    like Jquery and AJAX, and backend technologies such as ASP, PHP, and traditional ASP.NET. During
                    this period, the primary focus was on creating official websites for businesses and organizations,
                    as well as general information publishing systems and backend management platforms.
                </div>

                {/* 第三栏 */}
                <div className="bg-white/10 backdrop-blur border-white/38 w-full md:w-1/3 h-[50vh] md:h-[60vh] font-beauRivage text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white-600 leading-relaxed tracking-wide text-justify p-8 rounded-lg shadow-lg overflow-y-auto">
                    Most of my works and projects are in the realm of Web Development. Some of these projects adhere to
                    older practices predating ES6, employing a tech stack that broadly includes frontend technologies
                    like Jquery and AJAX, and backend technologies such as ASP, PHP, and traditional ASP.NET. During
                    this period, the primary focus was on creating official websites for businesses and organizations,
                    as well as general information publishing systems and backend management platforms.
                </div>
            </section>
        </>
    );
};

export default About;
