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
            const paintingWidth = 3;
            const paintingHeight = 2;
            const paintingCenterHeight = 1.6; // 画作中心高度，与摄像机视线水平
            
            console.log(`Creating ${maxPaintings} paintings at eye level (${paintingCenterHeight}m)...`);
            
            for (let i = 0; i < maxPaintings; i++) {
                const item = galleryData[i];
                if (!item.src && !item.thumbnail) {
                    console.warn(`Skipping item ${i}, no image source`);
                    continue;
                }

                // 创建画作平面 - 更好的材质响应光照
                const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
                const paintingMaterial = new THREE.MeshPhongMaterial({ // 改用Phong材质，更好的光照效果
                    color: 0x888888,
                    side: THREE.DoubleSide,
                    shininess: 10, // 轻微的光泽感
                    specular: 0x222222 // 轻微的高光
                });
                const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
                
                // 创建现代简约画框
                const frameThickness = 0.05;
                const frameWidth = 0.1;
                const createPaintingFrame = (painting) => {
                    const frameGroup = new THREE.Group();
                    
                    // 画框材质 - 深色现代风格
                    const frameMaterial = new THREE.MeshLambertMaterial({ 
                        color: 0x1a1a1a 
                    });
                    
                    // 四条画框边
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
                console.log(`✅ Added painting ${i + 1} with frame to scene at eye level:`, paintingWithFrame.position);

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

                // 添加专业画廊灯光系统 - 平衡版本
                const setupGalleryLighting = (scene) => {
                    // 环境光 - 柔和的基础照明
                    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
                    scene.add(ambientLight);

                    // 主方向光 - 模拟天窗
                    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                    directionalLight.position.set(0, 10, 5);
                    directionalLight.castShadow = true;
                    directionalLight.shadow.mapSize.width = 2048;
                    directionalLight.shadow.mapSize.height = 2048;
                    directionalLight.shadow.camera.near = 0.5;
                    directionalLight.shadow.camera.far = 50;
                    directionalLight.shadow.camera.left = -20;
                    directionalLight.shadow.camera.right = 20;
                    directionalLight.shadow.camera.top = 20;
                    directionalLight.shadow.camera.bottom = -20;
                    scene.add(directionalLight);

                    // 画廊专用射灯系统 - 优化版本，更细更高的光束
                    const createSpotlightForPainting = (position, target, enableShadow = true) => {
                        const spotLight = new THREE.SpotLight(0xffffff, 2.8); // 提升亮度
                        
                        // 射灯位置 - 在画作上方
                        spotLight.position.copy(position);
                        
                        // 射灯目标 - 画作中心
                        spotLight.target.position.copy(target);
                        scene.add(spotLight.target);
                        
                        // 射灯参数 - 更细更高的光束
                        spotLight.angle = Math.PI / 8; // 22.5度角锥 - 更集中更细
                        spotLight.penumbra = 0.15; // 更锐利的边缘，减少阴影重叠
                        spotLight.decay = 1.8; // 稍微减少衰减，保持亮度
                        spotLight.distance = 12; // 适中的照射距离
                        
                        // 只有部分射灯启用阴影，减少纹理单元使用
                        if (enableShadow) {
                            spotLight.castShadow = true;
                            spotLight.shadow.mapSize.width = 512;
                            spotLight.shadow.mapSize.height = 512;
                            spotLight.shadow.camera.near = 0.5;
                            spotLight.shadow.camera.far = 12;
                        }
                        
                        scene.add(spotLight);
                        return spotLight;
                    };

                    // 为每面墙创建优化的射灯系统 - 更高位置，更大间距
                    const spotlights = [];
                    
                    // 后墙射灯 (3盏) - 只有中间的启用阴影，更高位置
                    for (let i = 0; i < 3; i++) {
                        const lightPos = new THREE.Vector3(-8 + i * 8, 7.0, -10); // 提高高度，远离墙面
                        const targetPos = new THREE.Vector3(-8 + i * 8, 1.6, -14.5); // 视线高度
                        const enableShadow = i === 1; // 只有中间的启用阴影
                        spotlights.push(createSpotlightForPainting(lightPos, targetPos, enableShadow));
                    }
                    
                    // 右墙射灯 (3盏) - 只有中间的启用阴影，更高位置
                    for (let i = 0; i < 3; i++) {
                        const lightPos = new THREE.Vector3(10, 7.0, -8 + i * 8); // 提高高度，远离墙面
                        const targetPos = new THREE.Vector3(14.5, 1.6, -8 + i * 8);
                        const enableShadow = i === 1; // 只有中间的启用阴影
                        spotlights.push(createSpotlightForPainting(lightPos, targetPos, enableShadow));
                    }
                    
                    // 左墙射灯 (3盏) - 只有中间的启用阴影，更高位置
                    for (let i = 0; i < 3; i++) {
                        const lightPos = new THREE.Vector3(-10, 7.0, 8 - i * 8); // 提高高度，远离墙面
                        const targetPos = new THREE.Vector3(-14.5, 1.6, 8 - i * 8);
                        const enableShadow = i === 1; // 只有中间的启用阴影
                        spotlights.push(createSpotlightForPainting(lightPos, targetPos, enableShadow));
                    }
                    
                    // 前墙射灯 (2盏，入口两侧) - 不启用阴影，更高位置
                    const frontLightLeft = new THREE.Vector3(-12, 7.0, 10); // 提高高度，远离墙面
                    const frontTargetLeft = new THREE.Vector3(-12, 1.6, 14.5);
                    spotlights.push(createSpotlightForPainting(frontLightLeft, frontTargetLeft, false));
                    
                    const frontLightRight = new THREE.Vector3(12, 7.0, 10); // 提高高度，远离墙面
                    const frontTargetRight = new THREE.Vector3(12, 1.6, 14.5);
                    spotlights.push(createSpotlightForPainting(frontLightRight, frontTargetRight, false));

                    console.log(`✅ Created ${spotlights.length} gallery spotlights`);
                    
                    // "王"字形天花板灯管系统 - 简洁高效
                    const createWangCharacterLights = () => {
                        const wangLights = [];
                        
                        // "王"字的三条横线 + 一条竖线
                        const tubeConfigs = [
                            // 上横线
                            { start: { x: -6, z: -4 }, end: { x: 6, z: -4 }, name: '上横' },
                            // 中横线  
                            { start: { x: -6, z: 0 }, end: { x: 6, z: 0 }, name: '中横' },
                            // 下横线
                            { start: { x: -6, z: 4 }, end: { x: 6, z: 4 }, name: '下横' },
                            // 竖线
                            { start: { x: 0, z: -4 }, end: { x: 0, z: 4 }, name: '竖线' }
                        ];
                        
                        tubeConfigs.forEach((config) => {
                            // 创建扁平的灯管几何体，贴在天花板上
                            const length = Math.sqrt(
                                Math.pow(config.end.x - config.start.x, 2) + 
                                Math.pow(config.end.z - config.start.z, 2)
                            );
                            
                            // 使用扁平的盒子几何体代替圆柱体，模拟贴在天花板的灯管
                            const tubeGeometry = new THREE.BoxGeometry(
                                config.name === '竖线' ? 0.3 : length, // 宽度
                                0.1, // 厚度 - 很薄，贴在天花板
                                config.name === '竖线' ? length : 0.3  // 深度
                            );
                            
                            // 发光材质
                            const tubeMaterial = new THREE.MeshBasicMaterial({ 
                                color: 0xffffff,
                                transparent: true,
                                opacity: 0.9
                            });
                            
                            const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
                            
                            // 设置位置 - 贴在天花板表面
                            const centerX = (config.start.x + config.end.x) / 2;
                            const centerZ = (config.start.z + config.end.z) / 2;
                            tube.position.set(centerX, 7.95, centerZ); // 贴在天花板下方
                            
                            scene.add(tube);
                            
                            // 添加点光源效果 - 沿着灯管分布多个光源
                            const numLights = Math.ceil(length / 2); // 每2米一个光源
                            for (let i = 0; i < numLights; i++) {
                                const t = i / (numLights - 1); // 插值比例
                                const lightX = config.start.x + t * (config.end.x - config.start.x);
                                const lightZ = config.start.z + t * (config.end.z - config.start.z);
                                
                                const pointLight = new THREE.PointLight(0xffffff, 1.5, 8);
                                pointLight.position.set(lightX, 7.6, lightZ);
                                scene.add(pointLight);
                            }
                            
                            wangLights.push({
                                tube: tube,
                                name: config.name
                            });
                            
                            console.log(`✨ Created "王" character light: ${config.name} at (${centerX}, 7.8, ${centerZ})`);
                        });
                        
                        return wangLights;
                    };
                    
                    const wangLights = createWangCharacterLights();
                    console.log(`✨ Created "王" character lighting with ${wangLights.length} light tubes`);

                    return spotlights;
                };

                // 设置专业画廊灯光
                setupGalleryLighting(scene);

                // 添加艺术装饰元素
                const addArtisticElements = (scene) => {
                    // 中心艺术装置 - 代表技术与艺术的融合
                    const createCenterPiece = () => {
                        const group = new THREE.Group();
                        
                        // 主体 - 透明反射球体
                        const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
                        const glassMaterial = new THREE.MeshPhysicalMaterial({
                            color: 0xffffff,
                            metalness: 0.0,
                            roughness: 0.05,
                            transmission: 0.9,       // 高透明度
                            transparent: true,
                            opacity: 0.3,           // 部分透明
                            reflectivity: 1.0,      // 高反射率
                            refractionRatio: 0.9,   // 折射率
                            clearcoat: 1.0,         // 清漆层
                            clearcoatRoughness: 0.1
                        });
                        
                        const sphere = new THREE.Mesh(sphereGeometry, glassMaterial);
                        sphere.position.y = 0;
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
                        base.receiveShadow = true;
                        group.add(base);
                        
                        // 添加缓慢的悬浮动画
                        const floatSphere = () => {
                            sphere.position.y = Math.sin(Date.now() * 0.001) * 0.1;
                        };
                        
                        // 存储动画函数以便后续使用
                        group.userData = { animate: floatSphere };
                        
                        group.position.set(0, 1.6, 0); // 画廊中心，视线高度
                        scene.add(group);
                        
                        console.log('✨ Added transparent reflective sphere centerpiece');
                        return group;
                    };
                    
                    // 角落装饰 - 现代极简主义立柱
                    const createCornerPillars = () => {
                        const pillarPositions = [
                            { x: -12, z: -12 }, // 后左角
                            { x: 12, z: -12 },  // 后右角
                        ];
                        
                        pillarPositions.forEach((pos) => {
                            const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 12);
                            const pillarMaterial = new THREE.MeshLambertMaterial({ 
                                color: 0x666666 
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

                addArtisticElements(scene);

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
                       event.key;
                       
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
