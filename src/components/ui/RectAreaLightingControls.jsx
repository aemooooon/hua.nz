import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * RectAreaLighting Control Panel
 * 用于实时调整RectAreaLighting效果的控制面板
 * 使用字母键快捷键，避免与页面导航冲突
 */
const RectAreaLightingControls = ({ rectAreaLighting, isVisible = false, isPointerLocked = false }) => {
    const [params, setParams] = useState({
        intensity: 4,
        animationSpeed: 0.0008,
        enableAnimation: true,
        showHelpers: false,
        currentPreset: 'soft'
    });
    const [showHelp, setShowHelp] = useState(false);

    // 定义回调函数（在useEffect之前定义以避免hoisting问题）
    const applyPreset = useCallback((presetName) => {
        if (rectAreaLighting && rectAreaLighting.current) {
            rectAreaLighting.current.setPreset(presetName);
            const status = rectAreaLighting.current.getStatus();
            setParams(prev => ({
                ...prev,
                intensity: status.intensity,
                animationSpeed: status.animationSpeed,
                currentPreset: presetName
            }));
        }
    }, [rectAreaLighting]);

    const adjustIntensity = useCallback((delta) => {
        setParams(prev => {
            const newIntensity = Math.max(1, Math.min(10, prev.intensity + delta));
            if (rectAreaLighting && rectAreaLighting.current) {
                rectAreaLighting.current.setIntensity(newIntensity);
            }
            return { ...prev, intensity: newIntensity };
        });
    }, [rectAreaLighting]);

    const toggleAnimation = useCallback(() => {
        if (rectAreaLighting && rectAreaLighting.current) {
            rectAreaLighting.current.toggleAnimation();
            const status = rectAreaLighting.current.getStatus();
            setParams(prev => ({
                ...prev,
                enableAnimation: status.enableAnimation
            }));
        }
    }, [rectAreaLighting]);

    // 键盘快捷键控制 - 使用字母键避免冲突
    useEffect(() => {
        if (!isPointerLocked) return;

        const handleKeyDown = (event) => {
            // 只拦截我们使用的按键
            if (['KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyG'].includes(event.code)) {
                event.preventDefault();
                event.stopPropagation();
            }

            switch (event.code) {
                case 'KeyR': // R键：暖色调预设
                    applyPreset('warm');
                    break;
                case 'KeyT': // T键：冷色调预设
                    applyPreset('cool');
                    break;
                case 'KeyY': // Y键：戏剧性预设
                    applyPreset('dramatic');
                    break;
                case 'KeyU': // U键：柔和预设
                    applyPreset('soft');
                    break;
                case 'KeyI': // I键：增加强度
                    adjustIntensity(0.5);
                    break;
                case 'KeyO': // O键：降低强度
                    adjustIntensity(-0.5);
                    break;
                case 'KeyP': // P键：切换动画
                    toggleAnimation();
                    break;
                case 'KeyG': // G键：显示/隐藏帮助
                    setShowHelp(prev => !prev);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isPointerLocked, applyPreset, adjustIntensity, toggleAnimation]);

    if (!isVisible) return null;

    // 在指针锁定模式下显示键盘控制界面
    if (isPointerLocked) {
        return (
            <div className="fixed top-4 left-4 z-50">
                {/* RectAreaLighting键盘控制界面 */}
                <div className="bg-black/90 text-white p-4 rounded-lg backdrop-blur-sm 
                              border border-white/20 min-w-[300px]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">🎨 区域光照</h3>
                        <button
                            onClick={() => setShowHelp(!showHelp)}
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded
                                     transition-colors duration-200"
                        >
                            {showHelp ? '隐藏' : '帮助'}
                        </button>
                    </div>
                    
                    {/* 当前状态显示 */}
                    <div className="mb-4 text-sm space-y-1">
                        <div className="flex justify-between">
                            <span>预设:</span>
                            <span className="text-blue-400 capitalize">{params.currentPreset}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>强度:</span>
                            <span className="text-green-400">{params.intensity.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>动画:</span>
                            <span className={params.enableAnimation ? 'text-green-400' : 'text-red-400'}>
                                {params.enableAnimation ? '启用' : '禁用'}
                            </span>
                        </div>
                    </div>

                    {/* 快捷键列表 */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium border-b border-white/20 pb-1">快捷键</h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">R</kbd>
                                <span>暖色调</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">T</kbd>
                                <span>冷色调</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">Y</kbd>
                                <span>戏剧性</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">U</kbd>
                                <span>柔和</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">I</kbd>
                                <span>增强度</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">O</kbd>
                                <span>降强度</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">P</kbd>
                                <span>切换动画</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">G</kbd>
                                <span>帮助</span>
                            </div>
                        </div>

                        {/* 详细帮助信息 */}
                        {showHelp && (
                            <div className="mt-4 p-3 bg-gray-800/50 rounded text-xs">
                                <h5 className="font-medium mb-2">🎨 RectAreaLight 效果</h5>
                                <div className="space-y-1 text-gray-300">
                                    <div><strong>暖色调(R):</strong> 温馨红黄橙色系</div>
                                    <div><strong>冷色调(T):</strong> 清新蓝绿紫色系</div>
                                    <div><strong>戏剧性(Y):</strong> 高对比度强烈色彩</div>
                                    <div><strong>柔和(U):</strong> 淡雅舒适色调</div>
                                    <div className="text-gray-400 mt-2">💡 区域光源创造柔和漫射照明效果</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 普通模式下不显示（RectAreaLighting主要在第一人称模式体验）
    return null;
};

RectAreaLightingControls.propTypes = {
    rectAreaLighting: PropTypes.object,
    isVisible: PropTypes.bool,
    isPointerLocked: PropTypes.bool
};

export default RectAreaLightingControls;
