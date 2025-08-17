import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * 通用的右上角关闭按钮组件
 * 
 * 设计理念：
 * - 统一的基础尺寸和布局确保一致性体验
 * - 可配置的颜色方案适应不同场景的视觉需求
 * - 流畅的hover动画提供良好的交互反馈
 * - 右上角扩展的圆形背景动画，从小缩放到完整覆盖
 * 
 * 核心特性：
 * - 固定在屏幕右上角 (z-index: 100000)
 * - hover时从右上角扩展的圆形背景动画
 * - X图标居中显示，支持大小和颜色自定义
 * - 24x24px的点击热区确保易于点击
 * - 完全的无障碍支持 (aria-label)
 * 
 * 使用场景：
 * 1. ProjectDetail (全屏模态框): 红色圆背景 + 白色图标，强调关闭操作
 * 2. MapView (地图界面): 深色圆背景 + 白色图标，hover时红色提示
 * 3. 其他弹窗组件: 可根据需要自定义所有视觉参数
 * 
 * 使用示例：
 * 
 * // 基础用法 (使用默认样式)
 * <CornerCloseButton onClick={handleClose} />
 * 
 * // ProjectDetail 场景配置
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
 * 
 * // MapView 场景配置
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
 * 
 * // 自定义小尺寸配置
 * <CornerCloseButton 
 *   onClick={onClose}
 *   iconSize="w-12 h-12"
 *   circleSize="w-32 h-32"
 *   circleColor="bg-blue-500"
 *   position={{ top: 'top-6', right: 'right-6' }}
 * />
 * 
 * @param {Function} onClick - 点击关闭的回调函数 (必需)
 * @param {string} className - 额外的CSS类名 (可选)
 * @param {string} ariaLabel - 无障碍标签 (可选，默认: "Close")
 * @param {string} iconSize - X图标大小，推荐: w-12 h-12, w-16 h-16 (可选)
 * @param {string} iconColor - X图标默认颜色 (可选，默认: text-theme-primary)
 * @param {string} iconHoverColor - X图标hover颜色 (可选，默认: text-white)
 * @param {string} circleColor - 圆形背景颜色，支持: bg-red-500, bg-slate-800, bg-blue-500 等 (可选)
 * @param {string} circleSize - 圆形大小，推荐: w-32 h-32 (中), w-80 h-80 (大) (可选)
 * @param {number} strokeWidth - X图标线条粗细，推荐: 1.2-2 (可选，默认: 1.2)
 * @param {string} animationDuration - 动画持续时间，推荐: duration-300, duration-500 (可选)
 * @param {Object} position - X图标位置，格式: {top: 'top-6', right: 'right-6'} (可选)
 * 
 * 注意事项：
 * - 组件使用固定定位 (position: fixed)，适用于模态框和全屏界面
 * - 圆形背景使用 origin-top-right 确保从右上角扩展
 * - 建议在深色背景上使用，以确保白色图标的可见性
 * - 大圆形 (w-80 h-80) 适合全屏界面，小圆形 (w-32 h-32) 适合小弹窗
 */
const CornerCloseButton = ({ 
  onClick, 
  className = '',
  ariaLabel = 'Close',
  // 可配置的样式参数
  iconSize = 'w-16 h-16',          // X图标大小
  iconColor = 'text-theme-primary', // X图标默认颜色
  iconHoverColor = 'text-white',    // X图标hover颜色
  circleColor = 'bg-theme-primary', // 圆形背景颜色
  circleSize = 'w-80 h-80',         // 圆形大小
  strokeWidth = 1.2,                // X图标线条粗细
  animationDuration = 'duration-500', // 动画持续时间
  position = { top: 'top-8', right: 'right-8' } // X图标位置
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // 样式映射 - 确保动态类名正确解析
  const sizeMap = {
    'w-10 h-10': { width: '2.5rem', height: '2.5rem' },
    'w-12 h-12': { width: '3rem', height: '3rem' },
    'w-16 h-16': { width: '4rem', height: '4rem' }
  };

  const circleSizeMap = {
    'w-24 h-24': { width: '6rem', height: '6rem' },
    'w-32 h-32': { width: '8rem', height: '8rem' },
    'w-80 h-80': { width: '20rem', height: '20rem' }  // 大圆形，完全包围效果
  };

  const colorMap = {
    'bg-red-500': '#ef4444',
    'bg-slate-800': '#1e293b',
    'bg-theme-primary': 'var(--theme-primary)',
    'text-white': '#ffffff',
    'text-red-400': '#f87171',
    'text-theme-primary': 'var(--theme-primary)'
  };

  const positionMap = {
    'top-4': '1rem',
    'top-6': '1.5rem', 
    'top-8': '2rem',
    'right-4': '1rem',
    'right-6': '1.5rem',
    'right-8': '2rem'
  };

  return (
    <div className={`fixed top-0 right-0 ${className} z-[100000]`} style={{ width: '4rem', height: '4rem' }}>
      {/* 背景圆 - hover时从右上角扩展的圆形背景 */}
      <div
        className={`absolute top-0 right-0 rounded-full transition-all ${animationDuration} ease-in-out ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} origin-top-right shadow-lg z-0`}
        style={{
          ...circleSizeMap[circleSize] || circleSizeMap['w-32 h-32'],
          backgroundColor: colorMap[circleColor] || colorMap['bg-theme-primary'],
          transform: 'translate(50%, -50%)'
        }}
      />

      {/* 点击区域 - 不可见的点击热区，确保易于点击 */}
      <button
        className="absolute top-0 right-0 w-24 h-24 focus:outline-none z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
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
          right: positionMap[position.right] || positionMap['right-6']
        }}
      >
        <svg 
          className={`transition-all ${animationDuration} ease-in-out drop-shadow-lg`}
          style={{
            ...sizeMap[iconSize] || sizeMap['w-12 h-12'],
            color: isHovered ? 
              (colorMap[iconHoverColor] || colorMap['text-white']) : 
              (colorMap[iconColor] || colorMap['text-white']),
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
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
  );
};

// 导出组件的PropTypes定义
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
    right: PropTypes.string
  })
};

// 版本信息
CornerCloseButton.version = '1.0.0';
CornerCloseButton.displayName = 'CornerCloseButton';

export default CornerCloseButton;
