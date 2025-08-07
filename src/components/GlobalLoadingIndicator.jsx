import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * 全局资源加载指示器组件
 * 统一的加载样式，参考Gallery section的优雅设计
 */
const GlobalLoadingIndicator = ({
    isVisible = false,
    loadedCount = 0,
    totalCount = 0,
    loadingText = 'Loading...',
    loadingTextChinese = '加载中...',
    language = 'en',
    showProgress = true,
    showPercentage = true,
    showDots = true,
    variant = 'default', // 'default' | 'minimal' | 'corner'
    position = 'center', // 'center' | 'top-right' | 'bottom-right'
    className = '',
    style = {}
}) => {
    const [animationDelay] = useState(() => Math.random() * 0.5); // 随机动画延迟，避免同步

    // 计算加载进度
    const loadingProgress = totalCount > 0 ? Math.round((loadedCount / totalCount) * 100) : 0;
    
    // 动态文本
    const displayText = language === 'en' ? loadingText : loadingTextChinese;
    const imagesText = language === 'en' ? 'Assets' : '资源';

    if (!isVisible) return null;

    // 根据变体选择样式
    const getVariantClasses = () => {
        switch (variant) {
            case 'minimal':
                return 'bg-black/60 backdrop-blur-sm rounded-lg p-3';
            case 'corner':
                return 'bg-black/80 rounded-lg p-3 text-sm';
            default:
                return 'bg-black/20 backdrop-blur-sm rounded-xl p-6';
        }
    };

    // 根据位置选择样式
    const getPositionClasses = () => {
        switch (position) {
            case 'top-right':
                return 'fixed top-6 right-6 z-50';
            case 'bottom-right':
                return 'fixed bottom-6 right-6 z-50';
            default:
                return 'flex flex-col items-center justify-center h-full space-y-6';
        }
    };

    // 渲染进度条
    const renderProgressBar = () => {
        if (!showProgress || totalCount === 0) return null;
        
        return (
            <div className={variant === 'corner' ? 'w-32 space-y-2' : 'w-64 space-y-3'}>
                <div className="flex justify-between text-white/50 text-sm">
                    <span>{imagesText}</span>
                    <span>{loadedCount}/{totalCount}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-theme-primary rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
                {showPercentage && (
                    <div className="text-center text-white/40 text-xs">
                        {loadingProgress}%
                    </div>
                )}
            </div>
        );
    };

    // 渲染动画点
    const renderAnimatedDots = () => {
        if (!showDots) return null;
        
        return (
            <div className="flex space-x-2">
                <div 
                    className="w-3 h-3 bg-theme-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${animationDelay}s` }}
                ></div>
                <div 
                    className="w-3 h-3 bg-theme-primary rounded-full animate-pulse" 
                    style={{ animationDelay: `${animationDelay + 0.2}s` }}
                ></div>
                <div 
                    className="w-3 h-3 bg-theme-primary rounded-full animate-pulse" 
                    style={{ animationDelay: `${animationDelay + 0.4}s` }}
                ></div>
            </div>
        );
    };

    // 渲染旋转加载器（用于角落模式）
    const renderSpinner = () => {
        if (variant !== 'corner') return null;
        
        return (
            <div className="w-4 h-4 border-2 border-white/30 border-t-theme-primary rounded-full animate-spin"></div>
        );
    };

    // 角落模式的简化布局
    if (variant === 'corner') {
        return (
            <div className={`${getPositionClasses()} ${getVariantClasses()} ${className}`} style={style}>
                <div className="flex items-center gap-2">
                    {renderSpinner()}
                    <span className="text-white">{displayText}</span>
                    {showProgress && totalCount > 0 && (
                        <span className="text-white/70">{loadedCount}/{totalCount}</span>
                    )}
                </div>
                {showProgress && totalCount > 0 && (
                    <div className="mt-2">
                        {renderProgressBar()}
                    </div>
                )}
            </div>
        );
    }

    // 默认和最小模式的完整布局
    return (
        <div className={position === 'center' ? 'absolute inset-0' : ''}>
            <div className={`${getPositionClasses()} ${getVariantClasses()} ${className}`} style={style}>
                <div className={`text-white/70 ${variant === 'minimal' ? 'text-base' : 'text-xl'} font-light`}>
                    {displayText}
                </div>
                
                {renderProgressBar()}
                {renderAnimatedDots()}
            </div>
        </div>
    );
};

GlobalLoadingIndicator.propTypes = {
    isVisible: PropTypes.bool,
    loadedCount: PropTypes.number,
    totalCount: PropTypes.number,
    loadingText: PropTypes.string,
    loadingTextChinese: PropTypes.string,
    language: PropTypes.string,
    showProgress: PropTypes.bool,
    showPercentage: PropTypes.bool,
    showDots: PropTypes.bool,
    variant: PropTypes.oneOf(['default', 'minimal', 'corner']),
    position: PropTypes.oneOf(['center', 'top-right', 'bottom-right']),
    className: PropTypes.string,
    style: PropTypes.object
};

export default GlobalLoadingIndicator;
