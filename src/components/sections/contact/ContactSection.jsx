import PropTypes from 'prop-types';

const ContactSection = ({ section, language }) => {
    return (
        <div className="flex items-center justify-center h-screen w-full p-8 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-8">
                    {section.name[language]}
                </h1>
                <p className="text-xl text-gray-300 mb-12">
                    {section.description[language]}
                </p>
                
                {/* 联系方式 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4">📧 Email</h3>
                        <p className="text-gray-300">contact@example.com</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4">📱 Phone</h3>
                        <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                        <h3 className="text-2xl font-semibold mb-4">📍 Location</h3>
                        <p className="text-gray-300">New Zealand</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ContactSection.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
};

export default ContactSection;
