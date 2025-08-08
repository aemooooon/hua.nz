import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { useAppStore } from '../../../store/useAppStore';
import { useTheme } from '../../../hooks/useTheme';
import HeroCube from './HeroCube';
import CircularLoadingIndicator from '../../ui/CircularLoadingIndicator';
import texturePreloader from '../../../utils/texturePreloader';
import { ThemeTitle, ThemeSubtitle } from '../../ui/ThemeComponents';
import '../../../styles/OpeningAnimations.css';

const HomeSection = ({ 
    language, 
    // 开场动画相关属性
    enableOpeningAnimation = false
}) => {
    const { getContent, toggleLanguage } = useAppStore();
    const content = getContent();
    const { toggleTheme, getCurrentTheme } = useTheme();
    const currentThemeConfig = getCurrentTheme();
    const [showToggleButtons, setShowToggleButtons] = useState(false);

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

        // Show toggle buttons after a delay
        const toggleButtonTimer = setTimeout(() => {
            setShowToggleButtons(true);
        }, 2000); // Show after 2 seconds
        
        // 监听纹理加载进度
        const progressInterval = setInterval(() => {
            const progress = texturePreloader.getProgress();
            setTextureProgress(progress);
            
            // 如果纹理加载完成，可以提前准备
            if (progress.progress === 1 && progress.total > 0) {
                // 纹理加载完成，Cube可以流畅渲染
            }
        }, 100);
        
        return () => {
            clearTimeout(preloadTimer);
            clearTimeout(showTimer);
            clearTimeout(toggleButtonTimer);
            clearInterval(progressInterval);
        };
    }, []);

    // Cube加载完成回调
    const handleCubeReady = useCallback(() => {
        setCubeReady(true);
        setCubeLoading(false);
    }, []);

    return (
        <div className="h-screen w-screen overflow-hidden" style={{ margin: 0, padding: 0, background: 'transparent' }}>
            {/* 主内容优先渲染 */}
            <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-center text-white z-50 w-full px-4 ${
                enableOpeningAnimation ? 'grand-title-entrance' : ''
            }`} style={!enableOpeningAnimation ? {
                animation: 'movieTitleEntrance 4s ease-out forwards 1s',
                animationFillMode: 'both'
            } : {}}>
                <div className="flex flex-col items-center justify-center w-full relative">
                    {/* 姓名 */}
                    <ThemeTitle level={1} className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-beauRivage hover:text-theme-primary transition-colors duration-300 mb-2 sm:mb-4 leading-tight text-center w-full mt-12 ${
                        enableOpeningAnimation ? 'shimmer-text' : ''
                    }`}>
                        {content.home.name}
                    </ThemeTitle>
                    {/* Title - 绝对定位强制居中 */}
                    <ThemeSubtitle className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-theme-accent mt-48 ${
                        enableOpeningAnimation ? 'grand-subtitle-entrance' : ''
                    }`} style={{ 
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'max-content',
                        whiteSpace: 'nowrap'
                    }}>
                        {content.home.title}
                    </ThemeSubtitle>
                </div>
            </div>

            {/* Slogan - 屏幕下方，宽屏一行显示，窄屏两行，闪烁光标 */}
            <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-50 w-full px-4 ${
                enableOpeningAnimation ? 'grand-slogan-entrance' : ''
            }`} style={!enableOpeningAnimation ? {
                animation: 'sloganEntrance 3s ease-out forwards 5s',
                animationFillMode: 'both'
            } : {}}>
                <div className="space-y-2 sm:space-y-4">
                    {/* 英文slogan - 使用统一的打字机效果解决对齐问题 */}
                    <div className="text-center">
                        <p 
                            className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light text-theme-primary tracking-wider leading-relaxed inline-block transition-colors duration-300 ${
                                enableOpeningAnimation ? '' : 'typewriter-text typewriter-optimized'
                            }`} 
                            style={!enableOpeningAnimation ? {
                                animationDelay: '6s',
                                animationFillMode: 'both'
                            } : {}}
                        >
                            Order from Chaos, Innovation through Tradeoffs.
                            <span className="inline-block ml-1 w-px h-5 sm:h-6 md:h-7 lg:h-8 bg-theme-cursor input-cursor"></span>
                        </p>
                    </div>
                    
                    {/* 中文slogan */}
                    <p 
                        className={`text-sm sm:text-base md:text-lg lg:text-xl font-light text-theme-primary tracking-wide leading-relaxed mt-4 transition-colors duration-300 ${
                            enableOpeningAnimation ? '' : 'typewriter-text typewriter-optimized'
                        }`} 
                        style={!enableOpeningAnimation ? {
                            animationDelay: '8s',
                            animationFillMode: 'both'
                        } : {}}
                    >
                        观混沌之纷，立秩序之象；守中庸之衡，启创新之变！
                    </p>
                </div>
            </div>

            {/* Loading效果 - 使用全局加载组件，显示纹理加载进度 */}
            {cubeLoading && !cubeReady && (
                <CircularLoadingIndicator
                    progress={textureProgress.total > 0 ? Math.round((textureProgress.loaded / textureProgress.total) * 100) : 0}
                    size={160}
                    strokeWidth={12}
                    showProgress={true}
                    showMask={true}
                    language={language}
                />
            )}

            {/* Cube延迟加载 */}
            {showCube && (
                <HeroCube 
                    enableOpeningAnimation={enableOpeningAnimation}
                    onReady={handleCubeReady}
                />
            )}

            {/* Language and Theme Toggle Buttons - Bottom Left Corner */}
            {showToggleButtons && (
                <div className="absolute bottom-6 left-6 z-50 flex items-center gap-0 transition-opacity duration-1000 opacity-100">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                        title={`${content.ui.language}: ${language === 'en' ? 'English' : '中文'}`}
                    >
                        <FaGlobe className="text-theme-primary text-xl group-hover:rotate-180 transition-transform duration-300" />
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-theme-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {language === 'en' ? 'English' : '中文'}
                        </span>
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-12 h-12 flex items-center justify-center transition-all duration-300 group hover:scale-110"
                        title={`${content.ui.toggleTheme}: ${currentThemeConfig.name[language] || currentThemeConfig.name.en}`}
                    >
                        <div 
                            className="w-5 h-5 rounded-full group-hover:rotate-180 transition-transform duration-300"
                            style={{ backgroundColor: 'var(--theme-primary)' }}
                        ></div>
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-theme-primary text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {currentThemeConfig.name[language] || currentThemeConfig.name.en}
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

HomeSection.propTypes = {
    language: PropTypes.string.isRequired,
    enableOpeningAnimation: PropTypes.bool
};

export default HomeSection;
