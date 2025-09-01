/**
 * SmartScrollManager - 智能滚动管理器 (最终优化版)
 *
 * 功能概述：
 * - 管理整个应用的滚动行为，提供自适应的滚动模式
 * - slide: 分段滚动模式（适用于全屏section）
 * - content: 内容滚动模式（适用于长内容页面）
 * - hybrid: 混合模式，根据内容自动切换
 *
 * 核心特性：
 * 1. 智能检测内容溢出，自动切换滚动模式
 * 2. iOS风格的边界回弹效果
 * 3. 滚动预览和累积检测
 * 4. 懒加载section组件
 * 5. 智能资源管理
 * 6. 移动端触摸支持
 * 7. 键盘导航支持
 *
 * 技术架构：
 * - 基于 React Hooks 的状态管理
 * - 事件监听器的统一管理
 * - 性能优化的滚动检测
 * - WebGL 资源的智能清理
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
    // ========================================================================================
    // Store 和基础状态管理
    // ========================================================================================
    const {
        currentSection,
        sections,
        navigateToSection,
        navigateNext,
        navigatePrev,
        isScrolling,
        getCurrentSectionData,
        language,
        enableOpeningAnimation,
        isProjectModalOpen,
    } = useAppStore();

    // ========================================================================================
    // 配置常量 - 统一管理所有滚动相关阈值
    // ========================================================================================
    const SCROLL_CONFIG = {
        DESKTOP_THRESHOLD: 600, // 桌面端滚轮累积阈值
        MOBILE_THRESHOLD: 200, // 移动端触摸累积阈值
        RESET_TIME: 256, // 滚动重置时间间隔(ms)
        PREVIEW_MAX_OFFSET: 80, // 预览滚动最大偏移量
        BOUNDARY_THRESHOLD: 50, // 边界检测阈值
        BOUNCE_MAX_OFFSET: 30, // 回弹动画最大偏移量
        LONG_CONTENT_SECTIONS: ['projects', 'education', 'about', 'contact', 'gallery'], // 长内容页面列表
    };

    // 从配置中解构常用值
    const {
        DESKTOP_THRESHOLD,
        MOBILE_THRESHOLD,
        RESET_TIME,
        PREVIEW_MAX_OFFSET,
        BOUNDARY_THRESHOLD,
        BOUNCE_MAX_OFFSET,
        LONG_CONTENT_SECTIONS,
    } = SCROLL_CONFIG;

    // ========================================================================================
    // Refs 和状态管理
    // ========================================================================================
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const lastWheelTimeRef = useRef(0);
    const scrollAccumulatorRef = useRef(0);
    const bounceTimerRef = useRef();
    const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
    const touchMoveAccumulatorRef = useRef(0);

    // 基础状态
    const [scrollMode, setScrollMode] = useState('slide');
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    const [sectionScrollPositions, setSectionScrollPositions] = useState({});
    const [isPreviewingScroll, setIsPreviewingScroll] = useState(false);
    const [previewOffset, setPreviewOffset] = useState(0);
    const [isBouncing, setIsBouncing] = useState(false);
    const [bounceDirection, setBounceDirection] = useState('none');

    // 派生状态 - 统一判断逻辑
    const currentSectionData = getCurrentSectionData();
    const isHomePage = currentSectionData?.id === 'home';
    const isLongContentSection = LONG_CONTENT_SECTIONS.includes(currentSectionData?.id);

    // ========================================================================================
    // 智能资源管理 - WebGL 资源清理
    // ========================================================================================
    useEffect(() => {
        if (currentSectionData?.id) {
            const currentSectionName = currentSectionData.id;

            // 延迟执行清理，给新section足够时间初始化资源
            const cleanupTimer = setTimeout(() => {
                const cleanedCount = webglResourceManager.cleanupOtherSections(
                    `BackgroundCanvas_${currentSectionName}`,
                    ['HeroCube'] // 保留HeroCube持久资源
                );

                if (import.meta.env.DEV && cleanedCount > 0) {
                    console.log(`🎯 Section切换到 "${currentSectionName}"，智能清理完成`);
                }
            }, 3000); // 3秒延迟确保背景效果稳定运行

            return () => clearTimeout(cleanupTimer);
        }
    }, [currentSectionData?.id]);

    // ========================================================================================
    // 工具函数 - 边界检测
    // ========================================================================================
    const checkScrollBoundary = useCallback(
        container => {
            if (!container)
                return { isAtTop: false, isAtBottom: false, currentScrollTop: 0, maxScrollTop: 0 };

            const currentScrollTop = container.scrollTop;
            const maxScrollTop = container.scrollHeight - container.clientHeight;

            return {
                isAtTop: currentScrollTop <= BOUNDARY_THRESHOLD,
                isAtBottom: currentScrollTop >= maxScrollTop - BOUNDARY_THRESHOLD,
                currentScrollTop,
                maxScrollTop,
            };
        },
        [BOUNDARY_THRESHOLD]
    );

    // ========================================================================================
    // 组件映射 - 懒加载配置
    // ========================================================================================
    const sectionComponents = useMemo(
        () => ({
            home: HomeSection,
            about: AboutSection,
            projects: ProjectSection,
            gallery: GallerySection,
            education: EducationSection,
            contact: ContactSection,
        }),
        []
    );

    // ========================================================================================
    // 内容溢出检测 - 核心滚动模式切换逻辑
    // ========================================================================================
    const checkContentOverflow = useCallback(() => {
        if (!contentRef.current) return;

        const container = contentRef.current;
        const containerRect = container.getBoundingClientRect();
        const isOverflowing = container.scrollHeight > containerRect.height + 10;

        // 移动端长内容页面的特殊处理
        const isMobile = window.innerWidth < 768;
        if (isMobile && isLongContentSection && !isOverflowing) {
            // 延迟再次检测，确保内容完全渲染
            setTimeout(() => {
                if (contentRef.current) {
                    const updatedRect = contentRef.current.getBoundingClientRect();
                    const updatedOverflowing =
                        contentRef.current.scrollHeight > updatedRect.height + 10;

                    setIsContentOverflowing(updatedOverflowing);
                    const updatedMode = isHomePage
                        ? 'slide'
                        : updatedOverflowing
                          ? 'content'
                          : 'slide';
                    setScrollMode(updatedMode);
                }
            }, 500);
        }

        // 更新状态
        setIsContentOverflowing(isOverflowing);
        const newMode = isHomePage ? 'slide' : isOverflowing ? 'content' : 'slide';
        setScrollMode(newMode);
    }, [isHomePage, isLongContentSection]);

    // ========================================================================================
    // 动画效果 - iOS风格回弹和预览
    // ========================================================================================

    // iOS风格回弹动画
    const triggerBounceAnimation = useCallback(
        (direction, intensity = 0.5) => {
            if (bounceTimerRef.current) {
                clearTimeout(bounceTimerRef.current);
            }

            setBounceDirection(direction);
            setIsBouncing(true);

            const bounceOffset = Math.min(intensity * BOUNCE_MAX_OFFSET, BOUNCE_MAX_OFFSET);
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
        },
        [BOUNCE_MAX_OFFSET]
    );

    // 预览回弹处理
    const triggerPreviewBounceBack = useCallback(() => {
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }

        bounceTimerRef.current = setTimeout(() => {
            if (isPreviewingScroll && scrollAccumulatorRef.current < DESKTOP_THRESHOLD) {
                setIsPreviewingScroll(false);
                setPreviewOffset(0);
                scrollAccumulatorRef.current = 0;
            }
        }, 150);
    }, [isPreviewingScroll, DESKTOP_THRESHOLD]);

    // 滚动预览处理
    const handleScrollPreview = useCallback(
        event => {
            if (scrollMode !== 'content') {
                const direction = event.deltaY > 0 ? 1 : -1;
                const atBottomBoundary = direction > 0 && currentSection >= sections.length - 1;
                const atTopBoundary = direction < 0 && currentSection <= 0;

                let offsetMultiplier = 1;
                if (atBottomBoundary || atTopBoundary) {
                    offsetMultiplier = 0.5;
                }

                const progress = Math.min(scrollAccumulatorRef.current / DESKTOP_THRESHOLD, 1);
                const maxOffset = atBottomBoundary || atTopBoundary ? 15 : PREVIEW_MAX_OFFSET;
                const offset = direction * progress * maxOffset * offsetMultiplier;

                if (!isPreviewingScroll) {
                    setIsPreviewingScroll(true);
                }
                setPreviewOffset(offset);

                if (atBottomBoundary || atTopBoundary) {
                    const intensity = Math.min(scrollAccumulatorRef.current / DESKTOP_THRESHOLD, 1);
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
        },
        [
            scrollMode,
            currentSection,
            sections.length,
            isPreviewingScroll,
            triggerPreviewBounceBack,
            triggerBounceAnimation,
            DESKTOP_THRESHOLD,
            PREVIEW_MAX_OFFSET,
        ]
    );

    // ========================================================================================
    // 滚动状态重置 - Section切换时的状态管理
    // ========================================================================================
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
            const sectionId = currentSectionData?.id;

            // 主页特殊处理
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

            // 其他页面的滚动位置恢复
            const shouldScrollToBottom = () => {
                if (sectionScrollPositions[sectionId] !== undefined) {
                    return sectionScrollPositions[sectionId] === 'bottom';
                }

                if (isContentOverflowing) {
                    const previousDirection = currentSectionData?.previousDirection;
                    if (previousDirection === 'from-next') {
                        return true;
                    }
                }

                return false;
            };

            if (shouldScrollToBottom()) {
                requestAnimationFrame(() => {
                    if (contentRef.current) {
                        const maxScrollTop =
                            contentRef.current.scrollHeight - contentRef.current.clientHeight;
                        contentRef.current.scrollTop = maxScrollTop;
                    }
                });
            } else {
                contentRef.current.scrollTop = 0;
            }
        }
    }, [currentSectionData, isContentOverflowing, sectionScrollPositions]);

    // ========================================================================================
    // 事件处理器 - 触摸事件 (移动端支持)
    // ========================================================================================

    // 触摸开始
    const handleTouchStart = useCallback(
        event => {
            if (isScrolling || isProjectModalOpen) return;

            const touch = event.touches[0];
            touchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now(),
            };
            touchMoveAccumulatorRef.current = 0;
        },
        [isScrolling, isProjectModalOpen]
    );

    // 触摸移动 - 核心滑动逻辑
    const handleTouchMove = useCallback(
        event => {
            if (isScrolling || isProjectModalOpen) return;

            const touch = event.touches[0];
            const deltaY = touch.clientY - touchStartRef.current.y;
            const deltaX = touch.clientX - touchStartRef.current.x;

            // 检查是否为垂直滑动
            if (Math.abs(deltaX) > Math.abs(deltaY)) return;

            touchMoveAccumulatorRef.current = Math.abs(deltaY);

            // 分段滚动模式处理
            if (isHomePage || (!isContentOverflowing && scrollMode === 'slide')) {
                if (touchMoveAccumulatorRef.current >= MOBILE_THRESHOLD) {
                    event.preventDefault();
                    const isScrollingDown = deltaY < 0;
                    const isScrollingUp = deltaY > 0;

                    touchMoveAccumulatorRef.current = 0;

                    if (isScrollingDown && currentSection < sections.length - 1) {
                        navigateNext();
                    } else if (isScrollingUp && currentSection > 0) {
                        navigatePrev();
                    }
                }
                return;
            }

            // 内容滚动模式处理
            if (scrollMode === 'content' && isContentOverflowing && !isHomePage) {
                const container = contentRef.current;
                if (!container) return;

                const { isAtTop, isAtBottom } = checkScrollBoundary(container);

                if (touchMoveAccumulatorRef.current >= MOBILE_THRESHOLD) {
                    const isScrollingDown = deltaY < 0;
                    const isScrollingUp = deltaY > 0;

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
            }
        },
        [
            isScrolling,
            isProjectModalOpen,
            scrollMode,
            isContentOverflowing,
            isHomePage,
            currentSection,
            sections.length,
            navigateNext,
            navigatePrev,
            checkScrollBoundary,
            MOBILE_THRESHOLD,
        ]
    );

    // 触摸结束
    const handleTouchEnd = useCallback(() => {
        touchMoveAccumulatorRef.current = 0;
    }, []);

    // ========================================================================================
    // 事件处理器 - 滚轮事件 (桌面端支持)
    // ========================================================================================
    const handleWheel = useCallback(
        event => {
            const now = Date.now();
            if (isScrolling || isProjectModalOpen) return;

            // 内容滚动模式：优先处理内容滚动
            if (scrollMode === 'content' && isContentOverflowing && !isHomePage) {
                const container = contentRef.current;
                if (!container) return;

                const { isAtTop, isAtBottom, currentScrollTop, maxScrollTop } =
                    checkScrollBoundary(container);
                const isScrollingDown = event.deltaY > 0;
                const isScrollingUp = event.deltaY < 0;

                if (isScrollingDown) {
                    if (isAtBottom) {
                        if (now - lastWheelTimeRef.current > RESET_TIME) {
                            scrollAccumulatorRef.current = 0;
                        }
                        lastWheelTimeRef.current = now;

                        if (scrollAccumulatorRef.current < DESKTOP_THRESHOLD) {
                            scrollAccumulatorRef.current += Math.abs(event.deltaY);

                            if (currentScrollTop >= maxScrollTop - 5) {
                                const intensity = Math.min(
                                    scrollAccumulatorRef.current / DESKTOP_THRESHOLD,
                                    1
                                );
                                triggerBounceAnimation('down', intensity);
                            }

                            if (
                                scrollAccumulatorRef.current >= DESKTOP_THRESHOLD &&
                                currentSection < sections.length - 1
                            ) {
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
                    if (isAtTop) {
                        if (now - lastWheelTimeRef.current > RESET_TIME) {
                            scrollAccumulatorRef.current = 0;
                        }
                        lastWheelTimeRef.current = now;

                        if (scrollAccumulatorRef.current < DESKTOP_THRESHOLD) {
                            scrollAccumulatorRef.current += Math.abs(event.deltaY);

                            if (currentScrollTop <= 5) {
                                const intensity = Math.min(
                                    scrollAccumulatorRef.current / DESKTOP_THRESHOLD,
                                    1
                                );
                                triggerBounceAnimation('up', intensity);
                            }

                            if (
                                scrollAccumulatorRef.current >= DESKTOP_THRESHOLD &&
                                currentSection > 0
                            ) {
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

            if (now - lastWheelTimeRef.current > RESET_TIME) {
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
                const sectionId = currentSectionData?.id;
                if (sectionId) {
                    const { currentScrollTop, maxScrollTop } = checkScrollBoundary(container);
                    const scrollPosition =
                        currentScrollTop >= maxScrollTop - 10
                            ? 'bottom'
                            : currentScrollTop <= 10
                              ? 'top'
                              : 'middle';

                    if (sectionScrollPositions[sectionId] !== scrollPosition) {
                        setSectionScrollPositions(prev => ({
                            ...prev,
                            [sectionId]: scrollPosition,
                        }));
                    }
                }
            }

            // 预览处理
            if (scrollMode !== 'content') {
                const isAtBoundary = handleScrollPreview(event);
                if (isAtBoundary) {
                    return;
                }
            }

            if (scrollAccumulatorRef.current < DESKTOP_THRESHOLD) {
                return;
            }

            // 执行页面切换
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
        },
        [
            isScrolling,
            isProjectModalOpen,
            scrollMode,
            isContentOverflowing,
            isHomePage,
            currentSection,
            sections.length,
            navigateNext,
            navigatePrev,
            currentSectionData,
            isPreviewingScroll,
            sectionScrollPositions,
            triggerBounceAnimation,
            handleScrollPreview,
            triggerPreviewBounceBack,
            checkScrollBoundary,
            RESET_TIME,
            DESKTOP_THRESHOLD,
        ]
    );

    // ========================================================================================
    // 事件处理器 - 键盘事件 (键盘导航支持)
    // ========================================================================================
    const handleKeyDown = useCallback(
        event => {
            if (isScrolling || isProjectModalOpen) return;

            const container = contentRef.current;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    if (
                        scrollMode === 'content' &&
                        isContentOverflowing &&
                        !isHomePage &&
                        container
                    ) {
                        const { isAtBottom, maxScrollTop } = checkScrollBoundary(container);
                        if (isAtBottom) {
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
                    if (
                        scrollMode === 'content' &&
                        isContentOverflowing &&
                        !isHomePage &&
                        container
                    ) {
                        const { isAtTop } = checkScrollBoundary(container);
                        if (isAtTop) {
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
                        const { maxScrollTop } = checkScrollBoundary(container);
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
        },
        [
            isScrolling,
            isProjectModalOpen,
            scrollMode,
            isContentOverflowing,
            isHomePage,
            currentSection,
            sections.length,
            navigateNext,
            navigatePrev,
            navigateToSection,
            checkScrollBoundary,
        ]
    );

    // ========================================================================================
    // 边界通知 - 光标组件状态同步
    // ========================================================================================
    useEffect(() => {
        const bounceEvent = new CustomEvent('scrollBounce', {
            detail: {
                isBouncing,
                direction: bounceDirection,
                intensity: scrollAccumulatorRef.current / DESKTOP_THRESHOLD,
            },
        });
        window.dispatchEvent(bounceEvent);
    }, [isBouncing, bounceDirection, DESKTOP_THRESHOLD]);

    // ========================================================================================
    // Effect Hooks - 生命周期管理
    // ========================================================================================

    // Section切换时的状态重置
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
            checkContentOverflow();
        }, 50);

        return () => {
            clearTimeout(resetTimer);
        };
    }, [currentSection, resetScrollState, checkContentOverflow]);

    // 内容变化时的溢出检测
    useEffect(() => {
        checkContentOverflow();

        const isMobile = window.innerWidth < 768;

        if (isMobile && isLongContentSection) {
            // 移动端长内容页面使用密集检测
            const checkTimers = [50, 100, 200, 300, 500, 800, 1200].map(delay =>
                setTimeout(() => {
                    checkContentOverflow();
                }, delay)
            );

            const clearTimers = () => checkTimers.forEach(timer => clearTimeout(timer));

            // 图片加载监听
            const handleImageLoad = () => {
                setTimeout(() => {
                    checkContentOverflow();
                }, 50);
            };

            const currentContentRef = contentRef.current;
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
                if (currentContentRef) {
                    const images = currentContentRef.querySelectorAll('img');
                    images.forEach(img => {
                        img.removeEventListener('load', handleImageLoad);
                        img.removeEventListener('error', handleImageLoad);
                    });
                }
            };
        } else {
            // 标准检测策略
            const checkTimer1 = setTimeout(() => checkContentOverflow(), 50);
            const checkTimer2 = setTimeout(() => checkContentOverflow(), 150);
            const checkTimer3 = setTimeout(() => checkContentOverflow(), 300);

            return () => {
                clearTimeout(checkTimer1);
                clearTimeout(checkTimer2);
                clearTimeout(checkTimer3);
            };
        }
    }, [currentSection, checkContentOverflow, isLongContentSection]);

    // 事件监听器注册
    useEffect(() => {
        const container = containerRef.current;

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
    }, [
        handleWheel,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        handleKeyDown,
        checkContentOverflow,
    ]);

    // ========================================================================================
    // 渲染函数 - Section组件渲染
    // ========================================================================================
    const renderCurrentSection = () => {
        if (!currentSectionData) return null;

        const SectionComponent = sectionComponents[currentSectionData.id];
        if (!SectionComponent) return null;

        return (
            <Suspense
                fallback={
                    <div className="flex items-center justify-center h-full">
                        <div className="text-white text-xl">Loading...</div>
                    </div>
                }
            >
                <SectionComponent
                    section={currentSectionData}
                    language={language}
                    {...(currentSectionData.id === 'home'
                        ? {
                              sections: sections,
                              onSectionChange: navigateToSection,
                              enableOpeningAnimation: enableOpeningAnimation,
                          }
                        : {})}
                />
            </Suspense>
        );
    };

    // ========================================================================================
    // 主渲染 - 组件结构
    // ========================================================================================
    return (
        <div
            ref={containerRef}
            className="relative w-full m-0 p-0 h-screen"
            style={{
                overflow: 'hidden',
                height: 'var(--vh-fallback, 100vh)', // 支持自定义视口高度
                minHeight: '100dvh', // 动态视口高度
            }}
        >
            {/* 背景画布 - WebGL效果渲染 */}
            {currentSectionData?.backgroundEffect && (
                <BackgroundCanvas
                    effectType={currentSectionData.backgroundEffect}
                    sectionName={currentSectionData.id || 'unknown'}
                />
            )}

            {/* 主要内容容器 - 智能滚动容器 */}
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
                    transform:
                        isPreviewingScroll && !isBouncing
                            ? `translateY(${previewOffset}px)`
                            : 'translateY(0)',
                    transition: isScrolling
                        ? 'none'
                        : isPreviewingScroll && !isBouncing
                          ? 'none'
                          : isBouncing
                            ? 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                            : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange:
                        isScrolling || isPreviewingScroll || isBouncing ? 'transform' : 'auto',
                }}
            >
                {renderCurrentSection()}
            </div>

            {/* 过渡遮罩 - 切换时的视觉缓冲 */}
            {isScrolling && (
                <div className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-300" />
            )}
        </div>
    );
};

export default SmartScrollManager;
