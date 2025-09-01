import * as THREE from 'three';
import webglResourceManager from '../../utils/WebGLResourceManager';

// 波纹顶点着色器
const rippleVertexShader = `
    uniform float time;
    uniform vec2 center;
    uniform float waveRadius;
    uniform float maxRadius;
    
    varying vec2 vUv;
    varying float vDistance;
    varying float vWaveIntensity;
    
    void main() {
        vUv = uv;
        
        // 计算到波源中心的距离
        vec2 pos = position.xy;
        vDistance = distance(pos, center);
        
        // 计算波纹强度（基于距离和半径）
        float distanceFromWave = abs(vDistance - waveRadius);
        vWaveIntensity = 1.0 - smoothstep(0.0, 25.0, distanceFromWave); // 增加平滑范围
        
        // 添加更柔和的Z轴波动（减慢速度）
        vec3 newPosition = position;
        if (vWaveIntensity > 0.1) {
            // 多层3D波动效果，速度更慢
            float ripple1 = sin(vDistance * 0.08 - time * 1.2) * vWaveIntensity * 1.5;
            float ripple2 = sin(vDistance * 0.12 + time * 0.8) * vWaveIntensity * 1.0;
            float ripple3 = cos(vDistance * 0.15 - time * 1.5) * vWaveIntensity * 0.8;
            
            // 组合多层波动
            float combinedRipple = ripple1 + ripple2 + ripple3;
            newPosition.z += combinedRipple;
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`;

// 波纹片段着色器
const rippleFragmentShader = `
    uniform float time;
    uniform vec3 primaryColor;
    uniform vec3 accentColor;
    uniform float opacity;
    uniform float waveRadius;
    uniform float maxRadius;
    uniform vec2 center;
    
    varying vec2 vUv;
    varying float vDistance;
    varying float vWaveIntensity;
    
    void main() {
        // 基础波纹透明度
        float baseAlpha = opacity * vWaveIntensity;
        
        // 创建5层波纹效果（原来3层，新增2层）
        float wave1 = sin(vDistance * 0.03 - time * 1.5) * 0.5 + 0.5;  // 最慢的大波纹
        float wave2 = sin(vDistance * 0.05 - time * 2.0) * 0.4 + 0.6;  // 减慢速度
        float wave3 = sin(vDistance * 0.08 + time * 1.2) * 0.3 + 0.7;  // 减慢速度
        float wave4 = sin(vDistance * 0.12 - time * 2.5) * 0.25 + 0.75; // 新增层次
        float wave5 = sin(vDistance * 0.15 + time * 1.8) * 0.2 + 0.8;   // 新增层次
        
        // 组合所有波纹层次
        float combinedWave = wave1 * wave2 * wave3 * wave4 * wave5;
        
        // 添加更复杂的干涉模式
        float interference1 = sin(vDistance * 0.06 - time * 1.0) * 0.15 + 0.85;
        float interference2 = cos(vDistance * 0.09 + time * 0.8) * 0.1 + 0.9;
        combinedWave *= interference1 * interference2;
        
        // 创建颜色渐变（减慢颜色变化速度）
        float progress = vDistance / maxRadius;
        vec3 waveColor = mix(primaryColor, accentColor, progress);
        
        // 添加彩虹色彩变化（减慢变化速度）
        float hueShift = sin(vDistance * 0.015 + time * 0.5) * 0.25; // 减慢色彩变化
        waveColor.r += hueShift;
        waveColor.g += sin(hueShift + 2.094) * 0.25; // 120度相位差
        waveColor.b += sin(hueShift + 4.188) * 0.25; // 240度相位差
        
        // 边缘发光效果
        float edgeGlow = 1.0 - smoothstep(0.8, 1.0, vWaveIntensity);
        waveColor += vec3(edgeGlow * 0.3);
        
        // 闪烁效果（减慢闪烁速度）
        float sparkle = sin(vDistance * 0.08 + time * 4.0) * 0.08 + 0.92; // 减慢闪烁
        
        // 添加缓慢的整体脉动
        float globalPulse = sin(time * 0.6) * 0.1 + 0.9;
        
        // 最终透明度计算
        float finalAlpha = baseAlpha * combinedWave * sparkle * globalPulse;
        finalAlpha = clamp(finalAlpha, 0.0, 0.7); // 降低最大透明度避免过亮
        
        gl_FragColor = vec4(waveColor, finalAlpha);
    }
`;

