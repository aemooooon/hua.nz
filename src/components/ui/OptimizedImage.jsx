/**
 * OptimizedImage - 智能图片优化组件
 *
 * 功能特性：
 * - 自动检测浏览器支持的图片格式能力
 * - 优先级：AVIF > WebP > JPEG，提供最佳压缩率和质量
 * - 自动回退机制：如果优化格式不可用，回退到原始格式
 * - 渐进式加载：透明度过渡效果，提升用户体验
 * - 性能优化：避免不必要的原始图片请求
 *
 * 使用场景：
 * - 替换所有静态图片，自动获得性能提升
 * - 特别适合大型图片和频繁访问的图片
 * - 移动端友好：显著减少数据传输量
 *
 * 使用示例：
 * ```jsx
 * // 基础使用
 * <OptimizedImage
 *   src="/path/to/image.jpg"
 *   alt="描述文字"
 *   className="w-full h-auto"
 *   loading="lazy"
 * />
 *
 * // 禁用特定格式
 * <OptimizedImage
 *   src="/gallery/photo.jpg"
 *   alt="相册照片"
 *   enableAvif={false}  // 只使用WebP
 *   onLoad={() => console.log('图片加载完成')}
 * />
 *
 * // 头像应用
 * <OptimizedImage
 *   src="/avatar.jpg"
 *   alt="用户头像"
 *   className="rounded-full w-20 h-20"
 *   loading="eager"
 * />
 * ```
 *
 * 性能对比：
 * - AVIF: 比JPEG节省50-90%文件大小
 * - WebP: 比JPEG节省25-50%文件大小
 * - 自动选择: 确保最佳用户体验
 */

import { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import imageOptimizer from '../../utils/image/ImageOptimizer.js';

const OptimizedImage = forwardRef(
    (
        {
            src,
            alt,
            className = '',
            loading = 'lazy',
            onLoad,
            onError,
            enableAvif = true,
            enableWebp = true,
            ...props
        },
        ref
    ) => {
        // 优化后的图片路径，初始为null避免原始图片的不必要请求
        const [optimizedSrc, setOptimizedSrc] = useState(null);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            let isMounted = true;

            const loadOptimizedImage = async () => {
                try {
                    setIsLoading(true);

                    // 通过ImageOptimizer获取最优格式的图片路径
                    const optimized = await imageOptimizer.getOptimizedImagePath(src, {
                        enableAvif,
                        enableWebp,
                    });

                    if (isMounted) {
                        setOptimizedSrc(optimized);
                    }
                } catch (error) {
                    console.error('图片优化失败，使用原始路径:', error);
                    if (isMounted) {
                        setOptimizedSrc(src); // 回退到原始路径
                    }
                }
            };

            if (src) {
                loadOptimizedImage();
            }

            return () => {
                isMounted = false;
            };
        }, [src, enableAvif, enableWebp]);

        // 图片加载成功处理
        const handleLoad = event => {
            setIsLoading(false);
            if (onLoad) onLoad(event);
        };

        // 图片加载失败处理 - 自动回退机制
        const handleError = event => {
            setIsLoading(false);

            // 如果优化图片加载失败，尝试回退到原始图片
            if (optimizedSrc !== src) {
                console.warn('优化图片加载失败，回退到原始图片:', src);
                setOptimizedSrc(src);
                return;
            }

            if (onError) onError(event);
        };

        return optimizedSrc ? (
            <img
                ref={ref}
                src={optimizedSrc}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />
        ) : (
            // 优化过程中的占位符，保持布局稳定
            <div
                ref={ref}
                className={`${className} opacity-0`}
                {...props}
                style={{ ...props.style, minHeight: '1px' }}
            />
        );
    }
);

// 设置显示名称用于调试
OptimizedImage.displayName = 'OptimizedImage';

OptimizedImage.propTypes = {
    /** 图片源路径 */
    src: PropTypes.string.isRequired,
    /** 图片替代文本 */
    alt: PropTypes.string.isRequired,
    /** CSS类名 */
    className: PropTypes.string,
    /** 图片加载策略 */
    loading: PropTypes.oneOf(['eager', 'lazy']),
    /** 图片加载成功回调 */
    onLoad: PropTypes.func,
    /** 图片加载失败回调 */
    onError: PropTypes.func,
    /** 是否启用AVIF格式优化 */
    enableAvif: PropTypes.bool,
    /** 是否启用WebP格式优化 */
    enableWebp: PropTypes.bool,
    /** 内联样式 */
    style: PropTypes.object,
};

export default OptimizedImage;
