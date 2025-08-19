import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { EffectFuse } from './EffectFuse';
import { EffectMonjori } from './EffectMonjori';
import { EffectLorenzAttractor } from './EffectLorenzAttractor';
import { EffectChaos } from './EffectChaos';
import { EffectRippleWaves } from './EffectRippleWaves';
import { debounce } from 'lodash';
import webglResourceManager from '../../utils/WebGLResourceManager';
import { useAppStore } from '../../store/useAppStore';

const BackgroundCanvas = ({ effectType = 'effectfuse', sectionName = 'unknown' }) => {
    const canvasRef = useRef(null);
    const effectInstanceRef = useRef(null);
    const cleanupTimeoutRef = useRef(null);
    const resourceIdRef = useRef(null); // 存储资源ID以便清理
    
    // 获取当前主题
    const theme = useAppStore(state => state.theme);

    useEffect(() => {
        // 清除之前的清理定时器
        if (cleanupTimeoutRef.current) {
            clearTimeout(cleanupTimeoutRef.current);
            cleanupTimeoutRef.current = null;
        }

        let canvas = canvasRef.current;
        if (!canvas) {
            // 创建画布
            canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '-1'; // 背景层级，在内容后面
            canvas.style.pointerEvents = 'none';
            canvas.style.background = 'transparent'; // 确保背景透明
            
            // 设置合理的canvas尺寸 - 使用固定尺寸避免高DPI问题
            const displayWidth = window.innerWidth;
            const displayHeight = window.innerHeight;
            
            // 强制使用合理的canvas分辨率，不考虑设备像素比
            const maxCanvasWidth = 1280;
            const maxCanvasHeight = 720;
            
            // 根据显示尺寸的比例来计算canvas尺寸，但不超过最大值
            const aspectRatio = displayWidth / displayHeight;
            let canvasWidth, canvasHeight;
            
            if (aspectRatio > maxCanvasWidth / maxCanvasHeight) {
                // 宽屏
                canvasWidth = Math.min(maxCanvasWidth, displayWidth);
                canvasHeight = Math.floor(canvasWidth / aspectRatio);
            } else {
                // 高屏
                canvasHeight = Math.min(maxCanvasHeight, displayHeight);
                canvasWidth = Math.floor(canvasHeight * aspectRatio);
            }
            
            // 确保最小尺寸
            canvasWidth = Math.max(canvasWidth, 800);
            canvasHeight = Math.max(canvasHeight, 600);
            
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            

            
            // 注意：不要对canvas context进行缩放，WebGL会自己处理像素比
            // 2D context缩放可能会干扰WebGL渲染
            
            document.body.appendChild(canvas);
            canvasRef.current = canvas;
            

        }

        // 设置画布大小
        const resizeCanvas = () => {
            if (canvas) {
                try {
                    // 使用固定尺寸策略，避免高DPI导致的巨大canvas
                    const displayWidth = window.innerWidth;
                    const displayHeight = window.innerHeight;
                    
                    // 强制使用合理的canvas分辨率
                    const maxCanvasWidth = 1280;
                    const maxCanvasHeight = 720;
                    
                    // 根据显示尺寸的比例来计算canvas尺寸
                    const aspectRatio = displayWidth / displayHeight;
                    let canvasWidth, canvasHeight;
                    
                    if (aspectRatio > maxCanvasWidth / maxCanvasHeight) {
                        // 宽屏
                        canvasWidth = Math.min(maxCanvasWidth, displayWidth);
                        canvasHeight = Math.floor(canvasWidth / aspectRatio);
                    } else {
                        // 高屏
                        canvasHeight = Math.min(maxCanvasHeight, displayHeight);
                        canvasWidth = Math.floor(canvasHeight * aspectRatio);
                    }
                    
                    // 确保最小尺寸
                    canvasWidth = Math.max(canvasWidth, 800);
                    canvasHeight = Math.max(canvasHeight, 600);
                    
                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;
                    

                    
                    if (effectInstanceRef.current?.onResize) {
                        effectInstanceRef.current.onResize(canvas.width, canvas.height);
                    }
                } catch (error) {
                    console.error('Error resizing canvas:', error);
                }
            }
        };

        resizeCanvas();

        // 创建效果实例
        const createEffect = () => {
            // 清理之前的效果（延迟清理以避免快速切换问题）
            if (effectInstanceRef.current) {
                const currentEffect = effectInstanceRef.current;
                effectInstanceRef.current = null;
                
                // 延长延迟清理时间，减少和SmartScrollManager清理的冲突
                cleanupTimeoutRef.current = setTimeout(() => {
                    try {
                        if (typeof currentEffect.stop === 'function') {
                            currentEffect.stop();
                        } else if (typeof currentEffect.destroy === 'function') {
                            currentEffect.destroy();
                        }
                    } catch (error) {
                        // 静默处理清理错误，避免页面切换时的噪音
                        // 仅在开发环境输出错误
                        if (import.meta.env.DEV) {
                            console.error('Error stopping previous effect:', error);
                        }
                    }
                }, 200); // 延长到200ms，给资源管理器更多时间
            }

            // 默认参数配置 - 使用原始参数值
            const defaultParams = {
                brightness: 0.6,    // 原始亮度值
                blobiness: 1.5,     // 原始粘性值
                particles: 10,      // 原始粒子数量
                scanlines: false,
                energy: 1.01,       // 原始能量值
                timeScale: 1.0      // 原始时间缩放
            };

            try {

                  // 创建新效果
                // 创建section-specific的componentId
                const componentId = `BackgroundCanvas_${sectionName}`;
                
                switch (effectType) {
                    case 'effectfuse': {
                        effectInstanceRef.current = new EffectFuse(canvas, defaultParams, componentId);
                        break;
                    }
                    case 'effectmonjori':
                        effectInstanceRef.current = EffectMonjori(canvas, defaultParams, componentId);
                        break;
                    case 'effectheartbeats':
                        effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams, componentId);
                        break;
                    case 'effectlorenz': {
                        effectInstanceRef.current = new EffectLorenzAttractor(canvas, defaultParams, componentId);
                        break;
                    }

                    case 'effectchaos': {
                        // Chaos 效果 - 减少粒子数量，改善分布均匀性
                        const chaosParams = {
                            particleCount: 2000,   // 减少到一半
                            branches: 3,
                            radius: 9,
                            spin: 1,
                            randomness: 0.15,      // 降低随机性避免聚集
                            randomnessPower: 3,
                            size: 0.12,
                            colorInside: defaultParams.colorInside || '#fff8dc',
                            colorOutside: defaultParams.colorOutside || '#ffa575'
                        };
                        effectInstanceRef.current = new EffectChaos(canvas, chaosParams, componentId);
                        break;
                    }

                    case 'effectripple': {
                        // Ripple Waves 效果 - 波纹传播效果
                        const rippleParams = {
                            waveSourceCount: 6,       // 波源数量
                            maxRings: 8,              // 每个波源最大圆环数
                            waveSpeed: 1.2,           // 波传播速度
                            ringSpacing: 45,          // 圆环间距
                            maxRadius: 400            // 最大半径
                        };
                        effectInstanceRef.current = new EffectRippleWaves(canvas, rippleParams, componentId);
                        break;
                    }

                    default:
                        effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams, componentId);
                }

                // 启动效果 - 注意不同特效的启动方式
                if (effectInstanceRef.current?.start) {
                    effectInstanceRef.current.start();
                } else if (effectType === 'effectmonjori') {
                    // EffectMonjori在创建时自动启动，不需要调用start()
                }
                
                // 注册WebGL资源到资源管理器，使用section-specific的componentId
                resourceIdRef.current = webglResourceManager.registerResources(componentId, {
                    canvas: canvas,
                    effect: effectInstanceRef.current,
                    effectType: effectType
                }, { persistent: false }); // 背景效果为非持久资源，可以被智能清理
                
                if (import.meta.env.DEV) {
                    console.log(`🎨 背景效果已启动: ${effectType} (Section: ${sectionName})`);
                }
            } catch (error) {
                console.error('Error creating background effect:', error);
                
                // 如果是WebGL特效失败，回退到简单特效
                if (effectType === 'effectfuse' || effectType === 'effectlorenz' || effectType === 'effectchaos') {
                    // WebGL效果失败，使用fallback
                    try {
                        effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams);
                        if (effectInstanceRef.current?.start) {
                            effectInstanceRef.current.start();
                        }
                    } catch (fallbackError) {
                        console.error('Error creating fallback effect:', fallbackError);
                        effectInstanceRef.current = null;
                    }
                } else {
                    // 对于其他特效失败，设为null
                    effectInstanceRef.current = null;
                }
            }
        };

        createEffect();

        // 防抖的resize处理
        const debouncedResize = debounce(resizeCanvas, 250);
        window.addEventListener('resize', debouncedResize);

        return () => {
            // 清理效果和画布
            
            window.removeEventListener('resize', debouncedResize);
            
            // 清除清理定时器
            if (cleanupTimeoutRef.current) {
                clearTimeout(cleanupTimeoutRef.current);
                cleanupTimeoutRef.current = null;
            }
            
            // 立即清理效果实例（避免延迟清理导致的竞态条件）
            if (effectInstanceRef.current) {
                try {
                    // 停止当前效果
                    if (typeof effectInstanceRef.current.stop === 'function') {
                        effectInstanceRef.current.stop();
                    } else if (typeof effectInstanceRef.current.destroy === 'function') {
                        effectInstanceRef.current.destroy();
                    }
                } catch (error) {
                    console.error('Error cleaning up effect:', error);
                } finally {
                    // 确保引用被清空
                    effectInstanceRef.current = null;
                }
            }
            
            // 使用资源管理器清理背景效果相关的资源
            if (resourceIdRef.current) {
                webglResourceManager.cleanup(resourceIdRef.current);
                resourceIdRef.current = null;
            } else {
                // 兼容旧的清理方式
                webglResourceManager.cleanupByComponent(`BackgroundCanvas_${sectionName}`);
            }
            
            // 强制清理画布
            if (canvas && document.body.contains(canvas)) {
                try {
                    // 移除canvas（不强制丢失上下文，让渲染器自然清理）
                    document.body.removeChild(canvas);
                } catch (error) {
                    console.error('Error removing canvas:', error);
                }
            }
            
            // 清空canvas引用
            canvasRef.current = null;
            
            // 强制垃圾回收提示（开发环境）
            if (typeof window !== 'undefined' && window.gc) {
                setTimeout(() => window.gc(), 100);
            }
        };
    }, [effectType, sectionName]);

    // 监听主题变化，更新粒子颜色
    useEffect(() => {
        // 支持主题色更新的效果类型
        const supportedEffects = ['effectchaos', 'effectlorenz', 'effectheartbeats', 'effectmonjori', 'effectripple'];
        
        if (effectInstanceRef.current && 
            effectInstanceRef.current.updateThemeColors && 
            supportedEffects.includes(effectType)) {
            effectInstanceRef.current.updateThemeColors();
        }
    }, [theme, effectType]);

    return null; // 这个组件不渲染任何DOM
};

BackgroundCanvas.propTypes = {
    effectType: PropTypes.string,
    sectionName: PropTypes.string
};

export default BackgroundCanvas;
