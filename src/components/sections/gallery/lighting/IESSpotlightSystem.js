/**
 * IES Spotlight System
 * 在天花板上创建IES聚光灯系统，基于Three.js webgpu_lights_ies_spotlight示例
 * 专门为画廊天花板照明设计
 */

import * as THREE from 'three';

export class IESSpotlightSystem {
    constructor(scene, renderer, options = {}) {
        this.scene = scene;
        this.renderer = renderer;
        this.spotlights = [];
        this.animationId = null;

        // 配置参数 - 减少聚光灯数量优化性能
        this.config = {
            // 聚光灯数量和布局 - 减少到4个聚光灯优化性能
            lightCount: options.lightCount || 4,

            // 天花板高度配置（基于画廊空间）
            ceilingHeight: options.ceilingHeight || 10, // 降低到10米获得更好照射效果

            // 聚光灯位置（优化布局：3个聚光灯避开lightbox墙面）
            positions: [
                // 左侧32米墙中间
                { x: -36, y: 10, z: 0 }, // 左墙中央

                // 右侧32米墙中间
                { x: 36, y: 10, z: 0 }, // 右墙中央

                // 72米墙的后部（避开前墙lightbox）
                { x: 0, y: 10, z: -24 }, // 后墙24米位置
            ],

            // 目标位置（对应3个聚光灯的照射目标）
            targets: [
                // 左墙中央目标
                { x: -32, y: 1, z: 0 }, // 照射左墙中央画作

                // 右墙中央目标
                { x: 32, y: 1, z: 0 }, // 照射右墙中央画作

                // 后墙目标
                { x: 0, y: 1, z: -20 }, // 照射后墙中央画作
            ],

            // 光照参数 - 减少数量后增强单个聚光灯效果
            intensity: options.intensity || 3500, // 大幅提升强度补偿数量减少
            distance: options.distance || 70, // 增加照射距离确保全覆盖
            angle: options.angle || Math.PI / 2, // 90度角，最大覆盖范围
            penumbra: options.penumbra || 0.3, // 增加柔化范围，更好的光线混合

            // 颜色配置 - 使用项目主题色系
            colors: [
                0xff0040, // 鲜红色 - 左墙
                0x00ff88, // si-green主题色 - 右墙
                0x00ffff, // nz-blue主题色 - 后墙
            ],

            // 动画配置 - 更明显的颜色变化
            enableAnimation: options.enableAnimation !== false,
            animationSpeed: options.animationSpeed || 0.5, // 提高动画速度使颜色变化更明显

            // 显示辅助线 - 默认关闭
            showHelpers: options.showHelpers || false,
        };

        this.clock = new THREE.Clock();
        this.init();
    }

    /**
     * 初始化IES聚光灯系统
     */
    async init() {
        try {
            // 创建聚光灯
            await this.createSpotlights();

            // 启动动画
            if (this.config.enableAnimation) {
                this.startAnimation();
            }

            console.log('✨ IES聚光灯系统初始化完成');
        } catch (error) {
            console.warn('⚠️ IES聚光灯初始化失败，使用标准聚光灯:', error);
            // 降级到标准聚光灯
            this.createStandardSpotlights();
        }
    }

    /**
     * 创建IES聚光灯（如果支持）
     */
    async createSpotlights() {
        // 尝试动态加载IESSpotLight
        let IESSpotLight = null;
        try {
            const threeStdlib = await import('three-stdlib');
            IESSpotLight = threeStdlib.IESSpotLight;
        } catch (error) {
            console.log('🎯 IESSpotLight不可用:', error.message);
        }

        // 检查是否支持IESSpotLight - 注意这是WebGPU特有的功能
        if (IESSpotLight && this.renderer.isWebGPURenderer) {
            console.log('🎯 使用IES聚光灯 (WebGPU)');
            await this.createIESSpotlights(IESSpotLight);
        } else {
            console.log('🎯 使用标准聚光灯（降级方案）');
            this.createStandardSpotlights();
        }
    }

