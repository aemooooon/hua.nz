import {
    BOUNDARY_WARNING_DARK_COLOR,
    BOUNDARY_WARNING_LIGHT_COLOR,
    CLICKABLE_DEPTH_LIMIT,
    CLICKABLE_SELECTORS,
    EXCLUDE_SELECTORS,
} from './cursorConstants';

export const isWindowsPlatform = () => {
    if (typeof navigator === 'undefined') return false;
    return (
        navigator.platform.toLowerCase().includes('win') ||
        navigator.userAgent.toLowerCase().includes('windows')
    );
};

export const getAvailableDirections = (currentSection, sectionCount) => {
    const canGoUp = currentSection > 0;
    const canGoDown = currentSection < sectionCount - 1;

    if (canGoUp && canGoDown) return 'both';
    if (canGoUp) return 'up';
    if (canGoDown) return 'down';
    return 'none';
};

export const hexToRgb = hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [255, 255, 255];
};

export const mixRgb = (from, to, amount) => {
    const r = Math.round(from[0] + (to[0] - from[0]) * amount);
    const g = Math.round(from[1] + (to[1] - from[1]) * amount);
    const b = Math.round(from[2] + (to[2] - from[2]) * amount);
    return `rgb(${r}, ${g}, ${b})`;
};

export const getCursorColors = ({ shouldShowBoundaryWarning, scrollIntensity, themeColors }) => {
    if (shouldShowBoundaryWarning && scrollIntensity > 0) {
        return {
            baseColor: '#ff4444',
            progressColor: mixRgb(
                BOUNDARY_WARNING_LIGHT_COLOR,
                BOUNDARY_WARNING_DARK_COLOR,
                scrollIntensity
            ),
        };
    }

    const primaryRgb = hexToRgb(themeColors.primary);
    const accentRgb = hexToRgb(themeColors.accent);

    return {
        baseColor: themeColors.primary,
        progressColor:
            scrollIntensity === 0
                ? themeColors.primary
                : mixRgb(primaryRgb, accentRgb, scrollIntensity),
    };
};

export const getAbsoluteBoundaryState = ({ currentSection, sectionCount, container }) => {
    const canGoUp = currentSection > 0;
    const canGoDown = currentSection < sectionCount - 1;

    let hasContentToScroll = false;
    let atContentTop = true;
    let atContentBottom = true;

    if (container) {
        hasContentToScroll = container.scrollHeight > container.clientHeight + 10;
        atContentTop = container.scrollTop <= 5;
        atContentBottom = container.scrollTop >= container.scrollHeight - container.clientHeight - 5;
    }

    return {
        isTopBoundary: !canGoUp && (!hasContentToScroll || atContentTop),
        isBottomBoundary: !canGoDown && (!hasContentToScroll || atContentBottom),
        hasNowhereToGo: !canGoUp && !canGoDown && !hasContentToScroll,
        hasContentToScroll,
    };
};

const matchesAny = (element, selectors) =>
    selectors.some(selector => {
        try {
            return element.matches(selector);
        } catch {
            return false;
        }
    });

const isLayoutOnlyContainer = element => {
    if (element.tagName.toLowerCase() !== 'div') return false;

    const style = window.getComputedStyle(element);
    const classes = element.classList;

    if (style.cursor === 'none' && (classes.contains('h-screen') || classes.contains('w-screen'))) {
        return true;
    }

    const layoutOnlyClasses = [
        'h-screen',
        'w-screen',
        'overflow-hidden',
        'relative',
        'absolute',
        'fixed',
    ];

    const hasOnlyLayoutClasses = Array.from(classes).every(
        cls =>
            layoutOnlyClasses.includes(cls) ||
            cls.startsWith('bg-') ||
            cls.startsWith('backdrop-')
    );

    return hasOnlyLayoutClasses && style.cursor === 'none';
};

export const detectClickableElement = element => {
    if (!element) return false;

    if (
        element.hasAttribute('data-no-custom-cursor') ||
        element.hasAttribute('data-hero-cube-canvas') ||
        element.classList.contains('hero-cube-canvas')
    ) {
        return false;
    }

    const elementStyle = window.getComputedStyle(element);
    if (elementStyle.pointerEvents === 'none') return false;

    if (
        elementStyle.cursor === 'none' &&
        (element.classList.contains('h-screen') ||
            element.classList.contains('w-screen') ||
            element.classList.contains('overflow-hidden'))
    ) {
        return false;
    }

    if (element.tagName.toLowerCase() === 'canvas') {
        const parentElement = element.parentElement;
        if (
            parentElement &&
            (parentElement.classList.contains('hero-cube') ||
                parentElement.hasAttribute('data-hero-cube') ||
                parentElement.style.pointerEvents === 'none' ||
                element.style.pointerEvents === 'none')
        ) {
            return false;
        }
    }

    let currentElement = element;
    let depth = 0;

    while (currentElement && currentElement !== document.body && depth < CLICKABLE_DEPTH_LIMIT) {
        if (matchesAny(currentElement, EXCLUDE_SELECTORS)) return false;
        if (isLayoutOnlyContainer(currentElement)) return false;
        if (matchesAny(currentElement, CLICKABLE_SELECTORS)) return true;

        const computedStyle = window.getComputedStyle(currentElement);
        if (computedStyle.cursor === 'pointer') {
            const tagName = currentElement.tagName.toLowerCase();
            if (
                !['canvas', 'svg', 'img', 'video'].includes(tagName) &&
                (currentElement.hasAttribute('onclick') ||
                    currentElement.hasAttribute('role') ||
                    currentElement.hasAttribute('tabindex') ||
                    currentElement.classList.contains('clickable') ||
                    currentElement.classList.contains('btn') ||
                    currentElement.classList.contains('button') ||
                    ['a', 'button', 'input', 'select', 'textarea'].includes(tagName))
            ) {
                return true;
            }
        }

        if (
            currentElement.onclick ||
            currentElement.getAttribute('data-testid') ||
            currentElement.classList.contains('cursor-pointer')
        ) {
            return true;
        }

        currentElement = currentElement.parentElement;
        depth++;
    }

    return false;
};
