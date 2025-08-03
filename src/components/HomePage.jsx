import { Suspense, lazy, useEffect, useState, useCallback, useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import imageSrc from "./hua_icon_base64";
// 延迟加载hover图片以优化首屏性能
// import hoverImageSrc from "../assets/images/hua_500w1.jpg"; 
import { FaSpinner } from "react-icons/fa";
import HeroCube from "./sections/home/HeroCube";
import "../styles/OpeningAnimations.css";

const Avatar = lazy(() => import("./Avatar"));

const HomePage = () => {
    const { getContent, currentSection, setCurrentSection } = useAppStore();
    const content = getContent();
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hoverImageSrc, setHoverImageSrc] = useState(null);
    const [enableGrandEntrance, setEnableGrandEntrance] = useState(true); // 默认启用震撼开场
    const [animationKey, setAnimationKey] = useState(0); // 用于重新触发动画

    // 页面顺序
    const pageOrder = useMemo(() => ['home', 'about', 'project', 'gallery', 'education', 'contact'], []);

    // 延迟加载hover图片
    useEffect(() => {
        const timer = setTimeout(() => {
            import("../assets/images/hua_500w1.jpg").then(module => {
                setHoverImageSrc(module.default);
            });
        }, 1000); // 1秒后加载hover图片
        
        return () => clearTimeout(timer);
    }, []);

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
        
        let nextIndex;
        
        if (event.deltaY > 0) {
            // 向下滚动
            nextIndex = (currentSection + 1) % pageOrder.length;
        } else {
            // 向上滚动
            nextIndex = (currentSection - 1 + pageOrder.length) % pageOrder.length;
        }
        
        setCurrentSection(nextIndex);
        
        // 增加防抖时间以提高性能
        setTimeout(() => {
            setIsTransitioning(false);
        }, 1200);
    }, [currentSection, isTransitioning, setCurrentSection, pageOrder]);

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
        if (currentSection === 0) { // 0 对应 home
            window.addEventListener('wheel', throttledWheelHandler, { passive: false });
        }
        
        return () => {
            window.removeEventListener('wheel', throttledWheelHandler);
            if (throttleTimer) {
                clearTimeout(throttleTimer);
            }
        };
    }, [handleWheel, currentSection]);

    return (
        <>
            {/* 主要内容区域 - 无背景效果 */}
            <section className="flex flex-col lg:flex-row items-center justify-center h-screen w-full relative overflow-hidden">
                {/* 头像区域 */}
                <div className="w-full lg:w-1/2 h-full lg:h-full flex flex-col items-center justify-center relative p-4">
                    {/* 头像容器 - 有hue-rotate背景动画 */}
                    <div className="avatar-container relative mb-8">
                        {/* 背景动画层 - 临时禁用以解决多个圆环问题 */}
                        <div className="absolute inset-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full -z-10" style={{ display: 'none' }}>
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
                                <Avatar imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                            </Suspense>
                        </div>
                    </div>

                    {/* 名字和职位 - 震撼开场版本 */}
                    <div className={`text-center text-white ${
                        enableGrandEntrance ? 'grand-title-entrance' : 'animate-fadeInUp animation-delay-1000'
                    }`}>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-white font-beauRivage ${
                            enableGrandEntrance ? 'shimmer-text' : ''
                        }`}>
                            {content.home.name}
                        </h1>
                        <h2 className={`text-xl md:text-2xl font-mono text-green-300 ${
                            enableGrandEntrance ? 'grand-subtitle-entrance' : ''
                        }`}>
                            {content.home.title}
                        </h2>
                        
                        {/* 装饰元素 */}
                        <div className={`mt-8 ${enableGrandEntrance ? 'grand-slogan-entrance' : ''}`}>
                            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative opacity-30">
                                <div className="w-1 h-2 bg-gray-400 rounded-full absolute left-1/2 top-2 transform -translate-x-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 导航立方体区域 - 震撼开场版本 */}
                <div className="w-full lg:w-1/2 h-full lg:h-full flex items-center justify-center p-4">
                    <div className={`cube-container ${
                        enableGrandEntrance ? 'cube-grand-entrance' : 'animate-slideInRight'
                    }`}>
                        <HeroCube 
                            key={animationKey} // 用于重新触发动画
                            enableOpeningAnimation={enableGrandEntrance}
                        />
                    </div>
                </div>

                {/* 震撼开场控制按钮 */}
                {animationComplete && (
                    <div className="fixed top-4 right-4 z-50 space-y-2">
                        <button
                            onClick={() => setEnableGrandEntrance(!enableGrandEntrance)}
                            className="block w-full bg-black/50 text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                        >
                            {enableGrandEntrance ? '🎬 震撼开场' : '🎭 标准模式'}
                        </button>
                        {enableGrandEntrance && (
                            <button
                                onClick={() => {
                                    setAnimationKey(prev => prev + 1);
                                    // 重新加载页面来重新触发动画
                                    window.location.reload();
                                }}
                                className="block w-full bg-green-600/50 text-white px-4 py-2 rounded-lg border border-green-400/30 hover:bg-green-500/50 transition-colors text-sm"
                            >
                                🔄 重播动画
                            </button>
                        )}
                    </div>
                )}
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
