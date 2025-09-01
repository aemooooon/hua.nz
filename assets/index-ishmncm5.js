const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home-DW3msOc4.js","assets/react-N-_5-tx-.js","assets/vendor-RxfllKF0.js","assets/d3-BbFmVfHF.js","assets/vendor-DSulWsr7.css","assets/about-t0aR-emm.js","assets/three-CFp4aWDs.js","assets/gsap-CH_iu5NA.js","assets/texture-system-BC_EEokD.js","assets/gallery-DuTYjaYN.js","assets/home-CFO6Tio1.css","assets/projects-9Qhvi12A.js","assets/leaflet-BCigXWF9.js","assets/leaflet-BTrKGrB8.css","assets/projects-B3BEbutr.css","assets/EducationSection-BcbRlJkF.js","assets/EducationSection-DUw_6Q_9.css","assets/ContactSection-BCy88XY3.js","assets/ContactSection-B2ZxASnB.css"])))=>i.map(i=>d[i]);
import{r as n,j as i,R as rt,d as ot}from"./react-N-_5-tx-.js";import{u as be,_ as xe}from"./about-t0aR-emm.js";import{P as X,l as nt,e as at}from"./vendor-RxfllKF0.js";import{w as J,u as Ue}from"./home-DW3msOc4.js";import{E as ct,h as Pe,o as lt,H as Ve,M as je,W as Re,c as N,i as Fe,I as ht,J as dt,U as ut,K as ze,Q as mt,X as Be,x as Ne,Y as Le,Z as ft,A as $e,v as De,P as Se,_ as pt,$ as gt,a0 as Oe,u as Ee,a1 as We,s as Ye,a2 as qe,a3 as He,a4 as Xe,a5 as Je,a6 as vt,a7 as Ge,D as wt}from"./three-CFp4aWDs.js";import{P as bt}from"./gallery-DuTYjaYN.js";import{t as xt}from"./texture-system-BC_EEokD.js";import"./d3-BbFmVfHF.js";import"./gsap-CH_iu5NA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();class yt{constructor(e,t={},r="BackgroundCanvas"){if(this.canvas=e,this.componentId=r,this.componentId=r,this.gl=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl"),!this.gl)throw console.error("EffectFuse: Unable to get WebGL context"),new Error("WebGL not supported");this.resourceId=J.registerResources(this.componentId,{gl:this.gl,canvas:this.canvas},{persistent:!0}),this.params={brightness:1.8,blobiness:1.3,particles:16,scanlines:!1,energy:1.25,timeScale:1.1,...t},this.program=null,this.animationFrameId=null,this.startTime=performance.now(),this.uniformLocations={},this.themeColors=this.getThemeColors();try{this.initGL()}catch(s){throw console.error("EffectFuse: Failed to initialize WebGL",s),s}}initGL(){if(!this.gl){console.error("WebGL not supported.");return}this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.getExtension("OES_texture_float");const e=`
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
        `,r=this.createShader(this.gl.VERTEX_SHADER,e),s=this.createShader(this.gl.FRAGMENT_SHADER,t);this.program=this.createProgram(r,s),this.uniformLocations={resolution:this.gl.getUniformLocation(this.program,"u_resolution"),brightness:this.gl.getUniformLocation(this.program,"u_brightness"),blobiness:this.gl.getUniformLocation(this.program,"u_blobiness"),particles:this.gl.getUniformLocation(this.program,"u_particles"),scanlines:this.gl.getUniformLocation(this.program,"u_scanlines"),energy:this.gl.getUniformLocation(this.program,"u_energy"),millis:this.gl.getUniformLocation(this.program,"u_millis"),timeScale:this.gl.getUniformLocation(this.program,"u_timeScale"),themePrimary:this.gl.getUniformLocation(this.program,"u_theme_primary"),themeSecondary:this.gl.getUniformLocation(this.program,"u_theme_secondary"),themeAccent:this.gl.getUniformLocation(this.program,"u_theme_accent"),themeDarkBlue:this.gl.getUniformLocation(this.program,"u_theme_dark_blue"),themeProjectBlue:this.gl.getUniformLocation(this.program,"u_theme_project_blue")},this.setupBuffers()}createShader(e,t){const r=this.gl.createShader(e);return this.gl.shaderSource(r,t),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS)?r:(console.error("Shader compilation error:",this.gl.getShaderInfoLog(r)),console.error("Shader source:",t),this.gl.deleteShader(r),null)}createProgram(e,t){const r=this.gl.createProgram();return this.gl.attachShader(r,e),this.gl.attachShader(r,t),this.gl.linkProgram(r),this.gl.getProgramParameter(r,this.gl.LINK_STATUS)?r:(console.error(this.gl.getProgramInfoLog(r)),this.gl.deleteProgram(r),null)}setupBuffers(){this.positionBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW);const e=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)}start(){this.startTime=performance.now(),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.render()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null),this.gl)try{this.program&&(this.gl.deleteProgram(this.program),this.program=null),this.positionBuffer&&(this.gl.deleteBuffer(this.positionBuffer),this.positionBuffer=null)}catch(e){console.error("Error cleaning up WebGL resources:",e)}this.gl=null,this.canvas=null,this.uniformLocations={}}onResize(e,t){this.gl&&this.canvas&&(this.canvas.width=e,this.canvas.height=t,this.gl.viewport(0,0,e,t),requestAnimationFrame(()=>{this.gl&&this.render()}))}render(){if(!this.gl||!this.program||!this.params)return;this.animationFrameId=requestAnimationFrame(this.render.bind(this));const t=performance.now()-this.startTime;this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.useProgram(this.program),this.uniformLocations.resolution&&this.gl.uniform2f(this.uniformLocations.resolution,this.canvas.width,this.canvas.height),this.uniformLocations.brightness&&this.gl.uniform1f(this.uniformLocations.brightness,this.params.brightness||15e3),this.uniformLocations.blobiness&&this.gl.uniform1f(this.uniformLocations.blobiness,this.params.blobiness||2),this.uniformLocations.particles&&this.gl.uniform1f(this.uniformLocations.particles,this.params.particles||20),this.uniformLocations.scanlines&&this.gl.uniform1i(this.uniformLocations.scanlines,this.params.scanlines||!1),this.uniformLocations.energy&&this.gl.uniform1f(this.uniformLocations.energy,this.params.energy||.5),this.uniformLocations.millis&&this.gl.uniform1f(this.uniformLocations.millis,t),this.uniformLocations.timeScale&&this.gl.uniform1f(this.uniformLocations.timeScale,this.params.timeScale||.5),this.uniformLocations.themePrimary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themePrimary,this.themeColors.primary.r,this.themeColors.primary.g,this.themeColors.primary.b),this.uniformLocations.themeSecondary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeSecondary,this.themeColors.secondary.r,this.themeColors.secondary.g,this.themeColors.secondary.b),this.uniformLocations.themeAccent&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeAccent,this.themeColors.accent.r,this.themeColors.accent.g,this.themeColors.accent.b),this.uniformLocations.themeDarkBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeDarkBlue,this.themeColors.darkBlue.r,this.themeColors.darkBlue.g,this.themeColors.darkBlue.b),this.uniformLocations.themeProjectBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeProjectBlue,this.themeColors.projectBlue.r,this.themeColors.projectBlue.g,this.themeColors.projectBlue.b),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}getThemeColors(){const e=getComputedStyle(document.documentElement),t=r=>{const s=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return s?{r:parseInt(s[1],16)/255,g:parseInt(s[2],16)/255,b:parseInt(s[3],16)/255}:{r:0,g:1,b:1}};try{const r=e.getPropertyValue("--theme-primary").trim()||"#00ffff",s=e.getPropertyValue("--theme-secondary").trim()||"#0080ff",o=e.getPropertyValue("--theme-accent").trim()||"#4dd0e1";return{primary:t(r),secondary:t(s),accent:t(o),darkBlue:t("#0A0A0F"),projectBlue:t("#1E40AF")}}catch(r){return console.warn("Failed to get theme colors, using defaults:",r),{primary:{r:0,g:1,b:1},secondary:{r:0,g:.5,b:1},accent:{r:.3,g:.82,b:.88},darkBlue:{r:.04,g:.04,b:.06},projectBlue:{r:.12,g:.25,b:.69}}}}}function Ct(a,e={},t="BackgroundCanvas"){let r,s,o,c,l,M,k=0;const v=1e3/30,T=()=>{const p=getComputedStyle(document.documentElement),x=p.getPropertyValue("--theme-primary").trim(),g=p.getPropertyValue("--theme-background").trim(),_=[g?new N(g):new N("#0A0F0D"),x?new N(x):new N("#10B981"),x?new N(x).multiplyScalar(.6):new N("#0D9488")];return c&&c.colors&&(c.colors.value=_),_},y=()=>{o=new ct(-1,1,1,-1,0,1),s=new Pe;const p=new lt(2,2);c={time:{value:1},animationSpeed:{value:e.animationSpeed||.618},colors:{value:e.colors||T()}};const x=new Ve({uniforms:c,transparent:!0,vertexShader:`
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
            `}),g=new je(p,x);s.add(g),r=new Re({canvas:a,antialias:!0}),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(window.innerWidth,window.innerHeight),M=J.registerResources(t,{renderer:r,scene:s,camera:o,geometry:p,material:x,mesh:g}),window.addEventListener("resize",d),b()},d=()=>{r.setSize(window.innerWidth,window.innerHeight)},b=()=>{l=requestAnimationFrame(b);const p=performance.now();p-k<v||(k=p,c.time.value=p/1e3*c.animationSpeed.value,r.render(s,o))},C=()=>{l&&cancelAnimationFrame(l),M&&J.cleanup(M),s&&s.children.forEach(p=>{p.geometry&&p.geometry.dispose(),p.material&&(Array.isArray(p.material)?p.material.forEach(x=>x.dispose()):p.material.dispose())}),r&&(r.dispose(),a!=null&&a.parentNode&&a.parentNode.removeChild(a)),window.removeEventListener("resize",d)};return y(),{stop:C,updateThemeColors:T}}class St{constructor(e,t={},r="BackgroundCanvas"){this.canvas=e,this.componentId=r,this.renderer=null,this.scene=null,this.camera=null,this.fireball=null,this.trailParticles=[],this.animationFrameId=null,this.time=0,this.resourceId=null,this.sigma=10,this.rho=28,this.beta=8/3,this.x=.1,this.y=0,this.z=0,this.dt=.02,this.maxParticles=999,this.fireballColor=new N("#00FF88"),this.particleColors=[new N("#10B981"),new N("#00FF88"),new N("#34D399")],setTimeout(()=>{this.updateThemeColors()},100),this.trailPositions=[],this.trailColors=[],this.particleIndex=0,this.frameCount=0,this.lastFPSCheck=performance.now(),this.currentFPS=60;try{this.init()}catch(s){throw console.error("EffectLorenzAttractor: Failed to initialize Three.js",s),s}}init(){this.scene=new Pe,this.scene.background=new N(2581),this.camera=new Fe(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.set(0,0,48),this.camera.lookAt(0,0,0),this.renderer=new Re({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.renderer.setClearColor(2581,1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.composer=new ht(this.renderer);const e=new dt(this.scene,this.camera);this.composer.addPass(e);const t=new ut(new ze(this.canvas.width,this.canvas.height),.8,.2,.7);this.composer.addPass(t);const r=new mt;this.composer.addPass(r);const s=new Be(1.5,32,32),o=new Ne({color:new N("#ffaa33"),transparent:!0,opacity:.9,blending:Le});this.fireball=new je(s,o),this.scene.add(this.fireball);const c=new Be(2.5,32,32),l=new Ne({color:new N("#ff6611"),transparent:!0,opacity:.4,blending:Le,side:ft});this.halo=new je(c,l),this.scene.add(this.halo);const M=new $e(4210752,.8);this.scene.add(M);const k=new De(16777215,1);k.position.set(50,50,50),this.scene.add(k);const E=new De(6724095,.8);E.position.set(-50,-50,50),this.scene.add(E),this.pointLight=new Se(35071,2,100),this.scene.add(this.pointLight),this.sunLight=new De(16775388,1.2),this.sunLight.position.set(80,60,40),this.sunLight.target.position.set(0,0,0),this.sunLight.castShadow=!1,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.particleGeometry=new Be(.5,8,8),this.particleMaterial=new Ne({color:16777215,transparent:!0,opacity:1,blending:Le,depthWrite:!1}),this.createParticleTexture(),this.instancedMesh=new pt(this.particleGeometry,this.particleMaterial,this.maxParticles),this.instancedMesh.geometry.attributes.color===void 0&&(this.instancedMesh.instanceColor=new gt(new Float32Array(this.maxParticles*3),3)),this.scene.add(this.instancedMesh);const v=new Oe,T=new Ee,y=new Ee(0,0,0);this.colorInside=new N("#ffa575"),this.colorOutside=new N("#0088ff");for(let d=0;d<this.maxParticles;d++)v.compose(T,new We,y),this.instancedMesh.setMatrixAt(d,v),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(d,new N(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),window.addEventListener("resize",this.onResize.bind(this))}createParticleTexture(){const t=document.createElement("canvas");t.width=16,t.height=16;const r=t.getContext("2d"),s=16/2,o=r.createRadialGradient(s,s,0,s,s,s);o.addColorStop(0,"rgba(255, 255, 255, 0.6)"),o.addColorStop(.1,"rgba(255, 255, 255, 0.3)"),o.addColorStop(.3,"rgba(255, 255, 255, 0.1)"),o.addColorStop(1,"rgba(255, 255, 255, 0)"),r.fillStyle=o,r.beginPath(),r.arc(s,s,s*.8,0,Math.PI*2),r.fill(),this.particleTexture=new Ye(t)}getRandomParticleColor(){const e=Math.floor(Math.random()*this.particleColors.length);return this.particleColors[e]}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.frameCount++;const e=performance.now();e-this.lastFPSCheck>=1e3&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,this.currentFPS<30&&this.maxParticles>1e3?this.maxParticles=Math.max(1e3,this.maxParticles-100):this.currentFPS>50&&this.maxParticles<2e3&&(this.maxParticles=Math.min(2e3,this.maxParticles+50))),this.time+=.025;const t=this.sigma*(this.y-this.x)*this.dt,r=(this.x*(this.rho-this.z)-this.y)*this.dt,s=(this.x*this.y-this.beta*this.z)*this.dt;this.x+=t,this.y+=r,this.z+=s;const o=.8;this.fireball.position.set(this.x*o,this.y*o,this.z*o),this.halo.position.copy(this.fireball.position),this.halo.scale.setScalar(1+Math.sin(this.time*2)*.1),this.pointLight.position.copy(this.fireball.position),this.frameCount%2===0&&(this.trailPositions.push({x:this.x*o,y:this.y*o,z:this.z*o,life:1}),this.trailPositions.length>this.maxParticles&&this.trailPositions.shift());const c=new Oe,l=new Ee,M=new We,k=new Ee;this.trailPositions.forEach((E,v)=>{const T=v/this.trailPositions.length,y=Math.sqrt(E.x*E.x+E.y*E.y+E.z*E.z),b=Math.min(y/40,1),C=(1-b*.5)*T*1.2+.3;if(l.set(E.x+(Math.random()-.5)*.08,E.y+(Math.random()-.5)*.08,E.z+(Math.random()-.5)*.08),k.set(C,C,C),c.compose(l,M,k),this.instancedMesh.setMatrixAt(v,c),this.instancedMesh.instanceColor){const p=Math.pow(1-b,2),x=new N;x.lerpColors(this.colorOutside,this.colorInside,p);const g=T*(1-b*.3);x.multiplyScalar(g),this.instancedMesh.setColorAt(v,x)}});for(let E=this.trailPositions.length;E<this.maxParticles;E++)k.set(0,0,0),c.compose(l,M,k),this.instancedMesh.setMatrixAt(E,c),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(E,new N(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),this.scene.rotation.y+=.005,this.scene.rotation.x+=.002,this.composer.render()}onResize(e,t){if(!this.renderer||!this.camera)return;const r=e||this.canvas.width,s=t||this.canvas.height;this.camera.aspect=r/s,this.camera.updateProjectionMatrix(),this.renderer.setSize(r,s,!1),this.composer&&this.composer.setSize(r,s)}updateThemeColors(){var e,t,r,s;if(!document.documentElement){console.warn("DOM not ready for theme color update");return}try{const o=getComputedStyle(document.documentElement),c=(e=o.getPropertyValue("--theme-primary"))==null?void 0:e.trim(),l=(t=o.getPropertyValue("--theme-secondary"))==null?void 0:t.trim(),M=(r=o.getPropertyValue("--theme-accent"))==null?void 0:r.trim();c&&(this.fireballColor.setStyle(c),this.particleColors[1].setStyle(c),this.colorOutside.setStyle(c)),l&&(this.particleColors[0].setStyle(l),this.colorInside.setStyle(l)),M&&this.particleColors[2].setStyle(M);const k=(s=o.getPropertyValue("--theme-background"))==null?void 0:s.trim();k&&this.scene&&(this.scene.background=new N(k),this.renderer&&this.renderer.setClearColor(new N(k),1)),this.fireball&&c&&this.fireball.material.color.setStyle(c),this.halo&&l&&this.halo.material.color.setStyle(l),this.pointLight&&c&&this.pointLight.color.setStyle(c),this.instancedMesh&&this.updateParticleColors()}catch(o){console.warn("Error updating theme colors:",o)}}updateParticleColors(){if(!this.instancedMesh||!this.instancedMesh.instanceColor)return;const e=this.instancedMesh.instanceColor.array;for(let t=0;t<this.trailPositions.length&&!(t>=this.maxParticles);t++){const r=t*3,s=this.trailPositions[t],o=this.colorInside.clone();o.lerp(this.colorOutside,1-s.life),e[r]=o.r,e[r+1]=o.g,e[r+2]=o.b}this.instancedMesh.instanceColor.needsUpdate=!0}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.composer&&(this.composer.dispose(),this.composer=null),this.renderer){const e=this.renderer.getContext();e&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").loseContext(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer=null}for(this.instancedMesh&&(this.scene.remove(this.instancedMesh),this.instancedMesh.geometry&&this.instancedMesh.geometry.dispose(),this.instancedMesh.material&&this.instancedMesh.material.dispose(),this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor=null),this.instancedMesh=null),this.fireball&&(this.scene.remove(this.fireball),this.fireball.geometry&&this.fireball.geometry.dispose(),this.fireball.material&&this.fireball.material.dispose(),this.fireball=null),this.halo&&(this.scene.remove(this.halo),this.halo.geometry&&this.halo.geometry.dispose(),this.halo.material&&this.halo.material.dispose(),this.halo=null),this.particleGeometry&&(this.particleGeometry.dispose(),this.particleGeometry=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.particleTexture&&(this.particleTexture.dispose(),this.particleTexture=null),this.trailPositions=[],this.trailColors=[],this.pointLight&&(this.scene.remove(this.pointLight),this.pointLight=null),this.sunLight&&(this.scene.remove(this.sunLight),this.scene.remove(this.sunLight.target),this.sunLight=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null),window.removeEventListener("resize",this.onResize.bind(this))}}class Et{constructor(e,t={},r="BackgroundCanvas"){this.canvas=e,this.componentId=r,this.renderer=null,this.scene=null,this.camera=null,this.mesh=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.particleCount=t.particleCount||8e3,this.branches=3,this.radius=9,this.size=t.size||.12,this.colorInside=new N("#10B981"),this.colorOutside=new N("#34D399"),this.updateThemeColors();try{this.init()}catch(s){throw console.error("EffectChaos: Failed to initialize Three.js",s),s}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),r=e.getPropertyValue("--theme-accent").trim();t&&this.colorInside.setStyle(t),r&&this.colorOutside.setStyle(r);const s=e.getPropertyValue("--theme-background").trim();s&&this.scene&&(this.scene.background=new N(s)),this.mesh&&this.updateParticleColors(),this.updateLightColors()}updateLightColors(){this.lights&&(this.lights.central&&this.lights.central.color.copy(this.colorInside.clone().multiplyScalar(1.5)),this.lights.green&&this.lights.green.color.copy(this.colorInside),this.lights.ambient&&this.lights.ambient.color.copy(this.colorInside.clone().multiplyScalar(.3)),this.lights.fill1&&this.lights.fill1.color.copy(this.colorInside),this.lights.fill2&&this.lights.fill2.color.copy(this.colorOutside),this.lights.back&&this.lights.back.color.copy(this.colorOutside.clone().multiplyScalar(1.2)))}updateParticleColors(){if(!this.mesh||!this.particleData)return;const e=this.mesh.geometry.attributes.color.array;for(let t=0;t<this.particleCount;t++){const r=this.particleData[t],s=t*3,o=this.colorInside.clone();o.lerp(this.colorOutside,r.radiusRatio),e[s]=o.r,e[s+1]=o.g,e[s+2]=o.b}this.mesh.geometry.attributes.color.needsUpdate=!0}init(){this.camera=new Fe(60,this.canvas.width/this.canvas.height,.1,100),this.camera.position.set(0,2,8),this.camera.lookAt(0,-2,0),this.scene=new Pe,this.scene.background=new N(0),this.renderer=new Re({canvas:this.canvas,antialias:!1,powerPreference:"low-power",precision:"mediump"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.canvas.addEventListener("webglcontextlost",this.onContextLost.bind(this)),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored.bind(this)),this.createGalaxy(),window.addEventListener("resize",this.onResize.bind(this))}createGalaxy(){const e=new qe;this.positions=new Float32Array(this.particleCount*3),this.colors=new Float32Array(this.particleCount*3),this.particleData=[];for(let v=0;v<this.particleCount;v++){const T=Math.random(),y=Math.pow(T,1.5)*this.radius,b=Math.random()*Math.PI*2,C=Math.pow(Math.random()*2-1,3)*T*.2,p=Math.pow(Math.random()*2-1,3)*T*.05,x=Math.pow(Math.random()*2-1,3)*T*.2;this.particleData.push({radiusRatio:T,radius:y,branchAngle:b,randomX:C,randomY:p,randomZ:x});const g=Math.pow(1-T,2),_=this.colorInside.clone();_.lerp(this.colorOutside,1-g);const S=v*3;this.colors[S]=_.r,this.colors[S+1]=_.g,this.colors[S+2]=_.b}e.setAttribute("position",new He(this.positions,3)),e.setAttribute("color",new He(this.colors,3));const t=document.createElement("canvas");t.width=64,t.height=64;const r=t.getContext("2d"),s=r.createRadialGradient(32,32,0,32,32,32);s.addColorStop(0,"rgba(255, 255, 255, 1)"),s.addColorStop(.2,"rgba(255, 255, 255, 1)"),s.addColorStop(.4,"rgba(255, 255, 255, 0.8)"),s.addColorStop(1,"rgba(255, 255, 255, 0)"),r.fillStyle=s,r.fillRect(0,0,64,64);const o=new Ye(t),c=new Xe({size:this.size*2,sizeAttenuation:!0,depthWrite:!1,blending:Le,vertexColors:!0,transparent:!0,opacity:.9,map:o,alphaTest:.05});this.mesh=new Je(e,c),this.scene.add(this.mesh),this.updatePositions(),this.centralLight=new Se(this.colorInside.clone().multiplyScalar(1.5),2.5,40),this.centralLight.position.set(0,-1,0),this.scene.add(this.centralLight);const l=new Se(this.colorInside,1.8,35);l.position.set(0,-1,0),this.scene.add(l),this.ambientLight=new $e(this.colorInside.clone().multiplyScalar(.3),.4),this.scene.add(this.ambientLight);const M=new Se(this.colorInside,1.2,25);M.position.set(-5,0,5),this.scene.add(M);const k=new Se(this.colorOutside,1.2,25);k.position.set(5,0,5),this.scene.add(k);const E=new Se(this.colorOutside.clone().multiplyScalar(1.2),.8,50);E.position.set(0,2,-10),this.scene.add(E),this.lights={central:this.centralLight,green:l,ambient:this.ambientLight,fill1:M,fill2:k,back:E}}updatePositions(){for(let e=0;e<this.particleCount;e++){const t=this.particleData[e],r=e*3,s=t.branchAngle+this.time*(1-t.radiusRatio),o=Math.cos(s)*t.radius,c=Math.sin(s)*t.radius,l=-Math.abs(t.radius*.3);this.positions[r]=o+t.randomX,this.positions[r+1]=l+t.randomY-2,this.positions[r+2]=c+t.randomZ}this.mesh.geometry.attributes.position.needsUpdate=!0}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.008,this.updatePositions(),this.renderer.render(this.scene,this.camera)}onResize(e,t){if(!this.renderer||!this.camera)return;const r=e||this.canvas.width,s=t||this.canvas.height;this.camera.aspect=r/s,this.camera.updateProjectionMatrix(),this.renderer.setSize(r,s,!1)}onContextLost(e){e.preventDefault(),console.warn("WebGL context lost. Attempting to restore..."),this.animationId=null,this.contextLost=!0}onContextRestored(){this.init(),this.start()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.mesh&&this.scene&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null),this.scene&&this.scene.children)for(;this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,window.removeEventListener("resize",this.onResize.bind(this))}cleanup(){for(this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}}destroy(){this.stop(),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null)}}const kt=`
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
`,Lt=`
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
`;class Tt{constructor(e,t={},r="BackgroundCanvas"){this.canvas=e,this.componentId=r,this.renderer=null,this.scene=null,this.camera=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.waveSourceCount=t.waveSourceCount||6,this.maxRings=t.maxRings||8,this.waveSpeed=t.waveSpeed||1.2,this.ringSpacing=t.ringSpacing||45,this.maxRadius=t.maxRadius||400,this.waveColor=new N("#00ffff"),this.sourceColor=new N("#4dd0e1"),this.waveSources=[],this.waveRings=[],this.sourceGeometry=null,this.ringGeometries=[],this.sourceMaterial=null,this.ringMaterials=[],this.sourcePoints=null,this.ringMeshes=[],this.mouse=new ze,this.lastRippleTime=0,this.rippleInterval=2e3,this.updateThemeColors();try{this.init()}catch(s){throw console.error("EffectRippleWaves: Failed to initialize Three.js",s),s}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),r=e.getPropertyValue("--theme-accent").trim();t&&this.waveColor.setStyle(t),r&&this.sourceColor.setStyle(r),this.sourceMaterial&&this.sourceMaterial.color.copy(this.sourceColor),this.ringMeshes.forEach(s=>{s.userData.isShaderRipple&&s.material.uniforms?(s.material.uniforms.primaryColor.value.copy(this.waveColor),s.material.uniforms.accentColor.value.copy(this.sourceColor)):s.material.color&&s.material.color.copy(this.waveColor)})}init(){this.camera=new Fe(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.z=400,this.scene=new Pe,this.scene.background=new N(0),this.renderer=new Re({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=J.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.createWaveSources(),this.setupMouseInteraction(),setTimeout(()=>{this.waveSources.forEach((e,t)=>{setTimeout(()=>{this.createRipple(t,e.position)},t*300)})},100),window.addEventListener("resize",this.onResize.bind(this)),this.animate()}createWaveSources(){this.sourceGeometry=new qe,this.sourceMaterial=new Xe({color:this.sourceColor,size:10,transparent:!0,opacity:0,sizeAttenuation:!0});const e=[];for(let t=0;t<this.waveSourceCount;t++){const r=t/this.waveSourceCount*Math.PI*2,s=100+Math.random()*50,o={position:new Ee(Math.cos(r)*s,Math.sin(r)*s,0),lastWaveTime:Date.now()+t*400,waveInterval:1800+Math.random()*600,pulsePhase:Math.random()*Math.PI*2,waves:[]};this.waveSources.push(o),e.push(o.position.x,o.position.y,o.position.z)}this.sourceGeometry.setAttribute("position",new vt(e,3)),this.sourcePoints=new Je(this.sourceGeometry,this.sourceMaterial)}createRipple(e,t){const r=this.waveSources[e],s={sourceIndex:e,position:t.clone(),radius:0,maxRadius:this.maxRadius,speed:this.waveSpeed,opacity:1,creationTime:Date.now(),startTime:this.time};r.waves.push(s);const o=new Ge(0,this.maxRadius,64,1),c=new Ve({uniforms:{time:{value:this.time},center:{value:new ze(t.x,t.y)},waveRadius:{value:0},maxRadius:{value:this.maxRadius},primaryColor:{value:this.waveColor.clone()},accentColor:{value:this.sourceColor.clone()},opacity:{value:1}},vertexShader:kt,fragmentShader:Lt,transparent:!0,side:wt,blending:Le,depthWrite:!1}),l=new je(o,c);return l.position.copy(t),l.userData={wave:s,sourceIndex:e,isShaderRipple:!0},this.scene.add(l),this.ringMeshes.push(l),s}setupMouseInteraction(){const e=r=>{const s=this.canvas.getBoundingClientRect();this.mouse.x=(r.clientX-s.left)/s.width*2-1,this.mouse.y=-((r.clientY-s.top)/s.height)*2+1},t=r=>{e(r);const s=new Ee(this.mouse.x*300,this.mouse.y*200,0);let o=0,c=1/0;this.waveSources.forEach((l,M)=>{const k=l.position.distanceTo(s);k<c&&(c=k,o=M)}),this.createRipple(o,s)};this.canvas.addEventListener("click",t),window.addEventListener("mousemove",e)}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.016;const e=Date.now();this.updateWaveSources(),this.generateAutoRipples(e),this.updateRipples(),this.cleanupExpiredRipples(),this.renderer.render(this.scene,this.camera)}updateWaveSources(){for(let e=0;e<this.waveSources.length;e++){const t=this.waveSources[e];t.pulsePhase+=.03}}generateAutoRipples(e){if(this.waveSources.forEach((t,r)=>{e-t.lastWaveTime>t.waveInterval&&(this.createRipple(r,t.position),t.lastWaveTime=e,t.waveInterval=1800+Math.random()*600)}),this.ringMeshes.length===0&&e>this.time*1e3+1e3){const t=Math.floor(Math.random()*this.waveSources.length);this.createRipple(t,this.waveSources[t].position)}}updateRipples(){this.ringMeshes.forEach(e=>{const t=e.userData.wave;if(!t)return;t.radius+=t.speed;const r=t.radius/t.maxRadius;if(t.opacity=Math.max(0,Math.sin((1-r)*Math.PI*.5)),e.userData.isShaderRipple&&e.material.uniforms){const s=e.material.uniforms;s.time.value=this.time,s.waveRadius.value=t.radius,s.opacity.value=t.opacity,s.primaryColor.value.copy(this.waveColor),s.accentColor.value.copy(this.sourceColor);const c=(this.time-t.startTime)*.5%(Math.PI*2)/(Math.PI*2),l=new N().setHSL(c,.8,.6);s.accentColor.value.lerp(l,.3)}else{const s=Math.max(0,t.radius-3),o=t.radius;e.geometry.dispose(),e.geometry=new Ge(s,o,32),e.material.opacity=t.opacity*.3}this.calculateInterference(t,e)})}calculateInterference(e,t){let r=0;if(this.ringMeshes.forEach(s=>{if(s===t)return;const o=s.userData.wave;if(!o)return;const c=e.position.distanceTo(o.position);Math.abs(e.radius-o.radius)<15&&c<e.radius+o.radius&&(r+=.4)}),t.userData.isShaderRipple&&t.material.uniforms){const s=t.material.uniforms.opacity.value;if(t.material.uniforms.opacity.value=Math.min(1,s+r),r>0){const o=this.waveColor.clone().multiplyScalar(1+r*.5);t.material.uniforms.primaryColor.value.lerp(o,.3)}}else t.material.opacity=Math.min(.8,t.material.opacity+r)}cleanupExpiredRipples(){for(let e=this.ringMeshes.length-1;e>=0;e--){const t=this.ringMeshes[e],r=t.userData.wave;if((!r||r.radius>r.maxRadius)&&(this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose(),this.ringMeshes.splice(e,1),r.sourceIndex!==void 0)){const s=this.waveSources[r.sourceIndex],o=s.waves.indexOf(r);o>-1&&s.waves.splice(o,1)}}}onResize(){!this.camera||!this.renderer||(this.camera.aspect=this.canvas.width/this.canvas.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.canvas.width,this.canvas.height,!1))}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),window.removeEventListener("resize",this.onResize.bind(this)),this.ringMeshes.forEach(e=>{this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(e.material.uniforms&&Object.values(e.material.uniforms).forEach(t=>{t.value&&t.value.dispose&&t.value.dispose()}),e.material.dispose())}),this.sourceGeometry&&this.sourceGeometry.dispose(),this.sourceMaterial&&this.sourceMaterial.dispose(),this.resourceId&&(J.cleanup(this.resourceId),this.resourceId=null)}destroy(){this.stop()}}const Ke=({effectType:a="effectfuse",sectionName:e="unknown"})=>{const t=n.useRef(null),r=n.useRef(null),s=n.useRef(null),o=n.useRef(null),c=be(l=>l.theme);return n.useEffect(()=>{s.current&&(clearTimeout(s.current),s.current=null);let l=t.current;if(!l){l=document.createElement("canvas"),l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.zIndex="-1",l.style.pointerEvents="none",l.style.background="transparent";const v=window.innerWidth,T=window.innerHeight,y=1280,d=720,b=v/T;let C,p;b>y/d?(C=Math.min(y,v),p=Math.floor(C/b)):(p=Math.min(d,T),C=Math.floor(p*b)),C=Math.max(C,800),p=Math.max(p,600),l.width=C,l.height=p,document.body.appendChild(l),t.current=l}const M=()=>{var v;if(l)try{const T=window.innerWidth,y=window.innerHeight,d=1280,b=720,C=T/y;let p,x;C>d/b?(p=Math.min(d,T),x=Math.floor(p/C)):(x=Math.min(b,y),p=Math.floor(x*C)),p=Math.max(p,800),x=Math.max(x,600),l.width=p,l.height=x,(v=r.current)!=null&&v.onResize&&r.current.onResize(l.width,l.height)}catch(T){console.error("Error resizing canvas:",T)}};M(),(()=>{var T,y;if(r.current){const d=r.current;r.current=null,s.current=setTimeout(()=>{try{typeof d.stop=="function"?d.stop():typeof d.destroy=="function"&&d.destroy()}catch{}},200)}const v={brightness:.6,blobiness:1.5,particles:10,scanlines:!1,energy:1.01,timeScale:1};try{const d=`BackgroundCanvas_${e}`;switch(a){case"effectfuse":{r.current=new yt(l,v,d);break}case"effectmonjori":r.current=Ct(l,v,d);break;case"effectheartbeats":r.current=new EffectHeartBeats(l,v,d);break;case"effectlorenz":{r.current=new St(l,v,d);break}case"effectchaos":{const b={particleCount:2e3,branches:3,radius:9,spin:1,randomness:.15,randomnessPower:3,size:.12,colorInside:v.colorInside||"#fff8dc",colorOutside:v.colorOutside||"#ffa575"};r.current=new Et(l,b,d);break}case"effectripple":{const b={waveSourceCount:6,maxRings:8,waveSpeed:1.2,ringSpacing:45,maxRadius:400};r.current=new Tt(l,b,d);break}default:r.current=new EffectHeartBeats(l,v,d)}(T=r.current)!=null&&T.start&&r.current.start(),o.current=J.registerResources(d,{canvas:l,effect:r.current,effectType:a},{persistent:!1})}catch(d){if(console.error("Error creating background effect:",d),a==="effectfuse"||a==="effectlorenz"||a==="effectchaos")try{r.current=new EffectHeartBeats(l,v),(y=r.current)!=null&&y.start&&r.current.start()}catch(b){console.error("Error creating fallback effect:",b),r.current=null}else r.current=null}})();const E=nt.debounce(M,250);return window.addEventListener("resize",E),()=>{if(window.removeEventListener("resize",E),s.current&&(clearTimeout(s.current),s.current=null),r.current)try{typeof r.current.stop=="function"?r.current.stop():typeof r.current.destroy=="function"&&r.current.destroy()}catch(v){console.error("Error cleaning up effect:",v)}finally{r.current=null}if(o.current?(J.cleanup(o.current),o.current=null):J.cleanupByComponent(`BackgroundCanvas_${e}`),l&&document.body.contains(l))try{document.body.removeChild(l)}catch(v){console.error("Error removing canvas:",v)}t.current=null,typeof window<"u"&&window.gc&&setTimeout(()=>window.gc(),100)}},[a,e]),n.useEffect(()=>{const l=["effectchaos","effectlorenz","effectheartbeats","effectmonjori","effectripple"];r.current&&r.current.updateThemeColors&&l.includes(a)&&r.current.updateThemeColors()},[c,a]),null};Ke.propTypes={effectType:X.string,sectionName:X.string};const Mt=n.lazy(()=>xe(()=>import("./home-DW3msOc4.js").then(a=>a.H),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),jt=n.lazy(()=>xe(()=>import("./projects-9Qhvi12A.js").then(a=>a.P),__vite__mapDeps([11,1,2,3,4,12,13,5,0,6,7,8,9,10,14]))),Pt=n.lazy(()=>xe(()=>import("./gallery-DuTYjaYN.js").then(a=>a.G),__vite__mapDeps([9,1,2,3,4,6,5,8]))),Rt=n.lazy(()=>xe(()=>import("./EducationSection-BcbRlJkF.js"),__vite__mapDeps([15,1,2,3,4,5,0,6,7,8,9,10,11,12,13,14,16]))),_t=n.lazy(()=>xe(()=>import("./ContactSection-BCy88XY3.js"),__vite__mapDeps([17,1,2,3,4,5,11,12,13,0,6,7,8,9,10,14,18]))),At=n.lazy(()=>xe(()=>import("./about-t0aR-emm.js").then(a=>a.A),__vite__mapDeps([5,1,2,3,4]))),It=()=>{const{currentSection:a,sections:e,navigateToSection:t,navigateNext:r,navigatePrev:s,isScrolling:o,getCurrentSection:c,language:l,enableOpeningAnimation:M,isProjectModalOpen:k}=be(),E={DESKTOP_THRESHOLD:600,MOBILE_THRESHOLD:200,RESET_TIME:256,PREVIEW_MAX_OFFSET:80,BOUNDARY_THRESHOLD:50,BOUNCE_MAX_OFFSET:30,LONG_CONTENT_SECTIONS:["projects","education","about","contact","gallery"]},{DESKTOP_THRESHOLD:v,MOBILE_THRESHOLD:T,RESET_TIME:y,PREVIEW_MAX_OFFSET:d,BOUNDARY_THRESHOLD:b,BOUNCE_MAX_OFFSET:C,LONG_CONTENT_SECTIONS:p}=E,x=n.useRef(null),g=n.useRef(null),_=n.useRef(0),S=n.useRef(0),f=n.useRef(),z=n.useRef({x:0,y:0,time:0}),O=n.useRef(0),[U,he]=n.useState("slide"),[V,me]=n.useState(!1),[fe,ye]=n.useState({}),[ee,K]=n.useState(!1),[pe,q]=n.useState(0),[H,re]=n.useState(!1),[Z,ae]=n.useState("none"),j=c(),G=(j==null?void 0:j.id)==="home",ge=p.includes(j==null?void 0:j.id);n.useEffect(()=>{if(j!=null&&j.id){const h=j.id,m=setTimeout(()=>{J.cleanupOtherSections(`BackgroundCanvas_${h}`,["HeroCube"])},3e3);return()=>clearTimeout(m)}},[j==null?void 0:j.id]);const se=n.useCallback(h=>{if(!h)return{isAtTop:!1,isAtBottom:!1,currentScrollTop:0,maxScrollTop:0};const m=h.scrollTop,u=h.scrollHeight-h.clientHeight;return{isAtTop:m<=b,isAtBottom:m>=u-b,currentScrollTop:m,maxScrollTop:u}},[b]),ve=n.useMemo(()=>({home:Mt,about:At,projects:jt,gallery:Pt,education:Rt,contact:_t}),[]),$=n.useCallback(()=>{if(!g.current)return;const h=g.current,m=h.getBoundingClientRect(),u=h.scrollHeight>m.height+10;window.innerWidth<768&&ge&&!u&&setTimeout(()=>{if(g.current){const B=g.current.getBoundingClientRect(),P=g.current.scrollHeight>B.height+10;me(P),he(G?"slide":P?"content":"slide")}},500),me(u),he(G?"slide":u?"content":"slide")},[G,ge]),ce=n.useCallback((h,m=.5)=>{f.current&&clearTimeout(f.current),ae(h),re(!0);const u=Math.min(m*C,C),w=h==="up"?-u:u;q(w),K(!0),f.current=setTimeout(()=>{K(!1),q(0),setTimeout(()=>{re(!1),ae("none")},300)},150)},[C]),de=n.useCallback(()=>{f.current&&clearTimeout(f.current),f.current=setTimeout(()=>{ee&&S.current<v&&(K(!1),q(0),S.current=0)},150)},[ee,v]),Te=n.useCallback(h=>{if(U!=="content"){const m=h.deltaY>0?1:-1,u=m>0&&a>=e.length-1,w=m<0&&a<=0;let F=1;(u||w)&&(F=.5);const B=Math.min(S.current/v,1),P=u||w?15:d,Y=m*B*P*F;if(ee||K(!0),q(Y),u||w){const te=Math.min(S.current/v,1),oe=u?"down":"up";return f.current&&clearTimeout(f.current),f.current=setTimeout(()=>{ce(oe,te)},100),!0}else return de(),!1}return!1},[U,a,e.length,ee,de,ce,v,d]),A=n.useCallback(()=>{if(S.current=0,K(!1),q(0),re(!1),ae("none"),f.current&&clearTimeout(f.current),g.current){const h=j==null?void 0:j.id;if(h==="home"){const u=g.current;u.style.transform="translateY(0)",u.style.transition="none",u.scrollTop=0,requestAnimationFrame(()=>{u&&(u.offsetHeight,u.style.transition="")});return}(fe[h]!==void 0?fe[h]==="bottom":!!(V&&(j==null?void 0:j.previousDirection)==="from-next"))?requestAnimationFrame(()=>{if(g.current){const u=g.current.scrollHeight-g.current.clientHeight;g.current.scrollTop=u}}):g.current.scrollTop=0}},[j,V,fe]),R=n.useCallback(h=>{if(o||k)return;const m=h.touches[0];z.current={x:m.clientX,y:m.clientY,time:Date.now()},O.current=0},[o,k]),L=n.useCallback(h=>{if(o||k)return;const m=h.touches[0],u=m.clientY-z.current.y,w=m.clientX-z.current.x;if(!(Math.abs(w)>Math.abs(u))){if(O.current=Math.abs(u),G||!V&&U==="slide"){if(O.current>=T){h.preventDefault();const F=u<0,B=u>0;O.current=0,F&&a<e.length-1?r():B&&a>0&&s()}return}if(U==="content"&&V&&!G){const F=g.current;if(!F)return;const{isAtTop:B,isAtBottom:P}=se(F);if(O.current>=T){const Y=u<0,te=u>0;if(Y&&P&&a<e.length-1){h.preventDefault(),O.current=0,r();return}else if(te&&B&&a>0){h.preventDefault(),O.current=0,s();return}}}}},[o,k,U,V,G,a,e.length,r,s,se,T]),D=n.useCallback(()=>{O.current=0},[]),W=n.useCallback(h=>{const m=Date.now();if(o||k)return;if(U==="content"&&V&&!G){const P=g.current;if(!P)return;const{isAtTop:Y,isAtBottom:te,currentScrollTop:oe,maxScrollTop:le}=se(P),Ce=h.deltaY>0,ue=h.deltaY<0;if(Ce)if(te){if(m-_.current>y&&(S.current=0),_.current=m,S.current<v){if(S.current+=Math.abs(h.deltaY),oe>=le-5){const ne=Math.min(S.current/v,1);ce("down",ne)}S.current>=v&&a<e.length-1&&(S.current=0,r());return}}else{S.current=0;return}else if(ue)if(Y){if(m-_.current>y&&(S.current=0),_.current=m,S.current<v){if(S.current+=Math.abs(h.deltaY),oe<=5){const ne=Math.min(S.current/v,1);ce("up",ne)}S.current>=v&&a>0&&(S.current=0,s());return}}else{S.current=0;return}return}(G||!V&&U==="slide")&&h.preventDefault(),m-_.current>y&&(ee?de():(S.current=0,K(!1),q(0))),_.current=m;const u=Math.abs(h.deltaY);S.current+=u;const w=g.current;if(w&&U==="content"&&V){const P=j==null?void 0:j.id;if(P){const{currentScrollTop:Y,maxScrollTop:te}=se(w),oe=Y>=te-10?"bottom":Y<=10?"top":"middle";fe[P]!==oe&&ye(le=>({...le,[P]:oe}))}}if(U!=="content"&&Te(h)||S.current<v||(S.current=0,K(!1),q(0),!w))return;const F=h.deltaY>0,B=h.deltaY<0;F&&a<e.length-1?r():B&&a>0&&s()},[o,k,U,V,G,a,e.length,r,s,j,ee,fe,ce,Te,de,se,y,v]),I=n.useCallback(h=>{if(o||k)return;const m=g.current;switch(h.key){case"ArrowDown":if(h.preventDefault(),U==="content"&&V&&!G&&m){const{isAtBottom:u,maxScrollTop:w}=se(m);if(u)a<e.length-1&&r();else{const F=Math.min(m.scrollTop+100,w);m.scrollTop=F}}else a<e.length-1&&r();break;case"ArrowUp":if(h.preventDefault(),U==="content"&&V&&!G&&m){const{isAtTop:u}=se(m);if(u)a>0&&s();else{const w=Math.max(m.scrollTop-100,0);m.scrollTop=w}}else a>0&&s();break;case"PageDown":case" ":h.preventDefault(),a<e.length-1&&r();break;case"PageUp":h.preventDefault(),a>0&&s();break;case"Home":h.preventDefault(),U==="content"&&!G&&m?m.scrollTop=0:t(0);break;case"End":if(h.preventDefault(),U==="content"&&!G&&m){const{maxScrollTop:u}=se(m);m.scrollTop=u}else t(e.length-1);break;default:{const u=parseInt(h.key);u>=1&&u<=e.length&&(h.preventDefault(),t(u-1));break}}},[o,k,U,V,G,a,e.length,r,s,t,se]);n.useEffect(()=>{const h=new CustomEvent("scrollBounce",{detail:{isBouncing:H,direction:Z,intensity:S.current/v}});window.dispatchEvent(h)},[H,Z,v]),n.useEffect(()=>{K(!1),q(0),re(!1),ae("none"),S.current=0,f.current&&clearTimeout(f.current);const h=setTimeout(()=>{A(),$()},50);return()=>{clearTimeout(h)}},[a,A,$]),n.useEffect(()=>{if($(),window.innerWidth<768&&ge){const m=[50,100,200,300,500,800,1200].map(B=>setTimeout(()=>{$()},B)),u=()=>m.forEach(B=>clearTimeout(B)),w=()=>{setTimeout(()=>{$()},50)},F=g.current;return F&&F.querySelectorAll("img").forEach(P=>{P.complete?w():(P.addEventListener("load",w,{once:!0}),P.addEventListener("error",w,{once:!0}))}),()=>{u(),F&&F.querySelectorAll("img").forEach(P=>{P.removeEventListener("load",w),P.removeEventListener("error",w)})}}else{const m=setTimeout(()=>$(),50),u=setTimeout(()=>$(),150),w=setTimeout(()=>$(),300);return()=>{clearTimeout(m),clearTimeout(u),clearTimeout(w)}}},[a,$,ge]),n.useEffect(()=>{const h=x.current;let m;const u=()=>{m&&clearTimeout(m),m=setTimeout(()=>{$()},100)};if(h)return h.addEventListener("wheel",W,{passive:!1}),h.addEventListener("touchstart",R,{passive:!1}),h.addEventListener("touchmove",L,{passive:!1}),h.addEventListener("touchend",D,{passive:!1}),document.addEventListener("keydown",I),window.addEventListener("resize",u),()=>{h.removeEventListener("wheel",W),h.removeEventListener("touchstart",R),h.removeEventListener("touchmove",L),h.removeEventListener("touchend",D),document.removeEventListener("keydown",I),window.removeEventListener("resize",u),f.current&&clearTimeout(f.current),m&&clearTimeout(m)}},[W,R,L,D,I,$]);const ie=()=>{if(!j)return null;const h=ve[j.id];return h?i.jsx(n.Suspense,{fallback:i.jsx("div",{className:"flex items-center justify-center h-full",children:i.jsx("div",{className:"text-white text-xl",children:"Loading..."})}),children:i.jsx(h,{section:j,language:l,...j.id==="home"?{sections:e,onSectionChange:t,enableOpeningAnimation:M}:{}})}):null};return i.jsxs("div",{ref:x,className:"relative w-full m-0 p-0 h-screen",style:{overflow:"hidden",height:"var(--vh-fallback, 100vh)",minHeight:"100dvh"},children:[(j==null?void 0:j.backgroundEffect)&&i.jsx(Ke,{effectType:j.backgroundEffect,sectionName:j.id||"unknown"}),i.jsx("div",{ref:g,className:`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${G?"scroll-mode-home overflow-hidden":V?"scroll-mode-auto overflow-y-auto":"overflow-hidden"} ${H?"bouncing":""}`,style:{transform:ee&&!H?`translateY(${pe}px)`:"translateY(0)",transition:o||ee&&!H?"none":H?"transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)":"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",willChange:o||ee||H?"transform":"auto"},children:ie()}),o&&i.jsx("div",{className:"fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"})]})},Bt=["a","button","input","select","textarea","[onclick]",'[role="button"]','[role="link"]','[role="menuitem"]','[tabindex]:not([tabindex="-1"])',".clickable",".btn",".button",".cursor-pointer","summary","label",'[data-clickable="true"]'],Nt=["canvas","svg","img","video",".hero-cube",".effect-avatar",".lorenz-attractor",'[data-no-custom-cursor="true"]','[style*="pointer-events: none"]','[style*="pointerEvents: none"]',".h-screen.w-screen",".overflow-hidden",".background-container",".bg-container"],Dt=()=>{const{getThemeColors:a}=Ue(),e=a(),{currentSection:t,language:r}=be(),s=t===0,o=()=>r==="zh"?"向下滚动探索更多...":"Scroll down to explore...",[c,l]=n.useState({x:0,y:0}),[M,k]=n.useState(!1),[E,v]=n.useState("none"),[T,y]=n.useState(!1),[d,b]=n.useState(0),[C,p]=n.useState(0),[x,g]=n.useState(0),[_,S]=n.useState(0),[f,z]=n.useState(!1),[O,U]=n.useState(0),[he,V]=n.useState(null),[me,fe]=n.useState(!1),{sections:ye,isPointerLocked:ee}=be(),K=n.useRef(),pe=n.useRef(0),q=n.useRef(),H=n.useRef(),re=n.useRef(null),Z=n.useRef(new WeakMap),ae=n.useRef({x:-1,y:-1,result:!1,timestamp:0}),j=n.useRef({currentScrollDelta:0,animatedValue:0,isAnimatingDown:!1,scrollIntensity:0});n.useEffect(()=>{j.current={currentScrollDelta:x,animatedValue:_,isAnimatingDown:f,scrollIntensity:d}},[x,_,f,d]);const G=n.useCallback((A,R)=>{const L=ae.current,D=performance.now();if(Math.sqrt(Math.pow(A-L.x,2)+Math.pow(R-L.y,2))<10&&D-L.timestamp<50)return L.result;const I=document.elementFromPoint(A,R);if(!I)return ae.current={x:A,y:R,result:!1,timestamp:D},!1;if(Z.current.has(I)){const B=Z.current.get(I);return ae.current={x:A,y:R,result:B,timestamp:D},B}const ie=Bt,h=Nt;if(I.hasAttribute("data-no-custom-cursor")||I.hasAttribute("data-hero-cube-canvas")||I.classList.contains("hero-cube-canvas"))return Z.current.set(I,!1),!1;const m=window.getComputedStyle(I);if(m.pointerEvents==="none"||m.cursor==="none"&&(I.classList.contains("h-screen")||I.classList.contains("w-screen")||I.classList.contains("overflow-hidden")))return Z.current.set(I,!1),!1;if(I.tagName.toLowerCase()==="canvas"){const B=I.parentElement;if(B&&(B.classList.contains("hero-cube")||B.hasAttribute("data-hero-cube")||B.style.pointerEvents==="none"||I.style.pointerEvents==="none"))return Z.current.set(I,!1),!1}let u=!1,w=I,F=0;for(;w&&w!==document.body&&F<5;){if(h.some(P=>{try{return w.matches(P)}catch{return!1}})){u=!1;break}if(w.tagName.toLowerCase()==="div"){const P=window.getComputedStyle(w),Y=w.classList;if(P.cursor==="none"&&(Y.contains("h-screen")||Y.contains("w-screen"))){u=!1;break}const te=["h-screen","w-screen","overflow-hidden","relative","absolute","fixed"];if(Array.from(Y).every(le=>te.includes(le)||le.startsWith("bg-")||le.startsWith("backdrop-"))&&P.cursor==="none"){u=!1;break}}if(ie.some(P=>{try{return w.matches(P)}catch{return!1}})){u=!0;break}if(window.getComputedStyle(w).cursor==="pointer"){const P=w.tagName.toLowerCase();if(!["canvas","svg","img","video"].includes(P)&&(w.hasAttribute("onclick")||w.hasAttribute("role")||w.hasAttribute("tabindex")||w.classList.contains("clickable")||w.classList.contains("btn")||w.classList.contains("button")||["a","button","input","select","textarea"].includes(P))){u=!0;break}}if(w.onclick||w.getAttribute("data-testid")||w.classList.contains("cursor-pointer")){u=!0;break}w=w.parentElement,F++}if(Z.current.set(I,u),ae.current={x:A,y:R,result:u,timestamp:performance.now()},Z.current.size>100){const B=Array.from(Z.current.entries());Z.current.clear(),B.slice(-50).forEach(([P,Y])=>{Z.current.set(P,Y)})}return u},[]),ge=n.useCallback(()=>{const A=t>0,R=t<ye.length-1;return A&&R?"both":A?"up":R?"down":"none"},[t,ye.length]),se=n.useCallback(()=>{const A=t>0,R=t<ye.length-1;re.current||(re.current=document.querySelector(".scroll-mode-auto"));const L=re.current;let D=!1,W=!0,I=!0;return L&&(D=L.scrollHeight>L.clientHeight+10,W=L.scrollTop<=5,I=L.scrollTop>=L.scrollHeight-L.clientHeight-5),{isTopBoundary:!A&&(!D||W),isBottomBoundary:!R&&(!D||I),hasNowhereToGo:!A&&!R&&!D,hasContentToScroll:D}},[t,ye.length]);n.useCallback(()=>{H.current&&(cancelAnimationFrame(H.current),H.current=null),z(!0);const A=Math.abs(x);if(A===0){z(!1),S(0),g(0),b(0);return}const R=performance.now(),L=Math.min(A*2,600),D=()=>{const I=performance.now()-R,ie=Math.min(I/L,1),h=1-Math.pow(1-ie,4),m=Math.round(A*(1-h));S(m),ie<1?H.current=requestAnimationFrame(D):(S(0),g(0),z(!1),setTimeout(()=>{b(0),V(null),setTimeout(()=>{S(0),g(0)},100)},50),H.current=null)};H.current=requestAnimationFrame(D)},[x]),n.useEffect(()=>{v(ge())},[ge]);const ve=n.useCallback(A=>{const R=A.deltaY,L=Math.min(Math.abs(R)/30,1),D=Math.abs(R);let W=1;D<10?W=2:D<30?W=1.5:D>100&&(W=.8);const I=Math.min(L*W,1),ie=R>0?"down":"up",h=performance.now();if(h-(ve.lastTime||0)<8)return;ve.lastTime=h,H.current&&(cancelAnimationFrame(H.current),H.current=null),z(!1),b(I),V(ie),U(h);const m=Math.round(R);g(m),S(m),p(u=>{const w=u+m;return Math.max(-9999,Math.min(9999,w))}),q.current&&(clearTimeout(q.current),q.current=null),q.current=setTimeout(()=>{g(0),S(0),b(0),z(!1),q.current=null},100)},[]),$=n.useCallback(A=>{const R=performance.now();if(R-($.lastTime||0)<16)return;$.lastTime=R;const L={x:A.clientX,y:A.clientY},D=G(A.clientX,A.clientY);l(L),fe(D),M||k(!0)},[M,G]),ce=n.useCallback(()=>{k(!0),y(!0)},[]),de=n.useCallback(()=>{k(!1),y(!1)},[]);n.useEffect(()=>{let A=0;const R=()=>{const L=performance.now();if(L-(R.lastTime||0)<16){K.current=requestAnimationFrame(R);return}if(R.lastTime=L,T?pe.current=Math.min(pe.current+.12,1):pe.current=Math.max(pe.current-.08,.3),L-O>50){const W=Math.max(d-.03,0);L-A>50&&W!==d&&(b(W),A=L)}K.current=requestAnimationFrame(R)};return K.current=requestAnimationFrame(R),()=>{K.current&&cancelAnimationFrame(K.current)}},[T,O,d,C]),n.useEffect(()=>{const A=document.body.style.cursor;return me?document.body.style.cursor="auto":document.body.style.cursor="none",()=>{document.body.style.cursor=A,re.current&&(re.current=null),pe.current=.3}},[me]),n.useEffect(()=>(document.addEventListener("mousemove",$),document.addEventListener("mouseenter",ce),document.addEventListener("mouseleave",de),document.addEventListener("wheel",ve,{passive:!0}),()=>{document.removeEventListener("mousemove",$),document.removeEventListener("mouseenter",ce),document.removeEventListener("mouseleave",de),document.removeEventListener("wheel",ve),q.current&&clearTimeout(q.current),H.current&&cancelAnimationFrame(H.current)}),[$,ce,de,ve]),n.useEffect(()=>{if(!f&&x!==0&&d===0){const A=setTimeout(()=>{g(0),S(0),V(null)},1500);return()=>clearTimeout(A)}},[f,x,d]);const Te=()=>{const R=T?1.02:1,L=133*R,D=se(),W=D.isTopBoundary&&he==="up"&&d>0||D.isBottomBoundary&&he==="down"&&d>0||D.hasNowhereToGo&&d>0,I=ue=>{const ne=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(ue);return ne?[parseInt(ne[1],16),parseInt(ne[2],16),parseInt(ne[3],16)]:[255,255,255]},ie=()=>W&&d>0?"#ff4444":e.primary,h=()=>W&&d>0?"#ff4444":e.accent,m=ie(),u=h(),w=()=>{const ue=f?_:x;return ue===0?null:Math.abs(ue).toString()},F=()=>he==="down"?"translate3d(24px, 0, 0)":he==="up"?"translate3d(-24px, 0, 0)":"translate3d(0, 0, 0)",B=w(),P=F(),Y=B!==null&&(d>0||Math.abs(x)>0||f||Math.abs(_)>0),te=.2,oe=5,le={width:`${L}px`,height:`${L}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",transform:"translate3d(0, 0, 0)",willChange:"transform"},Ce=(ue,ne=1)=>{const Me=256*R,st=ue==="up"?"M12 22L12 2M10 4L12 2L14 4":"M12 2L12 22M10 20L12 22L14 20",it=(()=>{if(d===0)return e.primary;if(W){const Q=[255,68,68],we=[180,20,20],_e=Math.round(Q[0]+(we[0]-Q[0])*d),Ae=Math.round(Q[1]+(we[1]-Q[1])*d),Ie=Math.round(Q[2]+(we[2]-Q[2])*d);return`rgb(${_e}, ${Ae}, ${Ie})`}else{const Q=I(e.accent),we=I(e.secondary),_e=Math.round(Q[0]+(we[0]-Q[0])*d),Ae=Math.round(Q[1]+(we[1]-Q[1])*d),Ie=Math.round(Q[2]+(we[2]-Q[2])*d);return`rgb(${_e}, ${Ae}, ${Ie})`}})();return i.jsx("div",{style:{position:"absolute",width:`${Me}px`,height:`${Me}px`,display:"flex",alignItems:"center",justifyContent:"center",opacity:ne*.8,zIndex:10,transform:"translate3d(0, 0, 0)",willChange:"opacity"},children:i.jsx("svg",{width:Me,height:Me,viewBox:"0 0 24 24",style:{shapeRendering:"geometricPrecision",vectorEffect:"non-scaling-stroke"},children:i.jsx("path",{d:st,stroke:it,strokeWidth:te,strokeLinecap:"round",strokeLinejoin:"round",fill:"none",opacity:.8,style:{transition:"stroke 0.1s ease-out",willChange:"stroke"}})})})};return i.jsxs("div",{style:le,children:[i.jsxs("svg",{width:L,height:L,style:{position:"absolute",transform:he==="up"?"rotate(90deg)":"rotate(-90deg)",transition:"transform 0.2s ease-out"},children:[i.jsx("circle",{cx:L/2,cy:L/2,r:(L-4)/2,fill:"none",stroke:m,strokeWidth:te,opacity:"0.8"}),d>0&&i.jsx("circle",{cx:L/2,cy:L/2,r:(L-4)/2,fill:"none",stroke:u,strokeWidth:oe,strokeLinecap:"round",opacity:"0.9",strokeDasharray:`${2*Math.PI*((L-4)/2)}`,strokeDashoffset:`${2*Math.PI*((L-4)/2)*(1-d)}`,style:{transition:"stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"stroke-dashoffset"}})]}),Y&&i.jsx("div",{style:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"600",fontFamily:'Monaco, "SF Mono", "Consolas", monospace',color:u,opacity:.95,zIndex:15,textShadow:`0 0 6px ${u}40`,transform:P,willChange:"opacity, transform",minWidth:"32px",textAlign:"center",transition:f?"none":"all 0.2s ease-out"},children:i.jsx("span",{className:"scroll-value",style:{transform:f?"scale(0.95)":"scale(1)",transition:"transform 0.15s ease-out"},children:B})}),E==="up"&&Ce("up"),E==="down"&&Ce("down"),E==="both"&&i.jsxs(i.Fragment,{children:[Ce("up",.7),Ce("down",.7)]}),E==="none"&&d===0&&i.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:m,opacity:.8,transform:"translate3d(0, 0, 0)"}}),i.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"var(--theme-primary)",opacity:.9,zIndex:20,transform:"translate3d(0, 0, 0)",willChange:"transform",boxShadow:"0 0 6px var(--theme-primary)"}})]})};return M?i.jsxs(i.Fragment,{children:[i.jsx("style",{children:`
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
                    ${ee?"display: none !important;":""} /* 3D模式时隐藏 */
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
                    ${ee?"display: none !important;":""} /* 3D模式时隐藏 */
                }
                
                /* 移动设备适配：在触摸设备上隐藏光标 */
                @media (hover: none) and (pointer: coarse) {
                    .power-cursor, .clickable-hint {
                        display: none !important;
                    }
                }
            `}),me&&i.jsx("div",{className:"clickable-hint",style:{left:c.x,top:c.y}}),i.jsx("div",{className:`power-cursor ${T?"hovering":""} ${me?"over-clickable":""}`,style:{left:c.x,top:c.y,transform:"translate3d(-50%, -50%, 0)",willChange:"transform"},children:Te()}),s&&E==="down"&&i.jsx("div",{style:{position:"fixed",left:c.x,top:c.y-16,transform:"translate(-50%, -50%)",color:e.primary,fontSize:"14px",fontWeight:"500",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',opacity:.8,pointerEvents:"none",zIndex:9998,textShadow:`0 0 8px ${e.primary}40`,animation:"gentle-pulse 2s ease-in-out infinite",whiteSpace:"nowrap",userSelect:"none"},children:o()})]}):null},Ze=({language:a="en"})=>{const[e,t]=n.useState(navigator.onLine),[r,s]=n.useState(!1);n.useEffect(()=>{const k=()=>{t(!0),s(!0),setTimeout(()=>s(!1),2e3)},E=()=>{t(!1),s(!0)};return window.addEventListener("online",k),window.addEventListener("offline",E),navigator.onLine||s(!0),()=>{window.removeEventListener("online",k),window.removeEventListener("offline",E)}},[]);const o=()=>e?{title:a==="zh"?"网络连接已恢复":"Network Reconnected",message:a==="zh"?"所有功能恢复正常":"All features are now working",icon:i.jsx("svg",{className:"w-6 h-6 text-green-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}:{title:a==="zh"?"网络连接中断":"Network Disconnected",message:a==="zh"?"部分功能可能无法正常使用，请检查网络连接":"Some features may not work properly. Please check your connection.",icon:i.jsx("svg",{className:"w-6 h-6 text-red-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"})})};if(!r)return null;const{title:c,message:l,icon:M}=o();return i.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center pointer-events-none",children:i.jsx("div",{className:`transition-all duration-300 transform ${r?"scale-100 opacity-100":"scale-95 opacity-0"} pointer-events-auto`,children:i.jsx("div",{className:"bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 rounded-lg p-4 shadow-2xl",children:i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsx("div",{className:"flex-shrink-0",children:M}),i.jsxs("div",{className:"text-white",children:[i.jsx("div",{className:"font-medium text-sm",children:c}),i.jsx("div",{className:"text-zinc-300 text-xs mt-1",children:l})]}),i.jsx("button",{onClick:()=>s(!1),className:"text-zinc-400 hover:text-zinc-200 text-sm ml-4 transition-colors","aria-label":"关闭",children:i.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})})})})};Ze.propTypes={language:X.string};const zt=()=>{const{currentSection:a}=be(),t=a===0?0:a/5*100;return i.jsx("div",{className:"fixed top-0 left-0 right-0 z-40 h-[5px]",children:i.jsx("div",{className:`w-full h-full transition-opacity duration-300 ${a===0?"bg-transparent":"bg-white/20"}`,children:i.jsx("div",{className:"h-full transition-all duration-700 ease-out",style:{width:`${t}%`,backgroundColor:"var(--theme-primary)"}})})})};class Qe extends rt.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("ErrorBoundary caught an error:",e,t),this.setState({error:e,errorInfo:t})}render(){return this.state.hasError?i.jsx("div",{className:"min-h-screen flex items-center justify-center bg-theme-background",children:i.jsxs("div",{className:"max-w-md w-full bg-theme-surface shadow-lg rounded-lg p-6",children:[i.jsxs("div",{className:"flex items-center mb-4",children:[i.jsx("div",{className:"flex-shrink-0",children:i.jsx("svg",{className:"h-8 w-8 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.102 16.5c-.77.833.192 2.5 1.732 2.5z"})})}),i.jsx("div",{className:"ml-3",children:i.jsx("h3",{className:"text-lg font-medium text-gray-900 dark:text-white",children:"应用程序遇到错误"})})]}),i.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300 mb-4",children:"抱歉，应用程序遇到了一个意外错误。请刷新页面重试。"}),!1,i.jsx("div",{className:"mt-6",children:i.jsx("button",{onClick:()=>window.location.reload(),className:"w-full bg-theme-primary hover:bg-theme-primary/80 text-theme-background font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200",children:"刷新页面"})})]})}):this.props.children}}Qe.propTypes={children:X.node.isRequired};const et=({visible:a,onToggle:e})=>{const[t,r]=n.useState("memory"),[s,o]=n.useState(null),[c,l]=n.useState(null),[M,k]=n.useState({}),[E,v]=n.useState(!1),T=n.useRef(0),y=n.useRef(0),d=n.useRef(performance.now()),{currentSection:b,sections:C,getCurrentSection:p}=be();if(n.useEffect(()=>{let f;const z=()=>{y.current++;const O=performance.now();O-d.current>=1e3&&(T.current=Math.round(y.current*1e3/(O-d.current)),y.current=0,d.current=O),f=requestAnimationFrame(z)};return z(),()=>{f&&cancelAnimationFrame(f)}},[]),n.useEffect(()=>{if(!a)return;const f=()=>{performance.memory&&o({used:Math.round(performance.memory.usedJSHeapSize/1024/1024),total:Math.round(performance.memory.totalJSHeapSize/1024/1024),limit:Math.round(performance.memory.jsHeapSizeLimit/1024/1024)});const O=J.getMemoryInfo();l(O),k({fps:T.current})};f();const z=setInterval(f,500);return()=>clearInterval(z)},[a]),!a)return null;const x=[{id:"memory",label:"Memory"},{id:"webgl",label:"WebGL"},{id:"sections",label:"Sections"}],g=()=>i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent backdrop-blur-md border border-blue-400/30 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/20",children:[i.jsx("div",{className:"text-blue-300 font-semibold text-xs mb-1",children:"JS Heap Used"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(s==null?void 0:s.used)||0," MB"]}),i.jsxs("div",{className:"text-blue-200/70 text-xs",children:[s?Math.round(s.used/s.limit*100):0,"% of limit"]})]}),i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 shadow-lg ring-1 ring-emerald-400/20",children:[i.jsx("div",{className:"text-emerald-300 font-semibold text-xs mb-1",children:"JS Heap Total"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(s==null?void 0:s.total)||0," MB"]}),i.jsx("div",{className:"text-emerald-200/70 text-xs",children:"Allocated"})]})]}),i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent backdrop-blur-md border border-yellow-400/30 rounded-xl p-3 shadow-lg ring-1 ring-yellow-400/20",children:[i.jsx("div",{className:"text-yellow-300 font-semibold text-xs mb-1",children:"JS Heap Limit"}),i.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(s==null?void 0:s.limit)||0," MB"]}),i.jsx("div",{className:"text-yellow-200/70 text-xs",children:"Browser limit"})]}),i.jsxs("div",{className:"bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-md border border-purple-400/30 rounded-xl p-3 shadow-lg ring-1 ring-purple-400/20",children:[i.jsx("div",{className:"text-purple-300 font-semibold text-xs mb-1",children:"FPS"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:M.fps||0}),i.jsx("div",{className:"text-purple-200/70 text-xs",children:"frames/sec"})]})]})]}),_=()=>i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-3 shadow-lg ring-1 ring-cyan-400/20",children:[i.jsx("div",{className:"text-cyan-300 font-semibold text-xs mb-1",children:"Active Groups"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(c==null?void 0:c.activeResourceGroups)||0}),i.jsx("div",{className:"text-cyan-200/70 text-xs",children:"Resource groups"})]}),i.jsxs("div",{className:"bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-orange-400/30 rounded-xl p-3 shadow-lg ring-1 ring-orange-400/20",children:[i.jsx("div",{className:"text-orange-300 font-semibold text-xs mb-1",children:"Persistent"}),i.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(c==null?void 0:c.persistentResources)||0}),i.jsx("div",{className:"text-orange-200/70 text-xs",children:"Persistent resources"})]})]}),(c==null?void 0:c.resourceStats)&&i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[i.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Resource Breakdown"]}),i.jsx("div",{className:"grid grid-cols-2 gap-2 text-xs",children:Object.entries(c.resourceStats).map(([f,z])=>i.jsxs("div",{className:"flex justify-between items-center bg-white/5 rounded-lg px-2 py-1.5 border border-white/10",children:[i.jsxs("span",{className:"capitalize text-gray-300",children:[f.replace(/([A-Z])/g," $1").trim(),":"]}),i.jsx("span",{className:"font-mono text-white font-semibold bg-emerald-500/20 px-2 py-0.5 rounded",children:z})]},f))})]}),(c==null?void 0:c.sectionBreakdown)&&Object.keys(c.sectionBreakdown).length>0&&i.jsxs("div",{className:"bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent backdrop-blur-md border border-violet-400/25 rounded-xl p-4 shadow-lg ring-1 ring-violet-400/15",children:[i.jsxs("div",{className:"text-violet-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"}),"Section Resources"]}),i.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:Object.entries(c.sectionBreakdown).map(([f,z])=>i.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-3 rounded-lg backdrop-blur-sm",children:[i.jsxs("div",{className:"flex items-center justify-between mb-2",children:[i.jsx("div",{className:"font-medium text-white text-sm",children:f.replace("BackgroundCanvas_","").replace("HeroCube","HomeCube").replace("EffectAvatar_","Avatar-")}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("span",{className:"bg-blue-500/30 text-blue-200 px-2 py-1 rounded-md text-xs font-mono border border-blue-400/30",children:z.count}),z.persistent>0&&i.jsxs("span",{className:"bg-green-500/30 text-green-200 px-2 py-1 rounded-md text-xs font-mono border border-green-400/30",children:["P:",z.persistent]})]})]}),i.jsxs("div",{className:"text-xs text-gray-400",children:["Last active: ",new Date(z.lastActive).toLocaleTimeString()]})]},f))})]}),i.jsxs("div",{className:"bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent backdrop-blur-md border border-blue-400/25 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/15",children:[i.jsx("div",{className:"text-blue-300 font-semibold text-sm mb-2",children:"Memory Usage"}),i.jsxs("div",{className:"text-xs text-blue-200/70",children:["JS Heap: ",(c==null?void 0:c.jsHeapSize)||0,"MB / ",(c==null?void 0:c.jsHeapLimit)||0,"MB"]})]})]}),S=()=>{const f=p();return i.jsxs("div",{className:"space-y-4",children:[i.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-4 shadow-lg ring-1 ring-cyan-400/20",children:[i.jsxs("div",{className:"text-cyan-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"}),"Current Section"]}),i.jsx("div",{className:"text-white text-lg font-bold mb-2",children:(f==null?void 0:f.title)||(f==null?void 0:f.id)||"Unknown"}),i.jsxs("div",{className:"space-y-1 text-xs",children:[i.jsxs("div",{className:"text-cyan-200/70",children:["Section ",b+1," of ",C.length]}),(f==null?void 0:f.backgroundEffect)&&i.jsxs("div",{className:"text-cyan-200/90 bg-cyan-500/20 px-2 py-1 rounded-md border border-cyan-400/30 inline-block",children:["Effect: ",f.backgroundEffect]})]})]}),i.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[i.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Section Navigation"]}),i.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:C.map((z,O)=>i.jsxs("div",{className:`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${O===b?"bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-blue-200 border-blue-400/40 shadow-lg":"bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"}`,children:[i.jsx("span",{className:"truncate text-sm font-medium",children:z.title||z.id}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("span",{className:`w-2 h-2 rounded-full ${O===b?"bg-blue-400 animate-pulse":"bg-gray-500"}`}),i.jsx("span",{className:"text-xs font-mono bg-white/10 px-1 py-0.5 rounded",children:O+1})]})]},z.id))})]}),i.jsxs("div",{className:"bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent backdrop-blur-md border border-purple-400/25 rounded-xl p-4 shadow-lg ring-1 ring-purple-400/15",children:[i.jsxs("div",{className:"text-purple-300 font-semibold mb-3 text-sm flex items-center",children:[i.jsx("span",{className:"w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"}),"Performance Snapshot"]}),i.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[i.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[i.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"FPS"}),i.jsx("div",{className:"font-mono text-white font-bold text-lg",children:M.fps||0})]}),i.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[i.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"WebGL Groups"}),i.jsx("div",{className:"font-mono text-white font-bold text-lg",children:(c==null?void 0:c.activeResourceGroups)||0})]})]})]})]})};return i.jsx("div",{className:`fixed top-4 right-4 z-[9999] transition-all duration-500 ease-out ${E?"w-12 h-12":"w-96 max-h-[600px]"}`,children:i.jsxs("div",{className:"bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-mono text-xs shadow-2xl shadow-black/20 ring-1 ring-white/20 overflow-hidden",children:[i.jsxs("div",{className:"flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent border-b border-white/20 backdrop-blur-sm",children:[!E&&i.jsxs("div",{className:"flex items-center space-x-3",children:[i.jsxs("div",{className:"relative",children:[i.jsx("div",{className:"w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"}),i.jsx("div",{className:"absolute inset-0 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"})]}),i.jsx("span",{className:"text-emerald-300 font-semibold text-sm tracking-wide",children:"Performance Monitor"})]}),i.jsxs("div",{className:"flex items-center space-x-2",children:[i.jsx("button",{onClick:()=>v(!E),className:"w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40",title:E?"Expand Panel":"Collapse Panel",children:E?"📊":"➖"}),i.jsx("button",{onClick:e,className:"w-7 h-7 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50",title:"Close Panel (Ctrl+M)",children:"✕"})]})]}),!E&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"flex bg-white/5 backdrop-blur-sm border-b border-white/10",children:x.map(f=>i.jsxs("button",{onClick:()=>r(f.id),className:`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden ${t===f.id?"bg-gradient-to-b from-blue-500/30 to-blue-600/20 text-blue-200 shadow-lg":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:[t===f.id&&i.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"}),f.label]},f.id))}),i.jsxs("div",{className:"p-4 max-h-96 overflow-y-auto custom-scrollbar",children:[t==="memory"&&g(),t==="webgl"&&_(),t==="sections"&&S()]}),i.jsx("div",{className:"p-3 bg-gradient-to-t from-white/10 to-transparent border-t border-white/20 backdrop-blur-sm",children:i.jsxs("div",{className:"text-center text-gray-400",children:[i.jsx("span",{className:"text-xs",children:"Press "}),i.jsx("kbd",{className:"inline-flex items-center px-2 py-1 bg-white/20 rounded-md text-xs font-mono border border-white/30 shadow-inner",children:"Ctrl+M"}),i.jsx("span",{className:"text-xs",children:" to toggle"})]})})]})]})})};et.propTypes={visible:X.bool.isRequired,onToggle:X.func.isRequired};const tt=({children:a,language:e="en"})=>{const[t,r]=n.useState(!1),[s,o]=n.useState([]),[c,l]=n.useState(0),M=n.useRef(null),k=async y=>{try{if(y&&y.match(/\.(mp4|webm|mov|avi|mkv)$/i))return{width:1920,height:1080,aspectRatio:16/9};if(y&&y.includes("/gallery/")){const b=y.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{const p=await(await fetch("/precomputed-dimensions.json")).json();if(p.gallery&&p.gallery[b]){const x=p.gallery[b];return{width:x.width,height:x.height,aspectRatio:x.aspectRatio}}}catch{}}let d=y;if(y&&y.includes("/gallery/")&&y.endsWith(".jpg")){const b=y.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{d=await xt.getOptimalPath(b,"gallery")}catch{}}return new Promise(b=>{const C=new Image;C.onload=()=>{b({width:C.naturalWidth,height:C.naturalHeight,aspectRatio:C.naturalWidth/C.naturalHeight})},C.onerror=()=>{if(d!==y){const p=new Image;p.onload=()=>{b({width:p.naturalWidth,height:p.naturalHeight,aspectRatio:p.naturalWidth/p.naturalHeight})},p.onerror=()=>{b({width:1200,height:800,aspectRatio:1.5})},p.crossOrigin="anonymous",p.src=y}else b({width:1200,height:800,aspectRatio:1.5})},C.crossOrigin="anonymous",C.src=d})}catch{return{width:1200,height:800,aspectRatio:1.5}}},T={isOpen:t,images:s,initialIndex:c,openPhotoSwipe:async(y,d=0)=>{if(!y||y.length===0)return;o(y),l(d),r(!0);const b=y.map(C=>k(C.src||C.original));try{const C=await Promise.all(b),p=y.map((g,_)=>({src:g.src||g.original,width:C[_].width,height:C[_].height,alt:g.alt||g.title||`Image ${_+1}`,caption:g.caption,title:g.title,description:g.description}));M.current&&M.current.destroy();const x=new at({dataSource:p,index:d,pswpModule:()=>xe(()=>import("./vendor-RxfllKF0.js").then(g=>g.f),__vite__mapDeps([2,3,4])),bgOpacity:.95,spacing:.1,loop:!0,zoom:!0,showAnimationDuration:300,hideAnimationDuration:300,showHideAnimationType:"zoom",allowMouseDrag:!0,allowPanToNext:!0,allowSwipeToClose:!0,wheelToZoom:!0,imageClickAction:"close",tapAction:"close",doubleTapAction:"zoom",closeTitle:e==="zh"?"关闭":"Close",zoomTitle:e==="zh"?"缩放":"Zoom",arrowPrevTitle:e==="zh"?"上一张":"Previous",arrowNextTitle:e==="zh"?"下一张":"Next",errorMsg:e==="zh"?"图片无法加载":"The image cannot be loaded",pinchToClose:!0,closeOnVerticalDrag:!0,returnFocus:!1,padding:{top:40,bottom:40,left:20,right:20},preload:[1,2]});x.on("close",()=>{r(!1),o([]),l(0)}),x.on("uiRegister",()=>{x.pswp.ui.registerElement({name:"custom-counter",className:"pswp__custom-counter",appendTo:"top-bar",onInit:(g,_)=>{const S=()=>{g.textContent=`${_.currIndex+1} / ${_.getNumItems()}`};_.on("change",S),_.on("afterInit",S)}}),x.pswp.ui.registerElement({name:"download-button",className:"pswp__download-button",appendTo:"bar",onInit:(g,_)=>{g.innerHTML=`
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            `,g.title=e==="zh"?"下载图片":"Download image",g.onclick=()=>{const S=p[_.currIndex];if(S){const f=document.createElement("a");f.href=S.src,f.download=`image_${_.currIndex+1}.jpg`,f.click()}}}})}),x.init(),x.loadAndOpen(d),M.current=x}catch(C){console.error("Error loading images for PhotoSwipe:",C),r(!1)}},closePhotoSwipe:()=>{M.current&&M.current.close()}};return i.jsxs(bt.Provider,{value:T,children:[a,i.jsx("style",{children:`
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
      `})]})};tt.propTypes={children:X.node.isRequired,language:X.string};X.string.isRequired,X.string,X.string,X.string,X.string,X.node,X.array;const Ft=()=>{const[a,e]=n.useState(!1),t=!1,r=n.useCallback(()=>{},[t]),s=n.useCallback(()=>{e(!1)},[]),o=n.useCallback(()=>{},[t]);return n.useEffect(()=>{},[t,a,r,s]),t?{isVisible:a,toggle:r,hide:s,show:o,isDev:t}:{isVisible:!1,toggle:()=>{},hide:()=>{},show:()=>{},isDev:!1}},Ot=()=>{const a=Ft(),{language:e}=be();return Ue(),i.jsx(Qe,{children:i.jsx(tt,{children:i.jsxs("div",{className:"App min-h-screen",children:[i.jsx(zt,{}),i.jsx(Ze,{language:e}),i.jsx(Dt,{}),i.jsx(It,{}),a.isDev&&i.jsx(et,{visible:a.isVisible,onToggle:a.toggle})]})})})};function ke(){const a=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${a}px`),document.documentElement.style.setProperty("--vh-fallback",`${window.innerHeight}px`),CSS.supports("height","100dvh")||document.documentElement.style.setProperty("--dvh-fallback",`${window.innerHeight}px`)}function Wt(){ke();let a;if(window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(ke,100)}),screen.orientation?screen.orientation.addEventListener("change",()=>{setTimeout(ke,200)}):window.addEventListener("orientationchange",()=>{setTimeout(ke,200)}),/iPhone|iPad|iPod/.test(navigator.userAgent)){let e;window.addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(ke,150)},{passive:!0})}}Wt();ot.createRoot(document.getElementById("root")).render(i.jsx(n.StrictMode,{children:i.jsx(Ot,{})}));
