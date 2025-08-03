import { Suspense, lazy } from 'react';
import { useAppStore } from '../store/useAppStore';
import AboutSection from './sections/about/AboutSection';
import EducationSection from './sections/education/EducationSection';
import { FaSpinner } from 'react-icons/fa';

// 懒加载页面组件
const HomePage = lazy(() => import('./HomePage'));
const Project = lazy(() => import('./Project'));
const Gallery = lazy(() => import('./Gallery'));
const ContactPage = lazy(() => import('./ContactPage'));
const BlogPage = lazy(() => import('./BlogPage'));

const PageManager = () => {
    const { currentSection, language } = useAppStore();

    // 将 section index 转换为 section name
    const getSectionName = (index) => {
        const sections = ['home', 'about', 'projects', 'gallery', 'education', 'contact'];
        return sections[index] || 'home';
    };

    const activeSection = getSectionName(currentSection);

    // 页面组件映射
    const pageComponents = {
        home: HomePage,
        about: AboutSection,
        projects: Project,
        gallery: Gallery,
        education: EducationSection,
        contact: ContactPage,
        blog: BlogPage
    };

    const CurrentPageComponent = pageComponents[activeSection] || HomePage;

    // 如果在首页，直接渲染HomePage（它包含了自己的HeroCube）
    if (activeSection === 'home') {
        return (
            <Suspense
                fallback={
                    <div className="w-full h-full flex justify-center items-center">
                        <FaSpinner className="animate-spin text-green-500 text-4xl" />
                    </div>
                }
            >
                <CurrentPageComponent />
            </Suspense>
        );
    }

    // 其他页面：只显示页面内容
    return (
        <>
            {/* 当前页面内容 */}
            <div className="page-content transition-opacity duration-500 opacity-100">
                <Suspense
                    fallback={
                        <div className="w-full h-full flex justify-center items-center">
                            <FaSpinner className="animate-spin text-green-500 text-4xl" />
                        </div>
                    }
                >
                    {activeSection === 'education' ? (
                        <CurrentPageComponent language={language} />
                    ) : (
                        <CurrentPageComponent />
                    )}
                </Suspense>
            </div>
        </>
    );
};

export default PageManager;
