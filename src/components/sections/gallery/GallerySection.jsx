import PropTypes from 'prop-types';

const GallerySection = ({ section, language }) => {
    return (
        <div className="flex flex-col justify-center h-screen w-full p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">
                    {section.name[language]}
                </h1>
                <p className="text-xl text-center text-gray-300 mb-12">
                    {section.description[language]}
                </p>
                
                {/* 画廊网格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="aspect-square bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

GallerySection.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
};

export default GallerySection;
