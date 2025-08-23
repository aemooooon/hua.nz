/**
 * Gallery专属纹理管理器
 * 基于texture system的最佳实践，优化gallery图片加载
 */

import textureSystem from '../../../../utils/texture';
import { formatDetector } from '../../../../utils/texture/FormatDetector.js';

export class GalleryTextureManager {
    constructor() {
        this.preloadedTextures = new Map();
        this.loadingPromises = new Map();
        this.compressionInfo = null;
    }

    /**
     * 初始化并获取浏览器支持信息
     */
    async initialize() {
        if (!this.compressionInfo) {
            // 等待格式检测完成
            await formatDetector.initializationPromise;
            
            // 获取实际的格式支持状态
            const formats = {
                avif: formatDetector.supportCache.get('avif'),
                webp: formatDetector.supportCache.get('webp'),
                jpg: true // JPG总是支持
            };
            
            // 获取压缩信息用于日志
            const compressionInfo = await textureSystem.getCompressionInfo();
            
            this.compressionInfo = {
                formats,
                bestFormat: compressionInfo.format,
                details: compressionInfo
            };
            
            console.log('🖼️ Gallery纹理管理器初始化，格式支持:', {
                AVIF: formats.avif ? '✅' : '❌',
                WebP: formats.webp ? '✅' : '❌', 
                JPG: '✅',
                bestFormat: compressionInfo.format
            });
        }
        return this.compressionInfo;
    }

    /**
     * 获取最佳图片路径
     * @param {string} imageName - 图片名称（不含扩展名）
     * @param {string} folder - 文件夹名称，默认'gallery'
     */
    getBestImagePath(imageName, folder = 'gallery') {
        if (!this.compressionInfo || !this.compressionInfo.formats) {
            console.warn('纹理管理器未初始化或格式信息缺失，使用默认JPG格式');
            return `/${folder}/${imageName}.jpg`;
        }

        const formats = this.compressionInfo.formats;
        let selectedFormat, selectedPath;
        
        // 优先级：AVIF > WebP > JPG
        if (formats.avif) {
            selectedFormat = 'AVIF';
            selectedPath = `/${folder}-avif/${imageName}.avif`;
        } else if (formats.webp) {
            selectedFormat = 'WebP';
            selectedPath = `/${folder}-webp/${imageName}.webp`;
        } else {
            selectedFormat = 'JPG';
            selectedPath = `/${folder}/${imageName}.jpg`;
        }
        
        console.log(`🎯 选择${selectedFormat}格式: ${imageName} -> ${selectedPath}`);
        return selectedPath;
    }

    /**
     * 预加载gallery图片
     * @param {Array<string>} imageNames - 图片名称数组
     * @param {string} folder - 文件夹名称
     */
    async preloadGalleryImages(imageNames, folder = 'gallery') {
        await this.initialize();

        const preloadPromises = imageNames.map(async (imageName) => {
            const cacheKey = `${folder}-${imageName}`;
            
            if (this.preloadedTextures.has(cacheKey)) {
                return this.preloadedTextures.get(cacheKey);
            }

            if (this.loadingPromises.has(cacheKey)) {
                return this.loadingPromises.get(cacheKey);
            }

            const promise = this.loadSingleImage(imageName, folder, cacheKey);
            this.loadingPromises.set(cacheKey, promise);
            
            return promise;
        });

        try {
            const results = await Promise.allSettled(preloadPromises);
            const successCount = results.filter(r => r.status === 'fulfilled').length;
            console.log(`✅ Gallery预加载完成: ${successCount}/${imageNames.length} 张图片`);
            return results;
        } catch (error) {
            console.error('❌ Gallery预加载失败:', error);
            throw error;
        }
    }

    /**
     * 加载单张图片
     */
    async loadSingleImage(imageName, folder, cacheKey) {
        try {
            const imagePath = this.getBestImagePath(imageName, folder);
            
            // 使用原生Image对象预加载
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            const loadPromise = new Promise((resolve, reject) => {
                img.onload = () => {
                    console.log(`✅ 预加载成功: ${imagePath}`);
                    this.preloadedTextures.set(cacheKey, imagePath);
                    this.loadingPromises.delete(cacheKey);
                    resolve(imagePath);
                };
                
                img.onerror = () => {
                    console.warn(`⚠️ 预加载失败，尝试fallback: ${imagePath}`);
                    this.tryFallback(imageName, folder, cacheKey).then(resolve).catch(reject);
                };
            });

            img.src = imagePath;
            return loadPromise;
        } catch (error) {
            console.error(`❌ 加载图片失败: ${imageName}`, error);
            throw error;
        }
    }

    /**
     * 尝试降级加载
     */
    async tryFallback(imageName, folder, cacheKey) {
        const fallbackFormats = [
            { path: `/${folder}-webp/${imageName}.webp`, format: 'WebP' },
            { path: `/${folder}/${imageName}.jpg`, format: 'JPG' }
        ];

        for (const { path, format } of fallbackFormats) {
            try {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                const result = await new Promise((resolve, reject) => {
                    img.onload = () => {
                        console.log(`✅ Fallback成功 (${format}): ${path}`);
                        this.preloadedTextures.set(cacheKey, path);
                        resolve(path);
                    };
                    img.onerror = reject;
                });

                return result;
            } catch {
                console.warn(`⚠️ Fallback失败 (${format}): ${path}`);
                continue;
            }
        }

        throw new Error(`所有格式都加载失败: ${imageName}`);
    }

    /**
     * 获取预加载的图片路径
     */
    getPreloadedImagePath(imageName, folder = 'gallery') {
        const cacheKey = `${folder}-${imageName}`;
        return this.preloadedTextures.get(cacheKey) || this.getBestImagePath(imageName, folder);
    }

    /**
     * 清理缓存
     */
    clearCache() {
        this.preloadedTextures.clear();
        this.loadingPromises.clear();
        console.log('🧹 Gallery纹理缓存已清理');
    }

    /**
     * 获取统计信息
     */
    getStats() {
        return {
            preloadedCount: this.preloadedTextures.size,
            loadingCount: this.loadingPromises.size,
            compressionSupport: this.compressionInfo
        };
    }
}

// 创建单例实例
export const galleryTextureManager = new GalleryTextureManager();
export default galleryTextureManager;
