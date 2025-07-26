import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactPage = () => {
    const { content } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: 实现表单提交逻辑
        console.log('Form submitted:', formData);
        // 可以集成EmailJS或其他邮件服务
    };

    return (
        <div className="w-full h-full overflow-auto p-8">
            <div className="max-w-4xl mx-auto">
                {/* 标题 */}
                <div className="content-section p-8 mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
                        {content.contact.title}
                    </h1>
                    <p className="text-xl text-gray-300">
                        {content.contact.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 联系信息 */}
                    <div className="content-section p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-green-300">
                            {content.contact.info}
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4 p-4 text-enhanced rounded-lg">
                                <FaEnvelope className="text-green-400 text-xl flex-shrink-0" />
                                <div>
                                    <p className="text-gray-200">aemooooon@gmail.com</p>
                                    <p className="text-sm text-gray-400">Email</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 p-4 text-enhanced rounded-lg">
                                <FaLinkedin className="text-green-400 text-xl flex-shrink-0" />
                                <div>
                                    <a 
                                        href="https://www.linkedin.com/in/aemonwang" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-200 hover:text-green-400 transition-colors"
                                    >
                                        linkedin.com/in/aemonwang
                                    </a>
                                    <p className="text-sm text-gray-400">LinkedIn</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 p-4 text-enhanced rounded-lg">
                                <FaGithub className="text-green-400 text-xl flex-shrink-0" />
                                <div>
                                    <a 
                                        href="https://github.com/aemooooon" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-200 hover:text-green-400 transition-colors"
                                    >
                                        github.com/aemooooon
                                    </a>
                                    <p className="text-sm text-gray-400">GitHub</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 p-4 text-enhanced rounded-lg">
                                <FaMapMarkerAlt className="text-green-400 text-xl flex-shrink-0" />
                                <div>
                                    <p className="text-gray-200">{content.contact.location}</p>
                                    <p className="text-sm text-gray-400">Location</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 联系表单 */}
                    <div className="content-section p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-green-300">
                            {content.contact.send}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={content.contact.name}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={content.contact.email}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            
                            <div>
                                <textarea
                                    name="message"
                                    placeholder={content.contact.message}
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full p-4 bg-black/30 border border-green-500/30 rounded-lg text-white placeholder-gray-400 focus:border-green-400 focus:outline-none resize-none transition-colors"
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full py-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 hover:bg-green-500/30 hover:border-green-400 transition-all duration-300 flex items-center justify-center space-x-2 group"
                            >
                                <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                                <span>{content.contact.send}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
