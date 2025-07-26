import { Suspense, lazy, useEffect, useState, useCallback, useMemo } from "react";
import { useApp } from "../contexts/AppContext";
import imageSrc from "./hua_icon_base64";
import hoverImageSrc from "../assets/images/hua_500w1.jpg";
import { FaSpinner } from "react-icons/fa";
import NavigationCube from "./NavigationCube";

const ShaderLoadingEffect = lazy(() => import("./ShaderLoadingEffect"));

const HomePage = () => {
    const { content, activeSection, setActiveSection, switchEffect } = useApp();
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 页面顺序
    const pageOrder = useMemo(() => ['home', 'project', 'gallery', 'contact', 'about', 'blog'], []);

    useEffect(() => {
        // 动画完成后显示控制按钮
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 3000); // 3秒后显示控制按钮

        return () => clearTimeout(timer);
    }, []);

    // 滚轮切换页面 - 优化防抖处理
    const handleWheel = useCallback((event) => {
        if (isTransitioning) return;
        
        // 只阻止默认行为，不阻止事件传播
        event.preventDefault();
        setIsTransitioning(true);
        
        const currentIndex = pageOrder.indexOf(activeSection);
        let nextIndex;
        
        if (event.deltaY > 0) {
            // 向下滚动
            nextIndex = (currentIndex + 1) % pageOrder.length;
        } else {
            // 向上滚动
            nextIndex = (currentIndex - 1 + pageOrder.length) % pageOrder.length;
        }
        
        const nextPage = pageOrder[nextIndex];
        setActiveSection(nextPage);
        
        // 设置对应的背景效果
        const effects = {
            home: 'effectfuse',
            project: 'effectmonjori', 
            gallery: 'effectheartbeats',
            contact: 'effectlorenz',
            about: 'effectfuse',
            blog: 'effectmonjori'
        };
        switchEffect(effects[nextPage]);
        
        // 增加防抖时间以提高性能
        setTimeout(() => {
            setIsTransitioning(false);
        }, 1200);
    }, [activeSection, isTransitioning, setActiveSection, switchEffect, pageOrder]);

    useEffect(() => {
        let throttleTimer;
        
        const throttledWheelHandler = (event) => {
            if (throttleTimer) return;
            
            handleWheel(event);
            
            throttleTimer = setTimeout(() => {
                throttleTimer = null;
            }, 100); // 100ms 节流
        };
        
        // 只在Home页面添加滚轮监听
        if (activeSection === 'home') {
            window.addEventListener('wheel', throttledWheelHandler, { passive: false });
        }
        
        return () => {
            window.removeEventListener('wheel', throttledWheelHandler);
            if (throttleTimer) {
                clearTimeout(throttleTimer);
            }
        };
    }, [handleWheel, activeSection]);

    return (
        <>
            {/* 主要内容区域 - 无背景效果 */}
            <section className="flex flex-col lg:flex-row items-center justify-center h-screen w-full relative overflow-hidden">
                {/* 头像区域 */}
                <div className="w-full lg:w-1/2 h-full lg:h-full flex flex-col items-center justify-center relative p-4">
                    {/* 头像容器 - 有hue-rotate背景动画 */}
                    <div className="avatar-container relative mb-8">
                        {/* 背景动画层 - 多层动画效果 */}
                        <div className="absolute inset-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full -z-10">
                            {/* 外层旋转渐变 */}
                            <div className="absolute inset-0 rounded-full animate-gradientShift opacity-80" 
                                 style={{
                                     background: 'linear-gradient(45deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                     backgroundSize: '400% 400%',
                                     filter: 'blur(12px)',
                                 }}>
                            </div>
                            {/* 中层hue-rotate */}
                            <div className="absolute inset-2 rounded-full animate-hueRotate opacity-60" 
                                 style={{
                                     background: 'conic-gradient(from 0deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                     filter: 'blur(8px)',
                                 }}>
                            </div>
                            {/* 内层光晕 */}
                            <div className="absolute inset-4 rounded-full opacity-40" 
                                 style={{
                                     background: 'radial-gradient(circle, rgba(175, 204, 143, 0.6), rgba(124, 166, 92, 0.4), transparent)',
                                     filter: 'blur(4px)',
                                     animation: 'pulse 3s ease-in-out infinite'
                                 }}>
                            </div>
                        </div>
                        
                        {/* 头像主体 - 响应式大小 */}
                        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full shadow-2xl overflow-hidden bg-gray-900 animate-slideInLeft border-4 border-white/20 backdrop-blur-sm">
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

                    {/* 名字和职位 - 简洁版 */}
                    <div className="text-center text-white animate-fadeInUp animation-delay-1000">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-beauRivage">
                            {content.home.name}
                        </h1>
                        <h2 className="text-xl md:text-2xl font-mono text-green-300">
                            {content.home.title}
                        </h2>
                        
                        {/* 滚轮提示 */}
                        <div className="mt-8 animate-bounce">
                            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
                            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative">
                                <div className="w-1 h-2 bg-gray-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2 animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 导航立方体区域 */}
                <div className="w-full lg:w-1/2 h-full lg:h-full flex items-center justify-center p-4">
                    <div className="cube-container animate-slideInRight">
                        <NavigationCube isLandingPage={true} />
                    </div>
                </div>
            </section>

            {/* 滚轮切换提示 */}
            <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-sm opacity-70">Use mouse wheel to navigate • Click cube faces to jump</p>
            </div>

            {/* 控制按钮 - 动画完成后显示 */}
            <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
                <div className="pointer-events-auto">
                    {/* 这些按钮会在 App.jsx 中渲染，这里只是占位 */}
                </div>
            </div>
        </>
    );
};

export default HomePage;
