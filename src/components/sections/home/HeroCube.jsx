import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useAppStore } from '../../../store/useAppStore';
import { gsap } from 'gsap';
import { debounce } from 'lodash';
import textureSystem from '../../../utils/texture';
import webglResourceManager from '../../../utils/WebGLResourceManager';
import { useTheme } from '../../../hooks/useTheme';

const HeroCube = ({ 
    enableOpeningAnimation = false,
    onAnimationComplete,
    onReady
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
    const { getThemeColors } = useTheme();
    const themeColors = getThemeColors();

    // 获取全屏画布尺寸 - 移除状态，改为直接计算
    const getCanvasSize = useCallback(() => {
        return Math.max(window.innerWidth, window.innerHeight);
    }, []);
    
    const [texturesReady, setTexturesReady] = useState(false); // 纹理预加载状态

    // 智能cube纹理配置 - 使用新的纹理系统
    const faces = useMemo(() => {
        return [
            { 
                name: 'home', 
                label: content.navigation?.home || 'Home', 
                color: '#afcc8f', 
                effect: 'effectchaos', 
                video: '/cube-textures/home.mp4' // 视频保持原路径
            },
            { 
                name: 'about', 
                label: content.navigation?.about || 'About', 
                color: '#7ca65c', 
                effect: 'effectlorenz', 
                texture: 'about' // 只需要基础名称，新系统会自动选择最优格式
            },
            { 
                name: 'projects', 
                label: content.navigation?.projects || 'Projects', 
                color: '#5d7d4b', 
                effect: 'effectmonjori', 
                texture: 'projects'
            },
            { 
                name: 'gallery', 
                label: content.navigation?.gallery || 'Gallery', 
                color: '#768e90', 
                effect: 'effectheartbeats', 
                texture: 'gallery'
            },
            { 
                name: 'education', 
                label: content.navigation?.education || 'Education', 
                color: '#4a636a', 
                effect: 'effectfuse', 
                texture: 'education'
            },
            { 
                name: 'contact', 
                label: content.navigation?.contact || 'Contact', 
                color: '#3a4e55', 
                effect: 'effectpixeldistortion', 
                texture: 'contact'
            }
        ];
    }, [content.navigation]);

    // 预加载所有纹理资源
    useEffect(() => {
        const preloadTextures = async () => {
            try {
                // 显示格式检测信息
                const compressionInfo = await textureSystem.getCompressionInfo();
                console.log(`🎯 智能纹理系统: ${compressionInfo.format} (${compressionInfo.description})`);
                
                // 收集需要预加载的纹理名称
                const textureNames = faces
                    .filter(face => face.texture)
                    .map(face => face.texture);
                
                if (textureNames.length > 0) {
                    // 使用新的纹理系统预加载
                    await textureSystem.preloadTextures(textureNames, {
                        onProgress: (progress, loaded, total) => {
                            console.log(`📦 纹理预加载进度: ${loaded}/${total} (${Math.round(progress * 100)}%)`);
                        }
                    });
                }
                
                setTexturesReady(true);
            } catch (error) {
                console.warn('纹理预加载部分失败，继续渲染:', error);
                setTexturesReady(true);
            }
        };
        
        preloadTextures();
    }, [faces]);

    // 监听窗口大小变化和用户活动
    useEffect(() => {
        const handleResize = () => {
            // 移除canvasSize状态更新，resize将由WebGL上下文内部的handleCanvasResize处理
            // 更新渲染器尺寸
            if (mountRef.current?.firstChild) {
                const canvas = mountRef.current.firstChild;
                canvas.style.width = '100vw';
                canvas.style.height = '100vh';
            }
        };

        // 用户活动检测 - 刷新WebGL资源时间戳防止清理
        const handleUserActivity = () => {
            // 刷新WebGL资源管理器中的资源时间戳
            if (webglResourceManager.isPageVisible) {
                webglResourceManager.refreshActiveResources();
            }
        };

        // 监听多种用户活动事件
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        
        window.addEventListener('resize', handleResize);
        
        // 添加用户活动监听器，使用防抖避免频繁调用
        const debouncedActivityHandler = debounce(handleUserActivity, 30000); // 30秒防抖
        activityEvents.forEach(event => {
            document.addEventListener(event, debouncedActivityHandler);
        });
        
        return () => {
            window.removeEventListener('resize', handleResize);
            activityEvents.forEach(event => {
                document.removeEventListener(event, debouncedActivityHandler);
            });
        };
    }, [getCanvasSize]);

    // 将变化的依赖项分离到refs中，避免频繁重新创建WebGL上下文
    const themeColorsRef = useRef(themeColors);
    const onAnimationCompleteRef = useRef(onAnimationComplete);
    const onReadyRef = useRef(onReady);
    
    // 更新refs而不触发重新渲染
    useEffect(() => {
        themeColorsRef.current = themeColors;
    }, [themeColors]);
    
    useEffect(() => {
        onAnimationCompleteRef.current = onAnimationComplete;
    }, [onAnimationComplete]);
    
    useEffect(() => {
        onReadyRef.current = onReady;
    }, [onReady]);

    useEffect(() => {
        // 等待纹理预加载完成
        if (!texturesReady) {
            return;
        }
        
        // 开始HeroCube渲染，使用预加载的纹理
        
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
        
        // 设置透明背景，让3D背景可见
        renderer.setClearColor(0x000000, 0); // 完全透明背景
        // 初始设置为全屏尺寸，不依赖canvasSize状态
        renderer.setSize(window.innerWidth, window.innerHeight);
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
        
        // 添加数据属性，让智能光标识别这是不可点击的Canvas
        renderer.domElement.setAttribute('data-no-custom-cursor', 'true');
        renderer.domElement.setAttribute('data-hero-cube-canvas', 'true');
        renderer.domElement.classList.add('hero-cube-canvas');
        
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
        
        // 添加resize处理函数，避免重新创建整个WebGL上下文
        const handleCanvasResize = debounce(() => {
            if (renderer && camera) {
                const newWidth = window.innerWidth;
                const newHeight = window.innerHeight;
                
                renderer.setSize(newWidth, newHeight);
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                
                if (import.meta.env.DEV) {
                    console.log(`📐 HeroCube画布尺寸更新: ${newWidth}x${newHeight}`);
                }
            }
        }, 100); // 100ms防抖
        
        window.addEventListener('resize', handleCanvasResize);
        
        // 增强光照系统 - 更亮更丰富的灯光
        // 环境光 - 提升基础亮度
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // 从0.5提升到0.8
        scene.add(ambientLight);
        
        // 主方向光 - 增强强度
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2); // 从0.8提升到1.2
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        scene.add(mainLight);

        // 添加South Island Green主题色补光 - 绿色系
        const fillLight1 = new THREE.DirectionalLight(0x10B981, 0.6); // 翠绿补光
        fillLight1.position.set(-5, 2, -3);
        scene.add(fillLight1);
        
        const fillLight2 = new THREE.DirectionalLight(0x34D399, 0.5); // 浅绿补光
        fillLight2.position.set(3, -4, 5);
        scene.add(fillLight2);
        
        // 添加点光源增强中央区域亮度
        const pointLight = new THREE.PointLight(0xE0F2E0, 1.5, 15); // 浅绿白光源
        pointLight.position.set(0, 0, 8);
        scene.add(pointLight);
        
        // 添加背景点光源增强粒子可见度
        const backLight = new THREE.PointLight(0x00FF88, 0.8, 20); // 高亮绿背景光
        backLight.position.set(0, 0, -10);
        scene.add(backLight);

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
                    // 使用主题色创建棋盘格效果
                    context.fillStyle = (i + j) % 2 === 0 ? themeColorsRef.current.surface : themeColorsRef.current.muted;
                    context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
                }
            }
            
            context.fillStyle = themeColorsRef.current.primary;
            context.font = `bold ${size / 16}px Arial`;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText('VIDEO', size / 2, size / 2 - size / 32);
            context.fillText('ERROR', size / 2, size / 2 + size / 32);
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        };

        // 为每个面创建材质 - 按照Three.js立方体面的标准顺序
        const materials = [
            // 索引0: 右面 (X+) - About面
            faces.find(f => f.name === 'about'),
            // 索引1: 左面 (X-) - Gallery面  
            faces.find(f => f.name === 'gallery'),
            // 索引2: 顶面 (Y+) - Contact面
            faces.find(f => f.name === 'contact'),
            // 索引3: 底面 (Y-) - Education面
            faces.find(f => f.name === 'education'),
            // 索引4: 正面 (Z+) - Home面
            faces.find(f => f.name === 'home'),
            // 索引5: 背面 (Z-) - Projects面
            faces.find(f => f.name === 'projects')
        ].map((face) => {
            // 如果是视频贴图，直接创建视频纹理
            if (face.video) {
                const fallbackTexture = createCheckerboardTexture(256);
                
                const material = new THREE.MeshLambertMaterial({
                    map: fallbackTexture, // 初始使用fallback
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.FrontSide // 只渲染正面，提升性能
                });
                
                // 创建新的视频元素，确保每次都有一个新的实例
                const video = document.createElement('video');
                video.src = face.video;
                video.crossOrigin = 'anonymous';
                video.loop = true;
                video.muted = true;
                video.autoplay = true;
                video.playsInline = true;
                video.preload = 'metadata';
                
                const setupVideoTexture = () => {
                    try {
                        const videoTexture = new THREE.VideoTexture(video);
                        videoTexture.minFilter = THREE.LinearFilter; // 视频纹理不能使用mipmap
                        videoTexture.magFilter = THREE.LinearFilter;
                        videoTexture.format = THREE.RGBAFormat;
                        videoTexture.generateMipmaps = false; // 视频纹理禁用mipmap
                        videoTexture.flipY = false;
                        videoTexture.colorSpace = THREE.SRGBColorSpace;
                        
                        if (material.map && material.map !== fallbackTexture) {
                            material.map.dispose();
                        }
                        material.map = videoTexture;
                        material.needsUpdate = true;
                        
                        // 确保视频开始播放
                        video.play().catch(error => {
                            console.warn('Video autoplay failed:', error);
                        });
                    } catch (error) {
                        console.warn('Failed to create video texture:', error);
                        // 保持使用fallback纹理
                    }
                };
                
                // 多个事件监听确保视频正确加载
                video.addEventListener('loadeddata', () => {
                    setupVideoTexture();
                });
                
                video.addEventListener('canplay', () => {
                    setupVideoTexture();
                });
                
                video.addEventListener('loadedmetadata', () => {
                    // 视频元数据加载完成，可以尝试播放
                    video.play().catch(() => {
                        // 忽略自动播放失败
                    });
                });
                
                video.addEventListener('error', (error) => {
                    console.warn('Video loading error, using fallback texture:', error);
                    // 保持使用fallback纹理
                });
                
                // 立即尝试加载视频
                video.load();
                
                return material;
            }
            
            // 如果是图片贴图，使用新的纹理系统
            if (face.texture) {
                // 先创建带fallback的材质
                const fallbackTexture = createCheckerboardTexture(256);
                const material = new THREE.MeshLambertMaterial({
                    map: fallbackTexture, // 初始使用fallback
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.FrontSide
                });
                
                // 异步加载实际纹理
                (async () => {
                    try {
                        const texture = await textureSystem.loadTexture(face.texture);
                        material.map = texture;
                        material.needsUpdate = true;
                    } catch (error) {
                        console.warn(`加载纹理失败: ${face.texture}`, error);
                        // 保持使用fallback纹理
                    }
                })();
                
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
            context.fillStyle = themeColorsRef.current.text || '#ffffff';
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
                    if (onAnimationCompleteRef.current) {
                        onAnimationCompleteRef.current();
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
                // 面1: Home面 (正面, Z+) - 正对展示 (2.5-4.5s)
                .to(cube.rotation, {
                    x: 0, // 保持水平
                    y: 0, // 正面朝向摄像机
                    z: 0, // 图片正向，不旋转
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 2.5)
                .to(camera.position, {
                    x: 0, y: 0, z: 4, // 正对面中央
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 3.2)
                
                // 面2: About面 (右面, X+) - 正对展示 (4.5-6.5s)
                .to(cube.rotation, {
                    x: 0, // 保持水平
                    y: -Math.PI * 0.5, // 右面朝向摄像机
                    z: 0, // 图片正向
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 4.5)
                .to(camera.position, {
                    x: 4, y: 0, z: 0, // 正对右面中央
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 5.3)
                
                // 面3: Projects面 (背面, Z-) - 正对展示 (6.5-8.5s)
                .to(cube.rotation, {
                    x: 0, // 保持水平
                    y: -Math.PI, // 背面朝向摄像机
                    z: 0, // 图片正向
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 6.5)
                .to(camera.position, {
                    x: 0, y: 0, z: -4, // 正对背面中央
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 7.3)
                
                // 面4: Gallery面 (左面, X-) - 正对展示 (8.5-10.5s)
                .to(cube.rotation, {
                    x: 0, // 保持水平
                    y: Math.PI * 0.5, // 左面朝向摄像机 (注意：改为正值)
                    z: 0, // 图片正向
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 8.5)
                .to(camera.position, {
                    x: -4, y: 0, z: 0, // 正对左面中央
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 9.3)
                
                // 面5: Education面 (底面, Y-) - 从下方正对展示 (10.5-12.5s)
                .to(cube.rotation, {
                    x: Math.PI * 0.5, // 底面朝向摄像机
                    y: Math.PI * 0.5, // 保持图片正向 (调整Y轴旋转)
                    z: 0, // 不额外旋转
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 10.5)
                .to(camera.position, {
                    x: 0, y: -4, z: 0, // 从底部正对中央
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 11.3)
                
                // 面6: Contact面 (顶面, Y+) - 从上方正对展示 (12.5-14.5s)
                .to(cube.rotation, {
                    x: -Math.PI * 0.5, // 顶面朝向摄像机
                    y: Math.PI * 0.5, // 保持图片正向 (调整Y轴旋转)
                    z: 0, // 不额外旋转
                    duration: 1.5,
                    ease: "power2.inOut"
                }, 12.5)
                .to(camera.position, {
                    x: 0, y: 4, z: 0, // 从顶部正对中央
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 13.3)
                
                // 平滑过渡：从顶部视角缓慢回到标准位置 (13.3-14.8s)
                .to(camera.position, {
                    x: 0, y: 2, z: 6, // 先到中间过渡位置
                    duration: 0.7,
                    ease: "power2.inOut",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 13.3)
                .to(camera.position, {
                    x: 0, y: 0, z: 10, // 再到最终标准位置
                    duration: 0.8,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 14.0)
                
                // 阶段3: 戏剧性放大和旋转 - 摄像机进入cube内部 (14.8-16.5s)
                .to(cube.scale, {
                    x: 3, // 减小放大倍数，从12减到8
                    y: 3,
                    z: 3,
                    duration: 1.7,
                    ease: "power3.in"
                }, 14.8)
                // 摄像机同时向前移动，进入cube内部
                .to(camera.position, {
                    z: 2, // 摄像机前进到cube内部，确保始终能看到cube表面
                    duration: 1.7,
                    ease: "power3.in",
                    onUpdate: () => camera.lookAt(cube.position)
                }, 14.8)
                .to(cube.rotation, {
                    x: cube.rotation.x + Math.PI * 4,
                    y: cube.rotation.y + Math.PI * 6,
                    z: cube.rotation.z + Math.PI * 3,
                    duration: 1.7,
                    ease: "power2.out"
                }, 14.8)
                
                // 阶段4: 平滑回缩，对角线旋转开始 (16.5-19s)
                .to(cube.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 2.5,
                    ease: "power3.out"
                }, 16.5)
                // 摄像机回退到正常观察距离
                .to(camera.position, {
                    z: 10,
                    duration: 2.5,
                    ease: "power2.out",
                    onUpdate: () => camera.lookAt(cube.position)
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
        
        // 组件初始化完成后调用onReady
        // 使用ref中的值而不是直接使用props，避免依赖项变化
        if (onReadyRef.current) {
            // 使用setTimeout确保在下一帧调用，避免在渲染期间修改state
            setTimeout(() => {
                onReadyRef.current();
            }, 100);
        }
        
        // 注册WebGL资源到资源管理器 - 标记为持久资源，防止自动清理
        const resourceId = webglResourceManager.registerResources('HeroCube', {
            renderer,
            scene,
            geometry,
            materials,
            textures: materials.map(mat => mat.map).filter(Boolean)
        }, { persistent: true }); // 设置为持久资源
        
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
            window.removeEventListener('resize', handleCanvasResize);
            
            // 使用资源管理器清理
            webglResourceManager.cleanup(resourceId);
        };
    }, [faces, texturesReady, enableOpeningAnimation]); // 减少依赖项，避免频繁重建

    return (
        <div className="relative">
            <div 
                ref={mountRef}
                className="fixed inset-0 w-full h-full overflow-hidden"
                style={{
                    pointerEvents: 'none', // 完全去掉交互
                    zIndex: 5, // 设置比背景高但比内容低的层级
                    // South Island Green：添加绿色科技外发光
                    filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3)) drop-shadow(0 0 40px rgba(0, 255, 136, 0.2))'
                }}
            />
        </div>
    );
};

HeroCube.propTypes = {
    enableOpeningAnimation: PropTypes.bool,
    onAnimationComplete: PropTypes.func,
    onReady: PropTypes.func
};

export default HeroCube;
