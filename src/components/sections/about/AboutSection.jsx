import { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { FaSpinner, FaChevronDown } from 'react-icons/fa';

const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect'));

const AboutSection = ({ language, onPageChange, currentPage = 0 }) => {
    const [localPage, setLocalPage] = useState(currentPage);
    
    // About页面的内容配置
    const aboutPages = [
        {
            id: 'statement',
            title: { en: 'Personal Statement', zh: '个人陈述' },
            content: {
                en: (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">Kia ora, I&apos;m Hua Wang</h2>
                        <p className="text-lg leading-relaxed text-gray-200">
                            I&apos;m a versatile full-stack developer with expertise in computer/data science, building and integrating interactive web applications, data pipelines and visualisation dashboards.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-200">
                            I have experience with modern frontend frameworks such as React, Next.js, and TypeScript, as well as working with libraries such as Three.js and ECharts. On the backend side, I am skilled in developing RESTful APIs and data-driven apps using Java, Python, Node.js, and C# ASP.NET.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-200">
                            I have also been working with containerised environments (Docker, Kubernetes), GitHub Actions, GitLab CI/CD pipelines, and cloud platforms such as AWS and Azure. Recently, I earned a Master of Applied Data Science, which has strengthened my skills in data-driven and AI-powered development.
                        </p>
                    </div>
                ),
                zh: (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">你好，我是王华</h2>
                        <p className="text-lg leading-relaxed text-gray-200">
                            我是一名多技能全栈开发者，在计算机/数据科学方面具有专业知识，专注于构建和集成交互式Web应用程序、数据管道和可视化仪表板。
                        </p>
                        <p className="text-lg leading-relaxed text-gray-200">
                            我有使用现代前端框架（如React、Next.js和TypeScript）的经验，以及使用Three.js和ECharts等库的经验。在后端方面，我擅长使用Java、Python、Node.js和C# ASP.NET开发RESTful API和数据驱动的应用程序。
                        </p>
                        <p className="text-lg leading-relaxed text-gray-200">
                            我还在容器化环境（Docker、Kubernetes）、GitHub Actions、GitLab CI/CD管道以及AWS和Azure等云平台方面有丰富经验。最近，我获得了应用数据科学硕士学位，这进一步强化了我在数据驱动和AI驱动开发方面的技能。
                        </p>
                    </div>
                )
            }
        },
        {
            id: 'experience',
            title: { en: 'Professional Experience', zh: '工作经历' },
            content: {
                en: (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-400 mb-8">Professional Journey</h2>
                        
                        <div className="relative max-w-4xl">
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-orange-400 hidden md:block"></div>
                            
                            <div className="space-y-6">
                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                                                <span className="text-blue-400 text-xs font-bold">ZI</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">Zespri International</h3>
                                                <p className="text-blue-400 font-medium">Full Stack Developer (Internship)</p>
                                            </div>
                                        </div>
                                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            Nov 2024 - Feb 2025
                                        </span>
                                    </div>
                                </div>

                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-purple-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                                                <span className="text-purple-400 text-xs font-bold">RB</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">Realibox, GuangZhou</h3>
                                                <p className="text-purple-400 font-medium">Frontend Developer</p>
                                            </div>
                                        </div>
                                        <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            Aug 2021 - Feb 2023
                                        </span>
                                    </div>
                                </div>

                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-green-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 flex-shrink-0">
                                                <span className="text-green-400 text-xs font-bold">NS</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">Nuclear Stone Technology</h3>
                                                <p className="text-green-400 font-medium">Frontend Developer</p>
                                            </div>
                                        </div>
                                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            Aug 2020 - Jul 2021
                                        </span>
                                    </div>
                                </div>

                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-orange-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30 flex-shrink-0">
                                                <span className="text-orange-400 text-xs font-bold">ES</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">Enshi Environmental Agency</h3>
                                                <p className="text-orange-400 font-medium">Full Stack Developer (Contract)</p>
                                            </div>
                                        </div>
                                        <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            Feb 2020 - Jul 2021
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                zh: (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-400 mb-8">职业历程</h2>
                        
                        <div className="relative max-w-4xl">
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-orange-400 hidden md:block"></div>
                            
                            <div className="space-y-6">
                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-blue-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                                                <span className="text-blue-400 text-xs font-bold">ZI</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">Zespri International</h3>
                                                <p className="text-blue-400 font-medium">全栈开发工程师（实习）</p>
                                            </div>
                                        </div>
                                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            2024年11月 - 2025年2月
                                        </span>
                                    </div>
                                </div>

                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-purple-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                                                <span className="text-purple-400 text-xs font-bold">RB</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">Realibox，广州</h3>
                                                <p className="text-purple-400 font-medium">前端开发工程师</p>
                                            </div>
                                        </div>
                                        <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            2021年8月 - 2023年2月
                                        </span>
                                    </div>
                                </div>

                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-green-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 flex-shrink-0">
                                                <span className="text-green-400 text-xs font-bold">NS</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">Nuclear Stone Technology，重庆</h3>
                                                <p className="text-green-400 font-medium">前端开发工程师</p>
                                            </div>
                                        </div>
                                        <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            2020年8月 - 2021年7月
                                        </span>
                                    </div>
                                </div>

                                <div className="relative md:flex md:items-center md:pl-16 bg-gray-800/60 rounded-lg p-4 md:p-6 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300">
                                    <div className="absolute left-4 w-4 h-4 bg-orange-400 rounded-full border-4 border-gray-900 shadow-lg hidden md:block"></div>
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-3 md:space-y-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/30 flex-shrink-0">
                                                <span className="text-orange-400 text-xs font-bold">ES</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-lg font-bold text-white">恩施环境保护局</h3>
                                                <p className="text-orange-400 font-medium">全栈开发工程师（合同）</p>
                                            </div>
                                        </div>
                                        <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            2020年2月 - 2021年7月
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            id: 'skills',
            title: { en: 'Philosophy & Mastery', zh: '哲学与精通' },
            content: {
                en: (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-6">Philosophy & Mastery</h2>
                        
                        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/30 mb-8">
                            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                                <span className="mr-3">💭</span>
                                Core Philosophy
                            </h3>
                            <p className="text-gray-200 text-lg leading-relaxed italic">
                                &ldquo;Technology is not the end, but the means. True mastery lies not in the tools we wield, 
                                but in the architectures we conceive and the problems we solve. Language-agnostic thinking 
                                enables platform-transcendent solutions.&rdquo;
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                                    <span className="mr-3">🏗️</span>
                                    Architecture Mindset
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">Systems Thinking:</strong> Every component is part of a greater whole. 
                                        I design with scalability, maintainability, and resilience at the core.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">Pattern Recognition:</strong> Identifying universal patterns across 
                                        domains allows for elegant, reusable solutions.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                                    <span className="mr-3">🌱</span>
                                    Perpetual Learning
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">First Principles:</strong> Understanding fundamentals enables 
                                        rapid mastery of new technologies and paradigms.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">Adaptive Intelligence:</strong> The ability to synthesize knowledge 
                                        across disciplines and apply it contextually.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                                    <span className="mr-3">🌐</span>
                                    Platform Agnosticism
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">Language Independence:</strong> Concepts transcend syntax. 
                                        I focus on problem-solving over tool attachment.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">Technology Neutrality:</strong> The best solution emerges from 
                                        objective evaluation, not preference.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center">
                                    <span className="mr-3">⚡</span>
                                    Innovation Driver
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">Creative Problem Solving:</strong> Combining technical excellence 
                                        with creative thinking to forge novel solutions.
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">Future-Forward Thinking:</strong> Anticipating technological 
                                        evolution and preparing for tomorrow&apos;s challenges.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold text-white mb-6">Technical Mastery Domains</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { name: 'Full-Stack Architecture', icon: '🏛️', color: 'blue' },
                                    { name: 'Cloud & DevOps', icon: '☁️', color: 'green' },
                                    { name: 'Data Science & AI', icon: '🧠', color: 'purple' },
                                    { name: 'System Design', icon: '⚙️', color: 'orange' },
                                    { name: 'Financial Systems', icon: '💳', color: 'yellow' },
                                    { name: 'Real-time Graphics', icon: '🎮', color: 'red' },
                                    { name: 'Mobile & Web', icon: '📱', color: 'indigo' },
                                    { name: 'Blockchain & DeFi', icon: '⛓️', color: 'pink' }
                                ].map((domain, index) => (
                                    <div key={index} className={`bg-${domain.color}-900/20 border border-${domain.color}-500/30 rounded-lg p-4 text-center hover:bg-${domain.color}-900/30 transition-all duration-300`}>
                                        <div className="text-2xl mb-2">{domain.icon}</div>
                                        <div className={`text-${domain.color}-400 text-sm font-medium`}>{domain.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ),
                zh: (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-blue-400 mb-6">哲学与精通</h2>
                        
                        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/30 mb-8">
                            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                                <span className="mr-3">💭</span>
                                核心理念
                            </h3>
                            <p className="text-gray-200 text-lg leading-relaxed italic">
                                &ldquo;技术非目的，而为手段。真正的精通不在于我们掌握的工具，
                                而在于我们构想的架构和解决的问题。语言无关的思维方式成就跨平台的解决方案。&rdquo;
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center">
                                    <span className="mr-3">🏗️</span>
                                    架构思维
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">系统性思维：</strong> 每个组件都是更大整体的一部分。
                                        我以可扩展性、可维护性和弹性为核心进行设计。
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">模式识别：</strong> 识别跨领域的通用模式，
                                        构建优雅且可复用的解决方案。
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                                    <span className="mr-3">🌱</span>
                                    持续学习
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">第一性原理：</strong> 理解基础原理使我能够
                                        快速掌握新技术和新范式。
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">适应性智慧：</strong> 跨学科综合知识
                                        并根据情境灵活应用的能力。
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                                    <span className="mr-3">🌐</span>
                                    平台无关性
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">语言独立性：</strong> 概念超越语法。
                                        我专注于解决问题而非工具依赖。
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">技术中立性：</strong> 最佳解决方案来自
                                        客观评估，而非个人偏好。
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
                                <h3 className="text-xl font-semibold text-orange-400 mb-4 flex items-center">
                                    <span className="mr-3">⚡</span>
                                    创新驱动
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">创造性问题解决：</strong> 结合技术卓越
                                        与创新思维，打造全新解决方案。
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        <strong className="text-white">前瞻性思维：</strong> 预见技术演进，
                                        为未来挑战做好准备。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold text-white mb-6">技术精通领域</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { name: '全栈架构', icon: '🏛️', color: 'blue' },
                                    { name: '云计算与DevOps', icon: '☁️', color: 'green' },
                                    { name: '数据科学与AI', icon: '🧠', color: 'purple' },
                                    { name: '系统设计', icon: '⚙️', color: 'orange' },
                                    { name: '金融系统', icon: '💳', color: 'yellow' },
                                    { name: '实时图形', icon: '🎮', color: 'red' },
                                    { name: '移动与Web', icon: '📱', color: 'indigo' },
                                    { name: '区块链与DeFi', icon: '⛓️', color: 'pink' }
                                ].map((domain, index) => (
                                    <div key={index} className={`bg-${domain.color}-900/20 border border-${domain.color}-500/30 rounded-lg p-4 text-center hover:bg-${domain.color}-900/30 transition-all duration-300`}>
                                        <div className="text-2xl mb-2">{domain.icon}</div>
                                        <div className={`text-${domain.color}-400 text-sm font-medium`}>{domain.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        }
    ];

    const currentPageData = aboutPages[localPage] || aboutPages[0];

    // 页面变化时通知父组件
    const aboutPagesLength = aboutPages.length;
    useEffect(() => {
        if (onPageChange) {
            onPageChange(localPage, aboutPagesLength);
        }
    }, [localPage, onPageChange, aboutPagesLength]);

    // 监听外部页面变化
    useEffect(() => {
        setLocalPage(currentPage);
    }, [currentPage]);

    return (
        <div className="flex h-screen w-full relative overflow-hidden">
            {/* 左侧固定头像区域 */}
            <div className="w-1/3 flex items-center justify-center relative z-20">
                <div className="avatar-container relative transition-all duration-500 ease-out group">
                    {/* 背景动画层 - 临时禁用以解决多个圆环问题 */}
                    <div className="absolute inset-0 rounded-full -z-10 transition-all duration-500 ease-out w-[300px] h-[300px] group-hover:w-[320px] group-hover:h-[320px]" style={{ display: 'none' }}>
                        {/* 外层旋转渐变 */}
                        <div className="absolute inset-0 rounded-full opacity-70 group-hover:opacity-90 transition-opacity duration-500" 
                             style={{
                                 background: 'linear-gradient(45deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 backgroundSize: '400% 400%',
                                 filter: 'blur(10px)',
                                 animation: 'gradientShift 3s ease-in-out infinite'
                             }}>
                        </div>
                        {/* 中层hue-rotate */}
                        <div className="absolute inset-1 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-500" 
                             style={{
                                 background: 'conic-gradient(from 0deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 filter: 'blur(6px)',
                                 animation: 'hueRotate 4s linear infinite'
                             }}>
                        </div>
                        {/* 内层光晕 */}
                        <div className="absolute inset-2 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
                             style={{
                                 background: 'radial-gradient(circle, rgba(175, 204, 143, 0.8), rgba(124, 166, 92, 0.6), transparent)',
                                 filter: 'blur(4px)',
                                 animation: 'pulse 2s ease-in-out infinite'
                             }}>
                        </div>
                    </div>
                    
                    {/* 头像主体 */}
                    <div className="relative rounded-full shadow-2xl overflow-hidden bg-gray-900 border-4 border-white/30 backdrop-blur-sm transition-all duration-500 ease-out w-[300px] h-[300px] group-hover:w-[320px] group-hover:h-[320px] cursor-pointer">
                        <Suspense 
                            fallback={
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <FaSpinner className="animate-spin text-green-500 text-4xl" />
                                </div>
                            }
                        >
                            <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* 右侧内容区域 */}
            <div className="w-2/3 flex flex-col justify-center p-12 relative z-20">
                {/* 页面内容 */}
                <div className="max-w-4xl">
                    {currentPageData.content[language]}
                </div>

                {/* 页面导航指示器 */}
                <div className="absolute bottom-8 right-12 flex items-center space-x-4">
                    {/* 页面指示点 */}
                    <div className="flex space-x-2">
                        {aboutPages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setLocalPage(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === localPage
                                        ? 'bg-blue-400 scale-125'
                                        : 'bg-white/30 hover:bg-white/50'
                                }`}
                                title={aboutPages[index].title[language]}
                            />
                        ))}
                    </div>

                    {/* 页面信息 */}
                    <div className="text-white/60 text-sm">
                        {localPage + 1} / {aboutPages.length}
                    </div>

                    {/* 下一页提示 */}
                    {localPage < aboutPages.length - 1 && (
                        <div className="flex items-center space-x-2 text-white/60 animate-bounce">
                            <span className="text-xs">{language === 'en' ? 'Scroll for more' : '滚动查看更多'}</span>
                            <FaChevronDown className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>

            {/* CSS动画样式 */}
            <style>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes hueRotate {
                    0% { filter: hue-rotate(0deg) blur(6px); }
                    100% { filter: hue-rotate(360deg) blur(6px); }
                }
            `}</style>
        </div>
    );
};

AboutSection.propTypes = {
    language: PropTypes.string.isRequired,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number
};

export default AboutSection;
