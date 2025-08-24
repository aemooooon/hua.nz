/**
 * 现代纹理加载器
 * 集成智能格式选择、预加载、缓存等功能
 * 支持AVIF、WebP和JPEG格式的自动回退
 */

import * as THREE from 'three';

export class TextureLoader {
    constructor(options = {}) {
        this.loader = new THREE.TextureLoader();
        this.cache = new Map();
        this.loadingPromises = new Map();
        
        // 默认配置
        this.config = {
            enableCache: true,
            enableFallback: true,
            maxRetries: 2,
            timeout: 10000, // 10秒超时
            compression: {
                maxSize: 1024,
                quality: 0.9
            },
            ...options
        };

        // 纹理默认设置
        this.defaultTextureSettings = {
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
            magFilter: THREE.LinearFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            colorSpace: THREE.SRGBColorSpace
        };
    }

    /**
     * 获取最优的文件路径，自动跳过视频文件
     */
    async getOptimalPath(baseName, baseDirectory = 'cube-textures') {
        console.log(`🔍 开始为 ${baseName} 获取最优路径...`);
        
        // 检查是否是视频文件，直接返回原路径
        if (baseName && baseName.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
            return {
                primary: `${baseDirectory}/${baseName}`,
                fallback: `${baseDirectory}/${baseName}`,
                format: 'video'
            };
        }
        
        const { formatDetector } = await import('./FormatDetector.js');
        const format = await formatDetector.getBestFormat();
        console.log(`📋 检测到的最佳格式: ${format.toUpperCase()}`);
        
        // 提取文件名（去除路径和扩展名）
        const fileName = baseName.split('/').pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
        
        // 检测是否为gallery图片（基于文件名前缀）
        const isGalleryImage = fileName.startsWith('gallery-');
        
        console.log(`🔍 TextureLoader: 处理 ${baseName}, 文件名: ${fileName}, 格式: ${format}, 是Gallery图片: ${isGalleryImage}`);
        
        let pathMapping;
        if (isGalleryImage) {
            // Gallery图片使用gallery目录结构
            pathMapping = {
                'avif': `gallery-avif/${fileName}.avif`,
                'webp': `gallery-webp/${fileName}.webp`,
                'jpg': `gallery/${fileName}.jpg`
            };
            console.log(`📁 使用Gallery目录结构:`, pathMapping);
        } else {
            // 其他图片使用cube-textures目录结构
            pathMapping = {
                'avif': `cube-textures-avif/${baseName}.avif`,
                'webp': `cube-textures-webp/${baseName}.webp`,
                'jpg': `${baseDirectory}/${baseName}.jpg`
            };
            console.log(`📁 使用Cube目录结构:`, pathMapping);
        }

        const result = {
            primary: pathMapping[format],
            fallback: pathMapping['jpg'],
            format,
            isGalleryImage
        };
        
        console.log(`🎯 选择的路径: 主要=${result.primary}, 备用=${result.fallback}`);
        
        return result;
    }

    /**
     * 加载单个纹理
     */
    async loadTexture(baseName, options = {}) {
        const cacheKey = `${baseName}_${JSON.stringify(options)}`;
        
        // 检查缓存
        if (this.config.enableCache && this.cache.has(cacheKey)) {
            console.log(`📦 从缓存加载纹理: ${baseName}`);
            return this.cache.get(cacheKey);
        }

        // 检查是否已在加载中
        if (this.loadingPromises.has(cacheKey)) {
            return this.loadingPromises.get(cacheKey);
        }

        // 创建加载Promise
        const loadingPromise = this._loadTextureWithFallback(baseName, options);
        this.loadingPromises.set(cacheKey, loadingPromise);

        try {
            const texture = await loadingPromise;
            
            // 缓存结果
            if (this.config.enableCache) {
                this.cache.set(cacheKey, texture);
            }
            
            return texture;
        } finally {
            this.loadingPromises.delete(cacheKey);
        }
    }

    /**
     * 带回退机制的纹理加载
     */
    async _loadTextureWithFallback(baseName, options) {
        const { primary, fallback, format } = await this.getOptimalPath(baseName);
        const primaryUrl = `/${primary}`;
        const fallbackUrl = `/${fallback}`;

        console.log(`🔄 开始加载纹理: ${baseName}`);
        console.log(`🎯 优选格式: ${format.toUpperCase()} -> ${primaryUrl}`);
        console.log(`🔄 备用格式: JPG -> ${fallbackUrl}`);

        try {
            // 尝试加载最优格式
            const texture = await this._loadSingleTexture(primaryUrl, options);
            console.log(`✅ 纹理加载成功: ${primaryUrl}`);
            return texture;
        } catch (primaryError) {
            console.warn(`⚠️ 主格式加载失败: ${primaryUrl}`, primaryError);

            if (this.config.enableFallback && format !== 'jpg') {
                console.log(`🔄 回退到JPEG格式: ${fallbackUrl}`);
                try {
                    const texture = await this._loadSingleTexture(fallbackUrl, options);
                    console.log(`✅ 回退加载成功: ${fallbackUrl}`);
                    return texture;
                } catch (fallbackError) {
                    console.error(`❌ 回退也失败: ${fallbackUrl}`, fallbackError);
                    throw fallbackError;
                }
            } else {
                throw primaryError;
            }
        }
    }

