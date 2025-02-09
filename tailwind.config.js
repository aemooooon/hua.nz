export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        audiowide: ['"Audiowide"', 'cursive'],
        beauRivage: ['"Beau Rivage"', 'serif'],
        figtree: ['"Figtree"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        primaryDark: '#1d2012',
        primary: '#afcc8f',
        secondary: '#7ca65c',
        accent: '#5d7d4b',
        muted: '#768e90',
        bg: '#f4f7f4',
        textDark: '#1a1a1a',
        textLight: '#ffffff',
        dark: '#171f2b',
        gray: {
          800: '#2d3542',
        },
      },
      animation: {
        hueRotate: "hueRotate 5s linear infinite",
        zoomIn: "zoomIn 1s ease forwards",
        slideIn: "slideIn 1s ease forwards",
      },
      keyframes: {
        hueRotate: {
          "0%": { boxShadow: "0 0 20px #1d2012", borderColor: "#1d2012" },
          "20%": { boxShadow: "0 0 40px #afcc8f", borderColor: "#afcc8f" },
          "50%": { boxShadow: "0 0 60px #7ca65c", borderColor: "#7ca65c" },
          "80%": { boxShadow: "0 0 40px #5d7d4b", borderColor: "#5d7d4b" },
          "100%": { boxShadow: "0 0 20px #768e90", borderColor: "#768e90" },
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
