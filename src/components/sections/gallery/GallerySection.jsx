import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { useAppStore } from '../../../store/useAppStore';
import CircularLoadingIndicator from '../../ui/CircularLoadingIndicator';

const GallerySection = ({ language = 'en' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPointerLocked, setIsPointerLocked] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState({ loaded: 0, total: 0 });
    const [isResourcesLoaded, setIsResourcesLoaded] = useState(false);
    const [isIntroAnimationComplete, setIsIntroAnimationComplete] = useState(false);
    const [showUICards, setShowUICards] = useState(false); // 控制UI卡片显示时机
    
    // 获取 gallery 数据和文本
    const galleryData = useAppStore(state => state.getAllGalleryItems());
    const texts = useAppStore(state => state.texts);
    
    // Three.js 引用
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationFrameRef = useRef(null);
    const clockRef = useRef(new THREE.Clock());
    const wallsRef = useRef(null); // 用于碰撞检测
    
    // 动画控制引用
    const introAnimationRef = useRef(null);
    const loadingManagerRef = useRef(null);

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

            // 地板 - 现代美术馆高级反光地板（优化性能）
            const floorWidth = 32;  // 左右宽度32米
            const floorDepth = 64;  // 前后深度64米
            const floorGeometry = new THREE.PlaneGeometry(floorWidth, floorDepth);
            const floorMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x1a1a1a, // 深色现代地板
                metalness: 0.3,        // 适度金属质感
                roughness: 0.02,       // 极低粗糙度，强反光
                envMapIntensity: 1.5   // 增强环境映射，更好反射天花板灯光
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.position.y = -2;
            floor.receiveShadow = true;
            scene.add(floor);

            // 天花板 - 现代美术馆天花板（黑色无反光）
            const ceiling = new THREE.Mesh(
                new THREE.PlaneGeometry(floorWidth, floorDepth),
                new THREE.MeshLambertMaterial({ 
                    color: 0x0a0a0a, // 深黑色天花板
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
            const frontBackWallWidth = 32;  // 前后墙宽度32米
            const leftRightWallWidth = 64;  // 左右墙宽度64米
            const wallHeight = 12;
            const wallThickness = 0.5;

            // 后墙（北）- 32米宽
            const backWall = new THREE.Mesh(
                new THREE.BoxGeometry(frontBackWallWidth, wallHeight, wallThickness),
                wallMaterial
            );
            backWall.position.set(0, 3, -32); // 位置调整到-32 (64/2)
            backWall.receiveShadow = true;
            backWall.castShadow = false;
            wallGroup.add(backWall);
            scene.add(backWall);

            // 前墙（南）- 留个缺口作为入口，32米宽
            const frontWallLeft = new THREE.Mesh(
                new THREE.BoxGeometry(10, wallHeight, wallThickness), // 左段10米
                wallMaterial
            );
            frontWallLeft.position.set(-11, 3, 32); // 左段位置调整
            frontWallLeft.receiveShadow = true;
            frontWallLeft.castShadow = false;
            wallGroup.add(frontWallLeft);
            scene.add(frontWallLeft);

            const frontWallRight = new THREE.Mesh(
                new THREE.BoxGeometry(10, wallHeight, wallThickness), // 右段10米
                wallMaterial
            );
            frontWallRight.position.set(11, 3, 32); // 右段位置调整
            frontWallRight.receiveShadow = true;
            frontWallRight.castShadow = false;
            wallGroup.add(frontWallRight);
            scene.add(frontWallRight);

            // 左墙（西）- 64米深
            const leftWall = new THREE.Mesh(
                new THREE.BoxGeometry(wallThickness, wallHeight, leftRightWallWidth),
                wallMaterial
            );
            leftWall.position.set(-16, 3, 0); // 位置调整到-16 (32/2)
            leftWall.receiveShadow = true;
            leftWall.castShadow = false;
            wallGroup.add(leftWall);
            scene.add(leftWall);

            // 右墙（东）- 64米深
            const rightWall = new THREE.Mesh(
                new THREE.BoxGeometry(wallThickness, wallHeight, leftRightWallWidth),
                wallMaterial
            );
            rightWall.position.set(16, 3, 0); // 位置调整到16 (32/2)
            rightWall.receiveShadow = true;
            rightWall.castShadow = false;
            wallGroup.add(rightWall);
            scene.add(rightWall);
        };

        // 添加测试画作
        const addTestPaintings = (scene, loadingManager = null) => {
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

            // 增加画作数量，最多20幅
            const maxPaintings = Math.min(galleryData.length, 20);
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
                    backWall: [], // 后墙 (32米宽，放3幅竖版)
                    rightWall: [], // 右墙 (64米深，放5幅横版)
                    leftWall: [], // 左墙 (64米深，放5幅横版)
                    frontWall: [] // 前墙 (32米宽，放2幅竖版)
                };

                const portraitImages = imageAnalysis.filter(img => img.isPortrait);
                const landscapeImages = imageAnalysis.filter(img => img.isLandscape);
                const squareImages = imageAnalysis.filter(img => img.isSquare);

                console.log(`📊 图片类型统计: 竖版${portraitImages.length}张, 横版${landscapeImages.length}张, 方形${squareImages.length}张`);

                // 32米窄墙优先分配竖版图片
                // 后墙分配3幅竖版
                portraitImages.slice(0, 3).forEach(img => wallAssignments.backWall.push(img));
                // 前墙分配2幅竖版
                portraitImages.slice(3, 5).forEach(img => wallAssignments.frontWall.push(img));

                // 如果竖版图片不够，用方形图片补充32米墙面
                const backWallRemaining = 3 - wallAssignments.backWall.length;
                if (backWallRemaining > 0) {
                    squareImages.slice(0, backWallRemaining).forEach(img => wallAssignments.backWall.push(img));
                }
                
                const frontWallRemaining = 2 - wallAssignments.frontWall.length;
                if (frontWallRemaining > 0) {
                    const usedSquares = wallAssignments.backWall.filter(img => img.isSquare).length;
                    squareImages.slice(usedSquares, usedSquares + frontWallRemaining).forEach(img => wallAssignments.frontWall.push(img));
                }

                // 64米长墙分配横版图片（每边5幅）
                // 右墙分配5幅横版
                landscapeImages.slice(0, 5).forEach(img => wallAssignments.rightWall.push(img));
                // 左墙分配5幅横版
                landscapeImages.slice(5, 10).forEach(img => wallAssignments.leftWall.push(img));

                // 如果横版图片不够，用剩余的方形或竖版图片补充长墙
                const rightWallRemaining = 5 - wallAssignments.rightWall.length;
                const leftWallRemaining = 5 - wallAssignments.leftWall.length;
                
                // 收集剩余图片
                const usedImages = [
                    ...wallAssignments.backWall,
                    ...wallAssignments.frontWall,
                    ...wallAssignments.rightWall,
                    ...wallAssignments.leftWall
                ];
                const remainingImages = imageAnalysis.filter(img => 
                    !usedImages.some(used => used.index === img.index)
                );

                // 补充右墙
                if (rightWallRemaining > 0) {
                    remainingImages.slice(0, rightWallRemaining).forEach(img => wallAssignments.rightWall.push(img));
                }

                // 补充左墙
                if (leftWallRemaining > 0) {
                    remainingImages.slice(rightWallRemaining, rightWallRemaining + leftWallRemaining).forEach(img => wallAssignments.leftWall.push(img));
                }

                console.log('🎨 智能分配结果:', {
                    '后墙(32m,竖版)': wallAssignments.backWall.length,
                    '前墙(32m,竖版)': wallAssignments.frontWall.length,
                    '右墙(64m,横版)': wallAssignments.rightWall.length,
                    '左墙(64m,横版)': wallAssignments.leftWall.length
                });

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

                // 创建共享的纹理加载器，使用全局加载管理器
                const textureLoader = new THREE.TextureLoader(loadingManager || undefined);
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
                    // 使用高质量材质，确保画作清晰明亮
                    const paintingMaterial = new THREE.MeshPhysicalMaterial({
                        color: 0xffffff,     // 纯白色基础
                        metalness: 0.0,      // 无金属质感
                        roughness: 0.1,      // 低粗糙度，类似画布质感
                        clearcoat: 0.2,      // 轻微清漆效果，模拟画作保护层
                        clearcoatRoughness: 0.05,
                        side: THREE.DoubleSide
                    });
                    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
                    
                    // 创建画框
                    const paintingWithFrame = createPaintingFrame(painting, paintingWidth, paintingHeight);
                    
                    // 设置位置（更新为新分配方案）
                    const backWallOffset = 31.5;   // 后墙偏移量
                    const frontWallOffset = 31.5;  // 前墙偏移量
                    const leftWallOffset = 15.5;   // 左墙偏移量
                    const rightWallOffset = 15.5;  // 右墙偏移量
                    
                    switch(wallType) {
                        case 'backWall':
                            // 后墙：在32米宽的墙面上分布3幅竖版画
                            paintingWithFrame.position.set(-12 + positionIndex * 12, paintingCenterHeight, -backWallOffset);
                            paintingWithFrame.rotation.y = 0;
                            break;
                        case 'rightWall':
                            // 右墙：在64米深的墙面上分布5幅横版画
                            paintingWithFrame.position.set(rightWallOffset, paintingCenterHeight, -24 + positionIndex * 12);
                            paintingWithFrame.rotation.y = -Math.PI / 2;
                            break;
                        case 'leftWall':
                            // 左墙：在64米深的墙面上分布5幅横版画
                            paintingWithFrame.position.set(-leftWallOffset, paintingCenterHeight, 24 - positionIndex * 12);
                            paintingWithFrame.rotation.y = Math.PI / 2;
                            break;
                        case 'frontWall':
                            // 前墙：在两侧墙段上分布2幅竖版画，远离中央灯箱
                            if (positionIndex === 0) {
                                paintingWithFrame.position.set(-12, paintingCenterHeight, frontWallOffset); // 向左移动到-12
                            } else {
                                paintingWithFrame.position.set(12, paintingCenterHeight, frontWallOffset);  // 向右移动到12
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

            // 优化射灯系统，平衡质量与性能
            const createPaintingSpotlight = (paintingMesh) => {
                const spotLight = new THREE.SpotLight(0xffffff, 3.5, 15, Math.PI / 7, 0.2, 1.0); // 略微降低亮度但保持清晰
                const position = paintingMesh.position;
                const rotation = paintingMesh.rotation;
                
                // 根据画作朝向计算射灯位置
                let lightPos = new THREE.Vector3();
                const lightHeight = 7.0;
                const offset = 1.8;
                
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
                spotLight.castShadow = false; // 关闭阴影以节省GPU资源
                
                scene.add(spotLight);
                scene.add(spotLight.target);
                
                // 移除额外的填充光，减少光源数量提升性能
                
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

        // 简单的边界碰撞检测（更新为新房间尺寸）
        const checkCollision = (camera) => {
            const position = camera.position;
            const boundaryX = 14.5; // 左右边界 (32/2 - 1.5米安全距离)
            const boundaryZ = 30.5; // 前后边界 (64/2 - 1.5米安全距离)
            
            // 检查是否撞到墙边界
            if (position.x > boundaryX || position.x < -boundaryX ||
                position.z > boundaryZ || position.z < -boundaryZ) {
                return true;
            }
            
            return false;
        };
        
        // 摄像机开场动画 - 电影级的引导式动画
        const startIntroAnimation = () => {
            const camera = cameraRef.current;
            if (!camera) return;
            
            console.log('🎬 开始摄像机开场动画...');
            
            // 动画阶段定义
            const phases = {
                // 第一阶段：从墙边开始，向上看天花板的王字灯光
                phase1: {
                    duration: 2500,
                    startPos: { x: 0, y: 1.6, z: 15 },  // 从后墙边开始
                    endPos: { x: 0, y: 1.6, z: 12 },    // 稍微向前移动
                    startLookAt: { x: 0, y: 8, z: 0 },  // 向上看天花板（12点钟方向）
                    endLookAt: { x: 0, y: 8, z: 0 }     // 保持向上看
                },
                // 第二阶段：继续向前走，视角开始下降
                phase2: {
                    duration: 3000,
                    startPos: { x: 0, y: 1.6, z: 12 },  // 从第一阶段结束位置开始
                    endPos: { x: 0, y: 1.6, z: 5 },     // 向画廊中心移动
                    startLookAt: { x: 0, y: 8, z: 0 },  // 从向上看开始
                    endLookAt: { x: 0, y: 4, z: 0 }     // 视角开始下降
                },
                // 第三阶段：到达中心位置，视角降到水平
                phase3: {
                    duration: 2000,
                    startPos: { x: 0, y: 1.6, z: 5 },   // 从第二阶段结束位置
                    endPos: { x: 0, y: 1.6, z: 0 },     // 画廊中心位置
                    startLookAt: { x: 0, y: 4, z: 0 },  // 从45度角开始
                    endLookAt: { x: 0, y: 1.6, z: -1 }  // 最终水平向前看
                }
            };
            
            // 设置初始位置和朝向
            camera.position.set(phases.phase1.startPos.x, phases.phase1.startPos.y, phases.phase1.startPos.z);
            camera.lookAt(phases.phase1.startLookAt.x, phases.phase1.startLookAt.y, phases.phase1.startLookAt.z);
            
            let currentPhase = 1;
            let phaseStartTime = Date.now();
            
            const executePhase = (phaseConfig, phaseNumber) => {
                const elapsed = Date.now() - phaseStartTime;
                const progress = Math.min(elapsed / phaseConfig.duration, 1);
                
                // 使用平滑的缓动函数
                const easeInOutCubic = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                // 插值位置
                camera.position.x = phaseConfig.startPos.x + (phaseConfig.endPos.x - phaseConfig.startPos.x) * easeInOutCubic;
                camera.position.y = phaseConfig.startPos.y + (phaseConfig.endPos.y - phaseConfig.startPos.y) * easeInOutCubic;
                camera.position.z = phaseConfig.startPos.z + (phaseConfig.endPos.z - phaseConfig.startPos.z) * easeInOutCubic;
                
                // 插值朝向（关键：实现从向上看到水平看的平滑过渡）
                const currentLookAt = {
                    x: phaseConfig.startLookAt.x + (phaseConfig.endLookAt.x - phaseConfig.startLookAt.x) * easeInOutCubic,
                    y: phaseConfig.startLookAt.y + (phaseConfig.endLookAt.y - phaseConfig.startLookAt.y) * easeInOutCubic,
                    z: phaseConfig.startLookAt.z + (phaseConfig.endLookAt.z - phaseConfig.startLookAt.z) * easeInOutCubic
                };
                
                camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
                
                // 调试信息
                if (Math.floor(elapsed / 100) !== Math.floor((elapsed - 16) / 100)) {
                    console.log(`🎥 Phase ${phaseNumber}: ${Math.round(progress * 100)}% - Pos(${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)}) LookY: ${currentLookAt.y.toFixed(1)}`);
                }
                
                return progress >= 1;
            };
            
            const animateCamera = () => {
                let phaseComplete = false;
                
                switch(currentPhase) {
                    case 1:
                        phaseComplete = executePhase(phases.phase1, 1);
                        if (phaseComplete) {
                            console.log('✨ Phase 1 完成：观察天花板王字');
                            currentPhase = 2;
                            phaseStartTime = Date.now();
                        }
                        break;
                    case 2:
                        phaseComplete = executePhase(phases.phase2, 2);
                        if (phaseComplete) {
                            console.log('🚶‍♂️ Phase 2 完成：向前移动，视角下降');
                            currentPhase = 3;
                            phaseStartTime = Date.now();
                        }
                        break;
                    case 3:
                        phaseComplete = executePhase(phases.phase3, 3);
                        if (phaseComplete) {
                            console.log('🎉 开场动画完成，启用用户控制');
                            console.log('⏳ UI卡片将在2秒后显示...');
                            setIsIntroAnimationComplete(true);
                            setIsLoading(false);
                            
                            // 延迟显示UI卡片，让用户先欣赏一下场景
                            setTimeout(() => {
                                console.log('✨ 显示UI卡片 - 用户现在可以看到操作提示');
                                setShowUICards(true);
                            }, 3000); // 3秒后显示UI卡片，给用户更多时间欣赏场景
                            
                            // 重新设置控制器并恢复正常功能
                            if (controlsRef.current) {
                                controlsRef.current.getObject().position.copy(camera.position);
                                // 恢复控制器的连接功能
                                controlsRef.current.connect = controlsRef.current.connect.__original || controlsRef.current.connect;
                            }
                            return; // 结束动画
                        }
                        break;
                }
                
                introAnimationRef.current = requestAnimationFrame(animateCamera);
            };
            
            // 开始动画
            animateCamera();
        };
        
        // 初始化Three.js场景
        const initScene = () => {
            try {
                // 创建资源加载管理器
                const loadingManager = new THREE.LoadingManager();
                loadingManagerRef.current = loadingManager;
                
                // 设置加载管理器回调
                loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
                    console.log(`🚀 开始加载资源: ${url} (${itemsLoaded}/${itemsTotal})`);
                    setLoadingProgress({ loaded: itemsLoaded, total: itemsTotal });
                };
                
                loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
                    console.log(`📦 加载进度: ${url} (${itemsLoaded}/${itemsTotal})`);
                    setLoadingProgress({ loaded: itemsLoaded, total: itemsTotal });
                };
                
                loadingManager.onLoad = () => {
                    console.log('✅ 所有资源加载完成！开始GPU准备...');
                    setIsResourcesLoaded(true);
                    
                    // 等待下一帧，确保所有资源都已经准备好
                    requestAnimationFrame(() => {
                        // 强制渲染一帧，让GPU编译所有着色器和上传纹理
                        if (rendererRef.current && sceneRef.current && cameraRef.current) {
                            console.log('🎮 执行GPU预热渲染...');
                            rendererRef.current.render(sceneRef.current, cameraRef.current);
                            
                            // 再等待一帧确保GPU处理完成
                            requestAnimationFrame(() => {
                                console.log('🚀 GPU准备完成，开始摄像机动画');
                                setTimeout(() => {
                                    startIntroAnimation();
                                }, 300); // 稍微延迟让用户看到100%完成状态
                            });
                        } else {
                            setTimeout(() => {
                                startIntroAnimation();
                            }, 500);
                        }
                    });
                };
                
                loadingManager.onError = (url) => {
                    console.error('❌ 资源加载失败:', url);
                };
                
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
                camera.position.set(0, 1.6, 0); // 移动到房间中央，视线高度1.6米
                cameraRef.current = camera;

                // 创建平衡性能与质量的渲染器
                const renderer = new THREE.WebGLRenderer({ 
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false
                });
                renderer.setSize(container.clientWidth, container.clientHeight);
                renderer.setClearColor(0xf0f0f0, 1);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFShadowMap; // 平衡质量和性能
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                // 移除可能导致卡顿的高级设置
                // renderer.physicallyCorrectLights = true; // 注释掉，减少计算负担
                renderer.toneMapping = THREE.ReinhardToneMapping; // 更轻量的色调映射
                renderer.toneMappingExposure = 1.0;
                
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
                
                // 禁用控制器的默认点击事件，等待动画完成后再启用
                const originalConnect = controls.connect;
                controls.connect.__original = originalConnect; // 保存原始方法
                controls.connect = () => {
                    if (isIntroAnimationComplete) {
                        originalConnect.call(controls);
                    }
                };

                // 设置平衡性能的美术馆光照系统
                const setupBasicLighting = (scene) => {
                    // 适度的环境光
                    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
                    scene.add(ambientLight);
                    
                    // 主光源 - 适度亮度
                    const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
                    mainLight.position.set(0, 12, 5);
                    mainLight.castShadow = true;
                    mainLight.shadow.mapSize.width = 1024; // 降低阴影分辨率提升性能
                    mainLight.shadow.mapSize.height = 1024;
                    mainLight.shadow.camera.near = 0.5;
                    mainLight.shadow.camera.far = 25;
                    mainLight.shadow.camera.left = -25;
                    mainLight.shadow.camera.right = 25;
                    mainLight.shadow.camera.top = 25;
                    mainLight.shadow.camera.bottom = -25;
                    scene.add(mainLight);
                    
                    // 只保留一个补充光源，减少光源数量
                    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
                    fillLight.position.set(-10, 8, -10);
                    scene.add(fillLight);
                    
                    console.log('✨ Set up optimized gallery lighting system');
                    
                    return [ambientLight, mainLight, fillLight];
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
                    // 创建完全填充入口的墙面发光区域（灯箱）- 更新为新尺寸
                    const createWallLightBox = () => {
                        // 入口尺寸：宽12米（从x=-6到x=6），高12米（与墙体高度一致）
                        const entranceWidth = 12;  // 新的入口宽度（中间12米开口）
                        const entranceHeight = 12; // 入口高度与墙体高度一致
                        const lightBoxDepth = 0.4;  // 灯箱厚度
                        
                        // 创建填充整个入口的发光面
                        const lightBoxGeometry = new THREE.BoxGeometry(entranceWidth, entranceHeight, lightBoxDepth);
                        const lightBoxMaterial = new THREE.MeshBasicMaterial({
                            color: 0xffffff,        // 纯白色
                            emissive: 0xffffff,     // 自发光白色
                            emissiveIntensity: 1.2   // 增强发光强度
                        });
                        
                        const lightBox = new THREE.Mesh(lightBoxGeometry, lightBoxMaterial);
                        // 位置：入口中心 (x=0, y=3是墙体中心高度, z=32是前墙位置)
                        lightBox.position.set(0, 3, 32 - lightBoxDepth/2);
                        scene.add(lightBox);
                        
                        // 添加更多光源照亮整个入口区域
                        const lightSources = [
                            { pos: [0, 6, 31], intensity: 3.0 },   // 上方中心
                            { pos: [-4, 3, 31], intensity: 2.5 },  // 左侧中央
                            { pos: [4, 3, 31], intensity: 2.5 },   // 右侧中央
                            { pos: [0, 0, 31], intensity: 2.0 },   // 下方中心
                            { pos: [-2, 1, 31], intensity: 2.0 },  // 左下
                            { pos: [2, 1, 31], intensity: 2.0 }    // 右下
                        ];
                        
                        lightSources.forEach(light => {
                            const lightSource = new THREE.PointLight(0xffffff, light.intensity, 25);
                            lightSource.position.set(...light.pos);
                            scene.add(lightSource);
                        });
                        
                        console.log('💡 Added entrance-filling lightbox (12m × 12m) - updated for full wall height');
                        return lightBox;
                    };
                    
                    const wallLightBox = createWallLightBox();
                    
                    return { wallLightBox };
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
                        
                        // 白色冷光源发光材质 - 增强发光效果
                        const tubeMaterial = new THREE.MeshBasicMaterial({ 
                            color: 0xffffff,        // 纯白色
                            emissive: 0xffffff,     // 白色强烈发光
                            emissiveIntensity: 1.5, // 增强发光强度
                            transparent: false
                        });
                        
                        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                        
                        const centerX = (line.start.x + line.end.x) / 2;
                        const centerZ = (line.start.z + line.end.z) / 2;
                        // 降低高度，让用户更容易看到
                        tube.position.set(centerX, 6, centerZ);
                        
                        console.log(`${line.name} 位置: (${centerX}, 6, ${centerZ})`);
                        
                        scene.add(tube);
                        
                        // 添加更强的白色冷光源，扩大照射范围
                        const pointLight = new THREE.PointLight(0xffffff, 5.0, 40); // 增强亮度到5.0，照射范围扩大到40米
                        pointLight.position.set(centerX, 5.5, centerZ);
                        scene.add(pointLight);
                        
                        characterLights.push({ tube, name: line.name });
                    });
                    
                    console.log(`✨ "王"字白色冷光灯光系统创建完成! 共 ${characterLights.length} 个灯管`);
                    return characterLights;
                };

                // 设置基础画廊灯光
                setupBasicLighting(scene);

                // 添加艺术装饰元素
                const artisticElements = addArtisticElements(scene);

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
                addTestPaintings(scene, loadingManager);

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
    }, [galleryData, isIntroAnimationComplete]);

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
            {/* 全屏加载指示器 - 使用与HomeSection相同的CircularLoadingIndicator */}
            {(isLoading || !isIntroAnimationComplete) && (
                <CircularLoadingIndicator
                    progress={loadingProgress.total > 0 ? Math.round((loadingProgress.loaded / loadingProgress.total) * 100) : 0}
                    size={160}
                    strokeWidth={12}
                    showProgress={!isResourcesLoaded}
                    showMask={true}
                    maskColor="black-solid"
                    language={language}
                    loadingText={isResourcesLoaded ? (isIntroAnimationComplete ? "Ready!" : "Preparing Experience...") : "Loading Gallery..."}
                    loadingTextChinese={isResourcesLoaded ? (isIntroAnimationComplete ? "准备完成！" : "正在准备体验...") : "加载画廊中..."}
                />
            )}

            {/* 3D画廊容器 - 只在非加载状态时显示 */}
            <div 
                ref={containerRef}
                className={`w-full h-screen relative bg-gray-200 ${(isLoading || !isIntroAnimationComplete) ? 'invisible' : 'visible'}`}
                style={{ minHeight: '100vh' }}
            >
            </div>

            {/* 第一人称控制提示 - 只在动画完成且卡片显示时机到达后显示 */}
            {isIntroAnimationComplete && showUICards && !isPointerLocked && (
                <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white z-20 max-w-sm">
                    <p className="text-lg font-medium mb-2">
                        {texts[language].gallery.gallery3D.title}
                    </p>
                    <div className="space-y-1 text-sm">
                        <p>
                            • {texts[language].gallery.gallery3D.instructions.clickToStart}
                        </p>
                        <p>
                            • {texts[language].gallery.gallery3D.instructions.navigation.wasd}
                        </p>
                        <p>
                            • {texts[language].gallery.gallery3D.instructions.navigation.mouse}
                        </p>
                        <p>
                            • {texts[language].gallery.gallery3D.instructions.navigation.esc}
                        </p>
                    </div>
                </div>
            )}

            {/* 点击开始探索 - 只在动画完成且卡片显示时机到达后显示 */}
            {isIntroAnimationComplete && showUICards && !isPointerLocked && (
                <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                    onClick={() => controlsRef.current?.lock()}
                >
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {texts[language].gallery.gallery3D.title}
                        </h2>
                        <p className="text-white/80 mb-6">
                            {texts[language].gallery.gallery3D.instructions.clickToStart}
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
        </section>
    );
};

GallerySection.propTypes = {
    language: PropTypes.string
};

export default GallerySection;
