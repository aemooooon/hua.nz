import { useRef, useEffect, useState, useCallback, memo } from 'react';
import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import TWEEN from 'three/addons/libs/tween.module.js';
import PropTypes from 'prop-types';
import imagePreloader from '../../../utils/imagePreloader';

const CSS3DSphereGallery = ({ items, onItemClick, isVisible }) => {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationIdRef = useRef(null);
    const objectsRef = useRef([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [preloadProgress, setPreloadProgress] = useState(0);
    const [isPreloading, setIsPreloading] = useState(false);
    const onItemClickRef = useRef(onItemClick);
    const itemsRef = useRef(items);
    const isDestroyedRef = useRef(false); // 添加销毁标志

    // 保持refs最新
    useEffect(() => {
        onItemClickRef.current = onItemClick;
        itemsRef.current = items;
    });

    // 创建图片元素 - 移除依赖避免重新创建，集成预加载
    const createImageElement = useCallback((item, index, onImageLoad) => {
        const element = document.createElement('div');
        element.className = 'gallery-item';
        element.style.cssText = `
            width: 200px;
            height: 200px;
            background: rgba(0, 0, 0, 0.8);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            opacity: 0;
            pointer-events: auto;
            position: relative;
            z-index: 10;
        `;

        // 创建图片
        const img = document.createElement('img');
        img.alt = item.title || `Image ${index + 1}`;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: filter 0.3s ease;
        `;

        // 检查是否已预加载
        const cachedImage = imagePreloader.getCachedImage(item.src);
        if (cachedImage) {
            // 使用预加载的图片
            img.src = item.src;
            element.style.opacity = '1';
            if (onImageLoad) onImageLoad();
        } else {
            // 先显示占位图，然后加载实际图片
            element.style.opacity = '0.6'; // 先显示半透明状态
            element.style.background = 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
            
            // 图片加载完成后的处理
            img.onload = () => {
                element.style.opacity = '1';
                element.style.background = 'rgba(0, 0, 0, 0.8)';
                if (onImageLoad) onImageLoad();
            };

            // 图片加载错误处理
            img.onerror = () => {
                element.style.opacity = '0.3';
                element.style.background = 'rgba(255, 0, 0, 0.2)';
                if (onImageLoad) onImageLoad();
            };

            img.src = item.src;
        }

        // 添加hover效果 - 增强视觉反馈
        element.addEventListener('mouseenter', () => {
            element.style.borderColor = 'rgba(0, 255, 255, 1)';
            element.style.borderWidth = '4px';
            element.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.8), 0 0 80px rgba(0, 255, 255, 0.4)';
            element.style.filter = 'brightness(1.5) contrast(1.3) saturate(1.2)';
            img.style.filter = 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6))';
        });

        element.addEventListener('mouseleave', () => {
            element.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            element.style.borderWidth = '2px';
            element.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            element.style.filter = 'brightness(1) contrast(1) saturate(1)';
            img.style.filter = 'none';
        });

        // 不在这里添加点击事件，改用全局检测

        element.appendChild(img);
        return element;
    }, []); // 移除所有依赖，避免重新创建

    // 预加载图片
    const preloadImages = useCallback(async (items) => {
        if (!items.length) return;

        console.log('Starting image preload for', items.length, 'images');
        setIsPreloading(true);
        setPreloadProgress(0);

        const imageSrcs = items.map(item => item.src);
        
        try {
            await imagePreloader.preloadImages(imageSrcs, {
                batchSize: 3, // 减少批次大小，避免网络拥塞
                delay: 150,   // 增加延迟，确保平滑加载
                onProgress: (loaded, total, percentage) => {
                    setPreloadProgress(percentage);
                    console.log(`Preload progress: ${loaded}/${total} (${percentage.toFixed(1)}%)`);
                }
            });
            
            console.log('Image preload completed');
        } catch (error) {
            console.error('Image preload failed:', error);
        } finally {
            setIsPreloading(false);
        }
    }, []);

    // 渲染函数
    const render = useCallback(() => {
        if (rendererRef.current && sceneRef.current && cameraRef.current && !isDestroyedRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    }, []);
    // 创建图片对象并排列成球形 - 使用useCallback但不依赖易变的值
    const createImageObjects = useCallback(() => {
        if (!sceneRef.current || !itemsRef.current.length || isDestroyedRef.current) return;

        console.log('Creating image objects - should only happen when items change');
        const scene = sceneRef.current;
        const currentItems = itemsRef.current;

        // 清除现有对象
        objectsRef.current.forEach(obj => {
            if (obj && obj.element && obj.element.parentNode) {
                // 确保DOM元素被正确移除
                obj.element.parentNode.removeChild(obj.element);
            }
            scene.remove(obj);
        });
        objectsRef.current = [];

        // 预计算球形位置
        const spherePositions = [];
        const vector = new THREE.Vector3();
        const radius = 1200; // 减小球形半径，让球更紧凑

        for (let i = 0; i < currentItems.length; i++) {
            const phi = Math.acos(-1 + (2 * i) / currentItems.length);
            const theta = Math.sqrt(currentItems.length * Math.PI) * phi;

            const sphericalPosition = new THREE.Vector3();
            sphericalPosition.setFromSphericalCoords(radius, phi, theta);

            // 计算朝向
            vector.copy(sphericalPosition).multiplyScalar(2);
            const tempObject = new THREE.Object3D();
            tempObject.position.copy(sphericalPosition);
            tempObject.lookAt(vector);

            spherePositions.push({
                position: sphericalPosition,
                rotation: tempObject.rotation.clone()
            });
        }

        // 为每个图片创建CSS3D对象
        currentItems.forEach((item, index) => {
            if (isDestroyedRef.current) return; // 防止在销毁过程中创建新对象
            
            const element = createImageElement(item, index, () => {
                console.log('Image loaded:', item.title || `Image ${index + 1}`);
            });
            const object = new CSS3DObject(element);

            if (!isInitialized) {
                // 第一次初始化：设置随机初始位置
                object.position.x = Math.random() * 4000 - 2000;
                object.position.y = Math.random() * 4000 - 2000;
                object.position.z = Math.random() * 4000 - 2000;
            } else {
                // 后续更新：直接设置到球形位置
                const sphereData = spherePositions[index];
                object.position.copy(sphereData.position);
                object.rotation.copy(sphereData.rotation);
            }

            scene.add(object);
            objectsRef.current.push(object);
        });

        // 只在第一次初始化时执行动画到球形
        if (!isInitialized && !isDestroyedRef.current) {
            setTimeout(() => {
                // 检查组件是否已被销毁
                if (isDestroyedRef.current) return;
                
                // 直接在这里执行球形转换，避免函数依赖
                if (!objectsRef.current.length || !spherePositions) return;

                setIsTransitioning(true);
                TWEEN.removeAll();

                const objects = objectsRef.current;

                objects.forEach((object, index) => {
                    const sphereData = spherePositions[index];
                    if (!sphereData) return;

                    // 动画到目标位置
                    new TWEEN.Tween(object.position)
                        .to({
                            x: sphereData.position.x,
                            y: sphereData.position.y,
                            z: sphereData.position.z
                        }, Math.random() * 2000 + 2000)
                        .easing(TWEEN.Easing.Exponential.InOut)
                        .start();

                    // 动画旋转朝向
                    new TWEEN.Tween(object.rotation)
                        .to({
                            x: sphereData.rotation.x,
                            y: sphereData.rotation.y,
                            z: sphereData.rotation.z
                        }, Math.random() * 2000 + 2000)
                        .easing(TWEEN.Easing.Exponential.InOut)
                        .start();
                });

                // 动画完成后的回调
                new TWEEN.Tween({})
                    .to({}, 4000)
                    .onUpdate(() => {
                        if (!isDestroyedRef.current) render();
                    })
                    .onComplete(() => {
                        if (!isDestroyedRef.current) {
                            setIsTransitioning(false);
                            render();
                        }
                    })
                    .start();
            }, 100);
            setIsInitialized(true);
        }
    }, [createImageElement, isInitialized, render]); // 稳定的依赖

    // 初始化场景
    const initScene = useCallback(() => {
        if (!mountRef.current) return;

        // 创建相机
        const camera = new THREE.PerspectiveCamera(
            30,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            1,
            10000
        );
        camera.position.z = 6000; // 增加相机距离，让球形更小并留出空间
        cameraRef.current = camera;

        // 创建场景
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // 创建渲染器
        const renderer = new CSS3DRenderer();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // 创建控制器
        const controls = new TrackballControls(camera, renderer.domElement);
        controls.minDistance = 6000; // 设置最小距离等于当前距离，禁用缩放
        controls.maxDistance = 6000; // 设置最大距离等于当前距离，禁用缩放
        controls.noZoom = true;      // 禁用缩放
        controls.noPan = true;       // 禁用平移
        controls.staticMoving = true; // 减少惯性，提高响应性
        controls.dynamicDampingFactor = 0.3; // 增加阻尼
        
        // 禁用右键和中键，只允许左键拖拽
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: null,
            RIGHT: null
        };
        
        controls.addEventListener('change', render);
        controlsRef.current = controls;

        // 返回清理函数用于事件监听器
        return renderer;
    }, [render]);

    // 鼠标点击检测 - 使用稳定的引用避免重新创建
    const handleMouseClick = useCallback((event) => {
        if (isTransitioning) return;
        
        event.preventDefault();
        console.log('Canvas clicked, checking DOM elements...');
        
        // 获取点击位置
        const clickX = event.clientX;
        const clickY = event.clientY;
        
        console.log('Click position:', clickX, clickY);
        console.log('Objects to check:', objectsRef.current.length);
        
        // 检查每个CSS3D对象的DOM元素
        for (let i = 0; i < objectsRef.current.length; i++) {
            const object = objectsRef.current[i];
            const element = object.element;
            
            if (element) {
                const elementRect = element.getBoundingClientRect();
                console.log(`Element ${i} bounds:`, elementRect);
                
                // 检查点击是否在元素边界内
                if (clickX >= elementRect.left && 
                    clickX <= elementRect.right && 
                    clickY >= elementRect.top && 
                    clickY <= elementRect.bottom) {
                    
                    console.log('Element clicked:', i, itemsRef.current[i]?.title || `Image ${i + 1}`);
                    onItemClickRef.current(itemsRef.current[i], i);
                    return;
                }
            }
        }
        
        console.log('No element clicked');
    }, [isTransitioning]); // 只依赖isTransitioning

    // 动画循环
    const animate = useCallback(() => {
        if (!isVisible || isDestroyedRef.current) return;

        animationIdRef.current = requestAnimationFrame(animate);
        
        TWEEN.update();
        
        if (controlsRef.current) {
            controlsRef.current.update();
        }
        
        // 持续渲染
        render();
    }, [isVisible, render]);

    // 处理窗口大小变化
    const handleResize = useCallback(() => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // 更新相机纵横比
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();

        // 更新渲染器尺寸
        rendererRef.current.setSize(width, height);

        // 更新控制器（如果存在）
        if (controlsRef.current) {
            controlsRef.current.handleResize();
        }

        // 立即渲染一帧
        render();
    }, [render]);

    // 初始化
    useEffect(() => {
        if (isVisible && !isDestroyedRef.current) {
            const currentMount = mountRef.current;
            
            // 重置销毁标志
            isDestroyedRef.current = false;
            
            const renderer = initScene();
            
            // 添加点击事件监听器
            if (renderer) {
                renderer.domElement.addEventListener('click', handleMouseClick);
            }
            
            // 场景初始化后创建图片对象
            setTimeout(() => {
                if (!isDestroyedRef.current) {
                    createImageObjects();
                }
            }, 100);
            
            window.addEventListener('resize', handleResize);
            animate();

            return () => {
                // 设置销毁标志
                isDestroyedRef.current = true;
                
                if (animationIdRef.current) {
                    cancelAnimationFrame(animationIdRef.current);
                }
                window.removeEventListener('resize', handleResize);
                
                // 移除点击事件监听器
                if (renderer && renderer.domElement) {
                    renderer.domElement.removeEventListener('click', handleMouseClick);
                }
                
                // 清理TWEEN动画
                TWEEN.removeAll();
                
                // 清理CSS3D对象
                objectsRef.current.forEach(obj => {
                    if (obj && obj.element && obj.element.parentNode) {
                        obj.element.parentNode.removeChild(obj.element);
                    }
                    if (sceneRef.current) {
                        sceneRef.current.remove(obj);
                    }
                });
                objectsRef.current = [];
                
                // 清理Three.js资源
                if (rendererRef.current && currentMount && rendererRef.current.domElement.parentNode) {
                    currentMount.removeChild(rendererRef.current.domElement);
                }
                
                // 清理控制器
                if (controlsRef.current) {
                    controlsRef.current.dispose();
                }
                
                // 重置refs
                sceneRef.current = null;
                rendererRef.current = null;
                cameraRef.current = null;
                controlsRef.current = null;
            };
        }
    }, [isVisible, initScene, handleResize, animate, handleMouseClick, createImageObjects]);

    // 简化：只在items变化且组件可见时创建对象，但避免不必要的重建
    useEffect(() => {
        if (isVisible && sceneRef.current && items.length > 0 && !isDestroyedRef.current) {
            // 检查items是否真的变化了
            const currentItemSrcs = itemsRef.current.map(item => item.src);
            const newItemSrcs = items.map(item => item.src);
            
            const hasItemsChanged = 
                currentItemSrcs.length !== newItemSrcs.length ||
                currentItemSrcs.some((src, index) => src !== newItemSrcs[index]);
            
            if (hasItemsChanged) {
                console.log('Items changed, recreating objects');
                createImageObjects();
            }
        }
    }, [items, isVisible, createImageObjects]);

    // 预加载图片 - 在组件可见时开始预加载，但不阻塞球体渲染
    useEffect(() => {
        if (isVisible && items.length > 0 && !isDestroyedRef.current) {
            // 检查是否需要预加载
            const needsPreload = items.some(item => !imagePreloader.isCached(item.src));
            
            if (needsPreload) {
                // 预加载在后台进行，不阻塞球体创建
                setTimeout(() => {
                    preloadImages(items);
                }, 500); // 延迟预加载，让球体先创建
            } else {
                console.log('All images already cached, skipping preload');
                setIsPreloading(false);
                setPreloadProgress(100);
            }
        }
    }, [isVisible, items, preloadImages]);

    return (
        <div 
            ref={mountRef} 
            className="w-full h-full relative"
            style={{ 
                background: 'transparent',
                overflow: 'hidden'
            }}
        >
            {/* 预加载进度指示器 - 只在预加载中且进度小于100%时显示 */}
            {isPreloading && preloadProgress < 100 && (
                <div className="absolute top-6 right-6 bg-black/50 rounded-lg p-3 text-center z-40">
                    <div className="text-white/70 mb-2 text-sm">加载资源</div>
                    <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ease-out"
                            style={{ width: `${preloadProgress}%` }}
                        />
                    </div>
                    <div className="text-white/50 mt-1 text-xs">
                        {Math.round(preloadProgress)}%
                    </div>
                </div>
            )}
        </div>
    );
};

CSS3DSphereGallery.propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};

// 使用memo包装组件，只在props真正改变时重新渲染
export default memo(CSS3DSphereGallery, (prevProps, nextProps) => {
    // 只有当items数组内容或isVisible真正改变时才重新渲染
    return (
        prevProps.isVisible === nextProps.isVisible &&
        prevProps.items.length === nextProps.items.length &&
        prevProps.items.every((item, index) => 
            item.src === nextProps.items[index]?.src &&
            item.title === nextProps.items[index]?.title
        )
    );
});
