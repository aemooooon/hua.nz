import * as THREE from "three";

export class EffectChaos {
    constructor(canvas, params = {}) {
        // 初始化Chaos效果
        this.canvas = canvas;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.mesh = null;
        this.animationFrameId = null;
        this.time = 0;

        // 参考早期EffectGalaxy的参数 - 更强的视觉效果
        this.particleCount = params.particleCount || 8000; // 增加粒子数量
        this.branches = 3;
        this.radius = 9; // 参考EffectGalaxy的半径
        this.size = params.size || 0.12; // 参考EffectGalaxy的尺寸
        this.colorInside = new THREE.Color('#ffa575'); // EffectGalaxy的橙色
        this.colorOutside = new THREE.Color('#311599'); // EffectGalaxy的紫色

        try {
            this.init();
        } catch (error) {
            console.error('EffectChaos: Failed to initialize Three.js', error);
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
            antialias: false, // 关闭抗锯齿提升性能
            powerPreference: "low-power", // 使用低功耗模式
            precision: "mediump" // 使用中等精度
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 限制像素比
        this.renderer.setSize(this.canvas.width, this.canvas.height, false);

        // 添加WebGL上下文丢失/恢复处理（可选，减少控制台警告）
        this.canvas.addEventListener('webglcontextlost', this.onContextLost.bind(this));
        this.canvas.addEventListener('webglcontextrestored', this.onContextRestored.bind(this));

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
            // 完全参考EffectGalaxy的粒子分布算法
            const radiusRatio = Math.random();
            const radius = Math.pow(radiusRatio, 1.5) * this.radius;
            
            // EffectGalaxy的连续分布算法 - 关键修正
            const branchRatio = Math.random(); // 0到1的连续值
            const branchAngle = branchRatio * Math.PI * 2; // 完整的圆周分布
            
            // EffectGalaxy的随机偏移算法
            const randomX = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.2;
            const randomY = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.05;
            const randomZ = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.2;
            
            this.particleData.push({
                radiusRatio,
                radius,
                branchAngle,
                randomX,
                randomY,
                randomZ
            });
            
            // EffectGalaxy的颜色混合算法
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
        
        // 创建高质量纹理 - 参考早期EffectGalaxy
        const canvas = document.createElement('canvas');
        canvas.width = 64; // 使用更大的纹理尺寸
        canvas.height = 64;
        const context = canvas.getContext('2d');
        
        // 绘制渐变圆形 - 完全复制早期EffectGalaxy的纹理
        const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        
        // 创建材质 - 完全参考EffectGalaxy的设置
        const material = new THREE.PointsMaterial({
            size: this.size * 1.5, // EffectGalaxy的尺寸补偿
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.6, // EffectGalaxy的透明度设置
            map: texture,
            alphaTest: 0.1 // EffectGalaxy的alpha测试设置
        });
        
        // 创建粒子系统
        this.mesh = new THREE.Points(geometry, material);
        this.scene.add(this.mesh);
        
        // 初始化位置
        this.updatePositions();
        
        // 创建强力光源系统 - 完全参考EffectGalaxy的光照配置
        this.centralLight = new THREE.PointLight(new THREE.Color('#ffffff'), 1.5, 30);
        this.centralLight.position.set(0, -1, 0);
        this.scene.add(this.centralLight);
        
        // EffectGalaxy的橙色光源
        const orangeLight = new THREE.PointLight(this.colorInside, 1.0, 25);
        orangeLight.position.set(0, -1, 0);
        this.scene.add(orangeLight);
        
        // EffectGalaxy的环境光配置
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(this.ambientLight);
    }

    updatePositions() {
        // 更新每个粒子的位置 - 完全参考EffectGalaxy算法
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.particleData[i];
            const i3 = i * 3;
            
            // EffectGalaxy的动画算法：angle = branchAngle + time * (1 - radiusRatio)
            const angle = particle.branchAngle + this.time * (1 - particle.radiusRatio);
            
            // EffectGalaxy的基础位置算法 - 下半部分显示
            const x = Math.cos(angle) * particle.radius;
            const z = Math.sin(angle) * particle.radius;
            const y = -Math.abs(particle.radius * 0.3); // EffectGalaxy的Y轴偏移
            
            // EffectGalaxy的随机偏移应用
            this.positions[i3] = x + particle.randomX;
            this.positions[i3 + 1] = y + particle.randomY - 2; // EffectGalaxy的整体下移
            this.positions[i3 + 2] = z + particle.randomZ;
        }
        
        // 通知Three.js位置已更新
        this.mesh.geometry.attributes.position.needsUpdate = true;
    }

