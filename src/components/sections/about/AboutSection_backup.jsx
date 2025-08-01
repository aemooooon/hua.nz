import { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { FaSpinner } from 'react-icons/fa';
import { useAppStore } from '../../../store/useAppStore';

const Avatar = lazy(() => import('../../Avatar'));

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
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* 主要内容容器 - 按黄金分割比例布局 */}
            <div className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-screen p-4 lg:p-6 xl:p-8">
                {/* 卡片区域 - 黄金分割的较大部分 (约62%) */}
                <div className="w-full lg:w-[62%] flex flex-col justify-center order-2 lg:order-1 lg:pr-6 xl:pr-8">
                    {/* 内容容器 - 内部也应用黄金比例的留白 */}
                    <div className="w-full max-w-none lg:max-w-[85%] xl:max-w-[80%] lg:ml-auto lg:mr-6">
                        {/* 增强毛玻璃背景卡片 */}
                        <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl p-6 lg:p-8 xl:p-10 w-full relative">
                        {/* 额外的内层毛玻璃效果 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20 rounded-xl backdrop-blur-sm"></div>
                        {/* 内容层 */}
                        <div className="relative z-10">
                            {/* 个人陈述内容 */}
                            <div className="space-y-6">
                                <h2 className="text-2xl lg:text-3xl font-bold text-blue-400 mb-6 font-beauRivage">{greeting}</h2>
                                {paragraphs.map((paragraph, index) => (
                                    <p key={index} className="text-base lg:text-lg leading-relaxed text-gray-200" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: '400' }}>
                                        {paragraph}
                                    </p>
                                ))}
                            
                            {/* Resume 链接 - 简化版本 */}
                            <div className="mt-8 pt-6">
                                <a 
                                    href="/Hua_Wang_Full_Stack_Engineer.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block text-green-400 hover:text-green-300 font-medium transition-all duration-300 hover:scale-105 border-b border-green-400/50 hover:border-green-300 pb-1"
                                    style={{ fontFamily: 'Figtree, sans-serif', fontWeight: '500' }}
                                >
                                    {language === 'en' ? 'Resume' : '简历'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 头像区域 - 黄金分割的较小部分 (约38%) */}
                <div className="w-full lg:w-[38%] flex items-center justify-center mb-8 lg:mb-0 order-1 lg:order-2 lg:pl-6 xl:pl-8">
                    <div className="relative">
                        {/* 头像容器 - 圆形镜子外围绿色灯带效果 */}
                        <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 relative rounded-full overflow-hidden bg-gray-900/50 backdrop-blur-sm border-4 border-green-300"
                             style={{
                                 filter: `
                                     drop-shadow(0 0 5px rgba(134, 239, 172, 0.8))
                                     drop-shadow(0 0 10px rgba(134, 239, 172, 0.6))
                                     drop-shadow(0 0 15px rgba(134, 239, 172, 0.4))
                                 `,
                                 boxShadow: `
                                     0 0 8px rgba(134, 239, 172, 1),
                                     0 0 15px rgba(134, 239, 172, 0.8),
                                     0 0 22px rgba(134, 239, 172, 0.6),
                                     inset 0 0 5px rgba(134, 239, 172, 0.3)
                                 `,
                                 animation: 'avatar-glow 3s ease-in-out infinite'
                             }}>
                            {/* 旋转背光效果 - 雷达颜色调浅，保持光晕亮度 */}
                            <div className="absolute -inset-3 rounded-full pointer-events-none"
                                 style={{
                                     background: `
                                         conic-gradient(
                                             from 0deg,
                                             transparent 0deg,
                                             rgba(134, 239, 172, 0.2) 45deg,
                                             rgba(134, 239, 172, 0.3) 90deg,
                                             rgba(134, 239, 172, 0.2) 135deg,
                                             transparent 180deg,
                                             transparent 360deg
                                         )
                                     `,
                                     animation: 'rotate-glow 4s linear infinite',
                                     filter: 'blur(3px)'
                                 }}>
                            </div>
                            {/* 静态内层光晕（保持亮度，减小雷达强度） */}
                            <div className="absolute -inset-1 rounded-full pointer-events-none" 
                                 style={{
                                     background: 'radial-gradient(circle, transparent 70%, rgba(134, 239, 172, 0.15) 85%, transparent 100%)',
                                     boxShadow: `
                                         0 0 4px rgba(134, 239, 172, 0.6),
                                         inset 0 0 4px rgba(134, 239, 172, 0.3)
                                     `
                                 }}>
                            </div>
                            {/* 延迟渲染 Avatar 以优化 LCP */}
                            {showAvatar ? (
                                <Suspense 
                                    fallback={
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-full">
                                            <FaSpinner className="animate-spin text-green-500 text-4xl" />
                                        </div>
                                    }
                                >
                                    <Avatar imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                                </Suspense>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-full">
                                    <FaSpinner className="animate-spin text-green-500 text-4xl" />
                                </div>
                            )}
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
