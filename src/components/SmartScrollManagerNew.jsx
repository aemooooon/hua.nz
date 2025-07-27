import { useEffect, useCallback, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import NavigationCube from './NavigationCube';
import BackgroundCanvas from './background/BackgroundCanvas';
import '../styles/SmartScroll.css';

// 懒加载各个栏目组件
import { lazy, Suspense } from 'react';
const HomeSection = lazy(() => import('./sections/home/HomeSection'));
const ProjectSection = lazy(() => import('./sections/project/ProjectSection'));
const GallerySection = lazy(() => import('./sections/gallery/GallerySection'));
const EducationSection = lazy(() => import('./sections/education/EducationSection'));
const ContactSection = lazy(() => import('./sections/contact/ContactSection'));
const NewAboutSection = lazy(() => import('./sections/about/NewAboutSection'));

const SmartScrollManager = () => {
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
    const contentRef = useRef(null);
    const currentSectionConfig = getCurrentSection();
    const lastWheelTimeRef = useRef(0);
    
    // 滚动状态管理
    const [scrollMode, setScrollMode] = useState('slide'); // 'slide' | 'content' | 'page'
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // 组件映射
    const sectionComponents = {
        home: HomeSection,
        about: NewAboutSection, // 使用新的About组件
        projects: ProjectSection,
        gallery: GallerySection,
        education: EducationSection,
        contact: ContactSection
    };

    // About页面回调
    const handleAboutPageChange = useCallback((pageIndex, totalPagesCount) => {
        setCurrentPageIndex(pageIndex);
        setTotalPages(totalPagesCount);
        setScrollMode('page');
    }, []);

    // 检测内容是否超出视窗
    const checkContentOverflow = useCallback(() => {
        if (!contentRef.current) return;
        
        const container = contentRef.current;
        const isOverflowing = container.scrollHeight > container.clientHeight;
        setIsContentOverflowing(isOverflowing);
        
        // 只有在非About页面时才自动切换到内容滚动模式
        if (currentSectionConfig?.id !== 'about') {
            if (isOverflowing && scrollMode === 'slide') {
                setScrollMode('content');
            } else if (!isOverflowing && scrollMode === 'content') {
                setScrollMode('slide');
            }
        }
    }, [scrollMode, currentSectionConfig?.id]);

    // 重置滚动状态（切换section时）
    const resetScrollState = useCallback(() => {
        if (currentSectionConfig?.id === 'about') {
            setScrollMode('page');
            setCurrentPageIndex(0);
        } else {
            setScrollMode('slide');
        }
        
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [currentSectionConfig?.id]);

    // 智能滚轮处理
    const handleWheel = useCallback((event) => {
        const now = Date.now();
        if (isScrolling || now - lastWheelTimeRef.current < 150) return;
        
        event.preventDefault();
        lastWheelTimeRef.current = now;
        
        const container = contentRef.current;
        if (!container) return;

        const isScrollingDown = event.deltaY > 0;
        const isScrollingUp = event.deltaY < 0;

        if (scrollMode === 'page') {
            // About页面分页模式
            if (isScrollingDown) {
                if (currentPageIndex >= totalPages - 1) {
                    // 最后一页，切换到下一个section
                    navigateNext();
                } else {
                    // 下一页
                    setCurrentPageIndex(prev => Math.min(prev + 1, totalPages - 1));
                }
            } else if (isScrollingUp) {
                if (currentPageIndex <= 0) {
                    // 第一页，切换到上一个section
                    navigatePrev();
                } else {
                    // 上一页
                    setCurrentPageIndex(prev => Math.max(prev - 1, 0));
                }
            }
        } else if (scrollMode === 'content' && isContentOverflowing) {
            // 内容滚动模式（无滚动条）
            const currentScrollTop = container.scrollTop;
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            
            if (isScrollingDown) {
                if (currentScrollTop >= maxScrollTop - 10) {
                    // 到达内容底部，切换到下一个section
                    navigateNext();
                } else {
                    // 在内容内滚动
                    const newScrollTop = Math.min(currentScrollTop + 100, maxScrollTop);
                    container.scrollTop = newScrollTop;
                }
            } else if (isScrollingUp) {
                if (currentScrollTop <= 10) {
                    // 到达内容顶部，切换到上一个section
                    navigatePrev();
                } else {
                    // 在内容内滚动
                    const newScrollTop = Math.max(currentScrollTop - 100, 0);
                    container.scrollTop = newScrollTop;
                }
            }
        } else {
            // 幻灯片模式 - 直接切换section
            if (isScrollingDown) {
                navigateNext();
            } else if (isScrollingUp) {
                navigatePrev();
            }
        }
    }, [isScrolling, scrollMode, isContentOverflowing, currentPageIndex, totalPages, navigateNext, navigatePrev]);

    // 键盘事件处理（增强版）
    const handleKeyDown = useCallback((event) => {
        if (isScrolling) return;
        
        const container = contentRef.current;
        
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (scrollMode === 'page') {
                    if (currentPageIndex >= totalPages - 1) {
                        navigateNext();
                    } else {
                        setCurrentPageIndex(prev => Math.min(prev + 1, totalPages - 1));
                    }
                } else if (scrollMode === 'content' && isContentOverflowing && container) {
                    const maxScrollTop = container.scrollHeight - container.clientHeight;
                    if (container.scrollTop >= maxScrollTop - 10) {
                        navigateNext();
                    } else {
                        const newScrollTop = Math.min(container.scrollTop + 100, maxScrollTop);
                        container.scrollTop = newScrollTop;
                    }
                } else {
                    navigateNext();
                }
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                if (scrollMode === 'page') {
                    if (currentPageIndex <= 0) {
                        navigatePrev();
                    } else {
                        setCurrentPageIndex(prev => Math.max(prev - 1, 0));
                    }
                } else if (scrollMode === 'content' && isContentOverflowing && container) {
                    if (container.scrollTop <= 10) {
                        navigatePrev();
                    } else {
                        const newScrollTop = Math.max(container.scrollTop - 100, 0);
                        container.scrollTop = newScrollTop;
                    }
                } else {
                    navigatePrev();
                }
                break;
                
            case 'PageDown':
            case ' ':
                event.preventDefault();
                navigateNext();
                break;
                
            case 'PageUp':
                event.preventDefault();
                navigatePrev();
                break;
                
            case 'Home':
                event.preventDefault();
                if (scrollMode === 'page') {
                    setCurrentPageIndex(0);
                } else if (scrollMode === 'content' && container) {
                    container.scrollTop = 0;
                } else {
                    navigateToSection(0);
                }
                break;
                
            case 'End':
                event.preventDefault();
                if (scrollMode === 'page') {
                    setCurrentPageIndex(totalPages - 1);
                } else if (scrollMode === 'content' && container) {
                    const maxScrollTop = container.scrollHeight - container.clientHeight;
                    container.scrollTop = maxScrollTop;
                } else {
                    navigateToSection(sections.length - 1);
                }
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
    }, [isScrolling, scrollMode, isContentOverflowing, currentPageIndex, totalPages, navigateNext, navigatePrev, navigateToSection, sections.length]);

    // 监听section变化，重置滚动状态
    useEffect(() => {
        resetScrollState();
    }, [currentSection, resetScrollState]);

    // 监听内容变化，检测溢出
    useEffect(() => {
        const checkTimer = setTimeout(() => {
            checkContentOverflow();
        }, 100); // 延迟检测，确保内容已渲染

        return () => clearTimeout(checkTimer);
    }, [currentSection, checkContentOverflow]);

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
                    // 为AboutSection传递分页相关的props
                    {...(currentSectionConfig.id === 'about' ? {
                        onPageChange: handleAboutPageChange,
                        currentPage: currentPageIndex
                    } : {})}
                />
            </Suspense>
        );
    };

    // 渲染滚动指示器
    const renderScrollIndicator = () => {
        if (scrollMode === 'page') {
            // About页面分页指示器
            return (
                <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
                    <div className="flex flex-col space-y-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentPageIndex
                                        ? 'bg-blue-400 scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                    <div className="text-xs text-white/60 mt-2 text-center">
                        {currentPageIndex + 1}/{totalPages}
                    </div>
                </div>
            );
        } else if (scrollMode === 'content' && isContentOverflowing) {
            // 内容滚动指示器
            const container = contentRef.current;
            if (!container) return null;

            const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;

            return (
                <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
                    <div className="w-1 h-32 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="w-full bg-blue-400 rounded-full scroll-indicator"
                            style={{ height: `${Math.max(scrollPercentage, 5)}%` }}
                        />
                    </div>
                    <div className="text-xs text-white/60 mt-2 text-center">
                        {Math.round(scrollPercentage)}%
                    </div>
                </div>
            );
        }
        return null;
    };

    // 渲染模式指示器（开发时可见）
    const renderModeIndicator = () => {
        return null; // 暂时禁用开发模式指示器
    };

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

            {/* 当前栏目内容 - 智能滚动容器 */}
            <div 
                ref={contentRef}
                className={`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${
                    scrollMode === 'content' ? 'overflow-y-hidden' : 'overflow-hidden'
                }`}
            >
                {renderCurrentSection()}
            </div>

            {/* 滚动指示器 */}
            {renderScrollIndicator()}

            {/* 模式指示器 (开发环境) */}
            {renderModeIndicator()}

            {/* 过渡遮罩 */}
            {isScrolling && (
                <div className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300" />
            )}

            {/* 滚动提示 */}
            {(scrollMode === 'content' && isContentOverflowing) || scrollMode === 'page' ? (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
                    <div className="bg-black/80 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm scroll-hint">
                        <div className="flex items-center space-x-2">
                            <span>↕️</span>
                            <span>
                                {scrollMode === 'page' 
                                    ? (language === 'en' ? 'Scroll through pages' : '滚动浏览页面')
                                    : (language === 'en' ? 'Scroll to explore content' : '滚动浏览内容')
                                }
                            </span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SmartScrollManager;
