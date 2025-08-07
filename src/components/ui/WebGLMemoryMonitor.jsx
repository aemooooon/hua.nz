import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import webglResourceManager from '../../utils/WebGLResourceManager';

const WebGLMemoryMonitor = ({ enabled = true }) => {
    const [memoryInfo, setMemoryInfo] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        const updateMemoryInfo = () => {
            const info = webglResourceManager.getMemoryInfo();
            setMemoryInfo(info);
        };

        // 初始更新
        updateMemoryInfo();

        // 定期更新内存信息
        const interval = setInterval(updateMemoryInfo, 3000); // 每3秒更新一次

        return () => clearInterval(interval);
    }, [enabled]);

    if (!enabled || !memoryInfo) return null;

    return (
        <div 
            className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
        >
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-theme-success rounded-full animate-pulse"></div>
                <span>WebGL资源: {memoryInfo.activeResourceGroups}</span>
            </div>
            
            {showDetails && (
                <div className="mt-2 space-y-1 border-t border-gray-600 pt-2">
                    {memoryInfo.jsHeapSize && (
                        <div>JS堆内存: {memoryInfo.jsHeapSize}MB</div>
                    )}
                    {memoryInfo.jsHeapLimit && (
                        <div>JS堆限制: {memoryInfo.jsHeapLimit}MB</div>
                    )}
                    <div className="text-gray-400 text-xs">
                        点击隐藏详情
                    </div>
                </div>
            )}
        </div>
    );
};

WebGLMemoryMonitor.propTypes = {
    enabled: PropTypes.bool
};

export default WebGLMemoryMonitor;
