import { useState } from 'react';
import PropTypes from 'prop-types';

const CornerCloseButton = ({ 
  onClick, 
  className = '',
  ariaLabel = 'Close'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`fixed top-0 right-0 ${className} z-[100000]`} style={{ width: '4rem', height: '4rem' }}>
      {/* 背景圆 - 使用主题色纯色，调整层级到X下方 */}
      <div
        className={`
          absolute top-0 right-0
          w-80 h-80
          bg-theme-primary
          rounded-full
          transition-all duration-500 ease-in-out
          ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
          origin-top-right
          shadow-lg
          z-0
        `}
        style={{
          transform: 'translate(50%, -50%)'
        }}
      />

      {/* 点击区域 - 确保在最上层 */}
      <button
        className="absolute top-0 right-0 w-24 h-24 focus:outline-none z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
        aria-label={ariaLabel}
      />
      
      {/* X 图标 - 在最上层，去掉旋转效果 */}
      <div className="absolute top-10 right-10 pointer-events-none z-30">
        <svg 
          className={`
            w-8 h-8
            transition-all duration-500 ease-in-out
            ${isHovered ? 'text-white scale-110' : 'text-theme-primary scale-100'}
            drop-shadow-lg
          `}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </div>
    </div>
  );
};

CornerCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  ariaLabel: PropTypes.string
};

export default CornerCloseButton;
