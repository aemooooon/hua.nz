import { useCallback, useEffect, useRef, useState } from 'react';

const setCursorVars = (element, x, y) => {
    if (!element) return;
    element.style.setProperty('--cursor-x', `${x}px`);
    element.style.setProperty('--cursor-y', `${y}px`);
};

export const useCursorMotion = ({ getIsClickableAtPoint }) => {
    const powerCursorRef = useRef(null);
    const clickableHintRef = useRef(null);
    const homeHintRef = useRef(null);
    const rafRef = useRef(null);
    const latestPointRef = useRef({ x: 0, y: 0 });
    const isVisibleRef = useRef(false);
    const isOverClickableRef = useRef(false);

    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isOverClickable, setIsOverClickable] = useState(false);

    const updateCursorDom = useCallback(() => {
        rafRef.current = null;
        const { x, y } = latestPointRef.current;

        setCursorVars(powerCursorRef.current, x, y);
        setCursorVars(clickableHintRef.current, x, y);
        setCursorVars(homeHintRef.current, x, y);
    }, []);

    const scheduleDomUpdate = useCallback(() => {
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(updateCursorDom);
    }, [updateCursorDom]);

    const handleMouseMove = useCallback(
        event => {
            latestPointRef.current = { x: event.clientX, y: event.clientY };
            setCursorVars(powerCursorRef.current, event.clientX, event.clientY);
            setCursorVars(clickableHintRef.current, event.clientX, event.clientY);
            setCursorVars(homeHintRef.current, event.clientX, event.clientY);
            scheduleDomUpdate();

            const isClickable = getIsClickableAtPoint(event.clientX, event.clientY);
            if (isClickable !== isOverClickableRef.current) {
                isOverClickableRef.current = isClickable;
                setIsOverClickable(isClickable);
            }

            if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                setIsVisible(true);
            }
        },
        [getIsClickableAtPoint, scheduleDomUpdate]
    );

    const handleMouseEnter = useCallback(() => {
        isVisibleRef.current = true;
        setIsVisible(true);
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        isVisibleRef.current = false;
        setIsVisible(false);
        setIsHovering(false);
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('pointermove', handleMouseMove);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('pointermove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleMouseEnter, handleMouseLeave, handleMouseMove]);

    useEffect(() => {
        if (!isVisible) return;

        const { x, y } = latestPointRef.current;
        setCursorVars(powerCursorRef.current, x, y);
        setCursorVars(clickableHintRef.current, x, y);
        setCursorVars(homeHintRef.current, x, y);
    }, [isVisible, isOverClickable]);

    return {
        powerCursorRef,
        clickableHintRef,
        homeHintRef,
        isVisible,
        isHovering,
        isOverClickable,
    };
};
