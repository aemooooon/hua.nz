import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import { ThemeTitle, ThemeSubtitle } from '../../ui/ThemeComponents';
import OptimizedImage from '../../ui/OptimizedImage';
import './EducationSection.css';

// 图标组件
const MapPin = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);
MapPin.propTypes = { className: PropTypes.string };

const Calendar = ({ className = 'w-4 h-4' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </svg>
);
Calendar.propTypes = { className: PropTypes.string };

const EducationSection = ({ language }) => {
    const { getEducationData } = useAppStore();
    const [hoveredProject, setHoveredProject] = useState(null);

    const educationData = getEducationData();

    // 获取成绩颜色的函数
    const getGradeColor = grade => {
        if (grade === 'A+') return 'text-theme-primary';
        if (grade === 'A') return 'text-theme-secondary';
        if (grade === 'A-') return 'text-theme-accent';
        if (grade === 'B+') return 'text-theme-text-white-90';
        if (grade === 'Passed' || grade === '通过') return 'text-theme-primary';
        return 'text-theme-text-white-60';
    };

    // 添加安全检查，确保数据存在
    const mastersDegree = educationData?.degrees?.find(d => d.id === 'masters');
    const bachelorsDegree = educationData?.degrees?.find(d => d.id === 'bachelors');

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
        { id: 'masters', data: mastersDegree, theme: 'emerald' },
        { id: 'bachelors', data: bachelorsDegree, theme: 'blue' },
    ];

    // 渲染单个教育卡片
    const renderEducationCard = degreeConfig => {
        const { data: degree, theme } = degreeConfig;

        return (
            <div key={degree.id} className="w-full mb-16 lg:mb-20">
                {/* 移除glass-card效果，降低透明度，使用更不透明的背景 */}
                <div className="bg-theme-bg-white-5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-theme-border-white-15">
                    {/* 从glass-card改为自定义样式，降低透明度 */}

                    {/* 学位信息和学校信息 - 统一在顶部 */}
                    <div className="space-y-6 mb-8">
                        {/* 大屏幕：左右分布 - 学位信息居左，学校名称+logo居右 */}
                        <div className="hidden lg:flex items-start justify-between gap-12">
                            {/* 左边：学位名称 + 地址时间信息 */}
                            <div className="flex-1 flex flex-col space-y-6">
                                {/* 学位名称 + 荣誉徽章 */}
                                <div className="space-y-4">
                                    <ThemeTitle
                                        level={3}
                                        className="text-2xl xl:text-3xl text-theme-section-title font-bold leading-tight"
                                    >
                                        {degree.degree[language] || degree.degree.en}
                                    </ThemeTitle>
                                    {degree.degreeHonor && (
                                        <div className="flex justify-start">
                                            <span className="glass-card inline-flex items-center gap-2 px-3 py-2 text-theme-primary text-sm font-bold">
                                                <span className="text-theme-primary">🏆</span>
                                                <span>{educationData.labels.withDistinction[language] || educationData.labels.withDistinction.en}</span>
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* 地址和时间信息 */}
                                <div className="space-y-4">
                                    <div className="flex items-center text-theme-text-white-70 text-base xl:text-lg">
                                        <MapPin className="w-5 h-5 xl:w-6 xl:h-6 mr-3 text-theme-primary flex-shrink-0" />
                                        <span>{degree.location[language] || degree.location.en}</span>
                                    </div>
                                    <div className="flex items-center text-theme-text-white-70 text-base xl:text-lg">
                                        <Calendar className="w-5 h-5 xl:w-6 xl:h-6 mr-3 text-theme-primary flex-shrink-0" />
                                        <span>{degree.period[language] || degree.period.en}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 右边：学校名称在上，logo在下 */}
                            <div className="flex-shrink-0 flex flex-col justify-between h-full">
                                {/* 学校名称 - 与学位名称对齐 */}
                                <div className="text-right">
                                    <ThemeTitle
                                        level={4}
                                        className="text-lg xl:text-xl text-theme-text-white-90 font-semibold leading-tight"
                                    >
                                        {degree.institution[language] || degree.institution.en}
                                    </ThemeTitle>
                                </div>

                                {/* logo - 与时间信息底部对齐 */}
                                <div className="rounded-xl p-4 self-end">
                                    <OptimizedImage
                                        src={degree.logo}
                                        alt={`${degree.institution[language] || degree.institution.en} Logo`}
                                        className="w-32 h-32 xl:w-40 xl:h-40 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 窄屏幕：上下分布 */}
                        <div className="lg:hidden space-y-6">
                            {/* 学位名称 + 荣誉徽章 */}
                            <div className="text-center space-y-4">
                                <ThemeTitle
                                    level={3}
                                    className="text-xl sm:text-2xl text-theme-section-title font-bold leading-tight"
                                >
                                    {degree.degree[language] || degree.degree.en}
                                </ThemeTitle>
                                {degree.degreeHonor && (
                                    <div className="flex justify-center">
                                        <span className="glass-card inline-flex items-center gap-2 px-3 py-2 text-theme-primary text-sm font-bold">
                                            <span className="text-theme-primary">🏆</span>
                                            <span>{educationData.labels.withDistinction[language] || educationData.labels.withDistinction.en}</span>
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* 大学标志 */}
                            <div className="flex justify-center">
                                <div className="rounded-xl p-4">
                                    <OptimizedImage
                                        src={degree.logo}
                                        alt={`${degree.institution[language] || degree.institution.en} Logo`}
                                        className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    />
                                </div>
                            </div>

                            {/* 学校信息 - 三行 */}
                            <div className="space-y-3 text-center sm:text-left">
                                <div>
                                    <ThemeTitle
                                        level={4}
                                        className="text-base sm:text-lg text-theme-text-white-90 font-semibold leading-tight"
                                    >
                                        {degree.institution[language] || degree.institution.en}
                                    </ThemeTitle>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start text-theme-text-white-70 text-sm sm:text-base">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-theme-primary flex-shrink-0" />
                                    <span>{degree.location[language] || degree.location.en}</span>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start text-theme-text-white-70 text-sm sm:text-base">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-theme-primary flex-shrink-0" />
                                    <span>{degree.period[language] || degree.period.en}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Records */}
                    {degree.courses && degree.courses.length > 0 && (
                        <div className="mb-10">
                            <ThemeTitle
                                level={4}
                                className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-theme-text-white-90"
                            >
                                <span className="w-2 h-6 bg-theme-primary rounded-full mr-3"></span>
                                {educationData.labels.academicRecords[language] || educationData.labels.academicRecords.en}
                            </ThemeTitle>

                            {/* 总体统计 */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                <div className="glass-card p-4 text-center">
                                    <div className="text-2xl font-bold text-theme-primary">
                                        {degree.totalCredits}
                                    </div>
                                    <div className="text-theme-text-white-70 text-sm">
                                        {educationData.labels.totalCredits[language] || educationData.labels.totalCredits.en}
                                    </div>
                                </div>
                                <div className="glass-card p-4 text-center">
                                    <div className="text-2xl font-bold text-theme-secondary">
                                        {degree.gpa[language] || degree.gpa.en}
                                    </div>
                                    <div className="text-theme-text-white-70 text-sm">
                                        {educationData.labels.gpa[language] || educationData.labels.gpa.en}
                                    </div>
                                </div>
                                <div className="glass-card p-4 text-center">
                                    <div className="text-2xl font-bold text-theme-accent">
                                        {degree.courses.reduce(
                                            (total, semester) => total + semester.courses.length,
                                            0
                                        )}
                                    </div>
                                    <div className="text-theme-text-white-70 text-sm">
                                        {educationData.labels.totalCourses[language] || educationData.labels.totalCourses.en}
                                    </div>
                                </div>
                            </div>

                            {/* 学期课程详细信息 */}
                            <div className="space-y-6">
                                {degree.courses.map((semester, semesterIdx) => (
                                    <div
                                        key={semesterIdx}
                                        className="bg-theme-bg-white-10 backdrop-blur-md rounded-xl p-6 border border-theme-border-white-10"
                                    >
                                        <h5 className="text-lg font-bold mb-4 flex items-center text-theme-text-white-90">
                                            <span className="text-2xl mr-2">📚</span>
                                            {semester.year} - {typeof semester.semester === 'string' ? semester.semester : (semester.semester[language] || semester.semester.en)}
                                        </h5>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                            {semester.courses.map((course, courseIdx) => (
                                                <div
                                                    key={courseIdx}
                                                    className="glass-card flex items-center justify-between p-3"
                                                >
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm leading-tight text-theme-text-white-90">
                                                            {course.code} - {typeof course.name === 'string' ? course.name : (course.name[language] || course.name.en)}
                                                        </div>
                                                        <div className="text-xs mt-1 text-theme-text-white-70">
                                                            {language === 'en'
                                                                ? `${educationData.labels.level[language] || educationData.labels.level.en} ${course.level} • ${course.credits} ${educationData.labels.credits[language] || educationData.labels.credits.en}`
                                                                : `${educationData.labels.level[language] || educationData.labels.level.en} ${course.level} • ${course.credits} ${educationData.labels.credits[language] || educationData.labels.credits.en}`}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`text-sm ml-3 font-audiowide ${getGradeColor(course.grade)}`}
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
                        <ThemeTitle
                            level={4}
                            className="text-xl sm:text-2xl font-bold text-theme-text-white-90 mb-6 flex items-center"
                        >
                            <span className="w-2 h-6 bg-theme-primary rounded-full mr-3"></span>
                            {educationData.labels.capstoneProjects[language] || educationData.labels.capstoneProjects.en}
                        </ThemeTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {degree.capstoneProjects &&
                                Array.isArray(degree.capstoneProjects) &&
                                degree.capstoneProjects.map((project, idx) => (
                                    <div
                                        key={idx}
                                        className={`project-thumbnail-card ${
                                            hoveredProject === theme + '-project-' + idx
                                                ? 'project-hovered'
                                                : ''
                                        }`}
                                        onMouseEnter={() =>
                                            setHoveredProject(theme + '-project-' + idx)
                                        }
                                        onMouseLeave={() => setHoveredProject(null)}
                                    >
                                        <div
                                            className="relative h-48 sm:h-48 md:h-48 lg:h-36 xl:h-48 rounded-xl overflow-hidden group cursor-pointer"
                                            onClick={() => {
                                                if (project.githubUrl) {
                                                    window.open(
                                                        project.githubUrl,
                                                        '_blank',
                                                        'noopener,noreferrer'
                                                    );
                                                }
                                            }}
                                        >
                                            {/* 项目图片 */}
                                            <OptimizedImage
                                                src={project.image}
                                                alt={typeof project.name === 'string' ? project.name : (project.name[language] || project.name.en)}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* 图片覆盖层 */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                            {/* 项目名称 */}
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h5 className="text-theme-text-white-100 font-bold text-sm sm:text-base drop-shadow-lg">
                                                    {typeof project.name === 'string' ? project.name : (project.name[language] || project.name.en)}
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
                                                    onClick={e => e.stopPropagation()}
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

                                            {/* Hover详情显示 - 只显示项目描述，无背景闪光 */}
                                            <div className="absolute inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="glass-card text-center px-4 py-2 w-full h-full flex items-center justify-center">
                                                    <p className="text-theme-text-white-90 text-sm leading-relaxed">
                                                        {typeof project.description === 'string' ? project.description : (project.description[language] || project.description.en)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Awards部分 - 仅对bachelor显示，不使用单独卡片 */}
                    {theme === 'blue' && degree.awards && degree.awards.length > 0 && (
                        <div>
                            <ThemeTitle
                                level={4}
                                className="text-xl sm:text-2xl font-bold text-theme-text-white-90 mb-6 flex items-center"
                            >
                                <span className="w-2 h-6 bg-theme-primary rounded-full mr-3"></span>
                                {educationData.labels.academicAwards[language] || educationData.labels.academicAwards.en}
                            </ThemeTitle>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {degree.awards &&
                                    Array.isArray(degree.awards) &&
                                    degree.awards.map((award, idx) => (
                                        <div
                                            key={idx}
                                            className={`project-thumbnail-card ${
                                                hoveredProject === theme + '-award-' + idx
                                                    ? 'project-hovered'
                                                    : ''
                                            }`}
                                            onMouseEnter={() =>
                                                setHoveredProject(theme + '-award-' + idx)
                                            }
                                            onMouseLeave={() => setHoveredProject(null)}
                                        >
                                            <div className="relative h-48 sm:h-48 rounded-xl overflow-hidden group cursor-pointer">
                                                {/* 奖项图片 */}
                                                <OptimizedImage
                                                    src={award.image}
                                                    alt={typeof award.title === 'string' ? award.title : (award.title[language] || award.title.en)}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* 图片覆盖层 */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                                {/* 奖项年份标识 */}
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2 py-1 bg-theme-primary text-theme-text-white-100 text-xs font-bold rounded-full shadow-lg">
                                                        🏆 {award.year}
                                                    </span>
                                                </div>

                                                {/* 奖项名称 */}
                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <h5 className="text-theme-text-white-100 font-bold text-sm sm:text-base drop-shadow-lg">
                                                        {typeof award.title === 'string' ? award.title : (award.title[language] || award.title.en)}
                                                    </h5>
                                                </div>

                                                {/* Hover详情显示 */}
                                                <div className="absolute inset-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                                    <div className="glass-card text-center p-4 w-full h-full flex flex-col items-center justify-center">
                                                        <div className="text-theme-primary text-4xl mb-3">
                                                            🏆
                                                        </div>
                                                        <h5 className="text-theme-primary font-bold text-lg mb-2">
                                                            {typeof award.title === 'string' ? award.title : (award.title[language] || award.title.en)}
                                                        </h5>
                                                        <p className="text-theme-text-white-70 text-sm">
                                                            {award.year}
                                                        </p>
                                                        <div className="mt-3 text-xs text-theme-text-white-80">
                                                            {
                                                                educationData.labels
                                                                    .academicExcellenceAward[language] || educationData.labels
                                                                    .academicExcellenceAward.en
                                                            }
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
        <div className="min-h-screen w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8 text-theme-text-white relative education-section-bg">
            <div className="max-w-screen-xl mx-auto">
                {/* 从 max-w-screen-2xl 改为 max-w-screen-xl，增加两边空白 */}
                {/* Education标题 - 居中显示，使用主题化组件 */}
                <div className="flex flex-col pt-4">
                    <div className="flex flex-col items-center text-center">
                        <ThemeTitle
                            level={1}
                            className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-theme-section-title mb-3"
                        >
                            {educationData.title[language] || educationData.title.en}
                        </ThemeTitle>
                        <ThemeSubtitle className="text-xl md:text-2xl font-light italic">
                            {educationData.subtitle[language] || educationData.subtitle.en}
                        </ThemeSubtitle>
                    </div>
                </div>

                {/* 标题与内容之间的分隔线 - 与教育卡片内容区域宽度完全保持一致 */}
                <div className="flex justify-center my-8">
                    <div className="w-full">
                        <div className="bg-transparent rounded-2xl px-6 lg:px-8">
                            {/* <GlowDivider className="w-full" /> */}
                        </div>
                    </div>
                </div>

                {/* 学历内容 - 垂直滚动，使用主题化文本颜色 */}
                <div className="w-full text-theme-text-primary pt-0">
                    {degrees.map(degree => (
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
