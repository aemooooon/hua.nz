/**
 * RealGalleryOptimizer - 真正有效的Gallery优化器
 *
 * 基于实际瓶颈分析的优化方案：
 * 1. 智能分批加载 - 解决网络IO瓶颈
 * 2. 预计算数据优先 - 跳过运行时检测
 * 3. 延迟资源创建 - 减少初始阻塞
 * 4. 纹理缓存池 - 优化GPU资源使用
 */

export class RealGalleryOptimizer {
    constructor(options = {}) {
        this.options = {
            batchSize: 4, // 每批加载数量
            priorityLoadTimeout: 100, // 优先批次间隔
            secondaryLoadDelay: 500, // 次要内容延迟
            usePrecomputedOnly: true, // 强制使用预计算数据
            enableTexturePool: true, // 启用纹理池
            maxTexturePoolSize: 20, // 纹理池大小
            ...options,
        };

        this.state = {
            loadedTextures: new Map(),
            loadingProgress: 0,
            currentBatch: 0,
            errors: [],
        };

        console.log('🎯 RealGalleryOptimizer 初始化', this.options);
    }

    /**
     * 核心优化：智能分批加载策略
     *
     * 问题：22张图片同时请求导致浏览器队列阻塞
     * 解决：分4批，优先级加载，用户更快看到内容
     */
    async optimizedImageLoading(galleryData, onProgress) {
        console.log('🚀 开始智能分批加载...');

        // 1. 分析并创建加载队列
        const loadingQueue = this.createLoadingQueue(galleryData);

        // 2. 分批执行加载
        const results = new Map();
        let totalProgress = 0;

        for (let batchIndex = 0; batchIndex < loadingQueue.length; batchIndex++) {
            const batch = loadingQueue[batchIndex];

            console.log(`📦 加载批次 ${batchIndex + 1}/${loadingQueue.length}: ${batch.name}`);

            // 并行加载当前批次
            const batchPromises = batch.items.map(item => this.loadSingleTexture(item));
            const batchResults = await Promise.allSettled(batchPromises);

            // 处理批次结果
            batchResults.forEach((result, index) => {
                const item = batch.items[index];
                if (result.status === 'fulfilled' && result.value) {
                    results.set(item.id, result.value);
                } else {
                    console.warn(`⚠️ 纹理加载失败: ${item.id}`, result.reason);
                    this.state.errors.push({
                        id: item.id,
                        error: result.reason,
                    });
                }
            });

            // 更新进度
            totalProgress = (batchIndex + 1) / loadingQueue.length;
            this.state.loadingProgress = totalProgress;
            this.state.currentBatch = batchIndex + 1;

            if (onProgress) {
                onProgress({
                    progress: totalProgress,
                    batch: batch.name,
                    loaded: results.size,
                    total: galleryData.length,
                    errors: this.state.errors.length,
                });
            }

            // 批次间延迟，让浏览器处理其他任务
            if (batchIndex < loadingQueue.length - 1) {
                const delay =
                    batch.priority === 'high'
                        ? this.options.priorityLoadTimeout
                        : this.options.secondaryLoadDelay;
                await this.sleep(delay);
            }
        }

        console.log(`✅ 分批加载完成: ${results.size}/${galleryData.length} 成功`);
        return results;
    }

    /**
     * 创建智能加载队列
     */
    createLoadingQueue(galleryData) {
        const queues = {
            critical: [], // 用户立即可见
            primary: [], // 主要展示区域
            secondary: [], // 次要内容
            background: [], // 后台预加载
        };

        // 按重要性分类
        galleryData.forEach(item => {
            // 跳过视频类型，在3D环境中按需处理
            if (item.type === 'video') {
                queues.background.push(item);
                return;
            }

            // 根据墙面位置和层级分配优先级
            if (item.wall === 'vertical_wall_32m') {
                // 后墙和前墙 - 用户进入时立即看到
                queues.critical.push(item);
            } else if (item.wall === 'horizontal_wall_64m' && item.layer === 'lower') {
                // 左右墙下层 - 主要视线高度
                queues.primary.push(item);
            } else if (item.wall === 'horizontal_wall_64m' && item.layer === 'upper') {
                // 左右墙上层 - 需要抬头查看
                queues.secondary.push(item);
            } else {
                // 特殊位置（如灯箱）
                queues.background.push(item);
            }
        });

        // 创建分批加载队列
        const loadingQueue = [];

        // 批次1：关键内容（立即加载）
        if (queues.critical.length > 0) {
            loadingQueue.push({
                name: '关键视图',
                priority: 'high',
                items: queues.critical,
            });
        }

        // 批次2-N：按批次大小分割主要内容
        const primaryBatches = this.chunkArray(queues.primary, this.options.batchSize);
        primaryBatches.forEach((batch, index) => {
            loadingQueue.push({
                name: `主展示区-${index + 1}`,
                priority: 'medium',
                items: batch,
            });
        });

        // 批次N+1：次要内容
        if (queues.secondary.length > 0) {
            loadingQueue.push({
                name: '次要内容',
                priority: 'low',
                items: queues.secondary,
            });
        }

        // 批次最后：后台内容
        if (queues.background.length > 0) {
            loadingQueue.push({
                name: '后台内容',
                priority: 'background',
                items: queues.background,
            });
        }

        return loadingQueue;
    }

