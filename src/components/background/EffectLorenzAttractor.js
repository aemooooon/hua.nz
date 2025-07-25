import * as THREE from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class EffectLorenzAttractor {
    constructor(canvas, params = {}) {
        this.canvas = canvas;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.fireball = null;
        this.trailParticles = [];
        this.animationFrameId = null;
        this.time = 0;

        // 优化的 Lorenz 参数 - 更经典的设置
        this.sigma = 10;
        this.rho = 28;
        this.beta = 8 / 3;
        this.x = 0.1;  // 初始位置
        this.y = 0;
        this.z = 0;
        this.dt = 0.01; // 增加时间步长，让动画更快
        this.maxParticles = 2000; // 大幅增加粒子数量到2000，创造更密集的轨迹

        // 更明亮的颜色配置 - 改为深海/夜空蓝色主题
        this.fireballColor = params.fireballColor || new THREE.Color(0x0088ff); // 明亮蓝色主球
        this.particleColors = params.particleColors || [
            new THREE.Color(0x0066cc), // 深蓝
            new THREE.Color(0x0088ff), // 亮蓝 
            new THREE.Color(0x00aaff), // 天蓝
        ];

        // 粒子系统优化 - 使用数组存储位置而不是单独的网格
        this.trailPositions = [];
        this.trailColors = [];
        this.particleIndex = 0;
        
        // 性能监控
        this.frameCount = 0;
        this.lastFPSCheck = performance.now();
        this.currentFPS = 60;

        try {
            this.init();
        } catch (error) {
            console.error('EffectLorenzAttractor: Failed to initialize Three.js', error);
            throw error;
        }
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000a15); // 深夜海洋色背景

        // 优化的相机设置
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.camera.position.set(0, 0, 60); // 更近的相机位置
        this.camera.lookAt(0, 0, 0);

        // 渲染器设置 - 优化高DPI屏幕支持
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        
        // 不使用 setPixelRatio，直接设置渲染尺寸
        this.renderer.setSize(this.canvas.width, this.canvas.height, false);
        this.renderer.setClearColor(0x000a15, 1.0); // 与场景背景一致
        
        // 设置后处理管道以实现发光效果
        this.composer = new EffectComposer(this.renderer);
        
        // 基础渲染通道
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        // 发光效果通道 - 优化为蓝色星星效果
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.canvas.width, this.canvas.height),
            1.8, // 增强发光强度，突出星星效果
            0.6, // 增大发光半径，创造更柔和的光晕
            0.8  // 稍微降低阈值，更多粒子发光
        );
        this.composer.addPass(bloomPass);
        
        // 输出通道
        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);

        // 更大更明显的主球 - 蓝色星星效果
        const fireballGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const fireballMaterial = new THREE.MeshBasicMaterial({
            color: this.fireballColor, // 明亮蓝色
            transparent: true,
            opacity: 0.9
        });

        this.fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);
        this.scene.add(this.fireball);

        // 更强的光照系统以照亮粒子轨迹
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8); // 增强环境光
        this.scene.add(ambientLight);
        
        // 添加多个方向光来照亮粒子
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight1.position.set(50, 50, 50);
        this.scene.add(directionalLight1);
        
        const directionalLight2 = new THREE.DirectionalLight(0x6699ff, 0.8); // 蓝色方向光
        directionalLight2.position.set(-50, -50, 50);
        this.scene.add(directionalLight2);
        
        // 添加点光源在主球位置 - 蓝色光源
        this.pointLight = new THREE.PointLight(0x0088ff, 2.0, 100); // 蓝色点光源
        this.scene.add(this.pointLight);

        // 创建高效的粒子系统 - 使用 InstancedMesh 并支持颜色渐变
        this.particleGeometry = new THREE.SphereGeometry(0.4, 8, 8); // 增大粒子大小
        
        // 创建专为发光后处理优化的材质 - 深海蓝色
        this.particleMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color(0.0, 0.5, 1.0), // 明亮的深海蓝色
            transparent: true,
            opacity: 1.0,
        });
        
        // 创建实例化网格以提高性能
        this.instancedMesh = new THREE.InstancedMesh(
            this.particleGeometry, 
            this.particleMaterial, 
            this.maxParticles
        );
        
        this.scene.add(this.instancedMesh);
        
        // 初始化实例矩阵
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3(0, 0, 0); // 初始为不可见
        
        for (let i = 0; i < this.maxParticles; i++) {
            matrix.compose(position, new THREE.Quaternion(), scale);
            this.instancedMesh.setMatrixAt(i, matrix);
        }
        this.instancedMesh.instanceMatrix.needsUpdate = true;

        window.addEventListener("resize", this.onResize.bind(this));
    }

    getRandomParticleColor() {
        const randomIndex = Math.floor(Math.random() * this.particleColors.length);
        return this.particleColors[randomIndex];
    }

    start() {
        this.animate();
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        // 简单的 FPS 监控和自适应质量
        this.frameCount++;
        const now = performance.now();
        if (now - this.lastFPSCheck >= 1000) {
            this.currentFPS = this.frameCount;
            this.frameCount = 0;
            this.lastFPSCheck = now;
            
            // 如果 FPS 过低，减少粒子数量
            if (this.currentFPS < 30 && this.maxParticles > 1000) {
                this.maxParticles = Math.max(1000, this.maxParticles - 100);
            } else if (this.currentFPS > 50 && this.maxParticles < 2000) {
                this.maxParticles = Math.min(2000, this.maxParticles + 50);
            }
        }

        this.time += 0.016;

        // Lorenz 吸引子方程计算 - 更快的速度
        const dx = this.sigma * (this.y - this.x) * this.dt;
        const dy = (this.x * (this.rho - this.z) - this.y) * this.dt;
        const dz = (this.x * this.y - this.beta * this.z) * this.dt;
        
        this.x += dx;
        this.y += dy;
        this.z += dz;

        // 缩放并居中 Lorenz 吸引子
        const scale = 0.8;
        this.fireball.position.set(this.x * scale, this.y * scale, this.z * scale);
        
        // 更新点光源位置跟随主球
        this.pointLight.position.copy(this.fireball.position);

        // 记录当前位置到轨迹数组 - 每隔几帧添加一次以优化性能
        if (this.frameCount % 2 === 0) { // 每2帧添加一个粒子，减少计算量
            this.trailPositions.push({
                x: this.x * scale,
                y: this.y * scale,
                z: this.z * scale,
                life: 1.0
            });

            // 限制轨迹长度
            if (this.trailPositions.length > this.maxParticles) {
                this.trailPositions.shift();
            }
        }

        // 更新实例化网格 - 简化为统一发光材质
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale_vec = new THREE.Vector3();

        this.trailPositions.forEach((pos, index) => {
            const fadeRate = (index / this.trailPositions.length);
            const particleScale = fadeRate * 0.8 + 0.4; // 0.4 到 1.2
            
            position.set(
                pos.x + (Math.random() - 0.5) * 0.08,
                pos.y + (Math.random() - 0.5) * 0.08,
                pos.z + (Math.random() - 0.5) * 0.08
            );
            scale_vec.set(particleScale, particleScale, particleScale);
            
            matrix.compose(position, quaternion, scale_vec);
            this.instancedMesh.setMatrixAt(index, matrix);
        });

        // 隐藏未使用的实例
        for (let i = this.trailPositions.length; i < this.maxParticles; i++) {
            scale_vec.set(0, 0, 0);
            matrix.compose(position, quaternion, scale_vec);
            this.instancedMesh.setMatrixAt(i, matrix);
        }

        this.instancedMesh.instanceMatrix.needsUpdate = true;

        // 更快的场景旋转
        this.scene.rotation.y += 0.005;
        this.scene.rotation.x += 0.002;

        // 使用后处理管道渲染以获得发光效果
        this.composer.render();
    }

    onResize(width, height) {
        if (!this.renderer || !this.camera) return;
        
        // 使用传入的尺寸或画布当前尺寸
        const canvasWidth = width || this.canvas.width;
        const canvasHeight = height || this.canvas.height;
        
        // 更新相机宽高比
        this.camera.aspect = canvasWidth / canvasHeight;
        this.camera.updateProjectionMatrix();

        // 更新渲染器尺寸 - 不使用 devicePixelRatio
        this.renderer.setSize(canvasWidth, canvasHeight, false);
        
        // 更新后处理管道尺寸
        if (this.composer) {
            this.composer.setSize(canvasWidth, canvasHeight);
        }
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // 清理实例化网格
        if (this.instancedMesh) {
            this.scene.remove(this.instancedMesh);
            this.instancedMesh.geometry.dispose();
            this.instancedMesh.material.dispose();
        }
        
        // 清理轨迹数组
        this.trailPositions = [];
        this.trailColors = [];
        
        // 清理场景
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}
