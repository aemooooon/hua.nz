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

        // 优化后的参数 - 下半部分半圆效果
        this.particleCount = 12000; // 稍微减少粒子数量
        this.branches = 3;
        this.radius = 8; // 增大半径以覆盖更大范围
        this.size = 0.1; // 稍微增大粒子
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
        // 设置相机为下半部分的半圆效果
        this.camera = new THREE.PerspectiveCamera(60, this.canvas.width / this.canvas.height, 0.1, 100);
        this.camera.position.set(0, 2, 8);  // 稍微抬高，看到下半部分的半圆
        this.camera.lookAt(0, -2, 0); // 朝向下方

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
            
            // 随机偏移 - 减少散布，更紧密的云层效果
            const randomX = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.2; // 降低从0.3到0.2
            const randomY = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.05; // 降低从0.1到0.05
            const randomZ = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.2; // 降低从0.3到0.2
            
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
        
        // 创建圆形纹理让粒子看起来像气泡
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        // 绘制渐变圆形
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        
        // 创建材质 - 增强光源扩散效果
        const material = new THREE.PointsMaterial({
            size: this.size * 1.2, // 稍微增大粒子
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.7, // 提高透明度让光源更明显
            map: texture // 使用圆形纹理
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
        // 创建中心光源 - 位于屏幕中央稍下
        this.centralLight = new THREE.PointLight(new THREE.Color('#ffffff'), 2.0, 50);
        this.centralLight.position.set(0, -1, 0); // 中心位置稍下
        this.scene.add(this.centralLight);
        
        // 添加橙色光源增强效果
        const orangeLight = new THREE.PointLight(this.colorInside, 1.5, 40);
        orangeLight.position.set(0, -1, 0);
        this.scene.add(orangeLight);
        
        // 添加蓝色光源
        const blueLight = new THREE.PointLight(this.colorOutside, 1.0, 35);
        blueLight.position.set(0, -1, 0);
        this.scene.add(blueLight);
        
        // 柔和的环境光
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.25);
        this.scene.add(this.ambientLight);
        
        console.log('EffectGalaxy: Created central light for bottom half galaxy');
    }

    updatePositions() {
        // 更新每个粒子的位置
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.particleData[i];
            const i3 = i * 3;
            
            // 官方示例的动画算法：angle = branchAngle + time * (1 - radiusRatio)
            const angle = particle.branchAngle + this.time * (1 - particle.radiusRatio);
            
            // 基础位置 - 只在下半部分显示
            const x = Math.cos(angle) * particle.radius;
            const z = Math.sin(angle) * particle.radius;
            const y = -Math.abs(particle.radius * 0.3); // 强制向下偏移，形成下半部分效果
            
            // 应用随机偏移
            this.positions[i3] = x + particle.randomX;
            this.positions[i3 + 1] = y + particle.randomY - 2; // 整体下移
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
        
        // 清理场景
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}
