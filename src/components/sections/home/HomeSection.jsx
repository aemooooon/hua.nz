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
    enableOpeningAnimation = false,
}) => {
    const { getNewContent, toggleLanguage } = useAppStore();
    const content = getNewContent();
    const { toggleTheme, getCurrentTheme } = useTheme();
    const currentThemeConfig = getCurrentTheme();
    const [showToggleButtons, setShowToggleButtons] = useState(false);

    // 控制Cube延迟加载和预加载状态
    const [showCube, setShowCube] = useState(false);
    const [cubeLoading, setCubeLoading] = useState(false);
    const [cubeReady, setCubeReady] = useState(false);

    useEffect(() => {
        // 恢复Cube加载逻辑，但保持文字立即显示
        const preloadTimer = setTimeout(() => {
            setCubeLoading(true);
        }, 400);

        const showTimer = setTimeout(() => {
            setShowCube(true);
        }, 600);

        // Show toggle buttons after a delay
        const toggleButtonTimer = setTimeout(() => {
            setShowToggleButtons(true);
        }, 2000);

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
        <div
            className="w-screen overflow-hidden"
            style={{
                margin: 0,
                padding: 0,
                background: 'transparent',
                height: '100vh',
                minHeight: '100dvh', // 动态视口高度确保在移动端正确显示
            }}
        >
            {/* 主内容优先渲染 - 完全移除动画 */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center text-white z-50 w-full px-4">
                <div className="flex flex-col items-center justify-center w-full relative">
                    {/* 姓名 - LCP优化：完全静态，立即可见 */}
                    <ThemeTitle
                        level={1}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-beauRivage mb-2 sm:mb-4 leading-tight text-center w-full mt-12"
                        style={{
                            // LCP优化：确保立即可见，无任何动画或变换
                            visibility: 'visible',
                            opacity: 1,
                            transform: 'none',
                            filter: 'none',
                            transition: 'none'
                        }}
                    >
                        {content.home.name[language] || content.home.name.en}
                    </ThemeTitle>
                    {/* 副标题 - 移除所有动画和变换 */}
                    <ThemeSubtitle
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-theme-accent mt-48"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 'max-content',
                            whiteSpace: 'nowrap',
                            visibility: 'visible',
                            opacity: 1,
                            transition: 'none'
                        }}
                    >
                        {content.home.title[language] || content.home.title.en}
                    </ThemeSubtitle>
                </div>
            </div>

            {/* 口号 - 移除所有动画 */}
            <div
                className="absolute left-1/2 transform -translate-x-1/2 text-center z-50 w-full px-4"
                style={{
                    bottom: 'max(4rem, env(safe-area-inset-bottom) + 3rem)',
                    visibility: 'visible',
                    opacity: 1,
                    transition: 'none'
                }}
            >
                <div className="text-center">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-theme-primary tracking-wider leading-relaxed">
                        {content.home.slogan[language] || content.home.slogan.en}
                    </p>
                </div>
            </div>

            {/* Loading效果 - 使用统一的加载组件 */}
            {cubeLoading && !cubeReady && (
                <CircularLoadingIndicator size={160} strokeWidth={12} showMask={true} />
            )}

            {/* Cube延迟加载 - 保留核心展示内容 */}
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
                    <div
                        className="absolute z-50 transition-opacity duration-1000 opacity-100"
                        style={{
                            bottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1rem)',
                            left: 'max(1.5rem, env(safe-area-inset-left) + 1rem)',
                        }}
                    >
                        <Tooltip
                            content={language === 'en' ? 'English' : '中文'}
                            placement="top"
                            delay={200}
                        >
                            <button
                                onClick={toggleLanguage}
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                                title={`${content.ui.language[language] || content.ui.language.en}: ${language === 'en' ? 'English' : '中文'}`}
                            >
                                <FaGlobe className="text-theme-primary text-xl group-hover:rotate-180 transition-transform duration-300" />
                            </button>
                        </Tooltip>
                    </div>

                    {/* Theme Toggle - 右下角 */}
                    <div
                        className="absolute z-50 transition-opacity duration-1000 opacity-100"
                        style={{
                            bottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1rem)',
                            right: 'max(1.5rem, env(safe-area-inset-right) + 1rem)',
                        }}
                    >
                        <Tooltip
                            content={
                                currentThemeConfig.name[language] || currentThemeConfig.name.en
                            }
                            placement="left"
                            delay={200}
                        >
                            <button
                                onClick={toggleTheme}
                                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110"
                                title={`${content.ui.toggleTheme[language] || content.ui.toggleTheme.en}: ${currentThemeConfig.name[language] || currentThemeConfig.name.en}`}
                            >
                                <FaPalette className="text-theme-primary text-xl group-hover:rotate-180 transition-transform duration-300" />
                            </button>
                        </Tooltip>
                    </div>

                    {/* Mobile Scroll Hint - 移动端滚动提示 (只在移动端和窄屏显示) */}
                    <div
                        className={`absolute z-50 transition-opacity duration-1000 md:hidden ${showToggleButtons ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            bottom: 'max(1.5rem, env(safe-area-inset-bottom) + 1rem)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <p className="text-white/70 text-sm font-medium whitespace-nowrap animate-pulse">
                            {content.home.mobileScrollHint[language] || content.home.mobileScrollHint.en}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

HomeSection.propTypes = {
    language: PropTypes.string.isRequired,
    enableOpeningAnimation: PropTypes.bool,
};

export default HomeSection;
