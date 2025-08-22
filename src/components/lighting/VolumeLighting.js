/**
 * Volume Lighting System for Three.js
 * 基于Three.js WebGPU示例改编，兼容传统Three.js
 * 
 * 核心原理：
 * 1. 使用3D噪声纹理模拟大气密度
 * 2. 通过光线步进算法计算体积光照
 * 3. 结合现有spotlight系统创造体积雾气效果
 */

import * as THREE from 'three';

export class VolumeLighting {
    constructor(scene, camera, renderer, options = {}) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        
        // Volume lighting configuration
        this.config = {
            // 体积雾气参数
            fogDensity: options.fogDensity || 0.02,
            fogColor: options.fogColor || 0x888888,
            noiseScale: options.noiseScale || 0.1,
            animationSpeed: options.animationSpeed || 0.3,
            
            // 几何参数
            volumeSize: options.volumeSize || { x: 72, y: 12, z: 32 }, // 匹配您的画廊尺寸
            position: options.position || { x: 0, y: 6, z: 0 },
            
            // 渲染参数
            samples: options.samples || 32, // 光线步进采样数
            intensity: options.intensity || 1.0
        };
        
        this.volumeMesh = null;
        this.volumeMaterial = null;
        this.noiseTexture = null;
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    /**
     * 创建3D噪声纹理
     * 用于模拟不均匀的大气密度分布
     */
    createNoiseTexture() {
        const size = 64; // 噪声纹理分辨率
        const data = new Uint8Array(size * size * size);
        
        // 简化的柏林噪声实现
        for (let z = 0; z < size; z++) {
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    const index = z * size * size + y * size + x;
                    
                    // 多频率噪声叠加
                    const nx = x / size;
                    const ny = y / size;
                    const nz = z / size;
                    
                    let noise = 0;
                    noise += 0.5 * this.noise3D(nx * 2, ny * 2, nz * 2);
                    noise += 0.25 * this.noise3D(nx * 4, ny * 4, nz * 4);
                    noise += 0.125 * this.noise3D(nx * 8, ny * 8, nz * 8);
                    
                    data[index] = Math.max(0, Math.min(255, (noise + 1) * 127.5));
                }
            }
        }
        
        const texture = new THREE.Data3DTexture(data, size, size, size);
        texture.format = THREE.RedFormat;
        texture.type = THREE.UnsignedByteType;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapR = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        
        return texture;
    }
    
    /**
     * 简化的3D噪声函数
     */
    noise3D(x, y, z) {
        // 简单的伪随机噪声实现
        const n = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
        return (n - Math.floor(n)) * 2.0 - 1.0;
    }
    
    /**
     * 创建体积光照材质
     */
    createVolumeMaterial() {
        const vertexShader = `
            varying vec3 vWorldPosition;
            varying vec3 vLocalPosition;
            
            void main() {
                vLocalPosition = position;
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
        `;
        
        const fragmentShader = `
            uniform float time;
            uniform float fogDensity;
            uniform vec3 fogColor;
            uniform float intensity;
            uniform vec3 lightPositions[8];  // 支持多个光源
            uniform vec3 lightColors[8];
            uniform float lightIntensities[8];
            uniform int numLights;
            uniform sampler2D noiseTexture; // 使用2D纹理模拟3D噪声
            
            varying vec3 vWorldPosition;
            varying vec3 vLocalPosition;
            
            // 简化的噪声函数
            float noise3D(vec3 p) {
                // 将3D坐标映射到2D纹理
                vec2 uv1 = p.xy * 0.05 + time * 0.008; // 降低频率
                vec2 uv2 = p.yz * 0.03 + time * 0.005; // 更缓慢的动画
                
                float n1 = texture2D(noiseTexture, uv1).r;
                float n2 = texture2D(noiseTexture, uv2).r;
                
                return (n1 + n2) * 0.5;
            }
            
            void main() {
                vec3 rayDir = normalize(vWorldPosition - cameraPosition);
                vec3 rayPos = vWorldPosition;
                
                // 光线步进参数 - 优化性能
                float stepSize = 0.3; // 增大步长，减少计算
                int steps = 16; // 减少步数
                
                vec3 totalLight = vec3(0.0);
                float totalDensity = 0.0;
                
                // 光线步进循环
                for (int i = 0; i < 16; i++) {
                    if (i >= steps) break;
                    
                    // 采样当前位置的噪声密度
                    float density = noise3D(rayPos * 0.1) * fogDensity; // 减小噪声频率
                    
                    if (density > 0.005) { // 降低密度阈值
                        // 计算来自各个光源的贡献
                        for (int j = 0; j < 8; j++) {
                            if (j >= numLights) break;
                            
                            vec3 lightDir = lightPositions[j] - rayPos;
                            float lightDistance = length(lightDir);
                            lightDir = normalize(lightDir);
                            
                            // 优化的光照衰减
                            float attenuation = 1.0 / (1.0 + lightDistance * lightDistance * 0.01);
                            
                            // 增强的光散射计算
                            float scattering = max(0.0, dot(lightDir, -rayDir));
                            scattering = pow(scattering, 1.5); // 适度前向散射
                            
                            // 增加环境散射
                            float ambientScattering = 0.3;
                            scattering = mix(ambientScattering, scattering, 0.7);
                            
                            vec3 lightContribution = lightColors[j] * lightIntensities[j] * 
                                                   attenuation * scattering * density * 2.0; // 增强亮度
                            
                            totalLight += lightContribution;
                        }
                        
                        totalDensity += density;
                    }
                    
                    rayPos += rayDir * stepSize;
                }
                
                // 最终颜色输出
                vec3 color = totalLight * intensity;
                float alpha = min(0.8, totalDensity * 3.0); // 限制最大不透明度
                
                gl_FragColor = vec4(color, alpha);
            }
        `;
        
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0.0 },
                fogDensity: { value: this.config.fogDensity },
                fogColor: { value: new THREE.Color(this.config.fogColor) },
                intensity: { value: this.config.intensity },
                lightPositions: { value: [] },
                lightColors: { value: [] },
                lightIntensities: { value: [] },
                numLights: { value: 0 },
                noiseTexture: { value: this.createSimpleNoiseTexture() }
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide, // 从内部渲染
            depthWrite: false
        });
    }
    
    /**
     * 创建简单的2D噪声纹理（作为3D噪声的替代）
     */
    createSimpleNoiseTexture() {
        const size = 256;
        const data = new Uint8Array(size * size);
        
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                const x = i / size;
                const y = j / size;
                
                // 多频率噪声
                let noise = 0;
                noise += 0.5 * Math.sin(x * Math.PI * 4) * Math.sin(y * Math.PI * 4);
                noise += 0.25 * Math.sin(x * Math.PI * 8) * Math.sin(y * Math.PI * 8);
                noise += 0.125 * Math.sin(x * Math.PI * 16) * Math.sin(y * Math.PI * 16);
                
                data[index] = Math.max(0, Math.min(255, (noise + 1) * 127.5));
            }
        }
        
        const texture = new THREE.DataTexture(data, size, size, THREE.RedFormat);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.needsUpdate = true;
        
        return texture;
    }
    
    /**
     * 初始化体积光照系统
     */
    init() {
        // 创建体积材质
        this.volumeMaterial = this.createVolumeMaterial();
        
        // 创建体积几何体 - 覆盖整个画廊空间
        const geometry = new THREE.BoxGeometry(
            this.config.volumeSize.x,
            this.config.volumeSize.y,
            this.config.volumeSize.z
        );
        
        this.volumeMesh = new THREE.Mesh(geometry, this.volumeMaterial);
        this.volumeMesh.position.set(
            this.config.position.x,
            this.config.position.y,
            this.config.position.z
        );
        
        // 添加到场景
        this.scene.add(this.volumeMesh);
    }
    
    /**
     * 更新光源信息
     * @param {Array} spotlights - 聚光灯数组
     */
    updateLights(spotlights) {
        const maxLights = 8;
        const positions = [];
        const colors = [];
        const intensities = [];
        
        const numLights = Math.min(spotlights.length, maxLights);
        
        for (let i = 0; i < numLights; i++) {
            const light = spotlights[i];
            positions.push(light.position.x, light.position.y, light.position.z);
            colors.push(light.color.r, light.color.g, light.color.b);
            intensities.push(light.intensity);
        }
        
        // 填充剩余位置
        for (let i = numLights; i < maxLights; i++) {
            positions.push(0, 0, 0);
            colors.push(0, 0, 0);
            intensities.push(0);
        }
        
        this.volumeMaterial.uniforms.lightPositions.value = positions;
        this.volumeMaterial.uniforms.lightColors.value = colors;
        this.volumeMaterial.uniforms.lightIntensities.value = intensities;
        this.volumeMaterial.uniforms.numLights.value = numLights;
    }
    
    /**
     * 更新动画
     */
    update() {
        if (this.volumeMaterial) {
            this.volumeMaterial.uniforms.time.value = this.clock.getElapsedTime();
        }
    }
    
    /**
     * 设置体积光照强度
     */
    setIntensity(intensity) {
        this.config.intensity = intensity;
        if (this.volumeMaterial) {
            this.volumeMaterial.uniforms.intensity.value = intensity;
        }
    }
    
    /**
     * 设置雾气密度
     */
    setFogDensity(density) {
        this.config.fogDensity = density;
        if (this.volumeMaterial) {
            this.volumeMaterial.uniforms.fogDensity.value = density;
        }
    }
    
    /**
     * 销毁资源
     */
    dispose() {
        if (this.volumeMesh) {
            this.scene.remove(this.volumeMesh);
            this.volumeMesh.geometry.dispose();
            this.volumeMaterial.dispose();
        }
        
        if (this.noiseTexture) {
            this.noiseTexture.dispose();
        }
    }
}

export default VolumeLighting;
