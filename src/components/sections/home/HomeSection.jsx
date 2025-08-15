import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { FaGlobe, FaPalette } from 'react-icons/fa';
import { useAppStore } from '../../../store/useAppStore';
import { useTheme } from '../../../hooks/useTheme';
import HeroCube from './HeroCube';
import CircularLoadingIndicator from '../../ui/CircularLoadingIndicator';
import Tooltip from '../../ui/Tooltip';
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
        
        return () => {
            clearTimeout(preloadTimer);
            clearTimeout(showTimer);
            clearTimeout(toggleButtonTimer);
        };
    }, []);

    // Cube加载完成回调
    const handleCubeReady = useCallback(() => {
        setCubeReady(true);
        setCubeLoading(false);
    }, []);

    return (
        <div className="w-screen overflow-hidden" 
             style={{ 
                 margin: 0, 
                 padding: 0, 
                 background: 'transparent',
                 height: '100vh',
                 minHeight: '100dvh' // 动态视口高度确保在移动端正确显示
             }}>
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
            <div className={`absolute left-1/2 transform -translate-x-1/2 text-center z-50 w-full px-4 ${
                enableOpeningAnimation ? 'grand-slogan-entrance' : ''
            }`} style={{
                bottom: 'max(4rem, env(safe-area-inset-bottom) + 3rem)', // 使用安全区域，确保在所有设备上都可见
                ...(!enableOpeningAnimation ? {
                    animation: 'sloganEntrance 3s ease-out forwards 5s',
                    animationFillMode: 'both'
                } : {})
            }}>
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

            {/* Loading效果 - 使用统一的加载组件 */}
            {cubeLoading && !cubeReady && (
                <CircularLoadingIndicator
                    size={160}
                    strokeWidth={12}
                    showMask={true}
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
                <>
                    {/* Language Toggle - 左下角 */}
                    <div className="absolute z-50 transition-opacity duration-1000 opacity-100" style={{
                        bottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1rem)',
                        left: 'max(1.5rem, env(safe-area-inset-left) + 1rem)'
                    }}>
                        <Tooltip 
                            content={language === 'en' ? 'English' : '中文'} 
                            placement="top"
                            delay={200}
                        >
                            <button
                                onClick={toggleLanguage}
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                                title={`${content.ui.language}: ${language === 'en' ? 'English' : '中文'}`}
                            >
                                <FaGlobe className="text-theme-primary text-xl group-hover:rotate-180 transition-transform duration-300" />
                            </button>
                        </Tooltip>
                    </div>

                    {/* Theme Toggle - 右下角 */}
                    <div className="absolute z-50 transition-opacity duration-1000 opacity-100" style={{
                        bottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1rem)',
                        right: 'max(1.5rem, env(safe-area-inset-right) + 1rem)'
                    }}>
                        <Tooltip 
                            content={currentThemeConfig.name[language] || currentThemeConfig.name.en} 
                            placement="left"
                            delay={200}
                        >
                            <button
                                onClick={toggleTheme}
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                                title={`${content.ui.toggleTheme}: ${currentThemeConfig.name[language] || currentThemeConfig.name.en}`}
                            >
                                <FaPalette className="text-theme-primary text-xl group-hover:rotate-180 transition-transform duration-300" />
                            </button>
                        </Tooltip>
                    </div>
                </>
            )}
        </div>
    );
};

HomeSection.propTypes = {
    language: PropTypes.string.isRequired,
    enableOpeningAnimation: PropTypes.bool
};

export default HomeSection;
