/**
 * 图片预加载工具类
 * 用于优化图片加载性能，避免在3D Gallery中出现空白
 */

class ImagePreloader {
    constructor() {
        this.cache = new Map(); // 缓存已加载的图片
        this.loading = new Set(); // 正在加载的图片URLs
    }

    /**
     * 预加载单个图片
     * @param {string} src - 图片URL
     * @returns {Promise<HTMLImageElement>}
     */
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            // 如果已经缓存了，直接返回
            if (this.cache.has(src)) {
                resolve(this.cache.get(src));
                return;
            }

            // 如果正在加载，等待加载完成
            if (this.loading.has(src)) {
                const checkLoading = () => {
                    if (this.cache.has(src)) {
                        resolve(this.cache.get(src));
                    } else if (this.loading.has(src)) {
                        setTimeout(checkLoading, 50);
                    } else {
                        reject(new Error('Loading failed'));
                    }
                };
                checkLoading();
                return;
            }

            // 开始加载图片
            this.loading.add(src);
            const img = new Image();
            
            img.onload = () => {
                this.loading.delete(src);
                this.cache.set(src, img);
                resolve(img);
            };

            img.onerror = () => {
                this.loading.delete(src);
                reject(new Error(`Failed to load image: ${src}`));
            };

            img.src = src;
        });
    }

    /**
     * 批量预加载图片
     * @param {Array<string>} srcList - 图片URL数组
     * @param {Object} options - 选项
     * @param {number} options.batchSize - 每批加载的数量
     * @param {number} options.delay - 批次之间的延迟(ms)
     * @param {Function} options.onProgress - 进度回调
     * @returns {Promise<Array<HTMLImageElement>>}
     */
    async preloadImages(srcList, options = {}) {
        const {
            batchSize = 5, // 每批加载5张图片
            delay = 100,   // 批次间延迟100ms
            onProgress = null
        } = options;

        const results = [];
        const total = srcList.length;
        let loaded = 0;

        // 分批加载
        for (let i = 0; i < srcList.length; i += batchSize) {
            const batch = srcList.slice(i, i + batchSize);
            
            // 并行加载当前批次
            const batchPromises = batch.map(src => 
                this.preloadImage(src).catch(error => {
                    console.warn('Failed to preload image:', src, error);
                    return null; // 失败时返回null，不阻断整体流程
                })
            );

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
            loaded += batch.length;

            // 调用进度回调
            if (onProgress) {
                onProgress(loaded, total, (loaded / total) * 100);
            }

            // 批次间延迟，避免一次性加载过多导致卡顿
            if (i + batchSize < srcList.length) {
                await this.delay(delay);
            }
        }

        return results;
    }

    /**
     * 获取缓存的图片
     * @param {string} src - 图片URL
     * @returns {HTMLImageElement|null}
     */
    getCachedImage(src) {
        return this.cache.get(src) || null;
    }

    /**
     * 检查图片是否已缓存
     * @param {string} src - 图片URL
     * @returns {boolean}
     */
    isCached(src) {
        return this.cache.has(src);
    }

    /**
     * 清理缓存
     * @param {string|null} src - 要清理的图片URL，不传则清理全部
     */
    clearCache(src = null) {
        if (src) {
            this.cache.delete(src);
        } else {
            this.cache.clear();
        }
    }

    /**
     * 延迟函数
     * @param {number} ms - 延迟毫秒数
     * @returns {Promise}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 获取缓存大小
     * @returns {number}
     */
    getCacheSize() {
        return this.cache.size;
    }

    /**
     * 获取正在加载的图片数量
     * @returns {number}
     */
    getLoadingCount() {
        return this.loading.size;
    }
}

// 创建全局单例
const imagePreloader = new ImagePreloader();

export default imagePreloader;
