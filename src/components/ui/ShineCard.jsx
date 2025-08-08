import PropTypes from 'prop-types';
import './ShineCard.css';

/**
 * ShineCard - 通用的光影效果卡片组件
 * 
 * 使用方式说明：
 * 
 * 1. 直接使用组件（推荐用于简单场景）:
 * ```jsx
 * <ShineCard shineColor="blue" className="p-6 rounded-lg bg-white/10">
 *   <h3>卡片标题</h3>
 *   <p>卡片内容</p>
 * </ShineCard>
 * ```
 * 
 * 2. 手动使用CSS类（推荐用于复杂布局，如ContactSection的做法）:
 * ```jsx
 * // 先导入CSS样式
 * import '../../ui/ShineCard.css';
 * 
 * // 在JSX中使用类名
 * <div className="shine-card shine-blue your-custom-classes">
 *   <div className="shine-content">
 *     <h3>卡片标题</h3>
 *     <p>卡片内容</p>
 *   </div>
 * </div>
 * ```
 * 
 * 可用的颜色主题：
 * - 'blue' (默认): 蓝色光影
 * - 'green': 绿色光影  
 * - 'purple': 紫色光影
 * - 'yellow': 黄色光影
 * 
 * CSS类名说明：
 * - .shine-card: 基础光影卡片样式（必需）
 * - .shine-blue/.shine-green/.shine-purple/.shine-yellow: 颜色主题（可选，默认蓝色）
 * - .shine-content: 内容包装器，确保内容在光影效果之上（推荐）
 * 
 * 注意事项：
 * - 卡片需要设置 position: relative（.shine-card已包含）
 * - 如需自定义样式，可以添加额外的CSS类或内联样式
 * - 光影效果会在hover时触发
 * - 适用于各种背景和主题
 * 
 * @param {Object} props 
 * @param {ReactNode} props.children - 卡片内容
 * @param {string} props.className - 额外的CSS类名
 * @param {string} props.shineColor - 光影颜色主题 ('blue'|'green'|'purple'|'yellow')
 * @param {boolean} props.enableContentShine - 是否启用shine-content包装器
 * @param {Object} props.style - 内联样式
 * @param {Object} props.otherProps - 其他HTML属性（如onClick, onMouseEnter等）
 */
const ShineCard = ({ 
    children, 
    className = '', 
    shineColor = 'blue',
    enableContentShine = true,
    style = {},
    ...otherProps 
}) => {
    const shineClass = `shine-${shineColor}`;
    const combinedClassName = `shine-card ${shineClass} ${className}`.trim();

    return (
        <div 
            className={combinedClassName}
            style={style}
            {...otherProps}
        >
            {enableContentShine ? (
                <div className="shine-content">
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

ShineCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    shineColor: PropTypes.oneOf(['blue', 'green', 'purple', 'yellow']),
    enableContentShine: PropTypes.bool,
    style: PropTypes.object
};

export default ShineCard;
