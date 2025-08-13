import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectGeoViewer from './ProjectGeoViewer';
import ProjectDetail from './ProjectDetail';
import GlowDivider from '../../ui/GlowDivider';
import useAppStore from '../../../store/useAppStore';
import { ThemeTitle, ThemeButton } from '../../ui/ThemeComponents';

const ProjectSection = ({ language }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    
    // 从store获取数据和方法
    const { getAllProjects, selectedProject, setSelectedProject, getProjectsText } = useAppStore();

    // 获取当前语言的项目文本
    const projectText = getProjectsText();

    // 获取所有项目数据
    const projects = getAllProjects();

    // 按项目的 type 字段分组
    const projectsByCategory = projects.reduce((acc, project) => {
        const category = project.type || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(project);
        return acc;
    }, {});

    // 获取过滤后的项目
    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projectsByCategory[activeFilter] || [];

    // 状态颜色映射 - 使用主题色
    const getStatusColor = (status) => {
        if (!status) return `bg-theme-muted/20 text-theme-textSecondary border-theme-muted/50`;
        const s = String(status).toLowerCase();
        if (s.includes('完成') || s.includes('2019') || s.includes('2024')) return `bg-theme-success/20 text-theme-success border-theme-success/50`;
        if (s.includes('progress') || s.includes('进行') || s.includes('2020-2021')) return `bg-theme-primary/20 text-theme-primary border-theme-primary/50`;
        if (s.includes('plan') || s.includes('规划') || s.includes('2024-2025')) return `bg-theme-warning/20 text-theme-warning border-theme-warning/50`;
        return `bg-theme-muted/20 text-theme-textSecondary border-theme-muted/50`;
    };

    // 获取类别颜色和样式
    const getCategoryStyle = (category) => {
        const styles = {
            'Full Stack': {
                bg: 'bg-gradient-to-br from-blue-600/20 to-blue-800/20',
                text: 'text-blue-400',
                border: 'border-blue-400/30 hover:border-blue-400/50'
            },
            'Modern Frontend': {
                bg: 'bg-gradient-to-br from-green-600/20 to-green-800/20',
                text: 'text-green-400',
                border: 'border-green-400/30 hover:border-green-400/50'
            },
            'Frontend': {
                bg: 'bg-gradient-to-br from-green-600/20 to-green-800/20',
                text: 'text-green-400',
                border: 'border-green-400/30 hover:border-green-400/50'
            },
            'VR/360°': {
                bg: 'bg-gradient-to-br from-purple-600/20 to-purple-800/20',
                text: 'text-purple-400',
                border: 'border-purple-400/30 hover:border-purple-400/50'
            },
            'Website Development': {
                bg: 'bg-gradient-to-br from-orange-600/20 to-orange-800/20',
                text: 'text-orange-400',
                border: 'border-orange-400/30 hover:border-orange-400/50'
            },
            'Web Development': {
                bg: 'bg-gradient-to-br from-red-600/20 to-red-800/20',
                text: 'text-red-400',
                border: 'border-red-400/30 hover:border-red-400/50'
            },
            'Mobile App': {
                bg: 'bg-gradient-to-br from-cyan-600/20 to-cyan-800/20',
                text: 'text-cyan-400',
                border: 'border-cyan-400/30 hover:border-cyan-400/50'
            },
            'Data Science': {
                bg: 'bg-gradient-to-br from-indigo-600/20 to-indigo-800/20',
                text: 'text-indigo-400',
                border: 'border-indigo-400/30 hover:border-indigo-400/50'
            },
            'activity': {
                bg: 'bg-gradient-to-br from-pink-600/20 to-pink-800/20',
                text: 'text-pink-400',
                border: 'border-pink-400/30 hover:border-pink-400/50'
            },
            'Other': {
                bg: 'bg-gradient-to-br from-gray-600/20 to-gray-800/20',
                text: 'text-gray-400',
                border: 'border-gray-400/30 hover:border-gray-400/50'
            }
        };
        return styles[category] || styles['Other'];
    };

    return (
        <div className="min-h-screen w-full p-8 text-white relative project-section-bg">
            {/* 顶部标题栏 - 左右分布 */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center p-8 pt-12 mb-8">
                {/* 左侧：Projects标题和副标题 */}
                <div className="flex flex-col text-center lg:text-left">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-theme-gradient-from via-theme-gradient-via to-theme-gradient-to bg-clip-text text-transparent mb-3">
                        {projectText.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-white/70 font-light italic">
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
                        <div className="text-3xl xl:text-4xl text-theme-primary mb-1 flex items-center justify-center">🗺️</div>
                        <div className="text-xs xl:text-sm text-theme-primary font-medium text-center leading-tight px-2">
                            {projectText.exploreMap}
                        </div>
                    </div>
                </div>
            </div>

            {/* 标题与内容之间的分隔线 */}
            <GlowDivider className="my-8 px-4 sm:px-6 lg:px-8" width="w-full" />
            
            {/* 全屏内容区域 */}
            <div className="relative z-10 backdrop-protection">
                {/* 项目分类过滤区域 */}
                <div className="px-4 sm:px-6 lg:px-8 mb-12">
                    {/* 分类过滤按钮 - 响应式布局 */}
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center">
                        {/* All 按钮 */}
                        <button
                            className={`category-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            {projectText.filter.allProjects}
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

                {/* 项目网格 - 全屏宽度布局，增加边距避免遮挡cube */}
                <div className="project-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 pb-12 px-4 sm:px-6 lg:px-8">
                    {filteredProjects.map((project, idx) => (
                        <div 
                            key={idx} 
                            className="project-card group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* 项目图片 */}
                            <div className="project-image-container">
                                {project.img ? (
                                    Array.isArray(project.img) ? (
                                        <img src={project.img[0]} alt={project.name || project.title} className="project-image" />
                                    ) : (
                                        <img src={project.img} alt={project.name || project.title} className="project-image" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl text-white/40 bg-gradient-to-br from-slate-600/20 to-slate-800/20">
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
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                )}
                                {/* 状态标签 - 左上角 */}
                                <div className="project-category-badge">
                                    {project.type || 'Other'}
                                </div>
                                {/* 年份标签 - 右上角 */}
                                <div className={`project-status-badge ${getStatusColor(project.year)}`}>
                                    {project.year || ''}
                                </div>
                            </div>
                            {/* 项目信息 */}
                            <div className="project-content">
                                {/* 项目名称 - 预留2行高度，自适应高度 */}
                                <ThemeTitle level={3} className="project-title min-h-12 leading-snug line-clamp-2 mb-2">
                                    {project.name || project.title}
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
                                
                                {/* 地点信息（如有） */}
                                {project.location && (
                                    <div className="project-meta text-theme-text-muted mb-4">
                                        <span>📍 {project.location}</span>
                                    </div>
                                )}
                                
                                {/* 操作按钮 - 重新设计布局 */}
                                {(() => {
                                    const buttons = [];
                                    
                                    // View 按钮（永远存在）
                                    const viewButton = (
                                        <ThemeButton 
                                            key="view"
                                            variant="primary" 
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProject(project);
                                            }}
                                        >
                                            {projectText.viewAction}
                                        </ThemeButton>
                                    );
                                    
                                    // 收集其他链接按钮
                                    const linkButtons = [];
                                    
                                    // Live Demo 按钮
                                    if (project.links?.live) {
                                        linkButtons.push(
                                            <ThemeButton 
                                                key="live"
                                                as="a" 
                                                href={project.links.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {projectText.liveDemo}
                                            </ThemeButton>
                                        );
                                    }
                                    
                                    // Official 按钮
                                    if (project.links?.official) {
                                        linkButtons.push(
                                            <ThemeButton 
                                                key="official"
                                                as="a" 
                                                href={project.links.official}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {projectText.officialSite}
                                            </ThemeButton>
                                        );
                                    }
                                    
                                    // Company 按钮
                                    if (project.links?.company) {
                                        linkButtons.push(
                                            <ThemeButton 
                                                key="company"
                                                as="a" 
                                                href={project.links.company}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {projectText.officialSite}
                                            </ThemeButton>
                                        );
                                    }
                                    
                                    // 兼容旧的 link 字段（但排除github，因为已在图片上显示）
                                    if (project.link && !project.links && !project.link.includes('github')) {
                                        linkButtons.push(
                                            <ThemeButton 
                                                key="link"
                                                as="a" 
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {projectText.liveDemo}
                                            </ThemeButton>
                                        );
                                    }
                                    
                                    // 根据按钮数量决定布局
                                    const totalButtons = 1 + linkButtons.length; // 1个view + N个链接按钮
                                    let justifyClass = '';
                                    
                                    if (totalButtons === 1) {
                                        // 只有view按钮，居右显示
                                        justifyClass = 'justify-end';
                                        buttons.push(viewButton);
                                    } else if (totalButtons === 2) {
                                        // view + 1个链接，左右对称
                                        justifyClass = 'justify-between';
                                        buttons.push(linkButtons[0], viewButton);
                                    } else if (totalButtons === 3) {
                                        // view + 2个链接，左中右均匀分布
                                        justifyClass = 'justify-between';
                                        buttons.push(linkButtons[0], viewButton, linkButtons[1]);
                                    } else {
                                        // 超过3个按钮，均匀分布
                                        justifyClass = 'justify-between';
                                        buttons.push(...linkButtons.slice(0, -1), viewButton, linkButtons[linkButtons.length - 1]);
                                    }
                                    
                                    return (
                                        <div className={`project-actions flex gap-2 mt-4 ${justifyClass}`}>
                                            {buttons}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 底部说明 - 全屏宽度 */}
                <div className="text-center py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm rounded-xl mt-8 mx-4 sm:mx-6 lg:mx-8">
                    <div className="max-w-4xl mx-auto px-4">
                        <p className="text-white/80 text-lg mb-3 font-medium">
                            {projectText.subtitle}
                        </p>
                        <p className="text-white/60 text-base leading-relaxed">
                            {projectText.description}
                        </p>
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
            <ProjectDetail
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
