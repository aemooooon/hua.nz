import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const ImageWithLoader = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 600, height: 400 });
    const galleryRef = useRef(null);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
            setLoading(false);
        };
        img.onerror = () => setError(true);
    }, [src]);

    useEffect(() => {
        if (!galleryRef.current) return;

        let lightbox = new PhotoSwipeLightbox({
            gallery: galleryRef.current,
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <>
            {loading && !error && (
                <div className="absolute inset-0 flex w-full h-full justify-center items-center">
                    <FaSpinner className="animate-spin text-green-500 text-4xl" />
                </div>
            )}

            <div className="pswp-gallery" ref={galleryRef}>
                <a
                    href={src}
                    data-pswp-width={imageSize.width}
                    data-pswp-height={imageSize.height}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={error ? "/fallback-image.jpg" : src}
                        className={`object-contain cursor-pointer w-full h-auto rounded-md transition-opacity duration-300 ${
                            loading ? "opacity-0" : "opacity-100"
                        }`}
                        alt={alt}
                        loading="lazy"
                        onError={() => setError(true)}
                    />
                </a>
            </div>
        </>
    );
};

ImageWithLoader.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default ImageWithLoader;
