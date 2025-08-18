import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import webglResourceManager from '../../utils/WebGLResourceManager';
import { useAppStore } from '../../store/useAppStore';

const DeveloperPanel = ({ visible, onToggle }) => {
    const [activeTab, setActiveTab] = useState('memory');
    const [memoryInfo, setMemoryInfo] = useState(null);
    const [webglInfo, setWebglInfo] = useState(null);
    const [performanceData, setPerformanceData] = useState({});
    const [isCollapsed, setIsCollapsed] = useState(false);
    const fpsRef = useRef(0);
    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(performance.now());
    
    // 获取当前section信息
    const { currentSection, sections, getCurrentSection } = useAppStore();

    // FPS monitoring
    useEffect(() => {
        let animationFrame;
        
        const measureFPS = () => {
            frameCountRef.current++;
            const currentTime = performance.now();
            
            if (currentTime - lastTimeRef.current >= 1000) {
                fpsRef.current = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
                frameCountRef.current = 0;
                lastTimeRef.current = currentTime;
            }
            
            animationFrame = requestAnimationFrame(measureFPS);
        };
        
        measureFPS();
        
        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    // Update memory and WebGL info
    useEffect(() => {
        if (!visible) return;

        const updateInfo = () => {
            // Memory info
            if (performance.memory) {
                setMemoryInfo({
                    used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                    total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                    limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
                });
            }

            // WebGL info
            const webglData = webglResourceManager.getMemoryInfo();
            setWebglInfo(webglData);

            // Performance data (only FPS needed for memory tab)
            setPerformanceData({
                fps: fpsRef.current
            });
        };

        updateInfo();
        // 更频繁的更新（每500ms）以确保数据实时性
        const interval = setInterval(updateInfo, 500);

        return () => clearInterval(interval);
    }, [visible]);

    if (!visible) return null;

    const tabs = [
        { id: 'memory', label: 'Memory' },
        { id: 'webgl', label: 'WebGL' },
        { id: 'sections', label: 'Sections' }
    ];

    const renderMemoryTab = () => (
        <div className="space-y-4">
            {/* 内存统计卡片组 - 三级glass cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent backdrop-blur-md border border-blue-400/30 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/20">
                    <div className="text-blue-300 font-semibold text-xs mb-1">JS Heap Used</div>
                    <div className="text-lg font-mono text-white font-bold">{memoryInfo?.used || 0} MB</div>
                    <div className="text-blue-200/70 text-xs">
                        {memoryInfo ? Math.round((memoryInfo.used / memoryInfo.limit) * 100) : 0}% of limit
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent backdrop-blur-md border border-emerald-400/30 rounded-xl p-3 shadow-lg ring-1 ring-emerald-400/20">
                    <div className="text-emerald-300 font-semibold text-xs mb-1">JS Heap Total</div>
                    <div className="text-lg font-mono text-white font-bold">{memoryInfo?.total || 0} MB</div>
                    <div className="text-emerald-200/70 text-xs">Allocated</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent backdrop-blur-md border border-yellow-400/30 rounded-xl p-3 shadow-lg ring-1 ring-yellow-400/20">
                    <div className="text-yellow-300 font-semibold text-xs mb-1">JS Heap Limit</div>
                    <div className="text-lg font-mono text-white font-bold">{memoryInfo?.limit || 0} MB</div>
                    <div className="text-yellow-200/70 text-xs">Browser limit</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-md border border-purple-400/30 rounded-xl p-3 shadow-lg ring-1 ring-purple-400/20">
                    <div className="text-purple-300 font-semibold text-xs mb-1">FPS</div>
                    <div className="text-lg font-mono text-white font-bold">{performanceData.fps || 0}</div>
                    <div className="text-purple-200/70 text-xs">frames/sec</div>
                </div>
            </div>
        </div>
    );

    const renderWebGLTab = () => (
        <div className="space-y-4">
            {/* WebGL统计概览 */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-3 shadow-lg ring-1 ring-cyan-400/20">
                    <div className="text-cyan-300 font-semibold text-xs mb-1">Active Groups</div>
                    <div className="text-lg font-mono text-white font-bold">{webglInfo?.activeResourceGroups || 0}</div>
                    <div className="text-cyan-200/70 text-xs">Resource groups</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-transparent backdrop-blur-md border border-orange-400/30 rounded-xl p-3 shadow-lg ring-1 ring-orange-400/20">
                    <div className="text-orange-300 font-semibold text-xs mb-1">Persistent</div>
                    <div className="text-lg font-mono text-white font-bold">{webglInfo?.persistentResources || 0}</div>
                    <div className="text-orange-200/70 text-xs">Persistent resources</div>
                </div>
            </div>
            
            {/* 资源类型分析 */}
            {webglInfo?.resourceStats && (
                <div className="bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15">
                    <div className="text-emerald-300 font-semibold mb-3 text-sm flex items-center">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                        Resource Breakdown
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(webglInfo.resourceStats).map(([type, count]) => (
                            <div key={type} className="flex justify-between items-center bg-white/5 rounded-lg px-2 py-1.5 border border-white/10">
                                <span className="capitalize text-gray-300">{type.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <span className="font-mono text-white font-semibold bg-emerald-500/20 px-2 py-0.5 rounded">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Section详细信息 */}
            {webglInfo?.sectionBreakdown && Object.keys(webglInfo.sectionBreakdown).length > 0 && (
                <div className="bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent backdrop-blur-md border border-violet-400/25 rounded-xl p-4 shadow-lg ring-1 ring-violet-400/15">
                    <div className="text-violet-300 font-semibold mb-3 text-sm flex items-center">
                        <span className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></span>
                        Section Resources
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                        {Object.entries(webglInfo.sectionBreakdown).map(([sectionName, data]) => (
                            <div key={sectionName} className="bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-3 rounded-lg backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium text-white text-sm">
                                        {sectionName.replace('BackgroundCanvas_', '').replace('HeroCube', 'HomeCube').replace('EffectAvatar_', 'Avatar-')}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded-md text-xs font-mono border border-blue-400/30">
                                            {data.count}
                                        </span>
                                        {data.persistent > 0 && (
                                            <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded-md text-xs font-mono border border-green-400/30">
                                                P:{data.persistent}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400">
                                    Last active: {new Date(data.lastActive).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            {/* 内存使用情况 */}
            <div className="bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-transparent backdrop-blur-md border border-blue-400/25 rounded-xl p-3 shadow-lg ring-1 ring-blue-400/15">
                <div className="text-blue-300 font-semibold text-sm mb-2">Memory Usage</div>
                <div className="text-xs text-blue-200/70">
                    JS Heap: {webglInfo?.jsHeapSize || 0}MB / {webglInfo?.jsHeapLimit || 0}MB
                </div>
            </div>
        </div>
    );

    const renderSectionsTab = () => {
        const currentSectionConfig = getCurrentSection();
        
        return (
            <div className="space-y-4">
                {/* 当前Section信息 */}
                <div className="bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent backdrop-blur-md border border-cyan-400/30 rounded-xl p-4 shadow-lg ring-1 ring-cyan-400/20">
                    <div className="text-cyan-300 font-semibold mb-3 text-sm flex items-center">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                        Current Section
                    </div>
                    <div className="text-white text-lg font-bold mb-2">
                        {currentSectionConfig?.title || currentSectionConfig?.id || 'Unknown'}
                    </div>
                    <div className="space-y-1 text-xs">
                        <div className="text-cyan-200/70">
                            Section {currentSection + 1} of {sections.length}
                        </div>
                        {currentSectionConfig?.backgroundEffect && (
                            <div className="text-cyan-200/90 bg-cyan-500/20 px-2 py-1 rounded-md border border-cyan-400/30 inline-block">
                                Effect: {currentSectionConfig.backgroundEffect}
                            </div>
                        )}
                    </div>
                </div>

                {/* Section列表 */}
                <div className="bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-400/25 rounded-xl p-4 shadow-lg ring-1 ring-emerald-400/15">
                    <div className="text-emerald-300 font-semibold mb-3 text-sm flex items-center">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                        Section Navigation
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                        {sections.map((section, index) => (
                            <div 
                                key={section.id}
                                className={`flex items-center justify-between p-2 rounded-lg border transition-all duration-200 ${
                                    index === currentSection 
                                        ? 'bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-blue-200 border-blue-400/40 shadow-lg' 
                                        : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                                }`}
                            >
                                <span className="truncate text-sm font-medium">
                                    {section.title || section.id}
                                </span>
                                <div className="flex items-center space-x-2">
                                    <span className={`w-2 h-2 rounded-full ${
                                        index === currentSection ? 'bg-blue-400 animate-pulse' : 'bg-gray-500'
                                    }`}></span>
                                    <span className="text-xs font-mono bg-white/10 px-1 py-0.5 rounded">
                                        {index + 1}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 性能快照 */}
                <div className="bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent backdrop-blur-md border border-purple-400/25 rounded-xl p-4 shadow-lg ring-1 ring-purple-400/15">
                    <div className="text-purple-300 font-semibold mb-3 text-sm flex items-center">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                        Performance Snapshot
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                            <div className="text-xs text-gray-400 mb-1">FPS</div>
                            <div className="font-mono text-white font-bold text-lg">{performanceData.fps || 0}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg px-3 py-2 border border-white/10">
                            <div className="text-xs text-gray-400 mb-1">WebGL Groups</div>
                            <div className="font-mono text-white font-bold text-lg">{webglInfo?.activeResourceGroups || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`fixed top-4 right-4 z-[9999] transition-all duration-500 ease-out ${
            isCollapsed ? 'w-12 h-12' : 'w-96 max-h-[600px]'
        }`}>
            {/* 主容器 - 最外层glass card */}
            <div className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-mono text-xs shadow-2xl shadow-black/20 ring-1 ring-white/20 overflow-hidden">
                {/* Header - 二级glass card */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white/10 to-transparent border-b border-white/20 backdrop-blur-sm">
                    {!isCollapsed && (
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"></div>
                                <div className="absolute inset-0 w-3 h-3 bg-emerald-400/30 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-emerald-300 font-semibold text-sm tracking-wide">Performance Monitor</span>
                        </div>
                    )}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
                            title={isCollapsed ? 'Expand Panel' : 'Collapse Panel'}
                        >
                            {isCollapsed ? '📊' : '➖'}
                        </button>
                        <button
                            onClick={onToggle}
                            className="w-7 h-7 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50"
                            title="Close Panel (Ctrl+M)"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {!isCollapsed && (
                    <>
                        {/* Tabs - 二级glass card */}
                        <div className="flex bg-white/5 backdrop-blur-sm border-b border-white/10">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                                        activeTab === tab.id 
                                            ? 'bg-gradient-to-b from-blue-500/30 to-blue-600/20 text-blue-200 shadow-lg' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-400/50"></div>
                                    )}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content - 内容区域 */}
                        <div className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                            {activeTab === 'memory' && renderMemoryTab()}
                            {activeTab === 'webgl' && renderWebGLTab()}
                            {activeTab === 'sections' && renderSectionsTab()}
                        </div>

                        {/* Footer - 底部glass card */}
                        <div className="p-3 bg-gradient-to-t from-white/10 to-transparent border-t border-white/20 backdrop-blur-sm">
                            <div className="text-center text-gray-400">
                                <span className="text-xs">Press </span>
                                <kbd className="inline-flex items-center px-2 py-1 bg-white/20 rounded-md text-xs font-mono border border-white/30 shadow-inner">Ctrl+M</kbd>
                                <span className="text-xs"> to toggle</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

DeveloperPanel.propTypes = {
    visible: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default DeveloperPanel;
