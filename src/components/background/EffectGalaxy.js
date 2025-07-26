import * as THREE from "three";

export class EffectGalaxy {
    constructor(canvas, params = {}) {
        this.canvas = canvas;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.animationFrameId = null;
        this.time = 0;

        // Galaxy 参数 - 支持自定义
        this.particleCount = params.particleCount || 20000;
        this.branches = params.branches || 3;
        this.radius = params.radius || 5;
        this.spin = params.spin || 1;
        this.randomness = params.randomness || 0.2;
        this.randomnessPower = params.randomnessPower || 3;
        this.size = params.size || 0.08;
        
        // 可自定义的颜色
        this.colorInside = params.colorInside || new THREE.Color('#ffa575'); // 橙色内核
        this.colorOutside = params.colorOutside || new THREE.Color('#311599'); // 紫色外围

        // 性能监控
        this.frameCount = 0;
        this.lastFPSCheck = performance.now();
        this.currentFPS = 60;

        try {
            this.init();
        } catch (error) {
            console.error('EffectGalaxy: Failed to initialize Three.js', error);
            throw error;
        }
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x201919); // 深空背景

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(50, this.canvas.width / this.canvas.height, 0.1, 100);
        this.camera.position.set(4, 2, 5);
        this.camera.lookAt(0, 0, 0);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        
        this.renderer.setSize(this.canvas.width, this.canvas.height, false);
        this.renderer.setClearColor(0x201919, 1.0);

        // 创建 Galaxy 粒子系统
        this.createGalaxy();

        // 添加轨道控制（可选，用于调试）
        // this.setupControls();

        window.addEventListener("resize", this.onResize.bind(this));
    }

    createGalaxy() {
        // 创建几何体
        this.geometry = new THREE.BufferGeometry();
        
        // 计算粒子位置和颜色
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // 位置计算
            const radiusRatio = Math.random();
            const radius = Math.pow(radiusRatio, 1.5) * this.radius;
            
            const branchAngle = (i % this.branches) / this.branches * Math.PI * 2;
            const spinAngle = radius * this.spin;
            const angle = branchAngle + spinAngle;
            
            // 添加随机性
            const randomX = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.randomness * radius;
            const randomY = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.randomness * radius;
            const randomZ = Math.pow(Math.random(), this.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.randomness * radius;
            
            positions[i3] = Math.cos(angle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(angle) * radius + randomZ;
            
            // 颜色计算 - 从内到外渐变
            const mixedColor = this.colorInside.clone();
            mixedColor.lerp(this.colorOutside, Math.pow(radiusRatio, 2));
            
            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }
        
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // 创建材质
        this.material = new THREE.PointsMaterial({
            size: this.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        // 创建粒子系统
        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);
        
        // 添加照明系统
        this.setupLighting();
    }

    setupLighting() {
        // 环境光
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // 主方向光
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);
        
        // 点光源增强中心发光
        const pointLight = new THREE.PointLight(this.colorInside, 1.0, 20);
        pointLight.position.set(0, 0, 0);
        this.scene.add(pointLight);
    }

    start() {
        this.animate();
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        // 性能监控
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastFPSCheck >= 1000) {
            this.currentFPS = this.frameCount;
            this.frameCount = 0;
            this.lastFPSCheck = now;
        }

        this.time += 0.005; // 较慢的旋转速度

        // 旋转整个 Galaxy
        if (this.points) {
            this.points.rotation.y = this.time * 0.2;
            
            // 添加轻微的上下浮动
            this.points.position.y = Math.sin(this.time * 0.5) * 0.1;
            
            // 粒子大小的呼吸效果
            this.material.size = this.size * (1 + Math.sin(this.time * 2) * 0.1);
        }

        // 相机轻微摆动
        this.camera.position.x = Math.cos(this.time * 0.1) * 5;
        this.camera.position.z = Math.sin(this.time * 0.1) * 5;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }

    onResize(width, height) {
        if (!this.renderer || !this.camera) return;
        
        const canvasWidth = width || this.canvas.width;
        const canvasHeight = height || this.canvas.height;
        
        this.camera.aspect = canvasWidth / canvasHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvasWidth, canvasHeight, false);
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // 清理几何体和材质
        if (this.geometry) {
            this.geometry.dispose();
        }
        
        if (this.material) {
            this.material.dispose();
        }
        
        // 清理场景
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}
