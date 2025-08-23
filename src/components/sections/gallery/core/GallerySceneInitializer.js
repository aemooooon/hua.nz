/**
 * Gallery场景初始化器
 * 负责初始化Three.js场景、相机、渲染器等基础组件
 */

import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import gallerySceneLoader from '../utils/GallerySceneLoader.js';

export class GallerySceneInitializer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.container = null;
        this.animationFrame = null;
        this.clock = new THREE.Clock();
        
        // 系统引用
        this.systems = {
            lightPillar: null,
            iesSpotlight: null,
            rectAreaLighting: null,
            spotlights: [],
            paintingMeshes: []
        };

        // 回调函数
        this.onSceneReady = null;
        this.onRenderLoop = null;
    }

    /**
     * 初始化场景
     */
    async initializeScene(container, options = {}) {
        this.container = container;
        
        console.log('🎬 开始初始化Gallery场景...');

        try {
            // 创建基础Three.js组件
            this.createScene();
            this.createCamera();
            this.createRenderer();
            this.createControls();

            // 设置渲染循环
            this.startRenderLoop();

            // 配置场景加载器
            this.setupSceneLoader();

            // 开始分步加载
            await gallerySceneLoader.startLoading();

            console.log('✅ Gallery场景初始化完成');
            
            if (this.onSceneReady) {
                this.onSceneReady();
            }

            return {
                scene: this.scene,
                camera: this.camera,
                renderer: this.renderer,
                controls: this.controls
            };

        } catch (error) {
            console.error('❌ Gallery场景初始化失败:', error);
            throw error;
        }
    }

    /**
     * 创建场景
     */
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a); // 深灰色背景
        this.scene.fog = new THREE.Fog(0x1a1a1a, 30, 120); // 添加雾效增强氛围
        console.log('✅ 场景创建完成');
    }

    /**
     * 创建相机
     */
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75, // fov
            this.container.clientWidth / this.container.clientHeight, // aspect
            0.1, // near
            200 // far
        );
        
        // 设置初始相机位置
        this.camera.position.set(0, 0, 30);
        this.camera.lookAt(0, 0, 0);
        
        console.log('✅ 相机创建完成');
    }

    /**
     * 创建渲染器
     */
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // 启用阴影
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // 色调映射
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        // 输出编码
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        
        // 物理正确的光照
        this.renderer.physicallyCorrectLights = true;
        
        this.container.appendChild(this.renderer.domElement);
        console.log('✅ 渲染器创建完成');
    }

    /**
     * 创建控制器
     */
    createControls() {
        try {
            // 使用PointerLockControls，与主组件保持一致
            this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
            
            // 将控制器对象添加到场景中
            this.scene.add(this.controls.getObject());
            
            console.log('✅ PointerLockControls控制器创建完成');
        } catch (error) {
            console.warn('控制器创建失败:', error);
        }
    }

    /**
     * 设置场景加载器
     */
    setupSceneLoader() {
        // 设置场景创建器
        gallerySceneLoader.setSceneCreators({
            createRoom: async () => {
                if (this.createRoomCallback) {
                    await this.createRoomCallback();
                }
            },
            createLightPillars: async () => {
                if (this.createLightPillarsCallback) {
                    await this.createLightPillarsCallback();
                }
            },
            setupLighting: async () => {
                if (this.setupLightingCallback) {
                    await this.setupLightingCallback();
                }
            },
            createIESLights: async () => {
                if (this.createIESLightsCallback) {
                    await this.createIESLightsCallback();
                }
            },
            startAnimations: async () => {
                if (this.startAnimationsCallback) {
                    await this.startAnimationsCallback();
                }
            }
        });
    }

    /**
     * 开始渲染循环
     */
    startRenderLoop() {
        const renderLoop = () => {
            this.animationFrame = requestAnimationFrame(renderLoop);
            
            const deltaTime = this.clock.getDelta();
            
            // 更新控制器
            if (this.controls) {
                this.controls.update(deltaTime);
            }

            // 执行自定义渲染循环回调
            if (this.onRenderLoop) {
                this.onRenderLoop(deltaTime);
            }

            // 渲染场景
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };
        
        renderLoop();
        console.log('✅ 渲染循环启动');
    }

    /**
     * 处理窗口大小变化
     */
    handleResize() {
        if (!this.camera || !this.renderer || !this.container) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        
        console.log(`📐 场景尺寸更新: ${width}x${height}`);
    }

    /**
     * 设置回调函数
     */
    setCallbacks(callbacks) {
        this.onSceneReady = callbacks.onSceneReady;
        this.onRenderLoop = callbacks.onRenderLoop;
        
        // 场景创建回调
        this.createRoomCallback = callbacks.createRoom;
        this.createLightPillarsCallback = callbacks.createLightPillars;
        this.setupLightingCallback = callbacks.setupLighting;
        this.createIESLightsCallback = callbacks.createIESLights;
        this.startAnimationsCallback = callbacks.startAnimations;
    }

    /**
     * 清理资源
     */
    dispose() {
        // 停止渲染循环
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        // 清理Three.js对象
        if (this.controls) {
            this.controls.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }

        // 清理场景
        if (this.scene) {
            this.scene.clear();
        }

        // 重置加载器
        gallerySceneLoader.reset();

        console.log('🧹 Gallery场景资源已清理');
    }

    /**
     * 获取场景引用
     */
    getSceneReferences() {
        return {
            scene: this.scene,
            camera: this.camera,
            renderer: this.renderer,
            controls: this.controls,
            clock: this.clock,
            systems: this.systems
        };
    }
}

export default GallerySceneInitializer;
