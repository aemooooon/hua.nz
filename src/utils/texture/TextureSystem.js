/**
 * 统一纹理管理系统
 *
 * 提供场景化纹理管理，支持多种纹理格式自动检测和优化
 *
 * 主要特性：
 * - 统一API，支持所有场景 (Hero Cube, Gallery, Lightbox)
 * - 智能格式检测 (AVIF > WebP > JPEG)
 * - 自动视频文件识别和跳过处理
 * - 场景专用优化器和配置
 * - 完善的错误处理和降级机制
 * - 高效的内存管理和缓存策略
 *
 * @example
 * // Hero Cube场景
 * const cubeTextures = await textureSystem.loadSceneTextures('hero-cube', {
 *   textures: ['about', 'gallery', 'projects'],
 *   videos: [{ name: 'home', src: '/cube-textures/home.mp4' }]
 * });
 *
 * @example
 * // Gallery场景 - 自动过滤视频文件
 * const galleryTextures = await textureSystem.loadSceneTextures('gallery', {
 *   images: ['painting-1', 'painting-2'],
 *   folder: 'gallery'
 * });
 */

import * as THREE from 'three';

/**
 * 统一纹理管理系统
 *
 * 管理全局纹理缓存、场景管理器和性能统计
 */
export class TextureSystem {
    /**
     * 初始化纹理系统
     */
    constructor() {
        this.cache = new Map(); // 全局纹理缓存
        this.loadingPromises = new Map(); // 防重复加载
        this.sceneManagers = new Map(); // 场景专用管理器
        this.performanceStats = {
            totalLoads: 0,
            cacheHits: 0,
            memoryUsage: 0,
            errors: 0,
        };

        // 预定义场景配置
        this.sceneConfigs = {
            'hero-cube': {
                optimizer: this.cubeTextureOptimizer.bind(this),
                basePath: '/cube-textures',
                formats: ['avif', 'webp', 'jpg'],
                fallback: this.createCubeFallback.bind(this),
            },
            gallery: {
                optimizer: this.galleryTextureOptimizer.bind(this),
                basePath: '/gallery',
                formats: ['avif', 'webp', 'jpg'],
                fallback: this.createGalleryFallback.bind(this),
            },
            lightbox: {
                optimizer: this.lightboxTextureOptimizer.bind(this),
                basePath: '/gallery',
                formats: ['avif', 'webp', 'jpg'],
                fallback: this.createLightboxFallback.bind(this),
            },
        };
    }

    /**
     * 场景纹理加载 - 统一入口
     *
     * @param {string} sceneType - 场景类型 ('hero-cube', 'gallery', 'lightbox')
     * @param {Object} options - 加载选项
     * @param {string[]} [options.textures] - 纹理名称数组
     * @param {string[]} [options.images] - 图片名称数组
     * @param {Object[]} [options.videos] - 视频配置数组
     * @param {string} [options.folder] - 自定义文件夹
     * @param {Function} [options.onProgress] - 进度回调
     * @returns {Promise<Object>} 加载结果 {textures: Map, videos: Map, errors: Array}
     */
    async loadSceneTextures(sceneType, options = {}) {
        console.log(`🎯 加载${sceneType}场景纹理...`);

        const config = this.sceneConfigs[sceneType];
        if (!config) {
            throw new Error(`未知场景类型: ${sceneType}`);
        }

        // 确保格式检测完成
        const { formatDetector } = await import('./FormatDetector.js');
        await formatDetector.initializationPromise;

        // 创建场景管理器
        if (!this.sceneManagers.has(sceneType)) {
            this.sceneManagers.set(sceneType, new SceneTextureManager(sceneType, config));
        }

        const manager = this.sceneManagers.get(sceneType);
        return await manager.loadTextures(options);
    }

