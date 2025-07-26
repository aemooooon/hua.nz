import * as THREE from "three";

export class EffectGalaxy {
    constructor(canvas, params = {}) {
        console.log('EffectGalaxy: Initializing with params:', params);
        this.canvas = canvas;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.mesh = null;
        this.animationFrameId = null;
        this.time = 0;

        // 官方示例的参数
        this.particleCount = 20000;
        this.branches = 3; // 保留用于某些计算，但实际使用连续分布
        this.radius = 5;
        this.size = 0.12; // 稍微增大粒子
        this.colorInside = new THREE.Color('#ffa575');
        this.colorOutside = new THREE.Color('#311599');

        try {
            this.init();
        } catch (error) {
            console.error('EffectGalaxy: Failed to initialize Three.js', error);
            throw error;
        }
    }

    init() {
        // 设置相机确保Galaxy在画布中心
        this.camera = new THREE.PerspectiveCamera(50, this.canvas.width / this.canvas.height, 0.1, 100);
        this.camera.position.set(0, 3, 8);  // 调整相机位置：正上方一点，向后退一些
        this.camera.lookAt(0, 0, 0); // 确保相机朝向Galaxy中心

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x201919);

        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.canvas.width, this.canvas.height, false);

        // 创建Galaxy
        this.createGalaxy();

        window.addEventListener("resize", this.onResize.bind(this));
    }

    createGalaxy() {
        // 使用Points系统，更接近官方示例的Sprite效果
        const geometry = new THREE.BufferGeometry();
        
        // 创建位置和颜色数组
        this.positions = new Float32Array(this.particleCount * 3);
        this.colors = new Float32Array(this.particleCount * 3);
        
        // 存储每个粒子的初始数据，用于动画
        this.particleData = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            // 存储粒子的基础数据
            const radiusRatio = Math.random();
            const radius = Math.pow(radiusRatio, 1.5) * this.radius;
            
            // 关键修正：使用连续分布而不是离散的3条臂
            // 官方示例：range(0, branches).floor() 产生连续分布
            const branchRatio = Math.random(); // 0到1的连续值
            const branchAngle = branchRatio * Math.PI * 2; // 完整的圆周分布
            
            // 随机偏移 - 增强云层效果
            const randomX = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.3;
            const randomY = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.1; // Y轴较小，保持扁平
            const randomZ = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.3;
            
            this.particleData.push({
                radiusRatio,
                radius,
                branchAngle,
                randomX,
                randomY,
                randomZ
            });
            
            // 颜色插值 - 只需要计算一次
            const colorRatio = Math.pow(1 - radiusRatio, 2);
            const mixedColor = this.colorInside.clone();
            mixedColor.lerp(this.colorOutside, 1 - colorRatio);
            
            const i3 = i * 3;
            this.colors[i3] = mixedColor.r;
            this.colors[i3 + 1] = mixedColor.g;
            this.colors[i3 + 2] = mixedColor.b;
        }
        
        // 设置几何体属性
        geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
        
        // 创建材质 - 增加粒子大小和透明度
        const material = new THREE.PointsMaterial({
            size: this.size * 1.5, // 增大粒子
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        this.mesh = new THREE.Points(geometry, material);
        this.scene.add(this.mesh);
        
        // 添加中央光源 - 这是关键！
        this.createCentralLight();
        
        console.log(`EffectGalaxy: Created ${this.particleCount} particles with continuous distribution`);
        
        // 初始更新位置
        this.updatePositions();
    }

    createCentralLight() {
        // 创建中央发光球体 - 模拟星系核心
        const centralGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const centralMaterial = new THREE.MeshBasicMaterial({
            color: this.colorInside,
            transparent: true,
            opacity: 0.8
        });
        this.centralSphere = new THREE.Mesh(centralGeometry, centralMaterial);
        this.scene.add(this.centralSphere);
        
        // 添加强烈的点光源
        this.centralLight = new THREE.PointLight(this.colorInside, 3.0, 20);
        this.centralLight.position.set(0, 0, 0);
        this.scene.add(this.centralLight);
        
        // 添加环境光
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(this.ambientLight);
        
        console.log('EffectGalaxy: Created central light source');
    }

    updatePositions() {
        // 更新每个粒子的位置
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.particleData[i];
            const i3 = i * 3;
            
            // 官方示例的动画算法：angle = branchAngle + time * (1 - radiusRatio)
            const angle = particle.branchAngle + this.time * (1 - particle.radiusRatio);
            
            // 基础位置
            const x = Math.cos(angle) * particle.radius;
            const z = Math.sin(angle) * particle.radius;
            const y = 0;
            
            // 应用随机偏移
            this.positions[i3] = x + particle.randomX;
            this.positions[i3 + 1] = y + particle.randomY;
            this.positions[i3 + 2] = z + particle.randomZ;
        }
        
        // 通知Three.js位置已更新
        this.mesh.geometry.attributes.position.needsUpdate = true;
    }

    start() {
        console.log('EffectGalaxy: Starting animation');
        this.animate();
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        
        this.time += 0.01;
        
        // 更新粒子位置以产生旋转动画
        this.updatePositions();
        
        // 渲染场景
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
        if (this.mesh) {
            if (this.mesh.geometry) {
                this.mesh.geometry.dispose();
            }
            if (this.mesh.material) {
                this.mesh.material.dispose();
            }
        }
        
        // 清理中央光源
        if (this.centralSphere) {
            if (this.centralSphere.geometry) {
                this.centralSphere.geometry.dispose();
            }
            if (this.centralSphere.material) {
                this.centralSphere.material.dispose();
            }
        }
        
        // 清理场景
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}
