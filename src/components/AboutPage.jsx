import { useApp } from '../contexts/AppContext';

const AboutPage = () => {
    const { content } = useApp();

    return (
        <div className="w-full h-full overflow-auto p-8">
            <div className="max-w-4xl mx-auto">
                <div className="content-section p-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-6">
                        {content.about.title}
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        {content.about.subtitle}
                    </p>
                    <div className="text-enhanced p-8 rounded-lg">
                        <p className="text-6xl mb-4">🚧</p>
                        <p className="text-xl text-yellow-400 mb-2">Coming Soon</p>
                        <p className="text-gray-400">This page is under construction</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
