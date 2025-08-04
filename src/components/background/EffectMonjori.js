import * as THREE from "three";
import webglResourceManager from "../../utils/WebGLResourceManager";

export function EffectMonjori(canvas, params = {}) {
    let renderer, scene, camera, uniforms, animationFrameId, resourceId;
    let lastFrameTime = 0;
    const fps = 30;
    const frameInterval = 1000 / fps;

    const init = () => {
        // Create camera and scene
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        scene = new THREE.Scene();

        // Plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Uniforms with customizable parameters
        uniforms = {
            time: { value: 1.0 },
            animationSpeed: { value: params.animationSpeed || 0.618 },
            colors: {
                value: params.colors || [
                    new THREE.Color('#311599'), // 深紫色 - 与首页EffectChaos的紫色一致
                    new THREE.Color('#6366f1'), // 中紫色 - 过渡色
                    new THREE.Color('#8b5cf6'), // 浅紫色 - 完成紫色系渐变
                ],
            },
        };

        // Shader material
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            transparent: true, // 启用透明度支持
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4( position, 1.0 );
                }
            `,
            fragmentShader: `
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
            `,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Renderer
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        // 注册WebGL资源
        resourceId = webglResourceManager.registerResources('BackgroundCanvas', {
            renderer,
            scene,
            camera,
            geometry,
            material,
            mesh
        });

        window.addEventListener("resize", onWindowResize);

        animate();
    };

    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const now = performance.now();
        if (now - lastFrameTime < frameInterval) return;
        lastFrameTime = now;

        uniforms["time"].value = (now / 1000) * uniforms["animationSpeed"].value;
        renderer.render(scene, camera);
    };

    const stop = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        
        // 清理WebGL资源管理器中的资源
        if (resourceId) {
            webglResourceManager.cleanup(resourceId);
        }
        
        // 清理Three.js资源
        if (scene) {
            scene.children.forEach(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => material.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        }
        
        if (renderer) {
            renderer.dispose();
            // 不强制丢失上下文，让它自然清理
            if (canvas?.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }
        window.removeEventListener("resize", onWindowResize);
    };

    init();

    return { stop };
}
