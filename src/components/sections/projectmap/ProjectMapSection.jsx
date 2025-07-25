import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

    // 项目数据
    const projects = [
        {
            id: 1,
            name: { en: "Data 472 Project", zh: "数据472项目" },
            description: { en: "Full-stack data pipeline and visualization platform", zh: "全栈数据管道和可视化平台" },
            coordinates: [-43.5321, 172.6362], // 新西兰基督城
            tech: ["React", "Node.js", "PostgreSQL", "Docker"],
            status: "completed"
        },
        {
            id: 2,
            name: { en: "FitsGo Platform", zh: "FitsGo平台" },
            description: { en: "Health and fitness tracking application", zh: "健康和健身追踪应用" },
            coordinates: [-36.8485, 174.7633], // 新西兰奥克兰
            tech: ["React Native", "Firebase", "Express"],
            status: "in-progress"
        },
        {
            id: 3,
            name: { en: "AQI Monitor", zh: "空气质量监测" },
            description: { en: "Real-time air quality monitoring system", zh: "实时空气质量监测系统" },
            coordinates: [-41.2865, 174.7762], // 新西兰惠灵顿
            tech: ["Python", "IoT", "Time Series DB"],
            status: "completed"
        },
        {
            id: 4,
            name: { en: "E-commerce Platform", zh: "电商平台" },
            description: { en: "Modern e-commerce solution with microservices", zh: "基于微服务的现代电商解决方案" },
            coordinates: [-45.0312, 168.6626], // 新西兰皇后镇
            tech: ["Vue.js", "Spring Boot", "MongoDB"],
            status: "planning"
        }
    ];

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // 初始化地图
        const map = L.map(mapRef.current, {
            center: [-41.0, 173.0], // 新西兰中心
            zoom: 6,
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

        // 添加项目标记
        projects.forEach(project => {
            const statusColor = {
                completed: '#10B981', // 绿色
                'in-progress': '#F59E0B', // 橙色
                planning: '#6B7280' // 灰色
            };

            // 创建自定义图标
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `
                    <div style="
                        width: 20px;
                        height: 20px;
                        background-color: ${statusColor[project.status]};
                        border: 2px solid white;
                        border-radius: 50%;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    "></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(map);

            // 创建弹出窗口内容
            const popupContent = `
                <div style="
                    color: white;
                    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
                    padding: 12px;
                    border-radius: 8px;
                    min-width: 200px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                ">
                    <h3 style="margin: 0 0 8px 0; color: #10B981; font-size: 16px; font-weight: 600;">
                        ${project.name[language]}
                    </h3>
                    <p style="margin: 0 0 8px 0; color: #D1D5DB; font-size: 13px; line-height: 1.4;">
                        ${project.description[language]}
                    </p>
                    <div style="margin: 8px 0;">
                        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                            ${project.tech.map(tech => 
                                `<span style="
                                    background: rgba(16, 185, 129, 0.2);
                                    color: #10B981;
                                    padding: 2px 6px;
                                    border-radius: 4px;
                                    font-size: 11px;
                                    font-weight: 500;
                                ">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div style="margin-top: 8px; display: flex; align-items: center;">
                        <div style="
                            width: 8px;
                            height: 8px;
                            background-color: ${statusColor[project.status]};
                            border-radius: 50%;
                            margin-right: 6px;
                        "></div>
                        <span style="
                            color: #9CA3AF;
                            font-size: 12px;
                            text-transform: capitalize;
                        ">${project.status.replace('-', ' ')}</span>
                    </div>
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
    }, [language]);

    return (
        <div className="flex flex-col h-screen w-full text-white">
            {/* 标题区域 */}
            <div className="absolute top-8 left-8 z-[1000] bg-black/50 backdrop-blur-sm rounded-lg p-6">
                <h1 className="text-4xl font-bold mb-2">
                    {section.name[language]}
                </h1>
                <p className="text-lg text-gray-300 mb-4">
                    {section.description[language]}
                </p>
                <div className="flex space-x-4 text-sm">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Completed</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span>In Progress</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
                        <span>Planning</span>
                    </div>
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
