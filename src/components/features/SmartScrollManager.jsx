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

import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import BackgroundCanvas from '../background/BackgroundCanvas';
import webglResourceManager from '../../utils/WebGLResourceManager';
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
        isProjectModalOpen,
        isPointerLocked
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
    const [showPointerLockWarning, setShowPointerLockWarning] = useState(false);
    const bounceTimerRef = useRef();
    const pointerLockWarningTimeoutRef = useRef();
    const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
    const touchMoveAccumulatorRef = useRef(0);
    
    const isHomePage = currentSectionConfig?.id === 'home';

    // 智能资源管理：当section切换时，清理其他section的非持久资源
    useEffect(() => {
        if (currentSectionConfig?.id) {
            const currentSectionName = currentSectionConfig.id;
            
            // 延迟执行清理，给新section足够时间初始化资源
            const cleanupTimer = setTimeout(() => {
                // 智能清理：保留当前section和HeroCube（持久资源）
                // 延长延迟时间以确保背景效果有足够时间初始化
                const cleanedCount = webglResourceManager.cleanupOtherSections(
                    `BackgroundCanvas_${currentSectionName}`,
                    ['HeroCube'] // 额外保留HeroCube
                );
                
                if (import.meta.env.DEV && cleanedCount > 0) {
                    console.log(`🎯 Section切换到 "${currentSectionName}"，智能清理完成`);
                }
            }, 3000); // 进一步延长到3秒延迟，确保背景效果有充足时间稳定运行
            
            return () => clearTimeout(cleanupTimer);
        }
    }, [currentSectionConfig?.id]);

    // 滚动敏感度配置
    const DESKTOP_SCROLL_THRESHOLD = 600; // 桌面端保持原来的值
    const MOBILE_TOUCH_THRESHOLD = 200;   // 移动端触摸阈值调整为200，降低敏感度
    const SCROLL_RESET_TIME = 256;
    const PREVIEW_MAX_OFFSET = 80;

    // 触发指针锁定警告
    const triggerPointerLockWarning = useCallback(() => {
        console.log('触发指针锁定警告');
        setShowPointerLockWarning(true);
        
        // 清理之前的定时器
        if (pointerLockWarningTimeoutRef.current) {
            clearTimeout(pointerLockWarningTimeoutRef.current);
        }
        
        // 设置自动消失定时器
        pointerLockWarningTimeoutRef.current = setTimeout(() => {
            console.log('自动关闭警告');
            setShowPointerLockWarning(false);
        }, 3000);
    }, []);

    // 触摸事件处理 - 支持移动端滑动翻页
    const handleTouchStart = useCallback((event) => {
        if (isScrolling || isProjectModalOpen) return;
        
        const touch = event.touches[0];
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        };
        touchMoveAccumulatorRef.current = 0;
    }, [isScrolling, isProjectModalOpen]);

    const handleTouchMove = useCallback((event) => {
        if (isScrolling || isProjectModalOpen) return;
        
        const touch = event.touches[0];
        const deltaY = touch.clientY - touchStartRef.current.y;
        const deltaX = touch.clientX - touchStartRef.current.x;
        
        // 检查是否为垂直滑动（避免误触水平滑动）
        if (Math.abs(deltaX) > Math.abs(deltaY)) return;
        
        touchMoveAccumulatorRef.current = Math.abs(deltaY);
        
        // 指针锁定状态处理
        if (isPointerLocked) {
            if (touchMoveAccumulatorRef.current >= MOBILE_TOUCH_THRESHOLD) {
                touchMoveAccumulatorRef.current = 0;
                triggerPointerLockWarning();
            }
            return;
        }
        
        // 分段滚动模式处理 - 优先处理，确保主页和无内容溢出页面能正常翻页
        if (isHomePage || (!isContentOverflowing && scrollMode === 'slide')) {
            if (touchMoveAccumulatorRef.current >= MOBILE_TOUCH_THRESHOLD) {
                event.preventDefault();
                const isScrollingDown = deltaY < 0; // 向上滑动（显示下一页）
                const isScrollingUp = deltaY > 0;   // 向下滑动（显示上一页）
                
                touchMoveAccumulatorRef.current = 0; // 重置累积器
                
                if (isScrollingDown && currentSection < sections.length - 1) {
                    navigateNext();
                } else if (isScrollingUp && currentSection > 0) {
                    navigatePrev();
                }
            }
            return;
        }
        
        // 内容滚动模式处理 - 只在内容页面且有溢出时处理
        if (scrollMode === 'content' && isContentOverflowing && !isHomePage) {
            const container = contentRef.current;
            if (!container) return;
            
            const currentScrollTop = container.scrollTop;
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            const SCROLL_BOUNDARY_THRESHOLD = 50;
            
            // 检查是否在边界，如果在边界则进行页面切换
            const isAtTop = currentScrollTop <= SCROLL_BOUNDARY_THRESHOLD;
            const isAtBottom = currentScrollTop >= maxScrollTop - SCROLL_BOUNDARY_THRESHOLD;
            
            if (touchMoveAccumulatorRef.current >= MOBILE_TOUCH_THRESHOLD) {
                const isScrollingDown = deltaY < 0; // 向上滑动
                const isScrollingUp = deltaY > 0;   // 向下滑动
                
                if (isScrollingDown && isAtBottom && currentSection < sections.length - 1) {
                    event.preventDefault();
                    touchMoveAccumulatorRef.current = 0;
                    navigateNext();
                    return;
                } else if (isScrollingUp && isAtTop && currentSection > 0) {
                    event.preventDefault();
                    touchMoveAccumulatorRef.current = 0;
                    navigatePrev();
                    return;
                }
            }
            // 如果不在边界，让默认滚动行为继续
            return;
        }
    }, [isScrolling, isProjectModalOpen, isPointerLocked, scrollMode, isContentOverflowing, isHomePage, 
        currentSection, sections.length, navigateNext, navigatePrev, triggerPointerLockWarning]);

    const handleTouchEnd = useCallback(() => {
        touchMoveAccumulatorRef.current = 0;
    }, []);

    // 通知光标组件边界状态
    useEffect(() => {
        const bounceEvent = new CustomEvent('scrollBounce', {
            detail: { 
                isBouncing, 
                direction: bounceDirection,
                intensity: scrollAccumulatorRef.current / DESKTOP_SCROLL_THRESHOLD
            }
        });
        window.dispatchEvent(bounceEvent);
    }, [isBouncing, bounceDirection]);

    const sectionComponents = useMemo(() => ({
        home: HomeSection,
        about: AboutSection,
        projects: ProjectSection,
        gallery: GallerySection,
        education: EducationSection,
        contact: ContactSection
    }), []);

    // 检测内容溢出并设置滚动模式
    const checkContentOverflow = useCallback(() => {
        if (!contentRef.current) return;
        
        const container = contentRef.current;
        
        // 使用更可靠的方式检测溢出，确保首次检测准确性
        const containerRect = container.getBoundingClientRect();
        const isOverflowing = container.scrollHeight > containerRect.height + 10;
        
        // 移动端首次加载时的特殊处理 - 如果是长内容section，给予更多检测时间
        const isMobile = window.innerWidth < 768;
        const isLongContentSection = ['projects', 'education', 'about', 'contact'].includes(currentSectionConfig?.id);
        
        if (isMobile && isLongContentSection && !isOverflowing) {
            // 移动端长内容section如果首次检测未溢出，延迟再检测一次
            setTimeout(() => {
                if (contentRef.current) {
                    const updatedRect = contentRef.current.getBoundingClientRect();
                    const updatedOverflowing = contentRef.current.scrollHeight > updatedRect.height + 10;
                    
                    setIsContentOverflowing(updatedOverflowing);
                    const updatedMode = isHomePage ? 'slide' : (updatedOverflowing ? 'content' : 'slide');
                    setScrollMode(updatedMode);
                }
            }, 500); // 给更多时间让内容完全渲染
        }
        
        // 确保状态始终得到正确更新，特别是首次进入section时
        setIsContentOverflowing(isOverflowing);
        
        const newMode = isHomePage ? 'slide' : (isOverflowing ? 'content' : 'slide');
        setScrollMode(newMode);
    }, [isHomePage, currentSectionConfig]);

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
            // 使用 ref 避免闭包问题，减少依赖
            if (isPreviewingScroll && scrollAccumulatorRef.current < DESKTOP_SCROLL_THRESHOLD) {
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
            
            const progress = Math.min(scrollAccumulatorRef.current / DESKTOP_SCROLL_THRESHOLD, 1);
            const maxOffset = (atBottomBoundary || atTopBoundary) ? 15 : PREVIEW_MAX_OFFSET;
            const offset = direction * progress * maxOffset * offsetMultiplier;
            
            if (!isPreviewingScroll) {
                setIsPreviewingScroll(true);
            }
            setPreviewOffset(offset);
            
            if (atBottomBoundary || atTopBoundary) {
                const intensity = Math.min(scrollAccumulatorRef.current / DESKTOP_SCROLL_THRESHOLD, 1);
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
                    }
                });
            } else {
                contentRef.current.scrollTop = 0;
            }
        }
    }, [currentSectionConfig, isContentOverflowing, sectionScrollPositions]);

    // 滚轮事件处理
    const handleWheel = useCallback((event) => {
        const now = Date.now();
        if (isScrolling || isProjectModalOpen) return;
        
        // 检查指针锁定状态
        if (isPointerLocked) {
            const deltaY = Math.abs(event.deltaY);
            scrollAccumulatorRef.current += deltaY;
            
            // 当滚动累积超过阈值时显示警告
            if (scrollAccumulatorRef.current >= DESKTOP_SCROLL_THRESHOLD) {
                scrollAccumulatorRef.current = 0; // 重置累积器
                triggerPointerLockWarning();
            }
            return; // 阻止进一步的滚动处理
        }
        
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
                    
                    if (scrollAccumulatorRef.current < DESKTOP_SCROLL_THRESHOLD) {
                        scrollAccumulatorRef.current += Math.abs(event.deltaY);
                        
                        if (currentScrollTop >= maxScrollTop - 5) {
                            const intensity = Math.min(scrollAccumulatorRef.current / DESKTOP_SCROLL_THRESHOLD, 1);
                            triggerBounceAnimation('down', intensity);
                        }
                        
                        if (scrollAccumulatorRef.current >= DESKTOP_SCROLL_THRESHOLD && currentSection < sections.length - 1) {
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
                    
                    if (scrollAccumulatorRef.current < DESKTOP_SCROLL_THRESHOLD) {
                        scrollAccumulatorRef.current += Math.abs(event.deltaY);
                        
                        if (currentScrollTop <= 5) {
                            const intensity = Math.min(scrollAccumulatorRef.current / DESKTOP_SCROLL_THRESHOLD, 1);
                            triggerBounceAnimation('up', intensity);
                        }
                        
                        if (scrollAccumulatorRef.current >= DESKTOP_SCROLL_THRESHOLD && currentSection > 0) {
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
        // 记录滚动位置 - 优化对象创建
        const container = contentRef.current;
        if (container && scrollMode === 'content' && isContentOverflowing) {
            const sectionId = currentSectionConfig?.id;
            if (sectionId) {
                const scrollTop = container.scrollTop;
                const maxScrollTop = container.scrollHeight - container.clientHeight;
                const scrollPosition = scrollTop >= maxScrollTop - 10 ? 'bottom' : 
                                     scrollTop <= 10 ? 'top' : 'middle';
                
                // 只在位置真正改变时更新状态
                if (sectionScrollPositions[sectionId] !== scrollPosition) {
                    setSectionScrollPositions(prev => ({
                        ...prev,
                        [sectionId]: scrollPosition
                    }));
                }
            }
        }
        
        if (scrollMode !== 'content') {
            const isAtBoundary = handleScrollPreview(event);
            if (isAtBoundary) {
                return;
            }
        }
        
        if (scrollAccumulatorRef.current < DESKTOP_SCROLL_THRESHOLD) {
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
        navigateNext, navigatePrev, currentSectionConfig, isPreviewingScroll, sectionScrollPositions,
        setSectionScrollPositions, setIsPreviewingScroll, setPreviewOffset, triggerBounceAnimation, handleScrollPreview, triggerPreviewBounceBack, 
        isPointerLocked, triggerPointerLockWarning]);

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
        
        // 确保在状态重置后立即检测内容溢出
        const resetTimer = setTimeout(() => {
            resetScrollState();
            // 在重置后立即检测，确保滚动模式正确设置
            checkContentOverflow();
        }, 50);
        
        return () => {
            clearTimeout(resetTimer);
        };
    }, [currentSection, resetScrollState, checkContentOverflow]);

    // 监听内容变化，检测溢出 - 确保首次进入section时正确检测
    useEffect(() => {
        // 立即检测一次
        checkContentOverflow();
        
        // 针对移动端和长内容section的优化检测策略
        const isMobile = window.innerWidth < 768;
        const isLongContentSection = ['projects', 'education', 'about', 'contact'].includes(currentSectionConfig?.id);
        
        if (isMobile && isLongContentSection) {
            // 移动端长内容页面使用更密集的检测
            const checkTimers = [50, 100, 200, 300, 500, 800, 1200].map(delay => 
                setTimeout(() => {
                    checkContentOverflow();
                }, delay)
            );
            
            // 清理定时器的函数
            const clearTimers = () => checkTimers.forEach(timer => clearTimeout(timer));
            
            // 添加图片加载监听
            const handleImageLoad = () => {
                setTimeout(() => {
                    checkContentOverflow();
                }, 50);
            };
            
            // 保存 contentRef.current 的引用以避免闭包问题
            const currentContentRef = contentRef.current;
            
            // 监听容器内所有图片的加载
            if (currentContentRef) {
                const images = currentContentRef.querySelectorAll('img');
                images.forEach(img => {
                    if (img.complete) {
                        handleImageLoad();
                    } else {
                        img.addEventListener('load', handleImageLoad, { once: true });
                        img.addEventListener('error', handleImageLoad, { once: true });
                    }
                });
            }
            
            return () => {
                clearTimers();
                // 清理图片监听器
                if (currentContentRef) {
                    const images = currentContentRef.querySelectorAll('img');
                    images.forEach(img => {
                        img.removeEventListener('load', handleImageLoad);
                        img.removeEventListener('error', handleImageLoad);
                    });
                }
            };
        } else {
            // 非移动端或非长内容section使用原有的检测策略
            const checkTimer1 = setTimeout(() => {
                checkContentOverflow();
            }, 50);
            
            const checkTimer2 = setTimeout(() => {
                checkContentOverflow();
            }, 150);
            
            const checkTimer3 = setTimeout(() => {
                checkContentOverflow();
            }, 300);
            
            return () => {
                clearTimeout(checkTimer1);
                clearTimeout(checkTimer2);
                clearTimeout(checkTimer3);
            };
        }
        
    }, [currentSection, checkContentOverflow, currentSectionConfig]);

    // 事件监听器
    useEffect(() => {
        const container = containerRef.current;
        
        // 节流优化的 resize 处理器
        let resizeTimer;
        const handleResize = () => {
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(() => {
                checkContentOverflow();
            }, 100);
        };
        
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            container.addEventListener('touchstart', handleTouchStart, { passive: false });
            container.addEventListener('touchmove', handleTouchMove, { passive: false });
            container.addEventListener('touchend', handleTouchEnd, { passive: false });
            document.addEventListener('keydown', handleKeyDown);
            window.addEventListener('resize', handleResize);

            return () => {
                container.removeEventListener('wheel', handleWheel);
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
                document.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('resize', handleResize);
                
                if (bounceTimerRef.current) {
                    clearTimeout(bounceTimerRef.current);
                }
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }
            };
        }
    }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown, checkContentOverflow]);

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
            className="relative w-full m-0 p-0 h-screen"
            style={{ 
                overflow: 'hidden',
                height: 'var(--vh-fallback, 100vh)', // 支持自定义视口高度变量
                minHeight: '100dvh' // 动态视口高度作为最小高度
            }}
        >
            {/* 背景画布 */}
            {currentSectionConfig?.backgroundEffect && (
                <BackgroundCanvas 
                    effectType={currentSectionConfig.backgroundEffect}
                    sectionName={currentSectionConfig.id || 'unknown'}
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

            {/* 指针锁定警告提示 */}
            {showPointerLockWarning && (
                <div 
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
                    onClick={() => {
                        console.log('用户点击关闭警告');
                        setShowPointerLockWarning(false);
                        if (pointerLockWarningTimeoutRef.current) {
                            clearTimeout(pointerLockWarningTimeoutRef.current);
                        }
                    }}
                >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20 max-w-sm text-center shadow-2xl">
                        {/* 键盘图标 */}
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3h6l-3 2.25M12 5.25V7.5m0 0l3-2.25M12 7.5l-3-2.25M6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                        
                        {/* 主提示文字 */}
                        <div className="text-center mb-4">
                            <p className="text-xl font-semibold text-white mb-2 leading-relaxed">
                                {language === 'zh' 
                                    ? (
                                        <>
                                            请先按 <span className="inline-flex items-center px-2 py-1 mx-1 bg-white/20 rounded text-sm font-mono border border-white/30">ESC</span> 键
                                        </>
                                    )
                                    : (
                                        <>
                                            Press <span className="inline-flex items-center px-2 py-1 mx-1 bg-white/20 rounded text-sm font-mono border border-white/30">ESC</span> to exit
                                        </>
                                    )
                                }
                            </p>
                            <p className="text-sm text-white/70 leading-relaxed">
                                {language === 'zh' 
                                    ? '退出长廊后再翻页'
                                    : 'corridor before navigating'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SmartScrollManager;
