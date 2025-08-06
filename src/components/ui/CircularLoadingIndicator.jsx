import PropTypes from 'prop-types';

/**
 * 统一的圆环加载指示器组件
 * 特点：大圆环、亮绿色进度、透明白色背景、毛玻璃遮罩
 */
const CircularLoadingIndicator = ({
    progress = 0,
    size = 120, // 圆环大小
    strokeWidth = 8, // 圆环宽度
    showProgress = true, // 是否显示进度数字
    showMask = true, // 是否显示毛玻璃遮罩
    loadingText = 'Loading...', // 默认英文文字
    loadingTextChinese = '加载中...', // 默认中文文字
    language = 'en',
    className = '',
    onMaskClick = null // 点击遮罩的回调
}) => {
    // 计算圆环参数
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = progress > 0 
        ? circumference - (progress / 100) * circumference 
        : circumference * 0.75; // 无进度时显示1/4圆弧
    
    // 显示文本
    const displayText = language === 'en' ? loadingText : loadingTextChinese;
    
    // SVG圆环组件
    const CircularProgress = ({ className: circleClassName = '' }) => (
        <div className={`relative ${circleClassName}`} style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* 背景圆环 - 透明白色 */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={strokeWidth}
                    className="drop-shadow-sm"
                />
                {/* 进度圆环 - 亮绿色 */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#10b981" // 亮绿色 (emerald-500)
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className={`transition-all duration-300 ease-out drop-shadow-lg ${
                        progress === 0 ? 'animate-spin' : ''
                    }`}
                    style={{
                        filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.6))',
                        transformOrigin: 'center'
                    }}
                />
            </svg>
            
            {/* 中心内容 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {showProgress && progress > 0 && (
                    <span className="text-white font-bold text-xl mb-1 drop-shadow-lg">
                        {Math.round(progress)}%
                    </span>
                )}
                {displayText && (
                    <span className="text-white/90 text-sm text-center px-2 font-medium drop-shadow-md">
                        {displayText}
                    </span>
                )}
            </div>
        </div>
    );
    
    // 如果不显示遮罩，直接返回圆环
    if (!showMask) {
        return <CircularProgress className={className} />;
    }
    
    // 带遮罩的完整组件
    return (
        <div 
            className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
            onClick={onMaskClick}
        >
            {/* 毛玻璃遮罩层 */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-lg backdrop-saturate-150" />
            
            {/* 加载指示器 */}
            <div className="relative z-10">
                <CircularProgress />
            </div>
        </div>
    );
};

CircularLoadingIndicator.propTypes = {
    progress: PropTypes.number,
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    showProgress: PropTypes.bool,
    showMask: PropTypes.bool,
    loadingText: PropTypes.string,
    loadingTextChinese: PropTypes.string,
    language: PropTypes.string,
    className: PropTypes.string,
    onMaskClick: PropTypes.func
};

export default CircularLoadingIndicator;
