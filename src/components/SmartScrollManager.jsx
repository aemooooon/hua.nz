import { useEffect, useCallback, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import BackgroundCanvas from './background/BackgroundCanvas';
import '../styles/SmartScroll.css';

// 懒加载各个栏目组件
import { lazy, Suspense } from 'react';
const HomeSection = lazy(() => import('./sections/home/HomeSection'));
const ProjectSection = lazy(() => import('./sections/project/ProjectSection'));
const GallerySection = lazy(() => import('./sections/gallery/GallerySection'));
const EducationSection = lazy(() => import('./sections/education/EducationSection'));
const ContactSection = lazy(() => import('./sections/contact/ContactSection'));
const AboutSection = lazy(() => import('./sections/about/AboutSection'));

const SmartScrollManager = () => {
    const { 
        currentSection, 
        sections, 
        navigateToSection, 
        navigateNext, 
        navigatePrev,
        isScrolling,
        getCurrentSection,
        language,
        // 开场动画相关状态
        enableOpeningAnimation
    } = useAppStore();
    
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const currentSectionConfig = getCurrentSection();
    const lastWheelTimeRef = useRef(0);
    const scrollAccumulatorRef = useRef(0); // 滚动累积器
    
    // 滚动状态管理
    const [scrollMode, setScrollMode] = useState('slide'); // 'slide' | 'content' | 'hybrid'
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    
    // 混合滚动模式：判断当前页面是否为 Home
    const isHomePage = currentSectionConfig?.id === 'home';

    // 滚动敏感度配置
    const SCROLL_THRESHOLD = 240; // 滚动阈值 - 需要累积240px才触发（提高一倍）
    const SCROLL_RESET_TIME = 150; // 重置时间间隔

    // 组件映射
    const sectionComponents = {
        home: HomeSection,
        about: AboutSection,
        projects: ProjectSection,
        gallery: GallerySection,
        education: EducationSection,
        contact: ContactSection
    };

    // 检测内容是否超出视窗并实现混合滚动模式
    const checkContentOverflow = useCallback(() => {
        if (!contentRef.current) return;
        
        const container = contentRef.current;
        const isOverflowing = container.scrollHeight > container.clientHeight;
        setIsContentOverflowing(isOverflowing);
        
        // 混合滚动模式逻辑
        if (isHomePage) {
            // Home 页面始终使用 slide 模式（隐藏滚动条）
            setScrollMode('slide');
        } else {
            // 其他页面根据内容溢出情况决定滚动模式
            if (isOverflowing) {
                setScrollMode('content'); // 内容溢出时使用内容滚动模式
            } else {
                setScrollMode('slide'); // 内容不溢出时使用幻灯片模式
            }
        }
    }, [isHomePage]);

    // 重置滚动状态（切换section时）
    const resetScrollState = useCallback(() => {
        scrollAccumulatorRef.current = 0; // 重置累积器
        
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, []);

    // 智能滚轮处理 - 混合滚动模式优化
    const handleWheel = useCallback((event) => {
        const now = Date.now();
        if (isScrolling) return;
        
        // Home 页面和非溢出页面阻止默认滚动
        if (isHomePage || (!isContentOverflowing && scrollMode === 'slide')) {
            event.preventDefault();
        }
        
        // 重置累积器如果时间间隔太长
        if (now - lastWheelTimeRef.current > SCROLL_RESET_TIME) {
            scrollAccumulatorRef.current = 0;
        }
        lastWheelTimeRef.current = now;
        
        // 累积滚动距离
        scrollAccumulatorRef.current += Math.abs(event.deltaY);
        
        // 只有累积超过阈值才触发
        if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
            return;
        }
        
        // 重置累积器
        scrollAccumulatorRef.current = 0;
        
        const container = contentRef.current;
        if (!container) return;

        const isScrollingDown = event.deltaY > 0;
        const isScrollingUp = event.deltaY < 0;

        if (scrollMode === 'content' && isContentOverflowing && !isHomePage) {
            // 内容滚动模式（仅适用于非 Home 页面）
            const currentScrollTop = container.scrollTop;
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            
            if (isScrollingDown) {
                if (currentScrollTop >= maxScrollTop - 10) {
                    // 到达内容底部，切换到下一个section
                    if (currentSection < sections.length - 1) {
                        navigateNext();
                    }
                } else {
                    // 在内容内滚动（让浏览器自然处理）
                    return;
                }
            } else if (isScrollingUp) {
                if (currentScrollTop <= 10) {
                    // 到达内容顶部，切换到上一个section
                    if (currentSection > 0) {
                        navigatePrev();
                    }
                } else {
                    // 在内容内滚动（让浏览器自然处理）
                    return;
                }
            }
        } else {
            // 幻灯片模式 - 直接切换section（带边界检查）
            if (isScrollingDown && currentSection < sections.length - 1) {
                navigateNext();
            } else if (isScrollingUp && currentSection > 0) {
                navigatePrev();
            }
        }
    }, [isScrolling, scrollMode, isContentOverflowing, isHomePage, currentSection, sections.length, navigateNext, navigatePrev]);

    // 键盘事件处理（混合滚动模式优化）
    const handleKeyDown = useCallback((event) => {
        if (isScrolling) return;
        
        const container = contentRef.current;
        
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (scrollMode === 'content' && isContentOverflowing && !isHomePage && container) {
                    const maxScrollTop = container.scrollHeight - container.clientHeight;
                    if (container.scrollTop >= maxScrollTop - 10) {
                        if (currentSection < sections.length - 1) {
                            navigateNext();
                        }
                    } else {
                        const newScrollTop = Math.min(container.scrollTop + 100, maxScrollTop);
                        container.scrollTop = newScrollTop;
                    }
                } else {
                    if (currentSection < sections.length - 1) {
                        navigateNext();
                    }
                }
                break;
                
            case 'ArrowUp':
                event.preventDefault();
                if (scrollMode === 'content' && isContentOverflowing && !isHomePage && container) {
                    if (container.scrollTop <= 10) {
                        if (currentSection > 0) {
                            navigatePrev();
                        }
                    } else {
                        const newScrollTop = Math.max(container.scrollTop - 100, 0);
                        container.scrollTop = newScrollTop;
                    }
                } else {
                    if (currentSection > 0) {
                        navigatePrev();
                    }
                }
                break;
                
            case 'PageDown':
            case ' ':
                event.preventDefault();
                if (currentSection < sections.length - 1) {
                    navigateNext();
                }
                break;
                
            case 'PageUp':
                event.preventDefault();
                if (currentSection > 0) {
                    navigatePrev();
                }
                break;
                
            case 'Home':
                event.preventDefault();
                if (scrollMode === 'content' && !isHomePage && container) {
                    container.scrollTop = 0;
                } else {
                    navigateToSection(0);
                }
                break;
                
            case 'End':
                event.preventDefault();
                if (scrollMode === 'content' && !isHomePage && container) {
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
    }, [isScrolling, scrollMode, isContentOverflowing, isHomePage, currentSection, sections.length, navigateNext, navigatePrev, navigateToSection]);

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
                        onSectionChange: navigateToSection,
                        // 开场动画相关属性
                        enableOpeningAnimation: enableOpeningAnimation
                    } : {})}
                    // About页面不再需要分页props
                />
            </Suspense>
        );
    };

    return (
        <div 
            ref={containerRef}
            className="relative w-full h-screen m-0 p-0"
            style={{ overflow: 'hidden' }}
        >
            {/* 背景画布 - 只在有背景效果时渲染 */}
            {currentSectionConfig?.backgroundEffect && (
                <BackgroundCanvas 
                    effectType={currentSectionConfig.backgroundEffect}
                />
            )}

            {/* 当前栏目内容 - 混合滚动容器 */}
            <div 
                ref={contentRef}
                className={`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${
                    isHomePage 
                        ? 'scroll-mode-home overflow-hidden' 
                        : isContentOverflowing 
                            ? 'scroll-mode-auto overflow-y-auto' 
                            : 'overflow-hidden'
                }`}
            >
                {renderCurrentSection()}
            </div>

            {/* 过渡遮罩 */}
            {isScrolling && (
                <div className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300" />
            )}

            {/* 滚动提示已移除 */}
        </div>
    );
};

export default SmartScrollManager;
