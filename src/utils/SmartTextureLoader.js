/**
 * 智能纹理加载器
 * 自动检测浏览器支持的最优图像格式 (AVIF > WebP > JPEG/PNG)
 * 并加载相应格式的cube纹理
 */

import * as THREE from 'three';

class SmartTextureLoader {
    constructor() {
        this.formatSupport = {};
        this.loader = new THREE.TextureLoader();
        this.checkFormatSupport();
    }

    /**
     * 检测浏览器对现代图像格式的支持
     */
    checkFormatSupport() {
        // 检测WebP支持
        this.formatSupport.webp = this.supportsWebP();
        
        // 检测AVIF支持
        this.formatSupport.avif = this.supportsAVIF();
        
        console.log('🖼️ 浏览器图像格式支持:', this.formatSupport);
    }

    /**
     * 检测WebP支持
     */
    supportsWebP() {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch {
            return false;
        }
    }

    /**
     * 检测AVIF支持
     */
    supportsAVIF() {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
        } catch {
            return false;
        }
    }

    /**
     * 获取最优的文件扩展名
     */
    getBestFormat() {
        if (this.formatSupport.avif) {
            return 'avif';
        } else if (this.formatSupport.webp) {
            return 'webp';
        } else {
            return 'jpg'; // 回退到原始格式
        }
    }

    /**
     * 获取最优的目录名
     */
    getBestDirectory() {
        const format = this.getBestFormat();
        switch (format) {
            case 'avif':
                return 'cube-textures-avif';
            case 'webp':
                return 'cube-textures-webp';
            default:
                return 'cube-textures';
        }
    }

    /**
     * 加载单个纹理，自动选择最优格式
     * @param {string} baseName 基础文件名（不含扩展名）
     * @param {Function} onLoad 加载成功回调
     * @param {Function} onProgress 加载进度回调
     * @param {Function} onError 加载错误回调
     */
    loadTexture(baseName, onLoad, onProgress, onError) {
        const format = this.getBestFormat();
        const directory = this.getBestDirectory();
        const url = `/${directory}/${baseName}.${format}`;
        
        console.log(`🔄 加载纹理: ${url} (格式: ${format.toUpperCase()})`);
        
        return this.loader.load(
            url,
            (texture) => {
                console.log(`✅ 纹理加载成功: ${url}`);
                if (onLoad) onLoad(texture);
            },
            onProgress,
            (error) => {
                console.warn(`❌ 加载失败: ${url}, 尝试回退到原始格式`);
                
                // 如果优化格式加载失败，回退到原始JPG格式
                if (format !== 'jpg') {
                    const fallbackUrl = `/cube-textures/${baseName}.jpg`;
                    console.log(`🔄 回退加载: ${fallbackUrl}`);
                    
                    return this.loader.load(
                        fallbackUrl,
                        (texture) => {
                            console.log(`✅ 回退加载成功: ${fallbackUrl}`);
                            if (onLoad) onLoad(texture);
                        },
                        onProgress,
                        (fallbackError) => {
                            console.error(`❌ 回退也失败了: ${fallbackUrl}`, fallbackError);
                            if (onError) onError(fallbackError);
                        }
                    );
                } else {
                    if (onError) onError(error);
                }
            }
        );
    }

    /**
     * 加载cube纹理集合
     * @param {Array<string>} textureNames 纹理名称数组
     * @param {Function} onComplete 全部加载完成回调
     * @param {Function} onProgress 整体进度回调
     */
    loadCubeTextures(textureNames, onComplete, onProgress) {
        const textures = [];
        let loadedCount = 0;
        const totalCount = textureNames.length;
        
        console.log(`🎯 开始加载 ${totalCount} 个cube纹理...`);
        
        const checkComplete = () => {
            if (loadedCount === totalCount) {
                console.log(`✨ 所有cube纹理加载完成! 格式: ${this.getBestFormat().toUpperCase()}`);
                if (onComplete) onComplete(textures);
            }
        };

        textureNames.forEach((name, index) => {
            this.loadTexture(
                name,
                (texture) => {
                    textures[index] = texture;
                    loadedCount++;
                    
                    // 更新进度
                    const progress = loadedCount / totalCount;
                    if (onProgress) onProgress(progress, loadedCount, totalCount);
                    
                    checkComplete();
                },
                null, // 单个文件进度
                (error) => {
                    console.error(`纹理加载失败: ${name}`, error);
                    // 即使单个纹理失败，也继续加载其他纹理
                    loadedCount++;
                    checkComplete();
                }
            );
        });
    }

    /**
     * 预估文件大小节省
     */
    getCompressionInfo() {
        const format = this.getBestFormat();
        const compressionData = {
            jpg: { ratio: 1.0, description: '原始JPEG格式' },
            webp: { ratio: 0.6, description: 'WebP格式，减少约40%文件大小' },
            avif: { ratio: 0.4, description: 'AVIF格式，减少约60%文件大小' }
        };
        
        return {
            format: format.toUpperCase(),
            ...compressionData[format],
            savings: Math.round((1 - compressionData[format].ratio) * 100)
        };
    }
}

// 创建全局实例
const smartTextureLoader = new SmartTextureLoader();

export default smartTextureLoader;
