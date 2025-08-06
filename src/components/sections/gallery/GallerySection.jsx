import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useAppStore } from '../../../store/useAppStore';
import PhotoSwipeGallery from './PhotoSwipeGallery';

const Gallery = ({ language = 'en' }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isPhotoSwipeOpen, setIsPhotoSwipeOpen] = useState(false);
    const [photoSwipeInitialIndex, setPhotoSwipeInitialIndex] = useState(0);
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationFrameRef = useRef(null);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());

    // 获取 gallery 数据
    const galleryData = useAppStore(state => state.gallery);
    const galleryDataRef = useRef(galleryData);
    
    // 更新ref当数据变化时
    useEffect(() => {
        galleryDataRef.current = galleryData;
    }, [galleryData]);

    // 使用useRef来存储稳定的函数引用，避免依赖循环
    const initSceneRef = useRef(null);
    const cleanupSceneRef = useRef(null);

    // 存储画廊球体的引用
    const previewSphere = useRef(null);
    const galleryGridSpheres = useRef([]);
    const resizeTimeoutRef = useRef(null); // 防抖定时器

    // 初始化场景函数
    initSceneRef.current = async () => {
        const currentGalleryData = galleryDataRef.current;
        if (!canvasRef.current || !currentGalleryData) return;

        console.log('Initializing Three.js scene...'); // Debug log

        // 响应式布局计算 - 在函数开始就计算，避免引用错误
        // 使用画布尺寸而不是窗口尺寸，确保与 resize 事件处理一致
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const screenWidth = canvasRect.width;
        const screenHeight = canvasRect.height;
        const aspectRatio = screenWidth / screenHeight;
        const isNarrowScreen = aspectRatio < 1.2 || screenWidth < 1200; // 窄屏或小屏幕

        console.log('Scene initialization:', { 
            screenWidth, 
            screenHeight, 
            aspectRatio: aspectRatio.toFixed(2), 
            isNarrowScreen 
        }); // Debug log

        // 根据屏幕宽度和布局模式智能设置网格尺寸
        let gridCols, gridRows, previewSphereSize, gridSphereSize;
        
        if (screenWidth <= 768) {
            // 小屏手机
            gridCols = 3;
            gridRows = 3;
            previewSphereSize = isNarrowScreen ? 2.5 : 3.0;
            gridSphereSize = 0.35;
        } else if (screenWidth <= 1024) {
            // 平板
            gridCols = 4;
            gridRows = 4;
            previewSphereSize = isNarrowScreen ? 3.0 : 3.5;
            gridSphereSize = 0.40;
        } else if (screenWidth <= 1440) {
            // 桌面1080p
            gridCols = 5;
            gridRows = 5;
            previewSphereSize = isNarrowScreen ? 3.2 : 3.8;
            gridSphereSize = 0.42;
        } else if (screenWidth <= 1920) {
            // 桌面2K
            gridCols = 5;
            gridRows = 6;
            previewSphereSize = isNarrowScreen ? 3.5 : 4.0;
            gridSphereSize = 0.45;
        } else {
            // 4K及以上
            gridCols = 6;
            gridRows = 6;
            previewSphereSize = isNarrowScreen ? 3.8 : 4.2;
            gridSphereSize = 0.48;
        }
        
        const maxGridItems = gridCols * gridRows;

        // 内联纹理创建函数，避免依赖问题
        const createTextures = async (galleryItems) => {
            if (!galleryItems || galleryItems.length === 0) {
                return [];
            }

            const textures = [];
            const totalImages = Math.min(galleryItems.length, 37); // 37张图片：1张给中心球 + 36张给卫星球

            for (let i = 0; i < totalImages; i++) {
                const texture = await new Promise((resolve) => {
                    const item = galleryItems[i];
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    img.onload = () => {
                        // 创建画布
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // 设置画布尺寸为正方形，适合球体贴图
                        const canvasSize = 512; // 降低分辨率提升性能
                        canvas.width = canvasSize;
                        canvas.height = canvasSize;
                        
                        // 将图片绘制到整个画布，完全覆盖
                        ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
                        
                        // 添加微妙的装饰效果
                        const gradient = ctx.createRadialGradient(
                            canvasSize / 2, canvasSize / 2, 0,
                            canvasSize / 2, canvasSize / 2, canvasSize / 2
                        );
                        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                        gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
                        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvasSize, canvasSize);
                        
                        // 添加微妙的纹理噪声
                        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
                        const data = imageData.data;
                        
                        for (let j = 0; j < data.length; j += 4) {
                            const noise = (Math.random() - 0.5) * 3;
                            data[j] = Math.max(0, Math.min(255, data[j] + noise));
                            data[j + 1] = Math.max(0, Math.min(255, data[j + 1] + noise));
                            data[j + 2] = Math.max(0, Math.min(255, data[j + 2] + noise));
                        }
                        
                        ctx.putImageData(imageData, 0, 0);
                        
                        // 创建Three.js纹理
                        const texture = new THREE.CanvasTexture(canvas);
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.generateMipmaps = true;
                        texture.minFilter = THREE.LinearMipmapLinearFilter;
                        texture.magFilter = THREE.LinearFilter;
                        
                        resolve(texture);
                    };
                    
                    img.onerror = () => {
                        // 图片加载失败，创建彩色纹理
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const canvasSize = 512;
                        canvas.width = canvasSize;
                        canvas.height = canvasSize;
                        
                        // 为每个球创建不同颜色的渐变
                        const colors = [
                            ['#ff6b6b', '#4ecdc4', '#45b7d1'],
                            ['#a8e6cf', '#ffd93d', '#ff6b9d'],
                            ['#c44569', '#f8b500', '#6c5ce7'],
                            ['#fd79a8', '#00b894', '#0984e3'],
                            ['#e17055', '#00cec9', '#6c5ce7'],
                            ['#fdcb6e', '#e84393', '#00b894'],
                            ['#fd79a8', '#fdcb6e', '#74b9ff'],
                            ['#55a3ff', '#26de81', '#fc5c65'],
                            ['#a55eea', '#26de81', '#fd9644']
                        ];
                        
                        const colorSet = colors[i % colors.length];
                        const gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
                        gradient.addColorStop(0, colorSet[0]);
                        gradient.addColorStop(0.5, colorSet[1]);
                        gradient.addColorStop(1, colorSet[2]);
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvasSize, canvasSize);
                        
                        const texture = new THREE.CanvasTexture(canvas);
                        resolve(texture);
                    };
                    
                    img.src = item.src || item.thumbnail;
                });

                textures.push(texture);
                setLoadingProgress(((i + 1) / totalImages) * 100);
            }

            return textures;
        };

        try {
            // 计算画布尺寸
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const canvasWidth = canvasRect.width;
            const canvasHeight = canvasRect.height;

            console.log(`Canvas size: ${canvasWidth} x ${canvasHeight}`);

            // 创建渲染器
            rendererRef.current = new THREE.WebGLRenderer({ 
                canvas: canvasRef.current, 
                alpha: true,
                antialias: true
            });
            rendererRef.current.setSize(canvasWidth, canvasHeight);
            rendererRef.current.setClearColor(0x000000, 0);

            // 创建场景
            sceneRef.current = new THREE.Scene();

            // 创建相机 - 响应式视角适配不同布局
            cameraRef.current = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 1000);
            
            // 根据布局模式调整相机位置
            if (isNarrowScreen) {
                // 窄屏模式：相机稍微后退并向上看，适应上下布局
                cameraRef.current.position.set(0, 0, 18);
                cameraRef.current.lookAt(0, 0, 0);
            } else {
                // 宽屏模式：标准侧面视角
                cameraRef.current.position.set(0, 0, 15);
                cameraRef.current.lookAt(0, 0, 0);
            }

            // 完全禁用轨道控制器 - 不允许用户拖拽旋转
            controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
            controlsRef.current.enabled = false; // 完全禁用控制器

            // 艺术感照明系统 - 多层次光源设计
            
            // 1. 主环境光 - 提供基础照明，不会产生阴影
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
            sceneRef.current.add(ambientLight);

            // 2. 主要方向光 - 模拟阳光，突出球体的形状和纹理
            const mainDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            mainDirectionalLight.position.set(10, 10, 5);
            mainDirectionalLight.castShadow = true;
            mainDirectionalLight.shadow.mapSize.width = 2048;
            mainDirectionalLight.shadow.mapSize.height = 2048;
            sceneRef.current.add(mainDirectionalLight);

            // 3. 柔和补光 - 从侧面照亮，减少阴影
            const fillLight = new THREE.DirectionalLight(0xb3d9ff, 0.3);
            fillLight.position.set(-5, 5, 8);
            sceneRef.current.add(fillLight);

            // 4. 背景光 - 从后方照亮，增加深度感
            const backLight = new THREE.DirectionalLight(0xfff4e6, 0.2);
            backLight.position.set(0, -5, -10);
            sceneRef.current.add(backLight);

            // 5. 聚光灯 - 突出预览球，响应式目标位置
            const spotLight = new THREE.SpotLight(0xffffff, 0.6);
            spotLight.position.set(8, 8, 8);
            
            // 响应式聚光灯目标位置
            if (isNarrowScreen) {
                spotLight.target.position.set(0, 4, 0); // 指向上方预览球
            } else {
                spotLight.target.position.set(5, 0, 0); // 指向右侧预览球
            }
            
            spotLight.angle = Math.PI / 6;
            spotLight.penumbra = 0.3;
            spotLight.decay = 2;
            spotLight.distance = 30;
            sceneRef.current.add(spotLight);
            sceneRef.current.add(spotLight.target);

            // 6. 点光源阵列 - 为小球提供微妙的照明变化
            const pointLights = [];
            for (let i = 0; i < 3; i++) {
                const pointLight = new THREE.PointLight(0xffffff, 0.3, 15);
                pointLight.position.set(
                    -6 + i * 3, 
                    Math.sin(i) * 2, 
                    3 + Math.cos(i) * 2
                );
                pointLights.push(pointLight);
                sceneRef.current.add(pointLight);
            }

            // 存储光源引用供动画使用
            const lightRefs = { pointLights, spotLight };

            // 创建纹理
            const textures = await createTextures(currentGalleryData.slice(0, maxGridItems));

            // 创建右侧预览球 - 响应式尺寸和位置
            if (textures.length > 0) {
                const previewGeometry = new THREE.SphereGeometry(previewSphereSize, 64, 32);
                // 优化预览球材质 - 增强艺术感
                const previewMaterial = new THREE.MeshStandardMaterial({
                    map: textures[0],
                    metalness: 0.05,  // 减少金属感，让照片更自然
                    roughness: 0.2,   // 增加微妙的光泽
                    envMapIntensity: 0.5,  // 环境反射强度
                });
                
                // 不调整球体方向，保持贴图正确显示
                
                previewSphere.current = new THREE.Mesh(previewGeometry, previewMaterial);
                
                // 响应式位置 - 窄屏时在上方，宽屏时在右侧
                if (isNarrowScreen) {
                    previewSphere.current.position.set(0, 4, 0); // 上方中心
                } else {
                    previewSphere.current.position.set(5, 0, 0); // 右侧中心
                }
                
                previewSphere.current.userData = { 
                    type: 'preview',
                    currentTextureIndex: 0
                };
                sceneRef.current.add(previewSphere.current);
            }

            // 智能响应式球体网格 - 使用前面计算的变量
            galleryGridSpheres.current = [];
            
            // 响应式边界和网格间距计算
            let leftBoundary, rightBoundary, topBoundary, bottomBoundary;
            
            if (isNarrowScreen) {
                // 窄屏模式：小球在下方，覆盖整个宽度
                leftBoundary = -6.0;
                rightBoundary = 6.0;
                topBoundary = -1.5;
                bottomBoundary = -5.0;
            } else {
                // 宽屏模式：小球在左侧
                leftBoundary = -8.2;
                rightBoundary = -0.2;
                topBoundary = 3.0;
                bottomBoundary = -3.0;
            }
            
            // 计算网格间距 - 增大间隙
            const gridWidth = rightBoundary - leftBoundary;
            const gridHeight = topBoundary - bottomBoundary;
            const spacingX = gridWidth / (gridCols - 1); // X方向间距
            const spacingY = gridHeight / (gridRows - 1); // Y方向间距

            for (let row = 0; row < gridRows; row++) {
                for (let col = 0; col < gridCols; col++) {
                    const index = row * gridCols + col;
                    if (index < maxGridItems && index < textures.length) {
                        const gridGeometry = new THREE.SphereGeometry(gridSphereSize, 32, 16);
                        // 优化小球材质 - 统一艺术风格
                        const gridMaterial = new THREE.MeshStandardMaterial({
                            map: textures[index],
                            metalness: 0.03,  // 极低金属感
                            roughness: 0.15,  // 平滑表面
                            envMapIntensity: 0.3,
                        });

                        // 不调整球体方向，保持贴图正确显示

                        const gridSphere = new THREE.Mesh(gridGeometry, gridMaterial);
                        
                        // 按更大的区域均匀分布
                        const xPos = leftBoundary + col * spacingX;
                        const yPos = topBoundary - row * spacingY;
                        
                        gridSphere.position.set(xPos, yPos, 0);
                        gridSphere.userData = { 
                            type: 'grid',
                            textureIndex: index,
                            originalScale: 1.0,
                            targetScale: 1.0,
                            imageData: currentGalleryData[index] || {}
                        };

                        galleryGridSpheres.current.push(gridSphere);
                        sceneRef.current.add(gridSphere);
                    }
                }
            }

            // 鼠标交互状态
            let currentHoveredSphere = null;

            // 鼠标悬停处理
            const handleMouseMove = (event) => {
                if (!canvasRef.current || !raycasterRef.current || !cameraRef.current) return;
                
                const rect = canvasRef.current.getBoundingClientRect();
                mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
                const intersects = raycasterRef.current.intersectObjects(galleryGridSpheres.current);

                if (intersects.length > 0) {
                    const hoveredGridSphere = intersects[0].object;
                    if (currentHoveredSphere !== hoveredGridSphere) {
                        // 移除之前球体的效果
                        if (currentHoveredSphere) {
                            currentHoveredSphere.userData.targetScale = 1.0;
                        }

                        currentHoveredSphere = hoveredGridSphere;
                        hoveredGridSphere.userData.targetScale = 1.3;
                        
                        // 更新预览球的纹理
                        if (previewSphere.current && textures[hoveredGridSphere.userData.textureIndex]) {
                            previewSphere.current.material.map = textures[hoveredGridSphere.userData.textureIndex];
                            previewSphere.current.material.needsUpdate = true;
                            previewSphere.current.userData.currentTextureIndex = hoveredGridSphere.userData.textureIndex;
                        }
                    }
                } else if (currentHoveredSphere) {
                    // 鼠标离开所有球体
                    currentHoveredSphere.userData.targetScale = 1.0;
                    currentHoveredSphere = null;
                    
                    // 恢复预览球到第一张图片
                    if (previewSphere.current && textures[0]) {
                        previewSphere.current.material.map = textures[0];
                        previewSphere.current.material.needsUpdate = true;
                        previewSphere.current.userData.currentTextureIndex = 0;
                    }
                }
            };

            // 修复点击小球实时切换大球贴图问题
            const handleSphereClick = (event) => {
                if (!canvasRef.current || !raycasterRef.current || !cameraRef.current) return;

                const rect = canvasRef.current.getBoundingClientRect();
                mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
                
                // 首先检查是否点击了预览球
                const previewIntersects = raycasterRef.current.intersectObjects([previewSphere.current]);
                if (previewIntersects.length > 0) {
                    // 点击了预览球，打开图片预览组件
                    const currentTextureIndex = previewSphere.current.userData.currentTextureIndex || 0;
                    setPhotoSwipeInitialIndex(currentTextureIndex);
                    setIsPhotoSwipeOpen(true);
                    return;
                }

                // 检查是否点击了小球
                const gridIntersects = raycasterRef.current.intersectObjects(galleryGridSpheres.current);
                if (gridIntersects.length > 0) {
                    const clickedSphere = gridIntersects[0].object;
                    const textureIndex = clickedSphere.userData.textureIndex;
                    if (previewSphere.current && textures[textureIndex]) {
                        previewSphere.current.material.map = textures[textureIndex];
                        previewSphere.current.material.needsUpdate = true;
                        previewSphere.current.userData.currentTextureIndex = textureIndex; // 更新当前索引
                    }
                }
            };

            // 添加鼠标事件监听器
            canvasRef.current.addEventListener('mousemove', handleMouseMove);
            canvasRef.current.addEventListener('click', handleSphereClick);

            // 动画循环 - 固定视角，增加微妙的光影变化
            const animate = () => {
                animationFrameRef.current = requestAnimationFrame(animate);
                
                const time = Date.now() * 0.001;
                
                // 预览球缓慢旋转
                if (previewSphere.current) {
                    previewSphere.current.rotation.y += 0.005;
                }
                
                // 点光源微妙摆动，创造动态光影
                lightRefs.pointLights.forEach((light, index) => {
                    light.position.y += Math.sin(time + index) * 0.01;
                    light.intensity = 0.25 + Math.sin(time * 0.5 + index) * 0.05;
                });
                
                // 聚光灯微妙强度变化
                if (lightRefs.spotLight) {
                    lightRefs.spotLight.intensity = 0.55 + Math.sin(time * 0.3) * 0.1;
                }
                
                // 网格球体的hover缩放动画
                galleryGridSpheres.current.forEach((sphere) => {
                    const currentScale = sphere.scale.x;
                    const targetScale = sphere.userData.targetScale;
                    if (Math.abs(currentScale - targetScale) > 0.01) {
                        const newScale = currentScale + (targetScale - currentScale) * 0.12;
                        sphere.scale.setScalar(newScale);
                    }
                    
                    // 轻微的自转
                    sphere.rotation.y += 0.002;
                });

                // 渲染场景 - 固定相机角度
                if (rendererRef.current && sceneRef.current && cameraRef.current) {
                    rendererRef.current.render(sceneRef.current, cameraRef.current);
                }
            };
            animate();

            // 清理函数
            const cleanup = () => {
                if (canvasRef.current) {
                    canvasRef.current.removeEventListener('mousemove', handleMouseMove);
                    canvasRef.current.removeEventListener('click', handleSphereClick);
                }
            };

            return cleanup;

        } catch (error) {
            console.error('Three.js 场景初始化失败:', error);
        }
    };

    // 清理场景函数
    cleanupSceneRef.current = () => {
        // 停止动画循环
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        // 清理控制器
        if (controlsRef.current) {
            controlsRef.current.dispose();
            controlsRef.current = null;
        }

        // 清理场景中的几何体和材质
        if (sceneRef.current) {
            sceneRef.current.traverse((child) => {
                if (child.geometry) {
                    child.geometry.dispose();
                }
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => {
                            if (material.map) material.map.dispose();
                            material.dispose();
                        });
                    } else {
                        if (child.material.map) child.material.map.dispose();
                        child.material.dispose();
                    }
                }
            });
            sceneRef.current = null;
        }

        // 清理渲染器
        if (rendererRef.current) {
            rendererRef.current.dispose();
            rendererRef.current = null;
        }
    };

    // 窗口大小调整处理函数
    const handleResize = () => {
        if (cameraRef.current && rendererRef.current && canvasRef.current) {
            const width = canvasRef.current.clientWidth;
            const height = canvasRef.current.clientHeight;
            
            // 立即更新相机和渲染器
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
            
            // 清除之前的防抖定时器
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            
            // 防抖处理布局模式检查，避免频繁重建场景
            resizeTimeoutRef.current = setTimeout(() => {
                // 检查布局是否需要改变（从窄屏到宽屏或反之）
                const newAspectRatio = width / height;
                const newIsNarrowScreen = newAspectRatio < 1.2 || width < 1200;
                
                // 检查当前预览球的布局状态
                const currentIsNarrowScreen = previewSphere.current && 
                    (Math.abs(previewSphere.current.position.y - 4) < 1); // 检查是否在上方位置
                    
                console.log('Layout check:', { 
                    width, 
                    height, 
                    newAspectRatio: newAspectRatio.toFixed(2), 
                    newIsNarrowScreen, 
                    currentIsNarrowScreen 
                }); // Debug log
                    
                if (newIsNarrowScreen !== currentIsNarrowScreen) {
                    console.log('Layout mode changed, reinitializing scene...'); // Debug log
                    // 布局模式改变，需要重新初始化
                    if (cleanupFunctionRef.current) {
                        cleanupFunctionRef.current();
                        cleanupFunctionRef.current = null;
                    }
                    initSceneRef.current().then(cleanup => {
                        cleanupFunctionRef.current = cleanup;
                    });
                }
            }, 300); // 300ms 防抖延迟
        }
    };

    const cleanupFunctionRef = useRef(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        setLoadingProgress(0);
        // 防止背景滚动
        document.body.style.overflow = 'hidden';
        // 延迟初始化 Three.js 场景，确保 DOM 已渲染
        const timer = setTimeout(async () => {
            // 清理之前的场景
            if (cleanupFunctionRef.current) {
                cleanupFunctionRef.current();
                cleanupFunctionRef.current = null;
            }
            
            // 重置初始化状态，允许新的初始化
            isInitializedRef.current = false;
            
            cleanupFunctionRef.current = await initSceneRef.current();
        }, 100);
        return () => clearTimeout(timer);
    }, [galleryData]); // 只依赖基本的状态值

    // 窗口大小变化监听
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            // 清理防抖定时器
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
        };
    }, []);

    // 组件卸载清理
    useEffect(() => {
        return () => {
            cleanupSceneRef.current();
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            {/* PhotoSwipeGallery Integration */}
            <PhotoSwipeGallery 
                items={galleryData.map(item => ({ 
                    src: item.src, 
                    thumbnail: item.thumbnail, 
                    title: { en: item.title || 'Untitled', zh: item.title || '未命名' }, 
                    description: { en: item.description || '', zh: item.description || '' } 
                }))}
                isOpen={isPhotoSwipeOpen}
                onClose={() => setIsPhotoSwipeOpen(false)}
                initialIndex={photoSwipeInitialIndex} // 设置初始索引
            />

            {/* Three.js 场景容器 - 全屏 */}
            <div className="absolute inset-0 w-full h-full">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ background: 'transparent' }}
                />

                {/* 加载提示 */}
                {loadingProgress < 100 && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/60 text-center pointer-events-none">
                        <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm mb-2">
                            {language === 'en' ? 'Loading Turntable Gallery...' : '加载转盘画廊中...'}
                        </p>
                        <div className="w-48 bg-white/20 rounded-full h-2 mb-2">
                            <div 
                                className="bg-white/60 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-xs opacity-60">
                            {Math.round(loadingProgress)}% • Loading {Math.min(galleryData?.length || 0, 37)} photos for turntable gallery
                        </p>
                    </div>
                )}

                {/* 操作提示 */}
                {loadingProgress >= 100 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-center pointer-events-none">
                        <p className="text-sm">
                            {language === 'en' 
                                ? 'Touch the stars to ignite their radiant glow • Watch them dance in the moon • Click the moon to unveil memories' 
                                : '轻抚繁星点亮绚烂光芒 • 观其于明月中起舞 • 轻触皓月揽尽回忆'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

Gallery.propTypes = {
    language: PropTypes.string
};

export default Gallery;
