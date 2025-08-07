import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectMapModal from './ProjectMapModal';
import ProjectModal from './ProjectModal';
import GlowDivider from '../../ui/GlowDivider';
import useAppStore from '../../../store/useAppStore';
import { ThemeTitle, ThemeSubtitle, ThemeButton } from '../../ui/ThemeComponents';

const ProjectSection = ({ language }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    
    // 从store获取数据和方法
    const { getAllProjects, selectedProject, setSelectedProject } = useAppStore();

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
                        Projects
                    </h1>
                    <h2 className="text-xl md:text-2xl text-white/70 font-light italic">
                        {language === 'en' ? 'showcases' : '作品展示'}
                    </h2>
                </div>

                {/* 右侧：Explore Map 按钮 - 与标题同一高度 */}
                <div className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                    <div 
                        className="flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 explore-map-button rounded-full backdrop-blur-sm"
                        onClick={() => setIsMapOpen(true)}
                        title={language === 'en' ? 'Explore Projects on Interactive Map' : '在交互地图上探索项目'}
                    >
                        <div className="text-3xl xl:text-4xl text-purple-400 mb-1 flex items-center justify-center">🗺️</div>
                        <div className="text-xs xl:text-sm text-purple-400 font-medium text-center leading-tight px-2">
                            {language === 'en' ? 'Map View' : '地图'}
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
                            {language === 'en' ? 'All Projects' : '全部项目'}
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
                                {/* 状态标签 */}
                                <div className={`project-status-badge ${getStatusColor(project.year)}`}>
                                    {project.year || ''}
                                </div>
                                {/* 分类标签 */}
                                <div className="project-category-badge">
                                    {project.type || 'Other'}
                                </div>
                            </div>
                            {/* 项目信息 */}
                            <div className="project-content">
                                <ThemeTitle level={3} className="project-title">
                                    {project.name || project.title}
                                </ThemeTitle>
                                <ThemeSubtitle className="project-description">
                                    {project.description}
                                </ThemeSubtitle>
                                {/* 技术栈（如有） */}
                                {project.tech && Array.isArray(project.tech) && (
                                    <div className="project-tech-stack">
                                        {project.tech.map((tech, index) => (
                                            <span key={index} className="tech-badge bg-theme-surface text-theme-primary border border-theme-border">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {/* 项目统计信息（如有） */}
                                {project.stats && (
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
                                        </div>
                                    </div>
                                )}
                                {/* 其他字段展示（如地点、年份、链接） */}
                                <div className="project-meta text-theme-text-muted">
                                    {project.location && <span>📍 {project.location}</span>}
                                    {project.year && <span>📅 {project.year}</span>}
                                    {project.link && (
                                        <ThemeButton
                                            as="a"
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="ghost"
                                            size="sm"
                                            className="project-link"
                                        >
                                            {language === 'en' ? 'Learn more' : '了解更多'}
                                        </ThemeButton>
                                    )}
                                </div>
                                {/* 操作按钮 */}
                                <div className="project-actions flex gap-2 mt-4">
                                    <ThemeButton 
                                        variant="primary" 
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(project);
                                        }}
                                    >
                                        {language === 'en' ? 'View Details' : '查看详情'}
                                    </ThemeButton>
                                    {project.link && (
                                        <ThemeButton 
                                            as="a" 
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {language === 'en' ? 'Live Demo' : '在线演示'}
                                        </ThemeButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 底部说明 - 全屏宽度 */}
                <div className="text-center py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm rounded-xl mt-8 mx-4 sm:mx-6 lg:mx-8">
                    <div className="max-w-4xl mx-auto px-4">
                        <p className="text-white/80 text-lg mb-3 font-medium">
                            {language === 'en' 
                                ? 'Each project represents a unique challenge and learning journey' 
                                : '每个项目都代表着独特的挑战和学习之旅'
                            }
                        </p>
                        <p className="text-white/60 text-base leading-relaxed">
                            {language === 'en' 
                                ? 'From Full Stack Web Development to 3D immersive experiences, from computer science to data science, to computer graphics — explore the diverse technology and solutions. Language-agnostic, platform-independent, framework-flexible.' 
                                : '从全栈Web开发到3D沉浸式体验，从计算机科学到数据科学，到计算机图形学——探索多样的技术与解决方案。语言无关，平台独立，框架灵活。'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* 地图模态框 */}
            <ProjectMapModal 
                isOpen={isMapOpen} 
                onClose={() => setIsMapOpen(false)} 
                language={language}
            />

            {/* 项目详情弹窗 */}
            <ProjectModal
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
