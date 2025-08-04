import { useState, useEffect } from 'react';

const MemoryMonitor = () => {
    const [memoryInfo, setMemoryInfo] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMemoryInfo = () => {
            if (performance.memory) {
                setMemoryInfo({
                    used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
                    total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
                    limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
                });
            }
        };

        updateMemoryInfo();
        const interval = setInterval(updateMemoryInfo, 1000);

        return () => clearInterval(interval);
    }, []);

    // 双击显示/隐藏监控器
    useEffect(() => {
        const handleDoubleClick = (e) => {
            if (e.ctrlKey || e.metaKey) {
                setIsVisible(!isVisible);
            }
        };

        document.addEventListener('dblclick', handleDoubleClick);
        return () => document.removeEventListener('dblclick', handleDoubleClick);
    }, [isVisible]);

    if (!isVisible || !memoryInfo) return null;

    return (
        <div className="fixed top-4 left-4 z-[9999] bg-black/80 text-green-400 p-3 rounded-lg font-mono text-xs">
            <div className="mb-1 text-yellow-400">Memory Monitor</div>
            <div>Used: {memoryInfo.used} MB</div>
            <div>Total: {memoryInfo.total} MB</div>
            <div>Limit: {memoryInfo.limit} MB</div>
            <div className="mt-2 text-xs text-gray-400">
                Ctrl/⌘ + Double-click to toggle
            </div>
        </div>
    );
};

export default MemoryMonitor;
