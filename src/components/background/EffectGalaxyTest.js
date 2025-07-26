import * as THREE from "three";

export class EffectGalaxyTest {
    constructor(canvas) {
        console.log('EffectGalaxyTest: Starting super visible test');
        this.canvas = canvas;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.animationFrameId = null;
        this.time = 0;

        // 超简单但明显的参数
        this.particleCount = 5000;  // 少一点但更明显
        this.size = 5.0;  // 超大粒子

        try {
            this.init();
        } catch (error) {
            console.error('EffectGalaxyTest: Failed to initialize', error);
            throw error;
        }
    }

    init() {
        // 纯黑背景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        // 相机设置
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);

        // 渲染器设置
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true
        });
        
        this.renderer.setSize(this.canvas.width, this.canvas.height, false);
        this.renderer.setClearColor(0x000000, 1.0);

        this.createSimpleGalaxy();
        window.addEventListener("resize", this.onResize.bind(this));
    }

    createSimpleGalaxy() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        
        // 创建一个简单的螺旋图案
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // 简单的螺旋计算
            const angle = (i / this.particleCount) * Math.PI * 10; // 10圈螺旋
            const radius = (i / this.particleCount) * 15; // 从0到15的半径
            
            positions[i3] = Math.cos(angle) * radius;     // x
            positions[i3 + 1] = Math.sin(angle) * radius; // y
            positions[i3 + 2] = (Math.random() - 0.5) * 2; // z - 随机深度
            
            // 明亮的颜色 - 黄色到红色渐变
            const t = i / this.particleCount;
            colors[i3] = 1.0;           // r - 红色分量
            colors[i3 + 1] = 1.0 - t;   // g - 绿色分量随距离减少
            colors[i3 + 2] = 0.0;       // b - 蓝色分量为0
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // 超明显的材质
        const material = new THREE.PointsMaterial({
            size: this.size,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: false,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(geometry, material);
        this.scene.add(this.points);
        
        console.log(`EffectGalaxyTest: Created ${this.particleCount} super visible particles`);
    }

    start() {
        console.log('EffectGalaxyTest: Starting animation with super visible effects');
        this.animate();
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        
        this.time += 0.01;
        
        // 缓慢旋转
        if (this.points) {
            this.points.rotation.z = this.time * 0.5;
        }
        
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
        
        // 清理
        if (this.points) {
            if (this.points.geometry) {
                this.points.geometry.dispose();
            }
            if (this.points.material) {
                this.points.material.dispose();
            }
        }
        
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}
