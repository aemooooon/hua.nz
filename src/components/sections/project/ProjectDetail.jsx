import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import { usePhotoSwipe } from '../../../hooks/usePhotoSwipe';
import GlowDivider from '../../ui/GlowDivider';
import './ProjectDetail.css';

// 简单的图标组件
const X = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
X.propTypes = { className: PropTypes.string };

const ExternalLink = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
ExternalLink.propTypes = { className: PropTypes.string };

const MapPin = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
MapPin.propTypes = { className: PropTypes.string };

const Calendar = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
Calendar.propTypes = { className: PropTypes.string };

const Code = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
Code.propTypes = { className: PropTypes.string };

const BarChart3 = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
BarChart3.propTypes = { className: PropTypes.string };

const ProjectDetail = ({ project = null, isOpen, onClose }) => {
  const { language, getProjectsText, getProjectDescription } = useAppStore();
  const { openPhotoSwipe } = usePhotoSwipe();

  // 获取当前语言的项目文本
  const projectText = getProjectsText();

  // 获取项目类别的颜色样式（与ProjectSection保持一致）
  const getCategoryColors = (type) => {
    const colorMap = {
      'Full Stack': { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', hover: 'hover:bg-blue-500/20' },
      'Front End': { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', hover: 'hover:bg-green-500/20' },
      'Frontend': { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', hover: 'hover:bg-green-500/20' },
      'WebGL': { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', hover: 'hover:bg-purple-500/20' },
      'Website': { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', hover: 'hover:bg-orange-500/20' },
      'Mobile Apps': { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', hover: 'hover:bg-cyan-500/20' },
      'Activity': { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', hover: 'hover:bg-yellow-500/20' }
    };
    return colorMap[type] || { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', hover: 'hover:bg-blue-500/20' };
  };

  const categoryColors = getCategoryColors(project?.type);

  // 当模态框打开时禁用背景滚动并保存滚动位置
  useEffect(() => {
    if (isOpen) {
      // 保存当前滚动位置
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // 禁用页面滚动
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollTop}px`;
      document.body.style.left = `-${scrollLeft}px`;
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // 恢复滚动位置
      const scrollTop = parseInt(document.body.style.top || '0') * -1;
      const scrollLeft = parseInt(document.body.style.left || '0') * -1;
      
      // 恢复页面滚动
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      // 恢复滚动位置
      window.scrollTo(scrollLeft, scrollTop);
    }

    return () => {
      // 清理函数确保恢复正常状态
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
    const handleEsc = (e) => {
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
    title: `${language === 'en' ? project.name : (project.nameZh || project.name)} - ${index + 1}`,
    width: 1200, // 默认宽度，PhotoSwipe 会自动调整
    height: 800,  // 默认高度
  }));

  // 点击图片打开 PhotoSwipe
  const handleImageClick = (index = 0) => {
    openPhotoSwipe(photoSwipeItems, index);
  };

  const renderTechStack = () => {
    if (!project.tech || project.tech.length === 0) return null;
    
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-5 h-5 text-theme-primary" />
          <h3 className="text-lg font-semibold text-theme-text-primary">
            {projectText.detail.technologyStack}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-theme-primary/20 text-theme-primary text-xs rounded-full border border-theme-primary/30"
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
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-5 h-5 text-theme-success" />
          <h3 className="text-lg font-semibold text-theme-text-primary">
            {projectText.detail.projectStatistics}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="bg-gradient-to-br from-theme-success/10 to-theme-primary/10 p-4 rounded-lg border border-theme-success/20">
              <div className="text-theme-success text-sm capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-theme-text-primary text-2xl font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSubProjects = () => {
    if (!project.projects || project.projects.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-theme-text-primary">
            {projectText.detail.subProjects}
          </h3>
        </div>
        <div className="space-y-4">
          {project.projects.map((subProject, index) => (
            <div key={index} className="bg-gradient-to-br from-theme-secondary/10 to-theme-primary/5 p-4 rounded-lg border border-theme-secondary/20">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-theme-text-primary font-semibold">
                  {language === 'en' ? subProject.name : (subProject.nameZh || subProject.name)}
                </h4>
                <div className="flex gap-2">
                  {/* 支持新的links结构 */}
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
                  {subProject.links?.official && (
                    <a
                      href={subProject.links.official}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-secondary hover:text-theme-primary transition-colors"
                      style={{ cursor: 'pointer' }}
                      title={projectText.officialSite}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {subProject.links?.github && (
                    <a
                      href={subProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-success hover:text-theme-primary transition-colors"
                      style={{ cursor: 'pointer' }}
                      title={projectText.githubRepo}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {/* 向后兼容旧的link结构 */}
                  {subProject.link && !subProject.links && (
                    <a
                      href={subProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-secondary hover:text-theme-primary transition-colors"
                      style={{ cursor: 'pointer' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-theme-text-secondary text-sm mb-3">{subProject.description}</p>
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
    <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{ cursor: 'default' }}>
      {/* Large Prominent Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-[100000] group bg-theme-primary/20 hover:bg-red-500/90 border-2 border-theme-primary/50 hover:border-white/40 rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg hover:shadow-red-500/25"
        style={{ cursor: 'pointer' }}
        aria-label={projectText.detail.closeModal}
      >
        <X className="w-8 h-8 text-theme-primary group-hover:text-white transition-colors" />
      </button>

      {/* Content */}
      <div className="h-full overflow-y-auto pt-6 pb-6 px-6 md:px-12 lg:px-16 xl:px-24 project-detail-container" style={{ cursor: 'default' }}>
        {/* All content container with consistent width */}
        <div className="max-w-7xl mx-auto">
          {/* Header - Project Name Left Aligned */}
          <div className="mb-8 pt-16 md:pt-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-text-primary leading-tight text-left mb-6">
              {language === 'en' ? project.name : (project.nameZh || project.name)}
            </h2>
            
            {/* Divider matching ProjectSection style */}
            <GlowDivider className="w-full" width="w-full" />
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 mb-8">
            
            {/* Left Column - Images Gallery (2/3 width on large screens, full width on mobile) */}
            {images.length > 0 && (
              <div className="lg:col-span-2 order-1 lg:order-1">
                <div className="lg:sticky lg:top-6">
                  
                  {/* Single Image Mode */}
                  {!hasMultipleImages && (
                    <div className="relative group">
                      <img
                        src={images[0]}
                        alt={language === 'en' ? project.name : (project.nameZh || project.name)}
                        className="w-full aspect-video object-cover rounded-xl shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-3xl"
                        onClick={() => handleImageClick(0)}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      
                      {/* Single image hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform">
                          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gallery Grid Mode for Multiple Images */}
                  {hasMultipleImages && (
                    <div className="space-y-4">
                      {/* Primary large image */}
                      <div className="relative group">
                        <img
                          src={images[0]}
                          alt={`${language === 'en' ? project.name : (project.nameZh || project.name)} - Main`}
                          className="w-full aspect-video object-cover rounded-xl shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-3xl"
                          onClick={() => handleImageClick(0)}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                        
                        {/* Image counter badge */}
                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm font-medium">
                          {images.length} {language === 'zh' ? '张图片' : 'Images'}
                        </div>
                        
                        {/* Primary image hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Secondary images grid - show remaining images */}
                      {images.length > 1 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {images.slice(1, Math.min(images.length, 6)).map((img, index) => (
                            <div key={index + 1} className="relative group aspect-video overflow-hidden rounded-lg">
                              <img
                                src={img}
                                alt={`${language === 'en' ? project.name : (project.nameZh || project.name)} ${index + 2}`}
                                className="w-full h-full object-cover cursor-pointer transition-all duration-300 group-hover:scale-105"
                                onClick={() => handleImageClick(index + 1)}
                                onError={(e) => {
                                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzMzIj48L3JlY3Q+PC9zdmc+';
                                }}
                              />
                              
                              {/* Overlay for additional images indication */}
                              {index === 4 && images.length > 6 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                  <div className="text-white text-lg font-bold">
                                    +{images.length - 5}
                                  </div>
                                </div>
                              )}
                              
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/30 backdrop-blur-sm rounded-full p-2">
                                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right Column - Project Info (1/3 width on large screens, full width on mobile) */}
            <div className={`order-2 lg:order-2 ${images.length === 0 ? 'lg:col-span-3' : 'lg:col-span-1'}`}>
              <div className="space-y-4 md:space-y-6">
                
                {/* Image viewing hint */}
                {images.length > 0 && (
                  <div className="bg-theme-primary/10 border border-theme-primary/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-theme-primary text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {language === 'zh' 
                          ? hasMultipleImages 
                            ? `💫 点击任意图片开始浏览${images.length}张作品` 
                            : '� 点击图片查看高清大图'
                          : hasMultipleImages 
                            ? `💫 Click any image to browse all ${images.length} works` 
                            : '� Click image to view in full size'
                        }
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Company & Title */}
                <div className="bg-theme-surface/30 p-5 rounded-lg">
                  {project.company && (
                    <div className="text-theme-primary font-semibold text-xl mb-2">
                      {project.company}
                    </div>
                  )}
                  <div className="text-theme-text-primary font-medium text-lg">
                    {project.title}
                  </div>
                </div>

                {/* Time & Location - Enhanced typography */}
                <div className="space-y-4">
                  {/* Year */}
                  <div className="flex items-center gap-4 text-theme-text-secondary">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-theme-success flex-shrink-0" />
                    <div>
                      <div className="text-sm text-theme-text-secondary/80 uppercase tracking-wider font-medium">Year</div>
                      <div className="text-lg font-semibold text-theme-text-primary">{project.year}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4 text-theme-text-secondary">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-theme-primary flex-shrink-0" />
                    <div>
                      <div className="text-sm text-theme-text-secondary/80 uppercase tracking-wider font-medium">Location</div>
                      <div className="text-lg font-semibold text-theme-text-primary">{project.location}</div>
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="flex items-center gap-4 text-theme-text-secondary">
                    <Code className="w-5 h-5 md:w-6 md:h-6 text-theme-secondary flex-shrink-0" />
                    <div>
                      <div className="text-sm text-theme-text-secondary/80 uppercase tracking-wider font-medium">Type</div>
                      <div className="text-lg font-semibold text-theme-secondary">{project.type}</div>
                    </div>
                  </div>
                </div>

                {/* Links */}
                {(project.links || project.link) && (
                  <div>
                    <h3 className="text-xl font-semibold text-theme-text-primary mb-4">Links</h3>
                    <div className="space-y-3">
                      {/* Live Demo */}
                      {project.links?.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 ${categoryColors.text} transition-colors ${categoryColors.bg} ${categoryColors.hover} p-3 rounded-lg border ${categoryColors.border} group w-full`}
                          style={{ cursor: 'pointer' }}
                        >
                          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="text-base font-semibold">{projectText.liveDemo}</span>
                        </a>
                      )}

                      {/* Official Site */}
                      {project.links?.official && (
                        <a
                          href={project.links.official}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 ${categoryColors.text} transition-colors ${categoryColors.bg} ${categoryColors.hover} p-3 rounded-lg border ${categoryColors.border} group w-full`}
                          style={{ cursor: 'pointer' }}
                        >
                          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="text-base font-semibold">{projectText.officialSite}</span>
                        </a>
                      )}

                      {/* GitHub */}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 ${categoryColors.text} transition-colors ${categoryColors.bg} ${categoryColors.hover} p-3 rounded-lg border ${categoryColors.border} group w-full`}
                          style={{ cursor: 'pointer' }}
                        >
                          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="text-base font-semibold">{projectText.githubRepo}</span>
                        </a>
                      )}

                      {/* Legacy link support */}
                      {project.link && !project.links && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 ${categoryColors.text} transition-colors ${categoryColors.bg} ${categoryColors.hover} p-3 rounded-lg border ${categoryColors.border} group w-full`}
                          style={{ cursor: 'pointer' }}
                        >
                          <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span className="text-base font-semibold">{projectText.detail.visitSite}</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Technology Stack - Compact */}
                <div className="block lg:hidden">
                  {renderTechStack()}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Full Width Description and Details */}
          <div className="space-y-6 md:space-y-8">
            {/* Description */}
            <div className="bg-theme-surface/20 p-4 md:p-6 rounded-xl">
              <p 
                className="text-theme-text-secondary leading-relaxed"
                style={{ 
                  fontFamily: "'Lora', serif",
                  lineHeight: '1.7',
                  fontSize: '1.25rem'
                }}
              >
                {getProjectDescription(project, language)}
              </p>
            </div>

            {/* Technology Stack - Show on large screens and in bottom section */}
            <div className="hidden lg:block">
              {renderTechStack()}
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

ProjectDetail.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    nameZh: PropTypes.string,
    company: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    location: PropTypes.string,
    year: PropTypes.string,
    type: PropTypes.string,
    link: PropTypes.string,
    links: PropTypes.shape({
      live: PropTypes.string,
      official: PropTypes.string,
      github: PropTypes.string
    }),
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    tech: PropTypes.array,
    stats: PropTypes.object,
    projects: PropTypes.array
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProjectDetail;
