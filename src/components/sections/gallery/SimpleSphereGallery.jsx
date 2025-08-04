import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';
import webglResourceManager from '../../../utils/WebGLResourceManager';

const SimpleSphereGallery = ({ items, onItemClick, isVisible }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const animationIdRef = useRef(null);
    const frameGroupsRef = useRef([]);
    const [isLoading, setIsLoading] = useState(true);
    const hoveredItemRef = useRef(null);

    // 鼠标控制
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const currentRotationRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);

    // 创建球形位置
    const createSpherePositions = useCallback((count) => {
        const positions = [];
        const radius = 8;

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions.push({ x, y, z });
        }

        return positions;
    }, []);

    // 创建图片框架
    const createImageFrame = useCallback((item, position, index) => {
        const group = new THREE.Group();

        // 框架
        const frameGeometry = new THREE.PlaneGeometry(2, 1.5);
        const frameMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.8
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        group.add(frame);

        // 图片
        const imageGeometry = new THREE.PlaneGeometry(1.8, 1.3);
        const textureLoader = new THREE.TextureLoader();
        
        // 优化纹理加载：减少内存使用
        textureLoader.load(
            item.src || item.thumbnail,
            (texture) => {
                // 性能优化：减少纹理尺寸和禁用mipmap
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                
                const imageMaterial = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true
                });
                const image = new THREE.Mesh(imageGeometry, imageMaterial);
                image.position.z = 0.01;
                image.userData = { item, index };
                group.add(image);
            },
            undefined,
            (error) => {
                console.warn('Failed to load texture:', item.src, error);
                // 创建一个默认的彩色方块
                const defaultMaterial = new THREE.MeshBasicMaterial({
                    color: Math.random() * 0xffffff
                });
                const defaultImage = new THREE.Mesh(imageGeometry, defaultMaterial);
                defaultImage.position.z = 0.01;
                defaultImage.userData = { item, index };
                group.add(defaultImage);
            }
        );

        // 设置位置
        group.position.set(position.x, position.y, position.z);
        
        // 朝向中心
        group.lookAt(0, 0, 0);

        return group;
    }, []);

    // 处理鼠标事件
    const handleMouseDown = useCallback((event) => {
        isDraggingRef.current = true;
        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
        if (mountRef.current) {
            mountRef.current.style.cursor = 'grabbing';
        }
    }, []);

    const handleMouseMove = useCallback((event) => {
        if (!cameraRef.current || !sceneRef.current || !mountRef.current) return;

        // 性能优化：节流处理鼠标移动事件
        const now = performance.now();
        if (now - (handleMouseMove.lastTime || 0) < 16) return; // ~60fps
        handleMouseMove.lastTime = now;

        // 检测悬停
        const rect = mountRef.current.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cameraRef.current);
        const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

        // 重置所有图片的hover状态
        frameGroupsRef.current.forEach(group => {
            group.children.forEach(child => {
                if (child.userData && child.userData.item) {
                    child.material.opacity = 1;
                    child.scale.setScalar(1);
                }
            });
        });

        // 设置hover效果和光标
        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            if (intersected.userData && intersected.userData.item) {
                intersected.material.opacity = 0.8;
                intersected.scale.setScalar(1.1);
                hoveredItemRef.current = intersected;
                mountRef.current.style.cursor = 'pointer';
            } else {
                hoveredItemRef.current = null;
                mountRef.current.style.cursor = 'grab';
            }
        } else {
            hoveredItemRef.current = null;
            mountRef.current.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
        }

        if (!isDraggingRef.current) return;

        const deltaX = event.clientX - mouseRef.current.x;
        const deltaY = event.clientY - mouseRef.current.y;

        targetRotationRef.current.y += deltaX * 0.01;
        targetRotationRef.current.x += deltaY * 0.01;

        // 限制 x 轴旋转
        targetRotationRef.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationRef.current.x));

        mouseRef.current.x = event.clientX;
        mouseRef.current.y = event.clientY;
    }, []);

    const handleMouseUp = useCallback(() => {
        isDraggingRef.current = false;
        if (mountRef.current) {
            mountRef.current.style.cursor = hoveredItemRef.current ? 'pointer' : 'grab';
        }
    }, []);

    // 点击检测
    const handleClick = useCallback((event) => {
        if (!cameraRef.current || !sceneRef.current) return;

        const rect = mountRef.current.getBoundingClientRect();
        const mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, cameraRef.current);

        const intersects = raycaster.intersectObjects(sceneRef.current.children, true);

        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            if (intersected.userData && intersected.userData.item) {
                onItemClick(intersected.userData.item, intersected.userData.index);
            }
        }
    }, [onItemClick]);

    // 动画循环 - 添加帧率限制以提升性能
    const animate = useCallback(() => {
        if (!isVisible) return;

        animationIdRef.current = requestAnimationFrame(animate);

        // 性能优化：限制更新频率到60fps
        const now = performance.now();
        if (now - (animate.lastTime || 0) < 16.67) return; // ~60fps
        animate.lastTime = now;

        // 平滑旋转
        const lerpFactor = 0.05;
        currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * lerpFactor;
        currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * lerpFactor;

        // 更新相机位置
        if (cameraRef.current) {
            const radius = 15;
            cameraRef.current.position.x = Math.sin(currentRotationRef.current.y) * Math.cos(currentRotationRef.current.x) * radius;
            cameraRef.current.position.y = Math.sin(currentRotationRef.current.x) * radius;
            cameraRef.current.position.z = Math.cos(currentRotationRef.current.y) * Math.cos(currentRotationRef.current.x) * radius;
            cameraRef.current.lookAt(0, 0, 0);
        }

        // 渲染
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    }, [isVisible]);

    // 浏览器 resize 处理
    const handleResize = useCallback(() => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

        const mountElement = mountRef.current;
        const width = mountElement.clientWidth;
        const height = mountElement.clientHeight;

        // 更新相机纵横比
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();

        // 更新渲染器尺寸
        rendererRef.current.setSize(width, height);
    }, []);

    // 初始化场景
    useEffect(() => {
        if (!isVisible || !mountRef.current || items.length === 0) return;

        // 初始化3D画廊场景
        
        const mountElement = mountRef.current; // 保存引用

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // 相机
        const camera = new THREE.PerspectiveCamera(
            75,
            mountElement.clientWidth / mountElement.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 15;
        cameraRef.current = camera;

        // 渲染器 - 性能优化配置
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: window.devicePixelRatio < 2, // 高DPI设备禁用抗锯齿以提升性能
            powerPreference: "high-performance",
            precision: "mediump", // 使用中等精度以平衡性能和质量
            stencil: false,
            depth: true,
            premultipliedAlpha: false
        });
        renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 限制像素比
        renderer.setClearColor(0x000000, 0);
        
        // 性能优化：禁用不必要的渲染特性
        renderer.shadowMap.enabled = false;
        renderer.physicallyCorrectLights = false;
        
        mountElement.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // 灯光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        // 创建球形位置
        const positions = createSpherePositions(items.length);
        
        // 创建图片框架
        frameGroupsRef.current = [];
        items.forEach((item, index) => {
            const frameGroup = createImageFrame(item, positions[index], index);
            scene.add(frameGroup);
            frameGroupsRef.current.push(frameGroup);
        });

        // 事件监听
        const canvas = renderer.domElement;
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('click', handleClick);
        
        // 添加 resize 事件监听
        window.addEventListener('resize', handleResize);

        // 启动动画
        animate();
        setIsLoading(false);

        // 注册WebGL资源到资源管理器
        const resourceId = webglResourceManager.registerResources('SimpleSphereGallery', {
            renderer,
            scene
        });

        // 清理函数
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            if (renderer && mountElement && renderer.domElement.parentNode) {
                mountElement.removeChild(renderer.domElement);
            }

            // 清理事件监听
            if (canvas) {
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseup', handleMouseUp);
                canvas.removeEventListener('click', handleClick);
            }
            
            // 清理 resize 事件监听
            window.removeEventListener('resize', handleResize);

            // 使用资源管理器清理WebGL资源
            webglResourceManager.cleanup(resourceId);
        };
    }, [isVisible, items, createSpherePositions, createImageFrame, handleMouseDown, handleMouseMove, handleMouseUp, handleClick, handleResize, animate]);

    return (
        <div className="relative w-full h-full">
            <div 
                ref={mountRef}
                className="w-full h-full"
                style={{ minHeight: '600px', cursor: 'grab' }}
            />
            
            {/* 优雅的3D场景加载指示器 */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
                    {/* 现代化的3D风格加载动画 */}
                    <div className="relative">
                        {/* 外层旋转环 */}
                        <div className="w-16 h-16 border-4 border-transparent border-t-blue-400 border-r-purple-500 rounded-full animate-spin"></div>
                        {/* 内层反向旋转环 */}
                        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-b-pink-500 border-l-blue-400 rounded-full animate-spin-reverse"></div>
                        {/* 中心脉动点 */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* 加载文本 */}
                    <div className="mt-4 text-white/80 text-sm font-light tracking-wide">
                        Initializing 3D Gallery...
                    </div>
                    
                    {/* 粒子效果 */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full absolute animate-ping" style={{ top: '-60px', left: '20px', animationDelay: '0s' }}></div>
                            <div className="w-1 h-1 bg-purple-500 rounded-full absolute animate-ping" style={{ top: '40px', left: '-30px', animationDelay: '0.5s' }}></div>
                            <div className="w-1 h-1 bg-pink-500 rounded-full absolute animate-ping" style={{ top: '30px', left: '50px', animationDelay: '1s' }}></div>
                            <div className="w-1 h-1 bg-blue-400 rounded-full absolute animate-ping" style={{ top: '-40px', left: '-40px', animationDelay: '1.5s' }}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

SimpleSphereGallery.propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};

export default SimpleSphereGallery;