    /**
     * 创建IES聚光灯
     */
    async createIESSpotlights(IESSpotLight) {
        // 注意：实际的IES文件加载需要服务器上的IES文件
        // 这里先创建基础的IES聚光灯，后续可以添加IES贴图

        for (let i = 0; i < this.config.lightCount; i++) {
            const position = this.config.positions[i];
            const target = this.config.targets[i];
            const color = this.config.colors[i % this.config.colors.length];

            // 创建IES聚光灯
            const spotlight = new IESSpotLight(color, this.config.intensity);
            spotlight.position.set(position.x, position.y, position.z);
            spotlight.angle = this.config.angle;
            spotlight.penumbra = this.config.penumbra;
            spotlight.distance = this.config.distance;
            spotlight.castShadow = true;

            // 设置阴影参数 - 提升阴影质量以更好显示彩色光照
            spotlight.shadow.mapSize.width = 2048; // 提升到2048
            spotlight.shadow.mapSize.height = 2048; // 提升到2048
            spotlight.shadow.camera.near = 0.5;
            spotlight.shadow.camera.far = this.config.distance;
            spotlight.shadow.bias = -0.0001; // 减少阴影瑕疵
            spotlight.shadow.normalBias = 0.02; // 改善阴影质量

            // 设置目标
            spotlight.target.position.set(target.x, target.y, target.z);

            this.scene.add(spotlight);
            this.scene.add(spotlight.target);

            // 创建辅助线（可选）
            if (this.config.showHelpers) {
                const helper = new THREE.SpotLightHelper(spotlight);
                spotlight.userData.helper = helper;
                this.scene.add(helper);
            }

            // 存储聚光灯数据
            const spotlightData = {
                light: spotlight,
                originalPosition: { ...position },
                originalTarget: { ...target },
                originalIntensity: this.config.intensity,
                originalColor: new THREE.Color(color),
                animationPhase: i * Math.PI * 0.5,
                index: i,
            };

            this.spotlights.push(spotlightData);

            console.log(
                `💡 创建IES聚光灯 ${i + 1}: 位置(${position.x}, ${position.y}, ${position.z}) -> 目标(${target.x}, ${target.y}, ${target.z})`
            );
        }
    }

