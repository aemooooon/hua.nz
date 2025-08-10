import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { useAppStore } from '../../../store/useAppStore';

const GallerySection = ({ language = 'en' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPointerLocked, setIsPointerLocked] = useState(false);
    
    // 获取 gallery 数据
    const galleryData = useAppStore(state => state.getAllGalleryItems());
    
    // Three.js 引用
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationFrameRef = useRef(null);
    const clockRef = useRef(new THREE.Clock());
    const wallsRef = useRef(null); // 用于碰撞检测

    // 按键状态
    const keysPressed = useRef({
        w: false,
        a: false,
        s: false,
        d: false,
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    });

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const container = containerRef.current;
        
        // 创建简单房间
        const createSimpleRoom = (scene) => {
            // 创建墙体组用于碰撞检测
            const wallGroup = new THREE.Group();
            scene.add(wallGroup);
            wallsRef.current = wallGroup;

            // 地板 - 高端艺术画廊深色大理石风格
            const floorGeometry = new THREE.PlaneGeometry(30, 30);
            const floorMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x2c2c2c, // 深灰色大理石风
                transparent: false
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.position.y = -2;
            floor.receiveShadow = true;
            scene.add(floor);

            // 天花板 - 深色艺术画廊风格
            const ceiling = new THREE.Mesh(
                new THREE.PlaneGeometry(30, 30),
                new THREE.MeshLambertMaterial({ 
                    color: 0x1a1a1a, // 深色天花板，突出灯光效果
                    side: THREE.DoubleSide
                })
            );
            ceiling.rotation.x = Math.PI / 2;
            ceiling.position.y = 8;
            ceiling.receiveShadow = true;
            scene.add(ceiling);

            // 墙体材质 - 现代画廊风格，略带纹理感
            const wallMaterial = new THREE.MeshLambertMaterial({ 
                color: 0xf8f8f8, // 纯净的画廊白
                side: THREE.FrontSide,
                transparent: false
            });
            const wallSize = 30;
            const wallHeight = 12;
            const wallThickness = 0.5;

            // 后墙（北）
            const backWall = new THREE.Mesh(
                new THREE.BoxGeometry(wallSize, wallHeight, wallThickness),
                wallMaterial
            );
            backWall.position.set(0, 3, -15);
            backWall.receiveShadow = true;
            backWall.castShadow = false;
            wallGroup.add(backWall);
            scene.add(backWall);

            // 前墙（南）- 留个缺口作为入口
            const frontWallLeft = new THREE.Mesh(
                new THREE.BoxGeometry(10, wallHeight, wallThickness),
                wallMaterial
            );
            frontWallLeft.position.set(-10, 3, 15);
            frontWallLeft.receiveShadow = true;
            frontWallLeft.castShadow = false;
            wallGroup.add(frontWallLeft);
            scene.add(frontWallLeft);

            const frontWallRight = new THREE.Mesh(
                new THREE.BoxGeometry(10, wallHeight, wallThickness),
                wallMaterial
            );
            frontWallRight.position.set(10, 3, 15);
            frontWallRight.receiveShadow = true;
            frontWallRight.castShadow = false;
            wallGroup.add(frontWallRight);
            scene.add(frontWallRight);

            // 左墙（西）
            const leftWall = new THREE.Mesh(
                new THREE.BoxGeometry(wallThickness, wallHeight, wallSize),
                wallMaterial
            );
            leftWall.position.set(-15, 3, 0);
            leftWall.receiveShadow = true;
            leftWall.castShadow = false;
            wallGroup.add(leftWall);
            scene.add(leftWall);

            // 右墙（东）
            const rightWall = new THREE.Mesh(
                new THREE.BoxGeometry(wallThickness, wallHeight, wallSize),
                wallMaterial
            );
            rightWall.position.set(15, 3, 0);
            rightWall.receiveShadow = true;
            rightWall.castShadow = false;
            wallGroup.add(rightWall);
            scene.add(rightWall);
        };

        // 添加测试画作
        const addTestPaintings = (scene) => {
            if (!galleryData || galleryData.length === 0) {
                console.log('No gallery data available, creating placeholder paintings');
                
                // 创建几个占位符画作
                for (let i = 0; i < 6; i++) {
                    const paintingGeometry = new THREE.PlaneGeometry(3, 2);
                    const paintingMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
                    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
                    
                    // 分布在不同墙面
                    if (i < 3) {
                        // 后墙
                        painting.position.set(-6 + i * 6, 3, -14.9);
                        painting.rotation.y = 0;
                    } else {
                        // 左墙  
                        painting.position.set(-14.9, 3, -6 + (i-3) * 6);
                        painting.rotation.y = Math.PI / 2;
                    }
                    scene.add(painting);
                }
                return;
            }

            console.log(`Loading ${galleryData.length} gallery items`);

            // 增加画作数量，最多12幅
            const maxPaintings = Math.min(galleryData.length, 12);
            const basePaintingHeight = 2.2; // 基础高度
            const maxPaintingWidth = 4; // 最大宽度限制
            const paintingCenterHeight = 1.6; // 画作中心高度，与摄像机视线水平
            
            console.log(`Creating ${maxPaintings} paintings with dynamic aspect ratios at eye level (${paintingCenterHeight}m)...`);

            // 首先分析所有图片的长宽比，为智能分配做准备
            const analyzeImageDimensions = async () => {
                const imageAnalysis = [];
                for (let i = 0; i < Math.min(galleryData.length, maxPaintings); i++) {
                    const item = galleryData[i];
                    if (item.src || item.thumbnail) {
                        try {
                            const dimensions = await getImageDimensions(item.src || item.thumbnail);
                            const aspectRatio = dimensions.width / dimensions.height;
                            imageAnalysis.push({
                                index: i,
                                item: item,
                                aspectRatio: aspectRatio,
                                isPortrait: aspectRatio < 0.8, // 竖版图片
                                isLandscape: aspectRatio > 1.3, // 横版图片
                                isSquare: aspectRatio >= 0.8 && aspectRatio <= 1.3 // 方形图片
                            });
                        } catch (error) {
                            imageAnalysis.push({
                                index: i,
                                item: item,
                                aspectRatio: 1.0,
                                isPortrait: false,
                                isLandscape: false,
                                isSquare: true
                            });
                        }
                    }
                }
                return imageAnalysis;
            };

            // 智能分配图片到墙面位置
            const assignPaintingsToWalls = (imageAnalysis) => {
                const wallAssignments = {
                    backWall: [], // 后墙
                    rightWall: [], // 右墙
                    leftWall: [], // 左墙
                    frontWall: [] // 前墙（中间光源区域）
                };

                // 优先将竖版图片分配到前墙（中间光源区域）
                const portraitImages = imageAnalysis.filter(img => img.isPortrait);
                const landscapeImages = imageAnalysis.filter(img => img.isLandscape);
                const squareImages = imageAnalysis.filter(img => img.isSquare);

                // 前墙优先分配竖版图片（最多2幅）
                portraitImages.slice(0, 2).forEach(img => wallAssignments.frontWall.push(img));
                
                // 如果前墙还有空位，用方形图片补充
                const frontWallRemaining = 2 - wallAssignments.frontWall.length;
                if (frontWallRemaining > 0) {
                    squareImages.slice(0, frontWallRemaining).forEach(img => wallAssignments.frontWall.push(img));
                }

                // 其他墙面分配剩余图片
                const remainingImages = imageAnalysis.filter(img => 
                    !wallAssignments.frontWall.some(assigned => assigned.index === img.index)
                );

                // 后墙分配3幅
                remainingImages.slice(0, 3).forEach(img => wallAssignments.backWall.push(img));
                // 右墙分配3幅
                remainingImages.slice(3, 6).forEach(img => wallAssignments.rightWall.push(img));
                // 左墙分配剩余的
                remainingImages.slice(6, 9).forEach(img => wallAssignments.leftWall.push(img));

                return wallAssignments;
            };

            // 异步创建所有画作
            const createPaintingsAsync = async () => {
                const imageAnalysis = await analyzeImageDimensions();
                const wallAssignments = assignPaintingsToWalls(imageAnalysis);
                
                console.log('🎨 智能图片分配结果:', {
                    前墙竖版: wallAssignments.frontWall.length,
                    后墙: wallAssignments.backWall.length,
                    右墙: wallAssignments.rightWall.length,
                    左墙: wallAssignments.leftWall.length
                });

                // 创建共享的纹理加载器
                const textureLoader = new THREE.TextureLoader();
                const loadedTextures = new Map(); // 缓存已加载的纹理

                // 创建画作的函数
                const createPaintingAtPosition = async (imageData, wallType, positionIndex) => {
                    const item = imageData.item;
                    const aspectRatio = imageData.aspectRatio;
                    
                    // 根据图片比例计算尺寸
                    let paintingWidth, paintingHeight;
                    if (aspectRatio > 1.5) {
                        paintingWidth = Math.min(maxPaintingWidth, basePaintingHeight * aspectRatio * 0.8);
                        paintingHeight = paintingWidth / aspectRatio;
                    } else if (aspectRatio < 0.7) {
                        paintingHeight = basePaintingHeight;
                        paintingWidth = paintingHeight * aspectRatio;
                    } else {
                        paintingHeight = basePaintingHeight * 0.9;
                        paintingWidth = paintingHeight * aspectRatio;
                    }
                    
                    const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
                    // 使用简单材质，避免纹理单元超限
                    const paintingMaterial = new THREE.MeshLambertMaterial({
                        color: 0x888888,
                        side: THREE.DoubleSide
                    });
                    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
                    
                    // 创建画框
                    const paintingWithFrame = createPaintingFrame(painting, paintingWidth, paintingHeight);
                    
                    // 设置位置
                    const wallOffset = 14.5;
                    switch(wallType) {
                        case 'backWall':
                            paintingWithFrame.position.set(-8 + positionIndex * 8, paintingCenterHeight, -wallOffset);
                            paintingWithFrame.rotation.y = 0;
                            break;
                        case 'rightWall':
                            paintingWithFrame.position.set(wallOffset, paintingCenterHeight, -8 + positionIndex * 8);
                            paintingWithFrame.rotation.y = -Math.PI / 2;
                            break;
                        case 'leftWall':
                            paintingWithFrame.position.set(-wallOffset, paintingCenterHeight, 8 - positionIndex * 8);
                            paintingWithFrame.rotation.y = Math.PI / 2;
                            break;
                        case 'frontWall':
                            if (positionIndex === 0) {
                                paintingWithFrame.position.set(-12, paintingCenterHeight, wallOffset);
                            } else {
                                paintingWithFrame.position.set(12, paintingCenterHeight, wallOffset);
                            }
                            paintingWithFrame.rotation.y = Math.PI;
                            break;
                    }
                    
                    paintingWithFrame.castShadow = false;
                    paintingWithFrame.receiveShadow = false;
                    scene.add(paintingWithFrame);
                    
                    console.log(`🖼️ 创建画作: ${wallType} 位置${positionIndex} 坐标(${paintingWithFrame.position.x.toFixed(1)}, ${paintingWithFrame.position.y.toFixed(1)}, ${paintingWithFrame.position.z.toFixed(1)})`);
                    
                    // 创建射灯
                    setTimeout(() => {
                        createPaintingSpotlight(paintingWithFrame);
                    }, 100);
                    
                    // 批量加载纹理，限制同时加载的数量
                    const imageSrc = item.src || item.thumbnail;
                    if (!loadedTextures.has(imageSrc)) {
                        try {
                            // 预检查图片是否存在
                            const checkImageExists = (src) => {
                                return new Promise((resolve, reject) => {
                                    const img = new Image();
                                    img.onload = () => resolve(true);
                                    img.onerror = () => reject(false);
                                    img.src = src;
                                });
                            };

                            await checkImageExists(imageSrc);
                            
                            const texture = await new Promise((resolve, reject) => {
                                textureLoader.load(
                                    imageSrc,
                                    resolve,
                                    undefined,
                                    reject
                                );
                            });
                            
                            // 设置纹理参数
                            texture.generateMipmaps = false;
                            texture.minFilter = THREE.LinearFilter;
                            texture.magFilter = THREE.LinearFilter;
                            
                            loadedTextures.set(imageSrc, texture);
                            painting.material.map = texture;
                            painting.material.color.setHex(0xffffff);
                            painting.material.needsUpdate = true;
                            console.log(`✅ 已加载${wallType}图片: ${item.title?.zh || item.title?.en || 'Untitled'}`);
                        } catch (error) {
                            console.warn(`❌ 图片加载失败 (${imageSrc}):`, error);
                            // 使用灰色占位符
                            painting.material.color.setHex(0x666666);
                            painting.material.needsUpdate = true;
                        }
                    } else {
                        // 重用已加载的纹理
                        painting.material.map = loadedTextures.get(imageSrc);
                        painting.material.color.setHex(0xffffff);
                        painting.material.needsUpdate = true;
                    }
                };
                
                // 顺序创建画作，避免同时创建过多
                const allPaintings = [
                    ...wallAssignments.backWall.map((data, i) => ({ data, wallType: 'backWall', index: i })),
                    ...wallAssignments.rightWall.map((data, i) => ({ data, wallType: 'rightWall', index: i })),
                    ...wallAssignments.leftWall.map((data, i) => ({ data, wallType: 'leftWall', index: i })),
                    ...wallAssignments.frontWall.map((data, i) => ({ data, wallType: 'frontWall', index: i }))
                ];
                
                // 批量处理，每次处理4幅画
                for (let i = 0; i < allPaintings.length; i += 4) {
                    const batch = allPaintings.slice(i, i + 4);
                    await Promise.all(
                        batch.map(({ data, wallType, index }) => 
                            createPaintingAtPosition(data, wallType, index)
                        )
                    );
                    // 短暂延迟，让GPU有时间处理
                    if (i + 4 < allPaintings.length) {
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }
            };
            
            // 创建一个函数来异步获取图片尺寸
            const getImageDimensions = (src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve({ width: img.width, height: img.height });
                    };
                    img.onerror = () => {
                        // 如果加载失败，返回默认比例
                        resolve({ width: 300, height: 200 });
                    };
                    img.src = src;
                });
            };

            // 简化射灯系统，减少GPU负担
            const createPaintingSpotlight = (paintingMesh) => {
                const spotLight = new THREE.SpotLight(0xfff8e7, 2.0, 12, Math.PI / 8, 0.3, 1.5);
                const position = paintingMesh.position;
                const rotation = paintingMesh.rotation;
                
                // 根据画作朝向计算射灯位置
                let lightPos = new THREE.Vector3();
                const lightHeight = 6.0;
                const offset = 2.0;
                
                if (Math.abs(rotation.y) < 0.1) { // 后墙
                    lightPos.set(position.x, lightHeight, position.z + offset);
                } else if (Math.abs(rotation.y - Math.PI) < 0.1) { // 前墙
                    lightPos.set(position.x, lightHeight, position.z - offset);
                } else if (Math.abs(rotation.y + Math.PI/2) < 0.1) { // 右墙
                    lightPos.set(position.x - offset, lightHeight, position.z);
                } else if (Math.abs(rotation.y - Math.PI/2) < 0.1) { // 左墙
                    lightPos.set(position.x + offset, lightHeight, position.z);
                }
                
                spotLight.position.copy(lightPos);
                spotLight.target = paintingMesh;
                // 简化阴影设置
                spotLight.castShadow = false; // 关闭阴影以节省GPU资源
                
                scene.add(spotLight);
                scene.add(spotLight.target);
                return spotLight;
            };

            // 创建现代简约画框
            const frameThickness = 0.05;
            const frameWidth = 0.1;
            const createPaintingFrame = (painting, pWidth = 2.5, pHeight = 2.0) => {
                const frameGroup = new THREE.Group();
                
                // 画框材质 - 黑色金属质感
                const frameMaterial = new THREE.MeshPhysicalMaterial({ 
                    color: 0x1a1a1a,
                    metalness: 0.8,        // 高金属度
                    roughness: 0.2,        // 低粗糙度，更有光泽
                    clearcoat: 0.3,        // 清漆层
                    clearcoatRoughness: 0.1 // 清漆粗糙度
                });
                
                // 四条画框边
                const frameGeometries = [
                    new THREE.BoxGeometry(pWidth + frameWidth * 2, frameWidth, frameThickness), // 上边
                    new THREE.BoxGeometry(pWidth + frameWidth * 2, frameWidth, frameThickness), // 下边
                    new THREE.BoxGeometry(frameWidth, pHeight, frameThickness), // 左边
                    new THREE.BoxGeometry(frameWidth, pHeight, frameThickness)  // 右边
                ];
                
                const framePositions = [
                    { x: 0, y: (pHeight + frameWidth) / 2, z: frameThickness / 2 },  // 上
                    { x: 0, y: -(pHeight + frameWidth) / 2, z: frameThickness / 2 }, // 下
                    { x: -(pWidth + frameWidth) / 2, y: 0, z: frameThickness / 2 },  // 左
                    { x: (pWidth + frameWidth) / 2, y: 0, z: frameThickness / 2 }    // 右
                ];
                
                frameGeometries.forEach((geometry, i) => {
                    const frame = new THREE.Mesh(geometry, frameMaterial);
                    frame.position.set(
                        framePositions[i].x, 
                        framePositions[i].y, 
                        framePositions[i].z
                    );
                    // 取消阴影，让画贴合墙面
                    frame.castShadow = false;
                    frame.receiveShadow = false;
                    frameGroup.add(frame);
                });
                
                frameGroup.add(painting);
                return frameGroup;
            };

            // 启动异步画作创建（只调用一次）
            createPaintingsAsync();
        };

        // 移动更新函数
        const updateMovement = (delta, controls) => {
            const moveSpeed = 6 * delta; // 移动速度
            const camera = cameraRef.current;
            
            // 保存当前位置用于碰撞检测
            const previousPosition = camera.position.clone();
            
            if (keysPressed.current.w || keysPressed.current.ArrowUp) {
                controls.moveForward(moveSpeed);
            }
            if (keysPressed.current.s || keysPressed.current.ArrowDown) {
                controls.moveForward(-moveSpeed);
            }
            if (keysPressed.current.d || keysPressed.current.ArrowRight) {
                controls.moveRight(moveSpeed);
            }
            if (keysPressed.current.a || keysPressed.current.ArrowLeft) {
                controls.moveRight(-moveSpeed);
            }
            
            // 碰撞检测
            if (checkCollision(camera)) {
                camera.position.copy(previousPosition);
            }
            
            // 确保摄像机高度始终保持在视线水平
            camera.position.y = 1.6;
        };

        // 简单的边界碰撞检测
        const checkCollision = (camera) => {
            const position = camera.position;
            const boundary = 13.5; // 距离墙的最小距离
            
            // 检查是否撞到墙边界
            if (position.x > boundary || position.x < -boundary ||
                position.z > boundary || position.z < -boundary) {
                return true;
            }
            
            return false;
        };
        
        // 初始化Three.js场景
        const initScene = () => {
            try {
                // 创建场景
                const scene = new THREE.Scene();
                scene.background = new THREE.Color(0x1a1a1a); // 深色背景，让天花板灯光更显眼
                sceneRef.current = scene;

                // 创建相机 - 设置视线高度与画作中心对齐
                const camera = new THREE.PerspectiveCamera(
                    75,
                    container.clientWidth / container.clientHeight,
                    0.1,
                    1000
                );
                camera.position.set(0, 1.6, 10); // 视线高度1.6米，与画作中心对齐
                cameraRef.current = camera;

                // 创建优化的渲染器 - 减少纹理单元使用
                const renderer = new THREE.WebGLRenderer({ 
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false
                });
                renderer.setSize(container.clientWidth, container.clientHeight);
                renderer.setClearColor(0xf0f0f0, 1);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.BasicShadowMap; // 使用基础阴影，减少纹理使用
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                
                // 检查WebGL上下文是否正常
                const webglContext = renderer.getContext();
                if (!webglContext) {
                    throw new Error('WebGL context creation failed');
                }
                
                container.appendChild(renderer.domElement);
                rendererRef.current = renderer;
                
                // 检查WebGL纹理限制
                const maxTextureUnits = webglContext.getParameter(webglContext.MAX_TEXTURE_IMAGE_UNITS);
                console.log(`WebGL Max Texture Units: ${maxTextureUnits}`);
                console.log('Reduced shadow-casting lights to stay within texture limits');

                // 创建第一人称控制器
                const controls = new PointerLockControls(camera, renderer.domElement);
                scene.add(controls.getObject());
                controlsRef.current = controls;

                // 控制器事件
                controls.addEventListener('lock', () => {
                    setIsPointerLocked(true);
                });
                controls.addEventListener('unlock', () => {
                    setIsPointerLocked(false);
                });

                // 设置基础环境光照（简化版本，因为主要照明由画作射灯提供）
                const setupBasicLighting = (scene) => {
                    // 柔和的环境光 - 提供基础照明
                    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
                    scene.add(ambientLight);
                    
                    // 顶部主光源 - 提供整体照明
                    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
                    mainLight.position.set(0, 10, 5);
                    mainLight.castShadow = true;
                    mainLight.shadow.mapSize.width = 2048;
                    mainLight.shadow.mapSize.height = 2048;
                    mainLight.shadow.camera.near = 0.5;
                    mainLight.shadow.camera.far = 20;
                    mainLight.shadow.camera.left = -20;
                    mainLight.shadow.camera.right = 20;
                    mainLight.shadow.camera.top = 20;
                    mainLight.shadow.camera.bottom = -20;
                    scene.add(mainLight);
                    
                    console.log('✨ Set up basic lighting system - paintings will have individual spotlights');
                    
                    return [ambientLight, mainLight];
                };

                // 获取图片的原始尺寸 - 用于动态调整画框
                const getImageDimensions = (imagePath) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => {
                            resolve({ width: img.width, height: img.height });
                        };
                        img.onerror = () => {
                            console.warn(`Failed to load image: ${imagePath}, using default dimensions`);
                            resolve({ width: 800, height: 600 }); // 默认尺寸
                        };
                        img.src = imagePath;
                    });
                };

                // 添加艺术装饰元素
                const addArtisticElements = (scene) => {
                    // 透明反射球装置 - 现代艺术中心装置
                    const createCenterPiece = () => {
                        const group = new THREE.Group();
                        
                        // 创建高反射透明球体
                        const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
                        const sphereMaterial = new THREE.MeshPhysicalMaterial({
                            color: 0xffffff,
                            metalness: 0.1,
                            roughness: 0.05,
                            transmission: 0.8,        // 高透明度
                            thickness: 0.5,           // 材质厚度
                            ior: 1.4,                 // 折射率 
                            reflectivity: 0.9,        // 反射率
                            clearcoat: 1.0,           // 透明涂层
                            clearcoatRoughness: 0.1,   // 涂层粗糙度
                        });
                        
                        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                        sphere.position.y = -0.3;
                        
                        // 给球添加缓慢旋转和浮动动画
                        const floatSphere = (time) => {
                            sphere.rotation.y = time * 0.001;
                            sphere.rotation.x = Math.sin(time * 0.002) * 0.1;
                            sphere.position.y = -0.3 + Math.sin(time * 0.003) * 0.1;
                        };
                        
                        sphere.castShadow = true;
                        sphere.receiveShadow = true;
                        group.add(sphere);
                        
                        // 底座 - 简洁的现代底座
                        const baseGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.15, 16);
                        const baseMaterial = new THREE.MeshLambertMaterial({ 
                            color: 0x333333 
                        });
                        const base = new THREE.Mesh(baseGeometry, baseMaterial);
                        base.position.y = -0.9;
                        base.castShadow = true;
                        base.receiveShadow = true;
                        group.add(base);
                        
                        group.userData = { animate: floatSphere };
                        
                        group.position.set(0, 1.6, 0); // 画廊中心，视线高度
                        scene.add(group);
                        
                        console.log('✨ Added transparent reflective sphere centerpiece');
                        return group;
                    };
                    
                    // 角落装饰 - 现代极简主义立柱
                    const createCornerPillars = () => {
                        const positions = [
                            { x: -13, z: -13 },  // 后左角
                            { x: 13, z: -13 },   // 后右角
                            { x: -13, z: 13 },   // 前左角
                            { x: 13, z: 13 }     // 前右角
                        ];
                        
                        positions.forEach(pos => {
                            const pillarGeometry = new THREE.CylinderGeometry(0.15, 0.2, 4, 8);
                            const pillarMaterial = new THREE.MeshLambertMaterial({ 
                                color: 0x888888,
                                transparent: true,
                                opacity: 0.7
                            });
                            const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
                            pillar.position.set(pos.x, 1, pos.z);
                            pillar.castShadow = true;
                            pillar.receiveShadow = true;
                            scene.add(pillar);
                            
                            // 添加顶部装饰光源
                            const topLight = new THREE.PointLight(0x4a90e2, 0.5, 5);
                            topLight.position.set(pos.x, 4, pos.z);
                            scene.add(topLight);
                        });
                        
                        console.log('🏛️ Added corner decorative pillars');
                    };
                    
                    const centerPiece = createCenterPiece();
                    createCornerPillars();
                    
                    return centerPiece;
                };

                // 创建简化的"王"字形天花板灯光系统
                const createWangCharacterLights = () => {
                    const characterLights = [];
                    
                    console.log('🏮 开始创建标准"王"字灯光系统...');
                    console.log('📏 王字结构: 第一横(6米) < 第二横(5米) < 第三横最长(7米), 竖线不出头, 整体修长1.5倍');
                    
                    // "王"字的正确结构：三条横线 + 一条竖线（竖线不出头，整体修长）
                    const wangLines = [
                        // 第一横（6米）
                        { start: { x: -3, z: -2.25 }, end: { x: 3, z: -2.25 }, name: '王-上横' },
                        // 第二横（5米，比第一横短一点） 
                        { start: { x: -2.5, z: 0 }, end: { x: 2.5, z: 0 }, name: '王-中横' },
                        // 第三横（7米，最长）
                        { start: { x: -3.5, z: 2.25 }, end: { x: 3.5, z: 2.25 }, name: '王-下横' },
                        // 竖线（只连接三条横线，不出头，修长1.5倍）
                        { start: { x: 0, z: -2.25 }, end: { x: 0, z: 2.25 }, name: '王-竖线' }
                    ];

                    wangLines.forEach((line) => {
                        const length = Math.sqrt(
                            Math.pow(line.end.x - line.start.x, 2) + 
                            Math.pow(line.end.z - line.start.z, 2)
                        );
                        
                        console.log(`创建${line.name}: 长度=${length.toFixed(2)}`);
                        
                        // 根据线条类型创建不同的几何体
                        let tubeGeometry;
                        if (line.name.includes('竖')) {
                            // 竖线
                            tubeGeometry = new THREE.BoxGeometry(0.4, 0.2, length);
                        } else {
                            // 横线
                            tubeGeometry = new THREE.BoxGeometry(length, 0.2, 0.4);
                        }
                        
                        // 更明显的发光材质 - 加强发光效果
                        const tubeMaterial = new THREE.MeshBasicMaterial({ 
                            color: 0xffff00,        // 明亮的黄色
                            emissive: 0xffffff,     // 白色强烈发光
                            transparent: false
                        });
                        
                        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                        
                        const centerX = (line.start.x + line.end.x) / 2;
                        const centerZ = (line.start.z + line.end.z) / 2;
                        // 降低高度，让用户更容易看到
                        tube.position.set(centerX, 6, centerZ);
                        
                        console.log(`${line.name} 位置: (${centerX}, 6, ${centerZ})`);
                        
                        scene.add(tube);
                        
                        // 添加更强的点光源
                        const pointLight = new THREE.PointLight(0xffd700, 3.0, 15);
                        pointLight.position.set(centerX, 5.5, centerZ);
                        scene.add(pointLight);
                        
                        characterLights.push({ tube, name: line.name });
                    });
                    
                    console.log(`✨ "王"字灯光系统创建完成! 共 ${characterLights.length} 个灯管`);
                    return characterLights;
                };

                // 设置基础画廊灯光
                setupBasicLighting(scene);

                // 添加艺术装饰元素
                addArtisticElements(scene);

                // 创建"王"字形天花板灯管系统
                const nameCharacterLights = createWangCharacterLights();
                console.log(`✨ Created "王" character lighting - illuminating the world! ${nameCharacterLights.length} light tubes`);

                // 创建射灯增强函数（为每个画作添加聚光灯）
                const createSpotlightForPainting = (painting, paintingMesh) => {
                    // 根据墙面位置计算射灯角度和位置
                    const position = paintingMesh.position;
                    const isBackWall = position.z < -8;
                    const isFrontWall = position.z > 8;
                    const isLeftWall = position.x < -8;
                    const isRightWall = position.x > 8;

                    // 计算射灯位置（距离画作2米，高度6米）
                    let lightPosition = new THREE.Vector3();
                    let targetPosition = new THREE.Vector3(position.x, position.y, position.z);

                    if (isBackWall) {
                        lightPosition.set(position.x, 6, position.z + 2);
                    } else if (isFrontWall) {
                        lightPosition.set(position.x, 6, position.z - 2);
                    } else if (isLeftWall) {
                        lightPosition.set(position.x + 2, 6, position.z);
                    } else if (isRightWall) {
                        lightPosition.set(position.x - 2, 6, position.z);
                    }

                    // 创建聚光灯
                    const spotlight = new THREE.SpotLight(0xffffff, 3, 15, Math.PI / 6, 0.5, 2);
                    spotlight.position.copy(lightPosition);
                    spotlight.target = paintingMesh;
                    spotlight.castShadow = true;
                    spotlight.shadow.mapSize.width = 1024;
                    spotlight.shadow.mapSize.height = 1024;
                    
                    scene.add(spotlight);
                    scene.add(spotlight.target);

                    console.log(`💡 Added spotlight for "${painting.title}" at (${lightPosition.x.toFixed(1)}, ${lightPosition.y.toFixed(1)}, ${lightPosition.z.toFixed(1)})`);
                    return spotlight;
                };

                // 创建简单的房间
                createSimpleRoom(scene);

                // 添加测试画作 
                addTestPaintings(scene);

                // 渲染循环
                const animate = () => {
                    animationFrameRef.current = requestAnimationFrame(animate);
                    
                    const delta = clockRef.current.getDelta();
                    
                    // 如果指针已锁定，处理移动
                    if (controls.isLocked) {
                        updateMovement(delta, controls);
                    }
                    
                    renderer.render(scene, camera);
                };

                animate();
                setIsLoading(false);

                console.log('Three.js scene initialized successfully');
                
            } catch (error) {
                console.error('Failed to initialize Three.js scene:', error);
                setIsLoading(false);
            }
        };

        initScene();

        // 清理函数
        return () => {
            console.log('🧹 Cleaning up Gallery Three.js resources...');
            
            // 取消动画循环
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            
            // 清理控制器
            if (controlsRef.current) {
                controlsRef.current.dispose();
                controlsRef.current = null;
            }
            
            // 清理场景中的所有资源
            if (sceneRef.current) {
                // 遍历场景中的所有对象并清理
                sceneRef.current.traverse((object) => {
                    if (object.geometry) {
                        object.geometry.dispose();
                    }
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => {
                                if (material.map) material.map.dispose();
                                if (material.normalMap) material.normalMap.dispose();
                                if (material.roughnessMap) material.roughnessMap.dispose();
                                material.dispose();
                            });
                        } else {
                            if (object.material.map) object.material.map.dispose();
                            if (object.material.normalMap) object.material.normalMap.dispose();
                            if (object.material.roughnessMap) object.material.roughnessMap.dispose();
                            object.material.dispose();
                        }
                    }
                });
                sceneRef.current.clear();
                sceneRef.current = null;
            }
            
            // 清理渲染器
            if (rendererRef.current) {
                if (container && container.contains(rendererRef.current.domElement)) {
                    container.removeChild(rendererRef.current.domElement);
                }
                rendererRef.current.dispose();
                rendererRef.current = null;
            }
            
            // 清理摄像机引用
            cameraRef.current = null;
            
            // 清理墙体引用
            wallsRef.current = null;
            
            console.log('✅ Gallery Three.js resources cleaned up successfully');
        };
    }, [galleryData]);

    // 按键监听 
    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.code === 'KeyW' ? 'w' :
                       event.code === 'KeyA' ? 'a' :
                       event.code === 'KeyS' ? 's' :
                       event.code === 'KeyD' ? 'd' :
                       event.key.toLowerCase();
                       
            if (key in keysPressed.current) {
                keysPressed.current[key] = true;
            }
            
            // ESC 键解锁指针
            if (event.key === 'Escape' && controlsRef.current?.isLocked) {
                controlsRef.current.unlock();
            }
        };

        const handleKeyUp = (event) => {
            const key = event.code === 'KeyW' ? 'w' :
                       event.code === 'KeyA' ? 'a' :
                       event.code === 'KeyS' ? 's' :
                       event.code === 'KeyD' ? 'd' :
                       event.key;
                       
            if (key in keysPressed.current) {
                keysPressed.current[key] = false;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []); // galleryData 是来自store的，不需要包含函数依赖

    return (
        <section 
            id="gallery" 
            className="min-h-screen flex flex-col justify-center items-center bg-gray-100 relative overflow-hidden"
        >
            {/* 3D画廊容器 */}
            <div 
                ref={containerRef}
                className="w-full h-screen relative bg-gray-200"
                style={{ minHeight: '100vh' }}
            >
                {/* 临时内容 - 只在没有3D场景时显示 */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                {language === 'en' ? '3D Art Gallery' : '3D 艺术馆'}
                            </h2>
                            <p className="text-gray-600">
                                {language === 'en' ? 'Gallery data loaded:' : '画廊数据已加载:'} {galleryData?.length || 0} {language === 'en' ? 'items' : '项'}
                            </p>
                            <div className="mt-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 第一人称控制提示 */}
                {!isLoading && !isPointerLocked && (
                    <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white z-20 max-w-sm">
                        <p className="text-lg font-medium mb-2">
                            {language === 'en' ? '🎨 3D Art Gallery' : '🎨 3D 艺术馆'}
                        </p>
                        <div className="space-y-1 text-sm">
                            <p>
                                {language === 'en' ? '• Click to start exploring' : '• 点击开始探索'}
                            </p>
                            <p>
                                {language === 'en' ? '• WASD / Arrow keys to move' : '• WASD / 方向键移动'}
                            </p>
                            <p>
                                {language === 'en' ? '• Mouse to look around' : '• 鼠标环视'}
                            </p>
                            <p>
                                {language === 'en' ? '• ESC to unlock cursor' : '• ESC 解锁光标'}
                            </p>
                        </div>
                    </div>
                )}

                {/* 点击开始探索 */}
                {!isLoading && !isPointerLocked && (
                    <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                        onClick={() => controlsRef.current?.lock()}
                    >
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                            <div className="text-6xl mb-4">🎨</div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                {language === 'en' ? '3D Art Gallery' : '3D 艺术馆'}
                            </h2>
                            <p className="text-white/80 mb-6">
                                {language === 'en' ? 'Click to start exploring' : '点击开始探索'}
                            </p>
                            <div className="animate-bounce">
                                <svg className="w-8 h-8 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}

                {/* 第一人称模式时的准星 */}
                {isPointerLocked && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="w-1 h-1 bg-white rounded-full shadow-lg"></div>
                        <div className="absolute w-4 h-0.5 bg-white/50 rounded"></div>
                        <div className="absolute w-0.5 h-4 bg-white/50 rounded"></div>
                    </div>
                )}
            </div>
        </section>
    );
};

GallerySection.propTypes = {
    language: PropTypes.string
};

export default GallerySection;