export class EffectRippleWaves {
    constructor(canvas, params = {}, componentId = 'BackgroundCanvas') {
        this.canvas = canvas;
        this.componentId = componentId;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.animationFrameId = null;
        this.time = 0;
        this.resourceId = null;

        // 波纹效果参数
        this.waveSourceCount = params.waveSourceCount || 6; // 增加波源数量
        this.maxRings = params.maxRings || 8; // 每个波源最大圆环数
        this.waveSpeed = params.waveSpeed || 1.2; // 波传播速度（再减慢一点）
        this.ringSpacing = params.ringSpacing || 45; // 圆环间距
        this.maxRadius = params.maxRadius || 400; // 最大半径（增大让波纹存在更久）

        // 动态主题色配置
        this.waveColor = new THREE.Color('#00ffff');
        this.sourceColor = new THREE.Color('#4dd0e1');

        // 存储波纹对象
        this.waveSources = [];
        this.waveRings = [];

        // 几何体和材质
        this.sourceGeometry = null;
        this.ringGeometries = [];
        this.sourceMaterial = null;
        this.ringMaterials = [];

        // 场景对象
        this.sourcePoints = null;
        this.ringMeshes = [];

        // 鼠标交互
        this.mouse = new THREE.Vector2();
        this.lastRippleTime = 0;
        this.rippleInterval = 2000; // 2秒产生一次新波纹

        this.updateThemeColors();

        try {
            this.init();
        } catch (error) {
            console.error('EffectRippleWaves: Failed to initialize Three.js', error);
            throw error;
        }
    }

    /**
     * 从CSS变量动态更新主题颜色
     */
    updateThemeColors() {
        const computedStyle = getComputedStyle(document.documentElement);

        const primaryColor = computedStyle.getPropertyValue('--theme-primary').trim();
        const accentColor = computedStyle.getPropertyValue('--theme-accent').trim();

        if (primaryColor) {
            this.waveColor.setStyle(primaryColor);
        }
        if (accentColor) {
            this.sourceColor.setStyle(accentColor);
        }

        // 更新波源材质颜色
        if (this.sourceMaterial) {
            this.sourceMaterial.color.copy(this.sourceColor);
        }

        // 更新所有波纹的shader uniforms
        this.ringMeshes.forEach(ringMesh => {
            if (ringMesh.userData.isShaderRipple && ringMesh.material.uniforms) {
                ringMesh.material.uniforms.primaryColor.value.copy(this.waveColor);
                ringMesh.material.uniforms.accentColor.value.copy(this.sourceColor);
            } else if (ringMesh.material.color) {
                // 传统材质更新
                ringMesh.material.color.copy(this.waveColor);
            }
        });
    }

    init() {
        // 设置相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.width / this.canvas.height,
            0.1,
            1000
        );
        this.camera.position.z = 400;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(this.canvas.width, this.canvas.height, false);

        // 注册WebGL资源，标记为持久资源
        this.resourceId = webglResourceManager.registerResources(
            this.componentId,
            {
                renderer: this.renderer,
                scene: this.scene,
                camera: this.camera,
            },
            {
                persistent: true,
            }
        );

        this.createWaveSources();
        this.setupMouseInteraction();

        // 立即创建初始波纹，避免空白期
        setTimeout(() => {
            this.waveSources.forEach((source, index) => {
                // 错开初始波纹的创建时间
                setTimeout(() => {
                    this.createRipple(index, source.position);
                }, index * 300); // 每个波源延迟300ms
            });
        }, 100); // 等待100ms让场景准备好

