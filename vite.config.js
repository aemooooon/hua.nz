import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  define: {
  },
  publicDir: 'public',
  plugins: [react()],
  assetsInclude: ['**/*.jpeg/**', '**/*.json/**', '**/*.jpg/**', '**/*.png/**', '**/*.svg/**', '**/*.webp/**'],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("leaflet")) return "leaflet";
            if (id.includes("gsap")) return "gsap";
            if (id.includes("three")) return "three";
            return "vendor";
          }
        },
      },
    },
  },
})
