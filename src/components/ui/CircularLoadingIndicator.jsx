import PropTypes from 'prop-types';
import { useAppStore } from '../../store/useAppStore';

/**
 * 雷达扫描加载指示器组件
 *
 * 🎨 视觉特点：
 * - 渐变环设计，从深到浅的同心圆
 * - 双重雷达扫描效果，正反旋转
 * - 主题色适配，支持动态主题切换
 * - 国际化支持的Loading文字显示
 *
 * 🔧 技术特点：
 * - 基于CSS渐变的高质量圆环渲染
 * - CSS变量支持主题色动态切换
 * - 多层雷达扫描线创造丰富动画效果
 * - 呼吸动画(breathing-glow) 多重周期
 *
 * 📱 使用场景：
 * - 页面/组件加载状态
 * - 异步操作等待提示
 * - 资源加载进度显示
 *
 * @param {number} size - 雷达大小，默认80px
 * @param {boolean} showMask - 是否显示毛玻璃遮罩，默认true
 * @param {string} maskColor - 遮罩颜色类型，默认'black-glass'
 * @param {string} className - 额外的CSS类名
 * @param {function} onMaskClick - 点击遮罩的回调函数
 */
const CircularLoadingIndicator = ({
    size = 80, // 雷达大小
    showMask = true, // 是否显示毛玻璃遮罩
    maskColor = 'black-glass', // 遮罩颜色：'black-glass' | 'black-solid' | 'default'
    className = '',
    onMaskClick = null, // 点击遮罩的回调
}) => {
    // 🌐 获取国际化文本
    const { getText } = useAppStore();
    const loadingText = getText('ui.loading');
    // 🎭 根据maskColor参数选择不同的遮罩样式
    const getMaskStyles = () => {
        switch (maskColor) {
            case 'black-solid':
                return 'absolute inset-0 bg-black'; // 纯黑遮罩
            case 'black-glass':
                return 'absolute inset-0 bg-black/80 backdrop-blur-sm'; // 半透明毛玻璃
            case 'default':
            default:
                return 'absolute inset-0 bg-black/40 backdrop-blur-lg backdrop-saturate-150'; // 增强毛玻璃
        }
    };

    // 🎨 雷达扫描组件 - 包含渐变环和扫描线
    const RadarLoading = ({ className: radarClassName = '' }) => {
        return (
            <div
                className={`relative ${radarClassName}`}
                style={{
                    width: size,
                    height: size,
                }}
            >
                {/* 单一渐变圆 - 从中心到外围的平滑过渡，增大光晕 */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `radial-gradient(circle, 
                            rgba(var(--theme-primary-rgb), 0.9) 0%,
                            rgba(var(--theme-primary-rgb), 0.7) 15%, 
                            rgba(var(--theme-primary-rgb), 0.5) 35%,
                            rgba(var(--theme-primary-rgb), 0.3) 55%,
                            rgba(var(--theme-primary-rgb), 0.15) 75%,
                            rgba(var(--theme-primary-rgb), 0.05) 90%,
                            transparent 100%
                        )`,
                        boxShadow: `
                            0 0 ${size * 0.5}px rgba(var(--theme-primary-rgb), 0.6),
                            0 0 ${size * 0.8}px rgba(var(--theme-primary-rgb), 0.4),
                            0 0 ${size * 1.2}px rgba(var(--theme-primary-rgb), 0.2)
                        `,
                        animation: 'breathing-glow 2.5s ease-in-out infinite'
                    }}
                ></div>

                {/* 雷达扫描线 - 主扫描 */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        background: `conic-gradient(
                            from 0deg,
                            transparent 0deg,
                            rgba(var(--theme-primary-rgb), 0.1) 15deg,
                            rgba(var(--theme-primary-rgb), 0.4) 35deg,
                            rgba(var(--theme-primary-rgb), 0.8) 45deg,
                            rgba(var(--theme-primary-rgb), 0.6) 55deg,
                            rgba(var(--theme-primary-rgb), 0.2) 75deg,
                            transparent 90deg,
                            transparent 360deg
                        )`,
                        animation: 'rotate-glow 3s linear infinite',
                        filter: 'blur(1px)',
                        mixBlendMode: 'screen'
                    }}
                ></div>

                {/* 雷达扫描线 - 反向扫描 */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                        background: `conic-gradient(
                            from 180deg,
                            transparent 0deg,
                            rgba(var(--theme-primary-rgb), 0.15) 25deg,
                            rgba(var(--theme-primary-rgb), 0.3) 50deg,
                            rgba(var(--theme-primary-rgb), 0.15) 75deg,
                            transparent 100deg,
                            transparent 360deg
                        )`,
                        animation: 'rotate-glow 4s linear infinite reverse',
                        filter: 'blur(2px)',
                        mixBlendMode: 'screen'
                    }}
                ></div>

                {/* 中心点 */}
                <div
                    className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                        width: size * 0.08,
                        height: size * 0.08,
                        top: '50%',
                        left: '50%',
                        backgroundColor: 'var(--theme-primary)',
                        boxShadow: `
                            0 0 ${size * 0.08}px rgba(var(--theme-primary-rgb), 0.8),
                            0 0 ${size * 0.15}px rgba(var(--theme-primary-rgb), 0.4)
                        `,
                        animation: 'breathing-glow 1.8s ease-in-out infinite'
                    }}
                ></div>

                {/* 中心Loading文字 - 居中显示 */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                        zIndex: 30,
                    }}
                >
                    <span
                        className="text-lg font-medium"
                        style={{
                            color: 'white',
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)',
                            animation: 'breathing-glow 2s ease-in-out infinite'
                        }}
                    >
                        {loadingText}
                    </span>
                </div>
            </div>
        );
    };

    // 如果不显示遮罩，直接返回雷达
    if (!showMask) {
        return <RadarLoading className={className} />;
    }

    // 带遮罩的完整组件
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
            onClick={onMaskClick}
            style={{ overflow: 'visible' }}
        >
            {/* 毛玻璃遮罩层 */}
            <div className={getMaskStyles()} />

            {/* 雷达加载指示器 */}
            <div className="relative z-10 flex flex-col items-center">
                <RadarLoading />
            </div>
        </div>
    );
};

CircularLoadingIndicator.propTypes = {
    size: PropTypes.number,
    showMask: PropTypes.bool,
    maskColor: PropTypes.oneOf(['black-glass', 'black-solid', 'default']),
    className: PropTypes.string,
    onMaskClick: PropTypes.func,
};

export default CircularLoadingIndicator;
