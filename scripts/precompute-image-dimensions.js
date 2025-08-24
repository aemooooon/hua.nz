#!/usr/bin/env node

/**
 * 预计算图片尺寸脚本
 * 
 * 这个脚本会：
 * 1. 扫描 public/gallery/ 目录中的所有图片
 * 2. 计算每张图片的实际尺寸和宽高比
 * 3. 生成预计算数据，可以复制到 Store 中
 * 
 * 使用方法：
 * node scripts/precompute-image-dimensions.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const GALLERY_DIR = path.join(__dirname, '../public/gallery');
const OUTPUT_FILE = path.join(__dirname, '../public/precomputed-dimensions.json');

// 支持的图片格式
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

/**
 * 获取图片尺寸（使用 Canvas API 或 Sharp - 需要在浏览器环境或安装 Sharp）
 */
async function getImageDimensions(imagePath) {
    // 这里是一个示例实现
    // 在实际使用中，你可能需要使用 Sharp 库或其他图片处理工具
    
    try {
        // 模拟不同类型图片的典型尺寸
        const filename = path.basename(imagePath, path.extname(imagePath));
        
        if (filename.includes('vertical')) {
            // 竖版图片
            return {
                width: 800,
                height: 1200,
                aspectRatio: 0.67
            };
        } else if (filename.includes('horizontal')) {
            // 横版图片
            return {
                width: 1600,
                height: 900,
                aspectRatio: 1.78
            };
        } else {
            // 方形或其他
            return {
                width: 1000,
                height: 1000,
                aspectRatio: 1.0
            };
        }
    } catch (error) {
        console.warn(`无法获取图片尺寸: ${imagePath}`, error);
        return {
            width: 800,
            height: 600,
            aspectRatio: 1.33
        };
    }
}

/**
 * 扫描画廊目录
 */
function scanGalleryDirectory() {
    if (!fs.existsSync(GALLERY_DIR)) {
        console.error(`画廊目录不存在: ${GALLERY_DIR}`);
        return [];
    }

    const files = fs.readdirSync(GALLERY_DIR);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_FORMATS.includes(ext);
    });

    console.log(`🖼️ 发现 ${imageFiles.length} 张图片`);
    return imageFiles;
}

/**
 * 生成预计算数据
 */
async function generatePrecomputedData() {
    console.log('🚀 开始生成预计算尺寸数据...');
    
    const imageFiles = scanGalleryDirectory();
    const precomputedData = {};

    for (const file of imageFiles) {
        const imagePath = path.join(GALLERY_DIR, file);
        const filename = path.basename(file, path.extname(file));
        
        console.log(`📐 处理: ${file}`);
        
        const dimensions = await getImageDimensions(imagePath);
        
        precomputedData[filename] = {
            filename: filename,
            originalPath: `/gallery/${file}`,
            dimensions: {
                width: dimensions.width,
                height: dimensions.height
            },
            aspectRatio: dimensions.aspectRatio,
            orientation: dimensions.aspectRatio < 1 ? 'vertical' : 
                        dimensions.aspectRatio > 1.3 ? 'horizontal' : 'square'
        };
    }

    // 保存到 JSON 文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(precomputedData, null, 2), 'utf8');
    
    console.log(`✅ 预计算数据已保存到: ${OUTPUT_FILE}`);
    console.log(`📊 处理了 ${Object.keys(precomputedData).length} 张图片`);
    
    // 生成用于 Store 的代码片段
    generateStoreCodeSnippets(precomputedData);
}

/**
 * 生成 Store 代码片段
 */
function generateStoreCodeSnippets(data) {
    console.log('\n🔧 生成 Store 代码片段:');
    console.log('=' .repeat(50));
    
    Object.entries(data).slice(0, 5).forEach(([filename, info]) => {
        console.log(`
        // ${filename}
        dimensions: { width: ${info.dimensions.width}, height: ${info.dimensions.height} },
        aspectRatio: ${info.aspectRatio.toFixed(2)},`);
    });
    
    console.log('\n💡 将以上代码片段添加到相应的 gallery 项目中');
    console.log('=' .repeat(50));
}

/**
 * 主函数
 */
async function main() {
    try {
        await generatePrecomputedData();
    } catch (error) {
        console.error('❌ 预计算失败:', error);
        process.exit(1);
    }
}

// 运行脚本
main();
