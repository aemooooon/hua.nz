import PropTypes from 'prop-types';
import './GlowDivider.css';

const GlowDivider = ({ 
    className = "", 
    width = "w-full max-w-4xl",
    animated = true,
    enhanced = false
}) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className={`${width} h-0.5 bg-theme-text-white-30 backdrop-blur-sm shadow-lg ${animated ? (enhanced ? 'glow-divider enhanced' : 'glow-divider') : ''}`}></div>
        </div>
    );
};

GlowDivider.propTypes = {
    className: PropTypes.string,
    width: PropTypes.string,
    animated: PropTypes.bool,
    enhanced: PropTypes.bool
};

export default GlowDivider;
