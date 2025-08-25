/**
 * GalleryOptimizations - Gallery性能优化工具集
 * 
 * 针对Gallery Section的专门优化：
 * 1. Web Worker计算卸载
 * 2. 智能纹理缓存
 * 3. 渐进式资源加载
 * 4. 性能监控和自适应
 * 5. 内存管理优化
 */

import * as THREE from 'three';
import { globalTextureCache } from '../texture/TextureCache';

export class GalleryOptimizations {
    constructor(options = {}) {
        this.options = {
            enableWorker: true,
            enableTextureCache: true,
            enablePerformanceMonitor: true,
            progressiveLoading: true,
            adaptiveQuality: true,
            memoryLimit: 256 * 1024 * 1024, // 256MB
            ...options
        };
        
        this.loadingState = {
            phase: 'idle', // 'idle' | 'processing' | 'loading' | 'complete'
            progress: 0,
            currentTask: '',
            errors: []
        };
        
        this.performanceState = {
            level: 'good',
            adaptiveMode: false,
            qualityReductions: []
        };
    }

    /**
     * 初始化优化系统
     */
    async initialize() {
        console.log('🚀 Gallery优化系统初始化...');
        
        try {
            // 预热纹理缓存
            if (this.options.enableTextureCache) {
                this.initializeTextureCache();
            }
            
            console.log('✅ Gallery优化系统就绪');
            return true;
        } catch (error) {
            console.error('❌ Gallery优化系统初始化失败:', error);
            return false;
        }
    }

    /**
     * 初始化纹理缓存
     */
    initializeTextureCache() {
        // 配置缓存参数
        globalTextureCache.maxMemory = this.options.memoryLimit;
        console.log('📦 纹理缓存已配置:', globalTextureCache.getStats());
    }

    /**
     * 优化的画廊数据处理 - 使用Worker卸载计算
     */
    async processGalleryData(galleryData, worker) {
        if (!this.options.enableWorker || !worker) {
            return this.fallbackProcessing(galleryData);
        }

        try {
            this.updateLoadingState('processing', 0, '正在分析画廊数据...');
            
            console.log('🔄 使用Worker处理画廊数据...');
            const startTime = performance.now();
            
            const result = await worker.batchProcessGalleryData({
                galleryData,
                maxPaintings: 22
            });
            
            const processingTime = performance.now() - startTime;
            console.log(`✅ Worker处理完成 (${Math.round(processingTime)}ms):`, result.statistics);
            
            this.updateLoadingState('loading', 0.3, '数据处理完成，开始加载资源...');
            
            return result;
        } catch (error) {
            console.warn('⚠️ Worker处理失败，回退到主线程:', error);
            this.loadingState.errors.push({
                type: 'worker_failure',
                message: error.message,
                fallback: true
            });
            
            return this.fallbackProcessing(galleryData);
        }
    }

    /**
     * 回退处理（主线程）
     */
    async fallbackProcessing(galleryData) {
        console.log('🔄 主线程处理画廊数据...');
        this.updateLoadingState('processing', 0, '主线程处理中...');
        
        // 简化的主线程处理逻辑
        const processedData = {
            imageAnalysis: galleryData.slice(0, 22).map((item, index) => ({
                index,
                item,
                aspectRatio: item.aspectRatio || 1.5,
                isPrecomputed: !!(item.aspectRatio && item.dimensions),
                dimensions: item.dimensions || { width: 300, height: 200 }
            })),
            statistics: {
                processedImages: Math.min(galleryData.length, 22),
                fallbackMode: true
            }
        };
        
        this.updateLoadingState('loading', 0.2, '主线程处理完成');
        return processedData;
    }

    /**
     * 渐进式纹理加载
     */
    async loadTexturesProgressively(imageAnalysis, onProgress) {
        if (!this.options.progressiveLoading) {
            return this.loadAllTextures(imageAnalysis, onProgress);
        }

        console.log('📦 开始渐进式纹理加载...');
        
        // 分批加载策略
        const batches = this.createLoadingBatches(imageAnalysis);
        const loadedTextures = new Map();
        let totalProgress = 0;
        
        for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
            const batch = batches[batchIndex];
            const batchName = batch.name;
            
            this.updateLoadingState('loading', totalProgress, `加载${batchName}...`);
            
            try {
                const batchResult = await this.loadTextureBatch(batch.items);
                
                // 合并结果
                for (const [key, texture] of batchResult.entries()) {
                    loadedTextures.set(key, texture);
                }
                
                totalProgress = 0.3 + (0.6 * (batchIndex + 1) / batches.length);
                
                if (onProgress) {
                    onProgress(totalProgress, batchName, loadedTextures.size);
                }
                
                console.log(`✅ ${batchName}加载完成 (${batchResult.size}张)`);
                
                // 小延迟，让UI更新
                await new Promise(resolve => setTimeout(resolve, 50));
                
            } catch (error) {
                console.warn(`⚠️ ${batchName}加载失败:`, error);
                this.loadingState.errors.push({
                    type: 'batch_loading_error',
                    batch: batchName,
                    message: error.message
                });
            }
        }
        
