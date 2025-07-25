import PropTypes from 'prop-types';

const BlogSection = ({ section, language }) => {
    return (
        <div className="flex flex-col justify-center h-screen w-full p-8 text-white">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-center">
                    {section.name[language]}
                </h1>
                <p className="text-xl text-center text-gray-300 mb-12">
                    {section.description[language]}
                </p>
                
                {/* 博客文章列表 */}
                <div className="space-y-6">
                    {[1, 2, 3].map((item) => (
                        <article key={item} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                            <h2 className="text-2xl font-semibold mb-3">Blog Post {item}</h2>
                            <p className="text-gray-300 mb-4">
                                This is a preview of blog post {item}. It contains interesting thoughts 
                                and insights about web development, technology, and more...
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>January {item}, 2025</span>
                                <span>5 min read</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

BlogSection.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
};

export default BlogSection;
