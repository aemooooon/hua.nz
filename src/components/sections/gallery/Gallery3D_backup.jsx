import { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import BaguaPositionAnalyzer from './BaguaPositionAnalyzer';

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
    const taijiRef = useRef();
    const animationIdRef = useRef();
    const mouseRef = useRef({ x: 0, y: 0 });
    const isMouseDownRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const currentRotationRef = useRef({ x: 0, y: 0 });
    const baguaGroupRef = useRef();
    
    const [isLoading, setIsLoading] = useState(true);
    const [baguaPositions, setBaguaPositions] = useState([]);

    // 默认36个爻位置（如果图片分析失败）
    const getDefaultBaguaPositions = () => {
        const positions = [];
        
        // 八卦的8个方位及其爻数量
        const trigrams = [
            { name: '乾', element: '天', angle: 0, yaoCount: 6, color: '#FFD700' },       // 乾卦 - 6爻
            { name: '兑', element: '泽', angle: 45, yaoCount: 4, color: '#C0C0C0' },      // 兑卦 - 4爻  
            { name: '离', element: '火', angle: 90, yaoCount: 5, color: '#FF4500' },      // 离卦 - 5爻
            { name: '震', element: '雷', angle: 135, yaoCount: 4, color: '#32CD32' },     // 震卦 - 4爻
            { name: '巽', element: '风', angle: 180, yaoCount: 4, color: '#87CEEB' },     // 巽卦 - 4爻
            { name: '坎', element: '水', angle: 225, yaoCount: 5, color: '#191970' },     // 坎卦 - 5爻
            { name: '艮', element: '山', angle: 270, yaoCount: 4, color: '#8B4513' },     // 艮卦 - 4爻
            { name: '坤', element: '地', angle: 315, yaoCount: 4, color: '#8B4513' }      // 坤卦 - 4爻
        ];

        let globalIndex = 0;
        
        trigrams.forEach((trigram, trigramIndex) => {
            const baseAngle = (trigram.angle * Math.PI) / 180;
            const baseRadius = 8;
            
            for (let localIndex = 0; localIndex < trigram.yaoCount; localIndex++) {
                const radius = baseRadius + (localIndex * 1.5); // 从内到外排列
                const isYang = (globalIndex + localIndex) % 3 !== 1; // 模拟阴阳分布
                
                positions.push({
                    globalIndex: globalIndex,
                    trigramIndex: trigramIndex,
                    localIndex: localIndex,
                    trigram: trigram.name,
                    element: trigram.element,
                    baseAngle: trigram.angle,
                    position3D: {
                        x: Math.cos(baseAngle) * radius,
                        y: Math.sin(baseAngle) * radius,
                        z: 0 // 平面布局
                    },
                    rotation: baseAngle + Math.PI / 2,
                    isYang: isYang,
                    size: isYang 
                        ? { width: 3.0, height: 1.8, depth: 0.08 }
                        : { width: 2.0, height: 1.8, depth: 0.08 },
                    color: trigram.color
                });
                globalIndex++;
            }
        });
        
        return positions;
    };

    // 分析八卦图片并获取位置信息
    useEffect(() => {
        const analyzer = new BaguaPositionAnalyzer();
        analyzer.analyzeBaguaImage('/bagua.png')
            .then(positions => {
                console.log('Bagua positions analyzed:', positions);
                setBaguaPositions(positions);
            })
            .catch(error => {
                console.warn('Failed to analyze bagua image, using default positions:', error);
                setBaguaPositions(getDefaultBaguaPositions());
            });
    }, []);

    // 创建太极标志
    const createTaiji = useCallback(() => {
        const taijiGroup = new THREE.Group();
        
        // 外圆
        const outerGeometry = new THREE.CircleGeometry(1.2, 64);
        const outerMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.9,
            metalness: 0.3,
            roughness: 0.2
        });
        const outerCircle = new THREE.Mesh(outerGeometry, outerMaterial);
        taijiGroup.add(outerCircle);
        
        // 阴阳鱼 - 使用自定义几何体
        const yinYangGeometry = new THREE.CircleGeometry(1.15, 64, 0, Math.PI);
        const yangMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.95,
            metalness: 0.2,
            roughness: 0.3
        });
        const yangSide = new THREE.Mesh(yinYangGeometry, yangMaterial);
        taijiGroup.add(yangSide);
        
        // 小圆点
        const smallDotGeometry = new THREE.CircleGeometry(0.2, 32);
        const yinDot = new THREE.Mesh(smallDotGeometry, outerMaterial);
        yinDot.position.set(0, 0.5, 0.01);
        taijiGroup.add(yinDot);
        
        const yangDot = new THREE.Mesh(smallDotGeometry, yangMaterial);
        yangDot.position.set(0, -0.5, 0.01);
        taijiGroup.add(yangDot);
        
        return taijiGroup;
    }, []);

    // 创建3D画框 - 使用分析得到的精确八卦36爻位置
    const createFrame = useCallback((item, index, total, positions) => {
        const frameGroup = new THREE.Group();
        
        // 获取对应的位置信息 - 只使用36个八卦位置，不添加外围图片
        let position;
        if (index < positions.length) {
            position = positions[index];
        } else {
            // 如果图片数量超过36张，直接返回null，不显示额外图片
            return null;
        }
        
        const pos = position.position3D;
        frameGroup.position.set(pos.x, pos.y, pos.z);
        
        // 设置画框旋转，使爻的方向正确
        frameGroup.rotation.z = position.rotation || 0; // 使用Z轴旋转来控制平面内的方向
        
        // 画框几何体
        const frameGeometry = new THREE.BoxGeometry(
            position.size.width, 
            position.size.height, 
            position.size.depth || 0.08
        );
        const frameMaterial = new THREE.MeshPhysicalMaterial({
            color: position.color,
            metalness: 0.7,
            roughness: 0.3,
            transparent: true,
            opacity: 0.85,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2
        });
        const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
        frameGroup.add(frameMesh);
        
        // 图片几何体
        const imageGeometry = new THREE.PlaneGeometry(
            position.size.width - 0.2, 
            position.size.height - 0.2
        );
        
        // 图片材质
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(item.src || item.thumbnail);
        texture.colorSpace = THREE.SRGBColorSpace;
        
        const imageMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            opacity: 0.95,
            side: THREE.DoubleSide
        });
        
        const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
        imageMesh.position.z = 0.05;
        imageMesh.userData = { item: item, index: index };
        frameGroup.add(imageMesh);
        
        // 极简动画 - 几乎静态，只在鼠标交互时有微妙效果
        const floatAnimation = () => {
            const time = Date.now() * 0.001;
            const phaseOffset = index * (Math.PI / 18);
            
            // 只有在鼠标按下时才有微妙的动画
            if (isMouseDownRef.current) {
                frameGroup.position.z = pos.z + Math.sin(time * 2 + phaseOffset) * 0.05;
                frameGroup.rotation.z = (position.rotation || 0) + Math.sin(time * 1.5 + phaseOffset) * 0.01;
            } else {
                // 完全静态
                frameGroup.position.z = pos.z;
                frameGroup.rotation.z = position.rotation || 0;
            }
        };
        
        frameGroup.userData = {
            item: item,
            index: index,
            originalPosition: position,
            floatAnimation: floatAnimation,
            isHighlighted: false
        };
        
        return frameGroup;
    }, []);

    // 初始化3D场景
    useEffect(() => {
        if (!mountRef.current || items.length === 0 || baguaPositions.length === 0) return;
        
        const mountElement = mountRef.current;
        
        // 创建场景
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 15, 60);
        sceneRef.current = scene;
        
        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            75,
            mountElement.clientWidth / mountElement.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 20); // 正对八卦平面，距离20单位
        cameraRef.current = camera;
        
        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(mountElement.clientWidth, mountElement.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMap.enabled = false;
        mountElement.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        
        // 创建八卦群组
        const baguaGroup = new THREE.Group();
        baguaGroupRef.current = baguaGroup;
        scene.add(baguaGroup);
        
        // 添加光照
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        // 创建太极标志
        const taiji = createTaiji();
        taiji.position.set(0, 0, 0); // 太极在八卦平面的中心
        taijiRef.current = taiji;
        baguaGroup.add(taiji);
        
        // 创建画框
        const frames = items.slice(0, 36).map((item, index) => // 只显示前36张图片
            createFrame(item, index, Math.min(items.length, 36), baguaPositions)
        ).filter(frame => frame !== null); // 过滤掉null值
        
        frames.forEach(frame => baguaGroup.add(frame));
        framesRef.current = frames;
        
        // 延时隐藏加载指示器
        setTimeout(() => setIsLoading(false), 1000);
        
        return () => {
            if (mountElement && renderer.domElement) {
                mountElement.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [items, baguaPositions, createFrame, createTaiji]);

    // 处理鼠标事件
    useEffect(() => {
        if (!rendererRef.current) return;
        
        const canvas = rendererRef.current.domElement;
        
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            if (isMouseDownRef.current) {
                event.preventDefault(); // 防止与全局滚动冲突
                event.stopPropagation(); // 停止事件冒泡
                
                const deltaX = event.clientX - lastMouseRef.current.x;
                const deltaY = event.clientY - lastMouseRef.current.y;
                
                targetRotationRef.current.y += deltaX * 0.01;
                targetRotationRef.current.x += deltaY * 0.01;
                
                // 限制X轴旋转范围，避免从背面看八卦
                targetRotationRef.current.x = Math.max(-Math.PI/3, Math.min(Math.PI/3, targetRotationRef.current.x));
                
                lastMouseRef.current = { x: event.clientX, y: event.clientY };
            }
        };
        
        const handleMouseDown = (event) => {
            event.preventDefault(); // 防止与全局滚动冲突
            event.stopPropagation(); // 停止事件冒泡
            
            isMouseDownRef.current = true;
            lastMouseRef.current = { x: event.clientX, y: event.clientY };
            canvas.style.cursor = 'grabbing';
        };
        
        const handleMouseUp = () => {
            isMouseDownRef.current = false;
            canvas.style.cursor = 'grab';
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
            
            const time = Date.now() * 0.001;
            
            // 平滑相机旋转
            currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.05;
            currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.05;
            
            // 应用相机旋转 - 只在有鼠标交互时才移动相机
            const camera = cameraRef.current;
            
            // 移除自动旋转，只使用鼠标控制的旋转
            const totalRotationY = currentRotationRef.current.y;
            const totalRotationX = currentRotationRef.current.x;
            
            // 围绕八卦平面的球形相机运动
            const radius = 20;
            camera.position.x = Math.sin(totalRotationY) * Math.cos(totalRotationX) * radius;
            camera.position.y = Math.sin(totalRotationX) * radius;
            camera.position.z = Math.cos(totalRotationY) * Math.cos(totalRotationX) * radius;
            camera.lookAt(0, 0, 0);
            
            // 八卦效果 - 移除自动动画，保持静态
            if (baguaGroupRef.current) {
                // 太极微妙旋转 - 只有这个保留一点动画
                if (taijiRef.current) {
                    taijiRef.current.rotation.z = -time * 0.1; // 非常缓慢的旋转
                }
            }
            
            // 更新画框动画 - 移除大部分动画，只保留微妙的效果
            framesRef.current.forEach(frame => {
                if (frame.userData && frame.userData.floatAnimation) {
                    // 只有在鼠标交互时才执行动画
                    if (isMouseDownRef.current) {
                        frame.userData.floatAnimation();
                    }
                }
            });
            
            rendererRef.current.render(sceneRef.current, camera);
            animationIdRef.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [isVisible, baguaPositions]);

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
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}
        </div>
    );
};

Gallery3D.propTypes = {
    items: PropTypes.array,
    onItemClick: PropTypes.func,
    isVisible: PropTypes.bool
};

export default Gallery3D;
