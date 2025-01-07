import PropTypes from "prop-types";

const PortfolioCard = ({ title, description, techUsed, imgSrc }) => (
    <div className="bg-dark rounded-lg shadow-md overflow-hidden">
        <div className="relative">
            <img src={imgSrc} alt={title} className="w-full h-96 object-cover" />
            <div className="absolute inset-0 bg-primaryDark bg-opacity-50 opacity-0 hover:opacity-100 hover:bg-opacity-80 transition-opacity flex items-center justify-center">
                <div className="text-center text-white space-y-4">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="text-base">{description}</p>
                    <p className="text-sm font-light text-primary">{techUsed}</p>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="#"
                            className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                        >
                            <i className="ri-github-fill"></i>
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 inline-flex items-center justify-center p-2 border-solid border-2 border-secondary rounded-full text-[20px]  text-white no-underline transition duration-500 hover:bg-secondary hover:text-bg hover:shadow-lg"
                        >
                            <i className="ri-corner-down-left-line"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

PortfolioCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    techUsed: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
};

export default PortfolioCard;
