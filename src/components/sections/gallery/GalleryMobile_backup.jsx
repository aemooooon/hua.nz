/**
 * 移动端Gallery组件 - 修复版本
 *
 * 功能特点：
 * - 九宫格布局展示画廊图片
 * - 智能图片格式优化 (AVIF > WebP > JPG)
 * - 全局加载状态管理，确保滚动体验
 * - 集成PhotoSwipe全屏查看
 * - 移动设备优化的触控体验
 * - 作为长内容页面与SmartScrollManager集成
 *
 * @param {string} language - 界面语言 ('zh' | 'en')
 */

import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePhotoSwipe } from '../../../hooks/usePhotoSwipe';
import { useAppStore } from '../../../store/useAppStore';
import textureSystem from '../../../utils/texture';
import CircularLoadingIndicator from '../../ui/CircularLoadingIndicator';

const GalleryMobile = ({ language = 'zh' }) => {
    const galleryData = useAppStore(state => state.getAllGalleryItems());
    const { getNewContent } = useAppStore();
    const content = getNewContent();
    const galleryText = content.gallery;
    const { openPhotoSwipe } = usePhotoSwipe();
    const containerRef = useRef(null);

    // 状态管理
    const [optimizedImages, setOptimizedImages] = useState(new Map());
    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const [isGlobalLoading, setIsGlobalLoading] = useState(true);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [totalImagesCount, setTotalImagesCount] = useState(0);

    // 数据过滤：移动端Gallery只显示图片，过滤掉视频类型
    const safeGalleryData = useMemo(() => {
        if (!Array.isArray(galleryData)) return [];
        return galleryData.filter(item => item.type !== 'video');
    }, [galleryData]);

    // 获取最优图片路径的函数
    const getOptimalImageSrc = async originalSrc => {
        try {
            if (!originalSrc) return originalSrc;

            // 跳过视频文件，只处理图片文件
            if (originalSrc.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
                return originalSrc;
            }

            // 只对图片文件进行格式优化
            if (!originalSrc.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
                return originalSrc;
            }

            // 提取文件名并获取最优路径
            const fileName = originalSrc
                .split('/')
                .pop()
                .replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
            const optimalPath = await textureSystem.getOptimalPath(fileName, 'gallery');
            return optimalPath;
        } catch (error) {
            console.warn('移动端图片格式优化失败，使用原始路径:', error);
            return originalSrc;
        }
    };

    // 真实图片加载检测函数
    const preloadImage = src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    };

    // 批量预加载图片并跟踪进度
    const preloadAllImages = useCallback(async imageUrls => {
        const totalImages = imageUrls.length;
        setTotalImagesCount(totalImages);
        setLoadedImagesCount(0);

        const loadPromises = imageUrls.map(async src => {
            try {
                await preloadImage(src);
                setLoadedImagesCount(prev => prev + 1);
                return src;
            } catch (error) {
                console.warn(`图片加载失败: ${src}`, error);
                setLoadedImagesCount(prev => prev + 1);
                return null;
            }
        });

        return Promise.allSettled(loadPromises);
    }, []);

    // 预加载优化图片路径 - 全局加载状态管理
    useEffect(() => {
        const loadOptimizedPaths = async () => {
            if (safeGalleryData.length === 0) {
                setIsLoadingImages(false);
                setIsGlobalLoading(false);
                return;
            }

            setIsLoadingImages(true);
            setIsGlobalLoading(true);

            try {
                // 第一步：获取所有优化后的图片路径
                console.log('📱 开始优化图片路径...');
                const optimizationsMap = new Map();
                for (const item of safeGalleryData) {
                    const optimizedSrc = await getOptimalImageSrc(item.src);
                    const optimizedThumbnail = item.thumbnail
                        ? await getOptimalImageSrc(item.thumbnail)
                        : optimizedSrc;

                    optimizationsMap.set(item.id, {
                        src: optimizedSrc,
                        thumbnail: optimizedThumbnail,
                    });
                }

                // 更新优化图片Map
                setOptimizedImages(optimizationsMap);
                setIsLoadingImages(false);

                // 第二步：预加载关键图片（前12张缩略图）确保滚动体验
                console.log('📱 开始预加载关键图片...');
                const keyImageUrls = Array.from(optimizationsMap.values())
                    .slice(0, 12)
                    .map(opt => opt.thumbnail);

                await preloadAllImages(keyImageUrls);

                // 第三步：所有关键图片加载完成，隐藏全局loading
                console.log('📱 关键图片加载完成，显示画廊内容');
                setIsGlobalLoading(false);
            } catch (error) {
                console.warn('图片优化加载失败:', error);
                setIsLoadingImages(false);
                setIsGlobalLoading(false);
            }
        };

        loadOptimizedPaths();
    }, [safeGalleryData, preloadAllImages]);

    // 转换数据格式以适配PhotoSwipe，显示所有图片
    const galleryItems = safeGalleryData.map((item, index) => {
        const optimized = optimizedImages.get(item.id);
        return {
            id: item.id || index,
            src: optimized?.src || item.src,
            thumbnail: optimized?.thumbnail || item.thumbnail || item.src,
            title: item.title || '',
            description: item.description || '',
        };
    });

    const handleImageClick = index => {
        openPhotoSwipe(galleryItems, index);
    };

    return (
        <>
            {/* 全局Loading状态 - 包含图片优化和实际加载进度 */}
            {(isLoadingImages || isGlobalLoading) && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
                    <div className="text-center max-w-sm mx-auto px-6">
                        <CircularLoadingIndicator size={140} strokeWidth={10} showMask={false} />

                        {/* 加载阶段提示 */}
                        <div className="mt-6 space-y-3">
                            <h3 className="text-white text-lg font-medium">
                                {isLoadingImages
                                    ? galleryText.mobile.optimizing?.[language] ||
                                      'Optimizing Images...'
                                    : galleryText.mobile.loading?.[language] ||
                                      'Loading Gallery...'}
                            </h3>

                            {/* 显示加载进度 */}
                            {isGlobalLoading && totalImagesCount > 0 && (
                                <div className="space-y-2">
                                    <div className="w-full bg-white/20 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${(loadedImagesCount / totalImagesCount) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <p className="text-white/70 text-sm">
                                        {loadedImagesCount} / {totalImagesCount} 张图片已加载
                                    </p>
                                </div>
                            )}

                            <p className="text-white/60 text-xs leading-relaxed">
                                首次加载需要预加载图片以确保流畅的滚动体验
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* 移动端安全区域和长内容页面样式 */}
            <style>{`
                .gallery-mobile-container {
                    /* 作为长内容页面，让SmartScrollManager控制滚动 */
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    overflow: visible;

                    /* 背景和主题 */
                    background: linear-gradient(135deg, #0f0f23 0%, #1a1a3a 50%, #0f0f23 100%);

                    /* 移动端安全区域支持 */
                    padding-top: max(2rem, env(safe-area-inset-top));
                    padding-bottom: max(4rem, env(safe-area-inset-bottom));
                    padding-left: max(1rem, env(safe-area-inset-left));
                    padding-right: max(1rem, env(safe-area-inset-right));

                    /* 防止选择文本 */
                    -webkit-user-select: none;
                    user-select: none;

                    /* 优化触摸交互 */
                    touch-action: manipulation;
                }

                /* 图片项目优化 */
                .gallery-image-item {
                    position: relative;
                    cursor: pointer;
                    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
                    touch-action: manipulation;
                    -webkit-user-select: none;
                    user-select: none;
                }

                .gallery-image-item:hover {
                    transform: scale(1.02);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                }

                .gallery-image-item:active {
                    transform: scale(0.98);
                }

                /* 移动端特殊处理 */
                @media (max-width: 768px) {
                    .gallery-mobile-container {
                        padding-top: max(3rem, calc(env(safe-area-inset-top) + 2rem));
                        padding-bottom: max(6rem, calc(env(safe-area-inset-bottom) + 4rem));
                    }

                    .gallery-image-item img {
                        will-change: auto;
                        transform: translateZ(0);
                        image-rendering: -webkit-optimize-contrast;
                        image-rendering: crisp-edges;
                    }

                    .gallery-image-item:active {
                        transform: scale(0.95);
                        transition: transform 0.1s ease-out;
                    }
                }
            `}</style>

            {/* 画廊内容 - 只在全局加载完成后显示 */}
            {!isGlobalLoading && (
                <div ref={containerRef} className="gallery-mobile-container w-full relative">
                    {/* 标题部分 */}
                    <div className="text-center mb-12 px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                            {galleryText.mobile.title[language] || galleryText.mobile.title.en}
                        </h2>
                        <p className="text-white/70 max-w-2xl mx-auto leading-relaxed text-lg">
                            {galleryText.mobile.subtitle[language] ||
                                galleryText.mobile.subtitle.en}
                        </p>
                        {/* 装饰线 */}
                        <div className="mt-8 flex justify-center">
                            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto px-4">
                        {/* 九宫格网格 - 优化移动端长内容页面布局 */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pb-20">
                            {galleryItems.map((item, index) => {
                                const optimized = optimizedImages.get(item.id);
                                const imageSrc = optimized?.thumbnail || optimized?.src;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => handleImageClick(index)}
                                        className="gallery-image-item group project-card cursor-pointer"
                                    >
                                        <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10">
                                            {imageSrc ? (
                                                <img
                                                    src={imageSrc}
                                                    alt={`Gallery item ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    loading="lazy"
                                                    onError={e => {
                                                        console.warn(
                                                            `📱 优化图片加载失败，回退到原始图片: ${item.id}`
                                                        );
                                                        e.target.src = item.thumbnail || item.src;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 空状态提示 */}
                        {galleryItems.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-8 h-8 text-white/50"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="text-white/70 text-lg mb-2">
                                    {galleryText.mobile.noContent[language] ||
                                        galleryText.mobile.noContent.en}
                                </div>
                                <div className="text-white/50 text-sm">
                                    {galleryText.mobile.tryAgain[language] ||
                                        galleryText.mobile.tryAgain.en}
                                </div>
                            </div>
                        )}

                        {/* 移动端专用安全距离 */}
                        <div
                            className="pb-safe-area-inset-bottom"
                            style={{ paddingBottom: 'max(4rem, env(safe-area-inset-bottom))' }}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

GalleryMobile.propTypes = {
    language: PropTypes.string,
};

export default GalleryMobile;
