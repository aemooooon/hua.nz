import{r as c,j as e,d as _}from"./react-DudRe3MH.js";import{P as x}from"./vendor-D2t9TNkl.js";import{L as w}from"./leaflet-BcfEFI1A.js";import{a as X,u as R,b as Y}from"./index-DBUws_J5.js";import{G as Q}from"./GlowDivider-DGRTBnis.js";import{T as O}from"./ThemeComponents-ncyhfpH0.js";import"./three-0lp-BYGx.js";const G=({onClick:t,className:v="",ariaLabel:f="Close",iconSize:m="w-16 h-16",iconColor:a="text-theme-primary",iconHoverColor:L="text-white",circleColor:N="bg-theme-primary",circleSize:k="w-80 h-80",strokeWidth:C=1.2,animationDuration:h="duration-500",position:S={top:"top-8",right:"right-8"}})=>{const[i,j]=c.useState(!1),M={"w-10 h-10":{width:"2.5rem",height:"2.5rem"},"w-12 h-12":{width:"3rem",height:"3rem"},"w-16 h-16":{width:"4rem",height:"4rem"}},z={"w-24 h-24":{width:"6rem",height:"6rem"},"w-32 h-32":{width:"8rem",height:"8rem"},"w-80 h-80":{width:"20rem",height:"20rem"}},r={"bg-red-500":"#ef4444","bg-slate-800":"#1e293b","bg-theme-primary":"var(--theme-primary)","text-white":"#ffffff","text-red-400":"#f87171","text-theme-primary":"var(--theme-primary)"},g={"top-4":"1rem","top-6":"1.5rem","top-8":"2rem","right-4":"1rem","right-6":"1.5rem","right-8":"2rem"};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`fixed top-0 right-0 ${v} z-[100000] hidden md:block`,style:{width:"4rem",height:"4rem"},children:[e.jsx("div",{className:`absolute top-0 right-0 rounded-full transition-all ${h} ease-in-out ${i?"scale-100 opacity-100":"scale-50 opacity-0"} origin-top-right shadow-lg z-0`,style:{...z[k]||z["w-32 h-32"],backgroundColor:r[N]||r["bg-theme-primary"],transform:"translate(50%, -50%)"}}),e.jsx("button",{className:"absolute top-0 right-0 w-24 h-24 focus:outline-none z-20",onMouseEnter:()=>j(!0),onMouseLeave:()=>j(!1),onClick:p=>{p.preventDefault(),p.stopPropagation(),t()},"aria-label":f}),e.jsx("div",{className:"absolute pointer-events-none z-30",style:{top:g[S.top]||g["top-6"],right:g[S.right]||g["right-6"]},children:e.jsx("svg",{className:`transition-all ${h} ease-in-out drop-shadow-lg`,style:{...M[m]||M["w-12 h-12"],color:i?r[L]||r["text-white"]:r[a]||r["text-white"],transform:i?"scale(1.1)":"scale(1)"},fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:C,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsx("div",{className:`fixed z-[100000] block md:hidden ${v}`,style:{top:"max(1rem, env(safe-area-inset-top) + 0.5rem)",left:"50%",transform:"translateX(-50%)"},children:e.jsx("button",{onClick:p=>{p.preventDefault(),p.stopPropagation(),t()},className:"w-12 h-12 inline-flex items-center justify-center bg-theme-surface/20 backdrop-blur-sm border-2 border-theme-border-white-10 rounded-full transition-all duration-300 hover:scale-110 hover:border-theme-primary hover:bg-theme-hover shadow-lg","aria-label":f,children:e.jsx("svg",{className:"w-6 h-6 text-theme-primary transition-colors duration-300",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:1.5,children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})})]})};G.propTypes={onClick:x.func.isRequired,className:x.string,ariaLabel:x.string,iconSize:x.string,iconColor:x.string,iconHoverColor:x.string,circleColor:x.string,circleSize:x.string,strokeWidth:x.number,animationDuration:x.string,position:x.shape({top:x.string,right:x.string})};delete w.Icon.Default.prototype._getIconUrl;w.Icon.Default.mergeOptions({iconRetinaUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",iconUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"});const F=({isOpen:t,onClose:v,language:f="en"})=>{const m=c.useRef(null),a=c.useRef(null),L=c.useRef([]),N=c.useRef(null),k=c.useRef(null),C=c.useRef(null),h=c.useRef(null),{getThemeColors:S}=X(),i=S(),{getAllLocations:j,getProjectsText:M}=R(),z=M(),r=c.useMemo(()=>j().filter(o=>o.coordinates&&Array.isArray(o.coordinates)&&o.coordinates.length===2),[j]),g=c.useMemo(()=>({project:i.primary,work:i.success||"#10b981",education:i.warning||"#f59e0b",activity:i.purple||"#8b5cf6"}),[i]),p=c.useCallback(o=>typeof o=="object"&&o!==null?o[f]||o.en||o.zh||"":o||"",[f]),$=c.useCallback(()=>{a.current&&(C.current={center:a.current.getCenter(),zoom:a.current.getZoom()})},[]),Z=c.useCallback(()=>{if(!a.current||!C.current)return;const{center:o,zoom:d}=C.current;a.current.flyTo(o,d,{animate:!0,duration:1.2}),C.current=null},[]),T=c.useCallback(o=>{if(!o||o.length===0)return[20,0];const d=o.length,n=o.reduce((l,B)=>l+B.coordinates[0],0),b=o.reduce((l,B)=>l+B.coordinates[1],0);return[n/d,b/d]},[]),P=c.useCallback(o=>{!a.current||!o||a.current.flyTo(o,12,{animate:!0,duration:1.5})},[]),D=c.useCallback(()=>w.divIcon({className:"custom-marker-icon",html:`<div class="marker-container" style="
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
      </div>`,iconSize:[40,40],iconAnchor:[20,20],popupAnchor:[0,-25]}),[]),A=c.useCallback(o=>{const d=o.getChildCount();let n=50,b=16,l=70;return d>=100?(n=70,b=20,l=90):d>=10&&(n=60,b=18,l=80),w.divIcon({html:`<div class="cluster-container" style="
        width: ${l}px;
        height: ${l}px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        filter: drop-shadow(0 0 12px var(--theme-map-button-border)) drop-shadow(0 0 20px rgba(var(--theme-map-button-glow), 0.6));
      ">
        <div class="cluster-glow" style="
          position: absolute;
          width: ${l}px;
          height: ${l}px;
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
          font-size: ${b}px;
          text-shadow: 0 0 8px rgba(var(--theme-map-button-glow), 0.8);
          position: relative;
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        " onmouseover="this.style.transform='scale(1.1) rotate(5deg)'; this.style.color='var(--theme-map-button-text-hover)'; this.style.borderColor='var(--theme-map-button-border-hover)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow-intense), 1), 0 12px 35px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.4)'" 
           onmouseout="this.style.transform='scale(1) rotate(0deg)'; this.style.color='var(--theme-map-button-text)'; this.style.borderColor='var(--theme-map-button-border)'; this.style.boxShadow='0 0 0 3px rgba(var(--theme-map-button-glow), 0.8), 0 8px 25px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.2)'">${d}</div>
      </div>`,className:"custom-cluster-icon",iconSize:[l,l],iconAnchor:[l/2,l/2]})},[]),s=c.useCallback(()=>{if(!a.current)return;a.current.zoomControl.remove();const o=w.Control.extend({onAdd:function(n){const b=w.DomUtil.create("div","custom-map-controls");b.innerHTML=`
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
            <button class="control-btn reset-view" title="${z.map.resetToDefaultView}">
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
        `,w.DomEvent.disableClickPropagation(b),w.DomEvent.disableScrollPropagation(b);const l=b.querySelector(".zoom-in"),B=b.querySelector(".zoom-out"),W=b.querySelector(".reset-view"),I=b.querySelector(".locate-user");return l.addEventListener("click",()=>n.zoomIn()),B.addEventListener("click",()=>n.zoomOut()),W.addEventListener("click",()=>{if(r.length>0)if(r.length===1)n.setView(r[0].coordinates,10);else{const y=w.latLngBounds(r.map(E=>E.coordinates));n.fitBounds(y,{padding:[50,50]})}else{const y=T(r);n.setView(y,3)}}),I.addEventListener("click",()=>{navigator.geolocation&&(I.innerHTML=`
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <circle cx="12" cy="12" r="8"></circle>
              </svg>
            `,navigator.geolocation.getCurrentPosition(y=>{const{latitude:E,longitude:V}=y.coords;n.setView([E,V],15);const U=w.marker([E,V],{icon:w.divIcon({className:"user-location-marker",html:`<div style="
                      width: 20px; 
                      height: 20px; 
                      background: #3b82f6; 
                      border: 3px solid white; 
                      border-radius: 50%; 
                      box-shadow: 0 2px 8px rgba(59,130,246,0.4);
                    "></div>`,iconSize:[26,26],iconAnchor:[13,13]})}).addTo(n);setTimeout(()=>{n.removeLayer(U)},3e3),I.innerHTML=`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `},y=>{console.warn("定位失败:",y),I.innerHTML=`
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                  </svg>
                `}))}),b}}),d=new o({position:"bottomright"});d.addTo(a.current),k.current=d},[f,r,T,z.map.resetToDefaultView]),u=c.useCallback(o=>{const d=p(o.name),n=p(o.client),b=p(o.location),l=Array.isArray(o.img)?o.img[0]:o.img;return`
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
        ${l?`
          <div style="border-radius: 12px 12px 0 0; overflow: hidden; position: relative;">
            <img src="${l}" alt="${d}" style="width: 100%; height: 160px; object-fit: cover; display: block;" />
          </div>
        `:""}
        
        <div style="padding: 16px; padding-right: 40px;">
          <div style="display: flex; justify-content: flex-start; align-items: center; margin-bottom: 12px; gap: 12px;">
            <span style="
              background: linear-gradient(45deg, ${i.primary}, ${i.accent||i.primary}); 
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
          
          ${b?`
            <div style="display: flex; align-items: center; margin-bottom: 10px; color: #9ca3af; font-size: 12px;">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="margin-right: 6px;">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              ${n}, ${b}
            </div>
          `:""}
          
          ${o.link?`
            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #374151;">
              <a href="${o.link}" target="_blank" rel="noopener noreferrer" style="
                display: inline-flex; 
                align-items: center; 
                color: ${i.primary}; 
                text-decoration: none; 
                font-size: 13px; 
                font-weight: 600;
                background: linear-gradient(45deg, ${i.primary}20, transparent);
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid ${i.primary}40;
                transition: all 0.3s ease;
              " onmouseover="this.style.background='${i.primary}30'; this.style.borderColor='${i.primary}60';" onmouseout="this.style.background='linear-gradient(45deg, ${i.primary}20, transparent)'; this.style.borderColor='${i.primary}40';">
                ${f==="en"?"Learn more":"了解更多"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 6px;">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          `:""}
        </div>
      </div>
    `},[p,i,f]);return c.useEffect(()=>{if(t&&m.current&&!a.current){const o=T(r);if(a.current=w.map(m.current,{zoomControl:!0,attributionControl:!0}).setView(o,3),w.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",minZoom:1,maxZoom:18}).addTo(a.current),s(),N.current=w.markerClusterGroup({iconCreateFunction:A,maxClusterRadius:n=>n<=6?80:n<=10?50:n<=14?30:15,spiderfyOnMaxZoom:!0,showCoverageOnHover:!1,zoomToBoundsOnClick:!0,disableClusteringAtZoom:15,animate:!0,animateAddingMarkers:!0,spiderfyDistanceMultiplier:1.5,chunkedLoading:!0,removeOutsideVisibleBounds:!1}),r.forEach(n=>{const b=D(),l=w.marker(n.coordinates,{icon:b,title:p(n.title)||p(n.name)}),B=u(n),W=l.bindPopup(B,{maxWidth:800,minWidth:560,className:"custom-popup dark-popup",closeButton:!0,autoClose:!1,closeOnEscapeKey:!0,keepInView:!0,autoPan:!0,autoPanPadding:[20,20],offset:[0,-25]}).getPopup();W.on("remove",function(){h.current===W&&(setTimeout(()=>{Z()},200),h.current=null)}),l.on("click",function(I){w.DomEvent.stopPropagation(I),$(),h.current=W,l.openPopup(),setTimeout(()=>{P(n.coordinates)},100)}),l.on("popupclose",function(){h.current===W&&(setTimeout(()=>{Z()},200),h.current=null)}),l.on("mouseover",function(){l.bindTooltip(p(n.title)||p(n.name),{permanent:!1,direction:"top",offset:[0,-25],className:"marker-tooltip"}).openTooltip();const I=l.getElement();if(I){const y=I.querySelector("div");y&&(y.style.filter="brightness(1.2) contrast(1.1) drop-shadow(0 6px 16px rgba(0,0,0,0.5))",y.style.borderWidth="4px",y.style.boxShadow="0 6px 20px rgba(0,0,0,0.6), inset 0 3px 6px rgba(255,255,255,0.3)")}}),l.on("mouseout",function(){l.closeTooltip();const I=l.getElement();if(I){const y=I.querySelector("div");y&&(y.style.filter="",y.style.borderWidth="3px",y.style.boxShadow="0 4px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)")}}),N.current.addLayer(l),L.current.push(l)}),a.current.addLayer(N.current),r.length>0)if(r.length===1)a.current.setView(r[0].coordinates,10);else{const n=w.latLngBounds(r.map(b=>b.coordinates));a.current.fitBounds(n,{padding:[50,50]})}const d=document.createElement("style");d.textContent=`
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
      `,document.head.appendChild(d),a.current._customStyle=d}return()=>{!t&&a.current&&(C.current=null,h.current=null,N.current&&(N.current.clearLayers(),a.current.removeLayer(N.current)),L.current=[],a.current._customStyle&&a.current._customStyle.parentNode&&a.current._customStyle.parentNode.removeChild(a.current._customStyle),a.current.remove(),a.current=null,N.current=null)}},[t,r,g,A,D,u,T,P,i,p,s,$,Z]),c.useEffect(()=>{const o=d=>{d.key==="Escape"&&v()};if(t){const d=window.scrollY;document.addEventListener("keydown",o),document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${d}px`,document.body.style.width="100%"}return()=>{if(t){document.removeEventListener("keydown",o);const d=document.body.style.top;document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width="",d&&window.scrollTo(0,parseInt(d||"0")*-1)}}},[t,v]),c.useEffect(()=>()=>{document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.width=""},[]),t?e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center project-geo-viewer-modal",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70 backdrop-blur-sm",onClick:v}),e.jsxs("div",{className:"relative w-full h-full bg-theme-surface overflow-hidden shadow-2xl project-geo-viewer-container",children:[e.jsx(G,{onClick:v,ariaLabel:z.map.closeMap,iconSize:"w-16 h-16",iconColor:"text-white",iconHoverColor:"text-red-400",circleColor:"bg-slate-800",circleSize:"w-80 h-80",strokeWidth:1.5,animationDuration:"duration-500",position:{top:"top-8",right:"right-8"}}),e.jsx("div",{ref:m,className:"w-full h-full",style:{zIndex:1}}),e.jsx("div",{className:"absolute bottom-8 left-4 z-10 map-info-panel",children:e.jsx("h2",{className:"text-sm font-bold",children:z.map.title})}),e.jsxs("div",{className:"absolute bottom-4 right-4 map-legend-panel",children:[e.jsx("h4",{className:"text-sm font-semibold mb-2",children:f==="en"?"Categories":"项目类别"}),e.jsx("div",{className:"space-y-1",children:Object.entries(g).map(([o,d])=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-3 h-3 rounded-full border-2 shadow-sm",style:{backgroundColor:d,borderColor:"var(--theme-map-button-border)"}}),e.jsx("span",{className:"text-xs capitalize opacity-90",children:o})]},o))})]})]})]}):null};F.propTypes={isOpen:x.bool.isRequired,onClose:x.func.isRequired,language:x.string};const H=({className:t="w-4 h-4"})=>e.jsx("svg",{className:t,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})});H.propTypes={className:x.string};const J=({project:t=null,isOpen:v,onClose:f})=>{var T,P,D,A;const{language:m,getProjectsText:a,getProjectDescription:L}=R(),{openPhotoSwipe:N}=Y(),[k,C]=c.useState(0),h=a();c.useEffect(()=>{v&&t&&C(0)},[v,t]);const i=(s=>({"Data Science":{text:"text-blue-400",bg:"bg-blue-500/10",border:"border-blue-500/30",hover:"hover:bg-blue-500/20"},Backend:{text:"text-red-400",bg:"bg-red-500/10",border:"border-red-500/30",hover:"hover:bg-red-500/20"},Frontend:{text:"text-green-400",bg:"bg-green-500/10",border:"border-green-500/30",hover:"hover:bg-green-500/20"},WebGL:{text:"text-purple-400",bg:"bg-purple-500/10",border:"border-purple-500/30",hover:"hover:bg-purple-500/20"},Website:{text:"text-orange-400",bg:"bg-orange-500/10",border:"border-orange-500/30",hover:"hover:bg-orange-500/20"},"Mobile Apps":{text:"text-cyan-400",bg:"bg-cyan-500/10",border:"border-cyan-500/30",hover:"hover:bg-cyan-500/20"},Activity:{text:"text-yellow-400",bg:"bg-yellow-500/10",border:"border-yellow-500/30",hover:"hover:bg-yellow-500/20"}})[s]||{text:"text-blue-400",bg:"bg-blue-500/10",border:"border-blue-500/30",hover:"hover:bg-blue-500/20"})(t==null?void 0:t.type);if(c.useEffect(()=>{if(v){const s=window.pageYOffset||document.documentElement.scrollTop,u=window.pageXOffset||document.documentElement.scrollLeft;document.body.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${s}px`,document.body.style.left=`-${u}px`,document.body.style.width="100%",document.body.style.height="100%"}else{const s=parseInt(document.body.style.top||"0")*-1,u=parseInt(document.body.style.left||"0")*-1;document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.width="",document.body.style.height="",window.scrollTo(u,s)}return()=>{document.body.style.overflow="",document.body.style.position="",document.body.style.top="",document.body.style.left="",document.body.style.width="",document.body.style.height=""}},[v]),c.useEffect(()=>{const s=u=>{u.key==="Escape"&&f()};if(v)return document.addEventListener("keydown",s),()=>document.removeEventListener("keydown",s)},[v,f]),!v||!t)return null;const j=Array.isArray(t.img)?t.img:[t.img].filter(Boolean),M=j.length>1,z=j.map((s,u)=>({src:s,title:`${m==="en"?t.name:t.nameZh||t.name} - ${u+1}`,width:1200,height:800})),r=(s=k)=>{N(z,s)},g=s=>{C(s)},p=()=>!t.tech||t.tech.length===0?null:e.jsxs("div",{className:"mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"})}),e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:h.detail.techStack})]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.tech.map((s,u)=>e.jsx("span",{className:"px-3 py-1.5 bg-theme-primary/20 text-theme-primary text-sm rounded-full border border-theme-primary/30 font-medium",children:s},u))})]}),$=()=>t.stats?e.jsxs("div",{className:"mb-8",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-success",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"})}),e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:h.detail.projectStatistics})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:Object.entries(t.stats).map(([s,u])=>e.jsxs("div",{className:"bg-gradient-to-br from-theme-success/10 to-theme-primary/10 p-4 rounded-lg border border-theme-success/20",children:[e.jsx("div",{className:"text-theme-success text-sm capitalize mb-1",children:s.replace(/([A-Z])/g," $1").trim()}),e.jsx("div",{className:"text-theme-text-primary text-2xl font-bold",children:u})]},s))})]}):null,Z=()=>!t.projects||t.projects.length===0?null:e.jsxs("div",{className:"mb-8",children:[e.jsx("div",{className:"flex items-center gap-2 mb-4",children:e.jsx("h3",{className:"text-lg font-semibold text-theme-text-primary",children:h.detail.subProjects})}),e.jsx("div",{className:"space-y-4",children:t.projects.map((s,u)=>{var o;return e.jsxs("div",{className:"bg-gradient-to-br from-theme-secondary/10 to-theme-primary/5 p-4 rounded-lg border border-theme-secondary/20",children:[e.jsxs("div",{className:"flex items-start justify-between mb-2",children:[e.jsx("h4",{className:"text-theme-text-primary font-semibold",children:m==="en"?s.name:s.nameZh||s.name}),e.jsx("div",{className:"flex gap-2",children:((o=s.links)==null?void 0:o.live)&&e.jsx("a",{href:s.links.live,target:"_blank",rel:"noopener noreferrer",className:"text-theme-primary hover:text-theme-secondary transition-colors",style:{cursor:"pointer"},title:h.liveDemo,children:e.jsx(H,{className:"w-4 h-4"})})})]}),e.jsx("p",{className:"text-slate-200 text-sm mb-3",style:{color:"#e2e8f0"},children:s.description}),s.features&&e.jsx("div",{className:"flex flex-wrap gap-2",children:s.features.map((d,n)=>e.jsx("span",{className:"px-2 py-1 bg-theme-secondary/20 text-theme-secondary text-xs rounded border border-theme-secondary/30",children:d},n))})]},u)})})]});return _.createPortal(e.jsxs("div",{className:"fixed inset-0 z-[99999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",style:{cursor:"default"},children:[e.jsx(G,{onClick:f,ariaLabel:h.detail.closeModal,iconSize:"w-16 h-16",iconColor:"text-white",iconHoverColor:"text-white",circleColor:"bg-theme-primary",circleSize:"w-80 h-80",strokeWidth:1.5,animationDuration:"duration-500",position:{top:"top-8",right:"right-8"}}),e.jsxs("div",{className:"h-full overflow-y-auto pt-6 pb-6 px-6 md:px-8 lg:px-12 project-detail-container",style:{cursor:"default"},children:[e.jsxs("div",{className:"text-center mb-12 pt-20 md:pt-12 lg:pt-16",children:[e.jsx("h1",{className:"text-4xl md:text-5xl lg:text-6xl font-bold text-theme-text-primary leading-tight mb-6",children:m==="en"?t.name:t.nameZh||t.name}),e.jsx(Q,{className:"mx-auto mb-8",width:"w-full max-w-4xl"}),e.jsxs("div",{className:"text-xl md:text-2xl text-theme-text-white-70 font-light italic",children:[t.company&&`${t.company} • `,t.year]})]}),j.length>0&&e.jsxs("div",{className:"mb-12 lg:mb-16",children:[!M&&e.jsx("div",{className:"relative group",children:e.jsxs("div",{className:"aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl",children:[e.jsx("img",{src:j[0],alt:m==="en"?t.name:t.nameZh||t.name,className:"w-full h-full object-cover cursor-pointer transition-all duration-700 group-hover:scale-105",onClick:()=>r(0),onError:s=>{s.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=="}}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center",children:e.jsx("div",{className:"bg-white/10 backdrop-blur-md rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-500",children:e.jsx("svg",{className:"w-10 h-10 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"})})})})]})}),M&&e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"relative group",children:[e.jsx("div",{className:"aspect-[16/7] lg:aspect-[21/8] overflow-hidden rounded-2xl shadow-2xl",children:e.jsx("img",{src:j[k],alt:`${m==="en"?t.name:t.nameZh||t.name} - ${k+1}`,className:"w-full h-full object-cover cursor-pointer transition-all duration-700 ease-in-out opacity-100",onClick:()=>r(k),onError:s=>{s.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iIzMzNCI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWkiIGZvbnQtc2l6ZT0iMTZweCIgZm9udC13ZWlnaHQ9IjMwMCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=="},style:{animation:"fadeInImage 0.6s ease-in-out"}},k)}),"                  ",e.jsx("div",{className:"absolute top-6 right-6 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-medium z-20",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})}),k+1," / ",j.length]})}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 cursor-pointer z-10 rounded-2xl",onClick:()=>r(k),children:e.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:e.jsx("div",{className:"bg-white/10 backdrop-blur-md rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-700",children:e.jsx("svg",{className:"w-12 h-12 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"})})})})})]}),e.jsx("div",{className:"flex flex-wrap gap-2 justify-center",children:j.map((s,u)=>e.jsx("button",{onClick:()=>g(u),className:`carousel-thumbnail flex-shrink-0 w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg border-2 overflow-hidden ${u===k?"active border-theme-primary opacity-100 shadow-lg shadow-theme-primary/25":"border-theme-border/30 opacity-70 hover:opacity-90"}`,style:{cursor:"pointer"},children:e.jsx("img",{src:s,alt:`${m==="en"?t.name:t.nameZh||t.name} ${u+1}`,className:"w-full h-full object-cover",onError:o=>{o.target.src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzMzIj48L3JlY3Q+PC9zdmc+"}})},u))})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12",children:[e.jsxs("div",{className:"lg:col-span-1 space-y-6",children:[e.jsxs("div",{className:"group bg-gradient-to-br from-theme-surface/30 to-theme-surface/10 p-6 rounded-2xl border border-theme-border/20 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-theme-primary/10 transition-all duration-500 relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"}),e.jsxs("h3",{className:"text-lg font-semibold text-theme-text-primary mb-4 flex items-center gap-2 relative z-10",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),m==="zh"?"项目信息":"Project Info"]}),e.jsxs("div",{className:"space-y-4 relative z-10",children:[t.company&&e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"客户":"Client"}),e.jsx("div",{className:"text-theme-primary font-semibold",children:t.company})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"年份":"Year"}),e.jsx("div",{className:"text-theme-text-primary font-semibold",children:t.year})]}),t.location&&e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"地点":"Location"}),e.jsx("div",{className:"text-theme-text-primary font-semibold",children:t.location})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm text-theme-text-secondary/60 uppercase tracking-wider font-medium mb-1",children:m==="zh"?"类型":"Type"}),e.jsx("div",{className:"text-theme-secondary font-semibold",children:t.type})]})]})]}),p(),(((T=t.links)==null?void 0:T.live)||((P=t.links)==null?void 0:P.github)||t.link)&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h3",{className:"text-lg font-semibold text-theme-text-primary flex items-center gap-2",children:[e.jsx("svg",{className:"w-5 h-5 text-theme-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})}),m==="zh"?"项目链接":"Project Links"]}),((D=t.links)==null?void 0:D.live)&&e.jsxs("a",{href:t.links.live,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${i.text} transition-all duration-300 ${i.bg} hover:${i.hover} p-4 rounded-xl border ${i.border} group w-full hover:scale-105 hover:shadow-lg`,style:{cursor:"pointer"},children:[e.jsx(H,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"font-semibold",children:h.liveDemo})]}),((A=t.links)==null?void 0:A.github)&&e.jsxs("a",{href:t.links.github,target:"_blank",rel:"noopener noreferrer",className:`flex items-center gap-3 ${i.text} transition-all duration-300 ${i.bg} hover:${i.hover} p-4 rounded-xl border ${i.border} group w-full hover:scale-105 hover:shadow-lg`,style:{cursor:"pointer"},children:[e.jsx(H,{className:"w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0"}),e.jsx("span",{className:"font-semibold",children:h.githubRepo})]})]})]}),e.jsxs("div",{className:"lg:col-span-2 space-y-8",children:[e.jsx("div",{children:e.jsxs("div",{className:"group bg-gradient-to-br from-slate-50/8 via-white/6 to-slate-100/8 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl hover:shadow-theme-primary/10 transition-all duration-500 relative overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-secondary/5 rounded-2xl"}),e.jsxs("h3",{className:"text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10",children:[e.jsx("div",{className:"w-1 h-8 bg-gradient-to-b from-theme-primary to-theme-secondary rounded-full"}),m==="zh"?"项目描述":"Project Description"]}),e.jsx("div",{className:"relative z-10",children:(()=>{const s=L(t,m);return Array.isArray(s)?e.jsx("div",{className:"space-y-6",children:s.map((u,o)=>e.jsx("p",{className:"text-slate-200 leading-relaxed text-lg",style:{fontFamily:"'Lora', serif",lineHeight:"1.8",textAlign:"justify",textJustify:"inter-word",hyphens:"auto",wordBreak:"break-word",color:"#e2e8f0"},children:u},o))}):e.jsx("p",{className:"text-slate-200 leading-relaxed text-lg",style:{fontFamily:"'Lora', serif",lineHeight:"1.8",textAlign:"justify",textJustify:"inter-word",hyphens:"auto",wordBreak:"break-word",color:"#e2e8f0"},children:s})})()})]})}),$(),Z()]})]})]})]}),document.body)};J.propTypes={project:x.object,isOpen:x.bool.isRequired,onClose:x.func.isRequired};const q=({className:t="w-4 h-4"})=>e.jsxs("svg",{className:t,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]});q.propTypes={className:x.string};const K=({language:t})=>{const[v,f]=c.useState(!1),[m,a]=c.useState("all"),{getAllProjects:L,selectedProject:N,setSelectedProject:k,getProjectsText:C}=R(),h=C(),S=L(),i=S.reduce((r,g)=>{const p=g.type||"Other";return r[p]||(r[p]=[]),r[p].push(g),r},{}),j=m==="all"?S:i[m]||[],M=r=>"bg-theme-primary/20 text-theme-primary border-theme-primary/50",z=r=>{const g={"Full Stack":{bg:"bg-theme-bg-white-10",text:"text-theme-primary",border:"border-theme-primary/30 hover:border-theme-primary/50"},"Modern Frontend":{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},Frontend:{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},"VR/360°":{bg:"bg-theme-bg-white-10",text:"text-theme-accent",border:"border-theme-accent/30 hover:border-theme-accent/50"},"Website Development":{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-80",border:"border-theme-text-white-50 hover:border-theme-text-white-70"},"Web Development":{bg:"bg-theme-bg-white-10",text:"text-theme-primary",border:"border-theme-primary/30 hover:border-theme-primary/50"},"Mobile App":{bg:"bg-theme-bg-white-10",text:"text-theme-secondary",border:"border-theme-secondary/30 hover:border-theme-secondary/50"},"Data Science":{bg:"bg-theme-bg-white-10",text:"text-theme-accent",border:"border-theme-accent/30 hover:border-theme-accent/50"},activity:{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-90",border:"border-theme-text-white-50 hover:border-theme-text-white-70"},Other:{bg:"bg-theme-bg-white-10",text:"text-theme-text-white-70",border:"border-theme-text-white-40 hover:border-theme-text-white-60"}};return g[r]||g.Other};return e.jsxs("div",{className:"min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 text-theme-text-white relative project-section-bg",children:[e.jsx("div",{className:"max-w-screen-2xl mx-auto",children:e.jsxs("div",{className:"flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 mb-8",children:[e.jsxs("div",{className:"flex flex-col text-center lg:text-left",children:[e.jsx(O,{level:1,className:"text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat text-theme-section-title mb-3",children:h.title}),e.jsx("h2",{className:"text-xl md:text-2xl text-theme-text-white-70 font-light italic",children:h.subtitle})]}),e.jsx("div",{className:"flex items-center justify-center lg:justify-end mt-8 lg:mt-0",children:e.jsxs("div",{className:"flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 border border-theme-primary/30 hover:border-theme-primary/50 transition-all duration-300 hover:scale-105 explore-map-button rounded-full backdrop-blur-sm",onClick:()=>f(!0),title:h.exploreMapTooltip,children:[e.jsx("div",{className:"text-5xl xl:text-6xl text-theme-primary mb-1 flex items-center justify-center",children:"🗺️"}),e.jsx("div",{className:"text-xs xl:text-sm text-theme-primary font-medium text-center leading-tight px-2",children:h.exploreMap})]})})]})}),e.jsx(Q,{className:"my-8",width:"w-full"}),e.jsx("div",{className:"relative z-10 backdrop-protection",children:e.jsxs("div",{className:"max-w-screen-2xl mx-auto",children:[e.jsx("div",{className:"mb-12",children:e.jsxs("div",{className:"flex flex-wrap gap-3 md:gap-4 justify-center items-center",children:[e.jsx("button",{className:`category-filter-btn bg-theme-bg-white-10 text-theme-text-white-90 border-theme-text-white-50 hover:border-theme-text-white-70 ${m==="all"?"active":""}`,onClick:()=>a("all"),children:"All"}),Object.keys(i).map(r=>{const g=z(r);return e.jsx("button",{className:`category-filter-btn ${m===r?"active":""} ${g.bg} ${g.text} ${g.border}`,onClick:()=>a(r),children:r},r)})]})}),e.jsx("div",{className:"project-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 lg:gap-8 pb-12",children:j.map((r,g)=>{var p,$;return e.jsxs("div",{className:"glass-card group cursor-pointer p-6",onClick:()=>k(r),children:[e.jsxs("div",{className:"project-image-container",children:[r.img?Array.isArray(r.img)?e.jsx("img",{src:r.img[0],alt:r.name||r.title,className:"project-image"}):e.jsx("img",{src:r.img,alt:r.name||r.title,className:"project-image"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-4xl text-theme-text-white-40 bg-gradient-to-br from-slate-600/20 to-slate-800/20",children:"�"}),(((p=r.links)==null?void 0:p.github)||r.link&&r.link.includes("github"))&&e.jsx("a",{href:(($=r.links)==null?void 0:$.github)||r.link,target:"_blank",rel:"noopener noreferrer",className:"absolute bottom-3 right-3 w-8 h-8 bg-black/80 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10",onClick:Z=>Z.stopPropagation(),children:e.jsx("svg",{className:"w-4 h-4 text-theme-text-white",fill:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})}),e.jsx("div",{className:"project-category-badge",children:r.type||"Other"}),e.jsx("div",{className:`project-status-badge ${M(r.year)}`,children:r.year||""})]}),e.jsxs("div",{className:"project-content",children:[r.location&&e.jsxs("div",{className:"project-meta text-theme-text-muted mb-3 flex items-center gap-1.5",children:[e.jsx(q,{className:"w-4 h-4 text-current flex-shrink-0"}),e.jsx("span",{className:"text-sm",children:r.location})]}),e.jsx(O,{level:3,className:"project-title leading-snug line-clamp-2",children:r.name||r.title})]})]},g)})}),e.jsx("div",{className:"text-center py-12 border-t border-theme-border-white-10 bg-black/20 backdrop-blur-sm rounded-xl mt-8",children:e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsx("p",{className:"text-theme-text-white-80 text-lg mb-3 font-medium",children:h.bottomSubtitle}),e.jsx("p",{className:"text-theme-text-white-60 text-base leading-relaxed",children:h.description})]})})]})}),e.jsx(F,{isOpen:v,onClose:()=>f(!1),language:t}),e.jsx(J,{project:N,isOpen:!!N,onClose:()=>k(null)})]})};K.propTypes={language:x.string.isRequired};export{K as default};
