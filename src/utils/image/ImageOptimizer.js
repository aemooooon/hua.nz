/**
 * ImageOptimizer - 智能图片格式优化器
 * 
 * 核心功能：
 * - 自动检测浏览器图片格式支持能力
 * - 智能路径解析：支持根目录和文件夹结构的图片
 * - 格式优先级：AVIF > WebP > JPEG，确保最佳压缩率
 * - 异步初始化：避免阻塞主线程
 * - 缓存机制：提升重复请求性能
 * 
 * 支持的图片结构：
 * - 根目录图片：/image.jpg → /image.avif
 * - 文件夹图片：/folder/image.jpg → /folder-avif/image.avif
 * 
 * API使用示例：
 * ```javascript
 * import imageOptimizer from './utils/image/ImageOptimizer.js';
 * 
 * // 单张图片优化
 * const optimizedPath = await imageOptimizer.getOptimizedImagePath('/photo.jpg');
 * console.log(optimizedPath); // '/photo.avif' 或 '/photo.webp' 或 '/photo.jpg'
 * 
 * // 批量图片优化
 * const paths = ['/img1.jpg', '/gallery/img2.jpg'];
 * const optimizedPaths = await imageOptimizer.getOptimizedImagePaths(paths);
 * 
 * // 图片预加载
 * await imageOptimizer.preloadImages(['/hero.jpg', '/banner.jpg']);
 * 
 * // 检查浏览器支持
 * const stats = imageOptimizer.getStats();
 * console.log(stats.supportedFormats); // { avif: true, webp: true }
 * ```
 * 
 * 性能优势：
 * - AVIF: 比JPEG节省50-90%文件大小，支持HDR
 * - WebP: 比JPEG节省25-50%文件大小，广泛支持
 * - 自动回退: 确保100%兼容性
 * - 缓存优化: 避免重复检测，提升响应速度
 */

import { FormatDetector } from '../texture/FormatDetector.js';

export class ImageOptimizer {
    constructor() {
        this.formatDetector = new FormatDetector();
        this.isInitialized = false;
        this.supportedFormats = new Map();
        this.initializationPromise = this.initialize();
    }

    /**
     * 初始化图片优化器
     * 检测浏览器格式支持能力并缓存结果
     */
    async initialize() {
        try {
            await this.formatDetector.initializationPromise;
            this.supportedFormats = this.formatDetector.supportCache;
            this.isInitialized = true;
        } catch (error) {
            console.error('图片优化器初始化失败:', error);
            this.isInitialized = true; // 继续使用回退方案
        }
    }

    /**
     * 确保优化器已初始化
     */
    async ensureInitialized() {
        if (!this.isInitialized) {
            await this.initializationPromise;
        }
    }

    /**
     * 获取优化后的图片路径
     * @param {string} originalPath - 原始图片路径 (如: "/aqi/aqi01.jpg")
     * @param {Object} options - 选项
     * @param {boolean} options.enableAvif - 是否启用AVIF (默认: true)
     * @param {boolean} options.enableWebp - 是否启用WebP (默认: true)
     * @returns {Promise<string>} - 优化后的图片路径
     */
    async getOptimizedImagePath(originalPath, options = {}) {
        await this.ensureInitialized();

        const { 
            enableAvif = true, 
            enableWebp = true 
        } = options;

        // 解析原始路径
        const pathInfo = this.parseImagePath(originalPath);
        if (!pathInfo) {
            console.warn('无法解析图片路径:', originalPath);
            return originalPath;
        }

        const { folder, filename } = pathInfo;

        // 按优先级选择格式：AVIF > WebP > 原始格式
        if (enableAvif && this.supportedFormats.get('avif')) {
            const avifPath = folder ? `/${folder}-avif/${filename}.avif` : `/${filename}.avif`;
            if (await this.checkImageExists(avifPath)) {
                return avifPath;
            }
        }

        if (enableWebp && this.supportedFormats.get('webp')) {
            const webpPath = folder ? `/${folder}-webp/${filename}.webp` : `/${filename}.webp`;
            if (await this.checkImageExists(webpPath)) {
                return webpPath;
            }
        }

        // 回退到原始格式
        return originalPath;
    }

    /**
     * 批量优化图片路径数组
     * @param {string[]} imagePaths - 图片路径数组
     * @param {Object} options - 选项
     * @returns {Promise<string[]>} - 优化后的图片路径数组
     */
    async getOptimizedImagePaths(imagePaths, options = {}) {
        if (!Array.isArray(imagePaths)) {
            return [];
        }

        const optimizedPaths = await Promise.all(
            imagePaths.map(path => this.getOptimizedImagePath(path, options))
        );

        return optimizedPaths;
    }

    /**
     * 解析图片路径
     * @param {string} path - 图片路径
     * @returns {Object|null} - 解析结果
     */
    parseImagePath(path) {
        try {
            // 移除开头的斜杠
            const cleanPath = path.startsWith('/') ? path.slice(1) : path;
            
            // 解析路径格式: folder/subfolder/filename.ext 或 folder/filename.ext 或 filename.ext (根目录)
            const parts = cleanPath.split('/');
            if (parts.length === 0) {
                return null;
            }

            const filename = parts[parts.length - 1];
            const folder = parts.length > 1 ? parts.slice(0, -1).join('/') : ''; // 根目录时folder为空字符串
            
            // 提取文件名和扩展名
            const lastDotIndex = filename.lastIndexOf('.');
            if (lastDotIndex === -1) {
                return null;
            }

            const nameWithoutExt = filename.slice(0, lastDotIndex);
            const extension = filename.slice(lastDotIndex + 1);

            return {
                folder,
                filename: nameWithoutExt,
                extension,
                fullPath: cleanPath
            };
        } catch (error) {
            console.error('解析图片路径失败:', error);
            return null;
        }
    }

    /**
     * 检查图片是否存在
     * @param {string} path - 图片路径
     * @returns {Promise<boolean>} - 是否存在
     */
    async checkImageExists(path) {
        try {
            const response = await fetch(path, { method: 'HEAD' });
            return response.ok;
        } catch {
            // 忽略网络错误，回退到原始格式
            return false;
        }
    }

    /**
     * 预加载优化图片
     * @param {string[]} imagePaths - 图片路径数组
     * @param {Object} options - 选项
     */
    async preloadOptimizedImages(imagePaths, options = {}) {
        const optimizedPaths = await this.getOptimizedImagePaths(imagePaths, options);
        
        const preloadPromises = optimizedPaths.map(path => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({ path, success: true });
                img.onerror = () => resolve({ path, success: false });
                img.src = path;
            });
        });

        const results = await Promise.all(preloadPromises);
        return results;
    }

    /**
     * 获取图片统计信息
     */
    getStats() {
        return {
            isInitialized: this.isInitialized,
            supportedFormats: {
                avif: this.supportedFormats.get('avif') || false,
                webp: this.supportedFormats.get('webp') || false
            }
        };
    }
}

// 创建全局实例
export const imageOptimizer = new ImageOptimizer();

// 默认导出
export default imageOptimizer;