        console.log(`✅ 渐进式加载完成，总计${loadedTextures.size}张纹理`);
        return loadedTextures;
    }

    /**
     * 创建分批加载策略
     */
    createLoadingBatches(imageAnalysis) {
        const batches = [];
        
        // 批次1：关键显示区域（后墙和前墙）
        const criticalImages = imageAnalysis.filter(img => 
            img.item.wall === 'vertical_wall_32m'
        );
        if (criticalImages.length > 0) {
            batches.push({
                name: '关键区域',
                priority: 'high',
                items: criticalImages
            });
        }
        
        // 批次2：主要展示区域（左右墙下层）
        const mainImages = imageAnalysis.filter(img => 
            img.item.wall === 'horizontal_wall_64m' && img.item.layer === 'lower'
        );
        if (mainImages.length > 0) {
            batches.push({
                name: '主展示区',
                priority: 'medium',
                items: mainImages
            });
        }
        
        // 批次3：次要展示区域（左右墙上层）
        const secondaryImages = imageAnalysis.filter(img => 
            img.item.wall === 'horizontal_wall_64m' && img.item.layer === 'upper'
        );
        if (secondaryImages.length > 0) {
            batches.push({
                name: '次展示区',
                priority: 'low',
                items: secondaryImages
            });
        }
        
        // 批次4：特殊内容（灯箱等）
        const specialImages = imageAnalysis.filter(img => 
            img.item.position === 'lightbox' || img.item.type === 'video'
        );
        if (specialImages.length > 0) {
            batches.push({
                name: '特殊内容',
                priority: 'low',
                items: specialImages
            });
        }
        
        return batches;
    }

    /**
     * 加载纹理批次
     */
    async loadTextureBatch(batchItems) {
        const loadedTextures = new Map();
        
        // 并行加载批次中的纹理
        const loadPromises = batchItems.map(async (imageData) => {
            const item = imageData.item;
            const imageSrc = item.src || item.thumbnail;
            
            if (!imageSrc) return null;
            
            try {
                // 检查缓存
                const cacheKey = this.generateCacheKey(item);
                let texture = globalTextureCache.get(cacheKey);
                
                if (!texture) {
                    // 加载新纹理
                    if (item.type === 'video') {
                        texture = await this.loadVideoTexture(imageSrc, item);
                    } else {
                        texture = await this.loadImageTexture(imageSrc);
                    }
                    
                    if (texture) {
                        globalTextureCache.set(cacheKey, texture, {
                            type: item.type,
                            src: imageSrc,
                            wall: item.wall,
                            layer: item.layer
                        });
                    }
                }
                
                if (texture) {
                    loadedTextures.set(item.id, texture);
                }
                
                return { id: item.id, texture, success: true };
            } catch (error) {
                console.warn(`纹理加载失败: ${item.id}`, error);
                return { id: item.id, texture: null, success: false, error };
            }
        });
        
        await Promise.all(loadPromises);
        return loadedTextures;
    }

    /**
     * 生成缓存键
     */
    generateCacheKey(item) {
        const src = item.src || item.thumbnail;
        const quality = this.performanceState.level === 'critical' ? 'low' : 'high';
        return `${item.id}_${quality}_${src.split('/').pop()}`;
    }

    /**
     * 加载图片纹理
     */
    async loadImageTexture(src) {
        return new Promise((resolve) => {
            const loader = new THREE.TextureLoader();
            loader.load(
                src,
                (texture) => {
                    this.applyTextureOptimizations(texture);
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.warn(`图片纹理加载失败: ${src}`, error);
                    resolve(null);
                }
            );
        });
    }

    /**
     * 加载视频纹理
     */
    async loadVideoTexture(src, item) {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.src = src;
            video.crossOrigin = 'anonymous';
            video.loop = item.loop || true;
            video.muted = item.muted || true;
            video.autoplay = item.autoplay || true;
            video.playsInline = true;
            video.preload = 'auto';
            
            const setupTexture = () => {
                try {
                    const texture = new THREE.VideoTexture(video);
                    this.applyVideoTextureOptimizations(texture);
                    resolve(texture);
                } catch (error) {
                    console.warn(`视频纹理创建失败: ${src}`, error);
                    resolve(null);
                }
            };
            
            video.addEventListener('loadeddata', setupTexture);
            video.addEventListener('canplay', setupTexture);
            video.addEventListener('error', () => {
                console.warn(`视频加载失败: ${src}`);
                resolve(null);
            });
            
            video.load();
        });
    }

    /**
     * 应用纹理优化
     */
    applyTextureOptimizations(texture) {
        // 基于性能状态调整纹理设置
        if (this.performanceState.level === 'critical') {
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
        } else {
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
        }
        
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
    }

    /**
     * 应用视频纹理优化
     */
    applyVideoTextureOptimizations(texture) {
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
    }

    /**
     * 更新加载状态
     */
    updateLoadingState(phase, progress, currentTask) {
        this.loadingState = {
            ...this.loadingState,
            phase,
            progress: Math.min(1, Math.max(0, progress)),
            currentTask
        };
    }

    /**
     * 性能自适应调整
     */
    adaptToPerformance(performanceStats) {
        if (!this.options.adaptiveQuality) return;

        const previousLevel = this.performanceState.level;
        this.performanceState.level = performanceStats.performanceLevel;

        // 如果性能降级，应用优化
        if (performanceStats.performanceLevel === 'critical' && previousLevel !== 'critical') {
            this.applyCriticalOptimizations();
        } else if (performanceStats.performanceLevel === 'warning' && previousLevel === 'good') {
            this.applyWarningOptimizations();
        } else if (performanceStats.performanceLevel === 'good' && previousLevel !== 'good') {
            this.restoreQuality();
        }
    }

    /**
     * 应用严重性能问题的优化
     */
    applyCriticalOptimizations() {
        console.log('🚨 应用严重性能优化...');
        
        this.performanceState.qualityReductions.push(
            'disabled_shadows',
            'reduced_texture_quality',
            'disabled_lighting_effects'
        );
        
        // 清理不必要的纹理缓存
        this.cleanupUnusedTextures();
    }

    /**
     * 应用警告级别的优化
     */
    applyWarningOptimizations() {
        console.log('⚠️ 应用性能警告优化...');
        
        this.performanceState.qualityReductions.push(
            'reduced_shadow_quality',
            'optimized_lighting'
        );
    }

    /**
     * 恢复质量设置
     */
    restoreQuality() {
        console.log('✅ 恢复质量设置...');
        this.performanceState.qualityReductions = [];
    }

    /**
     * 清理未使用的纹理
     */
    cleanupUnusedTextures() {
        const stats = globalTextureCache.getStats();
        if (stats.memoryUsage > this.options.memoryLimit * 0.8) {
            console.log('🧹 清理纹理缓存以释放内存...');
            
            // 清理最老的纹理
            const oldestTextures = stats.oldestTextures;
            const toRemove = oldestTextures.slice(0, Math.floor(oldestTextures.length / 3));
            
            toRemove.forEach(({ key }) => {
                globalTextureCache.remove(key);
            });
            
            console.log(`✅ 已清理${toRemove.length}个纹理`);
        }
    }

    /**
     * 获取优化状态
     */
    getOptimizationStatus() {
        return {
            loading: this.loadingState,
            performance: this.performanceState,
            cache: globalTextureCache.getStats(),
            memory: this.getMemoryUsage()
        };
    }

    /**
     * 获取内存使用情况
     */
    getMemoryUsage() {
        if (performance.memory) {
            return {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit,
                usagePercent: (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100
            };
        }
        return null;
    }

    /**
     * 清理资源
     */
    cleanup() {
        console.log('🧹 清理Gallery优化资源...');
        
        if (this.options.enableTextureCache) {
            globalTextureCache.clear();
        }
        
        this.loadingState = {
            phase: 'idle',
            progress: 0,
            currentTask: '',
            errors: []
        };
        
        this.performanceState = {
            level: 'good',
            adaptiveMode: false,
            qualityReductions: []
        };
    }
}

export default GalleryOptimizations;
