import { useEffect, useState } from 'react';

// 性能监控Hook
export const usePerformanceMonitor = () => {
    const [performanceData, setPerformanceData] = useState({
        memory: 0,
        fps: 0,
        loadTime: 0,
        performanceMode: 'medium'
    });

    useEffect(() => {
        // 检测设备性能
        const detectPerformance = () => {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            const memory = navigator.deviceMemory || 4; // GB
            const cores = navigator.hardwareConcurrency || 4;
            
            let score = 0;
            if (memory >= 8) score += 3;
            else if (memory >= 4) score += 2;
            else score += 1;
            
            if (cores >= 8) score += 2;
            else if (cores >= 4) score += 1;
            
            if (gl) score += 1;
            
            const mode = score >= 5 ? 'high' : score >= 3 ? 'medium' : 'low';
            
            return {
                memory,
                cores,
                webgl: !!gl,
                mode
            };
        };

        // 监控内存使用
        const monitorMemory = () => {
            if (performance.memory) {
                return Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            }
            return 0;
        };

        // 监控FPS
        let lastTime = performance.now();
        let frames = 0;
        let fps = 0;

        const measureFPS = () => {
            frames++;
            const currentTime = performance.now();
            if (currentTime - lastTime >= 1000) {
                fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measureFPS);
        };

        // 初始化
        const perfData = detectPerformance();
        measureFPS();

        // 定期更新性能数据
        const interval = setInterval(() => {
            setPerformanceData(prev => ({
                ...prev,
                memory: monitorMemory(),
                fps,
                performanceMode: perfData.mode
            }));
        }, 2000);

        // 页面加载时间
        window.addEventListener('load', () => {
            setPerformanceData(prev => ({
                ...prev,
                loadTime: Math.round(performance.now())
            }));
        });

        return () => {
            clearInterval(interval);
        };
    }, []);

    return performanceData;
};

// 性能优化配置
export const getPerformanceConfig = (mode) => {
    const configs = {
        low: {
            particlesEnabled: false,
            cubeQuality: 'low',
            textureSize: 64,
            pixelRatio: 1,
            antialias: false,
            maxParticles: 0,
            animationReduced: true
        },
        medium: {
            particlesEnabled: true,
            cubeQuality: 'medium',
            textureSize: 128,
            pixelRatio: 1.2,
            antialias: false,
            maxParticles: 800,
            animationReduced: false
        },
        high: {
            particlesEnabled: true,
            cubeQuality: 'high',
            textureSize: 256,
            pixelRatio: 1.5,
            antialias: true,
            maxParticles: 1500,
            animationReduced: false
        }
    };

    return configs[mode] || configs.medium;
};

// 内存清理工具
export const memoryCleanup = () => {
    // 清理Three.js资源
    if (window.THREE) {
        // 强制垃圾回收（仅在开发环境）
        if (process.env.NODE_ENV === 'development' && window.gc) {
            window.gc();
        }
    }
    
    // 清理GSAP时间线
    if (window.gsap) {
        window.gsap.globalTimeline.clear();
    }
};

export default usePerformanceMonitor;
