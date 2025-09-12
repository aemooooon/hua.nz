const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home-BpjwdVUK.js","assets/react-N-_5-tx-.js","assets/vendor-RxfllKF0.js","assets/d3-BbFmVfHF.js","assets/vendor-DSulWsr7.css","assets/about-BdwSw3Ii.js","assets/gallery-DozA3Une.js","assets/three-CLFFVFAv.js","assets/texture-system-iym5dRQD.js","assets/gsap-CH_iu5NA.js","assets/home-CGmMaHBT.css","assets/projects-B9vYxaeW.js","assets/leaflet-BCigXWF9.js","assets/leaflet-BTrKGrB8.css","assets/projects-B3BEbutr.css","assets/EducationSection-C-8Y9A0R.js","assets/EducationSection-DUw_6Q_9.css","assets/ContactSection-Bsd_TfU2.js","assets/ContactSection-B2ZxASnB.css"])))=>i.map(i=>d[i]);
var ut=Object.defineProperty;var mt=(a,e,t)=>e in a?ut(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var $e=(a,e,t)=>mt(a,typeof e!="symbol"?e+"":e,t);import{r as n,j as i,R as Xe,d as ft}from"./react-N-_5-tx-.js";import{u as he,_ as pe,a as Ke}from"./about-BdwSw3Ii.js";import{w as J}from"./home-BpjwdVUK.js";import{P as Y,l as pt,e as gt}from"./vendor-RxfllKF0.js";import{E as wt,h as ke,o as vt,H as Je,M as Te,W as Le,a as D,i as Be,I as bt,J as xt,U as yt,K as Ue,Q as Ct,X as We,x as Ie,Y as Ee,Z as St,A as Ze,v as He,P as xe,_ as Et,$ as Tt,a0 as Ve,u as ye,a1 as Ye,s as Qe,a2 as et,a3 as qe,a4 as tt,a5 as st,a6 as kt,a7 as Ge,D as rt}from"./three-CLFFVFAv.js";import{P as Lt}from"./gallery-DozA3Une.js";import{t as Mt}from"./texture-system-iym5dRQD.js";import"./d3-BbFmVfHF.js";import"./gsap-CH_iu5NA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();class Rt{constructor(e,t={},s="BackgroundCanvas"){if(this.canvas=e,this.componentId=s,this.componentId=s,this.gl=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl"),!this.gl)throw console.error("EffectFuse: Unable to get WebGL context"),new Error("WebGL not supported");this.resourceId=J.registerResources(this.componentId,{gl:this.gl,canvas:this.canvas},{persistent:!0}),this.params={brightness:1.8,blobiness:1.3,particles:16,scanlines:!1,energy:1.25,timeScale:1.1,...t},this.program=null,this.animationFrameId=null,this.startTime=performance.now(),this.uniformLocations={},this.themeColors=this.getThemeColors();try{this.initGL()}catch(r){throw console.error("EffectFuse: Failed to initialize WebGL",r),r}}initGL(){if(!this.gl){console.error("WebGL not supported.");return}this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.getExtension("OES_texture_float");const e=`
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
        `,s=this.createShader(this.gl.VERTEX_SHADER,e),r=this.createShader(this.gl.FRAGMENT_SHADER,t);this.program=this.createProgram(s,r),this.uniformLocations={resolution:this.gl.getUniformLocation(this.program,"u_resolution"),brightness:this.gl.getUniformLocation(this.program,"u_brightness"),blobiness:this.gl.getUniformLocation(this.program,"u_blobiness"),particles:this.gl.getUniformLocation(this.program,"u_particles"),scanlines:this.gl.getUniformLocation(this.program,"u_scanlines"),energy:this.gl.getUniformLocation(this.program,"u_energy"),millis:this.gl.getUniformLocation(this.program,"u_millis"),timeScale:this.gl.getUniformLocation(this.program,"u_timeScale"),themePrimary:this.gl.getUniformLocation(this.program,"u_theme_primary"),themeSecondary:this.gl.getUniformLocation(this.program,"u_theme_secondary"),themeAccent:this.gl.getUniformLocation(this.program,"u_theme_accent"),themeDarkBlue:this.gl.getUniformLocation(this.program,"u_theme_dark_blue"),themeProjectBlue:this.gl.getUniformLocation(this.program,"u_theme_project_blue")},this.setupBuffers()}createShader(e,t){const s=this.gl.createShader(e);return this.gl.shaderSource(s,t),this.gl.compileShader(s),this.gl.getShaderParameter(s,this.gl.COMPILE_STATUS)?s:(console.error("Shader compilation error:",this.gl.getShaderInfoLog(s)),console.error("Shader source:",t),this.gl.deleteShader(s),null)}createProgram(e,t){const s=this.gl.createProgram();return this.gl.attachShader(s,e),this.gl.attachShader(s,t),this.gl.linkProgram(s),this.gl.getProgramParameter(s,this.gl.LINK_STATUS)?s:(console.error(this.gl.getProgramInfoLog(s)),this.gl.deleteProgram(s),null)}setupBuffers(){this.positionBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW);const e=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)}start(){this.startTime=performance.now(),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.render()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null),this.gl)try{this.program&&(this.gl.deleteProgram(this.program),this.program=null),this.positionBuffer&&(this.gl.deleteBuffer(this.positionBuffer),this.positionBuffer=null)}catch(e){console.error("Error cleaning up WebGL resources:",e)}this.gl=null,this.canvas=null,this.uniformLocations={}}onResize(e,t){this.gl&&this.canvas&&(this.canvas.width=e,this.canvas.height=t,this.gl.viewport(0,0,e,t),requestAnimationFrame(()=>{this.gl&&this.render()}))}render(){if(!this.gl||!this.program||!this.params)return;this.animationFrameId=requestAnimationFrame(this.render.bind(this));const t=performance.now()-this.startTime;this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.useProgram(this.program),this.uniformLocations.resolution&&this.gl.uniform2f(this.uniformLocations.resolution,this.canvas.width,this.canvas.height),this.uniformLocations.brightness&&this.gl.uniform1f(this.uniformLocations.brightness,this.params.brightness||15e3),this.uniformLocations.blobiness&&this.gl.uniform1f(this.uniformLocations.blobiness,this.params.blobiness||2),this.uniformLocations.particles&&this.gl.uniform1f(this.uniformLocations.particles,this.params.particles||20),this.uniformLocations.scanlines&&this.gl.uniform1i(this.uniformLocations.scanlines,this.params.scanlines||!1),this.uniformLocations.energy&&this.gl.uniform1f(this.uniformLocations.energy,this.params.energy||.5),this.uniformLocations.millis&&this.gl.uniform1f(this.uniformLocations.millis,t),this.uniformLocations.timeScale&&this.gl.uniform1f(this.uniformLocations.timeScale,this.params.timeScale||.5),this.uniformLocations.themePrimary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themePrimary,this.themeColors.primary.r,this.themeColors.primary.g,this.themeColors.primary.b),this.uniformLocations.themeSecondary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeSecondary,this.themeColors.secondary.r,this.themeColors.secondary.g,this.themeColors.secondary.b),this.uniformLocations.themeAccent&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeAccent,this.themeColors.accent.r,this.themeColors.accent.g,this.themeColors.accent.b),this.uniformLocations.themeDarkBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeDarkBlue,this.themeColors.darkBlue.r,this.themeColors.darkBlue.g,this.themeColors.darkBlue.b),this.uniformLocations.themeProjectBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeProjectBlue,this.themeColors.projectBlue.r,this.themeColors.projectBlue.g,this.themeColors.projectBlue.b),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}getThemeColors(){const e=getComputedStyle(document.documentElement),t=s=>{const r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);return r?{r:parseInt(r[1],16)/255,g:parseInt(r[2],16)/255,b:parseInt(r[3],16)/255}:{r:0,g:1,b:1}};try{const s=e.getPropertyValue("--theme-primary").trim()||"#00ffff",r=e.getPropertyValue("--theme-secondary").trim()||"#0080ff",o=e.getPropertyValue("--theme-accent").trim()||"#4dd0e1";return{primary:t(s),secondary:t(r),accent:t(o),darkBlue:t("#0A0A0F"),projectBlue:t("#1E40AF")}}catch(s){return console.warn("Failed to get theme colors, using defaults:",s),{primary:{r:0,g:1,b:1},secondary:{r:0,g:.5,b:1},accent:{r:.3,g:.82,b:.88},darkBlue:{r:.04,g:.04,b:.06},projectBlue:{r:.12,g:.25,b:.69}}}}}function jt(a,e={},t="BackgroundCanvas"){let s,r,o,h,l,j,x=0;const m=1e3/30,T=()=>{const b=getComputedStyle(document.documentElement),R=b.getPropertyValue("--theme-primary").trim(),w=b.getPropertyValue("--theme-background").trim(),A=[w?new D(w):new D("#0A0F0D"),R?new D(R):new D("#10B981"),R?new D(R).multiplyScalar(.6):new D("#0D9488")];return h&&h.colors&&(h.colors.value=A),A},p=()=>{o=new wt(-1,1,1,-1,0,1),r=new ke;const b=new vt(2,2);h={time:{value:1},animationSpeed:{value:e.animationSpeed||.618},colors:{value:e.colors||T()}};const R=new Je({uniforms:h,transparent:!0,vertexShader:`
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
            `}),w=new Te(b,R);r.add(w),s=new Le({canvas:a,antialias:!0}),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.setSize(window.innerWidth,window.innerHeight),j=J.registerResources(t,{renderer:s,scene:r,camera:o,geometry:b,material:R,mesh:w}),window.addEventListener("resize",C),u()},C=()=>{s.setSize(window.innerWidth,window.innerHeight)},u=()=>{l=requestAnimationFrame(u);const b=performance.now();b-x<m||(x=b,h.time.value=b/1e3*h.animationSpeed.value,s.render(r,o))},S=()=>{l&&cancelAnimationFrame(l),j&&J.cleanup(j),r&&r.children.forEach(b=>{b.geometry&&b.geometry.dispose(),b.material&&(Array.isArray(b.material)?b.material.forEach(R=>R.dispose()):b.material.dispose())}),s&&(s.dispose(),a!=null&&a.parentNode&&a.parentNode.removeChild(a)),window.removeEventListener("resize",C)};return p(),{stop:S,updateThemeColors:T}}class Pt{constructor(e,t={},s="BackgroundCanvas"){this.canvas=e,this.componentId=s,this.renderer=null,this.scene=null,this.camera=null,this.fireball=null,this.trailParticles=[],this.animationFrameId=null,this.time=0,this.resourceId=null,this.sigma=10,this.rho=28,this.beta=8/3,this.x=.1,this.y=0,this.z=0,this.dt=.02,this.maxParticles=999,this.fireballColor=new D("#00FF88"),this.particleColors=[new D("#10B981"),new D("#00FF88"),new D("#34D399")],setTimeout(()=>{this.updateThemeColors()},100),this.trailPositions=[],this.trailColors=[],this.particleIndex=0,this.frameCount=0,this.lastFPSCheck=performance.now(),this.currentFPS=60;try{this.init()}catch(r){throw console.error("EffectLorenzAttractor: Failed to initialize Three.js",r),r}}init(){this.scene=new ke,this.scene.background=new D(2581),this.camera=new Be(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.set(0,0,48),this.camera.lookAt(0,0,0),this.renderer=new Le({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.renderer.setClearColor(2581,1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.composer=new bt(this.renderer);const e=new xt(this.scene,this.camera);this.composer.addPass(e);const t=new yt(new Ue(this.canvas.width,this.canvas.height),.8,.2,.7);this.composer.addPass(t);const s=new Ct;this.composer.addPass(s);const r=new We(1.5,32,32),o=new Ie({color:new D("#ffaa33"),transparent:!0,opacity:.9,blending:Ee});this.fireball=new Te(r,o),this.scene.add(this.fireball);const h=new We(2.5,32,32),l=new Ie({color:new D("#ff6611"),transparent:!0,opacity:.4,blending:Ee,side:St});this.halo=new Te(h,l),this.scene.add(this.halo);const j=new Ze(4210752,.8);this.scene.add(j);const x=new He(16777215,1);x.position.set(50,50,50),this.scene.add(x);const f=new He(6724095,.8);f.position.set(-50,-50,50),this.scene.add(f),this.pointLight=new xe(35071,2,100),this.scene.add(this.pointLight),this.sunLight=new He(16775388,1.2),this.sunLight.position.set(80,60,40),this.sunLight.target.position.set(0,0,0),this.sunLight.castShadow=!1,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.particleGeometry=new We(.5,8,8),this.particleMaterial=new Ie({color:16777215,transparent:!0,opacity:1,blending:Ee,depthWrite:!1}),this.createParticleTexture(),this.instancedMesh=new Et(this.particleGeometry,this.particleMaterial,this.maxParticles),this.instancedMesh.geometry.attributes.color===void 0&&(this.instancedMesh.instanceColor=new Tt(new Float32Array(this.maxParticles*3),3)),this.scene.add(this.instancedMesh);const m=new Ve,T=new ye,p=new ye(0,0,0);this.colorInside=new D("#ffa575"),this.colorOutside=new D("#0088ff");for(let C=0;C<this.maxParticles;C++)m.compose(T,new Ye,p),this.instancedMesh.setMatrixAt(C,m),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(C,new D(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),window.addEventListener("resize",this.onResize.bind(this))}createParticleTexture(){const t=document.createElement("canvas");t.width=16,t.height=16;const s=t.getContext("2d"),r=16/2,o=s.createRadialGradient(r,r,0,r,r,r);o.addColorStop(0,"rgba(255, 255, 255, 0.6)"),o.addColorStop(.1,"rgba(255, 255, 255, 0.3)"),o.addColorStop(.3,"rgba(255, 255, 255, 0.1)"),o.addColorStop(1,"rgba(255, 255, 255, 0)"),s.fillStyle=o,s.beginPath(),s.arc(r,r,r*.8,0,Math.PI*2),s.fill(),this.particleTexture=new Qe(t)}getRandomParticleColor(){const e=Math.floor(Math.random()*this.particleColors.length);return this.particleColors[e]}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.frameCount++;const e=performance.now();e-this.lastFPSCheck>=1e3&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,this.currentFPS<30&&this.maxParticles>1e3?this.maxParticles=Math.max(1e3,this.maxParticles-100):this.currentFPS>50&&this.maxParticles<2e3&&(this.maxParticles=Math.min(2e3,this.maxParticles+50))),this.time+=.025;const t=this.sigma*(this.y-this.x)*this.dt,s=(this.x*(this.rho-this.z)-this.y)*this.dt,r=(this.x*this.y-this.beta*this.z)*this.dt;this.x+=t,this.y+=s,this.z+=r;const o=.8;this.fireball.position.set(this.x*o,this.y*o,this.z*o),this.halo.position.copy(this.fireball.position),this.halo.scale.setScalar(1+Math.sin(this.time*2)*.1),this.pointLight.position.copy(this.fireball.position),this.frameCount%2===0&&(this.trailPositions.push({x:this.x*o,y:this.y*o,z:this.z*o,life:1}),this.trailPositions.length>this.maxParticles&&this.trailPositions.shift());const h=new Ve,l=new ye,j=new Ye,x=new ye;this.trailPositions.forEach((f,m)=>{const T=m/this.trailPositions.length,p=Math.sqrt(f.x*f.x+f.y*f.y+f.z*f.z),u=Math.min(p/40,1),S=(1-u*.5)*T*1.2+.3;if(l.set(f.x+(Math.random()-.5)*.08,f.y+(Math.random()-.5)*.08,f.z+(Math.random()-.5)*.08),x.set(S,S,S),h.compose(l,j,x),this.instancedMesh.setMatrixAt(m,h),this.instancedMesh.instanceColor){const b=Math.pow(1-u,2),R=new D;R.lerpColors(this.colorOutside,this.colorInside,b);const w=T*(1-u*.3);R.multiplyScalar(w),this.instancedMesh.setColorAt(m,R)}});for(let f=this.trailPositions.length;f<this.maxParticles;f++)x.set(0,0,0),h.compose(l,j,x),this.instancedMesh.setMatrixAt(f,h),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(f,new D(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),this.scene.rotation.y+=.005,this.scene.rotation.x+=.002,this.composer.render()}onResize(e,t){if(!this.renderer||!this.camera)return;const s=e||this.canvas.width,r=t||this.canvas.height;this.camera.aspect=s/r,this.camera.updateProjectionMatrix(),this.renderer.setSize(s,r,!1),this.composer&&this.composer.setSize(s,r)}updateThemeColors(){var e,t,s,r;if(!document.documentElement){console.warn("DOM not ready for theme color update");return}try{const o=getComputedStyle(document.documentElement),h=(e=o.getPropertyValue("--theme-primary"))==null?void 0:e.trim(),l=(t=o.getPropertyValue("--theme-secondary"))==null?void 0:t.trim(),j=(s=o.getPropertyValue("--theme-accent"))==null?void 0:s.trim();h&&(this.fireballColor.setStyle(h),this.particleColors[1].setStyle(h),this.colorOutside.setStyle(h)),l&&(this.particleColors[0].setStyle(l),this.colorInside.setStyle(l)),j&&this.particleColors[2].setStyle(j);const x=(r=o.getPropertyValue("--theme-background"))==null?void 0:r.trim();x&&this.scene&&(this.scene.background=new D(x),this.renderer&&this.renderer.setClearColor(new D(x),1)),this.fireball&&h&&this.fireball.material.color.setStyle(h),this.halo&&l&&this.halo.material.color.setStyle(l),this.pointLight&&h&&this.pointLight.color.setStyle(h),this.instancedMesh&&this.updateParticleColors()}catch(o){console.warn("Error updating theme colors:",o)}}updateParticleColors(){if(!this.instancedMesh||!this.instancedMesh.instanceColor)return;const e=this.instancedMesh.instanceColor.array;for(let t=0;t<this.trailPositions.length&&!(t>=this.maxParticles);t++){const s=t*3,r=this.trailPositions[t],o=this.colorInside.clone();o.lerp(this.colorOutside,1-r.life),e[s]=o.r,e[s+1]=o.g,e[s+2]=o.b}this.instancedMesh.instanceColor.needsUpdate=!0}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.composer&&(this.composer.dispose(),this.composer=null),this.renderer){const e=this.renderer.getContext();e&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").loseContext(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer=null}for(this.instancedMesh&&(this.scene.remove(this.instancedMesh),this.instancedMesh.geometry&&this.instancedMesh.geometry.dispose(),this.instancedMesh.material&&this.instancedMesh.material.dispose(),this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor=null),this.instancedMesh=null),this.fireball&&(this.scene.remove(this.fireball),this.fireball.geometry&&this.fireball.geometry.dispose(),this.fireball.material&&this.fireball.material.dispose(),this.fireball=null),this.halo&&(this.scene.remove(this.halo),this.halo.geometry&&this.halo.geometry.dispose(),this.halo.material&&this.halo.material.dispose(),this.halo=null),this.particleGeometry&&(this.particleGeometry.dispose(),this.particleGeometry=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.particleTexture&&(this.particleTexture.dispose(),this.particleTexture=null),this.trailPositions=[],this.trailColors=[],this.pointLight&&(this.scene.remove(this.pointLight),this.pointLight=null),this.sunLight&&(this.scene.remove(this.sunLight),this.scene.remove(this.sunLight.target),this.sunLight=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null),window.removeEventListener("resize",this.onResize.bind(this))}}class _t{constructor(e,t={},s="BackgroundCanvas"){this.canvas=e,this.componentId=s,this.renderer=null,this.scene=null,this.camera=null,this.mesh=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.particleCount=t.particleCount||8e3,this.branches=3,this.radius=9,this.size=t.size||.12,this.colorInside=new D("#10B981"),this.colorOutside=new D("#34D399"),this.updateThemeColors();try{this.init()}catch(r){throw console.error("EffectChaos: Failed to initialize Three.js",r),r}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),s=e.getPropertyValue("--theme-accent").trim();t&&this.colorInside.setStyle(t),s&&this.colorOutside.setStyle(s);const r=e.getPropertyValue("--theme-background").trim();r&&this.scene&&(this.scene.background=new D(r)),this.mesh&&this.updateParticleColors(),this.updateLightColors()}updateLightColors(){this.lights&&(this.lights.central&&this.lights.central.color.copy(this.colorInside.clone().multiplyScalar(1.5)),this.lights.green&&this.lights.green.color.copy(this.colorInside),this.lights.ambient&&this.lights.ambient.color.copy(this.colorInside.clone().multiplyScalar(.3)),this.lights.fill1&&this.lights.fill1.color.copy(this.colorInside),this.lights.fill2&&this.lights.fill2.color.copy(this.colorOutside),this.lights.back&&this.lights.back.color.copy(this.colorOutside.clone().multiplyScalar(1.2)))}updateParticleColors(){if(!this.mesh||!this.particleData)return;const e=this.mesh.geometry.attributes.color.array;for(let t=0;t<this.particleCount;t++){const s=this.particleData[t],r=t*3,o=this.colorInside.clone();o.lerp(this.colorOutside,s.radiusRatio),e[r]=o.r,e[r+1]=o.g,e[r+2]=o.b}this.mesh.geometry.attributes.color.needsUpdate=!0}init(){this.camera=new Be(60,this.canvas.width/this.canvas.height,.1,100),this.camera.position.set(0,2,8),this.camera.lookAt(0,-2,0),this.scene=new ke,this.scene.background=new D(0),this.renderer=new Le({canvas:this.canvas,antialias:!1,powerPreference:"low-power",precision:"mediump"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.canvas.addEventListener("webglcontextlost",this.onContextLost.bind(this)),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored.bind(this)),this.createGalaxy(),window.addEventListener("resize",this.onResize.bind(this))}createGalaxy(){const e=new et;this.positions=new Float32Array(this.particleCount*3),this.colors=new Float32Array(this.particleCount*3),this.particleData=[];for(let m=0;m<this.particleCount;m++){const T=Math.random(),p=Math.pow(T,1.5)*this.radius,u=Math.random()*Math.PI*2,S=Math.pow(Math.random()*2-1,3)*T*.2,b=Math.pow(Math.random()*2-1,3)*T*.05,R=Math.pow(Math.random()*2-1,3)*T*.2;this.particleData.push({radiusRatio:T,radius:p,branchAngle:u,randomX:S,randomY:b,randomZ:R});const w=Math.pow(1-T,2),A=this.colorInside.clone();A.lerp(this.colorOutside,1-w);const k=m*3;this.colors[k]=A.r,this.colors[k+1]=A.g,this.colors[k+2]=A.b}e.setAttribute("position",new qe(this.positions,3)),e.setAttribute("color",new qe(this.colors,3));const t=document.createElement("canvas");t.width=64,t.height=64;const s=t.getContext("2d"),r=s.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(255, 255, 255, 1)"),r.addColorStop(.4,"rgba(255, 255, 255, 0.8)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),s.fillStyle=r,s.fillRect(0,0,64,64);const o=new Qe(t),h=new tt({size:this.size*2,sizeAttenuation:!0,depthWrite:!1,blending:Ee,vertexColors:!0,transparent:!0,opacity:.9,map:o,alphaTest:.05});this.mesh=new st(e,h),this.scene.add(this.mesh),this.updatePositions(),this.centralLight=new xe(this.colorInside.clone().multiplyScalar(1.5),2.5,40),this.centralLight.position.set(0,-1,0),this.scene.add(this.centralLight);const l=new xe(this.colorInside,1.8,35);l.position.set(0,-1,0),this.scene.add(l),this.ambientLight=new Ze(this.colorInside.clone().multiplyScalar(.3),.4),this.scene.add(this.ambientLight);const j=new xe(this.colorInside,1.2,25);j.position.set(-5,0,5),this.scene.add(j);const x=new xe(this.colorOutside,1.2,25);x.position.set(5,0,5),this.scene.add(x);const f=new xe(this.colorOutside.clone().multiplyScalar(1.2),.8,50);f.position.set(0,2,-10),this.scene.add(f),this.lights={central:this.centralLight,green:l,ambient:this.ambientLight,fill1:j,fill2:x,back:f}}updatePositions(){for(let e=0;e<this.particleCount;e++){const t=this.particleData[e],s=e*3,r=t.branchAngle+this.time*(1-t.radiusRatio),o=Math.cos(r)*t.radius,h=Math.sin(r)*t.radius,l=-Math.abs(t.radius*.3);this.positions[s]=o+t.randomX,this.positions[s+1]=l+t.randomY-2,this.positions[s+2]=h+t.randomZ}this.mesh.geometry.attributes.position.needsUpdate=!0}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.008,this.updatePositions(),this.renderer.render(this.scene,this.camera)}onResize(e,t){if(!this.renderer||!this.camera)return;const s=e||this.canvas.width,r=t||this.canvas.height;this.camera.aspect=s/r,this.camera.updateProjectionMatrix(),this.renderer.setSize(s,r,!1)}onContextLost(e){e.preventDefault(),console.warn("WebGL context lost. Attempting to restore..."),this.animationId=null,this.contextLost=!0}onContextRestored(){this.init(),this.start()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.mesh&&this.scene&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null),this.scene&&this.scene.children)for(;this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,window.removeEventListener("resize",this.onResize.bind(this))}cleanup(){for(this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}}destroy(){this.stop(),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null)}}const At=`
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
`,It=`
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
`;class Ae{constructor(e,t={},s="BackgroundCanvas"){this.canvas=e,this.componentId=s,this.renderer=null,this.scene=null,this.camera=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.waveSourceCount=t.waveSourceCount||6,this.maxRings=t.maxRings||8,this.waveSpeed=t.waveSpeed||1.2,this.ringSpacing=t.ringSpacing||45,this.maxRadius=t.maxRadius||400,this.waveColor=new D("#00ffff"),this.sourceColor=new D("#4dd0e1"),this.waveSources=[],this.waveRings=[],this.sourceGeometry=null,this.ringGeometries=[],this.sourceMaterial=null,this.ringMaterials=[],this.sourcePoints=null,this.ringMeshes=[],this.mouse=new Ue,this.lastRippleTime=0,this.rippleInterval=2e3,this.updateThemeColors();try{this.init()}catch(r){throw console.error("EffectRippleWaves: Failed to initialize Three.js",r),r}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),s=e.getPropertyValue("--theme-accent").trim();t&&this.waveColor.setStyle(t),s&&this.sourceColor.setStyle(s),this.sourceMaterial&&this.sourceMaterial.color.copy(this.sourceColor),this.ringMeshes.forEach(r=>{r.userData.isShaderRipple&&r.material.uniforms?(r.material.uniforms.primaryColor.value.copy(this.waveColor),r.material.uniforms.accentColor.value.copy(this.sourceColor)):r.material.color&&r.material.color.copy(this.waveColor)})}init(){this.camera=new Be(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.z=400,this.scene=new ke,this.scene.background=new D(0),this.renderer=new Le({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.createWaveSources(),this.setupMouseInteraction(),setTimeout(()=>{this.waveSources.forEach((e,t)=>{setTimeout(()=>{this.createRipple(t,e.position)},t*300)})},100),window.addEventListener("resize",this.onResize.bind(this)),this.animate()}createWaveSources(){this.sourceGeometry=new et,this.sourceMaterial=new tt({color:this.sourceColor,size:10,transparent:!0,opacity:0,sizeAttenuation:!0});const e=[];for(let t=0;t<this.waveSourceCount;t++){const s=t/this.waveSourceCount*Math.PI*2,r=100+Math.random()*50,o={position:new ye(Math.cos(s)*r,Math.sin(s)*r,0),lastWaveTime:Date.now()+t*400,waveInterval:1800+Math.random()*600,pulsePhase:Math.random()*Math.PI*2,waves:[]};this.waveSources.push(o),e.push(o.position.x,o.position.y,o.position.z)}this.sourceGeometry.setAttribute("position",new kt(e,3)),this.sourcePoints=new st(this.sourceGeometry,this.sourceMaterial)}createRipple(e,t){const s=this.waveSources[e],r={sourceIndex:e,position:t.clone(),radius:0,maxRadius:this.maxRadius,speed:this.waveSpeed,opacity:1,creationTime:Date.now(),startTime:this.time};s.waves.push(r);const o=new Ge(0,this.maxRadius,64,1),h=new Je({uniforms:{time:{value:this.time},center:{value:new Ue(t.x,t.y)},waveRadius:{value:0},maxRadius:{value:this.maxRadius},primaryColor:{value:this.waveColor.clone()},accentColor:{value:this.sourceColor.clone()},opacity:{value:1}},vertexShader:At,fragmentShader:It,transparent:!0,side:rt,blending:Ee,depthWrite:!1}),l=new Te(o,h);return l.position.copy(t),l.userData={wave:r,sourceIndex:e,isShaderRipple:!0},this.scene.add(l),this.ringMeshes.push(l),r}setupMouseInteraction(){const e=s=>{const r=this.canvas.getBoundingClientRect();this.mouse.x=(s.clientX-r.left)/r.width*2-1,this.mouse.y=-((s.clientY-r.top)/r.height)*2+1},t=s=>{e(s);const r=new ye(this.mouse.x*300,this.mouse.y*200,0);let o=0,h=1/0;this.waveSources.forEach((l,j)=>{const x=l.position.distanceTo(r);x<h&&(h=x,o=j)}),this.createRipple(o,r)};this.canvas.addEventListener("click",t),window.addEventListener("mousemove",e)}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.016;const e=Date.now();this.updateWaveSources(),this.generateAutoRipples(e),this.updateRipples(),this.cleanupExpiredRipples(),this.renderer.render(this.scene,this.camera)}updateWaveSources(){for(let e=0;e<this.waveSources.length;e++){const t=this.waveSources[e];t.pulsePhase+=.03}}generateAutoRipples(e){if(this.waveSources.forEach((t,s)=>{e-t.lastWaveTime>t.waveInterval&&(this.createRipple(s,t.position),t.lastWaveTime=e,t.waveInterval=1800+Math.random()*600)}),this.ringMeshes.length===0&&e>this.time*1e3+1e3){const t=Math.floor(Math.random()*this.waveSources.length);this.createRipple(t,this.waveSources[t].position)}}updateRipples(){this.ringMeshes.forEach(e=>{const t=e.userData.wave;if(!t)return;t.radius+=t.speed;const s=t.radius/t.maxRadius;if(t.opacity=Math.max(0,Math.sin((1-s)*Math.PI*.5)),e.userData.isShaderRipple&&e.material.uniforms){const r=e.material.uniforms;r.time.value=this.time,r.waveRadius.value=t.radius,r.opacity.value=t.opacity,r.primaryColor.value.copy(this.waveColor),r.accentColor.value.copy(this.sourceColor);const h=(this.time-t.startTime)*.5%(Math.PI*2)/(Math.PI*2),l=new D().setHSL(h,.8,.6);r.accentColor.value.lerp(l,.3)}else{const r=Math.max(0,t.radius-3),o=t.radius;e.geometry.dispose(),e.geometry=new Ge(r,o,32),e.material.opacity=t.opacity*.3}this.calculateInterference(t,e)})}calculateInterference(e,t){let s=0;if(this.ringMeshes.forEach(r=>{if(r===t)return;const o=r.userData.wave;if(!o)return;const h=e.position.distanceTo(o.position);Math.abs(e.radius-o.radius)<15&&h<e.radius+o.radius&&(s+=.4)}),t.userData.isShaderRipple&&t.material.uniforms){const r=t.material.uniforms.opacity.value;if(t.material.uniforms.opacity.value=Math.min(1,r+s),s>0){const o=this.waveColor.clone().multiplyScalar(1+s*.5);t.material.uniforms.primaryColor.value.lerp(o,.3)}}else t.material.opacity=Math.min(.8,t.material.opacity+s)}cleanupExpiredRipples(){for(let e=this.ringMeshes.length-1;e>=0;e--){const t=this.ringMeshes[e],s=t.userData.wave;if((!s||s.radius>s.maxRadius)&&(this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose(),this.ringMeshes.splice(e,1),s.sourceIndex!==void 0)){const r=this.waveSources[s.sourceIndex],o=r.waves.indexOf(s);o>-1&&r.waves.splice(o,1)}}}onResize(){!this.camera||!this.renderer||(this.camera.aspect=this.canvas.width/this.canvas.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.canvas.width,this.canvas.height,!1))}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),window.removeEventListener("resize",this.onResize.bind(this)),this.ringMeshes.forEach(e=>{this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(e.material.uniforms&&Object.values(e.material.uniforms).forEach(t=>{t.value&&t.value.dispose&&t.value.dispose()}),e.material.dispose())}),this.sourceGeometry&&this.sourceGeometry.dispose(),this.sourceMaterial&&this.sourceMaterial.dispose(),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null)}destroy(){this.stop()}}const it=({effectType:a="effectfuse",sectionName:e="unknown"})=>{const t=n.useRef(null),s=n.useRef(null),r=n.useRef(null),o=n.useRef(null),h=he(l=>l.theme);return n.useEffect(()=>{r.current&&(clearTimeout(r.current),r.current=null);let l=t.current;if(!l){l=document.createElement("canvas"),l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.zIndex="-1",l.style.pointerEvents="none",l.style.background="transparent";const m=window.innerWidth,T=window.innerHeight,p=1280,C=720,u=m/T;let S,b;u>p/C?(S=Math.min(p,m),b=Math.floor(S/u)):(b=Math.min(C,T),S=Math.floor(b*u)),S=Math.max(S,800),b=Math.max(b,600),l.width=S,l.height=b,document.body.appendChild(l),t.current=l}const j=()=>{var m;if(l)try{const T=window.innerWidth,p=window.innerHeight,C=1280,u=720,S=T/p;let b,R;S>C/u?(b=Math.min(C,T),R=Math.floor(b/S)):(R=Math.min(u,p),b=Math.floor(R*S)),b=Math.max(b,800),R=Math.max(R,600),l.width=b,l.height=R,(m=s.current)!=null&&m.onResize&&s.current.onResize(l.width,l.height)}catch(T){console.error("Error resizing canvas:",T)}};j(),(()=>{var T,p;if(s.current){const C=s.current;s.current=null,r.current=setTimeout(()=>{try{typeof C.stop=="function"?C.stop():typeof C.destroy=="function"&&C.destroy()}catch{}},200)}const m={brightness:.6,blobiness:1.5,particles:10,scanlines:!1,energy:1.01,timeScale:1};try{const C=`BackgroundCanvas_${e}`;switch(a){case"effectfuse":{s.current=new Rt(l,m,C);break}case"effectmonjori":s.current=jt(l,m,C);break;case"effectheartbeats":s.current=new Ae(l,m,C);break;case"effectlorenz":{s.current=new Pt(l,m,C);break}case"effectchaos":{const u={particleCount:2e3,branches:3,radius:9,spin:1,randomness:.15,randomnessPower:3,size:.12,colorInside:m.colorInside||"#fff8dc",colorOutside:m.colorOutside||"#ffa575"};s.current=new _t(l,u,C);break}case"effectripple":{const u={waveSourceCount:6,maxRings:8,waveSpeed:1.2,ringSpacing:45,maxRadius:400};s.current=new Ae(l,u,C);break}default:s.current=new Ae(l,m,C)}(T=s.current)!=null&&T.start&&s.current.start(),o.current=J.registerResources(C,{canvas:l,effect:s.current,effectType:a},{persistent:!1})}catch(C){if(console.error("Error creating background effect:",C),a==="effectfuse"||a==="effectlorenz"||a==="effectchaos")try{s.current=new Ae(l,m),(p=s.current)!=null&&p.start&&s.current.start()}catch(u){console.error("Error creating fallback effect:",u),s.current=null}else s.current=null}})();const f=pt.debounce(j,250);return window.addEventListener("resize",f),()=>{if(window.removeEventListener("resize",f),r.current&&(clearTimeout(r.current),r.current=null),s.current)try{typeof s.current.stop=="function"?s.current.stop():typeof s.current.destroy=="function"&&s.current.destroy()}catch(m){console.error("Error cleaning up effect:",m)}finally{s.current=null}if(o.current?(J.cleanup(o.current),o.current=null):J.cleanupByComponent(`BackgroundCanvas_${e}`),l&&document.body.contains(l))try{document.body.removeChild(l)}catch(m){console.error("Error removing canvas:",m)}t.current=null,typeof window<"u"&&window.gc&&setTimeout(()=>window.gc(),100)}},[a,e]),n.useEffect(()=>{const l=["effectchaos","effectlorenz","effectmonjori","effectripple"];s.current&&s.current.updateThemeColors&&l.includes(a)&&s.current.updateThemeColors()},[h,a]),null};it.propTypes={effectType:Y.string,sectionName:Y.string};const Bt=n.lazy(()=>pe(()=>import("./home-BpjwdVUK.js").then(a=>a.H),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),Nt=n.lazy(()=>pe(()=>import("./projects-B9vYxaeW.js").then(a=>a.P),__vite__mapDeps([11,1,2,3,4,12,13,5,6,7,8,0,9,10,14]))),zt=n.lazy(()=>pe(()=>import("./gallery-DozA3Une.js").then(a=>a.G),__vite__mapDeps([6,1,2,3,4,7,5,8]))),Dt=n.lazy(()=>pe(()=>import("./EducationSection-C-8Y9A0R.js"),__vite__mapDeps([15,1,2,3,4,5,0,6,7,8,9,10,11,12,13,14,16]))),Ft=n.lazy(()=>pe(()=>import("./ContactSection-Bsd_TfU2.js"),__vite__mapDeps([17,1,2,3,4,5,11,12,13,6,7,8,0,9,10,14,18]))),Ot=n.lazy(()=>pe(()=>import("./about-BdwSw3Ii.js").then(a=>a.A),__vite__mapDeps([5,1,2,3,4]))),Wt=()=>{const{currentSection:a,sections:e,navigateToSection:t,navigateNext:s,navigatePrev:r,isScrolling:o,getCurrentSectionData:h,language:l,enableOpeningAnimation:j,isProjectModalOpen:x}=he(),f={DESKTOP_THRESHOLD:600,MOBILE_THRESHOLD:200,RESET_TIME:256,PREVIEW_MAX_OFFSET:80,BOUNDARY_THRESHOLD:50,BOUNCE_MAX_OFFSET:30,LONG_CONTENT_SECTIONS:["projects","education","about","contact","gallery"]},{DESKTOP_THRESHOLD:m,MOBILE_THRESHOLD:T,RESET_TIME:p,PREVIEW_MAX_OFFSET:C,BOUNDARY_THRESHOLD:u,BOUNCE_MAX_OFFSET:S,LONG_CONTENT_SECTIONS:b}=f,R=n.useRef(null),w=n.useRef(null),A=n.useRef(0),k=n.useRef(0),v=n.useRef(),z=n.useRef({x:0,y:0,time:0}),O=n.useRef(0),[$,Ce]=n.useState("slide"),[G,de]=n.useState(!1),[oe,Ne]=n.useState({}),[Z,se]=n.useState(!1),[ue,Q]=n.useState(0),[K,q]=n.useState(!1),[le,X]=n.useState("none"),E=h(),V=(E==null?void 0:E.id)==="home",ne=b.includes(E==null?void 0:E.id);n.useEffect(()=>{if(E!=null&&E.id){const c=E.id,d=setTimeout(()=>{J.cleanupOtherSections(`BackgroundCanvas_${c}`,["HeroCube"])},3e3);return()=>clearTimeout(d)}},[E==null?void 0:E.id]);const te=n.useCallback(c=>{if(!c)return{isAtTop:!1,isAtBottom:!1,currentScrollTop:0,maxScrollTop:0};const d=c.scrollTop,g=c.scrollHeight-c.clientHeight;return{isAtTop:d<=u,isAtBottom:d>=g-u,currentScrollTop:d,maxScrollTop:g}},[u]),ze=n.useMemo(()=>({home:Bt,about:Ot,projects:Nt,gallery:zt,education:Dt,contact:Ft}),[]),U=n.useCallback(()=>{if(!w.current)return;const c=w.current,d=c.getBoundingClientRect(),g=c.scrollHeight>d.height+10,P=navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows"),M=window.innerWidth<768;P&&!M&&ne&&!g&&requestAnimationFrame(()=>{setTimeout(()=>{if(w.current){const y=w.current.getBoundingClientRect(),N=w.current.scrollHeight>y.height+10;console.log("🪟 Windows延迟检测结果:",{scrollHeight:w.current.scrollHeight,containerHeight:y.height,isOverflowing:N}),de(N),Ce(V?"slide":N?"content":"slide")}},200)}),M&&ne&&!g&&setTimeout(()=>{if(w.current){const y=w.current.getBoundingClientRect(),N=w.current.scrollHeight>y.height+10;de(N),Ce(V?"slide":N?"content":"slide")}},500),ne&&console.log("📏 内容溢出检测:",{section:E==null?void 0:E.id,scrollHeight:c.scrollHeight,containerHeight:d.height,isOverflowing:g,isWindows:P,isMobile:M}),de(g),Ce(V?"slide":g?"content":"slide")},[V,ne,E==null?void 0:E.id]),re=n.useCallback((c,d=.5)=>{v.current&&clearTimeout(v.current),X(c),q(!0);const g=Math.min(d*S,S),P=c==="up"?-g:g;Q(P),se(!0),v.current=setTimeout(()=>{se(!1),Q(0),setTimeout(()=>{q(!1),X("none")},300)},150)},[S]),ce=n.useCallback(()=>{v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{Z&&k.current<m&&(se(!1),Q(0),k.current=0)},150)},[Z,m]),ge=n.useCallback(c=>{if($!=="content"){const d=c.deltaY>0?1:-1,g=d>0&&a>=e.length-1,P=d<0&&a<=0;let M=1;(g||P)&&(M=.5);const B=Math.min(k.current/m,1),y=g||P?15:C,N=d*B*y*M;if(Z||se(!0),Q(N),g||P){const W=Math.min(k.current/m,1),H=g?"down":"up";return v.current&&clearTimeout(v.current),v.current=setTimeout(()=>{re(H,W)},100),!0}else return ce(),!1}return!1},[$,a,e.length,Z,ce,re,m,C]),Me=n.useCallback(()=>{if(k.current=0,se(!1),Q(0),q(!1),X("none"),v.current&&clearTimeout(v.current),w.current){const c=E==null?void 0:E.id;if(c==="home"){const g=w.current;g.style.transform="translateY(0)",g.style.transition="none",g.scrollTop=0,requestAnimationFrame(()=>{g&&(g.offsetHeight,g.style.transition="")});return}(oe[c]!==void 0?oe[c]==="bottom":!!(G&&(E==null?void 0:E.previousDirection)==="from-next"))?requestAnimationFrame(()=>{if(w.current){const g=w.current.scrollHeight-w.current.clientHeight;w.current.scrollTop=g}}):w.current.scrollTop=0}},[E,G,oe]),me=n.useCallback(c=>{if(o||x)return;const d=c.touches[0];z.current={x:d.clientX,y:d.clientY,time:Date.now()},O.current=0},[o,x]),Re=n.useCallback(c=>{if(o||x)return;const d=c.touches[0],g=d.clientY-z.current.y,P=d.clientX-z.current.x;if(!(Math.abs(P)>Math.abs(g))){if(O.current=Math.abs(g),V||!G&&$==="slide"){if(O.current>=T){c.preventDefault();const M=g<0,B=g>0;O.current=0,M&&a<e.length-1?s():B&&a>0&&r()}return}if($==="content"&&G&&!V){const M=w.current;if(!M)return;const{isAtTop:B,isAtBottom:y}=te(M);if(O.current>=T){const N=g<0,W=g>0;if(N&&y&&a<e.length-1){c.preventDefault(),O.current=0,s();return}else if(W&&B&&a>0){c.preventDefault(),O.current=0,r();return}}}}},[o,x,$,G,V,a,e.length,s,r,te,T]),_=n.useCallback(()=>{O.current=0},[]),I=n.useCallback(c=>{const d=Date.now();if(o||x)return;if($==="content"&&G&&!V){const y=w.current;if(!y)return;const{isAtTop:N,isAtBottom:W,currentScrollTop:H,maxScrollTop:ie}=te(y),we=c.deltaY>0,je=c.deltaY<0;if(we)if(W){if(d-A.current>p&&(k.current=0),A.current=d,k.current<m){if(k.current+=Math.abs(c.deltaY),H>=ie-5){const ae=Math.min(k.current/m,1);re("down",ae)}k.current>=m&&a<e.length-1&&(k.current=0,s());return}}else{k.current=0;return}else if(je)if(N){if(d-A.current>p&&(k.current=0),A.current=d,k.current<m){if(k.current+=Math.abs(c.deltaY),H<=5){const ae=Math.min(k.current/m,1);re("up",ae)}k.current>=m&&a>0&&(k.current=0,r());return}}else{k.current=0;return}return}(V||!G&&$==="slide")&&c.preventDefault(),d-A.current>p&&(Z?ce():(k.current=0,se(!1),Q(0))),A.current=d;const g=Math.abs(c.deltaY);k.current+=g;const P=w.current;if(P&&$==="content"&&G){const y=E==null?void 0:E.id;if(y){const{currentScrollTop:N,maxScrollTop:W}=te(P),H=N>=W-10?"bottom":N<=10?"top":"middle";oe[y]!==H&&Ne(ie=>({...ie,[y]:H}))}}if($!=="content"&&ge(c)||k.current<m||(k.current=0,se(!1),Q(0),!P))return;const M=c.deltaY>0,B=c.deltaY<0;M&&a<e.length-1?s():B&&a>0&&r()},[o,x,$,G,V,a,e.length,s,r,E,Z,oe,re,ge,ce,te,p,m]),L=n.useCallback(c=>{if(o||x)return;const d=w.current;switch(c.key){case"ArrowDown":if(c.preventDefault(),$==="content"&&G&&!V&&d){const{isAtBottom:g,maxScrollTop:P}=te(d);if(g)a<e.length-1&&s();else{const M=Math.min(d.scrollTop+100,P);d.scrollTop=M}}else a<e.length-1&&s();break;case"ArrowUp":if(c.preventDefault(),$==="content"&&G&&!V&&d){const{isAtTop:g}=te(d);if(g)a>0&&r();else{const P=Math.max(d.scrollTop-100,0);d.scrollTop=P}}else a>0&&r();break;case"PageDown":case" ":c.preventDefault(),a<e.length-1&&s();break;case"PageUp":c.preventDefault(),a>0&&r();break;case"Home":c.preventDefault(),$==="content"&&!V&&d?d.scrollTop=0:t(0);break;case"End":if(c.preventDefault(),$==="content"&&!V&&d){const{maxScrollTop:g}=te(d);d.scrollTop=g}else t(e.length-1);break;default:{const g=parseInt(c.key);g>=1&&g<=e.length&&(c.preventDefault(),t(g-1));break}}},[o,x,$,G,V,a,e.length,s,r,t,te]);n.useEffect(()=>{const c=new CustomEvent("scrollBounce",{detail:{isBouncing:K,direction:le,intensity:k.current/m}});window.dispatchEvent(c)},[K,le,m]),n.useEffect(()=>{se(!1),Q(0),q(!1),X("none"),k.current=0,v.current&&clearTimeout(v.current);const c=setTimeout(()=>{Me(),U()},50);return()=>{clearTimeout(c)}},[a,Me,U]),n.useEffect(()=>{U();const c=window.innerWidth<768,d=navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows");if(c&&ne){const g=[50,100,200,300,500,800,1200].map(y=>setTimeout(()=>{U()},y)),P=()=>g.forEach(y=>clearTimeout(y)),M=()=>{setTimeout(()=>{U()},50)},B=w.current;return B&&B.querySelectorAll("img").forEach(N=>{N.complete?M():(N.addEventListener("load",M,{once:!0}),N.addEventListener("error",M,{once:!0}))}),()=>{P(),B&&B.querySelectorAll("img").forEach(N=>{N.removeEventListener("load",M),N.removeEventListener("error",M)})}}else if(d&&ne){console.log("🪟 Windows检测策略激活，section:",E==null?void 0:E.id);const g=[25,50,100,200,300,500,800].map(y=>setTimeout(()=>{console.log(`🪟 Windows检测 ${y}ms`),U()},y)),P=()=>g.forEach(y=>clearTimeout(y)),M=()=>{setTimeout(()=>{console.log("🪟 Windows图片加载完成，重新检测"),U()},50)},B=w.current;return B&&B.querySelectorAll("img").forEach(N=>{N.complete?M():(N.addEventListener("load",M,{once:!0}),N.addEventListener("error",M,{once:!0}))}),()=>{P(),B&&B.querySelectorAll("img").forEach(N=>{N.removeEventListener("load",M),N.removeEventListener("error",M)})}}else{const g=setTimeout(()=>U(),50),P=setTimeout(()=>U(),150),M=setTimeout(()=>U(),300);return()=>{clearTimeout(g),clearTimeout(P),clearTimeout(M)}}},[a,U,ne,E==null?void 0:E.id]),n.useEffect(()=>{const c=R.current;let d;const g=()=>{d&&clearTimeout(d),d=setTimeout(()=>{U()},100)};if(c){c.addEventListener("wheel",I,{passive:!1}),c.addEventListener("touchstart",me,{passive:!1}),c.addEventListener("touchmove",Re,{passive:!1}),c.addEventListener("touchend",_,{passive:!1}),document.addEventListener("keydown",L),window.addEventListener("resize",g);let P;return window.ResizeObserver&&w.current&&(P=new ResizeObserver(()=>{setTimeout(()=>{console.log("📐 ResizeObserver检测到内容变化"),U()},100)}),P.observe(w.current)),()=>{c.removeEventListener("wheel",I),c.removeEventListener("touchstart",me),c.removeEventListener("touchmove",Re),c.removeEventListener("touchend",_),document.removeEventListener("keydown",L),window.removeEventListener("resize",g),P&&P.disconnect(),v.current&&clearTimeout(v.current),d&&clearTimeout(d)}}},[I,me,Re,_,L,U]);const F=()=>{if(!E)return null;const c=ze[E.id];return c?i.jsx(n.Suspense,{fallback:i.jsx("div",{className:"flex items-center justify-center h-full",children:i.jsx("div",{className:"text-white text-xl",children:"Loading..."})}),children:i.jsx(c,{section:E,language:l,...E.id==="home"?{sections:e,onSectionChange:t,enableOpeningAnimation:j}:{}})}):null};return i.jsxs("div",{ref:R,className:"relative w-full m-0 p-0 h-screen",style:{overflow:"hidden",height:"var(--vh-fallback, 100vh)",minHeight:"100dvh"},children:[(E==null?void 0:E.backgroundEffect)&&i.jsx(it,{effectType:E.backgroundEffect,sectionName:E.id||"unknown"}),i.jsx("div",{ref:w,className:`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${V?"scroll-mode-home overflow-hidden":G?"scroll-mode-auto overflow-y-auto":"overflow-hidden"} ${K?"bouncing":""}`,style:{transform:Z&&!K?`translateY(${ue}px)`:"translateY(0)",transition:o||Z&&!K?"none":K?"transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)":"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",willChange:o||Z||K?"transform":"auto"},children:F()}),o&&i.jsx("div",{className:"fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"})]})};function Se(){const a=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${a}px`),document.documentElement.style.setProperty("--vh-fallback",`${window.innerHeight}px`),CSS.supports("height","100dvh")||document.documentElement.style.setProperty("--dvh-fallback",`${window.innerHeight}px`)}function Ht(){Se();let a;if(window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(Se,100)}),screen.orientation?screen.orientation.addEventListener("change",()=>{setTimeout(Se,200)}):window.addEventListener("orientationchange",()=>{setTimeout(Se,200)}),/iPhone|iPad|iPod/.test(navigator.userAgent)){let e;window.addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(Se,150)},{passive:!0})}}function Ut(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}const Gt=["a","button","input","select","textarea","[onclick]",'[role="button"]','[role="link"]','[role="menuitem"]','[tabindex]:not([tabindex="-1"])',".clickable",".btn",".button",".cursor-pointer","summary","label",'[data-clickable="true"]'],$t=["canvas","svg","img","video",".hero-cube",".effect-avatar",".lorenz-attractor",'[data-no-custom-cursor="true"]','[style*="pointer-events: none"]','[style*="pointerEvents: none"]',".h-screen.w-screen",".overflow-hidden",".background-container",".bg-container"],Vt=()=>{const{getThemeColors:a}=Ke(),e=a(),{currentSection:t,getText:s}=he(),r=t===0,o=n.useCallback(()=>{if(window.innerWidth<=768)return!0;const _=navigator.userAgent.toLowerCase();return["mobile","android","iphone","ipad","ipod","blackberry","opera mini","iemobile"].some(F=>_.includes(F))||("ontouchstart"in window||navigator.maxTouchPoints>0)&&window.innerWidth<=1024?!0:Ut()},[]),h=()=>s("home.desktopScrollHint");n.useEffect(()=>{(navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows"))&&(console.log("🖱️ SmartDirectionalCursor: Windows设备检测"),console.log("📱 isMobile():",o()),console.log("🖥️ 窗口尺寸:",window.innerWidth,"x",window.innerHeight),console.log("🎯 媒体查询 hover支持:",window.matchMedia("(hover: hover)").matches),console.log("🎯 媒体查询 pointer精细:",window.matchMedia("(pointer: fine)").matches),console.log("🎯 媒体查询 hover无:",window.matchMedia("(hover: none)").matches),console.log("🎯 媒体查询 pointer粗糙:",window.matchMedia("(pointer: coarse)").matches),console.log("🔍 用户代理:",navigator.userAgent))},[o]);const[l,j]=n.useState({x:0,y:0}),[x,f]=n.useState(!1),[m,T]=n.useState("none"),[p,C]=n.useState(!1),[u,S]=n.useState(0),[b,R]=n.useState(0),[w,A]=n.useState(0),[k,v]=n.useState(0),[z,O]=n.useState(!1),[$,Ce]=n.useState(0),[G,de]=n.useState(null),[oe,Ne]=n.useState(!1),{sections:Z,isPointerLocked:se}=he(),ue=n.useRef(),Q=n.useRef(0),K=n.useRef(),q=n.useRef(),le=n.useRef(null),X=n.useRef(new WeakMap),E=n.useRef({x:-1,y:-1,result:!1,timestamp:0}),V=n.useRef({currentScrollDelta:0,animatedValue:0,isAnimatingDown:!1,scrollIntensity:0});n.useEffect(()=>{V.current={currentScrollDelta:w,animatedValue:k,isAnimatingDown:z,scrollIntensity:u}},[w,k,z,u]);const ne=n.useCallback((_,I)=>{const L=E.current,F=performance.now();if(Math.sqrt(Math.pow(_-L.x,2)+Math.pow(I-L.y,2))<10&&F-L.timestamp<50)return L.result;const d=document.elementFromPoint(_,I);if(!d)return E.current={x:_,y:I,result:!1,timestamp:F},!1;if(X.current.has(d)){const W=X.current.get(d);return E.current={x:_,y:I,result:W,timestamp:F},W}const g=Gt,P=$t;if(d.hasAttribute("data-no-custom-cursor")||d.hasAttribute("data-hero-cube-canvas")||d.classList.contains("hero-cube-canvas"))return X.current.set(d,!1),!1;const M=window.getComputedStyle(d);if(M.pointerEvents==="none"||M.cursor==="none"&&(d.classList.contains("h-screen")||d.classList.contains("w-screen")||d.classList.contains("overflow-hidden")))return X.current.set(d,!1),!1;if(d.tagName.toLowerCase()==="canvas"){const W=d.parentElement;if(W&&(W.classList.contains("hero-cube")||W.hasAttribute("data-hero-cube")||W.style.pointerEvents==="none"||d.style.pointerEvents==="none"))return X.current.set(d,!1),!1}let B=!1,y=d,N=0;for(;y&&y!==document.body&&N<5;){if(P.some(H=>{try{return y.matches(H)}catch{return!1}})){B=!1;break}if(y.tagName.toLowerCase()==="div"){const H=window.getComputedStyle(y),ie=y.classList;if(H.cursor==="none"&&(ie.contains("h-screen")||ie.contains("w-screen"))){B=!1;break}const we=["h-screen","w-screen","overflow-hidden","relative","absolute","fixed"];if(Array.from(ie).every(ae=>we.includes(ae)||ae.startsWith("bg-")||ae.startsWith("backdrop-"))&&H.cursor==="none"){B=!1;break}}if(g.some(H=>{try{return y.matches(H)}catch{return!1}})){B=!0;break}if(window.getComputedStyle(y).cursor==="pointer"){const H=y.tagName.toLowerCase();if(!["canvas","svg","img","video"].includes(H)&&(y.hasAttribute("onclick")||y.hasAttribute("role")||y.hasAttribute("tabindex")||y.classList.contains("clickable")||y.classList.contains("btn")||y.classList.contains("button")||["a","button","input","select","textarea"].includes(H))){B=!0;break}}if(y.onclick||y.getAttribute("data-testid")||y.classList.contains("cursor-pointer")){B=!0;break}y=y.parentElement,N++}if(X.current.set(d,B),E.current={x:_,y:I,result:B,timestamp:performance.now()},X.current.size>100){const W=Array.from(X.current.entries());X.current.clear(),W.slice(-50).forEach(([H,ie])=>{X.current.set(H,ie)})}return B},[]),te=n.useCallback(()=>{const _=t>0,I=t<Z.length-1;return _&&I?"both":_?"up":I?"down":"none"},[t,Z.length]),ze=n.useCallback(()=>{const _=t>0,I=t<Z.length-1;le.current||(le.current=document.querySelector(".scroll-mode-auto"));const L=le.current;let F=!1,c=!0,d=!0;return L&&(F=L.scrollHeight>L.clientHeight+10,c=L.scrollTop<=5,d=L.scrollTop>=L.scrollHeight-L.clientHeight-5),{isTopBoundary:!_&&(!F||c),isBottomBoundary:!I&&(!F||d),hasNowhereToGo:!_&&!I&&!F,hasContentToScroll:F}},[t,Z.length]);n.useCallback(()=>{q.current&&(cancelAnimationFrame(q.current),q.current=null),O(!0);const _=Math.abs(w);if(_===0){O(!1),v(0),A(0),S(0);return}const I=performance.now(),L=Math.min(_*2,600),F=()=>{const d=performance.now()-I,g=Math.min(d/L,1),P=1-Math.pow(1-g,4),M=Math.round(_*(1-P));v(M),g<1?q.current=requestAnimationFrame(F):(v(0),A(0),O(!1),setTimeout(()=>{S(0),de(null),setTimeout(()=>{v(0),A(0)},100)},50),q.current=null)};q.current=requestAnimationFrame(F)},[w]),n.useEffect(()=>{T(te())},[te]);const U=n.useCallback(_=>{const I=_.deltaY,L=Math.min(Math.abs(I)/30,1),F=Math.abs(I);let c=1;F<10?c=2:F<30?c=1.5:F>100&&(c=.8);const d=Math.min(L*c,1),g=I>0?"down":"up",P=performance.now();if(P-(U.lastTime||0)<8)return;U.lastTime=P,q.current&&(cancelAnimationFrame(q.current),q.current=null),O(!1),S(d),de(g),Ce(P);const M=Math.round(I);A(M),v(M),R(B=>{const y=B+M;return Math.max(-9999,Math.min(9999,y))}),K.current&&(clearTimeout(K.current),K.current=null),K.current=setTimeout(()=>{A(0),v(0),S(0),O(!1),K.current=null},100)},[]),re=n.useCallback(_=>{const I=performance.now();if(I-(re.lastTime||0)<16)return;re.lastTime=I;const L={x:_.clientX,y:_.clientY},F=ne(_.clientX,_.clientY);j(L),Ne(F),x||f(!0)},[x,ne]),ce=n.useCallback(()=>{f(!0),C(!0)},[]),ge=n.useCallback(()=>{f(!1),C(!1)},[]);n.useEffect(()=>{let _=0;const I=()=>{const L=performance.now();if(L-(I.lastTime||0)<16){ue.current=requestAnimationFrame(I);return}if(I.lastTime=L,p?Q.current=Math.min(Q.current+.12,1):Q.current=Math.max(Q.current-.08,.3),L-$>50){const c=Math.max(u-.03,0);L-_>50&&c!==u&&(S(c),_=L)}ue.current=requestAnimationFrame(I)};return ue.current=requestAnimationFrame(I),()=>{ue.current&&cancelAnimationFrame(ue.current)}},[p,$,u,b]),n.useEffect(()=>{const _=document.body.style.cursor;return oe?document.body.style.cursor="auto":document.body.style.cursor="none",()=>{document.body.style.cursor=_,le.current&&(le.current=null),Q.current=.3}},[oe]),n.useEffect(()=>(document.addEventListener("mousemove",re),document.addEventListener("mouseenter",ce),document.addEventListener("mouseleave",ge),document.addEventListener("wheel",U,{passive:!0}),()=>{document.removeEventListener("mousemove",re),document.removeEventListener("mouseenter",ce),document.removeEventListener("mouseleave",ge),document.removeEventListener("wheel",U),K.current&&clearTimeout(K.current),q.current&&cancelAnimationFrame(q.current)}),[re,ce,ge,U]),n.useEffect(()=>{if(!z&&w!==0&&u===0){const _=setTimeout(()=>{A(0),v(0),de(null)},1500);return()=>clearTimeout(_)}},[z,w,u]);const Me=()=>{const I=p?1.02:1,L=133*I,F=ze(),c=F.isTopBoundary&&G==="up"&&u>0||F.isBottomBoundary&&G==="down"&&u>0||F.hasNowhereToGo&&u>0,d=ve=>{const be=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ve);return be?[parseInt(be[1],16),parseInt(be[2],16),parseInt(be[3],16)]:[255,255,255]},g=()=>c&&u>0?"#ff4444":e.primary,P=()=>c&&u>0?"#ff4444":e.accent,M=g(),B=P(),y=()=>{const ve=z?k:w;return ve===0?null:Math.abs(ve).toString()},N=()=>G==="down"?"translate3d(24px, 0, 0)":G==="up"?"translate3d(-24px, 0, 0)":"translate3d(0, 0, 0)",W=y(),H=N(),ie=W!==null&&(u>0||Math.abs(w)>0||z||Math.abs(k)>0),we=.2,je=5,ae={width:`${L}px`,height:`${L}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",transform:"translate3d(0, 0, 0)",willChange:"transform"},Pe=(ve,be=1)=>{const _e=256*I,ht=ve==="up"?"M12 22L12 2M10 4L12 2L14 4":"M12 2L12 22M10 20L12 22L14 20",dt=(()=>{if(u===0)return e.primary;if(c){const ee=[255,68,68],fe=[180,20,20],De=Math.round(ee[0]+(fe[0]-ee[0])*u),Fe=Math.round(ee[1]+(fe[1]-ee[1])*u),Oe=Math.round(ee[2]+(fe[2]-ee[2])*u);return`rgb(${De}, ${Fe}, ${Oe})`}else{const ee=d(e.accent),fe=d(e.secondary),De=Math.round(ee[0]+(fe[0]-ee[0])*u),Fe=Math.round(ee[1]+(fe[1]-ee[1])*u),Oe=Math.round(ee[2]+(fe[2]-ee[2])*u);return`rgb(${De}, ${Fe}, ${Oe})`}})();return i.jsx("div",{style:{position:"absolute",width:`${_e}px`,height:`${_e}px`,display:"flex",alignItems:"center",justifyContent:"center",opacity:be*.8,zIndex:10,transform:"translate3d(0, 0, 0)",willChange:"opacity"},children:i.jsx("svg",{width:_e,height:_e,viewBox:"0 0 24 24",style:{shapeRendering:"geometricPrecision",vectorEffect:"non-scaling-stroke"},children:i.jsx("path",{d:ht,stroke:dt,strokeWidth:we,strokeLinecap:"round",strokeLinejoin:"round",fill:"none",opacity:.8,style:{transition:"stroke 0.1s ease-out",willChange:"stroke"}})})})};return i.jsxs("div",{style:ae,children:[i.jsxs("svg",{width:L,height:L,style:{position:"absolute",transform:G==="up"?"rotate(90deg)":"rotate(-90deg)",transition:"transform 0.2s ease-out"},children:[i.jsx("circle",{cx:L/2,cy:L/2,r:(L-4)/2,fill:"none",stroke:M,strokeWidth:we,opacity:"0.8"}),u>0&&i.jsx("circle",{cx:L/2,cy:L/2,r:(L-4)/2,fill:"none",stroke:B,strokeWidth:je,strokeLinecap:"round",opacity:"0.9",strokeDasharray:`${2*Math.PI*((L-4)/2)}`,strokeDashoffset:`${2*Math.PI*((L-4)/2)*(1-u)}`,style:{transition:"stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"stroke-dashoffset"}})]}),ie&&i.jsx("div",{style:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"600",fontFamily:'Monaco, "SF Mono", "Consolas", monospace',color:B,opacity:.95,zIndex:15,textShadow:`0 0 6px ${B}40`,transform:H,willChange:"opacity, transform",minWidth:"32px",textAlign:"center",transition:z?"none":"all 0.2s ease-out"},children:i.jsx("span",{className:"scroll-value",style:{transform:z?"scale(0.95)":"scale(1)",transition:"transform 0.15s ease-out"},children:W})}),m==="up"&&Pe("up"),m==="down"&&Pe("down"),m==="both"&&i.jsxs(i.Fragment,{children:[Pe("up",.7),Pe("down",.7)]}),m==="none"&&u===0&&i.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:M,opacity:.8,transform:"translate3d(0, 0, 0)"}}),i.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"var(--theme-primary)",opacity:.9,zIndex:20,transform:"translate3d(0, 0, 0)",willChange:"transform",boxShadow:"0 0 6px var(--theme-primary)"}})]})},me=navigator.platform.toLowerCase().includes("win")||navigator.userAgent.toLowerCase().includes("windows");return o()||!(x||me&&!o())?null:i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
            `}),oe&&i.jsx("div",{className:`clickable-hint ${me?"force-show":""}`,style:{left:l.x,top:l.y}}),i.jsx("div",{className:`power-cursor ${p?"hovering":""} ${oe?"over-clickable":""} ${me?"force-show":""}`,style:{left:l.x,top:l.y,transform:"translate3d(-50%, -50%, 0)",willChange:"transform"},children:Me()}),!o()&&r&&m==="down"&&i.jsx("div",{style:{position:"fixed",left:l.x,top:l.y-120,transform:"translate(-50%, -50%)",color:e.primary,fontSize:"14px",fontWeight:"500",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',opacity:.8,pointerEvents:"none",zIndex:9998,textShadow:`0 0 8px ${e.primary}40`,animation:"gentle-pulse 2s ease-in-out infinite",whiteSpace:"nowrap",userSelect:"none"},children:h()})]})},ot=({language:a="en"})=>{const[e,t]=n.useState(navigator.onLine),[s,r]=n.useState(!1);n.useEffect(()=>{const x=()=>{t(!0),r(!0),setTimeout(()=>r(!1),2e3)},f=()=>{t(!1),r(!0)};return window.addEventListener("online",x),window.addEventListener("offline",f),navigator.onLine||r(!0),()=>{window.removeEventListener("online",x),window.removeEventListener("offline",f)}},[]);const o=()=>e?{title:a==="zh"?"网络连接已恢复":"Network Reconnected",message:a==="zh"?"所有功能恢复正常":"All features are now working",icon:i.jsx("svg",{className:"w-6 h-6 text-green-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}:{title:a==="zh"?"网络连接中断":"Network Disconnected",message:a==="zh"?"部分功能可能无法正常使用，请检查网络连接":"Some features may not work properly. Please check your connection.",icon:i.jsx("svg",{className:"w-6 h-6 text-red-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"})})};if(!s)return null;const{title:h,message:l,icon:j}=o();return i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center pointer-events-none",children:i.jsx("div",{className:`transition-all duration-300 transform ${s?"scale-100 opacity-100":"scale-95 opacity-0"} pointer-events-auto`,children:i.jsx("div",{className:"bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 rounded-lg p-4 shadow-2xl",children:i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx("div",{className:"flex-shrink-0",children:j}),i.jsxs("div",{className:"text-white",children:[i.jsx("div",{className:"font-medium text-sm",children:h}),i.jsx("div",{className:"text-zinc-300 text-xs mt-1",children:l})]}),i.jsx("button",{onClick:()=>r(!1),className:"text-zinc-400 hover:text-zinc-200 text-sm ml-4 transition-colors","aria-label":"关闭",children:i.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})})})})};ot.propTypes={language:Y.string};const Yt=()=>{const{currentSection:a}=he(),t=a===0?0:a/5*100;return i.jsx("div",{className:"fixed top-0 left-0 right-0 z-40 h-[5px]",children:i.jsx("div",{className:`w-full h-full transition-opacity duration-300 ${a===0?"bg-transparent":"bg-white/20"}`,children:i.jsx("div",{className:"h-full transition-all duration-700 ease-out",style:{width:`${t}%`,backgroundColor:"var(--theme-primary)"}})})})},qt=()=>{const a=n.useRef(null),e=n.useRef(null);return n.useEffect(()=>{if(!a.current)return;const t=new ke,s=new Be(75,window.innerWidth/window.innerHeight,.1,1e3),r=new Le({canvas:a.current,alpha:!0,antialias:!0});r.setSize(window.innerWidth,window.innerHeight),r.setClearColor(0,.3),s.position.z=400;const o=(x,f)=>{const m=new Ge(10,300,32),T=new Ie({color:3900150,transparent:!0,opacity:.3,side:rt}),p=new Te(m,T);return p.position.set(x,f,0),p.userData={startTime:Date.now(),initialScale:.1,targetScale:2,duration:3e3},t.add(p),p},h=[];for(let x=0;x<5;x++){const f=(Math.random()-.5)*800,m=(Math.random()-.5)*600;h.push(o(f,m))}const l=()=>{const x=Date.now();h.forEach(f=>{const T=(x-f.userData.startTime)/f.userData.duration;if(T<1){const p=f.userData.initialScale+(f.userData.targetScale-f.userData.initialScale)*T;f.scale.set(p,p,1),f.material.opacity=.3*(1-T)}else f.userData.startTime=x,f.scale.set(.1,.1,1),f.position.x=(Math.random()-.5)*800,f.position.y=(Math.random()-.5)*600;f.rotation.z+=.01}),r.render(t,s),requestAnimationFrame(l)};l();const j=()=>{s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",j),e.current={scene:t,camera:s,renderer:r,ripples:h},()=>{if(window.removeEventListener("resize",j),e.current){const{scene:x,renderer:f}=e.current;x.clear(),f.dispose()}}},[]),i.jsx("canvas",{ref:a,className:"absolute inset-0 w-full h-full pointer-events-none",style:{zIndex:1}})},nt=({error:a,resetError:e,hasError:t})=>{var T;const{language:s,getNewContent:r}=he(),[o,h]=Xe.useState(!1);if(!t)return null;const l=r(),j=((T=l==null?void 0:l.contact)==null?void 0:T.emailAddress)||"aemooooon@gmail.com",x=()=>{const p={message:(a==null?void 0:a.message)||"Unknown error",stack:(a==null?void 0:a.stack)||"No stack trace available",timestamp:new Date().toISOString(),url:window.location.href,userAgent:navigator.userAgent,language:s},C=encodeURIComponent(`Error Report from ${window.location.hostname}`),u=encodeURIComponent(`
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
        `);window.open(`mailto:${j}?subject=${C}&body=${u}`)},f={en:{title:"Oops! Something went wrong",subtitle:"We encountered an unexpected error. Don't worry, we're here to help!",refresh:"Refresh Page",report:"Report Error",details:"Error Details",showDetails:"Show Details",hideDetails:"Hide Details"},zh:{title:"哎呀！出了点问题",subtitle:"我们遇到了一个意外错误。别担心，我们会帮您解决！",refresh:"刷新页面",report:"报告错误",details:"错误详情",showDetails:"显示详情",hideDetails:"隐藏详情"}},m=f[s]||f.en;return i.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",children:[i.jsx(qt,{}),i.jsxs("div",{className:"glass-card max-w-md w-full p-8 text-center relative",style:{zIndex:10},children:[i.jsx("div",{className:"mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-3xl shadow-lg animate-pulse",children:"⚠️"}),i.jsx("h2",{className:"text-2xl font-bold text-white mb-3",children:m.title}),i.jsx("p",{className:"text-gray-300 mb-8 leading-relaxed",children:m.subtitle}),i.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mb-6",children:[i.jsxs("button",{onClick:e,className:"flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",children:["🔄 ",m.refresh]}),i.jsxs("button",{onClick:x,className:"flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl",children:["📧 ",m.report]})]}),!1]})]})};nt.propTypes={error:Y.object,resetError:Y.func.isRequired,hasError:Y.bool.isRequired};class at extends Xe.Component{constructor(t){super(t);$e(this,"resetError",()=>{this.setState({hasError:!1,error:null}),window.location.reload()});this.state={hasError:!1,error:null}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,s){console.error("ErrorBoundary caught an error:",t,s)}render(){return this.state.hasError?i.jsx(nt,{error:this.state.error,resetError:this.resetError,hasError:this.state.hasError}):this.props.children}}at.propTypes={children:Y.node.isRequired};const lt=({visible:a,onToggle:e})=>{const[t,s]=n.useState("memory"),[r,o]=n.useState(null),[h,l]=n.useState(null),[j,x]=n.useState({}),[f,m]=n.useState(!1),T=n.useRef(0),p=n.useRef(0),C=n.useRef(performance.now()),{currentSection:u,sections:S,getCurrentSection:b}=he();if(n.useEffect(()=>{let v;const z=()=>{p.current++;const O=performance.now();O-C.current>=1e3&&(T.current=Math.round(p.current*1e3/(O-C.current)),p.current=0,C.current=O),v=requestAnimationFrame(z)};return z(),()=>{v&&cancelAnimationFrame(v)}},[]),n.useEffect(()=>{if(!a)return;const v=()=>{performance.memory&&o({used:Math.round(performance.memory.usedJSHeapSize/1024/1024),total:Math.round(performance.memory.totalJSHeapSize/1024/1024),limit:Math.round(performance.memory.jsHeapSizeLimit/1024/1024)});const O=J.getMemoryInfo();l(O),x({fps:T.current})};v();const z=setInterval(v,500);return()=>clearInterval(z)},[a]),!a)return null;const R=[{id:"memory",label:"Memory"},{id:"webgl",label:"WebGL"},{id:"sections",label:"Sections"}],w=()=>i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent backdrop-blur-md border border-blue-400/30 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/20",children:[i.jsx("div",{className:"text-blue-300 font-semibold text-xs mb-1",children:"JS Heap Used"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.used)||0," MB"]}),i.jsxs("div",{className:"text-blue-200/70 text-xs",children:[r?Math.round(r.used/r.limit*100):0,"% of limit"]})]}),i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 shadow-lg ring-1 ring-emerald-400/20",children:[i.jsx("div",{className:"text-emerald-300 font-semibold text-xs mb-1",children:"JS Heap Total"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.total)||0," MB"]}),i.jsx("div",{className:"text-emerald-200/70 text-xs",children:"Allocated"})]})]}),i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent backdrop-blur-md border border-yellow-400/30 rounded-xl p-3 shadow-lg ring-1 ring-yellow-400/20",children:[i.jsx("div",{className:"text-yellow-300 font-semibold text-xs mb-1",children:"JS Heap Limit"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.limit)||0," MB"]}),i.jsx("div",{className:"text-yellow-200/70 text-xs",children:"Browser limit"})]}),i.jsxs("div",{className:"bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-md border border-purple-400/30 rounded-xl p-3 shadow-lg ring-1 ring-purple-400/20",children:[i.jsx("div",{className:"text-purple-300 font-semibold text-xs mb-1",children:"FPS"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:j.fps||0}),i.jsx("div",{className:"text-purple-200/70 text-xs",children:"frames/sec"})]})]})]}),A=()=>i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-3 shadow-lg ring-1 ring-cyan-400/20",children:[i.jsx("div",{className:"text-cyan-300 font-semibold text-xs mb-1",children:"Active Groups"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(h==null?void 0:h.activeResourceGroups)||0}),i.jsx("div",{className:"text-cyan-200/70 text-xs",children:"Resource groups"})]}),i.jsxs("div",{className:"bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-orange-400/30 rounded-xl p-3 shadow-lg ring-1 ring-orange-400/20",children:[i.jsx("div",{className:"text-orange-300 font-semibold text-xs mb-1",children:"Persistent"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(h==null?void 0:h.persistentResources)||0}),i.jsx("div",{className:"text-orange-200/70 text-xs",children:"Persistent resources"})]})]}),(h==null?void 0:h.resourceStats)&&i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[i.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Resource Breakdown"]}),i.jsx("div",{className:"grid grid-cols-2 gap-2 text-xs",children:Object.entries(h.resourceStats).map(([v,z])=>i.jsxs("div",{className:"flex justify-between items-center bg-white/5 rounded-lg px-2 py-1.5 border border-white/10",children:[i.jsxs("span",{className:"capitalize text-gray-300",children:[v.replace(/([A-Z])/g," $1").trim(),":"]}),i.jsx("span",{className:"font-mono text-white font-semibold bg-emerald-500/20 px-2 py-0.5 rounded",children:z})]},v))})]}),(h==null?void 0:h.sectionBreakdown)&&Object.keys(h.sectionBreakdown).length>0&&i.jsxs("div",{className:"bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent backdrop-blur-md border border-violet-400/25 rounded-xl p-4 shadow-lg ring-1 ring-violet-400/15",children:[i.jsxs("div",{className:"text-violet-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"}),"Section Resources"]}),i.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:Object.entries(h.sectionBreakdown).map(([v,z])=>i.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-3 rounded-lg backdrop-blur-sm",children:[i.jsxs("div",{className:"flex items-center justify-between mb-2",children:[i.jsx("div",{className:"font-medium text-white text-sm",children:v.replace("BackgroundCanvas_","").replace("HeroCube","HomeCube").replace("EffectAvatar_","Avatar-")}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("span",{className:"bg-blue-500/30 text-blue-200 px-2 py-1 rounded-md text-xs font-mono border border-blue-400/30",children:z.count}),z.persistent>0&&i.jsxs("span",{className:"bg-green-500/30 text-green-200 px-2 py-1 rounded-md text-xs font-mono border border-green-400/30",children:["P:",z.persistent]})]})]}),i.jsxs("div",{className:"text-xs text-gray-400",children:["Last active: ",new Date(z.lastActive).toLocaleTimeString()]})]},v))})]}),i.jsxs("div",{className:"bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent backdrop-blur-md border border-blue-400/25 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/15",children:[i.jsx("div",{className:"text-blue-300 font-semibold text-sm mb-2",children:"Memory Usage"}),i.jsxs("div",{className:"text-xs text-blue-200/70",children:["JS Heap: ",(h==null?void 0:h.jsHeapSize)||0,"MB / ",(h==null?void 0:h.jsHeapLimit)||0,"MB"]})]})]}),k=()=>{const v=b();return i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-4 shadow-lg ring-1 ring-cyan-400/20",children:[i.jsxs("div",{className:"text-cyan-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"}),"Current Section"]}),i.jsx("div",{className:"text-white text-lg font-bold mb-2",children:(v==null?void 0:v.title)||(v==null?void 0:v.id)||"Unknown"}),i.jsxs("div",{className:"space-y-1 text-xs",children:[i.jsxs("div",{className:"text-cyan-200/70",children:["Section ",u+1," of ",S.length]}),(v==null?void 0:v.backgroundEffect)&&i.jsxs("div",{className:"text-cyan-200/90 bg-cyan-500/20 px-2 py-1 rounded-md border border-cyan-400/30 inline-block",children:["Effect: ",v.backgroundEffect]})]})]}),i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[i.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Section Navigation"]}),i.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:S.map((z,O)=>i.jsxs("div",{className:`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${O===u?"bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-blue-200 border-blue-400/40 shadow-lg":"bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"}`,children:[i.jsx("span",{className:"truncate text-sm font-medium",children:z.title||z.id}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("span",{className:`w-2 h-2 rounded-full ${O===u?"bg-blue-400 animate-pulse":"bg-gray-500"}`}),i.jsx("span",{className:"text-xs font-mono bg-white/10 px-1 py-0.5 rounded",children:O+1})]})]},z.id))})]}),i.jsxs("div",{className:"bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent backdrop-blur-md border border-purple-400/25 rounded-xl p-4 shadow-lg ring-1 ring-purple-400/15",children:[i.jsxs("div",{className:"text-purple-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"}),"Performance Snapshot"]}),i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[i.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"FPS"}),i.jsx("div",{className:"font-mono text-white font-bold text-lg",children:j.fps||0})]}),i.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[i.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"WebGL Groups"}),i.jsx("div",{className:"font-mono text-white font-bold text-lg",children:(h==null?void 0:h.activeResourceGroups)||0})]})]})]})]})};return i.jsx("div",{className:`fixed top-4 right-4 z-[9999] transition-all duration-500 ease-out ${f?"w-12 h-12":"w-96 max-h-[600px]"}`,children:i.jsxs("div",{className:"bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-mono text-xs shadow-2xl shadow-black/20 ring-1 ring-white/20 overflow-hidden",children:[i.jsxs("div",{className:"flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent border-b border-white/20 backdrop-blur-sm",children:[!f&&i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"}),i.jsx("div",{className:"absolute inset-0 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"})]}),i.jsx("span",{className:"text-emerald-300 font-semibold text-sm tracking-wide",children:"Performance Monitor"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("button",{onClick:()=>m(!f),className:"w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40",title:f?"Expand Panel":"Collapse Panel",children:f?"📊":"➖"}),i.jsx("button",{onClick:e,className:"w-7 h-7 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50",title:"Close Panel (Ctrl+M)",children:"✕"})]})]}),!f&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"flex bg-white/5 backdrop-blur-sm border-b border-white/10",children:R.map(v=>i.jsxs("button",{onClick:()=>s(v.id),className:`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden ${t===v.id?"bg-gradient-to-b from-blue-500/30 to-blue-600/20 text-blue-200 shadow-lg":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:[t===v.id&&i.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"}),v.label]},v.id))}),i.jsxs("div",{className:"p-4 max-h-96 overflow-y-auto custom-scrollbar",children:[t==="memory"&&w(),t==="webgl"&&A(),t==="sections"&&k()]}),i.jsx("div",{className:"p-3 bg-gradient-to-t from-white/10 to-transparent border-t border-white/20 backdrop-blur-sm",children:i.jsxs("div",{className:"text-center text-gray-400",children:[i.jsx("span",{className:"text-xs",children:"Press "}),i.jsx("kbd",{className:"inline-flex items-center px-2 py-1 bg-white/20 rounded-md text-xs font-mono border border-white/30 shadow-inner",children:"Ctrl+M"}),i.jsx("span",{className:"text-xs",children:" to toggle"})]})})]})]})})};lt.propTypes={visible:Y.bool.isRequired,onToggle:Y.func.isRequired};const ct=({children:a,language:e="en"})=>{const[t,s]=n.useState(!1),[r,o]=n.useState([]),[h,l]=n.useState(0),j=n.useRef(null),x=async p=>{try{if(p&&p.match(/\.(mp4|webm|mov|avi|mkv)$/i))return{width:1920,height:1080,aspectRatio:16/9};if(p&&p.includes("/gallery/")){const u=p.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{const b=await(await fetch("/precomputed-dimensions.json")).json();if(b.gallery&&b.gallery[u]){const R=b.gallery[u];return{width:R.width,height:R.height,aspectRatio:R.aspectRatio}}}catch{}}let C=p;if(p&&p.includes("/gallery/")&&p.endsWith(".jpg")){const u=p.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{C=await Mt.getOptimalPath(u,"gallery")}catch{}}return new Promise(u=>{const S=new Image;S.onload=()=>{u({width:S.naturalWidth,height:S.naturalHeight,aspectRatio:S.naturalWidth/S.naturalHeight})},S.onerror=()=>{if(C!==p){const b=new Image;b.onload=()=>{u({width:b.naturalWidth,height:b.naturalHeight,aspectRatio:b.naturalWidth/b.naturalHeight})},b.onerror=()=>{u({width:1200,height:800,aspectRatio:1.5})},b.crossOrigin="anonymous",b.src=p}else u({width:1200,height:800,aspectRatio:1.5})},S.crossOrigin="anonymous",S.src=C})}catch{return{width:1200,height:800,aspectRatio:1.5}}},T={isOpen:t,images:r,initialIndex:h,openPhotoSwipe:async(p,C=0)=>{if(!p||p.length===0)return;o(p),l(C),s(!0);const u=p.map(S=>x(S.src||S.original));try{const S=await Promise.all(u),b=p.map((w,A)=>({src:w.src||w.original,width:S[A].width,height:S[A].height,alt:w.alt||w.title||`Image ${A+1}`,caption:w.caption,title:w.title,description:w.description}));j.current&&j.current.destroy();const R=new gt({dataSource:b,index:C,pswpModule:()=>pe(()=>import("./vendor-RxfllKF0.js").then(w=>w.f),__vite__mapDeps([2,3,4])),bgOpacity:.95,spacing:.1,loop:!0,zoom:!0,showAnimationDuration:300,hideAnimationDuration:300,showHideAnimationType:"zoom",allowMouseDrag:!0,allowPanToNext:!0,allowSwipeToClose:!0,wheelToZoom:!0,imageClickAction:"close",tapAction:"close",doubleTapAction:"zoom",closeTitle:e==="zh"?"关闭":"Close",zoomTitle:e==="zh"?"缩放":"Zoom",arrowPrevTitle:e==="zh"?"上一张":"Previous",arrowNextTitle:e==="zh"?"下一张":"Next",errorMsg:e==="zh"?"图片无法加载":"The image cannot be loaded",pinchToClose:!0,closeOnVerticalDrag:!0,returnFocus:!1,padding:{top:40,bottom:40,left:20,right:20},preload:[1,2]});R.on("close",()=>{s(!1),o([]),l(0)}),R.on("uiRegister",()=>{R.pswp.ui.registerElement({name:"custom-counter",className:"pswp__custom-counter",appendTo:"top-bar",onInit:(w,A)=>{const k=()=>{w.textContent=`${A.currIndex+1} / ${A.getNumItems()}`};A.on("change",k),A.on("afterInit",k)}}),R.pswp.ui.registerElement({name:"download-button",className:"pswp__download-button",appendTo:"bar",onInit:(w,A)=>{w.innerHTML=`
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            `,w.title=e==="zh"?"下载图片":"Download image",w.onclick=()=>{const k=b[A.currIndex];if(k){const v=document.createElement("a");v.href=k.src,v.download=`image_${A.currIndex+1}.jpg`,v.click()}}}})}),R.init(),R.loadAndOpen(C),j.current=R}catch(S){console.error("Error loading images for PhotoSwipe:",S),s(!1)}},closePhotoSwipe:()=>{j.current&&j.current.close()}};return i.jsxs(Lt.Provider,{value:T,children:[a,i.jsx("style",{children:`
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
      `})]})};ct.propTypes={children:Y.node.isRequired,language:Y.string};Y.string.isRequired,Y.string,Y.string,Y.string,Y.string,Y.node,Y.array;const Xt=()=>{const[a,e]=n.useState(!1),t=!1,s=n.useCallback(()=>{},[t]),r=n.useCallback(()=>{e(!1)},[]),o=n.useCallback(()=>{},[t]);return n.useEffect(()=>{},[t,a,s,r]),t?{isVisible:a,toggle:s,hide:r,show:o,isDev:t}:{isVisible:!1,toggle:()=>{},hide:()=>{},show:()=>{},isDev:!1}},Kt=()=>{const a=Xt(),{language:e}=he();return Ke(),i.jsx(at,{children:i.jsx(ct,{children:i.jsxs("div",{className:"App min-h-screen",children:[i.jsx(Yt,{}),i.jsx(ot,{language:e}),i.jsx(Vt,{}),i.jsx(Wt,{}),a.isDev&&i.jsx(lt,{visible:a.isVisible,onToggle:a.toggle})]})})})};Ht();ft.createRoot(document.getElementById("root")).render(i.jsx(n.StrictMode,{children:i.jsx(Kt,{})}));
