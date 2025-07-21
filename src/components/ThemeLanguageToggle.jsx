import { FaSun, FaMoon, FaGlobe } from 'react-icons/fa';
import { useApp } from '../contexts/AppContext';

const ThemeLanguageToggle = () => {
    const { theme, toggleTheme, language, toggleLanguage, content } = useApp();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
            {/* 语言切换 */}
            <button
                onClick={toggleLanguage}
                className="w-10 h-10 bg-blue-500/20 border border-blue-500/50 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-all duration-300 backdrop-blur-sm group"
                title={`${content.ui.language}: ${language === 'en' ? 'English' : '中文'}`}
            >
                <FaGlobe className="text-blue-400 text-sm group-hover:rotate-180 transition-transform duration-300" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {language === 'en' ? 'EN' : '中文'}
                </span>
            </button>

            {/* 主题切换 */}
            <button
                onClick={toggleTheme}
                className="w-10 h-10 bg-purple-500/20 border border-purple-500/50 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-all duration-300 backdrop-blur-sm group"
                title={content.ui.toggleTheme}
            >
                {theme === 'dark' ? (
                    <FaSun className="text-yellow-400 text-sm group-hover:rotate-180 transition-transform duration-300" />
                ) : (
                    <FaMoon className="text-purple-400 text-sm group-hover:rotate-180 transition-transform duration-300" />
                )}
            </button>
        </div>
    );
};

export default ThemeLanguageToggle;
