import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import GlowDivider from '../../ui/GlowDivider';
import './ContactSection.css';

const ContactSection = ({ language }) => {
    const { texts } = useAppStore();
    const contactTexts = texts[language].contact;

    const contactInfo = [
        {
            icon: "📧",
            title: "Email",
            value: contactTexts.emailAddress,
            href: `mailto:${contactTexts.emailAddress}`,
            description: language === 'en' ? 'Send me an email' : '发送邮件'
        },
        {
            icon: "📱",
            title: language === 'en' ? 'Phone' : '电话',
            value: contactTexts.phone,
            href: `tel:${contactTexts.phone}`,
            description: language === 'en' ? 'Give me a call' : '电话联系'
        },
        {
            icon: "📍",
            title: language === 'en' ? 'Location' : '位置',
            value: contactTexts.location,
            href: "https://maps.google.com/?q=Christchurch,New Zealand",
            description: language === 'en' ? 'Based in Christchurch' : '位于基督城'
        }
    ];

    const socialLinks = [
        {
            icon: "ri-github-fill",
            url: contactTexts.social.github.url,
            label: contactTexts.social.github.label,
            color: "hover:bg-gray-700"
        },
        {
            icon: "ri-linkedin-fill", 
            url: contactTexts.social.linkedin.url,
            label: contactTexts.social.linkedin.label,
            color: "hover:bg-blue-600"
        },
        {
            icon: "ri-google-fill",
            url: contactTexts.social.email.url,
            label: contactTexts.social.email.label,
            color: "hover:bg-red-600"
        }
    ];

    return (
        <div className="min-h-screen w-full p-4 sm:p-8 text-white flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* 标题部分 */}
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
                        {contactTexts.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl text-white/70 font-light italic mb-8">
                        {contactTexts.subtitle || (language === 'en' ? 'get in touch' : '联系我')}
                    </h2>
                    
                    {/* 标题与内容之间的分隔线 */}
                    <div className="w-full max-w-4xl mb-8">
                        <GlowDivider width="w-full" enhanced={true} />
                    </div>
                    
                    <p className="text-base text-gray-400 max-w-2xl mx-auto">
                        {contactTexts.description}
                    </p>
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
                                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 hover:from-white/20 hover:to-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group contact-info-card text-center border border-white/10 shine-card shine-blue"
                            >
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {info.title}
                                </h3>
                                <p className="text-blue-300 font-medium mb-3 text-lg">
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
                            </a>
                        ))}
                    </div>

                    {/* 社交媒体链接 - 居中 */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-8 text-white">
                            {language === 'en' ? 'Connect with me' : '社交媒体'}
                        </h3>
                        <div className="flex justify-center space-x-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-16 h-16 inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-2xl text-white no-underline transition-all duration-500 hover:shadow-2xl hover:scale-110 social-link shine-card ${social.color} hover:border-white/40`}
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
                            {language === 'en' 
                                ? 'Looking forward to hearing from you!' 
                                : '期待您的联系！'
                            }
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