    /**
     * 加载单个纹理文件
     */
    _loadSingleTexture(url, options) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error(`纹理加载超时: ${url}`));
            }, this.config.timeout);

            this.loader.load(
                url,
                (texture) => {
                    clearTimeout(timeout);
                    this._applyTextureSettings(texture, options);
                    resolve(texture);
                },
                undefined, // progress
                (error) => {
                    clearTimeout(timeout);
                    reject(error);
                }
            );
        });
    }

    /**
     * 应用纹理设置
     */
    _applyTextureSettings(texture, options = {}) {
        const settings = { ...this.defaultTextureSettings, ...options };
        
        Object.keys(settings).forEach(key => {
            if (texture[key] !== undefined) {
                texture[key] = settings[key];
            }
        });

        texture.needsUpdate = true;
        return texture;
    }

    /**
     * 批量加载纹理
     */
    async loadTextures(textureNames, options = {}) {
        const { onProgress, onError } = options;
        
        console.log(`🎯 开始批量加载 ${textureNames.length} 个纹理...`);
        
        let loadedCount = 0;
        const results = [];

        const loadPromises = textureNames.map(async (name, index) => {
            try {
                const texture = await this.loadTexture(name, options);
                results[index] = texture;
                loadedCount++;
                
                if (onProgress) {
                    onProgress(loadedCount / textureNames.length, loadedCount, textureNames.length);
                }
                
                return texture;
            } catch (error) {
                console.error(`纹理加载失败: ${name}`, error);
                if (onError) {
                    onError(error, name);
                }
                results[index] = null;
                loadedCount++;
                
                if (onProgress) {
                    onProgress(loadedCount / textureNames.length, loadedCount, textureNames.length);
                }
                
                return null;
            }
        });

        await Promise.allSettled(loadPromises);
        
        const successCount = results.filter(r => r !== null).length;
        console.log(`✨ 批量加载完成: ${successCount}/${textureNames.length} 成功`);
        
        return results;
    }

    /**
     * 预加载纹理（只加载不返回）
     */
    async preloadTextures(textureNames, options = {}) {
        console.log(`⚡ 预加载 ${textureNames.length} 个纹理...`);
        
        const preloadPromises = textureNames.map(name => 
            this.loadTexture(name, options).catch(error => {
                console.warn(`预加载失败: ${name}`, error);
                return null;
            })
        );

        const results = await Promise.allSettled(preloadPromises);
        const successCount = results.filter(r => r.status === 'fulfilled' && r.value).length;
        
        console.log(`⚡ 预加载完成: ${successCount}/${textureNames.length} 成功`);
        return successCount;
    }

    /**
     * 获取缓存的纹理
     */
    getCachedTexture(baseName, options = {}) {
        const cacheKey = `${baseName}_${JSON.stringify(options)}`;
        return this.cache.get(cacheKey);
    }

    /**
     * 清理缓存
     */
    clearCache() {
        console.log(`🧹 清理纹理缓存，共 ${this.cache.size} 个纹理`);
        
        // 释放WebGL资源
        this.cache.forEach((texture, key) => {
            if (texture && texture.dispose) {
                texture.dispose();
                console.log(`🗑️ 释放纹理资源: ${key}`);
            }
        });
        
        this.cache.clear();
        this.loadingPromises.clear();
        console.log('✅ 纹理缓存已清理');
    }

    /**
     * 获取缓存统计信息
     */
    getCacheStats() {
        return {
            total: this.cache.size,
            loading: this.loadingPromises.size,
            memory: this._estimateMemoryUsage()
        };
    }

    /**
     * 估算内存使用量
     */
    _estimateMemoryUsage() {
        let totalSize = 0;
        this.cache.forEach(texture => {
            if (texture && texture.image) {
                const width = texture.image.width || 0;
                const height = texture.image.height || 0;
                // 估算：4字节/像素 (RGBA)
                totalSize += width * height * 4;
            }
        });
        return {
            bytes: totalSize,
            mb: Math.round(totalSize / (1024 * 1024) * 100) / 100
        };
    }
}

// 创建单例实例
export const textureLoader = new TextureLoader();
export default textureLoader;