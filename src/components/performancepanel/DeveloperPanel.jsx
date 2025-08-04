import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import webglResourceManager from '../../utils/WebGLResourceManager';
import { usePerformanceMonitor } from '../../utils/performance';

const DeveloperPanel = ({ visible, onToggle }) => {
    const [activeTab, setActiveTab] = useState('memory');
    const [memoryInfo, setMemoryInfo] = useState(null);
    const [webglInfo, setWebglInfo] = useState(null);
    const [performanceData, setPerformanceData] = useState({});
    const [isCollapsed, setIsCollapsed] = useState(false);
    const fpsRef = useRef(0);
    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(performance.now());

    // Use the existing performance monitor hook
    const perfMonitor = usePerformanceMonitor();

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

            // Performance data
            setPerformanceData({
                fps: fpsRef.current,
                mode: perfMonitor.performanceMode,
                loadTime: perfMonitor.loadTime,
                cores: navigator.hardwareConcurrency || 'Unknown',
                deviceMemory: navigator.deviceMemory || 'Unknown'
            });
        };

        updateInfo();
        const interval = setInterval(updateInfo, 1000);

        return () => clearInterval(interval);
    }, [visible, perfMonitor]);

    if (!visible) return null;

    const tabs = [
        { id: 'memory', label: 'Memory', icon: '🧠' },
        { id: 'webgl', label: 'WebGL', icon: '🎮' },
        { id: 'performance', label: 'Performance', icon: '⚡' },
        { id: 'system', label: 'System', icon: '💻' }
    ];

    const renderMemoryTab = () => (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-blue-400 font-semibold">JS Heap Used</div>
                    <div className="text-xl font-mono">{memoryInfo?.used || 0} MB</div>
                    <div className="text-gray-400 text-xs">
                        {memoryInfo ? Math.round((memoryInfo.used / memoryInfo.limit) * 100) : 0}% of limit
                    </div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-green-400 font-semibold">JS Heap Total</div>
                    <div className="text-xl font-mono">{memoryInfo?.total || 0} MB</div>
                    <div className="text-gray-400 text-xs">Allocated</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-yellow-400 font-semibold">JS Heap Limit</div>
                    <div className="text-xl font-mono">{memoryInfo?.limit || 0} MB</div>
                    <div className="text-gray-400 text-xs">Browser limit</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-purple-400 font-semibold">FPS</div>
                    <div className="text-xl font-mono">{performanceData.fps || 0}</div>
                    <div className="text-gray-400 text-xs">Frames/sec</div>
                </div>
            </div>
        </div>
    );

    const renderWebGLTab = () => (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-cyan-400 font-semibold">Active Groups</div>
                    <div className="text-xl font-mono">{webglInfo?.activeResourceGroups || 0}</div>
                    <div className="text-gray-400 text-xs">Resource groups</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-orange-400 font-semibold">Contexts</div>
                    <div className="text-xl font-mono">
                        {webglInfo?.contextStats?.active || 0}
                    </div>
                    <div className="text-gray-400 text-xs">WebGL contexts</div>
                </div>
            </div>
            
            {webglInfo?.resourceStats && (
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-green-400 font-semibold mb-2">Resource Breakdown</div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                        {Object.entries(webglInfo.resourceStats).map(([type, count]) => (
                            <div key={type} className="flex justify-between">
                                <span className="capitalize">{type}:</span>
                                <span className="font-mono">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderPerformanceTab = () => (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-green-400 font-semibold">Performance Mode</div>
                    <div className="text-lg font-mono capitalize">{performanceData.mode}</div>
                    <div className="text-gray-400 text-xs">Auto-detected</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-blue-400 font-semibold">Load Time</div>
                    <div className="text-lg font-mono">{performanceData.loadTime || 0}ms</div>
                    <div className="text-gray-400 text-xs">Initial load</div>
                </div>
            </div>
            
            <div className="bg-gray-800 p-2 rounded">
                <div className="text-yellow-400 font-semibold mb-2">Frame Rate</div>
                <div className="flex items-center space-x-2">
                    <div className="text-2xl font-mono">{performanceData.fps || 0}</div>
                    <div className="text-sm text-gray-400">FPS</div>
                    <div className={`w-2 h-2 rounded-full ${
                        (performanceData.fps || 0) >= 55 ? 'bg-green-400' :
                        (performanceData.fps || 0) >= 30 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                </div>
            </div>
        </div>
    );

    const renderSystemTab = () => (
        <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-purple-400 font-semibold">CPU Cores</div>
                    <div className="text-lg font-mono">{performanceData.cores}</div>
                    <div className="text-gray-400 text-xs">Hardware concurrency</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-indigo-400 font-semibold">Device Memory</div>
                    <div className="text-lg font-mono">
                        {performanceData.deviceMemory !== 'Unknown' 
                            ? `${performanceData.deviceMemory} GB` 
                            : 'Unknown'
                        }
                    </div>
                    <div className="text-gray-400 text-xs">Estimated RAM</div>
                </div>
                <div className="bg-gray-800 p-2 rounded">
                    <div className="text-pink-400 font-semibold">Connection</div>
                    <div className="text-lg font-mono capitalize">
                        {navigator.connection?.effectiveType || 'Unknown'}
                    </div>
                    <div className="text-gray-400 text-xs">Network type</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`fixed top-4 right-4 z-[9999] bg-black/95 border border-gray-600 rounded-lg text-white font-mono text-xs transition-all duration-300 ${
            isCollapsed ? 'w-8 h-8' : 'w-80 max-h-96'
        }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-600">
                {!isCollapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-semibold">Performance Panel</span>
                    </div>
                )}
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-5 h-5 flex items-center justify-center hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                        title={isCollapsed ? 'Expand' : 'Collapse'}
                    >
                        {isCollapsed ? '📊' : '➖'}
                    </button>
                    <button
                        onClick={onToggle}
                        className="w-5 h-5 flex items-center justify-center hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                        title="Close (Ctrl+M)"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {!isCollapsed && (
                <>
                    {/* Tabs */}
                    <div className="flex border-b border-gray-600">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-2 py-1 text-xs hover:bg-gray-700 transition-colors ${
                                    activeTab === tab.id 
                                        ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
                                        : 'text-gray-400'
                                }`}
                            >
                                <span className="mr-1">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="p-3 max-h-72 overflow-y-auto">
                        {activeTab === 'memory' && renderMemoryTab()}
                        {activeTab === 'webgl' && renderWebGLTab()}
                        {activeTab === 'performance' && renderPerformanceTab()}
                        {activeTab === 'system' && renderSystemTab()}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-gray-600 text-xs text-gray-400">
                        <div className="text-center">
                            Press <kbd className="bg-gray-700 px-1 rounded">Ctrl+M</kbd> to toggle
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
