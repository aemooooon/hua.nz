import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import GlowDivider from '../../ui/GlowDivider';
import { ThemeTitle, ThemeSubtitle, ThemeDescription } from '../../ui/ThemeComponents';
import './ContactSection.css';

const ContactSection = ({ language }) => {
    const { texts } = useAppStore();
    const contactTexts = texts[language].contact;

    const contactInfo = [
        {
            icon: "ri-phone-fill",
            title: contactTexts.contactMethods.phone.title,
            value: contactTexts.phone,
            href: `tel:${contactTexts.phone}`,
            description: contactTexts.contactMethods.phone.description,
            shineColor: "shine-green"
        },
        {
            icon: "ri-map-pin-fill",
            title: contactTexts.contactMethods.location.title,
            value: contactTexts.location,
            href: "https://maps.google.com/?q=Christchurch,New Zealand",
            description: contactTexts.contactMethods.location.description,
            shineColor: "shine-purple"
        }
    ];

    // 微信信息单独处理
    const wechatInfo = {
        icon: "ri-wechat-fill",
        title: contactTexts.contactMethods.wechat.title,
        value: contactTexts.contactMethods.wechat.id,
        description: contactTexts.contactMethods.wechat.description,
        qrCode: "/wechat.jpg",
        onClick: (e) => {
            e.preventDefault();
            // 复制微信号到剪贴板
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(contactTexts.contactMethods.wechat.id).then(() => {
                    alert(language === 'zh' ? 
                        `微信号已复制: ${contactTexts.contactMethods.wechat.id}` :
                        `WeChat ID copied: ${contactTexts.contactMethods.wechat.id}`);
                }).catch(() => {
                    alert(language === 'zh' ? 
                        `微信号: ${contactTexts.contactMethods.wechat.id}` :
                        `WeChat ID: ${contactTexts.contactMethods.wechat.id}`);
                });
            } else {
                // 降级处理：直接显示微信号
                alert(language === 'zh' ? 
                    `微信号: ${contactTexts.contactMethods.wechat.id}` :
                    `WeChat ID: ${contactTexts.contactMethods.wechat.id}`);
            }
        }
    };

    const socialLinks = [
        {
            icon: "ri-github-fill",
            url: contactTexts.social.github.url,
            label: contactTexts.social.github.label,
            color: "hover:bg-theme-surface"
        },
        {
            icon: "ri-linkedin-fill", 
            url: contactTexts.social.linkedin.url,
            label: contactTexts.social.linkedin.label,
            color: "hover:bg-theme-primary/80"
        },
        {
            icon: "ri-google-fill",
            url: contactTexts.social.email.url,
            label: contactTexts.social.email.label,
            color: "hover:bg-theme-error/80"
        }
    ];

    return (
        <div className="min-h-screen w-full p-4 sm:p-8 text-white flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* 标题部分 */}
                <div className="flex flex-col items-center text-center mb-12">
                    <ThemeTitle level={1} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 bg-gradient-to-r from-theme-gradient-from via-theme-gradient-via to-theme-gradient-to bg-clip-text text-transparent">
                        {contactTexts.title}
                    </ThemeTitle>
                    <ThemeSubtitle className="text-xl md:text-2xl font-light italic mb-8 text-theme-text-secondary/70">
                        {contactTexts.subtitle}
                    </ThemeSubtitle>
                    
                    {/* 标题与内容之间的分隔线 */}
                    <div className="w-full max-w-4xl mb-8">
                        <GlowDivider width="w-full" enhanced={true} />
                    </div>
                    
                    <ThemeDescription className="text-base max-w-2xl mx-auto text-theme-text-muted">
                        {contactTexts.description}
                    </ThemeDescription>
                </div>

                {/* 主要内容区域 - 居中布局 */}
                <div className="max-w-6xl mx-auto">
                    {/* 联系方式卡片 - 3列网格布局：phone, wechat, location */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {/* Phone Card */}
                        {contactInfo.map((info, index) => {
                            if (index === 0) { // Phone card
                                return (
                                    <a
                                        key={index}
                                        href={info.href}
                                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 hover:from-white/20 hover:to-white/10 transition-all duration-300 group contact-info-card text-center border border-white/5 shine-card ${info.shineColor}`}
                                    >
                                        <div className="shine-content">
                                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 text-theme-primary">
                                                <i className={info.icon}></i>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {info.title}
                                            </h3>
                                            <p className="text-blue-300 font-medium mb-3 text-lg phone">
                                                {info.value.replace('037', '***')}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {info.description}
                                            </p>
                                            <div className="mt-4 text-white/60 group-hover:text-white transition-colors flex justify-center">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>
                                );
                            }
                            return null;
                        })}
                        
                        {/* WeChat Card - 中间位置 */}
                        <div
                            onClick={wechatInfo.onClick}
                            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 hover:from-white/20 hover:to-white/10 transition-all duration-300 group contact-info-card text-center border border-white/5 shine-card shine-yellow cursor-pointer relative"
                        >
                            <div className="shine-content">
                                {/* 默认布局 - 与其他卡片一致 */}
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 text-theme-primary">
                                    <i className={wechatInfo.icon}></i>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {wechatInfo.title}
                                </h3>
                                <p className="text-blue-300 font-medium mb-3 text-lg">
                                    {wechatInfo.value}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {wechatInfo.description}
                                </p>
                                <div className="mt-4 text-white/60 group-hover:text-white transition-colors flex justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                
                                {/* 二维码悬浮层 - 固定定位在视口中央，最高层级 */}
                                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-[9999] pointer-events-none group-hover:pointer-events-auto">
                                    <div className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-gray-200 max-w-sm mx-4 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                                        {/* 标题 */}
                                        <div className="text-center mb-4">
                                            <div className="text-3xl mb-2 text-green-500">
                                                <i className={wechatInfo.icon}></i>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-800">
                                                {wechatInfo.title}
                                            </h4>
                                        </div>
                                        
                                        {/* 二维码图片 - 大尺寸，完全可见 */}
                                        <div className="flex justify-center mb-4">
                                            <img 
                                                src={wechatInfo.qrCode} 
                                                alt="WeChat QR Code"
                                                className="w-40 h-40 object-contain"
                                            />
                                        </div>
                                        
                                        {/* 底部信息 */}
                                        <div className="text-center">
                                            <p className="text-green-600 font-bold mb-2 text-lg">
                                                {wechatInfo.value}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {language === 'zh' ? '扫描二维码或点击复制微信号' : 'Scan QR code or click to copy WeChat ID'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Location Card - 右边位置 */}
                        {contactInfo.map((info, index) => {
                            if (index === 1) { // Location card
                                return (
                                    <a
                                        key={index}
                                        href={info.href}
                                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 hover:from-white/20 hover:to-white/10 transition-all duration-300 group contact-info-card text-center border border-white/5 shine-card ${info.shineColor}`}
                                    >
                                        <div className="shine-content">
                                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 text-theme-primary">
                                                <i className={info.icon}></i>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {info.title}
                                            </h3>
                                            <p className="text-blue-300 font-medium mb-3 text-lg phone">
                                                {info.value}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {info.description}
                                            </p>
                                            <div className="mt-4 text-white/60 group-hover:text-white transition-colors flex justify-center">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* 社交媒体链接 - 居中 */}
                    <div className="text-center">
                        <ThemeTitle level={3} className="text-2xl font-bold mb-8">
                            {contactTexts.connectWithMe}
                        </ThemeTitle>
                        <div className="flex justify-center space-x-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-16 h-16 inline-flex items-center justify-center p-4 bg-theme-surface/20 backdrop-blur-sm border-2 border-theme-border rounded-full text-2xl text-theme-text-primary no-underline transition-all duration-500 hover:shadow-2xl hover:scale-110 social-link hover:border-theme-primary/60 hover:bg-theme-hover`}
                                    title={social.label}
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 底部装饰 */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-2 text-gray-400">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-gray-400 decorative-line"></span>
                        <span className="text-sm">
                            {contactTexts.lookingForward}
                        </span>
                        <span className="w-8 h-px bg-gradient-to-l from-transparent to-gray-400 decorative-line"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactSection.propTypes = {
    language: PropTypes.string.isRequired
};

export default ContactSection;
