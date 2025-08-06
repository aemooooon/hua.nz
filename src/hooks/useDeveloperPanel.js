import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for managing developer panel state and keyboard shortcuts
 * Only available in development mode
 */
export const useDeveloperPanel = () => {
    const [isVisible, setIsVisible] = useState(false); // 默认不显示，需要 Ctrl+M 触发
    const isDev = import.meta.env.DEV;

    // Toggle function
    const toggle = useCallback(() => {
        if (isDev) {
            setIsVisible(prev => !prev);
        }
    }, [isDev]);

    // Hide function
    const hide = useCallback(() => {
        setIsVisible(false);
    }, []);

    // Show function
    const show = useCallback(() => {
        if (isDev) {
            setIsVisible(true);
        }
    }, [isDev]);

    // Keyboard shortcuts
    useEffect(() => {
        if (!isDev) return;

        const handleKeyDown = (event) => {
            // Ctrl+M or Cmd+M to toggle developer panel
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'm') {
                event.preventDefault();
                toggle();
            }
            
            // Escape to close if open
            if (event.key === 'Escape' && isVisible) {
                event.preventDefault();
                hide();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDev, isVisible, toggle, hide]);

    // Only return functionality if in development mode
    return isDev ? {
        isVisible,
        toggle,
        hide,
        show,
        isDev
    } : {
        isVisible: false,
        toggle: () => {},
        hide: () => {},
        show: () => {},
        isDev: false
    };
};

export default useDeveloperPanel;
