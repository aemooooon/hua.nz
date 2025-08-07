import { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../../data/hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { useAppStore } from '../../../store/useAppStore';
import { ThemeTitle, ThemeDescription, ThemeButton } from '../../ui/ThemeComponents';

const EffectAvatar = lazy(() => import('../../background/EffectAvatar'));

const AboutSection = ({ language = 'en' }) => {
    const { getContent } = useAppStore();
    const content = getContent();
    // 获取个人陈述内容
    const statementPage = content.about.pages.find(page => page.id === 'statement');
    const { greeting, paragraphs } = statementPage?.content || { greeting: '', paragraphs: [] };

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
                        {/* 增强毛玻璃背景卡片 */}
                        <div className="content-section p-6 lg:p-8 xl:p-10 w-full relative">
                            {/* 内容层 */}
                            <div className="relative z-10 about-card-content">
                                {/* 个人陈述内容 */}
                                <div className="space-y-6">
                                    <ThemeTitle level={2} className="font-beauRivage">
                                        {greeting}
                                    </ThemeTitle>
                                    {paragraphs.map((paragraph, index) => (
                                        <ThemeDescription key={index} className="text-base lg:text-lg leading-relaxed" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: '400' }}>
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
                                        variant="ghost"
                                        className="font-medium border-b border-theme-primary/50 hover:border-theme-primary pb-1"
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
                                 animation: 'avatar-glow 3s ease-in-out infinite'
                             }}>
                            {/* 旋转背光效果 - 使用主题变量 */}
                            <div className="avatar-rotating-glow"></div>
                            {/* 静态内层光晕 - 使用主题变量 */}
                            <div className="avatar-inner-glow"></div>
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
