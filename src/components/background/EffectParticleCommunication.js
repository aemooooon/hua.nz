import * as THREE from 'three';
import webglResourceManager from '../../utils/WebGLResourceManager';

export class EffectParticleCommunication {
    constructor(canvas, params = {}, componentId = 'BackgroundCanvas') {
        this.canvas = canvas;
        this.componentId = componentId;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.animationFrameId = null;
        this.time = 0;
        this.resourceId = null;

        // 通信网络参数
        this.hubCount = params.hubCount || 6; // 通信中心数量
        this.particlesPerHub = params.particlesPerHub || 15; // 每个中心的粒子数
        this.orbitRadius = params.orbitRadius || 80; // 轨道半径
        this.transmissionSpeed = params.transmissionSpeed || 1.5; // 传输速度

        // 动态主题色配置
        this.hubColor = new THREE.Color('#00ffff');
        this.dataPacketColor = new THREE.Color('#4dd0e1');
        this.transmissionColor = new THREE.Color('#00ffff');

        // 存储通信网络对象
        this.hubs = [];
        this.dataPackets = [];
        this.transmissionPaths = [];

        // 几何体和材质
        this.hubGeometry = null;
        this.dataPacketGeometry = null;
        this.pathGeometry = null;
        this.hubMaterial = null;
        this.dataPacketMaterial = null;
        this.pathMaterial = null;

        // 场景对象
        this.hubPoints = null;
        this.dataPacketPoints = null;
        this.pathLines = null;

        this.updateThemeColors();

        try {
            this.init();
        } catch (error) {
            console.error('EffectParticleCommunication: Failed to initialize Three.js', error);
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
            this.hubColor.setStyle(primaryColor);
            this.transmissionColor.setStyle(primaryColor);
        }
        if (accentColor) {
            this.dataPacketColor.setStyle(accentColor);
        }

        // 更新材质颜色
        if (this.hubMaterial) {
            this.hubMaterial.color.copy(this.hubColor);
        }
        if (this.dataPacketMaterial) {
            this.dataPacketMaterial.color.copy(this.dataPacketColor);
        }
        if (this.pathMaterial) {
            this.pathMaterial.color.copy(this.transmissionColor);
        }
    }

    init() {
        // 设置相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.width / this.canvas.height,
            0.1,
            1000
        );
        this.camera.position.z = 300;

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

        this.createCommunicationNetwork();

