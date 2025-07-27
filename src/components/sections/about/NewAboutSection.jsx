import { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { FaSpinner, FaChevronDown } from 'react-icons/fa';

const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect'));

const AboutSection = ({ language, onPageChange, currentPage = 0 }) => {
    const [localPage, setLocalPage] = useState(currentPage);
    
    // About页面的内容配置
    const aboutPages = [
        {
            id: 'statement',
            title: { en: 'Personal Statement', zh: '个人陈述' },
            content: {
                en: (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">Hello, I&apos;m Hua Wang</h2>
                        <p className="text-lg leading-relaxed text-gray-200">
                            A passionate full-stack developer with expertise in modern web technologies. 
                            I specialize in creating beautiful, functional, and user-centric digital experiences 
                            that bridge the gap between design and technology.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-200">
                            My journey in software development spans across frontend frameworks like React and Vue, 
                            backend technologies including Node.js and Python, and emerging fields like WebGL, 
                            Three.js, and AI integration.
                        </p>
                        <div className="flex items-center space-x-4 pt-4">
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-green-400">Available for opportunities</span>
                            </div>
                        </div>
                    </div>
                ),
                zh: (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">你好，我是王华</h2>
                        <p className="text-lg leading-relaxed text-gray-200">
                            一位充满热情的全栈开发者，精通现代Web技术。我专注于创建美观、实用且以用户为中心的数字体验，
                            在设计与技术之间架起桥梁。
                        </p>
                        <p className="text-lg leading-relaxed text-gray-200">
                            我的软件开发之旅涵盖了React和Vue等前端框架、Node.js和Python等后端技术，
                            以及WebGL、Three.js和AI集成等新兴领域。
                        </p>
                        <div className="flex items-center space-x-4 pt-4">
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-green-400">开放工作机会</span>
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            id: 'experience',
            title: { en: 'Professional Experience', zh: '工作经历' },
            content: {
                en: (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-6">Professional Journey</h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-blue-500">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-white">Senior Full-Stack Developer</h3>
                                    <span className="text-blue-400 text-sm">2022 - Present</span>
                                </div>
                                <p className="text-gray-300 mb-2">Tech Innovation Company</p>
                                <ul className="text-gray-200 space-y-1">
                                    <li>• Led development of AI-powered web applications</li>
                                    <li>• Implemented real-time data visualization systems</li>
                                    <li>• Mentored junior developers and established coding standards</li>
                                </ul>
                            </div>
                            
                            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-green-500">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-white">Frontend Developer</h3>
                                    <span className="text-green-400 text-sm">2020 - 2022</span>
                                </div>
                                <p className="text-gray-300 mb-2">Digital Agency</p>
                                <ul className="text-gray-200 space-y-1">
                                    <li>• Developed responsive web applications using React</li>
                                    <li>• Collaborated with UX/UI designers on user interfaces</li>
                                    <li>• Optimized application performance and accessibility</li>
                                </ul>
                            </div>
                            
                            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-purple-500">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-white">Junior Developer</h3>
                                    <span className="text-purple-400 text-sm">2019 - 2020</span>
                                </div>
                                <p className="text-gray-300 mb-2">Startup Company</p>
                                <ul className="text-gray-200 space-y-1">
                                    <li>• Built interactive web components and features</li>
                                    <li>• Participated in agile development processes</li>
                                    <li>• Learned modern development frameworks and tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ),
                zh: (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-6">职业历程</h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-blue-500">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-white">高级全栈开发工程师</h3>
                                    <span className="text-blue-400 text-sm">2022 - 至今</span>
                                </div>
                                <p className="text-gray-300 mb-2">科技创新公司</p>
                                <ul className="text-gray-200 space-y-1">
                                    <li>• 领导AI驱动的Web应用程序开发</li>
                                    <li>• 实施实时数据可视化系统</li>
                                    <li>• 指导初级开发者并建立编码标准</li>
                                </ul>
                            </div>
                            
                            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-green-500">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-white">前端开发工程师</h3>
                                    <span className="text-green-400 text-sm">2020 - 2022</span>
                                </div>
                                <p className="text-gray-300 mb-2">数字代理公司</p>
                                <ul className="text-gray-200 space-y-1">
                                    <li>• 使用React开发响应式Web应用程序</li>
                                    <li>• 与UX/UI设计师合作设计用户界面</li>
                                    <li>• 优化应用程序性能和可访问性</li>
                                </ul>
                            </div>
                            
                            <div className="bg-white/5 rounded-lg p-6 border-l-4 border-purple-500">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-white">初级开发工程师</h3>
                                    <span className="text-purple-400 text-sm">2019 - 2020</span>
                                </div>
                                <p className="text-gray-300 mb-2">创业公司</p>
                                <ul className="text-gray-200 space-y-1">
                                    <li>• 构建交互式Web组件和功能</li>
                                    <li>• 参与敏捷开发流程</li>
                                    <li>• 学习现代开发框架和工具</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            id: 'skills',
            title: { en: 'Skills & Education', zh: '技能与教育' },
            content: {
                en: (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-6">Skills & Education</h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">Frontend Development</span>
                                            <span className="text-blue-400">95%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">Backend Development</span>
                                            <span className="text-green-400">90%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">3D Graphics & WebGL</span>
                                            <span className="text-purple-400">85%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">AI/ML Integration</span>
                                            <span className="text-orange-400">80%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-400">Master&apos;s Degree</h4>
                                        <p className="text-gray-200">Computer Science</p>
                                        <p className="text-gray-300 text-sm">University of Canterbury, 2018</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-400">Certifications</h4>
                                        <ul className="text-gray-200 text-sm space-y-1">
                                            <li>• AWS Certified Developer</li>
                                            <li>• Google Cloud Professional</li>
                                            <li>• React Advanced Certification</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                zh: (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-6">技能与教育</h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">技术技能</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">前端开发</span>
                                            <span className="text-blue-400">95%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">后端开发</span>
                                            <span className="text-green-400">90%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">3D图形与WebGL</span>
                                            <span className="text-purple-400">85%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-200">AI/ML集成</span>
                                            <span className="text-orange-400">80%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-4">教育背景</h3>
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-400">硕士学位</h4>
                                        <p className="text-gray-200">计算机科学</p>
                                        <p className="text-gray-300 text-sm">坎特伯雷大学，2018</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4">
                                        <h4 className="font-semibold text-green-400">专业认证</h4>
                                        <ul className="text-gray-200 text-sm space-y-1">
                                            <li>• AWS认证开发者</li>
                                            <li>• 谷歌云专业认证</li>
                                            <li>• React高级认证</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    ];

    const currentPageData = aboutPages[localPage] || aboutPages[0];

    // 页面变化时通知父组件
    const aboutPagesLength = aboutPages.length;
    useEffect(() => {
        if (onPageChange) {
            onPageChange(localPage, aboutPagesLength);
        }
    }, [localPage, onPageChange, aboutPagesLength]);

    // 监听外部页面变化
    useEffect(() => {
        setLocalPage(currentPage);
    }, [currentPage]);

    return (
        <div className="flex h-screen w-full relative overflow-hidden">
            {/* 左侧固定头像区域 */}
            <div className="w-1/3 flex items-center justify-center relative z-20">
                <div className="avatar-container relative transition-all duration-500 ease-out group">
                    {/* 背景动画层 */}
                    <div className="absolute inset-0 rounded-full -z-10 transition-all duration-500 ease-out w-[300px] h-[300px] group-hover:w-[320px] group-hover:h-[320px]">
                        {/* 外层旋转渐变 */}
                        <div className="absolute inset-0 rounded-full opacity-70 group-hover:opacity-90 transition-opacity duration-500" 
                             style={{
                                 background: 'linear-gradient(45deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 backgroundSize: '400% 400%',
                                 filter: 'blur(10px)',
                                 animation: 'gradientShift 3s ease-in-out infinite'
                             }}>
                        </div>
                        {/* 中层hue-rotate */}
                        <div className="absolute inset-1 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
                             style={{
                                 background: 'conic-gradient(from 0deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 filter: 'blur(6px)',
                                 animation: 'hueRotate 4s linear infinite'
                             }}>
                        </div>
                        {/* 内层光晕 */}
                        <div className="absolute inset-2 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
                             style={{
                                 background: 'radial-gradient(circle, rgba(175, 204, 143, 0.8), rgba(124, 166, 92, 0.6), transparent)',
                                 filter: 'blur(4px)',
                                 animation: 'pulse 2s ease-in-out infinite'
                             }}>
                        </div>
                    </div>
                    
                    {/* 头像主体 */}
                    <div className="relative rounded-full shadow-2xl overflow-hidden bg-gray-900 border-4 border-white/30 backdrop-blur-sm transition-all duration-500 ease-out w-[300px] h-[300px] group-hover:w-[320px] group-hover:h-[320px] cursor-pointer">
                        <Suspense 
                            fallback={
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <FaSpinner className="animate-spin text-green-500 text-4xl" />
                                </div>
                            }
                        >
                            <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* 右侧内容区域 */}
            <div className="w-2/3 flex flex-col justify-center p-12 relative z-20">
                {/* 页面内容 */}
                <div className="max-w-4xl">
                    {currentPageData.content[language]}
                </div>

                {/* 页面导航指示器 */}
                <div className="absolute bottom-8 right-12 flex items-center space-x-4">
                    {/* 页面指示点 */}
                    <div className="flex space-x-2">
                        {aboutPages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setLocalPage(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === localPage
                                        ? 'bg-blue-400 scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                }`}
                                title={aboutPages[index].title[language]}
                            />
                        ))}
                    </div>

                    {/* 页面信息 */}
                    <div className="text-white/60 text-sm">
                        {localPage + 1} / {aboutPages.length}
                    </div>

                    {/* 下一页提示 */}
                    {localPage < aboutPages.length - 1 && (
                        <div className="flex items-center space-x-2 text-white/60 animate-bounce">
                            <span className="text-xs">{language === 'en' ? 'Scroll for more' : '滚动查看更多'}</span>
                            <FaChevronDown className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>

            {/* CSS动画样式 */}
            <style>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes hueRotate {
                    0% { filter: hue-rotate(0deg) blur(6px); }
                    100% { filter: hue-rotate(360deg) blur(6px); }
                }
            `}</style>
        </div>
    );
};

AboutSection.propTypes = {
    language: PropTypes.string.isRequired,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number
};

export default AboutSection;
