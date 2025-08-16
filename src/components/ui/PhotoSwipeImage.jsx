import PropTypes from 'prop-types';
import { usePhotoSwipe } from '../../hooks/usePhotoSwipe';

/**
 * PhotoSwipeImage - 单独的图片组件，点击时可打开PhotoSwipe
 * 用于在项目详情或其他地方展示单个图片
 */
const PhotoSwipeImage = ({ 
  src, 
  thumbnail, 
  alt = '', 
  title = '', 
  description = '', 
  className = '',
  children,
  ...props 
}) => {
  const { openPhotoSwipe } = usePhotoSwipe();

  const handleClick = () => {
    const imageData = [{
      src,
      thumbnail: thumbnail || src,
      title,
      description
    }];
    openPhotoSwipe(0, imageData);
  };

  // 如果提供了children，则渲染children作为触发器
  if (children) {
    return (
      <div onClick={handleClick} className="cursor-pointer" {...props}>
        {children}
      </div>
    );
  }

  // 默认渲染图片
  return (
    <img
      src={thumbnail || src}
      alt={alt}
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
      {...props}
    />
  );
};

PhotoSwipeImage.propTypes = {
  src: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

export default PhotoSwipeImage;
