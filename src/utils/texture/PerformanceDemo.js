/**
 * 纹理系统性能对比工具
 * 用于展示AVIF、WebP和JPEG格式的加载性能对比
 */

import textureSystem from '../src/utils/texture/index.js';

class TexturePerformanceDemo {
    constructor() {
        this.results = {};
        this.container = null;
    }

    // 创建演示界面
    createDemoUI() {
        // 创建容器
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 400px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 12px;
            z-index: 10000;
            max-height: 80vh;
            overflow-y: auto;
        `;

        // 添加标题
        const title = document.createElement('h3');
        title.textContent = '🖼️ 纹理系统性能监控';
        title.style.cssText = 'margin: 0 0 15px 0; color: #00ff88;';
        this.container.appendChild(title);

        // 添加格式信息区域
        this.formatInfo = document.createElement('div');
        this.formatInfo.style.cssText = 'margin-bottom: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;';
        this.container.appendChild(this.formatInfo);

        // 添加性能统计区域
        this.statsArea = document.createElement('div');
        this.statsArea.style.cssText = 'margin-bottom: 15px;';
        this.container.appendChild(this.statsArea);

        // 添加实时加载信息区域
        this.loadingArea = document.createElement('div');
        this.loadingArea.style.cssText = 'border-top: 1px solid #333; padding-top: 15px;';
        this.container.appendChild(this.loadingArea);

        // 添加控制按钮
        this.createControlButtons();

        // 添加到页面
        document.body.appendChild(this.container);
    }

    // 创建控制按钮
    createControlButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'margin-top: 15px; display: flex; gap: 10px;';

        // 测试按钮
        const testBtn = document.createElement('button');
        testBtn.textContent = '🧪 运行测试';
        testBtn.style.cssText = 'padding: 8px 12px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;';
        testBtn.onclick = () => this.runPerformanceTest();

        // 清除缓存按钮
        const clearBtn = document.createElement('button');
        clearBtn.textContent = '🧹 清除缓存';
        clearBtn.style.cssText = 'padding: 8px 12px; background: #cc3700; color: white; border: none; border-radius: 4px; cursor: pointer;';
        clearBtn.onclick = () => this.clearCache();

        // 隐藏按钮
        const hideBtn = document.createElement('button');
        hideBtn.textContent = '👁️ 隐藏';
        hideBtn.style.cssText = 'padding: 8px 12px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer;';
        hideBtn.onclick = () => this.toggleVisibility();

        buttonContainer.appendChild(testBtn);
        buttonContainer.appendChild(clearBtn);
        buttonContainer.appendChild(hideBtn);
        this.container.appendChild(buttonContainer);
    }

    // 更新格式信息显示
    async updateFormatInfo() {
        try {
            const compressionInfo = await textureSystem.getCompressionInfo();
            const format = await textureSystem.getBestFormat();

            this.formatInfo.innerHTML = `
                <div style="color: #00ff88; font-weight: bold;">📊 当前浏览器支持</div>
                <div>🎯 最佳格式: <span style="color: #ffaa00;">${format.toUpperCase()}</span></div>
                <div>💾 压缩比: <span style="color: #ffaa00;">${compressionInfo.ratio}</span></div>
                <div>📉 节省空间: <span style="color: #00ff88;">${compressionInfo.savings}%</span></div>
                <div>📝 说明: ${compressionInfo.description}</div>
            `;
        } catch (error) {
            this.formatInfo.innerHTML = `<div style="color: #ff4444;">❌ 格式检测失败: ${error.message}</div>`;
        }
    }

    // 更新性能统计
    updateStats() {
        try {
            const stats = textureSystem.getStats();
            
            this.statsArea.innerHTML = `
                <div style="color: #00ff88; font-weight: bold;">📈 性能统计</div>
                <div>📦 总加载次数: <span style="color: #ffaa00;">${stats.totalLoads}</span></div>
                <div>✅ 成功加载: <span style="color: #00ff88;">${stats.successfulLoads}</span></div>
                <div>❌ 失败次数: <span style="color: #ff4444;">${stats.failedLoads}</span></div>
                <div>📊 成功率: <span style="color: #00ff88;">${stats.successRate}%</span></div>
                <div>⏱️ 平均加载时间: <span style="color: #ffaa00;">${stats.averageLoadTime}ms</span></div>
                <div>💾 缓存大小: <span style="color: #ffaa00;">${stats.cache.total}</span></div>
                <div>🔄 内存使用: <span style="color: #ffaa00;">${stats.cache.memory.mb}MB</span></div>
            `;
        } catch (error) {
            this.statsArea.innerHTML = `<div style="color: #ff4444;">❌ 统计信息获取失败: ${error.message}</div>`;
        }
    }

    // 运行性能测试
    async runPerformanceTest() {
        this.updateLoadingInfo('🚀 开始性能测试...');
        
        try {
            const testTextures = ['about', 'projects', 'gallery', 'education', 'contact'];
            const startTime = performance.now();
            
            // 测试批量加载
            await textureSystem.preloadTextures(testTextures, {
                onProgress: (progress, loaded, total) => {
                    this.updateLoadingInfo(`📦 预加载进度: ${loaded}/${total} (${Math.round(progress * 100)}%)`);
                }
            });
            
            const endTime = performance.now();
            const loadTime = Math.round(endTime - startTime);
            
            this.updateLoadingInfo(`✅ 测试完成！总耗时: ${loadTime}ms`);
            
            // 更新统计信息
            this.updateStats();
            
        } catch (error) {
            this.updateLoadingInfo(`❌ 测试失败: ${error.message}`);
        }
    }

    // 更新加载信息
    updateLoadingInfo(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.loadingArea.innerHTML = `
            <div style="color: #00ff88; font-weight: bold;">🔄 实时日志</div>
            <div style="margin-top: 5px; color: #ccc;">
                [${timestamp}] ${message}
            </div>
        `;
    }

    // 清除缓存
    clearCache() {
        try {
            textureSystem.clearCache();
            this.updateLoadingInfo('🧹 缓存已清除');
            this.updateStats();
        } catch (error) {
            this.updateLoadingInfo(`❌ 清除缓存失败: ${error.message}`);
        }
    }

    // 切换显示状态
    toggleVisibility() {
        if (this.container.style.display === 'none') {
            this.container.style.display = 'block';
        } else {
            this.container.style.display = 'none';
        }
    }

    // 初始化演示
    async init() {
        this.createDemoUI();
        await this.updateFormatInfo();
        this.updateStats();
        
        // 定期更新统计信息
        setInterval(() => {
            this.updateStats();
        }, 5000);
        
        console.log('🖼️ 纹理系统性能监控已启动');
        console.log('可以通过右上角的面板查看实时性能数据');
    }
}

// 自动启动演示（仅在浏览器环境中）
if (typeof window !== 'undefined') {
    window.texturePerformanceDemo = new TexturePerformanceDemo();
    
    // 等待页面加载完成后启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.texturePerformanceDemo.init();
        });
    } else {
        window.texturePerformanceDemo.init();
    }
}

export default TexturePerformanceDemo;
