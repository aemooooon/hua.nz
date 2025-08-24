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
    chunkSizeWarningLimit: 2000, // 为Three.js提升到2MB
    rollupOptions: {
      // 外部化最大的依赖（如果适用）
      // external: ['three'], // 如果你想通过CDN加载Three.js，可以取消注释
      output: {
        manualChunks(id) {
          // 处理node_modules中的大型库
          if (id.includes("node_modules")) {
            // Three.js单独分块（最大的库）
            if (id.includes("three")) return "three";
            
            // React生态系统
            if (id.includes("react") || id.includes("@react")) return "react";
            
            // 地图相关库
            if (id.includes("leaflet")) return "leaflet";
            
            // 动画库
            if (id.includes("gsap")) return "gsap";
            
            // D3相关库
            if (id.includes("d3")) return "d3";
            
            // 其他vendor库
            return "vendor";
          }
          
          // 应用代码分块
          // Gallery相关代码单独分块（包含大量Three.js使用）
          if (id.includes("/gallery/") || id.includes("Gallery")) {
            return "gallery";
          }
          
          // 纹理系统单独分块
          if (id.includes("/texture/") || id.includes("Texture")) {
            return "texture-system";
          }
          
          // 项目详情页面（包含大量D3代码）
          if (id.includes("ProjectSection") || id.includes("project/")) {
            return "projects";
          }
          
          // 其他页面组件
          if (id.includes("HomeSection") || id.includes("/home/")) {
            return "home";
          }
          
          if (id.includes("AboutSection") || id.includes("/about/")) {
            return "about";
          }
        },
      },
    },
  },
})
