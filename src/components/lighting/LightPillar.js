/**
 * Light Pillar System
 * 在画廊中创建发光圆柱体柱子，从地板延伸到天花板
 * 支持贴图材质、发光效果和照明功能
 */

import * as THREE from 'three';

export class LightPillar {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.lightCylinders = [];
        this.animationId = null;
        this.textureLoader = new THREE.TextureLoader();
        
        // 画廊尺寸配置
        this.roomConfig = {
            floorY: -2,      // 地面Y坐标
            ceilingY: 8,     // 天花板Y坐标 
            height: 10       // 房间总高度 (8 - (-2) = 10)
        };
        
        // 配置参数 - 圆柱体版本
        this.config = {
            // 圆柱体参数（替代原来的立方体参数）
            radius: options.radius || 0.5,              // 半径0.5米（直径1米）
            height: this.roomConfig.height,             // 从地板到天花板
            radialSegments: options.radialSegments || 32, // 圆周分段数，越多越圆滑
            heightSegments: options.heightSegments || 1,   // 高度分段数
            
            // 向后兼容的立方体参数（如果有人还在使用）
            cubeWidth: options.cubeWidth || 1.0,    
            cubeHeight: options.cubeHeight || 8,    
            cubeDepth: options.cubeDepth || 1.0,    
            cubeCount: options.cubeCount || 3,
            
            // 材质选项
            enableTexture: options.enableTexture !== false, // 默认启用贴图功能
            textureUrl: options.textureUrl || null,
            baseColor: options.baseColor || 0xff0040,
            
            // 发光效果选项
            enableGlow: options.enableGlow !== false,
            glowIntensity: options.glowIntensity || 0.7,
            emissiveIntensity: options.emissiveIntensity || 0.3,
            
            // 位置配置 - 圆柱体版本
            positions: [
                // lightbox前左侧圆柱：32米墙的1/3位置 (-32/3 ≈ -10.67米)
                { 
                    x: -5, 
                    z: 24, 
                    color: 0x00FF88,  // si-green主题色
                    textureUrl: null   // 可以为每个柱子单独设置贴图
                },
                
                // lightbox前右侧圆柱：32米墙的2/3位置 (32/3 ≈ 10.67米)
                { 
                    x: 5, 
                    z: 24, 
                    color: 0x00ffff,  // nz-blue主题色
                    textureUrl: null
                },
                
                // 红色圆柱：摄像机背后，更换为gallery-horizontal-16.jpg，优化贴图比例直径
                { 
                    x: 0, 
                    z: -18, 
                    color: 0xff0040,  // 鲜红色
                    textureUrl: '/gallery/gallery-horizontal-11.jpg',  // 更换为horizontal-16
                    radius: 1.618,  // 直径2.2米，半径1.1米（优化贴图3783×5411比例）
                    rotationY: Math.PI / 1.5  // 柱子绕Y轴旋转180度，避免接缝正对摄像机
                }
            ],
            
            // 光照参数
            intensity: options.intensity || 20,  // 保持原来的参数名
            lightIntensity: options.lightIntensity || 20,
            lightDistance: options.lightDistance || 80,
            
            // 动画参数
            enableAnimation: options.enableAnimation !== false,
            animationSpeed: options.animationSpeed || 0.001,
            
            // 兼容旧版本的颜色配置
            colors: [
                0x00FF88, // si-green主题色 - lightbox前左侧柱子（绿色主题）
                0x00ffff, // nz-blue主题色 - lightbox前右侧柱子（青色主题）
                0xff0040, // 鲜红色 - 摄像机背后单独柱子
            ]
        };
        
