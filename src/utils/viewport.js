/**
 * 移动端视口高度适配工具
 * 解决移动端浏览器地址栏和状态栏造成的视口变化问题
 */

/**
 * 设置CSS自定义属性用于视口高度
 */
function setViewportHeight() {
    // 获取实际视口高度
    const vh = window.innerHeight * 0.01;
    
    // 设置CSS自定义属性
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vh-fallback', `${window.innerHeight}px`);
    
    // 检测是否支持动态视口单位
    const supportsDvh = CSS.supports('height', '100dvh');
    if (!supportsDvh) {
        // 如果不支持dvh，使用计算的值作为fallback
        document.documentElement.style.setProperty('--dvh-fallback', `${window.innerHeight}px`);
    }
}

/**
 * 初始化视口高度适配
 */
export function initViewportHeight() {
    // 初始设置
    setViewportHeight();
    
    // 监听窗口大小变化
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setViewportHeight, 100);
    });
    
    // 监听屏幕方向变化
    if (screen.orientation) {
        screen.orientation.addEventListener('change', () => {
            setTimeout(setViewportHeight, 200); // 给方向变化一些时间
        });
    } else {
        // 兼容性处理
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 200);
        });
    }
    
    // iOS Safari特殊处理 - 监听滚动事件来处理地址栏隐藏
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(setViewportHeight, 150);
        }, { passive: true });
    }
}

/**
 * 获取安全的视口尺寸
 */
export function getSafeViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        safeAreaInsets: {
            top: getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0px',
            right: getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-right)') || '0px',
            bottom: getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0px',
            left: getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-left)') || '0px'
        }
    };
}

/**
 * 检测是否为移动端
 */
export function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * 检测是否为iOS设备
 */
export function isIOSDevice() {
    return /iPhone|iPad|iPod/.test(navigator.userAgent);
}

/**
 * 检测是否为Android设备
 */
export function isAndroidDevice() {
    return /Android/.test(navigator.userAgent);
}
