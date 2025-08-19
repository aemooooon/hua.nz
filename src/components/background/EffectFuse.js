import webglResourceManager from "../../utils/WebGLResourceManager";

export class EffectFuse {
    constructor(canvas, params = {}, componentId = 'BackgroundCanvas') {

        this.canvas = canvas;
        this.componentId = componentId;
        this.componentId = componentId;
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.error('EffectFuse: Unable to get WebGL context');
            throw new Error('WebGL not supported');
        }
        
        // 注册WebGL资源（原生WebGL上下文）- 使用传入的componentId
        this.resourceId = webglResourceManager.registerResources(this.componentId, {
            gl: this.gl,
            canvas: this.canvas
        });
        
        // 设置默认参数 - 平衡粒子大小和可见性
        this.params = {
            brightness: 1.8,    // 原始亮度值
            blobiness: 1.3,     // 适中的粘性值，平衡均匀性和可见性 (1.2 -> 1.3)
            particles: 16,      // 增加粒子数量从10到16
            scanlines: false,
            energy: 1.25,       // 原始能量值
            timeScale: 1.1,     // 原始时间缩放
            ...params
        };
        
        this.program = null;
        this.animationFrameId = null;
        this.startTime = performance.now();
        this.uniformLocations = {};
        
        // 获取主题颜色
        this.themeColors = this.getThemeColors();
        
