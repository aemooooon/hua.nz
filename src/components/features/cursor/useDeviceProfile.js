import { useCallback, useMemo } from 'react';
import { isMobileDevice } from '../../../utils/viewport';
import { isWindowsPlatform } from './cursorUtils';

export const useDeviceProfile = () => {
    const isMobile = useCallback(() => {
        if (typeof window === 'undefined') return true;
        if (window.innerWidth <= 768) return true;

        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = [
            'mobile',
            'android',
            'iphone',
            'ipad',
            'ipod',
            'blackberry',
            'opera mini',
            'iemobile',
        ];

        if (mobileKeywords.some(keyword => userAgent.includes(keyword))) return true;

        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (hasTouch && window.innerWidth <= 1024) return true;

        return isMobileDevice();
    }, []);

    const isWindows = useMemo(() => isWindowsPlatform(), []);

    return { isMobile, isWindows };
};
