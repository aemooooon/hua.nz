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
 * - 作为长内容页面与SmartScrollManager集成
 *
 * @param {string} language - 界面语言 ('zh' | 'en')
 */

import PropTypes from 'prop-types';
import { useRef, useMemo, useState, useEffect } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { usePhotoSwipe } from '../../../hooks/usePhotoSwipe';
import textureSystem from '../../../utils/texture';
import CircularLoadingIndicator from '../../ui/CircularLoadingIndicator';

const GalleryMobile = ({ language = 'zh' }) => {
    const galleryData = useAppStore(state => state.getAllGalleryItems());
    const { getNewContent } = useAppStore();
    const content = getNewContent();
    const galleryText = content.gallery;
    const { openPhotoSwipe } = usePhotoSwipe();
    const containerRef = useRef(null);
    const [optimizedImages, setOptimizedImages] = useState(new Map());
    const [isLoadingImages, setIsLoadingImages] = useState(true);

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

    // 预加载优化图片路径 - 批量加载，显示loading状态
    useEffect(() => {
        const loadOptimizedPaths = async () => {
            if (safeGalleryData.length === 0) {
                setIsLoadingImages(false);
                return;
            }

            setIsLoadingImages(true);
            
            try {
                // 分批加载，优先加载前9张图片
                const priorityItems = safeGalleryData.slice(0, 9);
                const remainingItems = safeGalleryData.slice(9);
                
                // 优先加载前9张
                const priorityOptimizations = new Map();
                for (const item of priorityItems) {
                    const optimizedSrc = await getOptimalImageSrc(item.src);
                    const optimizedThumbnail = item.thumbnail
                        ? await getOptimalImageSrc(item.thumbnail)
                        : optimizedSrc;

                    priorityOptimizations.set(item.id, {
                        src: optimizedSrc,
                        thumbnail: optimizedThumbnail,
                    });
                }
                
                // 更新优先图片，隐藏loading
                setOptimizedImages(priorityOptimizations);
                setIsLoadingImages(false);
                
                // 后台加载剩余图片
                if (remainingItems.length > 0) {
                    const remainingOptimizations = new Map();
                    for (const item of remainingItems) {
                        const optimizedSrc = await getOptimalImageSrc(item.src);
                        const optimizedThumbnail = item.thumbnail
                            ? await getOptimalImageSrc(item.thumbnail)
                            : optimizedSrc;

                        remainingOptimizations.set(item.id, {
                            src: optimizedSrc,
                            thumbnail: optimizedThumbnail,
                        });
                    }
                    
                    // 合并所有优化图片
                    setOptimizedImages(prev => new Map([...prev, ...remainingOptimizations]));
                }
            } catch (error) {
                console.warn('图片优化加载失败:', error);
                setIsLoadingImages(false);
            }
        };

        loadOptimizedPaths();
    }, [safeGalleryData]);

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
            {/* 全屏Loading状态 */}
            {isLoadingImages && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
                    <div className="text-center">
                        <CircularLoadingIndicator 
                            size={120} 
                            strokeWidth={8} 
                            showMask={false}
                        />
                        <p className="text-white/80 mt-4 text-sm">
                            {galleryText.mobile.loading?.[language] || 'Loading Gallery...'}
                        </p>
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
          
          /* 与其他长内容页面保持一致的样式 */
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

          /* 优化触摸交互 - 让SmartScrollManager处理滚动 */
          touch-action: manipulation;
        }

        /* 图片项目优化 */
        .gallery-image-item {
          /* 优化图片容器 */
          position: relative;
          cursor: pointer;
          transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
          
          /* 提升触摸响应 */
          touch-action: manipulation;
          
          /* 防止图片选择 */
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
            /* 移动端增加更多安全区域 */
            padding-top: max(3rem, calc(env(safe-area-inset-top) + 2rem));
            padding-bottom: max(6rem, calc(env(safe-area-inset-bottom) + 4rem));
          }
          
          /* 优化移动端图片性能 */
          .gallery-image-item img {
            will-change: auto;
            transform: translateZ(0);
            
            /* 优化图片渲染 */
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
          
          /* 移动端触摸反馈优化 */
          .gallery-image-item:active {
            transform: scale(0.95);
            transition: transform 0.1s ease-out;
          }
        }
      `}</style>

            <div ref={containerRef} className="gallery-mobile-container w-full relative">
                {/* 标题部分 - 使用store中的i18n文案 */}
                <div className="text-center mb-12 px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                        {galleryText.mobile.title[language] || galleryText.mobile.title.en}
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto leading-relaxed text-lg">
                        {galleryText.mobile.subtitle[language] || galleryText.mobile.subtitle.en}
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
                            // 获取优化后的图片路径，如果没有则显示加载状态
                            const optimized = optimizedImages.get(item.id);
                            const imageSrc = optimized?.thumbnail || optimized?.src;

                            return (
                                <div
                                    key={item.id}
                                    onClick={() => handleImageClick(index)}
                                    className="gallery-image-item group project-card cursor-pointer"
                                >
                                    {/* 正方形图片容器 - 使用object-fit处理不同比例 */}
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10">
                                        {imageSrc ? (
                                            <img
                                                src={imageSrc}
                                                alt={`Gallery item ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
