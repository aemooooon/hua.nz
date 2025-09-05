const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home-YXa0FyMF.js","assets/react-N-_5-tx-.js","assets/vendor-RxfllKF0.js","assets/d3-BbFmVfHF.js","assets/vendor-DSulWsr7.css","assets/about-DvPcWx0J.js","assets/gallery-DvnffbyB.js","assets/three-CLFFVFAv.js","assets/texture-system-B7gLHjHy.js","assets/gsap-CH_iu5NA.js","assets/home-CGmMaHBT.css","assets/projects-C1wVCXUs.js","assets/leaflet-BCigXWF9.js","assets/leaflet-BTrKGrB8.css","assets/projects-B3BEbutr.css","assets/EducationSection-kj8dDyhF.js","assets/EducationSection-DUw_6Q_9.css","assets/ContactSection-Tr86oqJY.js","assets/ContactSection-B2ZxASnB.css"])))=>i.map(i=>d[i]);
var ht=Object.defineProperty;var dt=(a,e,t)=>e in a?ht(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var Ue=(a,e,t)=>dt(a,typeof e!="symbol"?e+"":e,t);import{r as n,j as i,R as Ye,d as ut}from"./react-N-_5-tx-.js";import{u as he,_ as pe,a as qe}from"./about-DvPcWx0J.js";import{P as $,l as mt,e as ft}from"./vendor-RxfllKF0.js";import{w as Z}from"./home-YXa0FyMF.js";import{E as pt,h as ke,o as gt,H as Xe,M as Te,W as Me,a as D,i as Ae,I as wt,J as vt,U as bt,K as We,Q as xt,X as Fe,x as _e,Y as Ee,Z as yt,A as Je,v as Oe,P as ye,_ as Ct,$ as St,a0 as Ge,u as Ce,a1 as $e,s as Ke,a2 as Ze,a3 as Ve,a4 as Qe,a5 as et,a6 as Et,a7 as He,D as tt}from"./three-CLFFVFAv.js";import{P as Tt}from"./gallery-DvnffbyB.js";import{t as kt}from"./texture-system-B7gLHjHy.js";import"./d3-BbFmVfHF.js";import"./gsap-CH_iu5NA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();class Mt{constructor(e,t={},s="BackgroundCanvas"){if(this.canvas=e,this.componentId=s,this.componentId=s,this.gl=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl"),!this.gl)throw console.error("EffectFuse: Unable to get WebGL context"),new Error("WebGL not supported");this.resourceId=Z.registerResources(this.componentId,{gl:this.gl,canvas:this.canvas},{persistent:!0}),this.params={brightness:1.8,blobiness:1.3,particles:16,scanlines:!1,energy:1.25,timeScale:1.1,...t},this.program=null,this.animationFrameId=null,this.startTime=performance.now(),this.uniformLocations={},this.themeColors=this.getThemeColors();try{this.initGL()}catch(r){throw console.error("EffectFuse: Failed to initialize WebGL",r),r}}initGL(){if(!this.gl){console.error("WebGL not supported.");return}this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.getExtension("OES_texture_float");const e=`
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
        `,s=this.createShader(this.gl.VERTEX_SHADER,e),r=this.createShader(this.gl.FRAGMENT_SHADER,t);this.program=this.createProgram(s,r),this.uniformLocations={resolution:this.gl.getUniformLocation(this.program,"u_resolution"),brightness:this.gl.getUniformLocation(this.program,"u_brightness"),blobiness:this.gl.getUniformLocation(this.program,"u_blobiness"),particles:this.gl.getUniformLocation(this.program,"u_particles"),scanlines:this.gl.getUniformLocation(this.program,"u_scanlines"),energy:this.gl.getUniformLocation(this.program,"u_energy"),millis:this.gl.getUniformLocation(this.program,"u_millis"),timeScale:this.gl.getUniformLocation(this.program,"u_timeScale"),themePrimary:this.gl.getUniformLocation(this.program,"u_theme_primary"),themeSecondary:this.gl.getUniformLocation(this.program,"u_theme_secondary"),themeAccent:this.gl.getUniformLocation(this.program,"u_theme_accent"),themeDarkBlue:this.gl.getUniformLocation(this.program,"u_theme_dark_blue"),themeProjectBlue:this.gl.getUniformLocation(this.program,"u_theme_project_blue")},this.setupBuffers()}createShader(e,t){const s=this.gl.createShader(e);return this.gl.shaderSource(s,t),this.gl.compileShader(s),this.gl.getShaderParameter(s,this.gl.COMPILE_STATUS)?s:(console.error("Shader compilation error:",this.gl.getShaderInfoLog(s)),console.error("Shader source:",t),this.gl.deleteShader(s),null)}createProgram(e,t){const s=this.gl.createProgram();return this.gl.attachShader(s,e),this.gl.attachShader(s,t),this.gl.linkProgram(s),this.gl.getProgramParameter(s,this.gl.LINK_STATUS)?s:(console.error(this.gl.getProgramInfoLog(s)),this.gl.deleteProgram(s),null)}setupBuffers(){this.positionBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW);const e=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)}start(){this.startTime=performance.now(),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.render()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resourceId&&(Z.cleanup(this.resourceId),this.resourceId=null),this.gl)try{this.program&&(this.gl.deleteProgram(this.program),this.program=null),this.positionBuffer&&(this.gl.deleteBuffer(this.positionBuffer),this.positionBuffer=null)}catch(e){console.error("Error cleaning up WebGL resources:",e)}this.gl=null,this.canvas=null,this.uniformLocations={}}onResize(e,t){this.gl&&this.canvas&&(this.canvas.width=e,this.canvas.height=t,this.gl.viewport(0,0,e,t),requestAnimationFrame(()=>{this.gl&&this.render()}))}render(){if(!this.gl||!this.program||!this.params)return;this.animationFrameId=requestAnimationFrame(this.render.bind(this));const t=performance.now()-this.startTime;this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.useProgram(this.program),this.uniformLocations.resolution&&this.gl.uniform2f(this.uniformLocations.resolution,this.canvas.width,this.canvas.height),this.uniformLocations.brightness&&this.gl.uniform1f(this.uniformLocations.brightness,this.params.brightness||15e3),this.uniformLocations.blobiness&&this.gl.uniform1f(this.uniformLocations.blobiness,this.params.blobiness||2),this.uniformLocations.particles&&this.gl.uniform1f(this.uniformLocations.particles,this.params.particles||20),this.uniformLocations.scanlines&&this.gl.uniform1i(this.uniformLocations.scanlines,this.params.scanlines||!1),this.uniformLocations.energy&&this.gl.uniform1f(this.uniformLocations.energy,this.params.energy||.5),this.uniformLocations.millis&&this.gl.uniform1f(this.uniformLocations.millis,t),this.uniformLocations.timeScale&&this.gl.uniform1f(this.uniformLocations.timeScale,this.params.timeScale||.5),this.uniformLocations.themePrimary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themePrimary,this.themeColors.primary.r,this.themeColors.primary.g,this.themeColors.primary.b),this.uniformLocations.themeSecondary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeSecondary,this.themeColors.secondary.r,this.themeColors.secondary.g,this.themeColors.secondary.b),this.uniformLocations.themeAccent&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeAccent,this.themeColors.accent.r,this.themeColors.accent.g,this.themeColors.accent.b),this.uniformLocations.themeDarkBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeDarkBlue,this.themeColors.darkBlue.r,this.themeColors.darkBlue.g,this.themeColors.darkBlue.b),this.uniformLocations.themeProjectBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeProjectBlue,this.themeColors.projectBlue.r,this.themeColors.projectBlue.g,this.themeColors.projectBlue.b),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}getThemeColors(){const e=getComputedStyle(document.documentElement),t=s=>{const r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);return r?{r:parseInt(r[1],16)/255,g:parseInt(r[2],16)/255,b:parseInt(r[3],16)/255}:{r:0,g:1,b:1}};try{const s=e.getPropertyValue("--theme-primary").trim()||"#00ffff",r=e.getPropertyValue("--theme-secondary").trim()||"#0080ff",o=e.getPropertyValue("--theme-accent").trim()||"#4dd0e1";return{primary:t(s),secondary:t(r),accent:t(o),darkBlue:t("#0A0A0F"),projectBlue:t("#1E40AF")}}catch(s){return console.warn("Failed to get theme colors, using defaults:",s),{primary:{r:0,g:1,b:1},secondary:{r:0,g:.5,b:1},accent:{r:.3,g:.82,b:.88},darkBlue:{r:.04,g:.04,b:.06},projectBlue:{r:.12,g:.25,b:.69}}}}}function Lt(a,e={},t="BackgroundCanvas"){let s,r,o,c,l,L,x=0;const u=1e3/30,S=()=>{const v=getComputedStyle(document.documentElement),k=v.getPropertyValue("--theme-primary").trim(),b=v.getPropertyValue("--theme-background").trim(),P=[b?new D(b):new D("#0A0F0D"),k?new D(k):new D("#10B981"),k?new D(k).multiplyScalar(.6):new D("#0D9488")];return c&&c.colors&&(c.colors.value=P),P},f=()=>{o=new pt(-1,1,1,-1,0,1),r=new ke;const v=new gt(2,2);c={time:{value:1},animationSpeed:{value:e.animationSpeed||.618},colors:{value:e.colors||S()}};const k=new Xe({uniforms:c,transparent:!0,vertexShader:`
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
            `}),b=new Te(v,k);r.add(b),s=new Me({canvas:a,antialias:!0}),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.setSize(window.innerWidth,window.innerHeight),L=Z.registerResources(t,{renderer:s,scene:r,camera:o,geometry:v,material:k,mesh:b}),window.addEventListener("resize",y),d()},y=()=>{s.setSize(window.innerWidth,window.innerHeight)},d=()=>{l=requestAnimationFrame(d);const v=performance.now();v-x<u||(x=v,c.time.value=v/1e3*c.animationSpeed.value,s.render(r,o))},C=()=>{l&&cancelAnimationFrame(l),L&&Z.cleanup(L),r&&r.children.forEach(v=>{v.geometry&&v.geometry.dispose(),v.material&&(Array.isArray(v.material)?v.material.forEach(k=>k.dispose()):v.material.dispose())}),s&&(s.dispose(),a!=null&&a.parentNode&&a.parentNode.removeChild(a)),window.removeEventListener("resize",y)};return f(),{stop:C,updateThemeColors:S}}class jt{constructor(e,t={},s="BackgroundCanvas"){this.canvas=e,this.componentId=s,this.renderer=null,this.scene=null,this.camera=null,this.fireball=null,this.trailParticles=[],this.animationFrameId=null,this.time=0,this.resourceId=null,this.sigma=10,this.rho=28,this.beta=8/3,this.x=.1,this.y=0,this.z=0,this.dt=.02,this.maxParticles=999,this.fireballColor=new D("#00FF88"),this.particleColors=[new D("#10B981"),new D("#00FF88"),new D("#34D399")],setTimeout(()=>{this.updateThemeColors()},100),this.trailPositions=[],this.trailColors=[],this.particleIndex=0,this.frameCount=0,this.lastFPSCheck=performance.now(),this.currentFPS=60;try{this.init()}catch(r){throw console.error("EffectLorenzAttractor: Failed to initialize Three.js",r),r}}init(){this.scene=new ke,this.scene.background=new D(2581),this.camera=new Ae(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.set(0,0,48),this.camera.lookAt(0,0,0),this.renderer=new Me({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.renderer.setClearColor(2581,1),this.resourceId=Z.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.composer=new wt(this.renderer);const e=new vt(this.scene,this.camera);this.composer.addPass(e);const t=new bt(new We(this.canvas.width,this.canvas.height),.8,.2,.7);this.composer.addPass(t);const s=new xt;this.composer.addPass(s);const r=new Fe(1.5,32,32),o=new _e({color:new D("#ffaa33"),transparent:!0,opacity:.9,blending:Ee});this.fireball=new Te(r,o),this.scene.add(this.fireball);const c=new Fe(2.5,32,32),l=new _e({color:new D("#ff6611"),transparent:!0,opacity:.4,blending:Ee,side:yt});this.halo=new Te(c,l),this.scene.add(this.halo);const L=new Je(4210752,.8);this.scene.add(L);const x=new Oe(16777215,1);x.position.set(50,50,50),this.scene.add(x);const m=new Oe(6724095,.8);m.position.set(-50,-50,50),this.scene.add(m),this.pointLight=new ye(35071,2,100),this.scene.add(this.pointLight),this.sunLight=new Oe(16775388,1.2),this.sunLight.position.set(80,60,40),this.sunLight.target.position.set(0,0,0),this.sunLight.castShadow=!1,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.particleGeometry=new Fe(.5,8,8),this.particleMaterial=new _e({color:16777215,transparent:!0,opacity:1,blending:Ee,depthWrite:!1}),this.createParticleTexture(),this.instancedMesh=new Ct(this.particleGeometry,this.particleMaterial,this.maxParticles),this.instancedMesh.geometry.attributes.color===void 0&&(this.instancedMesh.instanceColor=new St(new Float32Array(this.maxParticles*3),3)),this.scene.add(this.instancedMesh);const u=new Ge,S=new Ce,f=new Ce(0,0,0);this.colorInside=new D("#ffa575"),this.colorOutside=new D("#0088ff");for(let y=0;y<this.maxParticles;y++)u.compose(S,new $e,f),this.instancedMesh.setMatrixAt(y,u),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(y,new D(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),window.addEventListener("resize",this.onResize.bind(this))}createParticleTexture(){const t=document.createElement("canvas");t.width=16,t.height=16;const s=t.getContext("2d"),r=16/2,o=s.createRadialGradient(r,r,0,r,r,r);o.addColorStop(0,"rgba(255, 255, 255, 0.6)"),o.addColorStop(.1,"rgba(255, 255, 255, 0.3)"),o.addColorStop(.3,"rgba(255, 255, 255, 0.1)"),o.addColorStop(1,"rgba(255, 255, 255, 0)"),s.fillStyle=o,s.beginPath(),s.arc(r,r,r*.8,0,Math.PI*2),s.fill(),this.particleTexture=new Ke(t)}getRandomParticleColor(){const e=Math.floor(Math.random()*this.particleColors.length);return this.particleColors[e]}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.frameCount++;const e=performance.now();e-this.lastFPSCheck>=1e3&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,this.currentFPS<30&&this.maxParticles>1e3?this.maxParticles=Math.max(1e3,this.maxParticles-100):this.currentFPS>50&&this.maxParticles<2e3&&(this.maxParticles=Math.min(2e3,this.maxParticles+50))),this.time+=.025;const t=this.sigma*(this.y-this.x)*this.dt,s=(this.x*(this.rho-this.z)-this.y)*this.dt,r=(this.x*this.y-this.beta*this.z)*this.dt;this.x+=t,this.y+=s,this.z+=r;const o=.8;this.fireball.position.set(this.x*o,this.y*o,this.z*o),this.halo.position.copy(this.fireball.position),this.halo.scale.setScalar(1+Math.sin(this.time*2)*.1),this.pointLight.position.copy(this.fireball.position),this.frameCount%2===0&&(this.trailPositions.push({x:this.x*o,y:this.y*o,z:this.z*o,life:1}),this.trailPositions.length>this.maxParticles&&this.trailPositions.shift());const c=new Ge,l=new Ce,L=new $e,x=new Ce;this.trailPositions.forEach((m,u)=>{const S=u/this.trailPositions.length,f=Math.sqrt(m.x*m.x+m.y*m.y+m.z*m.z),d=Math.min(f/40,1),C=(1-d*.5)*S*1.2+.3;if(l.set(m.x+(Math.random()-.5)*.08,m.y+(Math.random()-.5)*.08,m.z+(Math.random()-.5)*.08),x.set(C,C,C),c.compose(l,L,x),this.instancedMesh.setMatrixAt(u,c),this.instancedMesh.instanceColor){const v=Math.pow(1-d,2),k=new D;k.lerpColors(this.colorOutside,this.colorInside,v);const b=S*(1-d*.3);k.multiplyScalar(b),this.instancedMesh.setColorAt(u,k)}});for(let m=this.trailPositions.length;m<this.maxParticles;m++)x.set(0,0,0),c.compose(l,L,x),this.instancedMesh.setMatrixAt(m,c),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(m,new D(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),this.scene.rotation.y+=.005,this.scene.rotation.x+=.002,this.composer.render()}onResize(e,t){if(!this.renderer||!this.camera)return;const s=e||this.canvas.width,r=t||this.canvas.height;this.camera.aspect=s/r,this.camera.updateProjectionMatrix(),this.renderer.setSize(s,r,!1),this.composer&&this.composer.setSize(s,r)}updateThemeColors(){var e,t,s,r;if(!document.documentElement){console.warn("DOM not ready for theme color update");return}try{const o=getComputedStyle(document.documentElement),c=(e=o.getPropertyValue("--theme-primary"))==null?void 0:e.trim(),l=(t=o.getPropertyValue("--theme-secondary"))==null?void 0:t.trim(),L=(s=o.getPropertyValue("--theme-accent"))==null?void 0:s.trim();c&&(this.fireballColor.setStyle(c),this.particleColors[1].setStyle(c),this.colorOutside.setStyle(c)),l&&(this.particleColors[0].setStyle(l),this.colorInside.setStyle(l)),L&&this.particleColors[2].setStyle(L);const x=(r=o.getPropertyValue("--theme-background"))==null?void 0:r.trim();x&&this.scene&&(this.scene.background=new D(x),this.renderer&&this.renderer.setClearColor(new D(x),1)),this.fireball&&c&&this.fireball.material.color.setStyle(c),this.halo&&l&&this.halo.material.color.setStyle(l),this.pointLight&&c&&this.pointLight.color.setStyle(c),this.instancedMesh&&this.updateParticleColors()}catch(o){console.warn("Error updating theme colors:",o)}}updateParticleColors(){if(!this.instancedMesh||!this.instancedMesh.instanceColor)return;const e=this.instancedMesh.instanceColor.array;for(let t=0;t<this.trailPositions.length&&!(t>=this.maxParticles);t++){const s=t*3,r=this.trailPositions[t],o=this.colorInside.clone();o.lerp(this.colorOutside,1-r.life),e[s]=o.r,e[s+1]=o.g,e[s+2]=o.b}this.instancedMesh.instanceColor.needsUpdate=!0}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.composer&&(this.composer.dispose(),this.composer=null),this.renderer){const e=this.renderer.getContext();e&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").loseContext(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer=null}for(this.instancedMesh&&(this.scene.remove(this.instancedMesh),this.instancedMesh.geometry&&this.instancedMesh.geometry.dispose(),this.instancedMesh.material&&this.instancedMesh.material.dispose(),this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor=null),this.instancedMesh=null),this.fireball&&(this.scene.remove(this.fireball),this.fireball.geometry&&this.fireball.geometry.dispose(),this.fireball.material&&this.fireball.material.dispose(),this.fireball=null),this.halo&&(this.scene.remove(this.halo),this.halo.geometry&&this.halo.geometry.dispose(),this.halo.material&&this.halo.material.dispose(),this.halo=null),this.particleGeometry&&(this.particleGeometry.dispose(),this.particleGeometry=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.particleTexture&&(this.particleTexture.dispose(),this.particleTexture=null),this.trailPositions=[],this.trailColors=[],this.pointLight&&(this.scene.remove(this.pointLight),this.pointLight=null),this.sunLight&&(this.scene.remove(this.sunLight),this.scene.remove(this.sunLight.target),this.sunLight=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,this.resourceId&&(Z.cleanup(this.resourceId),this.resourceId=null),window.removeEventListener("resize",this.onResize.bind(this))}}class Rt{constructor(e,t={},s="BackgroundCanvas"){this.canvas=e,this.componentId=s,this.renderer=null,this.scene=null,this.camera=null,this.mesh=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.particleCount=t.particleCount||8e3,this.branches=3,this.radius=9,this.size=t.size||.12,this.colorInside=new D("#10B981"),this.colorOutside=new D("#34D399"),this.updateThemeColors();try{this.init()}catch(r){throw console.error("EffectChaos: Failed to initialize Three.js",r),r}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),s=e.getPropertyValue("--theme-accent").trim();t&&this.colorInside.setStyle(t),s&&this.colorOutside.setStyle(s);const r=e.getPropertyValue("--theme-background").trim();r&&this.scene&&(this.scene.background=new D(r)),this.mesh&&this.updateParticleColors(),this.updateLightColors()}updateLightColors(){this.lights&&(this.lights.central&&this.lights.central.color.copy(this.colorInside.clone().multiplyScalar(1.5)),this.lights.green&&this.lights.green.color.copy(this.colorInside),this.lights.ambient&&this.lights.ambient.color.copy(this.colorInside.clone().multiplyScalar(.3)),this.lights.fill1&&this.lights.fill1.color.copy(this.colorInside),this.lights.fill2&&this.lights.fill2.color.copy(this.colorOutside),this.lights.back&&this.lights.back.color.copy(this.colorOutside.clone().multiplyScalar(1.2)))}updateParticleColors(){if(!this.mesh||!this.particleData)return;const e=this.mesh.geometry.attributes.color.array;for(let t=0;t<this.particleCount;t++){const s=this.particleData[t],r=t*3,o=this.colorInside.clone();o.lerp(this.colorOutside,s.radiusRatio),e[r]=o.r,e[r+1]=o.g,e[r+2]=o.b}this.mesh.geometry.attributes.color.needsUpdate=!0}init(){this.camera=new Ae(60,this.canvas.width/this.canvas.height,.1,100),this.camera.position.set(0,2,8),this.camera.lookAt(0,-2,0),this.scene=new ke,this.scene.background=new D(0),this.renderer=new Me({canvas:this.canvas,antialias:!1,powerPreference:"low-power",precision:"mediump"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=Z.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.canvas.addEventListener("webglcontextlost",this.onContextLost.bind(this)),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored.bind(this)),this.createGalaxy(),window.addEventListener("resize",this.onResize.bind(this))}createGalaxy(){const e=new Ze;this.positions=new Float32Array(this.particleCount*3),this.colors=new Float32Array(this.particleCount*3),this.particleData=[];for(let u=0;u<this.particleCount;u++){const S=Math.random(),f=Math.pow(S,1.5)*this.radius,d=Math.random()*Math.PI*2,C=Math.pow(Math.random()*2-1,3)*S*.2,v=Math.pow(Math.random()*2-1,3)*S*.05,k=Math.pow(Math.random()*2-1,3)*S*.2;this.particleData.push({radiusRatio:S,radius:f,branchAngle:d,randomX:C,randomY:v,randomZ:k});const b=Math.pow(1-S,2),P=this.colorInside.clone();P.lerp(this.colorOutside,1-b);const E=u*3;this.colors[E]=P.r,this.colors[E+1]=P.g,this.colors[E+2]=P.b}e.setAttribute("position",new Ve(this.positions,3)),e.setAttribute("color",new Ve(this.colors,3));const t=document.createElement("canvas");t.width=64,t.height=64;const s=t.getContext("2d"),r=s.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(255, 255, 255, 1)"),r.addColorStop(.4,"rgba(255, 255, 255, 0.8)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),s.fillStyle=r,s.fillRect(0,0,64,64);const o=new Ke(t),c=new Qe({size:this.size*2,sizeAttenuation:!0,depthWrite:!1,blending:Ee,vertexColors:!0,transparent:!0,opacity:.9,map:o,alphaTest:.05});this.mesh=new et(e,c),this.scene.add(this.mesh),this.updatePositions(),this.centralLight=new ye(this.colorInside.clone().multiplyScalar(1.5),2.5,40),this.centralLight.position.set(0,-1,0),this.scene.add(this.centralLight);const l=new ye(this.colorInside,1.8,35);l.position.set(0,-1,0),this.scene.add(l),this.ambientLight=new Je(this.colorInside.clone().multiplyScalar(.3),.4),this.scene.add(this.ambientLight);const L=new ye(this.colorInside,1.2,25);L.position.set(-5,0,5),this.scene.add(L);const x=new ye(this.colorOutside,1.2,25);x.position.set(5,0,5),this.scene.add(x);const m=new ye(this.colorOutside.clone().multiplyScalar(1.2),.8,50);m.position.set(0,2,-10),this.scene.add(m),this.lights={central:this.centralLight,green:l,ambient:this.ambientLight,fill1:L,fill2:x,back:m}}updatePositions(){for(let e=0;e<this.particleCount;e++){const t=this.particleData[e],s=e*3,r=t.branchAngle+this.time*(1-t.radiusRatio),o=Math.cos(r)*t.radius,c=Math.sin(r)*t.radius,l=-Math.abs(t.radius*.3);this.positions[s]=o+t.randomX,this.positions[s+1]=l+t.randomY-2,this.positions[s+2]=c+t.randomZ}this.mesh.geometry.attributes.position.needsUpdate=!0}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.008,this.updatePositions(),this.renderer.render(this.scene,this.camera)}onResize(e,t){if(!this.renderer||!this.camera)return;const s=e||this.canvas.width,r=t||this.canvas.height;this.camera.aspect=s/r,this.camera.updateProjectionMatrix(),this.renderer.setSize(s,r,!1)}onContextLost(e){e.preventDefault(),console.warn("WebGL context lost. Attempting to restore..."),this.animationId=null,this.contextLost=!0}onContextRestored(){this.init(),this.start()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.mesh&&this.scene&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null),this.scene&&this.scene.children)for(;this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,window.removeEventListener("resize",this.onResize.bind(this))}cleanup(){for(this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}}destroy(){this.stop(),this.resourceId&&(Z.cleanup(this.resourceId),this.resourceId=null)}}const Pt=`
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
`,_t=`
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
`;class Pe{constructor(e,t={},s="BackgroundCanvas"){this.canvas=e,this.componentId=s,this.renderer=null,this.scene=null,this.camera=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.waveSourceCount=t.waveSourceCount||6,this.maxRings=t.maxRings||8,this.waveSpeed=t.waveSpeed||1.2,this.ringSpacing=t.ringSpacing||45,this.maxRadius=t.maxRadius||400,this.waveColor=new D("#00ffff"),this.sourceColor=new D("#4dd0e1"),this.waveSources=[],this.waveRings=[],this.sourceGeometry=null,this.ringGeometries=[],this.sourceMaterial=null,this.ringMaterials=[],this.sourcePoints=null,this.ringMeshes=[],this.mouse=new We,this.lastRippleTime=0,this.rippleInterval=2e3,this.updateThemeColors();try{this.init()}catch(r){throw console.error("EffectRippleWaves: Failed to initialize Three.js",r),r}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),s=e.getPropertyValue("--theme-accent").trim();t&&this.waveColor.setStyle(t),s&&this.sourceColor.setStyle(s),this.sourceMaterial&&this.sourceMaterial.color.copy(this.sourceColor),this.ringMeshes.forEach(r=>{r.userData.isShaderRipple&&r.material.uniforms?(r.material.uniforms.primaryColor.value.copy(this.waveColor),r.material.uniforms.accentColor.value.copy(this.sourceColor)):r.material.color&&r.material.color.copy(this.waveColor)})}init(){this.camera=new Ae(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.z=400,this.scene=new ke,this.scene.background=new D(0),this.renderer=new Me({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=Z.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.createWaveSources(),this.setupMouseInteraction(),setTimeout(()=>{this.waveSources.forEach((e,t)=>{setTimeout(()=>{this.createRipple(t,e.position)},t*300)})},100),window.addEventListener("resize",this.onResize.bind(this)),this.animate()}createWaveSources(){this.sourceGeometry=new Ze,this.sourceMaterial=new Qe({color:this.sourceColor,size:10,transparent:!0,opacity:0,sizeAttenuation:!0});const e=[];for(let t=0;t<this.waveSourceCount;t++){const s=t/this.waveSourceCount*Math.PI*2,r=100+Math.random()*50,o={position:new Ce(Math.cos(s)*r,Math.sin(s)*r,0),lastWaveTime:Date.now()+t*400,waveInterval:1800+Math.random()*600,pulsePhase:Math.random()*Math.PI*2,waves:[]};this.waveSources.push(o),e.push(o.position.x,o.position.y,o.position.z)}this.sourceGeometry.setAttribute("position",new Et(e,3)),this.sourcePoints=new et(this.sourceGeometry,this.sourceMaterial)}createRipple(e,t){const s=this.waveSources[e],r={sourceIndex:e,position:t.clone(),radius:0,maxRadius:this.maxRadius,speed:this.waveSpeed,opacity:1,creationTime:Date.now(),startTime:this.time};s.waves.push(r);const o=new He(0,this.maxRadius,64,1),c=new Xe({uniforms:{time:{value:this.time},center:{value:new We(t.x,t.y)},waveRadius:{value:0},maxRadius:{value:this.maxRadius},primaryColor:{value:this.waveColor.clone()},accentColor:{value:this.sourceColor.clone()},opacity:{value:1}},vertexShader:Pt,fragmentShader:_t,transparent:!0,side:tt,blending:Ee,depthWrite:!1}),l=new Te(o,c);return l.position.copy(t),l.userData={wave:r,sourceIndex:e,isShaderRipple:!0},this.scene.add(l),this.ringMeshes.push(l),r}setupMouseInteraction(){const e=s=>{const r=this.canvas.getBoundingClientRect();this.mouse.x=(s.clientX-r.left)/r.width*2-1,this.mouse.y=-((s.clientY-r.top)/r.height)*2+1},t=s=>{e(s);const r=new Ce(this.mouse.x*300,this.mouse.y*200,0);let o=0,c=1/0;this.waveSources.forEach((l,L)=>{const x=l.position.distanceTo(r);x<c&&(c=x,o=L)}),this.createRipple(o,r)};this.canvas.addEventListener("click",t),window.addEventListener("mousemove",e)}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.016;const e=Date.now();this.updateWaveSources(),this.generateAutoRipples(e),this.updateRipples(),this.cleanupExpiredRipples(),this.renderer.render(this.scene,this.camera)}updateWaveSources(){for(let e=0;e<this.waveSources.length;e++){const t=this.waveSources[e];t.pulsePhase+=.03}}generateAutoRipples(e){if(this.waveSources.forEach((t,s)=>{e-t.lastWaveTime>t.waveInterval&&(this.createRipple(s,t.position),t.lastWaveTime=e,t.waveInterval=1800+Math.random()*600)}),this.ringMeshes.length===0&&e>this.time*1e3+1e3){const t=Math.floor(Math.random()*this.waveSources.length);this.createRipple(t,this.waveSources[t].position)}}updateRipples(){this.ringMeshes.forEach(e=>{const t=e.userData.wave;if(!t)return;t.radius+=t.speed;const s=t.radius/t.maxRadius;if(t.opacity=Math.max(0,Math.sin((1-s)*Math.PI*.5)),e.userData.isShaderRipple&&e.material.uniforms){const r=e.material.uniforms;r.time.value=this.time,r.waveRadius.value=t.radius,r.opacity.value=t.opacity,r.primaryColor.value.copy(this.waveColor),r.accentColor.value.copy(this.sourceColor);const c=(this.time-t.startTime)*.5%(Math.PI*2)/(Math.PI*2),l=new D().setHSL(c,.8,.6);r.accentColor.value.lerp(l,.3)}else{const r=Math.max(0,t.radius-3),o=t.radius;e.geometry.dispose(),e.geometry=new He(r,o,32),e.material.opacity=t.opacity*.3}this.calculateInterference(t,e)})}calculateInterference(e,t){let s=0;if(this.ringMeshes.forEach(r=>{if(r===t)return;const o=r.userData.wave;if(!o)return;const c=e.position.distanceTo(o.position);Math.abs(e.radius-o.radius)<15&&c<e.radius+o.radius&&(s+=.4)}),t.userData.isShaderRipple&&t.material.uniforms){const r=t.material.uniforms.opacity.value;if(t.material.uniforms.opacity.value=Math.min(1,r+s),s>0){const o=this.waveColor.clone().multiplyScalar(1+s*.5);t.material.uniforms.primaryColor.value.lerp(o,.3)}}else t.material.opacity=Math.min(.8,t.material.opacity+s)}cleanupExpiredRipples(){for(let e=this.ringMeshes.length-1;e>=0;e--){const t=this.ringMeshes[e],s=t.userData.wave;if((!s||s.radius>s.maxRadius)&&(this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose(),this.ringMeshes.splice(e,1),s.sourceIndex!==void 0)){const r=this.waveSources[s.sourceIndex],o=r.waves.indexOf(s);o>-1&&r.waves.splice(o,1)}}}onResize(){!this.camera||!this.renderer||(this.camera.aspect=this.canvas.width/this.canvas.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.canvas.width,this.canvas.height,!1))}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),window.removeEventListener("resize",this.onResize.bind(this)),this.ringMeshes.forEach(e=>{this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(e.material.uniforms&&Object.values(e.material.uniforms).forEach(t=>{t.value&&t.value.dispose&&t.value.dispose()}),e.material.dispose())}),this.sourceGeometry&&this.sourceGeometry.dispose(),this.sourceMaterial&&this.sourceMaterial.dispose(),this.resourceId&&(Z.cleanup(this.resourceId),this.resourceId=null)}destroy(){this.stop()}}const st=({effectType:a="effectfuse",sectionName:e="unknown"})=>{const t=n.useRef(null),s=n.useRef(null),r=n.useRef(null),o=n.useRef(null),c=he(l=>l.theme);return n.useEffect(()=>{r.current&&(clearTimeout(r.current),r.current=null);let l=t.current;if(!l){l=document.createElement("canvas"),l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.zIndex="-1",l.style.pointerEvents="none",l.style.background="transparent";const u=window.innerWidth,S=window.innerHeight,f=1280,y=720,d=u/S;let C,v;d>f/y?(C=Math.min(f,u),v=Math.floor(C/d)):(v=Math.min(y,S),C=Math.floor(v*d)),C=Math.max(C,800),v=Math.max(v,600),l.width=C,l.height=v,document.body.appendChild(l),t.current=l}const L=()=>{var u;if(l)try{const S=window.innerWidth,f=window.innerHeight,y=1280,d=720,C=S/f;let v,k;C>y/d?(v=Math.min(y,S),k=Math.floor(v/C)):(k=Math.min(d,f),v=Math.floor(k*C)),v=Math.max(v,800),k=Math.max(k,600),l.width=v,l.height=k,(u=s.current)!=null&&u.onResize&&s.current.onResize(l.width,l.height)}catch(S){console.error("Error resizing canvas:",S)}};L(),(()=>{var S,f;if(s.current){const y=s.current;s.current=null,r.current=setTimeout(()=>{try{typeof y.stop=="function"?y.stop():typeof y.destroy=="function"&&y.destroy()}catch{}},200)}const u={brightness:.6,blobiness:1.5,particles:10,scanlines:!1,energy:1.01,timeScale:1};try{const y=`BackgroundCanvas_${e}`;switch(a){case"effectfuse":{s.current=new Mt(l,u,y);break}case"effectmonjori":s.current=Lt(l,u,y);break;case"effectheartbeats":s.current=new Pe(l,u,y);break;case"effectlorenz":{s.current=new jt(l,u,y);break}case"effectchaos":{const d={particleCount:2e3,branches:3,radius:9,spin:1,randomness:.15,randomnessPower:3,size:.12,colorInside:u.colorInside||"#fff8dc",colorOutside:u.colorOutside||"#ffa575"};s.current=new Rt(l,d,y);break}case"effectripple":{const d={waveSourceCount:6,maxRings:8,waveSpeed:1.2,ringSpacing:45,maxRadius:400};s.current=new Pe(l,d,y);break}default:s.current=new Pe(l,u,y)}(S=s.current)!=null&&S.start&&s.current.start(),o.current=Z.registerResources(y,{canvas:l,effect:s.current,effectType:a},{persistent:!1})}catch(y){if(console.error("Error creating background effect:",y),a==="effectfuse"||a==="effectlorenz"||a==="effectchaos")try{s.current=new Pe(l,u),(f=s.current)!=null&&f.start&&s.current.start()}catch(d){console.error("Error creating fallback effect:",d),s.current=null}else s.current=null}})();const m=mt.debounce(L,250);return window.addEventListener("resize",m),()=>{if(window.removeEventListener("resize",m),r.current&&(clearTimeout(r.current),r.current=null),s.current)try{typeof s.current.stop=="function"?s.current.stop():typeof s.current.destroy=="function"&&s.current.destroy()}catch(u){console.error("Error cleaning up effect:",u)}finally{s.current=null}if(o.current?(Z.cleanup(o.current),o.current=null):Z.cleanupByComponent(`BackgroundCanvas_${e}`),l&&document.body.contains(l))try{document.body.removeChild(l)}catch(u){console.error("Error removing canvas:",u)}t.current=null,typeof window<"u"&&window.gc&&setTimeout(()=>window.gc(),100)}},[a,e]),n.useEffect(()=>{const l=["effectchaos","effectlorenz","effectmonjori","effectripple"];s.current&&s.current.updateThemeColors&&l.includes(a)&&s.current.updateThemeColors()},[c,a]),null};st.propTypes={effectType:$.string,sectionName:$.string};const At=n.lazy(()=>pe(()=>import("./home-YXa0FyMF.js").then(a=>a.H),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),It=n.lazy(()=>pe(()=>import("./projects-C1wVCXUs.js").then(a=>a.P),__vite__mapDeps([11,1,2,3,4,12,13,5,6,7,8,0,9,10,14]))),Bt=n.lazy(()=>pe(()=>import("./gallery-DvnffbyB.js").then(a=>a.G),__vite__mapDeps([6,1,2,3,4,7,5,8]))),Nt=n.lazy(()=>pe(()=>import("./EducationSection-kj8dDyhF.js"),__vite__mapDeps([15,1,2,3,4,5,0,6,7,8,9,10,11,12,13,14,16]))),Dt=n.lazy(()=>pe(()=>import("./ContactSection-Tr86oqJY.js"),__vite__mapDeps([17,1,2,3,4,5,11,12,13,6,7,8,0,9,10,14,18]))),zt=n.lazy(()=>pe(()=>import("./about-DvPcWx0J.js").then(a=>a.A),__vite__mapDeps([5,1,2,3,4]))),Ft=()=>{const{currentSection:a,sections:e,navigateToSection:t,navigateNext:s,navigatePrev:r,isScrolling:o,getCurrentSectionData:c,language:l,enableOpeningAnimation:L,isProjectModalOpen:x}=he(),m={DESKTOP_THRESHOLD:600,MOBILE_THRESHOLD:200,RESET_TIME:256,PREVIEW_MAX_OFFSET:80,BOUNDARY_THRESHOLD:50,BOUNCE_MAX_OFFSET:30,LONG_CONTENT_SECTIONS:["projects","education","about","contact","gallery"]},{DESKTOP_THRESHOLD:u,MOBILE_THRESHOLD:S,RESET_TIME:f,PREVIEW_MAX_OFFSET:y,BOUNDARY_THRESHOLD:d,BOUNCE_MAX_OFFSET:C,LONG_CONTENT_SECTIONS:v}=m,k=n.useRef(null),b=n.useRef(null),P=n.useRef(0),E=n.useRef(0),w=n.useRef(),N=n.useRef({x:0,y:0,time:0}),F=n.useRef(0),[G,Le]=n.useState("slide"),[U,ge]=n.useState(!1),[ne,Ie]=n.useState({}),[Q,ie]=n.useState(!1),[de,ee]=n.useState(0),[J,q]=n.useState(!1),[le,X]=n.useState("none"),R=c(),V=(R==null?void 0:R.id)==="home",ue=v.includes(R==null?void 0:R.id);n.useEffect(()=>{if(R!=null&&R.id){const h=R.id,g=setTimeout(()=>{Z.cleanupOtherSections(`BackgroundCanvas_${h}`,["HeroCube"])},3e3);return()=>clearTimeout(g)}},[R==null?void 0:R.id]);const se=n.useCallback(h=>{if(!h)return{isAtTop:!1,isAtBottom:!1,currentScrollTop:0,maxScrollTop:0};const g=h.scrollTop,p=h.scrollHeight-h.clientHeight;return{isAtTop:g<=d,isAtBottom:g>=p-d,currentScrollTop:g,maxScrollTop:p}},[d]),Be=n.useMemo(()=>({home:At,about:zt,projects:It,gallery:Bt,education:Nt,contact:Dt}),[]),Y=n.useCallback(()=>{if(!b.current)return;const h=b.current,g=h.getBoundingClientRect(),p=h.scrollHeight>g.height+10;window.innerWidth<768&&ue&&!p&&setTimeout(()=>{if(b.current){const H=b.current.getBoundingClientRect(),_=b.current.scrollHeight>H.height+10;ge(_),Le(V?"slide":_?"content":"slide")}},500),ge(p),Le(V?"slide":p?"content":"slide")},[V,ue]),oe=n.useCallback((h,g=.5)=>{w.current&&clearTimeout(w.current),X(h),q(!0);const p=Math.min(g*C,C),j=h==="up"?-p:p;ee(j),ie(!0),w.current=setTimeout(()=>{ie(!1),ee(0),setTimeout(()=>{q(!1),X("none")},300)},150)},[C]),ce=n.useCallback(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>{Q&&E.current<u&&(ie(!1),ee(0),E.current=0)},150)},[Q,u]),we=n.useCallback(h=>{if(G!=="content"){const g=h.deltaY>0?1:-1,p=g>0&&a>=e.length-1,j=g<0&&a<=0;let T=1;(p||j)&&(T=.5);const H=Math.min(E.current/u,1),_=p||j?15:y,O=g*H*_*T;if(Q||ie(!0),ee(O),p||j){const K=Math.min(E.current/u,1),re=p?"down":"up";return w.current&&clearTimeout(w.current),w.current=setTimeout(()=>{oe(re,K)},100),!0}else return ce(),!1}return!1},[G,a,e.length,Q,ce,oe,u,y]),je=n.useCallback(()=>{if(E.current=0,ie(!1),ee(0),q(!1),X("none"),w.current&&clearTimeout(w.current),b.current){const h=R==null?void 0:R.id;if(h==="home"){const p=b.current;p.style.transform="translateY(0)",p.style.transition="none",p.scrollTop=0,requestAnimationFrame(()=>{p&&(p.offsetHeight,p.style.transition="")});return}(ne[h]!==void 0?ne[h]==="bottom":!!(U&&(R==null?void 0:R.previousDirection)==="from-next"))?requestAnimationFrame(()=>{if(b.current){const p=b.current.scrollHeight-b.current.clientHeight;b.current.scrollTop=p}}):b.current.scrollTop=0}},[R,U,ne]),A=n.useCallback(h=>{if(o||x)return;const g=h.touches[0];N.current={x:g.clientX,y:g.clientY,time:Date.now()},F.current=0},[o,x]),I=n.useCallback(h=>{if(o||x)return;const g=h.touches[0],p=g.clientY-N.current.y,j=g.clientX-N.current.x;if(!(Math.abs(j)>Math.abs(p))){if(F.current=Math.abs(p),V||!U&&G==="slide"){if(F.current>=S){h.preventDefault();const T=p<0,H=p>0;F.current=0,T&&a<e.length-1?s():H&&a>0&&r()}return}if(G==="content"&&U&&!V){const T=b.current;if(!T)return;const{isAtTop:H,isAtBottom:_}=se(T);if(F.current>=S){const O=p<0,K=p>0;if(O&&_&&a<e.length-1){h.preventDefault(),F.current=0,s();return}else if(K&&H&&a>0){h.preventDefault(),F.current=0,r();return}}}}},[o,x,G,U,V,a,e.length,s,r,se,S]),M=n.useCallback(()=>{F.current=0},[]),z=n.useCallback(h=>{const g=Date.now();if(o||x)return;if(G==="content"&&U&&!V){const _=b.current;if(!_)return;const{isAtTop:O,isAtBottom:K,currentScrollTop:re,maxScrollTop:ve}=se(_),me=h.deltaY>0,be=h.deltaY<0;if(me)if(K){if(g-P.current>f&&(E.current=0),P.current=g,E.current<u){if(E.current+=Math.abs(h.deltaY),re>=ve-5){const ae=Math.min(E.current/u,1);oe("down",ae)}E.current>=u&&a<e.length-1&&(E.current=0,s());return}}else{E.current=0;return}else if(be)if(O){if(g-P.current>f&&(E.current=0),P.current=g,E.current<u){if(E.current+=Math.abs(h.deltaY),re<=5){const ae=Math.min(E.current/u,1);oe("up",ae)}E.current>=u&&a>0&&(E.current=0,r());return}}else{E.current=0;return}return}(V||!U&&G==="slide")&&h.preventDefault(),g-P.current>f&&(Q?ce():(E.current=0,ie(!1),ee(0))),P.current=g;const p=Math.abs(h.deltaY);E.current+=p;const j=b.current;if(j&&G==="content"&&U){const _=R==null?void 0:R.id;if(_){const{currentScrollTop:O,maxScrollTop:K}=se(j),re=O>=K-10?"bottom":O<=10?"top":"middle";ne[_]!==re&&Ie(ve=>({...ve,[_]:re}))}}if(G!=="content"&&we(h)||E.current<u||(E.current=0,ie(!1),ee(0),!j))return;const T=h.deltaY>0,H=h.deltaY<0;T&&a<e.length-1?s():H&&a>0&&r()},[o,x,G,U,V,a,e.length,s,r,R,Q,ne,oe,we,ce,se,f,u]),W=n.useCallback(h=>{if(o||x)return;const g=b.current;switch(h.key){case"ArrowDown":if(h.preventDefault(),G==="content"&&U&&!V&&g){const{isAtBottom:p,maxScrollTop:j}=se(g);if(p)a<e.length-1&&s();else{const T=Math.min(g.scrollTop+100,j);g.scrollTop=T}}else a<e.length-1&&s();break;case"ArrowUp":if(h.preventDefault(),G==="content"&&U&&!V&&g){const{isAtTop:p}=se(g);if(p)a>0&&r();else{const j=Math.max(g.scrollTop-100,0);g.scrollTop=j}}else a>0&&r();break;case"PageDown":case" ":h.preventDefault(),a<e.length-1&&s();break;case"PageUp":h.preventDefault(),a>0&&r();break;case"Home":h.preventDefault(),G==="content"&&!V&&g?g.scrollTop=0:t(0);break;case"End":if(h.preventDefault(),G==="content"&&!V&&g){const{maxScrollTop:p}=se(g);g.scrollTop=p}else t(e.length-1);break;default:{const p=parseInt(h.key);p>=1&&p<=e.length&&(h.preventDefault(),t(p-1));break}}},[o,x,G,U,V,a,e.length,s,r,t,se]);n.useEffect(()=>{const h=new CustomEvent("scrollBounce",{detail:{isBouncing:J,direction:le,intensity:E.current/u}});window.dispatchEvent(h)},[J,le,u]),n.useEffect(()=>{ie(!1),ee(0),q(!1),X("none"),E.current=0,w.current&&clearTimeout(w.current);const h=setTimeout(()=>{je(),Y()},50);return()=>{clearTimeout(h)}},[a,je,Y]),n.useEffect(()=>{if(Y(),window.innerWidth<768&&ue){const g=[50,100,200,300,500,800,1200].map(H=>setTimeout(()=>{Y()},H)),p=()=>g.forEach(H=>clearTimeout(H)),j=()=>{setTimeout(()=>{Y()},50)},T=b.current;return T&&T.querySelectorAll("img").forEach(_=>{_.complete?j():(_.addEventListener("load",j,{once:!0}),_.addEventListener("error",j,{once:!0}))}),()=>{p(),T&&T.querySelectorAll("img").forEach(_=>{_.removeEventListener("load",j),_.removeEventListener("error",j)})}}else{const g=setTimeout(()=>Y(),50),p=setTimeout(()=>Y(),150),j=setTimeout(()=>Y(),300);return()=>{clearTimeout(g),clearTimeout(p),clearTimeout(j)}}},[a,Y,ue]),n.useEffect(()=>{const h=k.current;let g;const p=()=>{g&&clearTimeout(g),g=setTimeout(()=>{Y()},100)};if(h)return h.addEventListener("wheel",z,{passive:!1}),h.addEventListener("touchstart",A,{passive:!1}),h.addEventListener("touchmove",I,{passive:!1}),h.addEventListener("touchend",M,{passive:!1}),document.addEventListener("keydown",W),window.addEventListener("resize",p),()=>{h.removeEventListener("wheel",z),h.removeEventListener("touchstart",A),h.removeEventListener("touchmove",I),h.removeEventListener("touchend",M),document.removeEventListener("keydown",W),window.removeEventListener("resize",p),w.current&&clearTimeout(w.current),g&&clearTimeout(g)}},[z,A,I,M,W,Y]);const B=()=>{if(!R)return null;const h=Be[R.id];return h?i.jsx(n.Suspense,{fallback:i.jsx("div",{className:"flex items-center justify-center h-full",children:i.jsx("div",{className:"text-white text-xl",children:"Loading..."})}),children:i.jsx(h,{section:R,language:l,...R.id==="home"?{sections:e,onSectionChange:t,enableOpeningAnimation:L}:{}})}):null};return i.jsxs("div",{ref:k,className:"relative w-full m-0 p-0 h-screen",style:{overflow:"hidden",height:"var(--vh-fallback, 100vh)",minHeight:"100dvh"},children:[(R==null?void 0:R.backgroundEffect)&&i.jsx(st,{effectType:R.backgroundEffect,sectionName:R.id||"unknown"}),i.jsx("div",{ref:b,className:`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${V?"scroll-mode-home overflow-hidden":U?"scroll-mode-auto overflow-y-auto":"overflow-hidden"} ${J?"bouncing":""}`,style:{transform:Q&&!J?`translateY(${de}px)`:"translateY(0)",transition:o||Q&&!J?"none":J?"transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)":"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",willChange:o||Q||J?"transform":"auto"},children:B()}),o&&i.jsx("div",{className:"fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"})]})};function Se(){const a=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${a}px`),document.documentElement.style.setProperty("--vh-fallback",`${window.innerHeight}px`),CSS.supports("height","100dvh")||document.documentElement.style.setProperty("--dvh-fallback",`${window.innerHeight}px`)}function Ot(){Se();let a;if(window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(Se,100)}),screen.orientation?screen.orientation.addEventListener("change",()=>{setTimeout(Se,200)}):window.addEventListener("orientationchange",()=>{setTimeout(Se,200)}),/iPhone|iPad|iPod/.test(navigator.userAgent)){let e;window.addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(Se,150)},{passive:!0})}}function Wt(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}const Ht=["a","button","input","select","textarea","[onclick]",'[role="button"]','[role="link"]','[role="menuitem"]','[tabindex]:not([tabindex="-1"])',".clickable",".btn",".button",".cursor-pointer","summary","label",'[data-clickable="true"]'],Ut=["canvas","svg","img","video",".hero-cube",".effect-avatar",".lorenz-attractor",'[data-no-custom-cursor="true"]','[style*="pointer-events: none"]','[style*="pointerEvents: none"]',".h-screen.w-screen",".overflow-hidden",".background-container",".bg-container"],Gt=()=>{const{getThemeColors:a}=qe(),e=a(),{currentSection:t,getText:s}=he(),r=t===0,o=n.useCallback(()=>Wt()||"ontouchstart"in window||navigator.maxTouchPoints>0||window.innerWidth<=768,[]),c=()=>s("home.desktopScrollHint"),[l,L]=n.useState({x:0,y:0}),[x,m]=n.useState(!1),[u,S]=n.useState("none"),[f,y]=n.useState(!1),[d,C]=n.useState(0),[v,k]=n.useState(0),[b,P]=n.useState(0),[E,w]=n.useState(0),[N,F]=n.useState(!1),[G,Le]=n.useState(0),[U,ge]=n.useState(null),[ne,Ie]=n.useState(!1),{sections:Q,isPointerLocked:ie}=he(),de=n.useRef(),ee=n.useRef(0),J=n.useRef(),q=n.useRef(),le=n.useRef(null),X=n.useRef(new WeakMap),R=n.useRef({x:-1,y:-1,result:!1,timestamp:0}),V=n.useRef({currentScrollDelta:0,animatedValue:0,isAnimatingDown:!1,scrollIntensity:0});n.useEffect(()=>{V.current={currentScrollDelta:b,animatedValue:E,isAnimatingDown:N,scrollIntensity:d}},[b,E,N,d]);const ue=n.useCallback((A,I)=>{const M=R.current,z=performance.now();if(Math.sqrt(Math.pow(A-M.x,2)+Math.pow(I-M.y,2))<10&&z-M.timestamp<50)return M.result;const B=document.elementFromPoint(A,I);if(!B)return R.current={x:A,y:I,result:!1,timestamp:z},!1;if(X.current.has(B)){const _=X.current.get(B);return R.current={x:A,y:I,result:_,timestamp:z},_}const h=Ht,g=Ut;if(B.hasAttribute("data-no-custom-cursor")||B.hasAttribute("data-hero-cube-canvas")||B.classList.contains("hero-cube-canvas"))return X.current.set(B,!1),!1;const p=window.getComputedStyle(B);if(p.pointerEvents==="none"||p.cursor==="none"&&(B.classList.contains("h-screen")||B.classList.contains("w-screen")||B.classList.contains("overflow-hidden")))return X.current.set(B,!1),!1;if(B.tagName.toLowerCase()==="canvas"){const _=B.parentElement;if(_&&(_.classList.contains("hero-cube")||_.hasAttribute("data-hero-cube")||_.style.pointerEvents==="none"||B.style.pointerEvents==="none"))return X.current.set(B,!1),!1}let j=!1,T=B,H=0;for(;T&&T!==document.body&&H<5;){if(g.some(O=>{try{return T.matches(O)}catch{return!1}})){j=!1;break}if(T.tagName.toLowerCase()==="div"){const O=window.getComputedStyle(T),K=T.classList;if(O.cursor==="none"&&(K.contains("h-screen")||K.contains("w-screen"))){j=!1;break}const re=["h-screen","w-screen","overflow-hidden","relative","absolute","fixed"];if(Array.from(K).every(me=>re.includes(me)||me.startsWith("bg-")||me.startsWith("backdrop-"))&&O.cursor==="none"){j=!1;break}}if(h.some(O=>{try{return T.matches(O)}catch{return!1}})){j=!0;break}if(window.getComputedStyle(T).cursor==="pointer"){const O=T.tagName.toLowerCase();if(!["canvas","svg","img","video"].includes(O)&&(T.hasAttribute("onclick")||T.hasAttribute("role")||T.hasAttribute("tabindex")||T.classList.contains("clickable")||T.classList.contains("btn")||T.classList.contains("button")||["a","button","input","select","textarea"].includes(O))){j=!0;break}}if(T.onclick||T.getAttribute("data-testid")||T.classList.contains("cursor-pointer")){j=!0;break}T=T.parentElement,H++}if(X.current.set(B,j),R.current={x:A,y:I,result:j,timestamp:performance.now()},X.current.size>100){const _=Array.from(X.current.entries());X.current.clear(),_.slice(-50).forEach(([O,K])=>{X.current.set(O,K)})}return j},[]),se=n.useCallback(()=>{const A=t>0,I=t<Q.length-1;return A&&I?"both":A?"up":I?"down":"none"},[t,Q.length]),Be=n.useCallback(()=>{const A=t>0,I=t<Q.length-1;le.current||(le.current=document.querySelector(".scroll-mode-auto"));const M=le.current;let z=!1,W=!0,B=!0;return M&&(z=M.scrollHeight>M.clientHeight+10,W=M.scrollTop<=5,B=M.scrollTop>=M.scrollHeight-M.clientHeight-5),{isTopBoundary:!A&&(!z||W),isBottomBoundary:!I&&(!z||B),hasNowhereToGo:!A&&!I&&!z,hasContentToScroll:z}},[t,Q.length]);n.useCallback(()=>{q.current&&(cancelAnimationFrame(q.current),q.current=null),F(!0);const A=Math.abs(b);if(A===0){F(!1),w(0),P(0),C(0);return}const I=performance.now(),M=Math.min(A*2,600),z=()=>{const B=performance.now()-I,h=Math.min(B/M,1),g=1-Math.pow(1-h,4),p=Math.round(A*(1-g));w(p),h<1?q.current=requestAnimationFrame(z):(w(0),P(0),F(!1),setTimeout(()=>{C(0),ge(null),setTimeout(()=>{w(0),P(0)},100)},50),q.current=null)};q.current=requestAnimationFrame(z)},[b]),n.useEffect(()=>{S(se())},[se]);const Y=n.useCallback(A=>{const I=A.deltaY,M=Math.min(Math.abs(I)/30,1),z=Math.abs(I);let W=1;z<10?W=2:z<30?W=1.5:z>100&&(W=.8);const B=Math.min(M*W,1),h=I>0?"down":"up",g=performance.now();if(g-(Y.lastTime||0)<8)return;Y.lastTime=g,q.current&&(cancelAnimationFrame(q.current),q.current=null),F(!1),C(B),ge(h),Le(g);const p=Math.round(I);P(p),w(p),k(j=>{const T=j+p;return Math.max(-9999,Math.min(9999,T))}),J.current&&(clearTimeout(J.current),J.current=null),J.current=setTimeout(()=>{P(0),w(0),C(0),F(!1),J.current=null},100)},[]),oe=n.useCallback(A=>{const I=performance.now();if(I-(oe.lastTime||0)<16)return;oe.lastTime=I;const M={x:A.clientX,y:A.clientY},z=ue(A.clientX,A.clientY);L(M),Ie(z),x||m(!0)},[x,ue]),ce=n.useCallback(()=>{m(!0),y(!0)},[]),we=n.useCallback(()=>{m(!1),y(!1)},[]);n.useEffect(()=>{let A=0;const I=()=>{const M=performance.now();if(M-(I.lastTime||0)<16){de.current=requestAnimationFrame(I);return}if(I.lastTime=M,f?ee.current=Math.min(ee.current+.12,1):ee.current=Math.max(ee.current-.08,.3),M-G>50){const W=Math.max(d-.03,0);M-A>50&&W!==d&&(C(W),A=M)}de.current=requestAnimationFrame(I)};return de.current=requestAnimationFrame(I),()=>{de.current&&cancelAnimationFrame(de.current)}},[f,G,d,v]),n.useEffect(()=>{const A=document.body.style.cursor;return ne?document.body.style.cursor="auto":document.body.style.cursor="none",()=>{document.body.style.cursor=A,le.current&&(le.current=null),ee.current=.3}},[ne]),n.useEffect(()=>(document.addEventListener("mousemove",oe),document.addEventListener("mouseenter",ce),document.addEventListener("mouseleave",we),document.addEventListener("wheel",Y,{passive:!0}),()=>{document.removeEventListener("mousemove",oe),document.removeEventListener("mouseenter",ce),document.removeEventListener("mouseleave",we),document.removeEventListener("wheel",Y),J.current&&clearTimeout(J.current),q.current&&cancelAnimationFrame(q.current)}),[oe,ce,we,Y]),n.useEffect(()=>{if(!N&&b!==0&&d===0){const A=setTimeout(()=>{P(0),w(0),ge(null)},1500);return()=>clearTimeout(A)}},[N,b,d]);const je=()=>{const I=f?1.02:1,M=133*I,z=Be(),W=z.isTopBoundary&&U==="up"&&d>0||z.isBottomBoundary&&U==="down"&&d>0||z.hasNowhereToGo&&d>0,B=ae=>{const xe=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ae);return xe?[parseInt(xe[1],16),parseInt(xe[2],16),parseInt(xe[3],16)]:[255,255,255]},h=()=>W&&d>0?"#ff4444":e.primary,g=()=>W&&d>0?"#ff4444":e.accent,p=h(),j=g(),T=()=>{const ae=N?E:b;return ae===0?null:Math.abs(ae).toString()},H=()=>U==="down"?"translate3d(24px, 0, 0)":U==="up"?"translate3d(-24px, 0, 0)":"translate3d(0, 0, 0)",_=T(),O=H(),K=_!==null&&(d>0||Math.abs(b)>0||N||Math.abs(E)>0),re=.2,ve=5,me={width:`${M}px`,height:`${M}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",transform:"translate3d(0, 0, 0)",willChange:"transform"},be=(ae,xe=1)=>{const Re=256*I,lt=ae==="up"?"M12 22L12 2M10 4L12 2L14 4":"M12 2L12 22M10 20L12 22L14 20",ct=(()=>{if(d===0)return e.primary;if(W){const te=[255,68,68],fe=[180,20,20],Ne=Math.round(te[0]+(fe[0]-te[0])*d),De=Math.round(te[1]+(fe[1]-te[1])*d),ze=Math.round(te[2]+(fe[2]-te[2])*d);return`rgb(${Ne}, ${De}, ${ze})`}else{const te=B(e.accent),fe=B(e.secondary),Ne=Math.round(te[0]+(fe[0]-te[0])*d),De=Math.round(te[1]+(fe[1]-te[1])*d),ze=Math.round(te[2]+(fe[2]-te[2])*d);return`rgb(${Ne}, ${De}, ${ze})`}})();return i.jsx("div",{style:{position:"absolute",width:`${Re}px`,height:`${Re}px`,display:"flex",alignItems:"center",justifyContent:"center",opacity:xe*.8,zIndex:10,transform:"translate3d(0, 0, 0)",willChange:"opacity"},children:i.jsx("svg",{width:Re,height:Re,viewBox:"0 0 24 24",style:{shapeRendering:"geometricPrecision",vectorEffect:"non-scaling-stroke"},children:i.jsx("path",{d:lt,stroke:ct,strokeWidth:re,strokeLinecap:"round",strokeLinejoin:"round",fill:"none",opacity:.8,style:{transition:"stroke 0.1s ease-out",willChange:"stroke"}})})})};return i.jsxs("div",{style:me,children:[i.jsxs("svg",{width:M,height:M,style:{position:"absolute",transform:U==="up"?"rotate(90deg)":"rotate(-90deg)",transition:"transform 0.2s ease-out"},children:[i.jsx("circle",{cx:M/2,cy:M/2,r:(M-4)/2,fill:"none",stroke:p,strokeWidth:re,opacity:"0.8"}),d>0&&i.jsx("circle",{cx:M/2,cy:M/2,r:(M-4)/2,fill:"none",stroke:j,strokeWidth:ve,strokeLinecap:"round",opacity:"0.9",strokeDasharray:`${2*Math.PI*((M-4)/2)}`,strokeDashoffset:`${2*Math.PI*((M-4)/2)*(1-d)}`,style:{transition:"stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"stroke-dashoffset"}})]}),K&&i.jsx("div",{style:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"600",fontFamily:'Monaco, "SF Mono", "Consolas", monospace',color:j,opacity:.95,zIndex:15,textShadow:`0 0 6px ${j}40`,transform:O,willChange:"opacity, transform",minWidth:"32px",textAlign:"center",transition:N?"none":"all 0.2s ease-out"},children:i.jsx("span",{className:"scroll-value",style:{transform:N?"scale(0.95)":"scale(1)",transition:"transform 0.15s ease-out"},children:_})}),u==="up"&&be("up"),u==="down"&&be("down"),u==="both"&&i.jsxs(i.Fragment,{children:[be("up",.7),be("down",.7)]}),u==="none"&&d===0&&i.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:p,opacity:.8,transform:"translate3d(0, 0, 0)"}}),i.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"var(--theme-primary)",opacity:.9,zIndex:20,transform:"translate3d(0, 0, 0)",willChange:"transform",boxShadow:"0 0 6px var(--theme-primary)"}})]})};return o()||!x?null:i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
                    ${ie?"display: none !important;":""} /* 3D模式时隐藏 */
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
                    ${ie?"display: none !important;":""} /* 3D模式时隐藏 */
                }

                /* 移动设备适配：在触摸设备上隐藏光标 */
                @media (hover: none) and (pointer: coarse) {
                    .power-cursor, .clickable-hint {
                        display: none !important;
                    }
                }
            `}),ne&&i.jsx("div",{className:"clickable-hint",style:{left:l.x,top:l.y}}),i.jsx("div",{className:`power-cursor ${f?"hovering":""} ${ne?"over-clickable":""}`,style:{left:l.x,top:l.y,transform:"translate3d(-50%, -50%, 0)",willChange:"transform"},children:je()}),!o()&&r&&u==="down"&&i.jsx("div",{style:{position:"fixed",left:l.x,top:l.y-120,transform:"translate(-50%, -50%)",color:e.primary,fontSize:"14px",fontWeight:"500",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',opacity:.8,pointerEvents:"none",zIndex:9998,textShadow:`0 0 8px ${e.primary}40`,animation:"gentle-pulse 2s ease-in-out infinite",whiteSpace:"nowrap",userSelect:"none"},children:c()})]})},rt=({language:a="en"})=>{const[e,t]=n.useState(navigator.onLine),[s,r]=n.useState(!1);n.useEffect(()=>{const x=()=>{t(!0),r(!0),setTimeout(()=>r(!1),2e3)},m=()=>{t(!1),r(!0)};return window.addEventListener("online",x),window.addEventListener("offline",m),navigator.onLine||r(!0),()=>{window.removeEventListener("online",x),window.removeEventListener("offline",m)}},[]);const o=()=>e?{title:a==="zh"?"网络连接已恢复":"Network Reconnected",message:a==="zh"?"所有功能恢复正常":"All features are now working",icon:i.jsx("svg",{className:"w-6 h-6 text-green-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}:{title:a==="zh"?"网络连接中断":"Network Disconnected",message:a==="zh"?"部分功能可能无法正常使用，请检查网络连接":"Some features may not work properly. Please check your connection.",icon:i.jsx("svg",{className:"w-6 h-6 text-red-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"})})};if(!s)return null;const{title:c,message:l,icon:L}=o();return i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center pointer-events-none",children:i.jsx("div",{className:`transition-all duration-300 transform ${s?"scale-100 opacity-100":"scale-95 opacity-0"} pointer-events-auto`,children:i.jsx("div",{className:"bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 rounded-lg p-4 shadow-2xl",children:i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx("div",{className:"flex-shrink-0",children:L}),i.jsxs("div",{className:"text-white",children:[i.jsx("div",{className:"font-medium text-sm",children:c}),i.jsx("div",{className:"text-zinc-300 text-xs mt-1",children:l})]}),i.jsx("button",{onClick:()=>r(!1),className:"text-zinc-400 hover:text-zinc-200 text-sm ml-4 transition-colors","aria-label":"关闭",children:i.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})})})})};rt.propTypes={language:$.string};const $t=()=>{const{currentSection:a}=he(),t=a===0?0:a/5*100;return i.jsx("div",{className:"fixed top-0 left-0 right-0 z-40 h-[5px]",children:i.jsx("div",{className:`w-full h-full transition-opacity duration-300 ${a===0?"bg-transparent":"bg-white/20"}`,children:i.jsx("div",{className:"h-full transition-all duration-700 ease-out",style:{width:`${t}%`,backgroundColor:"var(--theme-primary)"}})})})},Vt=()=>{const a=n.useRef(null),e=n.useRef(null);return n.useEffect(()=>{if(!a.current)return;const t=new ke,s=new Ae(75,window.innerWidth/window.innerHeight,.1,1e3),r=new Me({canvas:a.current,alpha:!0,antialias:!0});r.setSize(window.innerWidth,window.innerHeight),r.setClearColor(0,.3),s.position.z=400;const o=(x,m)=>{const u=new He(10,300,32),S=new _e({color:3900150,transparent:!0,opacity:.3,side:tt}),f=new Te(u,S);return f.position.set(x,m,0),f.userData={startTime:Date.now(),initialScale:.1,targetScale:2,duration:3e3},t.add(f),f},c=[];for(let x=0;x<5;x++){const m=(Math.random()-.5)*800,u=(Math.random()-.5)*600;c.push(o(m,u))}const l=()=>{const x=Date.now();c.forEach(m=>{const S=(x-m.userData.startTime)/m.userData.duration;if(S<1){const f=m.userData.initialScale+(m.userData.targetScale-m.userData.initialScale)*S;m.scale.set(f,f,1),m.material.opacity=.3*(1-S)}else m.userData.startTime=x,m.scale.set(.1,.1,1),m.position.x=(Math.random()-.5)*800,m.position.y=(Math.random()-.5)*600;m.rotation.z+=.01}),r.render(t,s),requestAnimationFrame(l)};l();const L=()=>{s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",L),e.current={scene:t,camera:s,renderer:r,ripples:c},()=>{if(window.removeEventListener("resize",L),e.current){const{scene:x,renderer:m}=e.current;x.clear(),m.dispose()}}},[]),i.jsx("canvas",{ref:a,className:"absolute inset-0 w-full h-full pointer-events-none",style:{zIndex:1}})},it=({error:a,resetError:e,hasError:t})=>{var S;const{language:s,getNewContent:r}=he(),[o,c]=Ye.useState(!1);if(!t)return null;const l=r(),L=((S=l==null?void 0:l.contact)==null?void 0:S.emailAddress)||"aemooooon@gmail.com",x=()=>{const f={message:(a==null?void 0:a.message)||"Unknown error",stack:(a==null?void 0:a.stack)||"No stack trace available",timestamp:new Date().toISOString(),url:window.location.href,userAgent:navigator.userAgent,language:s},y=encodeURIComponent(`Error Report from ${window.location.hostname}`),d=encodeURIComponent(`
Error Details:
- Message: ${f.message}
- Timestamp: ${f.timestamp}
- URL: ${f.url}
- Language: ${f.language}
- User Agent: ${f.userAgent}

Stack Trace:
${f.stack}

Please describe what you were doing when this error occurred:
[Please describe your actions here]
        `);window.open(`mailto:${L}?subject=${y}&body=${d}`)},m={en:{title:"Oops! Something went wrong",subtitle:"We encountered an unexpected error. Don't worry, we're here to help!",refresh:"Refresh Page",report:"Report Error",details:"Error Details",showDetails:"Show Details",hideDetails:"Hide Details"},zh:{title:"哎呀！出了点问题",subtitle:"我们遇到了一个意外错误。别担心，我们会帮您解决！",refresh:"刷新页面",report:"报告错误",details:"错误详情",showDetails:"显示详情",hideDetails:"隐藏详情"}},u=m[s]||m.en;return i.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",children:[i.jsx(Vt,{}),i.jsxs("div",{className:"glass-card max-w-md w-full p-8 text-center relative",style:{zIndex:10},children:[i.jsx("div",{className:"mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-3xl shadow-lg animate-pulse",children:"⚠️"}),i.jsx("h2",{className:"text-2xl font-bold text-white mb-3",children:u.title}),i.jsx("p",{className:"text-gray-300 mb-8 leading-relaxed",children:u.subtitle}),i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mb-6",children:[i.jsxs("button",{onClick:e,className:"flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",children:["🔄 ",u.refresh]}),i.jsxs("button",{onClick:x,className:"flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",children:["📧 ",u.report]})]}),!1]})]})};it.propTypes={error:$.object,resetError:$.func.isRequired,hasError:$.bool.isRequired};class ot extends Ye.Component{constructor(t){super(t);Ue(this,"resetError",()=>{this.setState({hasError:!1,error:null}),window.location.reload()});this.state={hasError:!1,error:null}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,s){console.error("ErrorBoundary caught an error:",t,s)}render(){return this.state.hasError?i.jsx(it,{error:this.state.error,resetError:this.resetError,hasError:this.state.hasError}):this.props.children}}ot.propTypes={children:$.node.isRequired};const nt=({visible:a,onToggle:e})=>{const[t,s]=n.useState("memory"),[r,o]=n.useState(null),[c,l]=n.useState(null),[L,x]=n.useState({}),[m,u]=n.useState(!1),S=n.useRef(0),f=n.useRef(0),y=n.useRef(performance.now()),{currentSection:d,sections:C,getCurrentSection:v}=he();if(n.useEffect(()=>{let w;const N=()=>{f.current++;const F=performance.now();F-y.current>=1e3&&(S.current=Math.round(f.current*1e3/(F-y.current)),f.current=0,y.current=F),w=requestAnimationFrame(N)};return N(),()=>{w&&cancelAnimationFrame(w)}},[]),n.useEffect(()=>{if(!a)return;const w=()=>{performance.memory&&o({used:Math.round(performance.memory.usedJSHeapSize/1024/1024),total:Math.round(performance.memory.totalJSHeapSize/1024/1024),limit:Math.round(performance.memory.jsHeapSizeLimit/1024/1024)});const F=Z.getMemoryInfo();l(F),x({fps:S.current})};w();const N=setInterval(w,500);return()=>clearInterval(N)},[a]),!a)return null;const k=[{id:"memory",label:"Memory"},{id:"webgl",label:"WebGL"},{id:"sections",label:"Sections"}],b=()=>i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent backdrop-blur-md border border-blue-400/30 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/20",children:[i.jsx("div",{className:"text-blue-300 font-semibold text-xs mb-1",children:"JS Heap Used"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.used)||0," MB"]}),i.jsxs("div",{className:"text-blue-200/70 text-xs",children:[r?Math.round(r.used/r.limit*100):0,"% of limit"]})]}),i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 shadow-lg ring-1 ring-emerald-400/20",children:[i.jsx("div",{className:"text-emerald-300 font-semibold text-xs mb-1",children:"JS Heap Total"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.total)||0," MB"]}),i.jsx("div",{className:"text-emerald-200/70 text-xs",children:"Allocated"})]})]}),i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent backdrop-blur-md border border-yellow-400/30 rounded-xl p-3 shadow-lg ring-1 ring-yellow-400/20",children:[i.jsx("div",{className:"text-yellow-300 font-semibold text-xs mb-1",children:"JS Heap Limit"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.limit)||0," MB"]}),i.jsx("div",{className:"text-yellow-200/70 text-xs",children:"Browser limit"})]}),i.jsxs("div",{className:"bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-md border border-purple-400/30 rounded-xl p-3 shadow-lg ring-1 ring-purple-400/20",children:[i.jsx("div",{className:"text-purple-300 font-semibold text-xs mb-1",children:"FPS"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:L.fps||0}),i.jsx("div",{className:"text-purple-200/70 text-xs",children:"frames/sec"})]})]})]}),P=()=>i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-3 shadow-lg ring-1 ring-cyan-400/20",children:[i.jsx("div",{className:"text-cyan-300 font-semibold text-xs mb-1",children:"Active Groups"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(c==null?void 0:c.activeResourceGroups)||0}),i.jsx("div",{className:"text-cyan-200/70 text-xs",children:"Resource groups"})]}),i.jsxs("div",{className:"bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-orange-400/30 rounded-xl p-3 shadow-lg ring-1 ring-orange-400/20",children:[i.jsx("div",{className:"text-orange-300 font-semibold text-xs mb-1",children:"Persistent"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(c==null?void 0:c.persistentResources)||0}),i.jsx("div",{className:"text-orange-200/70 text-xs",children:"Persistent resources"})]})]}),(c==null?void 0:c.resourceStats)&&i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[i.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Resource Breakdown"]}),i.jsx("div",{className:"grid grid-cols-2 gap-2 text-xs",children:Object.entries(c.resourceStats).map(([w,N])=>i.jsxs("div",{className:"flex justify-between items-center bg-white/5 rounded-lg px-2 py-1.5 border border-white/10",children:[i.jsxs("span",{className:"capitalize text-gray-300",children:[w.replace(/([A-Z])/g," $1").trim(),":"]}),i.jsx("span",{className:"font-mono text-white font-semibold bg-emerald-500/20 px-2 py-0.5 rounded",children:N})]},w))})]}),(c==null?void 0:c.sectionBreakdown)&&Object.keys(c.sectionBreakdown).length>0&&i.jsxs("div",{className:"bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent backdrop-blur-md border border-violet-400/25 rounded-xl p-4 shadow-lg ring-1 ring-violet-400/15",children:[i.jsxs("div",{className:"text-violet-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"}),"Section Resources"]}),i.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:Object.entries(c.sectionBreakdown).map(([w,N])=>i.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-3 rounded-lg backdrop-blur-sm",children:[i.jsxs("div",{className:"flex items-center justify-between mb-2",children:[i.jsx("div",{className:"font-medium text-white text-sm",children:w.replace("BackgroundCanvas_","").replace("HeroCube","HomeCube").replace("EffectAvatar_","Avatar-")}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("span",{className:"bg-blue-500/30 text-blue-200 px-2 py-1 rounded-md text-xs font-mono border border-blue-400/30",children:N.count}),N.persistent>0&&i.jsxs("span",{className:"bg-green-500/30 text-green-200 px-2 py-1 rounded-md text-xs font-mono border border-green-400/30",children:["P:",N.persistent]})]})]}),i.jsxs("div",{className:"text-xs text-gray-400",children:["Last active: ",new Date(N.lastActive).toLocaleTimeString()]})]},w))})]}),i.jsxs("div",{className:"bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent backdrop-blur-md border border-blue-400/25 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/15",children:[i.jsx("div",{className:"text-blue-300 font-semibold text-sm mb-2",children:"Memory Usage"}),i.jsxs("div",{className:"text-xs text-blue-200/70",children:["JS Heap: ",(c==null?void 0:c.jsHeapSize)||0,"MB / ",(c==null?void 0:c.jsHeapLimit)||0,"MB"]})]})]}),E=()=>{const w=v();return i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-4 shadow-lg ring-1 ring-cyan-400/20",children:[i.jsxs("div",{className:"text-cyan-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"}),"Current Section"]}),i.jsx("div",{className:"text-white text-lg font-bold mb-2",children:(w==null?void 0:w.title)||(w==null?void 0:w.id)||"Unknown"}),i.jsxs("div",{className:"space-y-1 text-xs",children:[i.jsxs("div",{className:"text-cyan-200/70",children:["Section ",d+1," of ",C.length]}),(w==null?void 0:w.backgroundEffect)&&i.jsxs("div",{className:"text-cyan-200/90 bg-cyan-500/20 px-2 py-1 rounded-md border border-cyan-400/30 inline-block",children:["Effect: ",w.backgroundEffect]})]})]}),i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[i.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Section Navigation"]}),i.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:C.map((N,F)=>i.jsxs("div",{className:`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${F===d?"bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-blue-200 border-blue-400/40 shadow-lg":"bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"}`,children:[i.jsx("span",{className:"truncate text-sm font-medium",children:N.title||N.id}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("span",{className:`w-2 h-2 rounded-full ${F===d?"bg-blue-400 animate-pulse":"bg-gray-500"}`}),i.jsx("span",{className:"text-xs font-mono bg-white/10 px-1 py-0.5 rounded",children:F+1})]})]},N.id))})]}),i.jsxs("div",{className:"bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent backdrop-blur-md border border-purple-400/25 rounded-xl p-4 shadow-lg ring-1 ring-purple-400/15",children:[i.jsxs("div",{className:"text-purple-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"}),"Performance Snapshot"]}),i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[i.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"FPS"}),i.jsx("div",{className:"font-mono text-white font-bold text-lg",children:L.fps||0})]}),i.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[i.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"WebGL Groups"}),i.jsx("div",{className:"font-mono text-white font-bold text-lg",children:(c==null?void 0:c.activeResourceGroups)||0})]})]})]})]})};return i.jsx("div",{className:`fixed top-4 right-4 z-[9999] transition-all duration-500 ease-out ${m?"w-12 h-12":"w-96 max-h-[600px]"}`,children:i.jsxs("div",{className:"bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-mono text-xs shadow-2xl shadow-black/20 ring-1 ring-white/20 overflow-hidden",children:[i.jsxs("div",{className:"flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent border-b border-white/20 backdrop-blur-sm",children:[!m&&i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"}),i.jsx("div",{className:"absolute inset-0 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"})]}),i.jsx("span",{className:"text-emerald-300 font-semibold text-sm tracking-wide",children:"Performance Monitor"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("button",{onClick:()=>u(!m),className:"w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40",title:m?"Expand Panel":"Collapse Panel",children:m?"📊":"➖"}),i.jsx("button",{onClick:e,className:"w-7 h-7 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50",title:"Close Panel (Ctrl+M)",children:"✕"})]})]}),!m&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"flex bg-white/5 backdrop-blur-sm border-b border-white/10",children:k.map(w=>i.jsxs("button",{onClick:()=>s(w.id),className:`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden ${t===w.id?"bg-gradient-to-b from-blue-500/30 to-blue-600/20 text-blue-200 shadow-lg":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:[t===w.id&&i.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"}),w.label]},w.id))}),i.jsxs("div",{className:"p-4 max-h-96 overflow-y-auto custom-scrollbar",children:[t==="memory"&&b(),t==="webgl"&&P(),t==="sections"&&E()]}),i.jsx("div",{className:"p-3 bg-gradient-to-t from-white/10 to-transparent border-t border-white/20 backdrop-blur-sm",children:i.jsxs("div",{className:"text-center text-gray-400",children:[i.jsx("span",{className:"text-xs",children:"Press "}),i.jsx("kbd",{className:"inline-flex items-center px-2 py-1 bg-white/20 rounded-md text-xs font-mono border border-white/30 shadow-inner",children:"Ctrl+M"}),i.jsx("span",{className:"text-xs",children:" to toggle"})]})})]})]})})};nt.propTypes={visible:$.bool.isRequired,onToggle:$.func.isRequired};const at=({children:a,language:e="en"})=>{const[t,s]=n.useState(!1),[r,o]=n.useState([]),[c,l]=n.useState(0),L=n.useRef(null),x=async f=>{try{if(f&&f.match(/\.(mp4|webm|mov|avi|mkv)$/i))return{width:1920,height:1080,aspectRatio:16/9};if(f&&f.includes("/gallery/")){const d=f.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{const v=await(await fetch("/precomputed-dimensions.json")).json();if(v.gallery&&v.gallery[d]){const k=v.gallery[d];return{width:k.width,height:k.height,aspectRatio:k.aspectRatio}}}catch{}}let y=f;if(f&&f.includes("/gallery/")&&f.endsWith(".jpg")){const d=f.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{y=await kt.getOptimalPath(d,"gallery")}catch{}}return new Promise(d=>{const C=new Image;C.onload=()=>{d({width:C.naturalWidth,height:C.naturalHeight,aspectRatio:C.naturalWidth/C.naturalHeight})},C.onerror=()=>{if(y!==f){const v=new Image;v.onload=()=>{d({width:v.naturalWidth,height:v.naturalHeight,aspectRatio:v.naturalWidth/v.naturalHeight})},v.onerror=()=>{d({width:1200,height:800,aspectRatio:1.5})},v.crossOrigin="anonymous",v.src=f}else d({width:1200,height:800,aspectRatio:1.5})},C.crossOrigin="anonymous",C.src=y})}catch{return{width:1200,height:800,aspectRatio:1.5}}},S={isOpen:t,images:r,initialIndex:c,openPhotoSwipe:async(f,y=0)=>{if(!f||f.length===0)return;o(f),l(y),s(!0);const d=f.map(C=>x(C.src||C.original));try{const C=await Promise.all(d),v=f.map((b,P)=>({src:b.src||b.original,width:C[P].width,height:C[P].height,alt:b.alt||b.title||`Image ${P+1}`,caption:b.caption,title:b.title,description:b.description}));L.current&&L.current.destroy();const k=new ft({dataSource:v,index:y,pswpModule:()=>pe(()=>import("./vendor-RxfllKF0.js").then(b=>b.f),__vite__mapDeps([2,3,4])),bgOpacity:.95,spacing:.1,loop:!0,zoom:!0,showAnimationDuration:300,hideAnimationDuration:300,showHideAnimationType:"zoom",allowMouseDrag:!0,allowPanToNext:!0,allowSwipeToClose:!0,wheelToZoom:!0,imageClickAction:"close",tapAction:"close",doubleTapAction:"zoom",closeTitle:e==="zh"?"关闭":"Close",zoomTitle:e==="zh"?"缩放":"Zoom",arrowPrevTitle:e==="zh"?"上一张":"Previous",arrowNextTitle:e==="zh"?"下一张":"Next",errorMsg:e==="zh"?"图片无法加载":"The image cannot be loaded",pinchToClose:!0,closeOnVerticalDrag:!0,returnFocus:!1,padding:{top:40,bottom:40,left:20,right:20},preload:[1,2]});k.on("close",()=>{s(!1),o([]),l(0)}),k.on("uiRegister",()=>{k.pswp.ui.registerElement({name:"custom-counter",className:"pswp__custom-counter",appendTo:"top-bar",onInit:(b,P)=>{const E=()=>{b.textContent=`${P.currIndex+1} / ${P.getNumItems()}`};P.on("change",E),P.on("afterInit",E)}}),k.pswp.ui.registerElement({name:"download-button",className:"pswp__download-button",appendTo:"bar",onInit:(b,P)=>{b.innerHTML=`
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            `,b.title=e==="zh"?"下载图片":"Download image",b.onclick=()=>{const E=v[P.currIndex];if(E){const w=document.createElement("a");w.href=E.src,w.download=`image_${P.currIndex+1}.jpg`,w.click()}}}})}),k.init(),k.loadAndOpen(y),L.current=k}catch(C){console.error("Error loading images for PhotoSwipe:",C),s(!1)}},closePhotoSwipe:()=>{L.current&&L.current.close()}};return i.jsxs(Tt.Provider,{value:S,children:[a,i.jsx("style",{children:`
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
      `})]})};at.propTypes={children:$.node.isRequired,language:$.string};$.string.isRequired,$.string,$.string,$.string,$.string,$.node,$.array;const Yt=()=>{const[a,e]=n.useState(!1),t=!1,s=n.useCallback(()=>{},[t]),r=n.useCallback(()=>{e(!1)},[]),o=n.useCallback(()=>{},[t]);return n.useEffect(()=>{},[t,a,s,r]),t?{isVisible:a,toggle:s,hide:r,show:o,isDev:t}:{isVisible:!1,toggle:()=>{},hide:()=>{},show:()=>{},isDev:!1}},qt=()=>{const a=Yt(),{language:e}=he();return qe(),i.jsx(ot,{children:i.jsx(at,{children:i.jsxs("div",{className:"App min-h-screen",children:[i.jsx($t,{}),i.jsx(rt,{language:e}),i.jsx(Gt,{}),i.jsx(Ft,{}),a.isDev&&i.jsx(nt,{visible:a.isVisible,onToggle:a.toggle})]})})})};Ot();ut.createRoot(document.getElementById("root")).render(i.jsx(n.StrictMode,{children:i.jsx(qt,{})}));
