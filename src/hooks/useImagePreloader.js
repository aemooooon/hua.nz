import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 图片预加载 Hook - 为 3D Gallery 优化
 * 支持渐进式加载、优先级队列、并发控制
 */
export const useImagePreloader = (images = [], options = {}) => {
    const {
        concurrent = 3, // 并发加载数量
        priority = 'visible', // 'visible' | 'sequential' | 'all'
        enableWebP = true, // 是否启用 WebP 检测
        generateThumbnail = false, // 是否生成缩略图
        lazyThreshold = 0.1 // Intersection Observer 阈值
    } = options;

    const [loadedImages, setLoadedImages] = useState(new Set());
    const [failedImages, setFailedImages] = useState(new Set());
    const [isWebPSupported, setIsWebPSupported] = useState(false);
    
    const loadingRef = useRef(new Set());
    const observerRef = useRef(null);
    const imageElementsRef = useRef(new Map());

    // 检测 WebP 支持
    useEffect(() => {
        if (!enableWebP) return;
        
        const checkWebPSupport = () => {
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            const data = canvas.toDataURL('image/webp');
            setIsWebPSupported(data.indexOf('image/webp') === 5);
        };
        
        checkWebPSupport();
    }, [enableWebP]);

    // 生成缩略图 URL（如果支持）
    const getThumbnailUrl = useCallback((src) => {
        if (!generateThumbnail || !src) return src;
        
        // 假设您的服务器支持动态缩略图生成
        // 例如：/image.jpg -> /image_thumb.jpg 或 /api/thumbnail?src=image.jpg&w=200&h=200
        const ext = src.split('.').pop();
        const basePath = src.substring(0, src.lastIndexOf('.'));
        return `${basePath}_thumb.${isWebPSupported ? 'webp' : ext}`;
    }, [generateThumbnail, isWebPSupported]);

    // 获取优化后的图片 URL
    const getOptimizedUrl = useCallback((src) => {
        if (!isWebPSupported || !src) return src;
        
        const ext = src.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png'].includes(ext)) {
            const basePath = src.substring(0, src.lastIndexOf('.'));
            return `${basePath}.webp`;
        }
        return src;
    }, [isWebPSupported]);

    // 预加载单张图片
    const preloadImage = useCallback((src, isHighPriority = false) => {
        return new Promise((resolve, reject) => {
            if (!src || loadedImages.has(src) || failedImages.has(src) || loadingRef.current.has(src)) {
                resolve(loadedImages.has(src));
                return;
            }

            loadingRef.current.add(src);
            
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            const handleLoad = () => {
                loadingRef.current.delete(src);
                setLoadedImages(prev => new Set([...prev, src]));
                resolve(true);
            };
            
            const handleError = () => {
                loadingRef.current.delete(src);
                setFailedImages(prev => new Set([...prev, src]));
                reject(new Error(`Failed to load: ${src}`));
            };
            
            img.onload = handleLoad;
            img.onerror = handleError;
            
            // 如果是高优先级，直接加载原图，否则先尝试缩略图
            if (isHighPriority || !generateThumbnail) {
                img.src = getOptimizedUrl(src);
            } else {
                img.src = getThumbnailUrl(src);
            }
        });
    }, [loadedImages, failedImages, getOptimizedUrl, getThumbnailUrl, generateThumbnail]);

    // 批量预加载（并发控制）
    const preloadBatch = useCallback(async (imagesToLoad, highPriority = false) => {
        const results = [];
        
        for (let i = 0; i < imagesToLoad.length; i += concurrent) {
            const batch = imagesToLoad.slice(i, i + concurrent);
            const batchPromises = batch.map(src => 
                preloadImage(src, highPriority).catch(() => false)
            );
            
            const batchResults = await Promise.allSettled(batchPromises);
            results.push(...batchResults);
            
            // 小延迟，避免阻塞主线程
            if (i + concurrent < imagesToLoad.length) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
        
        return results;
    }, [concurrent, preloadImage]);

    // 初始化预加载
    useEffect(() => {
        if (images.length === 0) return;
        
        // 提取图片 URL
        const imageUrls = images.map(img => {
            if (typeof img === 'string') return img;
            return img.src || img.thumbnail || img.url;
        }).filter(Boolean);
        
        switch (priority) {
            case 'all':
                preloadBatch(imageUrls);
                break;
            case 'sequential': {
                // 逐个加载前几张图片
                const initialBatch = imageUrls.slice(0, 6);
                preloadBatch(initialBatch, true).then(() => {
                    // 然后加载剩余图片
                    if (imageUrls.length > 6) {
                        preloadBatch(imageUrls.slice(6));
                    }
                });
                break;
            }
            case 'visible': {
                // 只预加载前3张，其他等待可见性
                const visibleBatch = imageUrls.slice(0, 3);
                preloadBatch(visibleBatch, true);
                break;
            }
        }
    }, [images, priority, preloadBatch]);

    return {
        loadedImages,
        failedImages,
        isLoading: loadingRef.current.size > 0,
        loadingCount: loadingRef.current.size,
        totalCount: images.length,
        loadedCount: loadedImages.size,
        preloadImage,
        getThumbnailUrl,
        getOptimizedUrl
    };
};

export default useImagePreloader;
