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
    // 移除isHovering状态，因为cube现在只是显示指示器
    
    const { getContent } = useAppStore();
    const content = getContent();

    // 根据是否在landing page和屏幕大小调整大小
    const getCanvasSize = useCallback(() => {
        if (!isLandingPage) return 120;
        // 在landing page时使用300px容器，与头像容器尺寸一致
        return 300; // 调整canvas尺寸与头像容器一致
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

        // 创建相机 - 在300px画布中渲染合适大小的立方体
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = isLandingPage ? 5 : 3; // 调整距离使立方体大小与头像相当

        // 创建渲染器 - 优化设置以提高性能
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false, // 关闭抗锯齿以提高性能
            powerPreference: "high-performance"
        });
        renderer.setSize(canvasSize, canvasSize);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // 确保canvas完全填满容器
        if (isLandingPage) {
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';
            renderer.domElement.style.display = 'block';
            renderer.domElement.style.objectFit = 'fill'; // 确保填充整个容器
        }
        
        // 简化渲染设置以提高性能
        renderer.shadowMap.enabled = false; // 关闭阴影以提高性能
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
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

        // 创建圆角立方体几何体 - 调整尺寸让它在300px容器中看起来与头像一样大
        const geometry = new RoundedBoxGeometry(2.2, 2.2, 2.2, 7, 0.1);
        
        // 为每个面创建不同的材质 - 玻璃透明效果
        const materials = faces.map((face) => {
            // 创建canvas纹理
            const canvas = document.createElement('canvas');
            const textureSize = isLandingPage ? 512 : 256;
            canvas.width = textureSize;
            canvas.height = textureSize;
            const context = canvas.getContext('2d');
            
            // 绘制透明背景
            context.clearRect(0, 0, textureSize, textureSize);
            
            // 绘制极轻微的背景色彩，主要靠材质透明
            const gradient = context.createRadialGradient(
                textureSize / 2, textureSize / 2, 0,
                textureSize / 2, textureSize / 2, textureSize / 2
            );
            gradient.addColorStop(0, `${face.color}15`); // 降低到15% opacity
            gradient.addColorStop(0.7, `${face.color}08`); // 降低到8% opacity
            gradient.addColorStop(1, `${face.color}03`); // 降低到3% opacity
            context.fillStyle = gradient;
            context.fillRect(0, 0, textureSize, textureSize);
            
            // 绘制精细边框（更轻微）
            context.strokeStyle = '#ffffff15'; // 更透明的边框
            context.lineWidth = 2;
            const border = textureSize * 0.05;
            context.strokeRect(border, border, textureSize - border * 2, textureSize - border * 2);
            
            // 添加轻微的玻璃反光效果
            const reflectGradient = context.createLinearGradient(0, 0, textureSize, textureSize);
            reflectGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            reflectGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
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
            
            return new THREE.MeshPhysicalMaterial({ 
                map: texture,
                transparent: true,
                opacity: 0.4, // 更透明，像图片中的效果
                transmission: 0.95, // 极高的透射效果
                roughness: 0.02, // 极光滑的表面
                metalness: 0.0,
                reflectivity: 1.0, // 完美反射
                clearcoat: 1.0,
                clearcoatRoughness: 0.02, // 极光滑的清漆
                ior: 1.52, // 玻璃的折射率
                thickness: 1.0, // 增加厚度感
                side: THREE.DoubleSide,
                iridescence: 0.2, // 轻微彩虹效果
                iridescenceIOR: 1.3,
                iridescenceThicknessRange: [100, 800],
                envMapIntensity: 2.0, // 强化环境反射
                // 增加更多物理属性
                attenuationColor: new THREE.Color(face.color),
                attenuationDistance: 0.5,
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
            
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
                // Landing page: 鼠标控制旋转 (仅在非拖拽状态且未被用户拖拽过)
                if (!isDraggingRef.current && !hasBeenDraggedRef.current) {
                    // 初始状态：显示一个好看的角度，微弱跟随鼠标
                    const targetRotationY = mouseRef.current.x * 0.1 + Math.PI * 0.25; // 默认45度角度
                    const targetRotationX = mouseRef.current.y * 0.05 - Math.PI * 0.1; // 稍微向下倾斜
                    
                    cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.02;
                    cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.02;
                    
                    // 非常缓慢的自动旋转作为基础
                    cube.rotation.y += 0.001;
                } else if (!isDraggingRef.current && hasBeenDraggedRef.current) {
                    // 用户拖拽后：保持当前旋转，只有轻微的浮动
                    // 不做任何旋转变化，保持用户最后设置的角度
                }
                
                // 添加浮动效果 (所有状态都有)
                cube.position.y = Math.sin(Date.now() * 0.001) * 0.05; // 减小浮动幅度
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
