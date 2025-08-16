import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { PhotoSwipeContext, usePhotoSwipe } from '../../hooks/usePhotoSwipe';

// PhotoSwipe Provider Component
export const PhotoSwipeProvider = ({ children, language = 'en' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);
  const lightboxRef = useRef(null);

  // 获取图片真实尺寸的函数
  const getImageDimensions = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ 
          width: img.naturalWidth, 
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        });
      };
      img.onerror = () => {
        // 如果图片加载失败，使用默认尺寸
        resolve({ width: 1200, height: 800, aspectRatio: 1.5 });
      };
      img.crossOrigin = 'anonymous';
      img.src = src;
    });
  };

  // 打开PhotoSwipe
  const openPhotoSwipe = async (imageList, index = 0) => {
    if (!imageList || imageList.length === 0) return;

    setImages(imageList);
    setInitialIndex(index);
    setIsOpen(true);

    // 获取所有图片的真实尺寸
    const dimensionsPromises = imageList.map(image => 
      getImageDimensions(image.src || image.original)
    );

    try {
      const dimensions = await Promise.all(dimensionsPromises);
      
      // 准备PhotoSwipe数据
      const pswpItems = imageList.map((image, idx) => ({
        src: image.src || image.original,
        width: dimensions[idx].width,
        height: dimensions[idx].height,
        alt: image.alt || image.title || `Image ${idx + 1}`,
        caption: image.caption,
        title: image.title,
        description: image.description
      }));

      // 初始化PhotoSwipe
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }

      const lightbox = new PhotoSwipeLightbox({
        dataSource: pswpItems,
        index: index,
        pswpModule: () => import('photoswipe'),
        
        // UI配置
        bgOpacity: 0.95,
        spacing: 0.1,
        allowPanToNext: true,
        loop: true,
        zoom: true,
        
        // 动画配置
        showAnimationDuration: 300,
        hideAnimationDuration: 300,
        showHideAnimationType: 'zoom',
        
        // 交互配置
        imageClickAction: 'close',
        tapAction: 'close',
        doubleTapAction: 'zoom',
        
        // UI元素
        closeTitle: language === 'zh' ? '关闭' : 'Close',
        zoomTitle: language === 'zh' ? '缩放' : 'Zoom',
        arrowPrevTitle: language === 'zh' ? '上一张' : 'Previous',
        arrowNextTitle: language === 'zh' ? '下一张' : 'Next',
        
        // 错误处理
        errorMsg: language === 'zh' ? '图片无法加载' : 'The image cannot be loaded',
        
        // 移动端优化
        pinchToClose: true,
        closeOnVerticalDrag: true,
        padding: { top: 40, bottom: 40, left: 20, right: 20 },
        
        // 预加载设置
        preload: [1, 2]
      });

      // 监听关闭事件
      lightbox.on('close', () => {
        setIsOpen(false);
        setImages([]);
        setInitialIndex(0);
      });

      // 添加自定义UI元素
      lightbox.on('uiRegister', () => {
        // 添加图片计数器
        lightbox.pswp.ui.registerElement({
          name: 'custom-counter',
          className: 'pswp__custom-counter',
          appendTo: 'top-bar',
          onInit: (el, pswp) => {
            const updateCounter = () => {
              el.textContent = `${pswp.currIndex + 1} / ${pswp.getNumItems()}`;
            };
            
            pswp.on('change', updateCounter);
            pswp.on('afterInit', updateCounter);
          }
        });

        // 添加下载按钮
        lightbox.pswp.ui.registerElement({
          name: 'download-button',
          className: 'pswp__download-button',
          appendTo: 'bar',
          onInit: (el, pswp) => {
            el.innerHTML = `
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            `;
            el.title = language === 'zh' ? '下载图片' : 'Download image';
            el.onclick = () => {
              const currentItem = pswpItems[pswp.currIndex];
              if (currentItem) {
                const link = document.createElement('a');
                link.href = currentItem.src;
                link.download = `image_${pswp.currIndex + 1}.jpg`;
                link.click();
              }
            };
          }
        });
      });

      lightbox.init();
      lightbox.loadAndOpen(index);
      lightboxRef.current = lightbox;

    } catch (error) {
      console.error('Error loading images for PhotoSwipe:', error);
      setIsOpen(false);
    }
  };

  // 关闭PhotoSwipe
  const closePhotoSwipe = () => {
    if (lightboxRef.current) {
      lightboxRef.current.close();
    }
  };

  const contextValue = {
    isOpen,
    images,
    initialIndex,
    openPhotoSwipe,
    closePhotoSwipe
  };

  return (
    <PhotoSwipeContext.Provider value={contextValue}>
      {children}
      
      {/* 全局样式 */}
      <style>{`
        .pswp__custom-counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          z-index: 100;
        }
        
        .pswp__download-button {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          transition: all 0.3s ease;
          border-radius: 50%;
        }
        
        .pswp__download-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #60a5fa;
        }
        
        .pswp__bg {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
        }
        
        .pswp__zoom-wrap {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* 确保图片保持原始宽高比 */
        .pswp__img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
        
        /* 移动端优化 */
        @media (max-width: 768px) {
          .pswp__custom-counter {
            top: 15px;
            padding: 6px 12px;
            font-size: 12px;
          }
          
          .pswp__download-button {
            width: 40px;
            height: 40px;
          }
          
          .pswp__top-bar {
            height: 60px;
          }
        }
        
        /* 加载动画 */
        .pswp__preloader__icn {
          background: conic-gradient(from 0deg, transparent, #60a5fa);
          border-radius: 50%;
          mask: radial-gradient(circle at center, transparent 40%, black 41%);
        }
      `}</style>
    </PhotoSwipeContext.Provider>
  );
};

PhotoSwipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string
};

// 简单的PhotoSwipe触发组件
export const PhotoSwipeImage = ({ 
  src, 
  alt, 
  title, 
  description, 
  className = '',
  children,
  images = [] // 可选：如果是图片组的一部分
}) => {
  const { openPhotoSwipe } = usePhotoSwipe();

  const handleClick = () => {
    const imageList = images.length > 0 ? images : [{ src, alt, title, description }];
    const index = images.length > 0 ? images.findIndex(img => img.src === src) : 0;
    openPhotoSwipe(imageList, Math.max(0, index));
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={handleClick}>
      {children || (
        <img 
          src={src} 
          alt={alt} 
          title={title}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

PhotoSwipeImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  images: PropTypes.array
};
