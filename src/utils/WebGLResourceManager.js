/**
 * WebGL资源管理器
 * 用于统一管理所有WebGL相关资源，防止内存泄漏
 */

class WebGLResourceManager {
    constructor() {
        this.activeResources = new Map(); // 活跃的资源映射
        this.resourceCounter = 0;
        this.isPageVisible = !document.hidden; // 页面可见性状态
        this.lastActivityTime = Date.now(); // 记录最后活动时间
        
        // 监听页面可见性变化
        this.initPageVisibilityListener();
        
        // 监听用户活动
        this.initActivityListener();
    }

    /**
     * 初始化页面可见性监听器
     */
    initPageVisibilityListener() {
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                this.isPageVisible = !document.hidden;
                
                if (import.meta.env.DEV) {
                    console.log(`📄 页面可见性变化: ${this.isPageVisible ? '可见' : '隐藏'}`);
                }
                
                // 如果页面重新变为可见，刷新资源时间戳，防止被清理
                if (this.isPageVisible) {
                    this.refreshActiveResources();
                    this.lastActivityTime = Date.now(); // 更新活动时间
                }
            });
        }
    }
    
    /**
     * 初始化用户活动监听器
     */
    initActivityListener() {
        if (typeof document !== 'undefined') {
            const updateActivity = () => {
                this.lastActivityTime = Date.now();
            };
            
            // 监听多种用户活动
            document.addEventListener('mousemove', updateActivity, { passive: true });
            document.addEventListener('mousedown', updateActivity, { passive: true });
            document.addEventListener('keydown', updateActivity, { passive: true });
            document.addEventListener('scroll', updateActivity, { passive: true });
            document.addEventListener('touchstart', updateActivity, { passive: true });
        }
    }

    /**
     * 刷新所有活跃资源的时间戳，防止被清理
     */
    refreshActiveResources() {
        const now = Date.now();
        let refreshedCount = 0;
        
        for (const [, resourceData] of this.activeResources) {
            // 只刷新非持久资源的时间戳（持久资源本来就不会被清理）
            if (!resourceData.persistent) {
                resourceData.timestamp = now;
                refreshedCount++;
            }
        }
        
        if (import.meta.env.DEV) {
            console.log(`🔄 已刷新 ${refreshedCount} 个非持久资源的时间戳（共 ${this.activeResources.size} 个资源）`);
        }
    }

    /**
        getMemoryInfo() {
        const resourceCount = this.activeResources.size;
        let persistentCount = 0;
        let temporaryCount = 0;

        // 统计持久和临时资源
        for (const [, resourceData] of this.activeResources) {
            if (resourceData.persistent) {
                persistentCount++;
            } else {
                temporaryCount++;
            }
        }

        const memoryInfo = {
            activeResourceGroups: temporaryCount, // 只显示临时资源作为活跃资源
            totalResourceGroups: resourceCount, // 总资源数
            persistentResources: persistentCount,
            temporaryResources: temporaryCount,
            timestamp: Date.now()
        };染器、场景、几何体、材质等）
     * @param {string} componentId - 组件标识符
     * @param {Object} resources - 资源对象
     * @param {Object} options - 选项 { persistent: boolean }
     * @returns {string} - 资源ID
     */
    registerResources(componentId, resources, options = {}) {
        const resourceId = `${componentId}_${this.resourceCounter++}`;
        this.activeResources.set(resourceId, {
            componentId,
            resources,
            timestamp: Date.now(),
            persistent: options.persistent || false // 是否为持久资源，不会被自动清理
        });
        
        if (import.meta.env.DEV) {
            console.log(`📝 WebGL资源已注册: ${resourceId}, 当前活跃资源数: ${this.activeResources.size}`);
        }
        
        return resourceId;
    }

    /**
     * 清理指定组件的所有资源
     * @param {string} componentId - 组件标识符
     */
    cleanupByComponent(componentId) {
        const toDelete = [];
        
        for (const [resourceId, resourceData] of this.activeResources) {
            if (resourceData.componentId === componentId) {
                this.disposeResources(resourceData.resources);
                toDelete.push(resourceId);
            }
        }
        
        toDelete.forEach(id => this.activeResources.delete(id));
        
        if (import.meta.env.DEV) {
            console.log(`🧹 已清理组件 ${componentId} 的 ${toDelete.length} 个资源组`);
        }
    }

    /**
     * 清理指定的资源ID
     * @param {string} resourceId - 资源ID
     */
    cleanup(resourceId) {
        const resourceData = this.activeResources.get(resourceId);
        if (resourceData) {
            this.disposeResources(resourceData.resources);
            this.activeResources.delete(resourceId);
            
            if (import.meta.env.DEV) {
                console.log(`🧹 已清理资源: ${resourceId}, 剩余活跃资源数: ${this.activeResources.size}`);
            }
        }
    }

    /**
     * 递归清理资源对象
     * @param {Object} resources - 资源对象
     */
    disposeResources(resources) {
        if (!resources) return;

        // 清理渲染器
        if (resources.renderer) {
            resources.renderer.dispose();
            // 强制垃圾回收渲染器内存
            if (resources.renderer.info) {
                resources.renderer.info.reset();
            }
        }

        // 清理场景中的所有对象
        if (resources.scene) {
            this.disposeScene(resources.scene);
        }

        // 清理几何体
        if (resources.geometry) {
            if (Array.isArray(resources.geometry)) {
                resources.geometry.forEach(geo => geo.dispose());
            } else {
                resources.geometry.dispose();
            }
        }

        // 清理材质
        if (resources.materials) {
            if (Array.isArray(resources.materials)) {
                resources.materials.forEach(material => this.disposeMaterial(material));
            } else {
                this.disposeMaterial(resources.materials);
            }
        }

        // 清理纹理
        if (resources.textures) {
            if (Array.isArray(resources.textures)) {
                resources.textures.forEach(texture => texture.dispose());
            } else {
                resources.textures.dispose();
            }
        }

        // 清理WebGL上下文（如果直接管理）
        if (resources.gl && resources.gl.getExtension) {
            // 清理WebGL缓冲区
            if (resources.buffers) {
                Object.values(resources.buffers).forEach(buffer => {
                    if (buffer) resources.gl.deleteBuffer(buffer);
                });
            }
            
            // 清理着色器程序
            if (resources.programs) {
                Object.values(resources.programs).forEach(program => {
                    if (program) resources.gl.deleteProgram(program);
                });
            }
        }
    }

    /**
     * 清理Three.js场景
     * @param {THREE.Scene} scene - Three.js场景对象
     */
    disposeScene(scene) {
        if (!scene) return;

        scene.traverse((object) => {
            // 清理几何体
            if (object.geometry) {
                object.geometry.dispose();
            }

            // 清理材质
            if (object.material) {
                this.disposeMaterial(object.material);
            }

            // 清理纹理
            if (object.texture) {
                object.texture.dispose();
            }
        });

        // 清空场景
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
    }

    /**
     * 清理材质对象
     * @param {THREE.Material|Array} material - 材质对象
     */
    disposeMaterial(material) {
        if (!material) return;

        if (Array.isArray(material)) {
            material.forEach(mat => this.disposeMaterial(mat));
            return;
        }

        // 清理材质的纹理，特别处理视频纹理
        Object.keys(material).forEach(key => {
            const value = material[key];
            if (value && typeof value.dispose === 'function') {
                // 如果是视频纹理，先停止视频播放
                if (value.image && value.image.tagName === 'VIDEO') {
                    value.image.pause();
                    value.image.src = '';
                    value.image.load();
                }
                value.dispose();
            }
        });

        material.dispose();
    }

    /**
     * 强制清理所有活跃资源（紧急情况使用）
     */
    forceCleanupAll() {
        console.warn('🚨 强制清理所有WebGL资源');
        
        for (const [, resourceData] of this.activeResources) {
            this.disposeResources(resourceData.resources);
        }
        
        this.activeResources.clear();
        
        // 强制垃圾回收（如果可用）
        if (typeof window !== 'undefined' && window.gc) {
            setTimeout(() => window.gc(), 100);
        }
    }

    /**
     * 获取当前内存使用情况
     * @returns {Object} 内存信息
     */
    getMemoryInfo() {
        const resourceCount = this.activeResources.size;
        const memoryInfo = {
            activeResourceGroups: resourceCount,
            timestamp: Date.now(),
            persistentResources: 0,
            temporaryResources: 0,
            sectionBreakdown: {} // 新增：按section分类统计
        };

        // 统计持久和临时资源，同时按section分类
        for (const [resourceId, resourceData] of this.activeResources) {
            if (resourceData.persistent) {
                memoryInfo.persistentResources++;
            } else {
                memoryInfo.temporaryResources++;
            }
            
            // 按componentId（section）分类统计
            const componentId = resourceData.componentId;
            if (!memoryInfo.sectionBreakdown[componentId]) {
                memoryInfo.sectionBreakdown[componentId] = {
                    count: 0,
                    persistent: 0,
                    temporary: 0,
                    resourceIds: [],
                    lastActive: resourceData.timestamp
                };
            }
            
            memoryInfo.sectionBreakdown[componentId].count++;
            memoryInfo.sectionBreakdown[componentId].resourceIds.push(resourceId);
            memoryInfo.sectionBreakdown[componentId].lastActive = Math.max(
                memoryInfo.sectionBreakdown[componentId].lastActive,
                resourceData.timestamp
            );
            
            if (resourceData.persistent) {
                memoryInfo.sectionBreakdown[componentId].persistent++;
            } else {
                memoryInfo.sectionBreakdown[componentId].temporary++;
            }
        }

        // 如果支持，获取WebGL内存信息
        if (typeof window !== 'undefined' && window.performance && window.performance.memory) {
            memoryInfo.jsHeapSize = Math.round(window.performance.memory.usedJSHeapSize / 1024 / 1024);
            memoryInfo.jsHeapLimit = Math.round(window.performance.memory.totalJSHeapSize / 1024 / 1024);
        }

        // 添加资源类型统计
        memoryInfo.resourceStats = this.getResourceTypeStats();

        return memoryInfo;
    }

    /**
     * 获取资源类型统计
     * @returns {Object} 资源类型统计
     */
    getResourceTypeStats() {
        const stats = {
            renderers: 0,
            scenes: 0,
            geometries: 0,
            materials: 0,
            textures: 0,
            webglContexts: 0, // 新增：原生WebGL上下文统计
            canvas2dContexts: 0 // 新增：Canvas 2D上下文统计
        };

        for (const [, resourceData] of this.activeResources) {
            const resources = resourceData.resources;
            
            if (resources.renderer) stats.renderers++;
            if (resources.scene) stats.scenes++;
            if (resources.gl) stats.webglContexts++; // 统计原生WebGL上下文
            if (resources.context2d) stats.canvas2dContexts++; // 统计Canvas 2D上下文
            if (resources.geometry) {
                stats.geometries += Array.isArray(resources.geometry) ? resources.geometry.length : 1;
            }
            if (resources.materials) {
                stats.materials += Array.isArray(resources.materials) ? resources.materials.length : 1;
            }
            if (resources.textures) {
                stats.textures += Array.isArray(resources.textures) ? resources.textures.length : 1;
            }
        }

        return stats;
    }

    /**
     * 清理超过指定时间的旧资源
     * @param {number} maxAge - 最大年龄（毫秒）
     */
    cleanupOldResources(maxAge = 300000) { // 默认5分钟
        // 🔧 更保守的页面可见性检查 - 增加额外的检查条件
        if (this.isPageVisible || this.hasRecentActivity()) {
            if (import.meta.env.DEV) {
                console.log(`👁️ 页面活跃，跳过资源清理`);
            }
            return;
        }
        
        const now = Date.now();
        const toDelete = [];

        for (const [resourceId, resourceData] of this.activeResources) {
            // 跳过持久资源的清理
            if (resourceData.persistent) {
                continue;
            }
            
            // 🔧 对于背景效果，使用更长的清理时间（30分钟）
            const effectiveMaxAge = resourceData.componentId && 
                                  resourceData.componentId.includes('BackgroundCanvas') ? 
                                  1800000 : maxAge; // 30分钟 vs 5分钟
            
            if (now - resourceData.timestamp > effectiveMaxAge) {
                this.disposeResources(resourceData.resources);
                toDelete.push(resourceId);
            }
        }

        toDelete.forEach(id => this.activeResources.delete(id));

        if (toDelete.length > 0 && import.meta.env.DEV) {
            console.log(`🧹 清理了 ${toDelete.length} 个过期资源 (页面不可见)`);
        }
    }
    
    /**
     * 检查是否有最近的用户活动
     */
    hasRecentActivity() {
        // 检查是否有鼠标或键盘活动
        if (typeof window !== 'undefined') {
            const now = Date.now();
            // 如果最近5分钟内有活动，认为页面是活跃的
            return (now - (this.lastActivityTime || 0)) < 300000;
        }
        return false;
    }
    
    /**
     * 获取当前资源状态的调试信息
     */
    getDebugInfo() {
        const now = Date.now();
        const resources = [];
        
        for (const [resourceId, resourceData] of this.activeResources) {
            resources.push({
                id: resourceId,
                componentId: resourceData.componentId,
                persistent: resourceData.persistent,
                age: Math.round((now - resourceData.timestamp) / 1000), // 秒
                isBackgroundCanvas: resourceData.componentId && resourceData.componentId.includes('BackgroundCanvas')
            });
        }
        
        return {
            totalResources: this.activeResources.size,
            isPageVisible: this.isPageVisible,
            hasRecentActivity: this.hasRecentActivity(),
            lastActivityAge: Math.round((now - (this.lastActivityTime || 0)) / 1000), // 秒
            resources
        };
    }

    /**
     * 智能清理：只保留当前section的资源，清理其他section的非持久资源
     * @param {string} currentSection - 当前激活的section名称
     * @param {Array<string>} keepSections - 需要保留的section列表（可选）
     */
    cleanupOtherSections(currentSection, keepSections = []) {
        if (!currentSection) return;
        
        const sectionsToKeep = new Set([currentSection, ...keepSections]);
        const toDelete = [];
        let cleanedCount = 0;

        for (const [resourceId, resourceData] of this.activeResources) {
            // 跳过持久资源的清理
            if (resourceData.persistent) {
                continue;
            }
            
            // 如果资源不属于需要保留的section，则清理
            if (!sectionsToKeep.has(resourceData.componentId)) {
                this.disposeResources(resourceData.resources);
                toDelete.push(resourceId);
                cleanedCount++;
            }
        }

        toDelete.forEach(id => this.activeResources.delete(id));

        if (cleanedCount > 0 && import.meta.env.DEV) {
            console.log(`🎯 智能清理：保留 [${Array.from(sectionsToKeep).join(', ')}]，清理了 ${cleanedCount} 个其他section资源`);
        }
        
        return cleanedCount;
    }
}

// 创建单例实例
const webglResourceManager = new WebGLResourceManager();

// 🔧 开发环境下暴露调试功能
if (import.meta.env.DEV && typeof window !== 'undefined') {
    window.webglDebug = {
        getResourceInfo: () => webglResourceManager.getDebugInfo(),
        forceCleanup: () => webglResourceManager.cleanupOldResources(0),
        refreshResources: () => webglResourceManager.refreshActiveResources()
    };
    
    console.log('🔧 WebGL调试工具已启用，使用 window.webglDebug 来调试资源状态');
}

// 定期清理过期资源 - 降低频率，减少对性能的影响
if (typeof window !== 'undefined') {
    setInterval(() => {
        webglResourceManager.cleanupOldResources();
    }, 300000); // 🔧 改为每5分钟检查一次（而不是每分钟）
}

export default webglResourceManager;
