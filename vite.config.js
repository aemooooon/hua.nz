import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
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
})
