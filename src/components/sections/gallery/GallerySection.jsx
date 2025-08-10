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

            // 为每个图片创建射灯（合并版本）
            const createPaintingSpotlight = (paintingMesh) => {
                const spotLight = new THREE.SpotLight(0xfff8e7, 3.2, 15, Math.PI / 6, 0.2, 1.5);
                const position = paintingMesh.position;
                const rotation = paintingMesh.rotation;
                
                // 根据画作朝向计算射灯位置
                let lightPos = new THREE.Vector3();
                const lightHeight = 6.5;
                const offset = 2.5;
                
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
                spotLight.castShadow = true;
                spotLight.shadow.mapSize.width = 1024;
                spotLight.shadow.mapSize.height = 1024;
                
                scene.add(spotLight);
                scene.add(spotLight.target);
                return spotLight;
            };

            // 动态创建画框的函数
            const createDynamicPaintingFrame = (painting, imageWidth, imageHeight) => {
                const frameGroup = new THREE.Group();
                
                // 根据图片真实比例计算画作尺寸
                const aspectRatio = imageWidth / imageHeight;
                let paintingWidth, paintingHeight;
                
                if (aspectRatio > 1.5) {
                    // 宽幅横向图片：限制宽度
                    paintingWidth = Math.min(maxPaintingWidth, basePaintingHeight * aspectRatio);
                    paintingHeight = paintingWidth / aspectRatio;
                } else if (aspectRatio < 0.7) {
                    // 纵向图片：限制高度
                    paintingHeight = basePaintingHeight;
                    paintingWidth = paintingHeight * aspectRatio;
                } else {
                    // 接近正方形的图片：保持合理比例
                    paintingHeight = basePaintingHeight * 0.9;
                    paintingWidth = paintingHeight * aspectRatio;
                }
                
                console.log(`🖼️ Frame ${aspectRatio.toFixed(2)} ratio: ${paintingWidth.toFixed(1)}×${paintingHeight.toFixed(1)}m`);
                
                // 调整画作平面几何体以匹配新尺寸
                painting.geometry.dispose();
                painting.geometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
                
                // 画框材质
                const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
                const frameWidth = 0.08;
                const frameThickness = 0.04;
                
                // 四条画框边 - 动态尺寸
                const frameGeometries = [
                    new THREE.BoxGeometry(paintingWidth + frameWidth * 2, frameWidth, frameThickness), // 上边
                    new THREE.BoxGeometry(paintingWidth + frameWidth * 2, frameWidth, frameThickness), // 下边
                    new THREE.BoxGeometry(frameWidth, paintingHeight, frameThickness), // 左边
                    new THREE.BoxGeometry(frameWidth, paintingHeight, frameThickness)  // 右边
                ];
                
                const framePositions = [
                    { x: 0, y: (paintingHeight + frameWidth) / 2, z: frameThickness / 2 },  // 上
                    { x: 0, y: -(paintingHeight + frameWidth) / 2, z: frameThickness / 2 }, // 下
                    { x: -(paintingWidth + frameWidth) / 2, y: 0, z: frameThickness / 2 },  // 左
                    { x: (paintingWidth + frameWidth) / 2, y: 0, z: frameThickness / 2 }    // 右
                ];
                
                frameGeometries.forEach((geometry, i) => {
                    const frame = new THREE.Mesh(geometry, frameMaterial);
                    frame.position.set(framePositions[i].x, framePositions[i].y, framePositions[i].z);
                    frame.castShadow = true;
                    frame.receiveShadow = true;
                    frameGroup.add(frame);
                });
                
                frameGroup.add(painting);
                frameGroup.userData = { paintingWidth, paintingHeight, aspectRatio };
                
                return frameGroup;
            };
            
            for (let i = 0; i < maxPaintings; i++) {
                const item = galleryData[i];
                if (!item.src && !item.thumbnail) {
                    console.warn(`Skipping item ${i}, no image source`);
                    continue;
                }

                // 创建画作平面 - 使用默认尺寸，稍后会根据图片调整
                let paintingWidth = 2.5;  // 默认宽度
                let paintingHeight = 2.0; // 默认高度
                
                const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
                const paintingMaterial = new THREE.MeshPhongMaterial({ // 改用Phong材质，更好的光照效果
                    color: 0x888888,
                    side: THREE.DoubleSide,
                    shininess: 10, // 轻微的光泽感
                    specular: 0x222222 // 轻微的高光
                });
                const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
                
                // 异步获取图片尺寸并调整画作
                const adjustPaintingSize = async () => {
                    try {
                        const dimensions = await getImageDimensions(item.src || item.thumbnail);
                        const aspectRatio = dimensions.width / dimensions.height;
                        
                        // 根据比例重新计算尺寸
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
                        
                        // 更新几何体
                        painting.geometry.dispose();
                        painting.geometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
                        
                        console.log(`📐 Adjusted painting ${i + 1} size: ${paintingWidth.toFixed(1)}×${paintingHeight.toFixed(1)}m (ratio: ${aspectRatio.toFixed(2)})`);
                    } catch (error) {
                        console.warn(`Failed to adjust size for painting ${i + 1}:`, error);
                    }
                };
                
                // 启动异步尺寸调整
                adjustPaintingSize();
                
                // 创建现代简约画框 - 使用默认尺寸
                const frameThickness = 0.05;
                const frameWidth = 0.1;
                const createPaintingFrame = (painting, pWidth = 2.5, pHeight = 2.0) => {
                    const frameGroup = new THREE.Group();
                    
                    // 画框材质 - 深色现代风格
                    const frameMaterial = new THREE.MeshLambertMaterial({ 
                        color: 0x1a1a1a 
                    });
                    
                    // 四条画框边 - 使用传入的尺寸参数
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
                        frame.castShadow = true;
                        frame.receiveShadow = true;
                        frameGroup.add(frame);
                    });
                    
                    frameGroup.add(painting);
                    return frameGroup;
                };
                
                const paintingWithFrame = createPaintingFrame(painting);
                
                // 简化分布：每面墙3幅画
                const wallIndex = Math.floor(i / 3);
                const positionOnWall = i % 3;
                const wallOffset = 14.5; // 距离墙体中心的偏移量
                
                console.log(`Placing painting ${i + 1}/${maxPaintings} on wall ${wallIndex}, position ${positionOnWall}`);
                
                switch(wallIndex) {
                    case 0: // 后墙 - 朝向观众
                        paintingWithFrame.position.set(-8 + positionOnWall * 8, paintingCenterHeight, -wallOffset);
                        paintingWithFrame.rotation.y = 0;
                        break;
                        
                    case 1: // 右墙 
                        paintingWithFrame.position.set(wallOffset, paintingCenterHeight, -8 + positionOnWall * 8);
                        paintingWithFrame.rotation.y = -Math.PI / 2;
                        break;
                        
                    case 2: // 左墙
                        paintingWithFrame.position.set(-wallOffset, paintingCenterHeight, 8 - positionOnWall * 8);
                        paintingWithFrame.rotation.y = Math.PI / 2;
                        break;
                        
                    case 3: // 前墙（入口两侧）
                        if (positionOnWall === 0) {
                            paintingWithFrame.position.set(-12, paintingCenterHeight, wallOffset);
                            paintingWithFrame.rotation.y = Math.PI;
                        } else if (positionOnWall === 1) {
                            paintingWithFrame.position.set(12, paintingCenterHeight, wallOffset);
                            paintingWithFrame.rotation.y = Math.PI;
                        } else {
                            // 如果还有更多画作，继续放在后墙
                            paintingWithFrame.position.set(0, paintingCenterHeight, -wallOffset);
                            paintingWithFrame.rotation.y = 0;
                        }
                        break;
                }
                
                paintingWithFrame.castShadow = true;
                paintingWithFrame.receiveShadow = true;
                
                // 添加到场景
                scene.add(paintingWithFrame);
                
                // 存储画作信息用于射灯创建
                const paintingInfo = {
                    position: paintingWithFrame.position.clone(),
                    rotationY: paintingWithFrame.rotation.y,
                    size: { width: paintingWidth, height: paintingHeight },
                    index: i
                };
                
                // 为射灯传递旋转信息
                paintingInfo.position.rotationY = paintingInfo.rotationY;
                
                // 创建专用射灯照亮这幅画作
                setTimeout(() => {
                    const paintingSpotlight = createPaintingSpotlight(paintingWithFrame);
                    
                    // 将旋转信息传递给射灯，让它能够正确定位
                    paintingSpotlight.userData = { 
                        paintingRotation: paintingInfo.rotationY,
                        paintingIndex: i 
                    };
                    
                }, 100); // 稍微延迟创建射灯，确保画作已经正确放置
                
                console.log(`✅ Added painting ${i + 1} with frame and spotlight at:`, paintingWithFrame.position, `rotation: ${(paintingWithFrame.rotation.y * 180 / Math.PI).toFixed(1)}°`);

                // 异步加载纹理
                const textureLoader = new THREE.TextureLoader();
                const imageSrc = item.src || item.thumbnail;
                console.log(`Loading texture for painting ${i + 1}: ${imageSrc}`);
                
                textureLoader.load(
                    imageSrc,
                    (texture) => {
                        painting.material.map = texture;
                        painting.material.color.setHex(0xffffff);
                        painting.material.needsUpdate = true;
                        console.log(`✅ Loaded texture for painting ${i + 1}: ${item.title?.en || 'Untitled'}`);
                    },
                    undefined,
                    (error) => {
                        console.warn(`❌ Failed to load texture for painting ${i + 1}:`, error);
                        // 设置一个默认颜色以便能看到画框
                        painting.material.color.setHex(0x666666);
                    }
                );
            }
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
                scene.background = new THREE.Color(0xf0f0f0);
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
                    antialias: true
                });
                renderer.setSize(container.clientWidth, container.clientHeight);
                renderer.setClearColor(0xf0f0f0, 1);
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.BasicShadowMap; // 使用基础阴影，减少纹理使用
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                container.appendChild(renderer.domElement);
                rendererRef.current = renderer;
                
                // 检查WebGL纹理限制
                const gl = renderer.getContext();
                const maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
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
                // 添加艺术装饰元素
                const addArtisticElements = (scene) => {
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

                // 创建"王华"字形天花板灯管系统
                const createWangHuaCharacterLights = () => {
                    const characterLights = [];
                    
                    // "王"字的三条横线 + 一条竖线 (左侧) - 蓝色
                    const wangConfigs = [
                        // 上横线 (最短)
                        { start: { x: -8, z: -2 }, end: { x: -4, z: -2 }, name: '王-上横' },
                        // 中横线 (中长)  
                        { start: { x: -8.5, z: 0 }, end: { x: -3.5, z: 0 }, name: '王-中横' },
                        // 下横线 (最长)
                        { start: { x: -9, z: 2 }, end: { x: -3, z: 2 }, name: '王-下横' },
                        // 竖线 (连接三条横线)
                        { start: { x: -6, z: -2.5 }, end: { x: -6, z: 2.5 }, name: '王-竖线' }
                    ];

                        // "华"字结构 (右侧) - 更复杂的字形
                        const huaConfigs = [
                            // 上部 "人" 字形
                            { start: { x: 3, z: -2.5 }, end: { x: 4.5, z: -1 }, name: '华-人左', isAngled: true },
                            { start: { x: 6, z: -2.5 }, end: { x: 4.5, z: -1 }, name: '华-人右', isAngled: true },
                            // 中间横线
                            { start: { x: 3.5, z: -0.5 }, end: { x: 5.5, z: -0.5 }, name: '华-中横' },
                            // 下部 "十" 字形
                            { start: { x: 4.5, z: 0.5 }, end: { x: 4.5, z: 2.5 }, name: '华-下竖' },
                            { start: { x: 3.5, z: 1.5 }, end: { x: 5.5, z: 1.5 }, name: '华-下横' },
                            // 底部装饰
                            { start: { x: 3, z: 2.8 }, end: { x: 6, z: 2.8 }, name: '华-底横' }
                        ];
                        
                        // 创建"王"字灯管 (蓝色)
                        wangConfigs.forEach((config) => {
                            const length = Math.sqrt(
                                Math.pow(config.end.x - config.start.x, 2) + 
                                Math.pow(config.end.z - config.start.z, 2)
                            );
                            
                            const tubeGeometry = new THREE.BoxGeometry(
                                config.name.includes('竖') ? 0.3 : length,
                                0.12, // 稍厚一些，更显眼
                                config.name.includes('竖') ? length : 0.3
                            );
                            
                            // "王"字用蓝色
                            const tubeMaterial = new THREE.MeshBasicMaterial({ 
                                color: 0x4488ff,
                                emissive: 0x2244bb,
                                transparent: true,
                                opacity: 0.9
                            });
                            
                            const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                            
                            const centerX = (config.start.x + config.end.x) / 2;
                            const centerZ = (config.start.z + config.end.z) / 2;
                            tube.position.set(centerX, 7.94, centerZ);
                            
                            scene.add(tube);
                            
                            // 添加蓝色光源
                            const numLights = Math.ceil(length / 2.5);
                            for (let i = 0; i < numLights; i++) {
                                const t = i / (numLights - 1);
                                const lightX = config.start.x + t * (config.end.x - config.start.x);
                                const lightZ = config.start.z + t * (config.end.z - config.start.z);
                                
                                const pointLight = new THREE.PointLight(0x4488ff, 1.2, 6);
                                pointLight.position.set(lightX, 7.5, lightZ);
                                scene.add(pointLight);
                            }
                            
                            characterLights.push({ tube, name: config.name });
                        });

                        // 创建"华"字灯管 (粉红色)
                        huaConfigs.forEach((config) => {
                            let tubeGeometry, tube;
                            
                            if (config.isAngled) {
                                // 处理倾斜线条
                                const dx = config.end.x - config.start.x;
                                const dz = config.end.z - config.start.z;
                                const length = Math.sqrt(dx * dx + dz * dz);
                                const angle = Math.atan2(dz, dx);
                                
                                tubeGeometry = new THREE.BoxGeometry(length, 0.12, 0.2);
                                const tubeMaterial = new THREE.MeshBasicMaterial({ 
                                    color: 0xff4488,
                                    emissive: 0xbb2244,
                                    transparent: true,
                                    opacity: 0.9
                                });
                                
                                tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                                tube.position.set(
                                    (config.start.x + config.end.x) / 2,
                                    7.94,
                                    (config.start.z + config.end.z) / 2
                                );
                                tube.rotation.y = angle;
                                
                            } else {
                                // 处理直线
                                const length = Math.sqrt(
                                    Math.pow(config.end.x - config.start.x, 2) + 
                                    Math.pow(config.end.z - config.start.z, 2)
                                );
                                
                                tubeGeometry = new THREE.BoxGeometry(
                                    config.name.includes('竖') ? 0.3 : length,
                                    0.12,
                                    config.name.includes('竖') ? length : 0.3
                                );
                                
                                const tubeMaterial = new THREE.MeshBasicMaterial({ 
                                    color: 0xff4488,
                                    emissive: 0xbb2244,
                                    transparent: true,
                                    opacity: 0.9
                                });
                                
                                tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                                const centerX = (config.start.x + config.end.x) / 2;
                                const centerZ = (config.start.z + config.end.z) / 2;
                                tube.position.set(centerX, 7.94, centerZ);
                            }
                            
                            scene.add(tube);
                            
                            // 添加粉色光源
                            const length = Math.sqrt(
                                Math.pow(config.end.x - config.start.x, 2) + 
                                Math.pow(config.end.z - config.start.z, 2)
                            );
                            const numLights = Math.ceil(length / 2.5);
                            
                            for (let i = 0; i < numLights; i++) {
                                const t = i / (numLights - 1);
                                const lightX = config.start.x + t * (config.end.x - config.start.x);
                                const lightZ = config.start.z + t * (config.end.z - config.start.z);
                                
                                const pointLight = new THREE.PointLight(0xff4488, 1.2, 6);
                                pointLight.position.set(lightX, 7.5, lightZ);
                                scene.add(pointLight);
                            }
                            
                            characterLights.push({ tube, name: config.name });
                        });
                        
                        return characterLights;
                    };

                    // 创建图片尺寸检测函数
                    const getImageDimensions = (url) => {
                        return new Promise((resolve) => {
                            const img = new Image();
                            img.onload = () => {
                                resolve({ width: img.width, height: img.height });
                            };
                            img.onerror = () => {
                                // 如果加载失败，返回默认比例
                                resolve({ width: 800, height: 600 });
                            };
                            img.src = url;
                        });
                    };

                // 设置基础画廊灯光
                setupBasicLighting(scene);

                // 添加艺术装饰元素
                addArtisticElements(scene);

                // 创建"王华"字形天花板灯管系统
                const nameCharacterLights = createWangHuaCharacterLights();
                console.log(`✨ Created "王华" character lighting - illuminating the world! ${nameCharacterLights.length} light tubes`);

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
                };

                // 创建简单的房间
                createSimpleRoom(scene);

                // 添加一些测试画作
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
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (controlsRef.current) {
                controlsRef.current.dispose();
            }
            if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
                container.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
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
