import { useState, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { useAppStore } from '../../store/useAppStore';
import { useTheme } from '../../hooks/useTheme';

const ThemeLanguageToggle = () => {
    const { 
        language, 
        toggleLanguage, 
        getContent 
    } = useAppStore();
    
    const { toggleTheme, getCurrentTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const content = getContent();
    const currentThemeConfig = getCurrentTheme();

    // 直接显示按钮，不等待动画完成
    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* 语言切换 */}
            <button
                onClick={toggleLanguage}
                className="w-10 h-10 bg-theme-primary/20 border border-theme-primary/50 rounded-full flex items-center justify-center hover:bg-theme-primary/30 transition-all duration-300 backdrop-blur-sm group"
                title={`${content.ui.language}: ${language === 'en' ? 'English' : '中文'}`}
            >
                <FaGlobe className="text-theme-primary text-sm group-hover:rotate-180 transition-transform duration-300" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {language === 'en' ? 'EN' : '中文'}
                </span>
            </button>

            {/* 主题切换 */}
            <button
                onClick={toggleTheme}
                className="w-10 h-10 bg-theme-secondary/20 border border-theme-secondary/50 rounded-full flex items-center justify-center hover:bg-theme-secondary/30 transition-all duration-300 backdrop-blur-sm group"
                title={`${content.ui.toggleTheme}: ${currentThemeConfig.name[language] || currentThemeConfig.name.en}`}
            >
                <span className="text-sm group-hover:rotate-180 transition-transform duration-300">
                    {currentThemeConfig.icon}
                </span>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-theme-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {currentThemeConfig.name[language] || currentThemeConfig.name.en}
                </span>
            </button>
        </div>
    );
};

export default ThemeLanguageToggle;
