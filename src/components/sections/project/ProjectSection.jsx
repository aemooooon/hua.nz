import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectMapModal from './ProjectMapModal';

const ProjectSection = ({ section, language }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);

    // 示例项目数据 - 增加更多项目来演示长内容滚动
    const projects = [
        {
            id: 1,
            title: { en: 'AI-Powered Web App', zh: 'AI驱动的Web应用' },
            description: { en: 'A comprehensive web application featuring machine learning capabilities, real-time data processing, and modern UI design.', zh: '一个具备机器学习能力、实时数据处理和现代UI设计的综合性Web应用程序。' },
            tech: ['React', 'Python', 'TensorFlow', 'WebGL'],
            image: '/jsjxmm.jpg',
            status: { en: 'Completed', zh: '已完成' }
        },
        {
            id: 2,
            title: { en: 'Real-time Data Visualization', zh: '实时数据可视化平台' },
            description: { en: 'Interactive dashboard for real-time data visualization with 3D graphics and advanced analytics capabilities.', zh: '具有3D图形和高级分析功能的实时数据可视化交互式仪表板。' },
            tech: ['Three.js', 'D3.js', 'WebSocket', 'Node.js'],
            image: '/data472/472.png',
            status: { en: 'In Progress', zh: '进行中' }
        },
        {
            id: 3,
            title: { en: 'E-commerce Platform', zh: '电商平台' },
            description: { en: 'Full-stack e-commerce platform with payment integration, inventory management, and mobile-responsive design.', zh: '具有支付集成、库存管理和移动响应式设计的全栈电商平台。' },
            tech: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
            image: '/fitsgo.gif',
            status: { en: 'Completed', zh: '已完成' }
        },
        {
            id: 4,
            title: { en: 'IoT Dashboard', zh: '物联网仪表板' },
            description: { en: 'Comprehensive IoT device management dashboard with real-time monitoring and control capabilities.', zh: '具有实时监控和控制功能的综合物联网设备管理仪表板。' },
            tech: ['Vue.js', 'MQTT', 'InfluxDB', 'Grafana'],
            image: '/aqi/Overview.png',
            status: { en: 'Planning', zh: '规划中' }
        },
        {
            id: 5,
            title: { en: 'Mobile Game Engine', zh: '移动游戏引擎' },
            description: { en: 'Cross-platform mobile game engine with physics simulation, shader effects, and multiplayer support.', zh: '具有物理模拟、着色器效果和多人游戏支持的跨平台移动游戏引擎。' },
            tech: ['Unity', 'C#', 'WebRTC', 'Cloud Functions'],
            image: '/UC_F4.001.jpeg',
            status: { en: 'In Progress', zh: '进行中' }
        },
        {
            id: 6,
            title: { en: 'Blockchain DApp', zh: '区块链去中心化应用' },
            description: { en: 'Decentralized application built on Ethereum with smart contracts and Web3 integration.', zh: '基于以太坊构建的去中心化应用，具有智能合约和Web3集成。' },
            tech: ['Solidity', 'Web3.js', 'React', 'Metamask'],
            image: '/zespri_poster.png',
            status: { en: 'Completed', zh: '已完成' }
        },
        {
            id: 7,
            title: { en: 'AR/VR Experience', zh: 'AR/VR体验应用' },
            description: { en: 'Immersive AR/VR experience combining virtual environments with real-world interactions.', zh: '结合虚拟环境与现实世界交互的沉浸式AR/VR体验。' },
            tech: ['WebXR', 'A-Frame', 'Three.js', 'WebGL'],
            image: '/awared-excellence.jpeg',
            status: { en: 'Planning', zh: '规划中' }
        },
        {
            id: 8,
            title: { en: 'Cloud Infrastructure', zh: '云基础设施管理' },
            description: { en: 'Automated cloud infrastructure management system with containerization and CI/CD pipelines.', zh: '具有容器化和CI/CD管道的自动化云基础设施管理系统。' },
            tech: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
            image: '/data472/services.png',
            status: { en: 'In Progress', zh: '进行中' }
        }
    ];

    const getStatusColor = (status) => {
        const statusEn = status.en.toLowerCase();
        switch (statusEn) {
            case 'completed':
                return 'bg-green-500/20 text-green-400 border-green-500/50';
            case 'in progress':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
            case 'planning':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
        }
    };

    return (
        <div className="min-h-screen w-full p-8 text-white">
            <div className="max-w-7xl mx-auto">
                {/* 顶部标题和地图按钮 */}
                <div className="flex items-center justify-between mb-12 sticky top-0 bg-black/20 backdrop-blur-sm p-4 rounded-lg z-10">
                    <div className="flex-1 text-center">
                        <h1 className="text-5xl font-bold mb-4">
                            {section.name[language]}
                        </h1>
                        <p className="text-xl text-gray-300">
                            {section.description[language]}
                        </p>
                    </div>
                    
                    {/* 地图视图按钮 */}
                    <button
                        onClick={() => setIsMapOpen(true)}
                        className="ml-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        title={language === 'en' ? 'View on Map' : '地图视图'}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="hidden sm:inline">
                            {language === 'en' ? 'Map View' : '地图视图'}
                        </span>
                    </button>
                </div>
                
                {/* 项目统计 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-blue-400">{projects.length}</div>
                        <div className="text-gray-300">{language === 'en' ? 'Total Projects' : '总项目数'}</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-green-400">{projects.filter(p => p.status.en === 'Completed').length}</div>
                        <div className="text-gray-300">{language === 'en' ? 'Completed' : '已完成'}</div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-yellow-400">{projects.filter(p => p.status.en === 'In Progress').length}</div>
                        <div className="text-gray-300">{language === 'en' ? 'In Progress' : '进行中'}</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-purple-400">{projects.filter(p => p.status.en === 'Planning').length}</div>
                        <div className="text-gray-300">{language === 'en' ? 'Planning' : '规划中'}</div>
                    </div>
                </div>
                
                {/* 项目网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-12">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20 hover:scale-105 group">
                            {/* 项目图片 */}
                            <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg mb-6 overflow-hidden relative">
                                <img 
                                    src={project.image} 
                                    alt={project.title[language]}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 absolute top-0 left-0 hidden items-center justify-center">
                                    <span className="text-4xl">🚀</span>
                                </div>
                                
                                {/* 状态标签 */}
                                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                                    {project.status[language]}
                                </div>
                            </div>
                            
                            {/* 项目信息 */}
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                                {project.title[language]}
                            </h3>
                            <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
                                {project.description[language]}
                            </p>
                            
                            {/* 技术栈 */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech, index) => (
                                    <span key={index} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-600/30">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            
                            {/* 操作按钮 */}
                            <div className="flex gap-3">
                                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm font-semibold">
                                    {language === 'en' ? 'View Details' : '查看详情'}
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                                    {language === 'en' ? 'Live Demo' : '在线演示'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 底部说明 */}
                <div className="text-center py-8 border-t border-white/20">
                    <p className="text-gray-400 text-lg">
                        {language === 'en' 
                            ? '✨ This page demonstrates smart scrolling - notice how the content flows naturally!' 
                            : '✨ 这个页面演示了智能滚动 - 注意内容如何自然流动！'
                        }
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        {language === 'en' 
                            ? 'Use mouse wheel or arrow keys to navigate. The scroll mode adapts automatically.' 
                            : '使用鼠标滚轮或方向键导航。滚动模式会自动适应。'
                        }
                    </p>
                </div>
            </div>

            {/* 地图模态框 */}
            <ProjectMapModal 
                isOpen={isMapOpen} 
                onClose={() => setIsMapOpen(false)} 
            />
        </div>
    );
};

ProjectSection.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
};

export default ProjectSection;
