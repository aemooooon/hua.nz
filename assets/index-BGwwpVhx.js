const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home-jKzHVUMs.js","assets/react-DPlU210h.js","assets/vendor-DFPT3U6w.js","assets/vendor-DSulWsr7.css","assets/three-BWRBGDf2.js","assets/gsap-CH_iu5NA.js","assets/texture-system-ByB1LV00.js","assets/home-CGmMaHBT.css","assets/projects-B3Zzd6oL.js","assets/leaflet-sq9jUChD.js","assets/leaflet-BTrKGrB8.css","assets/d3-iUjZZrhe.js","assets/projects-B3BEbutr.css","assets/gallery-DG-DX6r0.js","assets/EducationSection-DnEn_Xzh.js","assets/EducationSection-DUw_6Q_9.css","assets/ContactSection-C-rOuhOy.js","assets/ContactSection-B2ZxASnB.css","assets/about-C1f1XdVn.js"])))=>i.map(i=>d[i]);
var ut=Object.defineProperty;var mt=(a,e,t)=>e in a?ut(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var $e=(a,e,t)=>mt(a,typeof e!="symbol"?e+"":e,t);import{r as n,j as s,R as Xe,f as ft}from"./react-DPlU210h.js";import{u as Ke,a as le,w as J}from"./home-jKzHVUMs.js";import{_ as de,t as pt}from"./texture-system-ByB1LV00.js";import{P as Y,l as gt,e as wt}from"./vendor-DFPT3U6w.js";import{E as vt,d as Ee,w as bt,H as Je,g as je,W as Re,j as D,P as Ie,I as xt,J as yt,U as Ct,K as Ue,Q as St,X as Oe,M as Ne,Y as ke,Z as kt,A as Ze,D as He,e as xe,_ as jt,$ as Et,a0 as Ve,z as ye,a1 as Ye,b as Qe,a2 as et,a3 as qe,a4 as tt,a5 as st,a6 as Rt,a7 as Ge,m as rt}from"./three-BWRBGDf2.js";import{P as Lt}from"./projects-B3Zzd6oL.js";import"./gsap-CH_iu5NA.js";import"./leaflet-sq9jUChD.js";import"./d3-iUjZZrhe.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();function Se(){const a=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${a}px`),document.documentElement.style.setProperty("--vh-fallback",`${window.innerHeight}px`),CSS.supports("height","100dvh")||document.documentElement.style.setProperty("--dvh-fallback",`${window.innerHeight}px`)}function Tt(){Se();let a;if(window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(Se,100)}),screen.orientation?screen.orientation.addEventListener("change",()=>{setTimeout(Se,200)}):window.addEventListener("orientationchange",()=>{setTimeout(Se,200)}),/iPhone|iPad|iPod/.test(navigator.userAgent)){let e;window.addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(Se,150)},{passive:!0})}}function Mt(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}const Pt=["a","button","input","select","textarea","[onclick]",'[role="button"]','[role="link"]','[role="menuitem"]','[tabindex]:not([tabindex="-1"])',".clickable",".btn",".button",".cursor-pointer","summary","label",'[data-clickable="true"]'],At=["canvas","svg","img","video",".hero-cube",".effect-avatar",".lorenz-attractor",'[data-no-custom-cursor="true"]','[style*="pointer-events: none"]','[style*="pointerEvents: none"]',".h-screen.w-screen",".overflow-hidden",".background-container",".bg-container"],_t=()=>{const{getThemeColors:a}=Ke(),e=a(),{currentSection:t,getText:r}=le(),i=t===0,o=n.useCallback(()=>{if(window.innerWidth<=768)return!0;const _=navigator.userAgent.toLowerCase();return["mobile","android","iphone","ipad","ipod","blackberry","opera mini","iemobile"].some(F=>_.includes(F))||("ontouchstart"in window||navigator.maxTouchPoints>0)&&window.innerWidth<=1024?!0:Mt()},[]),c=()=>r("home.desktopScrollHint");n.useEffect(()=>{(navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows"))&&(console.log("🖱️ SmartDirectionalCursor: Windows设备检测"),console.log("📱 isMobile():",o()),console.log("🖥️ 窗口尺寸:",window.innerWidth,"x",window.innerHeight),console.log("🎯 媒体查询 hover支持:",window.matchMedia("(hover: hover)").matches),console.log("🎯 媒体查询 pointer精细:",window.matchMedia("(pointer: fine)").matches),console.log("🎯 媒体查询 hover无:",window.matchMedia("(hover: none)").matches),console.log("🎯 媒体查询 pointer粗糙:",window.matchMedia("(pointer: coarse)").matches),console.log("🔍 用户代理:",navigator.userAgent))},[o]);const[l,R]=n.useState({x:0,y:0}),[v,m]=n.useState(!1),[h,E]=n.useState("none"),[p,C]=n.useState(!1),[f,S]=n.useState(0),[b,k]=n.useState(0),[g,A]=n.useState(0),[L,x]=n.useState(0),[z,W]=n.useState(!1),[$,Ce]=n.useState(0),[G,ue]=n.useState(null),[oe,Be]=n.useState(!1),{sections:Z,isPointerLocked:se}=le(),me=n.useRef(),Q=n.useRef(0),K=n.useRef(),q=n.useRef(),ce=n.useRef(null),X=n.useRef(new WeakMap),j=n.useRef({x:-1,y:-1,result:!1,timestamp:0}),V=n.useRef({currentScrollDelta:0,animatedValue:0,isAnimatingDown:!1,scrollIntensity:0});n.useEffect(()=>{V.current={currentScrollDelta:g,animatedValue:L,isAnimatingDown:z,scrollIntensity:f}},[g,L,z,f]);const ne=n.useCallback((_,N)=>{const T=j.current,F=performance.now();if(Math.sqrt(Math.pow(_-T.x,2)+Math.pow(N-T.y,2))<10&&F-T.timestamp<50)return T.result;const u=document.elementFromPoint(_,N);if(!u)return j.current={x:_,y:N,result:!1,timestamp:F},!1;if(X.current.has(u)){const O=X.current.get(u);return j.current={x:_,y:N,result:O,timestamp:F},O}const w=Pt,P=At;if(u.hasAttribute("data-no-custom-cursor")||u.hasAttribute("data-hero-cube-canvas")||u.classList.contains("hero-cube-canvas"))return X.current.set(u,!1),!1;const M=window.getComputedStyle(u);if(M.pointerEvents==="none"||M.cursor==="none"&&(u.classList.contains("h-screen")||u.classList.contains("w-screen")||u.classList.contains("overflow-hidden")))return X.current.set(u,!1),!1;if(u.tagName.toLowerCase()==="canvas"){const O=u.parentElement;if(O&&(O.classList.contains("hero-cube")||O.hasAttribute("data-hero-cube")||O.style.pointerEvents==="none"||u.style.pointerEvents==="none"))return X.current.set(u,!1),!1}let I=!1,y=u,B=0;for(;y&&y!==document.body&&B<5;){if(P.some(H=>{try{return y.matches(H)}catch{return!1}})){I=!1;break}if(y.tagName.toLowerCase()==="div"){const H=window.getComputedStyle(y),ie=y.classList;if(H.cursor==="none"&&(ie.contains("h-screen")||ie.contains("w-screen"))){I=!1;break}const we=["h-screen","w-screen","overflow-hidden","relative","absolute","fixed"];if(Array.from(ie).every(ae=>we.includes(ae)||ae.startsWith("bg-")||ae.startsWith("backdrop-"))&&H.cursor==="none"){I=!1;break}}if(w.some(H=>{try{return y.matches(H)}catch{return!1}})){I=!0;break}if(window.getComputedStyle(y).cursor==="pointer"){const H=y.tagName.toLowerCase();if(!["canvas","svg","img","video"].includes(H)&&(y.hasAttribute("onclick")||y.hasAttribute("role")||y.hasAttribute("tabindex")||y.classList.contains("clickable")||y.classList.contains("btn")||y.classList.contains("button")||["a","button","input","select","textarea"].includes(H))){I=!0;break}}if(y.onclick||y.getAttribute("data-testid")||y.classList.contains("cursor-pointer")){I=!0;break}y=y.parentElement,B++}if(X.current.set(u,I),j.current={x:_,y:N,result:I,timestamp:performance.now()},X.current.size>100){const O=Array.from(X.current.entries());X.current.clear(),O.slice(-50).forEach(([H,ie])=>{X.current.set(H,ie)})}return I},[]),te=n.useCallback(()=>{const _=t>0,N=t<Z.length-1;return _&&N?"both":_?"up":N?"down":"none"},[t,Z.length]),ze=n.useCallback(()=>{const _=t>0,N=t<Z.length-1;ce.current||(ce.current=document.querySelector(".scroll-mode-auto"));const T=ce.current;let F=!1,d=!0,u=!0;return T&&(F=T.scrollHeight>T.clientHeight+10,d=T.scrollTop<=5,u=T.scrollTop>=T.scrollHeight-T.clientHeight-5),{isTopBoundary:!_&&(!F||d),isBottomBoundary:!N&&(!F||u),hasNowhereToGo:!_&&!N&&!F,hasContentToScroll:F}},[t,Z.length]);n.useCallback(()=>{q.current&&(cancelAnimationFrame(q.current),q.current=null),W(!0);const _=Math.abs(g);if(_===0){W(!1),x(0),A(0),S(0);return}const N=performance.now(),T=Math.min(_*2,600),F=()=>{const u=performance.now()-N,w=Math.min(u/T,1),P=1-Math.pow(1-w,4),M=Math.round(_*(1-P));x(M),w<1?q.current=requestAnimationFrame(F):(x(0),A(0),W(!1),setTimeout(()=>{S(0),ue(null),setTimeout(()=>{x(0),A(0)},100)},50),q.current=null)};q.current=requestAnimationFrame(F)},[g]),n.useEffect(()=>{E(te())},[te]);const U=n.useCallback(_=>{const N=_.deltaY,T=Math.min(Math.abs(N)/30,1),F=Math.abs(N);let d=1;F<10?d=2:F<30?d=1.5:F>100&&(d=.8);const u=Math.min(T*d,1),w=N>0?"down":"up",P=performance.now();if(P-(U.lastTime||0)<8)return;U.lastTime=P,q.current&&(cancelAnimationFrame(q.current),q.current=null),W(!1),S(u),ue(w),Ce(P);const M=Math.round(N);A(M),x(M),k(I=>{const y=I+M;return Math.max(-9999,Math.min(9999,y))}),K.current&&(clearTimeout(K.current),K.current=null),K.current=setTimeout(()=>{A(0),x(0),S(0),W(!1),K.current=null},100)},[]),re=n.useCallback(_=>{const N=performance.now();if(N-(re.lastTime||0)<16)return;re.lastTime=N;const T={x:_.clientX,y:_.clientY},F=ne(_.clientX,_.clientY);R(T),Be(F),v||m(!0)},[v,ne]),he=n.useCallback(()=>{m(!0),C(!0)},[]),ge=n.useCallback(()=>{m(!1),C(!1)},[]);n.useEffect(()=>{let _=0;const N=()=>{const T=performance.now();if(T-(N.lastTime||0)<16){me.current=requestAnimationFrame(N);return}if(N.lastTime=T,p?Q.current=Math.min(Q.current+.12,1):Q.current=Math.max(Q.current-.08,.3),T-$>50){const d=Math.max(f-.03,0);T-_>50&&d!==f&&(S(d),_=T)}me.current=requestAnimationFrame(N)};return me.current=requestAnimationFrame(N),()=>{me.current&&cancelAnimationFrame(me.current)}},[p,$,f,b]),n.useEffect(()=>{const _=document.body.style.cursor;return oe?document.body.style.cursor="auto":document.body.style.cursor="none",()=>{document.body.style.cursor=_,ce.current&&(ce.current=null),Q.current=.3}},[oe]),n.useEffect(()=>(document.addEventListener("mousemove",re),document.addEventListener("mouseenter",he),document.addEventListener("mouseleave",ge),document.addEventListener("wheel",U,{passive:!0}),()=>{document.removeEventListener("mousemove",re),document.removeEventListener("mouseenter",he),document.removeEventListener("mouseleave",ge),document.removeEventListener("wheel",U),K.current&&clearTimeout(K.current),q.current&&cancelAnimationFrame(q.current)}),[re,he,ge,U]),n.useEffect(()=>{if(!z&&g!==0&&f===0){const _=setTimeout(()=>{A(0),x(0),ue(null)},1500);return()=>clearTimeout(_)}},[z,g,f]);const Le=()=>{const N=p?1.02:1,T=133*N,F=ze(),d=F.isTopBoundary&&G==="up"&&f>0||F.isBottomBoundary&&G==="down"&&f>0||F.hasNowhereToGo&&f>0,u=ve=>{const be=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ve);return be?[parseInt(be[1],16),parseInt(be[2],16),parseInt(be[3],16)]:[255,255,255]},w=()=>d&&f>0?"#ff4444":e.primary,P=()=>d&&f>0?"#ff4444":e.accent,M=w(),I=P(),y=()=>{const ve=z?L:g;return ve===0?null:Math.abs(ve).toString()},B=()=>G==="down"?"translate3d(24px, 0, 0)":G==="up"?"translate3d(-24px, 0, 0)":"translate3d(0, 0, 0)",O=y(),H=B(),ie=O!==null&&(f>0||Math.abs(g)>0||z||Math.abs(L)>0),we=.2,Me=5,ae={width:`${T}px`,height:`${T}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",transform:"translate3d(0, 0, 0)",willChange:"transform"},Pe=(ve,be=1)=>{const Ae=256*N,ht=ve==="up"?"M12 22L12 2M10 4L12 2L14 4":"M12 2L12 22M10 20L12 22L14 20",dt=(()=>{if(f===0)return e.primary;if(d){const ee=[255,68,68],pe=[180,20,20],De=Math.round(ee[0]+(pe[0]-ee[0])*f),Fe=Math.round(ee[1]+(pe[1]-ee[1])*f),We=Math.round(ee[2]+(pe[2]-ee[2])*f);return`rgb(${De}, ${Fe}, ${We})`}else{const ee=u(e.accent),pe=u(e.secondary),De=Math.round(ee[0]+(pe[0]-ee[0])*f),Fe=Math.round(ee[1]+(pe[1]-ee[1])*f),We=Math.round(ee[2]+(pe[2]-ee[2])*f);return`rgb(${De}, ${Fe}, ${We})`}})();return s.jsx("div",{style:{position:"absolute",width:`${Ae}px`,height:`${Ae}px`,display:"flex",alignItems:"center",justifyContent:"center",opacity:be*.8,zIndex:10,transform:"translate3d(0, 0, 0)",willChange:"opacity"},children:s.jsx("svg",{width:Ae,height:Ae,viewBox:"0 0 24 24",style:{shapeRendering:"geometricPrecision",vectorEffect:"non-scaling-stroke"},children:s.jsx("path",{d:ht,stroke:dt,strokeWidth:we,strokeLinecap:"round",strokeLinejoin:"round",fill:"none",opacity:.8,style:{transition:"stroke 0.1s ease-out",willChange:"stroke"}})})})};return s.jsxs("div",{style:ae,children:[s.jsxs("svg",{width:T,height:T,style:{position:"absolute",transform:G==="up"?"rotate(90deg)":"rotate(-90deg)",transition:"transform 0.2s ease-out"},children:[s.jsx("circle",{cx:T/2,cy:T/2,r:(T-4)/2,fill:"none",stroke:M,strokeWidth:we,opacity:"0.8"}),f>0&&s.jsx("circle",{cx:T/2,cy:T/2,r:(T-4)/2,fill:"none",stroke:I,strokeWidth:Me,strokeLinecap:"round",opacity:"0.9",strokeDasharray:`${2*Math.PI*((T-4)/2)}`,strokeDashoffset:`${2*Math.PI*((T-4)/2)*(1-f)}`,style:{transition:"stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"stroke-dashoffset"}})]}),ie&&s.jsx("div",{style:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"600",fontFamily:'Monaco, "SF Mono", "Consolas", monospace',color:I,opacity:.95,zIndex:15,textShadow:`0 0 6px ${I}40`,transform:H,willChange:"opacity, transform",minWidth:"32px",textAlign:"center",transition:z?"none":"all 0.2s ease-out"},children:s.jsx("span",{className:"scroll-value",style:{transform:z?"scale(0.95)":"scale(1)",transition:"transform 0.15s ease-out"},children:O})}),h==="up"&&Pe("up"),h==="down"&&Pe("down"),h==="both"&&s.jsxs(s.Fragment,{children:[Pe("up",.7),Pe("down",.7)]}),h==="none"&&f===0&&s.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:M,opacity:.8,transform:"translate3d(0, 0, 0)"}}),s.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"var(--theme-primary)",opacity:.9,zIndex:20,transform:"translate3d(0, 0, 0)",willChange:"transform",boxShadow:"0 0 6px var(--theme-primary)"}})]})},fe=navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows");return o()||!(v||fe&&!o())?null:s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.3); opacity: 1; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }

                @keyframes gentle-pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }

                .power-cursor {
                    position: fixed;
                    pointer-events: none; /* 不阻挡鼠标事件 */
                    z-index: 9999; /* 最高层级 */
                    mix-blend-mode: screen; /* 视觉混合模式 */
                    ${se?"display: none !important;":""} /* 3D模式时隐藏 */
                }

                .power-cursor.hovering {
                    filter: brightness(1.2) contrast(1.1); /* 悬停时增强效果 */
                }

                .power-cursor.over-clickable {
                    opacity: 0.3; /* 在可点击元素上变淡 */
                    transform: translate3d(-50%, -50%, 0) scale(0.8); /* 缩小效果 */
                }

                .clickable-hint {
                    position: fixed;
                    pointer-events: none;
                    z-index: 9998;
                    width: 1rem; /* 16px */
                    height: 1rem; /* 16px */
                    border-radius: 50%;
                    background: var(--theme-primary); /* 主题色 */
                    opacity: 0.9;
                    box-shadow: 0 0 6px var(--theme-primary); /* 主题色光晕 */
                    transform: translate3d(-50%, -50%, 0);
                    ${se?"display: none !important;":""} /* 3D模式时隐藏 */
                }

                /* 移动设备适配：更精确的触摸设备检测 */
                @media (hover: none) and (pointer: coarse) and (max-width: 768px) {
                    .power-cursor, .clickable-hint {
                        display: none !important;
                    }
                }

                /* Windows兼容性：确保桌面设备始终显示光标 */
                @media (min-width: 769px) and (hover: hover) and (pointer: fine) {
                    .power-cursor, .clickable-hint {
                        display: block !important;
                    }
                }

                /* 强制显示：为Windows和其他桌面系统提供后备方案 */
                @media (min-width: 1024px) {
                    .power-cursor, .clickable-hint {
                        display: block !important;
                    }
                }

                /* 调试：强制显示在所有非移动环境 */
                .power-cursor.force-show,
                .clickable-hint.force-show {
                    display: block !important;
                }
            `}),oe&&s.jsx("div",{className:`clickable-hint ${fe?"force-show":""}`,style:{left:l.x,top:l.y}}),s.jsx("div",{className:`power-cursor ${p?"hovering":""} ${oe?"over-clickable":""} ${fe?"force-show":""}`,style:{left:l.x,top:l.y,transform:"translate3d(-50%, -50%, 0)",willChange:"transform"},children:Le()}),!o()&&i&&h==="down"&&s.jsx("div",{style:{position:"fixed",left:l.x,top:l.y-120,transform:"translate(-50%, -50%)",color:e.primary,fontSize:"14px",fontWeight:"500",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',opacity:.8,pointerEvents:"none",zIndex:9998,textShadow:`0 0 8px ${e.primary}40`,animation:"gentle-pulse 2s ease-in-out infinite",whiteSpace:"nowrap",userSelect:"none"},children:c()})]})};class Nt{constructor(e,t={},r="BackgroundCanvas"){if(this.canvas=e,this.componentId=r,this.componentId=r,this.gl=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl"),!this.gl)throw console.error("EffectFuse: Unable to get WebGL context"),new Error("WebGL not supported");this.resourceId=J.registerResources(this.componentId,{gl:this.gl,canvas:this.canvas},{persistent:!0}),this.params={brightness:1.8,blobiness:1.3,particles:16,scanlines:!1,energy:1.25,timeScale:1.1,...t},this.program=null,this.animationFrameId=null,this.startTime=performance.now(),this.uniformLocations={},this.themeColors=this.getThemeColors();try{this.initGL()}catch(i){throw console.error("EffectFuse: Failed to initialize WebGL",i),i}}initGL(){if(!this.gl){console.error("WebGL not supported.");return}this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.getExtension("OES_texture_float");const e=`
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform vec2 u_resolution;
            attribute vec2 a_position;

            void main() {
                gl_Position = vec4(a_position, 0, 1);
            }
        `,t=`
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform bool u_scanlines;
            uniform vec2 u_resolution;
            uniform float u_brightness;
            uniform float u_blobiness;
            uniform float u_particles;
            uniform float u_millis;
            uniform float u_energy;
            uniform float u_timeScale; 
            uniform vec3 u_theme_primary;     // 主题主色
            uniform vec3 u_theme_secondary;   // 主题次要色
            uniform vec3 u_theme_accent;      // 主题装饰色
            uniform vec3 u_theme_dark_blue;       // 深蓝色
            uniform vec3 u_theme_project_blue;    // 项目页面深蓝色

            float noise(vec2 co) {
                return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
            }

            void main(void) {
                vec2 position = (gl_FragCoord.xy / u_resolution.x); // 原始的正确计算方式
                float t = (u_millis * 0.001 * u_energy) * u_timeScale; 

                float a = 0.0;
                float b = 0.0;
                float c = 0.0;

                vec2 pos, center = vec2(0.5, 0.5 * (u_resolution.y / u_resolution.x)); // 原始的长宽比修正

                float na, nb, nc, nd, d;
                float limit = u_particles / 40.0;
                float step = 1.0 / u_particles;
                float n = 0.0;

                for (float i = 0.0; i <= 1.0; i += 0.025) { // 原始的更细步长
                    if (i <= limit) {
                        vec2 np = vec2(n, 1.0);

                        na = noise(np * 1.1);
                        nb = noise(np * 2.8);
                        nc = noise(np * 0.7);
                        nd = noise(np * 3.2);

                        pos = center;
                        
                        // 控制粒子运动范围，确保在可视区域内
                        // 计算基础运动偏移
                        float moveX = sin(t * na * 0.5) * cos(t * nb * 0.5) * tan(t * na * 0.08);
                        float moveY = tan(t * nc * 0.5) * sin(t * nd * 0.5);
                        
                        // 限制运动范围 - 基于屏幕比例，创建柔和边界
                        float maxRangeX = 0.35; // X轴最大运动范围
                        float maxRangeY = 0.25; // Y轴最大运动范围
                        
                        // 应用运动
                        float deltaX = moveX * 0.5;
                        float deltaY = moveY * 0.15;
                        
                        pos.x += deltaX;
                        pos.y += deltaY;
                        
                        // 软边界约束 - 使用平滑函数而不是硬性clamp
                        float edgeForceX = 0.0;
                        float edgeForceY = 0.0;
                        
                        // X轴边界力
                        if (pos.x < 0.1) edgeForceX = (0.1 - pos.x) * 2.0;
                        else if (pos.x > 0.9) edgeForceX = (0.9 - pos.x) * 2.0;
                        
                        // Y轴边界力
                        float aspectRatio = u_resolution.y / u_resolution.x;
                        float maxY = aspectRatio * 0.9;
                        if (pos.y < 0.1) edgeForceY = (0.1 - pos.y) * 2.0;
                        else if (pos.y > maxY) edgeForceY = (maxY - pos.y) * 2.0;
                        
                        // 应用边界力
                        pos.x += edgeForceX * 0.02;
                        pos.y += edgeForceY * 0.02;

                        // 改进粒子大小计算，平衡可见性和均匀性
                        float distance = length(pos - position);
                        // 适度限制噪声值，保持粒子可见性
                        float normalizedNoise = clamp(na, 0.5, 1.2); // 增加范围确保可见性
                        // 添加最小距离但不要太大
                        float safeDistance = max(distance, 0.02);
                        // 减小粒子大小三分之一：从3.5减到2.33
                        float rawSize = 2.33 * normalizedNoise / safeDistance; // 减小基础大小
                        d = pow(clamp(rawSize, 0.5, 8.0), u_blobiness * 0.9); // 放宽大小限制，增加敏感度

                        if (i < limit * 0.3333) a += d;
                        else if (i < limit * 0.6666) b += d;
                        else c += d;

                        n += step;
                    }
                }

                // 使用主题颜色给不同的粒子区域分配不同颜色，仅使用蓝绿色系，避免红色
                // 添加空间渐变来增加视觉深度
                float centerDist = length(position - center);
                float gradientFactor = 1.0 - centerDist * 0.5;
                gradientFactor = clamp(gradientFactor, 0.3, 1.0);
                
                // 使用丝滑的颜色渐变系统，兼容GLSL版本
                // 设计理念：多层三角函数插值，创造平滑过渡
                
                vec3 colorA, colorB, colorC;
                
                // 创建多层时间波形，实现丝滑过渡
                float slowTime = t * 0.03;  // 主要时间轴，非常缓慢
                float midTime = t * 0.08;   // 中等速度时间轴
                
                // 为不同粒子群创建相位偏移，增加层次感
                float phaseA = slowTime;
                float phaseB = slowTime + 2.094; // 偏移 120度 (2π/3)
                float phaseC = slowTime + 4.189; // 偏移 240度 (4π/3)
                
                // 使用多个正弦波组合创造平滑的颜色过渡
                // 每个波形控制不同颜色之间的混合权重
                float waveA = sin(phaseA) * 0.5 + 0.5;           // 0-1
                float waveB = sin(phaseA + 1.047) * 0.5 + 0.5;   // 偏移60度
                float waveC = sin(phaseA + 2.094) * 0.5 + 0.5;   // 偏移120度
                float waveD = sin(phaseA + 3.141) * 0.5 + 0.5;   // 偏移180度
                
                // 归一化权重，确保总和为1
                float totalWeight = waveA + waveB + waveC + waveD;
                waveA /= totalWeight;
                waveB /= totalWeight;
                waveC /= totalWeight;
                waveD /= totalWeight;
                
                // 定义基础颜色
                vec3 deepBlue = u_theme_dark_blue * 15.0;
                vec3 projectBlue = u_theme_project_blue * 12.0;
                vec3 primary = u_theme_primary;
                vec3 accent = u_theme_accent;
                vec3 secondary = u_theme_secondary;
                
                // 使用权重进行平滑混合
                colorA = deepBlue * waveA + projectBlue * waveB + primary * waveC + accent * waveD;
                
                // 为粒子群B和C使用不同的相位
                float waveBa = sin(phaseB) * 0.5 + 0.5;
                float waveBb = sin(phaseB + 1.047) * 0.5 + 0.5;
                float waveBc = sin(phaseB + 2.094) * 0.5 + 0.5;
                float waveBd = sin(phaseB + 3.141) * 0.5 + 0.5;
                float totalWeightB = waveBa + waveBb + waveBc + waveBd;
                waveBa /= totalWeightB;
                waveBb /= totalWeightB;
                waveBc /= totalWeightB;
                waveBd /= totalWeightB;
                
                colorB = primary * waveBa + accent * waveBb + secondary * waveBc + projectBlue * waveBd;
                
                float waveCa = sin(phaseC) * 0.5 + 0.5;
                float waveCb = sin(phaseC + 1.047) * 0.5 + 0.5;
                float waveCc = sin(phaseC + 2.094) * 0.5 + 0.5;
                float waveCd = sin(phaseC + 3.141) * 0.5 + 0.5;
                float totalWeightC = waveCa + waveCb + waveCc + waveCd;
                waveCa /= totalWeightC;
                waveCb /= totalWeightC;
                waveCc /= totalWeightC;
                waveCd /= totalWeightC;
                
                colorC = accent * waveCa + secondary * waveCb + deepBlue * waveCc + primary * waveCd;
                
                // 添加细微的呼吸效果，增强丝滑感
                float breathe = sin(midTime * 1.5) * 0.1 + 0.9;
                colorA *= breathe;
                colorB *= (breathe + 0.05);
                colorC *= (breathe + 0.1);
                
                // 简化的颜色混合，兼容所有GLSL版本，增加亮度
                vec3 col = vec3(
                    mix(colorA.r, colorB.r, 0.5) * a * gradientFactor * 0.3,  // 轻微红色分量
                    mix(colorA.g, colorB.g, 0.6) * b * gradientFactor,        // 主要绿色分量
                    mix(colorB.b, colorC.b, 0.7) * c * gradientFactor         // 主要蓝色分量
                ) * 0.012 * u_brightness; // 从0.008增加到0.012 (增加50%亮度)
                
                // 添加次级颜色层，创造更丰富的视觉效果
                col += vec3(
                    mix(colorC.r, colorA.r, 0.4) * c * 0.2 * gradientFactor,  // C-A 混合
                    mix(colorB.g, colorC.g, 0.5) * a * 0.3 * gradientFactor,  // B-C 混合
                    mix(colorA.b, colorB.b, 0.6) * b * 0.4 * gradientFactor   // A-B 混合
                ) * 0.009 * u_brightness; // 从0.006增加到0.009 (增加50%亮度)
                
                // 简化的时间调制
                float timeModulation = sin(t * 0.05) * 0.05 + 0.95;
                col *= timeModulation;
                
                // 保持颜色在合理范围内
                col = clamp(col, 0.0, 1.0);

                if (u_scanlines) {
                    col -= mod(gl_FragCoord.y, 2.0) < 1.0 ? 0.5 : 0.0;
                }

                gl_FragColor = vec4(col, 1.0);
            }
        `,r=this.createShader(this.gl.VERTEX_SHADER,e),i=this.createShader(this.gl.FRAGMENT_SHADER,t);this.program=this.createProgram(r,i),this.uniformLocations={resolution:this.gl.getUniformLocation(this.program,"u_resolution"),brightness:this.gl.getUniformLocation(this.program,"u_brightness"),blobiness:this.gl.getUniformLocation(this.program,"u_blobiness"),particles:this.gl.getUniformLocation(this.program,"u_particles"),scanlines:this.gl.getUniformLocation(this.program,"u_scanlines"),energy:this.gl.getUniformLocation(this.program,"u_energy"),millis:this.gl.getUniformLocation(this.program,"u_millis"),timeScale:this.gl.getUniformLocation(this.program,"u_timeScale"),themePrimary:this.gl.getUniformLocation(this.program,"u_theme_primary"),themeSecondary:this.gl.getUniformLocation(this.program,"u_theme_secondary"),themeAccent:this.gl.getUniformLocation(this.program,"u_theme_accent"),themeDarkBlue:this.gl.getUniformLocation(this.program,"u_theme_dark_blue"),themeProjectBlue:this.gl.getUniformLocation(this.program,"u_theme_project_blue")},this.setupBuffers()}createShader(e,t){const r=this.gl.createShader(e);return this.gl.shaderSource(r,t),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS)?r:(console.error("Shader compilation error:",this.gl.getShaderInfoLog(r)),console.error("Shader source:",t),this.gl.deleteShader(r),null)}createProgram(e,t){const r=this.gl.createProgram();return this.gl.attachShader(r,e),this.gl.attachShader(r,t),this.gl.linkProgram(r),this.gl.getProgramParameter(r,this.gl.LINK_STATUS)?r:(console.error(this.gl.getProgramInfoLog(r)),this.gl.deleteProgram(r),null)}setupBuffers(){this.positionBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW);const e=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)}start(){this.startTime=performance.now(),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.render()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null),this.gl)try{this.program&&(this.gl.deleteProgram(this.program),this.program=null),this.positionBuffer&&(this.gl.deleteBuffer(this.positionBuffer),this.positionBuffer=null)}catch(e){console.error("Error cleaning up WebGL resources:",e)}this.gl=null,this.canvas=null,this.uniformLocations={}}onResize(e,t){this.gl&&this.canvas&&(this.canvas.width=e,this.canvas.height=t,this.gl.viewport(0,0,e,t),requestAnimationFrame(()=>{this.gl&&this.render()}))}render(){if(!this.gl||!this.program||!this.params)return;this.animationFrameId=requestAnimationFrame(this.render.bind(this));const t=performance.now()-this.startTime;this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.useProgram(this.program),this.uniformLocations.resolution&&this.gl.uniform2f(this.uniformLocations.resolution,this.canvas.width,this.canvas.height),this.uniformLocations.brightness&&this.gl.uniform1f(this.uniformLocations.brightness,this.params.brightness||15e3),this.uniformLocations.blobiness&&this.gl.uniform1f(this.uniformLocations.blobiness,this.params.blobiness||2),this.uniformLocations.particles&&this.gl.uniform1f(this.uniformLocations.particles,this.params.particles||20),this.uniformLocations.scanlines&&this.gl.uniform1i(this.uniformLocations.scanlines,this.params.scanlines||!1),this.uniformLocations.energy&&this.gl.uniform1f(this.uniformLocations.energy,this.params.energy||.5),this.uniformLocations.millis&&this.gl.uniform1f(this.uniformLocations.millis,t),this.uniformLocations.timeScale&&this.gl.uniform1f(this.uniformLocations.timeScale,this.params.timeScale||.5),this.uniformLocations.themePrimary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themePrimary,this.themeColors.primary.r,this.themeColors.primary.g,this.themeColors.primary.b),this.uniformLocations.themeSecondary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeSecondary,this.themeColors.secondary.r,this.themeColors.secondary.g,this.themeColors.secondary.b),this.uniformLocations.themeAccent&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeAccent,this.themeColors.accent.r,this.themeColors.accent.g,this.themeColors.accent.b),this.uniformLocations.themeDarkBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeDarkBlue,this.themeColors.darkBlue.r,this.themeColors.darkBlue.g,this.themeColors.darkBlue.b),this.uniformLocations.themeProjectBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeProjectBlue,this.themeColors.projectBlue.r,this.themeColors.projectBlue.g,this.themeColors.projectBlue.b),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}getThemeColors(){const e=getComputedStyle(document.documentElement),t=r=>{const i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return i?{r:parseInt(i[1],16)/255,g:parseInt(i[2],16)/255,b:parseInt(i[3],16)/255}:{r:0,g:1,b:1}};try{const r=e.getPropertyValue("--theme-primary").trim()||"#00ffff",i=e.getPropertyValue("--theme-secondary").trim()||"#0080ff",o=e.getPropertyValue("--theme-accent").trim()||"#4dd0e1";return{primary:t(r),secondary:t(i),accent:t(o),darkBlue:t("#0A0A0F"),projectBlue:t("#1E40AF")}}catch(r){return console.warn("Failed to get theme colors, using defaults:",r),{primary:{r:0,g:1,b:1},secondary:{r:0,g:.5,b:1},accent:{r:.3,g:.82,b:.88},darkBlue:{r:.04,g:.04,b:.06},projectBlue:{r:.12,g:.25,b:.69}}}}}function It(a,e={},t="BackgroundCanvas"){let r,i,o,c,l,R,v=0;const h=1e3/30,E=()=>{const b=getComputedStyle(document.documentElement),k=b.getPropertyValue("--theme-primary").trim(),g=b.getPropertyValue("--theme-background").trim(),A=[g?new D(g):new D("#0A0F0D"),k?new D(k):new D("#10B981"),k?new D(k).multiplyScalar(.6):new D("#0D9488")];return c&&c.colors&&(c.colors.value=A),A},p=()=>{o=new vt(-1,1,1,-1,0,1),i=new Ee;const b=new bt(2,2);c={time:{value:1},animationSpeed:{value:e.animationSpeed||.618},colors:{value:e.colors||E()}};const k=new Je({uniforms:c,transparent:!0,vertexShader:`
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4( position, 1.0 );
                }
            `,fragmentShader:`
                varying vec2 vUv;
                uniform float time;
                uniform vec3 colors[3];

                void main() {
                    vec2 p = -1.0 + 2.0 * vUv;
                    float a = time * 40.0;
                    float d, e, f, g = 1.0 / 40.0, h, i, r, q;

                    e = 400.0 * (p.x * 0.5 + 0.5);
                    f = 400.0 * (p.y * 0.5 + 0.5);
                    i = 200.0 + sin(e * g + a / 150.0) * 20.0;
                    d = 200.0 + cos(f * g / 2.0) * 18.0 + cos(e * g) * 7.0;
                    r = sqrt(pow(abs(i - e), 2.0) + pow(abs(d - f), 2.0));
                    q = f / r;
                    e = (r * cos(q)) - a / 2.0;
                    f = (r * sin(q)) - a / 2.0;
                    d = sin(e * g) * 176.0 + sin(e * g) * 164.0 + r;
                    h = ((f + d) + a / 2.0) * g;
                    i = cos(h + r * p.x / 1.3) * (e + e + a) + cos(q * g * 6.0) * (r + h / 3.0);
                    h = sin(f * g) * 144.0 - sin(e * g) * 212.0 * p.x;
                    h = (h + (f - e) * q + sin(r - (a + h) / 7.0) * 10.0 + i / 4.0) * g;
                    i += cos(h * 2.3 * sin(a / 350.0 - q)) * 184.0 * sin(q - (r * 4.3 + a / 12.0) * g) + tan(r * g + h) * 184.0 * cos(r * g + h);
                    i = mod(i / 5.6, 256.0) / 64.0;
                    if (i < 0.0) i += 4.0;
                    if (i >= 2.0) i = 4.0 - i;
                    d = r / 350.0;
                    d += sin(d * d * 8.0) * 0.52;
                    f = (sin(a * g) + 1.0) / 2.0;

                    // Map to the provided colors
                    vec3 col = mix(colors[0], colors[1], i);
                    col = mix(col, colors[2], f);

                    gl_FragColor = vec4(col * d, 0.3);
                }
            `}),g=new je(b,k);i.add(g),r=new Re({canvas:a,antialias:!0}),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(window.innerWidth,window.innerHeight),R=J.registerResources(t,{renderer:r,scene:i,camera:o,geometry:b,material:k,mesh:g}),window.addEventListener("resize",C),f()},C=()=>{r.setSize(window.innerWidth,window.innerHeight)},f=()=>{l=requestAnimationFrame(f);const b=performance.now();b-v<h||(v=b,c.time.value=b/1e3*c.animationSpeed.value,r.render(i,o))},S=()=>{l&&cancelAnimationFrame(l),R&&J.cleanup(R),i&&i.children.forEach(b=>{b.geometry&&b.geometry.dispose(),b.material&&(Array.isArray(b.material)?b.material.forEach(k=>k.dispose()):b.material.dispose())}),r&&(r.dispose(),a!=null&&a.parentNode&&a.parentNode.removeChild(a)),window.removeEventListener("resize",C)};return p(),{stop:S,updateThemeColors:E}}class Bt{constructor(e,t={},r="BackgroundCanvas"){this.canvas=e,this.componentId=r,this.renderer=null,this.scene=null,this.camera=null,this.fireball=null,this.trailParticles=[],this.animationFrameId=null,this.time=0,this.resourceId=null,this.sigma=10,this.rho=28,this.beta=8/3,this.x=.1,this.y=0,this.z=0,this.dt=.02,this.maxParticles=999,this.fireballColor=new D("#00FF88"),this.particleColors=[new D("#10B981"),new D("#00FF88"),new D("#34D399")],setTimeout(()=>{this.updateThemeColors()},100),this.trailPositions=[],this.trailColors=[],this.particleIndex=0,this.frameCount=0,this.lastFPSCheck=performance.now(),this.currentFPS=60;try{this.init()}catch(i){throw console.error("EffectLorenzAttractor: Failed to initialize Three.js",i),i}}init(){this.scene=new Ee,this.scene.background=new D(2581),this.camera=new Ie(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.set(0,0,48),this.camera.lookAt(0,0,0),this.renderer=new Re({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.renderer.setClearColor(2581,1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.composer=new xt(this.renderer);const e=new yt(this.scene,this.camera);this.composer.addPass(e);const t=new Ct(new Ue(this.canvas.width,this.canvas.height),.8,.2,.7);this.composer.addPass(t);const r=new St;this.composer.addPass(r);const i=new Oe(1.5,32,32),o=new Ne({color:new D("#ffaa33"),transparent:!0,opacity:.9,blending:ke});this.fireball=new je(i,o),this.scene.add(this.fireball);const c=new Oe(2.5,32,32),l=new Ne({color:new D("#ff6611"),transparent:!0,opacity:.4,blending:ke,side:kt});this.halo=new je(c,l),this.scene.add(this.halo);const R=new Ze(4210752,.8);this.scene.add(R);const v=new He(16777215,1);v.position.set(50,50,50),this.scene.add(v);const m=new He(6724095,.8);m.position.set(-50,-50,50),this.scene.add(m),this.pointLight=new xe(35071,2,100),this.scene.add(this.pointLight),this.sunLight=new He(16775388,1.2),this.sunLight.position.set(80,60,40),this.sunLight.target.position.set(0,0,0),this.sunLight.castShadow=!1,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.particleGeometry=new Oe(.5,8,8),this.particleMaterial=new Ne({color:16777215,transparent:!0,opacity:1,blending:ke,depthWrite:!1}),this.createParticleTexture(),this.instancedMesh=new jt(this.particleGeometry,this.particleMaterial,this.maxParticles),this.instancedMesh.geometry.attributes.color===void 0&&(this.instancedMesh.instanceColor=new Et(new Float32Array(this.maxParticles*3),3)),this.scene.add(this.instancedMesh);const h=new Ve,E=new ye,p=new ye(0,0,0);this.colorInside=new D("#ffa575"),this.colorOutside=new D("#0088ff");for(let C=0;C<this.maxParticles;C++)h.compose(E,new Ye,p),this.instancedMesh.setMatrixAt(C,h),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(C,new D(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),window.addEventListener("resize",this.onResize.bind(this))}createParticleTexture(){const t=document.createElement("canvas");t.width=16,t.height=16;const r=t.getContext("2d"),i=16/2,o=r.createRadialGradient(i,i,0,i,i,i);o.addColorStop(0,"rgba(255, 255, 255, 0.6)"),o.addColorStop(.1,"rgba(255, 255, 255, 0.3)"),o.addColorStop(.3,"rgba(255, 255, 255, 0.1)"),o.addColorStop(1,"rgba(255, 255, 255, 0)"),r.fillStyle=o,r.beginPath(),r.arc(i,i,i*.8,0,Math.PI*2),r.fill(),this.particleTexture=new Qe(t)}getRandomParticleColor(){const e=Math.floor(Math.random()*this.particleColors.length);return this.particleColors[e]}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.frameCount++;const e=performance.now();e-this.lastFPSCheck>=1e3&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,this.currentFPS<30&&this.maxParticles>1e3?this.maxParticles=Math.max(1e3,this.maxParticles-100):this.currentFPS>50&&this.maxParticles<2e3&&(this.maxParticles=Math.min(2e3,this.maxParticles+50))),this.time+=.025;const t=this.sigma*(this.y-this.x)*this.dt,r=(this.x*(this.rho-this.z)-this.y)*this.dt,i=(this.x*this.y-this.beta*this.z)*this.dt;this.x+=t,this.y+=r,this.z+=i;const o=.8;this.fireball.position.set(this.x*o,this.y*o,this.z*o),this.halo.position.copy(this.fireball.position),this.halo.scale.setScalar(1+Math.sin(this.time*2)*.1),this.pointLight.position.copy(this.fireball.position),this.frameCount%2===0&&(this.trailPositions.push({x:this.x*o,y:this.y*o,z:this.z*o,life:1}),this.trailPositions.length>this.maxParticles&&this.trailPositions.shift());const c=new Ve,l=new ye,R=new Ye,v=new ye;this.trailPositions.forEach((m,h)=>{const E=h/this.trailPositions.length,p=Math.sqrt(m.x*m.x+m.y*m.y+m.z*m.z),f=Math.min(p/40,1),S=(1-f*.5)*E*1.2+.3;if(l.set(m.x+(Math.random()-.5)*.08,m.y+(Math.random()-.5)*.08,m.z+(Math.random()-.5)*.08),v.set(S,S,S),c.compose(l,R,v),this.instancedMesh.setMatrixAt(h,c),this.instancedMesh.instanceColor){const b=Math.pow(1-f,2),k=new D;k.lerpColors(this.colorOutside,this.colorInside,b);const g=E*(1-f*.3);k.multiplyScalar(g),this.instancedMesh.setColorAt(h,k)}});for(let m=this.trailPositions.length;m<this.maxParticles;m++)v.set(0,0,0),c.compose(l,R,v),this.instancedMesh.setMatrixAt(m,c),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(m,new D(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),this.scene.rotation.y+=.005,this.scene.rotation.x+=.002,this.composer.render()}onResize(e,t){if(!this.renderer||!this.camera)return;const r=e||this.canvas.width,i=t||this.canvas.height;this.camera.aspect=r/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(r,i,!1),this.composer&&this.composer.setSize(r,i)}updateThemeColors(){var e,t,r,i;if(!document.documentElement){console.warn("DOM not ready for theme color update");return}try{const o=getComputedStyle(document.documentElement),c=(e=o.getPropertyValue("--theme-primary"))==null?void 0:e.trim(),l=(t=o.getPropertyValue("--theme-secondary"))==null?void 0:t.trim(),R=(r=o.getPropertyValue("--theme-accent"))==null?void 0:r.trim();c&&(this.fireballColor.setStyle(c),this.particleColors[1].setStyle(c),this.colorOutside.setStyle(c)),l&&(this.particleColors[0].setStyle(l),this.colorInside.setStyle(l)),R&&this.particleColors[2].setStyle(R);const v=(i=o.getPropertyValue("--theme-background"))==null?void 0:i.trim();v&&this.scene&&(this.scene.background=new D(v),this.renderer&&this.renderer.setClearColor(new D(v),1)),this.fireball&&c&&this.fireball.material.color.setStyle(c),this.halo&&l&&this.halo.material.color.setStyle(l),this.pointLight&&c&&this.pointLight.color.setStyle(c),this.instancedMesh&&this.updateParticleColors()}catch(o){console.warn("Error updating theme colors:",o)}}updateParticleColors(){if(!this.instancedMesh||!this.instancedMesh.instanceColor)return;const e=this.instancedMesh.instanceColor.array;for(let t=0;t<this.trailPositions.length&&!(t>=this.maxParticles);t++){const r=t*3,i=this.trailPositions[t],o=this.colorInside.clone();o.lerp(this.colorOutside,1-i.life),e[r]=o.r,e[r+1]=o.g,e[r+2]=o.b}this.instancedMesh.instanceColor.needsUpdate=!0}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.composer&&(this.composer.dispose(),this.composer=null),this.renderer){const e=this.renderer.getContext();e&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").loseContext(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer=null}for(this.instancedMesh&&(this.scene.remove(this.instancedMesh),this.instancedMesh.geometry&&this.instancedMesh.geometry.dispose(),this.instancedMesh.material&&this.instancedMesh.material.dispose(),this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor=null),this.instancedMesh=null),this.fireball&&(this.scene.remove(this.fireball),this.fireball.geometry&&this.fireball.geometry.dispose(),this.fireball.material&&this.fireball.material.dispose(),this.fireball=null),this.halo&&(this.scene.remove(this.halo),this.halo.geometry&&this.halo.geometry.dispose(),this.halo.material&&this.halo.material.dispose(),this.halo=null),this.particleGeometry&&(this.particleGeometry.dispose(),this.particleGeometry=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.particleTexture&&(this.particleTexture.dispose(),this.particleTexture=null),this.trailPositions=[],this.trailColors=[],this.pointLight&&(this.scene.remove(this.pointLight),this.pointLight=null),this.sunLight&&(this.scene.remove(this.sunLight),this.scene.remove(this.sunLight.target),this.sunLight=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null),window.removeEventListener("resize",this.onResize.bind(this))}}class zt{constructor(e,t={},r="BackgroundCanvas"){this.canvas=e,this.componentId=r,this.renderer=null,this.scene=null,this.camera=null,this.mesh=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.particleCount=t.particleCount||8e3,this.branches=3,this.radius=9,this.size=t.size||.12,this.colorInside=new D("#10B981"),this.colorOutside=new D("#34D399"),this.updateThemeColors();try{this.init()}catch(i){throw console.error("EffectChaos: Failed to initialize Three.js",i),i}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),r=e.getPropertyValue("--theme-accent").trim();t&&this.colorInside.setStyle(t),r&&this.colorOutside.setStyle(r);const i=e.getPropertyValue("--theme-background").trim();i&&this.scene&&(this.scene.background=new D(i)),this.mesh&&this.updateParticleColors(),this.updateLightColors()}updateLightColors(){this.lights&&(this.lights.central&&this.lights.central.color.copy(this.colorInside.clone().multiplyScalar(1.5)),this.lights.green&&this.lights.green.color.copy(this.colorInside),this.lights.ambient&&this.lights.ambient.color.copy(this.colorInside.clone().multiplyScalar(.3)),this.lights.fill1&&this.lights.fill1.color.copy(this.colorInside),this.lights.fill2&&this.lights.fill2.color.copy(this.colorOutside),this.lights.back&&this.lights.back.color.copy(this.colorOutside.clone().multiplyScalar(1.2)))}updateParticleColors(){if(!this.mesh||!this.particleData)return;const e=this.mesh.geometry.attributes.color.array;for(let t=0;t<this.particleCount;t++){const r=this.particleData[t],i=t*3,o=this.colorInside.clone();o.lerp(this.colorOutside,r.radiusRatio),e[i]=o.r,e[i+1]=o.g,e[i+2]=o.b}this.mesh.geometry.attributes.color.needsUpdate=!0}init(){this.camera=new Ie(60,this.canvas.width/this.canvas.height,.1,100),this.camera.position.set(0,2,8),this.camera.lookAt(0,-2,0),this.scene=new Ee,this.scene.background=new D(0),this.renderer=new Re({canvas:this.canvas,antialias:!1,powerPreference:"low-power",precision:"mediump"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.canvas.addEventListener("webglcontextlost",this.onContextLost.bind(this)),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored.bind(this)),this.createGalaxy(),window.addEventListener("resize",this.onResize.bind(this))}createGalaxy(){const e=new et;this.positions=new Float32Array(this.particleCount*3),this.colors=new Float32Array(this.particleCount*3),this.particleData=[];for(let h=0;h<this.particleCount;h++){const E=Math.random(),p=Math.pow(E,1.5)*this.radius,f=Math.random()*Math.PI*2,S=Math.pow(Math.random()*2-1,3)*E*.2,b=Math.pow(Math.random()*2-1,3)*E*.05,k=Math.pow(Math.random()*2-1,3)*E*.2;this.particleData.push({radiusRatio:E,radius:p,branchAngle:f,randomX:S,randomY:b,randomZ:k});const g=Math.pow(1-E,2),A=this.colorInside.clone();A.lerp(this.colorOutside,1-g);const L=h*3;this.colors[L]=A.r,this.colors[L+1]=A.g,this.colors[L+2]=A.b}e.setAttribute("position",new qe(this.positions,3)),e.setAttribute("color",new qe(this.colors,3));const t=document.createElement("canvas");t.width=64,t.height=64;const r=t.getContext("2d"),i=r.createRadialGradient(32,32,0,32,32,32);i.addColorStop(0,"rgba(255, 255, 255, 1)"),i.addColorStop(.2,"rgba(255, 255, 255, 1)"),i.addColorStop(.4,"rgba(255, 255, 255, 0.8)"),i.addColorStop(1,"rgba(255, 255, 255, 0)"),r.fillStyle=i,r.fillRect(0,0,64,64);const o=new Qe(t),c=new tt({size:this.size*2,sizeAttenuation:!0,depthWrite:!1,blending:ke,vertexColors:!0,transparent:!0,opacity:.9,map:o,alphaTest:.05});this.mesh=new st(e,c),this.scene.add(this.mesh),this.updatePositions(),this.centralLight=new xe(this.colorInside.clone().multiplyScalar(1.5),2.5,40),this.centralLight.position.set(0,-1,0),this.scene.add(this.centralLight);const l=new xe(this.colorInside,1.8,35);l.position.set(0,-1,0),this.scene.add(l),this.ambientLight=new Ze(this.colorInside.clone().multiplyScalar(.3),.4),this.scene.add(this.ambientLight);const R=new xe(this.colorInside,1.2,25);R.position.set(-5,0,5),this.scene.add(R);const v=new xe(this.colorOutside,1.2,25);v.position.set(5,0,5),this.scene.add(v);const m=new xe(this.colorOutside.clone().multiplyScalar(1.2),.8,50);m.position.set(0,2,-10),this.scene.add(m),this.lights={central:this.centralLight,green:l,ambient:this.ambientLight,fill1:R,fill2:v,back:m}}updatePositions(){for(let e=0;e<this.particleCount;e++){const t=this.particleData[e],r=e*3,i=t.branchAngle+this.time*(1-t.radiusRatio),o=Math.cos(i)*t.radius,c=Math.sin(i)*t.radius,l=-Math.abs(t.radius*.3);this.positions[r]=o+t.randomX,this.positions[r+1]=l+t.randomY-2,this.positions[r+2]=c+t.randomZ}this.mesh.geometry.attributes.position.needsUpdate=!0}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.008,this.updatePositions(),this.renderer.render(this.scene,this.camera)}onResize(e,t){if(!this.renderer||!this.camera)return;const r=e||this.canvas.width,i=t||this.canvas.height;this.camera.aspect=r/i,this.camera.updateProjectionMatrix(),this.renderer.setSize(r,i,!1)}onContextLost(e){e.preventDefault(),console.warn("WebGL context lost. Attempting to restore..."),this.animationId=null,this.contextLost=!0}onContextRestored(){this.init(),this.start()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.mesh&&this.scene&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null),this.scene&&this.scene.children)for(;this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,window.removeEventListener("resize",this.onResize.bind(this))}cleanup(){for(this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}}destroy(){this.stop(),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null)}}const Dt=`
    uniform float time;
    uniform vec2 center;
    uniform float waveRadius;
    uniform float maxRadius;
    
    varying vec2 vUv;
    varying float vDistance;
    varying float vWaveIntensity;
    
    void main() {
        vUv = uv;
        
        // 计算到波源中心的距离
        vec2 pos = position.xy;
        vDistance = distance(pos, center);
        
        // 计算波纹强度（基于距离和半径）
        float distanceFromWave = abs(vDistance - waveRadius);
        vWaveIntensity = 1.0 - smoothstep(0.0, 25.0, distanceFromWave); // 增加平滑范围
        
        // 添加更柔和的Z轴波动（减慢速度）
        vec3 newPosition = position;
        if (vWaveIntensity > 0.1) {
            // 多层3D波动效果，速度更慢
            float ripple1 = sin(vDistance * 0.08 - time * 1.2) * vWaveIntensity * 1.5;
            float ripple2 = sin(vDistance * 0.12 + time * 0.8) * vWaveIntensity * 1.0;
            float ripple3 = cos(vDistance * 0.15 - time * 1.5) * vWaveIntensity * 0.8;
            
            // 组合多层波动
            float combinedRipple = ripple1 + ripple2 + ripple3;
            newPosition.z += combinedRipple;
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`,Ft=`
    uniform float time;
    uniform vec3 primaryColor;
    uniform vec3 accentColor;
    uniform float opacity;
    uniform float waveRadius;
    uniform float maxRadius;
    uniform vec2 center;
    
    varying vec2 vUv;
    varying float vDistance;
    varying float vWaveIntensity;
    
    void main() {
        // 基础波纹透明度
        float baseAlpha = opacity * vWaveIntensity;
        
        // 创建5层波纹效果（原来3层，新增2层）
        float wave1 = sin(vDistance * 0.03 - time * 1.5) * 0.5 + 0.5;  // 最慢的大波纹
        float wave2 = sin(vDistance * 0.05 - time * 2.0) * 0.4 + 0.6;  // 减慢速度
        float wave3 = sin(vDistance * 0.08 + time * 1.2) * 0.3 + 0.7;  // 减慢速度
        float wave4 = sin(vDistance * 0.12 - time * 2.5) * 0.25 + 0.75; // 新增层次
        float wave5 = sin(vDistance * 0.15 + time * 1.8) * 0.2 + 0.8;   // 新增层次
        
        // 组合所有波纹层次
        float combinedWave = wave1 * wave2 * wave3 * wave4 * wave5;
        
        // 添加更复杂的干涉模式
        float interference1 = sin(vDistance * 0.06 - time * 1.0) * 0.15 + 0.85;
        float interference2 = cos(vDistance * 0.09 + time * 0.8) * 0.1 + 0.9;
        combinedWave *= interference1 * interference2;
        
        // 创建颜色渐变（减慢颜色变化速度）
        float progress = vDistance / maxRadius;
        vec3 waveColor = mix(primaryColor, accentColor, progress);
        
        // 添加彩虹色彩变化（减慢变化速度）
        float hueShift = sin(vDistance * 0.015 + time * 0.5) * 0.25; // 减慢色彩变化
        waveColor.r += hueShift;
        waveColor.g += sin(hueShift + 2.094) * 0.25; // 120度相位差
        waveColor.b += sin(hueShift + 4.188) * 0.25; // 240度相位差
        
        // 边缘发光效果
        float edgeGlow = 1.0 - smoothstep(0.8, 1.0, vWaveIntensity);
        waveColor += vec3(edgeGlow * 0.3);
        
        // 闪烁效果（减慢闪烁速度）
        float sparkle = sin(vDistance * 0.08 + time * 4.0) * 0.08 + 0.92; // 减慢闪烁
        
        // 添加缓慢的整体脉动
        float globalPulse = sin(time * 0.6) * 0.1 + 0.9;
        
        // 最终透明度计算
        float finalAlpha = baseAlpha * combinedWave * sparkle * globalPulse;
        finalAlpha = clamp(finalAlpha, 0.0, 0.7); // 降低最大透明度避免过亮
        
        gl_FragColor = vec4(waveColor, finalAlpha);
    }
`;class _e{constructor(e,t={},r="BackgroundCanvas"){this.canvas=e,this.componentId=r,this.renderer=null,this.scene=null,this.camera=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.waveSourceCount=t.waveSourceCount||6,this.maxRings=t.maxRings||8,this.waveSpeed=t.waveSpeed||1.2,this.ringSpacing=t.ringSpacing||45,this.maxRadius=t.maxRadius||400,this.waveColor=new D("#00ffff"),this.sourceColor=new D("#4dd0e1"),this.waveSources=[],this.waveRings=[],this.sourceGeometry=null,this.ringGeometries=[],this.sourceMaterial=null,this.ringMaterials=[],this.sourcePoints=null,this.ringMeshes=[],this.mouse=new Ue,this.lastRippleTime=0,this.rippleInterval=2e3,this.updateThemeColors();try{this.init()}catch(i){throw console.error("EffectRippleWaves: Failed to initialize Three.js",i),i}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),r=e.getPropertyValue("--theme-accent").trim();t&&this.waveColor.setStyle(t),r&&this.sourceColor.setStyle(r),this.sourceMaterial&&this.sourceMaterial.color.copy(this.sourceColor),this.ringMeshes.forEach(i=>{i.userData.isShaderRipple&&i.material.uniforms?(i.material.uniforms.primaryColor.value.copy(this.waveColor),i.material.uniforms.accentColor.value.copy(this.sourceColor)):i.material.color&&i.material.color.copy(this.waveColor)})}init(){this.camera=new Ie(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.z=400,this.scene=new Ee,this.scene.background=new D(0),this.renderer=new Re({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.createWaveSources(),this.setupMouseInteraction(),setTimeout(()=>{this.waveSources.forEach((e,t)=>{setTimeout(()=>{this.createRipple(t,e.position)},t*300)})},100),window.addEventListener("resize",this.onResize.bind(this)),this.animate()}createWaveSources(){this.sourceGeometry=new et,this.sourceMaterial=new tt({color:this.sourceColor,size:10,transparent:!0,opacity:0,sizeAttenuation:!0});const e=[];for(let t=0;t<this.waveSourceCount;t++){const r=t/this.waveSourceCount*Math.PI*2,i=100+Math.random()*50,o={position:new ye(Math.cos(r)*i,Math.sin(r)*i,0),lastWaveTime:Date.now()+t*400,waveInterval:1800+Math.random()*600,pulsePhase:Math.random()*Math.PI*2,waves:[]};this.waveSources.push(o),e.push(o.position.x,o.position.y,o.position.z)}this.sourceGeometry.setAttribute("position",new Rt(e,3)),this.sourcePoints=new st(this.sourceGeometry,this.sourceMaterial)}createRipple(e,t){const r=this.waveSources[e],i={sourceIndex:e,position:t.clone(),radius:0,maxRadius:this.maxRadius,speed:this.waveSpeed,opacity:1,creationTime:Date.now(),startTime:this.time};r.waves.push(i);const o=new Ge(0,this.maxRadius,64,1),c=new Je({uniforms:{time:{value:this.time},center:{value:new Ue(t.x,t.y)},waveRadius:{value:0},maxRadius:{value:this.maxRadius},primaryColor:{value:this.waveColor.clone()},accentColor:{value:this.sourceColor.clone()},opacity:{value:1}},vertexShader:Dt,fragmentShader:Ft,transparent:!0,side:rt,blending:ke,depthWrite:!1}),l=new je(o,c);return l.position.copy(t),l.userData={wave:i,sourceIndex:e,isShaderRipple:!0},this.scene.add(l),this.ringMeshes.push(l),i}setupMouseInteraction(){const e=r=>{const i=this.canvas.getBoundingClientRect();this.mouse.x=(r.clientX-i.left)/i.width*2-1,this.mouse.y=-((r.clientY-i.top)/i.height)*2+1},t=r=>{e(r);const i=new ye(this.mouse.x*300,this.mouse.y*200,0);let o=0,c=1/0;this.waveSources.forEach((l,R)=>{const v=l.position.distanceTo(i);v<c&&(c=v,o=R)}),this.createRipple(o,i)};this.canvas.addEventListener("click",t),window.addEventListener("mousemove",e)}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.016;const e=Date.now();this.updateWaveSources(),this.generateAutoRipples(e),this.updateRipples(),this.cleanupExpiredRipples(),this.renderer.render(this.scene,this.camera)}updateWaveSources(){for(let e=0;e<this.waveSources.length;e++){const t=this.waveSources[e];t.pulsePhase+=.03}}generateAutoRipples(e){if(this.waveSources.forEach((t,r)=>{e-t.lastWaveTime>t.waveInterval&&(this.createRipple(r,t.position),t.lastWaveTime=e,t.waveInterval=1800+Math.random()*600)}),this.ringMeshes.length===0&&e>this.time*1e3+1e3){const t=Math.floor(Math.random()*this.waveSources.length);this.createRipple(t,this.waveSources[t].position)}}updateRipples(){this.ringMeshes.forEach(e=>{const t=e.userData.wave;if(!t)return;t.radius+=t.speed;const r=t.radius/t.maxRadius;if(t.opacity=Math.max(0,Math.sin((1-r)*Math.PI*.5)),e.userData.isShaderRipple&&e.material.uniforms){const i=e.material.uniforms;i.time.value=this.time,i.waveRadius.value=t.radius,i.opacity.value=t.opacity,i.primaryColor.value.copy(this.waveColor),i.accentColor.value.copy(this.sourceColor);const c=(this.time-t.startTime)*.5%(Math.PI*2)/(Math.PI*2),l=new D().setHSL(c,.8,.6);i.accentColor.value.lerp(l,.3)}else{const i=Math.max(0,t.radius-3),o=t.radius;e.geometry.dispose(),e.geometry=new Ge(i,o,32),e.material.opacity=t.opacity*.3}this.calculateInterference(t,e)})}calculateInterference(e,t){let r=0;if(this.ringMeshes.forEach(i=>{if(i===t)return;const o=i.userData.wave;if(!o)return;const c=e.position.distanceTo(o.position);Math.abs(e.radius-o.radius)<15&&c<e.radius+o.radius&&(r+=.4)}),t.userData.isShaderRipple&&t.material.uniforms){const i=t.material.uniforms.opacity.value;if(t.material.uniforms.opacity.value=Math.min(1,i+r),r>0){const o=this.waveColor.clone().multiplyScalar(1+r*.5);t.material.uniforms.primaryColor.value.lerp(o,.3)}}else t.material.opacity=Math.min(.8,t.material.opacity+r)}cleanupExpiredRipples(){for(let e=this.ringMeshes.length-1;e>=0;e--){const t=this.ringMeshes[e],r=t.userData.wave;if((!r||r.radius>r.maxRadius)&&(this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose(),this.ringMeshes.splice(e,1),r.sourceIndex!==void 0)){const i=this.waveSources[r.sourceIndex],o=i.waves.indexOf(r);o>-1&&i.waves.splice(o,1)}}}onResize(){!this.camera||!this.renderer||(this.camera.aspect=this.canvas.width/this.canvas.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.canvas.width,this.canvas.height,!1))}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),window.removeEventListener("resize",this.onResize.bind(this)),this.ringMeshes.forEach(e=>{this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(e.material.uniforms&&Object.values(e.material.uniforms).forEach(t=>{t.value&&t.value.dispose&&t.value.dispose()}),e.material.dispose())}),this.sourceGeometry&&this.sourceGeometry.dispose(),this.sourceMaterial&&this.sourceMaterial.dispose(),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null)}destroy(){this.stop()}}const it=({effectType:a="effectfuse",sectionName:e="unknown"})=>{const t=n.useRef(null),r=n.useRef(null),i=n.useRef(null),o=n.useRef(null),c=le(l=>l.theme);return n.useEffect(()=>{i.current&&(clearTimeout(i.current),i.current=null);let l=t.current;if(!l){l=document.createElement("canvas"),l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.zIndex="-1",l.style.pointerEvents="none",l.style.background="transparent";const h=window.innerWidth,E=window.innerHeight,p=1280,C=720,f=h/E;let S,b;f>p/C?(S=Math.min(p,h),b=Math.floor(S/f)):(b=Math.min(C,E),S=Math.floor(b*f)),S=Math.max(S,800),b=Math.max(b,600),l.width=S,l.height=b,document.body.appendChild(l),t.current=l}const R=()=>{var h;if(l)try{const E=window.innerWidth,p=window.innerHeight,C=1280,f=720,S=E/p;let b,k;S>C/f?(b=Math.min(C,E),k=Math.floor(b/S)):(k=Math.min(f,p),b=Math.floor(k*S)),b=Math.max(b,800),k=Math.max(k,600),l.width=b,l.height=k,(h=r.current)!=null&&h.onResize&&r.current.onResize(l.width,l.height)}catch(E){console.error("Error resizing canvas:",E)}};R(),(()=>{var E,p;if(r.current){const C=r.current;r.current=null,i.current=setTimeout(()=>{try{typeof C.stop=="function"?C.stop():typeof C.destroy=="function"&&C.destroy()}catch{}},200)}const h={brightness:.6,blobiness:1.5,particles:10,scanlines:!1,energy:1.01,timeScale:1};try{const C=`BackgroundCanvas_${e}`;switch(a){case"effectfuse":{r.current=new Nt(l,h,C);break}case"effectmonjori":r.current=It(l,h,C);break;case"effectheartbeats":r.current=new _e(l,h,C);break;case"effectlorenz":{r.current=new Bt(l,h,C);break}case"effectchaos":{const f={particleCount:2e3,branches:3,radius:9,spin:1,randomness:.15,randomnessPower:3,size:.12,colorInside:h.colorInside||"#fff8dc",colorOutside:h.colorOutside||"#ffa575"};r.current=new zt(l,f,C);break}case"effectripple":{const f={waveSourceCount:6,maxRings:8,waveSpeed:1.2,ringSpacing:45,maxRadius:400};r.current=new _e(l,f,C);break}default:r.current=new _e(l,h,C)}(E=r.current)!=null&&E.start&&r.current.start(),o.current=J.registerResources(C,{canvas:l,effect:r.current,effectType:a},{persistent:!1})}catch(C){if(console.error("Error creating background effect:",C),a==="effectfuse"||a==="effectlorenz"||a==="effectchaos")try{r.current=new _e(l,h),(p=r.current)!=null&&p.start&&r.current.start()}catch(f){console.error("Error creating fallback effect:",f),r.current=null}else r.current=null}})();const m=gt.debounce(R,250);return window.addEventListener("resize",m),()=>{if(window.removeEventListener("resize",m),i.current&&(clearTimeout(i.current),i.current=null),r.current)try{typeof r.current.stop=="function"?r.current.stop():typeof r.current.destroy=="function"&&r.current.destroy()}catch(h){console.error("Error cleaning up effect:",h)}finally{r.current=null}if(o.current?(J.cleanup(o.current),o.current=null):J.cleanupByComponent(`BackgroundCanvas_${e}`),l&&document.body.contains(l))try{document.body.removeChild(l)}catch(h){console.error("Error removing canvas:",h)}t.current=null,typeof window<"u"&&window.gc&&setTimeout(()=>window.gc(),100)}},[a,e]),n.useEffect(()=>{const l=["effectchaos","effectlorenz","effectmonjori","effectripple"];r.current&&r.current.updateThemeColors&&l.includes(a)&&r.current.updateThemeColors()},[c,a]),null};it.propTypes={effectType:Y.string,sectionName:Y.string};const Wt=n.lazy(()=>de(()=>import("./home-jKzHVUMs.js").then(a=>a.H),__vite__mapDeps([0,1,2,3,4,5,6,7]))),Ot=n.lazy(()=>de(()=>import("./projects-B3Zzd6oL.js").then(a=>a.a),__vite__mapDeps([8,1,2,3,9,10,0,4,5,6,7,11,12]))),Ht=n.lazy(()=>de(()=>import("./gallery-DG-DX6r0.js"),__vite__mapDeps([13,1,2,3,4,0,5,6,7,8,9,10,11,12]))),Ut=n.lazy(()=>de(()=>import("./EducationSection-DnEn_Xzh.js"),__vite__mapDeps([14,1,2,3,0,4,5,6,7,8,9,10,11,12,15]))),Gt=n.lazy(()=>de(()=>import("./ContactSection-C-rOuhOy.js"),__vite__mapDeps([16,1,2,3,0,4,5,6,7,8,9,10,11,12,17]))),$t=n.lazy(()=>de(()=>import("./about-C1f1XdVn.js"),__vite__mapDeps([18,6,4,2,1,3,0,5,7]))),Vt=()=>{const{currentSection:a,sections:e,navigateToSection:t,navigateNext:r,navigatePrev:i,isScrolling:o,getCurrentSectionData:c,language:l,enableOpeningAnimation:R,isProjectModalOpen:v}=le(),m={DESKTOP_THRESHOLD:600,MOBILE_THRESHOLD:200,RESET_TIME:256,PREVIEW_MAX_OFFSET:80,BOUNDARY_THRESHOLD:50,BOUNCE_MAX_OFFSET:30,LONG_CONTENT_SECTIONS:["projects","education","about","contact","gallery"]},{DESKTOP_THRESHOLD:h,MOBILE_THRESHOLD:E,RESET_TIME:p,PREVIEW_MAX_OFFSET:C,BOUNDARY_THRESHOLD:f,BOUNCE_MAX_OFFSET:S,LONG_CONTENT_SECTIONS:b}=m,k=n.useRef(null),g=n.useRef(null),A=n.useRef(0),L=n.useRef(0),x=n.useRef(),z=n.useRef({x:0,y:0,time:0}),W=n.useRef(0),[$,Ce]=n.useState("slide"),[G,ue]=n.useState(!1),[oe,Be]=n.useState({}),[Z,se]=n.useState(!1),[me,Q]=n.useState(0),[K,q]=n.useState(!1),[ce,X]=n.useState("none"),j=c(),V=(j==null?void 0:j.id)==="home",ne=b.includes(j==null?void 0:j.id);n.useEffect(()=>{if(j!=null&&j.id){const d=j.id,u=setTimeout(()=>{J.cleanupOtherSections(`BackgroundCanvas_${d}`,["HeroCube"])},3e3);return()=>clearTimeout(u)}},[j==null?void 0:j.id]);const te=n.useCallback(d=>{if(!d)return{isAtTop:!1,isAtBottom:!1,currentScrollTop:0,maxScrollTop:0};const u=d.scrollTop,w=d.scrollHeight-d.clientHeight;return{isAtTop:u<=f,isAtBottom:u>=w-f,currentScrollTop:u,maxScrollTop:w}},[f]),ze=n.useMemo(()=>({home:Wt,about:$t,projects:Ot,gallery:Ht,education:Ut,contact:Gt}),[]),U=n.useCallback(()=>{if(!g.current)return;const d=g.current,u=d.getBoundingClientRect(),w=d.scrollHeight>u.height+10,P=navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows"),M=window.innerWidth<768;P&&!M&&ne&&!w&&requestAnimationFrame(()=>{setTimeout(()=>{if(g.current){const y=g.current.getBoundingClientRect(),B=g.current.scrollHeight>y.height+10;console.log("🪟 Windows延迟检测结果:",{scrollHeight:g.current.scrollHeight,containerHeight:y.height,isOverflowing:B}),ue(B),Ce(V?"slide":B?"content":"slide")}},200)}),M&&ne&&!w&&setTimeout(()=>{if(g.current){const y=g.current.getBoundingClientRect(),B=g.current.scrollHeight>y.height+10;ue(B),Ce(V?"slide":B?"content":"slide")}},500),ne&&console.log("📏 内容溢出检测:",{section:j==null?void 0:j.id,scrollHeight:d.scrollHeight,containerHeight:u.height,isOverflowing:w,isWindows:P,isMobile:M}),ue(w),Ce(V?"slide":w?"content":"slide")},[V,ne,j==null?void 0:j.id]),re=n.useCallback((d,u=.5)=>{x.current&&clearTimeout(x.current),X(d),q(!0);const w=Math.min(u*S,S),P=d==="up"?-w:w;Q(P),se(!0),x.current=setTimeout(()=>{se(!1),Q(0),setTimeout(()=>{q(!1),X("none")},300)},150)},[S]),he=n.useCallback(()=>{x.current&&clearTimeout(x.current),x.current=setTimeout(()=>{Z&&L.current<h&&(se(!1),Q(0),L.current=0)},150)},[Z,h]),ge=n.useCallback(d=>{if($!=="content"){const u=d.deltaY>0?1:-1,w=u>0&&a>=e.length-1,P=u<0&&a<=0;let M=1;(w||P)&&(M=.5);const I=Math.min(L.current/h,1),y=w||P?15:C,B=u*I*y*M;if(Z||se(!0),Q(B),w||P){const O=Math.min(L.current/h,1),H=w?"down":"up";return x.current&&clearTimeout(x.current),x.current=setTimeout(()=>{re(H,O)},100),!0}else return he(),!1}return!1},[$,a,e.length,Z,he,re,h,C]),Le=n.useCallback(()=>{if(L.current=0,se(!1),Q(0),q(!1),X("none"),x.current&&clearTimeout(x.current),g.current){const d=j==null?void 0:j.id;if(d==="home"){const w=g.current;w.style.transform="translateY(0)",w.style.transition="none",w.scrollTop=0,requestAnimationFrame(()=>{w&&(w.offsetHeight,w.style.transition="")});return}(oe[d]!==void 0?oe[d]==="bottom":!!(G&&(j==null?void 0:j.previousDirection)==="from-next"))?requestAnimationFrame(()=>{if(g.current){const w=g.current.scrollHeight-g.current.clientHeight;g.current.scrollTop=w}}):g.current.scrollTop=0}},[j,G,oe]),fe=n.useCallback(d=>{if(o||v)return;const u=d.touches[0];z.current={x:u.clientX,y:u.clientY,time:Date.now()},W.current=0},[o,v]),Te=n.useCallback(d=>{if(o||v)return;const u=d.touches[0],w=u.clientY-z.current.y,P=u.clientX-z.current.x;if(!(Math.abs(P)>Math.abs(w))){if(W.current=Math.abs(w),V||!G&&$==="slide"){if(W.current>=E){d.preventDefault();const M=w<0,I=w>0;W.current=0,M&&a<e.length-1?r():I&&a>0&&i()}return}if($==="content"&&G&&!V){const M=g.current;if(!M)return;const{isAtTop:I,isAtBottom:y}=te(M);if(W.current>=E){const B=w<0,O=w>0;if(B&&y&&a<e.length-1){d.preventDefault(),W.current=0,r();return}else if(O&&I&&a>0){d.preventDefault(),W.current=0,i();return}}}}},[o,v,$,G,V,a,e.length,r,i,te,E]),_=n.useCallback(()=>{W.current=0},[]),N=n.useCallback(d=>{const u=Date.now();if(o||v)return;if($==="content"&&G&&!V){const y=g.current;if(!y)return;const{isAtTop:B,isAtBottom:O,currentScrollTop:H,maxScrollTop:ie}=te(y),we=d.deltaY>0,Me=d.deltaY<0;if(we)if(O){if(u-A.current>p&&(L.current=0),A.current=u,L.current<h){if(L.current+=Math.abs(d.deltaY),H>=ie-5){const ae=Math.min(L.current/h,1);re("down",ae)}L.current>=h&&a<e.length-1&&(L.current=0,r());return}}else{L.current=0;return}else if(Me)if(B){if(u-A.current>p&&(L.current=0),A.current=u,L.current<h){if(L.current+=Math.abs(d.deltaY),H<=5){const ae=Math.min(L.current/h,1);re("up",ae)}L.current>=h&&a>0&&(L.current=0,i());return}}else{L.current=0;return}return}(V||!G&&$==="slide")&&d.preventDefault(),u-A.current>p&&(Z?he():(L.current=0,se(!1),Q(0))),A.current=u;const w=Math.abs(d.deltaY);L.current+=w;const P=g.current;if(P&&$==="content"&&G){const y=j==null?void 0:j.id;if(y){const{currentScrollTop:B,maxScrollTop:O}=te(P),H=B>=O-10?"bottom":B<=10?"top":"middle";oe[y]!==H&&Be(ie=>({...ie,[y]:H}))}}if($!=="content"&&ge(d)||L.current<h||(L.current=0,se(!1),Q(0),!P))return;const M=d.deltaY>0,I=d.deltaY<0;M&&a<e.length-1?r():I&&a>0&&i()},[o,v,$,G,V,a,e.length,r,i,j,Z,oe,re,ge,he,te,p,h]),T=n.useCallback(d=>{if(o||v)return;const u=g.current;switch(d.key){case"ArrowDown":if(d.preventDefault(),$==="content"&&G&&!V&&u){const{isAtBottom:w,maxScrollTop:P}=te(u);if(w)a<e.length-1&&r();else{const M=Math.min(u.scrollTop+100,P);u.scrollTop=M}}else a<e.length-1&&r();break;case"ArrowUp":if(d.preventDefault(),$==="content"&&G&&!V&&u){const{isAtTop:w}=te(u);if(w)a>0&&i();else{const P=Math.max(u.scrollTop-100,0);u.scrollTop=P}}else a>0&&i();break;case"PageDown":case" ":d.preventDefault(),a<e.length-1&&r();break;case"PageUp":d.preventDefault(),a>0&&i();break;case"Home":d.preventDefault(),$==="content"&&!V&&u?u.scrollTop=0:t(0);break;case"End":if(d.preventDefault(),$==="content"&&!V&&u){const{maxScrollTop:w}=te(u);u.scrollTop=w}else t(e.length-1);break;default:{const w=parseInt(d.key);w>=1&&w<=e.length&&(d.preventDefault(),t(w-1));break}}},[o,v,$,G,V,a,e.length,r,i,t,te]);n.useEffect(()=>{const d=new CustomEvent("scrollBounce",{detail:{isBouncing:K,direction:ce,intensity:L.current/h}});window.dispatchEvent(d)},[K,ce,h]),n.useEffect(()=>{se(!1),Q(0),q(!1),X("none"),L.current=0,x.current&&clearTimeout(x.current);const d=setTimeout(()=>{Le(),U()},50);return()=>{clearTimeout(d)}},[a,Le,U]),n.useEffect(()=>{U();const d=window.innerWidth<768,u=navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows");if(d&&ne){const w=[50,100,200,300,500,800,1200].map(y=>setTimeout(()=>{U()},y)),P=()=>w.forEach(y=>clearTimeout(y)),M=()=>{setTimeout(()=>{U()},50)},I=g.current;return I&&I.querySelectorAll("img").forEach(B=>{B.complete?M():(B.addEventListener("load",M,{once:!0}),B.addEventListener("error",M,{once:!0}))}),()=>{P(),I&&I.querySelectorAll("img").forEach(B=>{B.removeEventListener("load",M),B.removeEventListener("error",M)})}}else if(u&&ne){console.log("🪟 Windows检测策略激活，section:",j==null?void 0:j.id);const w=[25,50,100,200,300,500,800].map(y=>setTimeout(()=>{console.log(`🪟 Windows检测 ${y}ms`),U()},y)),P=()=>w.forEach(y=>clearTimeout(y)),M=()=>{setTimeout(()=>{console.log("🪟 Windows图片加载完成，重新检测"),U()},50)},I=g.current;return I&&I.querySelectorAll("img").forEach(B=>{B.complete?M():(B.addEventListener("load",M,{once:!0}),B.addEventListener("error",M,{once:!0}))}),()=>{P(),I&&I.querySelectorAll("img").forEach(B=>{B.removeEventListener("load",M),B.removeEventListener("error",M)})}}else{const w=setTimeout(()=>U(),50),P=setTimeout(()=>U(),150),M=setTimeout(()=>U(),300);return()=>{clearTimeout(w),clearTimeout(P),clearTimeout(M)}}},[a,U,ne,j==null?void 0:j.id]),n.useEffect(()=>{const d=k.current;let u;const w=()=>{u&&clearTimeout(u),u=setTimeout(()=>{U()},100)};if(d){d.addEventListener("wheel",N,{passive:!1}),d.addEventListener("touchstart",fe,{passive:!1}),d.addEventListener("touchmove",Te,{passive:!1}),d.addEventListener("touchend",_,{passive:!1}),document.addEventListener("keydown",T),window.addEventListener("resize",w);let P;return window.ResizeObserver&&g.current&&(P=new ResizeObserver(()=>{setTimeout(()=>{console.log("📐 ResizeObserver检测到内容变化"),U()},100)}),P.observe(g.current)),()=>{d.removeEventListener("wheel",N),d.removeEventListener("touchstart",fe),d.removeEventListener("touchmove",Te),d.removeEventListener("touchend",_),document.removeEventListener("keydown",T),window.removeEventListener("resize",w),P&&P.disconnect(),x.current&&clearTimeout(x.current),u&&clearTimeout(u)}}},[N,fe,Te,_,T,U]);const F=()=>{if(!j)return null;const d=ze[j.id];return d?s.jsx(n.Suspense,{fallback:s.jsx("div",{className:"flex items-center justify-center h-full",children:s.jsx("div",{className:"text-white text-xl",children:"Loading..."})}),children:s.jsx(d,{section:j,language:l,...j.id==="home"?{sections:e,onSectionChange:t,enableOpeningAnimation:R}:{}})}):null};return s.jsxs("div",{ref:k,className:"relative w-full m-0 p-0 h-screen",style:{overflow:"hidden",height:"var(--vh-fallback, 100vh)",minHeight:"100dvh"},children:[(j==null?void 0:j.backgroundEffect)&&s.jsx(it,{effectType:j.backgroundEffect,sectionName:j.id||"unknown"}),s.jsx("div",{ref:g,className:`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${V?"scroll-mode-home overflow-hidden":G?"scroll-mode-auto overflow-y-auto":"overflow-hidden"} ${K?"bouncing":""}`,style:{transform:Z&&!K?`translateY(${me}px)`:"translateY(0)",transition:o||Z&&!K?"none":K?"transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)":"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",willChange:o||Z||K?"transform":"auto"},children:F()}),o&&s.jsx("div",{className:"fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"})]})},ot=({visible:a,onToggle:e})=>{const[t,r]=n.useState("memory"),[i,o]=n.useState(null),[c,l]=n.useState(null),[R,v]=n.useState({}),[m,h]=n.useState(!1),E=n.useRef(0),p=n.useRef(0),C=n.useRef(performance.now()),{currentSection:f,sections:S,getCurrentSection:b}=le();if(n.useEffect(()=>{let x;const z=()=>{p.current++;const W=performance.now();W-C.current>=1e3&&(E.current=Math.round(p.current*1e3/(W-C.current)),p.current=0,C.current=W),x=requestAnimationFrame(z)};return z(),()=>{x&&cancelAnimationFrame(x)}},[]),n.useEffect(()=>{if(!a)return;const x=()=>{performance.memory&&o({used:Math.round(performance.memory.usedJSHeapSize/1024/1024),total:Math.round(performance.memory.totalJSHeapSize/1024/1024),limit:Math.round(performance.memory.jsHeapSizeLimit/1024/1024)});const W=J.getMemoryInfo();l(W),v({fps:E.current})};x();const z=setInterval(x,500);return()=>clearInterval(z)},[a]),!a)return null;const k=[{id:"memory",label:"Memory"},{id:"webgl",label:"WebGL"},{id:"sections",label:"Sections"}],g=()=>s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent backdrop-blur-md border border-blue-400/30 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/20",children:[s.jsx("div",{className:"text-blue-300 font-semibold text-xs mb-1",children:"JS Heap Used"}),s.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(i==null?void 0:i.used)||0," MB"]}),s.jsxs("div",{className:"text-blue-200/70 text-xs",children:[i?Math.round(i.used/i.limit*100):0,"% of limit"]})]}),s.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 shadow-lg ring-1 ring-emerald-400/20",children:[s.jsx("div",{className:"text-emerald-300 font-semibold text-xs mb-1",children:"JS Heap Total"}),s.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(i==null?void 0:i.total)||0," MB"]}),s.jsx("div",{className:"text-emerald-200/70 text-xs",children:"Allocated"})]})]}),s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent backdrop-blur-md border border-yellow-400/30 rounded-xl p-3 shadow-lg ring-1 ring-yellow-400/20",children:[s.jsx("div",{className:"text-yellow-300 font-semibold text-xs mb-1",children:"JS Heap Limit"}),s.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(i==null?void 0:i.limit)||0," MB"]}),s.jsx("div",{className:"text-yellow-200/70 text-xs",children:"Browser limit"})]}),s.jsxs("div",{className:"bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-md border border-purple-400/30 rounded-xl p-3 shadow-lg ring-1 ring-purple-400/20",children:[s.jsx("div",{className:"text-purple-300 font-semibold text-xs mb-1",children:"FPS"}),s.jsx("div",{className:"text-lg font-mono text-white font-bold",children:R.fps||0}),s.jsx("div",{className:"text-purple-200/70 text-xs",children:"frames/sec"})]})]})]}),A=()=>s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-3 shadow-lg ring-1 ring-cyan-400/20",children:[s.jsx("div",{className:"text-cyan-300 font-semibold text-xs mb-1",children:"Active Groups"}),s.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(c==null?void 0:c.activeResourceGroups)||0}),s.jsx("div",{className:"text-cyan-200/70 text-xs",children:"Resource groups"})]}),s.jsxs("div",{className:"bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-orange-400/30 rounded-xl p-3 shadow-lg ring-1 ring-orange-400/20",children:[s.jsx("div",{className:"text-orange-300 font-semibold text-xs mb-1",children:"Persistent"}),s.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(c==null?void 0:c.persistentResources)||0}),s.jsx("div",{className:"text-orange-200/70 text-xs",children:"Persistent resources"})]})]}),(c==null?void 0:c.resourceStats)&&s.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[s.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Resource Breakdown"]}),s.jsx("div",{className:"grid grid-cols-2 gap-2 text-xs",children:Object.entries(c.resourceStats).map(([x,z])=>s.jsxs("div",{className:"flex justify-between items-center bg-white/5 rounded-lg px-2 py-1.5 border border-white/10",children:[s.jsxs("span",{className:"capitalize text-gray-300",children:[x.replace(/([A-Z])/g," $1").trim(),":"]}),s.jsx("span",{className:"font-mono text-white font-semibold bg-emerald-500/20 px-2 py-0.5 rounded",children:z})]},x))})]}),(c==null?void 0:c.sectionBreakdown)&&Object.keys(c.sectionBreakdown).length>0&&s.jsxs("div",{className:"bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent backdrop-blur-md border border-violet-400/25 rounded-xl p-4 shadow-lg ring-1 ring-violet-400/15",children:[s.jsxs("div",{className:"text-violet-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"}),"Section Resources"]}),s.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:Object.entries(c.sectionBreakdown).map(([x,z])=>s.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-3 rounded-lg backdrop-blur-sm",children:[s.jsxs("div",{className:"flex items-center justify-between mb-2",children:[s.jsx("div",{className:"font-medium text-white text-sm",children:x.replace("BackgroundCanvas_","").replace("HeroCube","HomeCube").replace("EffectAvatar_","Avatar-")}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"bg-blue-500/30 text-blue-200 px-2 py-1 rounded-md text-xs font-mono border border-blue-400/30",children:z.count}),z.persistent>0&&s.jsxs("span",{className:"bg-green-500/30 text-green-200 px-2 py-1 rounded-md text-xs font-mono border border-green-400/30",children:["P:",z.persistent]})]})]}),s.jsxs("div",{className:"text-xs text-gray-400",children:["Last active: ",new Date(z.lastActive).toLocaleTimeString()]})]},x))})]}),s.jsxs("div",{className:"bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent backdrop-blur-md border border-blue-400/25 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/15",children:[s.jsx("div",{className:"text-blue-300 font-semibold text-sm mb-2",children:"Memory Usage"}),s.jsxs("div",{className:"text-xs text-blue-200/70",children:["JS Heap: ",(c==null?void 0:c.jsHeapSize)||0,"MB / ",(c==null?void 0:c.jsHeapLimit)||0,"MB"]})]})]}),L=()=>{const x=b();return s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-4 shadow-lg ring-1 ring-cyan-400/20",children:[s.jsxs("div",{className:"text-cyan-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"}),"Current Section"]}),s.jsx("div",{className:"text-white text-lg font-bold mb-2",children:(x==null?void 0:x.title)||(x==null?void 0:x.id)||"Unknown"}),s.jsxs("div",{className:"space-y-1 text-xs",children:[s.jsxs("div",{className:"text-cyan-200/70",children:["Section ",f+1," of ",S.length]}),(x==null?void 0:x.backgroundEffect)&&s.jsxs("div",{className:"text-cyan-200/90 bg-cyan-500/20 px-2 py-1 rounded-md border border-cyan-400/30 inline-block",children:["Effect: ",x.backgroundEffect]})]})]}),s.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[s.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Section Navigation"]}),s.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:S.map((z,W)=>s.jsxs("div",{className:`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${W===f?"bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-blue-200 border-blue-400/40 shadow-lg":"bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"}`,children:[s.jsx("span",{className:"truncate text-sm font-medium",children:z.title||z.id}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:`w-2 h-2 rounded-full ${W===f?"bg-blue-400 animate-pulse":"bg-gray-500"}`}),s.jsx("span",{className:"text-xs font-mono bg-white/10 px-1 py-0.5 rounded",children:W+1})]})]},z.id))})]}),s.jsxs("div",{className:"bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent backdrop-blur-md border border-purple-400/25 rounded-xl p-4 shadow-lg ring-1 ring-purple-400/15",children:[s.jsxs("div",{className:"text-purple-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"}),"Performance Snapshot"]}),s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[s.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"FPS"}),s.jsx("div",{className:"font-mono text-white font-bold text-lg",children:R.fps||0})]}),s.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[s.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"WebGL Groups"}),s.jsx("div",{className:"font-mono text-white font-bold text-lg",children:(c==null?void 0:c.activeResourceGroups)||0})]})]})]})]})};return s.jsx("div",{className:`fixed top-4 right-4 z-[9999] transition-all duration-500 ease-out ${m?"w-12 h-12":"w-96 max-h-[600px]"}`,children:s.jsxs("div",{className:"bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-mono text-xs shadow-2xl shadow-black/20 ring-1 ring-white/20 overflow-hidden",children:[s.jsxs("div",{className:"flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent border-b border-white/20 backdrop-blur-sm",children:[!m&&s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsxs("div",{className:"relative",children:[s.jsx("div",{className:"w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"}),s.jsx("div",{className:"absolute inset-0 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"})]}),s.jsx("span",{className:"text-emerald-300 font-semibold text-sm tracking-wide",children:"Performance Monitor"})]}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("button",{onClick:()=>h(!m),className:"w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40",title:m?"Expand Panel":"Collapse Panel",children:m?"📊":"➖"}),s.jsx("button",{onClick:e,className:"w-7 h-7 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50",title:"Close Panel (Ctrl+M)",children:"✕"})]})]}),!m&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"flex bg-white/5 backdrop-blur-sm border-b border-white/10",children:k.map(x=>s.jsxs("button",{onClick:()=>r(x.id),className:`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden ${t===x.id?"bg-gradient-to-b from-blue-500/30 to-blue-600/20 text-blue-200 shadow-lg":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:[t===x.id&&s.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"}),x.label]},x.id))}),s.jsxs("div",{className:"p-4 max-h-96 overflow-y-auto custom-scrollbar",children:[t==="memory"&&g(),t==="webgl"&&A(),t==="sections"&&L()]}),s.jsx("div",{className:"p-3 bg-gradient-to-t from-white/10 to-transparent border-t border-white/20 backdrop-blur-sm",children:s.jsxs("div",{className:"text-center text-gray-400",children:[s.jsx("span",{className:"text-xs",children:"Press "}),s.jsx("kbd",{className:"inline-flex items-center px-2 py-1 bg-white/20 rounded-md text-xs font-mono border border-white/30 shadow-inner",children:"Ctrl+M"}),s.jsx("span",{className:"text-xs",children:" to toggle"})]})})]})]})})};ot.propTypes={visible:Y.bool.isRequired,onToggle:Y.func.isRequired};function Yt(a={}){const{immediate:e=!1,onNeedRefresh:t,onOfflineReady:r,onRegistered:i,onRegisteredSW:o,onRegisterError:c}=a;let l,R;const v=async(h=!0)=>{await R};async function m(){if("serviceWorker"in navigator){if(l=await de(async()=>{const{Workbox:h}=await import("./vendor-DFPT3U6w.js").then(E=>E.w);return{Workbox:h}},__vite__mapDeps([2,1,3])).then(({Workbox:h})=>new h("/sw.js",{scope:"/",type:"classic"})).catch(h=>{c==null||c(h)}),!l)return;l.addEventListener("activated",h=>{(h.isUpdate||h.isExternal)&&window.location.reload()}),l.addEventListener("installed",h=>{h.isUpdate||r==null||r()}),l.register({immediate:e}).then(h=>{o?o("/sw.js",h):i==null||i(h)}).catch(h=>{c==null||c(h)})}}return R=m(),v}function qt(a={}){const{immediate:e=!0,onNeedRefresh:t,onOfflineReady:r,onRegistered:i,onRegisteredSW:o,onRegisterError:c}=a,[l,R]=n.useState(!1),[v,m]=n.useState(!1),[h]=n.useState(()=>Yt({immediate:e,onOfflineReady(){m(!0),r==null||r()},onNeedRefresh(){R(!0),t==null||t()},onRegistered:i,onRegisteredSW:o,onRegisterError:c}));return{needRefresh:[l,R],offlineReady:[v,m],updateServiceWorker:h}}function Xt(){const{language:a}=le(),[e,t]=n.useState(!1),[r,i]=n.useState(null),[o,c]=n.useState(!1),l={install:{title:a==="zh"?"安装应用到桌面":"Install App",description:a==="zh"?"快速访问，离线可用，获得更好的体验！":"Quick access, offline ready, better experience!",button:a==="zh"?"立即安装":"Install",later:a==="zh"?"稍后":"Later"},offline:{title:a==="zh"?"已准备好离线使用":"Ready for Offline",description:a==="zh"?"应用已缓存，现在可以离线访问！":"App cached, now available offline!",button:a==="zh"?"知道了":"Got it"},update:{title:a==="zh"?"发现新版本":"New Version Available",description:a==="zh"?"有新内容可用，点击刷新获取最新版本":"New content available, click to refresh",button:a==="zh"?"立即刷新":"Refresh",later:a==="zh"?"稍后":"Later"}},{offlineReady:[R,v],needRefresh:[m,h],updateServiceWorker:E}=qt({onRegistered(k){console.log("✅ PWA: Service Worker registered"),k&&setInterval(()=>{k.update()},3600*1e3)},onRegisterError(k){console.error("❌ PWA: Service Worker registration failed",k)}});n.useEffect(()=>{const k=window.matchMedia("(display-mode: standalone)").matches;if(c(k),k){console.log("✅ PWA: App already installed"),t(!1);return}const g=A=>{A.preventDefault(),i(A),t(!0),console.log("📱 PWA: App can be installed")};return window.addEventListener("beforeinstallprompt",g),()=>window.removeEventListener("beforeinstallprompt",g)},[]);const p=async()=>{if(!r)return;r.prompt();const{outcome:k}=await r.userChoice;k==="accepted"?(console.log("✅ PWA: User accepted installation"),c(!0)):console.log("❌ PWA: User declined installation"),i(null),t(!1)},C=()=>{E(!0)},f=()=>{t(!1)},S=()=>{h(!1)},b=()=>{v(!1)};return s.jsxs(s.Fragment,{children:[e&&s.jsx("div",{className:"fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-slide-up",children:s.jsx("div",{className:"relative rounded-2xl p-[2px]",children:s.jsxs("div",{className:"relative rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden",style:{backgroundColor:"rgba(var(--theme-primary-rgb), 0.08)"},children:[s.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.15), rgba(var(--theme-secondary-rgb), 0.15), rgba(var(--theme-primary-rgb), 0.05))"}}),s.jsx("div",{className:"relative p-5",children:s.jsxs("div",{className:"flex items-start gap-4",children:[s.jsx("div",{className:"flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",style:{background:"linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))"},children:s.jsx("span",{className:"text-2xl",children:"📱"})}),s.jsxs("div",{className:"flex-1 min-w-0",children:[s.jsx("h3",{className:"text-white font-semibold text-base mb-1.5",children:l.install.title}),s.jsx("p",{className:"text-white/80 text-sm leading-relaxed mb-4",children:l.install.description}),s.jsxs("div",{className:"flex gap-2",children:[s.jsx("button",{onClick:p,className:"flex-1 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",style:{background:"linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))"},children:l.install.button}),s.jsx("button",{onClick:f,className:"px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all duration-200",children:l.install.later})]})]})]})})]})})}),R&&o&&s.jsx("div",{className:"fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-slide-up",children:s.jsx("div",{className:"relative rounded-2xl p-[2px]",style:{background:"linear-gradient(135deg, var(--theme-secondary), var(--theme-accent))",boxShadow:`
                            0 0 20px rgba(var(--theme-secondary-rgb), 0.6),
                            0 0 40px rgba(var(--theme-secondary-rgb), 0.4),
                            0 0 60px rgba(var(--theme-secondary-rgb), 0.2),
                            inset 0 0 20px rgba(var(--theme-secondary-rgb), 0.1)
                        `},children:s.jsxs("div",{className:"relative rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden",style:{backgroundColor:"rgba(var(--theme-secondary-rgb), 0.08)"},children:[s.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg, rgba(var(--theme-secondary-rgb), 0.15), rgba(var(--theme-primary-rgb), 0.05))"}}),s.jsx("div",{className:"relative p-5",children:s.jsxs("div",{className:"flex items-start gap-4",children:[s.jsx("div",{className:"flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",style:{background:"linear-gradient(135deg, var(--theme-secondary), var(--theme-accent))"},children:s.jsx("span",{className:"text-2xl",children:"✅"})}),s.jsxs("div",{className:"flex-1 min-w-0",children:[s.jsx("h3",{className:"text-white font-semibold text-base mb-1.5",children:l.offline.title}),s.jsx("p",{className:"text-white/80 text-sm leading-relaxed mb-3",children:l.offline.description}),s.jsx("button",{onClick:b,className:"text-sm font-medium transition-colors",style:{color:"var(--theme-primary)"},children:l.offline.button})]})]})})]})})}),m&&s.jsx("div",{className:"fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-slide-up",children:s.jsx("div",{className:"relative rounded-2xl p-[2px]",style:{background:"linear-gradient(135deg, var(--theme-accent), var(--theme-primary))",boxShadow:`
                            0 0 20px rgba(var(--theme-primary-rgb), 0.6),
                            0 0 40px rgba(var(--theme-primary-rgb), 0.4),
                            0 0 60px rgba(var(--theme-accent-rgb), 0.3),
                            inset 0 0 20px rgba(var(--theme-primary-rgb), 0.1)
                        `},children:s.jsxs("div",{className:"relative rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden",style:{backgroundColor:"rgba(var(--theme-primary-rgb), 0.08)"},children:[s.jsx("div",{className:"absolute inset-0",style:{background:"linear-gradient(135deg, rgba(var(--theme-accent-rgb), 0.15), rgba(var(--theme-primary-rgb), 0.05))"}}),s.jsx("div",{className:"relative p-5",children:s.jsxs("div",{className:"flex items-start gap-4",children:[s.jsx("div",{className:"flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg animate-spin-slow",style:{background:"linear-gradient(135deg, var(--theme-accent), var(--theme-primary))"},children:s.jsx("span",{className:"text-2xl",children:"🔄"})}),s.jsxs("div",{className:"flex-1 min-w-0",children:[s.jsx("h3",{className:"text-white font-semibold text-base mb-1.5",children:l.update.title}),s.jsx("p",{className:"text-white/80 text-sm leading-relaxed mb-4",children:l.update.description}),s.jsxs("div",{className:"flex gap-2",children:[s.jsx("button",{onClick:C,className:"flex-1 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]",style:{background:"linear-gradient(135deg, var(--theme-accent), var(--theme-primary))"},children:l.update.button}),s.jsx("button",{onClick:S,className:"px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all duration-200",children:l.update.later})]})]})]})})]})})})]})}const Kt=()=>{const a=n.useRef(null),e=n.useRef(null);return n.useEffect(()=>{if(!a.current)return;const t=new Ee,r=new Ie(75,window.innerWidth/window.innerHeight,.1,1e3),i=new Re({canvas:a.current,alpha:!0,antialias:!0});i.setSize(window.innerWidth,window.innerHeight),i.setClearColor(0,.3),r.position.z=400;const o=(v,m)=>{const h=new Ge(10,300,32),E=new Ne({color:3900150,transparent:!0,opacity:.3,side:rt}),p=new je(h,E);return p.position.set(v,m,0),p.userData={startTime:Date.now(),initialScale:.1,targetScale:2,duration:3e3},t.add(p),p},c=[];for(let v=0;v<5;v++){const m=(Math.random()-.5)*800,h=(Math.random()-.5)*600;c.push(o(m,h))}const l=()=>{const v=Date.now();c.forEach(m=>{const E=(v-m.userData.startTime)/m.userData.duration;if(E<1){const p=m.userData.initialScale+(m.userData.targetScale-m.userData.initialScale)*E;m.scale.set(p,p,1),m.material.opacity=.3*(1-E)}else m.userData.startTime=v,m.scale.set(.1,.1,1),m.position.x=(Math.random()-.5)*800,m.position.y=(Math.random()-.5)*600;m.rotation.z+=.01}),i.render(t,r),requestAnimationFrame(l)};l();const R=()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",R),e.current={scene:t,camera:r,renderer:i,ripples:c},()=>{if(window.removeEventListener("resize",R),e.current){const{scene:v,renderer:m}=e.current;v.clear(),m.dispose()}}},[]),s.jsx("canvas",{ref:a,className:"absolute inset-0 w-full h-full pointer-events-none",style:{zIndex:1}})},nt=({error:a,resetError:e,hasError:t})=>{var E;const{language:r,getNewContent:i}=le(),[o,c]=Xe.useState(!1);if(!t)return null;const l=i(),R=((E=l==null?void 0:l.contact)==null?void 0:E.emailAddress)||"aemooooon@gmail.com",v=()=>{const p={message:(a==null?void 0:a.message)||"Unknown error",stack:(a==null?void 0:a.stack)||"No stack trace available",timestamp:new Date().toISOString(),url:window.location.href,userAgent:navigator.userAgent,language:r},C=encodeURIComponent(`Error Report from ${window.location.hostname}`),f=encodeURIComponent(`
Error Details:
- Message: ${p.message}
- Timestamp: ${p.timestamp}
- URL: ${p.url}
- Language: ${p.language}
- User Agent: ${p.userAgent}

Stack Trace:
${p.stack}

Please describe what you were doing when this error occurred:
[Please describe your actions here]
        `);window.open(`mailto:${R}?subject=${C}&body=${f}`)},m={en:{title:"Oops! Something went wrong",subtitle:"We encountered an unexpected error. Don't worry, we're here to help!",refresh:"Refresh Page",report:"Report Error",details:"Error Details",showDetails:"Show Details",hideDetails:"Hide Details"},zh:{title:"哎呀！出了点问题",subtitle:"我们遇到了一个意外错误。别担心，我们会帮您解决！",refresh:"刷新页面",report:"报告错误",details:"错误详情",showDetails:"显示详情",hideDetails:"隐藏详情"}},h=m[r]||m.en;return s.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",children:[s.jsx(Kt,{}),s.jsxs("div",{className:"glass-card max-w-md w-full p-8 text-center relative",style:{zIndex:10},children:[s.jsx("div",{className:"mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-3xl shadow-lg animate-pulse",children:"⚠️"}),s.jsx("h2",{className:"text-2xl font-bold text-white mb-3",children:h.title}),s.jsx("p",{className:"text-gray-300 mb-8 leading-relaxed",children:h.subtitle}),s.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mb-6",children:[s.jsxs("button",{onClick:e,className:"flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",children:["🔄 ",h.refresh]}),s.jsxs("button",{onClick:v,className:"flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",children:["📧 ",h.report]})]}),!1]})]})};nt.propTypes={error:Y.object,resetError:Y.func.isRequired,hasError:Y.bool.isRequired};class at extends Xe.Component{constructor(t){super(t);$e(this,"resetError",()=>{this.setState({hasError:!1,error:null}),window.location.reload()});this.state={hasError:!1,error:null}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,r){console.error("ErrorBoundary caught an error:",t,r)}render(){return this.state.hasError?s.jsx(nt,{error:this.state.error,resetError:this.resetError,hasError:this.state.hasError}):this.props.children}}at.propTypes={children:Y.node.isRequired};const lt=({language:a="en"})=>{const[e,t]=n.useState(navigator.onLine),[r,i]=n.useState(!1);n.useEffect(()=>{const v=()=>{t(!0),i(!0),setTimeout(()=>i(!1),2e3)},m=()=>{t(!1),i(!0)};return window.addEventListener("online",v),window.addEventListener("offline",m),navigator.onLine||i(!0),()=>{window.removeEventListener("online",v),window.removeEventListener("offline",m)}},[]);const o=()=>e?{title:a==="zh"?"网络连接已恢复":"Network Reconnected",message:a==="zh"?"所有功能恢复正常":"All features are now working",icon:s.jsx("svg",{className:"w-6 h-6 text-green-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}:{title:a==="zh"?"网络连接中断":"Network Disconnected",message:a==="zh"?"部分功能可能无法正常使用，请检查网络连接":"Some features may not work properly. Please check your connection.",icon:s.jsx("svg",{className:"w-6 h-6 text-red-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"})})};if(!r)return null;const{title:c,message:l,icon:R}=o();return s.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center pointer-events-none",children:s.jsx("div",{className:`transition-all duration-300 transform ${r?"scale-100 opacity-100":"scale-95 opacity-0"} pointer-events-auto`,children:s.jsx("div",{className:"bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 rounded-lg p-4 shadow-2xl",children:s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsx("div",{className:"flex-shrink-0",children:R}),s.jsxs("div",{className:"text-white",children:[s.jsx("div",{className:"font-medium text-sm",children:c}),s.jsx("div",{className:"text-zinc-300 text-xs mt-1",children:l})]}),s.jsx("button",{onClick:()=>i(!1),className:"text-zinc-400 hover:text-zinc-200 text-sm ml-4 transition-colors","aria-label":"关闭",children:s.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})})})})};lt.propTypes={language:Y.string};const ct=({children:a,language:e="en"})=>{const[t,r]=n.useState(!1),[i,o]=n.useState([]),[c,l]=n.useState(0),R=n.useRef(null),v=async p=>{try{if(p&&p.match(/\.(mp4|webm|mov|avi|mkv)$/i))return{width:1920,height:1080,aspectRatio:16/9};if(p&&p.includes("/gallery/")){const f=p.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{const b=await(await fetch("/precomputed-dimensions.json")).json();if(b.gallery&&b.gallery[f]){const k=b.gallery[f];return{width:k.width,height:k.height,aspectRatio:k.aspectRatio}}}catch{}}let C=p;if(p&&p.includes("/gallery/")&&p.endsWith(".jpg")){const f=p.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{C=await pt.getOptimalPath(f,"gallery")}catch{}}return new Promise(f=>{const S=new Image;S.onload=()=>{f({width:S.naturalWidth,height:S.naturalHeight,aspectRatio:S.naturalWidth/S.naturalHeight})},S.onerror=()=>{if(C!==p){const b=new Image;b.onload=()=>{f({width:b.naturalWidth,height:b.naturalHeight,aspectRatio:b.naturalWidth/b.naturalHeight})},b.onerror=()=>{f({width:1200,height:800,aspectRatio:1.5})},b.crossOrigin="anonymous",b.src=p}else f({width:1200,height:800,aspectRatio:1.5})},S.crossOrigin="anonymous",S.src=C})}catch{return{width:1200,height:800,aspectRatio:1.5}}},E={isOpen:t,images:i,initialIndex:c,openPhotoSwipe:async(p,C=0)=>{if(!p||p.length===0)return;o(p),l(C),r(!0);const f=p.map(S=>v(S.src||S.original));try{const S=await Promise.all(f),b=p.map((g,A)=>({src:g.src||g.original,width:S[A].width,height:S[A].height,alt:g.alt||g.title||`Image ${A+1}`,caption:g.caption,title:g.title,description:g.description}));R.current&&R.current.destroy();const k=new wt({dataSource:b,index:C,pswpModule:()=>de(()=>import("./vendor-DFPT3U6w.js").then(g=>g.f),__vite__mapDeps([2,1,3])),bgOpacity:.95,spacing:.1,loop:!0,zoom:!0,showAnimationDuration:300,hideAnimationDuration:300,showHideAnimationType:"zoom",allowMouseDrag:!0,allowPanToNext:!0,allowSwipeToClose:!0,wheelToZoom:!0,imageClickAction:"close",tapAction:"close",doubleTapAction:"zoom",closeTitle:e==="zh"?"关闭":"Close",zoomTitle:e==="zh"?"缩放":"Zoom",arrowPrevTitle:e==="zh"?"上一张":"Previous",arrowNextTitle:e==="zh"?"下一张":"Next",errorMsg:e==="zh"?"图片无法加载":"The image cannot be loaded",pinchToClose:!0,closeOnVerticalDrag:!0,returnFocus:!1,padding:{top:40,bottom:40,left:20,right:20},preload:[1,2]});k.on("close",()=>{r(!1),o([]),l(0)}),k.on("uiRegister",()=>{k.pswp.ui.registerElement({name:"custom-counter",className:"pswp__custom-counter",appendTo:"top-bar",onInit:(g,A)=>{const L=()=>{g.textContent=`${A.currIndex+1} / ${A.getNumItems()}`};A.on("change",L),A.on("afterInit",L)}}),k.pswp.ui.registerElement({name:"download-button",className:"pswp__download-button",appendTo:"bar",onInit:(g,A)=>{g.innerHTML=`
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            `,g.title=e==="zh"?"下载图片":"Download image",g.onclick=()=>{const L=b[A.currIndex];if(L){const x=document.createElement("a");x.href=L.src,x.download=`image_${A.currIndex+1}.jpg`,x.click()}}}})}),k.init(),k.loadAndOpen(C),R.current=k}catch(S){console.error("Error loading images for PhotoSwipe:",S),r(!1)}},closePhotoSwipe:()=>{R.current&&R.current.close()}};return s.jsxs(Lt.Provider,{value:E,children:[a,s.jsx("style",{children:`
        .pswp__custom-counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          z-index: 100;
        }
        
        .pswp__download-button {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          transition: all 0.3s ease;
          border-radius: 50%;
        }
        
        .pswp__download-button:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #60a5fa;
        }
        
        .pswp__bg {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
        }
        
        /* 修复光标问题 - 确保整个PhotoSwipe区域都有正确的光标 */
        .pswp,
        .pswp__container,
        .pswp__zoom-wrap {
          cursor: grab;
        }
        
        .pswp:active,
        .pswp__container:active,
        .pswp__zoom-wrap:active {
          cursor: grabbing;
        }
        
        /* 在图片上的光标 */
        .pswp__img {
          cursor: grab;
        }
        
        .pswp__img:active {
          cursor: grabbing;
        }
        
        .pswp__zoom-wrap {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* 确保图片保持原始宽高比 */
        .pswp__img {
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
        
        /* 移动端优化 */
        @media (max-width: 768px) {
          .pswp__custom-counter {
            top: 15px;
            padding: 6px 12px;
            font-size: 12px;
          }
          
          .pswp__download-button {
            width: 40px;
            height: 40px;
          }
          
          /* 确保触摸手势正常工作 */
          .pswp__container {
            touch-action: pan-x pan-y;
            user-select: none;
            -webkit-user-select: none;
          }
          
          .pswp__zoom-wrap {
            touch-action: manipulation;
          }
          
          /* 手势提示 */
          .pswp__ui--fit .pswp__top-bar::after {
            content: '${e==="zh"?"左右滑动切换 • 上下滑动关闭":"Swipe left/right to navigate • Swipe up/down to close"}';
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            white-space: nowrap;
            pointer-events: none;
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          
          .pswp__ui--fit .pswp__top-bar:not(:hover)::after {
            animation: fadeInOut 3s ease-in-out;
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          15%, 85% { opacity: 1; }
        }
        
        /* 加载动画 */
        .pswp__preloader__icn {
          background: conic-gradient(from 0deg, transparent, #60a5fa);
          border-radius: 50%;
          mask: radial-gradient(circle at center, transparent 40%, black 41%);
        }
      `})]})};ct.propTypes={children:Y.node.isRequired,language:Y.string};Y.string.isRequired,Y.string,Y.string,Y.string,Y.string,Y.node,Y.array;const Jt=()=>{const{currentSection:a}=le(),t=a===0?0:a/5*100;return s.jsx("div",{className:"fixed top-0 left-0 right-0 z-40 h-[5px]",children:s.jsx("div",{className:`w-full h-full transition-opacity duration-300 ${a===0?"bg-transparent":"bg-white/20"}`,children:s.jsx("div",{className:"h-full transition-all duration-700 ease-out",style:{width:`${t}%`,backgroundColor:"var(--theme-primary)"}})})})},Zt=()=>{const[a,e]=n.useState(!1),t=!1,r=n.useCallback(()=>{},[t]),i=n.useCallback(()=>{e(!1)},[]),o=n.useCallback(()=>{},[t]);return n.useEffect(()=>{},[t,a,r,i]),t?{isVisible:a,toggle:r,hide:i,show:o,isDev:t}:{isVisible:!1,toggle:()=>{},hide:()=>{},show:()=>{},isDev:!1}},Qt=()=>{const a=Zt(),{language:e}=le();return Ke(),s.jsx(at,{children:s.jsx(ct,{children:s.jsxs("div",{className:"App min-h-screen",children:[s.jsx(Jt,{}),s.jsx(lt,{language:e}),s.jsx(Xt,{}),s.jsx(_t,{}),s.jsx(Vt,{}),a.isDev&&s.jsx(ot,{visible:a.isVisible,onToggle:a.toggle})]})})})};Tt();ft.createRoot(document.getElementById("root")).render(s.jsx(n.StrictMode,{children:s.jsx(Qt,{})}));
