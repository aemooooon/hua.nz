import { useState } from "react";
import PropTypes from "prop-types";
import { useAppStore } from "../../../store/useAppStore";
import "./EducationSection.css";

const EducationSection = ({ language }) => {
    const { getContent } = useAppStore();
    const content = getContent();
    const educationData = content.education;

    const [hoveredProject, setHoveredProject] = useState(null);

    const mastersDegree = educationData.degrees.find((d) => d.id === "masters");
    const bachelorsDegree = educationData.degrees.find((d) => d.id === "bachelors");

    return (
        <>
            <div className="min-h-screen w-full p-4 sm:p-8 text-white flex items-center justify-center">
                <div className="max-w-7xl mx-auto w-full h-full">
                    {/* 标题部分 - 左对齐 */}
                    <div className="mb-8 text-left">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {educationData.title}
                        </h1>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"></div>
                    </div>

                    {/* 左右对称卡片容器 - 减少高度 */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-[calc(100vh-300px)] max-h-[500px] max-w-7xl mx-auto py-8">
                        {/* 左侧卡片 - Masters */}
                        <div className="flex-1 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm border border-emerald-400/20 rounded-2xl shadow-xl">
                            <div className="p-4 sm:p-6 relative z-10 h-full overflow-y-auto">
                                {/* 学位信息头部 */}
                                <div className="mb-4">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight degree-title">
                                            {mastersDegree.degree.replace(" with Distinction", "")}
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg">
                                                🏆 With Distinction
                                            </span>
                                        </div>
                                    </div>
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
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <span className="w-1.5 h-4 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-2"></span>
                                        {language === "en" ? "Capstone Projects" : "毕业项目"}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {mastersDegree.capstoneProjects.map((project, index) => (
                                            <div
                                                key={index}
                                                className={`flex-1 min-w-[120px] project-thumbnail-card ${
                                                    hoveredProject === "masters-" + index ? "project-hovered" : ""
                                                }`}
                                                onMouseEnter={() => setHoveredProject("masters-" + index)}
                                                onMouseLeave={() => setHoveredProject(null)}
                                            >
                                                <div
                                                    className="relative h-12 rounded-lg overflow-hidden group cursor-pointer project-image-container"
                                                    style={{
                                                        backgroundImage: `url(${project.image})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                >
                                                    {/* 图片覆盖层 */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                                                    {/* 项目名称 - 印在图片上 */}
                                                    <div className="absolute bottom-1 left-2 right-2">
                                                        <h4 className="text-white font-bold text-xs drop-shadow-lg project-title">
                                                            {project.name}
                                                        </h4>
                                                    </div>

                                                    {/* GitHub链接 */}
                                                    <div className="absolute top-1 right-1">
                                                        <a
                                                            href={project.githubUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="github-link-small"
                                                            title="View on GitHub"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    </div>

                                                    {/* Hover详情显示 */}
                                                    <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-2">
                                                        <div className="text-center">
                                                            <p className="text-gray-300 text-xs mb-1 leading-relaxed">
                                                                {project.description}
                                                            </p>
                                                            <div className="flex flex-wrap justify-center gap-1">
                                                                {project.technologies
                                                                    .slice(0, 3)
                                                                    .map((tech, techIdx) => (
                                                                        <span
                                                                            key={techIdx}
                                                                            className="px-1 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded border border-emerald-500/30"
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
                        </div>
                    </div>

                    {/* 右侧卡片 - Bachelors */}
                    <div className="flex-1 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-400/20 rounded-2xl shadow-xl">
                        <div className="p-4 sm:p-6 relative z-10 h-full overflow-y-auto">
                            {/* 学位信息头部 */}
                            <div className="mb-4">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight degree-title">
                                        {bachelorsDegree.degree.replace(" with Distinction", "")}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
                                            🏆 With Distinction
                                        </span>
                                    </div>
                                </div>
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
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <span className="w-1.5 h-4 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full mr-2"></span>
                                    {language === "en" ? "Awards" : "获奖"}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {bachelorsDegree.awards.map((award, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 min-w-[120px] project-thumbnail-card ${
                                                hoveredProject === "award-" + index ? "project-hovered" : ""
                                            }`}
                                            onMouseEnter={() => setHoveredProject("award-" + index)}
                                            onMouseLeave={() => setHoveredProject(null)}
                                        >
                                            <div
                                                className="relative h-12 rounded-lg overflow-hidden group cursor-pointer project-image-container"
                                                style={{
                                                    backgroundImage: `url(${award.image})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            >
                                                {/* 图片覆盖层 */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                                                {/* 奖项标题 - 印在图片上 */}
                                                <div className="absolute bottom-1 left-2 right-2">
                                                    <h4 className="text-white font-bold text-xs drop-shadow-lg">
                                                        {award.year}
                                                    </h4>
                                                </div>

                                                {/* Hover详情显示 */}
                                                <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-2">
                                                    <div className="text-center">
                                                        <p className="text-yellow-300 text-xs font-semibold mb-1">
                                                            {award.title}
                                                        </p>
                                                        <p className="text-gray-400 text-xs">{award.year}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 毕业项目 */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                    <span className="w-1.5 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-2"></span>
                                    {language === "en" ? "Capstone Projects" : "毕业项目"}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {bachelorsDegree.capstoneProjects.map((project, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 min-w-[120px] project-thumbnail-card ${
                                                hoveredProject === "bachelors-" + index ? "project-hovered" : ""
                                            }`}
                                            onMouseEnter={() => setHoveredProject("bachelors-" + index)}
                                            onMouseLeave={() => setHoveredProject(null)}
                                        >
                                            <div
                                                className="relative h-12 rounded-lg overflow-hidden group cursor-pointer project-image-container"
                                                style={{
                                                    backgroundImage: `url(${project.image})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            >
                                                {/* 图片覆盖层 */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                                                {/* 项目名称 - 印在图片上 */}
                                                <div className="absolute bottom-1 left-2 right-2">
                                                    <h4 className="text-white font-bold text-xs drop-shadow-lg project-title">
                                                        {project.name}
                                                    </h4>
                                                </div>

                                                {/* GitHub链接 */}
                                                <div className="absolute top-1 right-1">
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="github-link-small"
                                                        title="View on GitHub"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                    </a>
                                                </div>

                                                {/* Hover详情显示 */}
                                                <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-2">
                                                    <div className="text-center">
                                                        <p className="text-gray-300 text-xs mb-1 leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                        <div className="flex flex-wrap justify-center gap-1">
                                                            {project.technologies.slice(0, 3).map((tech, techIdx) => (
                                                                <span
                                                                    key={techIdx}
                                                                    className="px-1 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
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
                    </div>
                </div>
            </div>
        </>
    );
};

EducationSection.propTypes = {
    language: PropTypes.string.isRequired,
};

export default EducationSection;
