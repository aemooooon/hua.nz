/**
 * SmartDirectionalCursor
 *
 * 这个入口组件只做 orchestration：
 * - 读取全局 section / theme 状态
 * - 组合鼠标追踪、热点检测和滚动力度 hooks
 * - 把稳定的模式状态传给纯展示组件
 *
 * 鼠标坐标本身不进入 React state，而是通过 CSS variables + requestAnimationFrame
 * 直接写到 cursor DOM 节点上。这样鼠标移动时不会触发每帧 React render，低性能
 * Windows 设备上会更稳。
 */
import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import PowerDirectionalIndicator from './cursor/PowerDirectionalIndicator';
import './cursor/SmartDirectionalCursor.css';
import { useClickableHitTest } from './cursor/useClickableHitTest';
import { useCursorMotion } from './cursor/useCursorMotion';
import { useDeviceProfile } from './cursor/useDeviceProfile';
import { useScrollForce } from './cursor/useScrollForce';
import { getAbsoluteBoundaryState, getAvailableDirections } from './cursor/cursorUtils';

const SmartDirectionalCursor = () => {
    const { getThemeColors } = useTheme();
    const themeColors = getThemeColors();
    const { currentSection, getText, sections, isPointerLocked } = useAppStore();
    const { isMobile, isWindows } = useDeviceProfile();
    const getIsClickableAtPoint = useClickableHitTest();
    const scrollState = useScrollForce();
    const containerRef = useRef(null);

    const {
        powerCursorRef,
        clickableHintRef,
        homeHintRef,
        isVisible,
        isHovering,
        isOverClickable,
    } = useCursorMotion({
        getIsClickableAtPoint,
    });

    useEffect(() => {
        if (!isWindows) return;

        console.log('🖱️ SmartDirectionalCursor: Windows设备检测');
        console.log('📱 isMobile():', isMobile());
        console.log('🖥️ 窗口尺寸:', window.innerWidth, 'x', window.innerHeight);
        console.log('🎯 媒体查询 hover支持:', window.matchMedia('(hover: hover)').matches);
        console.log('🎯 媒体查询 pointer精细:', window.matchMedia('(pointer: fine)').matches);
        console.log('🎯 媒体查询 hover无:', window.matchMedia('(hover: none)').matches);
        console.log('🎯 媒体查询 pointer粗糙:', window.matchMedia('(pointer: coarse)').matches);
        console.log('🔍 用户代理:', navigator.userAgent);
    }, [isMobile, isWindows]);

    useEffect(() => {
        document.body.style.cursor = isOverClickable ? 'auto' : 'none';

        return () => {
            document.body.style.cursor = '';
        };
    }, [isOverClickable]);

    useEffect(() => {
        containerRef.current = document.querySelector('.scroll-mode-auto');
        return () => {
            containerRef.current = null;
        };
    }, [currentSection]);

    const direction = useMemo(
        () => getAvailableDirections(currentSection, sections.length),
        [currentSection, sections.length]
    );

    const boundaryState = getAbsoluteBoundaryState({
        currentSection,
        sectionCount: sections.length,
        container: containerRef.current,
    });

    if (isMobile()) return null;

    const shouldRender = isVisible || (isWindows && !isMobile());
    if (!shouldRender) return null;

    const cursorClassName = [
        'power-cursor',
        isHovering ? 'hovering' : '',
        isOverClickable ? 'over-clickable' : '',
        isWindows ? 'force-show' : '',
        isPointerLocked ? 'is-pointer-locked' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const hintClassName = [
        'clickable-hint',
        isWindows ? 'force-show' : '',
        isPointerLocked ? 'is-pointer-locked' : '',
    ]
        .filter(Boolean)
        .join(' ');

    const isHomePage = currentSection === 0;

    return (
        <>
            {isOverClickable && <div ref={clickableHintRef} className={hintClassName} />}

            <div ref={powerCursorRef} className={cursorClassName}>
                <PowerDirectionalIndicator
                    animatedValue={scrollState.animatedValue}
                    boundaryState={boundaryState}
                    currentScrollDelta={scrollState.currentScrollDelta}
                    direction={direction}
                    isAnimatingDown={scrollState.isAnimatingDown}
                    isHovering={isHovering}
                    scrollDirection={scrollState.scrollDirection}
                    scrollIntensity={scrollState.scrollIntensity}
                    themeColors={themeColors}
                />
            </div>

            {isHomePage && direction === 'down' && (
                <div ref={homeHintRef} className="cursor-home-hint">
                    {getText('home.desktopScrollHint')}
                </div>
            )}
        </>
    );
};

export default SmartDirectionalCursor;
