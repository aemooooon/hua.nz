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
            icon: "📧",
            title: contactTexts.contactMethods.email.title,
            value: contactTexts.emailAddress,
            href: `mailto:${contactTexts.emailAddress}`,
            description: contactTexts.contactMethods.email.description,
            shineColor: "shine-blue"
        },
        {
            icon: "📱",
            title: contactTexts.contactMethods.phone.title,
            value: contactTexts.phone,
            href: `tel:${contactTexts.phone}`,
            description: contactTexts.contactMethods.phone.description,
            shineColor: "shine-green"
        },
        {
            icon: "📍",
            title: contactTexts.contactMethods.location.title,
            value: contactTexts.location,
            href: "https://maps.google.com/?q=Christchurch,New Zealand",
            description: contactTexts.contactMethods.location.description,
            shineColor: "shine-purple"
        }
    ];

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
                {                /* 标题部分 */}
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
                <div className="max-w-4xl mx-auto">
                    {/* 联系信息卡片网格 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.href}
                                target={info.href.startsWith('http') ? '_blank' : '_self'}
                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 hover:from-white/20 hover:to-white/10 transition-all duration-300 group contact-info-card text-center border border-white/5 shine-card ${info.shineColor}`}
                            >
                                <div className="shine-content">
                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {info.icon}
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
                        ))}
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
