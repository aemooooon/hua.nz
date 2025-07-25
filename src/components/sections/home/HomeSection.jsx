import { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import imageSrc from '../../hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { FaSpinner } from 'react-icons/fa';

const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect'));

const HomeSection = ({ section, language }) => {
    const { getContent } = useAppStore();
    const content = getContent();

    return (
        <div className="flex items-center justify-center h-screen w-full relative">
            {/* 头像区域 - 占据左半边 */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center relative p-8">
                {/* 头像容器 - 有hue-rotate背景动画 */}
                <div className="avatar-container relative mb-8">
                    {/* 背景动画层 */}
                    <div className="absolute inset-0 w-[400px] h-[400px] rounded-full -z-10">
                        {/* 外层旋转渐变 */}
                        <div className="absolute inset-0 rounded-full animate-gradientShift opacity-80" 
                             style={{
                                 background: 'linear-gradient(45deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 backgroundSize: '400% 400%',
                                 filter: 'blur(12px)',
                             }}>
                        </div>
                        {/* 中层hue-rotate */}
                        <div className="absolute inset-2 rounded-full animate-hueRotate opacity-60" 
                             style={{
                                 background: 'conic-gradient(from 0deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 filter: 'blur(8px)',
                             }}>
                        </div>
                        {/* 内层光晕 */}
                        <div className="absolute inset-4 rounded-full opacity-40" 
                             style={{
                                 background: 'radial-gradient(circle, rgba(175, 204, 143, 0.6), rgba(124, 166, 92, 0.4), transparent)',
                                 filter: 'blur(4px)',
                                 animation: 'pulse 3s ease-in-out infinite'
                             }}>
                        </div>
                    </div>
                    
                    {/* 头像主体 */}
                    <div className="relative w-[400px] h-[400px] rounded-full shadow-2xl overflow-hidden bg-gray-900 animate-slideInLeft border-4 border-white/20 backdrop-blur-sm">
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

                {/* 名字和职位 */}
                <div className="text-center text-white animate-fadeInUp animation-delay-1000">
                    <h1 className="text-5xl font-bold mb-4 text-white font-beauRivage">
                        {content.home.name}
                    </h1>
                    <h2 className="text-2xl font-mono text-green-300">
                        {content.home.title}
                    </h2>
                    <p className="text-lg text-gray-300 mt-4">
                        {section.description[language]}
                    </p>
                </div>
            </div>

            {/* 立方体区域占据右半边 - 在FullPageScrollManager中渲染 */}
            <div className="w-1/2 h-full flex items-center justify-center">
                {/* 立方体将由FullPageScrollManager统一管理 */}
            </div>
        </div>
    );
};

HomeSection.propTypes = {
    section: PropTypes.shape({
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
};

export default HomeSection;
