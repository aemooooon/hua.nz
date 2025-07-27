import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useAppStore } from '../store/useAppStore';

const NavigationCube = ({ isLandingPage = false, onSectionChange, sections = [] }) => {
    const mountRef = useRef();
    const cubeRef = useRef();
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
    
    // 移除isHovering状态，因为cube现在只是显示指示器
    
    const { getContent } = useAppStore();
    const content = getContent();

    // 根据是否在landing page和屏幕大小调整大小
    const getCanvasSize = useCallback(() => {
        if (!isLandingPage) return 120;
        // 在landing page时使用360px大尺寸
        return 360; // 调整canvas尺寸为360px
    }, [isLandingPage]);
    
    const [canvasSize, setCanvasSize] = useState(getCanvasSize());

    // 监听窗口大小变化
    useEffect(() => {
        if (!isLandingPage) return;
        
        const handleResize = () => {
            setCanvasSize(getCanvasSize());
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLandingPage, getCanvasSize]);

    // 使用useMemo缓存faces配置 - 基于传入的sections
    const faces = useMemo(() => {
        if (!sections || sections.length === 0) {
            // 如果没有传入sections，使用默认配置
            return [
                { name: 'home', label: content.navigation?.home || 'Home', color: '#afcc8f', effect: 'effectfuse', icon: '🏠' },
                { name: 'projects', label: content.navigation?.projects || 'Projects', color: '#7ca65c', effect: 'effectmonjori', icon: '💼' },
                { name: 'gallery', label: content.navigation?.gallery || 'Gallery', color: '#5d7d4b', effect: 'effectheartbeats', icon: '🖼️' },
                { name: 'contact', label: content.navigation?.contact || 'Contact', color: '#768e90', effect: 'effectlorenz', icon: '📧' },
                { name: 'about', label: content.navigation?.about || 'About', color: '#1d2012', effect: 'effectfuse', icon: '👤' },
                { name: 'blog', label: content.navigation?.blog || 'Blog', color: '#94a3b8', effect: 'effectmonjori', icon: '✍️' }
            ];
        }
        
        // 使用传入的sections数据
        return sections.map(section => ({
            name: section.id,
            label: section.name.en,
            color: '#afcc8f',
            effect: section.backgroundEffect,
            icon: section.icon,
            image: section.cubeImage
        }));
    }, [sections, content.navigation]);

    useEffect(() => {
        const mountElement = mountRef.current;
        if (!mountElement) return;

        // 创建场景
        const scene = new THREE.Scene();

        // 创建相机 - 在360px画布中渲染合适大小的立方体
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = isLandingPage ? 6 : 3; // 360px容器使用较远的距离

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
        renderer.setSize(canvasSize, canvasSize);
        renderer.setClearColor(0x000000, 0);
        // 恢复正常像素比
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // 确保canvas完全填满容器 - 恢复高质量显示
        if (isLandingPage) {
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
            renderer.domElement.style.display = 'block';
            renderer.domElement.style.objectFit = 'contain'; // 保持比例，高质量显示
        }
        
        // 恢复渲染质量
        renderer.shadowMap.enabled = false; // 保持关闭阴影以平衡性能
        renderer.physicallyCorrectLights = false;
        renderer.toneMapping = THREE.ACESFilmicToneMapping; // 恢复色调映射
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        mountElement.appendChild(renderer.domElement);

        // 简化光照系统以提高性能
        // 环境光 - 提供基础照明
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        // 主要方向光
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);

        // 创建圆角立方体几何体 - 恢复高质量
        const geometry = new RoundedBoxGeometry(2.8, 2.8, 2.8, 6, 0.08); // 恢复较高的segments和radius
        
        // 为每个面创建材质 - 恢复高质量纹理
        const materials = faces.map((face) => {
            // 创建canvas纹理 - 恢复较高分辨率
            const canvas = document.createElement('canvas');
            const textureSize = isLandingPage ? 256 : 128; // 适中的分辨率
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

        // 鼠标交互
        // 移除raycaster，因为不再需要悬停检测
        // const raycaster = new THREE.Raycaster();
        
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
        // 移除了click事件监听器，因为不再需要点击导航功能

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
                // 普通页面: 简单的自动旋转
                cube.rotation.x += 0.008;
                cube.rotation.y += 0.01;
                cube.rotation.z += 0.005;
            }
            
            // 移除缩放效果，因为不再有悬停检测
            // cube保持固定尺寸
            
            renderer.render(scene, camera);
        };
        
        animate();

        // 可选：添加光源可视化辅助器（仅在开发环境显示）
        // 注释掉以提高性能
        /*
        if (isLandingPage) {
            // 临时启用光源辅助器来查看效果
            const lightHelper = new THREE.DirectionalLightHelper(leftTopLight, 2);
            scene.add(lightHelper);
            
            const spotLightHelper = new THREE.SpotLightHelper(leftTopSpotLight);
            scene.add(spotLightHelper);
        }
        */

        // 清理函数
        return () => {
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
            // 移除了click事件监听器，因为不再需要点击导航功能
            geometry.dispose();
            materials.forEach(material => {
                if (material.map) material.map.dispose();
                material.dispose();
            });
            renderer.dispose();
            document.body.style.cursor = 'default';
        };
    }, [faces, isLandingPage, canvasSize, onSectionChange]); // 移除isHovering依赖

    return (
        <div 
            ref={mountRef}
            className={`transition-all duration-300 ${
                isLandingPage 
                    ? 'w-full h-full flex items-center justify-center' 
                    : 'fixed top-6 right-6 z-50'
            }`}
            style={!isLandingPage ? {
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))', // 移除悬停效果
                transform: 'scale(1)' // 固定缩放
            } : {}}
        />
    );
};

NavigationCube.propTypes = {
    isLandingPage: PropTypes.bool,
    onSectionChange: PropTypes.func,
    sections: PropTypes.array
};

export default NavigationCube;