    /**
     * 获取最优路径 - 支持自定义文件夹，自动跳过视频文件
     */
    async getOptimalPath(name, folder = 'cube-textures') {
        // 检查是否是视频文件，直接返回原路径
        if (name && name.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
            return `/${folder}/${name}`;
        }

        const { formatDetector } = await import('./FormatDetector.js');
        const format = await formatDetector.getBestFormat();
        const fileName = name.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

        const pathMap = {
            avif: `/${folder}-avif/${fileName}.avif`,
            webp: `/${folder}-webp/${fileName}.webp`,
            jpg: `/${folder}/${fileName}.jpg`,
        };

        return pathMap[format] || pathMap['jpg'];
    }

    /**
     * Cube纹理优化器
     */
    cubeTextureOptimizer(texture) {
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    /**
     * Gallery纹理优化器
     */
    galleryTextureOptimizer(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    /**
     * Lightbox纹理优化器
     */
    lightboxTextureOptimizer(texture) {
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    /**
     * 创建Cube回退纹理
     */
    createCubeFallback() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // 棋盘格纹理
        const size = 32;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                ctx.fillStyle = (i + j) % 2 === 0 ? '#666' : '#999';
                ctx.fillRect(i * size, j * size, size, size);
            }
        }

        const texture = new THREE.CanvasTexture(canvas);
        return this.cubeTextureOptimizer(texture);
    }

    /**
     * 创建Gallery回退纹理
     */
    createGalleryFallback() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // 渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#f0f0f0');
        gradient.addColorStop(1, '#d0d0d0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);

        // 添加"图片加载中"文字
        ctx.fillStyle = '#999';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Loading...', 256, 256);

        const texture = new THREE.CanvasTexture(canvas);
        return this.galleryTextureOptimizer(texture);
    }

    /**
     * 创建Lightbox回退纹理
     */
    createLightboxFallback() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // 深色背景
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, 256, 256);

        // 发光效果
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        const texture = new THREE.CanvasTexture(canvas);
        return this.lightboxTextureOptimizer(texture);
    }

    /**
     * 统一清理方法
     */
    cleanup(sceneType) {
        if (sceneType) {
            const manager = this.sceneManagers.get(sceneType);
            if (manager) {
                manager.cleanup();
                this.sceneManagers.delete(sceneType);
            }
        } else {
            // 清理所有
            this.sceneManagers.forEach(manager => manager.cleanup());
            this.sceneManagers.clear();
            this.cache.clear();
            this.loadingPromises.clear();
        }
    }

    /**
     * 获取性能统计
     */
    getStats() {
        const sceneStats = {};
        this.sceneManagers.forEach((manager, sceneType) => {
            sceneStats[sceneType] = manager.getStats();
        });

        return {
            global: this.performanceStats,
            scenes: sceneStats,
            totalCacheSize: this.cache.size,
            totalScenes: this.sceneManagers.size,
        };
    }
}

/**
 * 场景专用纹理管理器
 */
class SceneTextureManager {
    constructor(sceneType, config) {
        this.sceneType = sceneType;
        this.config = config;
        this.textures = new Map();
        this.videos = new Map();
        this.stats = {
            loaded: 0,
            failed: 0,
            cached: 0,
        };
    }

    async loadTextures(options = {}) {
        const { textures = [], videos = [], images = [], folder, onProgress } = options;

        const results = {
            textures: new Map(),
            videos: new Map(),
            errors: [],
        };

        // 处理图片纹理
        const imageList = [...textures, ...images];
        if (imageList.length > 0) {
            const textureResults = await this.loadImageTextures(imageList, folder, onProgress);
            results.textures = textureResults.textures;
            results.errors.push(...textureResults.errors);
        }

        // 处理视频纹理
        if (videos.length > 0) {
            const videoResults = await this.loadVideoTextures(videos, onProgress);
            results.videos = videoResults.videos;
            results.errors.push(...videoResults.errors);
        }

        console.log(`✅ ${this.sceneType}场景加载完成: 
            - 图片: ${results.textures.size}
            - 视频: ${results.videos.size}
            - 错误: ${results.errors.length}`);

        return results;
    }

