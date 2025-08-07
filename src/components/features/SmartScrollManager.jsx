import { useEffect, useCallback, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import BackgroundCanvas from '../background/BackgroundCanvas';
import '../../styles/SmartScroll.css';

// 懒加载各个栏目组件
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
        // 开场动画相关状态
        enableOpeningAnimation,
        // Modal状态
        isProjectModalOpen
    } = useAppStore();
    
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const currentSectionConfig = getCurrentSection();
    const lastWheelTimeRef = useRef(0);
    const scrollAccumulatorRef = useRef(0); // 滚动累积器
    
    // 滚动状态管理
    const [scrollMode, setScrollMode] = useState('slide'); // 'slide' | 'content' | 'hybrid'
    const [isContentOverflowing, setIsContentOverflowing] = useState(false);
    const [sectionScrollPositions, setSectionScrollPositions] = useState({}); // 记录各section的滚动位置
    const [isPreviewingScroll, setIsPreviewingScroll] = useState(false); // 预览滚动状态
    const [previewOffset, setPreviewOffset] = useState(0); // 预览偏移量
    const [isBouncing, setIsBouncing] = useState(false); // 回弹动画状态
    const [bounceDirection, setBounceDirection] = useState('none'); // 回弹方向
    const bounceTimerRef = useRef(); // 回弹定时器
    
    // 混合滚动模式：判断当前页面是否为 Home
    const isHomePage = currentSectionConfig?.id === 'home';

    // 滚动敏感度配置 - 优化后的参数
    const SCROLL_THRESHOLD = 600; // 进一步提高滚动阈值，防止误触发（从400增加到600）
    const SCROLL_RESET_TIME = 300; // 增加重置时间间隔，提高稳定性
    const PREVIEW_THRESHOLD = 200; // 提高预览动画阈值
    const PREVIEW_MAX_OFFSET = 80; // 最大预览偏移
    
    // 将回弹状态存储到全局状态，以便光标组件访问
    useEffect(() => {
        // 创建自定义事件来通知光标组件边界状态
        const bounceEvent = new CustomEvent('scrollBounce', {
            detail: { 
                isBouncing, 
                direction: bounceDirection,
                intensity: scrollAccumulatorRef.current / SCROLL_THRESHOLD
            }
        });
        window.dispatchEvent(bounceEvent);
    }, [isBouncing, bounceDirection]);

    // 组件映射
    const sectionComponents = {
        home: HomeSection,
        about: AboutSection,
        projects: ProjectSection,
        gallery: GallerySection,
        education: EducationSection,
        contact: ContactSection
    };

    // 检测内容是否超出视窗并实现混合滚动模式 - 优化为通用逻辑，增加稳定性检测
    const checkContentOverflow = useCallback(() => {
        if (!contentRef.current) return;
        
        const container = contentRef.current;
        
        // 强制重排和重绘，确保获取准确的尺寸
        container.offsetHeight; // 触发重排
        
        const isOverflowing = container.scrollHeight > container.clientHeight + 10; // 增加10px缓冲区，防止临界状态
        
        setIsContentOverflowing(isOverflowing);
        
        // 混合滚动模式逻辑 - 适用于所有页面
        if (isHomePage) {
            // Home 页面始终使用 slide 模式（隐藏滚动条）
            setScrollMode('slide');
        } else {
            // 所有其他页面根据内容溢出情况决定滚动模式
            if (isOverflowing) {
                setScrollMode('content'); // 任何内容溢出的页面都使用内容滚动模式
            } else {
                setScrollMode('slide'); // 内容不溢出时使用幻灯片模式
            }
        }
    }, [isHomePage]);

    // 处理iOS式回弹动画
    const triggerBounceAnimation = useCallback((direction, intensity = 0.5) => {
        // 清除之前的回弹定时器
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }
        
        // 设置回弹方向和强度
        setBounceDirection(direction);
        setIsBouncing(true);
        
        // 根据强度计算回弹偏移
        const maxBounceOffset = 30; // 最大回弹距离
        const bounceOffset = Math.min(intensity * maxBounceOffset, maxBounceOffset);
        const offset = direction === 'up' ? -bounceOffset : bounceOffset;
        
        setPreviewOffset(offset);
        setIsPreviewingScroll(true);
        
        // 300ms后开始回弹动画
        bounceTimerRef.current = setTimeout(() => {
            setIsPreviewingScroll(false);
            setPreviewOffset(0);
            
            // 再等300ms后结束回弹状态
            setTimeout(() => {
                setIsBouncing(false);
                setBounceDirection('none');
            }, 300);
        }, 150);
    }, []);

    // 重置滚动状态（切换section时）- 智能位置恢复，修复视觉故障
    const resetScrollState = useCallback(() => {
        scrollAccumulatorRef.current = 0; // 重置累积器
        
        // 立即清除所有动画状态，防止视觉故障
        setIsPreviewingScroll(false);
        setPreviewOffset(0);
        setIsBouncing(false);
        setBounceDirection('none');
        
        // 清除回弹定时器
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }
        
        if (contentRef.current) {
            const sectionId = currentSectionConfig?.id;
            
            // 对于Home页面，确保完全重置状态，防止动画干扰
            if (sectionId === 'home') {
                // 立即清除所有transform和动画状态
                const container = contentRef.current;
                container.style.transform = 'translateY(0)';
                container.style.transition = 'none';
                container.scrollTop = 0;
                
                // 强制重排确保状态一致性，然后恢复正常transition
                requestAnimationFrame(() => {
                    if (container) {
                        container.offsetHeight; // 触发重排
                        container.style.transition = '';
                    }
                });
                return;
            }
            
            // 根据导航方向和内容长度决定滚动位置 - 适用于所有有溢出内容的页面
            const shouldScrollToBottom = () => {
                // 如果有保存的滚动位置，且是从下一个section返回，则滚动到底部
                if (sectionScrollPositions[sectionId] !== undefined) {
                    return sectionScrollPositions[sectionId] === 'bottom';
                }
                
                // 对于任何有溢出内容的页面，从下一个section返回时滚动到底部
                if (isContentOverflowing) {
                    const previousDirection = currentSectionConfig?.previousDirection;
                    
                    // 如果是从后面的section返回的，应该定位到底部
                    if (previousDirection === 'from-next') {
                        return true;
                    }
                }
                
                return false;
            };
            
            if (shouldScrollToBottom()) {
                // 使用requestAnimationFrame确保DOM完全渲染后再滚动
                requestAnimationFrame(() => {
                    if (contentRef.current) {
                        const maxScrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
                        contentRef.current.scrollTop = maxScrollTop;
                        // 强制重排确保滚动位置正确
                        contentRef.current.offsetHeight;
                    }
                });
            } else {
                // 默认滚动到顶部
                contentRef.current.scrollTop = 0;
                // 强制重排确保滚动位置正确
                contentRef.current.offsetHeight;
            }
        }
    }, [currentSectionConfig, isContentOverflowing, sectionScrollPositions]);

    // 智能滚轮处理 - 混合滚动模式优化，增加iOS式预览动画，修复竞态条件
    const handleWheel = useCallback((event) => {
        const now = Date.now();
        // 在section切换期间或modal打开时阻止所有滚动事件
        if (isScrolling || isProjectModalOpen) return;
        
        // 内容滚动模式下，优先处理内容滚动，不进行累积计算
        if (scrollMode === 'content' && isContentOverflowing && !isHomePage) {
            const container = contentRef.current;
            if (!container) return;
            
            const currentScrollTop = container.scrollTop;
            const maxScrollTop = container.scrollHeight - container.clientHeight;
            const isScrollingDown = event.deltaY > 0;
            const isScrollingUp = event.deltaY < 0;
            
            // 更严格的边界检测，减少误触发
            const SCROLL_BOUNDARY_THRESHOLD = 50;
            
            if (isScrollingDown) {
                if (currentScrollTop >= maxScrollTop - SCROLL_BOUNDARY_THRESHOLD) {
                    // 到达内容底部，检查是否有足够的滚动累积
                    // 重置累积器如果时间间隔太长
                    if (now - lastWheelTimeRef.current > SCROLL_RESET_TIME) {
                        scrollAccumulatorRef.current = 0;
                    }
                    lastWheelTimeRef.current = now;
                    
                    if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
                        scrollAccumulatorRef.current += Math.abs(event.deltaY);
                        
                        // 如果已经到达真正的底部，触发回弹动画
                        if (currentScrollTop >= maxScrollTop - 5) {
                            const intensity = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
                            triggerBounceAnimation('down', intensity);
                        }
                        
                        if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD && currentSection < sections.length - 1) {
                            scrollAccumulatorRef.current = 0;
                            navigateNext();
                        }
                        return; // 不阻止默认滚动，但也不进行页面切换
                    }
                } else {
                    // 在内容中间滚动向下，完全交给浏览器处理
                    scrollAccumulatorRef.current = 0; // 重置累积器
                    return; // 让浏览器自然处理滚动
                }
            } else if (isScrollingUp) {
                if (currentScrollTop <= SCROLL_BOUNDARY_THRESHOLD) {
                    // 到达内容顶部，检查是否有足够的滚动累积
                    // 重置累积器如果时间间隔太长
                    if (now - lastWheelTimeRef.current > SCROLL_RESET_TIME) {
                        scrollAccumulatorRef.current = 0;
                    }
                    lastWheelTimeRef.current = now;
                    
                    if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
                        scrollAccumulatorRef.current += Math.abs(event.deltaY);
                        
                        // 如果已经到达真正的顶部，触发回弹动画
                        if (currentScrollTop <= 5) {
                            const intensity = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
                            triggerBounceAnimation('up', intensity);
                        }
                        
                        if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD && currentSection > 0) {
                            scrollAccumulatorRef.current = 0;
                            navigatePrev();
                        }
                        return; // 不阻止默认滚动，但也不进行页面切换
                    }
                } else {
                    // 在内容中间滚动向上，完全交给浏览器处理
                    scrollAccumulatorRef.current = 0; // 重置累积器
                    return; // 让浏览器自然处理滚动
                }
            }
            return; // 内容滚动模式下直接返回
        }
        
        // 非内容滚动模式下的处理（Home页面和非溢出页面）
        if (isHomePage || (!isContentOverflowing && scrollMode === 'slide')) {
            event.preventDefault();
        }
        
        // 重置累积器如果时间间隔太长
        if (now - lastWheelTimeRef.current > SCROLL_RESET_TIME) {
            scrollAccumulatorRef.current = 0;
            // 重置预览状态
            if (isPreviewingScroll) {
                setIsPreviewingScroll(false);
                setPreviewOffset(0);
            }
        }
        lastWheelTimeRef.current = now;
        
        // 累积滚动距离（仅在非内容滚动模式下）
        const deltaY = Math.abs(event.deltaY);
        scrollAccumulatorRef.current += deltaY;
        
        // 记录当前section的滚动位置（仅在内容滚动模式下）
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
        
        // 预览动画逻辑 - 在达到阈值前显示方向提示（仅在非内容滚动模式下）
        if (scrollMode !== 'content' && scrollAccumulatorRef.current >= PREVIEW_THRESHOLD && scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
            if (!isPreviewingScroll) {
                setIsPreviewingScroll(true);
            }
            // 计算预览偏移量
            const progress = (scrollAccumulatorRef.current - PREVIEW_THRESHOLD) / (SCROLL_THRESHOLD - PREVIEW_THRESHOLD);
            const offset = Math.min(progress * PREVIEW_MAX_OFFSET, PREVIEW_MAX_OFFSET);
            setPreviewOffset(event.deltaY > 0 ? offset : -offset);
        }
        
        // 检查边界条件并触发回弹动画（幻灯片模式）
        if (scrollMode !== 'content') {
            const atBottomBoundary = event.deltaY > 0 && currentSection >= sections.length - 1;
            const atTopBoundary = event.deltaY < 0 && currentSection <= 0;
            
            if (atBottomBoundary || atTopBoundary) {
                // 在边界时触发回弹动画
                const intensity = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
                const direction = atBottomBoundary ? 'down' : 'up';
                triggerBounceAnimation(direction, intensity);
                
                // 如果累积足够大，重置累积器（防止持续触发）
                if (scrollAccumulatorRef.current >= SCROLL_THRESHOLD) {
                    scrollAccumulatorRef.current = 0;
                    setIsPreviewingScroll(false);
                    setPreviewOffset(0);
                }
                return; // 边界状态不进行页面切换
            }
        }
        
        // 只有累积超过阈值才触发section切换（仅在非内容滚动模式下）
        if (scrollAccumulatorRef.current < SCROLL_THRESHOLD) {
            return;
        }
        
        // 重置累积器和预览状态
        scrollAccumulatorRef.current = 0;
        setIsPreviewingScroll(false);
        setPreviewOffset(0);
        
        if (!container) return;

        const isScrollingDown = event.deltaY > 0;
        const isScrollingUp = event.deltaY < 0;

        // 幻灯片模式 - 直接切换section（带边界检查）
        if (isScrollingDown && currentSection < sections.length - 1) {
            navigateNext();
        } else if (isScrollingUp && currentSection > 0) {
            navigatePrev();
        }
    }, [isScrolling, isProjectModalOpen, scrollMode, isContentOverflowing, isHomePage, currentSection, sections.length, 
        navigateNext, navigatePrev, currentSectionConfig, isPreviewingScroll,
        setSectionScrollPositions, setIsPreviewingScroll, setPreviewOffset, triggerBounceAnimation]);

    // 键盘事件处理（混合滚动模式优化）
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
                // 数字键 1-6 直接跳转到对应栏目
                const num = parseInt(event.key);
                if (num >= 1 && num <= sections.length) {
                    event.preventDefault();
                    navigateToSection(num - 1);
                }
                break;
            }
        }
    }, [isScrolling, isProjectModalOpen, scrollMode, isContentOverflowing, isHomePage, currentSection, sections.length, navigateNext, navigatePrev, navigateToSection]);

    // 监听section变化，重置滚动状态 - 添加更严格的状态清理
    useEffect(() => {
        // 立即清理所有动画状态
        setIsPreviewingScroll(false);
        setPreviewOffset(0);
        setIsBouncing(false);
        setBounceDirection('none');
        scrollAccumulatorRef.current = 0;
        
        // 清理定时器
        if (bounceTimerRef.current) {
            clearTimeout(bounceTimerRef.current);
        }
        
        // 等待DOM稳定后再重置滚动状态
        const resetTimer = setTimeout(() => {
            resetScrollState();
        }, 50);
        
        return () => {
            clearTimeout(resetTimer);
        };
    }, [currentSection, resetScrollState]);

    // 监听内容变化，检测溢出 - 增加多次检测和稳定性保证
    useEffect(() => {
        // 立即检测一次
        checkContentOverflow();
        
        // 延迟检测，确保内容已完全渲染
        const checkTimer1 = setTimeout(() => {
            checkContentOverflow();
        }, 150);
        
        // 再次延迟检测，确保图片等资源加载完成
        const checkTimer2 = setTimeout(() => {
            checkContentOverflow();
        }, 500);
        
        // 最后一次检测，确保动态内容都已加载
        const checkTimer3 = setTimeout(() => {
            checkContentOverflow();
        }, 1000);

        return () => {
            clearTimeout(checkTimer1);
            clearTimeout(checkTimer2);
            clearTimeout(checkTimer3);
        };
    }, [currentSection, checkContentOverflow]);

    // 添加事件监听器 - 包含窗口大小变化监听
    useEffect(() => {
        const container = containerRef.current;
        
        // 窗口大小变化时重新检测内容溢出
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
                
                // 清理回弹定时器
                if (bounceTimerRef.current) {
                    clearTimeout(bounceTimerRef.current);
                }
            };
        }
    }, [handleWheel, handleKeyDown, checkContentOverflow]);

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

            {/* 当前栏目内容 - 混合滚动容器，支持预览动画和回弹动画 */}
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
                        ? 'none' // 在section切换期间禁用所有动画
                        : isPreviewingScroll && !isBouncing
                            ? 'none' 
                            : isBouncing
                                ? 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' // iOS式回弹曲线
                                : 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // 普通过渡
                    willChange: isScrolling || isPreviewingScroll || isBouncing ? 'transform' : 'auto'
                }}
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
