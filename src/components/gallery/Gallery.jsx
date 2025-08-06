import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useAppStore } from '../../../store/useAppStore';
import PhotoSwipeGallery from './PhotoSwipeGallery';

const Gallery = ({ isOpen, onClose, language = 'en' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isPhotoSwipeOpen, setIsPhotoSwipeOpen] = useState(false);
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const controlsRef = useRef(null);
    const animationFrameRef = useRef(null);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());

    // 获取 gallery 数据
    const galleryData = useAppStore(state => state.gallery);
    const galleryDataRef = useRef(galleryData);
    
    // 更新ref当数据变化时
    useEffect(() => {
        galleryDataRef.current = galleryData;
    }, [galleryData]);

    // 使用useRef来存储稳定的函数引用，避免依赖循环
    const initSceneRef = useRef(null);
    const cleanupSceneRef = useRef(null);

    // 存储画廊球体的引用
    const previewSphere = useRef(null);
    const galleryGridSpheres = useRef([]);

    // 初始化场景函数
    initSceneRef.current = async () => {
        const currentGalleryData = galleryDataRef.current;
        if (!canvasRef.current || !currentGalleryData || isInitializedRef.current) return;

        console.log('Initializing Three.js scene...'); // Debug log
        isInitializedRef.current = true; // 标记为已初始化，防止重复调用

        // 内联纹理创建函数，避免依赖问题
        const createTextures = async (galleryItems) => {
            if (!galleryItems || galleryItems.length === 0) {
                return [];
            }

            const textures = [];
            const totalImages = Math.min(galleryItems.length, 37); // 37张图片：1张给中心球 + 36张给卫星球

            for (let i = 0; i < totalImages; i++) {
                const texture = await new Promise((resolve) => {
                    const item = galleryItems[i];
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    
                    img.onload = () => {
                        // 创建画布
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // 设置画布尺寸为正方形，适合球体贴图
                        const canvasSize = 512; // 降低分辨率提升性能
                        canvas.width = canvasSize;
                        canvas.height = canvasSize;
                        
                        // 将图片绘制到整个画布，完全覆盖
                        ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
                        
                        // 添加微妙的装饰效果
                        const gradient = ctx.createRadialGradient(
                            canvasSize / 2, canvasSize / 2, 0,
                            canvasSize / 2, canvasSize / 2, canvasSize / 2
                        );
                        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                        gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
                        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvasSize, canvasSize);
                        
                        // 添加微妙的纹理噪声
                        const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
                        const data = imageData.data;
                        
                        for (let j = 0; j < data.length; j += 4) {
                            const noise = (Math.random() - 0.5) * 3;
                            data[j] = Math.max(0, Math.min(255, data[j] + noise));
                            data[j + 1] = Math.max(0, Math.min(255, data[j + 1] + noise));
                            data[j + 2] = Math.max(0, Math.min(255, data[j + 2] + noise));
                        }
                        
                        ctx.putImageData(imageData, 0, 0);
                        
                        // 创建Three.js纹理
                        const texture = new THREE.CanvasTexture(canvas);
                        texture.wrapS = THREE.RepeatWrapping;
                        texture.wrapT = THREE.RepeatWrapping;
                        texture.generateMipmaps = true;
                        texture.minFilter = THREE.LinearMipmapLinearFilter;
                        texture.magFilter = THREE.LinearFilter;
                        
                        resolve(texture);
                    };
                    
                    img.onerror = () => {
                        // 图片加载失败，创建彩色纹理
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const canvasSize = 512;
                        canvas.width = canvasSize;
                        canvas.height = canvasSize;
                        
                        // 为每个球创建不同颜色的渐变
                        const colors = [
                            ['#ff6b6b', '#4ecdc4', '#45b7d1'],
                            ['#a8e6cf', '#ffd93d', '#ff6b9d'],
                            ['#c44569', '#f8b500', '#6c5ce7'],
                            ['#fd79a8', '#00b894', '#0984e3'],
                            ['#e17055', '#00cec9', '#6c5ce7'],
                            ['#fdcb6e', '#e84393', '#00b894'],
                            ['#fd79a8', '#fdcb6e', '#74b9ff'],
                            ['#55a3ff', '#26de81', '#fc5c65'],
                            ['#a55eea', '#26de81', '#fd9644']
                        ];
                        
                        const colorSet = colors[i % colors.length];
                        const gradient = ctx.createLinearGradient(0, 0, canvasSize, canvasSize);
                        gradient.addColorStop(0, colorSet[0]);
                        gradient.addColorStop(0.5, colorSet[1]);
                        gradient.addColorStop(1, colorSet[2]);
                        
                        ctx.fillStyle = gradient;
                        ctx.fillRect(0, 0, canvasSize, canvasSize);
                        
                        const texture = new THREE.CanvasTexture(canvas);
                        resolve(texture);
                    };
                    
                    img.src = item.src || item.thumbnail;
                });

                textures.push(texture);
                setLoadingProgress(((i + 1) / totalImages) * 100);
            }

            return textures;
        };

        try {
            // 计算画布尺寸
            const canvasRect = canvasRef.current.getBoundingClientRect();
            const canvasWidth = canvasRect.width;
            const canvasHeight = canvasRect.height;

            console.log(`Canvas size: ${canvasWidth} x ${canvasHeight}`);

            // 创建渲染器
            rendererRef.current = new THREE.WebGLRenderer({ 
                canvas: canvasRef.current, 
                alpha: true,
                antialias: true
            });
            rendererRef.current.setSize(canvasWidth, canvasHeight);
            rendererRef.current.setClearColor(0x000000, 0);

            // 创建场景
            sceneRef.current = new THREE.Scene();

            // 创建相机 - 固定正面视角适合分屏
            cameraRef.current = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 1000);
            cameraRef.current.position.set(0, 0, 15); // 更远的距离，确保所有球体都在视野内
            cameraRef.current.lookAt(0, 0, 0);

            // 完全禁用轨道控制器 - 不允许用户拖拽旋转
            controlsRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
            controlsRef.current.enabled = false; // 完全禁用控制器

            // 添加环境光
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            sceneRef.current.add(ambientLight);

            // 添加方向光
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(10, 10, 5);
            sceneRef.current.add(directionalLight);

            // 创建纹理
            const textures = await createTextures(currentGalleryData);

            // 创建右侧预览球 - 增大尺寸，更突出
            if (textures.length > 0) {
                const previewGeometry = new THREE.SphereGeometry(3.8, 64, 32); // 从3.2增大到3.8
                const previewMaterial = new THREE.MeshStandardMaterial({
                    map: textures[0],
                    metalness: 0.1,
                    roughness: 0.3,
                });
                
                // 调整球体方向，让"赤道"朝向用户
                previewGeometry.rotateX(Math.PI / 2);
                
                previewSphere.current = new THREE.Mesh(previewGeometry, previewMaterial);
                // 位于右半边中心，保持现有位置
                previewSphere.current.position.set(5, 0, 0);
                previewSphere.current.userData = { 
                    type: 'preview',
                    currentTextureIndex: 0
                };
                sceneRef.current.add(previewSphere.current);
            }

            // 创建左侧球体网格 - 减少四边空白，增大球体和间隙
            galleryGridSpheres.current = [];
            const gridCols = 6; // 保持6列
            const gridRows = 6; // 保持6行
            
            // 减少四边空白的边界设定
            const leftBoundary = -8.2; // 更靠近左边界
            const rightBoundary = -0.2; // 更靠近中线
            const topBoundary = 3.0; // 更靠近上边界  
            const bottomBoundary = -3.0; // 更靠近下边界
            
            // 计算网格间距 - 增大间隙
            const gridWidth = rightBoundary - leftBoundary;
            const gridHeight = topBoundary - bottomBoundary;
            const spacingX = gridWidth / (gridCols - 1); // X方向间距
            const spacingY = gridHeight / (gridRows - 1); // Y方向间距

            for (let row = 0; row < gridRows; row++) {
                for (let col = 0; col < gridCols; col++) {
                    const index = row * gridCols + col;
                    if (index < 36 && index < textures.length) {
                        const gridGeometry = new THREE.SphereGeometry(0.45, 32, 16); // 从0.38增大到0.45
                        const gridMaterial = new THREE.MeshStandardMaterial({
                            map: textures[index],
                            metalness: 0.1,
                            roughness: 0.3,
                        });

                        // 调整球体方向
                        gridGeometry.rotateX(Math.PI / 2);

                        const gridSphere = new THREE.Mesh(gridGeometry, gridMaterial);
                        
                        // 按更大的区域均匀分布
                        const xPos = leftBoundary + col * spacingX;
                        const yPos = topBoundary - row * spacingY;
                        
                        gridSphere.position.set(xPos, yPos, 0);
                        gridSphere.userData = { 
                            type: 'grid',
                            textureIndex: index,
                            originalScale: 1.0,
                            targetScale: 1.0,
                            imageData: currentGalleryData[index] || {}
                        };

                        galleryGridSpheres.current.push(gridSphere);
                        sceneRef.current.add(gridSphere);
                    }
                }
            }

            // 鼠标交互状态
            let currentHoveredSphere = null;

            // 鼠标悬停处理
            const handleMouseMove = (event) => {
                if (!canvasRef.current || !raycasterRef.current || !cameraRef.current) return;
                
                const rect = canvasRef.current.getBoundingClientRect();
                mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
                const intersects = raycasterRef.current.intersectObjects(galleryGridSpheres.current);

                if (intersects.length > 0) {
                    const hoveredGridSphere = intersects[0].object;
                    if (currentHoveredSphere !== hoveredGridSphere) {
                        // 重置之前的球体
                        if (currentHoveredSphere) {
                            currentHoveredSphere.userData.targetScale = 1.0;
                        }
                        
                        // 设置新的悬停球体
                        currentHoveredSphere = hoveredGridSphere;
                        hoveredGridSphere.userData.targetScale = 1.2;
                        
                        // 更新预览球的纹理
                        if (previewSphere.current && textures[hoveredGridSphere.userData.textureIndex]) {
                            previewSphere.current.material.map = textures[hoveredGridSphere.userData.textureIndex];
                            previewSphere.current.material.needsUpdate = true;
                        }
                    }
                } else if (currentHoveredSphere) {
                    // 鼠标离开所有球体
                    currentHoveredSphere.userData.targetScale = 1.0;
                    currentHoveredSphere = null;
                    
                    // 恢复预览球到第一张图片
                    if (previewSphere.current && textures[0]) {
                        previewSphere.current.material.map = textures[0];
                        previewSphere.current.material.needsUpdate = true;
                    }
                }
            };

            // 简化的鼠标事件处理
            const handleMouseDown = (event) => {
                setIsDragging(true);
                event.preventDefault();
            };

            const handleMouseUp = () => {
                setTimeout(() => {
                    setIsDragging(false);
                }, 50);
            };

            // 添加鼠标事件监听器
            canvasRef.current.addEventListener('mousedown', handleMouseDown);
            canvasRef.current.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            // 动画循环 - 固定视角，不允许用户控制
            const animate = () => {
                animationFrameRef.current = requestAnimationFrame(animate);
                
                // 预览球缓慢旋转
                if (previewSphere.current) {
                    previewSphere.current.rotation.y += 0.005;
                }
                
                // 网格球体的hover缩放动画
                galleryGridSpheres.current.forEach((sphere) => {
                    const currentScale = sphere.scale.x;
                    const targetScale = sphere.userData.targetScale;
                    if (Math.abs(currentScale - targetScale) > 0.01) {
                        const newScale = currentScale + (targetScale - currentScale) * 0.12;
                        sphere.scale.setScalar(newScale);
                    }
                    
                    // 轻微的自转
                    sphere.rotation.y += 0.002;
                });

                // 渲染场景 - 固定相机角度
                if (rendererRef.current && sceneRef.current && cameraRef.current) {
                    rendererRef.current.render(sceneRef.current, cameraRef.current);
                }
            };
            animate();

            // 清理函数
            const cleanup = () => {
                if (canvasRef.current) {
                    canvasRef.current.removeEventListener('mousedown', handleMouseDown);
                    canvasRef.current.removeEventListener('mousemove', handleMouseMove);
                }
                document.removeEventListener('mouseup', handleMouseUp);
            };

            return cleanup;

        } catch (error) {
            console.error('Three.js 场景初始化失败:', error);
        }
    };

    // 清理场景函数
    cleanupSceneRef.current = () => {
        // 停止动画循环
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        // 清理控制器
        if (controlsRef.current) {
            controlsRef.current.dispose();
            controlsRef.current = null;
        }

        // 清理场景中的几何体和材质
        if (sceneRef.current) {
            sceneRef.current.traverse((child) => {
                if (child.geometry) {
                    child.geometry.dispose();
                }
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(material => {
                            if (material.map) material.map.dispose();
                            material.dispose();
                        });
                    } else {
                        if (child.material.map) child.material.map.dispose();
                        child.material.dispose();
                    }
                }
            });
            sceneRef.current = null;
        }

        // 清理渲染器
        if (rendererRef.current) {
            rendererRef.current.dispose();
            rendererRef.current = null;
        }
    };

    // 处理背景点击关闭
    const handleBackgroundClick = (e) => {
        // 严格检查：只有点击背景且没有拖拽时才关闭
        if (e.target === e.currentTarget && !isDragging) {
            onClose();
        }
    };

    // 处理鼠标事件，进一步防误关闭
    const handleMouseDown = (e) => {
        // 记录鼠标按下的位置
        const startX = e.clientX;
        const startY = e.clientY;
        
        const handleMouseUp = (upEvent) => {
            const endX = upEvent.clientX;
            const endY = upEvent.clientY;
            const distance = Math.sqrt(
                Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
            );
            
            // 如果鼠标移动距离很小，且点击的是背景，才关闭
            if (distance < 10 && upEvent.target === e.currentTarget && !isDragging) {
                onClose();
            }
            
            document.removeEventListener('mouseup', handleMouseUp);
        };
        
        document.addEventListener('mouseup', handleMouseUp);
    };

    // 窗口大小调整
    const handleResize = () => {
        if (cameraRef.current && rendererRef.current && canvasRef.current) {
            const width = canvasRef.current.clientWidth;
            const height = canvasRef.current.clientHeight;
            
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        }
    };

    const cleanupFunctionRef = useRef(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setLoadingProgress(0);
            // 防止背景滚动
            document.body.style.overflow = 'hidden';
            // 延迟初始化 Three.js 场景，确保 DOM 已渲染
            const timer = setTimeout(async () => {
                // 清理之前的场景
                if (cleanupFunctionRef.current) {
                    cleanupFunctionRef.current();
                    cleanupFunctionRef.current = null;
                }
                
                // 重置初始化状态，允许新的初始化
                isInitializedRef.current = false;
                
                cleanupFunctionRef.current = await initSceneRef.current();
            }, 100);
            return () => clearTimeout(timer);
        } else {
            // 延迟隐藏以显示关闭动画
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            document.body.style.overflow = 'unset';
            // 执行清理
            if (cleanupFunctionRef.current) {
                cleanupFunctionRef.current();
                cleanupFunctionRef.current = null;
            }
            cleanupSceneRef.current();
            isInitializedRef.current = false; // 重置初始化状态
            return () => clearTimeout(timer);
        }
    }, [isOpen, galleryData]); // 只依赖基本的状态值

    // 窗口大小变化监听
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isOpen]);

    // ESC 键关闭
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // 组件卸载清理
    useEffect(() => {
        return () => {
            cleanupSceneRef.current();
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[10000] transition-all duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
            }}
            onClick={handleBackgroundClick}
            onMouseDown={handleMouseDown}
        >
            {/* PhotoSwipeGallery Integration */}
            <PhotoSwipeGallery 
                items={galleryData.map(item => ({ src: item.src, thumbnail: item.thumbnail }))}
                isOpen={isPhotoSwipeOpen}
                onClose={() => setIsPhotoSwipeOpen(false)}
            />

            {/* 全屏容器 */}
            <div className="w-full h-full flex items-start justify-end p-4">
                {/* 关闭按钮 - 固定在右上角 */}
                <button
                    onClick={onClose}
                    className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 group z-20"
                    title={language === 'en' ? 'Close' : '关闭'}
                >
                    <svg 
                        className="w-6 h-6 text-white group-hover:text-red-300 transition-colors" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Three.js 场景容器 - 全屏 */}
                <div className="absolute inset-0 w-full h-full">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full"
                        style={{ background: 'transparent' }}
                    />

                    {/* 加载提示 */}
                    {loadingProgress < 100 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/60 text-center pointer-events-none">
                            <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white/80 rounded-full mx-auto mb-2"></div>
                            <p className="text-sm mb-2">
                                {language === 'en' ? 'Loading Turntable Gallery...' : '加载转盘画廊中...'}
                            </p>
                            <div className="w-48 bg-white/20 rounded-full h-2 mb-2">
                                <div 
                                    className="bg-white/60 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${loadingProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs opacity-60">
                                {Math.round(loadingProgress)}% • Loading {Math.min(galleryData?.length || 0, 37)} photos for turntable gallery
                            </p>
                        </div>
                    )}

                    {/* 操作提示 */}
                    {loadingProgress >= 100 && (
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 text-center pointer-events-none">
                            <p className="text-sm">
                                {language === 'en' 
                                    ? 'Drag to rotate turntable • Hover spheres to preview in center' 
                                    : '拖拽旋转转盘 • 悬停球体可在中心预览'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Gallery.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    language: PropTypes.string
};

export default Gallery;
