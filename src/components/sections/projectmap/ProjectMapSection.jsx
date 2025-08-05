import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useAppStore from '../../../store/useAppStore';

// 修复 Leaflet 默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ProjectMapSection = ({ section, language }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    
    // 从store获取项目数据
    const { getAllProjects } = useAppStore();

    // 筛选和分类功能
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [filteredLocations, setFilteredLocations] = useState(() => getAllProjects());

    const filterButtons = [
        { label: "All", value: "all" },
        { label: "Projects", value: "project" },
        { label: "Work", value: "work" },
        { label: "Education", value: "education" },
        { label: "Activities", value: "activity" },
    ];

    const handleFilterChange = (value) => {
        setActiveCategory(value);
        setSelectedLocation(null);
        const newFilteredLocations = getAllProjects().filter((loc) => {
            return (loc.type === value || value === "all") && loc.coordinates;
        });
        setFilteredLocations(newFilteredLocations);
    };

    useEffect(() => {
        if (!mapRef.current) return;
        // 清理旧地图
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        // 计算所有点的中心
        const getCentroid = (locs) => {
            if (!locs.length) return [30, 110]; // fallback: China
            const sumLat = locs.reduce((acc, loc) => acc + loc.coordinates[0], 0);
            const sumLon = locs.reduce((acc, loc) => acc + loc.coordinates[1], 0);
            return [sumLat / locs.length, sumLon / locs.length];
        };

        const map = L.map(mapRef.current, {
            center: getCentroid(filteredLocations),
            zoom: filteredLocations.length > 1 ? 4 : 7,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            dragging: true
        });

        // 添加深色主题瓦片层
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            attribution: '© Stadia Maps, © OpenMapTiles © OpenStreetMap contributors',
            maxZoom: 20
        }).addTo(map);

        // 添加标记
        filteredLocations.forEach((loc) => {
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="width: 24px; height: 24px; background: #10B981; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 24]
            });
            const marker = L.marker(loc.coordinates, { icon: customIcon }).addTo(map);
            const popupContent = `
                <div style="color: white; background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 12px; border-radius: 8px; min-width: 200px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <h3 style="margin: 0 0 8px 0; color: #10B981; font-size: 16px; font-weight: 600;">${loc.title || loc.name}</h3>
                    <p style="margin: 0 0 8px 0; color: #D1D5DB; font-size: 13px; line-height: 1.4;">${loc.description || ''}</p>
                    <div style="margin: 8px 0; color: #9CA3AF; font-size: 12px;">${loc.location || ''}</div>
                    <div style="margin: 8px 0; color: #9CA3AF; font-size: 12px;">${loc.year || ''}</div>
                    ${loc.link ? `<a href='${loc.link}' target='_blank' style='color:#3B82F6;text-decoration:underline;'>Learn more</a>` : ''}
                    ${loc.img ? `<div style='margin-top:8px;'>${Array.isArray(loc.img) ? loc.img.map(imgSrc => `<img src='${imgSrc}' style='max-width:100px;max-height:80px;margin-right:4px;border-radius:6px;' />`).join('') : `<img src='${loc.img}' style='max-width:100px;max-height:80px;border-radius:6px;' />`}</div>` : ''}
                </div>
            `;
            marker.bindPopup(popupContent, {
                className: 'custom-popup',
                closeButton: true,
                maxWidth: 300
            });
        });

        mapInstanceRef.current = map;

        // 添加自定义CSS
        const style = document.createElement('style');
        style.textContent = `
            .custom-popup .leaflet-popup-content-wrapper {
                background: transparent !important;
                border-radius: 8px !important;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
                padding: 0 !important;
            }
            .custom-popup .leaflet-popup-content {
                margin: 0 !important;
            }
            .custom-popup .leaflet-popup-tip {
                background: #374151 !important;
                border: none !important;
            }
            .leaflet-container {
                background: #1f2937 !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, [filteredLocations]);

    return (
        <div className="flex flex-col h-screen w-full text-white">
            {/* 标题区域 */}
            <div className="absolute top-8 left-8 z-[1000] bg-black/50 backdrop-blur-sm rounded-lg p-6">
                <h1 className="text-4xl font-bold mb-2">Project Map</h1>
                <p className="text-lg text-gray-300 mb-4">Explore my work, education, and projects geographically.</p>
                <div className="flex space-x-2 mt-2">
                    {filterButtons.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => handleFilterChange(category.value)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === category.value ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>
            {/* 地图区域 */}
            <div 
                ref={mapRef} 
                className="w-full h-full"
                style={{ zIndex: 1 }}
            />
        </div>
    );
};

ProjectMapSection.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired
    }).isRequired,
    language: PropTypes.string.isRequired
};

export default ProjectMapSection;
