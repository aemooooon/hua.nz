import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const PhotoSwipeGallery = ({ 
    items = [], 
    isOpen = false, 
    initialIndex = 0, 
    onClose,
    language = 'en'
}) => {
    const lightboxRef = useRef(null);
    const galleryRef = useRef(null);

    useEffect(() => {
        if (!items.length) return;

        // 初始化PhotoSwipe
        const lightbox = new PhotoSwipeLightbox({
            gallery: galleryRef.current,
            children: '.pswp-gallery-item',
            pswpModule: () => import('photoswipe'),
            
            // UI配置
            bgOpacity: 0.9,
            spacing: 0.1,
            allowPanToNext: false, // 禁用拖拽切换，避免宽高比问题
            loop: true,
            zoom: true,
            
            // 动画配置
            showAnimationDuration: 300,
            hideAnimationDuration: 300,
            
            // 确保保持图片原始宽高比 - 关键配置
            imageClickAction: 'zoom',
            tapAction: 'toggle-controls',
            doubleTapAction: 'zoom',
            
            // 防止图片被拉伸或压缩
            thumbBounds: false,
            showHideAnimationType: 'fade',
            allowMouseDrag: true,
            
            // 自定义UI元素
            ui: {
                closeTitle: 'Close',
                zoomTitle: 'Zoom',
                arrowPrevTitle: 'Previous',
                arrowNextTitle: 'Next',
                loadingIndicatorDelay: 1000
            },
            
            // 预加载设置
            preload: [1, 3]
        });

        // 自定义幻灯片内容
        lightbox.on('uiRegister', () => {
            // 添加信息面板
            lightbox.pswp.ui.registerElement({
                name: 'custom-info',
                className: 'pswp__custom-info',
                appendTo: 'root',
                onInit: (el, pswp) => {
                    const updateInfo = () => {
                        const item = items[pswp.currIndex];
                        if (!item) return;
                        
                        el.innerHTML = `
                            <div class="pswp-info-panel">
                                <div class="pswp-info-content">
                                    <h3 class="pswp-info-title">${item.title[language] || item.title.en}</h3>
                                    <p class="pswp-info-description">${item.description[language] || item.description.en}</p>
                                    <div class="pswp-info-meta">
                                        <span class="pswp-info-date">${new Date(item.date).toLocaleDateString()}</span>
                                        <div class="pswp-info-tags">
                                            ${item.tags ? item.tags.map(tag => `<span class="pswp-tag">#${tag}</span>`).join('') : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    };
                    
                    pswp.on('change', updateInfo);
                    pswp.on('afterInit', updateInfo);
                }
            });
            
            // 添加下载按钮
            lightbox.pswp.ui.registerElement({
                name: 'download',
                className: 'pswp__download',
                appendTo: 'bar',
                onInit: (el, pswp) => {
                    el.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    `;
                    el.onclick = () => {
                        const item = items[pswp.currIndex];
                        if (item) {
                            const link = document.createElement('a');
                            link.href = item.src;
                            link.download = `${item.title.en.replace(/\s+/g, '_').toLowerCase()}.jpg`;
                            link.click();
                        }
                    };
                }
            });
        });

        // 监听关闭事件
        lightbox.on('close', () => {
            onClose && onClose();
        });

        lightbox.init();
        lightboxRef.current = lightbox;

        return () => {
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
            }
        };
    }, [items, language, onClose]);

    // 控制打开/关闭
    useEffect(() => {
        if (!lightboxRef.current) return;
        
        if (isOpen) {
            // 创建图片对象来获取实际尺寸 - 性能优化：添加缓存
            const loadImageDimensions = (src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve({ width: img.naturalWidth, height: img.naturalHeight });
                    };
                    img.onerror = () => {
                        resolve({ width: 1200, height: 800 }); // 默认尺寸
                    };
                    // 性能优化：使用小尺寸预览来获取宽高比
                    img.crossOrigin = 'anonymous';
                    img.src = src;
                });
            };

            // 获取所有图片的实际尺寸 - 性能优化：限制并发加载
            const loadPromises = items.slice(0, Math.min(items.length, 20)).map(item => 
                loadImageDimensions(item.src)
            );
            
            Promise.all(loadPromises)
                .then(dimensions => {
                    const pswpItems = items.map((item, index) => ({
                        src: item.src,
                        width: index < dimensions.length ? dimensions[index].width : 1200,
                        height: index < dimensions.length ? dimensions[index].height : 800,
                        alt: item.title[language] || item.title.en
                    }));
                    
                    lightboxRef.current.loadAndOpen(initialIndex, pswpItems);
                });
        }
    }, [isOpen, initialIndex, items, language]);

    return (
        <>
            {/* 隐藏的画廊容器用于PhotoSwipe */}
            <div 
                ref={galleryRef} 
                className="pswp-gallery hidden"
                style={{ display: 'none' }}
            >
                {items.map((item, index) => (
                    <a
                        key={item.id || index} // 添加唯一的key属性
                        className="pswp-gallery-item"
                        href={item.src}
                        data-pswp-width="1200"
                        data-pswp-height="800"
                        data-pswp-index={index}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img 
                            src={item.thumbnail || item.src} 
                            alt={item.title[language] || item.title.en}
                            style={{ display: 'none' }}
                        />
                    </a>
                ))}
            </div>
            
            {/* 自定义样式 */}
            <style>{`
                .pswp__custom-info {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                    padding: 40px 20px 20px;
                    pointer-events: none;
                    z-index: 100;
                }
                
                .pswp-info-panel {
                    max-width: 600px;
                    margin: 0 auto;
                    color: white;
                }
                
                .pswp-info-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: #ffffff;
                }
                
                .pswp-info-description {
                    font-size: 1rem;
                    margin-bottom: 1rem;
                    color: #e5e5e5;
                    line-height: 1.5;
                }
                
                .pswp-info-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .pswp-info-date {
                    color: #a0a0a0;
                    font-size: 0.9rem;
                }
                
                .pswp-info-tags {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                
                .pswp-tag {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 0.25rem 0.5rem;
                    border-radius: 1rem;
                    font-size: 0.8rem;
                    color: #ffffff;
                    backdrop-filter: blur(10px);
                }
                
                .pswp__download {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #ffffff;
                    transition: color 0.3s ease;
                }
                
                .pswp__download:hover {
                    color: #60a5fa;
                }
                
                .pswp__bg {
                    background: rgba(0, 0, 0, 0.95);
                    backdrop-filter: blur(20px);
                }
                
                .pswp__zoom-wrap {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                /* 自定义加载动画 */
                .pswp__preloader__icn {
                    background: conic-gradient(from 0deg, transparent, #60a5fa);
                    border-radius: 50%;
                    mask: radial-gradient(circle at center, transparent 40%, black 41%);
                }
                
                /* 响应式调整 */
                @media (max-width: 768px) {
                    .pswp__custom-info {
                        padding: 20px 15px 15px;
                    }
                    
                    .pswp-info-title {
                        font-size: 1.25rem;
                    }
                    
                    .pswp-info-description {
                        font-size: 0.9rem;
                    }
                    
                    .pswp-info-meta {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </>
    );
};

PhotoSwipeGallery.propTypes = {
    items: PropTypes.array,
    isOpen: PropTypes.bool,
    initialIndex: PropTypes.number,
    onClose: PropTypes.func,
    language: PropTypes.string
};

export default PhotoSwipeGallery;
