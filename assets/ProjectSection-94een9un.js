import{r as h,j as e,d as q}from"./react-DudRe3MH.js";import{P as p}from"./vendor-D2t9TNkl.js";import{L as v}from"./leaflet-BcfEFI1A.js";import{a as F,u as D,b as J}from"./index-DgBMB1h9.js";import{G as R}from"./GlowDivider-DGRTBnis.js";import{T as H}from"./ThemeComponents-ncyhfpH0.js";import"./three-Hf6x_wfq.js";const E=({onClick:r,className:f="",ariaLabel:u="Close",iconSize:m="w-16 h-16",iconColor:c="text-theme-primary",iconHoverColor:M="text-white",circleColor:w="bg-theme-primary",circleSize:y="w-80 h-80",strokeWidth:L=1.2,animationDuration:a="duration-500",position:C={top:"top-8",right:"right-8"}})=>{const[g,b]=h.useState(!1),x={"w-10 h-10":{width:"2.5rem",height:"2.5rem"},"w-12 h-12":{width:"3rem",height:"3rem"},"w-16 h-16":{width:"4rem",height:"4rem"}},I={"w-24 h-24":{width:"6rem",height:"6rem"},"w-32 h-32":{width:"8rem",height:"8rem"},"w-80 h-80":{width:"20rem",height:"20rem"}},o={"bg-red-500":"#ef4444","bg-slate-800":"#1e293b","bg-theme-primary":"var(--theme-primary)","text-white":"#ffffff","text-red-400":"#f87171","text-theme-primary":"var(--theme-primary)"},l={"top-4":"1rem","top-6":"1.5rem","top-8":"2rem","right-4":"1rem","right-6":"1.5rem","right-8":"2rem"};return e.jsxs("div",{className:`fixed top-0 right-0 ${f} z-[100000]`,style:{width:"4rem",height:"4rem"},children:[e.jsx("div",{className:`absolute top-0 right-0 rounded-full transition-all ${a} ease-in-out ${g?"scale-100 opacity-100":"scale-50 opacity-0"} origin-top-right shadow-lg z-0`,style:{...I[y]||I["w-32 h-32"],backgroundColor:o[w]||o["bg-theme-primary"],transform:"translate(50%, -50%)"}}),e.jsx("button",{className:"absolute top-0 right-0 w-24 h-24 focus:outline-none z-20",onMouseEnter:()=>b(!0),onMouseLeave:()=>b(!1),onClick:k=>{k.preventDefault(),k.stopPropagation(),r()},"aria-label":u}),e.jsx("div",{className:"absolute pointer-events-none z-30",style:{top:l[C.top]||l["top-6"],right:l[C.right]||l["right-6"]},children:e.jsx("svg",{className:`transition-all ${a} ease-in-out drop-shadow-lg`,style:{...x[m]||x["w-12 h-12"],color:g?o[M]||o["text-white"]:o[c]||o["text-white"],transform:g?"scale(1.1)":"scale(1)"},fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:L,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]})};E.propTypes={onClick:p.func.isRequired,className:p.string,ariaLabel:p.string,iconSize:p.string,iconColor:p.string,iconHoverColor:p.string,circleColor:p.string,circleSize:p.string,strokeWidth:p.number,animationDuration:p.string,position:p.shape({top:p.string,right:p.string})};delete v.Icon.Default.prototype._getIconUrl;v.Icon.Default.mergeOptions({iconRetinaUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",iconUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"});const G=({isOpen:r,onClose:f,language:u="en"})=>{const m=h.useRef(null),c=h.useRef(null),M=h.useRef([]),w=h.useRef(null),y=h.useRef(null),{getThemeColors:L}=F(),a=L(),{getAllLocations:C,getProjectsText:g}=D(),b=g(),x=h.useMemo(()=>C().filter(s=>s.type==="project"&&s.coordinates&&Array.isArray(s.coordinates)&&s.coordinates.length===2),[C]),I=h.useMemo(()=>({project:a.primary,work:a.success||"#10b981",education:a.warning||"#f59e0b",activity:a.purple||"#8b5cf6"}),[a]),o=h.useCallback(s=>typeof s=="object"&&s!==null?s[u]||s.en||s.zh||"":s||"",[u]),l=h.useCallback(s=>{if(!s||s.length===0)return[20,0];const d=s.length,t=s.reduce((n,z)=>n+z.coordinates[0],0),i=s.reduce((n,z)=>n+z.coordinates[1],0);return[t/d,i/d]},[]),k=h.useCallback(s=>{!c.current||!s||c.current.flyTo(s,12,{animate:!0,duration:1.5})},[]),S=h.useCallback(()=>v.divIcon({className:"custom-marker-icon",html:`<div class="marker-container" style="
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
      </div>`,iconSize:[40,40],iconAnchor:[20,20],popupAnchor:[0,-25]}),[]),Z=h.useCallback(s=>{const d=s.getChildCount();let t=50,i=16,n=70;return d>=100?(t=70,i=20,n=90):d>=10&&(t=60,i=18,n=80),v.divIcon({html:`<div class="cluster-container" style="
        width: ${n}px;
        height: ${n}px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        filter: drop-shadow(0 0 12px var(--theme-map-button-border)) drop-shadow(0 0 20px rgba(var(--theme-map-button-glow), 0.6));
      ">
        <div class="cluster-glow" style="
          position: absolute;
          width: ${n}px;
          height: ${n}px;
          background: radial-gradient(circle, rgba(var(--theme-map-button-glow), 0.3) 0%, rgba(var(--theme-map-button-glow), 0.15) 40%, transparent 70%);
          border-radius: 50%;
          animation: cluster-pulse 3s ease-in-out infinite;
        "></div>
        <div class="cluster-ring" style="
          position: absolute;
          width: ${t+10}px;
          height: ${t+10}px;
          border: 2px solid rgba(var(--theme-map-button-glow), 0.6);
          border-radius: 50%;
          animation: cluster-rotate 8s linear infinite;
        "></div>
        <div class="cluster-core" style="
          width: ${t}px;
          height: ${t}px;
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
          font-size: ${i}px;
          text-shadow: 0 0 8px rgba(var(--theme-map-button-glow), 0.8);
          position: relative;
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        " onmouseover="this.style.transform='scale(1.1) rotate(5deg)'; this.style.color='var(--theme-map-button-text-hover)'; this.style.borderColor='var(--theme-map-button-border-hover)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow-intense), 1), 0 12px 35px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.4)'" 
           onmouseout="this.style.transform='scale(1) rotate(0deg)'; this.style.color='var(--theme-map-button-text)'; this.style.borderColor='var(--theme-map-button-border)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow), 0.8), 0 8px 25px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)'">${d}</div>
      </div>`,className:"custom-cluster-icon",iconSize:[n,n],iconAnchor:[n/2,n/2]})},[]),T=h.useCallback(()=>{if(!c.current)return;c.current.zoomControl.remove();const s=v.Control.extend({onAdd:function(t){const i=v.DomUtil.create("div","custom-map-controls");i.innerHTML=`
          <div class="control-group">
            <button class="control-btn zoom-in" title="${u==="en"?"Zoom in":"放大"}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="control-btn zoom-out" title="${u==="en"?"Zoom out":"缩小"}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </button>
            <button class="control-btn reset-view" title="${b.map.resetToDefaultView}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
            </button>
            <button class="control-btn locate-user" title="${u==="en"?"Locate me":"定位我的位置"}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
              </svg>
            </button>
          </div>
        `,v.DomEvent.disableClickPropagation(i),v.DomEvent.disableScrollPropagation(i);const n=i.querySelector(".zoom-in"),z=i.querySelector(".zoom-out"),N=i.querySelector(".reset-view"),j=i.querySelector(".locate-user");return n.addEventListener("click",()=>t.zoomIn()),z.addEventListener("click",()=>t.zoomOut()),N.addEventListener("click",()=>{if(x.length>0)if(x.length===1)t.setView(x[0].coordinates,10);else{const $=v.latLngBounds(x.map(B=>B.coordinates));t.fitBounds($,{padding:[50,50]})}else{const $=l(x);t.setView($,3)}}),j.addEventListener("click",()=>{navigator.geolocation&&(j.innerHTML=`
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <circle cx="12" cy="12" r="8"></circle>
              </svg>
            `,navigator.geolocation.getCurrentPosition($=>{const{latitude:B,longitude:A}=$.coords;t.setView([B,A],15);const Q=v.marker([B,A],{icon:v.divIcon({className:"user-location-marker",html:`<div style="
                      width: 20px; 
                      height: 20px; 
                      background: #3b82f6; 
                      border: 3px solid white; 
                      border-radius: 50%; 
                      box-shadow: 0 2px 8px rgba(59,130,246,0.4);
                    "></div>`,iconSize:[26,26],iconAnchor:[13,13]})}).addTo(t);setTimeout(()=>{t.removeLayer(Q)},3e3),j.innerHTML=`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `},$=>{console.warn("定位失败:",$),j.innerHTML=`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `}))}),i}}),d=new s({position:"bottomright"});d.addTo(c.current),y.current=d},[u,x,l,b.map.resetToDefaultView]),W=h.useCallback(s=>{const d=o(s.title)||o(s.name),t=o(s.description),i=o(s.location),n=Array.isArray(s.img)?s.img[0]:s.img;return`
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
        ${n?`
          <div style="border-radius: 12px 12px 0 0; overflow: hidden; position: relative;">
            <img src="${n}" alt="${d}" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
          </div>
        `:""}
        
        <div style="padding: 16px; padding-right: 40px;">
          <div style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: 12px; gap: 12px;">
            <span style="
              background: linear-gradient(45deg, ${a.primary}, ${a.accent||a.primary}); 
              color: white; 
              padding: 6px 14px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: 700;
              text-transform: capitalize;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ">${s.type}</span>
            ${s.year?`<span style="color: #9ca3af; font-size: 12px; font-weight: 600; background: #374151; padding: 4px 8px; border-radius: 12px;">${s.year}</span>`:""}
          </div>
          
          <h3 style="margin: 0 0 10px 0; color: #f9fafb; font-size: 16px; font-weight: 700; line-height: 1.3; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">${d}</h3>
          
          ${t?`
            <p style="margin: 0 0 12px 0; color: #d1d5db; font-size: 13px; line-height: 1.5;">
              ${t.length>120?t.substring(0,120)+"...":t}
            </p>
          `:""}
          
          ${i?`
            <div style="display: flex; align-items: center; margin-bottom: 10px; color: #9ca3af; font-size: 12px;">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="margin-right: 6px;">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              ${i}
            </div>
          `:""}
          
          ${s.link?`
            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151;">
              <a href="${s.link}" target="_blank" rel="noopener noreferrer" style="
                display: inline-flex; 
                align-items: center; 
                color: ${a.primary}; 
                text-decoration: none; 
                font-size: 13px; 
                font-weight: 600;
                background: linear-gradient(45deg, ${a.primary}20, transparent);
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid ${a.primary}40;
                transition: all 0.3s ease;
              " onmouseover="this.style.background='${a.primary}30'; this.style.borderColor='${a.primary}60';" onmouseout="this.style.background='linear-gradient(45deg, ${a.primary}20, transparent)'; this.style.borderColor='${a.primary}40';">
                ${u==="en"?"Learn more":"了解更多"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          `:""}
        </div>
      </div>
    `},[o,a,u]);return h.useEffect(()=>{if(r&&m.current&&!c.current){const s=l(x);if(c.current=v.map(m.current,{zoomControl:!0,attributionControl:!0}).setView(s,3),v.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",minZoom:1,maxZoom:18}).addTo(c.current),T(),w.current=v.markerClusterGroup({iconCreateFunction:Z,maxClusterRadius:t=>t<=6?80:t<=10?50:t<=14?30:15,spiderfyOnMaxZoom:!0,showCoverageOnHover:!1,zoomToBoundsOnClick:!0,disableClusteringAtZoom:15,animate:!0,animateAddingMarkers:!0,spiderfyDistanceMultiplier:1.5,chunkedLoading:!0,removeOutsideVisibleBounds:!1}),x.forEach(t=>{const i=S(),n=v.marker(t.coordinates,{icon:i,title:o(t.title)||o(t.name)}),z=W(t);n.bindPopup(z,{maxWidth:800,minWidth:560,className:"custom-popup dark-popup",closeButton:!0,autoClose:!1,closeOnEscapeKey:!0,keepInView:!0,autoPan:!0,autoPanPadding:[20,20],offset:[0,-25]}),n.on("click",function(N){v.DomEvent.stopPropagation(N),n.openPopup(),setTimeout(()=>{k(t.coordinates)},100)}),n.on("mouseover",function(){n.bindTooltip(o(t.title)||o(t.name),{permanent:!1,direction:"top",offset:[0,-25],className:"marker-tooltip"}).openTooltip();const N=n.getElement();if(N){const j=N.querySelector("div");j&&(j.style.filter="brightness(1.2) contrast(1.1) drop-shadow(0 6px 16px rgba(0,0,0,0.5))",j.style.borderWidth="4px",j.style.boxShadow="0 6px 20px rgba(0,0,0,0.6), inset 0 3px 6px rgba(255,255,255,0.3)")}}),n.on("mouseout",function(){n.closeTooltip();const N=n.getElement();if(N){const j=N.querySelector("div");j&&(j.style.filter="",j.style.borderWidth="3px",j.style.boxShadow="0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)")}}),w.current.addLayer(n),M.current.push(n)}),c.current.addLayer(w.current),x.length>0)if(x.length===1)c.current.setView(x[0].coordinates,10);else{const t=v.latLngBounds(x.map(i=>i.coordinates));c.current.fitBounds(t,{padding:[50,50]})}const d=document.createElement("style");d.textContent=`
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
      `,document.head.appendChild(d),c.current._customStyle=d}return()=>{!r&&c.current&&(w.current&&(w.current.clearLayers(),c.current.removeLayer(w.current)),M.current=[],c.current._customStyle&&c.current._customStyle.parentNode&&c.current._customStyle.parentNode.removeChild(c.current._customStyle),c.current.remove(),c.current=null,w.current=null)}},[r,x,I,Z,S,W,l,k,a,o,T]),h.useEffect(()=>{const s=d=>{d.key==="Escape"&&f()};if(r){const d=window.scrollY;document.addEventListener("keydown",s),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${d}px`,document.body.style.width="100%"}return()=>{if(r){document.removeEventListener("keydown",s);const d=document.body.style.top;document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width="",d&&window.scrollTo(0,parseInt(d||"0")*-1)}}},[r,f]),h.useEffect(()=>()=>{document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width=""},[]),r?e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center project-geo-viewer-modal",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70 backdrop-blur-sm",onClick:f}),e.jsxs("div",{className:"relative w-full h-full bg-theme-surface overflow-hidden shadow-2xl project-geo-viewer-container",children:[e.jsx(E,{onClick:f,ariaLabel:b.map.closeMap,iconSize:"w-16 h-16",iconColor:"text-white",iconHoverColor:"text-red-400",circleColor:"bg-slate-800",circleSize:"w-80 h-80",strokeWidth:1.5,animationDuration:"duration-500",position:{top:"top-8",right:"right-8"}}),e.jsx("div",{ref:m,className:"w-full h-full",style:{zIndex:1}}),e.jsx("div",{className:"absolute bottom-4 left-4 z-10 map-info-panel",children:e.jsx("h2",{className:"text-lg font-bold",children:b.map.title})}),e.jsxs("div",{className:"absolute bottom-4 right-4 map-legend-panel",children:[e.jsx("h4",{className:"text-sm font-semibold mb-2",children:u==="en"?"Categories":"项目类别"}),e.jsx("div",{className:"space-y-1",children:Object.entries(I).map(([s,d])=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-3 h-3 rounded-full border-2 shadow-sm",style:{backgroundColor:d,borderColor:"var(--theme-map-button-border)"}}),e.jsx("span",{className:"text-xs capitalize opacity-90",children:s})]},s))})]})]})]}):null};G.propTypes={isOpen:p.bool.isRequired,onClose:p.func.isRequired,language:p.string};const P=({className:r="w-4 h-4"})=>e.jsx("svg",{className:r,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})});P.propTypes={className:p.string};const V=({project:r=null,isOpen:f,onClose:u})=>{var T,W,s,d;const{language:m,getProjectsText:c,getProjectDescription:M}=D(),{openPhotoSwipe:w}=J(),[y,L]=h.useState(0),a=c();h.useEffect(()=>{f&&r&&L(0)},[f,r]);const g=(t=>({"Data Science":{text:"text-blue-400",bg:"bg-blue-500/10",border:"border-blue-500/30",hover:"hover:bg-blue-500/20"},Backend:{text:"text-red-400",bg:"bg-red-500/10",border:"border-red-500/30",hover:"hover:bg-red-500/20"},Frontend:{text:"text-green-400",bg:"bg-green-500/10",border:"border-green-500/30",hover:"hover:bg-green-500/20"},WebGL:{text:"text-purple-400",bg:"bg-purple-500/10",border:"border-purple-500/30",hover:"hover:bg-purple-500/20"},Website:{text:"text-orange-400",bg:"bg-orange-500/10",border:"border-orange-500/30",hover:"hover:bg-orange-500/20"},"Mobile Apps":{text:"text-cyan-400",bg:"bg-cyan-500/10",border:"border-cyan-500/30",hover:"hover:bg-cyan-500/20"},Activity:{text:"text-yellow-400",bg:"bg-yellow-500/10",border:"border-yellow-500/30",hover:"hover:bg-yellow-500/20"}})[t]||{text:"text-blue-400",bg:"bg-blue-500/10",border:"border-blue-500/30",hover:"hover:bg-blue-500/20"})(r==null?void 0:r.type);if(h.useEffect(()=>{if(f){const t=window.pageYOffset||document.documentElement.scrollTop,i=window.pageXOffset||document.documentElement.scrollLeft;document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${t}px`,document.body.style.left=`-${i}px`,document.body.style.width="100%",document.body.style.height="100%"}else{const t=parseInt(document.body.style.top||"0")*-1,i=parseInt(document.body.style.left||"0")*-1;document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.width="",document.body.style.height="",window.scrollTo(i,t)}return()=>{document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.width="",document.body.style.height=""}},[f]),h.useEffect(()=>{const t=i=>{i.key==="Escape"&&u()};if(f)return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[f,u]),!f||!r)return null;const b=Array.isArray(r.img)?r.img:[r.img].filter(Boolean),x=b.length>1,I=b.map((t,i)=>({src:t,title:`${m==="en"?r.name:r.nameZh||r.name} - ${i+1}`,width:1200,height:800})),o=(t=y)=>{w(I,t)},l=t=>{L(t)},k=()=>!r.tech||r.tech.length===0?null:e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"})}),e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:a.detail.techStack})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:r.tech.map((t,i)=>e.jsx("span",{className:"px-3 py-1.5 bg-theme-primary/20 text-theme-primary text-sm rounded-full border border-theme-primary/30 font-medium",children:t},i))})]}),S=()=>r.stats?e.jsxs("div",{className:"mb-8",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-success",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:a.detail.projectStatistics})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:Object.entries(r.stats).map(([t,i])=>e.jsxs("div",{className:"bg-gradient-to-br from-theme-success/10 to-theme-primary/10 p-4 rounded-lg border border-theme-success/20",children:[e.jsx("div",{className:"text-theme-success text-sm capitalize mb-1",children:t.replace(/([A-Z])/g," $1").trim()}),e.jsx("div",{className:"text-theme-text-primary text-2xl font-bold",children:i})]},t))})]}):null,Z=()=>!r.projects||r.projects.length===0?null:e.jsxs("div",{className:"mb-8",children:[e.jsx("div",{className:"flex items-center gap-2 mb-4",children:e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:a.detail.subProjects})}),e.jsx("div",{className:"space-y-4",children:r.projects.map((t,i)=>{var n;return e.jsxs("div",{className:"bg-gradient-to-br from-theme-secondary/10 to-theme-primary/5 p-4 rounded-lg border border-theme-secondary/20",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsx("h4",{className:"text-theme-text-primary font-semibold",children:m==="en"?t.name:t.nameZh||t.name}),e.jsx("div",{className:"flex gap-2",children:((n=t.links)==null?void 0:n.live)&&e.jsx("a",{href:t.links.live,target:"_blank",rel:"noopener noreferrer",className:"text-theme-primary hover:text-theme-secondary transition-colors",style:{cursor:"pointer"},title:a.liveDemo,children:e.jsx(P,{className:"w-4 h-4"})})})]}),e.jsx("p",{className:"text-theme-text-secondary text-sm mb-3",children:t.description}),t.features&&e.jsx("div",{className:"flex flex-wrap gap-2",children:t.features.map((z,N)=>e.jsx("span",{className:"px-2 py-1 bg-theme-secondary/20 text-theme-secondary text-xs rounded border border-theme-secondary/30",children:z},N))})]},i)})})]});return q.createPortal(e.jsxs("div",{className:"fixed inset-0 z-[99999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",style:{cursor:"default"},children:[e.jsx(E,{onClick:u,ariaLabel:a.detail.closeModal,iconSize:"w-16 h-16",iconColor:"text-white",iconHoverColor:"text-white",circleColor:"bg-red-500",circleSize:"w-80 h-80",strokeWidth:1.5,animationDuration:"duration-500",position:{top:"top-8",right:"right-8"}}),e.jsxs("div",{className:"h-full overflow-y-auto pt-6 pb-6 px-6 md:px-8 lg:px-12 project-detail-container",style:{cursor:"default"},children:[e.jsxs("div",{className:"text-center mb-12 pt-20 md:pt-12 lg:pt-16",children:[e.jsx("h1",{className:"text-4xl md:text-5xl lg:text-6xl font-bold text-theme-text-primary leading-tight mb-6",children:m==="en"?r.name:r.nameZh||r.name}),e.jsx(R,{className:"mx-auto mb-8",width:"w-full max-w-4xl"}),e.jsxs("div",{className:"text-xl md:text-2xl text-theme-text-white-70 font-light italic",children:[r.company&&`${r.company} • `,r.year]})]}),b.length>0&&e.jsxs("div",{className:"mb-12 lg:mb-16",children:[!x&&e.jsx("div",{className:"relative group",children:e.jsxs("div",{className:"aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl",children:[e.jsx("img",{src:b[0],alt:m==="en"?r.name:r.nameZh||r.name,className:"w-full h-full object-cover cursor-pointer transition-all duration-700 group-hover:scale-105",onClick:()=>o(0),onError:t=>{t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=="}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center",children:e.jsx("div",{className:"bg-white/10 backdrop-blur-md rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-500",children:e.jsx("svg",{className:"w-10 h-10 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"})})})})]})}),x&&e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"relative group",children:[e.jsx("div",{className:"aspect-[16/7] lg:aspect-[21/8] overflow-hidden rounded-2xl shadow-2xl",children:e.jsx("img",{src:b[y],alt:`${m==="en"?r.name:r.nameZh||r.name} - ${y+1}`,className:"w-full h-full object-cover cursor-pointer transition-all duration-700 ease-in-out opacity-100",onClick:()=>o(y),onError:t=>{t.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=="},style:{animation:"fadeInImage 0.6s ease-in-out"}},y)}),"                  ",e.jsx("div",{className:"absolute top-6 right-6 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium z-20",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})}),y+1," / ",b.length]})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 cursor-pointer z-10 rounded-2xl",onClick:()=>o(y),children:e.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:e.jsx("div",{className:"bg-white/10 backdrop-blur-md rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-700",children:e.jsx("svg",{className:"w-12 h-12 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"})})})})})]}),e.jsx("div",{className:"flex flex-wrap gap-2 justify-center",children:b.map((t,i)=>e.jsx("button",{onClick:()=>l(i),className:`carousel-thumbnail flex-shrink-0 w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg border-2 overflow-hidden ${i===y?"active border-theme-primary opacity-100 shadow-lg shadow-theme-primary/25":"border-theme-border/30 opacity-70 hover:opacity-90"}`,style:{cursor:"pointer"},children:e.jsx("img",{src:t,alt:`${m==="en"?r.name:r.nameZh||r.name} ${i+1}`,className:"w-full h-full object-cover",onError:n=>{n.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzMzIj48L3JlY3Q+PC9zdmc+"}})},i))})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12",children:[e.jsxs("div",{className:"lg:col-span-1 space-y-6",children:[e.jsxs("div",{className:"group bg-gradient-to-br from-theme-surface/30 to-theme-surface/10 p-6 rounded-2xl border border-theme-border/20 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-theme-primary/10 transition-all duration-500 relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"}),e.jsxs("h3",{className:"text-lg font-semibold text-theme-text-primary mb-4 flex items-center gap-2 relative z-10",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),m==="zh"?"项目信息":"Project Info"]}),e.jsxs("div",{className:"space-y-4 relative z-10",children:[r.company&&e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"客户":"Client"}),e.jsx("div",{className:"text-theme-primary font-semibold",children:r.company})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"年份":"Year"}),e.jsx("div",{className:"text-theme-text-primary font-semibold",children:r.year})]}),r.location&&e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"地点":"Location"}),e.jsx("div",{className:"text-theme-text-primary font-semibold",children:r.location})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"类型":"Type"}),e.jsx("div",{className:"text-theme-secondary font-semibold",children:r.type})]})]})]}),k(),(((T=r.links)==null?void 0:T.live)||((W=r.links)==null?void 0:W.github)||r.link)&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h3",{className:"text-lg font-semibold text-theme-text-primary flex items-center gap-2",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})}),m==="zh"?"项目链接":"Project Links"]}),((s=r.links)==null?void 0:s.live)&&e.jsxs("a",{href:r.links.live,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${g.text} transition-all duration-300 ${g.bg} hover:${g.hover} p-4 rounded-xl border ${g.border} group w-full hover:scale-105 hover:shadow-lg`,style:{cursor:"pointer"},children:[e.jsx(P,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"font-semibold",children:a.liveDemo})]}),((d=r.links)==null?void 0:d.github)&&e.jsxs("a",{href:r.links.github,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${g.text} transition-all duration-300 ${g.bg} hover:${g.hover} p-4 rounded-xl border ${g.border} group w-full hover:scale-105 hover:shadow-lg`,style:{cursor:"pointer"},children:[e.jsx(P,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"font-semibold",children:a.githubRepo})]})]})]}),e.jsxs("div",{className:"lg:col-span-2 space-y-8",children:[e.jsx("div",{children:e.jsxs("div",{className:"group bg-gradient-to-br from-theme-surface/20 to-transparent p-8 rounded-2xl border border-theme-border/10 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-theme-primary/10 transition-all duration-500 relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"}),e.jsxs("h3",{className:"text-2xl font-bold text-theme-text-primary mb-6 flex items-center gap-3 relative z-10",children:[e.jsx("div",{className:"w-1 h-8 bg-gradient-to-b from-theme-primary to-theme-secondary rounded-full"}),m==="zh"?"项目描述":"Project Description"]}),e.jsx("p",{className:"text-theme-text-secondary leading-relaxed text-lg relative z-10",style:{fontFamily:"'Lora', serif",lineHeight:"1.8"},children:M(r,m)})]})}),S(),Z()]})]})]})]}),document.body)};V.propTypes={project:p.object,isOpen:p.bool.isRequired,onClose:p.func.isRequired};const O=({className:r="w-4 h-4"})=>e.jsxs("svg",{className:r,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]});O.propTypes={className:p.string};const U=({language:r})=>{const[f,u]=h.useState(!1),[m,c]=h.useState("all"),{getAllProjects:M,selectedProject:w,setSelectedProject:y,getProjectsText:L}=D(),a=L(),C=M(),g=C.reduce((o,l)=>{const k=l.type||"Other";return o[k]||(o[k]=[]),o[k].push(l),o},{}),b=m==="all"?C:g[m]||[],x=o=>{if(!o)return"bg-theme-muted/20 text-theme-textSecondary border-theme-muted/50";const l=String(o).toLowerCase();return l.includes("完成")||l.includes("2019")||l.includes("2024")?"bg-theme-success/20 text-theme-success border-theme-success/50":l.includes("progress")||l.includes("进行")||l.includes("2020-2021")?"bg-theme-primary/20 text-theme-primary border-theme-primary/50":l.includes("plan")||l.includes("规划")||l.includes("2024-2025")?"bg-theme-warning/20 text-theme-warning border-theme-warning/50":"bg-theme-muted/20 text-theme-textSecondary border-theme-muted/50"},I=o=>{const l={"Full Stack":{bg:"bg-theme-bg-white-10",text:"text-theme-primary",border:"border-theme-primary/30 hover:border-theme-primary/50"},"Modern Frontend":{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},Frontend:{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},"VR/360°":{bg:"bg-theme-bg-white-10",text:"text-theme-accent",border:"border-theme-accent/30 hover:border-theme-accent/50"},"Website Development":{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-80",border:"border-theme-text-white-50 hover:border-theme-text-white-70"},"Web Development":{bg:"bg-theme-bg-white-10",text:"text-theme-primary",border:"border-theme-primary/30 hover:border-theme-primary/50"},"Mobile App":{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},"Data Science":{bg:"bg-theme-bg-white-10",text:"text-theme-accent",border:"border-theme-accent/30 hover:border-theme-accent/50"},activity:{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-90",border:"border-theme-text-white-50 hover:border-theme-text-white-70"},Other:{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-70",border:"border-theme-text-white-40 hover:border-theme-text-white-60"}};return l[o]||l.Other};return e.jsxs("div",{className:"min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 text-theme-text-white relative project-section-bg",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 mb-8",children:[e.jsxs("div",{className:"flex flex-col text-center lg:text-left",children:[e.jsx(H,{level:1,className:"text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-theme-section-title mb-3",children:a.title}),e.jsx("h2",{className:"text-xl md:text-2xl text-theme-text-white-70 font-light italic",children:a.subtitle})]}),e.jsx("div",{className:"flex items-center justify-center lg:justify-end mt-8 lg:mt-0",children:e.jsxs("div",{className:"flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 border border-theme-primary/30 hover:border-theme-primary/50 transition-all duration-300 hover:scale-105 explore-map-button rounded-full backdrop-blur-sm",onClick:()=>u(!0),title:a.exploreMapTooltip,children:[e.jsx("div",{className:"text-5xl xl:text-6xl text-theme-primary mb-1 flex items-center justify-center",children:"🗺️"}),e.jsx("div",{className:"text-xs xl:text-sm text-theme-primary font-medium text-center leading-tight px-2",children:a.exploreMap})]})})]}),e.jsx(R,{className:"my-8",width:"w-full"}),e.jsx("div",{className:"relative z-10 backdrop-protection",children:e.jsxs("div",{className:"max-w-6xl mx-auto",children:[e.jsx("div",{className:"mb-12",children:e.jsxs("div",{className:"flex flex-wrap gap-3 md:gap-4 justify-center items-center",children:[e.jsx("button",{className:`category-filter-btn bg-theme-bg-white-10 text-theme-text-white-90 border-theme-text-white-50 hover:border-theme-text-white-70 ${m==="all"?"active":""}`,onClick:()=>c("all"),children:"All"}),Object.keys(g).map(o=>{const l=I(o);return e.jsx("button",{className:`category-filter-btn ${m===o?"active":""} ${l.bg} ${l.text} ${l.border}`,onClick:()=>c(o),children:o},o)})]})}),e.jsx("div",{className:"project-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 pb-12",children:b.map((o,l)=>{var k,S;return e.jsxs("div",{className:"project-card group cursor-pointer",onClick:()=>y(o),children:[e.jsxs("div",{className:"project-image-container",children:[o.img?Array.isArray(o.img)?e.jsx("img",{src:o.img[0],alt:o.name||o.title,className:"project-image"}):e.jsx("img",{src:o.img,alt:o.name||o.title,className:"project-image"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-4xl text-theme-text-white-40 bg-gradient-to-br from-slate-600/20 to-slate-800/20",children:"�"}),(((k=o.links)==null?void 0:k.github)||o.link&&o.link.includes("github"))&&e.jsx("a",{href:((S=o.links)==null?void 0:S.github)||o.link,target:"_blank",rel:"noopener noreferrer",className:"absolute bottom-3 right-3 w-8 h-8 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10",onClick:Z=>Z.stopPropagation(),children:e.jsx("svg",{className:"w-4 h-4 text-theme-text-white",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})}),e.jsx("div",{className:"project-category-badge",children:o.type||"Other"}),e.jsx("div",{className:`project-status-badge ${x(o.year)}`,children:o.year||""})]}),e.jsxs("div",{className:"project-content",children:[o.location&&e.jsxs("div",{className:"project-meta text-theme-text-muted mb-3 flex items-center gap-1.5",children:[e.jsx(O,{className:"w-4 h-4 text-current flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:o.location})]}),e.jsx(H,{level:3,className:"project-title leading-snug line-clamp-2",children:o.name||o.title})]})]},l)})}),e.jsx("div",{className:"text-center py-12 border-t border-theme-border-white-10 bg-black/20 backdrop-blur-sm rounded-xl mt-8",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("p",{className:"text-theme-text-white-80 text-lg mb-3 font-medium",children:a.bottomSubtitle}),e.jsx("p",{className:"text-theme-text-white-60 text-base leading-relaxed",children:a.description})]})})]})}),e.jsx(G,{isOpen:f,onClose:()=>u(!1),language:r}),e.jsx(V,{project:w,isOpen:!!w,onClose:()=>y(null)})]})};U.propTypes={language:p.string.isRequired};export{U as default};
