/**
 * 纹理预加载器 - 专门用于THREE.js纹理的预加载
 * 解决首页Cube刚出现时的卡顿问题
 */

import * as THREE from 'three';

class TexturePreloader {
    constructor() {
        this.loadedTextures = new Map();
        this.loadingPromises = new Map();
        this.textureLoader = new THREE.TextureLoader();
        
        // 性能优化设置
        this.defaultSettings = {
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
            magFilter: THREE.LinearFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            colorSpace: THREE.SRGBColorSpace,
            // 预设纹理大小以优化内存使用
            maxSize: 1024
        };
    }

    /**
     * 预加载图片纹理
     * @param {string} url - 图片URL
     * @param {Object} options - 纹理设置选项
     * @returns {Promise<THREE.Texture>}
     */
    async preloadTexture(url, options = {}) {
        // 如果已经加载过，直接返回
        if (this.loadedTextures.has(url)) {
            return this.loadedTextures.get(url);
        }

        // 如果正在加载，返回loading promise
        if (this.loadingPromises.has(url)) {
            return this.loadingPromises.get(url);
        }

        // 创建加载promise
        const loadingPromise = new Promise((resolve, reject) => {
            // 首先预加载图片以获取尺寸信息
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                try {
                    // 检查图片尺寸，如果过大则需要优化
                    const shouldOptimize = img.width > this.defaultSettings.maxSize || img.height > this.defaultSettings.maxSize;
                    
                    if (shouldOptimize) {
                        // 创建优化的canvas版本
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // 计算优化后的尺寸
                        const scale = Math.min(
                            this.defaultSettings.maxSize / img.width,
                            this.defaultSettings.maxSize / img.height
                        );
                        
                        canvas.width = Math.floor(img.width * scale);
                        canvas.height = Math.floor(img.height * scale);
                        
                        // 高质量缩放
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        
                        // 创建纹理
                        const texture = new THREE.CanvasTexture(canvas);
                        this.applyTextureSettings(texture, options);
                        
                        this.loadedTextures.set(url, texture);
                        resolve(texture);
                    } else {
                        // 直接使用原图
                        const texture = new THREE.Texture(img);
                        texture.needsUpdate = true;
                        this.applyTextureSettings(texture, options);
                        
                        this.loadedTextures.set(url, texture);
                        resolve(texture);
                    }
                } catch (error) {
                    console.error(`❌ Failed to process texture: ${url}`, error);
                    reject(error);
                }
            };
            
            img.onerror = (error) => {
                console.error(`❌ Failed to load image: ${url}`, error);
                reject(error);
            };
            
            img.src = url;
        });

        this.loadingPromises.set(url, loadingPromise);
        
        try {
            const texture = await loadingPromise;
            this.loadingPromises.delete(url);
            return texture;
        } catch (error) {
            this.loadingPromises.delete(url);
            throw error;
        }
    }

    /**
     * 预加载视频纹理
     * @param {string} url - 视频URL
     * @param {Object} options - 纹理设置选项
     * @returns {Promise<THREE.VideoTexture>}
     */
    async preloadVideoTexture(url, options = {}) {
        if (this.loadedTextures.has(url)) {
            return this.loadedTextures.get(url);
        }

        if (this.loadingPromises.has(url)) {
            return this.loadingPromises.get(url);
        }

        const loadingPromise = new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.src = url;
            video.crossOrigin = 'anonymous';
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.playsInline = true;
            
            const createTexture = () => {
                try {
                    const texture = new THREE.VideoTexture(video);
                    this.applyTextureSettings(texture, {
                        ...options,
                        format: THREE.RGBAFormat,
                        flipY: false // 重要：防止视频抖动
                    });
                    
                    this.loadedTextures.set(url, texture);
                    resolve(texture);
                } catch (error) {
                    console.error(`❌ Failed to create video texture: ${url}`, error);
                    reject(error);
                }
            };
            
            video.addEventListener('loadeddata', createTexture);
            video.addEventListener('canplay', createTexture);
            video.addEventListener('error', (e) => {
                console.error(`❌ Video loading failed: ${url}`, e);
                reject(e);
            });
            
            // 开始播放视频
            video.play().catch((error) => {
                console.warn(`⚠️ Video autoplay failed: ${url}`, error);
                // 即使autoplay失败，也继续创建纹理
                createTexture();
            });
        });

        this.loadingPromises.set(url, loadingPromise);
        
        try {
            const texture = await loadingPromise;
            this.loadingPromises.delete(url);
            return texture;
        } catch (error) {
            this.loadingPromises.delete(url);
            throw error;
        }
    }

    /**
     * 批量预加载纹理
     * @param {Array} urls - URL数组
     * @param {Object} options - 纹理设置选项
     * @returns {Promise<Array<THREE.Texture>>}
     */
    async preloadBatch(urls, options = {}) {
        const loadPromises = urls.map(url => {
            if (url.endsWith('.mp4') || url.endsWith('.webm')) {
                return this.preloadVideoTexture(url, options);
            } else {
                return this.preloadTexture(url, options);
            }
        });
        
        try {
            const textures = await Promise.all(loadPromises);
            return textures;
        } catch (error) {
            console.error('❌ Batch preload failed:', error);
            throw error;
        }
    }

    /**
     * 应用纹理设置
     * @param {THREE.Texture} texture - 纹理对象
     * @param {Object} options - 设置选项
     */
    applyTextureSettings(texture, options = {}) {
        const settings = { ...this.defaultSettings, ...options };
        
        texture.generateMipmaps = settings.generateMipmaps;
        texture.minFilter = settings.minFilter;
        texture.magFilter = settings.magFilter;
        texture.wrapS = settings.wrapS;
        texture.wrapT = settings.wrapT;
        texture.colorSpace = settings.colorSpace;
        
        if (settings.format) {
            texture.format = settings.format;
        }
        if (settings.flipY !== undefined) {
            texture.flipY = settings.flipY;
        }
    }

    /**
     * 获取已加载的纹理
     * @param {string} url - 纹理URL
     * @returns {THREE.Texture|null}
     */
    getTexture(url) {
        return this.loadedTextures.get(url) || null;
    }

    /**
     * 检查纹理是否已加载
     * @param {string} url - 纹理URL
     * @returns {boolean}
     */
    isLoaded(url) {
        return this.loadedTextures.has(url);
    }

    /**
     * 获取加载进度
     * @returns {Object} - {loaded: number, total: number, progress: number}
     */
    getProgress() {
        const loaded = this.loadedTextures.size;
        const loading = this.loadingPromises.size;
        const total = loaded + loading;
        
        return {
            loaded,
            total,
            progress: total > 0 ? loaded / total : 1
        };
    }

    /**
     * 清理资源
     */
    dispose() {
        // 清理所有已加载的纹理
        this.loadedTextures.forEach((texture) => {
            if (texture.dispose) {
                texture.dispose();
            }
        });
        
        this.loadedTextures.clear();
        this.loadingPromises.clear();
    }
}

// 创建单例实例
const texturePreloader = new TexturePreloader();

export default texturePreloader;
