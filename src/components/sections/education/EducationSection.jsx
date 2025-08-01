import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAppStore } from "../../../store/useAppStore";
import "./EducationSection.css";

const EducationSection = ({ language }) => {
    const { getContent } = useAppStore();
    const content = getContent();
    const educationData = content.education;

    const [hoveredProject, setHoveredProject] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // 当前页面索引
    const [isScrolling, setIsScrolling] = useState(false);

    const mastersDegree = educationData.degrees.find((d) => d.id === "masters");
    const bachelorsDegree = educationData.degrees.find((d) => d.id === "bachelors");

    // 页面配置
    const pages = [
        { id: "masters", data: mastersDegree, theme: "emerald" },
        { id: "bachelors", data: bachelorsDegree, theme: "blue" }
    ];

    const totalPages = pages.length;

    // 滚轮事件处理
    useEffect(() => {
        const handleWheel = (event) => {
            if (isScrolling) return;
            
            event.preventDefault();
            setIsScrolling(true);

            const isScrollingDown = event.deltaY > 0;
            const isScrollingUp = event.deltaY < 0;

            if (isScrollingDown && currentPage < totalPages - 1) {
                setCurrentPage(prev => prev + 1);
            } else if (isScrollingUp && currentPage > 0) {
                setCurrentPage(prev => prev - 1);
            }

            setTimeout(() => setIsScrolling(false), 800);
        };

        const container = document.querySelector('.education-container');
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => container.removeEventListener('wheel', handleWheel);
        }
    }, [currentPage, totalPages, isScrolling]);

    // 键盘事件处理
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isScrolling) return;

            if (event.key === 'ArrowDown' && currentPage < totalPages - 1) {
                setCurrentPage(prev => prev + 1);
            } else if (event.key === 'ArrowUp' && currentPage > 0) {
                setCurrentPage(prev => prev - 1);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, totalPages, isScrolling]);

    // 渲染单个教育页面
    const renderEducationPage = (pageData, index) => {
        const { data: degree, theme } = pageData;
        const isActive = currentPage === index;
        
        const themeConfig = {
            emerald: {
                gradient: "from-emerald-500/10 to-emerald-600/5",
                border: "border-emerald-400/20", 
                accent: "text-emerald-300",
                badgeGradient: "from-emerald-400 to-emerald-600",
                iconColor: "text-emerald-400",
                projectGradient: "from-emerald-400 to-emerald-600",
                techBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
            },
            blue: {
                gradient: "from-blue-500/10 to-blue-600/5",
                border: "border-blue-400/20",
                accent: "text-blue-300", 
                badgeGradient: "from-blue-400 to-blue-600",
                iconColor: "text-blue-400",
                projectGradient: "from-blue-400 to-blue-600",
                techBg: "bg-blue-500/20 text-blue-300 border-blue-500/30"
            }
        };

        const colors = themeConfig[theme];

        return (
            <div 
                key={index}
                className={`absolute inset-0 transition-all duration-800 ease-in-out ${
                    isActive ? 'opacity-100 translate-x-0' : 
                    index < currentPage ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                }`}
            >
                <div className="min-h-screen w-full p-4 sm:p-8 text-white flex items-center justify-center">
                    <div className="max-w-6xl mx-auto w-full">
                        {/* 页面标题 */}
                        <div className="mb-12 text-center mt-16 sm:mt-20">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-normal py-1">
                                {degree.degree.replace(" with Distinction", "")}
                            </h1>
                            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
                                <span className={`px-4 py-2 bg-gradient-to-r ${colors.badgeGradient} text-white text-sm font-semibold rounded-full shadow-lg`}>
                                    🏆 With Distinction
                                </span>
                                {/* Awards badges - only for bachelor's degree */}
                                {theme === "blue" && degree.awards && degree.awards.map((award, idx) => (
                                    <div key={idx} className="relative group">
                                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                            🏆 {award.year}
                                        </span>
                                        {/* Award image tooltip */}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-yellow-400/50 rounded-2xl p-4 shadow-2xl min-w-[220px] backdrop-blur-md">
                                                {/* 内部光晕效果 */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-2xl"></div>
                                                <div className="relative">
                                                    <img 
                                                        src={award.image} 
                                                        alt={award.title}
                                                        className="w-full h-32 object-cover rounded-xl mb-3 border border-yellow-400/20 shadow-lg"
                                                    />
                                                    <p className="text-yellow-300 text-sm font-semibold text-center drop-shadow-sm">
                                                        {award.title}
                                                    </p>
                                                    <p className="text-gray-300 text-xs text-center mt-1">
                                                        {award.year}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-yellow-400/50"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <h2 className={`text-2xl sm:text-3xl ${colors.accent} font-medium mb-2`}>
                                {degree.institution}
                            </h2>
                            <div className="flex items-center justify-center gap-6 text-gray-300">
                                <span className="flex items-center">
                                    <span className={`mr-2 ${colors.iconColor}`}>📍</span>
                                    {degree.location}
                                </span>
                                <span className="flex items-center">
                                    <span className={`mr-2 ${colors.iconColor}`}>📅</span>
                                    {degree.period}
                                </span>
                            </div>
                        </div>

                        {/* 内容区域 */}
                        <div className="grid gap-8 lg:gap-12">
                            {/* 学术成就区域 - Bachelor页面合并显示项目和奖项 */}
                            {theme === "blue" ? (
                                <div className={`bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-3xl p-6 sm:p-8 shadow-2xl`}>
                                    {/* 毕业项目部分 */}
                                    <div className="mb-8">
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
                                            <span className={`w-2 h-6 bg-gradient-to-b ${colors.projectGradient} rounded-full mr-3`}></span>
                                            {language === "en" ? "Capstone Projects" : "毕业项目"}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {degree.capstoneProjects.map((project, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`project-thumbnail-card ${
                                                        hoveredProject === theme + '-project-' + idx ? "project-hovered" : ""
                                                    }`}
                                                    onMouseEnter={() => setHoveredProject(theme + '-project-' + idx)}
                                                    onMouseLeave={() => setHoveredProject(null)}
                                                >
                                                    <div
                                                        className="relative h-32 sm:h-40 rounded-xl overflow-hidden group cursor-pointer project-image-container"
                                                        style={{
                                                            backgroundImage: `url(${project.image})`,
                                                            backgroundSize: "cover",
                                                            backgroundPosition: "center",
                                                        }}
                                                    >
                                                        {/* 图片覆盖层 */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                                        
                                                        {/* 项目名称 */}
                                                        <div className="absolute bottom-3 left-3 right-3">
                                                            <h4 className="text-white font-bold text-sm sm:text-base drop-shadow-lg">
                                                                {project.name}
                                                            </h4>
                                                        </div>
                                                        
                                                        {/* GitHub链接 */}
                                                        <div className="absolute top-3 right-3">
                                                            <a
                                                                href={project.githubUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="github-link-small"
                                                                title="View on GitHub"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                            </a>
                                                        </div>

                                                        {/* Hover详情显示 */}
                                                        <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                                                            <div className="text-center">
                                                                <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                                                    {project.description}
                                                                </p>
                                                                <div className="flex flex-wrap justify-center gap-2">
                                                                    {project.technologies.slice(0, 3).map((tech, techIdx) => (
                                                                        <span
                                                                            key={techIdx}
                                                                            className={`px-2 py-1 ${colors.techBg} text-xs rounded border`}
                                                                        >
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
                            ) : (
                                /* Masters页面 - 只显示项目 */
                                <div className={`bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-3xl p-6 sm:p-8 shadow-2xl`}>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
                                        <span className={`w-2 h-6 bg-gradient-to-b ${colors.projectGradient} rounded-full mr-3`}></span>
                                        {language === "en" ? "Capstone Projects" : "毕业项目"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {degree.capstoneProjects.map((project, idx) => (
                                            <div
                                                key={idx}
                                                className={`project-thumbnail-card ${
                                                    hoveredProject === theme + '-project-' + idx ? "project-hovered" : ""
                                                }`}
                                                onMouseEnter={() => setHoveredProject(theme + '-project-' + idx)}
                                                onMouseLeave={() => setHoveredProject(null)}
                                            >
                                                <div
                                                    className="relative h-32 sm:h-40 rounded-xl overflow-hidden group cursor-pointer project-image-container"
                                                    style={{
                                                        backgroundImage: `url(${project.image})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                >
                                                    {/* 图片覆盖层 */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                                    
                                                    {/* 项目名称 */}
                                                    <div className="absolute bottom-3 left-3 right-3">
                                                        <h4 className="text-white font-bold text-sm sm:text-base drop-shadow-lg">
                                                            {project.name}
                                                        </h4>
                                                    </div>
                                                    
                                                    {/* GitHub链接 */}
                                                    <div className="absolute top-3 right-3">
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="github-link-small"
                                                            title="View on GitHub"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    </div>

                                                    {/* Hover详情显示 */}
                                                    <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                                                        <div className="text-center">
                                                            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                                                                {project.description}
                                                            </p>
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                {project.technologies.slice(0, 3).map((tech, techIdx) => (
                                                                    <span
                                                                        key={techIdx}
                                                                        className={`px-2 py-1 ${colors.techBg} text-xs rounded border`}
                                                                    >
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
                            )}
                        </div>

                        {/* 页面指示器 */}
                        <div className="flex justify-center mt-8 space-x-3">
                            {pages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        idx === currentPage 
                                            ? 'bg-white shadow-lg scale-125' 
                                            : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="education-container relative w-full h-screen overflow-hidden">
            {/* 标题 - 始终显示 */}
            <div className="absolute top-8 left-8 z-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-white bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {educationData.title}
                </h1>
                <div className="w-20 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full mt-2"></div>
            </div>

            {/* 页面内容 */}
            {pages.map((page, index) => renderEducationPage(page, index))}
        </div>
    );
};

EducationSection.propTypes = {
    language: PropTypes.string.isRequired,
};

export default EducationSection;
