/**
 * 纹理系统统一入口
 * 提供简洁的API来访问所有纹理相关功能
 */

import { formatDetector } from './FormatDetector.js';
import { textureLoader } from './TextureLoader.js';
import { textureManager } from './TextureManager.js';

export { FormatDetector, formatDetector } from './FormatDetector.js';
export { TextureLoader, textureLoader } from './TextureLoader.js';
export { TextureManager, textureManager } from './TextureManager.js';

// 便捷的默认导出
export default {
    // 格式检测
    formatDetector,
    
    // 基础加载器
    textureLoader,
    
    // 高级管理器
    textureManager,
    
    // 便捷方法
    async getBestFormat() {
        return formatDetector.getBestFormat();
    },
    
    async getCompressionInfo() {
        return formatDetector.getCompressionInfo();
    },
    
    async loadTexture(name, options) {
        return textureLoader.loadTexture(name, options);
    },
    
    async loadCubeTextures(names, options) {
        return textureManager.loadCubeTextures(names, options);
    },
    
    async preloadTextures(names, options) {
        return textureLoader.preloadTextures(names, options);
    },
    
    getStats() {
        return textureManager.getPerformanceStats();
    },
    
    clearCache() {
        textureLoader.clearCache();
    }
};