    async loadImageTextures(names, folder, onProgress) {
        const textures = new Map();
        const errors = [];
        let loaded = 0;

        const loadPromises = names.map(async name => {
            try {
                const basePath = folder || this.config.basePath.replace('/', '');

                // 使用格式检测器直接获取最优路径
                const { formatDetector } = await import('./FormatDetector.js');
                const format = await formatDetector.getBestFormat();
                const fileName = name.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

                const pathMap = {
                    avif: `/${basePath}-avif/${fileName}.avif`,
                    webp: `/${basePath}-webp/${fileName}.webp`,
                    jpg: `/${basePath}/${fileName}.jpg`,
                };

                const path = pathMap[format] || pathMap['jpg'];

                const texture = await this.loadSingleTexture(path);
                const optimized = this.config.optimizer(texture);

                textures.set(name, optimized);
                this.stats.loaded++;
                loaded++;

                if (onProgress) {
                    onProgress(loaded / names.length, loaded, names.length);
                }
            } catch (error) {
                console.warn(`纹理加载失败: ${name}`, error);

                // 使用回退纹理
                const fallback = this.config.fallback();
                textures.set(name, fallback);
                errors.push({ name, error: error.message });
                this.stats.failed++;
                loaded++;

                if (onProgress) {
                    onProgress(loaded / names.length, loaded, names.length);
                }
            }
        });

        await Promise.allSettled(loadPromises);
        return { textures, errors };
    }

    async loadVideoTextures(videos, onProgress) {
        const videoTextures = new Map();
        const errors = [];
        let loaded = 0;

        const loadPromises = videos.map(async videoConfig => {
            try {
                const { name, src } = videoConfig;
                const videoTexture = await this.createVideoTexture(src);

                videoTextures.set(name, videoTexture);
                this.stats.loaded++;
                loaded++;

                if (onProgress) {
                    onProgress(loaded / videos.length, loaded, videos.length);
                }
            } catch (error) {
                console.warn(`视频纹理加载失败: ${videoConfig.name}`, error);
                errors.push({ name: videoConfig.name, error: error.message });
                this.stats.failed++;
                loaded++;

                if (onProgress) {
                    onProgress(loaded / videos.length, loaded, videos.length);
                }
            }
        });

        await Promise.allSettled(loadPromises);
        return { videos: videoTextures, errors };
    }

    async loadSingleTexture(path) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.load(path, resolve, undefined, reject);
        });
    }

    async createVideoTexture(src) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.src = src;
            video.crossOrigin = 'anonymous';
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.playsInline = true;
            video.preload = 'metadata';

            const setupTexture = () => {
                const texture = new THREE.VideoTexture(video);
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.format = THREE.RGBAFormat;
                texture.generateMipmaps = false;
                texture.flipY = true; // 修复：对于视频纹理，通常需要翻转Y轴
                texture.colorSpace = THREE.SRGBColorSpace;

                // 添加标识符，方便在渲染循环中识别
                texture.isVideoTexture = true;

                // 关键：启动视频播放
                video
                    .play()
                    .then(() => {
                        console.log(`🎬 视频开始播放: ${src}`);
                    })
                    .catch(err => {
                        console.warn(`⚠️ 视频自动播放失败，需要用户交互: ${src}`, err);
                    });

                resolve(texture);
            };

            video.addEventListener('loadeddata', setupTexture);
            video.addEventListener('error', reject);
            video.load();
        });
    }

    cleanup() {
        this.textures.forEach(texture => texture.dispose());
        this.videos.forEach(texture => texture.dispose());
        this.textures.clear();
        this.videos.clear();
    }

    getStats() {
        return {
            ...this.stats,
            textureCount: this.textures.size,
            videoCount: this.videos.size,
        };
    }
}

// 创建全局实例
export const textureSystem = new TextureSystem();
export default textureSystem;
