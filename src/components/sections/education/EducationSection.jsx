import { useState } from "react";
import PropTypes from "prop-types";
import { useAppStore } from "../../../store/useAppStore";
import "./EducationSection.css";

const EducationSection = ({ language }) => {
    const { getContent } = useAppStore();
    const [hoveredProject, setHoveredProject] = useState(null);
    
    try {
        const content = getContent();
        const educationData = content.education;

        // 添加安全检查，确保数据存在
        const mastersDegree = educationData?.degrees?.find((d) => d.id === "masters");
        const bachelorsDegree = educationData?.degrees?.find((d) => d.id === "bachelors");

        // 如果缺少必要数据，提前返回
        if (!educationData || !educationData.degrees || !mastersDegree || !bachelorsDegree) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center text-white">
                        <p className="text-xl">Education data loading...</p>
                    </div>
                </div>
            );
        }

    // 学历配置 - 按时间顺序：Masters在前，Bachelors在后
    const degrees = [
        { id: "masters", data: mastersDegree, theme: "emerald" },
        { id: "bachelors", data: bachelorsDegree, theme: "blue" }
    ];

    // 渲染单个教育卡片
    const renderEducationCard = (degreeConfig) => {
        const { data: degree, theme } = degreeConfig;
        
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
            <div key={degree.id} className="w-full mb-12 lg:mb-16">
                {/* 学历标题 */}
                <div className="mb-8 sm:mb-12 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-normal py-1">
                        {degree.degree.replace(" with Distinction", "")}
                    </h2>
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
                        <span className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${colors.badgeGradient} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg`}>
                            🏆 With Distinction
                        </span>
                    </div>
                    <h3 className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl ${colors.accent} font-medium mb-2`}>
                        {degree.institution}
                    </h3>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base flex-wrap">
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
                    {/* Capstone Projects */}
                    <div className={`bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-3xl p-6 sm:p-8 shadow-2xl`}>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
                            <span className={`w-2 h-6 bg-gradient-to-b ${colors.projectGradient} rounded-full mr-3`}></span>
                            {language === "en" ? "Capstone Projects" : "毕业项目"}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {degree.capstoneProjects && Array.isArray(degree.capstoneProjects) && degree.capstoneProjects.map((project, idx) => (
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
                                            <h5 className="text-white font-bold text-sm sm:text-base drop-shadow-lg">
                                                {project.name}
                                            </h5>
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
                                                    {project.technologies && Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, techIdx) => (
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
                    
                    {/* Awards部分 - 仅对bachelor显示 */}
                    {theme === "blue" && degree.awards && degree.awards.length > 0 && (
                        <div className={`bg-gradient-to-br ${colors.gradient} backdrop-blur-sm border ${colors.border} rounded-3xl p-6 sm:p-8 shadow-2xl`}>
                            <h4 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center">
                                <span className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full mr-3"></span>
                                {language === "en" ? "Academic Awards" : "学术奖项"}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {degree.awards && Array.isArray(degree.awards) && degree.awards.map((award, idx) => (
                                    <div
                                        key={idx}
                                        className={`project-thumbnail-card ${
                                            hoveredProject === theme + '-award-' + idx ? "project-hovered" : ""
                                        }`}
                                        onMouseEnter={() => setHoveredProject(theme + '-award-' + idx)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <div
                                            className="relative h-32 sm:h-40 rounded-xl overflow-hidden group cursor-pointer"
                                            style={{
                                                backgroundImage: `url(${award.image})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                            {/* 图片覆盖层 */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                            
                                            {/* 奖项年份标识 */}
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                                                    🏆 {award.year}
                                                </span>
                                            </div>
                                            
                                            {/* 奖项名称 */}
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h5 className="text-white font-bold text-sm sm:text-base drop-shadow-lg">
                                                    {award.title}
                                                </h5>
                                            </div>

                                            {/* Hover详情显示 */}
                                            <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                                                <div className="text-center">
                                                    <div className="text-yellow-300 text-4xl mb-3">🏆</div>
                                                    <h5 className="text-yellow-300 font-bold text-lg mb-2">
                                                        {award.title}
                                                    </h5>
                                                    <p className="text-gray-300 text-sm">
                                                        {award.year}
                                                    </p>
                                                    <div className="mt-3 text-xs text-yellow-200">
                                                        {language === "en" ? "Academic Excellence Award" : "学术优秀奖"}
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
            </div>
        );
    };

    return (
        <div className="relative w-full min-h-screen overflow-auto bg-black/20">
            {/* Education标题 - 左上角，与Gallery保持一致 */}
            <div className="fixed top-6 left-6 z-50">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Education
                </h1>
            </div>

            {/* 学历内容 - 垂直滚动 */}
            <div className="w-full p-4 sm:p-6 lg:p-8 text-white pt-20">
                <div className="max-w-6xl mx-auto">
                    {degrees.map((degree) => renderEducationCard(degree))}
                </div>
            </div>
        </div>
    );
    } catch (error) {
        console.error('Error rendering education section:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-white">
                    <p className="text-xl text-red-400">Error loading education section</p>
                    <p className="text-sm text-gray-400 mt-2">Please refresh the page</p>
                </div>
            </div>
        );
    }
};

EducationSection.propTypes = {
    language: PropTypes.string.isRequired,
};

export default EducationSection;