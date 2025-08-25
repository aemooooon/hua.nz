/**
 * useGalleryWorker - Gallery Web Worker 管理Hook
 * 
 * 功能：
 * 1. 管理Gallery Web Worker的生命周期
 * 2. 提供简单的任务分发接口
 * 3. 处理Worker消息和错误
 * 4. 支持任务队列和优先级
 * 5. 自动资源清理
 */

import { useRef, useCallback, useEffect } from 'react';

// 生成唯一任务ID
let taskIdCounter = 0;
const generateTaskId = () => `task_${Date.now()}_${++taskIdCounter}`;

export const useGalleryWorker = () => {
    const workerRef = useRef(null);
    const pendingTasksRef = useRef(new Map());
    const isInitializedRef = useRef(false);

    // 初始化Worker
    const initializeWorker = useCallback(() => {
        if (isInitializedRef.current && workerRef.current) {
            return workerRef.current;
        }

        try {
            // 创建Worker实例
            workerRef.current = new Worker(
                new URL('../workers/galleryWorker.js', import.meta.url),
                { type: 'module' }
            );

            // 设置消息处理器
            workerRef.current.onmessage = (event) => {
                const { id, type, success, result, error } = event.data;
                
                if (pendingTasksRef.current.has(id)) {
                    const { resolve, reject, startTime } = pendingTasksRef.current.get(id);
                    const duration = Date.now() - startTime;
                    
                    if (success) {
                        console.log(`✅ Worker任务完成: ${type} (${duration}ms)`);
                        resolve(result);
                    } else {
                        console.error(`❌ Worker任务失败: ${type}`, error);
                        reject(new Error(error?.message || 'Worker task failed'));
                    }
                    
                    pendingTasksRef.current.delete(id);
                }
            };

            // 设置错误处理器
            workerRef.current.onerror = (error) => {
                console.error('🚫 Gallery Worker错误:', error);
                // 拒绝所有待处理的任务
                pendingTasksRef.current.forEach(({ reject }) => {
                    reject(new Error('Worker encountered an error'));
                });
                pendingTasksRef.current.clear();
            };

            isInitializedRef.current = true;
            console.log('🚀 Gallery Worker初始化完成');
            
            return workerRef.current;
        } catch (error) {
            console.error('🚫 Gallery Worker初始化失败:', error);
            return null;
        }
    }, []);

    // 发送任务到Worker
    const runTask = useCallback((taskType, taskData, options = {}) => {
        return new Promise((resolve, reject) => {
            const worker = initializeWorker();
            if (!worker) {
                reject(new Error('Worker initialization failed'));
                return;
            }

            const taskId = generateTaskId();
            const { timeout = 30000 } = options; // 默认30秒超时
            
            // 存储任务信息
            pendingTasksRef.current.set(taskId, {
                resolve,
                reject,
                startTime: Date.now(),
                taskType
            });

            // 设置任务超时
            const timeoutHandle = setTimeout(() => {
                if (pendingTasksRef.current.has(taskId)) {
                    pendingTasksRef.current.delete(taskId);
                    reject(new Error(`Worker task timeout: ${taskType}`));
                }
            }, timeout);

            // 包装resolve以清理超时
            const originalResolve = pendingTasksRef.current.get(taskId).resolve;
            pendingTasksRef.current.set(taskId, {
                ...pendingTasksRef.current.get(taskId),
                resolve: (result) => {
                    clearTimeout(timeoutHandle);
                    originalResolve(result);
                }
            });

            // 发送任务到Worker
            worker.postMessage({
                id: taskId,
                type: taskType,
                data: taskData
            });

            console.log(`📤 发送Worker任务: ${taskType} (${taskId})`);
        });
    }, [initializeWorker]);

    // 高级任务方法
    const analyzeImageDimensions = useCallback((galleryData) => {
        return runTask('ANALYZE_IMAGE_DIMENSIONS', galleryData);
    }, [runTask]);

    const calculatePaintingPositions = useCallback((data) => {
        return runTask('CALCULATE_PAINTING_POSITIONS', data);
    }, [runTask]);

    const generateFloorTextureData = useCallback((config = {}) => {
        return runTask('GENERATE_FLOOR_TEXTURE_DATA', config);
    }, [runTask]);

    const generateCeilingTextureData = useCallback((config = {}) => {
        return runTask('GENERATE_CEILING_TEXTURE_DATA', config);
    }, [runTask]);

    const optimizeImagePaths = useCallback((imageList) => {
        return runTask('OPTIMIZE_IMAGE_PATHS', imageList);
    }, [runTask]);

    const batchProcessGalleryData = useCallback((data) => {
        return runTask('BATCH_PROCESS_GALLERY_DATA', data, { timeout: 45000 }); // 45秒超时
    }, [runTask]);

    // 获取Worker状态
    const getWorkerStatus = useCallback(() => {
        return {
            isInitialized: isInitializedRef.current,
            hasPendingTasks: pendingTasksRef.current.size > 0,
            pendingTaskCount: pendingTasksRef.current.size,
            pendingTasks: Array.from(pendingTasksRef.current.entries()).map(([id, task]) => ({
                id,
                type: task.taskType,
                duration: Date.now() - task.startTime
            }))
        };
    }, []);

    // 清理Worker
    const cleanup = useCallback(() => {
        if (workerRef.current) {
            // 拒绝所有待处理的任务
            pendingTasksRef.current.forEach(({ reject }) => {
                reject(new Error('Worker is being terminated'));
            });
            pendingTasksRef.current.clear();
            
            // 终止Worker
            workerRef.current.terminate();
            workerRef.current = null;
            isInitializedRef.current = false;
            
            console.log('🧹 Gallery Worker已清理');
        }
    }, []);

    // 组件卸载时自动清理
    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return {
        // 基础任务接口
        runTask,
        
        // 高级任务方法
        analyzeImageDimensions,
        calculatePaintingPositions,
        generateFloorTextureData,
        generateCeilingTextureData,
        optimizeImagePaths,
        batchProcessGalleryData,
        
        // 工具方法
        getWorkerStatus,
        cleanup,
        
        // 状态
        isInitialized: isInitializedRef.current
    };
};

export default useGalleryWorker;
