/**
 * Light Cube Sys            // 精确位置配置
            // 基于画廊布局：72m长度，lightbox在房间前端
            // 地面在Y=        // 创建实际的立方体几何体，使用新的尺寸：宽1.0米 × 高8米 × 深1.0米
        const geometry = new THREE.BoxGeometry(
            this.config.cubeWidth,   // 宽度1.0米
            this.config.cubeHeight,  // 高度8米
            this.config.cubeDepth    // 深度1.0米
        );高度6米，所以Y坐标应该是-2+3=1（底        // 位置描述
        const positionDesc = [
            "Lightbox前左侧(离lightbox墙6米,离72米墙8米)",
            "Lightbox前右侧(离lightbox墙6米,离72米墙8米)", 
            "默认摄像机背后12米处(背景氛围照明)"
        ];
        
        console.log(`🎯 创建发光立方体 ${index + 1}: ${positionDesc[index]} 位置(${x}, ${y}, ${z}), 尺寸(${this.config.cubeWidth}×${this.config.cubeHeight}×${this.config.cubeDepth}), 地面贴合`);
    }         positions: [
                // lightbox前左侧立方体：离lightbox墙6米，离72米墙8米
                { x: -8, y: 1, z: 24 },      // Y=1 (地面-2+高度6米的一半3=1，完全贴地)
                
                // lightbox前右侧立方体：离lightbox墙6米，离72米墙8米  
                { x: 8, y: 1, z: 24 },       // Y=1 (地面-2+高度6米的一半3=1，完全贴地)
                
                // 默认摄像机背后立方体：摄像机背后改为前方6米处
                { x: 0, y: 1, z: 6 }         // Y=1, Z=6 (摄像机前方6米)
            ],ry
 * 在房间中间创建实际的发光立方体，就像Three.js示例那样
 * 简化版本，专注于视觉效果
 */

import * as THREE from 'three';

export class LightCubeSystem {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.lightCubes = [];
        this.animationId = null;
        
        // 配置参数 - 精确定位版本
        this.config = {
            // 立方体参数
            cubeWidth: options.cubeWidth || 1.0,    // 宽度1.0米
            cubeHeight: options.cubeHeight || 8,    // 高度8米  
            cubeDepth: options.cubeDepth || 1.0,    // 深度1.0米
            cubeCount: options.cubeCount || 3,
            
            // 精确位置配置
            // 基于画廊布局：72m长度，lightbox在房间前端
            // 地面在Y=-2，立方体高度8米，所以Y坐标应该是-2+4=2（底部贴地）
            positions: [
                // lightbox前左侧立方体：离lightbox墙6米，离72米墙8米
                { x: -8, y: 2, z: 24 },      // Y=2 (地面-2+高度8米的一半4=2，完全贴地)
                
                // lightbox前右侧立方体：离lightbox墙6米，离72米墙8米  
                { x: 8, y: 2, z: 24 },       // Y=2 (地面-2+高度8米的一半4=2，完全贴地)
                
                // 默认摄像机背后立方体：摄像机背后12米
                { x: 0, y: 2, z: -18 }       // Y=2, Z=-12 (摄像机背后12米位置)
            ],
            
            // 光照参数
            intensity: options.intensity || 20,
            
            // 简化的颜色方案 - 类似Three.js示例
            colors: [
                0x0040ff, // 蓝色
                0x00ff40, // 绿色  
                0xff4000, // 红色
            ],
            
            // 动画参数
            enableAnimation: options.enableAnimation !== false,
            animationSpeed: options.animationSpeed || 0.001
        };
        
