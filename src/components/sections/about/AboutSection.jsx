import { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { FaSpinner, FaDownload } from 'react-icons/fa';
import { useAppStore } from '../../../store/useAppStore';

const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect'));

const AboutSection = ({ language = 'en', onPageChange, currentPage = 0 }) => {
    const [localPage, setLocalPage] = useState(currentPage);
    const { getContent } = useAppStore();
    const content = getContent();
    
    // 从 store 获取 About 页面数据 - 只保留 statement 和 experience
    const aboutPages = content.about.pages.filter(page => page.id === 'statement' || page.id === 'experience');

    // 渲染个人陈述页面
    const renderStatementPage = (pageData) => {
        const { greeting, paragraphs } = pageData.content;
        return (
            <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-400 mb-4">{greeting}</h2>
                {paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base lg:text-lg leading-relaxed text-gray-200">
                        {paragraph}
                    </p>
                ))}
                
                {/* Resume 下载按钮 */}
                <div className="mt-8">
                    <a 
                        href="/Hua_Wang_Full_Stack_Engineer.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <FaDownload className="mr-2" />
                        {language === 'en' ? 'Download Resume' : '下载简历'}
                    </a>
                </div>
            </div>
        );
    };

    // 渲染工作经验页面
    const renderExperiencePage = (pageData) => {
        return (
            <div className="space-y-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-blue-400 mb-8">{pageData.title}</h2>
                
                <div className="space-y-6">
                    {pageData.experiences.map((exp, index) => (
                        <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
                                    <p className="text-gray-400 text-base">{exp.position}</p>
                                </div>
                                <span className="text-sm text-gray-500 whitespace-nowrap">
                                    {exp.period}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 渲染当前页面内容
    const renderPageContent = (pageData) => {
        switch (pageData.id) {
            case 'statement':
                return renderStatementPage(pageData);
            case 'experience':
                return renderExperiencePage(pageData);
            default:
                return renderStatementPage(pageData);
        }
    };

    // 确保页面索引在有效范围内
    const validPage = Math.min(localPage, aboutPages.length - 1);
    const currentPageData = aboutPages[validPage] || aboutPages[0];

    // 页面变化时通知父组件
    useEffect(() => {
        if (onPageChange) {
            onPageChange(validPage, aboutPages.length);
        }
    }, [validPage, onPageChange, aboutPages.length]);

    // 监听外部页面变化
    useEffect(() => {
        setLocalPage(currentPage);
    }, [currentPage]);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center lg:items-stretch relative overflow-hidden">
            {/* 左侧头像区域 - 优化移动端和窄屏显示 */}
            <div className="w-full lg:w-1/3 flex items-center justify-center p-4 lg:p-8 relative z-10">
                <div className="relative">
                    {/* 头像容器 - 响应式尺寸，确保完整显示 */}
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
                        <Suspense 
                            fallback={
                                <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-full">
                                    <FaSpinner className="animate-spin text-green-500 text-4xl" />
                                </div>
                            }
                        >
                            <div className="w-full h-full">
                                <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                            </div>
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* 右侧内容区域 - 优化响应式设计和 cube 空间预留 */}
            <div className="w-full lg:w-2/3 flex flex-col justify-center p-4 lg:p-8 lg:pr-32 relative z-20">
                {/* 毛玻璃背景卡片 */}
                <div className="bg-black/20 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-6 lg:p-8 max-w-4xl mx-auto lg:mx-0 w-full">
                    {/* 页面内容 */}
                    {renderPageContent(currentPageData)}
                </div>

            </div>
        </div>
    );
};

AboutSection.propTypes = {
    language: PropTypes.string.isRequired,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number
};

export default AboutSection;
