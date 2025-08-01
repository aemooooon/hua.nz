import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { galleryData } from '../../../store/galleryData';
import { useAppStore } from '../../../store/useAppStore';
import NavigationCube from '../../NavigationCube';
import CSS3DSphereGallery from './CSS3DSphereGallery';
import PhotoSwipeGallery from './PhotoSwipeGallery';

const GallerySection = ({ language }) => {
    const { sections, setCurrentSection } = useAppStore();
    const [allItems, setAllItems] = useState([]);
    const [isPhotoSwipeOpen, setIsPhotoSwipeOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isGallery3DVisible, setIsGallery3DVisible] = useState(false);

    // 获取所有项目（不分类）
    useEffect(() => {
        const items = galleryData.getAllItems();
        setAllItems(items);
    }, []);

    // 当Gallery section可见时启动3D gallery
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsGallery3DVisible(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    // 处理3D画廊项目点击 - 使用useCallback稳定化
    const handleItemClick = useCallback((item, index) => {
        console.log('handleItemClick called:', item, index);
        setSelectedImageIndex(index);
        setIsPhotoSwipeOpen(true);
    }, []);

    // 处理PhotoSwipe关闭 - 使用useCallback稳定化
    const handlePhotoSwipeClose = useCallback(() => {
        setIsPhotoSwipeOpen(false);
    }, []);

    return (
        <div className="flex flex-col justify-center min-h-screen w-full text-white relative">
            {/* Gallery标题 - 左上角，与NavigationCube对称 */}
            <div className="fixed top-6 left-6 z-50">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Gallery
                </h1>
                <p className="text-sm md:text-base text-white/50 mt-1 font-light">
                    球形图片展示
                </p>
            </div>

            {/* CSS3D球形Gallery */}
            <div className="relative w-full h-screen overflow-hidden">
                {/* 只有当3D Gallery可见且items加载完成时才渲染 */}
                {isGallery3DVisible && allItems.length > 0 && (
                    <CSS3DSphereGallery
                        items={allItems}
                        onItemClick={handleItemClick}
                        isVisible={true}
                    />
                )}
                
                {/* 提示信息 */}
                {allItems.length > 0 && (
                    <div className="fixed bottom-6 left-6 z-40 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                        <div className="text-white/70 text-sm">
                            拖拽旋转 · 点击查看 · {allItems.length} 张图片
                        </div>
                    </div>
                )}
                
                {/* 加载指示器 */}
                {!isGallery3DVisible && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-white/50 text-lg">
                            加载中...
                        </div>
                    </div>
                )}
            </div>

            {/* NavigationCube - 右上角 */}
            <div className="fixed top-6 right-6 z-50">
                <NavigationCube 
                    sections={sections}
                    currentSectionId="gallery"
                    onSectionChange={setCurrentSection}
                />
            </div>

            {/* PhotoSwipe 画廊 */}
            <PhotoSwipeGallery
                items={allItems}
                isOpen={isPhotoSwipeOpen}
                initialIndex={selectedImageIndex}
                onClose={handlePhotoSwipeClose}
                language={language}
            />
        </div>
    );
};

GallerySection.propTypes = {
    language: PropTypes.string.isRequired
};

export default GallerySection;
