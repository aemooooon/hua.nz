import PropTypes from 'prop-types';

const ProjectSection = ({ section, language }) => {
    return (
        <div className="flex flex-col justify-center h-screen w-full p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">
                    {section.name[language]}
                </h1>
                <p className="text-xl text-center text-gray-300 mb-12">
                    {section.description[language]}
                </p>
                
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
