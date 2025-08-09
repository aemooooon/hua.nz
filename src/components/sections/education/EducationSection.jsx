import { useState } from "react";
import PropTypes from "prop-types";
import { useAppStore } from "../../../store/useAppStore";
import { ThemeTitle, ThemeSubtitle } from "../../ui/ThemeComponents";
import GlowDivider from "../../ui/GlowDivider";
import "./EducationSection.css";

const EducationSection = ({ language }) => {
    const { getContent } = useAppStore();
    const [hoveredProject, setHoveredProject] = useState(null);

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
        { id: "bachelors", data: bachelorsDegree, theme: "blue" },
    ];

    // 渲染单个教育卡片
    const renderEducationCard = (degreeConfig) => {
        const { data: degree, theme } = degreeConfig;

        const themeConfig = {
            emerald: {
                gradient: "from-emerald-500/10 to-emerald-600/5",
                border: "border-emerald-400/30",
                accent: "text-emerald-300",
                badgeGradient: "from-emerald-400 to-emerald-600",
                iconColor: "text-emerald-400",
                projectGradient: "from-emerald-400 to-emerald-600",
                techBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                cardBg: "bg-theme-surface/30",
                cardBorder: "border-theme-border/30",
            },
            blue: {
                gradient: "from-blue-500/10 to-blue-600/5",
                border: "border-blue-400/30",
                accent: "text-blue-300",
                badgeGradient: "from-blue-400 to-blue-600",
                iconColor: "text-blue-400",
                projectGradient: "from-blue-400 to-blue-600",
                techBg: "bg-theme-primary/20 text-theme-primary border-theme-primary/30",
                cardBg: "bg-theme-surface/30",
                cardBorder: "border-theme-border/30",
            },
        };

        const colors = themeConfig[theme];

        return (
            <div key={degree.id} className="w-full mb-16 lg:mb-20">
                {/* 大的透明玻璃卡片容器 - 创建切口效果 */}
                <div className="relative mt-10">
                    {/* 标题区域 - 骑在边框上 */}
                    <div
                        className="
                                    -top-3 left-4 right-4 sm:-top-6 sm:left-8 sm:right-8 z-20
                                    flex flex-col items-center justify-center gap-1
                                    sm:absolute sm:flex-row sm:items-center sm:justify-between sm:gap-6
                                "
                    >
                        {/* 左边：学历名称 */}
                        <div className="flex-1">
                            <h3
                                className="
                                        text-center sm:text-left
                                        text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold
                                        bg-gradient-to-r from-theme-gradient-from via-theme-gradient-via to-theme-gradient-to
                                        bg-clip-text text-transparent leading-normal py-2 px-2
                                    "
                            >
                                {degree.degree}
                            </h3>
                        </div>

                        {/* 右边：徽章 */}
                        {degree.degreeHonor && (
                        <div className="mt-1 sm:mt-0 sm:ml-6">
                            <span
                                className={`
                                        inline-flex items-center gap-1
                                        px-2 py-1 sm:px-3 sm:py-2
                                        bg-gradient-to-r ${colors.badgeGradient}
                                        text-white text-xs sm:text-sm font-bold
                                        rounded-lg sm:rounded-xl
                                        shadow-lg shadow-black/30
                                        backdrop-blur-sm
                                        transform hover:scale-105 transition-transform duration-200
                                    `}
                            >
                                <span className="text-yellow-300">🏆</span>
                                <span>{educationData.labels.withDistinction}</span>
                            </span>
                        </div>
                        )}
                    </div>

                    {/* 卡片主体 - 简单的边框中断效果 */}
                    <div className="relative">
                        {/* 自定义顶部边框 - 只在左端显示一小段 */}
                        <div className="absolute top-0 left-0 right-0 h-px z-10">
                            {/* 只在左边显示一小段边框 */}
                            <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-cyan-400 to-transparent"></div>
                        </div>

                        <div
                            className={`relative ${colors.cardBg} backdrop-blur-lg shadow-2xl shadow-black/20 rounded-3xl overflow-hidden`}
                            style={{
                                border: `1px solid var(--theme-border)`,
                                borderTop: "none", // 移除顶部边框，用自定义边框替代
                            }}
                        >
                            {/* 卡片内容区域 */}
                            <div className="pt-12 px-8 sm:px-10 pb-6 sm:pb-8">
                                {/* 学校信息 - 左右布局 */}
                                <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                                    {/* 左边：大学名称 */}
                                    <h4 className="text-lg sm:text-xl lg:text-2xl text-theme-accent font-medium transition-colors duration-300">
                                        {degree.institution}
                                    </h4>

                                    {/* 右边：地址和时间 */}
                                    <div className="flex items-center gap-6 text-theme-text-secondary text-sm sm:text-base flex-wrap transition-colors duration-300">
                                        <span className="flex items-center">
                                            <span className="mr-2 text-theme-primary">📍</span>
                                            {degree.location}
                                        </span>
                                        <span className="flex items-center">
                                            <span className="mr-2 text-theme-primary">📅</span>
                                            {degree.period}
                                        </span>
                                    </div>
                                </div>

                                {/* 学校信息和项目之间的分割线 */}
                                <div className="flex justify-center my-8">
                                    <GlowDivider className="w-full" />
                                </div>

                                {/* Course Records */}
                                {degree.courses && degree.courses.length > 0 && (
                                    <div className="mb-10">
                                        <h4
                                            className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-theme-text-primary"
                                        >
                                            <span
                                                className={`w-2 h-6 bg-gradient-to-b ${colors.projectGradient} rounded-full mr-3`}
                                            ></span>
                                            {educationData.labels.academicRecords}
                                        </h4>

                                        {/* 总体统计 */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                            <div className="bg-theme-surface/60 backdrop-blur-md rounded-xl p-4 text-center shadow-lg">
                                                <div className="text-2xl font-bold text-theme-text-primary">
                                                    {degree.totalCredits}
                                                </div>
                                                <div className="text-sm text-theme-text-secondary">
                                                    {educationData.labels.totalCredits}
                                                </div>
                                            </div>
                                            <div className="bg-theme-surface/60 backdrop-blur-md rounded-xl p-4 text-center shadow-lg">
                                                <div className="text-2xl font-bold text-theme-text-primary">{degree.gpa}</div>
                                                <div className="text-sm text-theme-text-secondary">
                                                    {educationData.labels.gpa}
                                                </div>
                                            </div>
                                            <div className="bg-theme-surface/60 backdrop-blur-md rounded-xl p-4 text-center shadow-lg col-span-2 md:col-span-1">
                                                <div className="text-2xl font-bold text-theme-text-primary">
                                                    {degree.courses.reduce(
                                                        (total, semester) => total + semester.courses.length,
                                                        0
                                                    )}
                                                </div>
                                                <div className="text-sm text-theme-text-secondary">
                                                    {educationData.labels.totalCourses}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 课程记录 */}
                                        <div className="space-y-6">
                                            {degree.courses.map((semester, semesterIdx) => (
                                                <div
                                                    key={semesterIdx}
                                                    className="bg-theme-surface/50 backdrop-blur-md rounded-xl p-6 shadow-lg"
                                                >
                                                    <h5 className="text-lg font-bold mb-4 flex items-center text-theme-text-primary">
                                                        <span className="text-2xl mr-2">📚</span>
                                                        {semester.year} - {semester.semester}
                                                    </h5>
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                                        {semester.courses.map((course, courseIdx) => (
                                                            <div
                                                                key={courseIdx}
                                                                className="flex items-center justify-between bg-gradient-to-r from-theme-surface/35 via-theme-primary/18 to-theme-accent/22 backdrop-blur-sm rounded-lg p-3 hover:from-theme-primary/15 hover:via-theme-surface/35 hover:to-theme-accent/20 hover:shadow-md transition-all duration-200 border border-white/10"
                                                            >
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-sm leading-tight text-theme-text-primary">
                                                                        {course.code} - {course.name}
                                                                    </div>
                                                                    <div className="text-xs mt-1 text-theme-text-secondary">
                                                                        {language === "en"
                                                                            ? `${educationData.labels.level} ${course.level} • ${course.credits} ${educationData.labels.credits}`
                                                                            : `${educationData.labels.level} ${course.level} • ${course.credits} ${educationData.labels.credits}`}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`
                                                                        text-sm ml-3 font-audiowide
                                                                        ${
                                                                            course.grade === "A+"
                                                                                ? "text-emerald-300"
                                                                                : course.grade === "A"
                                                                                ? "text-green-300"
                                                                                : course.grade === "A-"
                                                                                ? "text-lime-300"
                                                                                : course.grade === "B+"
                                                                                ? "text-yellow-300"
                                                                                : course.grade === "Passed" || course.grade === "通过"
                                                                                ? "text-blue-300"
                                                                                : "text-gray-300"
                                                                        }
                                                                    `}
                                                                >
                                                                    {course.grade}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Capstone Projects */}
                                <div className="mb-10">
                                    <h4 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-6 flex items-center">
                                        <span
                                            className={`w-2 h-6 bg-gradient-to-b ${colors.projectGradient} rounded-full mr-3`}
                                        ></span>
                                        {educationData.labels.capstoneProjects}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                        {degree.capstoneProjects &&
                                            Array.isArray(degree.capstoneProjects) &&
                                            degree.capstoneProjects.map((project, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`project-thumbnail-card ${
                                                        hoveredProject === theme + "-project-" + idx
                                                            ? "project-hovered"
                                                            : ""
                                                    }`}
                                                    onMouseEnter={() => setHoveredProject(theme + "-project-" + idx)}
                                                    onMouseLeave={() => setHoveredProject(null)}
                                                >
                                                    <div
                                                        className="relative h-48 sm:h-48 md:h-40 lg:h-36 xl:h-40 rounded-xl overflow-hidden group cursor-pointer project-image-container"
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
                                                                <svg
                                                                    className="w-5 h-5"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                            </a>
                                                        </div>

                                                        {/* Hover详情显示 */}
                                                        <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                                                            <div className="text-center">
                                                                <p className="text-theme-text-secondary text-sm mb-3 leading-relaxed">
                                                                    {project.description}
                                                                </p>
                                                                <div className="flex flex-wrap justify-center gap-2">
                                                                    {project.technologies &&
                                                                        Array.isArray(project.technologies) &&
                                                                        project.technologies
                                                                            .slice(0, 3)
                                                                            .map((tech, techIdx) => (
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

                                {/* Awards部分 - 仅对bachelor显示，不使用单独卡片 */}
                                {theme === "blue" && degree.awards && degree.awards.length > 0 && (
                                    <div>
                                        <h4 className="text-xl sm:text-2xl font-bold text-theme-text-primary mb-6 flex items-center">
                                            <span className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full mr-3"></span>
                                            {educationData.labels.academicAwards}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {degree.awards &&
                                                Array.isArray(degree.awards) &&
                                                degree.awards.map((award, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`project-thumbnail-card ${
                                                            hoveredProject === theme + "-award-" + idx
                                                                ? "project-hovered"
                                                                : ""
                                                        }`}
                                                        onMouseEnter={() => setHoveredProject(theme + "-award-" + idx)}
                                                        onMouseLeave={() => setHoveredProject(null)}
                                                    >
                                                        <div
                                                            className="relative h-48 sm:h-48 rounded-xl overflow-hidden group cursor-pointer"
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
                                                                    <div className="text-yellow-300 text-4xl mb-3">
                                                                        🏆
                                                                    </div>
                                                                    <h5 className="text-yellow-300 font-bold text-lg mb-2">
                                                                        {award.title}
                                                                    </h5>
                                                                    <p className="text-theme-text-secondary text-sm">
                                                                        {award.year}
                                                                    </p>
                                                                    <div className="mt-3 text-xs text-yellow-200">
                                                                        {educationData.labels.academicExcellenceAward}
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
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full min-h-screen overflow-auto bg-theme-background/20">
            {/* Education标题 - 居中显示，使用主题化组件 */}
            <div className="flex flex-col p-8 pt-12">
                <div className="flex flex-col items-center text-center">
                    <ThemeTitle
                        level={1}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-theme-gradient-from via-theme-gradient-via to-theme-gradient-to bg-clip-text text-transparent mb-3"
                    >
                        {educationData.title}
                    </ThemeTitle>
                    <ThemeSubtitle className="text-xl md:text-2xl font-light italic">
                        {educationData.subtitle}
                    </ThemeSubtitle>
                </div>
            </div>

            {/* 标题与内容之间的分隔线 - 使用白色透明并有光往两边延伸 */}
            <div className="flex justify-center my-8">
                <GlowDivider className="w-full max-w-6xl" />
            </div>

            {/* 学历内容 - 垂直滚动，使用主题化文本颜色 */}
            <div className="w-full p-4 sm:p-6 lg:p-8 text-theme-text-primary pt-0">
                <div className="max-w-6xl mx-auto">
                    {degrees.map((degree) => (
                        <div key={degree.id}>{renderEducationCard(degree)}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

EducationSection.propTypes = {
    language: PropTypes.string.isRequired,
};

export default EducationSection;
