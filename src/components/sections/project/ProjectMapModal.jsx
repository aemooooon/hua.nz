import { useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import useAppStore from '../../../store/useAppStore';
import { useTheme } from '../../../hooks/useTheme';

// 修复 Leaflet 默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ProjectMapModal = ({ isOpen, onClose, language = 'en' }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  
  // 从store获取项目数据
  const { getAllLocations } = useAppStore();
  
  // 获取项目数据
  const projects = getAllLocations().filter(loc => loc.type === 'project');

  // 类型颜色映射 - 使用主题色变量
  const typeColors = useMemo(() => ({
    'project': themeColors.primary,
    'work': themeColors.success || '#10b981',
    'education': themeColors.warning || '#f59e0b',
    'activity': themeColors.purple || '#8b5cf6'
  }), [themeColors]);

  // 获取双语文本的辅助函数 - 使用 useCallback 避免每次渲染都重新创建
  const getBilingualText = useCallback((field) => {
    if (typeof field === 'object' && field !== null) {
      return field[language] || field.en || field.zh || '';
    }
    return field || '';
  }, [language]);

  useEffect(() => {
    if (isOpen && mapRef.current && !mapInstanceRef.current) {
      // 初始化地图
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);

      // 添加图层
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        minZoom: 1,
        maxZoom: 18,
      }).addTo(mapInstanceRef.current);

      // 添加项目标记
      projects.forEach(project => {
        if (project.coordinates && Array.isArray(project.coordinates)) {
          // 创建自定义图标
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                background-color: ${typeColors[project.type] || '#6b7280'};
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
          const marker = L.marker(project.coordinates, { icon: customIcon })
            .addTo(mapInstanceRef.current);

          // 获取项目图片
          const getProjectImage = () => {
            if (!project.img) return '';
            if (Array.isArray(project.img)) {
              return project.img[0] || '';
            }
            return project.img;
          };

          const projectImage = getProjectImage();
          const projectName = getBilingualText(project.name) || getBilingualText(project.title);
          const projectDescription = getBilingualText(project.description);
          const projectLocation = getBilingualText(project.location);

          // 创建弹出窗口内容
          const popupContent = `
            <div style="min-width: 250px; font-family: Arial, sans-serif;">
              ${projectImage ? `
                <div style="margin-bottom: 10px;">
                  <img src="${projectImage}" alt="${projectName}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px;" />
                </div>
              ` : ''}
              <h3 style="margin: 0 0 8px 0; color: ${themeColors.text}; font-size: 16px; font-weight: bold;">
                ${projectName}
              </h3>
              <p style="margin: 0 0 8px 0; color: ${themeColors.textSecondary}; font-size: 14px; line-height: 1.4;">
                ${projectDescription}
              </p>
              <div style="margin-bottom: 8px;">
                <span style="
                  background-color: ${typeColors[project.type] || '#6b7280'};
                  color: white;
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: 500;
                ">
                  ${project.type}
                </span>
                ${project.year ? `
                  <span style="
                    background-color: #10b981;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 500;
                    margin-left: 4px;
                  ">
                    ${project.year}
                  </span>
                ` : ''}
              </div>
              ${projectLocation ? `
                <div style="margin-top: 8px;">
                  <p style="margin: 0 0 4px 0; color: ${themeColors.text}; font-size: 12px; font-weight: 500;">
                    📍 ${projectLocation}
                  </p>
                </div>
              ` : ''}
              ${project.link ? `
                <div style="margin-top: 8px;">
                  <a href="${project.link}" target="_blank" style="
                    color: ${themeColors.primary};
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 500;
                  ">${language === 'en' ? '🔗 View Project' : '🔗 查看项目'}
                  </a>
                </div>
              ` : ''}
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
          });

          markersRef.current.push(marker);
        }
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
  }, [isOpen, language, projects, getBilingualText, typeColors, themeColors]);

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
      <div className="relative w-[90vw] h-[80vh] max-w-6xl bg-theme-surface rounded-lg overflow-hidden shadow-2xl">
        {/* 顶部标题栏 */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-theme-primary to-theme-accent text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {language === 'en' ? 'Project Locations Map' : '项目地理分布图'}
            </h2>
            <p className="text-theme-textSecondary text-sm">
              {language === 'en' ? 'Click on markers to view project details' : '点击标记查看项目详情'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-theme-surface/20 rounded-full transition-colors duration-200"
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
        <div className="absolute bottom-4 left-4 bg-theme-surface/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="text-sm font-semibold text-theme-text mb-2">
            {language === 'en' ? 'Categories' : '项目类别'}
          </h4>
          <div className="space-y-1">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border border-theme-border shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-theme-textSecondary capitalize">{type}</span>
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
  language: PropTypes.string
};

export default ProjectMapModal;
