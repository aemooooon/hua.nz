import PropTypes from 'prop-types';

const GalleryFilter = ({ 
    categories = [], 
    currentCategory = 'all', 
    onCategoryChange,
    language = 'en'
}) => {
    const allCategories = [
        {
            id: 'all',
            name: {
                en: 'All',
                zh: '全部'
            },
            color: '#6366f1'
        },
        ...categories
    ];

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {allCategories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`
                        px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform
                        border-2 backdrop-blur-sm
                        ${currentCategory === category.id
                            ? 'bg-white text-black border-white shadow-lg scale-105'
                            : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105'
                        }
                    `}
                    style={{
                        boxShadow: currentCategory === category.id 
                            ? `0 0 20px ${category.color}40`
                            : 'none'
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                        />
                        {category.name[language]}
                    </div>
                </button>
            ))}
        </div>
    );
};

GalleryFilter.propTypes = {
    categories: PropTypes.array,
    currentCategory: PropTypes.string,
    onCategoryChange: PropTypes.func.isRequired,
    language: PropTypes.string
};

export default GalleryFilter;