        window.addEventListener('resize', this.onResize.bind(this));
        this.animate();
    }

    createWaveSources() {
        // 创建波源
        this.sourceGeometry = new THREE.BufferGeometry();
        this.sourceMaterial = new THREE.PointsMaterial({
            color: this.sourceColor,
            size: 10,
            transparent: true,
            opacity: 0.0, // 隐藏波源点，设置为完全透明
            sizeAttenuation: true,
        });

        const sourcePositions = [];

        // 在屏幕上分布波源
        for (let i = 0; i < this.waveSourceCount; i++) {
            const angle = (i / this.waveSourceCount) * Math.PI * 2;
            const radius = 100 + Math.random() * 50;

            const source = {
                position: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
                lastWaveTime: Date.now() + i * 400, // 错开波源，每个延迟400ms
                waveInterval: 1800 + Math.random() * 600, // 1.8-2.4秒间隔（缩短）
                pulsePhase: Math.random() * Math.PI * 2,
                waves: [], // 存储这个波源产生的波
            };

            this.waveSources.push(source);
            sourcePositions.push(source.position.x, source.position.y, source.position.z);
        }

        this.sourceGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(sourcePositions, 3)
        );
        this.sourcePoints = new THREE.Points(this.sourceGeometry, this.sourceMaterial);

        // 注释掉添加到场景的代码，这样波源就不会显示
        // this.scene.add(this.sourcePoints);
    }

    createRipple(sourceIndex, position) {
        // 为指定波源创建新的波纹
        const source = this.waveSources[sourceIndex];
        const wave = {
            sourceIndex: sourceIndex,
            position: position.clone(),
            radius: 0,
            maxRadius: this.maxRadius,
            speed: this.waveSpeed,
            opacity: 1.0,
            creationTime: Date.now(),
            startTime: this.time,
        };

        source.waves.push(wave);

        // 创建圆环几何体 - 使用更大的圆环用于shader渲染
        const ringGeometry = new THREE.RingGeometry(0, this.maxRadius, 64, 1);

        // 创建shader材质
        const ringMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: this.time },
                center: { value: new THREE.Vector2(position.x, position.y) },
                waveRadius: { value: 0 },
                maxRadius: { value: this.maxRadius },
                primaryColor: { value: this.waveColor.clone() },
                accentColor: { value: this.sourceColor.clone() },
                opacity: { value: 1.0 },
            },
            vertexShader: rippleVertexShader,
            fragmentShader: rippleFragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending, // 加法混合增强发光效果
            depthWrite: false,
        });

        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.position.copy(position);
        ringMesh.userData = {
            wave: wave,
            sourceIndex: sourceIndex,
            isShaderRipple: true, // 标记为shader波纹
        };

        this.scene.add(ringMesh);
        this.ringMeshes.push(ringMesh);

        return wave;
    }

    setupMouseInteraction() {
        const updateMouse = event => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const createMouseRipple = event => {
            updateMouse(event);

            // 将鼠标坐标转换为世界坐标
            const mousePosition = new THREE.Vector3(this.mouse.x * 300, this.mouse.y * 200, 0);

            // 创建鼠标触发的波纹（使用最近的波源）
            let nearestSourceIndex = 0;
            let minDistance = Infinity;

            this.waveSources.forEach((source, index) => {
                const distance = source.position.distanceTo(mousePosition);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestSourceIndex = index;
                }
            });

            this.createRipple(nearestSourceIndex, mousePosition);
        };

        this.canvas.addEventListener('click', createMouseRipple);
        window.addEventListener('mousemove', updateMouse);
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        this.time += 0.016; // 约60fps
        const currentTime = Date.now();

        // 更新波源脉动
        this.updateWaveSources();

        // 自动产生波纹
        this.generateAutoRipples(currentTime);

        // 更新所有波纹
        this.updateRipples();

        // 清理过期的波纹
        this.cleanupExpiredRipples();

        this.renderer.render(this.scene, this.camera);
    }

    updateWaveSources() {
        // 波源已隐藏，不需要脉动效果
        // 保留波源的内部状态更新
        for (let i = 0; i < this.waveSources.length; i++) {
            const source = this.waveSources[i];
            source.pulsePhase += 0.03; // 保留相位更新，以防后续需要
        }

        // 注释掉透明度更新，因为波源已隐藏
        // this.sourceMaterial.opacity = 0.6 + Math.sin(this.time * 1.2) * 0.2;
    }

    generateAutoRipples(currentTime) {
        // 为每个波源自动生成波纹
        this.waveSources.forEach((source, index) => {
            if (currentTime - source.lastWaveTime > source.waveInterval) {
                this.createRipple(index, source.position);
                source.lastWaveTime = currentTime;

                // 随机化下次产生波纹的时间（保持连续性）
                source.waveInterval = 1800 + Math.random() * 600; // 1.8-2.4秒
            }
        });

        // 确保始终有波纹存在 - 如果所有波纹都消失了，立即创建新的
        if (this.ringMeshes.length === 0 && currentTime > this.time * 1000 + 1000) {
            // 随机选择一个波源立即产生波纹
            const randomSource = Math.floor(Math.random() * this.waveSources.length);
            this.createRipple(randomSource, this.waveSources[randomSource].position);
        }
    }

    updateRipples() {
        // 更新所有波纹圆环
        this.ringMeshes.forEach(ringMesh => {
            const wave = ringMesh.userData.wave;

            if (!wave) return;

            // 更新波纹半径
            wave.radius += wave.speed;

            // 计算透明度（使用更平滑的衰减曲线）
            const progress = wave.radius / wave.maxRadius;
            // 使用sin曲线让波纹淡出更自然
            wave.opacity = Math.max(0, Math.sin((1 - progress) * Math.PI * 0.5));

            // 如果使用shader材质，更新uniforms
            if (ringMesh.userData.isShaderRipple && ringMesh.material.uniforms) {
                const uniforms = ringMesh.material.uniforms;

                // 更新时间
                uniforms.time.value = this.time;

                // 更新波纹半径
                uniforms.waveRadius.value = wave.radius;

                // 更新基础透明度
                uniforms.opacity.value = wave.opacity;

                // 更新主题颜色
                uniforms.primaryColor.value.copy(this.waveColor);
                uniforms.accentColor.value.copy(this.sourceColor);

                // 根据时间创建颜色变化
                const timeOffset = (this.time - wave.startTime) * 0.5;
                const hue = (timeOffset % (Math.PI * 2)) / (Math.PI * 2);

                // 创建彩虹渐变效果
                const rainbowColor = new THREE.Color().setHSL(hue, 0.8, 0.6);
                uniforms.accentColor.value.lerp(rainbowColor, 0.3);
            } else {
                // 传统材质更新方式（保留作为备用）
                const innerRadius = Math.max(0, wave.radius - 3);
                const outerRadius = wave.radius;

                // 更新几何体
                ringMesh.geometry.dispose();
                ringMesh.geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);

                // 更新材质
                ringMesh.material.opacity = wave.opacity * 0.3;
            }

            // 添加干涉效果：当波纹相互接近时增强亮度
            this.calculateInterference(wave, ringMesh);
        });
    }

    calculateInterference(currentWave, currentMesh) {
        let interferenceBoost = 0;

        // 检查与其他波纹的干涉
        this.ringMeshes.forEach(otherMesh => {
            if (otherMesh === currentMesh) return;

            const otherWave = otherMesh.userData.wave;
            if (!otherWave) return;

            const distance = currentWave.position.distanceTo(otherWave.position);
            const radiusDiff = Math.abs(currentWave.radius - otherWave.radius);

            // 当两个波纹的边缘接近时产生干涉
            if (radiusDiff < 15 && distance < currentWave.radius + otherWave.radius) {
                interferenceBoost += 0.4;
            }
        });

        // 应用干涉增强
        if (currentMesh.userData.isShaderRipple && currentMesh.material.uniforms) {
            // Shader材质：通过opacity uniform增强
            const baseOpacity = currentMesh.material.uniforms.opacity.value;
            currentMesh.material.uniforms.opacity.value = Math.min(
                1.0,
                baseOpacity + interferenceBoost
            );

            // 干涉时增强颜色亮度
            if (interferenceBoost > 0) {
                const brightColor = this.waveColor
                    .clone()
                    .multiplyScalar(1 + interferenceBoost * 0.5);
                currentMesh.material.uniforms.primaryColor.value.lerp(brightColor, 0.3);
            }
        } else {
            // 传统材质：直接修改opacity
            currentMesh.material.opacity = Math.min(
                0.8,
                currentMesh.material.opacity + interferenceBoost
            );
        }
    }

    cleanupExpiredRipples() {
        // 清理超出最大半径的波纹
        for (let i = this.ringMeshes.length - 1; i >= 0; i--) {
            const ringMesh = this.ringMeshes[i];
            const wave = ringMesh.userData.wave;

            if (!wave || wave.radius > wave.maxRadius) {
                // 从场景中移除
                this.scene.remove(ringMesh);

                // 清理几何体和材质
                if (ringMesh.geometry) ringMesh.geometry.dispose();
                if (ringMesh.material) ringMesh.material.dispose();

                // 从数组中移除
                this.ringMeshes.splice(i, 1);

                // 从波源的波纹列表中移除
                if (wave.sourceIndex !== undefined) {
                    const source = this.waveSources[wave.sourceIndex];
                    const waveIndex = source.waves.indexOf(wave);
                    if (waveIndex > -1) {
                        source.waves.splice(waveIndex, 1);
                    }
                }
            }
        }
    }

    onResize() {
        if (!this.camera || !this.renderer) return;

        this.camera.aspect = this.canvas.width / this.canvas.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.width, this.canvas.height, false);
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        window.removeEventListener('resize', this.onResize.bind(this));

        // 清理所有波纹
        this.ringMeshes.forEach(ringMesh => {
            this.scene.remove(ringMesh);
            if (ringMesh.geometry) ringMesh.geometry.dispose();
            if (ringMesh.material) {
                // 如果是shader材质，需要清理uniforms
                if (ringMesh.material.uniforms) {
                    Object.values(ringMesh.material.uniforms).forEach(uniform => {
                        if (uniform.value && uniform.value.dispose) {
                            uniform.value.dispose();
                        }
                    });
                }
                ringMesh.material.dispose();
            }
        });

        // 清理几何体和材质
        if (this.sourceGeometry) this.sourceGeometry.dispose();
        if (this.sourceMaterial) this.sourceMaterial.dispose();

        // 清理WebGL资源
        if (this.resourceId) {
            webglResourceManager.cleanup(this.resourceId);
            this.resourceId = null;
        }
    }

    destroy() {
        this.stop();
    }
}
