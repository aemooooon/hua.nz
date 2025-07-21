import { createContext, useContext, useState, useEffect } from 'react';
import contentData from '../assets/content.js';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // 语言状态
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  // 主题状态
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    // 检测系统主题
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'dark'; // 默认深色
  });

  // 背景效果状态
  const [currentEffect, setCurrentEffect] = useState('effectfuse');
  
  // 当前页面状态
  const [activeSection, setActiveSection] = useState('home');
  
  // 音频控制状态
  const [audioEnabled, setAudioEnabled] = useState(false);

  // 获取当前语言的内容
  const content = contentData[language] || contentData.en;

  // 切换语言
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // 切换背景效果
  const switchEffect = (effectName) => {
    setCurrentEffect(effectName);
  };

  // 应用主题到DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    // 语言相关
    language,
    content,
    toggleLanguage,
    
    // 主题相关
    theme,
    toggleTheme,
    
    // 页面导航
    activeSection,
    setActiveSection,
    
    // 背景效果
    currentEffect,
    setCurrentEffect,
    switchEffect,
    
    // 音频控制
    audioEnabled,
    setAudioEnabled
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
