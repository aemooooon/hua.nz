import { useCallback, useEffect, useRef, useState } from 'react';

export const useScrollForce = () => {
    const decayTimerRef = useRef(null);
    const countdownAnimationRef = useRef(null);
    const wheelThrottleRef = useRef(0);

    const [scrollIntensity, setScrollIntensity] = useState(0);
    const [currentScrollDelta, setCurrentScrollDelta] = useState(0);
    const [animatedValue, setAnimatedValue] = useState(0);
    const [isAnimatingDown, setIsAnimatingDown] = useState(false);
    const [lastScrollTime, setLastScrollTime] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(null);

    const handleWheelForce = useCallback(event => {
        const now = performance.now();
        if (now - wheelThrottleRef.current < 8) return;
        wheelThrottleRef.current = now;

        const rawDelta = event.deltaY;
        const scrollSpeed = Math.abs(rawDelta);
        const baseSensitivity = Math.min(scrollSpeed / 30, 1);

        let sensitivityMultiplier = 1;
        if (scrollSpeed < 10) {
            sensitivityMultiplier = 2;
        } else if (scrollSpeed < 30) {
            sensitivityMultiplier = 1.5;
        } else if (scrollSpeed > 100) {
            sensitivityMultiplier = 0.8;
        }

        if (countdownAnimationRef.current) {
            cancelAnimationFrame(countdownAnimationRef.current);
            countdownAnimationRef.current = null;
        }

        const roundedDelta = Math.round(rawDelta);
        setIsAnimatingDown(false);
        setScrollIntensity(Math.min(baseSensitivity * sensitivityMultiplier, 1));
        setScrollDirection(rawDelta > 0 ? 'down' : 'up');
        setLastScrollTime(now);
        setCurrentScrollDelta(roundedDelta);
        setAnimatedValue(roundedDelta);

        if (decayTimerRef.current) {
            clearTimeout(decayTimerRef.current);
        }

        decayTimerRef.current = setTimeout(() => {
            setCurrentScrollDelta(0);
            setAnimatedValue(0);
            setScrollIntensity(0);
            setIsAnimatingDown(false);
            decayTimerRef.current = null;
        }, 100);
    }, []);

    useEffect(() => {
        document.addEventListener('wheel', handleWheelForce, { passive: true });

        return () => {
            document.removeEventListener('wheel', handleWheelForce);

            if (decayTimerRef.current) {
                clearTimeout(decayTimerRef.current);
            }
            if (countdownAnimationRef.current) {
                cancelAnimationFrame(countdownAnimationRef.current);
            }
        };
    }, [handleWheelForce]);

    useEffect(() => {
        if (!isAnimatingDown && currentScrollDelta !== 0 && scrollIntensity === 0) {
            const cleanupTimeout = setTimeout(() => {
                setCurrentScrollDelta(0);
                setAnimatedValue(0);
                setScrollDirection(null);
            }, 1500);

            return () => clearTimeout(cleanupTimeout);
        }

        return undefined;
    }, [isAnimatingDown, currentScrollDelta, scrollIntensity]);

    return {
        scrollIntensity,
        currentScrollDelta,
        animatedValue,
        isAnimatingDown,
        lastScrollTime,
        scrollDirection,
    };
};
