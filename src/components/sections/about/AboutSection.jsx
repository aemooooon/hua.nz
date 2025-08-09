import { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../../data/hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { useAppStore } from '../../../store/useAppStore';
import { ThemeDescription, ThemeButton } from '../../ui/ThemeComponents';
import '../../ui/ShineCard.css'; // 导入光影效果

const EffectAvatar = lazy(() => import('../../background/EffectAvatar'));

const AboutSection = ({ language = 'en' }) => {
    const { getContent } = useAppStore();
    const content = getContent();
    // 获取个人陈述内容
    const statementPage = content.about.pages.find(page => page.id === 'statement');
    const { paragraphs } = statementPage?.content || { paragraphs: [] };

    // 优化：延迟渲染 Avatar 组件以提升 LCP
    const [showAvatar, setShowAvatar] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setShowAvatar(true), 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen w-full relative overflow-hidden golden-ratio-container">
            {/* 主要内容容器 - 按黄金分割比例布局 */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-screen p-4 lg:p-6 xl:p-8 about-section-spacing">
                {/* 卡片区域 - 黄金分割的较大部分 (约62%) */}
                <div className="w-full about-content-area flex flex-col justify-center order-2 lg:order-1">
                    {/* 内容容器 - 内部也应用黄金比例的留白 */}
                    <div className="about-card-container">
                        {/* 增强毛玻璃背景卡片 + 光影效果 */}
                        <div className="content-section shine-card shine-blue p-6 lg:p-8 xl:p-10 w-full relative">
                            {/* 内容层 */}
                            <div className="relative z-10 about-card-content shine-content">
                                {/* 个人陈述内容 */}
                                <div className="space-y-6" style={{ overflow: 'visible' }}>
                                    {/* 简化的一行式问候语 */}
                                    <div className="greeting-container" style={{ overflow: 'visible' }}>
                                        <div className="simple-greeting-line" style={{ 
                                            whiteSpace: 'nowrap', 
                                            overflow: 'visible',
                                            fontSize: '0' // 防止inline-block间隙
                                        }}>
                                            <span 
                                                style={{ 
                                                    fontFamily: 'Fredoka One, cursive',
                                                    fontSize: '2.5rem',
                                                    background: 'linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-via), var(--theme-gradient-to))',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                    display: 'inline-block',
                                                    fontWeight: '400',
                                                    verticalAlign: 'baseline'
                                                }}
                                            >
                                                Kia ora
                                            </span>
                                            <span 
                                                style={{ 
                                                    fontFamily: 'Figtree, sans-serif',
                                                    fontSize: '1.8rem',
                                                    color: 'var(--theme-text-secondary)',
                                                    fontWeight: '300',
                                                    display: 'inline-block',
                                                    marginLeft: '0.75rem',
                                                    verticalAlign: 'baseline'
                                                }}
                                            >
                                                I&apos;m
                                            </span>
                                            <span 
                                                style={{ 
                                                    fontFamily: 'Beau Rivage, cursive',
                                                    fontSize: '3rem',
                                                    background: 'linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-via), var(--theme-gradient-to))',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                    display: 'inline-block',
                                                    fontWeight: '400',
                                                    marginLeft: '0.75rem',
                                                    verticalAlign: 'baseline'
                                                }}
                                            >
                                                Hua Wang
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {paragraphs.map((paragraph, index) => (
                                        <ThemeDescription 
                                            key={index} 
                                            className="text-base lg:text-lg leading-relaxed programmer-text" 
                                            style={{ 
                                                fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace', 
                                                fontWeight: '400',
                                                fontSize: '0.95rem',
                                                lineHeight: '1.6',
                                                background: 'linear-gradient(135deg, var(--theme-gradient-from), var(--theme-gradient-via), var(--theme-gradient-to))',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                                display: 'block'
                                            }}
                                        >
                                            {paragraph}
                                        </ThemeDescription>
                                    ))}
                                
                                {/* Resume 链接 */}
                                <div className="resume-section flex items-center justify-end space-x-4">
                                    <ThemeButton
                                        as="a"
                                        href="/Hua_Wang_Full_Stack_Engineer.pdf" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        download="Hua_Wang_Full_Stack_Engineer.pdf"
                                        variant="ghost"
                                        className="font-medium border-b border-theme-primary/50 hover:border-theme-primary pb-1 transition-all duration-300"
                                        style={{ fontFamily: 'Figtree, sans-serif', fontWeight: '500' }}
                                    >
                                        {language === 'en' ? 'Resume' : '简历'}
                                    </ThemeButton>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 头像区域 - 黄金分割的较小部分 (约42%) */}
                <div className="w-full about-avatar-area flex items-center justify-center mb-8 lg:mb-0 order-1 lg:order-2 avatar-cube-alignment">
                    {/* 头像包装器 - 向左移动以与cube对齐 */}
                    <div className="about-avatar-wrapper">
                        <div className="relative">
                            {/* 头像容器 - 圆形镜子外围主题色灯带效果 */}
                            <div className="about-avatar-container relative rounded-full overflow-hidden bg-theme-surface/50 backdrop-blur-sm border-4 border-theme-primary transition-all duration-500"
                             style={{
                                 filter: `
                                     drop-shadow(0 0 5px var(--theme-avatar-glow))
                                     drop-shadow(0 0 10px rgba(0, 255, 255, 0.6))
                                     drop-shadow(0 0 15px rgba(0, 255, 255, 0.4))
                                 `,
                                 boxShadow: `
                                     0 0 8px var(--theme-avatar-glow),
                                     0 0 15px rgba(0, 255, 255, 0.8),
                                     0 0 22px rgba(0, 255, 255, 0.6),
                                     inset 0 0 5px rgba(0, 255, 255, 0.3)
                                 `,
                                 animation: 'avatar-glow 3s ease-in-out infinite'
                             }}>
                            {/* 旋转背光效果 - 使用主题变量 */}
                            <div className="absolute -inset-3 rounded-full pointer-events-none"
                                 style={{
                                     background: `
                                         conic-gradient(
                                             from 0deg,
                                             transparent 0deg,
                                             rgba(0, 255, 255, 0.2) 45deg,
                                             rgba(0, 255, 255, 0.3) 90deg,
                                             rgba(0, 255, 255, 0.2) 135deg,
                                             transparent 180deg,
                                             transparent 360deg
                                         )
                                     `,
                                     animation: 'rotate-glow 4s linear infinite',
                                     filter: 'blur(3px)'
                                 }}>
                            </div>
                            {/* 静态内层光晕 */}
                            <div className="absolute -inset-1 rounded-full pointer-events-none" 
                                 style={{
                                     background: 'radial-gradient(circle, transparent 70%, rgba(0, 255, 255, 0.15) 85%, transparent 100%)',
                                     boxShadow: `
                                         0 0 4px rgba(0, 255, 255, 0.6),
                                         inset 0 0 4px rgba(0, 255, 255, 0.3)
                                     `
                                 }}>
                            </div>
                            {/* 延迟渲染 Avatar 以优化 LCP */}
                            {showAvatar ? (
                                <Suspense 
                                    fallback={
                                        <div className="w-full h-full flex items-center justify-center bg-theme-surface rounded-full">
                                            <div className="w-full h-full bg-theme-surface rounded-full" />
                                        </div>
                                    }
                                >
                                    <EffectAvatar imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
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
            </div>
        </div>
    );
};

AboutSection.propTypes = {
    language: PropTypes.string.isRequired
};

export default AboutSection;
