/**
 * usePerformanceMonitor - 3D Gallery性能监控Hook
 *
 * 功能：
 * 1. FPS监控和性能分析
 * 2. 内存使用跟踪
 * 3. 渲染性能指标
 * 4. 自动性能优化建议
 * 5. 实时性能报告
 */

import { useRef, useState, useEffect, useCallback } from 'react';

export const usePerformanceMonitor = (options = {}) => {
    const {
        enabled = true,
        sampleSize = 60, // FPS采样数量
        warningFPSThreshold = 30,
        criticalFPSThreshold = 20,
        onPerformanceChange,
        enableMemoryTracking = true,
    } = options;

    // 性能数据引用
    const performanceRef = useRef({
        frameCount: 0,
        lastTime: performance.now(),
        frameTimes: [],
        currentFPS: 60,
        averageFPS: 60,
        minFPS: 60,
        maxFPS: 60,
        renderTime: 0,
        memoryUsage: 0,
        isWarning: false,
        isCritical: false,
    });

    // 状态
    const [performanceStats, setPerformanceStats] = useState({
        fps: 60,
        averageFPS: 60,
        minFPS: 60,
        maxFPS: 60,
        frameTime: 16.67,
        memoryUsage: 0,
        renderTime: 0,
        performanceLevel: 'good', // 'good' | 'warning' | 'critical'
        suggestions: [],
    });

    // 内存监控
    const getMemoryUsage = useCallback(() => {
        if (enableMemoryTracking && performance.memory) {
            return {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit,
                usagePercent:
                    (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100,
            };
        }
        return { used: 0, total: 0, limit: 0, usagePercent: 0 };
    }, [enableMemoryTracking]);

    // 更新性能数据
    const updatePerformance = useCallback(
        (currentTime = performance.now()) => {
            if (!enabled) return;

            const perf = performanceRef.current;
            const deltaTime = currentTime - perf.lastTime;

            if (deltaTime > 0) {
                const currentFPS = 1000 / deltaTime;
                perf.currentFPS = currentFPS;

                // 更新帧时间数组
                perf.frameTimes.push(deltaTime);
                if (perf.frameTimes.length > sampleSize) {
                    perf.frameTimes.shift();
                }

                // 计算统计数据
                const frameTimesSum = perf.frameTimes.reduce((sum, time) => sum + time, 0);
                const averageFrameTime = frameTimesSum / perf.frameTimes.length;
                const averageFPS = 1000 / averageFrameTime;

                const minFrameTime = Math.min(...perf.frameTimes);
                const maxFrameTime = Math.max(...perf.frameTimes);
                const maxFPS = 1000 / minFrameTime;
                const minFPS = 1000 / maxFrameTime;

                perf.averageFPS = averageFPS;
                perf.minFPS = minFPS;
                perf.maxFPS = maxFPS;
                perf.frameCount++;

                // 性能级别判断
                const isWarning = averageFPS < warningFPSThreshold;
                const isCritical = averageFPS < criticalFPSThreshold;

                let performanceLevel = 'good';
                if (isCritical) {
                    performanceLevel = 'critical';
                } else if (isWarning) {
                    performanceLevel = 'warning';
                }

                // 获取内存使用情况
                const memoryInfo = getMemoryUsage();

                // 生成性能建议
                const suggestions = generatePerformanceSuggestions({
                    averageFPS,
                    memoryUsage: memoryInfo.usagePercent,
                    isWarning,
                    isCritical,
                });

                // 更新状态（每10帧更新一次UI，减少重渲染）
                if (perf.frameCount % 10 === 0) {
                    const newStats = {
                        fps: Math.round(currentFPS * 10) / 10,
                        averageFPS: Math.round(averageFPS * 10) / 10,
                        minFPS: Math.round(minFPS * 10) / 10,
                        maxFPS: Math.round(maxFPS * 10) / 10,
                        frameTime: Math.round(averageFrameTime * 100) / 100,
                        memoryUsage: memoryInfo,
                        renderTime: perf.renderTime,
                        performanceLevel,
                        suggestions,
                        frameCount: perf.frameCount,
                    };

                    setPerformanceStats(newStats);

                    // 性能变化回调
                    if (
                        onPerformanceChange &&
                        (perf.isWarning !== isWarning || perf.isCritical !== isCritical)
                    ) {
                        onPerformanceChange(newStats);
                    }
                }

                perf.isWarning = isWarning;
                perf.isCritical = isCritical;
            }

            perf.lastTime = currentTime;
        },
        [
            enabled,
            sampleSize,
            warningFPSThreshold,
            criticalFPSThreshold,
            onPerformanceChange,
            getMemoryUsage,
            generatePerformanceSuggestions,
        ]
    );

    // 渲染时间测量
    const measureRenderTime = useCallback(
        renderFunction => {
            if (!enabled) return renderFunction();

            const startTime = performance.now();
            const result = renderFunction();
            const endTime = performance.now();

            performanceRef.current.renderTime = endTime - startTime;

            return result;
        },
        [enabled]
    );

    // 性能建议生成
    const generatePerformanceSuggestions = useCallback(
        ({ averageFPS, memoryUsage, isWarning, isCritical }) => {
            const suggestions = [];

            if (isCritical) {
                suggestions.push({
                    type: 'critical',
                    message: '严重性能问题：建议降低渲染质量',
                    action: 'reduce_quality',
                });
            } else if (isWarning) {
                suggestions.push({
                    type: 'warning',
                    message: '性能警告：考虑优化设置',
                    action: 'optimize_settings',
                });
            }

            if (memoryUsage > 80) {
                suggestions.push({
                    type: 'memory',
                    message: '内存使用率过高：建议清理资源',
                    action: 'cleanup_memory',
                });
            }

            if (averageFPS < 24) {
                suggestions.push({
                    type: 'fps',
                    message: 'FPS过低：尝试关闭一些视觉效果',
                    action: 'disable_effects',
                });
            }

            return suggestions;
        },
        []
    );

    // 重置性能数据
    const resetStats = useCallback(() => {
        performanceRef.current = {
            frameCount: 0,
            lastTime: performance.now(),
            frameTimes: [],
            currentFPS: 60,
            averageFPS: 60,
            minFPS: 60,
            maxFPS: 60,
            renderTime: 0,
            memoryUsage: 0,
            isWarning: false,
            isCritical: false,
        };

        setPerformanceStats({
            fps: 60,
            averageFPS: 60,
            minFPS: 60,
            maxFPS: 60,
            frameTime: 16.67,
            memoryUsage: getMemoryUsage(),
            renderTime: 0,
            performanceLevel: 'good',
            suggestions: [],
        });
    }, [getMemoryUsage]);

    // 获取详细性能报告
    const getDetailedReport = useCallback(() => {
        const perf = performanceRef.current;
        const memoryInfo = getMemoryUsage();

        return {
            fps: {
                current: perf.currentFPS,
                average: perf.averageFPS,
                min: perf.minFPS,
                max: perf.maxFPS,
                samples: perf.frameTimes.length,
            },
            timing: {
                frameTime:
                    perf.frameTimes.length > 0
                        ? perf.frameTimes.reduce((sum, time) => sum + time, 0) /
                          perf.frameTimes.length
                        : 0,
                renderTime: perf.renderTime,
                frameTimes: [...perf.frameTimes],
            },
            memory: memoryInfo,
            system: {
                frameCount: perf.frameCount,
                uptime:
                    performance.now() -
                    (perf.lastTime - (perf.frameTimes[perf.frameTimes.length - 1] || 0)),
                isWarning: perf.isWarning,
                isCritical: perf.isCritical,
            },
            browser: {
                userAgent: navigator.userAgent,
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory,
            },
        };
    }, [getMemoryUsage]);

    // 自动性能优化
    const suggestOptimizations = useCallback(() => {
        const report = getDetailedReport();
        const optimizations = [];

        if (report.fps.average < 30) {
            optimizations.push({
                priority: 'high',
                category: 'rendering',
                description: '降低渲染质量',
                actions: ['减少阴影质量', '降低纹理分辨率', '禁用后处理效果', '减少光源数量'],
            });
        }

        if (report.memory.usagePercent > 75) {
            optimizations.push({
                priority: 'medium',
                category: 'memory',
                description: '优化内存使用',
                actions: ['清理未使用的纹理', '减少缓存大小', '启用纹理压缩', '延迟加载资源'],
            });
        }

        if (report.timing.renderTime > 20) {
            optimizations.push({
                priority: 'medium',
                category: 'performance',
                description: '优化渲染性能',
                actions: [
                    '启用GPU实例化',
                    '减少几何体复杂度',
                    '优化材质和着色器',
                    '使用级别细节(LOD)',
                ],
            });
        }

        return optimizations;
    }, [getDetailedReport]);

    // 组件卸载时清理
    useEffect(() => {
        return () => {
            resetStats();
        };
    }, [resetStats]);

    return {
        // 性能数据
        stats: performanceStats,

        // 方法
        updatePerformance,
        measureRenderTime,
        resetStats,
        getDetailedReport,
        suggestOptimizations,

        // 工具
        isGoodPerformance: performanceStats.performanceLevel === 'good',
        isWarningPerformance: performanceStats.performanceLevel === 'warning',
        isCriticalPerformance: performanceStats.performanceLevel === 'critical',

        // 当前状态
        enabled,
    };
};

export default usePerformanceMonitor;
