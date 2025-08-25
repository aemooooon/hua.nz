/**
 * 优化图片列表组件
 * 用于项目详情等场景的批量图片优化显示
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageOptimizer from '../../utils/image/ImageOptimizer.js';

const OptimizedImageList = ({ 
    images = [], 
    alt = '',
    className = '',
    imageClassName = '',
    loading = 'lazy',
    enableAvif = true,
    enableWebp = true,
    onImagesOptimized,
    renderImage
}) => {
    const [optimizedImages, setOptimizedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const optimizeImages = async () => {
            if (!images || images.length === 0) {
                setOptimizedImages([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                
                const optimized = await imageOptimizer.getOptimizedImagePaths(images, {
                    enableAvif,
                    enableWebp
                });
                
                if (isMounted) {
                    setOptimizedImages(optimized);
                    setIsLoading(false);
                    
                    if (onImagesOptimized) {
                        onImagesOptimized(optimized);
                    }
                }
            } catch (error) {
                console.error('❌ 批量图片优化失败:', error);
                if (isMounted) {
                    setOptimizedImages(images); // 回退到原始路径
                    setIsLoading(false);
                }
            }
        };

        optimizeImages();

        return () => {
            isMounted = false;
        };
    }, [images, enableAvif, enableWebp, onImagesOptimized]);

    if (isLoading) {
        return (
            <div className={`${className} animate-pulse`}>
                {images.map((_, index) => (
                    <div 
                        key={index} 
                        className={`${imageClassName} bg-gray-300 rounded`}
                        style={{ minHeight: '200px' }}
                    />
                ))}
            </div>
        );
    }

    if (renderImage) {
        return (
            <div className={className}>
                {optimizedImages.map((src, index) => 
                    renderImage(src, index, images[index])
                )}
            </div>
        );
    }

    return (
        <div className={className}>
            {optimizedImages.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`${alt} ${index + 1}`}
                    className={`${imageClassName} transition-opacity duration-300`}
                    loading={loading}
                    onError={(e) => {
                        // 如果优化图片加载失败，回退到原始图片
                        if (e.target.src !== images[index]) {
                            console.warn('⚠️ 优化图片加载失败，回退到原始图片:', images[index]);
                            e.target.src = images[index];
                        }
                    }}
                />
            ))}
        </div>
    );
};

OptimizedImageList.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    loading: PropTypes.oneOf(['eager', 'lazy']),
    enableAvif: PropTypes.bool,
    enableWebp: PropTypes.bool,
    onImagesOptimized: PropTypes.func,
    renderImage: PropTypes.func,
};

export default OptimizedImageList;
