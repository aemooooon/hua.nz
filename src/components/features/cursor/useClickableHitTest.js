import { useCallback, useRef } from 'react';
import { detectClickableElement } from './cursorUtils';

export const useClickableHitTest = () => {
    const elementCacheRef = useRef(new WeakMap());
    const positionCacheRef = useRef({ x: -1, y: -1, result: false, timestamp: 0 });

    return useCallback((x, y) => {
        const cache = positionCacheRef.current;
        const now = performance.now();
        const distance = Math.hypot(x - cache.x, y - cache.y);

        if (distance < 10 && now - cache.timestamp < 50) {
            return cache.result;
        }

        const element = document.elementFromPoint(x, y);
        if (!element) {
            positionCacheRef.current = { x, y, result: false, timestamp: now };
            return false;
        }

        if (elementCacheRef.current.has(element)) {
            const result = elementCacheRef.current.get(element);
            positionCacheRef.current = { x, y, result, timestamp: now };
            return result;
        }

        const result = detectClickableElement(element);
        elementCacheRef.current.set(element, result);
        positionCacheRef.current = { x, y, result, timestamp: now };

        return result;
    }, []);
};