    /**
     * 加载单个纹理 - 优化版本
     */
    async loadSingleTexture(item) {
        const startTime = performance.now();

        try {
            // 1. 优化：强制使用预计算数据，跳过尺寸检测
            if (this.options.usePrecomputedOnly && (!item.aspectRatio || !item.dimensions)) {
                console.warn(`⚠️ ${item.id} 缺少预计算数据，跳过加载`);
                return null;
            }

            // 2. 检查纹理池缓存
            const cacheKey = this.generateCacheKey(item);
            if (this.state.loadedTextures.has(cacheKey)) {
                console.log(`📋 使用缓存纹理: ${item.id}`);
                return this.state.loadedTextures.get(cacheKey);
            }

            // 3. 创建纹理
            const texture = await this.createOptimizedTexture(item);

            if (texture) {
                // 4. 存入纹理池
                this.addToTexturePool(cacheKey, texture);

                const loadTime = performance.now() - startTime;
                console.log(`✅ 纹理加载完成: ${item.id} (${Math.round(loadTime)}ms)`);

                return texture;
            }

            return null;
        } catch (error) {
            console.error(`❌ 纹理加载失败: ${item.id}`, error);
            return null;
        }
    }

    /**
     * 创建优化的纹理对象
     */
    async createOptimizedTexture(item) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                try {
                    // 导入THREE.js（动态导入避免在Worker中使用）
                    import('three')
                        .then(async THREE => {
                            const texture = new THREE.Texture(img);

                            // 基于设备性能调整纹理设置
                            await this.applyOptimalTextureSettings(texture);

                            texture.needsUpdate = true;
                            resolve(texture);
                        })
                        .catch(reject);
                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => {
                reject(new Error(`图片加载失败: ${item.src || item.thumbnail}`));
            };

            // 使用优化的图片路径
            img.src = item.src || item.thumbnail;
        });
    }

    /**
     * 应用最优纹理设置
     */
    async applyOptimalTextureSettings(texture) {
        // 动态导入THREE.js常量
        const THREE = await import('three');

        // 检测设备性能并应用对应设置
        const isLowEndDevice = this.detectLowEndDevice();

        if (isLowEndDevice) {
            // 低端设备：优先性能
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
        } else {
            // 高端设备：平衡质量与性能
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
        }

        // 通用优化设置
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
    }

    /**
     * 检测低端设备
     */
    detectLowEndDevice() {
        // 基于多个指标判断设备性能
        const indicators = {
            memory: navigator.deviceMemory < 4, // <4GB内存
            cores: navigator.hardwareConcurrency < 4, // <4核心
            connection:
                navigator.connection?.effectiveType === '3g' ||
                navigator.connection?.effectiveType === '2g', // 慢网络
        };

        // 任意两个指标为true就认为是低端设备
        const trueCount = Object.values(indicators).filter(Boolean).length;
        return trueCount >= 2;
    }

    /**
     * 纹理池管理
     */
    addToTexturePool(key, texture) {
        if (!this.options.enableTexturePool) return;

        // 如果池满了，移除最老的纹理
        if (this.state.loadedTextures.size >= this.options.maxTexturePoolSize) {
            const firstKey = this.state.loadedTextures.keys().next().value;
            const oldTexture = this.state.loadedTextures.get(firstKey);
            if (oldTexture && oldTexture.dispose) {
                oldTexture.dispose();
            }
            this.state.loadedTextures.delete(firstKey);
        }

        this.state.loadedTextures.set(key, texture);
    }

    /**
     * 生成缓存键
     */
    generateCacheKey(item) {
        const src = item.src || item.thumbnail || '';
        const quality = this.detectLowEndDevice() ? 'low' : 'high';
        return `${item.id}_${quality}_${src.split('/').pop()}`;
    }

    /**
     * 工具函数
     */
    chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 获取优化统计
     */
    getOptimizationStats() {
        return {
            loadedTextures: this.state.loadedTextures.size,
            loadingProgress: this.state.loadingProgress,
            currentBatch: this.state.currentBatch,
            errors: this.state.errors.length,
            texturePoolSize: this.state.loadedTextures.size,
            isLowEndDevice: this.detectLowEndDevice(),
            memoryUsage: performance.memory
                ? {
                      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                  }
                : null,
        };
    }

    /**
     * 清理资源
     */
    cleanup() {
        console.log('🧹 清理Gallery优化器...');

        // 清理所有纹理
        for (const [, texture] of this.state.loadedTextures) {
            if (texture && texture.dispose) {
                texture.dispose();
            }
        }

        this.state.loadedTextures.clear();
        this.state.errors = [];
        this.state.loadingProgress = 0;
        this.state.currentBatch = 0;

        console.log('✅ 清理完成');
    }
}

export default RealGalleryOptimizer;
