/**
 * 纹理系统测试脚本
 * 用于验证新的纹理系统功能
 */

import textureSystem from '../src/utils/texture/index.js';

// 测试格式检测
async function testFormatDetection() {
    console.log('🧪 测试格式检测...');
    
    try {
        const format = await textureSystem.getBestFormat();
        console.log(`✅ 最佳格式: ${format}`);
        
        const compressionInfo = await textureSystem.getCompressionInfo();
        console.log(`✅ 压缩信息:`, compressionInfo);
        
        return true;
    } catch (error) {
        console.error('❌ 格式检测失败:', error);
        return false;
    }
}

// 测试纹理加载
async function testTextureLoading() {
    console.log('🧪 测试纹理加载...');
    
    try {
        const texture = await textureSystem.loadTexture('about');
        console.log(`✅ 纹理加载成功:`, texture);
        
        return true;
    } catch (error) {
        console.error('❌ 纹理加载失败:', error);
        return false;
    }
}

// 测试批量预加载
async function testBatchPreload() {
    console.log('🧪 测试批量预加载...');
    
    try {
        const textureNames = ['about', 'projects', 'gallery'];
        const startTime = performance.now();
        
        await textureSystem.preloadTextures(textureNames, {
            onProgress: (progress, loaded, total) => {
                console.log(`📦 预加载进度: ${loaded}/${total} (${Math.round(progress * 100)}%)`);
            }
        });
        
        const endTime = performance.now();
        console.log(`✅ 批量预加载完成，耗时: ${Math.round(endTime - startTime)}ms`);
        
        return true;
    } catch (error) {
        console.error('❌ 批量预加载失败:', error);
        return false;
    }
}

// 测试统计信息
async function testStats() {
    console.log('🧪 测试统计信息...');
    
    try {
        const stats = textureSystem.getStats();
        console.log(`✅ 统计信息:`, stats);
        
        return true;
    } catch (error) {
        console.error('❌ 获取统计信息失败:', error);
        return false;
    }
}

// 运行所有测试
async function runAllTests() {
    console.log('🚀 开始纹理系统测试...');
    console.log('==================');
    
    const tests = [
        { name: '格式检测', fn: testFormatDetection },
        { name: '纹理加载', fn: testTextureLoading },
        { name: '批量预加载', fn: testBatchPreload },
        { name: '统计信息', fn: testStats }
    ];
    
    let passed = 0;
    let failed = 0;
    
    for (const test of tests) {
        console.log(`\n🔍 ${test.name}`);
        try {
            const result = await test.fn();
            if (result) {
                passed++;
                console.log(`✅ ${test.name} 通过`);
            } else {
                failed++;
                console.log(`❌ ${test.name} 失败`);
            }
        } catch (error) {
            failed++;
            console.error(`❌ ${test.name} 异常:`, error);
        }
    }
    
    console.log('\n==================');
    console.log(`📊 测试结果: ${passed} 通过, ${failed} 失败`);
    
    if (failed === 0) {
        console.log('🎉 所有测试通过！纹理系统工作正常。');
    } else {
        console.log('⚠️ 部分测试失败，请检查相关功能。');
    }
}

// 如果在浏览器环境中运行
if (typeof window !== 'undefined') {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllTests);
    } else {
        runAllTests();
    }
} else {
    // Node.js环境
    runAllTests();
}

export { runAllTests, testFormatDetection, testTextureLoading, testBatchPreload, testStats };
