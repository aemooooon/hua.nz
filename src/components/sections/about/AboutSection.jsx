import { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../../data/hua_icon_base64';
import { useAppStore } from '../../../store/useAppStore';
import { useTheme } from '../../../hooks/useTheme';

const EffectAvatar = lazy(() => import('../../background/EffectAvatar'));

const AboutSection = ({ language = 'en' }) => {
    const { getNewContent, getText } = useAppStore();
    const { getThemeColors } = useTheme();
    const content = getNewContent();
    const themeColors = getThemeColors();

    // 直接访问 about 内容
    const paragraphs = content.about.paragraphs[language] || content.about.paragraphs.en || [];

    // 解析 greeting 为三个部分：问候语、连接词、姓名
    const parseGreeting = () => {
        if (language === 'zh') {
            // 中文：你好，我是王华
            return {
                greeting: '你好',
                connector: '，我是',
                name: '王华',
            };
        } else {
            // 英文：Kia ora, I'm Hua Wang
            return {
                greeting: 'Kia ora',
                connector: "I'm",
                name: 'Hua Wang',
            };
        }
    };

    const { greeting: greetingPart, connector, name } = parseGreeting();

    // 优化：延迟渲染 Avatar 组件以提升 LCP
    const [showAvatar, setShowAvatar] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowAvatar(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen w-full relative overflow-hidden golden-ratio-container">
            {/* 主要内容容器 - 按黄金分割比例布局 */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-screen px-4 sm:px-6 lg:px-8 py-8 about-section-spacing">
                <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-stretch">
                    {/* 头像区域 - 黄金分割的较小部分 (约38%) */}
                    <div className="w-full about-avatar-area flex items-center justify-center mb-8 lg:mb-0 order-1 lg:order-1 avatar-cube-alignment">
                        {/* 头像包装器 - 向左移动以与cube对齐 */}
                        <div className="about-avatar-wrapper">
                            <div className="relative">
                                {/* 头像容器 - 圆形镜子外围主题色灯带效果 */}
                                <div
                                    className="about-avatar-container relative rounded-full overflow-hidden bg-theme-surface/50 backdrop-blur-sm border-4 border-theme-primary transition-all duration-500"
                                    style={{
                                        filter: `
                                     drop-shadow(0 0 5px var(--theme-primary))
                                     drop-shadow(0 0 10px rgba(var(--theme-primary-rgb), 0.6))
                                     drop-shadow(0 0 15px rgba(var(--theme-primary-rgb), 0.4))
                                 `,
                                        boxShadow: `
                                     0 0 8px var(--theme-primary),
                                     0 0 15px rgba(var(--theme-primary-rgb), 0.8),
                                     0 0 22px rgba(var(--theme-primary-rgb), 0.6),
                                     inset 0 0 5px rgba(var(--theme-primary-rgb), 0.3)
                                 `,
                                        animation: 'avatar-glow 3s ease-in-out infinite',
                                    }}
                                >
                                    {/* 旋转背光效果 - 使用主题变量 */}
                                    <div
                                        className="absolute -inset-3 rounded-full pointer-events-none"
                                        style={{
                                            background: `
                                         conic-gradient(
                                             from 0deg,
                                             transparent 0deg,
                                             rgba(var(--theme-primary-rgb), 0.3) 45deg,
                                             rgba(var(--theme-primary-rgb), 0.4) 90deg,
                                             rgba(var(--theme-primary-rgb), 0.3) 135deg,
                                             transparent 180deg,
                                             transparent 360deg
                                         )
                                     `,
                                            animation: 'rotate-glow 4s linear infinite',
                                            filter: 'blur(3px)',
                                            mixBlendMode: 'screen', // 使用混合模式增强可见性
                                            zIndex: 4, // 提高z-index，让雷达效果在粒子上方
                                        }}
                                    ></div>
                                    {/* 外层雷达环 - 增强雷达扫描效果的可见性 */}
                                    <div
                                        className="absolute -inset-4 rounded-full pointer-events-none"
                                        style={{
                                            background: `
                                         conic-gradient(
                                             from 0deg,
                                             transparent 0deg,
                                             rgba(var(--theme-primary-rgb), 0.15) 30deg,
                                             rgba(var(--theme-primary-rgb), 0.25) 60deg,
                                             rgba(var(--theme-primary-rgb), 0.15) 90deg,
                                             transparent 120deg,
                                             transparent 360deg
                                         )
                                     `,
                                            animation: 'rotate-glow 6s linear infinite reverse',
                                            filter: 'blur(4px)',
                                            mixBlendMode: 'screen', // 使用混合模式增强可见性
                                            zIndex: 0, // 最底层
                                        }}
                                    ></div>
                                    {/* 静态内层光晕 */}
                                    <div
                                        className="absolute -inset-1 rounded-full pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle, transparent 70%, rgba(var(--theme-primary-rgb), 0.15) 85%, transparent 100%)`,
                                            boxShadow: `
                                         0 0 4px rgba(var(--theme-primary-rgb), 0.6),
                                         inset 0 0 4px rgba(var(--theme-primary-rgb), 0.3)
                                     `,
                                            zIndex: 2, // 设置中等的z-index
                                        }}
                                    ></div>
                                    {/* 延迟渲染 Avatar 以优化 LCP */}
                                    {showAvatar ? (
                                        <Suspense
                                            fallback={
                                                <div className="w-full h-full flex items-center justify-center bg-theme-surface rounded-full">
                                                    <div className="w-full h-full bg-theme-surface rounded-full" />
                                                </div>
                                            }
                                        >
                                            <EffectAvatar
                                                imageSrc={imageSrc}
                                                hoverImageSrc="/hua_hover.jpg"
                                            />
                                        </Suspense>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-theme-surface rounded-full">
                                            <div className="w-full h-full bg-theme-surface rounded-full" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 卡片区域 - 黄金分割的较大部分 (约62%) */}
                    <div className="w-full about-content-area flex flex-col justify-center order-2 lg:order-2">
                        {/* 内容容器 - 内部也应用黄金比例的留白 */}
                        <div className="about-card-container">
                            {/* 使用与 ProjectSection 相同的卡片样式 */}
                            <div className="content-section glass-card p-6 lg:p-8 xl:p-10 w-full relative">
                                {/* 内容层 */}
                                <div className="relative z-10 about-card-content">
                                    {/* 个人陈述内容 */}
                                    <div className="space-y-6" style={{ overflow: 'visible' }}>
                                        {/* 简化的一行式问候语 */}
                                        <div
                                            className="greeting-container"
                                            style={{ overflow: 'visible' }}
                                        >
                                            <div
                                                className="simple-greeting-line"
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'visible',
                                                    fontSize: '0', // 防止inline-block间隙
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontFamily: 'Fredoka One, cursive',
                                                        fontSize: '2.5rem',
                                                        background:
                                                            'linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-via), var(--theme-gradient-to))',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        backgroundClip: 'text',
                                                        display: 'inline-block',
                                                        fontWeight: '400',
                                                        verticalAlign: 'baseline',
                                                        filter: 'drop-shadow(0 0 8px var(--theme-primary))',
                                                    }}
                                                >
                                                    {greetingPart}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: 'Figtree, sans-serif',
                                                        fontSize: '1.8rem',
                                                        color: '#FFFFFF', // 改为纯白色，保持高对比度
                                                        fontWeight: '300',
                                                        display: 'inline-block',
                                                        marginLeft: '0.75rem',
                                                        verticalAlign: 'baseline',
                                                    }}
                                                >
                                                    {connector}
                                                </span>
                                                <span
                                                    style={{
                                                        fontFamily: 'Beau Rivage, cursive',
                                                        fontSize: '3rem',
                                                        color: '#FFFFFF', // 改为纯白色
                                                        display: 'inline-block',
                                                        fontWeight: '400',
                                                        marginLeft: '0.75rem',
                                                        verticalAlign: 'baseline',
                                                        textShadow:
                                                            '0 0 8px rgba(255, 255, 255, 0.5)', // 使用白色文本阴影替代主题色滤镜
                                                    }}
                                                >
                                                    {name}
                                                </span>
                                            </div>
                                        </div>

                                        {paragraphs.map((paragraph, index) => {
                                            // 检测是否包含 "trade-off" 并智能插入Resume链接
                                            const containsTradeOff =
                                                paragraph.includes('trade-off');

                                            if (containsTradeOff) {
                                                // 将段落按 "trade-off" 分割
                                                const parts = paragraph.split('trade-off');

                                                return (
                                                    <p
                                                        key={index}
                                                        className="text-base lg:text-lg leading-relaxed programmer-text-white"
                                                        style={{
                                                            textAlign: 'justify',
                                                            textJustify: 'inter-word',
                                                            hyphens: 'auto',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {parts[0]}trade-off.{' '}
                                                        {/* 在trade-off后面插入Resume链接 */}
                                                        <span className="inline-block">
                                                            <a
                                                                href="/Hua_Wang_Full_Stack_Developer.pdf"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center transition-all duration-300 group"
                                                                style={{
                                                                    fontFamily:
                                                                        'Figtree, sans-serif',
                                                                    fontWeight: '500',
                                                                    textDecoration: 'none',
                                                                    color: themeColors.primary,
                                                                }}
                                                            >
                                                                <span className="relative">
                                                                    {getText('about.resume')}
                                                                    {/* Hover下划线效果 */}
                                                                    <span
                                                                        className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                                                                        style={{
                                                                            backgroundColor: themeColors.primary,
                                                                            boxShadow: `0 0 4px ${themeColors.primary}99`,
                                                                        }}
                                                                    ></span>
                                                                </span>
                                                                {/* 省略号图标 */}
                                                                <span
                                                                    className="ml-1 transition-all duration-300"
                                                                    style={{
                                                                        filter: `drop-shadow(0 0 3px ${themeColors.primary}80)`,
                                                                        fontSize: '0.9em',
                                                                    }}
                                                                >
                                                                    ...
                                                                </span>
                                                            </a>
                                                        </span>
                                                    </p>
                                                );
                                            } else {
                                                // 正常段落，不包含trade-off
                                                return (
                                                    <p
                                                        key={index}
                                                        className="text-base lg:text-lg leading-relaxed programmer-text-white"
                                                        style={{
                                                            textAlign: 'justify',
                                                            textJustify: 'inter-word',
                                                            hyphens: 'auto',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {paragraph}
                                                    </p>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AboutSection.propTypes = {
    language: PropTypes.string.isRequired,
};

export default AboutSection;
