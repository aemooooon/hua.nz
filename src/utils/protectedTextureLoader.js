/**
 * 受保护的纹理加载器
 * 通过分块加载、动态拼接等方式提高资源保护性
 */

import * as THREE from 'three';

class ProtectedTextureLoader {
    constructor() {
        this.cache = new Map();
        this.obfuscationSeed = Math.random().toString(36).substring(7);
    }

    /**
     * 分块加载大型纹理
     * @param {string} basePath - 基础路径
     * @param {Object} config - 配置选项
     */
    async loadChunkedTexture(basePath, config = {}) {
        const {
            chunks = 4, // 分成4块
            size = 512,
            format = 'jpg'
        } = config;

        const cacheKey = `${basePath}_chunked_${chunks}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            // 加载所有分块
            const chunkPromises = Array.from({ length: chunks }, (_, i) => {
                return this.loadImageChunk(`${basePath}_chunk_${i}.${format}`);
            });

            const chunkImages = await Promise.all(chunkPromises);
            
            // 拼接分块
            const finalTexture = this.assembleChunks(chunkImages, size);
            
            this.cache.set(cacheKey, finalTexture);
            return finalTexture;
            
        } catch (error) {
            console.warn('Chunked texture loading failed, using fallback:', error);
            return this.createFallbackTexture(size);
        }
    }

    /**
     * 加载单个图片分块
     */
    async loadImageChunk(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    /**
     * 拼接图片分块
     */
    assembleChunks(chunks, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // 假设是2x2的分块布局
        const chunkSize = size / 2;
        
        chunks.forEach((chunk, index) => {
            const x = (index % 2) * chunkSize;
            const y = Math.floor(index / 2) * chunkSize;
            ctx.drawImage(chunk, x, y, chunkSize, chunkSize);
        });

        // 添加动态水印
        this.addDynamicWatermark(ctx, size);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    /**
     * 添加动态水印（不可见）
     */
    addDynamicWatermark(ctx, size) {
        const timestamp = Date.now().toString();
        const watermark = `${this.obfuscationSeed}_${timestamp}`;
        
        // 使用极低透明度的水印
        ctx.globalAlpha = 0.003;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${size / 32}px Arial`;
        ctx.textAlign = 'center';
        
        // 在多个位置添加水印
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            ctx.fillText(watermark, x, y);
        }
        
        ctx.globalAlpha = 1.0;
    }

    /**
     * 创建混淆的视频纹理
     */
    createObfuscatedVideoTexture(videoUrl) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            
            // 添加随机参数防止直接访问
            const obfuscatedUrl = `${videoUrl}?t=${Date.now()}&k=${this.obfuscationSeed}`;
            
            video.src = obfuscatedUrl;
            video.crossOrigin = 'anonymous';
            video.loop = true;
            video.muted = true;
            video.autoplay = true;
            video.playsInline = true;

            const createTexture = () => {
                // 创建带有混淆的视频纹理
                const videoTexture = new THREE.VideoTexture(video);
                
                // 应用额外的处理
                videoTexture.minFilter = THREE.LinearFilter;
                videoTexture.magFilter = THREE.LinearFilter;
                videoTexture.format = THREE.RGBAFormat;
                videoTexture.generateMipmaps = false;
                videoTexture.flipY = false;

                resolve(videoTexture);
            };

            video.addEventListener('loadeddata', createTexture);
            video.addEventListener('canplay', createTexture);
            video.addEventListener('error', reject);

            video.load();
        });
    }

    /**
     * 创建回退纹理
     */
    createFallbackTexture(size = 512) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // 创建渐变背景
        const gradient = ctx.createRadialGradient(
            size/2, size/2, 0,
            size/2, size/2, size/2
        );
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(1, '#2c5282');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // 添加纹理图案
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = 0.1;
        ctx.lineWidth = 2;
        
        for (let i = 0; i < size; i += 32) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, size);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(size, i);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    /**
     * 清理资源
     */
    dispose() {
        this.cache.forEach(texture => {
            if (texture.dispose) {
                texture.dispose();
            }
        });
        this.cache.clear();
    }
}

export default new ProtectedTextureLoader();