        window.addEventListener('resize', this.onResize.bind(this));
        this.animate();
    }

    createCommunicationNetwork() {
        this.createHubs();
        this.createDataPackets();
        this.createTransmissionPaths();
    }

    createHubs() {
        // 创建通信中心（核心节点）
        this.hubGeometry = new THREE.BufferGeometry();
        this.hubMaterial = new THREE.PointsMaterial({
            color: this.hubColor,
            size: 8,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
        });

        const hubPositions = [];

        // 在3D空间中分布通信中心
        for (let i = 0; i < this.hubCount; i++) {
            const theta = (i / this.hubCount) * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1); // 球面分布
            const radius = 150 + Math.random() * 100;

            const hub = {
                position: new THREE.Vector3(
                    radius * Math.sin(phi) * Math.cos(theta),
                    radius * Math.sin(phi) * Math.sin(theta),
                    radius * Math.cos(phi)
                ),
                orbitPhase: Math.random() * Math.PI * 2,
                pulsePhase: Math.random() * Math.PI * 2,
            };

            this.hubs.push(hub);
            hubPositions.push(hub.position.x, hub.position.y, hub.position.z);
        }

        this.hubGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(hubPositions, 3)
        );
        this.hubPoints = new THREE.Points(this.hubGeometry, this.hubMaterial);
        this.scene.add(this.hubPoints);
    }

    createDataPackets() {
        // 创建数据包粒子
        this.dataPacketGeometry = new THREE.BufferGeometry();
        this.dataPacketMaterial = new THREE.PointsMaterial({
            color: this.dataPacketColor,
            size: 3,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });

        const packetPositions = [];

        // 为每个通信中心创建围绕它运行的数据包
        this.hubs.forEach((hub, hubIndex) => {
            for (let i = 0; i < this.particlesPerHub; i++) {
                const packet = {
                    hubIndex: hubIndex,
                    orbitAngle: (i / this.particlesPerHub) * Math.PI * 2,
                    orbitRadius: this.orbitRadius + Math.random() * 20,
                    orbitSpeed: 0.02 + Math.random() * 0.01,
                    verticalOffset: (Math.random() - 0.5) * 30,
                    position: new THREE.Vector3(),
                };

                // 计算初始位置
                this.updateDataPacketPosition(packet, hub);
                this.dataPackets.push(packet);

                packetPositions.push(packet.position.x, packet.position.y, packet.position.z);
            }
        });

        this.dataPacketGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(packetPositions, 3)
        );
        this.dataPacketPoints = new THREE.Points(this.dataPacketGeometry, this.dataPacketMaterial);
        this.scene.add(this.dataPacketPoints);
    }

    updateDataPacketPosition(packet, hub) {
        // 计算数据包在轨道上的位置
        const x = hub.position.x + Math.cos(packet.orbitAngle) * packet.orbitRadius;
        const y = hub.position.y + Math.sin(packet.orbitAngle) * packet.orbitRadius;
        const z = hub.position.z + packet.verticalOffset;

        packet.position.set(x, y, z);
    }

    createTransmissionPaths() {
        // 创建传输路径（连接线）
        this.pathMaterial = new THREE.LineBasicMaterial({
            color: this.transmissionColor,
            transparent: true,
            opacity: 0.15,
        });

        this.updateTransmissionPaths();
    }

    updateTransmissionPaths() {
        // 移除旧的传输路径
        if (this.pathLines) {
            this.scene.remove(this.pathLines);
            if (this.pathGeometry) {
                this.pathGeometry.dispose();
            }
        }

        const pathPositions = [];

        // 在通信中心之间创建传输路径
        for (let i = 0; i < this.hubs.length; i++) {
            for (let j = i + 1; j < this.hubs.length; j++) {
                const hubA = this.hubs[i];
                const hubB = this.hubs[j];
                const distance = hubA.position.distanceTo(hubB.position);

                // 只连接距离适中的节点
                if (distance < 300) {
                    pathPositions.push(
                        hubA.position.x,
                        hubA.position.y,
                        hubA.position.z,
                        hubB.position.x,
                        hubB.position.y,
                        hubB.position.z
                    );
                }
            }
        }

        this.pathGeometry = new THREE.BufferGeometry();
        this.pathGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(pathPositions, 3)
        );

        this.pathLines = new THREE.LineSegments(this.pathGeometry, this.pathMaterial);
        this.scene.add(this.pathLines);
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        this.time += 0.01;

        // 更新通信中心的脉动效果
        this.updateHubs();

        // 更新数据包轨道运动
        this.updateDataPackets();

        // 更新传输路径的闪烁效果
        this.updateTransmissionEffect();

        this.renderer.render(this.scene, this.camera);
    }

    updateHubs() {
        const hubPositions = this.hubGeometry.attributes.position.array;

        for (let i = 0; i < this.hubs.length; i++) {
            const hub = this.hubs[i];

            // 轻微的轨道运动
            hub.orbitPhase += 0.005;
            const orbitOffset = Math.sin(hub.orbitPhase) * 10;

            // 更新位置
            hubPositions[i * 3] = hub.position.x + orbitOffset;
            hubPositions[i * 3 + 1] = hub.position.y;
            hubPositions[i * 3 + 2] = hub.position.z;
        }

        this.hubGeometry.attributes.position.needsUpdate = true;

        // 脉动效果
        this.hubMaterial.opacity = 0.7 + Math.sin(this.time * 3) * 0.2;
    }

    updateDataPackets() {
        const packetPositions = this.dataPacketGeometry.attributes.position.array;

        for (let i = 0; i < this.dataPackets.length; i++) {
            const packet = this.dataPackets[i];
            const hub = this.hubs[packet.hubIndex];

            // 更新轨道角度
            packet.orbitAngle += packet.orbitSpeed;

            // 计算新位置
            this.updateDataPacketPosition(packet, hub);

            // 更新位置数组
            packetPositions[i * 3] = packet.position.x;
            packetPositions[i * 3 + 1] = packet.position.y;
            packetPositions[i * 3 + 2] = packet.position.z;
        }

        this.dataPacketGeometry.attributes.position.needsUpdate = true;

        // 数据包闪烁效果
        this.dataPacketMaterial.opacity = 0.6 + Math.sin(this.time * 4) * 0.2;
    }

    updateTransmissionEffect() {
        // 传输路径的波动透明度效果
        this.pathMaterial.opacity = 0.1 + Math.sin(this.time * 2) * 0.05;

        // 每隔一段时间重新计算传输路径
        if (Math.floor(this.time * 60) % 120 === 0) {
            this.updateTransmissionPaths();
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

        // 清理几何体和材质
        if (this.hubGeometry) this.hubGeometry.dispose();
        if (this.dataPacketGeometry) this.dataPacketGeometry.dispose();
        if (this.pathGeometry) this.pathGeometry.dispose();
        if (this.hubMaterial) this.hubMaterial.dispose();
        if (this.dataPacketMaterial) this.dataPacketMaterial.dispose();
        if (this.pathMaterial) this.pathMaterial.dispose();

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
