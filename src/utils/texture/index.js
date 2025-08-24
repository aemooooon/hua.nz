/**
 * 纹理系统统一入口
 * 
 * 提供向后兼容的API，同时支持新的场景化管理
 * 
 * 主要功能：
 * - 传统API向后兼容
 * - 新版场景化纹理管理
 * - 智能格式检测和优化
 * - 统一的错误处理
 * 
 * @module TextureSystem
 */

// 纯动态导入版本 - 避免静态和动态导入混用警告

// 默认导出 - 统一API入口
const textureSystemAPI = {
    // === 传统API (保持兼容) ===
    async getBestFormat() {
        const { formatDetector } = await import('./FormatDetector.js');
        return formatDetector.getBestFormat();
    },
    
    async getCompressionInfo() {
        const { formatDetector } = await import('./FormatDetector.js');
        return formatDetector.getCompressionInfo();
    },
    
    async loadTexture(name, options) {
        const { textureLoader } = await import('./TextureLoader.js');
        return textureLoader.loadTexture(name, options);
    },
    
    async loadCubeTextures(names, options) {
        const { textureManager } = await import('./TextureManager.js');
        return textureManager.loadCubeTextures(names, options);
    },
    
    async preloadTextures(names, options) {
        const { textureLoader } = await import('./TextureLoader.js');
        return textureLoader.preloadTextures(names, options);
    },
    
    getStats() {
        // 这里需要动态导入以避免循环依赖
        return {
            legacy: "使用 textureManager.getPerformanceStats() 获取传统系统统计",
            unified: "使用 textureSystem.getStats() 获取新系统统计"
        };
    },
    
    clearCache() {
        // 支持两套系统的清理
        import('./TextureManager.js').then(({ textureManager }) => {
            if (textureManager.clearCache) textureManager.clearCache();
        });
        import('./TextureSystem.js').then(({ textureSystem }) => {
            textureSystem.cleanup();
        });
    },

    // === 新版场景化API ===
    
    /**
     * 智能场景纹理加载
     * 
     * 根据场景类型自动选择最优配置和优化策略
     * 
     * @param {string} sceneType - 场景类型 ('hero-cube', 'gallery', 'lightbox')
     * @param {Object} options - 加载选项
     * @returns {Promise<Object>} 加载结果包含纹理Map和错误信息
     */
    async loadSceneTextures(sceneType, options) {
        const { textureSystem } = await import('./TextureSystem.js');
        return textureSystem.loadSceneTextures(sceneType, options);
    },

    /**
     * Hero Cube专用纹理加载方法
     * 
     * 自动处理纹理和视频资源，应用Cube专用优化
     * 
     * @param {Array} faceConfigs - 立方体面配置数组
     * @returns {Promise<Object>} 加载结果
     */
    async loadHeroCubeTextures(faceConfigs) {
        const textures = faceConfigs
            .filter(face => face.texture)
            .map(face => face.texture);
            
        const videos = faceConfigs
            .filter(face => face.video)
            .map(face => ({ name: face.name, src: face.video }));

        return this.loadSceneTextures('hero-cube', { textures, videos });
    },

    /**
     * Gallery专用纹理加载方法
     * 
     * 针对画廊场景优化，支持批量图片预加载
     * 
     * @param {string[]} imageNames - 图片名称数组
     * @param {Object} [options={}] - 加载选项
     * @param {string} [options.folder='gallery'] - 图片文件夹
     * @returns {Promise<Object>} 加载结果
     */
    async loadGalleryTextures(imageNames, options = {}) {
        return this.loadSceneTextures('gallery', {
            images: imageNames,
            folder: options.folder || 'gallery',
            ...options
        });
    },

    /**
     * 获取最优路径 (兼容新旧系统)
     */
    async getOptimalPath(name, folder) {
        if (folder) {
            // 使用新系统
            const { textureSystem } = await import('./TextureSystem.js');
            return textureSystem.getOptimalPath(name, folder);
        } else {
            // 使用旧系统
            const { textureLoader } = await import('./TextureLoader.js');
            return textureLoader.getOptimalPath(name);
        }
    }
};

// 导出各个模块的动态加载器，保持向后兼容
export const getFormatDetector = async () => {
    const { formatDetector } = await import('./FormatDetector.js');
    return formatDetector;
};

export const getTextureLoader = async () => {
    const { textureLoader } = await import('./TextureLoader.js');
    return textureLoader;
};

export const getTextureManager = async () => {
    const { textureManager } = await import('./TextureManager.js');
    return textureManager;
};

export const getTextureSystem = async () => {
    const { textureSystem } = await import('./TextureSystem.js');
    return textureSystem;
};

export default textureSystemAPI;