    start() {
        // 开始动画循环
        this.animate();
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        
        this.time += 0.008; // 稍微加快动画速度以改善视觉效果
        
        // 每帧都更新位置，确保平滑旋转
        this.updatePositions();
        
        // 渲染场景
        this.renderer.render(this.scene, this.camera);
    }

    onResize(width, height) {
        if (!this.renderer || !this.camera) return;
        
        const newWidth = width || this.canvas.width;
        const newHeight = height || this.canvas.height;
        
        this.camera.aspect = newWidth / newHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(newWidth, newHeight, false);
    }

    onContextLost(event) {
        event.preventDefault();
        console.warn('WebGL context lost. Attempting to restore...');
        
        // 停止动画
        this.stop();
        
        // 清理资源
        this.cleanup();
    }

    onContextRestored() {
        // WebGL上下文恢复，重新初始化
        
        // 重新初始化渲染器和场景
        this.init();
        
        // 重新开始动画
        this.start();
    }

    stop() {
        // 停止动画并清理资源
        
        // 停止动画循环
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        // 清理渲染器
        if (this.renderer) {
            // 清理渲染器上下文
            const context = this.renderer.getContext();
            if (context && context.getExtension('WEBGL_lose_context')) {
                context.getExtension('WEBGL_lose_context').loseContext();
            }
            this.renderer.dispose();
            this.renderer.forceContextLoss();
            this.renderer = null;
        }
        
        // 清理网格几何体和材质
        if (this.mesh) {
            this.scene.remove(this.mesh);
            if (this.mesh.geometry) {
                this.mesh.geometry.dispose();
            }
            if (this.mesh.material) {
                this.mesh.material.dispose();
            }
            this.mesh = null;
        }
        
        // 清理几何体
        if (this.geometry) {
            this.geometry.dispose();
            this.geometry = null;
        }
        
        // 清理材质
        if (this.material) {
            this.material.dispose();
            this.material = null;
        }
        
        // 清理纹理
        if (this.texture) {
            this.texture.dispose();
            this.texture = null;
        }
        
        // 清理场景中的所有对象
        while (this.scene.children.length > 0) {
            const child = this.scene.children[0];
            this.scene.remove(child);
            
            // 递归清理几何体和材质
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        }
        
        // 清理场景和相机
        this.scene = null;
        this.camera = null;
        
        // 移除事件监听器
        window.removeEventListener("resize", this.onResize.bind(this));
    }

    cleanup() {
        // 清理网格几何体和材质
        if (this.mesh) {
            this.scene.remove(this.mesh);
            if (this.mesh.geometry) {
                this.mesh.geometry.dispose();
            }
            if (this.mesh.material) {
                this.mesh.material.dispose();
            }
            this.mesh = null;
        }
        
        // 清理几何体
        if (this.geometry) {
            this.geometry.dispose();
            this.geometry = null;
        }
        
        // 清理材质
        if (this.material) {
            this.material.dispose();
            this.material = null;
        }
        
        // 清理纹理
        if (this.texture) {
            this.texture.dispose();
            this.texture = null;
        }
        
        // 清理场景中的所有对象
        while (this.scene.children.length > 0) {
            const child = this.scene.children[0];
            this.scene.remove(child);
            
            // 递归清理几何体和材质
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        }
    }

    destroy() {
        this.stop();
    }
}
