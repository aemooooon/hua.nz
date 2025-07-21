import { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useApp } from '../contexts/AppContext';

const NavigationCube = () => {
    const mountRef = useRef();
    const cubeRef = useRef();
    const [isHovering, setIsHovering] = useState(false);
    
    const { activeSection, setActiveSection, switchEffect, content } = useApp();

    // 使用useMemo缓存faces配置
    const faces = useMemo(() => [
        { 
            name: 'home', 
            label: content.navigation.home, 
            color: '#afcc8f', 
            effect: 'effectfuse',
            icon: '🏠'
        },
        { 
            name: 'projects', 
            label: content.navigation.projects, 
            color: '#7ca65c', 
            effect: 'effectmonjori',
            icon: '💼'
        },
        { 
            name: 'gallery', 
            label: content.navigation.gallery, 
            color: '#5d7d4b', 
            effect: 'effectheartbeats',
            icon: '🖼️'
        },
        { 
            name: 'contact', 
            label: content.navigation.contact, 
            color: '#768e90', 
            effect: 'effectlorenz',
            icon: '📧'
        },
        { 
            name: 'about', 
            label: content.navigation.about, 
            color: '#1d2012', 
            effect: 'effectfuse',
            icon: '👤'
        },
        { 
            name: 'blog', 
            label: content.navigation.blog, 
            color: '#94a3b8', 
            effect: 'effectmonjori',
            icon: '✍️'
        }
    ], [content.navigation]);

    useEffect(() => {
        const mountElement = mountRef.current;
        if (!mountElement) return;

        // 创建场景
        const scene = new THREE.Scene();

        // 创建相机
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 3;

        // 创建渲染器
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(120, 120);
        renderer.setClearColor(0x000000, 0);
        mountElement.appendChild(renderer.domElement);

        // 创建立方体几何体
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        // 为每个面创建不同的材质
        const materials = faces.map((face) => {
            // 创建canvas纹理
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const context = canvas.getContext('2d');
            
            // 绘制背景
            const gradient = context.createLinearGradient(0, 0, 256, 256);
            gradient.addColorStop(0, face.color);
            gradient.addColorStop(1, face.color + '80');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 256, 256);
            
            // 绘制边框
            context.strokeStyle = activeSection === face.name ? '#ffffff' : '#ffffff60';
            context.lineWidth = activeSection === face.name ? 6 : 4;
            context.strokeRect(8, 8, 240, 240);
            
            // 绘制图标
            context.font = '32px Arial';
            context.fillStyle = '#ffffff';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(face.icon, 128, 100);
            
            // 绘制文字
            context.font = 'bold 18px Arial';
            context.fillText(face.label, 128, 140);
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            
            return new THREE.MeshBasicMaterial({ 
                map: texture,
                transparent: true,
                opacity: activeSection === face.name ? 1 : 0.8
            });
        });

        // 创建立方体
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        cubeRef.current = cube;

        // 鼠标交互
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        const handleMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(cube);
            
            if (intersects.length > 0) {
                setIsHovering(true);
                document.body.style.cursor = 'pointer';
            } else {
                setIsHovering(false);
                document.body.style.cursor = 'default';
            }
        };
        
        const handleClick = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(cube);
            
            if (intersects.length > 0) {
                const faceIndex = intersects[0].face.materialIndex;
                const selectedFace = faces[faceIndex];
                if (selectedFace) {
                    setActiveSection(selectedFace.name);
                    switchEffect(selectedFace.effect);
                }
            }
        };

        renderer.domElement.addEventListener('mousemove', handleMouseMove);
        renderer.domElement.addEventListener('click', handleClick);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            
            // 自动旋转
            if (!isHovering) {
                cube.rotation.x += 0.005;
                cube.rotation.y += 0.005;
            } else {
                cube.rotation.x += 0.002;
                cube.rotation.y += 0.002;
            }
            
            // 缩放效果
            const scale = isHovering ? 1.1 : 1;
            cube.scale.setScalar(scale);
            
            renderer.render(scene, camera);
        };
        
        animate();

        // 清理函数
        return () => {
            if (mountElement && renderer.domElement) {
                mountElement.removeChild(renderer.domElement);
            }
            renderer.domElement.removeEventListener('mousemove', handleMouseMove);
            renderer.domElement.removeEventListener('click', handleClick);
            geometry.dispose();
            materials.forEach(material => {
                if (material.map) material.map.dispose();
                material.dispose();
            });
            renderer.dispose();
            document.body.style.cursor = 'default';
        };
    }, [activeSection, isHovering, setActiveSection, switchEffect, faces]);

    return (
        <div 
            ref={mountRef}
            className="fixed top-6 right-6 z-50 transition-all duration-300"
            style={{
                filter: isHovering 
                    ? 'drop-shadow(0 0 20px rgba(175, 204, 143, 0.6))' 
                    : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                transform: isHovering ? 'scale(1.05)' : 'scale(1)'
            }}
        />
    );
};

export default NavigationCube;
