import { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import NavigationCube from '../../NavigationCube';
import imageSrc from '../../hua_icon_base64';
import hoverImageSrc from '../../../assets/images/hua_500w1.jpg';
import { FaSpinner } from 'react-icons/fa';

const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect'));

const HomeSection = ({ section, language, sections, onSectionChange }) => {
    const { getContent } = useAppStore();
    const content = getContent();

    // 避免未使用变量警告
    console.log('HomeSection rendered for language:', language);
    console.log('Section data:', section);

    return (
        <div className="flex items-center justify-center h-screen w-full relative overflow-hidden">
            {/* 姓名和职位 - 电影片头风格动画 */}
            <div className="absolute top-1/4 left-1/2 text-center text-white z-10" style={{
                animation: 'movieTitleEntrance 4s ease-out forwards 1s',
                animationFillMode: 'both'
            }}>
                <h1 className="text-6xl font-bold mb-8 text-white font-beauRivage hover:text-green-300 transition-colors duration-300">
                    {content.home.name}
                </h1>
                <h2 className="text-3xl font-mono text-green-300 animate-pulse">
                    {content.home.title}
                </h2>
            </div>

            {/* 头像区域 - 左侧，从Galaxy中心光源向上移动到1/3屏幕高度 */}
            <div className="absolute z-20" style={{ 
                top: 'calc(100vh / 3)',
                left: 'calc(10vw - 150px)' // 10vw边距减去头像一半宽度(300px/2)，确保头像中心距离边缘10vw
            }}>
                {/* 头像容器 - 从中心光源向上移动的动画 */}
                <div className="avatar-container relative" style={{
                    animation: 'birthFromGalaxyCenterToLeft 3s ease-out forwards',
                    transform: 'translateY(-50%)'
                }}>
                    {/* 背景动画层 */}
                    <div className="absolute inset-0 w-[300px] h-[300px] rounded-full -z-10">
                        {/* 外层旋转渐变 */}
                        <div className="absolute inset-0 rounded-full animate-gradientShift opacity-70" 
                             style={{
                                 background: 'linear-gradient(45deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 backgroundSize: '400% 400%',
                                 filter: 'blur(10px)',
                                 animation: 'gradientShift 3s ease-in-out infinite'
                             }}>
                        </div>
                        {/* 中层hue-rotate */}
                        <div className="absolute inset-2 rounded-full animate-hueRotate opacity-50" 
                             style={{
                                 background: 'conic-gradient(from 0deg, #afcc8f, #7ca65c, #5d7d4b, #768e90, #afcc8f)',
                                 filter: 'blur(6px)',
                                 animation: 'hueRotate 4s linear infinite'
                             }}>
                        </div>
                        {/* 内层光晕 */}
                        <div className="absolute inset-4 rounded-full opacity-60" 
                             style={{
                                 background: 'radial-gradient(circle, rgba(175, 204, 143, 0.8), rgba(124, 166, 92, 0.6), transparent)',
                                 filter: 'blur(4px)',
                                 animation: 'pulse 2s ease-in-out infinite'
                             }}>
                        </div>
                    </div>
                    
                    {/* 头像主体 - 圆形，代表"天" */}
                    <div className="relative w-[300px] h-[300px] rounded-full shadow-2xl overflow-hidden bg-gray-900 border-4 border-white/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
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

            {/* 导航立方体区域 - 右侧，从Galaxy中心光源向上移动到1/3屏幕高度，与左边头像对称 */}
            <div className="absolute z-20" style={{ 
                top: 'calc(100vh / 3)',
                right: 'calc(10vw - 150px)' // 10vw边距减去立方体一半宽度(300px/2)，确保立方体中心距离边缘10vw
            }}>
                <div className="cube-container relative" style={{
                    animation: 'birthFromGalaxyCenterToRight 3s ease-out forwards 0.5s',
                    animationFillMode: 'both',
                    transform: 'translateY(-50%)'
                }}>
                    {/* 导航立方体 - 容器与头像相同尺寸，但内部立方体稍小以确保旋转不被裁剪 */}
                    <div className="w-[300px] h-[300px] flex items-center justify-center overflow-visible">
                        <NavigationCube 
                            isLandingPage={true}
                            sections={sections}
                            onSectionChange={onSectionChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

HomeSection.propTypes = {
    section: PropTypes.shape({
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired,
    sections: PropTypes.array,
    onSectionChange: PropTypes.func
};

export default HomeSection;
