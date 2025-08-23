/**
 * 图像格式检测器
 * 检测浏览器对现代图像格式的支持（AVIF, WebP）
 * 使用行业标准的检测方法确保准确性
 */

export class FormatDetector {
    constructor() {
        this.supportCache = new Map();
        this.initializationPromise = this.initializeSupport();
    }

    /**
     * 初始化格式支持检测
     */
    async initializeSupport() {
        console.log('🔄 开始格式支持检测...');
        
        const [avifSupport, webpSupport] = await Promise.all([
            this.detectAVIFSupport(),
            this.detectWebPSupport()
        ]);

        this.supportCache.set('avif', avifSupport);
        this.supportCache.set('webp', webpSupport);

        console.log('🖼️ 图像格式支持检测完成:', {
            avif: avifSupport,
            webp: webpSupport,
            userAgent: navigator.userAgent.substring(0, 100)
        });

        return this.supportCache;
    }

    /**
     * 检测AVIF格式支持
     * 使用实际的AVIF图像数据进行检测
     */
    async detectAVIFSupport() {
        try {
            console.log('🔍 开始AVIF支持检测...');
            // 1x1像素的AVIF图像（Base64编码）
            const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
            
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    console.log('✅ AVIF支持检测: 成功');
                    resolve(true);
                };
                img.onerror = (error) => {
                    console.log('❌ AVIF支持检测: 失败', error);
                    resolve(false);
                };
                img.src = avifData;
                
                // 设置超时以防检测卡住
                setTimeout(() => {
                    console.log('⏰ AVIF支持检测: 超时');
                    resolve(false);
                }, 3000);
            });
        } catch (error) {
            console.warn('❌ AVIF检测异常:', error);
            return false;
        }
    }

    /**
     * 检测WebP格式支持
     * 使用实际的WebP图像数据进行检测
     */
    async detectWebPSupport() {
        try {
            // 1x1像素的WebP图像（Base64编码）
            const webpData = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==';
            
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = webpData;
            });
        } catch (error) {
            console.warn('WebP检测异常:', error);
            return false;
        }
    }

    /**
     * 获取特定格式的支持状态
     */
    async isFormatSupported(format) {
        await this.initializationPromise;
        return this.supportCache.get(format.toLowerCase()) || false;
    }

    /**
     * 获取所有格式支持状态
     */
    async getAllSupport() {
        await this.initializationPromise;
        return Object.fromEntries(this.supportCache);
    }

    /**
     * 获取最佳支持的格式
     * 优先级: AVIF > WebP > JPEG
     */
    async getBestFormat() {
        await this.initializationPromise;
        
        const avifSupport = this.supportCache.get('avif');
        const webpSupport = this.supportCache.get('webp');
        
        let selectedFormat;
        if (avifSupport) {
            selectedFormat = 'avif';
        } else if (webpSupport) {
            selectedFormat = 'webp';
        } else {
            selectedFormat = 'jpg'; // 默认回退格式
        }
        
        console.log(`🎯 选择最佳格式: ${selectedFormat.toUpperCase()} (AVIF支持: ${avifSupport}, WebP支持: ${webpSupport})`);
        return selectedFormat;
    }

    /**
     * 获取压缩信息和性能数据
     */
    async getCompressionInfo() {
        const format = await this.getBestFormat();
        
        const compressionData = {
            jpg: { 
                ratio: 1.0, 
                description: '原始JPEG格式',
                quality: 'baseline',
                compression: '无额外压缩'
            },
            webp: { 
                ratio: 0.65, 
                description: 'WebP格式，平均减少35%文件大小',
                quality: 'good',
                compression: '高效有损/无损压缩'
            },
            avif: { 
                ratio: 0.45, 
                description: 'AVIF格式，平均减少55%文件大小',
                quality: 'excellent',
                compression: '最新AV1编码，最佳压缩比'
            }
        };
        
        const info = compressionData[format];
        return {
            format: format.toUpperCase(),
            ...info,
            savings: Math.round((1 - info.ratio) * 100)
        };
    }
}

// 创建单例实例
export const formatDetector = new FormatDetector();
export default formatDetector;
