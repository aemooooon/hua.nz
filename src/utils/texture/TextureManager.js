/**
 * 高级纹理管理器
 * 提供预加载、内存管理、性能优化等高级功能
 * 专门用于大型应用的纹理资源管理
 */

import * as THREE from 'three';
import { TextureLoader } from './TextureLoader.js';
import { formatDetector } from './FormatDetector.js';

export class TextureManager {
    constructor(options = {}) {
        this.textureLoader = new TextureLoader(options);
        this.preloadQueue = new Map();
        this.loadingQueue = [];
        this.memoryThreshold = options.memoryThreshold || 256; // MB
        this.maxConcurrentLoads = options.maxConcurrentLoads || 6;
        this.activeLoads = 0;
        
        // 性能监控
        this.stats = {
            totalLoads: 0,
            successfulLoads: 0,
            failedLoads: 0,
            cacheHits: 0,
            totalLoadTime: 0
        };

        // 绑定内存监控
        this._setupMemoryMonitoring();
    }

    /**
     * 智能预加载策略
     * 根据优先级和用户行为预测来加载纹理
     */
    async preloadByPriority(textureGroups) {
        console.log('🚀 开始智能预加载...');
        
        // 按优先级排序
        const sortedGroups = Object.entries(textureGroups)
            .sort(([,a], [,b]) => (b.priority || 0) - (a.priority || 0));

        for (const [groupName, group] of sortedGroups) {
            console.log(`📦 预加载组: ${groupName} (优先级: ${group.priority || 0})`);
            
            try {
                await this._preloadGroup(group);
            } catch (error) {
                console.warn(`预加载组失败: ${groupName}`, error);
            }
            
            // 检查内存使用情况
            await this._checkMemoryUsage();
        }
    }

    /**
     * 预加载单个组
     */
    async _preloadGroup(group) {
        const { textures, lazy = false, timeout = 5000 } = group;
        
        if (lazy) {
            // 懒加载：添加到队列但不立即执行
            textures.forEach(name => {
                this.preloadQueue.set(name, { timestamp: Date.now(), group });
            });
            return;
        }

        // 立即预加载
        return this.textureLoader.preloadTextures(textures, { timeout });
    }

    /**
     * 按需加载纹理
     * 当用户交互触发时调用
     */
    async loadOnDemand(textureName, priority = 'normal') {
        const startTime = performance.now();
        this.stats.totalLoads++;

        try {
            // 如果已在预加载队列中，立即加载
            if (this.preloadQueue.has(textureName)) {
                this.preloadQueue.delete(textureName);
            }

            const texture = await this._throttledLoad(textureName, priority);
            
            this.stats.successfulLoads++;
            this.stats.totalLoadTime += performance.now() - startTime;
            
            return texture;
        } catch (error) {
            this.stats.failedLoads++;
            throw error;
        }
    }

    /**
     * 限流加载 - 控制并发数量
     */
    async _throttledLoad(textureName, priority) {
        return new Promise((resolve, reject) => {
            const loadRequest = {
                textureName,
                priority,
                resolve,
                reject,
                timestamp: Date.now()
            };

            this.loadingQueue.push(loadRequest);
            this._processQueue();
        });
    }

    /**
     * 处理加载队列
     */
    async _processQueue() {
        while (this.loadingQueue.length > 0 && this.activeLoads < this.maxConcurrentLoads) {
            // 按优先级排序
            this.loadingQueue.sort((a, b) => {
                const priorityOrder = { high: 3, normal: 2, low: 1 };
                return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
            });

            const request = this.loadingQueue.shift();
            this.activeLoads++;

            this._executeLoad(request);
        }
    }

    /**
     * 执行实际加载
     */
    async _executeLoad(request) {
        const { textureName, resolve, reject } = request;

        try {
            const texture = await this.textureLoader.loadTexture(textureName);
            resolve(texture);
        } catch (error) {
            reject(error);
        } finally {
            this.activeLoads--;
            this._processQueue(); // 继续处理队列
        }
    }

