export const CLICKABLE_SELECTORS = [
    'a',
    'button',
    'input',
    'select',
    'textarea',
    '[onclick]',
    '[role="button"]',
    '[role="link"]',
    '[role="menuitem"]',
    '[tabindex]:not([tabindex="-1"])',
    '.clickable',
    '.btn',
    '.button',
    '.cursor-pointer',
    'summary',
    'label',
    '[data-clickable="true"]',
];

export const EXCLUDE_SELECTORS = [
    'canvas',
    'svg',
    'img',
    'video',
    '.hero-cube',
    '.effect-avatar',
    '.lorenz-attractor',
    '[data-no-custom-cursor="true"]',
    '[style*="pointer-events: none"]',
    '[style*="pointerEvents: none"]',
    '.h-screen.w-screen',
    '.overflow-hidden',
    '.background-container',
    '.bg-container',
];

export const BOUNDARY_WARNING_COLOR = '#ff4444';
export const BOUNDARY_WARNING_DARK_COLOR = [180, 20, 20];
export const BOUNDARY_WARNING_LIGHT_COLOR = [255, 68, 68];

export const CURSOR_BASE_SIZE = 133;
export const CLICKABLE_DEPTH_LIMIT = 5;