        try {
            this.initGL();

        } catch (error) {
            console.error('EffectFuse: Failed to initialize WebGL', error);
            throw error;
        }
    }

    initGL() {
        if (!this.gl) {
            console.error('WebGL not supported.');
            return;
        }
        
        // 设置视口
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        
        this.gl.getExtension('OES_texture_float');

        const vertexShaderSource = `
            #ifdef GL_ES
            precision mediump float;
            #endif

            uniform vec2 u_resolution;
            attribute vec2 a_position;

            void main() {
                gl_Position = vec4(a_position, 0, 1);
            }
        `;

        const fragmentShaderSource = `
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
        `;

        const vertShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this.createProgram(vertShader, fragShader);

        this.uniformLocations = {
            resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
            brightness: this.gl.getUniformLocation(this.program, 'u_brightness'),
            blobiness: this.gl.getUniformLocation(this.program, 'u_blobiness'),
            particles: this.gl.getUniformLocation(this.program, 'u_particles'),
            scanlines: this.gl.getUniformLocation(this.program, 'u_scanlines'),
            energy: this.gl.getUniformLocation(this.program, 'u_energy'),
            millis: this.gl.getUniformLocation(this.program, 'u_millis'),
            timeScale: this.gl.getUniformLocation(this.program, 'u_timeScale'),
            themePrimary: this.gl.getUniformLocation(this.program, 'u_theme_primary'),
            themeSecondary: this.gl.getUniformLocation(this.program, 'u_theme_secondary'),
            themeAccent: this.gl.getUniformLocation(this.program, 'u_theme_accent'),
            themeDarkBlue: this.gl.getUniformLocation(this.program, 'u_theme_dark_blue'),
            themeProjectBlue: this.gl.getUniformLocation(this.program, 'u_theme_project_blue'),
        };

        this.setupBuffers();
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', this.gl.getShaderInfoLog(shader));
            console.error('Shader source:', source);
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error(this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    setupBuffers() {
        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0,
        ]), this.gl.STATIC_DRAW);

        const positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    start() {
        
        this.startTime = performance.now();
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.render();
    }

    stop() {
        // 停止动画循环
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        // 清理WebGL资源管理器中的资源
        if (this.resourceId) {
            webglResourceManager.cleanup(this.resourceId);
            this.resourceId = null;
        }

        // 释放 WebGL 资源
        if (this.gl) {
            try {
                if (this.program) {
                    this.gl.deleteProgram(this.program);
                    this.program = null;
                }
                if (this.positionBuffer) {
                    this.gl.deleteBuffer(this.positionBuffer);
                    this.positionBuffer = null;
                }
                
                // 不强制丢失上下文，让它自然清理
            } catch (error) {
                console.error('Error cleaning up WebGL resources:', error);
            }
        }

        // 清理引用
        this.gl = null;
        this.canvas = null;
        this.uniformLocations = {};
    }

    onResize(width, height) {
        if (!this.gl) return;
        if (this.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
            this.gl.viewport(0, 0, width, height);

            requestAnimationFrame(() => {
                if (this.gl) {
                    this.render();
                }
            });
        }
    }

    render() {
        if (!this.gl || !this.program || !this.params) return;
        
        this.animationFrameId = requestAnimationFrame(this.render.bind(this));

        const currentTime = performance.now();
        const timeDelta = currentTime - this.startTime;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.useProgram(this.program);

        // 确保所有uniform location存在
        if (this.uniformLocations.resolution) {
            this.gl.uniform2f(this.uniformLocations.resolution, this.canvas.width, this.canvas.height);
        }
        if (this.uniformLocations.brightness) {
            this.gl.uniform1f(this.uniformLocations.brightness, this.params.brightness || 15000);
        }
        if (this.uniformLocations.blobiness) {
            this.gl.uniform1f(this.uniformLocations.blobiness, this.params.blobiness || 2.0);
        }
        if (this.uniformLocations.particles) {
            this.gl.uniform1f(this.uniformLocations.particles, this.params.particles || 20);
        }
        if (this.uniformLocations.scanlines) {
            this.gl.uniform1i(this.uniformLocations.scanlines, this.params.scanlines || false);
        }
        if (this.uniformLocations.energy) {
            this.gl.uniform1f(this.uniformLocations.energy, this.params.energy || 0.5);
        }
        if (this.uniformLocations.millis) {
            this.gl.uniform1f(this.uniformLocations.millis, timeDelta);
        }
        if (this.uniformLocations.timeScale) {
            this.gl.uniform1f(this.uniformLocations.timeScale, this.params.timeScale || 0.5);
        }
        
        // 设置主题颜色 uniforms
        if (this.uniformLocations.themePrimary && this.themeColors) {
            this.gl.uniform3f(this.uniformLocations.themePrimary, 
                this.themeColors.primary.r, this.themeColors.primary.g, this.themeColors.primary.b);
        }
        if (this.uniformLocations.themeSecondary && this.themeColors) {
            this.gl.uniform3f(this.uniformLocations.themeSecondary, 
                this.themeColors.secondary.r, this.themeColors.secondary.g, this.themeColors.secondary.b);
        }
        if (this.uniformLocations.themeAccent && this.themeColors) {
            this.gl.uniform3f(this.uniformLocations.themeAccent, 
                this.themeColors.accent.r, this.themeColors.accent.g, this.themeColors.accent.b);
        }
        if (this.uniformLocations.themeDarkBlue && this.themeColors) {
            this.gl.uniform3f(this.uniformLocations.themeDarkBlue, 
                this.themeColors.darkBlue.r, this.themeColors.darkBlue.g, this.themeColors.darkBlue.b);
        }
        if (this.uniformLocations.themeProjectBlue && this.themeColors) {
            this.gl.uniform3f(this.uniformLocations.themeProjectBlue, 
                this.themeColors.projectBlue.r, this.themeColors.projectBlue.g, this.themeColors.projectBlue.b);
        }

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
    
    getThemeColors() {
        // 从CSS自定义属性获取主题颜色
        const rootStyles = getComputedStyle(document.documentElement);
        
        // 辅助函数：将十六进制颜色转换为归一化的RGB值
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16) / 255,
                g: parseInt(result[2], 16) / 255,
                b: parseInt(result[3], 16) / 255
            } : {r: 0, g: 1, b: 1}; // 默认青色
        };
        
        try {
            // 获取CSS变量
            const primaryColor = rootStyles.getPropertyValue('--theme-primary').trim() || '#00ffff';
            const secondaryColor = rootStyles.getPropertyValue('--theme-secondary').trim() || '#0080ff';
            const accentColor = rootStyles.getPropertyValue('--theme-accent').trim() || '#4dd0e1';
            
            // 添加深色系颜色
            const darkBlueColor = '#0A0A0F';       // 深蓝黑背景色
            const projectBlueColor = '#1E40AF';    // 项目页面使用的深蓝色
            
            return {
                primary: hexToRgb(primaryColor),
                secondary: hexToRgb(secondaryColor),
                accent: hexToRgb(accentColor),
                darkBlue: hexToRgb(darkBlueColor),
                projectBlue: hexToRgb(projectBlueColor)
            };
        } catch (error) {
            console.warn('Failed to get theme colors, using defaults:', error);
            // 返回默认颜色（归一化的RGB值）
            return {
                primary: {r: 0, g: 1, b: 1},         // #00ffff
                secondary: {r: 0, g: 0.5, b: 1},     // #0080ff 
                accent: {r: 0.3, g: 0.82, b: 0.88},  // #4dd0e1
                darkBlue: {r: 0.04, g: 0.04, b: 0.06}, // #0A0A0F
                projectBlue: {r: 0.12, g: 0.25, b: 0.69} // #1E40AF
            };
        }
    }
}
