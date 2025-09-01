import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Tooltip = ({ children, content, placement = 'top', className, delay = 300, ...props }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [actualPlacement, setActualPlacement] = useState(placement);
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        if (isVisible) {
            // 计算tooltip位置，避免溢出浏览器边界
            const calculatePosition = () => {
                if (!triggerRef.current || !tooltipRef.current) return;

                const triggerRect = triggerRef.current.getBoundingClientRect();
                const tooltipRect = tooltipRef.current.getBoundingClientRect();
                const viewport = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };

                let newPlacement = placement;

                // 检查各个方向是否会溢出
                const positions = {
                    top: triggerRect.top - tooltipRect.height - 8,
                    bottom: triggerRect.bottom + 8,
                    left: triggerRect.left - tooltipRect.width - 8,
                    right: triggerRect.right + 8,
                };

                // 根据原始位置和边界检测调整位置
                switch (placement) {
                    case 'top':
                        if (positions.top < 0) newPlacement = 'bottom';
                        break;
                    case 'bottom':
                        if (positions.bottom + tooltipRect.height > viewport.height)
                            newPlacement = 'top';
                        break;
                    case 'left':
                        if (positions.left < 0) newPlacement = 'right';
                        break;
                    case 'right':
                        if (positions.right + tooltipRect.width > viewport.width)
                            newPlacement = 'left';
                        break;
                }

                // 对于左右位置，还要检查垂直方向的溢出
                if (newPlacement === 'left' || newPlacement === 'right') {
                    const centerY = triggerRect.top + triggerRect.height / 2;
                    if (
                        centerY - tooltipRect.height / 2 < 0 ||
                        centerY + tooltipRect.height / 2 > viewport.height
                    ) {
                        newPlacement = positions.top >= 0 ? 'top' : 'bottom';
                    }
                }

                setActualPlacement(newPlacement);
            };

            // 使用requestAnimationFrame确保DOM已更新
            requestAnimationFrame(() => {
                calculatePosition();
            });
        }
    }, [isVisible, content, placement]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // 获取tooltip样式类名
    const getTooltipClasses = () => {
        const baseClasses =
            'absolute z-[9999] px-3 py-2 text-xs font-medium transition-all duration-200 transform';
        const themeClasses =
            'bg-black/90 text-theme-primary border border-theme-primary/30 rounded-lg backdrop-blur-sm';
        const shadowClasses = 'shadow-lg shadow-theme-primary/20';

        const visibilityClasses = isVisible
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none';

        let positionClasses = '';
        switch (actualPlacement) {
            case 'top':
                positionClasses = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
                break;
            case 'bottom':
                positionClasses = 'top-full left-1/2 -translate-x-1/2 mt-2';
                break;
            case 'left':
                positionClasses = 'right-full top-1/2 -translate-y-1/2 mr-2';
                break;
            case 'right':
                positionClasses = 'left-full top-1/2 -translate-y-1/2 ml-2';
                break;
        }

        return cn(
            baseClasses,
            themeClasses,
            shadowClasses,
            visibilityClasses,
            positionClasses,
            className
        );
    };

    // 获取箭头样式类名
    const getArrowClasses = () => {
        const baseClasses =
            'absolute w-2 h-2 bg-black/90 border border-theme-primary/30 transform rotate-45';

        let positionClasses = '';
        switch (actualPlacement) {
            case 'top':
                positionClasses = 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-0 border-l-0';
                break;
            case 'bottom':
                positionClasses =
                    'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-0 border-r-0';
                break;
            case 'left':
                positionClasses = 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-0 border-b-0';
                break;
            case 'right':
                positionClasses = 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-0 border-t-0';
                break;
        }

        return cn(baseClasses, positionClasses);
    };

    return (
        <div
            className="relative inline-block"
            ref={triggerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}

            {/* Tooltip */}
            <div
                ref={tooltipRef}
                className={getTooltipClasses()}
                style={{
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    zIndex: 9999,
                }}
            >
                {content}

                {/* 箭头 */}
                <div className={getArrowClasses()} />
            </div>
        </div>
    );
};

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    className: PropTypes.string,
    delay: PropTypes.number,
};

export default Tooltip;
