import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = () => {
    const { content } = useApp();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 示例图片数据，后续可以从content.json或API获取
    const galleryImages = [
        { id: 1, src: '/zespri_poster.png', title: 'Zespri Project', category: 'Work' },
        { id: 2, src: '/uc-ds-all.jpg', title: 'University Projects', category: 'Education' },
        { id: 3, src: '/hua_presentation.jpg', title: 'Presentation', category: 'Academic' },
        { id: 4, src: '/awared-best-programmer.jpeg', title: 'Best Programmer Award', category: 'Achievement' },
        { id: 5, src: '/awared-excellence.jpeg', title: 'Excellence Award', category: 'Achievement' },
        { id: 6, src: '/realibox-00.jpg', title: 'Realibox Platform', category: 'Work' },
        { id: 7, src: '/fitsgo.gif', title: 'FitsGo App', category: 'Project' },
        { id: 8, src: '/stone.jpg', title: '360° Virtual Tours', category: 'Project' }
    ];

    const categories = ['All', 'Work', 'Project', 'Education', 'Academic', 'Achievement'];
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredImages = activeCategory === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === activeCategory);

    const openImage = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
        setCurrentIndex(nextIndex);
    };

    const prevImage = () => {
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[prevIndex]);
        setCurrentIndex(prevIndex);
    };

    return (
        <div className="w-full h-full overflow-auto p-8">
            <div className="max-w-7xl mx-auto">
                {/* 标题 */}
                <div className="content-section p-8 mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
                        {content.gallery.title}
                    </h1>
                    <p className="text-xl text-gray-300">
                        {content.gallery.subtitle}
                    </p>
                </div>

                {/* 分类筛选 */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full transition-all duration-300 ${
                                activeCategory === category
                                    ? 'bg-green-500 text-white shadow-lg transform scale-105'
                                    : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 图片网格 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((image, index) => (
                        <div
                            key={image.id}
                            className="content-section p-0 overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300"
                            onClick={() => openImage(image, index)}
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                                        <p className="text-sm opacity-80">{image.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 图片浏览器模态框 */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <div className="relative max-w-4xl max-h-full">
                            {/* 关闭按钮 */}
                            <button
                                onClick={closeImage}
                                className="absolute -top-12 right-0 text-white hover:text-green-400 z-10"
                            >
                                <FaTimes className="text-2xl" />
                            </button>

                            {/* 图片 */}
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[80vh] object-contain"
                            />

                            {/* 图片信息 */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4">
                                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                                <p className="text-green-400">{selectedImage.category}</p>
                            </div>

                            {/* 导航按钮 */}
                            {filteredImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-green-400 bg-black/50 rounded-full p-3"
                                    >
                                        <FaChevronLeft className="text-xl" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-green-400 bg-black/50 rounded-full p-3"
                                    >
                                        <FaChevronRight className="text-xl" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
