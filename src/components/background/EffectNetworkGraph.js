import * as THREE from 'three';
import webglResourceManager from '../../utils/WebGLResourceManager';

export class EffectNetworkGraph {
    constructor(canvas, params = {}, componentId = 'BackgroundCanvas') {
        this.canvas = canvas;
        this.componentId = componentId;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.animationFrameId = null;
        this.time = 0;
        this.resourceId = null;

        // 网络图参数
        this.nodeCount = params.nodeCount || 50;
        this.maxConnections = params.maxConnections || 3;
        this.connectionDistance = params.connectionDistance || 200;
        this.nodeSpeed = params.nodeSpeed || 0.5;

        // 动态主题色配置
        this.nodeColor = new THREE.Color('#00ffff');
        this.connectionColor = new THREE.Color('#4dd0e1');

        // 存储节点和连线
        this.nodes = [];
        this.connections = [];
        this.nodeGeometry = null;
        this.connectionGeometry = null;
        this.nodeMaterial = null;
        this.connectionMaterial = null;
        this.nodePoints = null;
        this.connectionLines = null;

        // 鼠标交互
        this.mouse = new THREE.Vector2();
        this.mouseInfluence = 100; // 鼠标影响范围

        this.updateThemeColors();

        try {
            this.init();
        } catch (error) {
            console.error('EffectNetworkGraph: Failed to initialize Three.js', error);
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
            this.nodeColor.setStyle(primaryColor);
        }
        if (accentColor) {
            this.connectionColor.setStyle(accentColor);
        }

        // 更新材质颜色
        if (this.nodeMaterial) {
            this.nodeMaterial.color.copy(this.nodeColor);
        }
        if (this.connectionMaterial) {
            this.connectionMaterial.color.copy(this.connectionColor);
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

        this.createNetwork();
        this.setupMouseInteraction();

        window.addEventListener('resize', this.onResize.bind(this));
        this.animate();
    }

    createNetwork() {
        // 创建节点
        this.createNodes();
        // 创建连接
        this.createConnections();
    }

    createNodes() {
        // 创建节点几何体和材质
        this.nodeGeometry = new THREE.BufferGeometry();
        this.nodeMaterial = new THREE.PointsMaterial({
            color: this.nodeColor,
            size: 4,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true,
        });

        // 生成节点位置
        const positions = [];
        const velocities = [];

        for (let i = 0; i < this.nodeCount; i++) {
            const node = {
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 600,
                    (Math.random() - 0.5) * 400,
                    (Math.random() - 0.5) * 200
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * this.nodeSpeed,
                    (Math.random() - 0.5) * this.nodeSpeed,
                    (Math.random() - 0.5) * this.nodeSpeed * 0.2
                ),
                connections: [],
            };

            this.nodes.push(node);
            positions.push(node.position.x, node.position.y, node.position.z);
            velocities.push(node.velocity.x, node.velocity.y, node.velocity.z);
        }

        this.nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        this.nodePoints = new THREE.Points(this.nodeGeometry, this.nodeMaterial);
        this.scene.add(this.nodePoints);
    }

    createConnections() {
        // 创建连接线的材质
        this.connectionMaterial = new THREE.LineBasicMaterial({
            color: this.connectionColor,
            transparent: true,
            opacity: 0.3,
        });

        this.updateConnections();
    }

    updateConnections() {
        // 移除旧的连接
        if (this.connectionLines) {
            this.scene.remove(this.connectionLines);
            if (this.connectionGeometry) {
                this.connectionGeometry.dispose();
            }
        }

        // 重新计算连接
        const connectionPositions = [];

        for (let i = 0; i < this.nodes.length; i++) {
            const nodeA = this.nodes[i];
            nodeA.connections = [];

            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeB = this.nodes[j];
                const distance = nodeA.position.distanceTo(nodeB.position);

                if (
                    distance < this.connectionDistance &&
                    nodeA.connections.length < this.maxConnections &&
                    nodeB.connections.length < this.maxConnections
                ) {
                    nodeA.connections.push(j);
                    nodeB.connections.push(i);

                    // 添加连线顶点
                    connectionPositions.push(
                        nodeA.position.x,
                        nodeA.position.y,
                        nodeA.position.z,
                        nodeB.position.x,
                        nodeB.position.y,
                        nodeB.position.z
                    );
                }
            }
        }

        // 创建连接线几何体
        this.connectionGeometry = new THREE.BufferGeometry();
        this.connectionGeometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(connectionPositions, 3)
        );

        this.connectionLines = new THREE.LineSegments(
            this.connectionGeometry,
            this.connectionMaterial
        );
        this.scene.add(this.connectionLines);
    }

    setupMouseInteraction() {
        const updateMouse = event => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        window.addEventListener('mousemove', updateMouse);
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        this.time += 0.01;

        // 更新节点位置
        const positions = this.nodeGeometry.attributes.position.array;
        const mouseVector = new THREE.Vector3(this.mouse.x * 300, this.mouse.y * 200, 0);

        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];

            // 基础移动
            node.position.add(node.velocity);

            // 边界反弹
            if (Math.abs(node.position.x) > 300) node.velocity.x *= -1;
            if (Math.abs(node.position.y) > 200) node.velocity.y *= -1;
            if (Math.abs(node.position.z) > 100) node.velocity.z *= -1;

            // 鼠标吸引力
            const distanceToMouse = node.position.distanceTo(mouseVector);
            if (distanceToMouse < this.mouseInfluence) {
                const force = mouseVector
                    .clone()
                    .sub(node.position)
                    .normalize()
                    .multiplyScalar(0.1);
                node.position.add(force);
            }

            // 更新位置数组
            positions[i * 3] = node.position.x;
            positions[i * 3 + 1] = node.position.y;
            positions[i * 3 + 2] = node.position.z;
        }

        this.nodeGeometry.attributes.position.needsUpdate = true;

        // 定期更新连接（每30帧更新一次，减少计算量）
        if (Math.floor(this.time * 60) % 30 === 0) {
            this.updateConnections();
        }

        // 动态透明度变化
        this.nodeMaterial.opacity = 0.6 + Math.sin(this.time * 2) * 0.2;
        this.connectionMaterial.opacity = 0.2 + Math.sin(this.time * 1.5) * 0.1;

        this.renderer.render(this.scene, this.camera);
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
        if (this.nodeGeometry) this.nodeGeometry.dispose();
        if (this.connectionGeometry) this.connectionGeometry.dispose();
        if (this.nodeMaterial) this.nodeMaterial.dispose();
        if (this.connectionMaterial) this.connectionMaterial.dispose();

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
