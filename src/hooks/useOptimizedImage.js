/**
 * useOptimizedImage - 图片优化相关的React Hooks
 *
 * 提供多种图片优化的Hook，适用于不同场景：
 * - useOptimizedImage: 单张图片优化
 * - useOptimizedImages: 批量图片优化
 * - useImagePreloader: 图片预加载
 *
 * 使用场景：
 * - 需要在Hook中处理图片优化逻辑
 * - 动态图片路径的优化
 * - 批量图片处理
 * - 图片预加载优化
 *
 * 注意：对于静态图片，推荐直接使用 OptimizedImage 组件
 *
 * 使用示例：
 * ```jsx
 * import { useOptimizedImage, useOptimizedImages } from './hooks/useOptimizedImage';
 *
 * // 单张图片优化
 * function Avatar({ userImage }) {
 *   const { optimizedPath, isLoading } = useOptimizedImage(userImage);
 *
 *   return (
 *     <img
 *       src={optimizedPath}
 *       alt="头像"
 *       style={{ opacity: isLoading ? 0.5 : 1 }}
 *     />
 *   );
 * }
 *
 * // 批量图片优化
 * function Gallery({ imageList }) {
 *   const { optimizedPaths, isLoading } = useOptimizedImages(imageList);
 *
 *   return (
 *     <div className="gallery">
 *       {optimizedPaths.map((path, index) => (
 *         <img key={index} src={path} alt={`图片${index}`} />
 *       ))}
 *     </div>
 *   );
 * }
 *
 * // 图片预加载
 * function App() {
 *   const criticalImages = ['/hero.jpg', '/banner.jpg'];
 *   const { preloadResults } = useImagePreloader(criticalImages);
 *
 *   // 预加载完成后再显示内容
 *   return preloadResults.length > 0 ? <MainContent /> : <Loading />;
 * }
 * ```
 */

import { useState, useEffect } from 'react';
import imageOptimizer from '../utils/image/ImageOptimizer.js';

/**
 * 单张图片优化 Hook
 *
 * @param {string} imagePath - 图片路径
 * @param {Object} options - 优化选项
 * @param {boolean} options.enableAvif - 是否启用AVIF格式 (默认: true)
 * @param {boolean} options.enableWebp - 是否启用WebP格式 (默认: true)
 * @returns {Object} - { optimizedPath, isLoading, error }
 */
export const useOptimizedImage = (imagePath, options = {}) => {
    const [optimizedPath, setOptimizedPath] = useState(imagePath);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const optimizeImage = async () => {
            if (!imagePath) {
                setOptimizedPath('');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const optimized = await imageOptimizer.getOptimizedImagePath(imagePath, options);

                if (isMounted) {
                    setOptimizedPath(optimized);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('图片优化失败:', err);
                if (isMounted) {
                    setOptimizedPath(imagePath); // 回退到原始路径
                    setError(err);
                    setIsLoading(false);
                }
            }
        };

        optimizeImage();

        return () => {
            isMounted = false;
        };
    }, [imagePath, options]);

    return { optimizedPath, isLoading, error };
};

/**
 * 批量图片优化 Hook
 *
 * @param {string[]} imagePaths - 图片路径数组
 * @param {Object} options - 优化选项
 * @param {boolean} options.enableAvif - 是否启用AVIF格式 (默认: true)
 * @param {boolean} options.enableWebp - 是否启用WebP格式 (默认: true)
 * @returns {Object} - { optimizedPaths, isLoading, error }
 */
export const useOptimizedImages = (imagePaths, options = {}) => {
    const [optimizedPaths, setOptimizedPaths] = useState(imagePaths || []);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const optimizeImages = async () => {
            if (!imagePaths || imagePaths.length === 0) {
                setOptimizedPaths([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const optimized = await imageOptimizer.getOptimizedImagePaths(imagePaths, options);

                if (isMounted) {
                    setOptimizedPaths(optimized);
                    setIsLoading(false);
                }
            } catch (err) {
                console.error('批量图片优化失败:', err);
                if (isMounted) {
                    setOptimizedPaths(imagePaths); // 回退到原始路径
                    setError(err);
                    setIsLoading(false);
                }
            }
        };

        optimizeImages();

        return () => {
            isMounted = false;
        };
    }, [imagePaths, options]);

    return { optimizedPaths, isLoading, error };
};

/**
 * 图片预加载 Hook
 *
 * @param {string[]} imagePaths - 图片路径数组
 * @param {Object} options - 优化选项
 * @param {boolean} options.enableAvif - 是否启用AVIF格式 (默认: true)
 * @param {boolean} options.enableWebp - 是否启用WebP格式 (默认: true)
 * @returns {Object} - { preloadResults, isPreloading }
 */
export const useImagePreloader = (imagePaths, options = {}) => {
    const [preloadResults, setPreloadResults] = useState([]);
    const [isPreloading, setIsPreloading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const preloadImages = async () => {
            if (!imagePaths || imagePaths.length === 0) {
                setPreloadResults([]);
                return;
            }

            try {
                setIsPreloading(true);

                const results = await imageOptimizer.preloadOptimizedImages(imagePaths, options);

                if (isMounted) {
                    setPreloadResults(results);
                    setIsPreloading(false);
                }
            } catch (error) {
                console.error('图片预加载失败:', error);
                if (isMounted) {
                    setPreloadResults([]);
                    setIsPreloading(false);
                }
            }
        };

        preloadImages();

        return () => {
            isMounted = false;
        };
    }, [imagePaths, options]);

    return { preloadResults, isPreloading };
};
