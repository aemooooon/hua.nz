import { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const Gallery3D = ({ 
    items = [], 
    onItemClick, 
    isVisible = false
}) => {
    const mountRef = useRef();
    const sceneRef = useRef();
    const rendererRef = useRef();
    const cameraRef = useRef();
    const framesRef = useRef([]);
    const animationIdRef = useRef();
    const mouseRef = useRef({ x: 0, y: 0 });
    const isMouseDownRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const scrollOffsetRef = useRef(0); // 图片链滚动偏移量
    const targetScrollRef = useRef(0); // 目标滚动位置
    const galleryGroupRef = useRef();
    const hoveredFrameRef = useRef(null);
    const allPositionsRef = useRef([]); // 所有图片的位置信息
    const visibleFramesRef = useRef(new Map()); // 当前可见的frame对象
    
    const [isLoading, setIsLoading] = useState(true);

    // 计算椭圆地平线的所有位置 - 适应背景椭圆
    const calculateAllEllipticalPositions = (itemCount) => {
        const positions = [];
        
        // 椭圆参数 - 匹配背景地平线
        const isMobile = window.innerWidth < 768;
        const ellipseA = isMobile ? 20 : 28; // 更大的椭圆以匹配背景
        const ellipseB = isMobile ? 7 : 10;  // 适当的短轴半径
        const baseY = isMobile ? -2.5 : -3.5; // 地平线高度
        
        for (let i = 0; i < itemCount; i++) {
            const angle = (i / itemCount) * Math.PI * 2;
            
            // 椭圆参数方程
            const x = ellipseA * Math.cos(angle);
            const z = ellipseB * Math.sin(angle);
            
            // 地平线高度变化
            const heightVariation = Math.sin(angle * 3) * 0.15 + Math.cos(angle * 5) * 0.08;
            const y = baseY + heightVariation;
            
            // 计算朝向角度（图片面向椭圆中心）
            const lookAtAngle = Math.atan2(z, x) + Math.PI;
            
            positions.push({
                position: { x, y, z },
                rotation: lookAtAngle,
                index: i,
                angle: angle,
                originalIndex: i // 保存原始索引
            });
        }
        
        return positions;
    };

    // 计算当前可视范围内需要渲染的图片索引
    const getVisibleItemIndices = (scrollOffset, itemCount, visibleCount = 15) => {
        const indices = [];
        const centerIndex = Math.round(scrollOffset) % itemCount;
        const halfVisible = Math.floor(visibleCount / 2);
        
        for (let i = -halfVisible; i <= halfVisible; i++) {
            let index = (centerIndex + i + itemCount) % itemCount;
            indices.push(index);
        }
        
        return indices;
    };

    // 创建图片框架
    const createFrame = useCallback((item, index, positions) => {
        const frameGroup = new THREE.Group();
        const position = positions[index];
        
        if (!position) return null;
        
        // 设置位置和旋转
        frameGroup.position.set(
            position.position.x,
            position.position.y,
            position.position.z
        );
        frameGroup.rotation.y = position.rotation;
        
        // 框架尺寸 - 调整比例以适应地平线视角
        const frameWidth = 2.5;  // 稍微缩小宽度
        const frameHeight = 3.5; // 稍微缩小高度
        const frameDepth = 0.12; // 减少厚度，更加精致
        
        // 创建边框 - 优化材质以匹配首页风格
        const frameGeometry = new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth);
        const frameMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a2a2a,      // 深灰色，更加优雅
            metalness: 0.6,       // 适中的金属感
            roughness: 0.3,       // 适中的粗糙度
            transparent: true,
            opacity: 0.95,        // 略微透明
            clearcoat: 0.8,       // 清漆效果
            clearcoatRoughness: 0.2,
            envMapIntensity: 0.5  // 环境映射强度
        });
        const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
        frameGroup.add(frameMesh);
        
        // 创建图片
        const imageGeometry = new THREE.PlaneGeometry(frameWidth - 0.3, frameHeight - 0.3);
        
        // 加载图片纹理
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(item.src || item.thumbnail);
        texture.colorSpace = THREE.SRGBColorSpace;
        
        const imageMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            side: THREE.DoubleSide
        });
        
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        imageMesh.position.z = frameDepth / 2 + 0.01;
        imageMesh.userData = { item: item, index: index };
        frameGroup.add(imageMesh);
        
        // 添加发光效果（用于hover状态）
        const glowGeometry = new THREE.PlaneGeometry(frameWidth + 0.5, frameHeight + 0.5);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x4CAF50,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.position.z = -frameDepth / 2 - 0.01;
        frameGroup.add(glowMesh);
        
        // 浮动动画 - 模拟微风轻拂的效果
        const floatAnimation = () => {
            const time = Date.now() * 0.001;
            const phaseOffset = index * (Math.PI / 12); // 更多的相位偏移
            
            // 轻微的上下浮动，模拟自然摆动
            const verticalFloat = Math.sin(time * 0.6 + phaseOffset) * 0.08;
            const horizontalFloat = Math.cos(time * 0.4 + phaseOffset * 0.7) * 0.03;
            
            frameGroup.position.y = position.position.y + verticalFloat;
            frameGroup.position.x = position.position.x + horizontalFloat;
            
            // 轻微的旋转摆动
            const rotationFloat = Math.sin(time * 0.5 + phaseOffset) * 0.02;
            frameGroup.rotation.z = rotationFloat;
            
            // hover发光效果 - 更加柔和的呼吸效果
            if (hoveredFrameRef.current === frameGroup) {
                glowMesh.material.opacity = 0.4 + Math.sin(time * 4) * 0.15;
                // 添加frame轻微高亮
                frameGroup.userData.frameMaterial.emissive.setHex(0x001122);
                frameGroup.userData.frameMaterial.emissiveIntensity = 0.1 + Math.sin(time * 3) * 0.05;
            } else {
                glowMesh.material.opacity = Math.max(0, glowMesh.material.opacity - 0.015);
                frameGroup.userData.frameMaterial.emissive.setHex(0x000000);
                frameGroup.userData.frameMaterial.emissiveIntensity = 0;
            }
        };
        
        frameGroup.userData = {
            item: item,
            index: index,
            originalPosition: position,
            floatAnimation: floatAnimation,
            glowMesh: glowMesh,
            frameMaterial: frameMaterial, // 添加frameMaterial引用
            isHighlighted: false
        };
        
        return frameGroup;
    }, []);

    // 初始化3D场景
    useEffect(() => {
        if (!mountRef.current || items.length === 0) return;
        
        const mountElement = mountRef.current;
        
        // 创建场景
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        // 创建相机 - 调整位置以获得更好的地平线视角
        const isMobile = window.innerWidth < 768;
        const camera = new THREE.PerspectiveCamera(
            isMobile ? 85 : 75, // 小屏设备使用更大的视角
            mountElement.clientWidth / mountElement.clientHeight,
            0.1,
            1000
        );
        // 相机位置：稍微靠后并抬高，获得更好的地平线透视效果
        // 响应式调整相机距离
        const cameraDistance = isMobile ? 12 : 16;
        const cameraHeight = isMobile ? 4 : 6;
        const lookAtHeight = isMobile ? -2 : -3;
        
        camera.position.set(0, cameraHeight, cameraDistance);
        camera.lookAt(0, lookAtHeight, 0); // 看向地平线中心
        cameraRef.current = camera;
        
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0); // 透明背景，显示首页背景
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountElement.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        
        // 创建Gallery群组
        const galleryGroup = new THREE.Group();
        galleryGroupRef.current = galleryGroup;
        scene.add(galleryGroup);
        
        // 添加光照 - 调整以配合首页背景的星空效果
        const ambientLight = new THREE.AmbientLight(0x404080, 0.3); // 冷色调环境光，模拟星空
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6); // 减弱主光源
        directionalLight.position.set(15, 15, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 100;
        directionalLight.shadow.camera.left = -30;
        directionalLight.shadow.camera.right = 30;
        directionalLight.shadow.camera.top = 30;
        directionalLight.shadow.camera.bottom = -30;
        scene.add(directionalLight);
        
        // 添加多色点光源营造星空氛围
        const pointLight1 = new THREE.PointLight(0x4CAF50, 0.4, 60); // 绿色
        pointLight1.position.set(-10, 10, 10);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x2196F3, 0.3, 50); // 蓝色
        pointLight2.position.set(10, 8, -10);
        scene.add(pointLight2);
        
        const pointLight3 = new THREE.PointLight(0x9C27B0, 0.2, 40); // 紫色
        pointLight3.position.set(0, 12, 0);
        scene.add(pointLight3);
        
        // 计算椭圆位置并创建图片框架
        const positions = calculateEllipticalPositions(items.length);
        const frames = items.map((item, index) => 
            createFrame(item, index, positions)
        ).filter(frame => frame !== null);
        
        frames.forEach(frame => {
            frame.castShadow = true;
            frame.receiveShadow = true;
            galleryGroup.add(frame);
        });
        framesRef.current = frames;
        
        // 延时隐藏加载指示器
        setTimeout(() => setIsLoading(false), 500);
        
        return () => {
            if (mountElement && renderer.domElement) {
                mountElement.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [items, createFrame]);

    // 处理鼠标事件
    useEffect(() => {
        if (!rendererRef.current) return;
        
        const canvas = rendererRef.current.domElement;
        
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // 处理拖拽旋转
            if (isMouseDownRef.current) {
                event.preventDefault();
                event.stopPropagation();
                
                const deltaX = event.clientX - lastMouseRef.current.x;
                const deltaY = event.clientY - lastMouseRef.current.y;
                
                targetRotationRef.current.y += deltaX * 0.005;
                targetRotationRef.current.x += deltaY * 0.005;
                
                // 限制X轴旋转范围
                targetRotationRef.current.x = Math.max(-Math.PI/6, Math.min(Math.PI/6, targetRotationRef.current.x));
                
                lastMouseRef.current = { x: event.clientX, y: event.clientY };
            } else {
                // 处理hover效果
                handleHover(event);
            }
        };
        
        const handleHover = (event) => {
            if (!cameraRef.current || !sceneRef.current) return;
            
            const rect = canvas.getBoundingClientRect();
            const mouse = new THREE.Vector2();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, cameraRef.current);
            
            const intersects = raycaster.intersectObjects(sceneRef.current.children, true);
            
            // 重置之前的hover状态
            if (hoveredFrameRef.current) {
                hoveredFrameRef.current = null;
            }
            
            // 查找新的hover对象
            for (let intersect of intersects) {
                let object = intersect.object;
                while (object.parent && !object.userData.item) {
                    object = object.parent;
                }
                if (object.userData && object.userData.item) {
                    hoveredFrameRef.current = object;
                    canvas.style.cursor = 'pointer';
                    break;
                }
            }
            
            if (!hoveredFrameRef.current) {
                canvas.style.cursor = isMouseDownRef.current ? 'grabbing' : 'grab';
            }
        };
        
        const handleMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            isMouseDownRef.current = true;
            lastMouseRef.current = { x: event.clientX, y: event.clientY };
            canvas.style.cursor = 'grabbing';
        };
        
        const handleMouseUp = () => {
            isMouseDownRef.current = false;
            canvas.style.cursor = hoveredFrameRef.current ? 'pointer' : 'grab';
        };
        
        const handleClick = (event) => {
            if (!cameraRef.current || !sceneRef.current) return;
            
            const rect = canvas.getBoundingClientRect();
            const mouse = new THREE.Vector2();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, cameraRef.current);
            
            const intersects = raycaster.intersectObjects(sceneRef.current.children, true);
            
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                if (intersectedObject.userData && intersectedObject.userData.item) {
                    onItemClick && onItemClick(intersectedObject.userData.item, intersectedObject.userData.index);
                }
            }
        };
        
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('click', handleClick);
        canvas.style.cursor = 'grab';
        
        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('click', handleClick);
        };
    }, [onItemClick]);

    // 动画循环
    useEffect(() => {
        if (!isVisible) return;
        
        const animate = () => {
            if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;
            
            // 平滑相机旋转
            currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
            currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;
            
            // 应用Gallery旋转
            if (galleryGroupRef.current) {
                galleryGroupRef.current.rotation.y = currentRotationRef.current.y;
                galleryGroupRef.current.rotation.x = currentRotationRef.current.x;
            }
            
            // 更新画框动画
            framesRef.current.forEach(frame => {
                if (frame.userData && frame.userData.floatAnimation) {
                    frame.userData.floatAnimation();
                }
            });
            
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            animationIdRef.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [isVisible]);

    // 窗口大小变化处理
    useEffect(() => {
        const handleResize = () => {
            if (!rendererRef.current || !cameraRef.current || !mountRef.current) return;
            
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full h-full">
            <div 
                ref={mountRef}
                className="w-full h-full"
                style={{ minHeight: '600px' }}
            />
            
            {/* 简约加载指示器 */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}
            
            {/* 操作提示 - 简约风格 */}
            <div className="absolute bottom-4 left-4 text-white/60 text-sm font-light">
                <p className="backdrop-blur-sm bg-black/20 px-3 py-1 rounded-lg">
                    拖拽旋转视角 • 点击查看大图 • 悬停高亮图片
                </p>
            </div>
        </div>
    );
};

Gallery3D.propTypes = {
    items: PropTypes.array,
    onItemClick: PropTypes.func,
    isVisible: PropTypes.bool
};

export default Gallery3D;
