import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { galleryData } from '../../../store/galleryData';
import EllipticalHorizonGallery from './EllipticalHorizonGallery';
import PhotoSwipeGallery from './PhotoSwipeGallery';

const GallerySection = ({ language }) => {
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

    // 处理3D画廊项目点击
    const handleItemClick = (item, index) => {
        setSelectedImageIndex(index);
        setIsPhotoSwipeOpen(true);
    };

    // 处理PhotoSwipe关闭
    const handlePhotoSwipeClose = () => {
        setIsPhotoSwipeOpen(false);
    };

    return (
        <div className="flex flex-col justify-center min-h-screen w-full text-white relative">
            {/* Gallery标题 - 左上角，与NavigationCube对称 */}
            <div className="fixed top-6 left-6 z-50">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Gallery
                </h1>
                <p className="text-sm md:text-base text-white/50 mt-1 font-light">
                    椭圆地平线作品展示
                </p>
            </div>

            {/* 椭圆地平线Gallery - 使用首页背景 */}
            <div className="relative w-full h-screen overflow-hidden">
                <EllipticalHorizonGallery
                    items={allItems}
                    onItemClick={handleItemClick}
                    isVisible={isGallery3DVisible}
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
