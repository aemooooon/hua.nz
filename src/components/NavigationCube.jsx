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
    const [isHovering, setIsHovering] = useState(false);
    
    const { getContent } = useAppStore();
    const content = getContent();

    // 根据是否在landing page和屏幕大小调整大小
    const getCanvasSize = useCallback(() => {
        if (!isLandingPage) return 120;
        // 响应式大小 - 与头像保持一致
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768 ? 300 : 400;
        }
        return 400;
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

        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = isLandingPage ? 4 : 3;

        // 创建渲染器 - 优化设置以提高性能
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: false, // 关闭抗锯齿以提高性能
            powerPreference: "high-performance"
        });
        renderer.setSize(canvasSize, canvasSize);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
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

        // 创建圆角立方体几何体
        const geometry = new RoundedBoxGeometry(2, 2, 2, 7, 0.1);
        
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
                    // 绘制图片作为背景（居中裁剪）
                    const imgSize = Math.min(textureSize * 0.8, 200);
                    const x = (textureSize - imgSize) / 2;
                    const y = (textureSize - imgSize) / 2;
                    
                    context.save();
                    context.globalAlpha = 0.8;
                    context.drawImage(img, x, y, imgSize, imgSize);
                    context.restore();
                    
                    // 在图片上绘制文字
                    const fontSize = isLandingPage ? 24 : 16;
                    context.font = `bold ${fontSize}px "Helvetica Neue", Arial`;
                    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
                    context.shadowBlur = 6;
                    context.fillStyle = '#ffffff';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillText(face.label, textureSize / 2, textureSize - 30);
                    
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
        const raycaster = new THREE.Raycaster();
        
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
            lastMouseRef.current = { x: event.clientX, y: event.clientY };
            document.body.style.cursor = 'grabbing';
        };

        const handleMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const mouse = new THREE.Vector2();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(cube);
            
            if (intersects.length > 0) {
                setIsHovering(true);
                document.body.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
            } else {
                setIsHovering(false);
                document.body.style.cursor = 'default';
            }

            // 处理拖拽旋转
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
            document.body.style.cursor = isHovering ? 'grab' : 'default';
        };
        
        const handleClick = (event) => {
            // 只有在没有拖拽的情况下才触发点击
            if (isDraggingRef.current) return;
            
            const rect = renderer.domElement.getBoundingClientRect();
            const mouse = new THREE.Vector2();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(cube);
            
            if (intersects.length > 0) {
                const faceIndex = intersects[0].face.materialIndex;
                const selectedFace = faces[faceIndex];
                if (selectedFace) {
                    // 使用新的回调函数或者回退到原来的方法
                    if (onSectionChange) {
                        onSectionChange(selectedFace.name);
                    } else {
                        // 通过props回调通知父组件切换section
                        if (onSectionChange) {
                            onSectionChange(selectedFace.index);
                        }
                    }
                }
            }
        };

        // 添加事件监听
        if (isLandingPage) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            renderer.domElement.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            renderer.domElement.addEventListener('mousemove', handleMouseMove);
        }
        renderer.domElement.addEventListener('click', handleClick);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            
            if (isLandingPage) {
                // Landing page: 鼠标控制旋转 (仅在非拖拽状态)
                if (!isDraggingRef.current) {
                    const targetRotationY = mouseRef.current.x * 0.3;
                    const targetRotationX = mouseRef.current.y * 0.2;
                    
                    cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.03;
                    cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.03;
                    
                    // 缓慢的自动旋转作为基础 - 更有趣的旋转模式
                    cube.rotation.y += 0.002;
                    cube.rotation.z += 0.001;
                }
                
                // 添加浮动效果
                cube.position.y = Math.sin(Date.now() * 0.001) * 0.1;
            } else {
                // 普通页面: 自动旋转
                if (!isHovering) {
                    cube.rotation.x += 0.008;
                    cube.rotation.y += 0.01;
                    cube.rotation.z += 0.005;
                } else {
                    cube.rotation.x += 0.003;
                    cube.rotation.y += 0.004;
                    cube.rotation.z += 0.002;
                }
            }
            
            // 缩放效果 - 更平滑的过渡
            const targetScale = isHovering ? 1.1 : 1;
            const currentScale = cube.scale.x;
            const newScale = currentScale + (targetScale - currentScale) * 0.1;
            cube.scale.setScalar(newScale);
            
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
            renderer.domElement.removeEventListener('click', handleClick);
            geometry.dispose();
            materials.forEach(material => {
                if (material.map) material.map.dispose();
                material.dispose();
            });
            renderer.dispose();
            document.body.style.cursor = 'default';
        };
    }, [isHovering, faces, isLandingPage, canvasSize, onSectionChange]);

    return (
        <div 
            ref={mountRef}
            className={`transition-all duration-300 ${
                isLandingPage 
                    ? 'w-full h-full flex items-center justify-center' 
                    : 'fixed top-6 right-6 z-50'
            }`}
            style={!isLandingPage ? {
                filter: isHovering 
                    ? 'drop-shadow(0 0 20px rgba(175, 204, 143, 0.6))' 
                    : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                transform: isHovering ? 'scale(1.05)' : 'scale(1)'
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
