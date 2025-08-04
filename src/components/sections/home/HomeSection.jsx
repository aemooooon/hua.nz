import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import HeroCube from './HeroCube';
import GlobalLoadingIndicator from '../../GlobalLoadingIndicator';
import texturePreloader from '../../../utils/texturePreloader';
import '../../../styles/OpeningAnimations.css';

const HomeSection = ({ 
    language, 
    // 开场动画相关属性
    enableOpeningAnimation = false
}) => {
    const { getContent } = useAppStore();
    const content = getContent();

    // 控制Cube延迟加载和预加载状态
    const [showCube, setShowCube] = useState(false);
    const [cubeLoading, setCubeLoading] = useState(false);
    const [cubeReady, setCubeReady] = useState(false);
    const [textureProgress, setTextureProgress] = useState({ loaded: 0, total: 0 });

    useEffect(() => {
        // 400ms后开始预加载Cube，600ms后显示
        const preloadTimer = setTimeout(() => {
            setCubeLoading(true);
        }, 400);
        
        const showTimer = setTimeout(() => {
            setShowCube(true);
        }, 600);
        
        // 监听纹理加载进度
        const progressInterval = setInterval(() => {
            const progress = texturePreloader.getProgress();
            setTextureProgress(progress);
            
            // 如果纹理加载完成，可以提前准备
            if (progress.progress === 1 && progress.total > 0) {
                console.log('🎯 All textures loaded, Cube can render smoothly');
            }
        }, 100);
        
        return () => {
            clearTimeout(preloadTimer);
            clearTimeout(showTimer);
            clearInterval(progressInterval);
        };
    }, []);

    // Cube加载完成回调
    const handleCubeReady = useCallback(() => {
        setCubeReady(true);
        setCubeLoading(false);
        console.log('🎯 Cube loading completed, hiding loading indicator');
    }, []);

    return (
        <div className="h-screen w-screen relative overflow-hidden" style={{ margin: 0, padding: 0, position: 'relative' }}>
            {/* 主内容优先渲染 */}
            <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-center text-white z-20 w-full px-4 ${
                enableOpeningAnimation ? 'grand-title-entrance' : ''
            }`} style={!enableOpeningAnimation ? {
                animation: 'movieTitleEntrance 4s ease-out forwards 1s',
                animationFillMode: 'both'
            } : {}}>
                <div className="flex flex-col items-center justify-center w-full relative">
                    {/* 姓名 */}
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-beauRivage hover:text-green-300 transition-colors duration-300 mb-2 sm:mb-4 leading-tight text-center w-full mt-12 ${
                        enableOpeningAnimation ? 'shimmer-text' : ''
                    }`}>
                        {content.home.name}
                    </h1>
                    {/* Title - 绝对定位强制居中 */}
                    <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-green-300 mt-48 ${
                        enableOpeningAnimation ? 'grand-subtitle-entrance' : ''
                    }`} style={{ 
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'max-content',
                        whiteSpace: 'nowrap'
                    }}>
                        {content.home.title}
                    </h2>
                </div>
            </div>

            {/* Slogan - 屏幕下方，宽屏一行显示，窄屏两行，闪烁光标 */}
            <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-white z-20 w-full px-4 ${
                enableOpeningAnimation ? 'grand-slogan-entrance' : ''
            }`} style={!enableOpeningAnimation ? {
                animation: 'sloganEntrance 3s ease-out forwards 5s',
                animationFillMode: 'both'
            } : {}}>
                <div className="space-y-2 sm:space-y-4">
                    {/* 英文slogan - 使用统一的打字机效果解决对齐问题 */}
                    <div className="text-center">
                        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/90 tracking-wider leading-relaxed inline-block ${
                            enableOpeningAnimation ? '' : 'typewriter-text typewriter-optimized'
                        }`} style={!enableOpeningAnimation ? {
                            animationDelay: '6s',
                            animationFillMode: 'both'
                        } : {}}>
                            Order from Chaos, Innovation through Tradeoffs.
                            <span className="inline-block ml-1 w-px h-5 sm:h-6 md:h-7 lg:h-8 bg-white input-cursor"></span>
                        </p>
                    </div>
                    
                    {/* 中文slogan */}
                    <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-light text-green-300/80 tracking-wide leading-relaxed mt-4 ${
                        enableOpeningAnimation ? '' : 'typewriter-text typewriter-optimized'
                    }`} style={!enableOpeningAnimation ? {
                        animationDelay: '8s',
                        animationFillMode: 'both'
                    } : {}}>
                        观混沌之纷，立秩序之象；权诸技之衡，启创新之变！
                    </p>
                </div>
            </div>

            {/* Loading效果 - 使用全局加载组件，显示纹理加载进度 */}
            {cubeLoading && !cubeReady && (
                <GlobalLoadingIndicator
                    isVisible={true}
                    loadedCount={textureProgress.loaded}
                    totalCount={textureProgress.total}
                    loadingText="Loading Experience..."
                    loadingTextChinese="加载体验中..."
                    language={language}
                    variant="default"
                    position="center"
                    showProgress={textureProgress.total > 0}
                    showPercentage={textureProgress.total > 0}
                    showDots={true}
                />
            )}

            {/* Cube延迟加载 */}
            {showCube && (
                <HeroCube 
                    enableOpeningAnimation={enableOpeningAnimation}
                    onReady={handleCubeReady}
                />
            )}
        </div>
    );
};

HomeSection.propTypes = {
    language: PropTypes.string.isRequired,
    enableOpeningAnimation: PropTypes.bool
};

export default HomeSection;
