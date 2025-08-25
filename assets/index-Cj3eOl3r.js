const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/home-CKsvCAIR.js","assets/react-N-_5-tx-.js","assets/vendor-RxfllKF0.js","assets/d3-BbFmVfHF.js","assets/vendor-DSulWsr7.css","assets/about-CHDBX9pU.js","assets/three-Br820KFa.js","assets/gsap-CH_iu5NA.js","assets/texture-system-DsgsKixE.js","assets/gallery-AhK9jpxL.js","assets/home-DklKxYxB.css","assets/projects-BXd-DuHt.js","assets/leaflet-BCigXWF9.js","assets/leaflet-BTrKGrB8.css","assets/projects-B3BEbutr.css","assets/EducationSection-BXCxGZp7.js","assets/EducationSection-Co46vkHx.css","assets/ContactSection-DpSDfRR8.js","assets/ContactSection-B2ZxASnB.css"])))=>i.map(i=>d[i]);
import{r as n,j as s,R as et,d as tt}from"./react-N-_5-tx-.js";import{u as be,_ as ge}from"./about-CHDBX9pU.js";import{P as Z,l as st,e as rt}from"./vendor-RxfllKF0.js";import{w as K,u as Oe}from"./home-CKsvCAIR.js";import{I as it,h as Me,o as ot,J as He,M as Le,W as Te,c as A,i as Be,K as nt,Q as at,U as lt,X as Ne,Y as ct,Z as _e,_ as Ae,$ as je,a0 as ht,A as Ge,v as Ie,P as ve,a1 as dt,a2 as ut,a3 as ze,u as we,a4 as De,s as Ue,a5 as Ve,a6 as Fe,a7 as Ye,a8 as $e,a9 as mt,aa as We,D as ft}from"./three-Br820KFa.js";import{P as pt}from"./gallery-AhK9jpxL.js";import{t as gt}from"./texture-system-DsgsKixE.js";import"./d3-BbFmVfHF.js";import"./gsap-CH_iu5NA.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();class vt{constructor(e,t={},i="BackgroundCanvas"){if(this.canvas=e,this.componentId=i,this.componentId=i,this.gl=this.canvas.getContext("webgl")||this.canvas.getContext("experimental-webgl"),!this.gl)throw console.error("EffectFuse: Unable to get WebGL context"),new Error("WebGL not supported");this.resourceId=K.registerResources(this.componentId,{gl:this.gl,canvas:this.canvas},{persistent:!0}),this.params={brightness:1.8,blobiness:1.3,particles:16,scanlines:!1,energy:1.25,timeScale:1.1,...t},this.program=null,this.animationFrameId=null,this.startTime=performance.now(),this.uniformLocations={},this.themeColors=this.getThemeColors();try{this.initGL()}catch(r){throw console.error("EffectFuse: Failed to initialize WebGL",r),r}}initGL(){if(!this.gl){console.error("WebGL not supported.");return}this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.getExtension("OES_texture_float");const e=`
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
        `,i=this.createShader(this.gl.VERTEX_SHADER,e),r=this.createShader(this.gl.FRAGMENT_SHADER,t);this.program=this.createProgram(i,r),this.uniformLocations={resolution:this.gl.getUniformLocation(this.program,"u_resolution"),brightness:this.gl.getUniformLocation(this.program,"u_brightness"),blobiness:this.gl.getUniformLocation(this.program,"u_blobiness"),particles:this.gl.getUniformLocation(this.program,"u_particles"),scanlines:this.gl.getUniformLocation(this.program,"u_scanlines"),energy:this.gl.getUniformLocation(this.program,"u_energy"),millis:this.gl.getUniformLocation(this.program,"u_millis"),timeScale:this.gl.getUniformLocation(this.program,"u_timeScale"),themePrimary:this.gl.getUniformLocation(this.program,"u_theme_primary"),themeSecondary:this.gl.getUniformLocation(this.program,"u_theme_secondary"),themeAccent:this.gl.getUniformLocation(this.program,"u_theme_accent"),themeDarkBlue:this.gl.getUniformLocation(this.program,"u_theme_dark_blue"),themeProjectBlue:this.gl.getUniformLocation(this.program,"u_theme_project_blue")},this.setupBuffers()}createShader(e,t){const i=this.gl.createShader(e);return this.gl.shaderSource(i,t),this.gl.compileShader(i),this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)?i:(console.error("Shader compilation error:",this.gl.getShaderInfoLog(i)),console.error("Shader source:",t),this.gl.deleteShader(i),null)}createProgram(e,t){const i=this.gl.createProgram();return this.gl.attachShader(i,e),this.gl.attachShader(i,t),this.gl.linkProgram(i),this.gl.getProgramParameter(i,this.gl.LINK_STATUS)?i:(console.error(this.gl.getProgramInfoLog(i)),this.gl.deleteProgram(i),null)}setupBuffers(){this.positionBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW);const e=this.gl.getAttribLocation(this.program,"a_position");this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.positionBuffer),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)}start(){this.startTime=performance.now(),this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.render()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resourceId&&(K.cleanup(this.resourceId),this.resourceId=null),this.gl)try{this.program&&(this.gl.deleteProgram(this.program),this.program=null),this.positionBuffer&&(this.gl.deleteBuffer(this.positionBuffer),this.positionBuffer=null)}catch(e){console.error("Error cleaning up WebGL resources:",e)}this.gl=null,this.canvas=null,this.uniformLocations={}}onResize(e,t){this.gl&&this.canvas&&(this.canvas.width=e,this.canvas.height=t,this.gl.viewport(0,0,e,t),requestAnimationFrame(()=>{this.gl&&this.render()}))}render(){if(!this.gl||!this.program||!this.params)return;this.animationFrameId=requestAnimationFrame(this.render.bind(this));const t=performance.now()-this.startTime;this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.useProgram(this.program),this.uniformLocations.resolution&&this.gl.uniform2f(this.uniformLocations.resolution,this.canvas.width,this.canvas.height),this.uniformLocations.brightness&&this.gl.uniform1f(this.uniformLocations.brightness,this.params.brightness||15e3),this.uniformLocations.blobiness&&this.gl.uniform1f(this.uniformLocations.blobiness,this.params.blobiness||2),this.uniformLocations.particles&&this.gl.uniform1f(this.uniformLocations.particles,this.params.particles||20),this.uniformLocations.scanlines&&this.gl.uniform1i(this.uniformLocations.scanlines,this.params.scanlines||!1),this.uniformLocations.energy&&this.gl.uniform1f(this.uniformLocations.energy,this.params.energy||.5),this.uniformLocations.millis&&this.gl.uniform1f(this.uniformLocations.millis,t),this.uniformLocations.timeScale&&this.gl.uniform1f(this.uniformLocations.timeScale,this.params.timeScale||.5),this.uniformLocations.themePrimary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themePrimary,this.themeColors.primary.r,this.themeColors.primary.g,this.themeColors.primary.b),this.uniformLocations.themeSecondary&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeSecondary,this.themeColors.secondary.r,this.themeColors.secondary.g,this.themeColors.secondary.b),this.uniformLocations.themeAccent&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeAccent,this.themeColors.accent.r,this.themeColors.accent.g,this.themeColors.accent.b),this.uniformLocations.themeDarkBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeDarkBlue,this.themeColors.darkBlue.r,this.themeColors.darkBlue.g,this.themeColors.darkBlue.b),this.uniformLocations.themeProjectBlue&&this.themeColors&&this.gl.uniform3f(this.uniformLocations.themeProjectBlue,this.themeColors.projectBlue.r,this.themeColors.projectBlue.g,this.themeColors.projectBlue.b),this.gl.drawArrays(this.gl.TRIANGLES,0,6)}getThemeColors(){const e=getComputedStyle(document.documentElement),t=i=>{const r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i);return r?{r:parseInt(r[1],16)/255,g:parseInt(r[2],16)/255,b:parseInt(r[3],16)/255}:{r:0,g:1,b:1}};try{const i=e.getPropertyValue("--theme-primary").trim()||"#00ffff",r=e.getPropertyValue("--theme-secondary").trim()||"#0080ff",o=e.getPropertyValue("--theme-accent").trim()||"#4dd0e1";return{primary:t(i),secondary:t(r),accent:t(o),darkBlue:t("#0A0A0F"),projectBlue:t("#1E40AF")}}catch(i){return console.warn("Failed to get theme colors, using defaults:",i),{primary:{r:0,g:1,b:1},secondary:{r:0,g:.5,b:1},accent:{r:.3,g:.82,b:.88},darkBlue:{r:.04,g:.04,b:.06},projectBlue:{r:.12,g:.25,b:.69}}}}}function wt(a,e={},t="BackgroundCanvas"){let i,r,o,h,l,j,k=0;const S=1e3/30,y=()=>{const p=getComputedStyle(document.documentElement),w=p.getPropertyValue("--theme-primary").trim(),L=p.getPropertyValue("--theme-background").trim(),T=[L?new A(L):new A("#0A0F0D"),w?new A(w):new A("#10B981"),w?new A(w).multiplyScalar(.6):new A("#0D9488")];return h&&h.colors&&(h.colors.value=T),T},c=()=>{o=new it(-1,1,1,-1,0,1),r=new Me;const p=new ot(2,2);h={time:{value:1},animationSpeed:{value:e.animationSpeed||.618},colors:{value:e.colors||y()}};const w=new He({uniforms:h,transparent:!0,vertexShader:`
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
            `}),L=new Le(p,w);r.add(L),i=new Te({canvas:a,antialias:!0}),i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight),j=K.registerResources(t,{renderer:i,scene:r,camera:o,geometry:p,material:w,mesh:L}),window.addEventListener("resize",v),u()},v=()=>{i.setSize(window.innerWidth,window.innerHeight)},u=()=>{l=requestAnimationFrame(u);const p=performance.now();p-k<S||(k=p,h.time.value=p/1e3*h.animationSpeed.value,i.render(r,o))},g=()=>{l&&cancelAnimationFrame(l),j&&K.cleanup(j),r&&r.children.forEach(p=>{p.geometry&&p.geometry.dispose(),p.material&&(Array.isArray(p.material)?p.material.forEach(w=>w.dispose()):p.material.dispose())}),i&&(i.dispose(),a!=null&&a.parentNode&&a.parentNode.removeChild(a)),window.removeEventListener("resize",v)};return c(),{stop:g,updateThemeColors:y}}class bt{constructor(e,t={},i="BackgroundCanvas"){this.canvas=e,this.componentId=i,this.renderer=null,this.scene=null,this.camera=null,this.fireball=null,this.trailParticles=[],this.animationFrameId=null,this.time=0,this.resourceId=null,this.sigma=10,this.rho=28,this.beta=8/3,this.x=.1,this.y=0,this.z=0,this.dt=.02,this.maxParticles=999,this.fireballColor=new A("#00FF88"),this.particleColors=[new A("#10B981"),new A("#00FF88"),new A("#34D399")],setTimeout(()=>{this.updateThemeColors()},100),this.trailPositions=[],this.trailColors=[],this.particleIndex=0,this.frameCount=0,this.lastFPSCheck=performance.now(),this.currentFPS=60;try{this.init()}catch(r){throw console.error("EffectLorenzAttractor: Failed to initialize Three.js",r),r}}init(){this.scene=new Me,this.scene.background=new A(2581),this.camera=new Be(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.set(0,0,48),this.camera.lookAt(0,0,0),this.renderer=new Te({canvas:this.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.renderer.setClearColor(2581,1),this.resourceId=K.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.composer=new nt(this.renderer);const e=new at(this.scene,this.camera);this.composer.addPass(e);const t=new lt(new Ne(this.canvas.width,this.canvas.height),.8,.2,.7);this.composer.addPass(t);const i=new ct;this.composer.addPass(i);const r=new _e(1.5,32,32),o=new Ae({color:new A("#ffaa33"),transparent:!0,opacity:.9,blending:je});this.fireball=new Le(r,o),this.scene.add(this.fireball);const h=new _e(2.5,32,32),l=new Ae({color:new A("#ff6611"),transparent:!0,opacity:.4,blending:je,side:ht});this.halo=new Le(h,l),this.scene.add(this.halo);const j=new Ge(4210752,.8);this.scene.add(j);const k=new Ie(16777215,1);k.position.set(50,50,50),this.scene.add(k);const m=new Ie(6724095,.8);m.position.set(-50,-50,50),this.scene.add(m),this.pointLight=new ve(35071,2,100),this.scene.add(this.pointLight),this.sunLight=new Ie(16775388,1.2),this.sunLight.position.set(80,60,40),this.sunLight.target.position.set(0,0,0),this.sunLight.castShadow=!1,this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),this.particleGeometry=new _e(.5,8,8),this.particleMaterial=new Ae({color:16777215,transparent:!0,opacity:1,blending:je,depthWrite:!1}),this.createParticleTexture(),this.instancedMesh=new dt(this.particleGeometry,this.particleMaterial,this.maxParticles),this.instancedMesh.geometry.attributes.color===void 0&&(this.instancedMesh.instanceColor=new ut(new Float32Array(this.maxParticles*3),3)),this.scene.add(this.instancedMesh);const S=new ze,y=new we,c=new we(0,0,0);this.colorInside=new A("#ffa575"),this.colorOutside=new A("#0088ff");for(let v=0;v<this.maxParticles;v++)S.compose(y,new De,c),this.instancedMesh.setMatrixAt(v,S),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(v,new A(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),window.addEventListener("resize",this.onResize.bind(this))}createParticleTexture(){const t=document.createElement("canvas");t.width=16,t.height=16;const i=t.getContext("2d"),r=16/2,o=i.createRadialGradient(r,r,0,r,r,r);o.addColorStop(0,"rgba(255, 255, 255, 0.6)"),o.addColorStop(.1,"rgba(255, 255, 255, 0.3)"),o.addColorStop(.3,"rgba(255, 255, 255, 0.1)"),o.addColorStop(1,"rgba(255, 255, 255, 0)"),i.fillStyle=o,i.beginPath(),i.arc(r,r,r*.8,0,Math.PI*2),i.fill(),this.particleTexture=new Ue(t)}getRandomParticleColor(){const e=Math.floor(Math.random()*this.particleColors.length);return this.particleColors[e]}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.frameCount++;const e=performance.now();e-this.lastFPSCheck>=1e3&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,this.currentFPS<30&&this.maxParticles>1e3?this.maxParticles=Math.max(1e3,this.maxParticles-100):this.currentFPS>50&&this.maxParticles<2e3&&(this.maxParticles=Math.min(2e3,this.maxParticles+50))),this.time+=.025;const t=this.sigma*(this.y-this.x)*this.dt,i=(this.x*(this.rho-this.z)-this.y)*this.dt,r=(this.x*this.y-this.beta*this.z)*this.dt;this.x+=t,this.y+=i,this.z+=r;const o=.8;this.fireball.position.set(this.x*o,this.y*o,this.z*o),this.halo.position.copy(this.fireball.position),this.halo.scale.setScalar(1+Math.sin(this.time*2)*.1),this.pointLight.position.copy(this.fireball.position),this.frameCount%2===0&&(this.trailPositions.push({x:this.x*o,y:this.y*o,z:this.z*o,life:1}),this.trailPositions.length>this.maxParticles&&this.trailPositions.shift());const h=new ze,l=new we,j=new De,k=new we;this.trailPositions.forEach((m,S)=>{const y=S/this.trailPositions.length,c=Math.sqrt(m.x*m.x+m.y*m.y+m.z*m.z),u=Math.min(c/40,1),g=(1-u*.5)*y*1.2+.3;if(l.set(m.x+(Math.random()-.5)*.08,m.y+(Math.random()-.5)*.08,m.z+(Math.random()-.5)*.08),k.set(g,g,g),h.compose(l,j,k),this.instancedMesh.setMatrixAt(S,h),this.instancedMesh.instanceColor){const p=Math.pow(1-u,2),w=new A;w.lerpColors(this.colorOutside,this.colorInside,p);const L=y*(1-u*.3);w.multiplyScalar(L),this.instancedMesh.setColorAt(S,w)}});for(let m=this.trailPositions.length;m<this.maxParticles;m++)k.set(0,0,0),h.compose(l,j,k),this.instancedMesh.setMatrixAt(m,h),this.instancedMesh.instanceColor&&this.instancedMesh.setColorAt(m,new A(0,0,0));this.instancedMesh.instanceMatrix.needsUpdate=!0,this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor.needsUpdate=!0),this.scene.rotation.y+=.005,this.scene.rotation.x+=.002,this.composer.render()}onResize(e,t){if(!this.renderer||!this.camera)return;const i=e||this.canvas.width,r=t||this.canvas.height;this.camera.aspect=i/r,this.camera.updateProjectionMatrix(),this.renderer.setSize(i,r,!1),this.composer&&this.composer.setSize(i,r)}updateThemeColors(){var e,t,i,r;if(!document.documentElement){console.warn("DOM not ready for theme color update");return}try{const o=getComputedStyle(document.documentElement),h=(e=o.getPropertyValue("--theme-primary"))==null?void 0:e.trim(),l=(t=o.getPropertyValue("--theme-secondary"))==null?void 0:t.trim(),j=(i=o.getPropertyValue("--theme-accent"))==null?void 0:i.trim();h&&(this.fireballColor.setStyle(h),this.particleColors[1].setStyle(h),this.colorOutside.setStyle(h)),l&&(this.particleColors[0].setStyle(l),this.colorInside.setStyle(l)),j&&this.particleColors[2].setStyle(j);const k=(r=o.getPropertyValue("--theme-background"))==null?void 0:r.trim();k&&this.scene&&(this.scene.background=new A(k),this.renderer&&this.renderer.setClearColor(new A(k),1)),this.fireball&&h&&this.fireball.material.color.setStyle(h),this.halo&&l&&this.halo.material.color.setStyle(l),this.pointLight&&h&&this.pointLight.color.setStyle(h),this.instancedMesh&&this.updateParticleColors()}catch(o){console.warn("Error updating theme colors:",o)}}updateParticleColors(){if(!this.instancedMesh||!this.instancedMesh.instanceColor)return;const e=this.instancedMesh.instanceColor.array;for(let t=0;t<this.trailPositions.length&&!(t>=this.maxParticles);t++){const i=t*3,r=this.trailPositions[t],o=this.colorInside.clone();o.lerp(this.colorOutside,1-r.life),e[i]=o.r,e[i+1]=o.g,e[i+2]=o.b}this.instancedMesh.instanceColor.needsUpdate=!0}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.composer&&(this.composer.dispose(),this.composer=null),this.renderer){const e=this.renderer.getContext();e&&e.getExtension("WEBGL_lose_context")&&e.getExtension("WEBGL_lose_context").loseContext(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.renderer=null}for(this.instancedMesh&&(this.scene.remove(this.instancedMesh),this.instancedMesh.geometry&&this.instancedMesh.geometry.dispose(),this.instancedMesh.material&&this.instancedMesh.material.dispose(),this.instancedMesh.instanceColor&&(this.instancedMesh.instanceColor=null),this.instancedMesh=null),this.fireball&&(this.scene.remove(this.fireball),this.fireball.geometry&&this.fireball.geometry.dispose(),this.fireball.material&&this.fireball.material.dispose(),this.fireball=null),this.halo&&(this.scene.remove(this.halo),this.halo.geometry&&this.halo.geometry.dispose(),this.halo.material&&this.halo.material.dispose(),this.halo=null),this.particleGeometry&&(this.particleGeometry.dispose(),this.particleGeometry=null),this.particleMaterial&&(this.particleMaterial.dispose(),this.particleMaterial=null),this.particleTexture&&(this.particleTexture.dispose(),this.particleTexture=null),this.trailPositions=[],this.trailColors=[],this.pointLight&&(this.scene.remove(this.pointLight),this.pointLight=null),this.sunLight&&(this.scene.remove(this.sunLight),this.scene.remove(this.sunLight.target),this.sunLight=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,this.resourceId&&(K.cleanup(this.resourceId),this.resourceId=null),window.removeEventListener("resize",this.onResize.bind(this))}}class xt{constructor(e,t={},i="BackgroundCanvas"){this.canvas=e,this.componentId=i,this.renderer=null,this.scene=null,this.camera=null,this.mesh=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.particleCount=t.particleCount||8e3,this.branches=3,this.radius=9,this.size=t.size||.12,this.colorInside=new A("#10B981"),this.colorOutside=new A("#34D399"),this.updateThemeColors();try{this.init()}catch(r){throw console.error("EffectChaos: Failed to initialize Three.js",r),r}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),i=e.getPropertyValue("--theme-accent").trim();t&&this.colorInside.setStyle(t),i&&this.colorOutside.setStyle(i);const r=e.getPropertyValue("--theme-background").trim();r&&this.scene&&(this.scene.background=new A(r)),this.mesh&&this.updateParticleColors(),this.updateLightColors()}updateLightColors(){this.lights&&(this.lights.central&&this.lights.central.color.copy(this.colorInside.clone().multiplyScalar(1.5)),this.lights.green&&this.lights.green.color.copy(this.colorInside),this.lights.ambient&&this.lights.ambient.color.copy(this.colorInside.clone().multiplyScalar(.3)),this.lights.fill1&&this.lights.fill1.color.copy(this.colorInside),this.lights.fill2&&this.lights.fill2.color.copy(this.colorOutside),this.lights.back&&this.lights.back.color.copy(this.colorOutside.clone().multiplyScalar(1.2)))}updateParticleColors(){if(!this.mesh||!this.particleData)return;const e=this.mesh.geometry.attributes.color.array;for(let t=0;t<this.particleCount;t++){const i=this.particleData[t],r=t*3,o=this.colorInside.clone();o.lerp(this.colorOutside,i.radiusRatio),e[r]=o.r,e[r+1]=o.g,e[r+2]=o.b}this.mesh.geometry.attributes.color.needsUpdate=!0}init(){this.camera=new Be(60,this.canvas.width/this.canvas.height,.1,100),this.camera.position.set(0,2,8),this.camera.lookAt(0,-2,0),this.scene=new Me,this.scene.background=new A(0),this.renderer=new Te({canvas:this.canvas,antialias:!1,powerPreference:"low-power",precision:"mediump"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=K.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.canvas.addEventListener("webglcontextlost",this.onContextLost.bind(this)),this.canvas.addEventListener("webglcontextrestored",this.onContextRestored.bind(this)),this.createGalaxy(),window.addEventListener("resize",this.onResize.bind(this))}createGalaxy(){const e=new Ve;this.positions=new Float32Array(this.particleCount*3),this.colors=new Float32Array(this.particleCount*3),this.particleData=[];for(let S=0;S<this.particleCount;S++){const y=Math.random(),c=Math.pow(y,1.5)*this.radius,u=Math.random()*Math.PI*2,g=Math.pow(Math.random()*2-1,3)*y*.2,p=Math.pow(Math.random()*2-1,3)*y*.05,w=Math.pow(Math.random()*2-1,3)*y*.2;this.particleData.push({radiusRatio:y,radius:c,branchAngle:u,randomX:g,randomY:p,randomZ:w});const L=Math.pow(1-y,2),T=this.colorInside.clone();T.lerp(this.colorOutside,1-L);const G=S*3;this.colors[G]=T.r,this.colors[G+1]=T.g,this.colors[G+2]=T.b}e.setAttribute("position",new Fe(this.positions,3)),e.setAttribute("color",new Fe(this.colors,3));const t=document.createElement("canvas");t.width=64,t.height=64;const i=t.getContext("2d"),r=i.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(255, 255, 255, 1)"),r.addColorStop(.4,"rgba(255, 255, 255, 0.8)"),r.addColorStop(1,"rgba(255, 255, 255, 0)"),i.fillStyle=r,i.fillRect(0,0,64,64);const o=new Ue(t),h=new Ye({size:this.size*2,sizeAttenuation:!0,depthWrite:!1,blending:je,vertexColors:!0,transparent:!0,opacity:.9,map:o,alphaTest:.05});this.mesh=new $e(e,h),this.scene.add(this.mesh),this.updatePositions(),this.centralLight=new ve(this.colorInside.clone().multiplyScalar(1.5),2.5,40),this.centralLight.position.set(0,-1,0),this.scene.add(this.centralLight);const l=new ve(this.colorInside,1.8,35);l.position.set(0,-1,0),this.scene.add(l),this.ambientLight=new Ge(this.colorInside.clone().multiplyScalar(.3),.4),this.scene.add(this.ambientLight);const j=new ve(this.colorInside,1.2,25);j.position.set(-5,0,5),this.scene.add(j);const k=new ve(this.colorOutside,1.2,25);k.position.set(5,0,5),this.scene.add(k);const m=new ve(this.colorOutside.clone().multiplyScalar(1.2),.8,50);m.position.set(0,2,-10),this.scene.add(m),this.lights={central:this.centralLight,green:l,ambient:this.ambientLight,fill1:j,fill2:k,back:m}}updatePositions(){for(let e=0;e<this.particleCount;e++){const t=this.particleData[e],i=e*3,r=t.branchAngle+this.time*(1-t.radiusRatio),o=Math.cos(r)*t.radius,h=Math.sin(r)*t.radius,l=-Math.abs(t.radius*.3);this.positions[i]=o+t.randomX,this.positions[i+1]=l+t.randomY-2,this.positions[i+2]=h+t.randomZ}this.mesh.geometry.attributes.position.needsUpdate=!0}start(){this.animate()}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.008,this.updatePositions(),this.renderer.render(this.scene,this.camera)}onResize(e,t){if(!this.renderer||!this.camera)return;const i=e||this.canvas.width,r=t||this.canvas.height;this.camera.aspect=i/r,this.camera.updateProjectionMatrix(),this.renderer.setSize(i,r,!1)}onContextLost(e){e.preventDefault(),console.warn("WebGL context lost. Attempting to restore..."),this.animationId=null,this.contextLost=!0}onContextRestored(){this.init(),this.start()}stop(){if(this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.renderer&&(this.renderer.dispose(),this.renderer=null),this.mesh&&this.scene&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null),this.scene&&this.scene.children)for(;this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}this.scene=null,this.camera=null,window.removeEventListener("resize",this.onResize.bind(this))}cleanup(){for(this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose(),this.mesh=null),this.geometry&&(this.geometry.dispose(),this.geometry=null),this.material&&(this.material.dispose(),this.material=null),this.texture&&(this.texture.dispose(),this.texture=null);this.scene.children.length>0;){const e=this.scene.children[0];this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose())}}destroy(){this.stop(),this.resourceId&&(K.cleanup(this.resourceId),this.resourceId=null)}}const yt=`
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
`,Ct=`
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
`;class St{constructor(e,t={},i="BackgroundCanvas"){this.canvas=e,this.componentId=i,this.renderer=null,this.scene=null,this.camera=null,this.animationFrameId=null,this.time=0,this.resourceId=null,this.waveSourceCount=t.waveSourceCount||6,this.maxRings=t.maxRings||8,this.waveSpeed=t.waveSpeed||1.2,this.ringSpacing=t.ringSpacing||45,this.maxRadius=t.maxRadius||400,this.waveColor=new A("#00ffff"),this.sourceColor=new A("#4dd0e1"),this.waveSources=[],this.waveRings=[],this.sourceGeometry=null,this.ringGeometries=[],this.sourceMaterial=null,this.ringMaterials=[],this.sourcePoints=null,this.ringMeshes=[],this.mouse=new Ne,this.lastRippleTime=0,this.rippleInterval=2e3,this.updateThemeColors();try{this.init()}catch(r){throw console.error("EffectRippleWaves: Failed to initialize Three.js",r),r}}updateThemeColors(){const e=getComputedStyle(document.documentElement),t=e.getPropertyValue("--theme-primary").trim(),i=e.getPropertyValue("--theme-accent").trim();t&&this.waveColor.setStyle(t),i&&this.sourceColor.setStyle(i),this.sourceMaterial&&this.sourceMaterial.color.copy(this.sourceColor),this.ringMeshes.forEach(r=>{r.userData.isShaderRipple&&r.material.uniforms?(r.material.uniforms.primaryColor.value.copy(this.waveColor),r.material.uniforms.accentColor.value.copy(this.sourceColor)):r.material.color&&r.material.color.copy(this.waveColor)})}init(){this.camera=new Be(75,this.canvas.width/this.canvas.height,.1,1e3),this.camera.position.z=400,this.scene=new Me,this.scene.background=new A(0),this.renderer=new Te({canvas:this.canvas,antialias:!0,alpha:!0}),this.renderer.setSize(this.canvas.width,this.canvas.height,!1),this.resourceId=K.registerResources(this.componentId,{renderer:this.renderer,scene:this.scene,camera:this.camera},{persistent:!0}),this.createWaveSources(),this.setupMouseInteraction(),setTimeout(()=>{this.waveSources.forEach((e,t)=>{setTimeout(()=>{this.createRipple(t,e.position)},t*300)})},100),window.addEventListener("resize",this.onResize.bind(this)),this.animate()}createWaveSources(){this.sourceGeometry=new Ve,this.sourceMaterial=new Ye({color:this.sourceColor,size:10,transparent:!0,opacity:0,sizeAttenuation:!0});const e=[];for(let t=0;t<this.waveSourceCount;t++){const i=t/this.waveSourceCount*Math.PI*2,r=100+Math.random()*50,o={position:new we(Math.cos(i)*r,Math.sin(i)*r,0),lastWaveTime:Date.now()+t*400,waveInterval:1800+Math.random()*600,pulsePhase:Math.random()*Math.PI*2,waves:[]};this.waveSources.push(o),e.push(o.position.x,o.position.y,o.position.z)}this.sourceGeometry.setAttribute("position",new mt(e,3)),this.sourcePoints=new $e(this.sourceGeometry,this.sourceMaterial)}createRipple(e,t){const i=this.waveSources[e],r={sourceIndex:e,position:t.clone(),radius:0,maxRadius:this.maxRadius,speed:this.waveSpeed,opacity:1,creationTime:Date.now(),startTime:this.time};i.waves.push(r);const o=new We(0,this.maxRadius,64,1),h=new He({uniforms:{time:{value:this.time},center:{value:new Ne(t.x,t.y)},waveRadius:{value:0},maxRadius:{value:this.maxRadius},primaryColor:{value:this.waveColor.clone()},accentColor:{value:this.sourceColor.clone()},opacity:{value:1}},vertexShader:yt,fragmentShader:Ct,transparent:!0,side:ft,blending:je,depthWrite:!1}),l=new Le(o,h);return l.position.copy(t),l.userData={wave:r,sourceIndex:e,isShaderRipple:!0},this.scene.add(l),this.ringMeshes.push(l),r}setupMouseInteraction(){const e=i=>{const r=this.canvas.getBoundingClientRect();this.mouse.x=(i.clientX-r.left)/r.width*2-1,this.mouse.y=-((i.clientY-r.top)/r.height)*2+1},t=i=>{e(i);const r=new we(this.mouse.x*300,this.mouse.y*200,0);let o=0,h=1/0;this.waveSources.forEach((l,j)=>{const k=l.position.distanceTo(r);k<h&&(h=k,o=j)}),this.createRipple(o,r)};this.canvas.addEventListener("click",t),window.addEventListener("mousemove",e)}animate(){this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.time+=.016;const e=Date.now();this.updateWaveSources(),this.generateAutoRipples(e),this.updateRipples(),this.cleanupExpiredRipples(),this.renderer.render(this.scene,this.camera)}updateWaveSources(){for(let e=0;e<this.waveSources.length;e++){const t=this.waveSources[e];t.pulsePhase+=.03}}generateAutoRipples(e){if(this.waveSources.forEach((t,i)=>{e-t.lastWaveTime>t.waveInterval&&(this.createRipple(i,t.position),t.lastWaveTime=e,t.waveInterval=1800+Math.random()*600)}),this.ringMeshes.length===0&&e>this.time*1e3+1e3){const t=Math.floor(Math.random()*this.waveSources.length);this.createRipple(t,this.waveSources[t].position)}}updateRipples(){this.ringMeshes.forEach(e=>{const t=e.userData.wave;if(!t)return;t.radius+=t.speed;const i=t.radius/t.maxRadius;if(t.opacity=Math.max(0,Math.sin((1-i)*Math.PI*.5)),e.userData.isShaderRipple&&e.material.uniforms){const r=e.material.uniforms;r.time.value=this.time,r.waveRadius.value=t.radius,r.opacity.value=t.opacity,r.primaryColor.value.copy(this.waveColor),r.accentColor.value.copy(this.sourceColor);const h=(this.time-t.startTime)*.5%(Math.PI*2)/(Math.PI*2),l=new A().setHSL(h,.8,.6);r.accentColor.value.lerp(l,.3)}else{const r=Math.max(0,t.radius-3),o=t.radius;e.geometry.dispose(),e.geometry=new We(r,o,32),e.material.opacity=t.opacity*.3}this.calculateInterference(t,e)})}calculateInterference(e,t){let i=0;if(this.ringMeshes.forEach(r=>{if(r===t)return;const o=r.userData.wave;if(!o)return;const h=e.position.distanceTo(o.position);Math.abs(e.radius-o.radius)<15&&h<e.radius+o.radius&&(i+=.4)}),t.userData.isShaderRipple&&t.material.uniforms){const r=t.material.uniforms.opacity.value;if(t.material.uniforms.opacity.value=Math.min(1,r+i),i>0){const o=this.waveColor.clone().multiplyScalar(1+i*.5);t.material.uniforms.primaryColor.value.lerp(o,.3)}}else t.material.opacity=Math.min(.8,t.material.opacity+i)}cleanupExpiredRipples(){for(let e=this.ringMeshes.length-1;e>=0;e--){const t=this.ringMeshes[e],i=t.userData.wave;if((!i||i.radius>i.maxRadius)&&(this.scene.remove(t),t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose(),this.ringMeshes.splice(e,1),i.sourceIndex!==void 0)){const r=this.waveSources[i.sourceIndex],o=r.waves.indexOf(i);o>-1&&r.waves.splice(o,1)}}}onResize(){!this.camera||!this.renderer||(this.camera.aspect=this.canvas.width/this.canvas.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.canvas.width,this.canvas.height,!1))}stop(){this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),window.removeEventListener("resize",this.onResize.bind(this)),this.ringMeshes.forEach(e=>{this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(e.material.uniforms&&Object.values(e.material.uniforms).forEach(t=>{t.value&&t.value.dispose&&t.value.dispose()}),e.material.dispose())}),this.sourceGeometry&&this.sourceGeometry.dispose(),this.sourceMaterial&&this.sourceMaterial.dispose(),this.resourceId&&(K.cleanup(this.resourceId),this.resourceId=null)}destroy(){this.stop()}}const qe=({effectType:a="effectfuse",sectionName:e="unknown"})=>{const t=n.useRef(null),i=n.useRef(null),r=n.useRef(null),o=n.useRef(null),h=be(l=>l.theme);return n.useEffect(()=>{r.current&&(clearTimeout(r.current),r.current=null);let l=t.current;if(!l){l=document.createElement("canvas"),l.style.position="fixed",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.zIndex="-1",l.style.pointerEvents="none",l.style.background="transparent";const S=window.innerWidth,y=window.innerHeight,c=1280,v=720,u=S/y;let g,p;u>c/v?(g=Math.min(c,S),p=Math.floor(g/u)):(p=Math.min(v,y),g=Math.floor(p*u)),g=Math.max(g,800),p=Math.max(p,600),l.width=g,l.height=p,document.body.appendChild(l),t.current=l}const j=()=>{var S;if(l)try{const y=window.innerWidth,c=window.innerHeight,v=1280,u=720,g=y/c;let p,w;g>v/u?(p=Math.min(v,y),w=Math.floor(p/g)):(w=Math.min(u,c),p=Math.floor(w*g)),p=Math.max(p,800),w=Math.max(w,600),l.width=p,l.height=w,(S=i.current)!=null&&S.onResize&&i.current.onResize(l.width,l.height)}catch(y){console.error("Error resizing canvas:",y)}};j(),(()=>{var y,c;if(i.current){const v=i.current;i.current=null,r.current=setTimeout(()=>{try{typeof v.stop=="function"?v.stop():typeof v.destroy=="function"&&v.destroy()}catch{}},200)}const S={brightness:.6,blobiness:1.5,particles:10,scanlines:!1,energy:1.01,timeScale:1};try{const v=`BackgroundCanvas_${e}`;switch(a){case"effectfuse":{i.current=new vt(l,S,v);break}case"effectmonjori":i.current=wt(l,S,v);break;case"effectheartbeats":i.current=new EffectHeartBeats(l,S,v);break;case"effectlorenz":{i.current=new bt(l,S,v);break}case"effectchaos":{const u={particleCount:2e3,branches:3,radius:9,spin:1,randomness:.15,randomnessPower:3,size:.12,colorInside:S.colorInside||"#fff8dc",colorOutside:S.colorOutside||"#ffa575"};i.current=new xt(l,u,v);break}case"effectripple":{const u={waveSourceCount:6,maxRings:8,waveSpeed:1.2,ringSpacing:45,maxRadius:400};i.current=new St(l,u,v);break}default:i.current=new EffectHeartBeats(l,S,v)}(y=i.current)!=null&&y.start&&i.current.start(),o.current=K.registerResources(v,{canvas:l,effect:i.current,effectType:a},{persistent:!1})}catch(v){if(console.error("Error creating background effect:",v),a==="effectfuse"||a==="effectlorenz"||a==="effectchaos")try{i.current=new EffectHeartBeats(l,S),(c=i.current)!=null&&c.start&&i.current.start()}catch(u){console.error("Error creating fallback effect:",u),i.current=null}else i.current=null}})();const m=st.debounce(j,250);return window.addEventListener("resize",m),()=>{if(window.removeEventListener("resize",m),r.current&&(clearTimeout(r.current),r.current=null),i.current)try{typeof i.current.stop=="function"?i.current.stop():typeof i.current.destroy=="function"&&i.current.destroy()}catch(S){console.error("Error cleaning up effect:",S)}finally{i.current=null}if(o.current?(K.cleanup(o.current),o.current=null):K.cleanupByComponent(`BackgroundCanvas_${e}`),l&&document.body.contains(l))try{document.body.removeChild(l)}catch(S){console.error("Error removing canvas:",S)}t.current=null,typeof window<"u"&&window.gc&&setTimeout(()=>window.gc(),100)}},[a,e]),n.useEffect(()=>{const l=["effectchaos","effectlorenz","effectheartbeats","effectmonjori","effectripple"];i.current&&i.current.updateThemeColors&&l.includes(a)&&i.current.updateThemeColors()},[h,a]),null};qe.propTypes={effectType:Z.string,sectionName:Z.string};const kt=n.lazy(()=>ge(()=>import("./home-CKsvCAIR.js").then(a=>a.H),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),jt=n.lazy(()=>ge(()=>import("./projects-BXd-DuHt.js").then(a=>a.P),__vite__mapDeps([11,1,2,3,4,12,13,5,0,6,7,8,9,10,14]))),Lt=n.lazy(()=>ge(()=>import("./gallery-AhK9jpxL.js").then(a=>a.G),__vite__mapDeps([9,1,2,3,4,6,5,8]))),Mt=n.lazy(()=>ge(()=>import("./EducationSection-BXCxGZp7.js"),__vite__mapDeps([15,1,2,3,4,5,0,6,7,8,9,10,11,12,13,14,16]))),Tt=n.lazy(()=>ge(()=>import("./ContactSection-DpSDfRR8.js"),__vite__mapDeps([17,1,2,3,4,5,11,12,13,0,6,7,8,9,10,14,18]))),Pt=n.lazy(()=>ge(()=>import("./about-CHDBX9pU.js").then(a=>a.A),__vite__mapDeps([5,1,2,3,4]))),Et=()=>{const{currentSection:a,sections:e,navigateToSection:t,navigateNext:i,navigatePrev:r,isScrolling:o,getCurrentSection:h,language:l,enableOpeningAnimation:j,isProjectModalOpen:k,isPointerLocked:m}=be(),S=n.useRef(null),y=n.useRef(null),c=h(),v=n.useRef(0),u=n.useRef(0),[g,p]=n.useState("slide"),[w,L]=n.useState(!1),[T,G]=n.useState({}),[C,E]=n.useState(!1),[U,ie]=n.useState(0),[Q,le]=n.useState(!1),[xe,ae]=n.useState("none"),[ue,oe]=n.useState(!1),I=n.useRef(),ne=n.useRef(),Y=n.useRef({x:0,y:0,time:0}),se=n.useRef(0),O=(c==null?void 0:c.id)==="home";n.useEffect(()=>{if(c!=null&&c.id){const d=c.id,b=setTimeout(()=>{K.cleanupOtherSections(`BackgroundCanvas_${d}`,["HeroCube"])},3e3);return()=>clearTimeout(b)}},[c==null?void 0:c.id]);const $=600,ye=200,ce=256,me=80,de=n.useCallback(()=>{console.log("触发指针锁定警告"),oe(!0),ne.current&&clearTimeout(ne.current),ne.current=setTimeout(()=>{console.log("自动关闭警告"),oe(!1)},3e3)},[]),fe=n.useCallback(d=>{if(o||k)return;const b=d.touches[0];Y.current={x:b.clientX,y:b.clientY,time:Date.now()},se.current=0},[o,k]),Ce=n.useCallback(d=>{if(o||k)return;const b=d.touches[0],x=b.clientY-Y.current.y,B=b.clientX-Y.current.x;if(!(Math.abs(B)>Math.abs(x))){if(se.current=Math.abs(x),m){se.current>=ye&&(se.current=0,de());return}if(O||!w&&g==="slide"){if(se.current>=ye){d.preventDefault();const R=x<0,H=x>0;se.current=0,R&&a<e.length-1?i():H&&a>0&&r()}return}if(g==="content"&&w&&!O){const R=y.current;if(!R)return;const H=R.scrollTop,z=R.scrollHeight-R.clientHeight,D=50,ee=H<=D,J=H>=z-D;if(se.current>=ye){const re=x<0,he=x>0;if(re&&J&&a<e.length-1){d.preventDefault(),se.current=0,i();return}else if(he&&ee&&a>0){d.preventDefault(),se.current=0,r();return}}return}}},[o,k,m,g,w,O,a,e.length,i,r,de]),P=n.useCallback(()=>{se.current=0},[]);n.useEffect(()=>{const d=new CustomEvent("scrollBounce",{detail:{isBouncing:Q,direction:xe,intensity:u.current/$}});window.dispatchEvent(d)},[Q,xe]);const _=n.useMemo(()=>({home:kt,about:Pt,projects:jt,gallery:Lt,education:Mt,contact:Tt}),[]),f=n.useCallback(()=>{if(!y.current)return;const d=y.current,b=d.getBoundingClientRect(),x=d.scrollHeight>b.height+10,B=window.innerWidth<768,R=["projects","education","about","contact"].includes(c==null?void 0:c.id);B&&R&&!x&&setTimeout(()=>{if(y.current){const z=y.current.getBoundingClientRect(),D=y.current.scrollHeight>z.height+10;L(D),p(O?"slide":D?"content":"slide")}},500),L(x),p(O?"slide":x?"content":"slide")},[O,c]),N=n.useCallback((d,b=.5)=>{I.current&&clearTimeout(I.current),ae(d),le(!0);const x=30,B=Math.min(b*x,x),R=d==="up"?-B:B;ie(R),E(!0),I.current=setTimeout(()=>{E(!1),ie(0),setTimeout(()=>{le(!1),ae("none")},300)},150)},[]),F=n.useCallback(()=>{I.current&&clearTimeout(I.current),I.current=setTimeout(()=>{C&&u.current<$&&(E(!1),ie(0),u.current=0)},150)},[C]),q=n.useCallback(d=>{if(g!=="content"){const b=d.deltaY>0?1:-1,x=b>0&&a>=e.length-1,B=b<0&&a<=0;let R=1;(x||B)&&(R=.5);const H=Math.min(u.current/$,1),z=x||B?15:me,D=b*H*z*R;if(C||E(!0),ie(D),x||B){const ee=Math.min(u.current/$,1),J=x?"down":"up";return I.current&&clearTimeout(I.current),I.current=setTimeout(()=>{N(J,ee)},100),!0}else return F(),!1}return!1},[g,a,e.length,C,F,N]),W=n.useCallback(()=>{if(u.current=0,E(!1),ie(0),le(!1),ae("none"),I.current&&clearTimeout(I.current),y.current){const d=c==null?void 0:c.id;if(d==="home"){const x=y.current;x.style.transform="translateY(0)",x.style.transition="none",x.scrollTop=0,requestAnimationFrame(()=>{x&&(x.offsetHeight,x.style.transition="")});return}(T[d]!==void 0?T[d]==="bottom":!!(w&&(c==null?void 0:c.previousDirection)==="from-next"))?requestAnimationFrame(()=>{if(y.current){const x=y.current.scrollHeight-y.current.clientHeight;y.current.scrollTop=x}}):y.current.scrollTop=0}},[c,w,T]),M=n.useCallback(d=>{const b=Date.now();if(o||k)return;if(m){const z=Math.abs(d.deltaY);u.current+=z,u.current>=$&&(u.current=0,de());return}if(g==="content"&&w&&!O){const z=y.current;if(!z)return;const D=z.scrollTop,ee=z.scrollHeight-z.clientHeight,J=d.deltaY>0,re=d.deltaY<0,he=50;if(J)if(D>=ee-he){if(b-v.current>ce&&(u.current=0),v.current=b,u.current<$){if(u.current+=Math.abs(d.deltaY),D>=ee-5){const Se=Math.min(u.current/$,1);N("down",Se)}u.current>=$&&a<e.length-1&&(u.current=0,i());return}}else{u.current=0;return}else if(re)if(D<=he){if(b-v.current>ce&&(u.current=0),v.current=b,u.current<$){if(u.current+=Math.abs(d.deltaY),D<=5){const Se=Math.min(u.current/$,1);N("up",Se)}u.current>=$&&a>0&&(u.current=0,r());return}}else{u.current=0;return}return}(O||!w&&g==="slide")&&d.preventDefault(),b-v.current>ce&&(C?F():(u.current=0,E(!1),ie(0))),v.current=b;const x=Math.abs(d.deltaY);u.current+=x;const B=y.current;if(B&&g==="content"&&w){const z=c==null?void 0:c.id;if(z){const D=B.scrollTop,ee=B.scrollHeight-B.clientHeight,J=D>=ee-10?"bottom":D<=10?"top":"middle";T[z]!==J&&G(re=>({...re,[z]:J}))}}if(g!=="content"&&q(d)||u.current<$||(u.current=0,E(!1),ie(0),!B))return;const R=d.deltaY>0,H=d.deltaY<0;R&&a<e.length-1?i():H&&a>0&&r()},[o,k,g,w,O,a,e.length,i,r,c,C,T,G,E,ie,N,q,F,m,de]),V=n.useCallback(d=>{if(m){console.log("🔒 指针锁定模式下阻止键盘导航:",d.key);return}if(o||k)return;const b=y.current;switch(d.key){case"ArrowDown":if(d.preventDefault(),g==="content"&&w&&!O&&b){const x=b.scrollHeight-b.clientHeight;if(b.scrollTop>=x-10)a<e.length-1&&i();else{const B=Math.min(b.scrollTop+100,x);b.scrollTop=B}}else a<e.length-1&&i();break;case"ArrowUp":if(d.preventDefault(),g==="content"&&w&&!O&&b)if(b.scrollTop<=10)a>0&&r();else{const x=Math.max(b.scrollTop-100,0);b.scrollTop=x}else a>0&&r();break;case"PageDown":case" ":d.preventDefault(),a<e.length-1&&i();break;case"PageUp":d.preventDefault(),a>0&&r();break;case"Home":d.preventDefault(),g==="content"&&!O&&b?b.scrollTop=0:t(0);break;case"End":if(d.preventDefault(),g==="content"&&!O&&b){const x=b.scrollHeight-b.clientHeight;b.scrollTop=x}else t(e.length-1);break;default:{const x=parseInt(d.key);x>=1&&x<=e.length&&(d.preventDefault(),t(x-1));break}}},[o,k,m,g,w,O,a,e.length,i,r,t]);n.useEffect(()=>{E(!1),ie(0),le(!1),ae("none"),u.current=0,I.current&&clearTimeout(I.current);const d=setTimeout(()=>{W(),f()},50);return()=>{clearTimeout(d)}},[a,W,f]),n.useEffect(()=>{f();const d=window.innerWidth<768,b=["projects","education","about","contact"].includes(c==null?void 0:c.id);if(d&&b){const x=[50,100,200,300,500,800,1200].map(z=>setTimeout(()=>{f()},z)),B=()=>x.forEach(z=>clearTimeout(z)),R=()=>{setTimeout(()=>{f()},50)},H=y.current;return H&&H.querySelectorAll("img").forEach(D=>{D.complete?R():(D.addEventListener("load",R,{once:!0}),D.addEventListener("error",R,{once:!0}))}),()=>{B(),H&&H.querySelectorAll("img").forEach(D=>{D.removeEventListener("load",R),D.removeEventListener("error",R)})}}else{const x=setTimeout(()=>{f()},50),B=setTimeout(()=>{f()},150),R=setTimeout(()=>{f()},300);return()=>{clearTimeout(x),clearTimeout(B),clearTimeout(R)}}},[a,f,c]),n.useEffect(()=>{const d=S.current;let b;const x=()=>{b&&clearTimeout(b),b=setTimeout(()=>{f()},100)};if(d)return d.addEventListener("wheel",M,{passive:!1}),d.addEventListener("touchstart",fe,{passive:!1}),d.addEventListener("touchmove",Ce,{passive:!1}),d.addEventListener("touchend",P,{passive:!1}),document.addEventListener("keydown",V),window.addEventListener("resize",x),()=>{d.removeEventListener("wheel",M),d.removeEventListener("touchstart",fe),d.removeEventListener("touchmove",Ce),d.removeEventListener("touchend",P),document.removeEventListener("keydown",V),window.removeEventListener("resize",x),I.current&&clearTimeout(I.current),b&&clearTimeout(b)}},[M,fe,Ce,P,V,f]);const X=()=>{if(!c)return null;const d=_[c.id];return d?s.jsx(n.Suspense,{fallback:s.jsx("div",{className:"flex items-center justify-center h-full",children:s.jsx("div",{className:"text-white text-xl",children:"Loading..."})}),children:s.jsx(d,{section:c,language:l,...c.id==="home"?{sections:e,onSectionChange:t,enableOpeningAnimation:j}:{}})}):null};return s.jsxs("div",{ref:S,className:"relative w-full m-0 p-0 h-screen",style:{overflow:"hidden",height:"var(--vh-fallback, 100vh)",minHeight:"100dvh"},children:[(c==null?void 0:c.backgroundEffect)&&s.jsx(qe,{effectType:c.backgroundEffect,sectionName:c.id||"unknown"}),s.jsx("div",{ref:y,className:`absolute inset-0 z-20 smooth-scroll scroll-mode-transition ${O?"scroll-mode-home overflow-hidden":w?"scroll-mode-auto overflow-y-auto":"overflow-hidden"} ${Q?"bouncing":""}`,style:{transform:C&&!Q?`translateY(${U}px)`:"translateY(0)",transition:o||C&&!Q?"none":Q?"transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)":"transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",willChange:o||C||Q?"transform":"auto"},children:X()}),o&&s.jsx("div",{className:"fixed inset-0 bg-black/20 z-30 transition-opacity duration-300"}),ue&&s.jsx("div",{className:"fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 cursor-pointer",onClick:()=>{console.log("用户点击关闭警告"),oe(!1),ne.current&&clearTimeout(ne.current)},children:s.jsxs("div",{className:"bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20 max-w-sm text-center shadow-2xl",children:[s.jsx("div",{className:"flex items-center justify-center mb-4",children:s.jsx("svg",{className:"w-8 h-8 text-white/70",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M9 3h6l-3 2.25M12 5.25V7.5m0 0l3-2.25M12 7.5l-3-2.25M6 18h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"})})}),s.jsxs("div",{className:"text-center mb-4",children:[s.jsx("p",{className:"text-xl font-semibold text-white mb-2 leading-relaxed",children:l==="zh"?s.jsxs(s.Fragment,{children:["请先按 ",s.jsx("span",{className:"inline-flex items-center px-2 py-1 mx-1 bg-white/20 rounded text-sm font-mono border border-white/30",children:"ESC"})," 键"]}):s.jsxs(s.Fragment,{children:["Press ",s.jsx("span",{className:"inline-flex items-center px-2 py-1 mx-1 bg-white/20 rounded text-sm font-mono border border-white/30",children:"ESC"})," to exit"]})}),s.jsx("p",{className:"text-sm text-white/70 leading-relaxed",children:l==="zh"?"退出长廊后再翻页":"corridor before navigating"})]})]})})]})},Rt=()=>{const{getThemeColors:a}=Oe(),e=a(),[t,i]=n.useState({x:0,y:0}),[r,o]=n.useState(!1),[h,l]=n.useState("none"),[j,k]=n.useState(!1),[m,S]=n.useState(0),[y,c]=n.useState(0),[v,u]=n.useState(0),[g,p]=n.useState(0),[w,L]=n.useState(!1),[T,G]=n.useState(0),[C,E]=n.useState(null),[U,ie]=n.useState(!1),{currentSection:Q,sections:le,isPointerLocked:xe}=be(),ae=n.useRef(),ue=n.useRef(0),oe=n.useRef(),I=n.useRef(),ne=n.useRef(null),Y=n.useRef(new WeakMap),se=n.useRef({currentScrollDelta:0,animatedValue:0,isAnimatingDown:!1,scrollIntensity:0});n.useEffect(()=>{se.current={currentScrollDelta:v,animatedValue:g,isAnimatingDown:w,scrollIntensity:m}},[v,g,w,m]);const O=n.useCallback((P,_)=>{const f=document.elementFromPoint(P,_);if(!f)return!1;if(Y.current.has(f))return Y.current.get(f);const N=["a","button","input","select","textarea","[onclick]",'[role="button"]','[role="link"]','[role="menuitem"]','[tabindex]:not([tabindex="-1"])',".clickable",".btn",".button",".cursor-pointer","summary","label",'[data-clickable="true"]'],F=["canvas","svg","img","video",".hero-cube",".effect-avatar",".lorenz-attractor",'[data-no-custom-cursor="true"]','[style*="pointer-events: none"]','[style*="pointerEvents: none"]',".h-screen.w-screen",".overflow-hidden",".background-container",".bg-container"];if(f.hasAttribute("data-no-custom-cursor")||f.hasAttribute("data-hero-cube-canvas")||f.classList.contains("hero-cube-canvas"))return Y.current.set(f,!1),!1;const q=window.getComputedStyle(f);if(q.pointerEvents==="none"||q.cursor==="none"&&(f.classList.contains("h-screen")||f.classList.contains("w-screen")||f.classList.contains("overflow-hidden")))return Y.current.set(f,!1),!1;if(f.tagName.toLowerCase()==="canvas"){const X=f.parentElement;if(X&&(X.classList.contains("hero-cube")||X.hasAttribute("data-hero-cube")||X.style.pointerEvents==="none"||f.style.pointerEvents==="none"))return Y.current.set(f,!1),!1}let W=!1,M=f,V=0;for(;M&&M!==document.body&&V<5;){if(F.some(d=>{try{return M.matches(d)}catch{return!1}})){W=!1;break}if(M.tagName.toLowerCase()==="div"){const d=window.getComputedStyle(M),b=M.classList;if(d.cursor==="none"&&(b.contains("h-screen")||b.contains("w-screen"))){W=!1;break}const x=["h-screen","w-screen","overflow-hidden","relative","absolute","fixed"];if(Array.from(b).every(R=>x.includes(R)||R.startsWith("bg-")||R.startsWith("backdrop-"))&&d.cursor==="none"){W=!1;break}}if(N.some(d=>{try{return M.matches(d)}catch{return!1}})){W=!0;break}if(window.getComputedStyle(M).cursor==="pointer"){const d=M.tagName.toLowerCase();if(!["canvas","svg","img","video"].includes(d)&&(M.hasAttribute("onclick")||M.hasAttribute("role")||M.hasAttribute("tabindex")||M.classList.contains("clickable")||M.classList.contains("btn")||M.classList.contains("button")||["a","button","input","select","textarea"].includes(d))){W=!0;break}}if(M.onclick||M.getAttribute("data-testid")||M.classList.contains("cursor-pointer")){W=!0;break}M=M.parentElement,V++}if(Y.current.set(f,W),Y.current.size>100){const X=Array.from(Y.current.entries());Y.current.clear(),X.slice(-50).forEach(([d,b])=>{Y.current.set(d,b)})}return W},[]),$=n.useCallback(()=>{const P=Q>0,_=Q<le.length-1;return P&&_?"both":P?"up":_?"down":"none"},[Q,le.length]),ye=n.useCallback(()=>{const P=Q>0,_=Q<le.length-1;ne.current||(ne.current=document.querySelector(".scroll-mode-auto"));const f=ne.current;let N=!1,F=!0,q=!0;return f&&(N=f.scrollHeight>f.clientHeight+10,F=f.scrollTop<=5,q=f.scrollTop>=f.scrollHeight-f.clientHeight-5),{isTopBoundary:!P&&(!N||F),isBottomBoundary:!_&&(!N||q),hasNowhereToGo:!P&&!_&&!N,hasContentToScroll:N}},[Q,le.length]);n.useCallback(()=>{I.current&&(cancelAnimationFrame(I.current),I.current=null),L(!0);const P=Math.abs(v);if(P===0){L(!1),p(0),u(0),S(0);return}const _=performance.now(),f=Math.min(P*2,600),N=()=>{const q=performance.now()-_,W=Math.min(q/f,1),M=1-Math.pow(1-W,4),V=Math.round(P*(1-M));p(V),W<1?I.current=requestAnimationFrame(N):(p(0),u(0),L(!1),setTimeout(()=>{S(0),E(null),setTimeout(()=>{p(0),u(0)},100)},50),I.current=null)};I.current=requestAnimationFrame(N)},[v]),n.useEffect(()=>{l($())},[$]);const ce=n.useCallback(P=>{const _=P.deltaY,f=Math.min(Math.abs(_)/30,1),N=Math.abs(_);let F=1;N<10?F=2:N<30?F=1.5:N>100&&(F=.8);const q=Math.min(f*F,1),W=_>0?"down":"up",M=performance.now();if(M-(ce.lastTime||0)<4)return;ce.lastTime=M,I.current&&(cancelAnimationFrame(I.current),I.current=null),L(!1),S(q),E(W),G(M);const V=Math.round(_);u(V),p(V),c(X=>{const d=X+V;return Math.max(-9999,Math.min(9999,d))}),oe.current&&(clearTimeout(oe.current),oe.current=null),oe.current=setTimeout(()=>{u(0),p(0),S(0),L(!1),oe.current=null},100)},[]),me=n.useCallback(P=>{const _=performance.now();if(_-(me.lastTime||0)<8)return;me.lastTime=_,i({x:P.clientX,y:P.clientY});const f=O(P.clientX,P.clientY);ie(f),r||o(!0)},[r,O]),de=n.useCallback(()=>{o(!0),k(!0)},[]),fe=n.useCallback(()=>{o(!1),k(!1)},[]);n.useEffect(()=>{let P=0;const _=()=>{const f=performance.now();if(f-(_.lastTime||0)<16){ae.current=requestAnimationFrame(_);return}if(_.lastTime=f,j?ue.current=Math.min(ue.current+.12,1):ue.current=Math.max(ue.current-.08,.3),f-T>30){const F=Math.max(m-.05,0);f-P>32&&F!==m&&(S(F),P=f)}ae.current=requestAnimationFrame(_)};return ae.current=requestAnimationFrame(_),()=>{ae.current&&cancelAnimationFrame(ae.current)}},[j,T,m,y]),n.useEffect(()=>{const P=document.body.style.cursor;return U?document.body.style.cursor="auto":document.body.style.cursor="none",()=>{document.body.style.cursor=P,ne.current&&(ne.current=null),ue.current=.3}},[U]),n.useEffect(()=>(document.addEventListener("mousemove",me),document.addEventListener("mouseenter",de),document.addEventListener("mouseleave",fe),document.addEventListener("wheel",ce,{passive:!0}),()=>{document.removeEventListener("mousemove",me),document.removeEventListener("mouseenter",de),document.removeEventListener("mouseleave",fe),document.removeEventListener("wheel",ce),oe.current&&clearTimeout(oe.current),I.current&&cancelAnimationFrame(I.current)}),[me,de,fe,ce]),n.useEffect(()=>{if(!w&&v!==0&&m===0){const P=setTimeout(()=>{u(0),p(0),E(null)},1500);return()=>clearTimeout(P)}},[w,v,m]);const Ce=()=>{const _=j?1.02:1,f=133*_,N=ye(),F=N.isTopBoundary&&C==="up"&&m>0||N.isBottomBoundary&&C==="down"&&m>0||N.hasNowhereToGo&&m>0,q=J=>{const re=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(J);return re?[parseInt(re[1],16),parseInt(re[2],16),parseInt(re[3],16)]:[255,255,255]},W=()=>F&&m>0?"#ff4444":e.primary,M=()=>F&&m>0?"#ff4444":e.accent,V=W(),X=M(),d=()=>{const J=w?g:v;return J===0?null:Math.abs(J).toString()},b=()=>C==="down"?"translate3d(24px, 0, 0)":C==="up"?"translate3d(-24px, 0, 0)":"translate3d(0, 0, 0)",x=d(),B=b(),R=x!==null&&(m>0||Math.abs(v)>0||w||Math.abs(g)>0),H=.2,z=5,D={width:`${f}px`,height:`${f}px`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",transform:"translate3d(0, 0, 0)",willChange:"transform"},ee=(J,re=1)=>{const he=256*_,Se=J==="up"?"M12 22L12 2M10 4L12 2L14 4":"M12 2L12 22M10 20L12 22L14 20",Qe=(()=>{if(m===0)return e.primary;if(F){const te=[255,68,68],pe=[180,20,20],Pe=Math.round(te[0]+(pe[0]-te[0])*m),Ee=Math.round(te[1]+(pe[1]-te[1])*m),Re=Math.round(te[2]+(pe[2]-te[2])*m);return`rgb(${Pe}, ${Ee}, ${Re})`}else{const te=q(e.accent),pe=q(e.secondary),Pe=Math.round(te[0]+(pe[0]-te[0])*m),Ee=Math.round(te[1]+(pe[1]-te[1])*m),Re=Math.round(te[2]+(pe[2]-te[2])*m);return`rgb(${Pe}, ${Ee}, ${Re})`}})();return s.jsx("div",{style:{position:"absolute",width:`${he}px`,height:`${he}px`,display:"flex",alignItems:"center",justifyContent:"center",opacity:re*.8,zIndex:10,transform:"translate3d(0, 0, 0)",willChange:"opacity"},children:s.jsx("svg",{width:he,height:he,viewBox:"0 0 24 24",style:{shapeRendering:"geometricPrecision",vectorEffect:"non-scaling-stroke"},children:s.jsx("path",{d:Se,stroke:Qe,strokeWidth:H,strokeLinecap:"round",strokeLinejoin:"round",fill:"none",opacity:.8,style:{transition:"stroke 0.1s ease-out",willChange:"stroke"}})})})};return s.jsxs("div",{style:D,children:[s.jsxs("svg",{width:f,height:f,style:{position:"absolute",transform:C==="up"?"rotate(90deg)":"rotate(-90deg)",transition:"transform 0.2s ease-out"},children:[s.jsx("circle",{cx:f/2,cy:f/2,r:(f-4)/2,fill:"none",stroke:V,strokeWidth:H,opacity:"0.8"}),m>0&&s.jsx("circle",{cx:f/2,cy:f/2,r:(f-4)/2,fill:"none",stroke:X,strokeWidth:z,strokeLinecap:"round",opacity:"0.9",strokeDasharray:`${2*Math.PI*((f-4)/2)}`,strokeDashoffset:`${2*Math.PI*((f-4)/2)*(1-m)}`,style:{transition:"stroke-dashoffset 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94)",willChange:"stroke-dashoffset"}})]}),R&&s.jsx("div",{style:{position:"absolute",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"600",fontFamily:'Monaco, "SF Mono", "Consolas", monospace',color:X,opacity:.95,zIndex:15,textShadow:`0 0 6px ${X}40`,transform:B,willChange:"opacity, transform",minWidth:"32px",textAlign:"center",transition:w?"none":"all 0.2s ease-out"},children:s.jsx("span",{className:"scroll-value",style:{transform:w?"scale(0.95)":"scale(1)",transition:"transform 0.15s ease-out"},children:x})}),h==="up"&&ee("up"),h==="down"&&ee("down"),h==="both"&&s.jsxs(s.Fragment,{children:[ee("up",.7),ee("down",.7)]}),h==="none"&&m===0&&s.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:V,opacity:.8,transform:"translate3d(0, 0, 0)"}}),s.jsx("div",{style:{position:"absolute",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:"var(--theme-primary)",opacity:.9,zIndex:20,transform:"translate3d(0, 0, 0)",willChange:"transform",boxShadow:"0 0 6px var(--theme-primary)"}})]})};return r?s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
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
                
                .power-cursor {
                    position: fixed;
                    pointer-events: none; /* 不阻挡鼠标事件 */
                    z-index: 9999; /* 最高层级 */
                    mix-blend-mode: screen; /* 视觉混合模式 */
                    ${xe?"display: none !important;":""} /* 3D模式时隐藏 */
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
                    ${xe?"display: none !important;":""} /* 3D模式时隐藏 */
                }
                
                /* 移动设备适配：在触摸设备上隐藏光标 */
                @media (hover: none) and (pointer: coarse) {
                    .power-cursor, .clickable-hint {
                        display: none !important;
                    }
                }
            `}),U&&s.jsx("div",{className:"clickable-hint",style:{left:t.x,top:t.y}}),s.jsx("div",{className:`power-cursor ${j?"hovering":""} ${U?"over-clickable":""}`,style:{left:t.x,top:t.y,transform:"translate3d(-50%, -50%, 0)",willChange:"transform"},children:Ce()})]}):null},Xe=({language:a="en"})=>{const[e,t]=n.useState(navigator.onLine),[i,r]=n.useState(!1);n.useEffect(()=>{const k=()=>{t(!0),r(!0),setTimeout(()=>r(!1),2e3)},m=()=>{t(!1),r(!0)};return window.addEventListener("online",k),window.addEventListener("offline",m),navigator.onLine||r(!0),()=>{window.removeEventListener("online",k),window.removeEventListener("offline",m)}},[]);const o=()=>e?{title:a==="zh"?"网络连接已恢复":"Network Reconnected",message:a==="zh"?"所有功能恢复正常":"All features are now working",icon:s.jsx("svg",{className:"w-6 h-6 text-green-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})})}:{title:a==="zh"?"网络连接中断":"Network Disconnected",message:a==="zh"?"部分功能可能无法正常使用，请检查网络连接":"Some features may not work properly. Please check your connection.",icon:s.jsx("svg",{className:"w-6 h-6 text-red-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"})})};if(!i)return null;const{title:h,message:l,icon:j}=o();return s.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center pointer-events-none",children:s.jsx("div",{className:`transition-all duration-300 transform ${i?"scale-100 opacity-100":"scale-95 opacity-0"} pointer-events-auto`,children:s.jsx("div",{className:"bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 rounded-lg p-4 shadow-2xl",children:s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsx("div",{className:"flex-shrink-0",children:j}),s.jsxs("div",{className:"text-white",children:[s.jsx("div",{className:"font-medium text-sm",children:h}),s.jsx("div",{className:"text-zinc-300 text-xs mt-1",children:l})]}),s.jsx("button",{onClick:()=>r(!1),className:"text-zinc-400 hover:text-zinc-200 text-sm ml-4 transition-colors","aria-label":"关闭",children:s.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})})]})})})})};Xe.propTypes={language:Z.string};const _t=()=>{const{currentSection:a}=be(),t=a===0?0:a/5*100;return s.jsx("div",{className:"fixed top-0 left-0 right-0 z-40 h-[5px]",children:s.jsx("div",{className:`w-full h-full transition-opacity duration-300 ${a===0?"bg-transparent":"bg-white/20"}`,children:s.jsx("div",{className:"h-full transition-all duration-700 ease-out",style:{width:`${t}%`,backgroundColor:"var(--theme-primary)"}})})})};class Je extends et.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e,t){console.error("ErrorBoundary caught an error:",e,t),this.setState({error:e,errorInfo:t})}render(){return this.state.hasError?s.jsx("div",{className:"min-h-screen flex items-center justify-center bg-theme-background",children:s.jsxs("div",{className:"max-w-md w-full bg-theme-surface shadow-lg rounded-lg p-6",children:[s.jsxs("div",{className:"flex items-center mb-4",children:[s.jsx("div",{className:"flex-shrink-0",children:s.jsx("svg",{className:"h-8 w-8 text-red-500",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.102 16.5c-.77.833.192 2.5 1.732 2.5z"})})}),s.jsx("div",{className:"ml-3",children:s.jsx("h3",{className:"text-lg font-medium text-gray-900 dark:text-white",children:"应用程序遇到错误"})})]}),s.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300 mb-4",children:"抱歉，应用程序遇到了一个意外错误。请刷新页面重试。"}),!1,s.jsx("div",{className:"mt-6",children:s.jsx("button",{onClick:()=>window.location.reload(),className:"w-full bg-theme-primary hover:bg-theme-primary/80 text-theme-background font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200",children:"刷新页面"})})]})}):this.props.children}}Je.propTypes={children:Z.node.isRequired};const Ze=({visible:a,onToggle:e})=>{const[t,i]=n.useState("memory"),[r,o]=n.useState(null),[h,l]=n.useState(null),[j,k]=n.useState({}),[m,S]=n.useState(!1),y=n.useRef(0),c=n.useRef(0),v=n.useRef(performance.now()),{currentSection:u,sections:g,getCurrentSection:p}=be();if(n.useEffect(()=>{let C;const E=()=>{c.current++;const U=performance.now();U-v.current>=1e3&&(y.current=Math.round(c.current*1e3/(U-v.current)),c.current=0,v.current=U),C=requestAnimationFrame(E)};return E(),()=>{C&&cancelAnimationFrame(C)}},[]),n.useEffect(()=>{if(!a)return;const C=()=>{performance.memory&&o({used:Math.round(performance.memory.usedJSHeapSize/1024/1024),total:Math.round(performance.memory.totalJSHeapSize/1024/1024),limit:Math.round(performance.memory.jsHeapSizeLimit/1024/1024)});const U=K.getMemoryInfo();l(U),k({fps:y.current})};C();const E=setInterval(C,500);return()=>clearInterval(E)},[a]),!a)return null;const w=[{id:"memory",label:"Memory"},{id:"webgl",label:"WebGL"},{id:"sections",label:"Sections"}],L=()=>s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent backdrop-blur-md border border-blue-400/30 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/20",children:[s.jsx("div",{className:"text-blue-300 font-semibold text-xs mb-1",children:"JS Heap Used"}),s.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.used)||0," MB"]}),s.jsxs("div",{className:"text-blue-200/70 text-xs",children:[r?Math.round(r.used/r.limit*100):0,"% of limit"]})]}),s.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 shadow-lg ring-1 ring-emerald-400/20",children:[s.jsx("div",{className:"text-emerald-300 font-semibold text-xs mb-1",children:"JS Heap Total"}),s.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.total)||0," MB"]}),s.jsx("div",{className:"text-emerald-200/70 text-xs",children:"Allocated"})]})]}),s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent backdrop-blur-md border border-yellow-400/30 rounded-xl p-3 shadow-lg ring-1 ring-yellow-400/20",children:[s.jsx("div",{className:"text-yellow-300 font-semibold text-xs mb-1",children:"JS Heap Limit"}),s.jsxs("div",{className:"text-lg font-mono text-white font-bold",children:[(r==null?void 0:r.limit)||0," MB"]}),s.jsx("div",{className:"text-yellow-200/70 text-xs",children:"Browser limit"})]}),s.jsxs("div",{className:"bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-md border border-purple-400/30 rounded-xl p-3 shadow-lg ring-1 ring-purple-400/20",children:[s.jsx("div",{className:"text-purple-300 font-semibold text-xs mb-1",children:"FPS"}),s.jsx("div",{className:"text-lg font-mono text-white font-bold",children:j.fps||0}),s.jsx("div",{className:"text-purple-200/70 text-xs",children:"frames/sec"})]})]})]}),T=()=>s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-3 shadow-lg ring-1 ring-cyan-400/20",children:[s.jsx("div",{className:"text-cyan-300 font-semibold text-xs mb-1",children:"Active Groups"}),s.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(h==null?void 0:h.activeResourceGroups)||0}),s.jsx("div",{className:"text-cyan-200/70 text-xs",children:"Resource groups"})]}),s.jsxs("div",{className:"bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-orange-400/30 rounded-xl p-3 shadow-lg ring-1 ring-orange-400/20",children:[s.jsx("div",{className:"text-orange-300 font-semibold text-xs mb-1",children:"Persistent"}),s.jsx("div",{className:"text-lg font-mono text-white font-bold",children:(h==null?void 0:h.persistentResources)||0}),s.jsx("div",{className:"text-orange-200/70 text-xs",children:"Persistent resources"})]})]}),(h==null?void 0:h.resourceStats)&&s.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[s.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Resource Breakdown"]}),s.jsx("div",{className:"grid grid-cols-2 gap-2 text-xs",children:Object.entries(h.resourceStats).map(([C,E])=>s.jsxs("div",{className:"flex justify-between items-center bg-white/5 rounded-lg px-2 py-1.5 border border-white/10",children:[s.jsxs("span",{className:"capitalize text-gray-300",children:[C.replace(/([A-Z])/g," $1").trim(),":"]}),s.jsx("span",{className:"font-mono text-white font-semibold bg-emerald-500/20 px-2 py-0.5 rounded",children:E})]},C))})]}),(h==null?void 0:h.sectionBreakdown)&&Object.keys(h.sectionBreakdown).length>0&&s.jsxs("div",{className:"bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent backdrop-blur-md border border-violet-400/25 rounded-xl p-4 shadow-lg ring-1 ring-violet-400/15",children:[s.jsxs("div",{className:"text-violet-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"}),"Section Resources"]}),s.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:Object.entries(h.sectionBreakdown).map(([C,E])=>s.jsxs("div",{className:"bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-3 rounded-lg backdrop-blur-sm",children:[s.jsxs("div",{className:"flex items-center justify-between mb-2",children:[s.jsx("div",{className:"font-medium text-white text-sm",children:C.replace("BackgroundCanvas_","").replace("HeroCube","HomeCube").replace("EffectAvatar_","Avatar-")}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:"bg-blue-500/30 text-blue-200 px-2 py-1 rounded-md text-xs font-mono border border-blue-400/30",children:E.count}),E.persistent>0&&s.jsxs("span",{className:"bg-green-500/30 text-green-200 px-2 py-1 rounded-md text-xs font-mono border border-green-400/30",children:["P:",E.persistent]})]})]}),s.jsxs("div",{className:"text-xs text-gray-400",children:["Last active: ",new Date(E.lastActive).toLocaleTimeString()]})]},C))})]}),s.jsxs("div",{className:"bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent backdrop-blur-md border border-blue-400/25 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/15",children:[s.jsx("div",{className:"text-blue-300 font-semibold text-sm mb-2",children:"Memory Usage"}),s.jsxs("div",{className:"text-xs text-blue-200/70",children:["JS Heap: ",(h==null?void 0:h.jsHeapSize)||0,"MB / ",(h==null?void 0:h.jsHeapLimit)||0,"MB"]})]})]}),G=()=>{const C=p();return s.jsxs("div",{className:"space-y-4",children:[s.jsxs("div",{className:"bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-4 shadow-lg ring-1 ring-cyan-400/20",children:[s.jsxs("div",{className:"text-cyan-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"}),"Current Section"]}),s.jsx("div",{className:"text-white text-lg font-bold mb-2",children:(C==null?void 0:C.title)||(C==null?void 0:C.id)||"Unknown"}),s.jsxs("div",{className:"space-y-1 text-xs",children:[s.jsxs("div",{className:"text-cyan-200/70",children:["Section ",u+1," of ",g.length]}),(C==null?void 0:C.backgroundEffect)&&s.jsxs("div",{className:"text-cyan-200/90 bg-cyan-500/20 px-2 py-1 rounded-md border border-cyan-400/30 inline-block",children:["Effect: ",C.backgroundEffect]})]})]}),s.jsxs("div",{className:"bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15",children:[s.jsxs("div",{className:"text-emerald-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"}),"Section Navigation"]}),s.jsx("div",{className:"space-y-2 max-h-40 overflow-y-auto custom-scrollbar",children:g.map((E,U)=>s.jsxs("div",{className:`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${U===u?"bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-blue-200 border-blue-400/40 shadow-lg":"bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"}`,children:[s.jsx("span",{className:"truncate text-sm font-medium",children:E.title||E.id}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("span",{className:`w-2 h-2 rounded-full ${U===u?"bg-blue-400 animate-pulse":"bg-gray-500"}`}),s.jsx("span",{className:"text-xs font-mono bg-white/10 px-1 py-0.5 rounded",children:U+1})]})]},E.id))})]}),s.jsxs("div",{className:"bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent backdrop-blur-md border border-purple-400/25 rounded-xl p-4 shadow-lg ring-1 ring-purple-400/15",children:[s.jsxs("div",{className:"text-purple-300 font-semibold mb-3 text-sm flex items-center",children:[s.jsx("span",{className:"w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"}),"Performance Snapshot"]}),s.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[s.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[s.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"FPS"}),s.jsx("div",{className:"font-mono text-white font-bold text-lg",children:j.fps||0})]}),s.jsxs("div",{className:"bg-white/5 rounded-lg px-3 py-2 border border-white/10",children:[s.jsx("div",{className:"text-xs text-gray-400 mb-1",children:"WebGL Groups"}),s.jsx("div",{className:"font-mono text-white font-bold text-lg",children:(h==null?void 0:h.activeResourceGroups)||0})]})]})]})]})};return s.jsx("div",{className:`fixed top-4 right-4 z-[9999] transition-all duration-500 ease-out ${m?"w-12 h-12":"w-96 max-h-[600px]"}`,children:s.jsxs("div",{className:"bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-mono text-xs shadow-2xl shadow-black/20 ring-1 ring-white/20 overflow-hidden",children:[s.jsxs("div",{className:"flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent border-b border-white/20 backdrop-blur-sm",children:[!m&&s.jsxs("div",{className:"flex items-center space-x-3",children:[s.jsxs("div",{className:"relative",children:[s.jsx("div",{className:"w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"}),s.jsx("div",{className:"absolute inset-0 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"})]}),s.jsx("span",{className:"text-emerald-300 font-semibold text-sm tracking-wide",children:"Performance Monitor"})]}),s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("button",{onClick:()=>S(!m),className:"w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40",title:m?"Expand Panel":"Collapse Panel",children:m?"📊":"➖"}),s.jsx("button",{onClick:e,className:"w-7 h-7 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50",title:"Close Panel (Ctrl+M)",children:"✕"})]})]}),!m&&s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"flex bg-white/5 backdrop-blur-sm border-b border-white/10",children:w.map(C=>s.jsxs("button",{onClick:()=>i(C.id),className:`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden ${t===C.id?"bg-gradient-to-b from-blue-500/30 to-blue-600/20 text-blue-200 shadow-lg":"text-gray-400 hover:text-white hover:bg-white/10"}`,children:[t===C.id&&s.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"}),C.label]},C.id))}),s.jsxs("div",{className:"p-4 max-h-96 overflow-y-auto custom-scrollbar",children:[t==="memory"&&L(),t==="webgl"&&T(),t==="sections"&&G()]}),s.jsx("div",{className:"p-3 bg-gradient-to-t from-white/10 to-transparent border-t border-white/20 backdrop-blur-sm",children:s.jsxs("div",{className:"text-center text-gray-400",children:[s.jsx("span",{className:"text-xs",children:"Press "}),s.jsx("kbd",{className:"inline-flex items-center px-2 py-1 bg-white/20 rounded-md text-xs font-mono border border-white/30 shadow-inner",children:"Ctrl+M"}),s.jsx("span",{className:"text-xs",children:" to toggle"})]})})]})]})})};Ze.propTypes={visible:Z.bool.isRequired,onToggle:Z.func.isRequired};const Ke=({children:a,language:e="en"})=>{const[t,i]=n.useState(!1),[r,o]=n.useState([]),[h,l]=n.useState(0),j=n.useRef(null),k=async c=>{try{if(c&&c.match(/\.(mp4|webm|mov|avi|mkv)$/i))return{width:1920,height:1080,aspectRatio:16/9};if(c&&c.includes("/gallery/")){const u=c.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{const p=await(await fetch("/precomputed-dimensions.json")).json();if(p.gallery&&p.gallery[u]){const w=p.gallery[u];return{width:w.width,height:w.height,aspectRatio:w.aspectRatio}}}catch{}}let v=c;if(c&&c.includes("/gallery/")&&c.endsWith(".jpg")){const u=c.split("/").pop().replace(/\.(jpg|jpeg|png|webp|avif)$/i,"");try{v=await gt.getOptimalPath(u,"gallery")}catch{}}return new Promise(u=>{const g=new Image;g.onload=()=>{u({width:g.naturalWidth,height:g.naturalHeight,aspectRatio:g.naturalWidth/g.naturalHeight})},g.onerror=()=>{if(v!==c){const p=new Image;p.onload=()=>{u({width:p.naturalWidth,height:p.naturalHeight,aspectRatio:p.naturalWidth/p.naturalHeight})},p.onerror=()=>{u({width:1200,height:800,aspectRatio:1.5})},p.crossOrigin="anonymous",p.src=c}else u({width:1200,height:800,aspectRatio:1.5})},g.crossOrigin="anonymous",g.src=v})}catch{return{width:1200,height:800,aspectRatio:1.5}}},y={isOpen:t,images:r,initialIndex:h,openPhotoSwipe:async(c,v=0)=>{if(!c||c.length===0)return;o(c),l(v),i(!0);const u=c.map(g=>k(g.src||g.original));try{const g=await Promise.all(u),p=c.map((L,T)=>({src:L.src||L.original,width:g[T].width,height:g[T].height,alt:L.alt||L.title||`Image ${T+1}`,caption:L.caption,title:L.title,description:L.description}));j.current&&j.current.destroy();const w=new rt({dataSource:p,index:v,pswpModule:()=>ge(()=>import("./vendor-RxfllKF0.js").then(L=>L.f),__vite__mapDeps([2,3,4])),bgOpacity:.95,spacing:.1,loop:!0,zoom:!0,showAnimationDuration:300,hideAnimationDuration:300,showHideAnimationType:"zoom",allowMouseDrag:!0,allowPanToNext:!0,allowSwipeToClose:!0,wheelToZoom:!0,imageClickAction:"close",tapAction:"close",doubleTapAction:"zoom",closeTitle:e==="zh"?"关闭":"Close",zoomTitle:e==="zh"?"缩放":"Zoom",arrowPrevTitle:e==="zh"?"上一张":"Previous",arrowNextTitle:e==="zh"?"下一张":"Next",errorMsg:e==="zh"?"图片无法加载":"The image cannot be loaded",pinchToClose:!0,closeOnVerticalDrag:!0,returnFocus:!1,padding:{top:40,bottom:40,left:20,right:20},preload:[1,2]});w.on("close",()=>{i(!1),o([]),l(0)}),w.on("uiRegister",()=>{w.pswp.ui.registerElement({name:"custom-counter",className:"pswp__custom-counter",appendTo:"top-bar",onInit:(L,T)=>{const G=()=>{L.textContent=`${T.currIndex+1} / ${T.getNumItems()}`};T.on("change",G),T.on("afterInit",G)}}),w.pswp.ui.registerElement({name:"download-button",className:"pswp__download-button",appendTo:"bar",onInit:(L,T)=>{L.innerHTML=`
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            `,L.title=e==="zh"?"下载图片":"Download image",L.onclick=()=>{const G=p[T.currIndex];if(G){const C=document.createElement("a");C.href=G.src,C.download=`image_${T.currIndex+1}.jpg`,C.click()}}}})}),w.init(),w.loadAndOpen(v),j.current=w}catch(g){console.error("Error loading images for PhotoSwipe:",g),i(!1)}},closePhotoSwipe:()=>{j.current&&j.current.close()}};return s.jsxs(pt.Provider,{value:y,children:[a,s.jsx("style",{children:`
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
      `})]})};Ke.propTypes={children:Z.node.isRequired,language:Z.string};Z.string.isRequired,Z.string,Z.string,Z.string,Z.string,Z.node,Z.array;const At=()=>{const[a,e]=n.useState(!1),t=!1,i=n.useCallback(()=>{},[t]),r=n.useCallback(()=>{e(!1)},[]),o=n.useCallback(()=>{},[t]);return n.useEffect(()=>{},[t,a,i,r]),t?{isVisible:a,toggle:i,hide:r,show:o,isDev:t}:{isVisible:!1,toggle:()=>{},hide:()=>{},show:()=>{},isDev:!1}},It=()=>{const a=At(),{language:e}=be();return Oe(),s.jsx(Je,{children:s.jsx(Ke,{children:s.jsxs("div",{className:"App min-h-screen",children:[s.jsx(_t,{}),s.jsx(Xe,{language:e}),s.jsx(Rt,{}),s.jsx(Et,{}),a.isDev&&s.jsx(Ze,{visible:a.isVisible,onToggle:a.toggle})]})})})};function ke(){const a=window.innerHeight*.01;document.documentElement.style.setProperty("--vh",`${a}px`),document.documentElement.style.setProperty("--vh-fallback",`${window.innerHeight}px`),CSS.supports("height","100dvh")||document.documentElement.style.setProperty("--dvh-fallback",`${window.innerHeight}px`)}function Nt(){ke();let a;if(window.addEventListener("resize",()=>{clearTimeout(a),a=setTimeout(ke,100)}),screen.orientation?screen.orientation.addEventListener("change",()=>{setTimeout(ke,200)}):window.addEventListener("orientationchange",()=>{setTimeout(ke,200)}),/iPhone|iPad|iPod/.test(navigator.userAgent)){let e;window.addEventListener("scroll",()=>{clearTimeout(e),e=setTimeout(ke,150)},{passive:!0})}}Nt();tt.createRoot(document.getElementById("root")).render(s.jsx(n.StrictMode,{children:s.jsx(It,{})}));
