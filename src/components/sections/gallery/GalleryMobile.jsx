/**
 * 移动端Gallery组件
 *
 * 功能特点：
 * - 九宫格布局展示画廊图片
 * - 智能图片格式优化 (AVIF > WebP > JPG)
 * - 自动过滤视频类型，仅显示图片
 * - 集成PhotoSwipe全屏查看
 * - 移动设备优化的触控体验
 * - 响应式设计和安全区域支持
 *
 * @param {string} language - 界面语言 ('zh' | 'en')
 */

import PropTypes from 'prop-types';
import { useRef, useMemo, useState, useEffect } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { usePhotoSwipe } from '../../../hooks/usePhotoSwipe';
import textureSystem from '../../../utils/texture';

const GalleryMobile = ({ language = 'zh' }) => {
    const galleryData = useAppStore(state => state.getAllGalleryItems());
    const { getNewContent } = useAppStore();
    const content = getNewContent();
    const galleryText = content.gallery;
    const { openPhotoSwipe } = usePhotoSwipe();
    const containerRef = useRef(null);
    const [optimizedImages, setOptimizedImages] = useState(new Map());

    // 数据过滤：移动端Gallery只显示图片，过滤掉视频类型
    const safeGalleryData = useMemo(() => {
        if (!Array.isArray(galleryData)) return [];

        // 移动端只显示图片类型的项目
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

    // 预加载优化图片路径 - 加载所有图片
    useEffect(() => {
        const loadOptimizedPaths = async () => {
            if (safeGalleryData.length === 0) return;

            // 一次性加载所有图片的优化路径
            const newOptimizations = new Map();
            for (const item of safeGalleryData) {
                if (item.src && !optimizedImages.has(item.id)) {
                    const optimizedSrc = await getOptimalImageSrc(item.src);
                    const optimizedThumbnail = item.thumbnail
                        ? await getOptimalImageSrc(item.thumbnail)
                        : optimizedSrc;

                    newOptimizations.set(item.id, {
                        src: optimizedSrc,
                        thumbnail: optimizedThumbnail,
                    });
                }
            }

            // 只有当有新的优化结果时才更新状态
            if (newOptimizations.size > 0) {
                setOptimizedImages(prev => new Map([...prev, ...newOptimizations]));
            }
        };

        loadOptimizedPaths();
    }, [safeGalleryData, optimizedImages]);

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
        // 直接使用已经准备好的galleryItems
        openPhotoSwipe(galleryItems, index);
    };

    return (
        <>
            {/* 移动端安全区域和滚动样式 */}
            <style>{`
        .gallery-mobile-container {
          min-height: 100vh;
          max-height: 100vh;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: none;

          /* iOS 安全区域支持 - 优化移动端布局 */
          padding-top: max(1rem, env(safe-area-inset-top));
          padding-bottom: max(2rem, env(safe-area-inset-bottom));
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);

          /* 确保在iOS上平滑滚动 */
          -webkit-overflow-scrolling: touch;

          /* 防止选择文本 */
          -webkit-user-select: none;
          user-select: none;

          /* 确保触摸滚动正常工作 */
          touch-action: pan-y;
        }

        /* 自定义滚动条样式 */
        .gallery-mobile-container::-webkit-scrollbar {
          width: 4px;
        }
        .gallery-mobile-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .gallery-mobile-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }
        .gallery-mobile-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* 移动端特殊处理 */
        @media (max-width: 768px) {
          .gallery-mobile-container {
            /* 在移动设备上隐藏滚动条 */
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .gallery-mobile-container::-webkit-scrollbar {
            display: none;
          }

          /* 确保图片点击区域可用 */
          .gallery-image-item {
            touch-action: manipulation;
          }
        }
      `}</style>

            <div ref={containerRef} className="gallery-mobile-container w-full">
                {/* 标题部分 - 使用store中的i18n文案 */}
                <div className="text-center mb-8 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mb-4">
                        {galleryText.mobile.title[language] || galleryText.mobile.title.en}
                    </h2>
                    <p className="text-theme-text-secondary max-w-2xl mx-auto leading-relaxed">
                        {galleryText.mobile.subtitle[language] || galleryText.mobile.subtitle.en}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto px-4">
                    {/* 九宫格网格 - 保持格子大小一致，支持滚动 */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pb-16">
                        {galleryItems.map((item, index) => {
                            // 获取优化后的图片路径，如果没有则显示加载状态
                            const optimized = optimizedImages.get(item.id);
                            const imageSrc = optimized?.thumbnail || optimized?.src;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleImageClick(index)}
                                    className="group project-card cursor-pointer transform transition-all duration-300 active:scale-95"
                                >
                                    {/* 正方形图片容器 - 使用object-fit处理不同比例 */}
                                    <div className="relative aspect-square rounded-lg overflow-hidden bg-theme-surface/10">
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt={`Gallery item ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={e => {
                                                    // 如果优化图片加载失败，回退到原始图片
                                                    console.warn(
                                                        `📱 优化图片加载失败，回退到原始图片: ${item.id}`
                                                    );
                                                    e.target.src = item.thumbnail || item.src;
                                                }}
                                            />
                                        ) : (
                                            // 显示加载状态
                                            <div className="w-full h-full flex items-center justify-center bg-theme-surface/20">
                                                <div className="w-8 h-8 border-2 border-theme-text-secondary/30 border-t-theme-text-secondary rounded-full animate-spin"></div>
                                            </div>
                                        )}

                                        {/* 简单的选中指示器 */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-active:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 空状态 */}
                    {galleryItems.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-theme-surface/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-theme-text-secondary"
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
                            <div className="text-theme-text-secondary text-lg mb-2">
                                {galleryText.mobile.noContent[language] || galleryText.mobile.noContent.en}
                            </div>
                            <div className="text-theme-text-secondary/60 text-sm">
                                {galleryText.mobile.tryAgain[language] || galleryText.mobile.tryAgain.en}
                            </div>
                        </div>
                    )}

                    {/* 移动端专用安全距离 */}
                    <div
                        className="pb-safe-area-inset-bottom"
                        style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
                    ></div>
                </div>
            </div>
        </>
    );
};

GalleryMobile.propTypes = {
    language: PropTypes.string,
};

export default GalleryMobile;
