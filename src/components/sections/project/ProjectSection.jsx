import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectMapModal from './ProjectMapModal';
import locations from '../../../store/locations';

const ProjectSection = ({ language }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    // 用 locations 数据源替换硬编码项目
    const projects = locations.locations.filter(loc => loc.type === 'project');

    // 根据项目特征进行智能分组
    const getProjectCategory = (project) => {
        const title = (project.title && project.title[language]) || project.title || '';
        const description = (project.description && project.description[language]) || project.description || '';
        const name = (project.name && project.name[language]) || project.name || '';
        
        // 合并所有文本进行关键词匹配
        const allText = `${title} ${description} ${name}`.toLowerCase();
        
        if (allText.includes('360°') || allText.includes('virtual tour') || allText.includes('虚拟漫游')) {
            return 'VR/360°';
        }
        if (allText.includes('data') || allText.includes('pipeline') || allText.includes('数据') || allText.includes('aqi')) {
            return 'Data Science';
        }
        if (allText.includes('mobile') || allText.includes('app') || allText.includes('移动') || allText.includes('应用')) {
            return 'Mobile App';
        }
        if (allText.includes('web') || allText.includes('website') || allText.includes('网站') || allText.includes('platform')) {
            return 'Web Platform';
        }
        return 'Other';
    };

    // 按类别分组项目
    const projectsByCategory = projects.reduce((acc, project) => {
        const category = getProjectCategory(project);
        if (!acc[category]) acc[category] = [];
        acc[category].push(project);
        return acc;
    }, {});

    // 获取过滤后的项目
    const filteredProjects = activeFilter === 'all' 
        ? projects 
        : projectsByCategory[activeFilter] || [];

    // 状态颜色映射
    const getStatusColor = (status) => {
        if (!status) return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        const s = String(status).toLowerCase();
        if (s.includes('完成') || s.includes('2019') || s.includes('2024')) return 'bg-green-500/20 text-green-400 border-green-500/50';
        if (s.includes('progress') || s.includes('进行') || s.includes('2020-2021')) return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
        if (s.includes('plan') || s.includes('规划') || s.includes('2024-2025')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    };

    // 获取类别颜色
    const getCategoryColor = (category) => {
        const colors = {
            'VR/360°': 'from-purple-600/20 to-purple-800/20 text-purple-400',
            'Data Science': 'from-blue-600/20 to-blue-800/20 text-blue-400',
            'Mobile App': 'from-green-600/20 to-green-800/20 text-green-400',
            'Web Platform': 'from-orange-600/20 to-orange-800/20 text-orange-400',
            'Other': 'from-gray-600/20 to-gray-800/20 text-gray-400'
        };
        return colors[category] || colors['Other'];
    };

    return (
        <div className="min-h-screen w-full p-8 text-white relative project-section-bg">
            {/* 顶部标题栏 - 左右对称布局 */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pt-4 gap-4 sm:gap-0">
                {/* 左侧：Projects标题和副标题 */}
                <div className="flex flex-col">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                        Projects
                    </h1>
                    <h2 className="text-lg md:text-xl text-white/70 font-light italic pl-1 project-subtitle">
                        {language === 'en' ? 'showcases' : '作品展示'}
                    </h2>
                </div>

                {/* 右侧：地图探索按钮 */}
                <div className="flex items-center self-start sm:self-center">
                    <button
                        onClick={() => setIsMapOpen(true)}
                        className="map-view-button group"
                        title={language === 'en' ? 'Explore Projects on Interactive Map' : '在交互地图上探索项目'}
                    >
                        <svg className="map-view-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                        </svg>
                        <span>
                            {language === 'en' ? '🗺️ Explore Map' : '🗺️ 探索地图'}
                        </span>
                    </button>
                </div>
            </div>
            
            {/* 全屏内容区域 - 与顶部标题栏保持一致的全屏布局 */}
            <div className="relative z-10 backdrop-protection">
                {/* 动态项目统计卡片 - 全屏宽度 */}
                <div className="stats-grid px-4 sm:px-6 lg:px-8">
                    <div 
                        className={`stat-card cursor-pointer ${activeFilter === 'all' ? 'ring-2 ring-white/30' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        <span className="stat-number text-blue-400">{projects.length}</span>
                        <span className="stat-label">{language === 'en' ? 'Total Projects' : '总项目数'}</span>
                    </div>
                    
                    {Object.entries(projectsByCategory).map(([category, categoryProjects]) => (
                        <div 
                            key={category}
                            className={`stat-card cursor-pointer ${activeFilter === category ? 'ring-2 ring-white/30' : ''}`}
                            onClick={() => setActiveFilter(category)}
                        >
                            <span className={`stat-number ${getCategoryColor(category).split(' ')[2]}`}>
                                {categoryProjects.length}
                            </span>
                            <span className="stat-label">{category}</span>
                        </div>
                    ))}
                </div>

                {/* 当前筛选指示器 */}
                {activeFilter !== 'all' && (
                    <div className="mb-6 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20">
                            <span className="text-sm font-medium">
                                {language === 'en' ? `Showing: ${activeFilter}` : `显示: ${activeFilter}`}
                            </span>
                            <button 
                                onClick={() => setActiveFilter('all')}
                                className="ml-3 text-white/60 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
                
                {/* 项目网格 - 全屏宽度布局，增加边距避免遮挡cube */}
                <div className="project-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 pb-12 px-4 sm:px-6 lg:px-8">
                    {filteredProjects.map((project, idx) => (
                        <div key={idx} className="project-card group">
                            {/* 项目图片 */}
                            <div className="project-image-container">
                                {project.img ? (
                                    Array.isArray(project.img) ? (
                                        <img src={project.img[0]} alt={(project.name && project.name[language]) || project.name || (project.title && project.title[language]) || project.title} className="project-image" />
                                    ) : (
                                        <img src={project.img} alt={(project.name && project.name[language]) || project.name || (project.title && project.title[language]) || project.title} className="project-image" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl">🚀</div>
                                )}
                                {/* 状态标签 */}
                                <div className={`project-status-badge ${getStatusColor(project.year)}`}>
                                    {project.year || ''}
                                </div>
                                {/* 分类标签 */}
                                <div className="project-category-badge">
                                    {getProjectCategory(project)}
                                </div>
                            </div>
                            {/* 项目信息 */}
                            <div className="project-content">
                                <h3 className="project-title">
                                    {(project.title && project.title[language]) || (project.name && project.name[language]) || project.title || project.name}
                                </h3>
                                <p className="project-description">
                                    {(project.description && project.description[language]) || project.description}
                                </p>
                                {/* 技术栈（如有） */}
                                {project.tech && Array.isArray(project.tech) && (
                                    <div className="project-tech-stack">
                                        {project.tech.map((tech, index) => (
                                            <span key={index} className="tech-badge">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {/* 其他字段展示（如地点、年份、链接） */}
                                <div className="project-meta">
                                    {project.location && <span>📍 {(project.location && project.location[language]) || project.location}</span>}
                                    {project.year && <span>📅 {project.year}</span>}
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                            {language === 'en' ? 'Learn more' : '了解更多'}
                                        </a>
                                    )}
                                </div>
                                {/* 操作按钮（可自定义） */}
                                <div className="project-actions">
                                    <button className="btn-primary">
                                        {language === 'en' ? 'View Details' : '查看详情'}
                                    </button>
                                    <button className="btn-secondary">
                                        {language === 'en' ? 'Live Demo' : '在线演示'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 底部说明 - 全屏宽度 */}
                <div className="text-center py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm rounded-xl mt-8 mx-4 sm:mx-6 lg:mx-8">
                    <div className="max-w-2xl mx-auto px-4">
                        <p className="text-white/80 text-lg mb-3 font-medium">
                            {language === 'en' 
                                ? '✨ Explore different categories by clicking the cards above!' 
                                : '✨ 点击上方分类卡片探索不同类别的项目！'
                            }
                        </p>
                        <p className="text-white/60 text-sm">
                            {language === 'en' 
                                ? 'Watch the real-time scroll progress indicator on the right →' 
                                : '观察右侧的实时滚动进度指示器 →'
                            }
                        </p>
                        <div className="mt-6 flex justify-center">
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-white/20">
                                <span className="text-sm text-white/70">
                                    {language === 'en' 
                                        ? `${filteredProjects.length} projects displayed` 
                                        : `显示 ${filteredProjects.length} 个项目`
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 地图模态框 */}
            <ProjectMapModal 
                isOpen={isMapOpen} 
                onClose={() => setIsMapOpen(false)} 
                language={language}
            />
        </div>
    );
};

ProjectSection.propTypes = {
    language: PropTypes.string.isRequired
};

export default ProjectSection;
