import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';

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
  const { language } = useAppStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  const renderTechStack = () => {
    if (!project.tech || project.tech.length === 0) return null;
    
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">
            {language === 'en' ? 'Technology Stack' : '技术栈'}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
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
          <BarChart3 className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">
            {language === 'en' ? 'Project Statistics' : '项目统计'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(project.stats).map(([key, value]) => (
            <div key={key} className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="text-green-300 text-sm capitalize mb-1">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-white text-2xl font-bold">{value}</div>
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
          <h3 className="text-lg font-semibold text-white">
            {language === 'en' ? 'Sub Projects' : '子项目'}
          </h3>
        </div>
        <div className="space-y-4">
          {project.projects.map((subProject, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/20">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-semibold">
                  {language === 'en' ? subProject.name : (subProject.nameZh || subProject.name)}
                </h4>
                {subProject.link && (
                  <a
                    href={subProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    style={{ cursor: 'pointer' }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <p className="text-gray-300 text-sm mb-3">{subProject.description}</p>
              {subProject.features && (
                <div className="flex flex-wrap gap-2">
                  {subProject.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30"
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
        className="fixed top-6 right-6 z-[100000] group bg-theme-primary/20 hover:bg-theme-primary/30 border-2 border-theme-primary/50 hover:border-theme-primary rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg hover:shadow-theme-primary/25"
        style={{ cursor: 'pointer' }}
        aria-label="Close modal"
      >
        <X className="w-8 h-8 text-theme-primary group-hover:text-white transition-colors" />
      </button>

      {/* Content */}
      <div className="h-full overflow-y-auto pt-6 pb-6 px-6 md:px-12 lg:px-16 xl:px-24" style={{ cursor: 'default' }}>
        {/* Header */}
        <div className="mb-8 pt-16 md:pt-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">{project.title}</h2>
          <p className="text-xl text-slate-400">{language === 'en' ? project.name : project.name}</p>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Images */}
            {images.length > 0 && (
              <div className="order-1">
                <div className="sticky top-6">
                  <div className="relative">
                    <img
                      src={images[activeImageIndex]}
                      alt={project.title}
                      className="w-full h-64 md:h-80 lg:h-96 xl:h-[500px] object-cover rounded-xl shadow-2xl"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                    {hasMultipleImages && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {hasMultipleImages && (
                      <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                        {images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                              index === activeImageIndex 
                                ? 'border-blue-400 opacity-100 shadow-lg shadow-blue-400/25' 
                                : 'border-slate-600 opacity-60 hover:opacity-80'
                            }`}
                            style={{ cursor: 'pointer' }}
                          >
                          <img
                            src={img}
                            alt={`${project.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSIgZm9udC1zaXplPSIxMHB4Ij5OL0E8L3RleHQ+PC9zdmc+';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right Column - Project Details */}
            <div className={`order-2 ${images.length === 0 ? 'lg:col-span-2' : ''}`}>
              {/* Project Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 text-slate-300 bg-slate-800/50 p-4 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">{project.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300 bg-slate-800/50 p-4 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">{project.year}</span>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 hover:bg-blue-500/20 p-4 rounded-lg border border-blue-500/30"
                    style={{ cursor: 'pointer' }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {language === 'en' ? 'Visit Site' : '访问网站'}
                    </span>
                  </a>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-slate-300 text-lg leading-relaxed">{project.description}</p>
              </div>

              {/* Technology Stack */}
              {renderTechStack()}

              {/* Project Statistics */}
              {renderStats()}

              {/* Sub Projects */}
              {renderSubProjects()}
            </div>
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
    description: PropTypes.string,
    location: PropTypes.string,
    year: PropTypes.string,
    link: PropTypes.string,
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    tech: PropTypes.array,
    stats: PropTypes.object,
    projects: PropTypes.array
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProjectDetail;