    /**
     * 创建标准聚光灯（降级方案）
     */
    createStandardSpotlights() {
        for (let i = 0; i < this.config.lightCount; i++) {
            const position = this.config.positions[i];
            const target = this.config.targets[i];
            const color = this.config.colors[i % this.config.colors.length];

            // 创建标准聚光灯
            const spotlight = new THREE.SpotLight(
                color,
                this.config.intensity,
                this.config.distance,
                this.config.angle,
                this.config.penumbra
            );
            spotlight.position.set(position.x, position.y, position.z);
            spotlight.castShadow = true;

            // 设置阴影参数 - 提升阴影质量以更好显示彩色光照
            spotlight.shadow.mapSize.width = 2048; // 提升到2048
            spotlight.shadow.mapSize.height = 2048; // 提升到2048
            spotlight.shadow.camera.near = 0.5;
            spotlight.shadow.camera.far = this.config.distance;
            spotlight.shadow.bias = -0.0001; // 减少阴影瑕疵
            spotlight.shadow.normalBias = 0.02; // 改善阴影质量

            // 设置目标
            spotlight.target.position.set(target.x, target.y, target.z);

            this.scene.add(spotlight);
            this.scene.add(spotlight.target);

            // 创建辅助线（可选）
            if (this.config.showHelpers) {
                const helper = new THREE.SpotLightHelper(spotlight);
                spotlight.userData.helper = helper;
                this.scene.add(helper);
            }

            // 存储聚光灯数据
            const spotlightData = {
                light: spotlight,
                originalPosition: { ...position },
                originalTarget: { ...target },
                originalIntensity: this.config.intensity,
                originalColor: new THREE.Color(color),
                animationPhase: i * Math.PI * 0.5,
                index: i,
            };

            this.spotlights.push(spotlightData);

            console.log(
                `💡 创建标准聚光灯 ${i + 1}: 位置(${position.x}, ${position.y}, ${position.z}) -> 目标(${target.x}, ${target.y}, ${target.z})`
            );
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
     * 更新动画 - 大面积照明优化版本
     */
    updateAnimation() {
        const time = this.clock.getElapsedTime() * this.config.animationSpeed;

        this.spotlights.forEach((spotlightData, index) => {
            const { light, originalTarget, animationPhase } = spotlightData;

            // 简化的动画逻辑（3个聚光灯：左、右、后，避开lightbox前墙）

            // 每个聚光灯有轻微不同的动画模式
            const timeOffset = time + animationPhase;

            // 目标位置在原始位置周围小范围移动，包括垂直方向
            const moveRange = 2; // 减小到2米范围内移动，更精确
            const x = originalTarget.x + Math.sin(timeOffset * 0.8) * moveRange * 0.3;
            const z = originalTarget.z + Math.cos(timeOffset * 0.6) * moveRange * 0.3;
            // 添加轻微的垂直移动，在画作高度范围内（Y=0.5到Y=1.5之间）
            const y = originalTarget.y + Math.sin(timeOffset * 0.4) * 0.5; // ±0.5米垂直移动

            light.target.position.x = x;
            light.target.position.y = y;
            light.target.position.z = z;

            // 更细腻的强度变化 - 保持高强度基础上的微调
            const intensityBase = 0.9; // 提高基础强度到90%
            const intensityVariation = Math.sin(timeOffset * 1.2 + index * 0.5) * 0.2; // ±20%变化
            light.intensity =
                spotlightData.originalIntensity * (intensityBase + intensityVariation);

            // 动态颜色变化 - 增强彩色效果
            const colorShift = Math.sin(timeOffset * 0.8 + index * 0.6) * 0.3; // 更大的颜色变化
            const hsl = {};
            spotlightData.originalColor.getHSL(hsl);

            // 色相循环变化
            const newHue = (hsl.h + colorShift + time * 0.1) % 1;
            // 饱和度变化，确保颜色鲜艳
            const newSaturation = Math.max(0.7, hsl.s + Math.sin(timeOffset * 1.5) * 0.3);
            // 亮度变化
            const newLightness = Math.max(
                0.4,
                Math.min(0.8, hsl.l + Math.sin(timeOffset * 2) * 0.2)
            );

            const newColor = new THREE.Color().setHSL(newHue, newSaturation, newLightness);
            light.color.copy(newColor);

            // 极其轻微的角度调整
            const angleVariation = Math.sin(timeOffset * 0.5 + index * 0.3) * 0.02; // ±0.02弧度
            light.angle = this.config.angle + angleVariation;

            // 更新辅助线
            if (light.userData.helper) {
                light.userData.helper.update();
            }
        });
    }

    /**
     * 设置强度
     */
    setIntensity(intensity) {
        this.config.intensity = intensity;
        this.spotlights.forEach(spotlightData => {
            spotlightData.originalIntensity = intensity;
            spotlightData.light.intensity = intensity;
        });
    }

    /**
     * 设置动画速度
     */
    setAnimationSpeed(speed) {
        this.config.animationSpeed = speed;
    }

    /**
     * 切换辅助线显示
     */
    toggleHelpers() {
        this.config.showHelpers = !this.config.showHelpers;

        this.spotlights.forEach(spotlightData => {
            const { light } = spotlightData;

            if (this.config.showHelpers) {
                if (!light.userData.helper) {
                    const helper = new THREE.SpotLightHelper(light);
                    light.userData.helper = helper;
                    this.scene.add(helper);
                }
                light.userData.helper.visible = true;
            } else {
                if (light.userData.helper) {
                    light.userData.helper.visible = false;
                }
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
     * 获取状态信息
     */
    getStatus() {
        return {
            lightCount: this.config.lightCount,
            intensity: this.config.intensity,
            enableAnimation: this.config.enableAnimation,
            showHelpers: this.config.showHelpers,
            animationSpeed: this.config.animationSpeed,
        };
    }

    /**
     * 清理资源
     */
    dispose() {
        this.stopAnimation();

        // 清理所有聚光灯和辅助线
        this.spotlights.forEach(spotlightData => {
            const { light } = spotlightData;

            if (light) {
                this.scene.remove(light);
                this.scene.remove(light.target);

                if (light.userData.helper) {
                    this.scene.remove(light.userData.helper);
                }
            }
        });

        this.spotlights = [];
        console.log('🧹 IES聚光灯系统已清理');
    }
}
