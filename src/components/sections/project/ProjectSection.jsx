import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectGeoViewer from './ProjectGeoViewer';
import ProjectDetailNew from './ProjectDetail';
import GlowDivider from '../../ui/GlowDivider';
import OptimizedImage from '../../ui/OptimizedImage';
import useAppStore from '../../../store/useAppStore';
import { ThemeTitle } from '../../ui/ThemeComponents';

// MapPin 图标组件
const MapPin = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

MapPin.propTypes = {
    className: PropTypes.string
};

const ProjectSection = ({ language }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    
    // 从store获取数据和方法
    const { getAllProjects, selectedProject, setSelectedProject, getProjectsText } = useAppStore();

    // 获取当前语言的项目文本
    const projectText = getProjectsText();

    // 获取所有项目数据
    const projects = getAllProjects();

    // 按项目的 type 或 tags 字段分组
    const projectsByCategory = projects.reduce((acc, project) => {
        // 优先使用 type 字段进行分类
        if (project.type) {
            // 处理多语言类型字段
            const category = typeof project.type === 'object' 
                ? project.type[language] || project.type.en 
                : project.type;
            if (!acc[category]) acc[category] = [];
            acc[category].push(project);
        } else if (project.tags && Array.isArray(project.tags)) {
            // 只有当没有 type 字段时才使用 tags 进行分组
            project.tags.forEach(tag => {
                if (!acc[tag]) acc[tag] = [];
                acc[tag].push(project);
            });
        } else {
            // 都没有的情况下使用默认分类
            const category = projectText.filter.other;
            if (!acc[category]) acc[category] = [];
            acc[category].push(project);
        }
        return acc;
    }, {});

    // 获取过滤后的项目
    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projectsByCategory[activeFilter] || [];

    // 状态颜色映射 - 统一使用主题色
    const getStatusColor = (status) => {
        if (!status) return `bg-theme-primary/20 text-theme-primary border-theme-primary/50`;
        // 所有年份都使用主题色，不再区分不同状态
        return `bg-theme-primary/20 text-theme-primary border-theme-primary/50`;
    };

    // 获取类别颜色和样式
    const getCategoryStyle = (category) => {
        const styles = {
            'Full Stack': {
                bg: 'bg-blue-500/10',
                text: 'text-blue-400',
                border: 'border-blue-500/30 hover:border-blue-500/50'
            },
            'Modern Frontend': {
                bg: 'bg-purple-500/10',
                text: 'text-purple-400',
                border: 'border-purple-500/30 hover:border-purple-500/50'
            },
            'Frontend': {
                bg: 'bg-purple-500/10',
                text: 'text-purple-400',
                border: 'border-purple-500/30 hover:border-purple-500/50'
            },
            'Front End': {
                bg: 'bg-purple-500/10',
                text: 'text-purple-400',
                border: 'border-purple-500/30 hover:border-purple-500/50'
            },
            'VR/360°': {
                bg: 'bg-pink-500/10',
                text: 'text-pink-400',
                border: 'border-pink-500/30 hover:border-pink-500/50'
            },
            'WebGL': {
                bg: 'bg-pink-500/10',
                text: 'text-pink-400',
                border: 'border-pink-500/30 hover:border-pink-500/50'
            },
            'Website Development': {
                bg: 'bg-cyan-500/10',
                text: 'text-cyan-400',
                border: 'border-cyan-500/30 hover:border-cyan-500/50'
            },
            'Website': {
                bg: 'bg-cyan-500/10',
                text: 'text-cyan-400',
                border: 'border-cyan-500/30 hover:border-cyan-500/50'
            },
            'Web Development': {
                bg: 'bg-blue-500/10',
                text: 'text-blue-400',
                border: 'border-blue-500/30 hover:border-blue-500/50'
            },
            'Mobile App': {
                bg: 'bg-green-500/10',
                text: 'text-green-400',
                border: 'border-green-500/30 hover:border-green-500/50'
            },
            'Mobile Apps': {
                bg: 'bg-green-500/10',
                text: 'text-green-400',
                border: 'border-green-500/30 hover:border-green-500/50'
            },
            'Data Science': {
                bg: 'bg-orange-500/10',
                text: 'text-orange-400',
                border: 'border-orange-500/30 hover:border-orange-500/50'
            },
            'Data Engineer': {
                bg: 'bg-emerald-500/10',
                text: 'text-emerald-400',
                border: 'border-emerald-500/30 hover:border-emerald-500/50'
            },
            'Activity': {
                bg: 'bg-yellow-500/10',
                text: 'text-yellow-400',
                border: 'border-yellow-500/30 hover:border-yellow-500/50'
            },
            // 中文类型
            '全栈开发': {
                bg: 'bg-blue-500/10',
                text: 'text-blue-400',
                border: 'border-blue-500/30 hover:border-blue-500/50'
            },
            '前端开发': {
                bg: 'bg-purple-500/10',
                text: 'text-purple-400',
                border: 'border-purple-500/30 hover:border-purple-500/50'
            },
            'WebGL开发': {
                bg: 'bg-pink-500/10',
                text: 'text-pink-400',
                border: 'border-pink-500/30 hover:border-pink-500/50'
            },
            '网站开发': {
                bg: 'bg-cyan-500/10',
                text: 'text-cyan-400',
                border: 'border-cyan-500/30 hover:border-cyan-500/50'
            },
            '移动应用': {
                bg: 'bg-green-500/10',
                text: 'text-green-400',
                border: 'border-green-500/30 hover:border-green-500/50'
            },
            '社区活动': {
                bg: 'bg-yellow-500/10',
                text: 'text-yellow-400',
                border: 'border-yellow-500/30 hover:border-yellow-500/50'
            },
            '活动竞赛': {
                bg: 'bg-yellow-500/10',
                text: 'text-yellow-400',
                border: 'border-yellow-500/30 hover:border-yellow-500/50'
            },
            'Other': {
                bg: 'bg-theme-bg-white-10',
                text: 'text-theme-text-white-70',
                border: 'border-theme-text-white-40 hover:border-theme-text-white-60'
            }
        };
        return styles[category] || styles['Other'];
    };

    return (
        <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 text-theme-text-white relative project-section-bg">
            {/* 顶部标题栏 - 左右分布 */}
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 mb-8">
                    {/* 左侧：Projects标题和副标题 */}
                    <div className="flex flex-col text-center lg:text-left">
                        <ThemeTitle level={1} className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-theme-section-title mb-3">
                            {projectText.title}
                        </ThemeTitle>
                        <h2 className="text-xl md:text-2xl text-theme-text-white-70 font-light italic">
                            {projectText.subtitle}
                        </h2>
                    </div>

                    {/* 右侧：Explore Map 按钮 - 恢复原有圆形光晕样式 */}
                    <div className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                        <div 
                            className="flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 border border-theme-primary/30 hover:border-theme-primary/50 transition-all duration-300 hover:scale-105 explore-map-button rounded-full backdrop-blur-sm"
                            onClick={() => setIsMapOpen(true)}
                            title={projectText.exploreMapTooltip}
                        >
                            <div className="text-5xl xl:text-6xl text-theme-primary mb-1 flex items-center justify-center">🗺️</div>
                            <div className="text-xs xl:text-sm text-theme-primary font-medium text-center leading-tight px-2">
                                {projectText.exploreMap}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 标题与内容之间的分隔线 */}
            <GlowDivider className="my-8" width="w-full" />
            
            {/* 全屏内容区域 */}
            <div className="relative z-10 backdrop-protection">
                <div className="max-w-screen-2xl mx-auto">
                    {/* 项目分类过滤区域 */}
                    <div className="mb-12">
                        {/* 分类过滤按钮 - 响应式布局 */}
                        <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center">
                            {/* All 按钮 */}
                            <button
                                className={`category-filter-btn ${activeFilter === 'all' ? 'active' : ''} bg-theme-bg-white-10 text-theme-text-white-90 border-theme-text-white-50 hover:border-theme-text-white-70`}
                                onClick={() => setActiveFilter('all')}
                            >
                                {projectText.filter.all}
                            </button>
                            
                            {/* 各个分类按钮 */}
                            {Object.keys(projectsByCategory).map((category) => {
                                const style = getCategoryStyle(category);
                                return (
                                    <button
                                        key={category}
                                        className={`category-filter-btn ${activeFilter === category ? 'active' : ''} ${style.bg} ${style.text} ${style.border}`}
                                        onClick={() => setActiveFilter(category)}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 项目网格 - 最多4列，保持舒适的卡片尺寸 */}
                    <div className="project-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8 pb-12">
                    {filteredProjects.map((project, idx) => (
                        <div 
                            key={idx} 
                            className="glass-card group cursor-pointer p-6"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* 项目图片 */}
                            <div className="project-image-container">
                                {project.img ? (
                                    Array.isArray(project.img) ? (
                                        <OptimizedImage src={project.img[0]} alt={
                                            project.name 
                                                ? (typeof project.name === 'object' ? project.name[language] || project.name.en : project.name)
                                                : (project.title 
                                                    ? (typeof project.title === 'object' ? project.title[language] || project.title.en : project.title)
                                                    : ''
                                                )
                                        } className="project-image" />
                                    ) : (
                                        <OptimizedImage src={project.img} alt={
                                            project.name 
                                                ? (typeof project.name === 'object' ? project.name[language] || project.name.en : project.name)
                                                : (project.title 
                                                    ? (typeof project.title === 'object' ? project.title[language] || project.title.en : project.title)
                                                    : ''
                                                )
                                        } className="project-image" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl text-theme-text-white-40 bg-gradient-to-br from-slate-600/20 to-slate-800/20">
                                        �
                                    </div>
                                )}
                                {/* GitHub 链接图标 - 右下角 */}
                                {(project.links?.github || (project.link && project.link.includes('github'))) && (
                                    <a
                                        href={project.links?.github || project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-3 right-3 w-8 h-8 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg className="w-4 h-4 text-theme-text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                )}
                                {/* 状态标签 - 左上角 */}
                                <div className="project-category-badge">
                                    {project.tags && Array.isArray(project.tags) 
                                        ? project.tags.join(', ') 
                                        : (project.type 
                                            ? (typeof project.type === 'object' ? project.type[language] || project.type.en : project.type)
                                            : projectText.filter.other
                                        )
                                    }
                                </div>
                                {/* 年份标签 - 右上角 */}
                                <div className={`project-status-badge ${getStatusColor(project.year)}`}>
                                    {project.year || ''}
                                </div>
                            </div>
                            {/* 项目信息 - 简化布局 */}
                            <div className="project-content">
                                {/* 地点信息（优先显示） */}
                                {project.location && (
                                    <div className="project-meta text-theme-text-muted mb-3 flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-current flex-shrink-0" />
                                        <span className="text-sm">{project.location}</span>
                                    </div>
                                )}
                                
                                {/* 项目名称 */}
                                <ThemeTitle level={3} className="project-title leading-snug line-clamp-2">
                                    {project.name 
                                        ? (typeof project.name === 'object' ? project.name[language] || project.name.en : project.name)
                                        : (project.title 
                                            ? (typeof project.title === 'object' ? project.title[language] || project.title.en : project.title)
                                            : ''
                                        )
                                    }
                                </ThemeTitle>
                                
                                {/* 项目统计信息已移除 - 卡片上不显示统计和技术栈信息 */}
                                {/* {project.stats && (
                                    <div className="project-stats mb-3">
                                        <div className="flex flex-wrap gap-4 text-xs text-theme-text-muted">
                                            {project.stats.projects && (
                                                <span>📊 {project.stats.projects} projects</span>
                                            )}
                                            {project.stats.locations && (
                                                <span>📍 {project.stats.locations}</span>
                                            )}
                                            {project.stats.clients && (
                                                <span>🏢 {project.stats.clients}</span>
                                            )}
                                            {project.stats.sectors && (
                                                <span>🏛️ {project.stats.sectors}</span>
                                            )}
                                            {project.stats.pages && (
                                                <span>� {project.stats.pages}</span>
                                            )}
                                            {project.stats.uptime && (
                                                <span>⚡ {project.stats.uptime} uptime</span>
                                            )}
                                        </div>
                                    </div>
                                )} */}
                                
                            </div>
                        </div>
                    ))}
                </div>

                {/* 底部说明 - 全屏宽度 */}
                <div className="text-center py-12 border-t border-theme-border-white-10 bg-black/20 backdrop-blur-sm rounded-xl mt-8">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-theme-text-white-80 text-lg mb-3 font-medium">
                            {projectText.bottomSubtitle}
                        </p>
                        <p className="text-theme-text-white-60 text-base leading-relaxed">
                            {projectText.description}
                        </p>
                    </div>
                </div>
                </div>
            </div>

            {/* 地图模态框 */}
            <ProjectGeoViewer 
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                language={language}
            />
            
            {/* 项目详情弹窗 */}
            <ProjectDetailNew
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

ProjectSection.propTypes = {
    language: PropTypes.string.isRequired
};

export default ProjectSection;
