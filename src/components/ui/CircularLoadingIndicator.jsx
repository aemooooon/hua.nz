import PropTypes from 'prop-types';

/**
 * 统一的圆环加载指示器组件
 *
 * 🎨 视觉特点：
 * - 完整圆环设计，不显示进度百分比
 * - 单层呼吸光晕效果，从内到外渐变
 * - 主题色适配，支持动态主题切换
 * - 简洁的"Loading..."文字显示
 *
 * 🔧 技术特点：
 * - 基于SVG的高质量圆环渲染
 * - CSS变量支持主题色动态切换
 * - 多层box-shadow创造丰富光晕效果
 * - 呼吸动画(breathing-glow) 3秒周期
 *
 * 📱 使用场景：
 * - 页面/组件加载状态
 * - 异步操作等待提示
 * - 资源加载进度显示
 *
 * @param {number} size - 圆环大小，默认120px
 * @param {number} strokeWidth - 圆环宽度，默认8px
 * @param {boolean} showMask - 是否显示毛玻璃遮罩，默认true
 * @param {string} maskColor - 遮罩颜色类型，默认'black-glass'
 * @param {string} className - 额外的CSS类名
 * @param {function} onMaskClick - 点击遮罩的回调函数
 */
const CircularLoadingIndicator = ({
    size = 120, // 圆环大小
    strokeWidth = 8, // 圆环宽度
    showMask = true, // 是否显示毛玻璃遮罩
    maskColor = 'black-glass', // 遮罩颜色：'black-glass' | 'black-solid' | 'default'
    className = '',
    onMaskClick = null, // 点击遮罩的回调
}) => {
    // 🔢 计算SVG圆环的基础参数
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    // 🔄 始终显示完整圆环，strokeDashoffset=0表示无间隙
    const strokeDashoffset = 0;

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

    // 🎨 SVG圆环组件 - 包含光晕效果和圆环本体
    const CircularProgress = ({ className: circleClassName = '' }) => {
        return (
            <div
                className={`relative ${circleClassName}`}
                style={{
                    width: size, // 🏠 主容器保持原始尺寸
                    height: size,
                    overflow: 'visible', // 🌟 允许光晕效果溢出容器边界
                }}
            >
                {/* 💫 单层呼吸光晕效果 - 从内到外4层渐变，营造自然光晕 */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        width: size + 80, // 📏 适中的光晕范围，向外扩展40px
                        height: size + 80,
                        top: -40, // ⬆️ 向上偏移以居中
                        left: -40, // ⬅️ 向左偏移以居中
                        borderRadius: '50%', // 🔵 确保完美圆形
                        // 🌈 4层径向渐变：透明 → 0.25 → 0.15 → 0.08 → 透明
                        background: `radial-gradient(circle,
                            transparent 60%,
                            rgba(var(--theme-primary-rgb), 0.25) 75%,
                            rgba(var(--theme-primary-rgb), 0.15) 85%,
                            rgba(var(--theme-primary-rgb), 0.08) 92%,
                            transparent 100%
                        )`,
                        // ✨ 3层box-shadow创造立体光晕效果
                        boxShadow: `
                            0 0 ${Math.max(size * 0.1, 15)}px rgba(var(--theme-primary-rgb), 0.4),
                            0 0 ${Math.max(size * 0.2, 25)}px rgba(var(--theme-primary-rgb), 0.2),
                            inset 0 0 ${Math.max(size * 0.05, 6)}px rgba(var(--theme-primary-rgb), 0.15)
                        `,
                        // 💨 呼吸动画：3秒周期，opacity+scale+blur三重变化
                        animation: 'breathing-glow 3s ease-in-out infinite',
                        zIndex: 2,
                    }}
                />

                {/* SVG圆环 - 保持在中心，添加圆环专用光效 */}
                <div
                    className="absolute"
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        // 使用box-shadow为SVG圆环添加光效
                        boxShadow: `
                            0 0 ${Math.max(size * 0.03, 4)}px var(--theme-primary),
                            0 0 ${Math.max(size * 0.06, 8)}px rgba(var(--theme-primary-rgb), 0.6),
                            0 0 ${Math.max(size * 0.09, 12)}px rgba(var(--theme-primary-rgb), 0.4),
                            inset 0 0 ${Math.max(size * 0.02, 3)}px rgba(var(--theme-primary-rgb), 0.2)
                        `,
                        animation: 'avatar-glow 3s ease-in-out infinite',
                        zIndex: 9,
                    }}
                />
                <svg
                    width={size}
                    height={size}
                    className="transform -rotate-90 relative"
                    style={{
                        zIndex: 10,
                    }}
                >
                    {/* 背景圆环 - 透明白色，去除阴影 */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth={strokeWidth}
                    />
                    {/* 进度圆环 - 显示完整圆环，去除旋转动画 */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="var(--theme-primary)"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 ease-out"
                        style={{
                            transformOrigin: 'center',
                        }}
                    />
                </svg>

                {/* 中心内容 - 直接定位在容器中心 */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                    style={{
                        zIndex: 20,
                    }}
                >
                    {/* Loading文字保持原有样式和呼吸效果 */}
                    <span className="text-white/90 text-lg font-medium drop-shadow-md">
                        Loading...
                    </span>
                </div>
            </div>
        );
    };

    // 如果不显示遮罩，直接返回圆环
    if (!showMask) {
        return <CircularProgress className={className} />;
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

            {/* 加载指示器 */}
            <div className="relative z-10">
                <CircularProgress />
            </div>
        </div>
    );
};

CircularLoadingIndicator.propTypes = {
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    showMask: PropTypes.bool,
    maskColor: PropTypes.oneOf(['black-glass', 'black-solid', 'default']),
    className: PropTypes.string,
    onMaskClick: PropTypes.func,
};

export default CircularLoadingIndicator;
