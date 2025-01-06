/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ['"Audiowide"', 'cursive'],
        beauRivage: ['"Beau Rivage"', 'serif'],
        figtree: ['"Figtree"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        primaryDark: '#1d2012', // 深绿色
        primary: '#afcc8f', // 浅绿色
        secondary: '#7ca65c', // 中等绿色
        accent: '#5d7d4b', // 次要绿色
        muted: '#768e90', // 蓝绿色
        bg: '#f4f7f4', // 背景灰绿色
        textDark: '#1a1a1a', // 深色文本
        textLight: '#ffffff', // 浅色文本
      },
      animation: {
        hueRotate: "hueRotate 5s linear infinite",
        zoomIn: "zoomIn 1s ease forwards",
        slideIn: "slideIn 1s ease forwards",
      },
      keyframes: {
        hueRotate: {
          "0%": {
            boxShadow: "0 0 20px var(--color-primary-dark)",
            borderColor: "var(--color-primary-dark)",
          },
          "20%": {
            boxShadow: "0 0 40px var(--color-primary)",
            borderColor: "var(--color-primary)",
          },
          "50%": {
            boxShadow: "0 0 60px var(--color-secondary)",
            borderColor: "var(--color-secondary)",
          },
          "80%": {
            boxShadow: "0 0 40px var(--color-accent)",
            borderColor: "var(--color-accent)",
          },
          "100%": {
            boxShadow: "0 0 20px var(--color-muted)",
            borderColor: "var(--color-muted)",
          },
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
        DEFAULT: "0.25rem", // 默认边框半径
        full: "50%", // 圆形边框
      },
    },
  },
  plugins: [],
}

