import { useAppStore } from '../store/useAppStore';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ContactPage = () => {
    const { getContent } = useAppStore();
    const content = getContent();

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
                    <p className="text-gray-400 mt-4">
                        {content.contact.description}
                    </p>
                </div>

                {/* 联系信息 - 居中显示 */}
                <div className="content-section p-8 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-8 text-green-300 text-center">
                        {content.contact.info}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-4 p-6 text-enhanced rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all">
                            <FaEnvelope className="text-green-400 text-2xl flex-shrink-0" />
                            <div>
                                <a 
                                    href={`mailto:${content.contact.emailAddress}`}
                                    className="text-gray-200 hover:text-green-400 transition-colors block"
                                >
                                    {content.contact.emailAddress}
                                </a>
                                <p className="text-sm text-gray-400">Email</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-6 text-enhanced rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all">
                            <FaPhone className="text-green-400 text-2xl flex-shrink-0" />
                            <div>
                                <a 
                                    href={`tel:${content.contact.phone}`}
                                    className="text-gray-200 hover:text-green-400 transition-colors block"
                                >
                                    {content.contact.phone}
                                </a>
                                <p className="text-sm text-gray-400">Phone</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-6 text-enhanced rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all">
                            <FaLinkedin className="text-green-400 text-2xl flex-shrink-0" />
                            <div>
                                <a 
                                    href={content.contact.social.linkedin.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-200 hover:text-green-400 transition-colors block"
                                >
                                    {content.contact.social.linkedin.label}
                                </a>
                                <p className="text-sm text-gray-400">LinkedIn</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-6 text-enhanced rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all">
                            <FaGithub className="text-green-400 text-2xl flex-shrink-0" />
                            <div>
                                <a 
                                    href={content.contact.social.github.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-200 hover:text-green-400 transition-colors block"
                                >
                                    {content.contact.social.github.label}
                                </a>
                                <p className="text-sm text-gray-400">GitHub</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 p-6 text-enhanced rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all mt-6">
                        <FaMapMarkerAlt className="text-green-400 text-2xl flex-shrink-0" />
                        <div className="text-center">
                            <p className="text-gray-200">{content.contact.location}</p>
                            <p className="text-sm text-gray-400">Location</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
