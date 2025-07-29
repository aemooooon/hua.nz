import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useAppStore } from '../store/useAppStore';
import { gsap } from 'gsap';

const NavigationCube = ({ 
    isLandingPage = false, 
    onSectionChange, 
    sections = [], 
    currentSectionId, 
    enableOpeningAnimation = false,
    onAnimationComplete
}) => {
    const mountRef = useRef();
    const cubeRef = useRef();
    const rotationAnimationRef = useRef(); // 用于存储3D旋转动画实例
    const entryAnimationRef = useRef(); // 用于存储入场动画实例
    const openingAnimationRef = useRef(); // 用于存储开场震撼动画实例
    const previousSectionIdRef = useRef(currentSectionId); // 跟踪前一个section
    const mouseRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const hasBeenDraggedRef = useRef(false); // 跟踪是否已被用户拖拽过
    
    // 鼠标轨迹和旋转晃动状态
    const mouseVelocityRef = useRef({ x: 0, y: 0 });
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const cubeRotationVelocityRef = useRef({ x: 0, y: 0, z: 0 });
    const cubeRotationOffsetRef = useRef({ x: 0, y: 0, z: 0 });
    const lastFrameTimeRef = useRef(performance.now());
    
    const { getContent } = useAppStore();
    const content = getContent();

    // 根据是否在landing page和屏幕大小调整大小
    const getCanvasSize = useCallback(() => {
        if (!isLandingPage) return 240; // 非首页时保持240px
        // 在landing page时使用全屏尺寸
        return Math.max(window.innerWidth, window.innerHeight); // 使用屏幕的最大尺寸确保完全覆盖
    }, [isLandingPage]);
    
    const [canvasSize, setCanvasSize] = useState(getCanvasSize());

    // 使用useMemo缓存faces配置 - 基于传入的sections
    const faces = useMemo(() => {
        if (!sections || sections.length === 0) {
            // 如果没有传入sections，使用默认配置 - 确保包含所有6个section
            return [
                { name: 'home', label: content.navigation?.home || 'Home', color: '#afcc8f', effect: 'effectgalaxy', icon: '🏠', video: '/video.mp4' },
                { name: 'about', label: content.navigation?.about || 'About', color: '#7ca65c', effect: 'effectlorenz', icon: '👤' },
                { name: 'projects', label: content.navigation?.projects || 'Projects', color: '#5d7d4b', effect: 'effectmonjori', icon: '💼' },
                { name: 'gallery', label: content.navigation?.gallery || 'Gallery', color: '#768e90', effect: 'effectheartbeats', icon: '🖼️' },
                { name: 'education', label: content.navigation?.education || 'Education', color: '#1d2012', effect: 'effectfuse', icon: '🎓' },
                { name: 'contact', label: content.navigation?.contact || 'Contact', color: '#94a3b8', effect: 'effectpixeldistortion', icon: '📧' }
            ];
        }
        
        // 使用传入的sections数据
        return sections.map(section => ({
            name: section.id,
            label: section.name.en,
            color: '#afcc8f',
            effect: section.backgroundEffect,
            icon: section.icon,
            video: section.cubeVideo, // 优先使用视频
            image: section.cubeImage  // 备用图片
        }));
    }, [sections, content.navigation]);

    // 监听窗口大小变化
    useEffect(() => {
        if (!isLandingPage) return;
        
        const handleResize = () => {
            setCanvasSize(getCanvasSize());
            // 如果是首页，同时更新渲染器尺寸
            if (mountRef.current?.firstChild) {
                const canvas = mountRef.current.firstChild;
                canvas.style.width = '100vw';
                canvas.style.height = '100vh';
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLandingPage, getCanvasSize]);

    // 添加页面切换时的3D旋转动画效果
    useEffect(() => {
        if (isLandingPage || !cubeRef.current) return;
        
        // 检查是否真的发生了切换
        if (previousSectionIdRef.current !== currentSectionId && previousSectionIdRef.current !== undefined) {
            // 停止之前的动画
            if (rotationAnimationRef.current) {
                rotationAnimationRef.current.kill();
            }
            
            const cube = cubeRef.current;
            
            // 计算当前页面对应的面索引
            const currentFaceIndex = faces.findIndex(face => face.name === currentSectionId);
            if (currentFaceIndex !== -1) {
                // 使用128度向上旋转角度，更加倾斜的戏剧性角度
                const baseRotationX = -Math.PI * 0.711; // 128° 向上旋转
                const baseRotationY = Math.PI * 0.25;  // 45° 对角显示
                
                // 修正面映射，确保每个section对应的面都显示在top部分（128度向上倾斜）
                // 基础角度：X轴向上倾斜128度，然后通过Y轴旋转来让不同面显示在顶部
                const faceRotations = [
                    { x: baseRotationX, y: baseRotationY, z: 0 },                          // home (index 0) - 正面在顶部
                    { x: baseRotationX, y: baseRotationY + Math.PI * 0.5, z: 0 },         // about (index 1) - 右面在顶部
                    { x: baseRotationX, y: baseRotationY + Math.PI, z: 0 },               // projects (index 2) - 背面在顶部  
                    { x: baseRotationX, y: baseRotationY - Math.PI * 0.5, z: 0 },         // gallery (index 3) - 左面在顶部
                    { x: baseRotationX, y: baseRotationY + Math.PI * 1.5, z: 0 },         // education (index 4) - 底面翻转到顶部 (270度)
                    { x: baseRotationX + Math.PI, y: baseRotationY, z: 0 }                // contact (index 5) - 顶面翻转到顶部 (180度X轴翻转)
                ];
                
                const targetRotation = faceRotations[currentFaceIndex] || faceRotations[0];
                
                // 获取当前旋转角度
                const currentRotation = {
                    x: cube.rotation.x,
                    y: cube.rotation.y,
                    z: cube.rotation.z
                };
                
                // 创建更自然的旋转动画：旋转2-3圈然后落到目标角度
                const spinCount = 2; // 旋转圈数
                rotationAnimationRef.current = gsap.timeline()
                    .to(cube.rotation, {
                        x: currentRotation.x + Math.PI * 2 * spinCount, // X轴旋转
                        y: currentRotation.y + Math.PI * 2 * spinCount, // Y轴旋转  
                        z: currentRotation.z + Math.PI * spinCount,     // Z轴旋转少一点
                        duration: 1.5,
                        ease: "power2.out"
                    })
                    .to(cube.rotation, {
                        x: targetRotation.x,
                        y: targetRotation.y,
                        z: targetRotation.z,
                        duration: 0.8,
                        ease: "back.out(1.7)" // 更强的回弹效果
                    });
            }
        }
        
        // 更新前一个section记录
        previousSectionIdRef.current = currentSectionId;
    }, [currentSectionId, isLandingPage, faces]);

    useEffect(() => {
        const mountElement = mountRef.current;
        if (!mountElement) return;

        // 创建场景
        const scene = new THREE.Scene();

        // 创建相机 - 调整视角以获得更好的立体感
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000); // 增加FOV到50度
        camera.position.z = isLandingPage ? 10 : 8.5; // 首页摄像机调得更远，让cube显示更小

        // 创建渲染器 - 恢复高质量设置
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true, // 恢复抗锯齿
            powerPreference: "high-performance",
            precision: "mediump", // 中等精度
            stencil: false,
            depth: true,
            premultipliedAlpha: false
        });
        // 设置透明背景，确保不遮挡其他元素
        renderer.setClearColor(0x000000, 0); // 透明背景
        renderer.setSize(canvasSize, canvasSize);
        renderer.setClearColor(0x000000, 0);
        // 恢复正常像素比
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // 确保canvas完全填满容器 - 在首页时全屏显示
        if (isLandingPage) {
            renderer.domElement.style.position = 'fixed';
            renderer.domElement.style.top = '0';
            renderer.domElement.style.left = '0';
            renderer.domElement.style.width = '100vw';
            renderer.domElement.style.height = '100vh';
            renderer.domElement.style.display = 'block';
            renderer.domElement.style.zIndex = '10'; // 在背景之上，文字之下
            renderer.domElement.style.pointerEvents = 'auto';
            // 更新渲染器尺寸为全屏
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        
        // 恢复渲染质量
        renderer.shadowMap.enabled = false; // 保持关闭阴影以平衡性能
        renderer.physicallyCorrectLights = false;
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // 恢复色调映射
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        mountElement.appendChild(renderer.domElement);

        // 简化光照系统以提高性能，但为非首页增强立体感
        // 环境光 - 提供基础照明
        const ambientLightIntensity = isLandingPage ? 0.5 : 0.4; // 非首页降低环境光，增强对比
        const ambientLight = new THREE.AmbientLight(0xffffff, ambientLightIntensity);
        scene.add(ambientLight);
        
        // 主要方向光
        const mainLightIntensity = isLandingPage ? 0.8 : 1.0; // 非首页增强主光源
        const mainLight = new THREE.DirectionalLight(0xffffff, mainLightIntensity);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);
        
        // 为非首页添加额外的侧面光源增强立体感
        if (!isLandingPage) {
            const sideLight = new THREE.DirectionalLight(0xffffff, 0.6);
            sideLight.position.set(-3, 2, 3);
            scene.add(sideLight);
            
            const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
            backLight.position.set(0, -2, -3);
            scene.add(backLight);
        }

        // 创建圆角立方体几何体 - 根据页面类型调整尺寸
        const cubeSize = isLandingPage ? 2.8 : 3.0; // 非首页使用更大的cube尺寸
        const geometry = new RoundedBoxGeometry(cubeSize, cubeSize, cubeSize, 8, 0.1); // 增加segments和圆角半径提高质量
        
        // 创建棋盘格默认纹理的函数
        const createCheckerboardTexture = (size = 256) => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext('2d');
            
            const squareSize = size / 8; // 8x8 棋盘格
            
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    // 交替黑白色
                    context.fillStyle = (i + j) % 2 === 0 ? '#333333' : '#666666';
                    context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
                }
            }
            
            // 添加一个简单的"VIDEO ERROR"文本
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

        // 为每个面创建材质 - 恢复高质量纹理
        const materials = faces.map((face) => {
            // 如果是视频贴图
            if (face.video) {
                // 创建默认的棋盘格纹理作为备用
                const fallbackTexture = createCheckerboardTexture(isLandingPage ? 256 : 128);
                
                const video = document.createElement('video');
                video.src = face.video;
                video.crossOrigin = 'anonymous';
                video.loop = true;
                video.muted = true;
                video.autoplay = true;
                video.playsInline = true;
                
                // 创建材质，初始使用棋盘格纹理
                const material = new THREE.MeshPhysicalMaterial({
                    map: fallbackTexture,
                    transparent: true,
                    opacity: 0.9,
                    transmission: 0.2,
                    roughness: 0.1,
                    metalness: 0.05,
                    reflectivity: 0.8,
                    clearcoat: 0.8,
                    clearcoatRoughness: 0.1,
                    ior: 1.52,
                    thickness: 1.0,
                    side: THREE.DoubleSide,
                    iridescence: 0.1,
                    iridescenceIOR: 1.3,
                    iridescenceThicknessRange: [100, 400],
                    envMapIntensity: 1.5,
                    specularIntensity: 1.0,
                    specularColor: new THREE.Color(0xffffff)
                });
                
                // 视频加载成功后切换到视频纹理
                const switchToVideoTexture = () => {
                    try {
                        const videoTexture = new THREE.VideoTexture(video);
                        videoTexture.minFilter = THREE.LinearFilter;
                        videoTexture.magFilter = THREE.LinearFilter;
                        videoTexture.format = THREE.RGBFormat;
                        
                        // 替换材质贴图
                        if (material.map && material.map !== fallbackTexture) {
                            material.map.dispose();
                        }
                        material.map = videoTexture;
                        material.needsUpdate = true;
                        
                        console.log('✅ Video texture loaded successfully for home face');
                    } catch (error) {
                        console.warn('❌ Failed to create video texture, using fallback:', error);
                        // 保持使用棋盘格纹理
                    }
                };
                
                // 视频加载事件监听
                video.addEventListener('loadeddata', switchToVideoTexture);
                video.addEventListener('canplay', switchToVideoTexture);
                
                // 错误处理
                video.addEventListener('error', (e) => {
                    console.warn('❌ Video loading failed, using checkerboard fallback:', e);
                    // 保持使用棋盘格纹理，不做任何操作
                });
                
                // 尝试播放视频
                video.play().then(() => {
                    console.log('🎬 Video playback started');
                }).catch((error) => {
                    console.warn('❌ Video autoplay failed, using fallback:', error);
                    // 即使播放失败，如果视频数据已加载，纹理仍然可以工作
                });
                
                return material;
            }
            
            // 原有的Canvas纹理逻辑
            const canvas = document.createElement('canvas');
            const textureSize = isLandingPage ? 256 : 192; // 非首页提高纹理质量到192px
            canvas.width = textureSize;
            canvas.height = textureSize;
            const context = canvas.getContext('2d');
            
            // 绘制背景色彩
            context.clearRect(0, 0, textureSize, textureSize);
            
            // 绘制适度的背景
            const gradient = context.createRadialGradient(
                textureSize / 2, textureSize / 2, 0,
                textureSize / 2, textureSize / 2, textureSize / 2
            );
            gradient.addColorStop(0, `${face.color}25`); // 适中的不透明度
            gradient.addColorStop(0.6, `${face.color}15`);
            gradient.addColorStop(1, `${face.color}08`);
            context.fillStyle = gradient;
            context.fillRect(0, 0, textureSize, textureSize);
            
            // 绘制简单边框
            context.strokeStyle = `${face.color}60`;
            context.lineWidth = 2;
            const border = textureSize * 0.05;
            context.strokeRect(border, border, textureSize - border * 2, textureSize - border * 2);
            
            // 添加轻微的反光效果
            const reflectGradient = context.createLinearGradient(0, 0, textureSize, textureSize);
            reflectGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
            reflectGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
            reflectGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            context.fillStyle = reflectGradient;
            context.fillRect(0, 0, textureSize / 3, textureSize);
            
            // 绘制图标或图片
            if (face.image) {
                // 如果有图片，创建图片元素并绘制
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    // 按图片实际尺寸铺满整个面（保持宽高比，裁剪填充）
                    context.save();
                    
                    // 计算缩放比例，确保图片能完全覆盖纹理
                    const scaleX = textureSize / img.width;
                    const scaleY = textureSize / img.height;
                    const scale = Math.max(scaleX, scaleY); // 使用较大的缩放比例确保填满
                    
                    // 计算缩放后的图片尺寸
                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;
                    
                    // 计算居中位置
                    const x = (textureSize - scaledWidth) / 2;
                    const y = (textureSize - scaledHeight) / 2;
                    
                    // 绘制图片，完全铺满
                    context.drawImage(img, x, y, scaledWidth, scaledHeight);
                    context.restore();
                    
                    // 添加轻微的遮罩层让文字更清晰
                    context.save();
                    context.fillStyle = 'rgba(0, 0, 0, 0.2)';
                    context.fillRect(0, 0, textureSize, textureSize);
                    context.restore();
                    
                    // 在图片上绘制文字（可选，如果需要的话）
                    if (isLandingPage) {
                        const fontSize = 24;
                        context.font = `bold ${fontSize}px "Helvetica Neue", Arial`;
                        context.shadowColor = 'rgba(0, 0, 0, 0.9)';
                        context.shadowBlur = 8;
                        context.fillStyle = '#ffffff';
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        context.fillText(face.label, textureSize / 2, textureSize - 30);
                    }
                    
                    // 更新纹理
                    texture.needsUpdate = true;
                };
                img.src = face.image;
            } else {
                // 没有图片时，绘制图标
                const iconSize = isLandingPage ? 90 : 36;
                context.font = `${iconSize}px "Segoe UI Emoji", Arial`;
                
                // 创建文字阴影效果
                context.shadowColor = 'rgba(0, 0, 0, 0.5)';
                context.shadowBlur = 4;
                context.shadowOffsetX = 2;
                context.shadowOffsetY = 2;
                
                context.fillStyle = '#ffffff';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(face.icon || '■', textureSize / 2, textureSize / 2 - 50);
                
                // 重置阴影
                context.shadowColor = 'transparent';
                context.shadowBlur = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                
                // 绘制文字 - 增强对比度（仅在没有图片时）
                const fontSize = isLandingPage ? 36 : 20;
                context.font = `bold ${fontSize}px "Helvetica Neue", Arial`;
                
                // 文字外发光效果
                context.shadowColor = 'rgba(0, 0, 0, 0.8)';
                context.shadowBlur = 6;
                context.fillStyle = '#ffffff';
                context.fillText(face.label, textureSize / 2, textureSize / 2 + 60);
                
                // 重置阴影
                context.shadowColor = 'transparent';
                context.shadowBlur = 0;
            }
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            texture.generateMipmaps = true; // 恢复mipmap生成
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            
            return new THREE.MeshPhysicalMaterial({ // 恢复高质量材质
                map: texture,
                transparent: true,
                opacity: 0.85,
                transmission: 0.3, // 恢复透射效果
                roughness: 0.1,
                metalness: 0.05,
                reflectivity: 0.8,
                clearcoat: 0.8,
                clearcoatRoughness: 0.1,
                ior: 1.52,
                thickness: 1.0,
                side: THREE.DoubleSide, // 恢复双面渲染
                iridescence: 0.1, // 恢复彩虹效果
                iridescenceIOR: 1.3,
                iridescenceThicknessRange: [100, 400],
                envMapIntensity: 1.5,
                specularIntensity: 1.0,
                specularColor: new THREE.Color(0xffffff)
            });
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
        cube.add(wireframe); // 将线框作为cube的子对象

        // 震撼开场动画 (仅首页且开启开场动画)
        if (isLandingPage && enableOpeningAnimation) {
            // 设置cube初始状态 - 从远处快速飞入
            cube.position.set(0, 0, -80); // 从更远处开始
            cube.scale.set(0.05, 0.05, 0.05); // 从更小开始
            cube.rotation.set(0, 0, 0);
            
            // 创建震撼开场动画序列 - 摄像机穿越每个面版本
            openingAnimationRef.current = gsap.timeline({
                onComplete: () => {
                    if (onAnimationComplete) {
                        onAnimationComplete();
                    }
                }
            })
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
                
                // 阶段2: 摄像机穿越展示每个面 (2.5-14.5s) - 进一步放慢展示速度
                // 面1: Home面 (正面) - 2.5-4.5s
                .to(cube.rotation, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.5, // 进一步增加到1.5秒，更慢的旋转让用户看清纹理
                    ease: "power2.inOut"
                }, 2.5)
                .to(camera.position, {
                    z: 4, // 摄像机靠近
                    duration: 0.8, // 进一步增加到0.8秒，更慢的摄像机移动
                    ease: "power2.out"
                }, 3.2)
                
                // 面2: About面 (右面) - 4.5-6.5s
                .to(cube.rotation, {
                    x: 0,
                    y: -Math.PI * 0.5, // 90度显示右面
                    z: 0,
                    duration: 1.5, // 进一步放慢旋转速度
                    ease: "power2.inOut"
                }, 4.5)
                .to(camera.position, {
                    z: 3.5, // 更近距离特写
                    duration: 0.8, // 进一步放慢摄像机移动
                    ease: "power2.out"
                }, 5.3)
                
                // 面3: Projects面 (背面) - 6.5-8.5s
                .to(cube.rotation, {
                    x: 0,
                    y: -Math.PI, // 180度显示背面
                    z: 0,
                    duration: 1.5, // 进一步放慢旋转速度
                    ease: "power2.inOut"
                }, 6.5)
                .to(camera.position, {
                    z: 4,
                    duration: 0.8, // 进一步放慢摄像机移动
                    ease: "power2.out"
                }, 7.3)
                
                // 面4: Gallery面 (左面) - 8.5-10.5s
                .to(cube.rotation, {
                    x: 0,
                    y: -Math.PI * 1.5, // 270度显示左面
                    z: 0,
                    duration: 1.5, // 进一步放慢旋转速度
                    ease: "power2.inOut"
                }, 8.5)
                .to(camera.position, {
                    z: 3.5,
                    duration: 0.8, // 进一步放慢摄像机移动
                    ease: "power2.out"
                }, 9.3)
                
                // 面5: Education面 (底面) - 10.5-12.5s
                .to(cube.rotation, {
                    x: Math.PI * 0.5, // 向上翻转显示底面
                    y: -Math.PI * 1.5,
                    z: 0,
                    duration: 1.5, // 进一步放慢旋转速度
                    ease: "power2.inOut"
                }, 10.5)
                .to(camera.position, {
                    z: 4,
                    duration: 0.8, // 进一步放慢摄像机移动
                    ease: "power2.out"
                }, 11.3)
                
                // 面6: Contact面 (顶面) - 12.5-14.5s
                .to(cube.rotation, {
                    x: -Math.PI * 0.5, // 向下翻转显示顶面
                    y: -Math.PI * 1.5,
                    z: 0,
                    duration: 1.5, // 进一步放慢旋转速度
                    ease: "power2.inOut"
                }, 12.5)
                .to(camera.position, {
                    z: 3.5,
                    duration: 0.8, // 进一步放慢摄像机移动
                    ease: "power2.out"
                }, 13.3)
                
                // 阶段3: 疯狂旋转放大 (14.5-16.5s) - 调整开始时间
                .to(camera.position, {
                    z: 10, // 摄像机拉远
                    duration: 0.5,
                    ease: "power2.in"
                }, 14.5)
                .to(cube.scale, {
                    x: 12, // 大幅放大
                    y: 12,
                    z: 12,
                    duration: 2.0,
                    ease: "power3.in"
                }, 14.5)
                .to(cube.rotation, {
                    x: cube.rotation.x + Math.PI * 4, // 疯狂旋转
                    y: cube.rotation.y + Math.PI * 6,
                    z: cube.rotation.z + Math.PI * 3,
                    duration: 2.0,
                    ease: "power2.out"
                }, 14.5)
                
                // 阶段4: 平滑回缩，对角线旋转开始 (16.5-19s) - 调整开始时间
                .to(cube.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 2.5,
                    ease: "power3.out" // 更平滑的缓出
                }, 16.5)
                .to(camera.position, {
                    z: 10, // 保持远距离
                    duration: 2.5,
                    ease: "power2.out"
                }, 16.5)
                // 开始对角线旋转 - 丝滑过渡
                .to(cube.rotation, {
                    x: cube.rotation.x + Math.PI * 1.5, // 对角线转动
                    y: cube.rotation.y + Math.PI * 1.8,
                    z: cube.rotation.z + Math.PI * 1.2,
                    duration: 2.5,
                    ease: "sine.inOut" // 正弦曲线，最丝滑的过渡
                }, 16.5)
                
                // 阶段5: 继续平滑旋转，逐步到位 (19-21s) - 调整开始时间
                .to(cube.scale, {
                    x: 1.05,
                    y: 1.05,
                    z: 1.05,
                    duration: 2.0,
                    ease: "power2.out"
                }, 19)
                .to(cube.rotation, {
                    x: -Math.PI * 0.81, // 最终角度：135度向上旋转显示顶面
                    y: Math.PI * 0.25,  // 45度让角正对摄像机
                    z: 0,
                    duration: 2.0,
                    ease: "power1.inOut" // 更加线性平滑的过渡
                }, 19)
                
                // 阶段6: 最终丝滑弹跳 (21-22s) - 调整开始时间
                .to(cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.6,
                    ease: "power2.out"
                }, 21)
                .to(cube.scale, {
                    x: 1.08,
                    y: 1.08,
                    z: 1.08,
                    duration: 0.2,
                    ease: "power2.out"
                }, 21.6)
                .to(cube.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.3,
                    ease: "elastic.out(1.2, 0.4)" // 更柔和的弹性
                }, 21.8);
                
        } else if (isLandingPage) {
            // 普通首页显示 - 设置默认角度
            cube.rotation.set(-Math.PI * 0.81, Math.PI * 0.25, 0);
        }

        // 入场动画：720°旋转 (仅非首页)
        if (!isLandingPage) {
            // 设置初始旋转状态
            cube.rotation.set(0, 0, 0);
            
            // 创建720°旋转入场动画
            entryAnimationRef.current = gsap.timeline()
                .to(cube.rotation, {
                    x: Math.PI * 4, // 720°旋转
                    y: Math.PI * 4, // 720°旋转
                    z: Math.PI * 2, // 360°旋转
                    duration: 1.5,
                    ease: "power2.out"
                })
                .to(cube.rotation, {
                    // 旋转完成后，设置到当前section对应的正确角度
                    x: (() => {
                        const currentFaceIndex = faces.findIndex(face => face.name === currentSectionId);
                        if (currentFaceIndex !== -1) {
                            const baseRotationX = -Math.PI * 0.711; // 128° 向上旋转
                            const baseRotationY = Math.PI * 0.25;  // 45° 对角显示
                            const faceRotations = [
                                { x: baseRotationX, y: baseRotationY, z: 0 },                          // home (index 0) - 正面在顶部
                                { x: baseRotationX, y: baseRotationY + Math.PI * 0.5, z: 0 },         // about (index 1) - 右面在顶部
                                { x: baseRotationX, y: baseRotationY + Math.PI, z: 0 },               // projects (index 2) - 背面在顶部  
                                { x: baseRotationX, y: baseRotationY - Math.PI * 0.5, z: 0 },         // gallery (index 3) - 左面在顶部
                                { x: baseRotationX, y: baseRotationY + Math.PI * 1.5, z: 0 },         // education (index 4) - 底面翻转到顶部 (270度)
                                { x: baseRotationX + Math.PI, y: baseRotationY, z: 0 }                // contact (index 5) - 顶面翻转到顶部 (180度X轴翻转)
                            ];
                            return faceRotations[currentFaceIndex]?.x || baseRotationX;
                        }
                        return -Math.PI * 0.711;
                    })(),
                    y: (() => {
                        const currentFaceIndex = faces.findIndex(face => face.name === currentSectionId);
                        if (currentFaceIndex !== -1) {
                            const baseRotationX = -Math.PI * 0.711; // 128° 向上旋转
                            const baseRotationY = Math.PI * 0.25;  // 45° 对角显示
                            const faceRotations = [
                                { x: baseRotationX, y: baseRotationY, z: 0 },                          // home (index 0) - 正面在顶部
                                { x: baseRotationX, y: baseRotationY + Math.PI * 0.5, z: 0 },         // about (index 1) - 右面在顶部
                                { x: baseRotationX, y: baseRotationY + Math.PI, z: 0 },               // projects (index 2) - 背面在顶部  
                                { x: baseRotationX, y: baseRotationY - Math.PI * 0.5, z: 0 },         // gallery (index 3) - 左面在顶部
                                { x: baseRotationX, y: baseRotationY + Math.PI * 1.5, z: 0 },         // education (index 4) - 底面翻转到顶部 (270度)
                                { x: baseRotationX + Math.PI, y: baseRotationY, z: 0 }                // contact (index 5) - 顶面翻转到顶部 (180度X轴翻转)
                            ];
                            return faceRotations[currentFaceIndex]?.y || baseRotationY;
                        }
                        return Math.PI * 0.25;
                    })(),
                    z: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
        }

        // 鼠标交互
        // 移除raycaster，因为不再需要悬停检测
        
        // 全局鼠标移动监听 (只在landing page启用)
        const handleGlobalMouseMove = (event) => {
            if (!isLandingPage) return;
            
            // 更新鼠标位置
            const newMouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const newMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            // 计算鼠标移动速度
            const currentTime = performance.now();
            const deltaTime = Math.max(currentTime - lastFrameTimeRef.current, 1);
            
            const mouseDeltaX = newMouseX - lastMousePosRef.current.x;
            const mouseDeltaY = newMouseY - lastMousePosRef.current.y;
            
            // 计算速度 (像素/秒)
            mouseVelocityRef.current.x = mouseDeltaX / (deltaTime * 0.001);
            mouseVelocityRef.current.y = mouseDeltaY / (deltaTime * 0.001);
            
            // 更新位置记录
            mouseRef.current.x = newMouseX;
            mouseRef.current.y = newMouseY;
            lastMousePosRef.current = { x: newMouseX, y: newMouseY };
            lastFrameTimeRef.current = currentTime;
        };

        // 拖拽相关的事件处理
        const handleMouseDown = (event) => {
            if (!isLandingPage) return;
            isDraggingRef.current = true;
            hasBeenDraggedRef.current = true; // 标记已被拖拽
            lastMouseRef.current = { x: event.clientX, y: event.clientY };
            document.body.style.cursor = 'grabbing';
        };

        const handleMouseMove = (event) => {
            // 只处理拖拽旋转，移除悬停检测
            if (isDraggingRef.current && isLandingPage) {
                const deltaX = event.clientX - lastMouseRef.current.x;
                const deltaY = event.clientY - lastMouseRef.current.y;
                
                cube.rotation.y += deltaX * 0.01;
                cube.rotation.x += deltaY * 0.01;
                
                lastMouseRef.current = { x: event.clientX, y: event.clientY };
            }
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            document.body.style.cursor = 'default';
        };

        // 添加事件监听 - 只包含拖拽功能，移除点击导航
        if (isLandingPage) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            renderer.domElement.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            renderer.domElement.addEventListener('mousemove', handleMouseMove);
        }

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            
            if (isLandingPage) {
                // 物理参数
                const currentTime = performance.now();
                const deltaTime = Math.min((currentTime - lastFrameTimeRef.current) * 0.001, 0.02); // 限制最大时间步长
                lastFrameTimeRef.current = currentTime;
                
                // Landing page: 鼠标控制旋转 (仅在非拖拽状态且未被用户拖拽过)
                if (!isDraggingRef.current && !hasBeenDraggedRef.current) {
                    // 初始状态：让一个角正对摄像机，并向上旋转135度显示顶面
                    const baseTargetRotationY = mouseRef.current.x * 0.1 + Math.PI * 0.25; // 45度让角正对摄像机
                    const baseTargetRotationX = mouseRef.current.y * 0.05 - Math.PI * 0.81; // 135度向上旋转显示顶面
                    
                    // 结合基础旋转和物理晃动旋转
                    const finalRotationX = baseTargetRotationX + cubeRotationOffsetRef.current.x;
                    const finalRotationY = baseTargetRotationY + cubeRotationOffsetRef.current.y;
                    const finalRotationZ = cubeRotationOffsetRef.current.z;
                    
                    cube.rotation.x += (finalRotationX - cube.rotation.x) * 0.02;
                    cube.rotation.y += (finalRotationY - cube.rotation.y) * 0.02;
                    cube.rotation.z += (finalRotationZ - cube.rotation.z) * 0.02;
                    
                    // 非常缓慢的自动旋转作为基础
                    cube.rotation.y += 0.001;
                } else if (!isDraggingRef.current && hasBeenDraggedRef.current) {
                    // 用户拖拽后：保持当前旋转，但仍然应用物理晃动的旋转
                    cube.rotation.x += cubeRotationOffsetRef.current.x * 0.02;
                    cube.rotation.y += cubeRotationOffsetRef.current.y * 0.02;
                    cube.rotation.z += cubeRotationOffsetRef.current.z * 0.02;
                }
                
                // 旋转晃动效果 - 立方体保持中心位置固定
                if (deltaTime > 0) {
                    // 物理常数 - 专注于旋转晃动
                    const springStrength = 12.0;    // 增强弹簧强度
                    const damping = 0.88;           // 稍微增加阻尼系数
                    const rotationSensitivity = 2.5; // 大幅增强旋转灵敏度
                    const maxRotationOffset = 1.2;   // 增大最大旋转偏移 (约70度)
                    
                    // 基于鼠标移动方向的旋转力 - 增强效果
                    const rotationForceX = mouseVelocityRef.current.y * rotationSensitivity; // 上下移动影响X轴旋转
                    const rotationForceY = -mouseVelocityRef.current.x * rotationSensitivity; // 左右移动影响Y轴旋转 (反向更自然)
                    const rotationForceZ = (mouseVelocityRef.current.x + mouseVelocityRef.current.y) * rotationSensitivity * 0.4; // 混合影响Z轴旋转
                    
                    // 旋转弹簧力 - 回到中心旋转状态
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
                    const floatY = Math.sin(currentTime * 0.001) * 0.05; // 基础浮动
                    cube.position.set(0, floatY, 0); // 立方体保持在中心位置
                    
                    // 减慢鼠标速度 (自然衰减)
                    mouseVelocityRef.current.x *= 0.92;
                    mouseVelocityRef.current.y *= 0.92;
                }
            } else {
                // 非首页: 作为静态页面指示器，显示当前页面对应的面
                if (currentSectionId) {
                    // 计算当前页面对应的面索引
                    const currentFaceIndex = faces.findIndex(face => face.name === currentSectionId);
                    if (currentFaceIndex !== -1) {
                        // 使用128度向上旋转角度，更加倾斜的戏剧性角度
                        const baseRotationX = -Math.PI * 0.711; // 128° 向上旋转
                        const baseRotationY = Math.PI * 0.25;  // 45° 对角显示
                        
                        // 修正面映射，确保每个section对应的面都显示在top部分（128度向上倾斜）
                        // 基础角度：X轴向上倾斜128度，然后通过Y轴旋转来让不同面显示在顶部
                        const faceRotations = [
                            { x: baseRotationX, y: baseRotationY, z: 0 },                          // home (index 0) - 正面在顶部
                            { x: baseRotationX, y: baseRotationY + Math.PI * 0.5, z: 0 },         // about (index 1) - 右面在顶部
                            { x: baseRotationX, y: baseRotationY + Math.PI, z: 0 },               // projects (index 2) - 背面在顶部  
                            { x: baseRotationX, y: baseRotationY - Math.PI * 0.5, z: 0 },         // gallery (index 3) - 左面在顶部
                            { x: baseRotationX, y: baseRotationY + Math.PI * 1.5, z: 0 },         // education (index 4) - 底面翻转到顶部 (270度)
                            { x: baseRotationX + Math.PI, y: baseRotationY, z: 0 }                // contact (index 5) - 顶面翻转到顶部 (180度X轴翻转)
                        ];
                        
                        const targetRotation = faceRotations[currentFaceIndex] || faceRotations[0];
                        
                        // 立即设置到目标旋转，不使用过渡动画
                        cube.rotation.x = targetRotation.x;
                        cube.rotation.y = targetRotation.y;
                        cube.rotation.z = targetRotation.z;
                    }
                }
                
                // 保持cube在canvas中心位置
                cube.position.set(0, 0, 0);
            }
            
            renderer.render(scene, camera);
        };
        
        animate();

        // 清理函数
        return () => {
            // 停止所有GSAP动画
            if (rotationAnimationRef.current) {
                rotationAnimationRef.current.kill();
            }
            if (entryAnimationRef.current) {
                entryAnimationRef.current.kill();
            }
            if (openingAnimationRef.current) {
                openingAnimationRef.current.kill();
            }
            
            if (mountElement && renderer.domElement) {
                mountElement.removeChild(renderer.domElement);
            }
            if (isLandingPage) {
                window.removeEventListener('mousemove', handleGlobalMouseMove);
                renderer.domElement.removeEventListener('mousedown', handleMouseDown);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            } else {
                renderer.domElement.removeEventListener('mousemove', handleMouseMove);
            }
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
            document.body.style.cursor = 'default';
        };
    }, [faces, isLandingPage, canvasSize, onSectionChange, currentSectionId, enableOpeningAnimation, onAnimationComplete]); // 添加所有依赖项

    return (
        <div 
            ref={mountRef}
            className={`transition-all duration-300 m-0 p-0 ${
                isLandingPage 
                    ? 'fixed inset-0 z-10 w-full h-full overflow-hidden' // 首页时固定全屏，z-index 10
                    : 'w-full h-full flex items-center justify-center'
            }`}
            style={!isLandingPage ? {
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))', // 适度阴影
                overflow: 'visible',
                zIndex: 9999,
                pointerEvents: 'auto'
            } : {
                pointerEvents: 'auto'
            }}
        />
    );
};

NavigationCube.propTypes = {
    isLandingPage: PropTypes.bool,
    onSectionChange: PropTypes.func,
    sections: PropTypes.array,
    currentSectionId: PropTypes.string,
    enableOpeningAnimation: PropTypes.bool,
    onAnimationComplete: PropTypes.func
};

export default NavigationCube;
