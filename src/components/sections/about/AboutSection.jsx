import PropTypes from 'prop-types';

const AboutSection = ({ section, language }) => {
    return (
        <div className="flex items-center justify-center h-screen w-full p-8 text-white">
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
