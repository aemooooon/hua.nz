import { useEffect, useCallback, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import NavigationCube from './NavigationCube';
import BackgroundCanvas from './background/BackgroundCanvas';

// 懒加载各个栏目组件
import { lazy, Suspense } from 'react';
const HomeSection = lazy(() => import('./sections/home/HomeSection'));
const ProjectSection = lazy(() => import('./sections/project/ProjectSection'));
const GallerySection = lazy(() => import('./sections/gallery/GallerySection'));
const EducationSection = lazy(() => import('./sections/education/EducationSection'));
const ContactSection = lazy(() => import('./sections/contact/ContactSection'));
const AboutSection = lazy(() => import('./sections/about/AboutSection'));

const FullPageScrollManager = () => {
    const { 
        currentSection, 
        sections, 
        navigateToSection, 
        navigateNext, 
        navigatePrev,
        isScrolling,
        getCurrentSection,
        language
    } = useAppStore();
    
    const containerRef = useRef(null);
    const currentSectionConfig = getCurrentSection();
    const lastWheelTimeRef = useRef(0);

    // 组件映射
    const sectionComponents = {
        home: HomeSection,
        about: AboutSection,
        project: ProjectSection,
        gallery: GallerySection,
        education: EducationSection,
        contact: ContactSection
    };

    // 滚轮事件处理（带简单的时间节流）
    const handleWheel = useCallback((event) => {
        const now = Date.now();
        if (isScrolling || now - lastWheelTimeRef.current < 150) return;
        
        event.preventDefault();
        lastWheelTimeRef.current = now;
        
        if (event.deltaY > 0) {
            navigateNext();
        } else if (event.deltaY < 0) {
            navigatePrev();
        }
    }, [isScrolling, navigateNext, navigatePrev]);

    // 键盘事件处理
    const handleKeyDown = useCallback((event) => {
        if (isScrolling) return;
        
        switch (event.key) {
            case 'ArrowDown':
            case 'PageDown':
            case ' ':
                event.preventDefault();
                navigateNext();
                break;
            case 'ArrowUp':
            case 'PageUp':
                event.preventDefault();
                navigatePrev();
                break;
            case 'Home':
                event.preventDefault();
                navigateToSection(0);
                break;
            case 'End':
                event.preventDefault();
                navigateToSection(sections.length - 1);
                break;
            default: {
                // 数字键 1-6 直接跳转到对应栏目
                const num = parseInt(event.key);
                if (num >= 1 && num <= sections.length) {
                    event.preventDefault();
                    navigateToSection(num - 1);
                }
                break;
            }
        }
    }, [isScrolling, navigateNext, navigatePrev, navigateToSection, sections.length]);

    // 添加事件监听器
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                container.removeEventListener('wheel', handleWheel);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [handleWheel, handleKeyDown]);

    // 渲染当前栏目组件
    const renderCurrentSection = () => {
        if (!currentSectionConfig) return null;

        const SectionComponent = sectionComponents[currentSectionConfig.id];
        if (!SectionComponent) return null;

        return (
            <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            }>
                <SectionComponent 
                    section={currentSectionConfig}
                    language={language}
                    // 为HomeSection传递额外的props
                    {...(currentSectionConfig.id === 'home' ? {
                        sections: sections,
                        onSectionChange: navigateToSection
                    } : {})}
                />
            </Suspense>
        );
    };

    // 渲染栏目指示器
    const renderSectionIndicators = () => (
        <div className="fixed left-8 bottom-8 z-40">
            <div className="flex space-x-3">
                {sections.map((section, index) => (
                    <button
                        key={section.id}
                        onClick={() => navigateToSection(index)}
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                            index === currentSection
                                ? 'bg-blue-400 border-blue-400 scale-125'
                                : 'bg-transparent border-white/50 hover:border-white hover:scale-110'
                        }`}
                        title={section.name[language]}
                        disabled={isScrolling}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* 背景画布 */}
            <BackgroundCanvas 
                effectType={currentSectionConfig?.backgroundEffect || 'effectfuse'}
            />

            {/* 导航立方体 - 只在非首页显示 */}
            {currentSectionConfig?.id !== 'home' && (
                <NavigationCube 
                    sections={sections}
                    onSectionChange={navigateToSection}
                />
            )}

            {/* 当前栏目内容 */}
            <div className="absolute inset-0 z-20">
                {renderCurrentSection()}
            </div>

            {/* 栏目指示器 */}
            {renderSectionIndicators()}

            {/* 过渡遮罩 */}
            {isScrolling && (
                <div className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300" />
            )}
        </div>
    );
};

export default FullPageScrollManager;
