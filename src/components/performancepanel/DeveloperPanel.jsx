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
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-blue-400 font-semibold">JS Heap Used</div>
                    <div className="text-xl font-mono number">{memoryInfo?.used || 0} MB</div>
                    <div className="text-gray-400 text-xs percentage">
                        {memoryInfo ? Math.round((memoryInfo.used / memoryInfo.limit) * 100) : 0}% of limit
                    </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-green-400 font-semibold">JS Heap Total</div>
                    <div className="text-xl font-mono number">{memoryInfo?.total || 0} MB</div>
                    <div className="text-gray-400 text-xs">Allocated</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-yellow-400 font-semibold">JS Heap Limit</div>
                    <div className="text-xl font-mono number">{memoryInfo?.limit || 0} MB</div>
                    <div className="text-gray-400 text-xs">Browser limit</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-purple-400 font-semibold">FPS</div>
                    <div className="text-xl font-mono number">{performanceData.fps || 0}</div>
                    <div className="text-gray-400 text-xs">Frames/sec</div>
                </div>
            </div>
        </div>
    );

    const renderWebGLTab = () => (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-cyan-400 font-semibold">Active Groups</div>
                    <div className="text-xl font-mono number">{webglInfo?.activeResourceGroups || 0}</div>
                    <div className="text-gray-400 text-xs">Resource groups</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-orange-400 font-semibold">Persistent</div>
                    <div className="text-xl font-mono number">
                        {webglInfo?.persistentResources || 0}
                    </div>
                    <div className="text-gray-400 text-xs">Persistent resources</div>
                </div>
            </div>
            
            {webglInfo?.resourceStats && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-green-400 font-semibold mb-2">Resource Breakdown</div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        {Object.entries(webglInfo.resourceStats).map(([type, count]) => (
                            <div key={type} className="flex justify-between">
                                <span className="capitalize">{type}:</span>
                                <span className="font-mono text-white">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Section详细信息 */}
            {webglInfo?.sectionBreakdown && Object.keys(webglInfo.sectionBreakdown).length > 0 && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-yellow-400 font-semibold mb-2">Section Resources</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {Object.entries(webglInfo.sectionBreakdown).map(([sectionName, data]) => (
                            <div key={sectionName} className="bg-white/5 border border-white/10 p-1.5 rounded">
                                <div className="flex items-center justify-between">
                                    <div className="font-medium text-white text-xs">
                                        {sectionName.replace('BackgroundCanvas_', '').replace('HeroCube', 'HomeCube')}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="bg-blue-500/30 text-blue-200 px-1 py-0.5 rounded text-xs">
                                            {data.count}
                                        </span>
                                        {data.persistent > 0 && (
                                            <span className="bg-green-500/30 text-green-200 px-1 py-0.5 rounded text-xs">
                                                P:{data.persistent}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 mt-0.5">
                                    {new Date(data.lastActive).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                <div className="text-blue-400 font-semibold">Memory Usage</div>
                <div className="text-xs text-gray-400">
                    JS Heap: {webglInfo?.jsHeapSize || 0}MB / {webglInfo?.jsHeapLimit || 0}MB
                </div>
            </div>
        </div>
    );

    const renderSectionsTab = () => {
        const currentSectionConfig = getCurrentSection();
        
        return (
            <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-cyan-400 font-semibold mb-2">Current Section</div>
                    <div className="text-white text-lg">
                        {currentSectionConfig?.title || currentSectionConfig?.id || 'Unknown'}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                        Section {currentSection + 1} of {sections.length}
                    </div>
                    {currentSectionConfig?.backgroundEffect && (
                        <div className="text-gray-300 text-xs mt-1">
                            Effect: {currentSectionConfig.backgroundEffect}
                        </div>
                    )}
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-green-400 font-semibold mb-2">Section List</div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                        {sections.map((section, index) => (
                            <div 
                                key={section.id}
                                className={`flex items-center justify-between p-1 rounded text-xs ${
                                    index === currentSection 
                                        ? 'bg-blue-500/30 text-blue-200' 
                                        : 'bg-white/5 text-gray-300'
                                }`}
                            >
                                <span className="truncate">
                                    {section.title || section.id}
                                </span>
                                <span className="text-gray-400 ml-1">
                                    {index === currentSection ? '●' : '○'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                    <div className="text-purple-400 font-semibold mb-2">Performance</div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        <div className="flex justify-between">
                            <span>FPS:</span>
                            <span className="font-mono text-white">{performanceData.fps || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>WebGL:</span>
                            <span className="font-mono text-white">{webglInfo?.activeResourceGroups || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={`fixed top-4 right-4 z-[9999] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-mono text-xs transition-all duration-300 ${
            isCollapsed ? 'w-8 h-8' : 'w-80 max-h-96'
        }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-white/20">
                {!isCollapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-theme-success rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-semibold">Performance Panel</span>
                    </div>
                )}
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-white/10 rounded text-gray-400 hover:text-white"
                        title={isCollapsed ? 'Expand' : 'Collapse'}
                    >
                        {isCollapsed ? '📊' : '➖'}
                    </button>
                    <button
                        onClick={onToggle}
                        className="w-5 h-5 flex items-center justify-center hover:bg-white/10 rounded text-gray-400 hover:text-white"
                        title="Close (Ctrl+M)"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {!isCollapsed && (
                <>
                    {/* Tabs */}
                    <div className="flex border-b border-white/20">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-2 py-1 text-xs hover:bg-white/10 transition-colors ${
                                    activeTab === tab.id 
                                        ? 'bg-white/10 text-white border-b-2 border-blue-400' 
                                        : 'text-gray-400'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-3 max-h-72 overflow-y-auto">
                        {activeTab === 'memory' && renderMemoryTab()}
                        {activeTab === 'webgl' && renderWebGLTab()}
                        {activeTab === 'sections' && renderSectionsTab()}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-white/20 text-xs text-gray-400">
                        <div className="text-center">
                            Press <kbd className="bg-white/10 px-1 rounded">Ctrl+M</kbd> to toggle
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

DeveloperPanel.propTypes = {
    visible: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired
};

export default DeveloperPanel;
