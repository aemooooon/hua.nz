import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import './EducationSection.css';

const EducationSection = ({ language }) => {
    const { getContent } = useAppStore();
    const content = getContent();
    const educationData = content.education;
    
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);

    const mastersDegree = educationData.degrees.find(d => d.id === 'masters');
    const bachelorsDegree = educationData.degrees.find(d => d.id === 'bachelors');

    return (
        <div className="min-h-screen w-full p-4 sm:p-8 text-white flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full h-full">
                {/* 标题部分 */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {educationData.title}
                    </h1>
                    <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto rounded-full"></div>
                </div>

                {/* 重叠卡片容器 */}
                <div className="relative h-[calc(100vh-200px)] max-h-[700px] max-w-6xl mx-auto">
                    {/* 左侧卡片 - Masters (默认在上层) */}
                    <div 
                        className={`absolute left-0 top-0 w-[60%] h-full education-card-3d masters-card ${
                            hoveredCard === 'masters' ? 'hovered' : ''
                        } ${hoveredCard === 'bachelors' ? 'behind' : ''}`}
                        onMouseEnter={() => setHoveredCard('masters')}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                            zIndex: hoveredCard === 'bachelors' ? 10 : 20 // 默认Masters在上层，除非hover Bachelors
                        }}
                    >
                        <div className="card-inner">
                            <div className="p-6 relative z-10 h-full overflow-hidden">
                                {/* 学位信息头部 */}
                                <div className="mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight degree-title">
                                        {mastersDegree.degree}
                                    </h2>
                                    <div className="space-y-2">
                                        <p className="text-base sm:text-lg text-emerald-300 font-medium">
                                            {mastersDegree.institution}
                                        </p>
                                        <p className="text-sm text-gray-300 flex items-center">
                                            <span className="mr-2 text-emerald-400">📍</span>
                                            {mastersDegree.location}
                                        </p>
                                        <p className="text-sm text-gray-300 flex items-center">
                                            <span className="mr-2 text-emerald-400">📅</span>
                                            {mastersDegree.period}
                                        </p>
                                    </div>
                                </div>

                                {/* 毕业项目 */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                        <span className="w-1.5 h-4 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-2"></span>
                                        {language === 'en' ? 'Capstone Projects' : '毕业项目'}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {mastersDegree.capstoneProjects.map((project, index) => (
                                            <div 
                                                key={index}
                                                className={`project-thumbnail-card ${
                                                    hoveredProject === `masters-${index}` ? 'project-hovered' : ''
                                                }`}
                                                onMouseEnter={() => setHoveredProject(`masters-${index}`)}
                                                onMouseLeave={() => setHoveredProject(null)}
                                            >
                                                <div 
                                                    className="relative h-16 sm:h-20 rounded-lg overflow-hidden group cursor-pointer project-image-container"
                                                    style={{
                                                        backgroundImage: `url(${project.image})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                >
                                                    {/* 图片覆盖层 */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                                                    
                                                    {/* 项目名称 - 印在图片上 */}
                                                    <div className="absolute inset-0 flex items-center justify-start pl-3">
                                                        <h4 className="text-white font-bold text-sm sm:text-base drop-shadow-lg project-title">
                                                            {project.name}
                                                        </h4>
                                                    </div>
                                                    
                                                    {/* GitHub链接 */}
                                                    <div className="absolute top-2 right-2">
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="github-link-small"
                                                            title="View on GitHub"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                            </svg>
                                                        </a>
                                                    </div>

                                                    {/* Hover详情显示 */}
                                                    <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-3">
                                                        <div className="text-center">
                                                            <p className="text-gray-300 text-xs mb-2 leading-relaxed">
                                                                {project.description}
                                                            </p>
                                                            <div className="flex flex-wrap justify-center gap-1">
                                                                {project.technologies.slice(0, 3).map((tech, techIdx) => (
                                                                    <span key={techIdx} className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded border border-emerald-500/30">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧卡片 - Bachelors */}
                    <div 
                        className={`absolute right-0 top-0 w-[60%] h-full education-card-3d bachelors-card ${
                            hoveredCard === 'bachelors' ? 'hovered' : ''
                        } ${hoveredCard === 'masters' ? 'behind' : ''}`}
                        onMouseEnter={() => setHoveredCard('bachelors')}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                            zIndex: hoveredCard === 'bachelors' ? 20 : 10, // 默认在Masters下层
                            transform: 'translateX(-20%)' // 左移20%与Masters重叠
                        }}
                    >
                        <div className="card-inner">
                            <div className="p-6 relative z-10 h-full overflow-hidden">
                                {/* 学位信息头部 */}
                                <div className="mb-6">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight degree-title">
                                        {bachelorsDegree.degree}
                                    </h2>
                                    <div className="space-y-2">
                                        <p className="text-base sm:text-lg text-blue-300 font-medium">
                                            {bachelorsDegree.institution}
                                        </p>
                                        <p className="text-sm text-gray-300 flex items-center">
                                            <span className="mr-2 text-blue-400">📍</span>
                                            {bachelorsDegree.location}
                                        </p>
                                        <p className="text-sm text-gray-300 flex items-center">
                                            <span className="mr-2 text-blue-400">📅</span>
                                            {bachelorsDegree.period}
                                        </p>
                                    </div>
                                </div>

                                {/* 奖项 */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <span className="w-1.5 h-4 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-2"></span>
                                        {language === 'en' ? 'Awards' : '获奖'}
                                    </h3>
                                    <div className="space-y-2">
                                        {bachelorsDegree.awards.map((award, index) => (
                                            <div key={index} className="flex items-center space-x-3 award-item">
                                                <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center award-icon">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <span className="text-yellow-300 font-medium text-sm">
                                                        {award.title}
                                                    </span>
                                                    <span className="text-gray-400 text-xs ml-2">
                                                        ({award.year})
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 毕业项目 */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                        <span className="w-1.5 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-2"></span>
                                        {language === 'en' ? 'Capstone Projects' : '毕业项目'}
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {bachelorsDegree.capstoneProjects.map((project, index) => (
                                            <div 
                                                key={index}
                                                className={`project-thumbnail-card ${
                                                    hoveredProject === `bachelors-${index}` ? 'project-hovered' : ''
                                                }`}
                                                onMouseEnter={() => setHoveredProject(`bachelors-${index}`)}
                                                onMouseLeave={() => setHoveredProject(null)}
                                            >
                                                <div 
                                                    className="relative h-16 sm:h-20 rounded-lg overflow-hidden group cursor-pointer project-image-container"
                                                    style={{
                                                        backgroundImage: `url(${project.image})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                >
                                                    {/* 图片覆盖层 */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                                                    
                                                    {/* 项目名称 - 印在图片上 */}
                                                    <div className="absolute inset-0 flex items-center justify-start pl-3">
                                                        <h4 className="text-white font-bold text-sm sm:text-base drop-shadow-lg project-title">
                                                            {project.name}
                                                        </h4>
                                                    </div>
                                                    
                                                    {/* GitHub链接 */}
                                                    <div className="absolute top-2 right-2">
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="github-link-small"
                                                            title="View on GitHub"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                            </svg>
                                                        </a>
                                                    </div>

                                                    {/* Hover详情显示 */}
                                                    <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-3">
                                                        <div className="text-center">
                                                            <p className="text-gray-300 text-xs mb-2 leading-relaxed">
                                                                {project.description}
                                                            </p>
                                                            <div className="flex flex-wrap justify-center gap-1">
                                                                {project.technologies.slice(0, 3).map((tech, techIdx) => (
                                                                    <span key={techIdx} className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

EducationSection.propTypes = {
    language: PropTypes.string.isRequired
};

export default EducationSection;
