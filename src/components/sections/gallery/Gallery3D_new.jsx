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
    const [loadedTextures, setLoadedTextures] = useState(0);
    const [totalTextures, setTotalTextures] = useState(0);
    const [baguaPositions, setBaguaPositions] = useState([]);

    // 默认八卦位置（如果图片分析失败）
    const getDefaultBaguaPositions = () => {
        return [
            { trigram: '乾', element: '天', position3D: { x: 0, y: 3, z: 9 }, rotation: 0, isYang: true, size: { width: 4.5, height: 1.2, depth: 0.2 }, color: '#FFD700' },
            { trigram: '兑', element: '泽', position3D: { x: 6.4, y: 2, z: 6.4 }, rotation: Math.PI * 0.25, isYang: false, size: { width: 3.8, height: 1.8, depth: 0.2 }, color: '#C0C0C0' },
            { trigram: '离', element: '火', position3D: { x: 9, y: 1, z: 0 }, rotation: Math.PI * 0.5, isYang: true, size: { width: 4.2, height: 1.5, depth: 0.2 }, color: '#FF4500' },
            { trigram: '震', element: '雷', position3D: { x: 6.4, y: 0, z: -6.4 }, rotation: Math.PI * 0.75, isYang: false, size: { width: 3.5, height: 2.0, depth: 0.2 }, color: '#32CD32' },
            { trigram: '巽', element: '风', position3D: { x: 0, y: -1, z: -9 }, rotation: Math.PI, isYang: false, size: { width: 4.0, height: 1.8, depth: 0.2 }, color: '#87CEEB' },
            { trigram: '坎', element: '水', position3D: { x: -6.4, y: 0, z: -6.4 }, rotation: Math.PI * 1.25, isYang: false, size: { width: 3.2, height: 2.2, depth: 0.2 }, color: '#191970' },
            { trigram: '艮', element: '山', position3D: { x: -9, y: 1, z: 0 }, rotation: Math.PI * 1.5, isYang: false, size: { width: 3.8, height: 1.9, depth: 0.2 }, color: '#8B4513' },
            { trigram: '坤', element: '地', position3D: { x: -6.4, y: 2, z: 6.4 }, rotation: Math.PI * 1.75, isYang: false, size: { width: 3.0, height: 2.5, depth: 0.2 }, color: '#8B4513' }
        ];
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
        
        // 添加微光效果
        const glowGeometry = new THREE.CircleGeometry(1.5, 64);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.z = -0.05;
        taijiGroup.add(glow);
        
        return taijiGroup;
    }, []);

    // 创建3D画框 - 使用分析得到的精确八卦位置
    const createFrame = useCallback((item, index, total, positions) => {
        const frameGroup = new THREE.Group();
        
        // 获取对应的位置信息
        let position;
        if (index < positions.length) {
            position = positions[index];
        } else {
            // 超出8个的图片使用外圆布局
            const radius = 12;
            const angle = ((index - 8) / (total - 8)) * Math.PI * 2;
            position = {
                trigram: `外${index - 7}`,
                element: '辅',
                position3D: {
                    x: Math.cos(angle) * radius * 0.1,
                    y: (Math.random() - 0.5) * 2,
                    z: Math.sin(angle) * radius * 0.1
                },
                rotation: angle,
                isYang: index % 2 === 0,
                size: { width: 3, height: 3.8, depth: 0.2 },
                color: '#666666'
            };
        }
        
        const pos = position.position3D;
        frameGroup.position.set(pos.x, pos.y, pos.z);
        frameGroup.rotation.y = position.rotation;
        
        // 画框几何体
        const frameGeometry = new THREE.BoxGeometry(
            position.size.width, 
            position.size.height, 
            position.size.depth || 0.15
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
            position.size.width - 0.4, 
            position.size.height - 0.4
        );
        
        // 加载纹理
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            item.thumbnail || item.src,
            (texture) => {
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.generateMipmaps = false;
                
                const imageMaterial = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.95
                });
                
                const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
                imageMesh.position.z = 0.11;
                frameGroup.add(imageMesh);
                
                imageMesh.userData = {
                    item: item,
                    index: index,
                    frameGroup: frameGroup
                };
                
                setLoadedTextures(prev => prev + 1);
            },
            undefined,
            (error) => {
                console.warn('Failed to load texture:', item.src, error);
                setLoadedTextures(prev => prev + 1);
            }
        );
        
        // 发光效果
        const glowGeometry = new THREE.PlaneGeometry(
            position.size.width + 0.5, 
            position.size.height + 0.5
        );
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: position.color,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        glowMesh.position.z = -0.08;
        frameGroup.add(glowMesh);
        
        // 悬浮动画
        const floatAnimation = () => {
            const time = Date.now() * 0.001;
            const phaseOffset = index * (Math.PI / 4);
            
            frameGroup.position.y = pos.y + Math.sin(time * 0.8 + phaseOffset) * 0.3;
            frameGroup.rotation.z = Math.sin(time * 0.5 + phaseOffset) * 0.02;
            frameGroup.position.z = pos.z + Math.cos(time * 0.6 + phaseOffset) * 0.1;
            
            const frames = frameGroup.children;
            frames.forEach(child => {
                if (child.material && child.material.blending === THREE.AdditiveBlending) {
                    const glowIntensity = 0.15 + Math.sin(time * 1.2 + phaseOffset) * 0.05;
                    child.material.opacity = glowIntensity;
                }
            });
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
        camera.position.set(0, 3, 15);
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
        taiji.position.set(0, 0, 0);
        taijiRef.current = taiji;
        baguaGroup.add(taiji);
        
        // 创建画框
        setTotalTextures(items.length);
        setLoadedTextures(0);
        
        const frames = items.map((item, index) => 
            createFrame(item, index, items.length, baguaPositions)
        );
        
        frames.forEach(frame => baguaGroup.add(frame));
        framesRef.current = frames;
        
        // 添加粒子效果
        const particleCount = 150;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const elementColors = [
            [1.0, 0.84, 0.0], [0.75, 0.75, 0.75], [1.0, 0.27, 0.0], [0.2, 0.8, 0.2],
            [0.53, 0.81, 0.92], [0.1, 0.1, 0.44], [0.55, 0.27, 0.07], [0.55, 0.27, 0.07]
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 15 + Math.random() * 10;
            
            positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 5;
            
            const colorIndex = Math.floor(Math.random() * elementColors.length);
            const color = elementColors[colorIndex];
            colors[i * 3] = color[0];
            colors[i * 3 + 1] = color[1];
            colors[i * 3 + 2] = color[2];
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            transparent: true,
            opacity: 0.7,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        
        setIsLoading(false);
        
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
                const deltaX = event.clientX - lastMouseRef.current.x;
                const deltaY = event.clientY - lastMouseRef.current.y;
                
                targetRotationRef.current.y += deltaX * 0.01;
                targetRotationRef.current.x += deltaY * 0.01;
                
                lastMouseRef.current = { x: event.clientX, y: event.clientY };
            }
        };
        
        const handleMouseDown = (event) => {
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
            
            // 应用相机旋转
            const camera = cameraRef.current;
            const radius = 15;
            const autoRotation = time * 0.05;
            const totalRotationY = currentRotationRef.current.y + autoRotation;
            
            camera.position.x = Math.sin(totalRotationY) * radius;
            camera.position.z = Math.cos(totalRotationY) * radius;
            camera.position.y = 3 + currentRotationRef.current.x * 8 + Math.sin(time * 0.3) * 0.8;
            camera.lookAt(0, 0, 0);
            
            // 八卦整体旋转
            if (baguaGroupRef.current) {
                baguaGroupRef.current.rotation.y = time * 0.1;
                
                // 太极自旋
                if (taijiRef.current) {
                    taijiRef.current.rotation.z = -time * 0.5;
                    const breathe = 1 + Math.sin(time * 2) * 0.1;
                    taijiRef.current.scale.set(breathe, breathe, 1);
                }
            }
            
            // 更新画框动画
            framesRef.current.forEach(frame => {
                if (frame.userData && frame.userData.floatAnimation) {
                    frame.userData.floatAnimation();
                }
            });
            
            // 粒子动画
            sceneRef.current.children.forEach(child => {
                if (child instanceof THREE.Points) {
                    child.rotation.y += 0.003;
                    child.rotation.x = Math.sin(time * 0.4) * 0.15;
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
