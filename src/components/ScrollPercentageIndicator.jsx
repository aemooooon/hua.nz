import { useState, useEffect, useCallback } from 'react';

const ScrollPercentageIndicator = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    const updateScrollPercentage = useCallback(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    }, []);

    useEffect(() => {
        // Throttle function for better performance
        let ticking = false;
        
        const throttledUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollPercentage();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial calculation
        updateScrollPercentage();

        // Listen for scroll events with throttling
        window.addEventListener('scroll', throttledUpdate, { passive: true });
        window.addEventListener('resize', updateScrollPercentage);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', throttledUpdate);
            window.removeEventListener('resize', updateScrollPercentage);
        };
    }, [updateScrollPercentage]);

    return (
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-[100]">
            {/* Progress bar container */}
            <div className="relative">
                {/* Background track */}
                <div className="w-1.5 h-40 bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
                    {/* Progress fill */}
                    <div 
                        className="w-full bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-150 ease-out shadow-lg"
                        style={{ height: `${scrollPercentage}%` }}
                    />
                </div>
                
                {/* Percentage text */}
                <div className="absolute -right-14 top-1/2 transform -translate-y-1/2">
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-sm font-semibold border border-white/30 shadow-lg">
                        {Math.round(scrollPercentage)}%
                    </div>
                </div>
                
                {/* Animated glow effect */}
                <div 
                    className="absolute top-0 w-1.5 bg-gradient-to-t from-blue-400/60 via-purple-400/60 to-pink-400/60 rounded-full blur-sm transition-all duration-150"
                    style={{ height: `${scrollPercentage}%` }}
                />
                
                {/* Pulse indicator when scrolling */}
                <div 
                    className="absolute -inset-1 bg-gradient-to-t from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-md opacity-0 animate-pulse"
                    style={{ 
                        height: `${scrollPercentage}%`,
                        opacity: scrollPercentage > 0 ? 0.6 : 0
                    }}
                />
            </div>
        </div>
    );
};

export default ScrollPercentageIndicator;
