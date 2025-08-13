import { useState } from "react";
import PropTypes from "prop-types";
import { useAppStore } from "../../../store/useAppStore";
import { ThemeTitle, ThemeSubtitle } from "../../ui/ThemeComponents";
import GlowDivider from "../../ui/GlowDivider";
import "./EducationSection.css";

// 图标组件
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

const EducationSection = ({ language }) => {
    const { getContent } = useAppStore();
    const [hoveredProject, setHoveredProject] = useState(null);

    const content = getContent();
    const educationData = content.education;

    // 获取成绩颜色的函数
    const getGradeColor = (grade) => {
        if (grade === "A+") return "text-theme-primary";
        if (grade === "A") return "text-theme-secondary";
        if (grade === "A-") return "text-theme-accent";
        if (grade === "B+") return "text-theme-text-white-90";
        if (grade === "Passed" || grade === "通过") return "text-theme-primary";
        return "text-theme-text-white-60";
    };

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

        return (
            <div key={degree.id} className="w-full mb-16 lg:mb-20">
                {/* 简化的卡片容器 */}
                <div className="relative bg-theme-bg-white-5 border border-theme-border-white-10 rounded-2xl p-8 hover:bg-theme-bg-white-10 hover:border-theme-border-white-20 transition-all duration-300">
                    
                    {/* 学位信息和学校信息 - 统一在顶部 */}
                    <div className="space-y-6 mb-8">
                        {/* 大屏幕：左右分布 - 学位+学校信息居左，logo居右 */}
                        <div className="hidden lg:flex items-start justify-between gap-12">
                            {/* 左边：学位名称 + 学校信息 */}
                            <div className="flex-1 space-y-4">
                                {/* 学位名称 + 荣誉徽章 */}
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                    <ThemeTitle level={3} className="text-2xl xl:text-3xl text-theme-section-title font-bold leading-tight">
                                        {degree.degree}
                                    </ThemeTitle>
                                    {degree.degreeHonor && (
                                        <span className="inline-flex items-center gap-2 px-3 py-2 text-theme-primary text-sm font-bold rounded-xl bg-theme-bg-white-10 border border-theme-border-white-20">
                                            <span className="text-theme-primary">🏆</span>
                                            <span>{educationData.labels.withDistinction}</span>
                                        </span>
                                    )}
                                </div>
                                
                                {/* 学校信息 - 三行 */}
                                <div className="space-y-3">
                                    <div>
                                        <ThemeTitle level={4} className="text-xl xl:text-2xl text-theme-text-white-90 font-semibold leading-tight">
                                            {degree.institution}
                                        </ThemeTitle>
                                    </div>
                                    <div className="flex items-center text-theme-text-white-70 text-base xl:text-lg">
                                        <MapPin className="w-5 h-5 xl:w-6 xl:h-6 mr-3 text-theme-primary flex-shrink-0" />
                                        <span>{degree.location}</span>
                                    </div>
                                    <div className="flex items-center text-theme-text-white-70 text-base xl:text-lg">
                                        <Calendar className="w-5 h-5 xl:w-6 xl:h-6 mr-3 text-theme-primary flex-shrink-0" />
                                        <span>{degree.period}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 右边：大学标志 - 放大尺寸 */}
                            <div className="flex-shrink-0">
                                <img 
                                    src={degree.logo}
                                    alt={`${degree.institution} Logo`}
                                    className="w-32 h-32 xl:w-40 xl:h-40 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    style={degree.logo.includes('University-of-Canterbury') ? { transform: 'scale(2)' } : {}}
                                />
                            </div>
                        </div>

                        {/* 窄屏幕：上下分布 */}
                        <div className="lg:hidden space-y-6">
                            {/* 学位名称 + 荣誉徽章 */}
                            <div className="text-center space-y-4">
                                <ThemeTitle level={3} className="text-xl sm:text-2xl text-theme-section-title font-bold leading-tight">
                                    {degree.degree}
                                </ThemeTitle>
                                {degree.degreeHonor && (
                                    <div className="flex justify-center">
                                        <span className="inline-flex items-center gap-2 px-3 py-2 text-theme-primary text-sm font-bold rounded-xl bg-theme-bg-white-10 border border-theme-border-white-20">
                                            <span className="text-theme-primary">🏆</span>
                                            <span>{educationData.labels.withDistinction}</span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* 大学标志 */}
                            <div className="flex justify-center">
                                <img 
                                    src={degree.logo}
                                    alt={`${degree.institution} Logo`}
                                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    style={degree.logo.includes('University-of-Canterbury') ? { transform: 'scale(2)' } : {}}
                                />
                            </div>

                            {/* 学校信息 - 三行 */}
                            <div className="space-y-3 text-center sm:text-left">
                                <div>
                                    <ThemeTitle level={4} className="text-lg sm:text-xl text-theme-text-white-90 font-semibold leading-tight">
                                        {degree.institution}
                                    </ThemeTitle>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start text-theme-text-white-70 text-sm sm:text-base">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-theme-primary flex-shrink-0" />
                                    <span>{degree.location}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start text-theme-text-white-70 text-sm sm:text-base">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-theme-primary flex-shrink-0" />
                                    <span>{degree.period}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Records */}
                    {degree.courses && degree.courses.length > 0 && (
                        <div className="mb-10">
                            <ThemeTitle level={4} className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-theme-text-white-90">
                                <span className="w-2 h-6 bg-theme-primary rounded-full mr-3"></span>
                                {educationData.labels.academicRecords}
                            </ThemeTitle>
                            
                            {/* 总体统计 */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-theme-bg-white-20 backdrop-blur-md rounded-xl p-4 text-center shadow-lg">
                                    <div className="text-2xl font-bold text-theme-primary">{degree.totalCredits}</div>
                                    <div className="text-theme-text-white-70 text-sm">{educationData.labels.totalCredits}</div>
                                </div>
                                <div className="bg-theme-bg-white-20 backdrop-blur-md rounded-xl p-4 text-center shadow-lg">
                                    <div className="text-2xl font-bold text-theme-secondary">{degree.gpa}</div>
                                    <div className="text-theme-text-white-70 text-sm">{educationData.labels.gpa}</div>
                                </div>
                                <div className="bg-theme-bg-white-20 backdrop-blur-md rounded-xl p-4 text-center shadow-lg">
                                    <div className="text-2xl font-bold text-theme-accent">
                                        {degree.courses.reduce((total, semester) => total + semester.courses.length, 0)}
                                    </div>
                                    <div className="text-theme-text-white-70 text-sm">{educationData.labels.totalCourses}</div>
                                </div>
                            </div>

                            {/* 学期课程详细信息 */}
                            <div className="space-y-6">
                                {degree.courses.map((semester, semesterIndex) => (
                                    <div key={semesterIndex} className="bg-theme-bg-white-10 rounded-2xl p-6 backdrop-blur-sm border border-theme-border-white-10">
                                        <div className="text-lg font-bold text-theme-text-white-90 mb-4 semester-title">
                                            {semester.year} - {semester.semester}
                                        </div>
                                        
                                        <div className="grid gap-3">
                                            {semester.courses.map((course, courseIndex) => (
                                                <div key={courseIndex} className="course-item bg-theme-bg-white-5 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-theme-bg-white-10 transition-colors duration-200">
                                                    <div className="flex-1">
                                                        <div className="course-title text-theme-text-white-90 font-medium">{course.code}</div>
                                                        <div className="course-details text-theme-text-white-70 text-sm mt-1">{course.name}</div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span className="text-theme-text-white-60">{educationData.labels.level} {course.level}</span>
                                                        <span className="text-theme-text-white-60">{course.credits} {educationData.labels.credits}</span>
                                                        <span className={`grade-badge font-bold px-2 py-1 rounded ${getGradeColor(course.grade)}`}>
                                                            {course.grade}
                                                        </span>
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
                    {degree.capstoneProjects && degree.capstoneProjects.length > 0 && (
                        <div className="mb-10">
                            <ThemeTitle level={4} className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-theme-text-white-90">
                                <span className="w-2 h-6 bg-theme-secondary rounded-full mr-3"></span>
                                {educationData.labels.capstoneProjects}
                            </ThemeTitle>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {degree.capstoneProjects.map((project, projectIndex) => (
                                    <div
                                        key={projectIndex}
                                        className="group project-thumbnail-card relative bg-theme-bg-white-10 border border-theme-border-white-10 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300"
                                        onMouseEnter={() => setHoveredProject(project.name)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        {project.image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                                
                                                {/* Hover详情显示 - 毛玻璃遮罩覆盖整个卡片 */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-theme-bg-white-20 backdrop-blur-md flex items-center justify-center p-4">
                                                    <div className="text-center">
                                                        <p className="text-theme-text-white-90 text-sm leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="p-4">
                                            <h4 className="text-theme-text-white-90 font-bold text-lg mb-2">{project.name}</h4>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.technologies?.map((tech, techIndex) => (
                                                    <span key={techIndex} className="px-2 py-1 bg-theme-bg-white-20 text-theme-text-white-80 text-xs rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            {project.githubUrl && (
                                                <div className="flex items-center text-theme-primary hover:text-theme-secondary transition-colors duration-200">
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm">GitHub</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Academic Awards */}
                    {degree.awards && degree.awards.length > 0 && (
                        <div>
                            <ThemeTitle level={4} className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-theme-text-white-90">
                                <span className="w-2 h-6 bg-theme-accent rounded-full mr-3"></span>
                                {educationData.labels.academicAwards}
                            </ThemeTitle>
                            
                            <div className="space-y-4">
                                {degree.awards.map((award, awardIndex) => (
                                    <div key={awardIndex} className="bg-theme-bg-white-10 rounded-2xl p-6 backdrop-blur-sm border border-theme-border-white-10 hover:bg-theme-bg-white-15 transition-colors duration-200">
                                        <div className="flex items-center gap-4">
                                            {award.image && (
                                                <img src={award.image} alt={award.title} className="w-16 h-16 object-cover rounded-lg" />
                                            )}
                                            <div className="flex-1">
                                                <div className="text-lg font-bold text-theme-primary mb-1">{award.title}</div>
                                                <div className="text-theme-text-white-70">{award.year}</div>
                                                <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-theme-bg-white-20 rounded-full">
                                                    <span className="text-theme-primary">🏆</span>
                                                    <span className="text-theme-text-white-90 text-sm font-medium">
                                                        {educationData.labels.academicExcellenceAward}
                                                    </span>
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
        <div className="min-h-screen w-full p-8 text-theme-text-white relative education-section-bg">
            {/* Education标题 - 居中显示，使用主题化组件 */}
            <div className="flex flex-col pt-12">
                <div className="flex flex-col items-center text-center">
                    <ThemeTitle
                        level={1}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-theme-section-title mb-3"
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
