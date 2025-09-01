/**
 * RectAreaLight Lighting System for Gallery
 * 基于Three.js官方webgl_lights_rectarealight.html示例
 * 为画廊增加高质量矩形区域光照效果
 */

import * as THREE from 'three';
import { RectAreaLightHelper } from 'three-stdlib';
import { RectAreaLightUniformsLib } from 'three-stdlib';

export class RectAreaLightingSystem {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.rectLights = [];
        this.helpers = [];
        this.animationId = null;

        // 配置参数
        this.config = {
            // 光照参数
            intensity: options.intensity || 5,
            colors: options.colors || [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24], // 柔和的色彩组合
            showHelpers: options.showHelpers || false,

            // 动画参数
            enableAnimation: options.enableAnimation !== false, // 默认启用
            animationSpeed: options.animationSpeed || 0.001,

            // 几何参数
            lightWidth: options.lightWidth || 6,
            lightHeight: options.lightHeight || 8,

            // 画廊适配参数
            positions: options.positions || [
                { x: -18, y: 8, z: 15, rx: 0, ry: 0, rz: 0 }, // 左墙上方
                { x: 18, y: 8, z: 15, rx: 0, ry: Math.PI, rz: 0 }, // 右墙上方
                { x: 0, y: 10, z: 35, rx: -Math.PI / 2, ry: 0, rz: 0 }, // 前墙天花板
                { x: 0, y: 10, z: -15, rx: -Math.PI / 2, ry: Math.PI, rz: 0 }, // 后墙天花板
            ],
        };

        this.clock = new THREE.Clock();
        this.init();
    }

    /**
     * 初始化RectAreaLight系统
     */
    init() {
        // 初始化RectAreaLight uniforms（必需步骤）
        RectAreaLightUniformsLib.init();

        // 创建矩形区域光源
        this.createRectAreaLights();

        // 启动动画循环
        if (this.config.enableAnimation) {
            this.startAnimation();
        }
    }

    /**
     * 创建矩形区域光源
     */
    createRectAreaLights() {
        this.config.positions.forEach((position, index) => {
            const color = this.config.colors[index % this.config.colors.length];

            // 创建RectAreaLight
            const rectLight = new THREE.RectAreaLight(
                color,
                this.config.intensity,
                this.config.lightWidth,
                this.config.lightHeight
            );

            // 设置位置和旋转
            rectLight.position.set(position.x, position.y, position.z);
            rectLight.rotation.set(position.rx, position.ry, position.rz);

            // 添加到场景
            this.scene.add(rectLight);
            this.rectLights.push(rectLight);

            // 添加辅助线（可选）
            if (this.config.showHelpers) {
                const helper = new RectAreaLightHelper(rectLight);
                this.scene.add(helper);
                this.helpers.push(helper);
            }

            // 存储初始参数用于动画
            rectLight.userData = {
                originalIntensity: this.config.intensity,
                originalColor: new THREE.Color(color),
                animationPhase: (index / this.config.positions.length) * Math.PI * 2,
                index: index,
            };
        });
    }

    /**
     * 启动动画循环
     */
    startAnimation() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.updateAnimation();
        };
        animate();
    }

    /**
     * 更新动画效果
     */
    updateAnimation() {
        const time = this.clock.getElapsedTime();

        this.rectLights.forEach((light, index) => {
            const userData = light.userData;

            // 缓慢的强度波动
            const intensityWave = Math.sin(
                time * this.config.animationSpeed * 1000 + userData.animationPhase
            );
            light.intensity = userData.originalIntensity + intensityWave * 2;

            // 轻微的色彩变化
            const colorShift =
                Math.sin(time * this.config.animationSpeed * 500 + userData.animationPhase * 2) *
                0.1;
            light.color.copy(userData.originalColor);

            // 根据位置调整色彩变化
            switch (index) {
                case 0: // 左墙 - 红色系
                    light.color.r = Math.max(0.3, light.color.r + colorShift);
                    break;
                case 1: // 右墙 - 蓝绿色系
                    light.color.g = Math.max(0.3, light.color.g + colorShift);
                    light.color.b = Math.max(0.3, light.color.b + colorShift);
                    break;
                case 2: // 前墙天花板 - 蓝色系
                    light.color.b = Math.max(0.3, light.color.b + colorShift);
                    break;
                case 3: // 后墙天花板 - 黄色系
                    light.color.r = Math.max(0.3, light.color.r + colorShift);
                    light.color.g = Math.max(0.3, light.color.g + colorShift);
                    break;
            }
        });
    }

    /**
     * 设置整体强度
     */
    setIntensity(intensity) {
        this.config.intensity = intensity;
        this.rectLights.forEach(light => {
            light.userData.originalIntensity = intensity;
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

        if (this.config.showHelpers) {
            // 添加辅助线
            this.rectLights.forEach(light => {
                const helper = new RectAreaLightHelper(light);
                this.scene.add(helper);
                this.helpers.push(helper);
            });
        } else {
            // 移除辅助线
            this.helpers.forEach(helper => {
                this.scene.remove(helper);
            });
            this.helpers = [];
        }
    }

    /**
     * 设置预设效果
     */
    setPreset(presetName) {
        switch (presetName) {
            case 'warm':
                this.config.colors = [0xff6b6b, 0xf9ca24, 0xff9ff3, 0xee5a24];
                this.setIntensity(6);
                this.setAnimationSpeed(0.0008);
                break;
            case 'cool':
                this.config.colors = [0x4ecdc4, 0x45b7d1, 0xa55eea, 0x26de81];
                this.setIntensity(5);
                this.setAnimationSpeed(0.0012);
                break;
            case 'dramatic':
                this.config.colors = [0xff3838, 0x2f3542, 0xff6348, 0x7bed9f];
                this.setIntensity(8);
                this.setAnimationSpeed(0.002);
                break;
            case 'soft':
                this.config.colors = [0xffeaa7, 0xdda0dd, 0x98d8c8, 0xf7dc6f];
                this.setIntensity(3);
                this.setAnimationSpeed(0.0005);
                break;
        }

        // 更新现有光源的颜色
        this.rectLights.forEach((light, index) => {
            const newColor = this.config.colors[index % this.config.colors.length];
            light.userData.originalColor = new THREE.Color(newColor);
        });
    }

    /**
     * 切换动画开关
     */
    toggleAnimation() {
        this.config.enableAnimation = !this.config.enableAnimation;

        if (this.config.enableAnimation) {
            this.startAnimation();
        } else {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }

            // 重置到原始状态
            this.rectLights.forEach(light => {
                light.intensity = light.userData.originalIntensity;
                light.color.copy(light.userData.originalColor);
            });
        }
    }

    /**
     * 获取当前配置状态
     */
    getStatus() {
        return {
            intensity: this.config.intensity,
            animationSpeed: this.config.animationSpeed,
            enableAnimation: this.config.enableAnimation,
            showHelpers: this.config.showHelpers,
            lightCount: this.rectLights.length,
        };
    }

    /**
     * 销毁资源
     */
    dispose() {
        // 停止动画
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // 移除光源
        this.rectLights.forEach(light => {
            this.scene.remove(light);
        });
        this.rectLights = [];

        // 移除辅助线
        this.helpers.forEach(helper => {
            this.scene.remove(helper);
        });
        this.helpers = [];
    }
}

export default RectAreaLightingSystem;
