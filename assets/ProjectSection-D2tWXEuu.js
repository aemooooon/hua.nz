import{r as u,j as e,d as J}from"./react-C4wAxbNA.js";import{P as i}from"./vendor-BBRlQ_zh.js";import{L as b}from"./leaflet-BcfEFI1A.js";import{a as Y,u as A}from"./index-DiJLAT-t.js";import{G as H}from"./GlowDivider-6lsgZiHB.js";import{T as R}from"./ThemeComponents-CN_sOYkw.js";import"./three-Hf6x_wfq.js";delete b.Icon.Default.prototype._getIconUrl;b.Icon.Default.mergeOptions({iconRetinaUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",iconUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"});const V=({isOpen:t,onClose:j,language:f="en"})=>{const w=u.useRef(null),c=u.useRef(null),Z=u.useRef([]),y=u.useRef(null),I=u.useRef(null),{getThemeColors:v}=Y(),m=v(),{getAllLocations:x,getProjectsText:N}=A(),L=N(),g=u.useMemo(()=>x().filter(o=>o.type==="project"&&o.coordinates&&Array.isArray(o.coordinates)&&o.coordinates.length===2),[x]),E=u.useMemo(()=>({project:m.primary,work:m.success||"#10b981",education:m.warning||"#f59e0b",activity:m.purple||"#8b5cf6"}),[m]),r=u.useCallback(o=>typeof o=="object"&&o!==null?o[f]||o.en||o.zh||"":o||"",[f]),l=u.useCallback(o=>{if(!o||o.length===0)return[20,0];const d=o.length,n=o.reduce((a,T)=>a+T.coordinates[0],0),p=o.reduce((a,T)=>a+T.coordinates[1],0);return[n/d,p/d]},[]),C=u.useCallback(o=>{!c.current||!o||c.current.flyTo(o,12,{animate:!0,duration:1.5})},[]),z=u.useCallback(()=>b.divIcon({className:"custom-marker-icon",html:`<div class="marker-container" style="
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
      </div>`,iconSize:[40,40],iconAnchor:[20,20],popupAnchor:[0,-25]}),[]),s=u.useCallback(o=>{const d=o.getChildCount();let n=50,p=16,a=70;return d>=100?(n=70,p=20,a=90):d>=10&&(n=60,p=18,a=80),b.divIcon({html:`<div class="cluster-container" style="
        width: ${a}px;
        height: ${a}px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        filter: drop-shadow(0 0 12px var(--theme-map-button-border)) drop-shadow(0 0 20px rgba(var(--theme-map-button-glow), 0.6));
      ">
        <div class="cluster-glow" style="
          position: absolute;
          width: ${a}px;
          height: ${a}px;
          background: radial-gradient(circle, rgba(var(--theme-map-button-glow), 0.3) 0%, rgba(var(--theme-map-button-glow), 0.15) 40%, transparent 70%);
          border-radius: 50%;
          animation: cluster-pulse 3s ease-in-out infinite;
        "></div>
        <div class="cluster-ring" style="
          position: absolute;
          width: ${n+10}px;
          height: ${n+10}px;
          border: 2px solid rgba(var(--theme-map-button-glow), 0.6);
          border-radius: 50%;
          animation: cluster-rotate 8s linear infinite;
        "></div>
        <div class="cluster-core" style="
          width: ${n}px;
          height: ${n}px;
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
          font-size: ${p}px;
          text-shadow: 0 0 8px rgba(var(--theme-map-button-glow), 0.8);
          position: relative;
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        " onmouseover="this.style.transform='scale(1.1) rotate(5deg)'; this.style.color='var(--theme-map-button-text-hover)'; this.style.borderColor='var(--theme-map-button-border-hover)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow-intense), 1), 0 12px 35px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.4)'" 
           onmouseout="this.style.transform='scale(1) rotate(0deg)'; this.style.color='var(--theme-map-button-text)'; this.style.borderColor='var(--theme-map-button-border)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow), 0.8), 0 8px 25px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)'">${d}</div>
      </div>`,className:"custom-cluster-icon",iconSize:[a,a],iconAnchor:[a/2,a/2]})},[]),h=u.useCallback(()=>{if(!c.current)return;c.current.zoomControl.remove();const o=b.Control.extend({onAdd:function(n){const p=b.DomUtil.create("div","custom-map-controls");p.innerHTML=`
          <div class="control-group">
            <button class="control-btn zoom-in" title="${f==="en"?"Zoom in":"放大"}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="control-btn zoom-out" title="${f==="en"?"Zoom out":"缩小"}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="control-btn reset-view" title="${L.map.resetToDefaultView}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
            </button>
            <button class="control-btn locate-user" title="${f==="en"?"Locate me":"定位我的位置"}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </button>
          </div>
        `,b.DomEvent.disableClickPropagation(p),b.DomEvent.disableScrollPropagation(p);const a=p.querySelector(".zoom-in"),T=p.querySelector(".zoom-out"),$=p.querySelector(".reset-view"),k=p.querySelector(".locate-user");return a.addEventListener("click",()=>n.zoomIn()),T.addEventListener("click",()=>n.zoomOut()),$.addEventListener("click",()=>{if(g.length>0)if(g.length===1)n.setView(g[0].coordinates,10);else{const B=b.latLngBounds(g.map(W=>W.coordinates));n.fitBounds(B,{padding:[50,50]})}else{const B=l(g);n.setView(B,3)}}),k.addEventListener("click",()=>{navigator.geolocation&&(k.innerHTML=`
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <circle cx="12" cy="12" r="8"></circle>
              </svg>
            `,navigator.geolocation.getCurrentPosition(B=>{const{latitude:W,longitude:P}=B.coords;n.setView([W,P],15);const U=b.marker([W,P],{icon:b.divIcon({className:"user-location-marker",html:`<div style="
                      width: 20px; 
                      height: 20px; 
                      background: #3b82f6; 
                      border: 3px solid white; 
                      border-radius: 50%; 
                      box-shadow: 0 2px 8px rgba(59,130,246,0.4);
                    "></div>`,iconSize:[26,26],iconAnchor:[13,13]})}).addTo(n);setTimeout(()=>{n.removeLayer(U)},3e3),k.innerHTML=`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `},B=>{console.warn("定位失败:",B),k.innerHTML=`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `}))}),p}}),d=new o({position:"bottomright"});d.addTo(c.current),I.current=d},[f,g,l,L.map.resetToDefaultView]),S=u.useCallback(o=>{const d=r(o.title)||r(o.name),n=r(o.description),p=r(o.location),a=Array.isArray(o.img)?o.img[0]:o.img;return`
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
        ${a?`
          <div style="border-radius: 12px 12px 0 0; overflow: hidden; position: relative;">
            <img src="${a}" alt="${d}" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
          </div>
        `:""}
        
        <div style="padding: 16px; padding-right: 40px;">
          <div style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: 12px; gap: 12px;">
            <span style="
              background: linear-gradient(45deg, ${m.primary}, ${m.accent||m.primary}); 
              color: white; 
              padding: 6px 14px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 700;
              text-transform: capitalize;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ">${o.type}</span>
            ${o.year?`<span style="color: #9ca3af; font-size: 12px; font-weight: 600; background: #374151; padding: 4px 8px; border-radius: 12px;">${o.year}</span>`:""}
          </div>
          
          <h3 style="margin: 0 0 10px 0; color: #f9fafb; font-size: 16px; font-weight: 700; line-height: 1.3; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">${d}</h3>
          
          ${n?`
            <p style="margin: 0 0 12px 0; color: #d1d5db; font-size: 13px; line-height: 1.5;">
              ${n.length>120?n.substring(0,120)+"...":n}
            </p>
          `:""}
          
          ${p?`
            <div style="display: flex; align-items: center; margin-bottom: 10px; color: #9ca3af; font-size: 12px;">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="margin-right: 6px;">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              ${p}
            </div>
          `:""}
          
          ${o.link?`
            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151;">
              <a href="${o.link}" target="_blank" rel="noopener noreferrer" style="
                display: inline-flex; 
                align-items: center; 
                color: ${m.primary}; 
                text-decoration: none; 
                font-size: 13px; 
                font-weight: 600;
                background: linear-gradient(45deg, ${m.primary}20, transparent);
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid ${m.primary}40;
                transition: all 0.3s ease;
              " onmouseover="this.style.background='${m.primary}30'; this.style.borderColor='${m.primary}60';" onmouseout="this.style.background='linear-gradient(45deg, ${m.primary}20, transparent)'; this.style.borderColor='${m.primary}40';">
                ${f==="en"?"Learn more":"了解更多"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          `:""}
        </div>
      </div>
    `},[r,m,f]);return u.useEffect(()=>{if(t&&w.current&&!c.current){const o=l(g);if(c.current=b.map(w.current,{zoomControl:!0,attributionControl:!0}).setView(o,3),b.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",minZoom:1,maxZoom:18}).addTo(c.current),h(),y.current=b.markerClusterGroup({iconCreateFunction:s,maxClusterRadius:n=>n<=6?80:n<=10?50:n<=14?30:15,spiderfyOnMaxZoom:!0,showCoverageOnHover:!1,zoomToBoundsOnClick:!0,disableClusteringAtZoom:15,animate:!0,animateAddingMarkers:!0,spiderfyDistanceMultiplier:1.5,chunkedLoading:!0,removeOutsideVisibleBounds:!1}),g.forEach(n=>{const p=z(),a=b.marker(n.coordinates,{icon:p,title:r(n.title)||r(n.name)}),T=S(n);a.bindPopup(T,{maxWidth:800,minWidth:560,className:"custom-popup dark-popup",closeButton:!0,autoClose:!1,closeOnEscapeKey:!0,keepInView:!0,autoPan:!0,autoPanPadding:[20,20],offset:[0,-25]}),a.on("click",function($){b.DomEvent.stopPropagation($),a.openPopup(),setTimeout(()=>{C(n.coordinates)},100)}),a.on("mouseover",function(){a.bindTooltip(r(n.title)||r(n.name),{permanent:!1,direction:"top",offset:[0,-25],className:"marker-tooltip"}).openTooltip();const $=a.getElement();if($){const k=$.querySelector("div");k&&(k.style.filter="brightness(1.2) contrast(1.1) drop-shadow(0 6px 16px rgba(0,0,0,0.5))",k.style.borderWidth="4px",k.style.boxShadow="0 6px 20px rgba(0,0,0,0.6), inset 0 3px 6px rgba(255,255,255,0.3)")}}),a.on("mouseout",function(){a.closeTooltip();const $=a.getElement();if($){const k=$.querySelector("div");k&&(k.style.filter="",k.style.borderWidth="3px",k.style.boxShadow="0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)")}}),y.current.addLayer(a),Z.current.push(a)}),c.current.addLayer(y.current),g.length>0)if(g.length===1)c.current.setView(g[0].coordinates,10);else{const n=b.latLngBounds(g.map(p=>p.coordinates));c.current.fitBounds(n,{padding:[50,50]})}const d=document.createElement("style");d.textContent=`
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
      `,document.head.appendChild(d),c.current._customStyle=d}return()=>{!t&&c.current&&(y.current&&(y.current.clearLayers(),c.current.removeLayer(y.current)),Z.current=[],c.current._customStyle&&c.current._customStyle.parentNode&&c.current._customStyle.parentNode.removeChild(c.current._customStyle),c.current.remove(),c.current=null,y.current=null)}},[t,g,E,s,z,S,l,C,m,r,h]),u.useEffect(()=>{const o=d=>{d.key==="Escape"&&j()};if(t){const d=window.scrollY;document.addEventListener("keydown",o),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${d}px`,document.body.style.width="100%"}return()=>{if(t){document.removeEventListener("keydown",o);const d=document.body.style.top;document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width="",d&&window.scrollTo(0,parseInt(d||"0")*-1)}}},[t,j]),u.useEffect(()=>()=>{document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width=""},[]),t?e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center project-geo-viewer-modal",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70 backdrop-blur-sm",onClick:j}),e.jsxs("div",{className:"relative w-full h-full bg-theme-surface overflow-hidden shadow-2xl project-geo-viewer-container",children:[e.jsx("button",{onClick:j,className:"absolute top-6 right-6 z-20 group map-close-button","aria-label":L.map.closeMap,children:e.jsx("svg",{className:"w-8 h-8 text-theme-map-button-text group-hover:text-theme-map-button-text-hover transition-colors duration-300",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M6 18L18 6M6 6l12 12"})})}),e.jsx("div",{ref:w,className:"w-full h-full",style:{zIndex:1}}),e.jsx("div",{className:"absolute bottom-4 left-4 z-10 map-info-panel",children:e.jsx("h2",{className:"text-lg font-bold",children:L.map.title})}),e.jsxs("div",{className:"absolute bottom-4 right-4 map-legend-panel",children:[e.jsx("h4",{className:"text-sm font-semibold mb-2",children:f==="en"?"Categories":"项目类别"}),e.jsx("div",{className:"space-y-1",children:Object.entries(E).map(([o,d])=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-3 h-3 rounded-full border-2 shadow-sm",style:{backgroundColor:d,borderColor:"var(--theme-map-button-border)"}}),e.jsx("span",{className:"text-xs capitalize opacity-90",children:o})]},o))})]})]})]}):null};V.propTypes={isOpen:i.bool.isRequired,onClose:i.func.isRequired,language:i.string};const O=({className:t="w-4 h-4"})=>e.jsx("svg",{className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})});O.propTypes={className:i.string};const M=({className:t="w-4 h-4"})=>e.jsx("svg",{className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})});M.propTypes={className:i.string};const _=({className:t="w-4 h-4"})=>e.jsxs("svg",{className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]});_.propTypes={className:i.string};const G=({className:t="w-4 h-4"})=>e.jsx("svg",{className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"})});G.propTypes={className:i.string};const D=({className:t="w-4 h-4"})=>e.jsx("svg",{className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"})});D.propTypes={className:i.string};const F=({className:t="w-4 h-4"})=>e.jsx("svg",{className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})});F.propTypes={className:i.string};const q=({project:t=null,isOpen:j,onClose:f})=>{var l,C,z;const{language:w,getProjectsText:c,getProjectDescription:Z}=A(),[y,I]=u.useState(0),v=c(),x=(s=>({"Full Stack":{text:"text-blue-400",bg:"bg-blue-500/10",border:"border-blue-500/30",hover:"hover:bg-blue-500/20"},"Front End":{text:"text-green-400",bg:"bg-green-500/10",border:"border-green-500/30",hover:"hover:bg-green-500/20"},Frontend:{text:"text-green-400",bg:"bg-green-500/10",border:"border-green-500/30",hover:"hover:bg-green-500/20"},WebGL:{text:"text-purple-400",bg:"bg-purple-500/10",border:"border-purple-500/30",hover:"hover:bg-purple-500/20"},Website:{text:"text-orange-400",bg:"bg-orange-500/10",border:"border-orange-500/30",hover:"hover:bg-orange-500/20"},"Mobile Apps":{text:"text-cyan-400",bg:"bg-cyan-500/10",border:"border-cyan-500/30",hover:"hover:bg-cyan-500/20"},Activity:{text:"text-yellow-400",bg:"bg-yellow-500/10",border:"border-yellow-500/30",hover:"hover:bg-yellow-500/20"}})[s]||{text:"text-blue-400",bg:"bg-blue-500/10",border:"border-blue-500/30",hover:"hover:bg-blue-500/20"})(t==null?void 0:t.type);if(u.useEffect(()=>{if(j){const s=window.pageYOffset||document.documentElement.scrollTop,h=window.pageXOffset||document.documentElement.scrollLeft;document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${s}px`,document.body.style.left=`-${h}px`,document.body.style.width="100%",document.body.style.height="100%"}else{const s=parseInt(document.body.style.top||"0")*-1,h=parseInt(document.body.style.left||"0")*-1;document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.width="",document.body.style.height="",window.scrollTo(h,s)}return()=>{document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.width="",document.body.style.height=""}},[j]),u.useEffect(()=>{const s=h=>{h.key==="Escape"&&f()};if(j)return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[j,f]),!j||!t)return null;const N=Array.isArray(t.img)?t.img:[t.img].filter(Boolean),L=N.length>1,g=()=>!t.tech||t.tech.length===0?null:e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx(D,{className:"w-5 h-5 text-theme-primary"}),e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:v.detail.technologyStack})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.tech.map((s,h)=>e.jsx("span",{className:"px-2 py-1 bg-theme-primary/20 text-theme-primary text-xs rounded-full border border-theme-primary/30",children:s},h))})]}),E=()=>t.stats?e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx(F,{className:"w-5 h-5 text-theme-success"}),e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:v.detail.projectStatistics})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:Object.entries(t.stats).map(([s,h])=>e.jsxs("div",{className:"bg-gradient-to-br from-theme-success/10 to-theme-primary/10 p-4 rounded-lg border border-theme-success/20",children:[e.jsx("div",{className:"text-theme-success text-sm capitalize mb-1",children:s.replace(/([A-Z])/g," $1").trim()}),e.jsx("div",{className:"text-theme-text-primary text-2xl font-bold",children:h})]},s))})]}):null,r=()=>!t.projects||t.projects.length===0?null:e.jsxs("div",{className:"mb-6",children:[e.jsx("div",{className:"flex items-center gap-2 mb-4",children:e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:v.detail.subProjects})}),e.jsx("div",{className:"space-y-4",children:t.projects.map((s,h)=>{var S,o,d;return e.jsxs("div",{className:"bg-gradient-to-br from-theme-secondary/10 to-theme-primary/5 p-4 rounded-lg border border-theme-secondary/20",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsx("h4",{className:"text-theme-text-primary font-semibold",children:w==="en"?s.name:s.nameZh||s.name}),e.jsxs("div",{className:"flex gap-2",children:[((S=s.links)==null?void 0:S.live)&&e.jsx("a",{href:s.links.live,target:"_blank",rel:"noopener noreferrer",className:"text-theme-primary hover:text-theme-secondary transition-colors",style:{cursor:"pointer"},title:v.liveDemo,children:e.jsx(M,{className:"w-4 h-4"})}),((o=s.links)==null?void 0:o.official)&&e.jsx("a",{href:s.links.official,target:"_blank",rel:"noopener noreferrer",className:"text-theme-secondary hover:text-theme-primary transition-colors",style:{cursor:"pointer"},title:v.officialSite,children:e.jsx(M,{className:"w-4 h-4"})}),((d=s.links)==null?void 0:d.github)&&e.jsx("a",{href:s.links.github,target:"_blank",rel:"noopener noreferrer",className:"text-theme-success hover:text-theme-primary transition-colors",style:{cursor:"pointer"},title:v.githubRepo,children:e.jsx(M,{className:"w-4 h-4"})}),s.link&&!s.links&&e.jsx("a",{href:s.link,target:"_blank",rel:"noopener noreferrer",className:"text-theme-secondary hover:text-theme-primary transition-colors",style:{cursor:"pointer"},children:e.jsx(M,{className:"w-4 h-4"})})]})]}),e.jsx("p",{className:"text-theme-text-secondary text-sm mb-3",children:s.description}),s.features&&e.jsx("div",{className:"flex flex-wrap gap-2",children:s.features.map((n,p)=>e.jsx("span",{className:"px-2 py-1 bg-theme-secondary/20 text-theme-secondary text-xs rounded border border-theme-secondary/30",children:n},p))})]},h)})})]});return J.createPortal(e.jsxs("div",{className:"fixed inset-0 z-[99999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",style:{cursor:"default"},children:[e.jsx("button",{onClick:f,className:"fixed top-6 right-6 z-[100000] group bg-theme-primary/20 hover:bg-red-500/90 border-2 border-theme-primary/50 hover:border-white/40 rounded-full p-4 transition-all duration-300 hover:scale-110 backdrop-blur-sm shadow-lg hover:shadow-red-500/25",style:{cursor:"pointer"},"aria-label":v.detail.closeModal,children:e.jsx(O,{className:"w-8 h-8 text-theme-primary group-hover:text-white transition-colors"})}),e.jsx("div",{className:"h-full overflow-y-auto pt-6 pb-6 px-6 md:px-12 lg:px-16 xl:px-24 project-detail-container",style:{cursor:"default"},children:e.jsxs("div",{className:"max-w-7xl mx-auto",children:[e.jsxs("div",{className:"mb-8 pt-16 md:pt-8",children:[e.jsx("h2",{className:"text-3xl md:text-4xl lg:text-5xl font-bold text-theme-text-primary leading-tight text-left mb-6",children:w==="en"?t.name:t.nameZh||t.name}),e.jsx(H,{className:"w-full",width:"w-full"})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 mb-8",children:[N.length>0&&e.jsx("div",{className:"lg:col-span-2 order-1 lg:order-1",children:e.jsxs("div",{className:"lg:sticky lg:top-6",children:[e.jsxs("div",{className:"relative mb-4",children:[e.jsx("img",{src:N[y],alt:w==="en"?t.name:t.nameZh||t.name,className:"w-full aspect-video object-cover rounded-xl shadow-2xl",onError:s=>{s.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=="}}),L&&e.jsxs("div",{className:"absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm",children:[y+1," / ",N.length]}),L&&e.jsx("div",{className:"absolute bottom-4 left-1/2 transform -translate-x-1/2",children:e.jsx("div",{className:"flex space-x-2",children:N.map((s,h)=>e.jsx("button",{onClick:()=>I(h),className:`w-3 h-3 rounded-full transition-colors ${h===y?"bg-theme-primary":"bg-white/40 hover:bg-white/60"}`,style:{cursor:"pointer"}},h))})})]}),L&&e.jsx("div",{className:"relative",children:e.jsx("div",{className:"flex flex-wrap gap-2 md:gap-3 justify-start",children:N.map((s,h)=>e.jsx("button",{onClick:()=>I(h),className:`flex-shrink-0 w-16 h-10 md:w-20 md:h-12 lg:w-24 lg:h-14 xl:w-28 xl:h-16 rounded-lg border-2 overflow-hidden transition-all ${h===y?"border-theme-primary opacity-100 shadow-lg shadow-theme-primary/25":"border-theme-border opacity-60 hover:opacity-80"}`,style:{cursor:"pointer"},children:e.jsx("img",{src:s,alt:`${w==="en"?t.name:t.nameZh||t.name} ${h+1}`,className:"w-full h-full object-cover",onError:S=>{S.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzMzIj48L3JlY3Q+PC9zdmc+"}})},h))})})]})}),e.jsx("div",{className:`order-2 lg:order-2 ${N.length===0?"lg:col-span-3":"lg:col-span-1"}`,children:e.jsxs("div",{className:"space-y-4 md:space-y-6",children:[e.jsxs("div",{className:"bg-theme-surface/30 p-5 rounded-lg",children:[t.company&&e.jsx("div",{className:"text-theme-primary font-semibold text-xl mb-2",children:t.company}),e.jsx("div",{className:"text-theme-text-primary font-medium text-lg",children:t.title})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-4 text-theme-text-secondary",children:[e.jsx(G,{className:"w-5 h-5 md:w-6 md:h-6 text-theme-success flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/80 uppercase tracking-wider font-medium",children:"Year"}),e.jsx("div",{className:"text-lg font-semibold text-theme-text-primary",children:t.year})]})]}),e.jsxs("div",{className:"flex items-center gap-4 text-theme-text-secondary",children:[e.jsx(_,{className:"w-5 h-5 md:w-6 md:h-6 text-theme-primary flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/80 uppercase tracking-wider font-medium",children:"Location"}),e.jsx("div",{className:"text-lg font-semibold text-theme-text-primary",children:t.location})]})]}),e.jsxs("div",{className:"flex items-center gap-4 text-theme-text-secondary",children:[e.jsx(D,{className:"w-5 h-5 md:w-6 md:h-6 text-theme-secondary flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/80 uppercase tracking-wider font-medium",children:"Type"}),e.jsx("div",{className:"text-lg font-semibold text-theme-secondary",children:t.type})]})]})]}),(t.links||t.link)&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-semibold text-theme-text-primary mb-4",children:"Links"}),e.jsxs("div",{className:"space-y-3",children:[((l=t.links)==null?void 0:l.live)&&e.jsxs("a",{href:t.links.live,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${x.text} transition-colors ${x.bg} ${x.hover} p-3 rounded-lg border ${x.border} group w-full`,style:{cursor:"pointer"},children:[e.jsx(M,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"text-base font-semibold",children:v.liveDemo})]}),((C=t.links)==null?void 0:C.official)&&e.jsxs("a",{href:t.links.official,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${x.text} transition-colors ${x.bg} ${x.hover} p-3 rounded-lg border ${x.border} group w-full`,style:{cursor:"pointer"},children:[e.jsx(M,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"text-base font-semibold",children:v.officialSite})]}),((z=t.links)==null?void 0:z.github)&&e.jsxs("a",{href:t.links.github,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${x.text} transition-colors ${x.bg} ${x.hover} p-3 rounded-lg border ${x.border} group w-full`,style:{cursor:"pointer"},children:[e.jsx(M,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"text-base font-semibold",children:v.githubRepo})]}),t.link&&!t.links&&e.jsxs("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${x.text} transition-colors ${x.bg} ${x.hover} p-3 rounded-lg border ${x.border} group w-full`,style:{cursor:"pointer"},children:[e.jsx(M,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"text-base font-semibold",children:v.detail.visitSite})]})]})]}),e.jsx("div",{className:"block lg:hidden",children:g()})]})})]}),e.jsxs("div",{className:"space-y-6 md:space-y-8",children:[e.jsx("div",{className:"bg-theme-surface/20 p-4 md:p-6 rounded-xl",children:e.jsx("p",{className:"text-theme-text-secondary leading-relaxed",style:{fontFamily:"'Lora', serif",lineHeight:"1.7",fontSize:"1.25rem"},children:Z(t,w)})}),e.jsx("div",{className:"hidden lg:block",children:g()}),E(),r()]})]})})]}),document.body)};q.propTypes={project:i.shape({title:i.string,name:i.string,nameZh:i.string,company:i.string,description:i.oneOfType([i.string,i.object]),location:i.string,year:i.string,type:i.string,link:i.string,links:i.shape({live:i.string,official:i.string,github:i.string}),img:i.oneOfType([i.string,i.array]),tech:i.array,stats:i.object,projects:i.array}),isOpen:i.bool.isRequired,onClose:i.func.isRequired};const Q=({className:t="w-4 h-4"})=>e.jsxs("svg",{className:t,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]});Q.propTypes={className:i.string};const X=({language:t})=>{const[j,f]=u.useState(!1),[w,c]=u.useState("all"),{getAllProjects:Z,selectedProject:y,setSelectedProject:I,getProjectsText:v}=A(),m=v(),x=Z(),N=x.reduce((r,l)=>{const C=l.type||"Other";return r[C]||(r[C]=[]),r[C].push(l),r},{}),L=w==="all"?x:N[w]||[],g=r=>{if(!r)return"bg-theme-muted/20 text-theme-textSecondary border-theme-muted/50";const l=String(r).toLowerCase();return l.includes("完成")||l.includes("2019")||l.includes("2024")?"bg-theme-success/20 text-theme-success border-theme-success/50":l.includes("progress")||l.includes("进行")||l.includes("2020-2021")?"bg-theme-primary/20 text-theme-primary border-theme-primary/50":l.includes("plan")||l.includes("规划")||l.includes("2024-2025")?"bg-theme-warning/20 text-theme-warning border-theme-warning/50":"bg-theme-muted/20 text-theme-textSecondary border-theme-muted/50"},E=r=>{const l={"Full Stack":{bg:"bg-theme-bg-white-10",text:"text-theme-primary",border:"border-theme-primary/30 hover:border-theme-primary/50"},"Modern Frontend":{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},Frontend:{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},"VR/360°":{bg:"bg-theme-bg-white-10",text:"text-theme-accent",border:"border-theme-accent/30 hover:border-theme-accent/50"},"Website Development":{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-80",border:"border-theme-text-white-50 hover:border-theme-text-white-70"},"Web Development":{bg:"bg-theme-bg-white-10",text:"text-theme-primary",border:"border-theme-primary/30 hover:border-theme-primary/50"},"Mobile App":{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},"Data Science":{bg:"bg-theme-bg-white-10",text:"text-theme-accent",border:"border-theme-accent/30 hover:border-theme-accent/50"},activity:{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-90",border:"border-theme-text-white-50 hover:border-theme-text-white-70"},Other:{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-70",border:"border-theme-text-white-40 hover:border-theme-text-white-60"}};return l[r]||l.Other};return e.jsxs("div",{className:"min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 text-theme-text-white relative project-section-bg",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 mb-8",children:[e.jsxs("div",{className:"flex flex-col text-center lg:text-left",children:[e.jsx(R,{level:1,className:"text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-theme-section-title mb-3",children:m.title}),e.jsx("h2",{className:"text-xl md:text-2xl text-theme-text-white-70 font-light italic",children:m.subtitle})]}),e.jsx("div",{className:"flex items-center justify-center lg:justify-end mt-8 lg:mt-0",children:e.jsxs("div",{className:"flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 border border-theme-primary/30 hover:border-theme-primary/50 transition-all duration-300 hover:scale-105 explore-map-button rounded-full backdrop-blur-sm",onClick:()=>f(!0),title:m.exploreMapTooltip,children:[e.jsx("div",{className:"text-5xl xl:text-6xl text-theme-primary mb-1 flex items-center justify-center",children:"🗺️"}),e.jsx("div",{className:"text-xs xl:text-sm text-theme-primary font-medium text-center leading-tight px-2",children:m.exploreMap})]})})]}),e.jsx(H,{className:"my-8",width:"w-full"}),e.jsx("div",{className:"relative z-10 backdrop-protection",children:e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsx("div",{className:"mb-12",children:e.jsxs("div",{className:"flex flex-wrap gap-3 md:gap-4 justify-center items-center",children:[e.jsx("button",{className:`category-filter-btn bg-theme-bg-white-10 text-theme-text-white-90 border-theme-text-white-50 hover:border-theme-text-white-70 ${w==="all"?"active":""}`,onClick:()=>c("all"),children:"All"}),Object.keys(N).map(r=>{const l=E(r);return e.jsx("button",{className:`category-filter-btn ${w===r?"active":""} ${l.bg} ${l.text} ${l.border}`,onClick:()=>c(r),children:r},r)})]})}),e.jsx("div",{className:"project-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 pb-12",children:L.map((r,l)=>{var C,z;return e.jsxs("div",{className:"project-card group cursor-pointer",onClick:()=>I(r),children:[e.jsxs("div",{className:"project-image-container",children:[r.img?Array.isArray(r.img)?e.jsx("img",{src:r.img[0],alt:r.name||r.title,className:"project-image"}):e.jsx("img",{src:r.img,alt:r.name||r.title,className:"project-image"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-4xl text-theme-text-white-40 bg-gradient-to-br from-slate-600/20 to-slate-800/20",children:"�"}),(((C=r.links)==null?void 0:C.github)||r.link&&r.link.includes("github"))&&e.jsx("a",{href:((z=r.links)==null?void 0:z.github)||r.link,target:"_blank",rel:"noopener noreferrer",className:"absolute bottom-3 right-3 w-8 h-8 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10",onClick:s=>s.stopPropagation(),children:e.jsx("svg",{className:"w-4 h-4 text-theme-text-white",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})}),e.jsx("div",{className:"project-category-badge",children:r.type||"Other"}),e.jsx("div",{className:`project-status-badge ${g(r.year)}`,children:r.year||""})]}),e.jsxs("div",{className:"project-content",children:[r.location&&e.jsxs("div",{className:"project-meta text-theme-text-muted mb-3 flex items-center gap-1.5",children:[e.jsx(Q,{className:"w-4 h-4 text-current flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:r.location})]}),e.jsx(R,{level:3,className:"project-title leading-snug line-clamp-2",children:r.name||r.title})]})]},l)})}),e.jsx("div",{className:"text-center py-12 border-t border-theme-border-white-10 bg-black/20 backdrop-blur-sm rounded-xl mt-8",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("p",{className:"text-theme-text-white-80 text-lg mb-3 font-medium",children:m.bottomSubtitle}),e.jsx("p",{className:"text-theme-text-white-60 text-base leading-relaxed",children:m.description})]})})]})}),e.jsx(V,{isOpen:j,onClose:()=>f(!1),language:t}),e.jsx(q,{project:y,isOpen:!!y,onClose:()=>I(null)})]})};X.propTypes={language:i.string.isRequired};export{X as default};
