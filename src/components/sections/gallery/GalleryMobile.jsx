import PropTypes from 'prop-types';
import { useRef, useMemo } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { usePhotoSwipe } from '../../../hooks/usePhotoSwipe';

const GalleryMobile = ({ language = 'zh' }) => {
  const galleryData = useAppStore((state) => state.getAllGalleryItems());
  const { openPhotoSwipe } = usePhotoSwipe();
  const containerRef = useRef(null);

  // 安全检查：确保 galleryData 存在且是数组
  const safeGalleryData = useMemo(() => 
    Array.isArray(galleryData) ? galleryData : [], 
    [galleryData]
  );

  // 转换数据格式以适配PhotoSwipe
  const galleryItems = safeGalleryData.map((item, index) => ({
    id: item.id || index,
    src: item.src,
    thumbnail: item.thumbnail || item.src,
    title: item.title || '',
    description: item.description || ''
  }));

  const handleImageClick = (index) => {
    openPhotoSwipe(galleryItems, index); // 修复参数顺序：(imageList, index)
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
          
          /* iOS 安全区域支持 */
          padding-top: max(1rem, env(safe-area-inset-top));
          padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
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
      
      <div 
        ref={containerRef}
        className="gallery-mobile-container w-full"
      >
        {/* 标题部分 */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-text-primary mb-4">
            {language === 'zh' ? '作品集' : 'Gallery'}
          </h2>
          <p className="text-theme-text-secondary max-w-2xl mx-auto leading-relaxed">
            {language === 'zh' 
              ? '记录生活中的美好瞬间，每一张照片都承载着独特的故事与回忆。'
              : 'Capturing beautiful moments in life, each photo carries unique stories and memories.'
            }
          </p>
          <p className="text-theme-text-secondary/60 text-sm mt-2">
            {language === 'zh' ? '点击图片查看大图' : 'Tap images to view full size'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* 九宫格网格 - 保持格子大小一致，支持滚动 */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pb-8">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleImageClick(index)}
                className="group project-card cursor-pointer transform transition-all duration-300 active:scale-95"
              >
                {/* 正方形图片容器 - 使用object-fit处理不同比例 */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-theme-surface/10">
                  <img
                    src={item.thumbnail || item.src}
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzMzIj48L3JlY3Q+PC9zdmc+';
                    }}
                  />
                  
                  {/* 简单的选中指示器 */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-active:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* 图片序号（可选，小而不显眼） */}
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center text-white text-xs font-medium">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 空状态 */}
          {galleryItems.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-theme-surface/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-theme-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-theme-text-secondary text-lg mb-2">
                {language === 'zh' ? '暂无图片内容' : 'No gallery items available'}
              </div>
              <div className="text-theme-text-secondary/60 text-sm">
                {language === 'zh' ? '请稍后再试' : 'Please try again later'}
              </div>
            </div>
          )}

          {/* 底部提示信息 */}
          {galleryItems.length > 0 && (
            <div className="text-center mt-8 py-6">
              <p className="text-theme-text-secondary/60 text-sm">
                {language === 'zh' 
                  ? `共 ${galleryItems.length} 张图片 • 点击查看大图` 
                  : `${galleryItems.length} images • Tap to view full size`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

GalleryMobile.propTypes = {
  language: PropTypes.string
};

export default GalleryMobile;
