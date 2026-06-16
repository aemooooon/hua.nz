import PropTypes from 'prop-types';
import { CURSOR_BASE_SIZE } from './cursorConstants';
import { getCursorColors } from './cursorUtils';

const getDisplayValue = ({ animatedValue, currentScrollDelta, isAnimatingDown }) => {
    const valueToShow = isAnimatingDown ? animatedValue : currentScrollDelta;
    if (valueToShow === 0) return null;
    return Math.abs(valueToShow).toString();
};

const getNumberPosition = scrollDirection => {
    if (scrollDirection === 'down') return 'translate3d(24px, 0, 0)';
    if (scrollDirection === 'up') return 'translate3d(-24px, 0, 0)';
    return 'translate3d(0, 0, 0)';
};

const DirectionArrow = ({ direction, hoverScale, intensity, scrollIntensity, themeColors, shouldShowBoundaryWarning }) => {
    const arrowSize = 256 * hoverScale;
    const arrowPath =
        direction === 'up' ? 'M12 22L12 2M10 4L12 2L14 4' : 'M12 2L12 22M10 20L12 22L14 20';
    const { baseColor, progressColor } = getCursorColors({
        shouldShowBoundaryWarning,
        scrollIntensity,
        themeColors,
    });
    const arrowColor = scrollIntensity === 0 ? baseColor : progressColor;

    return (
        <div
            className="power-cursor-arrow"
            style={{
                width: `${arrowSize}px`,
                height: `${arrowSize}px`,
                opacity: intensity * 0.95,
            }}
        >
            <svg width={arrowSize} height={arrowSize} viewBox="0 0 24 24">
                <path
                    d={arrowPath}
                    stroke={arrowColor}
                    strokeWidth={0.28}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity={0.96}
                />
            </svg>
        </div>
    );
};

DirectionArrow.propTypes = {
    direction: PropTypes.oneOf(['up', 'down']).isRequired,
    hoverScale: PropTypes.number.isRequired,
    intensity: PropTypes.number.isRequired,
    scrollIntensity: PropTypes.number.isRequired,
    shouldShowBoundaryWarning: PropTypes.bool.isRequired,
    themeColors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
    }).isRequired,
};

const PowerDirectionalIndicator = ({
    animatedValue,
    boundaryState,
    currentScrollDelta,
    direction,
    isAnimatingDown,
    isHovering,
    scrollDirection,
    scrollIntensity,
    themeColors,
}) => {
    const hoverScale = isHovering ? 1.02 : 1;
    const size = CURSOR_BASE_SIZE * hoverScale;
    const radius = (size - 4) / 2;
    const circumference = 2 * Math.PI * radius;
    const shouldShowBoundaryWarning =
        (boundaryState.isTopBoundary && scrollDirection === 'up' && scrollIntensity > 0) ||
        (boundaryState.isBottomBoundary && scrollDirection === 'down' && scrollIntensity > 0) ||
        (boundaryState.hasNowhereToGo && scrollIntensity > 0);
    const { baseColor, progressColor } = getCursorColors({
        shouldShowBoundaryWarning,
        scrollIntensity,
        themeColors,
    });
    const displayValue = getDisplayValue({
        animatedValue,
        currentScrollDelta,
        isAnimatingDown,
    });
    const shouldShowValue =
        displayValue !== null &&
        (scrollIntensity > 0 ||
            Math.abs(currentScrollDelta) > 0 ||
            isAnimatingDown ||
            Math.abs(animatedValue) > 0);

    return (
        <div
            className="power-cursor-indicator"
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <svg
                width={size}
                height={size}
                className="power-cursor-ring"
                style={{
                    transform: scrollDirection === 'up' ? 'rotate(90deg)' : 'rotate(-90deg)',
                }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={baseColor}
                    strokeWidth={0.34}
                    opacity="0.96"
                />

                {scrollIntensity > 0 && (
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={progressColor}
                        strokeWidth={5}
                        strokeLinecap="round"
                        opacity="0.96"
                        strokeDasharray={`${circumference}`}
                        strokeDashoffset={`${circumference * (1 - scrollIntensity)}`}
                        className="power-cursor-progress"
                    />
                )}
            </svg>

            {shouldShowValue && (
                <div
                    className="power-cursor-value"
                    style={{
                        color: progressColor,
                        textShadow: `0 0 6px ${progressColor}40`,
                        transform: getNumberPosition(scrollDirection),
                        transition: isAnimatingDown ? 'none' : 'all 0.2s ease-out',
                    }}
                >
                    <span
                        className="scroll-value"
                        style={{
                            transform: isAnimatingDown ? 'scale(0.95)' : 'scale(1)',
                        }}
                    >
                        {displayValue}
                    </span>
                </div>
            )}

            {direction === 'up' && (
                <DirectionArrow
                    direction="up"
                    hoverScale={hoverScale}
                    intensity={1}
                    scrollIntensity={scrollIntensity}
                    themeColors={themeColors}
                    shouldShowBoundaryWarning={shouldShowBoundaryWarning}
                />
            )}
            {direction === 'down' && (
                <DirectionArrow
                    direction="down"
                    hoverScale={hoverScale}
                    intensity={1}
                    scrollIntensity={scrollIntensity}
                    themeColors={themeColors}
                    shouldShowBoundaryWarning={shouldShowBoundaryWarning}
                />
            )}
            {direction === 'both' && (
                <>
                    <DirectionArrow
                        direction="up"
                        hoverScale={hoverScale}
                        intensity={0.7}
                        scrollIntensity={scrollIntensity}
                        themeColors={themeColors}
                        shouldShowBoundaryWarning={shouldShowBoundaryWarning}
                    />
                    <DirectionArrow
                        direction="down"
                        hoverScale={hoverScale}
                        intensity={0.7}
                        scrollIntensity={scrollIntensity}
                        themeColors={themeColors}
                        shouldShowBoundaryWarning={shouldShowBoundaryWarning}
                    />
                </>
            )}

            {direction === 'none' && scrollIntensity === 0 && (
                <div
                    className="power-cursor-none-dot"
                    style={{
                        backgroundColor: baseColor,
                    }}
                />
            )}

            <div className="power-cursor-center-dot" />
        </div>
    );
};

PowerDirectionalIndicator.propTypes = {
    animatedValue: PropTypes.number.isRequired,
    boundaryState: PropTypes.shape({
        hasContentToScroll: PropTypes.bool.isRequired,
        hasNowhereToGo: PropTypes.bool.isRequired,
        isBottomBoundary: PropTypes.bool.isRequired,
        isTopBoundary: PropTypes.bool.isRequired,
    }).isRequired,
    currentScrollDelta: PropTypes.number.isRequired,
    direction: PropTypes.oneOf(['up', 'down', 'both', 'none']).isRequired,
    isAnimatingDown: PropTypes.bool.isRequired,
    isHovering: PropTypes.bool.isRequired,
    scrollDirection: PropTypes.oneOf(['up', 'down', null]),
    scrollIntensity: PropTypes.number.isRequired,
    themeColors: PropTypes.shape({
        accent: PropTypes.string.isRequired,
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
    }).isRequired,
};

export default PowerDirectionalIndicator;
