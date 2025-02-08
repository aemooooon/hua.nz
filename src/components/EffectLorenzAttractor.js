import * as THREE from "three";

export class EffectLorenzAttractor {
    constructor(canvas, params = {}) {
        this.canvas = canvas;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.fireball = null;
        this.trailParticles = []; // 用于存储小球
        this.animationFrameId = null;
        this.time = 0;

        // Animation parameters
        this.sigma = 10;
        this.rho = 28;
        this.beta = 8 / 3;
        this.x = 0.1;
        this.y = 0;
        this.z = 0;
        this.dt = 0.005;
        this.maxParticles = 888; // 最大小球数量

        // Custom parameters
        this.fireballColor = params.fireballColor || new THREE.Color(0xff4500);
        this.particleColors = params.particleColors || [
            new THREE.Color(0xff0000),
            new THREE.Color(0x00ff00),
            new THREE.Color(0x0000ff),
        ];

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050505);

        this.camera = new THREE.PerspectiveCamera(30, this.canvas.width / this.canvas.height, 1, 10000);
        this.camera.position.z = 1290;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;

        // Fireball
        const fireballGeometry = new THREE.SphereGeometry(10, 64, 64);
        const fireballMaterial = new THREE.MeshPhongMaterial({
            color: this.fireballColor,
            emissive: this.fireballColor,
            emissiveIntensity: 1,
            shininess: 100,
        });

        this.fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);
        this.fireball.castShadow = true;
        this.scene.add(this.fireball);

        // Trail setup
        this.sphereGeometry = new THREE.SphereGeometry(2, 16, 16); // 小球几何体

        window.addEventListener("resize", this.onResize.bind(this));
    }

    getRandomParticleColor() {
        const randomIndex = Math.floor(Math.random() * this.particleColors.length);
        return this.particleColors[randomIndex];
    }

    createGlowMaterial(baseColor) {
        return new THREE.ShaderMaterial({
            uniforms: {
                viewVector: { type: "v3", value: this.camera.position },
                c: { type: "f", value: 0.3 },
                p: { type: "f", value: 2.0 },
                glowColor: { type: "c", value: baseColor },
                time: { type: "f", value: 0 }, // 动态效果时间
            },
            vertexShader: `
                uniform vec3 viewVector;
                uniform float c;
                uniform float p;
                uniform float time; // 时间变量
                varying float intensity;
                void main() {
                    vec3 vNormal = normalize(normalMatrix * normal);
                    vec3 vNormel = normalize(normalMatrix * viewVector);
                    intensity = pow(c - dot(vNormal, vNormel), p);
                    intensity *= abs(sin(time * 2.0)); // 动态效果，闪烁
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                varying float intensity;
                void main() {
                    gl_FragColor = vec4(glowColor, intensity);
                }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });
    }

    start() {
        this.animate();
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        // Increment time for dynamic glow
        this.time += 0.01;

        // Lorenz attractor calculations
        const dx = this.sigma * (this.y - this.x) * this.dt;
        const dy = (this.x * (this.rho - this.z) - this.y) * this.dt;
        const dz = (this.x * this.y - this.beta * this.z) * this.dt;
        this.x += dx;
        this.y += dy;
        this.z += dz;

        // Swap x and y for a 90° rotation
        const rotatedX = this.y * 10;
        const rotatedY = -this.x * 10;

        // Update fireball position
        this.fireball.position.set(rotatedX, rotatedY, this.z * 10);

        // Add new particle to the trail
        const baseColor = this.getRandomParticleColor();
        const trailMaterial = new THREE.MeshPhongMaterial({
            color: baseColor,
            emissive: baseColor,
            emissiveIntensity: 0.8,
            shininess: 100,
        });

        const glowMaterial = this.createGlowMaterial(baseColor);
        const scale = Math.random() * 0.618 + 1.5; // 生成随机大小

        const trailParticle = new THREE.Mesh(this.sphereGeometry, trailMaterial);
        trailParticle.position.set(rotatedX, rotatedY, this.z * 10);
        trailParticle.scale.set(scale, scale, scale);
        this.scene.add(trailParticle);

        // Add glow effect
        const glowMesh = new THREE.Mesh(this.sphereGeometry, glowMaterial);
        glowMesh.position.set(rotatedX, rotatedY, this.z * 10);
        glowMesh.scale.set(scale * 1.5, scale * 1.5, scale * 1.5);
        this.scene.add(glowMesh);

        this.trailParticles.push({ particle: trailParticle, glow: glowMesh, glowMaterial });

        // Remove old particles if exceeding maxParticles
        if (this.trailParticles.length > this.maxParticles) {
            const old = this.trailParticles.shift();
            this.scene.remove(old.particle);
            this.scene.remove(old.glow);
            old.particle.geometry.dispose();
            old.particle.material.dispose();
            old.glow.geometry.dispose();
            old.glow.material.dispose();
        }

        // Update particle opacity and glow dynamics
        this.trailParticles.forEach((entry, index) => {
            const opacity = 1 - index / this.trailParticles.length;
            entry.particle.material.opacity = opacity;
            entry.particle.material.transparent = true;
            entry.glowMaterial.uniforms.time.value = this.time; // 更新时间
        });

        this.scene.rotation.y -= 0.001;
        this.scene.rotation.x += 0.001;

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        const aspectRatio = window.innerWidth / window.innerHeight;
        this.camera.aspect = aspectRatio;
        this.camera.updateProjectionMatrix(); // 更新相机投影矩阵

        this.renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染器大小
    }

    stop() {
        cancelAnimationFrame(this.animationFrameId);
        this.renderer.dispose();
        this.trailParticles.forEach((entry) => {
            this.scene.remove(entry.particle);
            this.scene.remove(entry.glow);
            entry.particle.geometry.dispose();
            entry.particle.material.dispose();
            entry.glow.geometry.dispose();
            entry.glow.material.dispose();
        });
        this.trailParticles = [];
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}
