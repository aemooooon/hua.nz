import ShaderLoadingEffect from "./ShaderLoadingEffect"; // 假设你已经实现了 ShaderLoadingEffect 组件

const Contact = ({ imageSrc, hoverImageSrc }) => {
    return (
        <section className="my-36 mx-12 text-white overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
            {/* 头部：标题和社交媒体图标 */}
            <div className="text-center mb-12">
                <h3 className="text-4xl font-semibold text-primary mb-6">Let&#39;s Work Together!</h3>
                <div className="flex space-x-4 justify-center">
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
                        className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                    >
                        <i className="ri-linkedin-fill"></i>
                    </a>
                    <a
                        href="mailto:aemooooon@gmail.com"
                        rel="noreferrer"
                        className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px] text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                    >
                        <i className="ri-google-fill"></i>
                    </a>
                </div>
            </div>

            {/* 主体部分：左右两栏布局 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* 左边：照片 */}
                <div className="px-8 w-1/2 mx-auto object-cover rounded-lg shadow-lg">
                    <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                </div>

                {/* 右边：表单 */}
                <form className="flex flex-col justify-start items-center p-24 bg-primary rounded-lg shadow-lg">
                    {/* 表单输入 */}
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

                    {/* 提交按钮 */}
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
    );
};

export default Contact;