        this.clock = new THREE.Clock();
        this.init();
    }

    /**
     * 初始化光立方体系统
     */
    init() {
        // 创建发光立方体
        this.createLightCubes();
        
        // 启动动画
        if (this.config.enableAnimation) {
            this.startAnimation();
        }
    }
    
    /**
     * 创建发光立方体 - 精确定位版本
     */
    createLightCubes() {
        // 使用预定义的精确位置
        this.config.positions.forEach((pos, index) => {
            this.createSingleLightCube(pos.x, pos.y, pos.z, index);
        });
    }
    
    /**
     * 创建单个发光立方体 - 精确定位版本
     */
    createSingleLightCube(x, y, z, index) {
        const cubeData = {
            position: { x, y, z },
            mesh: null,
            light: null,
            index: index
        };
        
        // 创建实际的立方体几何体，使用新的尺寸：宽0.8米 × 高6米 × 深0.8米
        const geometry = new THREE.BoxGeometry(
            this.config.cubeWidth,   // 宽度0.8米
            this.config.cubeHeight,  // 高度6米
            this.config.cubeDepth    // 深度0.8米
        );
        
        // 使用发光材质，类似Three.js示例
        const color = this.config.colors[index % this.config.colors.length];
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        
        const cubeMesh = new THREE.Mesh(geometry, material);
        cubeMesh.position.set(x, y, z);
        this.scene.add(cubeMesh);
        cubeData.mesh = cubeMesh;
        
        // 在立方体中心添加一个强光源，增强亮度和照射范围
        const pointLight = new THREE.PointLight(color, this.config.intensity, 80);
        pointLight.position.set(x, y, z);
        this.scene.add(pointLight);
        cubeData.light = pointLight;
        
        // 存储动画数据
        cubeData.originalColor = new THREE.Color(color);
        cubeData.originalIntensity = this.config.intensity;
        cubeData.animationPhase = index * Math.PI * 0.6;
        
        this.lightCubes.push(cubeData);
        
        // 位置描述
        const positionDesc = [
            "Lightbox前左侧(离lightbox墙6米,离72米墙8米)",
            "Lightbox前右侧(离lightbox墙6米,离72米墙8米)", 
            "默认摄像机前方6米处(Z=6位置)"
        ];
        
        console.log(`🎯 创建发光立方体 ${index + 1}: ${positionDesc[index]} 位置(${x}, ${y}, ${z}), 尺寸(${this.config.cubeWidth}×${this.config.cubeHeight}×${this.config.cubeDepth}), 地面贴合`);
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
     * 更新动画 - 简化版本
     */
    updateAnimation() {
        const time = this.clock.getElapsedTime();
        
        this.lightCubes.forEach(cubeData => {
            // 强度脉冲动画
            const pulse = Math.sin(time * this.config.animationSpeed * 1000 + cubeData.animationPhase) * 0.3 + 0.7;
            cubeData.light.intensity = cubeData.originalIntensity * pulse;
            
            // 轻微的颜色变化
            const colorShift = Math.sin(time * this.config.animationSpeed * 500 + cubeData.animationPhase) * 0.1;
            const hsl = {};
            cubeData.originalColor.getHSL(hsl);
            hsl.h = (hsl.h + colorShift) % 1;
            
            const newColor = new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
            cubeData.light.color.copy(newColor);
            cubeData.mesh.material.color.copy(newColor);
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
     * 设置强度
     */
    setIntensity(intensity) {
        this.config.intensity = intensity;
        this.lightCubes.forEach(cubeData => {
            cubeData.originalIntensity = intensity;
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
     * 获取状态信息
     */
    getStatus() {
        return {
            cubeCount: this.config.cubeCount,
            intensity: this.config.intensity,
            enableAnimation: this.config.enableAnimation
        };
    }
    
    /**
     * 清理资源
     */
    dispose() {
        this.stopAnimation();
        
        // 清理所有立方体和灯光
        this.lightCubes.forEach(cubeData => {
            if (cubeData.mesh) {
                this.scene.remove(cubeData.mesh);
                cubeData.mesh.geometry.dispose();
                cubeData.mesh.material.dispose();
            }
            if (cubeData.light) {
                this.scene.remove(cubeData.light);
            }
        });
        
        this.lightCubes = [];
    }
}
