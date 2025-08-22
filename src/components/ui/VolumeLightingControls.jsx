import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Volume Lighting Control Panel
 * 用于实时调整体积光照效果的控制面板
 * 支持键盘快捷键控制（在指针锁定模式下）
 */
const VolumeLightingControls = ({ volumeLighting, isVisible = false, isPointerLocked = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [params, setParams] = useState({
        intensity: 0.8,
        fogDensity: 0.015,
        visible: true
    });
    const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

    const handleParamChange = useCallback((param, value) => {
        setParams(prev => {
            const newParams = { ...prev, [param]: value };
            
            if (volumeLighting && volumeLighting.current) {
                switch (param) {
                    case 'intensity':
                        volumeLighting.current.setIntensity(value);
                        break;
                    case 'fogDensity':
                        volumeLighting.current.setFogDensity(value);
                        break;
                    case 'visible':
                        if (volumeLighting.current.volumeMesh) {
                            volumeLighting.current.volumeMesh.visible = value;
                        }
                        break;
                }
            }
            
            return newParams;
        });
    }, [volumeLighting]);

    const setPreset = useCallback((presetName) => {
        let newParams;
        
        switch (presetName) {
            case 'light':
                newParams = { intensity: 0.3, fogDensity: 0.008, visible: true };
                break;
            case 'standard':
                newParams = { intensity: 0.8, fogDensity: 0.015, visible: true };
                break;
            case 'heavy':
                newParams = { intensity: 1.5, fogDensity: 0.025, visible: true };
                break;
            case 'off':
                newParams = { intensity: 0, fogDensity: 0.015, visible: false };
                break;
            default:
                return;
        }
        
        setParams(newParams);
        
        if (volumeLighting && volumeLighting.current) {
            volumeLighting.current.setIntensity(newParams.intensity);
            volumeLighting.current.setFogDensity(newParams.fogDensity);
            if (volumeLighting.current.volumeMesh) {
                volumeLighting.current.volumeMesh.visible = newParams.visible;
            }
        }
    }, [volumeLighting]);

    // 键盘快捷键控制
    useEffect(() => {
        if (!isPointerLocked) return;

        const handleKeyDown = (event) => {
            // 阻止按键事件冒泡，避免与画廊移动控制冲突
            if (['KeyV', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'KeyH', 'BracketLeft', 'BracketRight', 'Semicolon', 'Quote'].includes(event.code)) {
                event.preventDefault();
                event.stopPropagation();
            }

            switch (event.code) {
                case 'KeyV': // V键：切换体积光照可见性
                    setParams(prev => {
                        const newVisible = !prev.visible;
                        if (volumeLighting && volumeLighting.current && volumeLighting.current.volumeMesh) {
                            volumeLighting.current.volumeMesh.visible = newVisible;
                        }
                        return { ...prev, visible: newVisible };
                    });
                    break;
                case 'Digit1': // 1键：轻微雾气
                    setPreset('light');
                    break;
                case 'Digit2': // 2键：标准效果
                    setPreset('standard');
                    break;
                case 'Digit3': // 3键：浓郁大气
                    setPreset('heavy');
                    break;
                case 'Digit4': // 4键：关闭效果
                    setPreset('off');
                    break;
                case 'KeyH': // H键：显示/隐藏帮助
                    setShowKeyboardHelp(prev => !prev);
                    break;
                case 'BracketLeft': // [键：降低强度
                    setParams(prev => {
                        const newIntensity = Math.max(0, prev.intensity - 0.1);
                        if (volumeLighting && volumeLighting.current) {
                            volumeLighting.current.setIntensity(newIntensity);
                        }
                        return { ...prev, intensity: newIntensity };
                    });
                    break;
                case 'BracketRight': // ]键：提高强度
                    setParams(prev => {
                        const newIntensity = Math.min(2, prev.intensity + 0.1);
                        if (volumeLighting && volumeLighting.current) {
                            volumeLighting.current.setIntensity(newIntensity);
                        }
                        return { ...prev, intensity: newIntensity };
                    });
                    break;
                case 'Semicolon': // ;键：降低密度
                    setParams(prev => {
                        const newDensity = Math.max(0, prev.fogDensity - 0.002);
                        if (volumeLighting && volumeLighting.current) {
                            volumeLighting.current.setFogDensity(newDensity);
                        }
                        return { ...prev, fogDensity: newDensity };
                    });
                    break;
                case 'Quote': // '键：提高密度
                    setParams(prev => {
                        const newDensity = Math.min(0.05, prev.fogDensity + 0.002);
                        if (volumeLighting && volumeLighting.current) {
                            volumeLighting.current.setFogDensity(newDensity);
                        }
                        return { ...prev, fogDensity: newDensity };
                    });
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isPointerLocked, volumeLighting, setPreset]);

    if (!isVisible) return null;

    // 在指针锁定模式下，显示键盘快捷键提示而不是鼠标UI
    if (isPointerLocked) {
        return (
            <div className="fixed top-4 right-4 z-50">
                {/* 键盘快捷键提示 */}
                <div className="bg-black/90 text-white p-4 rounded-lg backdrop-blur-sm 
                              border border-white/20 min-w-[320px]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">🌫️ 体积光照控制</h3>
                        <button
                            onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded
                                     transition-colors duration-200"
                        >
                            {showKeyboardHelp ? '隐藏' : '帮助'}
                        </button>
                    </div>
                    
                    {/* 当前状态显示 */}
                    <div className="mb-4 text-sm space-y-1">
                        <div className="flex justify-between">
                            <span>状态:</span>
                            <span className={params.visible ? 'text-green-400' : 'text-red-400'}>
                                {params.visible ? '已启用' : '已禁用'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>强度:</span>
                            <span className="text-blue-400">{params.intensity.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>密度:</span>
                            <span className="text-purple-400">{(params.fogDensity * 1000).toFixed(1)}</span>
                        </div>
                    </div>

                    {/* 快捷键列表 */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium border-b border-white/20 pb-1">快捷键</h4>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">V</kbd>
                                <span>开关</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">H</kbd>
                                <span>帮助</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">1</kbd>
                                <span>轻微</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">2</kbd>
                                <span>标准</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">3</kbd>
                                <span>浓郁</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <kbd className="px-2 py-1 bg-gray-700 rounded font-mono">4</kbd>
                                <span>关闭</span>
                            </div>
                        </div>

                        {/* 详细帮助信息 */}
                        {showKeyboardHelp && (
                            <div className="mt-4 p-3 bg-gray-800/50 rounded text-xs">
                                <h5 className="font-medium mb-2">🎹 详细控制</h5>
                                <div className="space-y-1">
                                    <div><kbd className="px-1 bg-gray-700 rounded font-mono">[</kbd> / <kbd className="px-1 bg-gray-700 rounded font-mono">]</kbd> 调节强度</div>
                                    <div><kbd className="px-1 bg-gray-700 rounded font-mono">;</kbd> / <kbd className="px-1 bg-gray-700 rounded font-mono">&apos;</kbd> 调节密度</div>
                                    <div className="text-gray-400 mt-2">💡 靠近画作观察体积光照效果</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-4 right-4 z-50">
            {/* Control Panel Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm 
                          hover:bg-black/90 transition-all duration-200 mb-2"
            >
                🌫️ Volume Lighting {isOpen ? '▼' : '▶'}
            </button>

            {/* Control Panel */}
            {isOpen && (
                <div className="bg-black/90 text-white p-4 rounded-lg backdrop-blur-sm 
                              border border-white/20 min-w-[280px]">
                    <h3 className="text-lg font-semibold mb-4 text-center">
                        体积光照控制
                    </h3>
                    
                    {/* Visibility Toggle */}
                    <div className="mb-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={params.visible}
                                onChange={(e) => handleParamChange('visible', e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span>启用体积光照</span>
                        </label>
                    </div>

                    {/* Intensity Control */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            光照强度: {params.intensity.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={params.intensity}
                            onChange={(e) => handleParamChange('intensity', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                                     slider:bg-white slider:h-2 slider:rounded-lg"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0</span>
                            <span>2</span>
                        </div>
                    </div>

                    {/* Fog Density Control */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            雾气密度: {params.fogDensity.toFixed(3)}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="0.05"
                            step="0.001"
                            value={params.fogDensity}
                            onChange={(e) => handleParamChange('fogDensity', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>0</span>
                            <span>0.05</span>
                        </div>
                    </div>

                    {/* Preset Buttons */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">预设配置:</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    handleParamChange('intensity', 0.3);
                                    handleParamChange('fogDensity', 0.008);
                                }}
                                className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm
                                         transition-colors duration-200"
                            >
                                轻微雾气
                            </button>
                            <button
                                onClick={() => {
                                    handleParamChange('intensity', 0.8);
                                    handleParamChange('fogDensity', 0.015);
                                }}
                                className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm
                                         transition-colors duration-200"
                            >
                                标准效果
                            </button>
                            <button
                                onClick={() => {
                                    handleParamChange('intensity', 1.5);
                                    handleParamChange('fogDensity', 0.025);
                                }}
                                className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm
                                         transition-colors duration-200"
                            >
                                浓郁大气
                            </button>
                            <button
                                onClick={() => {
                                    handleParamChange('intensity', 0);
                                    handleParamChange('visible', false);
                                }}
                                className="bg-red-700 hover:bg-red-600 px-3 py-2 rounded text-sm
                                         transition-colors duration-200"
                            >
                                关闭效果
                            </button>
                        </div>
                    </div>

                    {/* Usage Tips */}
                    <div className="mt-4 p-3 bg-gray-800/50 rounded text-xs text-gray-300">
                        <p className="mb-1">💡 <strong>调节技巧:</strong></p>
                        <p>• 降低雾气密度可提升性能</p>
                        <p>• 适度的光照强度营造最佳氛围</p>
                        <p>• 在不同位置移动观察效果变化</p>
                    </div>
                </div>
            )}
        </div>
    );
};

VolumeLightingControls.propTypes = {
    volumeLighting: PropTypes.object,
    isVisible: PropTypes.bool,
    isPointerLocked: PropTypes.bool
};

export default VolumeLightingControls;
