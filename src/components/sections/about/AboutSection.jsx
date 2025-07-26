import { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import imageSrc from '../../hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { FaSpinner } from 'react-icons/fa';

const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect'));

const AboutSection = ({ section, language }) => {
    return (
        <div className="flex items-center justify-center h-screen w-full p-8 text-white relative">
            {/* 头像区域 - 左上角，距离边缘48px */}
            <div className="absolute z-20" style={{ 
                top: '48px', // 距离顶部48px
                left: '48px' // 距离左边48px
            }}>
                {/* 头像容器 - 响应式大小和位置 */}
                <div className="avatar-container relative transition-all duration-500 ease-out group" style={{
                    animation: 'avatarEntrance 2s ease-out forwards',
                    transformOrigin: 'top left' // 从左上角开始缩放
                }}>
                    {/* 背景动画层 - 响应式大小 */}
                    <div className="absolute inset-0 rounded-full -z-10 transition-all duration-500 ease-out w-16 h-16 group-hover:w-[300px] group-hover:h-[300px]">
                        {/* 外层旋转渐变 */}
                        <div className="absolute inset-0 rounded-full animate-gradientShift opacity-0 group-hover:opacity-70 transition-opacity duration-500" 
                             style={{
                                 background: 'linear-gradient(45deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 backgroundSize: '400% 400%',
                                 filter: 'blur(10px)',
                                 animation: 'gradientShift 3s ease-in-out infinite'
                             }}>
                        </div>
                        {/* 中层hue-rotate */}
                        <div className="absolute inset-1 rounded-full animate-hueRotate opacity-0 group-hover:opacity-50 transition-opacity duration-500 group-hover:inset-2" 
                             style={{
                                 background: 'conic-gradient(from 0deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 filter: 'blur(6px)',
                                 animation: 'hueRotate 4s linear infinite'
                             }}>
                        </div>
                        {/* 内层光晕 */}
                        <div className="absolute inset-2 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 group-hover:inset-4" 
                             style={{
                                 background: 'radial-gradient(circle, rgba(175, 204, 143, 0.8), rgba(124, 166, 92, 0.6), transparent)',
                                 filter: 'blur(4px)',
                                 animation: 'pulse 2s ease-in-out infinite'
                             }}>
                        </div>
                    </div>
                    
                    {/* 头像主体 - 响应式大小 */}
                    <div className="relative rounded-full shadow-2xl overflow-hidden bg-gray-900 border-2 border-white/30 backdrop-blur-sm transition-all duration-500 ease-out w-16 h-16 group-hover:w-[300px] group-hover:h-[300px] group-hover:border-4 cursor-pointer">
                        <Suspense 
                            fallback={
                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                    <FaSpinner className="animate-spin text-green-500 text-xl group-hover:text-4xl transition-all duration-500" />
                                </div>
                            }
                        >
                            <ShaderLoadingEffect imageSrc={imageSrc} hoverImageSrc={hoverImageSrc} />
                        </Suspense>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">
                    {section.name[language]}
                </h1>
                <p className="text-xl text-center text-gray-300 mb-12">
                    {section.description[language]}
                </p>
                
                {/* 个人信息 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                            <div className="space-y-2">
                                {['React', 'TypeScript', 'Node.js', 'Python', 'Three.js'].map(skill => (
                                    <div key={skill} className="flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Experience</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Full-stack developer with expertise in modern web technologies 
                                and a passion for creating beautiful, functional user experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AboutSection.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
};

export default AboutSection;
