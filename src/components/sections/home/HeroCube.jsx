import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useAppStore } from '../../../store/useAppStore';
import { gsap } from 'gsap';

const HeroCube = ({ 
    enableOpeningAnimation = false,
    onAnimationComplete
}) => {
    const mountRef = useRef();
    const cubeRef = useRef();
    const openingAnimationRef = useRef(); // 开场震撼动画实例
    const mouseRef = useRef({ x: 0, y: 0 });
    
    // 鼠标轨迹和旋转晃动状态
    const mouseVelocityRef = useRef({ x: 0, y: 0 });
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const cubeRotationVelocityRef = useRef({ x: 0, y: 0, z: 0 });
    const cubeRotationOffsetRef = useRef({ x: 0, y: 0, z: 0 });
    const lastFrameTimeRef = useRef(performance.now());
    const hasBeenDraggedRef = useRef(false); // 跟踪是否已被用户拖拽过
    
    const { getContent } = useAppStore();
    const content = getContent();

    // 获取全屏画布尺寸
    const getCanvasSize = useCallback(() => {
        return Math.max(window.innerWidth, window.innerHeight);
    }, []);
    
    const [canvasSize, setCanvasSize] = useState(getCanvasSize());

    // 固定的6个面配置 - 只用于首页展示，添加高质量图片贴图
    const faces = useMemo(() => [
        { name: 'home', label: content.navigation?.home || 'Home', color: '#afcc8f', effect: 'effectchaos', video: '/cube-textures/home.mp4' },
        { name: 'about', label: content.navigation?.about || 'About', color: '#7ca65c', effect: 'effectlorenz', image: '/cube-textures/about.jpg' },
        { name: 'projects', label: content.navigation?.projects || 'Projects', color: '#5d7d4b', effect: 'effectmonjori', image: '/cube-textures/projects.jpg' },
        { name: 'gallery', label: content.navigation?.gallery || 'Gallery', color: '#768e90', effect: 'effectheartbeats', image: '/cube-textures/gallery.jpg' },
        { name: 'education', label: content.navigation?.education || 'Education', color: '#1d2012', effect: 'effectfuse', image: '/cube-textures/education.jpg' },
        { name: 'contact', label: content.navigation?.contact || 'Contact', color: '#94a3b8', effect: 'effectpixeldistortion', image: '/cube-textures/contact.jpg' }
    ], [content.navigation]);

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setCanvasSize(getCanvasSize());
            // 更新渲染器尺寸
            if (mountRef.current?.firstChild) {
                const canvas = mountRef.current.firstChild;
                canvas.style.width = '100vw';
                canvas.style.height = '100vh';
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getCanvasSize]);

    useEffect(() => {
        const mountElement = mountRef.current;
        if (!mountElement) return;

        // 创建场景
        const scene = new THREE.Scene();

        // 创建相机
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.z = 10; // 固定摄像机距离

        // 创建渲染器 - 性能优化设置
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true, // 保持抗锯齿开启
            powerPreference: "high-performance", // 改为高性能模式
            precision: "mediump", // 使用中等精度
            stencil: false,
            depth: true,
            premultipliedAlpha: false
        });
        
        // 设置透明背景
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(canvasSize, canvasSize);
        // 限制像素比以提升性能
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        
        // 性能优化设置
        renderer.shadowMap.enabled = false;
        renderer.physicallyCorrectLights = false;
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // 限制像素比
        
        // 全屏显示设置
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100vw';
        renderer.domElement.style.height = '100vh';
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.zIndex = '10';
        renderer.domElement.style.pointerEvents = 'none'; // 去掉交互
        
        // 更新渲染器尺寸为全屏
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        // 设置渲染质量 - 性能优化
        renderer.shadowMap.enabled = false;
        renderer.physicallyCorrectLights = false; // 关闭物理光照
        renderer.toneMapping = THREE.NoToneMapping; // 使用最简单的色调映射
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        mountElement.appendChild(renderer.domElement);
        
        // 光照系统
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);

        // 创建圆角立方体几何体
        const cubeSize = 2.8;
        const geometry = new RoundedBoxGeometry(cubeSize, cubeSize, cubeSize, 8, 0.1);
        
        // 创建棋盘格默认纹理的函数
        const createCheckerboardTexture = (size = 256) => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext('2d');
            
            const squareSize = size / 8;
            
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    context.fillStyle = (i + j) % 2 === 0 ? '#333333' : '#666666';
                    context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
                }
            }
            
            context.fillStyle = '#ff4444';
            context.font = `bold ${size / 16}px Arial`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('VIDEO', size / 2, size / 2 - size / 32);
            context.fillText('ERROR', size / 2, size / 2 + size / 32);
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        };

        // 为每个面创建材质
        const materials = faces.map((face) => {
            // 如果是视频贴图
            if (face.video) {
                const fallbackTexture = createCheckerboardTexture(256);
                
                const video = document.createElement('video');
                video.src = face.video;
                video.crossOrigin = 'anonymous';
                video.loop = true;
                video.muted = true;
                video.autoplay = true;
                video.playsInline = true;
                
                const material = new THREE.MeshLambertMaterial({
                    map: fallbackTexture,
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.FrontSide // 只渲染正面，提升性能
                });
                
                // 视频加载成功后切换到视频纹理 - 修复抖动
                const switchToVideoTexture = () => {
                    try {
                        const videoTexture = new THREE.VideoTexture(video);
                        // 关键修复：使用高质量mipmap过滤器
                        videoTexture.minFilter = THREE.LinearMipmapLinearFilter;
                        videoTexture.magFilter = THREE.LinearFilter;
                        videoTexture.format = THREE.RGBAFormat; // 使用RGBA格式
                        videoTexture.generateMipmaps = true; // 开启mipmap
                        videoTexture.flipY = false; // 禁用Y轴翻转避免抖动
                        videoTexture.colorSpace = THREE.SRGBColorSpace;
                        
                        if (material.map && material.map !== fallbackTexture) {
                            material.map.dispose();
                        }
                        material.map = videoTexture;
                        material.needsUpdate = true;
                        
                        console.log('✅ Video texture loaded successfully for home face');
                    } catch (error) {
                        console.warn('❌ Failed to create video texture, using fallback:', error);
                    }
                };
                
                video.addEventListener('loadeddata', switchToVideoTexture);
                video.addEventListener('canplay', switchToVideoTexture);
                video.addEventListener('error', (e) => {
                    console.warn('❌ Video loading failed, using checkerboard fallback:', e);
                });
                
                video.play().then(() => {
                    console.log('🎬 Video playback started');
                }).catch((error) => {
                    console.warn('❌ Video autoplay failed, using fallback:', error);
                });
                
                return material;
            }
            
            // 如果是图片贴图
            if (face.image) {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                
                // 创建材质，初始使用轻量材质
                const material = new THREE.MeshLambertMaterial({
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.FrontSide // 只渲染正面，提升性能
                });
                
                // 图片加载成功后设置纹理
                img.onload = () => {
                    try {
                        const imageTexture = new THREE.Texture(img);
                        imageTexture.needsUpdate = true;
                        imageTexture.generateMipmaps = true;
                        imageTexture.minFilter = THREE.LinearMipmapLinearFilter;
                        imageTexture.magFilter = THREE.LinearFilter;
                        imageTexture.wrapS = THREE.ClampToEdgeWrapping;
                        imageTexture.wrapT = THREE.ClampToEdgeWrapping;
                        imageTexture.colorSpace = THREE.SRGBColorSpace;
                        
                        // 设置纹理到材质
                        material.map = imageTexture;
                        material.needsUpdate = true;
                        
                        console.log(`✅ Image texture loaded successfully for ${face.name} face`);
                    } catch (error) {
                        console.warn(`❌ Failed to create image texture for ${face.name}:`, error);
                    }
                };
                
                img.onerror = (e) => {
                    console.warn(`❌ Image loading failed for ${face.name}:`, e);
                };
                
                // 开始加载图片
                img.src = face.image;
                
                return material;
            }
            
            // Canvas纹理逻辑 - 只显示文字，不显示图标
            const canvas = document.createElement('canvas');
            const textureSize = 256;
            canvas.width = textureSize;
            canvas.height = textureSize;
            const context = canvas.getContext('2d');
            
            // 绘制背景色彩
            context.clearRect(0, 0, textureSize, textureSize);
            
            const gradient = context.createRadialGradient(
                textureSize / 2, textureSize / 2, 0,
                textureSize / 2, textureSize / 2, textureSize / 2
            );
            gradient.addColorStop(0, `${face.color}25`);
            gradient.addColorStop(0.6, `${face.color}15`);
            gradient.addColorStop(1, `${face.color}08`);
            context.fillStyle = gradient;
            context.fillRect(0, 0, textureSize, textureSize);
            
            // 绘制边框
            context.strokeStyle = `${face.color}60`;
            context.lineWidth = 2;
            const border = textureSize * 0.05;
            context.strokeRect(border, border, textureSize - border * 2, textureSize - border * 2);
            
            // 添加反光效果
            const reflectGradient = context.createLinearGradient(0, 0, textureSize, textureSize);
            reflectGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            reflectGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
            reflectGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            context.fillStyle = reflectGradient;
            context.fillRect(0, 0, textureSize / 3, textureSize);
            
            // 只绘制文字，居中显示
            context.shadowColor = 'rgba(0, 0, 0, 0.8)';
            context.shadowBlur = 6;
            const fontSize = 36;
            context.font = `bold ${fontSize}px "Helvetica Neue", Arial`;
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(face.label, textureSize / 2, textureSize / 2);
            
            // 重置阴影
            context.shadowColor = 'transparent';
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            
            const material = new THREE.MeshLambertMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });
            
            return material;
        });

        // 创建立方体
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        cubeRef.current = cube;
        
        // 添加边缘线框增强立体感
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xffffff, 
            opacity: 0.3, 
            transparent: true,
            linewidth: 2
        });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        cube.add(wireframe);

        // 震撼开场动画
        if (enableOpeningAnimation) {
            // 设置cube初始状态
            cube.position.set(0, 0, -80);
            cube.scale.set(0.05, 0.05, 0.05);
            cube.rotation.set(0, 0, 0);
            
            // 创建震撼开场动画序列
            openingAnimationRef.current = gsap.timeline({
                onComplete: () => {
                    if (onAnimationComplete) {
                        onAnimationComplete();
                    }
                    window.dispatchEvent(new CustomEvent('cubeAnimationComplete'));
                }
            })
                // ...existing animation code...
                // 阶段1: 从远处快速飞入 (0-2s)
                .to(cube.position, {
                    z: 0,
                    duration: 2.0,
                    ease: "power3.out",
                    delay: 0.5
                })
                .to(cube.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                    duration: 2.0,
                    ease: "back.out(1.7)"
                }, 0.5)
                
                // 阶段2: 摄像机穿越展示每个面 (2.5-14.5s)
                // 面1: Home面 (正面) - 从正前方进入 (2.5-4.5s)
                .to(cube.rotation, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 2.5)
                .to(camera.position, {
                    x: 0, y: 0, z: 4,
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 3.2)
                
                // 面2: About面 (右面) - 从右侧进入 (4.5-6.5s)
                .to(cube.rotation, {
                    x: 0,
                    y: -Math.PI * 0.5,
                    z: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 4.5)
                .to(camera.position, {
                    x: 4, y: 0, z: 2,
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 5.3)
                
                // 面3: Projects面 (背面) - 从后方高处进入 (6.5-8.5s)
                .to(cube.rotation, {
                    x: 0,
                    y: -Math.PI,
                    z: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 6.5)
                .to(camera.position, {
                    x: 0, y: 3, z: -4,
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 7.3)
                
                // 面4: Gallery面 (左面) - 从左下方进入 (8.5-10.5s)
                .to(cube.rotation, {
                    x: 0,
                    y: -Math.PI * 1.5,
                    z: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 8.5)
                .to(camera.position, {
                    x: -4, y: -2, z: 2,
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 9.3)
                
                // 面5: Education面 (底面) - 从下方进入 (10.5-12.5s)
                .to(cube.rotation, {
                    x: Math.PI * 0.5,
                    y: -Math.PI * 1.5,
                    z: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 10.5)
                .to(camera.position, {
                    x: 0, y: -4, z: 2,
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 11.3)
                
                // 面6: Contact面 (顶面) - 从上方进入 (12.5-14.5s)
                .to(cube.rotation, {
                    x: -Math.PI * 0.5,
                    y: -Math.PI * 1.5,
                    z: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 12.5)
                .to(camera.position, {
                    x: 0, y: 4, z: 2,
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 13.3)
                
                // 摄像机回到标准位置 (14.5s)
                .to(camera.position, {
                    x: 0, y: 0, z: 10,
                    duration: 0.5,
                    ease: "power2.in",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 14.5)
                .to(cube.scale, {
                    x: 12,
                    y: 12,
                    z: 12,
                    duration: 2.0,
                    ease: "power3.in"
                }, 14.5)
                .to(cube.rotation, {
                    x: cube.rotation.x + Math.PI * 4,
                    y: cube.rotation.y + Math.PI * 6,
                    z: cube.rotation.z + Math.PI * 3,
                    duration: 2.0,
                    ease: "power2.out"
                }, 14.5)
                
                // 阶段4: 平滑回缩，对角线旋转开始 (16.5-19s)
                .to(cube.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 2.5,
                    ease: "power3.out"
                }, 16.5)
                .to(camera.position, {
                    z: 10,
                    duration: 2.5,
                    ease: "power2.out"
                }, 16.5)
                .to(cube.rotation, {
                    x: cube.rotation.x + Math.PI * 1.5,
                    y: cube.rotation.y + Math.PI * 1.8,
                    z: cube.rotation.z + Math.PI * 1.2,
                    duration: 2.5,
                    ease: "sine.inOut"
                }, 16.5)
                
                // 阶段5: 继续平滑旋转，逐步到位 (19-21s)
                .to(cube.scale, {
                    x: 1.05,
                    y: 1.05,
                    z: 1.05,
                    duration: 2.0,
                    ease: "power2.out"
                }, 19)
                .to(cube.rotation, {
                    x: -Math.PI * 0.81,
                    y: Math.PI * 0.25,
                    z: 0,
                    duration: 2.0,
                    ease: "power1.inOut"
                }, 19)
                
                // 阶段6: 连续3次弹跳 (21-23.5s)
                .to(cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.4,
                    ease: "power2.out"
                }, 21)
                
                // 第1次弹跳
                .to(cube.scale, {
                    x: 1.08,
                    y: 1.08,
                    z: 1.08,
                    duration: 0.15,
                    ease: "power2.out"
                }, 21.4)
                .to(cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.2,
                    ease: "bounce.out"
                }, 21.55)
                
                // 第2次弹跳
                .to(cube.scale, {
                    x: 1.06,
                    y: 1.06,
                    z: 1.06,
                    duration: 0.12,
                    ease: "power2.out"
                }, 21.8)
                .to(cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.18,
                    ease: "bounce.out"
                }, 21.92)
                
                // 第3次弹跳
                .to(cube.scale, {
                    x: 1.04,
                    y: 1.04,
                    z: 1.04,
                    duration: 0.1,
                    ease: "power2.out"
                }, 22.15)
                .to(cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.25,
                    ease: "elastic.out(1.2, 0.4)"
                }, 22.25);
                
        } else {
            // 普通显示 - 设置默认角度
            cube.rotation.set(-Math.PI * 0.81, Math.PI * 0.25, 0);
        }

        // 全局鼠标移动监听 (用于物理效果)
        const handleGlobalMouseMove = (event) => {
            // 更新鼠标位置用于物理效果
            const newMouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const newMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            // 计算鼠标移动速度
            const currentTime = performance.now();
            const deltaTime = Math.max(currentTime - lastFrameTimeRef.current, 1);
            
            const mouseDeltaX = newMouseX - lastMousePosRef.current.x;
            const mouseDeltaY = newMouseY - lastMousePosRef.current.y;
            
            // 计算速度
            mouseVelocityRef.current.x = mouseDeltaX / (deltaTime * 0.001);
            mouseVelocityRef.current.y = mouseDeltaY / (deltaTime * 0.001);
            
            // 更新位置记录
            mouseRef.current.x = newMouseX;
            mouseRef.current.y = newMouseY;
            lastMousePosRef.current = { x: newMouseX, y: newMouseY };
            lastFrameTimeRef.current = currentTime;
        };
        
        // 添加事件监听
        window.addEventListener('mousemove', handleGlobalMouseMove);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            
            // 物理参数
            const currentTime = performance.now();
            const deltaTime = Math.min((currentTime - lastFrameTimeRef.current) * 0.001, 0.02);
            lastFrameTimeRef.current = currentTime;
            
            // 鼠标控制旋转 (仅在未被用户拖拽过时)
            if (!hasBeenDraggedRef.current) {
                // 初始状态：让一个角正对摄像机，并向上旋转135度显示顶面
                const baseTargetRotationY = mouseRef.current.x * 0.1 + Math.PI * 0.25;
                const baseTargetRotationX = mouseRef.current.y * 0.05 - Math.PI * 0.81;
                
                // 结合基础旋转和物理晃动旋转
                const finalRotationX = baseTargetRotationX + cubeRotationOffsetRef.current.x;
                const finalRotationY = baseTargetRotationY + cubeRotationOffsetRef.current.y;
                const finalRotationZ = cubeRotationOffsetRef.current.z;
                
                cube.rotation.x += (finalRotationX - cube.rotation.x) * 0.02;
                cube.rotation.y += (finalRotationY - cube.rotation.y) * 0.02;
                cube.rotation.z += (finalRotationZ - cube.rotation.z) * 0.02;
                
                // 非常缓慢的自动旋转作为基础
                cube.rotation.y += 0.001;
            }
            
            // 旋转晃动效果 - 立方体保持中心位置固定
            if (deltaTime > 0) {
                // 物理常数
                const springStrength = 12.0;
                const damping = 0.88;
                const rotationSensitivity = 2.5;
                const maxRotationOffset = 1.2;
                
                // 基于鼠标移动方向的旋转力
                const rotationForceX = mouseVelocityRef.current.y * rotationSensitivity;
                const rotationForceY = -mouseVelocityRef.current.x * rotationSensitivity;
                const rotationForceZ = (mouseVelocityRef.current.x + mouseVelocityRef.current.y) * rotationSensitivity * 0.4;
                
                // 旋转弹簧力
                const rotationSpringForceX = -cubeRotationOffsetRef.current.x * springStrength;
                const rotationSpringForceY = -cubeRotationOffsetRef.current.y * springStrength;
                const rotationSpringForceZ = -cubeRotationOffsetRef.current.z * springStrength;
                
                // 更新旋转速度
                cubeRotationVelocityRef.current.x += (rotationForceX + rotationSpringForceX) * deltaTime;
                cubeRotationVelocityRef.current.y += (rotationForceY + rotationSpringForceY) * deltaTime;
                cubeRotationVelocityRef.current.z += (rotationForceZ + rotationSpringForceZ) * deltaTime;
                
                // 应用阻尼
                cubeRotationVelocityRef.current.x *= damping;
                cubeRotationVelocityRef.current.y *= damping;
                cubeRotationVelocityRef.current.z *= damping;
                
                // 更新旋转偏移
                cubeRotationOffsetRef.current.x += cubeRotationVelocityRef.current.x * deltaTime;
                cubeRotationOffsetRef.current.y += cubeRotationVelocityRef.current.y * deltaTime;
                cubeRotationOffsetRef.current.z += cubeRotationVelocityRef.current.z * deltaTime;
                
                // 限制最大旋转偏移
                cubeRotationOffsetRef.current.x = Math.max(-maxRotationOffset, Math.min(maxRotationOffset, cubeRotationOffsetRef.current.x));
                cubeRotationOffsetRef.current.y = Math.max(-maxRotationOffset, Math.min(maxRotationOffset, cubeRotationOffsetRef.current.y));
                cubeRotationOffsetRef.current.z = Math.max(-maxRotationOffset, Math.min(maxRotationOffset, cubeRotationOffsetRef.current.z));
                
                // 只应用基础浮动效果，不改变XZ位置
                const floatY = Math.sin(currentTime * 0.001) * 0.05;
                cube.position.set(0, floatY, 0);
                
                // 减慢鼠标速度 (自然衰减)
                mouseVelocityRef.current.x *= 0.92;
                mouseVelocityRef.current.y *= 0.92;
            }
            
            renderer.render(scene, camera);
        };
        
        animate();

        // 清理函数
        return () => {
            // 停止GSAP动画
            if (openingAnimationRef.current) {
                openingAnimationRef.current.kill();
            }
            
            if (mountElement && renderer.domElement) {
                mountElement.removeChild(renderer.domElement);
            }
            
            // 移除事件监听器
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            
            geometry.dispose();
            materials.forEach(material => {
                if (material.map) {
                    // 如果是视频纹理，停止视频播放
                    if (material.map.image && material.map.image.tagName === 'VIDEO') {
                        material.map.image.pause();
                        material.map.image.src = '';
                        material.map.image.load();
                    }
                    material.map.dispose();
                }
                material.dispose();
            });
            renderer.dispose();
        };
    }, [faces, canvasSize, enableOpeningAnimation, onAnimationComplete]);

    return (
        <div className="relative">
            <div 
                ref={mountRef}
                className="fixed inset-0 z-10 w-full h-full overflow-hidden"
                style={{
                    pointerEvents: 'none' // 完全去掉交互
                }}
            />
        </div>
    );
};

HeroCube.propTypes = {
    enableOpeningAnimation: PropTypes.bool,
    onAnimationComplete: PropTypes.func
};

export default HeroCube;