        this.clock = new THREE.Clock();
        this.lightCubes = this.lightCylinders; // 向后兼容
        this.init();
    }

    /**
     * 初始化光圆柱体系统
     */
    init() {
        console.log('🏛️ 初始化发光圆柱体系统（从地板到天花板）...');
        this.createLightCylinders();
        
        if (this.config.enableAnimation) {
            this.startAnimation();
        }
    }
    
    /**
     * 创建所有发光圆柱体（兼容旧版本方法名）
     */
    createLightCubes() {
        this.createLightCylinders();
    }
    
    /**
     * 创建所有发光圆柱体
     */
    createLightCylinders() {
        this.config.positions.forEach((pos, index) => {
            this.createSingleLightCylinder(pos, index);
        });
    }
    
    /**
     * 兼容旧版本的创建方法
     */
    createSingleLightCube(x, y, z, index) {
        const posConfig = {
            x: x,
            z: z,
            color: this.config.colors[index] || this.config.baseColor,
            textureUrl: null
        };
        this.createSingleLightCylinder(posConfig, index);
    }
    
    /**
     * 创建单个发光圆柱体
     */
    createSingleLightCylinder(posConfig, index) {
        const cylinderData = {
            position: { x: posConfig.x, y: 2, z: posConfig.z }, // Y=2为圆柱中心点
            mesh: null,
            light: null,
            index: index,
            config: posConfig
        };
        
        // 创建圆柱体几何体（稍微短于房间高度以避免Z-fighting）
        const cylinderRadius = posConfig.radius || this.config.radius; // 使用单独配置的半径或默认半径
        const cylinderHeight = this.config.height - 0.05; // 比房间高度短5厘米，避免与地板/天花板Z-fighting
        const geometry = new THREE.CylinderGeometry(
            cylinderRadius,                  // 顶部半径
            cylinderRadius,                  // 底部半径
            cylinderHeight,                  // 高度（稍微短于房间高度）
            this.config.radialSegments,      // 径向分段
            this.config.heightSegments       // 高度分段
        );
        
        // 创建材质
        const material = this.createCylinderMaterial(posConfig, index);
        
        // 创建网格 - 调整位置确保视觉上从地板到天花板（但稍微短一点）
        const cylinderMesh = new THREE.Mesh(geometry, material);
        const centerY = (this.roomConfig.floorY + this.roomConfig.ceilingY) / 2; // 计算中心点Y坐标
        cylinderMesh.position.set(posConfig.x, centerY, posConfig.z); // 精确定位到房间中心
        
        // 如果配置了Y轴旋转，应用旋转（用于调整贴图朝向）
        if (posConfig.rotationY !== undefined) {
            cylinderMesh.rotation.y = posConfig.rotationY;
            console.log(`🔄 柱子绕Y轴旋转: ${(posConfig.rotationY * 180 / Math.PI).toFixed(1)}度`);
        }
        
        this.scene.add(cylinderMesh);
        cylinderData.mesh = cylinderMesh;
        
        // 更新存储的位置信息
        cylinderData.position.y = centerY;
        
        // 创建点光源（如果启用照明）
        if (this.config.enableGlow) {
            const pointLight = new THREE.PointLight(
                posConfig.color, 
                this.config.lightIntensity, 
                this.config.lightDistance
            );
            pointLight.position.set(posConfig.x, centerY, posConfig.z); // 光源位置与柱子中心一致
            this.scene.add(pointLight);
            cylinderData.light = pointLight;
        }
        
        // 存储动画数据
        cylinderData.originalColor = new THREE.Color(posConfig.color);
        cylinderData.originalIntensity = this.config.lightIntensity;
        cylinderData.animationPhase = index * Math.PI * 0.6;
        
        this.lightCylinders.push(cylinderData);
        
        const positionDesc = [
            "Lightbox前左侧柱子(32米墙的1/3位置，约-10.67米)",
            "Lightbox前右侧柱子(32米墙的2/3位置，约10.67米)", 
            "摄像机背后红色柱子(从地板到天花板，黄金比例直径)"
        ];
        
        console.log(`🏛️ 创建发光圆柱体 ${index + 1}: ${positionDesc[index]} 位置(${posConfig.x}, ${centerY}, ${posConfig.z}), 高度${this.config.height}米, 半径${cylinderRadius}米, 直径${(cylinderRadius * 2).toFixed(3)}米`);
        
        // 如果有贴图，显示贴图信息
        if (posConfig.textureUrl) {
            console.log(`🖼️ 圆柱体 ${index + 1} 应用贴图: ${posConfig.textureUrl}`);
        }
    }
    
    /**
     * 创建圆柱体材质（支持贴图）
     */
    createCylinderMaterial(posConfig, index) {
        const baseColor = posConfig.color || this.config.baseColor;
        const textureUrl = posConfig.textureUrl || this.config.textureUrl;
        
        let materialOptions = {
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        };
        
        // 如果有贴图，加载贴图
        if (textureUrl && this.config.enableTexture) {
            console.log(`🖼️ 为圆柱体 ${index + 1} 加载贴图: ${textureUrl}`);
            
            const texture = this.textureLoader.load(
                textureUrl,
                (texture) => {
                    console.log(`✅ 贴图加载成功: ${textureUrl}`);
                    // 设置贴图包装模式
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    // 调整贴图重复次数 - 适合gallery图片显示
                    texture.repeat.set(1, 1); // 保持原图比例，不重复（适合展示gallery图片）
                },
                undefined,
                (error) => {
                    console.error(`❌ 贴图加载失败: ${textureUrl}`, error);
                }
            );
            
            // 使用带贴图的标准材质（保持照明功能）
            materialOptions = {
                ...materialOptions,
                map: texture,
                color: new THREE.Color(1, 1, 1), // 白色底色，让贴图原色显示
                emissive: new THREE.Color(baseColor).multiplyScalar(this.config.emissiveIntensity), // 发光效果
            };
            
            return new THREE.MeshStandardMaterial(materialOptions);
        } else {
            // 无贴图，使用发光材质 - 统一使用MeshStandardMaterial支持emissive
            materialOptions = {
                ...materialOptions,
                color: baseColor,
                emissive: new THREE.Color(baseColor).multiplyScalar(this.config.emissiveIntensity), // 自发光
            };
            
            return new THREE.MeshStandardMaterial(materialOptions);
        }
    }
    
    /**
     * 动态设置贴图
     */
    setTexture(cylinderIndex, textureUrl) {
        if (cylinderIndex >= 0 && cylinderIndex < this.lightCylinders.length) {
            const cylinderData = this.lightCylinders[cylinderIndex];
            
            if (textureUrl) {
                console.log(`🖼️ 为圆柱体 ${cylinderIndex + 1} 设置新贴图: ${textureUrl}`);
                
                const texture = this.textureLoader.load(textureUrl);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, 1); // 保持原图比例，适合gallery图片显示
                
                // 创建新的带贴图材质（保持照明功能）
                const newMaterial = new THREE.MeshStandardMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.9,
                    emissive: new THREE.Color(cylinderData.config.color).multiplyScalar(this.config.emissiveIntensity),
                    side: THREE.DoubleSide
                });
                
                // 更新材质 - 添加安全检查
                if (cylinderData.mesh && cylinderData.mesh.material) {
                    cylinderData.mesh.material.dispose(); // 清理旧材质
                    cylinderData.mesh.material = newMaterial;
                }
                
                console.log(`✅ 圆柱体 ${cylinderIndex + 1} 贴图已应用，照明功能保持正常`);
            } else {
                console.log(`🔄 移除圆柱体 ${cylinderIndex + 1} 的贴图，恢复发光效果`);
                
                // 恢复无贴图的发光材质 - 使用MeshStandardMaterial支持emissive
                const newMaterial = new THREE.MeshStandardMaterial({
                    color: cylinderData.config.color,
                    transparent: true,
                    opacity: 0.9,
                    emissive: new THREE.Color(cylinderData.config.color).multiplyScalar(this.config.emissiveIntensity),
                    side: THREE.DoubleSide
                });
                
                // 更新材质 - 添加安全检查
                if (cylinderData.mesh && cylinderData.mesh.material) {
                    cylinderData.mesh.material.dispose();
                    cylinderData.mesh.material = newMaterial;
                }
            }
        }
    }

    /**
     * 启动动画
     */
    startAnimation() {
        const animate = () => {
            if (!this.config.enableAnimation) return;
            
            this.updateAnimation();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    /**
     * 更新动画效果
     */
    updateAnimation() {
        const time = this.clock.getElapsedTime();
        
        this.lightCylinders.forEach(cylinderData => {
            if (cylinderData.light) {
                // 强度脉冲动画
                const pulse = Math.sin(time * this.config.animationSpeed * 1000 + cylinderData.animationPhase) * 0.3 + 0.7;
                cylinderData.light.intensity = cylinderData.originalIntensity * pulse;
                
                // 轻微的颜色变化（只影响光源，不影响贴图）
                const colorShift = Math.sin(time * this.config.animationSpeed * 500 + cylinderData.animationPhase) * 0.1;
                const hsl = {};
                cylinderData.originalColor.getHSL(hsl);
                hsl.h = (hsl.h + colorShift) % 1;
                
                const newColor = new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
                cylinderData.light.color.copy(newColor);
                
                // 安全检查：确保mesh和material存在后再更新材质颜色
                if (cylinderData.mesh && cylinderData.mesh.material) {
                    // 如果材质没有贴图，也更新材质颜色
                    if (!cylinderData.mesh.material.map) {
                        cylinderData.mesh.material.color.copy(newColor);
                        // 确保材质支持emissive属性（MeshStandardMaterial支持）
                        if (cylinderData.mesh.material.emissive) {
                            cylinderData.mesh.material.emissive.copy(newColor.clone().multiplyScalar(this.config.emissiveIntensity));
                        }
                    }
                }
            }
        });
    }
    
    /**
     * 停止动画
     */
    stopAnimation() {
        this.config.enableAnimation = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    /**
     * 设置照明强度（兼容旧版本方法名）
     */
    setIntensity(intensity) {
        this.setLightIntensity(intensity);
    }
    
    /**
     * 设置照明强度
     */
    setLightIntensity(intensity) {
        this.config.lightIntensity = intensity;
        this.config.intensity = intensity; // 向后兼容
        this.lightCylinders.forEach(cylinderData => {
            cylinderData.originalIntensity = intensity;
            if (cylinderData.light) {
                cylinderData.light.intensity = intensity;
            }
        });
    }
    
    /**
     * 切换动画
     */
    toggleAnimation() {
        this.config.enableAnimation = !this.config.enableAnimation;
        if (this.config.enableAnimation) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }
    
    /**
     * 获取系统状态
     */
    getStatus() {
        return {
            cylinderCount: this.lightCylinders.length,
            cubeCount: this.lightCylinders.length, // 向后兼容
            lightIntensity: this.config.lightIntensity,
            intensity: this.config.intensity, // 向后兼容
            enableAnimation: this.config.enableAnimation,
            enableTexture: this.config.enableTexture,
            radius: this.config.radius,
            height: this.config.height
        };
    }
    
    /**
     * 清理资源
     */
    dispose() {
        this.stopAnimation();
        
        // 清理所有圆柱体和灯光
        this.lightCylinders.forEach(cylinderData => {
            if (cylinderData.mesh) {
                this.scene.remove(cylinderData.mesh);
                // 安全清理几何体和材质
                if (cylinderData.mesh.geometry) {
                    cylinderData.mesh.geometry.dispose();
                }
                if (cylinderData.mesh.material) {
                    cylinderData.mesh.material.dispose();
                }
            }
            if (cylinderData.light) {
                this.scene.remove(cylinderData.light);
            }
        });
        
        this.lightCylinders = [];
        console.log('🏛️ 发光圆柱体系统已清理');
    }
}
