import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import './ContactSection.css';

const ContactSection = ({ language }) => {
    const { texts } = useAppStore();
    const contactTexts = texts[language].contact;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // 模拟提交过程
        setTimeout(() => {
            alert(language === 'en' ? 'Message sent successfully!' : '消息发送成功！');
            setFormData({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }, 1000);
    };

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
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        {contactTexts.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-4">
                        {contactTexts.subtitle}
                    </p>
                    <p className="text-base text-gray-400 max-w-2xl mx-auto">
                        {contactTexts.description}
                    </p>
                </div>

                {/* 主要内容区域 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* 左侧：联系信息 */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                                {contactTexts.info}
                            </h2>
                            
                            {/* 联系方式卡片 */}
                            <div className="space-y-4">
                                {contactInfo.map((info, index) => (
                                    <a
                                        key={index}
                                        href={info.href}
                                        target={info.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="block bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group contact-info-card"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                                {info.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-1">
                                                    {info.title}
                                                </h3>
                                                <p className="text-blue-300 font-medium mb-1">
                                                    {info.value}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {info.description}
                                                </p>
                                            </div>
                                            <div className="text-white/60 group-hover:text-white transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* 社交媒体链接 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-white">
                                {language === 'en' ? 'Connect with me' : '社交媒体'}
                            </h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-12 h-12 inline-flex items-center justify-center p-3 border-2 border-white/30 rounded-full text-xl text-white no-underline transition-all duration-500 hover:shadow-lg social-link ${social.color}`}
                                        title={social.label}
                                    >
                                        <i className={social.icon}></i>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 右侧：联系表单 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 contact-form-container">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                            {language === 'en' ? 'Send Message' : '发送消息'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    {contactTexts.name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 contact-input"
                                    placeholder={contactTexts.name}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {contactTexts.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 contact-input"
                                    placeholder={contactTexts.email}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    {contactTexts.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none contact-input"
                                    placeholder={contactTexts.message}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none submit-button"
                            >
                                {isSubmitting 
                                    ? (language === 'en' ? 'Sending...' : '发送中...') 
                                    : contactTexts.send
                                }
                            </button>
                        </form>
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
