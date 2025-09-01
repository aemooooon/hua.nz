import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

// 主题配置
export const THEMES = {
    'nz-blue': {
        name: { en: 'New Zealand Blue', zh: '新西兰蓝' },
        description: {
            en: "Inspired by New Zealand's coastal beauty",
            zh: '灵感来自新西兰海岸之美',
        },
        icon: '🇳🇿',
        colors: {
            // 基础色彩 - 最亮的蓝色用于高亮
            primary: '#00ffff', // 最亮的青色 - 用于高亮、边框、分割线、光晕
            secondary: '#0080ff', // 按钮背景色（50%亮度）
            accent: '#4dd0e1', // 柔和的青色

            // 背景色 - 全部使用纯黑色
            background: '#000000', // 纯黑色背景
            surface: 'rgba(255, 255, 255, 0.05)', // 极淡的白色透明 - 卡片毛玻璃
            'surface-elevated': 'rgba(255, 255, 255, 0.1)', // 稍微明显的透明度

            // 文本色 - 主要文字使用白色
            'text-primary': '#ffffff', // 纯白色主要文字
            'text-secondary': '#e1e7ef', // 稍暗的白色
            'text-muted': '#888888', // 静默文字

            // 边框和分割线 - 使用最亮的主题色
            border: '#00ffff', // 最亮青色边框
            divider: '#00ffff', // 最亮青色分割线

            // 交互色 - 简化设计，使用透明度
            hover: 'rgba(0, 255, 255, 0.1)', // 青色10%透明hover
            button: 'rgba(0, 255, 255, 0.6)', // 青色60%透明按钮
            loading: '#00ffff', // 最亮青色loading

            // 特殊效果色 - 全部使用最亮的主题色
            glow: '#00ffff', // 最亮青色光晕
            shadow: 'rgba(0, 255, 255, 0.5)', // 青色阴影
            cursor: '#00ffff', // 最亮青色光标
            'avatar-glow': '#00ffff', // 最亮青色头像光晕

            // 功能色
            success: '#00ff00', // 绿色成功
            warning: '#ffff00', // 黄色警告
            error: '#ff0000', // 红色错误

            // 渐变色配置 - 用于标题渐变
            'gradient-from': '#0080ff', // 渐变起始色（secondary）
            'gradient-via': '#00ffff', // 渐变中间色（primary）
            'gradient-to': '#4dd0e1', // 渐变结束色（accent）
        },
    },

    'si-green': {
        name: { en: 'South Island Green', zh: '绿意南岛' },
        description: {
            en: "Inspired by South Island's lush landscapes",
            zh: '灵感来自南岛的茂密景观',
        },
        icon: '🏔️',
        colors: {
            // 基础色彩 - 使用经典的emerald-500绿色
            primary: '#10b981', // emerald-500 - 用于高亮、边框、分割线、光晕
            secondary: '#059669', // emerald-600 - 按钮背景色（更深一些）
            accent: '#4ade80', // emerald-400 - 柔和的绿色

            // 背景色 - 全部使用纯黑色
            background: '#000000', // 纯黑色背景
            surface: 'rgba(255, 255, 255, 0.05)', // 极淡的白色透明 - 卡片毛玻璃
            'surface-elevated': 'rgba(255, 255, 255, 0.1)', // 稍微明显的透明度

            // 文本色 - 主要文字使用白色
            'text-primary': '#ffffff', // 纯白色主要文字
            'text-secondary': '#e1f5fe', // 稍暗的白色
            'text-muted': '#888888', // 静默文字

            // 边框和分割线 - 使用主题绿色
            border: '#10b981', // emerald-500边框
            divider: '#10b981', // emerald-500分割线

            // 交互色 - 简化设计，使用透明度
            hover: 'rgba(16, 185, 129, 0.1)', // emerald-500 10%透明hover
            button: 'rgba(16, 185, 129, 0.6)', // emerald-500 60%透明按钮
            loading: '#10b981', // emerald-500 loading

            // 特殊效果色 - 全部使用emerald-500
            glow: '#10b981', // emerald-500光晕
            shadow: 'rgba(16, 185, 129, 0.5)', // emerald-500阴影
            cursor: '#10b981', // emerald-500光标
            'avatar-glow': '#10b981', // emerald-500头像光晕

            // 功能色
            success: '#10b981', // emerald-500成功（同主色）
            warning: '#ffff00', // 黄色警告
            error: '#ff0000', // 红色错误

            // 渐变色配置 - 用于标题渐变
            'gradient-from': '#059669', // emerald-600渐变起始色
            'gradient-via': '#10b981', // emerald-500渐变中间色（主色）
            'gradient-to': '#4ade80', // emerald-400渐变结束色
        },
    },
};

/**
 * 主题切换 Hook
 * 提供主题管理功能，包括应用主题、获取主题信息等
 */
export const useTheme = () => {
    const { theme, setTheme } = useAppStore();

    // 应用主题到DOM
    const applyTheme = themeKey => {
        const themeConfig = THEMES[themeKey];
        if (!themeConfig) return;

        const root = document.documentElement;

        // 设置CSS变量
        Object.entries(themeConfig.colors).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${key}`, value);

            // 如果是颜色值，也设置对应的RGB变量
            if (key === 'primary' || key === 'secondary') {
                const rgbValue = hexToRgb(value);
                if (rgbValue) {
                    root.style.setProperty(
                        `--theme-${key}-rgb`,
                        `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`
                    );
                }
            }
        });

        // 设置主题类名
        root.className = root.className.replace(/theme-\w+/g, '');
        root.classList.add(`theme-${themeKey}`);

        // 更新store
        setTheme(themeKey);
    };

    // 辅助函数：将十六进制颜色转换为RGB
    const hexToRgb = hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    };

    // 切换主题
    const toggleTheme = () => {
        const themes = Object.keys(THEMES);
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        applyTheme(themes[nextIndex]);
    };

    // 获取当前主题配置
    const getCurrentTheme = () => THEMES[theme] || THEMES['nz-blue'];

    // 获取所有主题
    const getAllThemes = () => {
        return Object.entries(THEMES).map(([key, config]) => ({
            key,
            ...config,
        }));
    };

    // 初始化主题
    useEffect(() => {
        // 确保有效的主题
        const validTheme = THEMES[theme] ? theme : 'nz-blue';
        if (validTheme !== theme) {
            setTheme(validTheme);
            return;
        }

        // 应用主题
        const themeConfig = THEMES[validTheme];
        if (!themeConfig) return;

        const root = document.documentElement;

        // 设置CSS变量
        Object.entries(themeConfig.colors).forEach(([key, value]) => {
            root.style.setProperty(`--theme-${key}`, value);

            // 如果是颜色值，也设置对应的RGB变量
            if (key === 'primary' || key === 'secondary') {
                const rgbValue = hexToRgb(value);
                if (rgbValue) {
                    root.style.setProperty(
                        `--theme-${key}-rgb`,
                        `${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`
                    );
                }
            }
        });

        // 设置主题类名
        root.className = root.className.replace(/theme-\w+/g, '');
        root.classList.add(`theme-${validTheme}`);
    }, [theme, setTheme]);

    return {
        theme,
        applyTheme,
        toggleTheme,
        getCurrentTheme,
        getAllThemes,
        getThemeColors: () => getCurrentTheme().colors,
        themes: THEMES,
    };
};
