import { useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import './ProjectMapModal.css';
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
  const clusterGroupRef = useRef(null);
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  
  // 从store获取项目数据
  const { getAllLocations } = useAppStore();
  
  // 获取项目数据，只取有坐标的项目
  const projects = useMemo(() => {
    return getAllLocations().filter(loc => 
      loc.type === 'project' && 
      loc.coordinates && 
      Array.isArray(loc.coordinates) && 
      loc.coordinates.length === 2
    );
  }, [getAllLocations]);

  // 类型颜色映射
  const typeColors = useMemo(() => ({
    'project': themeColors.primary,
    'work': themeColors.success || '#10b981',
    'education': themeColors.warning || '#f59e0b',
    'activity': themeColors.purple || '#8b5cf6'
  }), [themeColors]);

  // 获取双语文本的辅助函数
  const getBilingualText = useCallback((field) => {
    if (typeof field === 'object' && field !== null) {
      return field[language] || field.en || field.zh || '';
    }
    return field || '';
  }, [language]);

  // 计算所有项目的中心点
  const calculateCentroid = useCallback((locations) => {
    if (!locations || locations.length === 0) return [20, 0];
    const total = locations.length;
    const sumLat = locations.reduce((acc, loc) => acc + loc.coordinates[0], 0);
    const sumLon = locations.reduce((acc, loc) => acc + loc.coordinates[1], 0);
    return [sumLat / total, sumLon / total];
  }, []);

  // 飞行到指定marker
  const flyToMarker = useCallback((coordinates) => {
    if (!mapInstanceRef.current || !coordinates) return;
    mapInstanceRef.current.flyTo(coordinates, 12, { 
      animate: true, 
      duration: 1.5 
    });
  }, []);

  // 创建深色自定义marker图标 - 简化版本避免位移问题
  const createCustomMarkerIcon = useCallback((color) => {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `<div style="
        width: 28px; 
        height: 28px; 
        background: ${color}; 
        border: 3px solid #1f2937; 
        border-radius: 50%; 
        box-shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      ">
        <div style="
          width: 8px; 
          height: 8px; 
          background: #1f2937; 
          border-radius: 50%;
          box-shadow: 0 1px 2px rgba(0,0,0,0.3);
        "></div>
      </div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],    // 保持中心锚定
      popupAnchor: [0, -20],   // 弹窗在上方
    });
  }, []);

  // 创建深色自定义cluster图标
  const createCustomClusterIcon = useCallback((cluster) => {
    const childCount = cluster.getChildCount();
    let size = 40;
    let fontSize = 14;
    
    if (childCount >= 100) {
      size = 60;
      fontSize = 16;
    } else if (childCount >= 10) {
      size = 50;
      fontSize = 15;
    }
    
    return L.divIcon({
      html: `<div style="
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, ${themeColors.primary} 0%, #1f2937 100%);
        border: 4px solid #1f2937;
        border-radius: 50%;
        color: white;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 6px 20px rgba(0,0,0,0.4), inset 0 2px 6px rgba(255,255,255,0.2);
        font-size: ${fontSize}px;
        text-shadow: 0 1px 2px rgba(0,0,0,0.7);
        cursor: pointer;
        transition: all 0.3s ease;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${childCount}</div>`,
      className: 'custom-cluster-icon',
      iconSize: [size + 8, size + 8],
      iconAnchor: [(size + 8) / 2, (size + 8) / 2],
    });
  }, [themeColors]);

  // 创建项目弹窗内容（深色主题）
  const createPopupContent = useCallback((project) => {
    const projectName = getBilingualText(project.title) || getBilingualText(project.name);
    const projectDescription = getBilingualText(project.description);
    const projectLocation = getBilingualText(project.location);
    const projectImage = Array.isArray(project.img) ? project.img[0] : project.img;
    
    return `
      <div style="
        color: #e5e7eb; 
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%); 
        padding: 16px; 
        border-radius: 12px; 
        min-width: 280px; 
        max-width: 380px; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border: 1px solid #374151;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.4);
      ">
        ${projectImage ? `
          <div style="margin: -16px -16px 12px -16px; border-radius: 12px 12px 0 0; overflow: hidden;">
            <img src="${projectImage}" alt="${projectName}" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
          </div>
        ` : ''}
        
        <div style="position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="
              background: linear-gradient(45deg, ${themeColors.primary}, ${themeColors.accent || themeColors.primary}); 
              color: white; 
              padding: 6px 14px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 700;
              text-transform: capitalize;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ">${project.type}</span>
            ${project.year ? `<span style="color: #9ca3af; font-size: 12px; font-weight: 600; background: #374151; padding: 4px 8px; border-radius: 12px;">${project.year}</span>` : ''}
          </div>
          
          <h3 style="margin: 0 0 10px 0; color: #f9fafb; font-size: 18px; font-weight: 700; line-height: 1.3; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">${projectName}</h3>
          
          ${projectDescription ? `
            <p style="margin: 0 0 12px 0; color: #d1d5db; font-size: 14px; line-height: 1.5;">
              ${projectDescription.length > 140 ? projectDescription.substring(0, 140) + '...' : projectDescription}
            </p>
          ` : ''}
          
          ${projectLocation ? `
            <div style="display: flex; align-items: center; margin-bottom: 10px; color: #9ca3af; font-size: 12px;">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="margin-right: 6px;">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              ${projectLocation}
            </div>
          ` : ''}
          
          ${project.link ? `
            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151;">
              <a href="${project.link}" target="_blank" rel="noopener noreferrer" style="
                display: inline-flex; 
                align-items: center; 
                color: ${themeColors.primary}; 
                text-decoration: none; 
                font-size: 13px; 
                font-weight: 600;
                background: linear-gradient(45deg, ${themeColors.primary}20, transparent);
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid ${themeColors.primary}40;
                transition: all 0.3s ease;
              " onmouseover="this.style.background='${themeColors.primary}30'; this.style.borderColor='${themeColors.primary}60';" onmouseout="this.style.background='linear-gradient(45deg, ${themeColors.primary}20, transparent)'; this.style.borderColor='${themeColors.primary}40';">
                ${language === 'en' ? 'Learn more' : '了解更多'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }, [getBilingualText, themeColors, language]);

  useEffect(() => {
    if (isOpen && mapRef.current && !mapInstanceRef.current) {
      // 初始化地图
      const centroid = calculateCentroid(projects);
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView(centroid, 3);

      // 添加瓦片图层 - 使用浅色主题
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        minZoom: 1,
        maxZoom: 18,
      }).addTo(mapInstanceRef.current);

      // 创建聚类组 - 多层级聚类配置
      clusterGroupRef.current = L.markerClusterGroup({
        iconCreateFunction: createCustomClusterIcon,
        maxClusterRadius: (zoom) => {
          // 根据缩放级别动态调整聚类半径
          if (zoom <= 6) return 80;    // 远距离：更大聚类半径
          if (zoom <= 10) return 50;   // 中距离：中等聚类半径
          if (zoom <= 14) return 30;   // 近距离：较小聚类半径
          return 15;                   // 很近：最小聚类半径
        },
        spiderfyOnMaxZoom: true,        // 最大缩放时展开蜘蛛腿
        showCoverageOnHover: false,     // 悬停时不显示覆盖区域
        zoomToBoundsOnClick: true,      // 点击聚类时缩放到边界
        disableClusteringAtZoom: 15,    // 在缩放级别15时禁用聚类（降低一级）
        animate: true,                  // 启用动画
        animateAddingMarkers: true,     // 添加标记时启用动画
        spiderfyDistanceMultiplier: 1.5, // 蜘蛛腿展开距离倍数（减小一些）
        chunkedLoading: true,           // 启用分块加载提高性能
        removeOutsideVisibleBounds: false, // 不移除视图外的标记（确保标记稳定）
      });

      // 添加项目标记
      projects.forEach((project) => {
        const color = typeColors[project.type] || typeColors.project;
        const customIcon = createCustomMarkerIcon(color);
        
        const marker = L.marker(project.coordinates, { 
          icon: customIcon,
          title: getBilingualText(project.title) || getBilingualText(project.name) // 添加标题提示
        });
        
        // 绑定弹窗 - 添加边界检测
        const popupContent = createPopupContent(project);
        marker.bindPopup(popupContent, {
          maxWidth: 400,
          minWidth: 280,
          className: 'custom-popup dark-popup',
          closeButton: true,
          autoClose: false,
          closeOnEscapeKey: true,     // ESC键关闭
          keepInView: true,           // 自动保持弹窗在视图内
          autoPan: true,             // 自动平移地图以显示弹窗
          autoPanPadding: [20, 20],  // 平移时的边距
          offset: [0, -10],          // 弹窗偏移
        });

        // 添加事件监听器
        marker.on('click', function(e) {
          // 阻止事件冒泡到地图
          L.DomEvent.stopPropagation(e);
          
          // 打开弹窗
          marker.openPopup();
          
          // 平滑飞行到标记位置
          setTimeout(() => {
            flyToMarker(project.coordinates);
          }, 100);
        });

        // 添加悬停效果 - 通过JavaScript控制，更稳定
        marker.on('mouseover', function() {
          // 显示tooltip
          marker.bindTooltip(getBilingualText(project.title) || getBilingualText(project.name), {
            permanent: false,
            direction: 'top',
            offset: [0, -25],
            className: 'marker-tooltip'
          }).openTooltip();
          
          // 通过修改DOM来实现悬停效果，避免CSS transform问题
          const markerElement = marker.getElement();
          if (markerElement) {
            const innerDiv = markerElement.querySelector('div');
            if (innerDiv) {
              innerDiv.style.filter = 'brightness(1.2) contrast(1.1) drop-shadow(0 6px 16px rgba(0,0,0,0.5))';
              innerDiv.style.borderWidth = '4px';
              innerDiv.style.boxShadow = '0 6px 20px rgba(0,0,0,0.6), inset 0 3px 6px rgba(255,255,255,0.3)';
            }
          }
        });

        marker.on('mouseout', function() {
          marker.closeTooltip();
          
          // 恢复原始样式
          const markerElement = marker.getElement();
          if (markerElement) {
            const innerDiv = markerElement.querySelector('div');
            if (innerDiv) {
              innerDiv.style.filter = '';
              innerDiv.style.borderWidth = '3px';
              innerDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)';
            }
          }
        });

        // 添加到聚类组
        clusterGroupRef.current.addLayer(marker);
        markersRef.current.push(marker);
      });

      // 添加聚类组到地图
      mapInstanceRef.current.addLayer(clusterGroupRef.current);

      // 调整视图以包含所有标记
      if (projects.length > 0) {
        if (projects.length === 1) {
          mapInstanceRef.current.setView(projects[0].coordinates, 10);
        } else {
          const bounds = L.latLngBounds(projects.map(p => p.coordinates));
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }

      // 添加自定义CSS样式 - 深色主题
      const style = document.createElement('style');
      style.textContent = `
        /* 深色弹窗样式 */
        .dark-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.4) !important;
          padding: 0 !important;
          border: 1px solid #374151 !important;
        }
        
        .dark-popup .leaflet-popup-content {
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .dark-popup .leaflet-popup-tip {
          background: #1f2937 !important;
          border: 1px solid #374151 !important;
          box-shadow: 0 4px 8px rgba(0,0,0,0.4) !important;
        }
        
        .dark-popup .leaflet-popup-close-button {
          color: #9ca3af !important;
          font-size: 20px !important;
          font-weight: bold !important;
          padding: 8px !important;
          right: 8px !important;
          top: 8px !important;
          width: 32px !important;
          height: 32px !important;
          background: rgba(31, 41, 55, 0.8) !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s ease !important;
          border: 1px solid #4b5563 !important;
        }
        
        .dark-popup .leaflet-popup-close-button:hover {
          color: #f9fafb !important;
          background: #374151 !important;
          border-color: #6b7280 !important;
          transform: scale(1.1) !important;
        }
        
        /* 深色聚类样式 */
        .custom-cluster-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-marker-icon {
          background: transparent !important;
          border: none !important;
        }
        
        /* 地图容器样式 */
        .leaflet-container {
          background: #f8fafc !important;
        }
        
        /* 聚类动画 */
        .marker-cluster {
          transition: all 0.3s ease !important;
        }
        
        .marker-cluster:hover {
          transform: scale(1.05) !important;
        }
      `;
      document.head.appendChild(style);

      // 清理函数中保存样式引用
      mapInstanceRef.current._customStyle = style;
    }

    // 清理函数
    return () => {
      if (!isOpen && mapInstanceRef.current) {
        // 清理聚类组
        if (clusterGroupRef.current) {
          clusterGroupRef.current.clearLayers();
          mapInstanceRef.current.removeLayer(clusterGroupRef.current);
        }
        markersRef.current = [];
        
        // 清理自定义样式
        if (mapInstanceRef.current._customStyle && mapInstanceRef.current._customStyle.parentNode) {
          mapInstanceRef.current._customStyle.parentNode.removeChild(mapInstanceRef.current._customStyle);
        }
        
        // 销毁地图实例
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        clusterGroupRef.current = null;
      }
    };
  }, [isOpen, projects, typeColors, createCustomClusterIcon, createCustomMarkerIcon, createPopupContent, calculateCentroid, flyToMarker, themeColors, getBilingualText]);

  // ESC键关闭
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
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
      <div className="relative w-[95vw] h-[95vh] bg-theme-surface rounded-lg overflow-hidden shadow-2xl">
        {/* 右上角关闭按钮 - 深色主题 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 group bg-gray-900 hover:bg-theme-primary border-2 border-gray-700 hover:border-theme-primary rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-theme-primary/25"
          aria-label={language === 'en' ? 'Close map' : '关闭地图'}
        >
          <svg 
            className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        
        {/* 地图 */}
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ zIndex: 1 }}
        />

        {/* 左下角标题 - 深色主题 */}
        <div className="absolute bottom-4 left-4 z-10 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-xl">
          <h2 className="text-xl font-bold text-white">
            Project Geo Distribution
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            {language === 'en' ? 'Click clusters to expand' : '点击聚类以展开'}
          </p>
        </div>

        {/* 图例 - 深色主题 */}
        <div className="absolute bottom-4 right-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <h4 className="text-sm font-semibold text-white mb-2">
            {language === 'en' ? 'Categories' : '项目类别'}
          </h4>
          <div className="space-y-1">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border-2 border-gray-800 shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-gray-300 capitalize">{type}</span>
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
