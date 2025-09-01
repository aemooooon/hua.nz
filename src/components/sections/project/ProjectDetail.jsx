import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import { usePhotoSwipe } from '../../../hooks/usePhotoSwipe';
import GlowDivider from '../../ui/GlowDivider';
import CornerCloseButton from '../../ui/CornerCloseButton';
import OptimizedImage from '../../ui/OptimizedImage';
import WordCloud from './WordCloud';
import './ProjectDetail.css';

// 简单的图标组件
const ExternalLink = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
    </svg>
);
ExternalLink.propTypes = { className: PropTypes.string };

const EyeIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
    </svg>
);
EyeIcon.propTypes = { className: PropTypes.string };

// 备选图标 - 文档图标
const DocumentTextIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
    </svg>
);
DocumentTextIcon.propTypes = { className: PropTypes.string };

// 备选图标 - 信息图标
const InformationCircleIcon = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);
InformationCircleIcon.propTypes = { className: PropTypes.string };

const ProjectDetailNew = ({ project = null, isOpen, onClose }) => {
    const { language, getProjectsText, getProjectDescription } = useAppStore();
    const { openPhotoSwipe } = usePhotoSwipe();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // 获取当前语言的项目文本
    const projectText = getProjectsText();

    // 工具函数：获取多语言字段值
    const getLocalizedValue = field => {
        if (!field) return '';
        if (typeof field === 'string') return field;
        if (typeof field === 'object') {
            return field[language] || field.en || field.zh || '';
        }
        return '';
    };

    // 每次打开新项目时重置图片索引
    useEffect(() => {
        if (isOpen && project) {
            setActiveImageIndex(0);
        }
    }, [isOpen, project]);

    // 获取项目类别的颜色样式
    const getCategoryColors = type => {
        const colorMap = {
            'Data Science': {
                text: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/30',
                hover: 'hover:bg-blue-500/20',
            },
            Backend: {
                text: 'text-red-400',
                bg: 'bg-red-500/10',
                border: 'border-red-500/30',
                hover: 'hover:bg-red-500/20',
            },
            Frontend: {
                text: 'text-green-400',
                bg: 'bg-green-500/10',
                border: 'border-green-500/30',
                hover: 'hover:bg-green-500/20',
            },
            WebGL: {
                text: 'text-purple-400',
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/30',
                hover: 'hover:bg-purple-500/20',
            },
            Website: {
                text: 'text-orange-400',
                bg: 'bg-orange-500/10',
                border: 'border-orange-500/30',
                hover: 'hover:bg-orange-500/20',
            },
            'Mobile Apps': {
                text: 'text-cyan-400',
                bg: 'bg-cyan-500/10',
                border: 'border-cyan-500/30',
                hover: 'hover:bg-cyan-500/20',
            },
            Activity: {
                text: 'text-yellow-400',
                bg: 'bg-yellow-500/10',
                border: 'border-yellow-500/30',
                hover: 'hover:bg-yellow-500/20',
            },
        };
        return (
            colorMap[type] || {
                text: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/30',
                hover: 'hover:bg-blue-500/20',
            }
        );
    };

    const categoryColors = getCategoryColors(project?.type);

    // 当模态框打开时禁用背景滚动
    useEffect(() => {
        if (isOpen) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollTop}px`;
            document.body.style.left = `-${scrollLeft}px`;
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        } else {
            const scrollTop = parseInt(document.body.style.top || '0') * -1;
            const scrollLeft = parseInt(document.body.style.left || '0') * -1;

            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.width = '';
            document.body.style.height = '';

            window.scrollTo(scrollLeft, scrollTop);
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.width = '';
            document.body.style.height = '';
        };
    }, [isOpen]);

    // ESC键关闭模态框
    useEffect(() => {
        const handleEsc = e => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            return () => document.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const images = Array.isArray(project.img) ? project.img : [project.img].filter(Boolean);
    const hasMultipleImages = images.length > 1;

    // 准备 PhotoSwipe 图片数据
    const photoSwipeItems = images.map((img, index) => ({
        src: img,
        title: `${getLocalizedValue(project.name)} - ${index + 1}`,
        width: 1200,
        height: 800,
    }));

    // 点击大图打开 PhotoSwipe
    const handleMainImageClick = (index = activeImageIndex) => {
        openPhotoSwipe(photoSwipeItems, index);
    };

    // 点击缩略图切换大图
    const handleThumbnailClick = index => {
        setActiveImageIndex(index);
    };

    const renderTechStack = () => {
        if (!project.tech || project.tech.length === 0) return null;

        return (
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <svg
                        className="w-5 h-5 text-theme-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold text-theme-text-primary">
                        {projectText.detail.techStack}
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1.5 bg-theme-primary/20 text-theme-primary text-sm rounded-full border border-theme-primary/30 font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const renderStats = () => {
        if (!project.stats) return null;

        return (
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <svg
                        className="w-5 h-5 text-theme-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold text-theme-text-primary">
                        {projectText.detail.projectStatistics}
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(project.stats).map(([key, value]) => (
                        <div
                            key={key}
                            className="bg-gradient-to-br from-theme-success/10 to-theme-primary/10 p-4 rounded-lg border border-theme-success/20"
                        >
                            <div className="text-theme-success text-sm capitalize mb-1">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-theme-text-primary text-2xl font-bold">
                                {value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSubProjects = () => {
        if (!project.projects || project.projects.length === 0) return null;

        return (
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-semibold text-theme-text-primary">
                        {projectText.detail.subProjects}
                    </h3>
                </div>
                <div className="space-y-4">
                    {project.projects.map((subProject, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-theme-secondary/10 to-theme-primary/5 p-4 rounded-lg border border-theme-secondary/20"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="text-theme-text-primary font-semibold">
                                    {getLocalizedValue(subProject.name)}
                                </h4>
                                <div className="flex gap-2">
                                    {subProject.links?.live && (
                                        <a
                                            href={subProject.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-theme-primary hover:text-theme-secondary transition-colors"
                                            style={{ cursor: 'pointer' }}
                                            title={projectText.liveDemo}
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className="text-slate-200 text-sm mb-3" style={{ color: '#e2e8f0' }}>
                                {subProject.description}
                            </p>
                            {subProject.features && (
                                <div className="flex flex-wrap gap-2">
                                    {subProject.features.map((feature, featureIndex) => (
                                        <span
                                            key={featureIndex}
                                            className="px-2 py-1 bg-theme-secondary/20 text-theme-secondary text-xs rounded border border-theme-secondary/30"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[99999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            style={{ cursor: 'default' }}
        >
            {/* 项目详情页关闭按钮 - 使用通用CornerCloseButton组件 */}
            <CornerCloseButton
                onClick={onClose}
                ariaLabel={projectText.detail.closeModal}
                iconSize="w-16 h-16"
                iconColor="text-white"
                iconHoverColor="text-white"
                circleColor="bg-theme-primary"
                circleSize="w-80 h-80"
                strokeWidth={1.5}
                animationDuration="duration-500"
                position={{ top: 'top-8', right: 'right-8' }}
            />

            {/* Content */}
            <div
                className="h-full overflow-y-auto pt-6 pb-6 px-6 md:px-8 lg:px-12 project-detail-container"
                style={{ cursor: 'default' }}
            >
                {/* Header - Project Name */}
                <div className="text-center mb-12 pt-20 md:pt-12 lg:pt-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-text-primary leading-tight mb-6">
                        {getLocalizedValue(project.name)}
                    </h1>
                    <GlowDivider className="mx-auto mb-8" width="w-full max-w-4xl" />
                    <div className="text-xl md:text-2xl text-theme-text-white-70 font-light italic">
                        {project.company && `${project.company} • `}
                        {project.year}
                    </div>
                </div>

                {/* Hero Gallery Section - Full Width Immersive */}
                {images.length > 0 && (
                    <div className="mb-12 lg:mb-16">
                        {/* Single Image Hero */}
                        {!hasMultipleImages && (
                            <div className="relative group">
                                <div className="aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl">
                                    <OptimizedImage
                                        src={images[0]}
                                        alt={getLocalizedValue(project.name)}
                                        className="w-full h-full object-cover cursor-pointer transition-all duration-700 group-hover:scale-105"
                                        onClick={() => handleMainImageClick(0)}
                                        onError={e => {
                                            e.target.src =
                                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                                        }}
                                    />

                                    {/* Elegant hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <div className="bg-white/10 backdrop-blur-md rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-500">
                                            <svg
                                                className="w-10 h-10 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Multiple Images - Main Image + Thumbnails */}
                        {hasMultipleImages && (
                            <div className="space-y-4">
                                {/* Main Display Image */}
                                <div className="relative group">
                                    <div className="aspect-[16/7] lg:aspect-[21/8] overflow-hidden rounded-2xl shadow-2xl">
                                        <OptimizedImage
                                            src={images[activeImageIndex]}
                                            alt={`${getLocalizedValue(project.name)} - ${activeImageIndex + 1}`}
                                            className="w-full h-full object-cover cursor-pointer transition-all duration-700 ease-in-out opacity-100"
                                            onClick={() => handleMainImageClick(activeImageIndex)}
                                            onError={e => {
                                                e.target.src =
                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                                            }}
                                            key={activeImageIndex}
                                            style={{
                                                animation: 'fadeInImage 0.6s ease-in-out',
                                            }}
                                        />
                                    </div>

                                    {/* Gallery indicator */}
                                    <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium z-20">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4"
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
                                            {activeImageIndex + 1} / {images.length}
                                        </div>
                                    </div>

                                    {/* Elegant main image overlay - Make entire overlay clickable */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 cursor-pointer z-10 rounded-2xl"
                                        onClick={() => handleMainImageClick(activeImageIndex)}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-white/10 backdrop-blur-md rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-700">
                                                <svg
                                                    className="w-12 h-12 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Small Thumbnail Grid - Mobile Gallery Style */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleThumbnailClick(index)}
                                            className={`carousel-thumbnail flex-shrink-0 w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg border-2 overflow-hidden ${
                                                index === activeImageIndex
                                                    ? 'active border-theme-primary opacity-100 shadow-lg shadow-theme-primary/25'
                                                    : 'border-theme-border/30 opacity-70 hover:opacity-90'
                                            }`}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <OptimizedImage
                                                src={img}
                                                alt={`${getLocalizedValue(project.name)} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                onError={e => {
                                                    e.target.src =
                                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzMzIj48L3JlY3Q+PC9zdmc+';
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Project Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {/* Quick Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Project Insights Title */}
                        <h3 className="text-lg font-semibold text-theme-text-primary flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-theme-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                            {language === 'zh' ? 'Insights' : 'Insights'}
                        </h3>

                        {/* Word Cloud Card */}
                        <div className="group bg-gradient-to-br from-theme-surface/30 to-theme-surface/10 p-6 rounded-2xl border border-theme-border/20 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-theme-primary/10 transition-all duration-500 relative overflow-hidden">
                            {/* Light effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"></div>

                            {/* D3.js Word Cloud */}
                            <div className="relative z-10">
                                <WordCloud
                                    project={project}
                                    getProjectDescription={getProjectDescription}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Technology Stack */}
                        {renderTechStack()}

                        {/* Links */}
                        {(project.links?.live || project.links?.github || project.link) && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-theme-text-primary flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-theme-primary"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    {language === 'zh' ? 'Links' : 'Links'}
                                </h3>

                                {/* Live Demo */}
                                {project.links?.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-3 ${categoryColors.text} transition-all duration-300 ${categoryColors.bg} hover:${categoryColors.hover} p-4 rounded-xl border ${categoryColors.border} group w-full hover:scale-105 hover:shadow-lg`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <span className="font-semibold">
                                            {projectText.liveDemo}
                                        </span>
                                    </a>
                                )}

                                {/* GitHub */}
                                {project.links?.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-3 ${categoryColors.text} transition-all duration-300 ${categoryColors.bg} hover:${categoryColors.hover} p-4 rounded-xl border ${categoryColors.border} group w-full hover:scale-105 hover:shadow-lg`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <span className="font-semibold">
                                            {projectText.githubRepo}
                                        </span>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview Section */}
                        <div>
                            {/* Overview Title */}
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <EyeIcon className="w-7 h-7 text-theme-primary" />
                                {language === 'zh' ? '项目概览' : 'Overview'}
                            </h3>

                            {/* Project Description Card */}
                            <div className="group bg-gradient-to-br from-slate-50/8 via-white/6 to-slate-100/8 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-theme-primary/10 transition-all duration-500 relative overflow-hidden">
                                {/* 柔和的光效覆盖层 - 降低强度 */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"></div>

                                {/* 添加柔和的内部光晕 */}
                                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-secondary/5 rounded-2xl"></div>

                                <div className="relative z-10">
                                    {(() => {
                                        const description = getProjectDescription(
                                            project,
                                            language
                                        );

                                        // 如果描述是数组，渲染多个段落
                                        if (Array.isArray(description)) {
                                            return (
                                                <div className="space-y-6">
                                                    {description.map((paragraph, index) => (
                                                        <p
                                                            key={index}
                                                            className="text-slate-200 leading-relaxed text-lg"
                                                            style={{
                                                                fontFamily: "'Lora', serif",
                                                                lineHeight: '1.8',
                                                                textAlign: 'justify',
                                                                textJustify: 'inter-word',
                                                                hyphens: 'auto',
                                                                wordBreak: 'break-word',
                                                                color: '#e2e8f0', // 柔和的浅灰白色
                                                            }}
                                                        >
                                                            {paragraph}
                                                        </p>
                                                    ))}
                                                </div>
                                            );
                                        }

                                        // 如果描述是字符串，渲染单个段落
                                        return (
                                            <p
                                                className="text-slate-200 leading-relaxed text-lg"
                                                style={{
                                                    fontFamily: "'Lora', serif",
                                                    lineHeight: '1.8',
                                                    textAlign: 'justify',
                                                    textJustify: 'inter-word',
                                                    hyphens: 'auto',
                                                    wordBreak: 'break-word',
                                                    color: '#e2e8f0', // 柔和的浅灰白色
                                                }}
                                            >
                                                {description}
                                            </p>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>

                        {/* Project Statistics */}
                        {renderStats()}

                        {/* Sub Projects */}
                        {renderSubProjects()}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

ProjectDetailNew.propTypes = {
    project: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ProjectDetailNew;
