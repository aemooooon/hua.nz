import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import NavigationCube from '../../NavigationCube';

// import { Suspense, lazy } from 'react'; // 移动到About页面
// import { FaSpinner } from 'react-icons/fa'; // 移动到About页面
// const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect')); // 移动到About页面

const HomeSection = ({ section, language, sections, onSectionChange }) => {
    const { getContent } = useAppStore();
    const content = getContent();

    // 避免未使用变量警告
    console.log('HomeSection rendered for language:', language);
    console.log('Section data:', section);

    return (
        <div className="flex items-center justify-center h-screen w-full relative overflow-hidden">
            {/* 姓名和职位 - 电影片头风格动画，向上移动更多 */}
            <div className="absolute top-32 left-1/2 text-center text-white z-10" style={{
                animation: 'movieTitleEntrance 4s ease-out forwards 1s',
                animationFillMode: 'both'
            }}>
                <h1 className="text-6xl font-bold mb-8 text-white font-beauRivage hover:text-green-300 transition-colors duration-300">
                    {content.home.name}
                </h1>
                <h2 className="text-3xl font-mono text-green-300">
                    {content.home.title}
                </h2>
            </div>

            {/* 导航立方体区域 - 上下居中位置 */}
            <div className="absolute z-20" style={{ 
                top: '50%', // 上下居中
                left: '50%', // 水平居中
                transform: 'translate(-50%, -50%)' // 修正居中对齐
            }}>
                <div className="cube-container relative" style={{
                    animation: 'cubeEntrance 2s ease-out forwards 0.5s',
                    animationFillMode: 'both'
                }}>
                    {/* 导航立方体 - 360px容器 */}
                    <div className="w-[360px] h-[360px] flex items-center justify-center overflow-visible">
                        <NavigationCube 
                            isLandingPage={true}
                            sections={sections}
                            onSectionChange={onSectionChange}
                        />
                    </div>
                </div>
            </div>

            {/* Slogan - 哲学性标语，底部中央位置 - 优化版本 */}
            <div className="absolute bottom-0 left-1/2 text-center text-white z-10" style={{
                animation: 'sloganEntrance 3s ease-out forwards 5s',
                animationFillMode: 'both',
                transform: 'translateX(-50%)',
                paddingBottom: '8vh'
            }}>
                <div className="space-y-4">
                    <p className="text-xl font-light text-white/90 tracking-wider typewriter-text typewriter-optimized cursor-blink" style={{
                        animationDelay: '6s',
                        animationFillMode: 'both'
                    }}>
                        {content.home.slogan.english}
                    </p>
                    <p className="text-lg font-light text-green-300/80 tracking-wide typewriter-text typewriter-optimized" style={{
                        animationDelay: '8s',
                        animationFillMode: 'both'
                    }}>
                        {content.home.slogan.chinese}
                    </p>
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
