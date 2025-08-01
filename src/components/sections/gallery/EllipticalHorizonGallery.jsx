import { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const EllipticalHorizonGallery = ({ 
    items = [], 
    onItemClick, 
    isVisible = false
}) => {
    const mountRef = useRef();
    const sceneRef = useRef();
    const rendererRef = useRef();
    const cameraRef = useRef();
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

    // 计算椭圆地平线的所有位置 - 严格按照背景红线椭圆，从右下到左下
    const calculateAllEllipticalPositions = useCallback((itemCount) => {
        const positions = [];
        
        // 椭圆参数 - 精确匹配截图中的红线椭圆
        const isMobile = window.innerWidth < 768;
        
        // 椭圆参数：更明显的上拱效果
        const ellipseA = isMobile ? 35 : 50;  // 增大长轴
        const ellipseB = isMobile ? 8 : 12;   // 增大短轴，让中间更拱
        const baseY = isMobile ? -5 : -6;     // 稍微抬高基准线
        
        // 椭圆的角度范围 - 从右下角到左下角（顺时针）
        const startAngle = Math.PI * 1.3;    // 从右下角开始（234度）
        const endAngle = Math.PI * 1.7;      // 到左下角结束（306度）
        const angleRange = endAngle - startAngle;
        
        for (let i = 0; i < itemCount; i++) {
            // 将图片均匀分布在椭圆的可见部分（从右到左）
            const t = i / itemCount;
            const angle = startAngle + t * angleRange;
            
            // 椭圆参数方程
            const x = ellipseA * Math.cos(angle);
            const z = ellipseB * Math.sin(angle);
            
            // 地平线高度：中间部分更明显的上拱
            const normalizedX = x / ellipseA; // -1 到 1
            const archHeight = Math.pow(1 - Math.abs(normalizedX), 1.5) * 2; // 中间拱起
            const y = baseY + archHeight;
            
            // 计算朝向角度
            // 中央图片（x接近0）面向屏幕，两侧图片朝向椭圆中心
            const distanceFromCenter = Math.abs(x);
            const maxDistance = ellipseA;
            const normalizedDistance = distanceFromCenter / maxDistance;
            
            let lookAtAngle;
            if (normalizedDistance < 0.2) {
                // 中央20%范围的图片直接面向屏幕
                lookAtAngle = 0;
            } else {
                // 其他图片朝向椭圆中心
                lookAtAngle = Math.atan2(z, x) + Math.PI;
            }
            
            positions.push({
                position: { x, y, z },
                rotation: lookAtAngle,
                index: i,
                angle: angle,
                originalIndex: i,
                distanceFromCenter: distanceFromCenter,
                t: t,
                isCenterRegion: normalizedDistance < 0.2
            });
        }
        
        return positions;
    }, []);

    // 计算当前可视范围内需要渲染的图片索引 - 确保无缝显示
    const getVisibleItemIndices = useCallback((scrollOffset, itemCount, visibleCount = 25) => {
        const indices = [];
        
        // 计算中心索引（当前滚动位置对应的图片）
        const centerIndex = Math.floor(scrollOffset) % itemCount;
        const halfVisible = Math.floor(visibleCount / 2);
        
        // 生成可见范围内的所有索引（支持负数和超出范围）
        for (let i = -halfVisible; i <= halfVisible; i++) {
            let index = (centerIndex + i) % itemCount;
            if (index < 0) index += itemCount; // 处理负索引
            indices.push(index);
        }
        
        return [...new Set(indices)]; // 去重
    }, []);

    // 根据滚动偏移量计算图片的实际位置 - 实现无缝右进左出
    const getScrolledPosition = useCallback((originalPosition, scrollOffset, itemCount) => {
        const isMobile = window.innerWidth < 768;
        const ellipseA = isMobile ? 35 : 50;
        const ellipseB = isMobile ? 8 : 12;
        const baseY = isMobile ? -5 : -6;
        
        // 椭圆可见角度范围（从右下到左下）
        const startAngle = Math.PI * 1.3;
        const endAngle = Math.PI * 1.7;
        const angleRange = endAngle - startAngle;
        
        // 计算滚动后的参数t（实现无缝循环）
        const scrollT = (scrollOffset / itemCount);
        let newT = (originalPosition.t + scrollT) % 1;
        if (newT < 0) newT += 1; // 处理负数情况
        
        // 映射到椭圆角度
        const newAngle = startAngle + newT * angleRange;
        
        const x = ellipseA * Math.cos(newAngle);
        const z = ellipseB * Math.sin(newAngle);
        
        // 地平线高度：中间部分明显上拱
        const normalizedX = x / ellipseA;
        const archHeight = Math.pow(1 - Math.abs(normalizedX), 1.5) * 2;
        const y = baseY + archHeight;
        
        // 计算朝向角度和是否为中央区域
        const distanceFromCenter = Math.abs(x);
        const normalizedDistance = distanceFromCenter / ellipseA;
        const isCenterRegion = normalizedDistance < 0.2;
        
        let lookAtAngle;
        if (isCenterRegion) {
            // 中央图片直接面向屏幕
            lookAtAngle = 0;
        } else {
            // 其他图片朝向椭圆中心
            lookAtAngle = Math.atan2(z, x) + Math.PI;
        }
        
        // 计算缩放比例 - 中央图片最大，边缘图片正常
        const scale = isCenterRegion ? 2.0 : 1.0 + (1.0 - normalizedDistance) * 0.3;
        
        return {
            position: { x, y, z },
            rotation: lookAtAngle,
            angle: newAngle,
            scale: scale,
            distanceFromCenter: distanceFromCenter,
            isCenterHighlight: isCenterRegion,
            isCenterRegion: isCenterRegion
        };
    }, []);

    // 创建图片框架 - 支持动态缩放
    const createFrame = useCallback((item, originalIndex) => {
        const frameGroup = new THREE.Group();
        
        // 基础框架尺寸
        const baseFrameWidth = 2.2;
        const baseFrameHeight = 3.0;
        const frameDepth = 0.1;
        
        // 创建边框
        const frameGeometry = new THREE.BoxGeometry(baseFrameWidth, baseFrameHeight, frameDepth);
        const frameMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x2a2a2a,
            metalness: 0.6,
            roughness: 0.3,
            transparent: true,
            opacity: 0.95,
            clearcoat: 0.8,
            clearcoatRoughness: 0.2,
            envMapIntensity: 0.5
        });
        const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
        frameGroup.add(frameMesh);
        
        // 创建图片
        const imageGeometry = new THREE.PlaneGeometry(baseFrameWidth - 0.2, baseFrameHeight - 0.2);
        
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
        imageMesh.userData = { item: item, originalIndex: originalIndex };
        frameGroup.add(imageMesh);
        
        // 添加中央高亮发光效果
        const glowGeometry = new THREE.PlaneGeometry(baseFrameWidth + 0.3, baseFrameHeight + 0.3);
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
        
        // 添加中央高亮的特殊发光边框
        const highlightGeometry = new THREE.PlaneGeometry(baseFrameWidth + 0.6, baseFrameHeight + 0.6);
        const highlightMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFD700, // 金色高亮
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const highlightMesh = new THREE.Mesh(highlightGeometry, highlightMaterial);
        highlightMesh.position.z = -frameDepth / 2 - 0.02;
        frameGroup.add(highlightMesh);
        
        frameGroup.userData = {
            item: item,
            originalIndex: originalIndex,
            frameMaterial: frameMaterial,
            glowMesh: glowMesh,
            highlightMesh: highlightMesh,
            baseFrameWidth: baseFrameWidth,
            baseFrameHeight: baseFrameHeight,
            isHighlighted: false
        };
        
        return frameGroup;
    }, []);

    // 更新可见图片的位置和缩放 - 优化中央图片效果
    const updateVisibleFrames = useCallback(() => {
        if (!allPositionsRef.current.length || !galleryGroupRef.current) return;
        
        const currentScroll = scrollOffsetRef.current;
        const visibleIndices = getVisibleItemIndices(currentScroll, items.length);
        const currentVisible = new Set(visibleIndices);
        
        // 移除不再可见的frame
        for (const [index, frame] of visibleFramesRef.current) {
            if (!currentVisible.has(index)) {
                galleryGroupRef.current.remove(frame);
                visibleFramesRef.current.delete(index);
            }
        }
        
        // 添加新可见的frame并更新位置
        visibleIndices.forEach(index => {
            if (!visibleFramesRef.current.has(index)) {
                const frame = createFrame(items[index], index);
                visibleFramesRef.current.set(index, frame);
                galleryGroupRef.current.add(frame);
            }
            
            // 更新frame位置和缩放
            const frame = visibleFramesRef.current.get(index);
            const originalPos = allPositionsRef.current[index];
            const scrolledPos = getScrolledPosition(originalPos, currentScroll, items.length);
            
            // 设置位置和旋转
            frame.position.set(
                scrolledPos.position.x,
                scrolledPos.position.y,
                scrolledPos.position.z
            );
            
            // 中央图片特殊处理：不倾斜，直接面向屏幕
            if (scrolledPos.isCenterRegion) {
                frame.rotation.set(0, 0, 0); // 不倾斜
            } else {
                frame.rotation.y = scrolledPos.rotation;
                frame.rotation.x = 0;
                frame.rotation.z = 0;
            }
            
            // 应用动态缩放
            frame.scale.setScalar(scrolledPos.scale);
            
            // 轻微的浮动动画（中央图片减少浮动）
            const time = Date.now() * 0.001;
            const phaseOffset = index * (Math.PI / 12);
            const floatIntensity = scrolledPos.isCenterRegion ? 0.5 : 1.0;
            
            const verticalFloat = Math.sin(time * 0.6 + phaseOffset) * 0.03 * floatIntensity;
            const horizontalFloat = Math.cos(time * 0.4 + phaseOffset * 0.7) * 0.01 * floatIntensity;
            const rotationFloat = Math.sin(time * 0.5 + phaseOffset) * 0.005 * floatIntensity;
            
            frame.position.y += verticalFloat;
            frame.position.x += horizontalFloat;
            if (!scrolledPos.isCenterRegion) {
                frame.rotation.z += rotationFloat;
            }
            
            // 发光效果和中央高亮
            const glowMesh = frame.userData.glowMesh;
            const highlightMesh = frame.userData.highlightMesh;
            const frameMaterial = frame.userData.frameMaterial;
            
            // 中央高亮效果
            if (scrolledPos.isCenterHighlight) {
                // 中央图片的特殊效果
                highlightMesh.material.opacity = 0.4 + Math.sin(time * 2.5) * 0.15;
                frameMaterial.emissive.setHex(0x333311);
                frameMaterial.emissiveIntensity = 0.3;
                frameMaterial.color.setHex(0x5a5a3a);
            } else {
                // 非中央图片
                highlightMesh.material.opacity = Math.max(0, highlightMesh.material.opacity - 0.03);
                frameMaterial.color.setHex(0x2a2a2a);
                frameMaterial.emissiveIntensity = 0;
            }
            
            // hover发光效果
            if (hoveredFrameRef.current === frame) {
                glowMesh.material.opacity = 0.4 + Math.sin(time * 4) * 0.15;
                if (!scrolledPos.isCenterHighlight) {
                    frameMaterial.emissive.setHex(0x001122);
                    frameMaterial.emissiveIntensity = 0.1 + Math.sin(time * 3) * 0.05;
                }
            } else if (!scrolledPos.isCenterHighlight) {
                glowMesh.material.opacity = Math.max(0, glowMesh.material.opacity - 0.015);
                frameMaterial.emissive.setHex(0x000000);
                frameMaterial.emissiveIntensity = 0;
            }
        });
    }, [items, createFrame, getVisibleItemIndices, getScrolledPosition]);

    // 初始化3D场景
    useEffect(() => {
        if (!mountRef.current || items.length === 0) return;
        
        const mountElement = mountRef.current;
        
        // 创建场景
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        // 创建相机 - 调整视角以观看椭圆地平线的上拱效果
        const isMobile = window.innerWidth < 768;
        const camera = new THREE.PerspectiveCamera(
            isMobile ? 70 : 65, // 适中的视角
            mountElement.clientWidth / mountElement.clientHeight,
            0.1,
            1000
        );
        
        // 相机位置：稍微抬高，看向椭圆地平线的拱形部分
        camera.position.set(0, isMobile ? 0 : 1, isMobile ? 18 : 25);
        camera.lookAt(0, isMobile ? -3 : -4, 0); // 看向椭圆中央
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
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountElement.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        
        // 创建Gallery群组
        const galleryGroup = new THREE.Group();
        galleryGroupRef.current = galleryGroup;
        scene.add(galleryGroup);
        
        // 添加光照
        const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(15, 15, 10);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        
        const pointLight1 = new THREE.PointLight(0x4CAF50, 0.4, 60);
        pointLight1.position.set(-10, 10, 10);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x2196F3, 0.3, 50);
        pointLight2.position.set(10, 8, -10);
        scene.add(pointLight2);
        
        // 计算所有图片位置
        allPositionsRef.current = calculateAllEllipticalPositions(items.length);
        
        // 初始化可见图片
        updateVisibleFrames();
        
        setTimeout(() => setIsLoading(false), 500);
        
        return () => {
            if (mountElement && renderer.domElement) {
                mountElement.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [items, calculateAllEllipticalPositions, updateVisibleFrames]);

    // 处理鼠标事件 - 只允许水平滑动
    useEffect(() => {
        if (!rendererRef.current) return;
        
        const canvas = rendererRef.current.domElement;
        
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // 处理水平拖拽滑动
            if (isMouseDownRef.current) {
                event.preventDefault();
                event.stopPropagation();
                
                const deltaX = event.clientX - lastMouseRef.current.x;
                
                // 只响应水平移动，转换为图片链滚动
                const scrollSpeed = 0.01;
                targetScrollRef.current -= deltaX * scrollSpeed;
                
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
            
            hoveredFrameRef.current = null;
            
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
                    onItemClick && onItemClick(
                        intersectedObject.userData.item, 
                        intersectedObject.userData.originalIndex
                    );
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
            
            // 平滑滚动
            scrollOffsetRef.current += (targetScrollRef.current - scrollOffsetRef.current) * 0.1;
            
            // 更新可见图片
            updateVisibleFrames();
            
            rendererRef.current.render(sceneRef.current, cameraRef.current);
            animationIdRef.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [isVisible, updateVisibleFrames]);

    // 窗口大小变化处理
    useEffect(() => {
        const handleResize = () => {
            if (!rendererRef.current || !cameraRef.current || !mountRef.current) return;
            
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
            
            // 重新计算椭圆位置
            allPositionsRef.current = calculateAllEllipticalPositions(items.length);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [items.length, calculateAllEllipticalPositions]);

    return (
        <div className="relative w-full h-full">
            <div 
                ref={mountRef}
                className="w-full h-full"
                style={{ minHeight: '600px' }}
            />
            
            {/* 加载指示器 */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}
            
            {/* 操作提示 */}
            <div className="absolute bottom-4 left-4 text-white/60 text-sm font-light">
                <p className="backdrop-blur-sm bg-black/20 px-3 py-1 rounded-lg">
                    左右拖拽浏览 • 点击查看大图 • 悬停高亮图片
                </p>
            </div>
        </div>
    );
};

EllipticalHorizonGallery.propTypes = {
    items: PropTypes.array,
    onItemClick: PropTypes.func,
    isVisible: PropTypes.bool
};

export default EllipticalHorizonGallery;
