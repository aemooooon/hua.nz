import ShaderLoadingEffect from "./ShaderLoadingEffect"; // 假设你已经实现了 ShaderLoadingEffect 组件
import PropTypes from "prop-types";

const Contact = ({ imageSrc, hoverImageSrc }) => {
    return (
        <section className="my-12 mx-4 sm:my-24 sm:mx-8 md:my-36 md:mx-12 text-white">
            {/* 头部：标题和社交媒体图标 */}
            <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-4 sm:mb-6">
                    Let&#39;s Work Together!
                </h3>
                <div className="flex space-x-4 justify-center">
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
                </div>
            </div>

            {/* 主体部分：左右两栏布局 */}
            <div
                className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-8 p-4 sm:p-6 "
                style={{ maxHeight: "calc(100vh - 200px)" }}
            >
                {/* 左边：照片 */}
                <div className="px-4 w-full h-[200px] sm:h-[200px] md:h-auto">
                    {" "}
                    {/* 设置固定高度 */}
                    <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                </div>

                {/* 右边：表单 */}
                <div className="justify-around items-center mx-auto w-full text-center">
                    <form className="md:w-2/3 md:mx-auto p-8 sm:p-4 md:p-6 bg-primary rounded-lg shadow-lg">
                        {/* 表单输入 */}
                        <div className="flex flex-col gap-4 sm:gap-6 w-full">
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full p-3 sm:p-4 bg-gray-800 rounded-md text-base sm:text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full p-3 sm:p-4 bg-gray-800 rounded-md text-base sm:text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                required
                                className="w-full p-3 sm:p-4 bg-gray-800 rounded-md text-base sm:text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Email Subject"
                                required
                                className="w-full p-3 sm:p-4 bg-gray-800 rounded-md text-base sm:text-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <textarea
                                placeholder="Your Message"
                                required
                                className="w-full p-3 sm:p-4 bg-gray-800 rounded-md text-base sm:text-lg text-white placeholder-gray-400 resize-none h-32 sm:h-40 focus:ring-2 focus:ring-primary focus:outline-none"
                            ></textarea>
                        </div>

                        {/* 提交按钮 */}
                        <div className="mt-6 sm:mt-8">
                            <button
                                type="submit"
                                className="btn bg-secondary text-light px-6 sm:px-8 py-2 sm:py-3 rounded font-semibold shadow-lg hover:bg-accent transition-all"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
Contact.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    hoverImageSrc: PropTypes.string.isRequired,
};

export default Contact;
