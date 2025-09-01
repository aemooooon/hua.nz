#!/usr/bin/env node

/**
 * 图片格式转换脚本
 * 将JPEG图片批量转换为AVIF和WebP格式
 *
 * 使用方法:
 * node scripts/convert-images.js [folder-name]
 *
 * 例如:
 * node scripts/convert-images.js aqi
 * node scripts/convert-images.js all  # 转换所有文件夹
 */

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import process from 'process';

const execAsync = promisify(exec);

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUALITY_AVIF = 23;  // AVIF CRF值 (0-63, 越小质量越高) - 高质量设置
const QUALITY_WEBP = 95;  // WebP质量 (0-100, 越大质量越高) - 高质量设置

// 需要转换的文件夹列表
const IMAGE_FOLDERS = [
    'aqi',
    'citanz',
    'data472',
    'education',
    'f4',
    'fitsgo',
    'hua.nz',
    'realibox',
    'travelassistant',
    'vr',
    'website',
    'zespri'
];

// 支持的图片格式 (排除GIF)
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

/**
 * 检查命令行工具是否可用
 */
async function checkTools() {
    console.log('🔧 检查必要工具...');

    try {
        await execAsync('ffmpeg -version');
        console.log('✅ FFmpeg 可用');
    } catch {
        console.error('❌ FFmpeg 不可用，请先安装:');
        console.error('   macOS: brew install ffmpeg');
        console.error('   Ubuntu: sudo apt install ffmpeg');
        process.exit(1);
    }
}

/**
 * 获取文件夹中的所有图片文件（排除GIF）
 */
function getImageFiles(folderPath) {
    try {
        const files = fs.readdirSync(folderPath);
        return files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            const isSupported = SUPPORTED_EXTENSIONS.includes(ext);
            if (!isSupported && ext === '.gif') {
                console.log(`⏭️  跳过GIF文件: ${file}`);
            }
            return isSupported;
        });
    } catch {
        console.error(`❌ 无法读取文件夹: ${folderPath}`);
        return [];
    }
}

/**
 * 转换单个图片文件
 */
async function convertImage(inputPath, outputPath, format, quality) {
    try {
        let command;

        if (format === 'avif') {
            // 使用CRF模式，质量更可控，速度更快
            command = `ffmpeg -y -i "${inputPath}" -c:v libaom-av1 -crf ${quality} -b:v 0 -cpu-used 4 "${outputPath}"`;
        } else if (format === 'webp') {
            // 使用更好的WebP编码参数
            command = `ffmpeg -y -i "${inputPath}" -c:v libwebp -quality ${quality} -method 6 "${outputPath}"`;
        } else {
            throw new Error(`不支持的格式: ${format}`);
        }

        await execAsync(command);

        // 检查输出文件大小
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const compressionRatio = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
        const sizeMB = (outputStats.size / 1024 / 1024).toFixed(2);

        console.log(`   ${format.toUpperCase()}: ${compressionRatio}% 压缩 (${sizeMB}MB)`);
    } catch (error) {
        console.error(`   ❌ ${format.toUpperCase()} 转换失败: ${error.message}`);
    }
}

/**
 * 处理子文件夹中的图片
 */
async function processSubfolder(sourceFolder, targetFolder, subPath) {
    const sourcePath = path.join(sourceFolder, subPath);
    const targetAvifPath = path.join(targetFolder + '-avif', subPath);
    const targetWebpPath = path.join(targetFolder + '-webp', subPath);

    // 创建目标子文件夹
    if (!fs.existsSync(targetAvifPath)) {
        fs.mkdirSync(targetAvifPath, { recursive: true });
    }
    if (!fs.existsSync(targetWebpPath)) {
        fs.mkdirSync(targetWebpPath, { recursive: true });
    }

    const files = getImageFiles(sourcePath);

    for (const file of files) {
        const fileName = path.parse(file).name;
        const inputPath = path.join(sourcePath, file);
        const avifOutputPath = path.join(targetAvifPath, fileName + '.avif');
        const webpOutputPath = path.join(targetWebpPath, fileName + '.webp');

        console.log(`📸 处理: ${subPath}/${file}`);

        await Promise.all([
            convertImage(inputPath, avifOutputPath, 'avif', QUALITY_AVIF),
            convertImage(inputPath, webpOutputPath, 'webp', QUALITY_WEBP)
        ]);
    }
}

/**
 * 转换文件夹中的所有图片
 */
async function convertFolder(folderName) {
    const sourceFolder = path.join(PUBLIC_DIR, folderName);

    if (!fs.existsSync(sourceFolder)) {
        console.error(`❌ 文件夹不存在: ${sourceFolder}`);
        return;
    }

    console.log(`\n🎯 处理文件夹: ${folderName}`);

    const targetAvifFolder = path.join(PUBLIC_DIR, folderName + '-avif');
    const targetWebpFolder = path.join(PUBLIC_DIR, folderName + '-webp');

    // 创建目标文件夹
    if (!fs.existsSync(targetAvifFolder)) {
        fs.mkdirSync(targetAvifFolder, { recursive: true });
    }
    if (!fs.existsSync(targetWebpFolder)) {
        fs.mkdirSync(targetWebpFolder, { recursive: true });
    }

    // 检查是否有子文件夹（如 realibox/editor）
    const items = fs.readdirSync(sourceFolder);
    const subfolders = items.filter(item => {
        const itemPath = path.join(sourceFolder, item);
        return fs.statSync(itemPath).isDirectory();
    });

    if (subfolders.length > 0) {
        // 处理子文件夹
        for (const subfolder of subfolders) {
            await processSubfolder(sourceFolder, path.join(PUBLIC_DIR, folderName), subfolder);
        }
    }

    // 处理根目录下的图片文件
    const files = getImageFiles(sourceFolder);

    for (const file of files) {
        const fileName = path.parse(file).name;
        const inputPath = path.join(sourceFolder, file);
        const avifOutputPath = path.join(targetAvifFolder, fileName + '.avif');
        const webpOutputPath = path.join(targetWebpFolder, fileName + '.webp');

        console.log(`📸 处理: ${file}`);

        await Promise.all([
            convertImage(inputPath, avifOutputPath, 'avif', QUALITY_AVIF),
            convertImage(inputPath, webpOutputPath, 'webp', QUALITY_WEBP)
        ]);
    }

    console.log(`✅ ${folderName} 转换完成`);
}

/**
 * 主函数
 */
async function main() {
    console.log('🖼️  图片格式转换工具');
    console.log('====================');

    await checkTools();

    const targetFolder = process.argv[2];

    if (!targetFolder) {
        console.log('\n使用方法:');
        console.log('  node scripts/convert-images.js <folder-name>');
        console.log('  node scripts/convert-images.js all');
        console.log('\n可用文件夹:');
        IMAGE_FOLDERS.forEach(folder => console.log(`  - ${folder}`));
        return;
    }

    if (targetFolder === 'all') {
        console.log('🔄 转换所有文件夹...');
        for (const folder of IMAGE_FOLDERS) {
            await convertFolder(folder);
        }
    } else if (IMAGE_FOLDERS.includes(targetFolder)) {
        await convertFolder(targetFolder);
    } else {
        console.error(`❌ 不支持的文件夹: ${targetFolder}`);
        console.log('可用文件夹:', IMAGE_FOLDERS.join(', '));
    }

    console.log('\n🎉 转换完成!');
}

// 运行主函数 - ES模块方式
main().catch(error => {
    console.error('❌ 转换失败:', error);
    process.exit(1);
});
