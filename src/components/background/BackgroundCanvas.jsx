import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { EffectFuse } from './EffectFuse';
import { EffectMonjori } from './EffectMonjori';
import EffectHeartBeats from './EffectHeartBeats';
import { EffectLorenzAttractor } from './EffectLorenzAttractor';
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
            canvas.style.zIndex = '-10';
            canvas.style.pointerEvents = 'none';
            document.body.appendChild(canvas);
            canvasRef.current = canvas;
        }

        // 设置画布大小
        const resizeCanvas = () => {
            if (canvas) {
                try {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    if (effectInstanceRef.current?.onResize) {
                        effectInstanceRef.current.onResize(window.innerWidth, window.innerHeight);
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

            // 默认参数配置
            const defaultParams = {
                brightness: 40000,
                blobiness: 2.0,
                particles: 20,
                scanlines: false,
                energy: 0.5
            };

            try {
                // 创建新效果
                switch (effectType) {
                    case 'effectfuse':
                        effectInstanceRef.current = new EffectFuse(canvas, defaultParams);
                        break;
                    case 'effectmonjori':
                        effectInstanceRef.current = EffectMonjori(canvas, defaultParams);
                        break;
                    case 'effectheartbeats':
                        effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams);
                        break;
                    case 'effectlorenz':
                        effectInstanceRef.current = new EffectLorenzAttractor(canvas, defaultParams);
                        break;
                    default:
                        effectInstanceRef.current = new EffectFuse(canvas, defaultParams);
                }

                // 检查WebGL上下文是否可用
                if (effectType === 'effectfuse' || effectType === 'effectlorenz') {
                    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                    if (!gl) {
                        console.warn('WebGL not supported, falling back to canvas effect');
                        effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams);
                    }
                }

                // 启动效果
                if (effectInstanceRef.current?.start) {
                    effectInstanceRef.current.start();
                }
            } catch (error) {
                console.error('Error creating background effect:', error);
                // 回退到最简单的效果
                try {
                    effectInstanceRef.current = new EffectHeartBeats(canvas, defaultParams);
                    if (effectInstanceRef.current?.start) {
                        effectInstanceRef.current.start();
                    }
                } catch (fallbackError) {
                    console.error('Error creating fallback effect:', fallbackError);
                    effectInstanceRef.current = null;
                }
            }
        };

        createEffect();

        // 防抖的resize处理
        const debouncedResize = debounce(resizeCanvas, 250);
        window.addEventListener('resize', debouncedResize);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            
            // 清除清理定时器
            if (cleanupTimeoutRef.current) {
                clearTimeout(cleanupTimeoutRef.current);
                cleanupTimeoutRef.current = null;
            }
            
            // 清理效果实例
            if (effectInstanceRef.current) {
                try {
                    if (typeof effectInstanceRef.current.stop === 'function') {
                        effectInstanceRef.current.stop();
                    } else if (typeof effectInstanceRef.current.destroy === 'function') {
                        effectInstanceRef.current.destroy();
                    }
                } catch (error) {
                    console.error('Error cleaning up effect:', error);
                }
                effectInstanceRef.current = null;
            }
            
            // 清理画布
            if (canvas && document.body.contains(canvas)) {
                try {
                    document.body.removeChild(canvas);
                } catch (error) {
                    console.error('Error removing canvas:', error);
                }
            }
            canvasRef.current = null;
        };
    }, [effectType]);

    return null; // 这个组件不渲染任何DOM
};

BackgroundCanvas.propTypes = {
    effectType: PropTypes.string
};

export default BackgroundCanvas;
