import { useState } from 'react';
import PropTypes from 'prop-types';
import ProjectMapModal from './ProjectMapModal';

const ProjectSection = ({ section, language }) => {
    const [isMapOpen, setIsMapOpen] = useState(false);

    return (
        <div className="flex flex-col justify-center h-screen w-full p-8 text-white">
            <div className="max-w-6xl mx-auto">
                {/* 顶部标题和地图按钮 */}
                <div className="flex items-center justify-between mb-8">
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
                
                {/* 项目网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* 占位项目卡片 */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                            <div className="w-full h-40 bg-gray-700 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2">Project {item}</h3>
                            <p className="text-gray-300">Project description will go here...</p>
                        </div>
                    ))}
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
