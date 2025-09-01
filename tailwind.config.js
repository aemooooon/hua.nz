export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                'xs': '320px',
            },
            spacing: {
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
                'golden-sm': '1.618rem',
                'golden-md': '2.618rem',
                'golden-lg': '4.236rem',
            },
            fontFamily: {
                audiowide: ['"Audiowide"', 'cursive'],
                beauRivage: ['"Beau Rivage"', 'serif'],
                figtree: ['"Figtree"', 'sans-serif'],
                montserrat: ['"Montserrat"', 'sans-serif'],
                poppins: ['"Poppins"', 'sans-serif'],
                // 格鲁吉亚字体用于数字
                georgia: ['Georgia', 'serif'],
            },
            colors: {
                // New Zealand Blue 主题色彩
                'nz-blue': {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6', // 主色
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },

                // South Island Green 主题色彩
                'si-green': {
                    50: '#ecfdf5',
                    100: '#d1fae5',
                    200: '#a7f3d0',
                    300: '#6ee7b7',
                    400: '#34d399',
                    500: '#10b981', // 主色
                    600: '#059669',
                    700: '#047857',
                    800: '#065f46',
                    900: '#064e3b',
                },

                // University of Canterbury Official Red
                'uc-red': '#C8102E',

                // 动态主题色 - CSS变量方式
                theme: {
                    primary: 'var(--theme-primary)',
                    secondary: 'var(--theme-secondary)',
                    accent: 'var(--theme-accent)',
                    background: 'var(--theme-background)',
                    surface: 'var(--theme-surface)',
                    'surface-elevated': 'var(--theme-surface-elevated)',
                    'text-primary': 'var(--theme-text-primary)',
                    'text-secondary': 'var(--theme-text-secondary)',
                    'text-muted': 'var(--theme-text-muted)',
                    'section-title': 'var(--theme-section-title)',
                    // 通用白色文字层次 - 不随主题变化
                    'text-white': 'var(--theme-text-white)',
                    'text-white-90': 'var(--theme-text-white-90)',
                    'text-white-80': 'var(--theme-text-white-80)',
                    'text-white-70': 'var(--theme-text-white-70)',
                    'text-white-60': 'var(--theme-text-white-60)',
                    'text-white-50': 'var(--theme-text-white-50)',
                    'text-white-40': 'var(--theme-text-white-40)',
                    'text-white-30': 'var(--theme-text-white-30)',
                    'text-white-20': 'var(--theme-text-white-20)',
                    'text-white-10': 'var(--theme-text-white-10)',
                    border: 'var(--theme-border)',
                    // 通用白色边框层次
                    'border-white-30': 'var(--theme-border-white-30)',
                    'border-white-20': 'var(--theme-border-white-20)',
                    'border-white-15': 'var(--theme-border-white-15)',
                    'border-white-10': 'var(--theme-border-white-10)',
                    'border-white-05': 'var(--theme-border-white-05)',
                    // 通用白色背景层次
                    'bg-white-20': 'var(--theme-bg-white-20)',
                    'bg-white-15': 'var(--theme-bg-white-15)',
                    'bg-white-10': 'var(--theme-bg-white-10)',
                    'bg-white-05': 'var(--theme-bg-white-05)',
                    // 主题色背景
                    'bg-primary-10': 'var(--theme-bg-primary-10)',
                    'bg-secondary-10': 'var(--theme-bg-secondary-10)',
                    'bg-accent-10': 'var(--theme-bg-accent-10)',
                    // 阴影颜色
                    'shadow-primary-30': 'var(--theme-shadow-primary-30)',
                    'shadow-secondary-30': 'var(--theme-shadow-secondary-30)',
                    'shadow-accent-30': 'var(--theme-shadow-accent-30)',
                    divider: 'var(--theme-divider)',
                    hover: 'var(--theme-hover)',
                    button: 'var(--theme-button)', // 新增按钮颜色
                    loading: 'var(--theme-loading)',
                    glow: 'var(--theme-glow)',
                    shadow: 'var(--theme-shadow)',
                    cursor: 'var(--theme-cursor)',
                    'avatar-glow': 'var(--theme-avatar-glow)',
                    // 新增渐变色配置
                    'gradient-from': 'var(--theme-gradient-from)',
                    'gradient-via': 'var(--theme-gradient-via)',
                    'gradient-to': 'var(--theme-gradient-to)',
                    success: 'var(--theme-success)',
                    warning: 'var(--theme-warning)',
                    error: 'var(--theme-error)',
                    // 地图专用高对比度颜色
                    'map-button': {
                        bg: 'var(--theme-map-button-bg)',
                        'bg-hover': 'var(--theme-map-button-bg-hover)',
                        border: 'var(--theme-map-button-border)',
                        'border-hover': 'var(--theme-map-button-border-hover)',
                        text: 'var(--theme-map-button-text)',
                        'text-hover': 'var(--theme-map-button-text-hover)',
                    },
                },

                // 黄金分割比例相关的颜色和尺寸
                golden: {
                    ratio: '1.618',
                    content: '58%',
                    sidebar: '42%',
                },
            },
            animation: {
                hueRotate: "hueRotate 5s linear infinite",
                zoomIn: "zoomIn 1s ease forwards",
                slideIn: "slideIn 1s ease forwards",
                'spin-reverse': 'spin-reverse 1s linear infinite',
            },
            keyframes: {
                hueRotate: {
                    "0%": { boxShadow: "0 0 20px #1d2012", borderColor: "#1d2012" },
                    "20%": { boxShadow: "0 0 40px #afcc8f", borderColor: "#afcc8f" },
                    "50%": { boxShadow: "0 0 60px #7ca65c", borderColor: "#7ca65c" },
                    "80%": { boxShadow: "0 0 40px #5d7d4b", borderColor: "#5d7d4b" },
                    "100%": { boxShadow: "0 0 20px #768e90", borderColor: "#768e90" },
                },
                'spin-reverse': {
                    '0%': { transform: 'rotate(360deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                zoomIn: {
                    "0%": { transform: "scale(0)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                slideIn: {
                    "0%": { transform: "translateY(30px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                full: "50%",
            },
        },
    },
    plugins: [],
}
