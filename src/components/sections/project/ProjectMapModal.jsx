import { useEffect, useRef } from 'react';
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

const ProjectMapModal = ({ isOpen, onClose }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const { 
    language, 
    getProjectLocations, 
    getMapConfig, 
    getCategoryColors 
  } = useAppStore();
  
  // 获取项目数据
  const projectLocations = getProjectLocations();
  const mapConfig = getMapConfig();
  const categoryColors = getCategoryColors();

  useEffect(() => {
    if (isOpen && mapRef.current && !mapInstanceRef.current) {
      // 初始化地图
      mapInstanceRef.current = L.map(mapRef.current).setView(mapConfig.center, mapConfig.zoom);

      // 添加图层
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: mapConfig.attribution,
        minZoom: mapConfig.minZoom,
        maxZoom: mapConfig.maxZoom,
      }).addTo(mapInstanceRef.current);

      // 添加项目标记
      projectLocations.forEach(project => {
        // 创建自定义图标
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: ${categoryColors[project.category]};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                width: 8px;
                height: 8px;
                background-color: white;
                border-radius: 50%;
              "></div>
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        // 创建标记
        const marker = L.marker(project.location, { icon: customIcon })
          .addTo(mapInstanceRef.current);

        // 创建弹出窗口内容
        const popupContent = `
          <div style="min-width: 250px; font-family: Arial, sans-serif;">
            <div style="margin-bottom: 10px;">
              <img src="${project.image}" alt="${project.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px;" />
            </div>
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: bold;">
              ${project.name}
            </h3>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; line-height: 1.4;">
              ${project.description}
            </p>
            <div style="margin-bottom: 8px;">
              <span style="
                background-color: ${categoryColors[project.category]};
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
              ">
                ${project.category}
              </span>
              <span style="
                background-color: ${project.status === 'completed' ? '#10b981' : '#f59e0b'};
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 500;
                margin-left: 4px;
              ">
                ${project.status === 'completed' ? (language === 'en' ? 'Completed' : '已完成') : (language === 'en' ? 'In Progress' : '进行中')}
              </span>
            </div>
            <div style="margin-top: 8px;">
              <p style="margin: 0 0 4px 0; color: #374151; font-size: 12px; font-weight: 500;">
                ${language === 'en' ? 'Technologies:' : '技术栈:'}
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${project.technologies.map(tech => `
                  <span style="
                    background-color: #e5e7eb;
                    color: #374151;
                    padding: 1px 6px;
                    border-radius: 8px;
                    font-size: 11px;
                  ">${tech}</span>
                `).join('')}
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });

        markersRef.current.push(marker);
      });

      // 调整视图以包含所有标记
      if (markersRef.current.length > 0) {
        const group = new L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    }

    // 清理函数
    return () => {
      if (!isOpen && mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, [isOpen, language]);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 地图容器 */}
      <div className="relative w-[90vw] h-[80vh] max-w-6xl bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* 顶部标题栏 */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {language === 'en' ? 'Project Locations Map' : '项目地理分布图'}
            </h2>
            <p className="text-blue-100 text-sm">
              {language === 'en' ? 'Click on markers to view project details' : '点击标记查看项目详情'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label={language === 'en' ? 'Close map' : '关闭地图'}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* 地图 */}
        <div 
          ref={mapRef} 
          className="w-full h-full pt-16"
          style={{ zIndex: 1 }}
        />

        {/* 图例 */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            {language === 'en' ? 'Categories' : '项目类别'}
          </h4>
          <div className="space-y-1">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-gray-700">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectMapModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectMapModal;
