import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * 通用的右上角关闭按钮组件
 *
 * 设计理念：
 * - 统一的基础尺寸和布局确保一致性体验
 * - 可配置的颜色方案适应不同场景的视觉需求
 * - 流畅的hover动画提供良好的交互反馈
 * - 从右上角扩展的半圆背景动画，优雅的视觉效果
 *
 * 使用场景示例：
 *
 * 1. 项目详情页 (全屏模态框):
 * ```jsx
 * <CornerCloseButton
 *   onClick={onClose}
 *   ariaLabel="关闭项目详情"
 *   iconSize="w-16 h-16"
 *   iconColor="text-white"
 *   iconHoverColor="text-white"
 *   circleColor="bg-red-500"
 *   circleSize="w-80 h-80"
 *   strokeWidth={1.5}
 *   animationDuration="duration-500"
 *   position={{ top: 'top-8', right: 'right-8' }}
 * />
 * ```
 *
 * 2. 地图界面:
 * ```jsx
 * <CornerCloseButton
 *   onClick={onClose}
 *   ariaLabel="关闭地图"
 *   iconSize="w-16 h-16"
 *   iconColor="text-white"
 *   iconHoverColor="text-red-400"
 *   circleColor="bg-slate-800"
 *   circleSize="w-80 h-80"
 *   strokeWidth={1.5}
 *   animationDuration="duration-500"
 *   position={{ top: 'top-8', right: 'right-8' }}
 * />
 * ```
 *
 * 3. 简单弹窗 (使用默认值):
 * ```jsx
 * <CornerCloseButton onClick={onClose} />
 * ```
 *
 * 核心特性：
 * - 固定在右上角位置 (z-index: 100000)
 * - hover时从右上角扩展的圆形背景动画
 * - 大尺寸的点击热区确保易用性
 * - 支持键盘导航和屏幕阅读器
 *
 * 推荐配置：
 * - iconSize: "w-16 h-16" (标准大小)
 * - circleSize: "w-80 h-80" (完整包围效果)
 * - strokeWidth: 1.5 (优雅线条)
 * - animationDuration: "duration-500" (流畅动画)
 * - position: { top: 'top-8', right: 'right-8' } (标准位置)
 *
 * @param {Function} onClick - 必需，点击关闭的回调函数
 * @param {string} className - 可选，额外的CSS类名
 * @param {string} ariaLabel - 可选，无障碍标签，默认'Close'
 * @param {string} iconSize - 可选，X图标大小，支持: w-10/w-12/w-16 h-*
 * @param {string} iconColor - 可选，X图标默认颜色
 * @param {string} iconHoverColor - 可选，X图标hover颜色
 * @param {string} circleColor - 可选，圆形背景颜色，支持: bg-red-500/bg-slate-800/bg-theme-primary
 * @param {string} circleSize - 可选，圆形大小，支持: w-24/w-32/w-80 h-*
 * @param {number} strokeWidth - 可选，X图标线条粗细，推荐1.2-2
 * @param {string} animationDuration - 可选，动画持续时间，支持: duration-300/duration-500
 * @param {Object} position - 可选，X图标位置，格式: {top: 'top-*', right: 'right-*'}
 */
const CornerCloseButton = ({
    onClick,
    className = '',
    ariaLabel = 'Close',
    // 可配置的样式参数
    iconSize = 'w-16 h-16', // X图标大小
    iconColor = 'text-theme-primary', // X图标默认颜色
    iconHoverColor = 'text-white', // X图标hover颜色
    circleColor = 'bg-theme-primary', // 圆形背景颜色
    circleSize = 'w-80 h-80', // 圆形大小
    strokeWidth = 1.2, // X图标线条粗细
    animationDuration = 'duration-500', // 动画持续时间
    position = { top: 'top-8', right: 'right-8' }, // X图标位置
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // 样式映射 - 确保动态类名正确解析
    const sizeMap = {
        'w-10 h-10': { width: '2.5rem', height: '2.5rem' },
        'w-12 h-12': { width: '3rem', height: '3rem' },
        'w-16 h-16': { width: '4rem', height: '4rem' },
    };

    const circleSizeMap = {
        'w-24 h-24': { width: '6rem', height: '6rem' },
        'w-32 h-32': { width: '8rem', height: '8rem' },
        'w-80 h-80': { width: '20rem', height: '20rem' }, // 大圆形，完全包围效果
    };

    const colorMap = {
        'bg-red-500': '#ef4444',
        'bg-slate-800': '#1e293b',
        'bg-theme-primary': 'var(--theme-primary)',
        'text-white': '#ffffff',
        'text-red-400': '#f87171',
        'text-theme-primary': 'var(--theme-primary)',
    };

    const positionMap = {
        'top-4': '1rem',
        'top-6': '1.5rem',
        'top-8': '2rem',
        'right-4': '1rem',
        'right-6': '1.5rem',
        'right-8': '2rem',
    };

    return (
        <>
            {/* 桌面端版本 - 保持原有设计 */}
            <div
                className={`fixed top-0 right-0 ${className} z-[100000] hidden md:block`}
                style={{ width: '4rem', height: '4rem' }}
            >
                {/* 背景圆 - hover时从右上角扩展的圆形背景 */}
                <div
                    className={`absolute top-0 right-0 rounded-full transition-all ${animationDuration} ease-in-out ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} origin-top-right shadow-lg z-0`}
                    style={{
                        ...(circleSizeMap[circleSize] || circleSizeMap['w-32 h-32']),
                        backgroundColor: colorMap[circleColor] || colorMap['bg-theme-primary'],
                        transform: 'translate(50%, -50%)',
                    }}
                />

                {/* 点击区域 - 不可见的点击热区，确保易于点击 */}
                <button
                    className="absolute top-0 right-0 w-24 h-24 focus:outline-none z-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick();
                    }}
                    aria-label={ariaLabel}
                />

                {/* X 图标 - 可视化的关闭标识，支持完全自定义样式 */}
                <div
                    className={`absolute pointer-events-none z-30`}
                    style={{
                        top: positionMap[position.top] || positionMap['top-6'],
                        right: positionMap[position.right] || positionMap['right-6'],
                    }}
                >
                    <svg
                        className={`transition-all ${animationDuration} ease-in-out drop-shadow-lg`}
                        style={{
                            ...(sizeMap[iconSize] || sizeMap['w-12 h-12']),
                            color: isHovered
                                ? colorMap[iconHoverColor] || colorMap['text-white']
                                : colorMap[iconColor] || colorMap['text-white'],
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                    >
                        {/* X的两条交叉线 */}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </div>

            {/* 移动端版本 - 参考Contact Section的social icon样式 */}
            <div
                className={`fixed z-[100000] block md:hidden ${className}`}
                style={{
                    top: 'max(1rem, env(safe-area-inset-top) + 0.5rem)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <button
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick();
                    }}
                    className="w-12 h-12 inline-flex items-center justify-center bg-theme-surface/20 backdrop-blur-sm border-2 border-theme-border-white-10 rounded-full transition-all duration-300 hover:scale-110 hover:border-theme-primary hover:bg-theme-hover shadow-lg"
                    aria-label={ariaLabel}
                >
                    <svg
                        className="w-6 h-6 text-theme-primary transition-colors duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
};

CornerCloseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    iconHoverColor: PropTypes.string,
    circleColor: PropTypes.string,
    circleSize: PropTypes.string,
    strokeWidth: PropTypes.number,
    animationDuration: PropTypes.string,
    position: PropTypes.shape({
        top: PropTypes.string,
        right: PropTypes.string,
    }),
};

export default CornerCloseButton;
