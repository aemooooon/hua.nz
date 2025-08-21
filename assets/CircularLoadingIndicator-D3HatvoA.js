import{j as r}from"./react-CWzj3BDS.js";import{P as e}from"./vendor-Cvb3KN6q.js";const x=({size:a=120,strokeWidth:t=8,showMask:i=!0,maskColor:o="black-glass",className:n="",onMaskClick:c=null})=>{const s=(a-t)/2,m=2*Math.PI*s,b=0,d=()=>{switch(o){case"black-solid":return"absolute inset-0 bg-black";case"black-glass":return"absolute inset-0 bg-black/80 backdrop-blur-sm";case"default":default:return"absolute inset-0 bg-black/40 backdrop-blur-lg backdrop-saturate-150"}},l=({className:h=""})=>r.jsxs("div",{className:`relative ${h}`,style:{width:a,height:a,overflow:"visible"},children:[r.jsx("div",{className:"absolute pointer-events-none",style:{width:a+80,height:a+80,top:-40,left:-40,borderRadius:"50%",background:`radial-gradient(circle, 
                            transparent 60%, 
                            rgba(var(--theme-primary-rgb), 0.25) 75%, 
                            rgba(var(--theme-primary-rgb), 0.15) 85%, 
                            rgba(var(--theme-primary-rgb), 0.08) 92%, 
                            transparent 100%
                        )`,boxShadow:`
                            0 0 ${Math.max(a*.1,15)}px rgba(var(--theme-primary-rgb), 0.4),
                            0 0 ${Math.max(a*.2,25)}px rgba(var(--theme-primary-rgb), 0.2),
                            inset 0 0 ${Math.max(a*.05,6)}px rgba(var(--theme-primary-rgb), 0.15)
                        `,animation:"breathing-glow 3s ease-in-out infinite",zIndex:2}}),r.jsx("div",{className:"absolute",style:{width:a,height:a,borderRadius:"50%",boxShadow:`
                            0 0 ${Math.max(a*.03,4)}px var(--theme-primary),
                            0 0 ${Math.max(a*.06,8)}px rgba(var(--theme-primary-rgb), 0.6),
                            0 0 ${Math.max(a*.09,12)}px rgba(var(--theme-primary-rgb), 0.4),
                            inset 0 0 ${Math.max(a*.02,3)}px rgba(var(--theme-primary-rgb), 0.2)
                        `,animation:"avatar-glow 3s ease-in-out infinite",zIndex:9}}),r.jsxs("svg",{width:a,height:a,className:"transform -rotate-90 relative",style:{zIndex:10},children:[r.jsx("circle",{cx:a/2,cy:a/2,r:s,fill:"none",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:t}),r.jsx("circle",{cx:a/2,cy:a/2,r:s,fill:"none",stroke:"var(--theme-primary)",strokeWidth:t,strokeLinecap:"round",strokeDasharray:m,strokeDashoffset:b,className:"transition-all duration-300 ease-out",style:{transformOrigin:"center"}})]}),r.jsx("div",{className:"absolute inset-0 flex flex-col items-center justify-center pointer-events-none",style:{zIndex:20},children:r.jsx("span",{className:"text-white/90 text-lg font-medium drop-shadow-md",children:"Loading..."})})]});return i?r.jsxs("div",{className:`fixed inset-0 z-50 flex items-center justify-center ${n}`,onClick:c,style:{overflow:"visible"},children:[r.jsx("div",{className:d()}),r.jsx("div",{className:"relative z-10",children:r.jsx(l,{})})]}):r.jsx(l,{className:n})};x.propTypes={size:e.number,strokeWidth:e.number,showMask:e.bool,maskColor:e.oneOf(["black-glass","black-solid","default"]),className:e.string,onMaskClick:e.func};export{x as C};
