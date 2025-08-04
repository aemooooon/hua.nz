import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { galleryData } from '../../../store/galleryData';
import SimpleSphereGallery from './SimpleSphereGallery';
import PhotoSwipeGallery from './PhotoSwipeGallery';
import { useImagePreloader } from '../../../hooks/useImagePreloader';
import BackgroundCanvas from '../../background/BackgroundCanvas';
import GlobalLoadingIndicator from '../../ui/GlobalLoadingIndicator';

const GallerySection = ({ language }) => {
    const [allItems, setAllItems] = useState([]);
    const [isPhotoSwipeOpen, setIsPhotoSwipeOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isGallery3DVisible, setIsGallery3DVisible] = useState(false);
    const [showBackground, setShowBackground] = useState(false); // 控制3D背景显示

    // 获取所有项目（不分类）
    useEffect(() => {
        const items = galleryData.getAllItems();
        setAllItems(items);
    }, []);

    // 使用图片预加载优化性能
    const {
        loadingCount,
        totalCount,
        loadedCount
    } = useImagePreloader(allItems, {
        concurrent: 3,
        priority: 'sequential', // 按顺序加载，适合 3D 球形展示
        generateThumbnail: false, // 暂时禁用，可在后期启用
    });

    // 分阶段加载策略：先显示3D gallery，再加载背景
    useEffect(() => {
        if (allItems.length === 0) return;
        
        // 第一阶段：当足够的图片加载完成时显示3D gallery
        const readyToShow3D = loadedCount >= Math.min(3, allItems.length) || loadingCount === 0;
        
        if (readyToShow3D && !isGallery3DVisible) {
            const timer = setTimeout(() => {
                setIsGallery3DVisible(true);
                
                // 第二阶段：3D球体显示后，延迟加载3D背景
                const backgroundTimer = setTimeout(() => {
                    setShowBackground(true);
                }, 1200); // 1.2秒后开始加载背景，让用户先专注于3D球体
                
                return () => clearTimeout(backgroundTimer);
            }, 300);
            
            return () => clearTimeout(timer);
        }
    }, [allItems.length, loadedCount, loadingCount, isGallery3DVisible]);

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
            {/* 分阶段加载的背景 - 只在3D球体显示后才加载 */}
            {showBackground && (
                <BackgroundCanvas 
                    effectType="effectchaos"
                />
            )}

            {/* Gallery标题 - 左上角 */}
            <div className="fixed top-6 left-6 z-50">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Gallery
                </h1>
            </div>

            {/* 球形Gallery */}
            <div className="relative w-full h-screen overflow-hidden">
                {/* 只有当3D Gallery可见且items加载完成时才渲染 */}
                {isGallery3DVisible && allItems.length > 0 && (
                    <SimpleSphereGallery
                        items={allItems}
                        onItemClick={handleItemClick}
                        isVisible={true}
                    />
                )}
                
                {/* 优化的加载指示器 */}
                {!isGallery3DVisible && (
                    <GlobalLoadingIndicator
                        isVisible={true}
                        loadedCount={loadedCount}
                        totalCount={totalCount}
                        loadingText="Loading Gallery..."
                        loadingTextChinese="加载画廊中..."
                        language={language}
                        variant="default"
                        position="center"
                        showProgress={true}
                        showPercentage={true}
                        showDots={true}
                    />
                )}

                {/* 显示背景加载状态（优先级高于图片加载状态） */}
                {isGallery3DVisible && !showBackground && (
                    <GlobalLoadingIndicator
                        isVisible={true}
                        loadingText="Loading Background..."
                        loadingTextChinese="加载背景中..."
                        language={language}
                        variant="corner"
                        position="top-right"
                        showProgress={false}
                        showDots={false}
                    />
                )}
                
                {/* 显示图片加载进度（当背景已加载且仍有图片在加载时） */}
                {isGallery3DVisible && showBackground && loadingCount > 0 && (
                    <GlobalLoadingIndicator
                        isVisible={true}
                        loadedCount={loadedCount}
                        totalCount={totalCount}
                        loadingText="Loading"
                        loadingTextChinese="加载中"
                        language={language}
                        variant="corner"
                        position="top-right"
                        showProgress={true}
                        showPercentage={false}
                        showDots={false}
                    />
                )}
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
