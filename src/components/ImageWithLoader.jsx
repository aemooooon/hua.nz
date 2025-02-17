import { useState } from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa"; // 使用 FontAwesome 作为加载动画

const ImageWithLoader = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <>
            {/* 加载中的动画 */}
            {loading && !error && (
                <div className="absolute inset-0 flex justify-center items-center">
                    <FaSpinner className="animate-spin text-gray-500 text-3xl" />
                </div>
            )}

            {/* 图片 */}
            <img
                src={error ? "/fallback-image.jpg" : src}
                className={`object-contain w-full h-auto rounded-md transition-opacity duration-500 ${
                    loading ? "opacity-0" : "opacity-100"
                }`}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={() => setError(true)} // 图片加载失败时
            />
        </>
    );
};
ImageWithLoader.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default ImageWithLoader;
