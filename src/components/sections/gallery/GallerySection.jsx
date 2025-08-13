import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';
import { useAppStore } from '../../../store/useAppStore';
import CircularLoadingIndicator from '../../ui/CircularLoadingIndicator';

const GallerySection = ({ language = 'en' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isIntroAnimationComplete, setIsIntroAnimationComplete] = useState(false);
    const [showUICards, setShowUICards] = useState(false);
    
    const galleryData = useAppStore(state => state.getAllGalleryItems());
    const texts = useAppStore(state => state.texts);
    const isPointerLocked = useAppStore(state => state.isPointerLocked);
    const setIsPointerLocked = useAppStore(state => state.setIsPointerLocked);
    
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationFrameRef = useRef(null);
    const clockRef = useRef(new THREE.Clock());
    const wallsRef = useRef(null);
    const spotlightsRef = useRef([]); // 存储所有画作聚光灯
    
    const introAnimationRef = useRef(null);
    const loadingManagerRef = useRef(null);

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

            // 地板 - 人字拼木地板材质（温暖明亮）
            const floorWidth = 32;  // 左右宽度32米
            const floorDepth = 64;  // 前后深度64米
            const floorGeometry = new THREE.PlaneGeometry(floorWidth, floorDepth);
            
            // 创建现代美术馆抛光混凝土地板纹理
            const createPolishedConcreteFloor = () => {
                const canvas = document.createElement('canvas');
                const canvasSize = 1024; // 提高分辨率获得更好的纹理
                canvas.width = canvasSize;
                canvas.height = canvasSize;
                const ctx = canvas.getContext('2d');

                // 基础混凝土颜色 - 浅灰色调
                const baseColor = '#e8e8e8';
                const accentColors = [
                    '#f0f0f0', // 更浅的灰
                    '#e0e0e0', // 中浅灰  
                    '#dcdcdc', // 银灰色
                    '#f5f5f5', // 烟白色
                    '#efefef', // 淡灰色
                ];

                // 填充基础颜色
                ctx.fillStyle = baseColor;
                ctx.fillRect(0, 0, canvasSize, canvasSize);

                // 添加混凝土的自然纹理和斑点
                for (let i = 0; i < 2000; i++) {
                    const x = Math.random() * canvasSize;
                    const y = Math.random() * canvasSize;
                    const size = Math.random() * 8 + 2;
                    const opacity = Math.random() * 0.3 + 0.1;
                    
                    ctx.globalAlpha = opacity;
                    ctx.fillStyle = accentColors[Math.floor(Math.random() * accentColors.length)];
                    
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }

                // 添加混凝土裂纹和纹路
                ctx.globalAlpha = 0.15;
                ctx.strokeStyle = '#d0d0d0';
                ctx.lineWidth = 1;
                
                for (let i = 0; i < 50; i++) {
                    const startX = Math.random() * canvasSize;
                    const startY = Math.random() * canvasSize;
                    const length = Math.random() * 100 + 50;
                    const angle = Math.random() * Math.PI * 2;
                    
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(
                        startX + Math.cos(angle) * length,
                        startY + Math.sin(angle) * length
                    );
                    ctx.stroke();
                }

                // 添加微妙的光泽效果
                const gradient = ctx.createRadialGradient(
                    canvasSize/2, canvasSize/2, 0,
                    canvasSize/2, canvasSize/2, canvasSize/2
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                ctx.globalAlpha = 1;
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvasSize, canvasSize);

                // 添加一些主题色的微妙点缀（非常少量）
                ctx.globalAlpha = 0.08;
                for (let i = 0; i < 20; i++) {
                    const x = Math.random() * canvasSize;
                    const y = Math.random() * canvasSize;
                    const size = Math.random() * 3 + 1;
                    
                    ctx.fillStyle = '#00ffaa';
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.globalAlpha = 1;

                const texture = new THREE.CanvasTexture(canvas);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(6, 6); // 适中的重复，让纹理看起来自然
                return texture;
            };

            const floorTexture = createPolishedConcreteFloor();
            const floorMaterial = new THREE.MeshStandardMaterial({ 
                map: floorTexture,
                color: 0xffffff,       // 白色基调，让纹理颜色更准确
                metalness: 0.1,        // 轻微金属质感
                roughness: 0.6,        // 木质应有的粗糙度
                envMapIntensity: 0.8   // 适度环境映射
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.position.y = -2;
            floor.receiveShadow = true;
            scene.add(floor);

            // 创建现代美术馆天花板纹理（格栅天花板系统）
            const createModernGalleryCeiling = () => {
                const canvas = document.createElement('canvas');
                const canvasSize = 1024;
                canvas.width = canvasSize;
                canvas.height = canvasSize;
                const ctx = canvas.getContext('2d');

                // 基础颜色 - 现代美术馆常用的哑光白色
                ctx.fillStyle = '#f8f8f8';
                ctx.fillRect(0, 0, canvasSize, canvasSize);

                // 格栅系统 - 现代美术馆标准的吊顶格栅
                const gridSize = 64; // 格栅单元大小
                const lineWidth = 2;  // 格栅线宽度

                // 绘制格栅线条
                ctx.strokeStyle = '#e0e0e0'; // 浅灰色格栅线
                ctx.lineWidth = lineWidth;

                // 垂直线
                for (let x = 0; x <= canvasSize; x += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvasSize);
                    ctx.stroke();
                }

                // 水平线
                for (let y = 0; y <= canvasSize; y += gridSize) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(canvasSize, y);
                    ctx.stroke();
                }

                // 天花板纹理完成 - 保持简洁的格栅设计
                // 注意：王字装饰灯和画作射灯保持不变

                const texture = new THREE.CanvasTexture(canvas);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(4, 4); // 重复4x4次
                return texture;
            };

            const ceilingTexture = createModernGalleryCeiling();
            
            // 天花板 - 现代美术馆格栅天花板系统
            const ceiling = new THREE.Mesh(
                new THREE.PlaneGeometry(floorWidth, floorDepth),
                new THREE.MeshLambertMaterial({ 
                    map: ceilingTexture,
                    color: 0xffffff,      // 白色基调
                    transparent: false,
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
                for (let i = 0; i < 6; i++) {
                    const paintingGeometry = new THREE.PlaneGeometry(3, 2);
                    const paintingMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
                    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
                    
                    if (i < 3) {
                        painting.position.set(-6 + i * 6, 3, -14.9);
                        painting.rotation.y = 0;
                    } else {
                        painting.position.set(-14.9, 3, -6 + (i-3) * 6);
                        painting.rotation.y = Math.PI / 2;
                    }
                    scene.add(painting);
                }
                return;
            }

            const maxPaintings = Math.min(galleryData.length, 20);
            const basePaintingHeight = 2.2;
            const maxPaintingWidth = 4;
            const paintingCenterHeight = 1.6;

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
                                isLandscape: aspectRatio > 1.3,
                                isSquare: aspectRatio >= 0.8 && aspectRatio <= 1.3
                            });
                        } catch {
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

            // 硬编码分配逻辑 - 按指定需求精确分配17张画
            const assignPaintingsToWalls = (imageAnalysis) => {
                const wallAssignments = {
                    backWall: [],   // 后墙32米：3张（优先竖图）
                    rightWall: [],  // 右墙64米：6张
                    leftWall: [],   // 左墙64米：6张  
                    frontWall: []   // 前墙入口两侧：2张竖图
                };

                // 分离竖图和其他图
                const portraitImages = imageAnalysis.filter(img => img.isPortrait);
                const otherImages = imageAnalysis.filter(img => !img.isPortrait);
                
                // 1. 后墙32米 - 优先分配3张竖图
                const backWallPortraits = portraitImages.slice(0, 3);
                wallAssignments.backWall = backWallPortraits;
                
                // 如果竖图不够3张，用其他图补充
                if (backWallPortraits.length < 3) {
                    const needed = 3 - backWallPortraits.length;
                    const supplementImages = otherImages.slice(0, needed);
                    wallAssignments.backWall.push(...supplementImages);
                    // 从其他图中移除已使用的
                    supplementImages.forEach(img => {
                        const index = otherImages.indexOf(img);
                        if (index > -1) otherImages.splice(index, 1);
                    });
                }
                
                // 2. 前墙入口两侧 - 分配2张竖图
                const frontWallPortraits = portraitImages.slice(3, 5);
                wallAssignments.frontWall = frontWallPortraits;
                
                // 如果剩余竖图不够2张，用其他图补充
                if (frontWallPortraits.length < 2) {
                    const needed = 2 - frontWallPortraits.length;
                    const supplementImages = otherImages.slice(0, needed);
                    wallAssignments.frontWall.push(...supplementImages);
                    // 从其他图中移除已使用的
                    supplementImages.forEach(img => {
                        const index = otherImages.indexOf(img);
                        if (index > -1) otherImages.splice(index, 1);
                    });
                }
                
                // 3. 收集剩余所有图片（包括未使用的竖图和其他图）
                const usedPortraits = [...backWallPortraits, ...frontWallPortraits];
                const remainingPortraits = portraitImages.filter(img => 
                    !usedPortraits.some(used => used.index === img.index)
                );
                const allRemainingImages = [...remainingPortraits, ...otherImages];
                
                // 4. 右墙64米 - 分配6张
                wallAssignments.rightWall = allRemainingImages.slice(0, 6);
                
                // 5. 左墙64米 - 分配剩余6张
                wallAssignments.leftWall = allRemainingImages.slice(6, 12);

                console.log('画作分配结果：', {
                    后墙: wallAssignments.backWall.length,
                    右墙: wallAssignments.rightWall.length,
                    左墙: wallAssignments.leftWall.length,
                    前墙: wallAssignments.frontWall.length,
                    总计: wallAssignments.backWall.length + wallAssignments.rightWall.length + 
                          wallAssignments.leftWall.length + wallAssignments.frontWall.length
                });

                return wallAssignments;
            };

            const createPaintingsAsync = async () => {
                const imageAnalysis = await analyzeImageDimensions();
                const wallAssignments = assignPaintingsToWalls(imageAnalysis);
                
                const textureLoader = new THREE.TextureLoader(loadingManager || undefined);
                const loadedTextures = new Map();

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
                    // 优化画作材质 - 保持色彩丰富度，增强照明响应
                    const paintingMaterial = new THREE.MeshPhysicalMaterial({
                        color: 0xffffff,     // 纯白色基础，不影响贴图色彩
                        metalness: 0.0,      // 无金属质感
                        roughness: 0.15,     // 稍微提高粗糙度，减少过度反光
                        clearcoat: 0.1,      // 降低清漆效果，避免泛白
                        clearcoatRoughness: 0.1,
                        reflectivity: 0.3,   // 适度反射率
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
                            // 后墙32米：3张画均匀分布 (x: -10, 0, 10)
                            paintingWithFrame.position.set(-10 + positionIndex * 10, paintingCenterHeight, -backWallOffset);
                            paintingWithFrame.rotation.y = 0;
                            break;
                        case 'rightWall':
                            // 右墙64米：6张画均匀分布 (z: -27.5到27.5，间距11米)
                            paintingWithFrame.position.set(rightWallOffset, paintingCenterHeight, -27.5 + positionIndex * 11);
                            paintingWithFrame.rotation.y = -Math.PI / 2;
                            break;
                        case 'leftWall':
                            // 左墙64米：6张画均匀分布 (z: 27.5到-27.5，间距11米)
                            paintingWithFrame.position.set(-leftWallOffset, paintingCenterHeight, 27.5 - positionIndex * 11);
                            paintingWithFrame.rotation.y = Math.PI / 2;
                            break;
                        case 'frontWall':
                            // 前墙入口两侧：左右各1张竖图 (x: -12, 12)
                            if (positionIndex === 0) {
                                paintingWithFrame.position.set(-12, paintingCenterHeight, frontWallOffset); // 左侧
                            } else {
                                paintingWithFrame.position.set(12, paintingCenterHeight, frontWallOffset);  // 右侧
                            }
                            paintingWithFrame.rotation.y = Math.PI;
                            break;
                    }
                    
                    paintingWithFrame.castShadow = false;
                    paintingWithFrame.receiveShadow = false;
                    scene.add(paintingWithFrame);
                    
                    setTimeout(() => {
                        createPaintingSpotlight(paintingWithFrame);
                    }, 100);
                    
                    const imageSrc = item.src || item.thumbnail;
                    if (!loadedTextures.has(imageSrc)) {
                        try {
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
                            
                            // 优化纹理设置 - 保证色彩保真度
                            texture.generateMipmaps = false;
                            texture.minFilter = THREE.LinearFilter;
                            texture.magFilter = THREE.LinearFilter;
                            texture.colorSpace = THREE.SRGBColorSpace; // 确保正确的色彩空间
                            
                            loadedTextures.set(imageSrc, texture);
                            painting.material.map = texture;
                            painting.material.color.setHex(0xffffff); // 保持纯白，不干扰纹理色彩
                            painting.material.needsUpdate = true;
                        } catch {
                            painting.material.color.setHex(0x666666);
                            painting.material.needsUpdate = true;
                        }
                    } else {
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

            // 智能画作聚光灯系统（优化色彩保真度和亮度感知）
            const createPaintingSpotlight = (paintingMesh) => {
                // 使用暖白色光源，保护照片色彩不被冲淡
                const spotLight = new THREE.SpotLight(0xfff8e1, 1.5, 15, Math.PI / 6, 0.15, 1.0); // 暖白色 + 降低基础亮度
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
                spotLight.castShadow = false;
                
                // 优化智能照明参数 - 显著增强变化感知度
                spotLight.userData = {
                    paintingPosition: position.clone(),
                    baseIntensity: 1.0,    // 大幅降低基础亮度
                    maxIntensity: 8.0,     // 提升最大亮度（8倍差异更明显）
                    activationDistance: 6.0, // 6米开始增强（更早感知）
                    optimalDistance: 2.0    // 2米达到最亮（更精确触发）
                };
                
                scene.add(spotLight);
                scene.add(spotLight.target);
                
                // 存储到聚光灯数组中用于距离检测
                spotlightsRef.current.push(spotLight);
                
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
            
            // 🎨 智能画作照明系统 - 根据距离调整亮度
            updateSmartLighting(camera.position);
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

        // 🎨 优化智能画作照明系统 - 增强感知度
        const updateSmartLighting = (cameraPosition) => {
            spotlightsRef.current.forEach(spotlight => {
                const data = spotlight.userData;
                if (!data || !data.paintingPosition) return;
                
                // 计算摄像机到画作的距离
                const distance = cameraPosition.distanceTo(data.paintingPosition);
                
                // 距离感应亮度调整 - 更激进的变化曲线
                let intensity = data.baseIntensity;
                
                if (distance <= data.activationDistance) {
                    // 在激活范围内，根据距离调整亮度
                    const proximityFactor = Math.max(0, (data.activationDistance - distance) / data.activationDistance);
                    const intensityRange = data.maxIntensity - data.baseIntensity;
                    
                    // 使用更激进的缓动函数，让变化更明显
                    const easedProximity = Math.pow(proximityFactor, 1.5); // 更陡峭的曲线
                    intensity = data.baseIntensity + (intensityRange * easedProximity);
                    
                    // 最接近时达到最大亮度
                    if (distance <= data.optimalDistance) {
                        intensity = data.maxIntensity;
                    }
                }
                
                // 加快亮度变化速度，让用户更容易感知
                spotlight.intensity = THREE.MathUtils.lerp(spotlight.intensity, intensity, 0.12); // 从0.05提升到0.12
            });
        };
        
        // 摄像机开场动画 - 电影级的引导式动画
        const startIntroAnimation = () => {
            const camera = cameraRef.current;
            if (!camera) return;
            
            const phases = {
                phase1: {
                    duration: 2500,
                    startPos: { x: 0, y: 1.6, z: 15 },
                    endPos: { x: 0, y: 1.6, z: 12 },
                    startLookAt: { x: 0, y: 8, z: 0 },
                    endLookAt: { x: 0, y: 8, z: 0 }
                },
                phase2: {
                    duration: 3000,
                    startPos: { x: 0, y: 1.6, z: 12 },
                    endPos: { x: 0, y: 1.6, z: 5 },
                    startLookAt: { x: 0, y: 8, z: 0 },
                    endLookAt: { x: 0, y: 4, z: 0 }
                },
                phase3: {
                    duration: 2000,
                    startPos: { x: 0, y: 1.6, z: 5 },
                    endPos: { x: 0, y: 1.6, z: 0 },
                    startLookAt: { x: 0, y: 4, z: 0 },
                    endLookAt: { x: 0, y: 1.6, z: -1 }
                }
            };
            
            camera.position.set(phases.phase1.startPos.x, phases.phase1.startPos.y, phases.phase1.startPos.z);
            camera.lookAt(phases.phase1.startLookAt.x, phases.phase1.startLookAt.y, phases.phase1.startLookAt.z);
            
            let currentPhase = 1;
            let phaseStartTime = Date.now();
            
            const executePhase = (phaseConfig) => {
                const elapsed = Date.now() - phaseStartTime;
                const progress = Math.min(elapsed / phaseConfig.duration, 1);
                
                const easeInOutCubic = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                camera.position.x = phaseConfig.startPos.x + (phaseConfig.endPos.x - phaseConfig.startPos.x) * easeInOutCubic;
                camera.position.y = phaseConfig.startPos.y + (phaseConfig.endPos.y - phaseConfig.startPos.y) * easeInOutCubic;
                camera.position.z = phaseConfig.startPos.z + (phaseConfig.endPos.z - phaseConfig.startPos.z) * easeInOutCubic;
                
                const currentLookAt = {
                    x: phaseConfig.startLookAt.x + (phaseConfig.endLookAt.x - phaseConfig.startLookAt.x) * easeInOutCubic,
                    y: phaseConfig.startLookAt.y + (phaseConfig.endLookAt.y - phaseConfig.startLookAt.y) * easeInOutCubic,
                    z: phaseConfig.startLookAt.z + (phaseConfig.endLookAt.z - phaseConfig.startLookAt.z) * easeInOutCubic
                };
                
                camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);
                
                return progress >= 1;
            };
            
            const animateCamera = () => {
                let phaseComplete = false;
                
                switch(currentPhase) {
                    case 1:
                        phaseComplete = executePhase(phases.phase1);
                        if (phaseComplete) {
                            currentPhase = 2;
                            phaseStartTime = Date.now();
                        }
                        break;
                    case 2:
                        phaseComplete = executePhase(phases.phase2);
                        if (phaseComplete) {
                            currentPhase = 3;
                            phaseStartTime = Date.now();
                        }
                        break;
                    case 3:
                        phaseComplete = executePhase(phases.phase3);
                        if (phaseComplete) {
                            setIsIntroAnimationComplete(true);
                            setIsLoading(false);
                            
                            setTimeout(() => {
                                setShowUICards(true);
                            }, 9000);
                            
                            if (controlsRef.current) {
                                controlsRef.current.getObject().position.copy(camera.position);
                                controlsRef.current.connect = controlsRef.current.connect.__original || controlsRef.current.connect;
                            }
                            return;
                        }
                        break;
                }
                
                introAnimationRef.current = requestAnimationFrame(animateCamera);
            };
            
            animateCamera();
        };
        
        // 初始化Three.js场景
        const initScene = () => {
            try {
                const loadingManager = new THREE.LoadingManager();
                loadingManagerRef.current = loadingManager;
                
                loadingManager.onLoad = () => {
                    requestAnimationFrame(() => {
                        if (rendererRef.current && sceneRef.current && cameraRef.current) {
                            rendererRef.current.render(sceneRef.current, cameraRef.current);
                            
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    startIntroAnimation();
                                }, 300);
                            });
                        } else {
                            setTimeout(() => {
                                startIntroAnimation();
                            }, 500);
                        }
                    });
                };
                
                loadingManager.onError = () => {};
                
                const scene = new THREE.Scene();
                scene.background = new THREE.Color(0x1a1a1a);
                sceneRef.current = scene;

                const camera = new THREE.PerspectiveCamera(
                    75,
                    container.clientWidth / container.clientHeight,
                    0.1,
                    1000
                );
                camera.position.set(0, 1.6, 0);
                cameraRef.current = camera;

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
                
                const webglContext = renderer.getContext();
                if (!webglContext) {
                    throw new Error('WebGL context creation failed');
                }
                
                container.appendChild(renderer.domElement);
                rendererRef.current = renderer;

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
                    // 增强环境光 - 提升美术馆整体亮度
                    const ambientLight = new THREE.AmbientLight(0x606060, 1.2); // 提升亮度和色温
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
                    
                    const fillLight = new THREE.DirectionalLight(0xffffff, 0.2);
                    fillLight.position.set(-10, 8, -10);
                    scene.add(fillLight);
                    
                    return [ambientLight, mainLight, fillLight];
                };

                const addArtisticElements = (scene) => {
                    // 创建完全填充入口的墙面发光区域（灯箱）- 更新为新尺寸
                    const createWallLightBox = () => {
                        // 入口尺寸：宽12米（从x=-6到x=6），高12米（与墙体高度一致）
                        const entranceWidth = 12;  // 新的入口宽度（中间12米开口）
                        const entranceHeight = 12; // 入口高度与墙体高度一致
                        const lightBoxDepth = 0.4;  // 灯箱厚度
                        
                        // 创建填充整个入口的发光面
                        const lightBoxGeometry = new THREE.BoxGeometry(entranceWidth, entranceHeight, lightBoxDepth);
                        const lightBoxMaterial = new THREE.MeshStandardMaterial({
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
                        
                        return lightBox;
                    };
                    
                    const wallLightBox = createWallLightBox();
                    
                    return { wallLightBox };
                };

                const createWangCharacterLights = () => {
                    const characterLights = [];
                    
                    const wangLines = [
                        { start: { x: -3, z: 2.25 }, end: { x: 3, z: 2.25 }, name: '王-上横' },
                        { start: { x: -2.5, z: 0 }, end: { x: 2.5, z: 0 }, name: '王-中横' },
                        { start: { x: -3.5, z: -2.25 }, end: { x: 3.5, z: -2.25 }, name: '王-下横' },
                        { start: { x: 0, z: 2.25 }, end: { x: 0, z: -2.25 }, name: '王-竖线' }
                    ];

                    wangLines.forEach((line) => {
                        const length = Math.sqrt(
                            Math.pow(line.end.x - line.start.x, 2) + 
                            Math.pow(line.end.z - line.start.z, 2)
                        );
                        
                        let tubeGeometry;
                        if (line.name.includes('竖')) {
                            tubeGeometry = new THREE.BoxGeometry(0.4, 0.2, length);
                        } else {
                            // 横线
                            tubeGeometry = new THREE.BoxGeometry(length, 0.2, 0.4);
                        }
                        
                        // 白色冷光源发光材质 - 增强王字灯亮度
                        const tubeMaterial = new THREE.MeshStandardMaterial({ 
                            color: 0xffffff,        // 纯白色
                            emissive: 0xffffff,     // 白色强烈发光
                            emissiveIntensity: 2.0, // 提升发光强度
                            transparent: false
                        });
                        
                        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                        
                        const centerX = (line.start.x + line.end.x) / 2;
                        const centerZ = (line.start.z + line.end.z) / 2;
                        tube.position.set(centerX, 6, centerZ);
                        
                        scene.add(tube);
                        
                        // 提升王字灯的照明强度
                        const pointLight = new THREE.PointLight(0xffffff, 7.0, 45); // 提升强度和范围
                        pointLight.position.set(centerX, 5.5, centerZ);
                        scene.add(pointLight);
                        
                        characterLights.push({ tube, name: line.name });
                    });
                    
                    return characterLights;
                };

                setupBasicLighting(scene);

                addArtisticElements(scene);

                createWangCharacterLights();

                createSimpleRoom(scene);

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
                
            } catch (error) {
                console.error('Failed to initialize Three.js scene:', error);
                setIsLoading(false);
            }
        };

        initScene();

        return () => {
            
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
            
            cameraRef.current = null;
            wallsRef.current = null;
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
            {/* 全屏加载指示器 - 使用统一的加载组件 */}
            {(isLoading || !isIntroAnimationComplete) && (
                <CircularLoadingIndicator
                    size={160}
                    strokeWidth={12}
                    showMask={true}
                    maskColor="black-solid"
                />
            )}

            {/* 3D画廊容器 - 只在非加载状态时显示 */}
            <div 
                ref={containerRef}
                className={`w-full h-screen relative bg-gray-200 ${(isLoading || !isIntroAnimationComplete) ? 'invisible' : 'visible'}`}
                style={{ minHeight: '100vh' }}
            >
            </div>

            {/* 第一人称控制提示 - 严格控制：只在动画完成且延迟时间到达且未锁定指针时显示 */}
            <div className={`absolute bottom-6 left-6 bg-black/50 backdrop-blur-md rounded-xl p-4 text-white z-20 max-w-sm transition-all duration-1000 ${
                (!isLoading && isIntroAnimationComplete && showUICards && !isPointerLocked) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
            }`}>
                <p className="text-lg font-medium mb-2">
                    {texts[language]?.gallery?.gallery3D?.title || '浮生长廊'}
                </p>
                <div className="space-y-1 text-sm">
                    <p>
                        • {texts[language]?.gallery?.gallery3D?.instructions?.clickToStart || '点击进入'}
                    </p>
                    <p>
                        • {texts[language]?.gallery?.gallery3D?.instructions?.navigation?.wasd || 'WASD / 方向键移动'}
                    </p>
                    <p>
                        • {texts[language]?.gallery?.gallery3D?.instructions?.navigation?.mouse || '鼠标环视'}
                    </p>
                    <p>
                        • {texts[language]?.gallery?.gallery3D?.instructions?.navigation?.esc || 'ESC 退出'}
                    </p>
                </div>
            </div>

            {/* 点击开始探索 - 严格控制：只在动画完成且延迟时间到达且未锁定指针时显示 */}
            <div 
                className={`absolute inset-0 flex items-center justify-center cursor-pointer z-10 transition-all duration-1000 ${
                    (!isLoading && isIntroAnimationComplete && showUICards && !isPointerLocked) 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95 pointer-events-none'
                }`}
                onClick={() => {
                    if (!isLoading && isIntroAnimationComplete && showUICards && !isPointerLocked) {
                        controlsRef.current?.lock();
                    }
                }}
            >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {texts[language]?.gallery?.gallery3D?.title || '浮生长廊'}
                    </h2>
                    <p className="text-white/80 mb-6">
                        {texts[language]?.gallery?.gallery3D?.instructions?.clickToStart || '点击进入'}
                    </p>
                    <div className="animate-bounce">
                        <svg className="w-8 h-8 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 第一人称模式时的准星 */}
            {isPointerLocked && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    {/* 中心圆点 - 调大一些 */}
                    <div className="w-2 h-2 bg-white rounded-full shadow-lg border border-white/30"></div>
                    {/* 水平线 - 调长一些 */}
                    <div className="absolute w-6 h-0.5 bg-white/60 rounded shadow-sm"></div>
                    {/* 垂直线 - 调长一些 */}
                    <div className="absolute w-0.5 h-6 bg-white/60 rounded shadow-sm"></div>
                    {/* 外圈指示 - 增加更清晰的轮廓 */}
                    <div className="absolute w-8 h-8 border border-white/20 rounded-full"></div>
                </div>
            )}
        </section>
    );
};

GallerySection.propTypes = {
    language: PropTypes.string
};

export default GallerySection;
