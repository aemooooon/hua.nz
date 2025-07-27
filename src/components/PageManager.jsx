import { useEffect, useState, Suspense, lazy } from 'react';
import { useAppStore } from '../store/useAppStore';
import NavigationCube from './NavigationCube';
import { FaSpinner } from 'react-icons/fa';

// 懒加载页面组件
const HomePage = lazy(() => import('./HomePage'));
const Project = lazy(() => import('./Project'));
const Gallery = lazy(() => import('./Gallery'));
const ContactPage = lazy(() => import('./ContactPage'));
const AboutPage = lazy(() => import('./AboutPage'));
const BlogPage = lazy(() => import('./BlogPage'));

const PageManager = () => {
    const { currentSection, setCurrentSection } = useAppStore();
    const [cubePosition, setCubePosition] = useState('center');
    const [isTransitioning, setIsTransitioning] = useState(false);

    // 将 section index 转换为 section name
    const getSectionName = (index) => {
        const sections = ['home', 'about', 'project', 'gallery', 'education', 'contact'];
        return sections[index] || 'home';
    };

    const activeSection = getSectionName(currentSection);

    // 页面组件映射
    const pageComponents = {
        home: HomePage,
        about: AboutPage,
        project: Project,
        gallery: Gallery,
        education: AboutPage, // 暂时使用 AboutPage 作为教育页面
        contact: ContactPage,
        blog: BlogPage
    };

    // 根据当前页面设置立方体位置
    useEffect(() => {
        setIsTransitioning(true);
        
        if (activeSection === 'home') {
            setCubePosition('center');
        } else {
            setCubePosition('top-right');
        }
        
        const timer = setTimeout(() => {
            setIsTransitioning(false);
        }, 800);
        
        return () => clearTimeout(timer);
    }, [activeSection]);

    const CurrentPageComponent = pageComponents[activeSection] || HomePage;

    // 如果在首页，直接渲染HomePage（它包含了自己的立方体）
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

    // 其他页面：显示页面内容 + 右上角小立方体
    return (
        <>
            {/* 当前页面内容 */}
            <div className={`page-content transition-opacity duration-500 ${isTransitioning ? 'opacity-90' : 'opacity-100'}`}>
                <Suspense
                    fallback={
                        <div className="w-full h-full flex justify-center items-center">
                            <FaSpinner className="animate-spin text-green-500 text-4xl" />
                        </div>
                    }
                >
                    <CurrentPageComponent />
                </Suspense>
            </div>

            {/* 导航立方体 - 右上角小尺寸 */}
            <div 
                className={`fixed top-6 right-6 z-50 transition-all duration-800 ease-in-out ${
                    cubePosition === 'top-right' ? 'scale-30 opacity-100' : 'scale-100 opacity-0'
                }`}
                style={{
                    transform: cubePosition === 'top-right' ? 'scale(0.3)' : 'scale(1)',
                    transformOrigin: 'center'
                }}
            >
                <NavigationCube
                    isLandingPage={false}
                />
            </div>
        </>
    );
};

export default PageManager;
