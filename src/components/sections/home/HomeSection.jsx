import PropTypes from 'prop-types';
import { useAppStore } from '../../../store/useAppStore';
import NavigationCube from '../../NavigationCube';
import '../../../styles/OpeningAnimations.css';

// import { Suspense, lazy } from 'react'; // 移动到About页面
// import { FaSpinner } from 'react-icons/fa'; // 移动到About页面
// const ShaderLoadingEffect = lazy(() => import('../../ShaderLoadingEffect')); // 移动到About页面

const HomeSection = ({ 
    section, 
    language, 
    sections, 
    onSectionChange, 
    // 开场动画相关属性
    enableOpeningAnimation = false
}) => {
    const { getContent } = useAppStore();
    const content = getContent();

    // 避免未使用变量警告
    console.log('HomeSection rendered for language:', language);
    console.log('Section data:', section);

    return (
        <div className="h-screen w-screen relative overflow-hidden" style={{ margin: 0, padding: 0, position: 'relative' }}>
            {/* 全屏NavigationCube - z-index: 10 */}
            <NavigationCube 
                isLandingPage={true}
                sections={sections}
                onSectionChange={onSectionChange}
                currentSectionId="home"
                enableOpeningAnimation={enableOpeningAnimation}
            />

            {/* 姓名和职位 - 屏幕上方，避免挡住cube，确保title完全居中 */}
            <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-center text-white z-20 w-full px-4 ${
                enableOpeningAnimation ? 'grand-title-entrance' : ''
            }`} style={!enableOpeningAnimation ? {
                animation: 'movieTitleEntrance 4s ease-out forwards 1s',
                animationFillMode: 'both'
            } : {}}>
                <div className="flex flex-col items-center justify-center w-full relative">
                    {/* 姓名 */}
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-beauRivage hover:text-green-300 transition-colors duration-300 mb-2 sm:mb-4 leading-tight text-center w-full mt-12 ${
                        enableOpeningAnimation ? 'shimmer-text' : ''
                    }`}>
                        {content.home.name}
                    </h1>
                    {/* Title - 绝对定位强制居中 */}
                    <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-green-300 mt-48 ${
                        enableOpeningAnimation ? 'grand-subtitle-entrance' : ''
                    }`} style={{ 
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'max-content',
                        whiteSpace: 'nowrap'
                    }}>
                        {content.home.title}
                    </h2>
                </div>
            </div>

            {/* Slogan - 屏幕下方，宽屏一行显示，窄屏两行，闪烁光标 */}
            <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-white z-20 w-full px-4 ${
                enableOpeningAnimation ? 'grand-slogan-entrance' : ''
            }`} style={!enableOpeningAnimation ? {
                animation: 'sloganEntrance 3s ease-out forwards 5s',
                animationFillMode: 'both'
            } : {}}>
                <div className="space-y-2 sm:space-y-4">
                    {/* 英文slogan - 使用统一的打字机效果解决对齐问题 */}
                    <div className="text-center">
                        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/90 tracking-wider leading-relaxed inline-block ${
                            enableOpeningAnimation ? '' : 'typewriter-text typewriter-optimized'
                        }`} style={!enableOpeningAnimation ? {
                            animationDelay: '6s',
                            animationFillMode: 'both'
                        } : {}}>
                            Order from Chaos, Innovation through Tradeoffs.
                            <span className="inline-block ml-1 w-px h-5 sm:h-6 md:h-7 lg:h-8 bg-white input-cursor"></span>
                        </p>
                    </div>
                    
                    {/* 中文slogan */}
                    <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-light text-green-300/80 tracking-wide leading-relaxed mt-4 ${
                        enableOpeningAnimation ? '' : 'typewriter-text typewriter-optimized'
                    }`} style={!enableOpeningAnimation ? {
                        animationDelay: '8s',
                        animationFillMode: 'both'
                    } : {}}>
                        观混沌之纷，立秩序之象；权诸技之衡，启创新之变！
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
    onSectionChange: PropTypes.func,
    enableOpeningAnimation: PropTypes.bool
};

export default HomeSection;
