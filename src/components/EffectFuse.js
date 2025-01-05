export class EffectFuse {
    constructor(canvas, params) {
        this.canvas = canvas;
        this.gl = this.canvas.getContext('webgl');
        this.params = params;
        this.program = null;
        this.animationFrameId = null;
        this.startTime = performance.now();
        this.initGL();
    }

    initGL() {
        if (!this.gl) {
            console.error('WebGL not supported.');
            return;
        }
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
                vec2 position = (gl_FragCoord.xy / u_resolution.x);
                float t = (u_millis * 0.001 * u_energy) * u_timeScale; 

                float a = 0.0;
                float b = 0.0;
                float c = 0.0;

                vec2 pos, center = vec2(0.5, 0.5 * (u_resolution.y / u_resolution.x));

                float na, nb, nc, nd, d;
                float limit = u_particles / 40.0;
                float step = 1.0 / u_particles;
                float n = 0.0;

                for (float i = 0.0; i <= 1.0; i += 0.025) {
                    if (i <= limit) {
                        vec2 np = vec2(n, 1-1);

                        na = noise(np * 1.1);
                        nb = noise(np * 2.8);
                        nc = noise(np * 0.7);
                        nd = noise(np * 3.2);

                        pos = center;
                        pos.x += sin(t * na) * cos(t * nb) * tan(t * na * 0.15) * 0.3;
                        pos.y += tan(t * nc) * sin(t * nd) * 0.1;

                        d = pow(1.6 * na / length(pos - position), u_blobiness);

                        if (i < limit * 0.3333) a += d;
                        else if (i < limit * 0.6666) b += d;
                        else c += d;

                        n += step;
                    }
                }

                vec3 col = vec3(a * c, b * c, a * b) * 0.0001 * u_brightness;

                if (u_scanlines) {
                    col -= mod(gl_FragCoord.y, 2.0) < 1.0 ? 0.5 : 0.0;
                }

                gl_FragColor = vec4(col, 1.0);
            }
        `;

        const vertShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this.createProgram(vertShader, fragShader);

        this.setupBuffers();
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));
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
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
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
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    start() {
        this.startTime = performance.now();
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.render();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    onResize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height); 
    }

    render() {
        this.animationFrameId = requestAnimationFrame(this.render.bind(this));

        const currentTime = performance.now();
        const timeDelta = currentTime - this.startTime;

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.useProgram(this.program);

        const resolutionUniformLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
        const brightnessUniformLocation = this.gl.getUniformLocation(this.program, 'u_brightness');
        const blobinessUniformLocation = this.gl.getUniformLocation(this.program, 'u_blobiness');
        const particlesUniformLocation = this.gl.getUniformLocation(this.program, 'u_particles');
        const scanlinesUniformLocation = this.gl.getUniformLocation(this.program, 'u_scanlines');
        const energyUniformLocation = this.gl.getUniformLocation(this.program, 'u_energy');
        const millisUniformLocation = this.gl.getUniformLocation(this.program, 'u_millis');
        const timeScaleUniformLocation = this.gl.getUniformLocation(this.program, 'u_timeScale');

        this.gl.uniform2f(resolutionUniformLocation, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(brightnessUniformLocation, this.params.brightness);
        this.gl.uniform1f(blobinessUniformLocation, this.params.blobiness);
        this.gl.uniform1f(particlesUniformLocation, this.params.particles);
        this.gl.uniform1i(scanlinesUniformLocation, this.params.scanlines);
        this.gl.uniform1f(energyUniformLocation, this.params.energy);
        this.gl.uniform1f(millisUniformLocation, timeDelta);
        this.gl.uniform1f(timeScaleUniformLocation, 0.5);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}