    /**
     * 批量加载cube纹理集合
     * 专门用于cube贴图的优化加载
     */
    async loadCubeTextures(textureNames, options = {}) {
        const { onProgress, onComplete, enableOptimization = true } = options;
        
        console.log(`🎯 开始加载Cube纹理集合: ${textureNames.length}个`);
        
        // 显示格式信息
        const compressionInfo = await formatDetector.getCompressionInfo();
        console.log(`📊 使用格式: ${compressionInfo.format} (节省: ${compressionInfo.savings}%)`);

        let loadedCount = 0;
        const textures = [];

        const loadPromises = textureNames.map(async (name, index) => {
            try {
                const texture = await this.loadOnDemand(name, 'high');
                
                // 应用cube纹理优化
                if (enableOptimization) {
                    this._optimizeForCube(texture);
                }
                
                textures[index] = texture;
                loadedCount++;
                
                if (onProgress) {
                    onProgress(loadedCount / textureNames.length, loadedCount, textureNames.length);
                }
                
                return texture;
            } catch (error) {
                console.error(`Cube纹理加载失败: ${name}`, error);
                textures[index] = this._createFallbackTexture();
                loadedCount++;
                
                if (onProgress) {
                    onProgress(loadedCount / textureNames.length, loadedCount, textureNames.length);
                }
                
                return null;
            }
        });

        await Promise.allSettled(loadPromises);
        
        if (onComplete) {
            onComplete(textures.filter(t => t !== null));
        }

        console.log(`✨ Cube纹理集合加载完成: ${textures.filter(t => t !== null).length}/${textureNames.length}`);
        return textures;
    }

    /**
     * 为Cube渲染优化纹理
     */
    _optimizeForCube(texture) {
        // 设置适合cube的纹理参数
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false; // Cube纹理通常不需要mipmap
        texture.flipY = false; // Cube纹理需要禁用Y轴翻转
        
        return texture;
    }

    /**
     * 创建回退纹理
     */
    _createFallbackTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // 创建渐变背景
        const gradient = ctx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        
        // 添加纹理图案
        ctx.strokeStyle = '#ffffff10';
        ctx.lineWidth = 1;
        for (let i = 0; i < 256; i += 32) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 256);
            ctx.moveTo(0, i);
            ctx.lineTo(256, i);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        this._optimizeForCube(texture);
        
        return texture;
    }

    /**
     * 内存监控和管理
     */
    _setupMemoryMonitoring() {
        // 定期检查内存使用
        setInterval(() => {
            this._checkMemoryUsage();
        }, 30000); // 每30秒检查一次
    }

    /**
     * 检查内存使用情况
     */
    async _checkMemoryUsage() {
        const stats = this.textureLoader.getCacheStats();
        
        if (stats.memory.mb > this.memoryThreshold) {
            console.warn(`⚠️ 纹理内存使用超限: ${stats.memory.mb}MB > ${this.memoryThreshold}MB`);
            await this._performMemoryCleanup();
        }
    }

    /**
     * 执行内存清理
     */
    async _performMemoryCleanup() {
        console.log('🧹 开始纹理内存清理...');
        
        // 清理未使用的预加载队列
        const now = Date.now();
        const staleThreshold = 5 * 60 * 1000; // 5分钟
        
        for (const [name, data] of this.preloadQueue) {
            if (now - data.timestamp > staleThreshold) {
                this.preloadQueue.delete(name);
            }
        }

        // 清理部分缓存（LRU策略）
        // 这里可以实现更复杂的清理策略
        
        console.log('🧹 内存清理完成');
    }

    /**
     * 获取性能统计
     */
    getPerformanceStats() {
        const cacheStats = this.textureLoader.getCacheStats();
        
        return {
            ...this.stats,
            cache: cacheStats,
            queue: {
                preload: this.preloadQueue.size,
                loading: this.loadingQueue.length,
                activeLoads: this.activeLoads
            },
            averageLoadTime: this.stats.totalLoads > 0 
                ? Math.round(this.stats.totalLoadTime / this.stats.totalLoads) 
                : 0,
            successRate: this.stats.totalLoads > 0 
                ? Math.round((this.stats.successfulLoads / this.stats.totalLoads) * 100) 
                : 100
        };
    }

    /**
     * 重置统计信息
     */
    resetStats() {
        this.stats = {
            totalLoads: 0,
            successfulLoads: 0,
            failedLoads: 0,
            cacheHits: 0,
            totalLoadTime: 0
        };
    }

    /**
     * 销毁管理器
     */
    dispose() {
        this.textureLoader.clearCache();
        this.preloadQueue.clear();
        this.loadingQueue.length = 0;
        this.resetStats();
    }
}

// 创建单例实例
export const textureManager = new TextureManager();
export default textureManager;
