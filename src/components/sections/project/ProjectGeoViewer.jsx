import { useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import './ProjectGeoViewer.css';
import useAppStore from '../../../store/useAppStore';
import { useTheme } from '../../../hooks/useTheme';
import CornerCloseButton from '../../ui/CornerCloseButton';

// 修复 Leaflet 默认图标问题
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ProjectGeoViewer = ({ isOpen, onClose, language = 'en' }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const clusterGroupRef = useRef(null);
  const customControlsRef = useRef(null);
  
  // 添加状态管理用于记录popup打开前的地图状态
  const previousMapStateRef = useRef(null);
  const currentPopupRef = useRef(null);
  
  const { getThemeColors } = useTheme();
  const themeColors = getThemeColors();
  
  // 从store获取项目数据
  const { getAllLocations, getProjectsText } = useAppStore();
  
  // 获取当前语言的项目文本
  const projectText = getProjectsText();
  
  // 获取项目数据，只取有坐标的项目
  const projects = useMemo(() => {
    return getAllLocations().filter(loc => 
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

  // 保存当前地图状态
  const saveMapState = useCallback(() => {
    if (!mapInstanceRef.current) return;
    
    previousMapStateRef.current = {
      center: mapInstanceRef.current.getCenter(),
      zoom: mapInstanceRef.current.getZoom()
    };
  }, []);

  // 恢复到之前的地图状态
  const restoreMapState = useCallback(() => {
    if (!mapInstanceRef.current || !previousMapStateRef.current) return;
    
    const { center, zoom } = previousMapStateRef.current;
    
    // 使用flyTo进行平滑过渡回到之前的状态
    mapInstanceRef.current.flyTo(center, zoom, {
      animate: true,
      duration: 1.2 // 稍微快一点的动画
    });
    
    // 清除保存的状态
    previousMapStateRef.current = null;
  }, []);

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

  // 创建美化的自定义marker图标 - 使用地图高对比度风格
  const createCustomMarkerIcon = useCallback(() => {
    return L.divIcon({
      className: 'custom-marker-icon',
      html: `<div class="marker-container" style="
        width: 32px; 
        height: 32px; 
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        filter: drop-shadow(0 0 8px var(--theme-map-button-border)) drop-shadow(0 0 12px rgba(var(--theme-map-button-glow), 0.5));
      ">
        <div class="marker-glow" style="
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(var(--theme-map-button-glow), 0.4) 0%, rgba(var(--theme-map-button-glow), 0.2) 50%, transparent 70%);
          border-radius: 50%;
          animation: marker-pulse 2s ease-in-out infinite;
        "></div>
        <div class="marker-core" style="
          width: 24px; 
          height: 24px; 
          background: var(--theme-map-button-bg); 
          border: 2px solid var(--theme-map-button-border); 
          border-radius: 50%; 
          box-shadow: 
            0 0 0 2px rgba(var(--theme-map-button-glow), 0.8),
            0 4px 12px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        ">
          <div style="
            width: 6px; 
            height: 6px; 
            background: var(--theme-map-button-text); 
            border-radius: 50%;
            box-shadow: 0 0 4px rgba(var(--theme-map-button-glow), 0.8);
          "></div>
        </div>
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],    // 保持中心锚定
      popupAnchor: [0, -25],   // 弹窗在上方
    });
  }, []);

  // 创建美化的自定义cluster图标 - 使用地图高对比度风格
  const createCustomClusterIcon = useCallback((cluster) => {
    const childCount = cluster.getChildCount();
    let size = 50;
    let fontSize = 16;
    let glowSize = 70;
    
    if (childCount >= 100) {
      size = 70;
      fontSize = 20;
      glowSize = 90;
    } else if (childCount >= 10) {
      size = 60;
      fontSize = 18;
      glowSize = 80;
    }
    
    return L.divIcon({
      html: `<div class="cluster-container" style="
        width: ${glowSize}px;
        height: ${glowSize}px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        filter: drop-shadow(0 0 12px var(--theme-map-button-border)) drop-shadow(0 0 20px rgba(var(--theme-map-button-glow), 0.6));
      ">
        <div class="cluster-glow" style="
          position: absolute;
          width: ${glowSize}px;
          height: ${glowSize}px;
          background: radial-gradient(circle, rgba(var(--theme-map-button-glow), 0.3) 0%, rgba(var(--theme-map-button-glow), 0.15) 40%, transparent 70%);
          border-radius: 50%;
          animation: cluster-pulse 3s ease-in-out infinite;
        "></div>
        <div class="cluster-ring" style="
          position: absolute;
          width: ${size + 10}px;
          height: ${size + 10}px;
          border: 2px solid rgba(var(--theme-map-button-glow), 0.6);
          border-radius: 50%;
          animation: cluster-rotate 8s linear infinite;
        "></div>
        <div class="cluster-core" style="
          width: ${size}px;
          height: ${size}px;
          background: var(--theme-map-button-bg);
          border: 3px solid var(--theme-map-button-border);
          border-radius: 50%;
          color: var(--theme-map-button-text);
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 
            0 0 0 3px rgba(var(--theme-map-button-glow), 0.8),
            0 8px 25px rgba(0,0,0,0.4),
            inset 0 2px 0 rgba(255,255,255,0.3),
            inset 0 -2px 0 rgba(0,0,0,0.2);
          font-size: ${fontSize}px;
          text-shadow: 0 0 8px rgba(var(--theme-map-button-glow), 0.8);
          position: relative;
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        " onmouseover="this.style.transform='scale(1.1) rotate(5deg)'; this.style.color='var(--theme-map-button-text-hover)'; this.style.borderColor='var(--theme-map-button-border-hover)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow-intense), 1), 0 12px 35px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.4)'" 
           onmouseout="this.style.transform='scale(1) rotate(0deg)'; this.style.color='var(--theme-map-button-text)'; this.style.borderColor='var(--theme-map-button-border)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow), 0.8), 0 8px 25px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)'">${childCount}</div>
      </div>`,
      className: 'custom-cluster-icon',
      iconSize: [glowSize, glowSize],
      iconAnchor: [glowSize / 2, glowSize / 2],
    });
  }, []);

  // 创建自定义地图控件
  const createCustomControls = useCallback(() => {
    if (!mapInstanceRef.current) return;

    // 移除默认的缩放控件
    mapInstanceRef.current.zoomControl.remove();

    // 创建自定义控件容器
    const CustomControl = L.Control.extend({
      onAdd: function(map) {
        const container = L.DomUtil.create('div', 'custom-map-controls');
        
        container.innerHTML = `
          <div class="control-group">
            <button class="control-btn zoom-in" title="${language === 'en' ? 'Zoom in' : '放大'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="control-btn zoom-out" title="${language === 'en' ? 'Zoom out' : '缩小'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="control-btn reset-view" title="${projectText.map.resetToDefaultView}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
            </button>
            <button class="control-btn locate-user" title="${language === 'en' ? 'Locate me' : '定位我的位置'}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </button>
          </div>
        `;

        // 阻止地图事件冒泡
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        // 绑定事件
        const zoomInBtn = container.querySelector('.zoom-in');
        const zoomOutBtn = container.querySelector('.zoom-out');
        const resetViewBtn = container.querySelector('.reset-view');
        const locateUserBtn = container.querySelector('.locate-user');

        zoomInBtn.addEventListener('click', () => map.zoomIn());
        zoomOutBtn.addEventListener('click', () => map.zoomOut());
        
        resetViewBtn.addEventListener('click', () => {
          // 重置到默认视图
          if (projects.length > 0) {
            if (projects.length === 1) {
              map.setView(projects[0].coordinates, 10);
            } else {
              const bounds = L.latLngBounds(projects.map(p => p.coordinates));
              map.fitBounds(bounds, { padding: [50, 50] });
            }
          } else {
            const centroid = calculateCentroid(projects);
            map.setView(centroid, 3);
          }
        });

        locateUserBtn.addEventListener('click', () => {
          // 定位用户位置
          if (navigator.geolocation) {
            locateUserBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <circle cx="12" cy="12" r="8"></circle>
              </svg>
            `;
            
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 15);
                
                // 添加用户位置标记
                const userMarker = L.marker([latitude, longitude], {
                  icon: L.divIcon({
                    className: 'user-location-marker',
                    html: `<div style="
                      width: 20px; 
                      height: 20px; 
                      background: #3b82f6; 
                      border: 3px solid white; 
                      border-radius: 50%; 
                      box-shadow: 0 2px 8px rgba(59,130,246,0.4);
                    "></div>`,
                    iconSize: [26, 26],
                    iconAnchor: [13, 13],
                  })
                }).addTo(map);

                // 3秒后移除用户位置标记
                setTimeout(() => {
                  map.removeLayer(userMarker);
                }, 3000);

                // 恢复按钮图标
                locateUserBtn.innerHTML = `
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `;
              },
              (error) => {
                console.warn('定位失败:', error);
                // 恢复按钮图标
                locateUserBtn.innerHTML = `
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `;
              }
            );
          }
        });

        return container;
      }
    });

    // 添加控件到地图右下角
    const customControl = new CustomControl({ position: 'bottomright' });
    customControl.addTo(mapInstanceRef.current);
    customControlsRef.current = customControl;

  }, [language, projects, calculateCentroid, projectText.map.resetToDefaultView]);

  // 创建项目弹窗内容（深色主题）
  const createPopupContent = useCallback((project) => {
    const projectName = getBilingualText(project.name);
    const projectClient = getBilingualText(project.client);
    const projectLocation = getBilingualText(project.location);
    const projectImage = Array.isArray(project.img) ? project.img[0] : project.img;
    
    return `
      <div style="
        color: #e5e7eb; 
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%); 
        padding: 0; 
        border-radius: 12px; 
        width: 100%; 
        max-width: 100%; 
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        border: 1px solid #374151;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.4);
        position: relative;
      ">
        ${projectImage ? `
          <div style="border-radius: 12px 12px 0 0; overflow: hidden; position: relative;">
            <img src="${projectImage}" alt="${projectName}" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
          </div>
        ` : ''}
        
        <div style="padding: 16px; padding-right: 40px;">
          <div style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: 12px; gap: 12px;">
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
          
          <h3 style="margin: 0 0 10px 0; color: #f9fafb; font-size: 16px; font-weight: 700; line-height: 1.3; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">${projectName}</h3>
          
          ${projectLocation ? `
            <div style="display: flex; align-items: center; margin-bottom: 10px; color: #9ca3af; font-size: 12px;">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="margin-right: 6px;">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              ${projectClient}, ${projectLocation}
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

      // 创建自定义控件
      createCustomControls();

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
        const customIcon = createCustomMarkerIcon();
        
        const marker = L.marker(project.coordinates, { 
          icon: customIcon,
          title: getBilingualText(project.title) || getBilingualText(project.name) // 添加标题提示
        });
        
        // 绑定弹窗 - 调整为2倍宽度
        const popupContent = createPopupContent(project);
        const popup = marker.bindPopup(popupContent, {
          maxWidth: 800,
          minWidth: 560,
          className: 'custom-popup dark-popup',
          closeButton: true,
          autoClose: false,
          closeOnEscapeKey: true,     // ESC键关闭
          keepInView: true,           // 自动保持弹窗在视图内
          autoPan: true,             // 自动平移地图以显示弹窗
          autoPanPadding: [20, 20],  // 平移时的边距
          offset: [0, -25],          // 重新调整偏移量，让弹窗跟随marker
        }).getPopup();

        // 为popup添加额外的关闭事件监听
        popup.on('remove', function() {
          // 如果这是当前记录的popup被移除，则恢复地图状态
          if (currentPopupRef.current === popup) {
            setTimeout(() => {
              restoreMapState();
            }, 200); // 稍微延迟以确保popup完全关闭
            
            // 清除当前popup引用
            currentPopupRef.current = null;
          }
        });

        // 添加事件监听器
        marker.on('click', function(e) {
          // 阻止事件冒泡到地图
          L.DomEvent.stopPropagation(e);
          
          // 保存当前地图状态（在飞行到marker之前）
          saveMapState();
          
          // 记录当前打开的popup
          currentPopupRef.current = popup;
          
          // 打开弹窗
          marker.openPopup();
          
          // 平滑飞行到标记位置
          setTimeout(() => {
            flyToMarker(project.coordinates);
          }, 100);
        });

        // 监听popup关闭事件（保留作为备用）
        marker.on('popupclose', function() {
          // 如果这是当前记录的popup关闭，则恢复地图状态
          if (currentPopupRef.current === popup) {
            setTimeout(() => {
              restoreMapState();
            }, 200); // 稍微延迟以确保popup完全关闭
            
            // 清除当前popup引用
            currentPopupRef.current = null;
          }
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
        /* 深色弹窗样式 - 简化覆盖策略 */
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
        
        /* 重新定位箭头到弹窗中心 */
        .dark-popup .leaflet-popup-tip {
          background: #1f2937 !important;
          border: 1px solid #374151 !important;
          box-shadow: 0 4px 8px rgba(0,0,0,0.4) !important;
        }
        
        /* 关键修复：强制所有弹窗的tip居中 */
        .leaflet-popup-tip {
          left: 50% !important;
          margin-left: -7px !important;
          transform: none !important;
        }
        
        /* 移除之前的复杂tip容器定位 */
        
        /* 覆盖Leaflet的popup整体定位 */
        .leaflet-popup {
          margin-bottom: 20px !important;
        }
        
        /* 关闭按钮 - 基于新的宽度重新定位 */
        .dark-popup .leaflet-popup-close-button {
          color: #9ca3af !important;
          font-size: 18px !important;
          font-weight: bold !important;
          padding: 0 !important;
          /* 基于实际内容宽度定位 */
          right: 12px !important;
          top: 12px !important;
          width: 28px !important;
          height: 28px !important;
          background: rgba(31, 41, 55, 0.9) !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.3s ease !important;
          border: 1px solid #4b5563 !important;
          z-index: 10000 !important;
          position: absolute !important;
          text-decoration: none !important;
          line-height: 1 !important;
        }
        
        .dark-popup .leaflet-popup-close-button:hover {
          color: #ffffff !important;
          background: rgba(220, 38, 38, 0.9) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: scale(1.1) !important;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4) !important;
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
        // 清理状态引用
        previousMapStateRef.current = null;
        currentPopupRef.current = null;
        
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
  }, [isOpen, projects, typeColors, createCustomClusterIcon, createCustomMarkerIcon, createPopupContent, calculateCentroid, flyToMarker, themeColors, getBilingualText, createCustomControls, saveMapState, restoreMapState]);

  // ESC键关闭和滚动控制
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // 保存当前滚动位置
      const scrollY = window.scrollY;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    return () => {
      if (isOpen) {
        document.removeEventListener('keydown', handleKeyDown);
        // 恢复滚动状态
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      }
    };
  }, [isOpen, onClose]);

  // 组件卸载时确保恢复滚动状态
  useEffect(() => {
    return () => {
      // 清理所有body样式
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center project-geo-viewer-modal">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 地图容器 */}
      <div className="relative w-full h-full bg-theme-surface overflow-hidden shadow-2xl project-geo-viewer-container">
        {/* 地图关闭按钮 - 使用通用CornerCloseButton组件
            配置说明：
            - 与ProjectDetail保持一致的大小和效果
            - 深色背景适合地图界面，不干扰地图内容
            - hover时红色提示退出操作 */}
        <CornerCloseButton
          onClick={onClose}
          ariaLabel={projectText.map.closeMap}
          // 地图界面配置 - 保持与ProjectDetail视觉一致性
          iconSize="w-16 h-16"                         // 与ProjectDetail相同的图标大小
          iconColor="text-white"                       // 纯白色图标
          iconHoverColor="text-red-400"                // hover时红色，表示退出操作
          circleColor="bg-slate-800"                   // 深色背景，适合地图界面
          circleSize="w-80 h-80"                       // 与ProjectDetail相同的大圆形
          strokeWidth={1.5}                            // 与ProjectDetail相同的线条粗细
          animationDuration="duration-500"            // 统一的动画时长
          position={{ top: 'top-8', right: 'right-8' }} // 与ProjectDetail相同的位置
        />
        
        {/* 地图 */}
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ zIndex: 1 }}
        />

        {/* 左下角标题 - 使用地图高对比度样式 */}
        <div className="absolute bottom-8 left-4 z-10 map-info-panel">
          <h2 className="text-sm font-bold">
            {projectText.map.title}
          </h2>
        </div>

        {/* 图例 - 使用地图高对比度样式 */}
        <div className="absolute bottom-4 right-4 map-legend-panel">
          <h4 className="text-sm font-semibold mb-2">
            {language === 'en' ? 'Categories' : '项目类别'}
          </h4>
          <div className="space-y-1">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border-2 shadow-sm"
                  style={{ 
                    backgroundColor: color,
                    borderColor: 'var(--theme-map-button-border)'
                  }}
                />
                <span className="text-xs capitalize opacity-90">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectGeoViewer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  language: PropTypes.string
};

export default ProjectGeoViewer;
