import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import PropTypes from 'prop-types';

const ImmersiveMuseumGallery = ({ items, onItemClick, isVisible }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const spotLightRef = useRef(null);
    const columnsRef = useRef([]);
    const animationIdRef = useRef(null);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());
    const [hoveredObject, setHoveredObject] = useState(null);
    const [isUserInteracting, setIsUserInteracting] = useState(false);
    const [isCameraAnimating, setIsCameraAnimating] = useState(false);
    const textureLoaderRef = useRef(new THREE.TextureLoader());
    const loadedTexturesRef = useRef(new Map());

    // 预加载纹理
    const preloadTexture = useCallback((src) => {
        if (loadedTexturesRef.current.has(src)) {
            return loadedTexturesRef.current.get(src);
        }

        const texture = textureLoaderRef.current.load(src, (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.generateMipmaps = false;
        });

        loadedTexturesRef.current.set(src, texture);
        return texture;
    }, []);

    // 创建立方体柱子
    const createColumn = useCallback((x, z, height, width, depth, imageItems) => {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        
        // 为每个面创建不同的材质
        const materials = [];
        const faces = ['front', 'back', 'top', 'bottom', 'right', 'left'];
        
        faces.forEach((face, index) => {
            if (index < 4 && imageItems[index]) {
                // 前、后、右、左四个面贴图片
                const texture = preloadTexture(imageItems[index].src);
                const material = new THREE.MeshLambertMaterial({ 
                    map: texture,
                    transparent: true
                });
                materials.push(material);
            } else {
                // 顶部和底部使用纯色
                const material = new THREE.MeshLambertMaterial({ 
                    color: index === 2 ? 0x666666 : 0x444444 // 顶部更亮，底部也增加亮度
                });
                materials.push(material);
            }
        });

        const mesh = new THREE.Mesh(geometry, materials);
        mesh.position.set(x, height / 2, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // 存储图片信息用于点击交互
        mesh.userData = {
            images: imageItems,
            isColumn: true,
            originalPosition: { x, y: height / 2, z },
            height,
            width,
            depth
        };

        return mesh;
    }, [preloadTexture]);

    // 初始化场景
    const initScene = useCallback(() => {
        if (!mountRef.current) return;

        // 创建场景
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1a1a);  // 稍微亮一点的背景
        scene.fog = new THREE.Fog(0x1a1a1a, 50, 200);
        sceneRef.current = scene;

        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            45,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            1,
            1000
        );
        camera.position.set(0, 40, 80);
        cameraRef.current = camera;

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // 创建控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 15;  // 增加最小距离
        controls.maxDistance = 150; // 减少最大距离
        controls.maxPolarAngle = Math.PI / 2.2; // 稍微限制俯视角度
        controls.enableDamping = true;
        controls.dampingFactor = 0.08; // 增加阻尼，让控制更平滑
        controls.rotateSpeed = 0.5;    // 减慢旋转速度
        controls.panSpeed = 0.8;       // 调整平移速度
        controls.zoomSpeed = 1.0;      // 调整缩放速度
        
        // 监听控制器交互事件
        controls.addEventListener('start', () => setIsUserInteracting(true));
        controls.addEventListener('end', () => setIsUserInteracting(false));
        
        controlsRef.current = controls;

        // 创建环境光 - 增加亮度
        const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambientLight);

        // 创建方向光作为基础照明
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 200;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        scene.add(directionalLight);

        // 创建聚光灯 - 增加强度
        const spotLight = new THREE.SpotLight(0xffffff, 200);
        spotLight.position.set(0, 50, 0);
        spotLight.angle = Math.PI / 3;
        spotLight.penumbra = 0.3;
        spotLight.decay = 1;
        spotLight.distance = 150;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        spotLight.shadow.camera.near = 1;
        spotLight.shadow.camera.far = 100;
        spotLight.shadow.focus = 1;
        spotLight.shadow.bias = -0.0005;
        scene.add(spotLight);
        spotLightRef.current = spotLight;

        // 聚光灯辅助线（可选，调试用）
        // const lightHelper = new THREE.SpotLightHelper(spotLight);
        // scene.add(lightHelper);
        // lightHelperRef.current = lightHelper;

        // 创建地面
        const floorGeometry = new THREE.PlaneGeometry(400, 400);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 }); // 更亮的地面
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

    }, []);

    // 创建立方体柱子群
    const createColumnGroup = useCallback(() => {
        if (!sceneRef.current || !items.length) return;

        const columns = [];
        const scene = sceneRef.current;

        // 清除现有的柱子
        columnsRef.current.forEach(column => {
            scene.remove(column);
        });
        columnsRef.current = [];

        // 生成随机布局的柱子 - 减少数量提高性能
        const numColumns = Math.min(3, Math.ceil(items.length / 4)); // 最多3个柱子
        
        // 预设3个柱子的位置，形成三角形布局
        const presetPositions = [
            { x: 0, z: -30 },     // 前方中央
            { x: -25, z: 15 },    // 左后
            { x: 25, z: 15 }      // 右后
        ];

        for (let i = 0; i < numColumns; i++) {
            const position = presetPositions[i] || { x: 0, z: 0 };

            // 稍微大一些的随机尺寸，因为柱子数量减少了
            const height = 15 + Math.random() * 25;  // 增加高度
            const width = 4 + Math.random() * 3;     // 增加宽度
            const depth = 4 + Math.random() * 3;     // 增加深度

            // 为这个柱子分配4张图片
            const startIndex = i * 4;
            const columnImages = items.slice(startIndex, startIndex + 4);

            // 如果图片不足4张，用现有图片填充
            while (columnImages.length < 4 && items.length > 0) {
                columnImages.push(items[columnImages.length % items.length]);
            }

            const column = createColumn(
                position.x, 
                position.z, 
                height, 
                width, 
                depth, 
                columnImages
            );

            columns.push(column);
            scene.add(column);
        }

        columnsRef.current = columns;
    }, [items, createColumn]);

    // 处理鼠标移动 - 添加节流
    const handleMouseMove = useCallback((event) => {
        if (!mountRef.current || isUserInteracting || isCameraAnimating) return;

        const rect = mountRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // 射线检测
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(columnsRef.current);

        if (intersects.length > 0) {
            const newHovered = intersects[0].object;
            if (newHovered !== hoveredObject) {
                // 重置之前的悬停对象
                if (hoveredObject) {
                    hoveredObject.scale.setScalar(1);
                }
                // 设置新的悬停对象
                newHovered.scale.setScalar(1.05);
                setHoveredObject(newHovered);
                document.body.style.cursor = 'pointer';
            }
        } else if (hoveredObject) {
            hoveredObject.scale.setScalar(1);
            setHoveredObject(null);
            document.body.style.cursor = 'auto';
        }
    }, [hoveredObject, isUserInteracting, isCameraAnimating]);

    // 聚焦到柱子
    const focusOnColumn = useCallback((column) => {
        if (!cameraRef.current || !controlsRef.current || isCameraAnimating) return;

        setIsCameraAnimating(true);
        const position = column.position;
        
        // 使用轨道控制器的方法平滑移动
        const distance = 20;
        const targetPosition = new THREE.Vector3(
            position.x + distance * 0.7,
            position.y + distance * 0.5,
            position.z + distance * 0.7
        );

        // 禁用控制器以防止冲突
        controlsRef.current.enabled = false;

        // 平滑移动相机和目标
        const startPosition = cameraRef.current.position.clone();
        const startTarget = controlsRef.current.target.clone();
        const startTime = Date.now();
        const duration = 1000; // 减少动画时间

        const animateCamera = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

            cameraRef.current.position.lerpVectors(startPosition, targetPosition, easeProgress);
            controlsRef.current.target.lerpVectors(startTarget, position, easeProgress);
            controlsRef.current.update();

            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            } else {
                // 动画完成，重新启用控制器
                controlsRef.current.enabled = true;
                setIsCameraAnimating(false);
            }
        };

        animateCamera();
    }, [isCameraAnimating]);

    // 处理点击
    const handleClick = useCallback((event) => {
        if (!mountRef.current || isUserInteracting || isCameraAnimating) return;

        const rect = mountRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(columnsRef.current);

        if (intersects.length > 0) {
            const clickedColumn = intersects[0].object;
            
            // 立即触发PhotoSwipe，不等相机动画
            if (clickedColumn.userData.images.length > 0) {
                onItemClick(clickedColumn.userData.images[0], 0);
            }
            
            // 然后聚焦到柱子
            focusOnColumn(clickedColumn);
        }
    }, [onItemClick, focusOnColumn, isUserInteracting, isCameraAnimating]);

    // 动画循环
    const animate = useCallback(() => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

        // 只有在用户不交互且相机不在动画中时才旋转聚光灯
        if (spotLightRef.current && !isUserInteracting && !isCameraAnimating) {
            const time = Date.now() * 0.0003; // 减慢旋转速度
            spotLightRef.current.position.x = Math.cos(time) * 30; // 减小旋转半径
            spotLightRef.current.position.z = Math.sin(time) * 30;
            
            // 让聚光灯指向场景中心
            spotLightRef.current.target.position.set(0, 0, 0);
        }

        // 更新控制器（如果启用的话）
        if (controlsRef.current && controlsRef.current.enabled) {
            controlsRef.current.update();
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        animationIdRef.current = requestAnimationFrame(animate);
    }, [isUserInteracting, isCameraAnimating]);

    // 处理窗口大小变化
    const handleResize = useCallback(() => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
    }, []);

    // 初始化
    useEffect(() => {
        if (isVisible) {
            const currentMount = mountRef.current;
            const currentTextures = loadedTexturesRef.current;
            
            initScene();
            
            // 创建柱子群
            createColumnGroup();
            
            // 添加事件监听器
            window.addEventListener('resize', handleResize);
            if (currentMount) {
                currentMount.addEventListener('mousemove', handleMouseMove);
                currentMount.addEventListener('click', handleClick);
            }

            // 开始动画
            animate();

            return () => {
                // 清理
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current);
                }
                
                window.removeEventListener('resize', handleResize);
                if (currentMount) {
                    currentMount.removeEventListener('mousemove', handleMouseMove);
                    currentMount.removeEventListener('click', handleClick);
                    
                    if (rendererRef.current) {
                        currentMount.removeChild(rendererRef.current.domElement);
                        rendererRef.current.dispose();
                    }
                }

                // 清理纹理
                currentTextures.forEach(texture => {
                    texture.dispose();
                });
                currentTextures.clear();

                // 重置cursor
                document.body.style.cursor = 'auto';
            };
        }
    }, [isVisible, initScene, createColumnGroup, handleResize, handleMouseMove, handleClick, animate]);

    // 当items变化时重新创建柱子
    useEffect(() => {
        if (isVisible && sceneRef.current) {
            createColumnGroup();
        }
    }, [items, isVisible, createColumnGroup]);

    return (
        <div 
            ref={mountRef} 
            className="w-full h-full"
            style={{ background: '#000000' }}
        />
    );
};

ImmersiveMuseumGallery.propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};

export default ImmersiveMuseumGallery;
