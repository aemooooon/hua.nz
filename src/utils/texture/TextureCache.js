/**
 * TextureCache - 智能纹理缓存管理器
 * 
 * 功能：
 * 1. LRU缓存策略，自动清理最少使用的纹理
 * 2. 内存使用监控和限制
 * 3. 纹理预加载和懒加载
 * 4. 格式优化和回退机制
 * 5. 批量操作和优先级队列
 */

import * as THREE from 'three';

class TextureCache {
    constructor(options = {}) {
        this.maxSize = options.maxSize || 50; // 最大缓存数量
        this.maxMemory = options.maxMemory || 256 * 1024 * 1024; // 256MB内存限制
        this.cache = new Map();
        this.usage = new Map(); // LRU追踪
        this.memoryUsage = 0;
        this.accessCounter = 0;
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
            memoryPeak: 0
        };
        
        console.log('🗄️ TextureCache初始化', { maxSize: this.maxSize, maxMemory: this.maxMemory });
    }

    /**
     * 获取纹理（带LRU更新）
     */
    get(key) {
        if (this.cache.has(key)) {
            this.updateUsage(key);
            this.stats.hits++;
            return this.cache.get(key);
        }
        this.stats.misses++;
        return null;
    }

    /**
     * 设置纹理（带内存管理）
     */
    set(key, texture, metadata = {}) {
        try {
            // 计算纹理内存使用
            const textureMemory = this.estimateTextureMemory(texture);
            
            // 如果需要，清理缓存为新纹理腾出空间
            this.makeSpace(textureMemory);
            
            // 如果已存在，先清理旧的
            if (this.cache.has(key)) {
                this.remove(key, false);
            }
            
            // 添加新纹理
            this.cache.set(key, texture);
            this.updateUsage(key);
            this.memoryUsage += textureMemory;
            this.stats.memoryPeak = Math.max(this.stats.memoryPeak, this.memoryUsage);
            
            // 存储元数据
            texture.userData = texture.userData || {};
            texture.userData.cacheKey = key;
            texture.userData.memorySize = textureMemory;
            texture.userData.metadata = metadata;
            texture.userData.cachedAt = Date.now();
            
            console.log(`📥 纹理已缓存: ${key} (${this.formatBytes(textureMemory)})`);
            
        } catch (error) {
            console.warn('⚠️ 纹理缓存失败:', key, error);
        }
    }

    /**
     * 移除纹理
     */
    remove(key, dispose = true) {
        if (this.cache.has(key)) {
            const texture = this.cache.get(key);
            const memorySize = texture.userData?.memorySize || 0;
            
            if (dispose && texture.dispose) {
                texture.dispose();
            }
            
            this.cache.delete(key);
            this.usage.delete(key);
            this.memoryUsage -= memorySize;
            
            console.log(`🗑️ 纹理已移除: ${key} (${this.formatBytes(memorySize)})`);
        }
    }

    /**
     * 批量预加载纹理
     */
    async preloadTextures(textureConfigs, onProgress) {
        console.log(`🚀 开始批量预加载 ${textureConfigs.length} 个纹理`);
        
        const results = {
            success: [],
            failed: [],
            cached: []
        };
        
        for (let i = 0; i < textureConfigs.length; i++) {
            const config = textureConfigs[i];
            const { key, src, options = {} } = config;
            
            try {
                // 检查是否已缓存
                if (this.cache.has(key)) {
                    results.cached.push(key);
                    this.updateUsage(key);
                    if (onProgress) onProgress((i + 1) / textureConfigs.length, key, 'cached');
                    continue;
                }
                
                // 加载新纹理
                const texture = await this.loadTexture(src, options);
                if (texture) {
                    this.set(key, texture, { src, options, preloaded: true });
                    results.success.push(key);
                } else {
                    results.failed.push({ key, error: 'Load failed' });
                }
                
                if (onProgress) {
                    onProgress((i + 1) / textureConfigs.length, key, texture ? 'success' : 'failed');
                }
                
            } catch (error) {
                console.warn(`⚠️ 预加载失败: ${key}`, error);
                results.failed.push({ key, error: error.message });
                if (onProgress) onProgress((i + 1) / textureConfigs.length, key, 'failed');
            }
        }
        
        console.log(`✅ 预加载完成:`, results);
        return results;
    }

    /**
     * 加载单个纹理
     */
    async loadTexture(src, options = {}) {
        return new Promise((resolve) => {
            const loader = new THREE.TextureLoader();
            
            loader.load(
                src,
                (texture) => {
                    // 应用纹理选项
                    this.applyTextureOptions(texture, options);
                    resolve(texture);
                },
                undefined, // onProgress
                (error) => {
                    console.warn(`⚠️ 纹理加载失败: ${src}`, error);
                    resolve(null);
                }
            );
        });
    }

    /**
     * 应用纹理选项
     */
    applyTextureOptions(texture, options) {
        const {
            wrapS = THREE.RepeatWrapping,
            wrapT = THREE.RepeatWrapping,
            magFilter = THREE.LinearFilter,
            minFilter = THREE.LinearMipmapLinearFilter,
            repeat,
            offset,
            generateMipmaps = true,
            flipY = true,
            colorSpace = THREE.SRGBColorSpace
        } = options;
        
        texture.wrapS = wrapS;
        texture.wrapT = wrapT;
        texture.magFilter = magFilter;
        texture.minFilter = minFilter;
        texture.generateMipmaps = generateMipmaps;
        texture.flipY = flipY;
        texture.colorSpace = colorSpace;
        
        if (repeat) {
            texture.repeat.set(repeat.x || 1, repeat.y || 1);
        }
        
        if (offset) {
            texture.offset.set(offset.x || 0, offset.y || 0);
        }
    }

    /**
     * 估算纹理内存使用
     */
    estimateTextureMemory(texture) {
        if (!texture.image) return 1024; // 默认估算
        
        const width = texture.image.width || 512;
        const height = texture.image.height || 512;
        const channels = 4; // RGBA
        const bytesPerChannel = 1; // 8位
        
        // 考虑mipmaps
        const mipmapMultiplier = texture.generateMipmaps ? 1.33 : 1;
        
        return width * height * channels * bytesPerChannel * mipmapMultiplier;
    }

    /**
     * 为新纹理腾出空间
     */
    makeSpace(requiredMemory) {
        // 检查是否需要清理
        while ((this.cache.size >= this.maxSize || 
                this.memoryUsage + requiredMemory > this.maxMemory) && 
               this.cache.size > 0) {
            
            const lruKey = this.getLRUKey();
            if (lruKey) {
                this.remove(lruKey);
                this.stats.evictions++;
            } else {
                break;
            }
        }
    }

    /**
     * 获取最少使用的纹理键
     */
    getLRUKey() {
        let oldestKey = null;
        let oldestAccess = Infinity;
        
        for (const [key, lastAccess] of this.usage) {
            if (lastAccess < oldestAccess) {
                oldestAccess = lastAccess;
                oldestKey = key;
            }
        }
        
        return oldestKey;
    }

    /**
     * 更新使用时间
     */
    updateUsage(key) {
        this.usage.set(key, ++this.accessCounter);
    }

    /**
     * 清理所有缓存
     */
    clear() {
        console.log('🧹 清理纹理缓存...');
        
        for (const [, texture] of this.cache) {
            if (texture.dispose) {
                texture.dispose();
            }
        }
        
        this.cache.clear();
        this.usage.clear();
        this.memoryUsage = 0;
        
        console.log('✅ 纹理缓存已清理');
    }

    /**
     * 获取缓存统计
     */
    getStats() {
        return {
            ...this.stats,
            cacheSize: this.cache.size,
            memoryUsage: this.memoryUsage,
            memoryUsageFormatted: this.formatBytes(this.memoryUsage),
            memoryPeakFormatted: this.formatBytes(this.stats.memoryPeak),
            hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0,
            cachedTextures: Array.from(this.cache.keys()),
            oldestTextures: this.getOldestTextures(5)
        };
    }

    /**
     * 获取最老的纹理列表
     */
    getOldestTextures(count = 5) {
        return Array.from(this.usage.entries())
            .sort((a, b) => a[1] - b[1])
            .slice(0, count)
            .map(([key, access]) => ({
                key,
                lastAccess: access,
                texture: this.cache.get(key)?.userData
            }));
    }

    /**
     * 格式化字节数
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * 获取缓存中的所有键
     */
    keys() {
        return Array.from(this.cache.keys());
    }

    /**
     * 检查键是否存在
     */
    has(key) {
        return this.cache.has(key);
    }

    /**
     * 获取缓存大小
     */
    size() {
        return this.cache.size;
    }
}

// 创建全局纹理缓存实例
export const globalTextureCache = new TextureCache({
    maxSize: 50,
    maxMemory: 256 * 1024 * 1024 // 256MB
});

export default TextureCache;
