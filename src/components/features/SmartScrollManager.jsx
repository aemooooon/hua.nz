/**
 * SmartScrollManager - 智能滚动管理器
 * 
 * 管理整个应用的滚动行为，提供自适应的滚动模式：
 * - slide: 分段滚动模式（适用于全屏section）
 * - content: 内容滚动模式（适用于长内容页面）
 * - hybrid: 混合模式，根据内容自动切换
 * 
 * 核心功能：
 * - 智能检测内容溢出，自动切换滚动模式
 * - iOS风格的边界回弹效果
 * - 滚动预览和累积检测
 * - 懒加载section组件
 */

import { useEffect, useCallback, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import BackgroundCanvas from '../background/BackgroundCanvas';
import '../../styles/SmartScroll.css';

import { lazy, Suspense } from 'react';
const HomeSection = lazy(() => import('../sections/home/HomeSection'));
const ProjectSection = lazy(() => import('../sections/project/ProjectSection'));
const GallerySection = lazy(() => import('../sections/gallery/GallerySection'));
const EducationSection = lazy(() => import('../sections/education/EducationSection'));
const ContactSection = lazy(() => import('../sections/contact/ContactSection'));
const AboutSection = lazy(() => import('../sections/about/AboutSection'));

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
        enableOpeningAnimation,
        isProjectModalOpen
    } = useAppStore();
    
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const currentSectionConfig = getCurrentSection();
    const lastWheelTimeRef = useRef(0);
    const scrollAccumulatorRef = useRef(0);
    
    const [scrollMode, setScrollMode] = useState('slide');
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    const [sectionScrollPositions, setSectionScrollPositions] = useState({});
    const [isPreviewingScroll, setIsPreviewingScroll] = useState(false);
    const [previewOffset, setPreviewOffset] = useState(0);
    const [isBouncing, setIsBouncing] = useState(false);
    const [bounceDirection, setBounceDirection] = useState('none');
    const bounceTimerRef = useRef();
    
    const isHomePage = currentSectionConfig?.id === 'home';

    // 滚动敏感度配置
    const SCROLL_THRESHOLD = 600;
    const SCROLL_RESET_TIME = 300;
    const PREVIEW_MAX_OFFSET = 80;
    // 通知光标组件边界状态
    useEffect(() => {
        const bounceEvent = new CustomEvent('scrollBounce', {
            detail: { 
                isBouncing, 
                direction: bounceDirection,
                intensity: scrollAccumulatorRef.current / SCROLL_THRESHOLD
            }
        });
        window.dispatchEvent(bounceEvent);
    }, [isBouncing, bounceDirection]);

    const sectionComponents = {
        home: HomeSection,
        about: AboutSection,
        projects: ProjectSection,
        gallery: GallerySection,
        education: EducationSection,
        contact: ContactSection
    };

    // 检测内容溢出并设置滚动模式
    const checkContentOverflow = useCallback(() => {
        if (!contentRef.current) return;
        
        const container = contentRef.current;
        container.offsetHeight; // 触发重排
        
        const isOverflowing = container.scrollHeight > container.clientHeight + 10;
        setIsContentOverflowing(isOverflowing);
        
        if (isHomePage) {
            setScrollMode('slide');
        } else {
            setScrollMode(isOverflowing ? 'content' : 'slide');
        }
    }, [isHomePage]);

    // iOS风格回弹动画
    const triggerBounceAnimation = useCallback((direction, intensity = 0.5) => {
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }
        
        setBounceDirection(direction);
        setIsBouncing(true);
        
        const maxBounceOffset = 30;
        const bounceOffset = Math.min(intensity * maxBounceOffset, maxBounceOffset);
        const offset = direction === 'up' ? -bounceOffset : bounceOffset;
        
        setPreviewOffset(offset);
        setIsPreviewingScroll(true);
        
        bounceTimerRef.current = setTimeout(() => {
            setIsPreviewingScroll(false);
            setPreviewOffset(0);
            
            setTimeout(() => {
                setIsBouncing(false);
                setBounceDirection('none');
            }, 300);
        }, 150);
    }, []);

    // 预览回弹处理
    const triggerPreviewBounceBack = useCallback(() => {
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }
        
        bounceTimerRef.current = setTimeout(() => {
            if (isPreviewingScroll && scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
                setIsPreviewingScroll(false);
                setPreviewOffset(0);
                scrollAccumulatorRef.current = 0;
            }
        }, 150);
    }, [isPreviewingScroll]);

    // 滚动预览处理
    const handleScrollPreview = useCallback((event) => {
        if (scrollMode !== 'content') {
            const direction = event.deltaY > 0 ? 1 : -1;
            
            const atBottomBoundary = direction > 0 && currentSection >= sections.length - 1;
            const atTopBoundary = direction < 0 && currentSection <= 0;
            
            let offsetMultiplier = 1;
            if (atBottomBoundary || atTopBoundary) {
                offsetMultiplier = 0.5;
            }
            
            const progress = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
            const maxOffset = (atBottomBoundary || atTopBoundary) ? 15 : PREVIEW_MAX_OFFSET;
            const offset = direction * progress * maxOffset * offsetMultiplier;
            
            if (!isPreviewingScroll) {
                setIsPreviewingScroll(true);
            }
            setPreviewOffset(offset);
            
            if (atBottomBoundary || atTopBoundary) {
                const intensity = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
                const bounceDirection = atBottomBoundary ? 'down' : 'up';
                
                if (bounceTimerRef.current) {
                    clearTimeout(bounceTimerRef.current);
                }
                
                bounceTimerRef.current = setTimeout(() => {
                    triggerBounceAnimation(bounceDirection, intensity);
                }, 100);
                
                return true;
            } else {
                triggerPreviewBounceBack();
                return false;
            }
        }
        return false;
    }, [scrollMode, currentSection, sections.length, isPreviewingScroll, triggerPreviewBounceBack, triggerBounceAnimation]);

    // 重置滚动状态
    const resetScrollState = useCallback(() => {
        scrollAccumulatorRef.current = 0;
        
        setIsPreviewingScroll(false);
        setPreviewOffset(0);
        setIsBouncing(false);
        setBounceDirection('none');
        
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }
        
        if (contentRef.current) {
            const sectionId = currentSectionConfig?.id;
            
            if (sectionId === 'home') {
                const container = contentRef.current;
                container.style.transform = 'translateY(0)';
                container.style.transition = 'none';
                container.scrollTop = 0;
                
                requestAnimationFrame(() => {
                    if (container) {
                        container.offsetHeight;
                        container.style.transition = '';
                    }
                });
                return;
            }
            
            const shouldScrollToBottom = () => {
                if (sectionScrollPositions[sectionId] !== undefined) {
                    return sectionScrollPositions[sectionId] === 'bottom';
                }
                
                if (isContentOverflowing) {
                    const previousDirection = currentSectionConfig?.previousDirection;
                    if (previousDirection === 'from-next') {
                        return true;
                    }
                }
                
                return false;
            };
            
            if (shouldScrollToBottom()) {
                requestAnimationFrame(() => {
                    if (contentRef.current) {
                        const maxScrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
                        contentRef.current.scrollTop = maxScrollTop;
                        contentRef.current.offsetHeight;
                    }
                });
            } else {
                contentRef.current.scrollTop = 0;
                contentRef.current.offsetHeight;
            }
        }
    }, [currentSectionConfig, isContentOverflowing, sectionScrollPositions]);

    // 滚轮事件处理
    const handleWheel = useCallback((event) => {
        const now = Date.now();
        if (isScrolling || isProjectModalOpen) return;
        
        // 内容滚动模式：优先处理内容滚动
        if (scrollMode === 'content' && isContentOverflowing && !isHomePage) {
            const container = contentRef.current;
            if (!container) return;
            
            const currentScrollTop = container.scrollTop;
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            const isScrollingDown = event.deltaY > 0;
            const isScrollingUp = event.deltaY < 0;
            
            const SCROLL_BOUNDARY_THRESHOLD = 50;
            
            if (isScrollingDown) {
                if (currentScrollTop >= maxScrollTop - SCROLL_BOUNDARY_THRESHOLD) {
                    if (now - lastWheelTimeRef.current > SCROLL_RESET_TIME) {
                        scrollAccumulatorRef.current = 0;
                    }
                    lastWheelTimeRef.current = now;
                    
                    if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
                        scrollAccumulatorRef.current += Math.abs(event.deltaY);
                        
                        if (currentScrollTop >= maxScrollTop - 5) {
                            const intensity = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
                            triggerBounceAnimation('down', intensity);
                        }
                        
                        if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD && currentSection < sections.length - 1) {
                            scrollAccumulatorRef.current = 0;
                            navigateNext();
                        }
                        return;
                    }
                } else {
                    scrollAccumulatorRef.current = 0;
                    return;
                }
            } else if (isScrollingUp) {
                if (currentScrollTop <= SCROLL_BOUNDARY_THRESHOLD) {
                    if (now - lastWheelTimeRef.current > SCROLL_RESET_TIME) {
                        scrollAccumulatorRef.current = 0;
                    }
                    lastWheelTimeRef.current = now;
                    
                    if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
                        scrollAccumulatorRef.current += Math.abs(event.deltaY);
                        
                        if (currentScrollTop <= 5) {
                            const intensity = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
                            triggerBounceAnimation('up', intensity);
                        }
                        
                        if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD && currentSection > 0) {
                            scrollAccumulatorRef.current = 0;
                            navigatePrev();
                        }
                        return;
                    }
                } else {
                    scrollAccumulatorRef.current = 0;
                    return;
                }
            }
            return;
        }
        // 分段滚动模式处理
        if (isHomePage || (!isContentOverflowing && scrollMode === 'slide')) {
            event.preventDefault();
        }
        
        if (now - lastWheelTimeRef.current > SCROLL_RESET_TIME) {
            if (isPreviewingScroll) {
                triggerPreviewBounceBack();
            } else {
                scrollAccumulatorRef.current = 0;
                setIsPreviewingScroll(false);
                setPreviewOffset(0);
            }
        }
        lastWheelTimeRef.current = now;
        
        const deltaY = Math.abs(event.deltaY);
        scrollAccumulatorRef.current += deltaY;
        // 记录滚动位置
        const container = contentRef.current;
        if (container && scrollMode === 'content' && isContentOverflowing) {
            const sectionId = currentSectionConfig?.id;
            const scrollTop = container.scrollTop;
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            const scrollPosition = scrollTop >= maxScrollTop - 10 ? 'bottom' : 
                                 scrollTop <= 10 ? 'top' : 'middle';
            
            setSectionScrollPositions(prev => ({
                ...prev,
                [sectionId]: scrollPosition
            }));
        }
        
        if (scrollMode !== 'content') {
            const isAtBoundary = handleScrollPreview(event);
            if (isAtBoundary) {
                return;
            }
        }
        
        if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
            return;
        }
        
        scrollAccumulatorRef.current = 0;
        setIsPreviewingScroll(false);
        setPreviewOffset(0);
        
        if (!container) return;

        const isScrollingDown = event.deltaY > 0;
        const isScrollingUp = event.deltaY < 0;

        if (isScrollingDown && currentSection < sections.length - 1) {
            navigateNext();
        } else if (isScrollingUp && currentSection > 0) {
            navigatePrev();
        }
    }, [isScrolling, isProjectModalOpen, scrollMode, isContentOverflowing, isHomePage, currentSection, sections.length, 
        navigateNext, navigatePrev, currentSectionConfig, isPreviewingScroll,
        setSectionScrollPositions, setIsPreviewingScroll, setPreviewOffset, triggerBounceAnimation, handleScrollPreview, triggerPreviewBounceBack]);

    // 键盘事件处理
    const handleKeyDown = useCallback((event) => {
        if (isScrolling || isProjectModalOpen) return;
        
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
                const num = parseInt(event.key);
                if (num >= 1 && num <= sections.length) {
                    event.preventDefault();
                    navigateToSection(num - 1);
                }
                break;
            }
        }
    }, [isScrolling, isProjectModalOpen, scrollMode, isContentOverflowing, isHomePage, currentSection, sections.length, navigateNext, navigatePrev, navigateToSection]);

    // 监听section变化，重置滚动状态
    useEffect(() => {
        setIsPreviewingScroll(false);
        setPreviewOffset(0);
        setIsBouncing(false);
        setBounceDirection('none');
        scrollAccumulatorRef.current = 0;
        
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }
        
        const resetTimer = setTimeout(() => {
            resetScrollState();
        }, 50);
        
        return () => {
            clearTimeout(resetTimer);
        };
    }, [currentSection, resetScrollState]);

    // 监听内容变化，检测溢出
    useEffect(() => {
        checkContentOverflow();
        
        const checkTimer1 = setTimeout(() => {
            checkContentOverflow();
        }, 150);
        
        const checkTimer2 = setTimeout(() => {
            checkContentOverflow();
        }, 500);
        
        const checkTimer3 = setTimeout(() => {
            checkContentOverflow();
        }, 1000);

        return () => {
            clearTimeout(checkTimer1);
            clearTimeout(checkTimer2);
            clearTimeout(checkTimer3);
        };
    }, [currentSection, checkContentOverflow]);

    // 事件监听器
    useEffect(() => {
        const container = containerRef.current;
        
        const handleResize = () => {
            setTimeout(() => {
                checkContentOverflow();
            }, 100);
        };
        
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            document.addEventListener('keydown', handleKeyDown);
            window.addEventListener('resize', handleResize);

            return () => {
                container.removeEventListener('wheel', handleWheel);
                document.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('resize', handleResize);
                
                if (bounceTimerRef.current) {
                    clearTimeout(bounceTimerRef.current);
                }
            };
        }
    }, [handleWheel, handleKeyDown, checkContentOverflow]);

    // 渲染当前section组件
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
                    {...(currentSectionConfig.id === 'home' ? {
                        sections: sections,
                        onSectionChange: navigateToSection,
                        enableOpeningAnimation: enableOpeningAnimation
                    } : {})}
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
            {/* 背景画布 */}
            {currentSectionConfig?.backgroundEffect && (
                <BackgroundCanvas 
                    effectType={currentSectionConfig.backgroundEffect}
                />
            )}

            {/* 主要内容容器 */}
            <div 
                ref={contentRef}
                className={`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${
                    isHomePage 
                        ? 'scroll-mode-home overflow-hidden' 
                        : isContentOverflowing 
                            ? 'scroll-mode-auto overflow-y-auto' 
                            : 'overflow-hidden'
                } ${isBouncing ? 'bouncing' : ''}`}
                style={{
                    transform: isPreviewingScroll && !isBouncing ? `translateY(${previewOffset}px)` : 'translateY(0)',
                    transition: isScrolling
                        ? 'none'
                        : isPreviewingScroll && !isBouncing
                            ? 'none' 
                            : isBouncing
                                ? 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                                : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: isScrolling || isPreviewingScroll || isBouncing ? 'transform' : 'auto'
                }}
            >
                {renderCurrentSection()}
            </div>

            {/* 过渡遮罩 */}
            {isScrolling && (
                <div className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300" />
            )}

        </div>
    );
};

export default SmartScrollManager;
