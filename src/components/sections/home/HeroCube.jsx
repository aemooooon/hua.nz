import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { useAppStore } from "../../../store/useAppStore";
import { gsap } from "gsap";
import { debounce } from "lodash";
import textureSystem from "../../../utils/texture/index";
import webglResourceManager from "../../../utils/WebGLResourceManager";
import { useTheme } from "../../../hooks/useTheme";

const HeroCube = ({ enableOpeningAnimation = false, onAnimationComplete, onReady }) => {
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
    const preloadedTexturesRef = useRef(null); // 存储预加载的纹理结果

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
                name: "home",
                label: content.navigation?.home || "Home",
                color: "#afcc8f",
                effect: "effectchaos",
                video: "/cube-textures/home.mp4", // 视频保持原路径
            },
            {
                name: "about",
                label: content.navigation?.about || "About",
                color: "#7ca65c",
                effect: "effectlorenz",
                texture: "about", // 只需要基础名称，新系统会自动选择最优格式
            },
            {
                name: "projects",
                label: content.navigation?.projects || "Projects",
                color: "#5d7d4b",
                effect: "effectmonjori",
                texture: "projects",
            },
            {
                name: "gallery",
                label: content.navigation?.gallery || "Gallery",
                color: "#768e90",
                effect: "effectheartbeats",
                texture: "gallery",
            },
            {
                name: "education",
                label: content.navigation?.education || "Education",
                color: "#4a636a",
                effect: "effectfuse",
                texture: "education",
            },
            {
                name: "contact",
                label: content.navigation?.contact || "Contact",
                color: "#3a4e55",
                effect: "effectpixeldistortion",
                texture: "contact",
            },
        ];
    }, [content.navigation]);

    // 预加载所有纹理资源 - 使用新的统一纹理系统
    useEffect(() => {
        const preloadTextures = async () => {
            try {
                console.log("🚀 开始Hero Cube纹理预加载...");

                // 使用新的Hero Cube专用API进行一次性加载
                const result = await textureSystem.loadHeroCubeTextures(faces);

                console.log(`✅ Hero Cube纹理加载完成!`);
                console.log(`  - 图片纹理: ${result.textures.size}`);
                console.log(`  - 视频纹理: ${result.videos.size}`);
                console.log(`  - 错误数量: ${result.errors.length}`);

                if (result.errors.length > 0) {
                    console.warn("⚠️ 部分纹理加载失败:", result.errors);
                }

                // 将结果存储到ref中供后续使用
                preloadedTexturesRef.current = result;

                // 调试信息：检查视频纹理
                console.log("🔍 调试预加载结果:");
                console.log("  - 纹理Map键:", Array.from(result.textures.keys()));
                console.log("  - 视频Map键:", Array.from(result.videos.keys()));
                console.log(
                    "  - faces配置:",
                    faces.map((f) => ({ name: f.name, hasVideo: !!f.video, hasTexture: !!f.texture }))
                );

                setTexturesReady(true);
            } catch (error) {
                console.warn("纹理预加载部分失败，继续渲染:", error);
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
                canvas.style.width = "100vw";
                canvas.style.height = "100vh";
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
        const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];

        window.addEventListener("resize", handleResize);

        // 添加用户活动监听器，使用防抖避免频繁调用
        const debouncedActivityHandler = debounce(handleUserActivity, 30000); // 30秒防抖
        activityEvents.forEach((event) => {
            document.addEventListener(event, debouncedActivityHandler);
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            activityEvents.forEach((event) => {
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

        // 创建渲染器 - 极度性能优化设置，专注LCP性能
        const shouldUseAntialias = window.innerWidth * window.innerHeight < 1920 * 1080; // 仅在1080p以下开启抗锯齿
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: shouldUseAntialias, // 🔥 更严格的抗锯齿条件
            powerPreference: "high-performance",
            precision: "lowp", // 🔥 使用最低精度提升性能
            stencil: false,
            depth: false, // 🔥 禁用深度缓冲，减少GPU负载
            premultipliedAlpha: false,
            preserveDrawingBuffer: false, // 🔥 不保留绘制缓冲区
        });

        // 设置透明背景，让3D背景可见
        renderer.setClearColor(0x000000, 0); // 完全透明背景
        
        // 设置全分辨率渲染，避免canvas尺寸问题
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // 🔥 进一步限制像素比：防止高DPI设备过载，提升LCP性能
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0)); // 降至1.0，确保性能优先

        // 性能优化设置
        renderer.shadowMap.enabled = false;
        renderer.physicallyCorrectLights = false;
        renderer.toneMapping = THREE.NoToneMapping;

        // 全屏显示设置
        renderer.domElement.style.position = "fixed";
        renderer.domElement.style.top = "0";
        renderer.domElement.style.left = "0";
        renderer.domElement.style.width = "100vw";
        renderer.domElement.style.height = "100vh";
        renderer.domElement.style.display = "block";
        renderer.domElement.style.zIndex = "10";
        renderer.domElement.style.pointerEvents = "none"; // 去掉交互

        // 添加数据属性，让智能光标识别这是不可点击的Canvas
        renderer.domElement.setAttribute("data-no-custom-cursor", "true");
        renderer.domElement.setAttribute("data-hero-cube-canvas", "true");
        renderer.domElement.classList.add("hero-cube-canvas");

        // 更新渲染器尺寸为全屏
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight; // 保持正确的宽高比
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
                // 保持全分辨率渲染，避免canvas偏移问题
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

        window.addEventListener("resize", handleCanvasResize);

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
        const fillLight1 = new THREE.DirectionalLight(0x10b981, 0.6); // 翠绿补光
        fillLight1.position.set(-5, 2, -3);
        scene.add(fillLight1);

        const fillLight2 = new THREE.DirectionalLight(0x34d399, 0.5); // 浅绿补光
        fillLight2.position.set(3, -4, 5);
        scene.add(fillLight2);

        // 添加点光源增强中央区域亮度
        const pointLight = new THREE.PointLight(0xe0f2e0, 1.5, 15); // 浅绿白光源
        pointLight.position.set(0, 0, 8);
        scene.add(pointLight);

        // 添加背景点光源增强粒子可见度
        const backLight = new THREE.PointLight(0x00ff88, 0.8, 20); // 高亮绿背景光
        backLight.position.set(0, 0, -10);
        scene.add(backLight);

        // 创建圆角立方体几何体
        const cubeSize = 2.8;
        const geometry = new RoundedBoxGeometry(cubeSize, cubeSize, cubeSize, 8, 0.1);

        // 创建棋盘格默认纹理的函数
        const createCheckerboardTexture = (size = 256) => {
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const context = canvas.getContext("2d");

            const squareSize = size / 8;

            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    // 使用主题色创建棋盘格效果
                    context.fillStyle =
                        (i + j) % 2 === 0 ? themeColorsRef.current.surface : themeColorsRef.current.muted;
                    context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
                }
            }

            context.fillStyle = themeColorsRef.current.primary;
            context.font = `bold ${size / 16}px Arial`;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText("VIDEO", size / 2, size / 2 - size / 32);
            context.fillText("ERROR", size / 2, size / 2 + size / 32);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        };

        // 为每个面创建材质 - 按照Three.js立方体面的标准顺序
        const materials = [
            // 索引0: 右面 (X+) - About面
            faces.find((f) => f.name === "about"),
            // 索引1: 左面 (X-) - Gallery面
            faces.find((f) => f.name === "gallery"),
            // 索引2: 顶面 (Y+) - Contact面
            faces.find((f) => f.name === "contact"),
            // 索引3: 底面 (Y-) - Education面
            faces.find((f) => f.name === "education"),
            // 索引4: 正面 (Z+) - Home面
            faces.find((f) => f.name === "home"),
            // 索引5: 背面 (Z-) - Projects面
            faces.find((f) => f.name === "projects"),
        ].map((face, index) => {
            // 调试信息：检查每个面是否正确加载
            console.log(`Face ${index} (${['right', 'left', 'top', 'bottom', 'front', 'back'][index]}):`, 
                face ? face.name : 'NOT FOUND', face);
            
            // 如果face未找到，创建一个明显的错误纹理
            if (!face) {
                console.error(`Face at index ${index} not found!`);
                const errorTexture = createCheckerboardTexture(256);
                return new THREE.MeshBasicMaterial({ // 🔥 错误材质也使用Basic
                    map: errorTexture,
                    transparent: false, // 🔥 禁用透明度
                    side: THREE.FrontSide,
                });
            }
            // 如果是视频贴图，使用预加载的视频纹理或创建新的
            if (face.video) {
                const fallbackTexture = createCheckerboardTexture(256);

                const material = new THREE.MeshBasicMaterial({ // 🔥 使用Basic材质，无光照计算
                    map: fallbackTexture, // 初始使用fallback
                    transparent: false, // 🔥 禁用透明度提升性能
                    side: THREE.FrontSide, // 只渲染正面，提升性能
                });

                // 检查是否有预加载的视频纹理
                if (preloadedTexturesRef.current?.videos.has(face.name)) {
                    const preloadedVideoTexture = preloadedTexturesRef.current.videos.get(face.name);
                    material.map = preloadedVideoTexture;
                    material.needsUpdate = true;
                    console.log(`✅ 使用预加载视频纹理: ${face.name}`);

                    // 检查视频状态
                    if (preloadedVideoTexture.image) {
                        const video = preloadedVideoTexture.image;
                        console.log(`🎬 视频状态: ${face.name}`, {
                            paused: video.paused,
                            currentTime: video.currentTime,
                            duration: video.duration,
                            readyState: video.readyState,
                            networkState: video.networkState,
                        });

                        // 确保视频在播放
                        if (video.paused) {
                            video.play().catch((err) => console.warn("视频自动播放失败:", err));
                        }

                        // 添加用户交互启动播放的监听器
                        const tryPlayOnUserInteraction = () => {
                            if (video.paused) {
                                video
                                    .play()
                                    .then(() => {
                                        console.log(`🎬 用户交互后视频开始播放: ${face.name}`);
                                        // 移除监听器
                                        document.removeEventListener("click", tryPlayOnUserInteraction);
                                        document.removeEventListener("touchstart", tryPlayOnUserInteraction);
                                    })
                                    .catch((err) => console.warn("用户交互后视频播放失败:", err));
                            }
                        };

                        // 如果视频暂停，添加用户交互监听器
                        if (video.paused) {
                            document.addEventListener("click", tryPlayOnUserInteraction, { once: true });
                            document.addEventListener("touchstart", tryPlayOnUserInteraction, { once: true });
                        }
                    }
                } else {
                    // 如果没有预加载，创建新的视频纹理
                    console.warn(`⚠️ 预加载视频纹理不可用，创建新的: ${face.name}`);

                    // 创建新的视频元素，确保每次都有一个新的实例
                    const video = document.createElement("video");
                    video.src = face.video;
                    video.crossOrigin = "anonymous";
                    video.loop = true;
                    video.muted = true;
                    video.autoplay = true;
                    video.playsInline = true;
                    video.preload = "metadata";

                    const setupVideoTexture = () => {
                        try {
                            const videoTexture = new THREE.VideoTexture(video);
                            videoTexture.minFilter = THREE.LinearFilter; // 视频纹理不能使用mipmap
                            videoTexture.magFilter = THREE.LinearFilter;
                            videoTexture.format = THREE.RGBAFormat;
                            videoTexture.generateMipmaps = false; // 视频纹理禁用mipmap
                            videoTexture.flipY = true; // 修复：让人物正向显示
                            videoTexture.colorSpace = THREE.SRGBColorSpace;

                            if (material.map && material.map !== fallbackTexture) {
                                material.map.dispose();
                            }
                            material.map = videoTexture;
                            material.needsUpdate = true;

                            // 确保视频开始播放
                            video.play().catch((error) => {
                                console.warn("Video autoplay failed:", error);
                            });
                        } catch (error) {
                            console.warn("Failed to create video texture:", error);
                            // 保持使用fallback纹理
                        }
                    };

                    // 多个事件监听确保视频正确加载
                    video.addEventListener("loadeddata", () => {
                        setupVideoTexture();
                    });

                    video.addEventListener("canplay", () => {
                        setupVideoTexture();
                    });

                    video.addEventListener("loadedmetadata", () => {
                        // 视频元数据加载完成，可以尝试播放
                        video.play().catch(() => {
                            // 忽略自动播放失败
                        });
                    });

                    video.addEventListener("error", (error) => {
                        console.warn("Video loading error, using fallback texture:", error);
                        // 保持使用fallback纹理
                    });

                    // 立即尝试加载视频
                    video.load();
                }

                return material;
            }

            // 如果是图片贴图，使用预加载的纹理
            if (face.texture) {
                // 先创建带fallback的材质
                const fallbackTexture = createCheckerboardTexture(256);
                const material = new THREE.MeshBasicMaterial({ // 🔥 使用Basic材质
                    map: fallbackTexture, // 初始使用fallback
                    transparent: false, // 🔥 禁用透明度
                    side: THREE.FrontSide,
                });

                // 使用预加载的纹理（如果可用）
                if (preloadedTexturesRef.current?.textures.has(face.texture)) {
                    const preloadedTexture = preloadedTexturesRef.current.textures.get(face.texture);

                    // 🔄 为education纹理添加Y轴翻转功能
                    if (face.texture === "education") {
                        preloadedTexture.flipY = true;
                        preloadedTexture.needsUpdate = true;
                        console.log(`🔄 为${face.texture}纹理启用Y轴翻转`);
                    }

                    material.map = preloadedTexture;
                    material.needsUpdate = true;
                    console.log(`✅ 使用预加载纹理: ${face.texture}`);
                } else {
                    // 如果预加载失败，使用统一的纹理系统异步加载
                    console.warn(`⚠️ 预加载纹理不可用，使用统一系统异步加载: ${face.texture}`);
                    (async () => {
                        try {
                            const result = await textureSystem.loadSceneTextures("hero-cube", {
                                textures: [face.texture],
                            });
                            if (result.textures.has(face.texture)) {
                                const texture = result.textures.get(face.texture);

                                // 🔄 为education纹理添加Y轴翻转功能
                                if (face.texture === "education") {
                                    texture.flipY = true;
                                    texture.needsUpdate = true;
                                    console.log(`🔄 异步加载时为${face.texture}纹理启用Y轴翻转`);
                                }

                                material.map = texture;
                                material.needsUpdate = true;
                                console.log(`✅ 单独加载Cube纹理成功: ${face.texture}`);
                            } else {
                                throw new Error(`纹理未找到: ${face.texture}`);
                            }
                        } catch (error) {
                            console.warn(`加载纹理失败: ${face.texture}`, error);
                            // 保持使用fallback纹理
                        }
                    })();
                }

                return material;
            }

            // Canvas纹理逻辑 - 只显示文字，不显示图标
            const canvas = document.createElement("canvas");
            const textureSize = 256;
            canvas.width = textureSize;
            canvas.height = textureSize;
            const context = canvas.getContext("2d");

            // 绘制背景色彩
            context.clearRect(0, 0, textureSize, textureSize);

            const gradient = context.createRadialGradient(
                textureSize / 2,
                textureSize / 2,
                0,
                textureSize / 2,
                textureSize / 2,
                textureSize / 2
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
            reflectGradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
            reflectGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.08)");
            reflectGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            context.fillStyle = reflectGradient;
            context.fillRect(0, 0, textureSize / 3, textureSize);

            // 只绘制文字，居中显示
            context.shadowColor = "rgba(0, 0, 0, 0.8)";
            context.shadowBlur = 6;
            const fontSize = 36;
            context.font = `bold ${fontSize}px "Helvetica Neue", Arial`;
            context.fillStyle = themeColorsRef.current.text || "#ffffff";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(face.label, textureSize / 2, textureSize / 2);

            // 重置阴影
            context.shadowColor = "transparent";
            context.shadowBlur = 0;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            texture.generateMipmaps = false; // 🔥 禁用mipmaps提升性能
            texture.minFilter = THREE.LinearFilter; // 🔥 简化过滤器
            texture.magFilter = THREE.LinearFilter;

            const material = new THREE.MeshBasicMaterial({ // 🔥 使用Basic材质
                map: texture,
                transparent: false, // 🔥 禁用透明度
                side: THREE.FrontSide, // 🔥 只渲染正面
            });

            return material;
        });

        // 创建立方体
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        cubeRef.current = cube;

        // 🔥 性能优化：移除线框渲染，减少GPU负载
        // const edges = new THREE.EdgesGeometry(geometry);
        // const lineMaterial = new THREE.LineBasicMaterial({
        //     color: 0xffffff,
        //     opacity: 0.3,
        //     transparent: true,
        //     linewidth: 2,
        // });
        // const wireframe = new THREE.LineSegments(edges, lineMaterial);
        // cube.add(wireframe);

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎬 HeroCube 电影级开场动画系统
        // ═══════════════════════════════════════════════════════════════════════════════
        // 
        // 动画概述：
        // - 总时长：~27.6秒的电影级3D立方体展示动画
        // - 立方体面映射：6个面展示不同内容页面
        //   • Education (底面, Y-, 索引3) | About (右面, X+, 索引0)
        //   • Gallery (左面, X-, 索引1)   | Projects (背面, Z-, 索引5)
        //   • Home (正面, Z+, 索引4)      | Contact (顶面, Y+, 索引2)
        // - 设计理念：营造"电影级别的类似花絮highlight的那种感觉"
        // - 核心特效：智能速度曲线、平滑面切换、戏剧性3D变换、物理弹跳
        //
        // ═══════════════════════════════════════════════════════════════════════════════
        
        if (enableOpeningAnimation) {
            // 🎯 设置cube初始状态：从远处、极小尺寸开始
            cube.position.set(0, 0, -80);  // 远在屏幕后方
            cube.scale.set(0.05, 0.05, 0.05);  // 微小尺寸
            cube.rotation.set(0, 0, 0);  // 无旋转

            // 🎪 创建主动画时间线
            openingAnimationRef.current = gsap
                .timeline({
                    onComplete: () => {
                        if (onAnimationCompleteRef.current) {
                            onAnimationCompleteRef.current();
                        }
                        window.dispatchEvent(new CustomEvent("cubeAnimationComplete"));
                    },
                })
                
                // ┌─────────────────────────────────────────────────────────────────────────────┐
                // │ 🚀 阶段1: 震撼飞入与初始缩放 (0-2.5s)                                          │
                // │ 效果：从远处高速飞入，带有弹性放大效果                                            │
                // └─────────────────────────────────────────────────────────────────────────────┘
                .to(cube.position, {
                    z: 0,  // 飞入到屏幕中心
                    duration: 2.0,
                    ease: "power3.out",  // 强力减速，营造冲击感
                    delay: 0.5,  // 延迟开始，增加期待感
                })
                .to(
                    cube.scale,
                    {
                        x: 1.2,  // 放大到1.2倍，适中的展示尺寸
                        y: 1.2,
                        z: 1.2,
                        duration: 2.0,
                        ease: "back.out(1.7)",  // 弹性效果，超调后回弹
                    },
                    0.5  // 与位置动画同时开始
                )

                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                // 🎬 阶段 2: 6面内容展示循环 - Movie-Level Content Showcase (2.5-22.0s) [持续19.5秒]
                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                
                // 🎭 设计哲学: 电影级别的类似花絮highlight的感觉
                // ────────────────────────────────────────────────────────────────
                // • 灵感来源: 电影预告片的节奏感 - 慢镜头特写 + 快速切换的视觉冲击
                // • 核心体验: 每个面都是一个"高光时刻"，有自己的叙事节奏
                // • 情感递进: Education(学术) → About(个人) → Projects(技术) → Gallery(创意) → Home(品牌) → Contact(联系)
                
                // 🎵 时间节奏设计: 慢-快-慢的电影级变速美学
                // ────────────────────────────────────────────────────────────────
                // • 慢镜头特写期: 1.5秒静止展示，让观者充分感受内容
                // • 快速切换期: 1.5秒动态过渡，使用power2.inOut营造急速感
                // • 缓慢离开期: 前期慢速脱离，为下一个面的登场做铺垫
                // • 特殊延长: Contact面4秒特写，强调联系重要性

                // 🎯 6面展示时序表 (总计19.5秒的精心编排):
                // ┌─────────────┬──────────────┬───────────────────────────────────┐
                // │    时间段    │    面部     │              动画状态              │
                // ├─────────────┼──────────────┼───────────────────────────────────┤
                // │ 2.5-4.0s   │ Education   │ 1.5s 旋转进入 (power3.out)        │
                // │ 4.0-5.5s   │ Education   │ 1.5s 静止特写                     │
                // │ 5.5-7.0s   │ About       │ 1.5s 旋转进入 (power2.inOut)      │
                // │ 7.0-8.5s   │ About       │ 1.5s 静止特写                     │
                // │ 8.5-10.0s  │ Projects    │ 1.5s 旋转进入 (power2.inOut)      │
                // │ 10.0-11.5s │ Projects    │ 1.5s 静止特写                     │
                // │ 11.5-13.0s │ Gallery     │ 1.5s 旋转进入 (power2.inOut)      │
                // │ 13.0-14.5s │ Gallery     │ 1.5s 静止特写                     │
                // │ 14.5-16.0s │ Home        │ 1.5s 旋转进入 (power2.inOut)      │
                // │ 16.0-17.5s │ Home        │ 1.5s 静止特写                     │
                // │ 17.5-18.0s │ Contact     │ 0.5s 快速进入 (power2.out)        │
                // │ 18.0-22.0s │ Contact     │ 4.0s 延长特写 (重点强调)           │
                // └─────────────┴──────────────┴───────────────────────────────────┘

                // 🔧 技术实现细节:
                // ────────────────────────────────────────────────────────────────
                // • 面部映射系统: Three.js标准6面立方体 (右/左/顶/底/前/后 = X+/X-/Y+/Y-/Z+/Z-)
                // • 旋转数学修正: Z轴+Math.PI翻转确保gallery/about/contact图片正立显示
                // • Contact面特殊角度: x=π/2(顶面朝上) + y=π(图片正立) + z=0(无额外旋转)
                // • 缓动曲线策略: power3.out(强劲开场) → power2.inOut(标准节奏) → power2.out(快速收尾)
                // • 尺寸动态调整: 临时放大1.2倍增强视觉冲击，阶段3前恢复原尺寸

                // 📐 立方体面部索引映射 (Three.js BoxGeometry标准):
                // • 索引0 (Right/右面/X+): About    - 个人简介
                // • 索引1 (Left/左面/X-):  Gallery  - 创意作品集  
                // • 索引2 (Top/顶面/Y+):   Contact  - 联系方式
                // • 索引3 (Bottom/底面/Y-): Education - 教育背景
                // • 索引4 (Front/前面/Z+): Home     - 品牌首页
                // • 索引5 (Back/背面/Z-):  Projects - 技术项目

                // === 🚀 立方体视觉放大 - 增强电影级展示效果 ===
                .to(
                    cube.scale,
                    {
                        x: 1.2,
                        y: 1.2,
                        z: 1.2, // 放大20%，营造IMAX般的沉浸感
                        duration: 0.5, // 快速放大，为后续展示做准备
                        ease: "power2.out", // 强劲开始，平滑结束
                    },
                    2.5
                )
                // 核心：通过速度曲线控制实现进入后期和退出前期的特写效果
                
                // === 面1: Education面 (底面, Y-, 索引3) - 教育背景 (2.5-5.5s) ===
                .to(
                    cube.rotation,
                    {
                        x: -Math.PI * 0.5, // 修正：底面朝向用户（负旋转）
                        y: 0,
                        z: 0,
                        duration: 1.5, // 进入时间：1.5秒，前快后慢
                        ease: "power3.out", // 强力减速：快速开始，大幅减速结束
                    },
                    2.5
                )
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 0,
                        z: 5, 
                        duration: 1.5, // 进入时间：1.5秒，前快后慢
                        ease: "power3.out", // 与cube旋转同步减速
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    2.5
                )
                // 4.0-5.5s: Education面特写静止时间 (1.5秒)

                // === 面2: About面 (右面, X+, 索引0) - 个人简介 (5.5-8.5s) ===
                // 退出Education + 进入About的复合动画
                .to(
                    cube.rotation,
                    {
                        x: 0, // 恢复水平
                        y: Math.PI * 0.5, // 修正：右面朝向用户（正旋转）
                        z: Math.PI, // 修复：添加180度Z轴旋转，让about图片从倒立改为站立
                        duration: 1.5, // 退出Education(前慢) + 进入About(后慢)
                        ease: "power2.inOut", // 慢-快-慢：前期慢(Education特写) + 中期快 + 后期慢(About特写)
                    },
                    5.5
                )
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 0,
                        z: 5,
                        duration: 1.5, // 与cube旋转同步
                        ease: "power2.inOut", // 慢-快-慢曲线
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    5.5
                )
                // 7.0-8.5s: About面特写静止时间 (1.5秒)

                // === 面3: Projects面 (背面, Z-, 索引5) - 项目作品 (8.5-11.5s) ===
                // 退出About + 进入Projects的复合动画
                .to(
                    cube.rotation,
                    {
                        x: 0,
                        y: Math.PI, // 背面朝向用户（180度旋转）
                        z: Math.PI, // 翻转图片显示
                        duration: 1.5, // 退出About(前慢) + 进入Projects(后慢)
                        ease: "power2.inOut", // 慢-快-慢：前期慢(About特写) + 中期快 + 后期慢(Projects特写)
                    },
                    8.5
                )
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 0,
                        z: 5,
                        duration: 1.5, // 与cube旋转同步
                        ease: "power2.inOut", // 慢-快-慢曲线
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    8.5
                )
                // 10.0-11.5s: Projects面特写静止时间 (1.5秒)

                // === 面4: Gallery面 (左面, X-, 索引1) - 作品集 (11.5-14.5s) ===
                // 退出Projects + 进入Gallery的复合动画
                .to(
                    cube.rotation,
                    {
                        x: 0,
                        y: -Math.PI * 0.5, // 修正：左面朝向用户（负旋转）
                        z: Math.PI, // 修复：添加180度Z轴旋转，让gallery图片从倒立改为站立
                        duration: 1.5, // 退出Projects(前慢) + 进入Gallery(后慢)
                        ease: "power2.inOut", // 慢-快-慢：前期慢(Projects特写) + 中期快 + 后期慢(Gallery特写)
                    },
                    11.5
                )
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 0,
                        z: 5,
                        duration: 1.5, // 与cube旋转同步
                        ease: "power2.inOut", // 慢-快-慢曲线
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    11.5
                )
                // 13.0-14.5s: Gallery面特写静止时间 (1.5秒)

                // === 面5: Home面 (正面, Z+, 索引4) - 首页视频 (14.5-17.5s) ===
                // 退出Gallery + 进入Home的复合动画
                .to(
                    cube.rotation,
                    {
                        x: 0,
                        y: 0, // 正面朝向用户（0度）
                        z: 0,
                        duration: 1.5, // 退出Gallery(前慢) + 进入Home(后慢)
                        ease: "power2.inOut", // 慢-快-慢：前期慢(Gallery特写) + 中期快 + 后期慢(Home特写)
                    },
                    14.5
                )
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 0,
                        z: 5,
                        duration: 0.5, // 与cube旋转同步，缩短时间
                        ease: "power2.out", // 使用相同的缓动
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    17.5
                )
                // 18.0-22.0s: Contact面特写静止时间 (4.0秒) - 延长展示时间

                // === 面6: Contact面 (顶面, Y+, 索引2) - 联系方式 (17.5-20.5s) ===
                // 退出Home + 进入Contact的复合动画
                .to(
                    cube.rotation,
                    {
                        x: Math.PI * 0.5, // 顶面朝向用户（正旋转）
                        y: Math.PI, // Y轴180度旋转来让Contact图片正立
                        z: 0,
                        duration: 0.5, // 缩短旋转时间，确保Contact面能及时显示
                        ease: "power2.out", // 使用快速完成的缓动，确保旋转快速到位
                    },
                    17.5
                )
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 0,
                        z: 5,
                        duration: 0.5, // 修复：与cube旋转同步，缩短时间
                        ease: "power2.out", // 修复：使用相同的缓动
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    17.5
                )
                // 18.0-22.0s: Contact面特写静止时间 (4.0秒) - 延长展示时间

                // 平滑过渡：从顶部视角缓慢回到标准位置 (20.5-22.0s) - 与Contact面特写后期同时进行
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 2,
                        z: 6, // 先到中间过渡位置
                        duration: 0.7,
                        ease: "power2.inOut",
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    20.5 // 在Contact面展示后期开始过渡
                )
                .to(
                    camera.position,
                    {
                        x: 0,
                        y: 0,
                        z: 10, // 再到最终标准位置
                        duration: 0.8,
                        ease: "power2.out",
                        onUpdate: () => camera.lookAt(cube.position),
                    },
                    21.2 // 在阶段3开始前完成
                )

                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                // 🌪️ 阶段 3: 戏剧性3D变换 - Dramatic Zoom & Immersive Transformation (22.0-23.7s) [持续1.7秒]
                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                
                // 🎭 视觉效果目标: 创造"进入立方体内部"的沉浸式体验
                // ────────────────────────────────────────────────────────────────
                // • 摄像机急速前进 (z: 10 → 2) 模拟"冲入"效果
                // • 立方体放大3倍 (1.2 → 3.0) 填满整个视野
                // • 多轴疯狂旋转 (X+4π, Y+6π, Z+3π) 营造眩晕感
                // • power3.in加速度曲线 创造冲击力
                
                .to(
                    cube.scale,
                    {
                        x: 3, // 放大到3倍，几乎填满屏幕
                        y: 3,
                        z: 3,
                        duration: 1.7, // 1.7秒的渐进放大
                        ease: "power3.in", // 加速度曲线，越来越快
                    },
                    22.0 // 从22秒开始，衔接阶段2结束
                )
                // === 📷 摄像机冲入效果 - 营造"进入立方体"的第一人称视角 ===
                .to(
                    camera.position,
                    {
                        z: 2, // 从10冲入到2，距离立方体表面仅2个单位
                        duration: 1.7, // 与立方体放大同步
                        ease: "power3.in", // 同样的加速度，保持一致性
                        onUpdate: () => camera.lookAt(cube.position), // 始终锁定立方体中心
                    },
                    22.0 // 完全同步开始
                )
                
                // === 🌀 多轴疯狂旋转 - 创造迷幻的3D空间体验 ===
                .to(
                    cube.rotation,
                    {
                        x: cube.rotation.x + Math.PI * 4, // X轴旋转4整圈
                        y: cube.rotation.y + Math.PI * 6, // Y轴旋转6整圈  
                        z: cube.rotation.z + Math.PI * 3, // Z轴旋转3整圈
                        duration: 1.7, // 1.7秒内完成所有旋转
                        ease: "power2.out", // 开始快，后期缓慢，避免过度眩晕
                    },
                    22.0 // 三重动画完美同步
                )

                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                // 🎯 阶段 4: 优雅稳定化 - Elegant Stabilization & Reset (23.7-25.5s) [持续1.8秒]
                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                
                // 🎨 设计理念: 从混乱到秩序的优雅过渡
                // ────────────────────────────────────────────────────────────────
                // • 立方体尺寸回归正常 (3.0 → 1.0) 恢复可视性
                // • 摄像机退回安全距离 (2 → 10) 获得全局视角  
                // • 旋转归位到初始角度 营造"归来"的仪式感
                // • power2.out减速曲线 确保平滑着陆
                
                // === 📏 立方体尺寸归位 - 从巨大回归到标准 ===
                .to(
                    cube.scale,
                    {
                        x: 1, // 回到标准1倍大小
                        y: 1,
                        z: 1,
                        duration: 1.8, // 1.8秒缓慢收缩
                        ease: "power2.out", // 前期快速，后期平缓
                    },
                    23.7 // 紧接阶段3结束
                )
                
                // === 📷 摄像机退回标准位置 - 恢复最佳观察距离 ===
                .to(
                    camera.position,
                    {
                        z: 10, // 退回到标准观察距离
                        duration: 0.5, // 快速退回，优先恢复视野
                        ease: "power2.out", // 平滑减速
                        onUpdate: () => camera.lookAt(cube.position), // 保持焦点锁定
                    },
                    23.7 // 立即开始退回
                )
                
                // === 🧭 旋转角度归位 - 回到初始展示角度 ===
                .to(
                    cube.rotation,
                    {
                        x: -Math.PI * 0.81, // 恢复到初始的X轴倾斜角度
                        y: Math.PI * 0.25,  // 恢复到初始的Y轴旋转角度
                        z: 0,               // Z轴归零，无倾斜
                        duration: 1.8,      // 1.8秒缓慢归位
                        ease: "power2.out", // 平滑减速到完全静止
                    },
                    23.7 // 与尺寸归位同步开始
                )

                // ⏸️ 25.5s-26.0s: 静止准备期 - 为最终弹跳序列做准备

                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                // 🏀 阶段 5: 物理弹跳序列 - Physics-Based Bounce Finale (26.0-27.6s) [持续1.6秒]
                // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
                
                // 🎪 设计哲学: 模拟真实物理的弹跳衰减效果
                // ────────────────────────────────────────────────────────────────
                // • 3次递减弹跳: 1.15x → 1.08x → 1.04x (振幅逐渐衰减)
                // • 时间间隔递减: 0.5s → 0.35s → 0.5s (频率变化)
                // • 缓动曲线进化: power2.out → bounce.out → elastic.out
                // • 最终静止在27.6秒，完美收官

                // 📊 弹跳物理参数表:
                // ┌───────────┬──────────┬──────────┬──────────────┬─────────────────────┐
                // │   弹跳次   │  振幅倍数 │  持续时间 │    缓动曲线   │       视觉效果       │
                // ├───────────┼──────────┼──────────┼──────────────┼─────────────────────┤
                // │  第1次    │   1.15x  │   0.5s   │ power2.out   │ 强力弹起，快速回落   │
                // │  第2次    │   1.08x  │   0.4s   │ bounce.out   │ 中等弹起，弹性回落   │
                // │  第3次    │   1.04x  │   0.5s   │ elastic.out  │ 轻微弹起，弹性收尾   │
                // └───────────┴──────────┴──────────┴──────────────┴─────────────────────┘

                // === 🚀 第1次弹跳 - 最强烈的弹起效果 ===
                .to(
                    cube.scale,
                    {
                        x: 1.15, // 最大弹跳幅度，视觉冲击力最强
                        y: 1.15,
                        z: 1.15,
                        duration: 0.2, // 快速弹起，模拟瞬间冲击
                        ease: "power2.out", // 强力开始，快速减速
                    },
                    26.0 // 从静止期结束开始
                )
                .to(
                    cube.scale,
                    {
                        x: 1, // 回到标准尺寸
                        y: 1,
                        z: 1,
                        duration: 0.3, // 稍长的回落时间
                        ease: "bounce.out", // 弹性回落，有轻微二次弹跳
                    },
                    26.2 // 弹起后立即回落
                )

                // === ⚡ 第2次弹跳 - 中等强度的惯性弹跳 ===
                .to(
                    cube.scale,
                    {
                        x: 1.08, // 减小弹跳幅度，符合物理衰减规律
                        y: 1.08,
                        z: 1.08,
                        duration: 0.15, // 更快的弹起，模拟能量损失
                        ease: "power2.out", // 保持一致的弹起特性
                    },
                    26.6 // 间隔0.1秒，模拟连续弹跳
                )
                .to(
                    cube.scale,
                    {
                        x: 1, // 回归标准
                        y: 1,
                        z: 1,
                        duration: 0.25, // 中等回落时间
                        ease: "bounce.out", // 轻微的二次弹跳效果
                    },
                    26.75 // 第2次弹跳的回落
                )

                // === 🎈 第3次弹跳 - 最轻微的收尾弹跳 ===
                .to(
                    cube.scale,
                    {
                        x: 1.04, // 最小弹跳幅度，即将完全静止
                        y: 1.04,
                        z: 1.04,
                        duration: 0.1, // 最快的弹起，能量几乎耗尽
                        ease: "power2.out", // 最后的力量输出
                    },
                    27.1 // 间隔0.1秒后的最后弹跳
                )
                .to(
                    cube.scale,
                    {
                        x: 1, // 最终回到完全标准状态
                        y: 1,
                        z: 1,
                        duration: 0.4, // 最长的静止时间
                        ease: "elastic.out(1, 0.3)", // 弹性收尾，微妙的振荡后完全静止
                    },
                    27.2 // 27.6s实现完全静止，完美收官
                );
        } else {
            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            // 🔕 静态展示模式 - Static Display Mode (当动画被禁用时)
            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            // 直接设置到最终静止状态，跳过所有动画序列
            cube.rotation.set(-Math.PI * 0.81, Math.PI * 0.25, 0);
        }

        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        // 🖱️ 全局鼠标交互系统 - Global Mouse Interaction System
        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        
        // 🎯 功能说明: 
        // ────────────────────────────────────────────────────────────────
        // • 实时追踪鼠标位置和移动速度
        // • 为后续的物理效果提供输入数据  
        // • 标准化坐标系统 (-1 到 1 的NDC坐标)
        // • 基于时间的速度计算，确保帧率无关的一致性
        
        const handleGlobalMouseMove = (event) => {
            // === 🗺️ 坐标标准化 - 转换为Three.js标准NDC坐标系 ===
            const newMouseX = (event.clientX / window.innerWidth) * 2 - 1;   // [-1, 1]
            const newMouseY = -(event.clientY / window.innerHeight) * 2 + 1; // [-1, 1] Y轴翻转

            // === ⏱️ 基于时间的速度计算 - 确保帧率无关的准确测量 ===
            const currentTime = performance.now();
            const deltaTime = Math.max(currentTime - lastFrameTimeRef.current, 1); // 防除零

            const mouseDeltaX = newMouseX - lastMousePosRef.current.x;
            const mouseDeltaY = newMouseY - lastMousePosRef.current.y;

            // === 📐 速度向量计算 - 像素/秒为单位 ===
            mouseVelocityRef.current.x = mouseDeltaX / (deltaTime * 0.001);
            mouseVelocityRef.current.y = mouseDeltaY / (deltaTime * 0.001);

            // === 💾 状态更新 - 为下一帧做准备 ===
            mouseRef.current.x = newMouseX;
            mouseRef.current.y = newMouseY;
            lastMousePosRef.current = { x: newMouseX, y: newMouseY };
            lastFrameTimeRef.current = currentTime;
        };

        // === 🔗 事件监听器注册 ===
        window.addEventListener("mousemove", handleGlobalMouseMove);

        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        // 🔄 主渲染循环 - Main Render Loop
        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        
        // 🎪 核心职责:
        // ────────────────────────────────────────────────────────────────
        // • 维持60FPS的渲染循环
        // • 实时应用鼠标交互效果
        // • 处理动画完成后的物理模拟
        // • 确保所有3D对象的及时更新
        
        const animate = () => {
            requestAnimationFrame(animate);

            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            // ⏱️ 时间管理 - Frame-Rate Independent Timing
            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            const currentTime = performance.now();
            const deltaTime = Math.min((currentTime - lastFrameTimeRef.current) * 0.001, 0.02); // 限制最大时间步长
            lastFrameTimeRef.current = currentTime;

            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            // 🖱️ 自适应鼠标控制 - Adaptive Mouse Control
            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            if (!hasBeenDraggedRef.current) {
                // === 🎯 基础旋转计算 - 结合鼠标位置与预设角度 ===
                const baseTargetRotationY = mouseRef.current.x * 0.1 + Math.PI * 0.25;  // 水平跟随 + 45度基础偏移
                const baseTargetRotationX = mouseRef.current.y * 0.05 - Math.PI * 0.81; // 垂直跟随 + 倾斜角度

                // === 🌊 物理效果融合 - 基础旋转 + 晃动偏移 ===
                const finalRotationX = baseTargetRotationX + cubeRotationOffsetRef.current.x;
                const finalRotationY = baseTargetRotationY + cubeRotationOffsetRef.current.y;
                const finalRotationZ = cubeRotationOffsetRef.current.z;

                // === 🎛️ 平滑插值应用 - 2%速率的线性插值 ===
                cube.rotation.x += (finalRotationX - cube.rotation.x) * 0.02;
                cube.rotation.y += (finalRotationY - cube.rotation.y) * 0.02;
                cube.rotation.z += (finalRotationZ - cube.rotation.z) * 0.02;

                // === 🔄 缓慢自转 - 微妙的生命力表现 ===
                cube.rotation.y += 0.001; // 每帧0.001弧度的自转
            }

            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            // 🌊 高级物理晃动系统 - Advanced Physics Wobble System
            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            if (deltaTime > 0) {
                // === ⚙️ 物理常数定义 - Fine-tuned Physics Constants ===
                const springStrength = 12.0;        // 弹簧强度：回复力的强度
                const damping = 0.88;               // 阻尼系数：能量损失率
                const rotationSensitivity = 2.5;    // 旋转敏感度：鼠标影响程度
                const maxRotationOffset = 1.2;      // 最大偏移角度：防止过度旋转

                // === 🎯 鼠标力转换 - Mouse Velocity to Rotation Forces ===
                const rotationForceX = mouseVelocityRef.current.y * rotationSensitivity;      // Y速度影响X轴旋转
                const rotationForceY = -mouseVelocityRef.current.x * rotationSensitivity;     // X速度影响Y轴旋转(反向)
                const rotationForceZ = (mouseVelocityRef.current.x + mouseVelocityRef.current.y) * rotationSensitivity * 0.4; // 综合影响Z轴

                // === 🔧 弹簧回复力 - Spring Restoration Forces ===
                const rotationSpringForceX = -cubeRotationOffsetRef.current.x * springStrength;
                const rotationSpringForceY = -cubeRotationOffsetRef.current.y * springStrength;
                const rotationSpringForceZ = -cubeRotationOffsetRef.current.z * springStrength;

                // === ⚡ 速度积分更新 - Velocity Integration ===
                cubeRotationVelocityRef.current.x += (rotationForceX + rotationSpringForceX) * deltaTime;
                cubeRotationVelocityRef.current.y += (rotationForceY + rotationSpringForceY) * deltaTime;
                cubeRotationVelocityRef.current.z += (rotationForceZ + rotationSpringForceZ) * deltaTime;

                // === 🛑 阻尼应用 - Damping Application ===
                cubeRotationVelocityRef.current.x *= damping; // 能量衰减
                cubeRotationVelocityRef.current.y *= damping;
                cubeRotationVelocityRef.current.z *= damping;

                // === 📐 位置积分更新 - Position Integration ===
                cubeRotationOffsetRef.current.x += cubeRotationVelocityRef.current.x * deltaTime;
                cubeRotationOffsetRef.current.y += cubeRotationVelocityRef.current.y * deltaTime;
                cubeRotationOffsetRef.current.z += cubeRotationVelocityRef.current.z * deltaTime;

                // === 🚫 边界限制 - Boundary Constraints ===
                cubeRotationOffsetRef.current.x = Math.max(-maxRotationOffset, Math.min(maxRotationOffset, cubeRotationOffsetRef.current.x));
                cubeRotationOffsetRef.current.y = Math.max(-maxRotationOffset, Math.min(maxRotationOffset, cubeRotationOffsetRef.current.y));
                cubeRotationOffsetRef.current.z = Math.max(-maxRotationOffset, Math.min(maxRotationOffset, cubeRotationOffsetRef.current.z));

                // === 🎈 微妙浮动效果 - Subtle Floating Animation ===
                const floatY = Math.sin(currentTime * 0.001) * 0.05; // 0.05单位的垂直浮动
                cube.position.set(0, floatY, 0); // 仅Y轴浮动，保持X/Z为0

                // === 📉 鼠标速度衰减 - Natural Mouse Velocity Decay ===
                mouseVelocityRef.current.x *= 0.92; // 8%的自然衰减
                mouseVelocityRef.current.y *= 0.92;
            }

            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            // 🎬 视频纹理更新系统 - Video Texture Update System
            // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
            // 遍历立方体的每个面，检查并更新视频纹理
            cube.children.forEach((face) => {
                if (face.material && face.material.map && face.material.map.image && face.material.map.image.tagName === "VIDEO") {
                    const video = face.material.map.image;
                    // 仅在视频播放且数据就绪时更新纹理
                    if (!video.paused && video.readyState >= 2) {
                        face.material.map.needsUpdate = true; // 标记纹理需要更新
                    }
                }
            });

            // === 🖼️ 最终渲染 - Final Render ===
            renderer.render(scene, camera);
        };

        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        // 🎊 组件就绪回调 - Component Ready Callback
        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        if (onReadyRef.current) {
            // 延迟100ms调用，确保渲染完成后再通知父组件
            setTimeout(() => {
                onReadyRef.current(); // 通知父组件HeroCube已准备就绪
            }, 100);
        }

        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        // 🗂️ WebGL资源管理 - WebGL Resource Management  
        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        // 注册所有WebGL资源到资源管理器，标记为持久资源防止自动清理
        const resourceId = webglResourceManager.registerResources(
            "HeroCube", // 资源标识符
            {
                renderer,   // WebGL渲染器
                scene,      // 3D场景
                geometry,   // 几何体
                materials,  // 材质数组
                textures: materials.map((mat) => mat.map).filter(Boolean), // 提取所有纹理
            },
            { persistent: true } // 设置为持久资源，防止被垃圾回收
        );

        // === 🚀 启动渲染循环 ===
        animate(); // 开始主渲染循环

        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        // 🧹 清理函数 - Cleanup Function (React useEffect cleanup)
        // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
        return () => {
            // === 🎭 停止GSAP动画 ===
            if (openingAnimationRef.current) {
                openingAnimationRef.current.kill(); // 强制停止时间线动画
            }

            // === 🗑️ 移除DOM元素 ===
            if (mountElement && renderer.domElement) {
                mountElement.removeChild(renderer.domElement); // 移除canvas元素
            }

            // === 🎧 移除事件监听器 ===
            window.removeEventListener("mousemove", handleGlobalMouseMove);
            window.removeEventListener("resize", handleCanvasResize);

            // === 💾 WebGL资源清理 ===
            webglResourceManager.cleanup(resourceId); // 通过资源管理器统一清理
        };
    }, [faces, texturesReady, enableOpeningAnimation]); // 减少依赖项，避免频繁重建

    // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    // 🎨 JSX渲染 - Component JSX Render
    // ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    return (
        <div className="relative">
            <div
                ref={mountRef}
                className="fixed inset-0 w-full h-full overflow-hidden"
                style={{
                    pointerEvents: "none", // 完全禁用鼠标交互，作为纯视觉背景
                    zIndex: 5, // 层级：高于背景(0-4)，低于内容(6+)
                    // South Island Green：新西兰南岛绿色科技外发光效果
                    filter: "drop-shadow(0 0 30px rgba(16, 185, 129, 0.3)) drop-shadow(0 0 80px rgba(0, 255, 136, 0.2))",
                }}
            />
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// 📋 组件属性类型定义 - Component PropTypes Definition
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
HeroCube.propTypes = {
    enableOpeningAnimation: PropTypes.bool, // 是否启用开场动画序列
    onAnimationComplete: PropTypes.func,    // 动画完成回调函数
    onReady: PropTypes.func,                // 组件就绪回调函数
};

// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
// 📤 组件导出 - Component Export
// ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
export default HeroCube;
