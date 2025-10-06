import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    define: {},
    publicDir: 'public',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', '**/*.{png,jpg,jpeg,svg,webp,avif,mp4,pdf}'],
            manifest: {
                name: 'Hua Wang',
                short_name: 'Hua',
                description:
                    'Full Stack Developer specializing in modern web technologies, showcasing innovative projects and professional expertise',
                theme_color: '#000000',
                background_color: '#000000',
                display: 'standalone',
                orientation: 'portrait-primary',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: '/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                    {
                        src: '/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
            workbox: {
                // 预缓存核心文件（js, css, html）和小图标
                globPatterns: ['**/*.{js,css,html,ico,svg,json}'],
                // 排除大文件和媒体资源 - 通过运行时缓存按需加载
                globIgnores: [
                    '**/ui-test.mp4',
                    '**/video.mp4',
                    '**/citanz/**',
                    '**/citanz-webp/**',
                    '**/citanz-avif/**',
                    '**/gallery/**',
                    '**/gallery-webp/**',
                    '**/gallery-avif/**',
                    '**/*-webp/**',
                    '**/*-avif/**',
                    '**/assets/**',
                ],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gstatic-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        // 图片运行时缓存
                        urlPattern: /\.(webp|avif|jpg|jpeg|png)$/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images-cache',
                            expiration: {
                                maxEntries: 200,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /\.mp4$/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'videos-cache',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                            },
                            rangeRequests: true,
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        urlPattern: /\.pdf$/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'pdf-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                            },
                        },
                    },
                ],
            },
            devOptions: {
                enabled: false,
            },
        }),
    ],
    assetsInclude: [
        '**/*.jpeg/**',
        '**/*.json/**',
        '**/*.jpg/**',
        '**/*.png/**',
        '**/*.svg/**',
        '**/*.webp/**',
    ],
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // Three.js 独立分块
                        if (id.includes('three')) return 'three';

                        // React 生态系统
                        if (id.includes('react') || id.includes('@react')) return 'react';

                        // 地图库
                        if (id.includes('leaflet')) return 'leaflet';

                        // 动画库
                        if (id.includes('gsap')) return 'gsap';

                        // D3 可视化
                        if (id.includes('d3')) return 'd3';

                        // 其他第三方库
                        return 'vendor';
                    }

                    // Gallery 相关代码
                    if (id.includes('/gallery/') || id.includes('Gallery')) {
                        return 'gallery';
                    }

                    // 纹理系统
                    if (id.includes('/texture/') || id.includes('Texture')) {
                        return 'texture-system';
                    }

                    // 项目详情页面
                    if (id.includes('ProjectSection') || id.includes('project/')) {
                        return 'projects';
                    }

                    // 首页
                    if (id.includes('HomeSection') || id.includes('/home/')) {
                        return 'home';
                    }

                    // 关于页面
                    if (id.includes('AboutSection') || id.includes('/about/')) {
                        return 'about';
                    }
                },
            },
        },
    },
});
