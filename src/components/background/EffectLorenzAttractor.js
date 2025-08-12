import * as THREE from "three";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import webglResourceManager from "../../utils/WebGLResourceManager";

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
        this.resourceId = null;

        // 优化的 Lorenz 参数 - 更经典的设置
        this.sigma = 10;
        this.rho = 28;
        this.beta = 8 / 3;
        this.x = 0.1;  // 初始位置
        this.y = 0;
        this.z = 0;
        this.dt = 0.02; // 恢复到0.02
        this.maxParticles = 1200; // 大幅增加粒子数量到2000，创造更密集的轨迹

        // 动态主题色配置 - 从CSS变量读取（类似EffectChaos）
        this.fireballColor = new THREE.Color('#00FF88'); // 初始颜色，将动态更新
        // 初始化默认颜色
        this.particleColors = [
            new THREE.Color('#10B981'), // 主题次要色
            new THREE.Color('#00FF88'), // 主题主色
            new THREE.Color('#34D399'), // 主题装饰色
        ];
        
        // 延迟更新主题颜色，确保DOM已加载
        setTimeout(() => {
            this.updateThemeColors();
        }, 100);

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
        this.camera.position.set(0, 0, 48); // 更近的相机位置
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
        
        // 注册WebGL资源
        this.resourceId = webglResourceManager.registerResources('BackgroundCanvas', {
            renderer: this.renderer,
            scene: this.scene,
            camera: this.camera
        });
        
        // 设置后处理管道以实现发光效果
        this.composer = new EffectComposer(this.renderer);
        
        // 基础渲染通道
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        // 发光效果通道 - 优化为蓝色星星效果
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.canvas.width, this.canvas.height),
            1.6, // 增强发光强度，突出星星效果
            0.9, // 增大发光半径，创造更柔和的光晕
            0.5  // 稍微降低阈值，更多粒子发光
        );
        this.composer.addPass(bloomPass);
        
        // 输出通道
        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);

        // 太阳风格的发光主球 - 在 Lorenz 轨迹起点
        const fireballGeometry = new THREE.SphereGeometry(1.5, 32, 32); // 减小尺寸，从2.0到1.5
        
        // 创建太阳材质 - 使用渐变纹理和发光效果
        const fireballMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#ffaa33'), // 更像太阳的橙黄色
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending, // 加法混合增强发光效果
        });

        this.fireball = new THREE.Mesh(fireballGeometry, fireballMaterial);
        this.scene.add(this.fireball);
        
        // 在主球周围添加太阳风格的光环 - 多层次发光
        const haloGeometry = new THREE.SphereGeometry(2.5, 32, 32); // 调整光环大小
        const haloMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color('#ff6611'), // 更深的橙红色光环
            transparent: true,
            opacity: 0.4, // 稍微增加不透明度
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide, // 内部渲染
        });
        
        this.halo = new THREE.Mesh(haloGeometry, haloMaterial);
        this.scene.add(this.halo);

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

        // 在 canvas 右上角添加太阳光 - 固定位置的温暖光源
        this.sunLight = new THREE.DirectionalLight(0xfff8dc, 1.2); // 温暖的奶油色太阳光
        this.sunLight.position.set(80, 60, 40); // 右上角位置
        this.sunLight.target.position.set(0, 0, 0); // 照向场景中心
        this.sunLight.castShadow = false; // 不投射阴影以提高性能
        this.scene.add(this.sunLight);
        this.scene.add(this.sunLight.target);
        
        // 可选：添加太阳光的辅助可视化（开发时使用，生产环境可以注释掉）
        // const sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 5);
        // this.scene.add(sunLightHelper);

        // 创建类似 Three.js WebGPU Galaxy 的粒子系统
        this.particleGeometry = new THREE.SphereGeometry(0.5, 8, 8); // 先使用简单的球体几何
        
        // 创建材质，支持 AdditiveBlending 和渐变效果
        this.particleMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1.0,
            blending: THREE.AdditiveBlending, // 加法混合，创造发光效果
            depthWrite: false,
        });
        
        // 创建粒子纹理 - 类似 Galaxy 的圆形粒子
        this.createParticleTexture();
        // 暂时不使用纹理，避免 SpriteMaterial 的问题
        // this.particleMaterial.map = this.particleTexture;
        
        // 使用 InstancedMesh 来渲染大量粒子
        this.instancedMesh = new THREE.InstancedMesh(
            this.particleGeometry, 
            this.particleMaterial, 
            this.maxParticles
        );
        
        // 为实例化网格添加颜色属性 - 确保支持实例颜色
        if (this.instancedMesh.geometry.attributes.color === undefined) {
            this.instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(
                new Float32Array(this.maxParticles * 3), 3
            );
        }
        
        this.scene.add(this.instancedMesh);
        
        // 初始化实例矩阵和颜色
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3(0, 0, 0); // 初始为不可见
        
        // 定义渐变颜色 - 类似 Galaxy 的内外颜色
        this.colorInside = new THREE.Color('#ffa575'); // 橙色内核
        this.colorOutside = new THREE.Color('#0088ff'); // 蓝色外围
        
        for (let i = 0; i < this.maxParticles; i++) {
            matrix.compose(position, new THREE.Quaternion(), scale);
            this.instancedMesh.setMatrixAt(i, matrix);
            
            // 只有在支持实例颜色时才设置
            if (this.instancedMesh.instanceColor) {
                this.instancedMesh.setColorAt(i, new THREE.Color(0, 0, 0));
            }
        }
        this.instancedMesh.instanceMatrix.needsUpdate = true;
        if (this.instancedMesh.instanceColor) {
            this.instancedMesh.instanceColor.needsUpdate = true;
        }

        window.addEventListener("resize", this.onResize.bind(this));
    }

    // 创建粒子纹理 - 类似 Galaxy 示例的圆形发光纹理
    createParticleTexture() {
        const size = 32;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        
        const context = canvas.getContext('2d');
        const center = size / 2;
        
        // 创建径向渐变
        const gradient = context.createRadialGradient(center, center, 0, center, center, center);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, size, size);
        
        this.particleTexture = new THREE.CanvasTexture(canvas);
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

        this.time += 0.025; // 恢复到0.025

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
        
        // 光环跟随主球，但有轻微的延迟和缩放动画
        this.halo.position.copy(this.fireball.position);
        this.halo.scale.setScalar(1.0 + Math.sin(this.time * 2) * 0.1); // 恢复原来的脉动效果
        
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

        // 更新实例化网格 - 简化版本以确保稳定性
        const matrix = new THREE.Matrix4();
        const position = new THREE.Vector3();
        const quaternion = new THREE.Quaternion();
        const scale_vec = new THREE.Vector3();

        this.trailPositions.forEach((pos, index) => {
            const fadeRate = (index / this.trailPositions.length);
            
            // 计算距离比率用于大小调整
            const distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);
            const maxDistance = 40;
            const radiusRatio = Math.min(distance / maxDistance, 1.0);
            
            // 基于距离和时间的粒子大小
            const particleScale = (1.0 - radiusRatio * 0.5) * fadeRate * 1.2 + 0.3;
            
            // 添加轻微的随机扰动
            position.set(
                pos.x + (Math.random() - 0.5) * 0.08,
                pos.y + (Math.random() - 0.5) * 0.08,
                pos.z + (Math.random() - 0.5) * 0.08
            );
            scale_vec.set(particleScale, particleScale, particleScale);
            
            matrix.compose(position, quaternion, scale_vec);
            this.instancedMesh.setMatrixAt(index, matrix);
            
            // 只有在支持实例颜色时才设置颜色
            if (this.instancedMesh.instanceColor) {
                // 设置渐变颜色 - 中心橙色，外围蓝色
                const mixFactor = Math.pow(1.0 - radiusRatio, 2);
                const tempColor = new THREE.Color();
                tempColor.lerpColors(this.colorOutside, this.colorInside, mixFactor);
                
                // 基于生命周期调整透明度
                const alpha = fadeRate * (1.0 - radiusRatio * 0.3);
                tempColor.multiplyScalar(alpha);
                
                this.instancedMesh.setColorAt(index, tempColor);
            }
        });

        // 隐藏未使用的实例
        for (let i = this.trailPositions.length; i < this.maxParticles; i++) {
            scale_vec.set(0, 0, 0);
            matrix.compose(position, quaternion, scale_vec);
            this.instancedMesh.setMatrixAt(i, matrix);
            
            // 只有在支持实例颜色时才设置颜色
            if (this.instancedMesh.instanceColor) {
                this.instancedMesh.setColorAt(i, new THREE.Color(0, 0, 0));
            }
        }

        this.instancedMesh.instanceMatrix.needsUpdate = true;
        if (this.instancedMesh.instanceColor) {
            this.instancedMesh.instanceColor.needsUpdate = true;
        }

        // 恢复原来的场景旋转速度
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

    /**
     * 从CSS变量动态更新主题颜色 - 类似EffectChaos的实现
     */
    updateThemeColors() {
        // 安全检查 - 确保DOM已准备好
        if (!document.documentElement) {
            console.warn('DOM not ready for theme color update');
            return;
        }
        
        try {
            const computedStyle = getComputedStyle(document.documentElement);
            
            // 获取主题色 - 添加安全检查
            const primaryColor = computedStyle.getPropertyValue('--theme-primary')?.trim();
            const secondaryColor = computedStyle.getPropertyValue('--theme-secondary')?.trim();
            const accentColor = computedStyle.getPropertyValue('--theme-accent')?.trim();
            
            // 更新粒子颜色
            if (primaryColor) {
                this.fireballColor.setStyle(primaryColor);
                this.particleColors[1].setStyle(primaryColor); // 主色
                this.colorOutside.setStyle(primaryColor); // 外围粒子色
            }
            if (secondaryColor) {
                this.particleColors[0].setStyle(secondaryColor); // 次要色
                this.colorInside.setStyle(secondaryColor); // 内核粒子色
            }
            if (accentColor) {
                this.particleColors[2].setStyle(accentColor); // 装饰色
            }
            
            // 更新背景颜色
            const bgColor = computedStyle.getPropertyValue('--theme-background')?.trim();
            if (bgColor && this.scene) {
                this.scene.background = new THREE.Color(bgColor);
                if (this.renderer) {
                    this.renderer.setClearColor(new THREE.Color(bgColor), 1.0);
                }
            }
            
            // 更新主球和光环的材质颜色
            if (this.fireball && primaryColor) {
                this.fireball.material.color.setStyle(primaryColor);
            }
            if (this.halo && secondaryColor) {
                this.halo.material.color.setStyle(secondaryColor);
            }
            
            // 更新点光源颜色
            if (this.pointLight && primaryColor) {
                this.pointLight.color.setStyle(primaryColor);
            }
            
            // 如果粒子系统已经初始化，更新粒子颜色
            if (this.instancedMesh) {
                this.updateParticleColors();
            }
            
        } catch (error) {
            console.warn('Error updating theme colors:', error);
        }
    }

    /**
     * 更新粒子颜色 - 重新设置实例化网格的颜色
     */
    updateParticleColors() {
        if (!this.instancedMesh || !this.instancedMesh.instanceColor) return;
        
        // 重新设置所有粒子的颜色
        const colors = this.instancedMesh.instanceColor.array;
        
        for (let i = 0; i < this.trailPositions.length; i++) {
            if (i >= this.maxParticles) break;
            
            const i3 = i * 3;
            const particle = this.trailPositions[i];
            
            // 基于粒子生命周期在颜色间插值
            const mixColor = this.colorInside.clone();
            mixColor.lerp(this.colorOutside, 1.0 - particle.life);
            
            colors[i3] = mixColor.r;
            colors[i3 + 1] = mixColor.g;
            colors[i3 + 2] = mixColor.b;
        }
        
        this.instancedMesh.instanceColor.needsUpdate = true;
    }

    stop() {
        // 停止动画并清理资源
        
        // 停止动画循环
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        // 清理后处理管道
        if (this.composer) {
            this.composer.dispose();
            this.composer = null;
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
        
        // 清理实例化网格
        if (this.instancedMesh) {
            this.scene.remove(this.instancedMesh);
            if (this.instancedMesh.geometry) {
                this.instancedMesh.geometry.dispose();
            }
            if (this.instancedMesh.material) {
                this.instancedMesh.material.dispose();
            }
            if (this.instancedMesh.instanceColor) {
                this.instancedMesh.instanceColor = null;
            }
            this.instancedMesh = null;
        }
        
        // 清理主球和光环
        if (this.fireball) {
            this.scene.remove(this.fireball);
            if (this.fireball.geometry) this.fireball.geometry.dispose();
            if (this.fireball.material) this.fireball.material.dispose();
            this.fireball = null;
        }
        
        if (this.halo) {
            this.scene.remove(this.halo);
            if (this.halo.geometry) this.halo.geometry.dispose();
            if (this.halo.material) this.halo.material.dispose();
            this.halo = null;
        }
        
        // 清理几何体和材质
        if (this.particleGeometry) {
            this.particleGeometry.dispose();
            this.particleGeometry = null;
        }
        
        if (this.particleMaterial) {
            this.particleMaterial.dispose();
            this.particleMaterial = null;
        }
        
        // 清理粒子纹理
        if (this.particleTexture) {
            this.particleTexture.dispose();
            this.particleTexture = null;
        }
        
        // 清理轨迹数组
        this.trailPositions = [];
        this.trailColors = [];
        
        // 清理所有光源
        if (this.pointLight) {
            this.scene.remove(this.pointLight);
            this.pointLight = null;
        }
        
        if (this.sunLight) {
            this.scene.remove(this.sunLight);
            this.scene.remove(this.sunLight.target);
            this.sunLight = null;
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
        
        // 清理场景
        this.scene = null;
        this.camera = null;
        
        // 清理WebGL资源管理器中的资源
        if (this.resourceId) {
            webglResourceManager.cleanup(this.resourceId);
            this.resourceId = null;
        }
        
        // 移除事件监听器
        window.removeEventListener("resize", this.onResize.bind(this));
    }
}
