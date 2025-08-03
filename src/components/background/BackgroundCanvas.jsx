import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { EffectFuse } from './EffectFuse';
import { EffectMonjori } from './EffectMonjori';
import EffectHeartBeats from './EffectHeartBeats';
import { EffectLorenzAttractor } from './EffectLorenzAttractor';
import { EffectChaos } from './EffectChaos';
import { debounce } from 'lodash';

const BackgroundCanvas = ({ effectType = 'effectfuse' }) => {
    const canvasRef = useRef(null);
    const effectInstanceRef = useRef(null);
    const cleanupTimeoutRef = useRef(null);

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
            canvas.style.zIndex = '-10'; // 背景层级
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
                
                // 延迟清理旧效果
                cleanupTimeoutRef.current = setTimeout(() => {
                    try {
                        if (typeof currentEffect.stop === 'function') {
                            currentEffect.stop();
                        } else if (typeof currentEffect.destroy === 'function') {
                            currentEffect.destroy();
                        }
                    } catch (error) {
                        console.error('Error stopping previous effect:', error);
                    }
                }, 100);
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
                console.log(`BackgroundCanvas: Creating effect of type: ${effectType}`);
                switch (effectType) {
                    case 'effectfuse': {
                        effectInstanceRef.current = new EffectFuse(canvas, defaultParams);
                        break;
                    }
                    case 'effectmonjori':
                        effectInstanceRef.current = EffectMonjori(canvas, defaultParams);
                        break;
                    case 'effectheartbeats':
                        effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams);
                        break;
                    case 'effectlorenz': {
                        effectInstanceRef.current = new EffectLorenzAttractor(canvas, defaultParams);
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
                        effectInstanceRef.current = new EffectChaos(canvas, chaosParams);
                        break;
                    }
                    default:
                        effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams);
                }

                // 启动效果 - 注意不同特效的启动方式
                if (effectInstanceRef.current?.start) {
                    effectInstanceRef.current.start();
                } else if (effectType === 'effectmonjori') {
                    // EffectMonjori在创建时自动启动，不需要调用start()
                }
            } catch (error) {
                console.error('Error creating background effect:', error);
                
                // 如果是WebGL特效失败，回退到简单特效
                if (effectType === 'effectfuse' || effectType === 'effectlorenz' || effectType === 'effectchaos') {
                    console.warn(`${effectType} failed, falling back to EffectHeartBeats`);
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
            console.log('BackgroundCanvas: Cleaning up effect and canvas...');
            
            window.removeEventListener('resize', debouncedResize);
            
            // 清除清理定时器
            if (cleanupTimeoutRef.current) {
                clearTimeout(cleanupTimeoutRef.current);
                cleanupTimeoutRef.current = null;
            }
            
            // 强制清理效果实例
            if (effectInstanceRef.current) {
                try {
                    console.log(`BackgroundCanvas: Disposing effect of type: ${effectType}`);
                    
                    // 调用stop方法
                    if (typeof effectInstanceRef.current.stop === 'function') {
                        effectInstanceRef.current.stop();
                    } else if (typeof effectInstanceRef.current.destroy === 'function') {
                        effectInstanceRef.current.destroy();
                    }
                    
                    // 强制清空引用
                    effectInstanceRef.current = null;
                } catch (error) {
                    console.error('Error cleaning up effect:', error);
                    effectInstanceRef.current = null;
                }
            }
            
            // 强制清理画布
            if (canvas && document.body.contains(canvas)) {
                try {
                    // 清理canvas上下文
                    const context = canvas.getContext('webgl') || canvas.getContext('webgl2') || canvas.getContext('2d');
                    if (context) {
                        if (context.getExtension && context.getExtension('WEBGL_lose_context')) {
                            context.getExtension('WEBGL_lose_context').loseContext();
                        }
                    }
                    
                    // 移除canvas
                    document.body.removeChild(canvas);
                    console.log('BackgroundCanvas: Canvas removed from DOM');
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
            
            console.log('BackgroundCanvas: Cleanup completed');
        };
    }, [effectType]);

    return null; // 这个组件不渲染任何DOM
};

BackgroundCanvas.propTypes = {
    effectType: PropTypes.string
};

export default BackgroundCanvas;
