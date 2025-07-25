export class EffectFuse {
    constructor(canvas, params = {}) {

        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.error('EffectFuse: Unable to get WebGL context');
            throw new Error('WebGL not supported');
        }
        
        // 设置默认参数 - 使用原始参数值
        this.params = {
            brightness: 0.6,    // 原始亮度值
            blobiness: 1.5,     // 原始粘性值
            particles: 10,      // 原始粒子数量
            scanlines: false,
            energy: 1.01,       // 原始能量值
            timeScale: 1.0,     // 原始时间缩放
            ...params
        };
        
        this.program = null;
        this.animationFrameId = null;
        this.startTime = performance.now();
        this.uniformLocations = {};
        
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
                        pos.x += sin(t * na) * cos(t * nb) * tan(t * na * 0.15) * 0.3; // 原始的复杂运动
                        pos.y += tan(t * nc) * sin(t * nd) * 0.1; // 原始的Y轴运动

                        d = pow(1.6 * na / length(pos - position), u_blobiness); // 原始的距离计算

                        if (i < limit * 0.3333) a += d;
                        else if (i < limit * 0.6666) b += d;
                        else c += d;

                        n += step;
                    }
                }

                // 原始的颜色计算
                vec3 col = vec3(a * c, b * c, a * b) * 0.0001 * u_brightness;
                
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
                
                // 清理 WebGL 上下文
                const ext = this.gl.getExtension('WEBGL_lose_context');
                if (ext) {
                    ext.loseContext();
                }
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

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}
