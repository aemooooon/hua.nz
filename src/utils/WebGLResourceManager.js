/**
 * WebGL资源管理器
 * 用于统一管理所有WebGL相关资源，防止内存泄漏
 */

class WebGLResourceManager {
    constructor() {
        this.activeResources = new Map(); // 活跃的资源映射
        this.resourceCounter = 0;
        this.isPageVisible = !document.hidden; // 页面可见性状态
        
        // 监听页面可见性变化
        this.initPageVisibilityListener();
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
                }
            });
        }
    }

    /**
     * 刷新所有活跃资源的时间戳，防止被清理
     */
    refreshActiveResources() {
        const now = Date.now();
        for (const [, resourceData] of this.activeResources) {
            resourceData.timestamp = now;
        }
        
        if (import.meta.env.DEV) {
            console.log(`🔄 已刷新 ${this.activeResources.size} 个资源的时间戳`);
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
            temporaryResources: 0
        };

        // 统计持久和临时资源
        for (const [, resourceData] of this.activeResources) {
            if (resourceData.persistent) {
                memoryInfo.persistentResources++;
            } else {
                memoryInfo.temporaryResources++;
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
            textures: 0
        };

        for (const [, resourceData] of this.activeResources) {
            const resources = resourceData.resources;
            
            if (resources.renderer) stats.renderers++;
            if (resources.scene) stats.scenes++;
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
        // 如果页面当前可见，不执行清理
        if (this.isPageVisible) {
            if (import.meta.env.DEV) {
                console.log(`👁️ 页面可见，跳过资源清理`);
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
            
            if (now - resourceData.timestamp > maxAge) {
                this.disposeResources(resourceData.resources);
                toDelete.push(resourceId);
            }
        }

        toDelete.forEach(id => this.activeResources.delete(id));

        if (toDelete.length > 0 && import.meta.env.DEV) {
            console.log(`🧹 清理了 ${toDelete.length} 个过期资源 (页面不可见)`);
        }
    }
}

// 创建单例实例
const webglResourceManager = new WebGLResourceManager();

// 定期清理过期资源
if (typeof window !== 'undefined') {
    setInterval(() => {
        webglResourceManager.cleanupOldResources();
    }, 60000); // 每分钟检查一次
}

export default webglResourceManager;
