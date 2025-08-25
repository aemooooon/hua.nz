/**
 * Gallery Web Worker - 处理画廊相关的计算密集型任务
 * 
 * 优化功能：
 * 1. 图片尺寸分析和宽高比计算
 * 2. 画作位置和布局计算
 * 3. 程序化纹理数据生成
 * 4. 路径优化和格式检测
 * 5. 批量数据处理
 */

// Worker主消息处理器
self.onmessage = async function(e) {
    const { type, data, id } = e.data;
    
    try {
        let result;
        
        switch (type) {
            case 'ANALYZE_IMAGE_DIMENSIONS':
                result = await analyzeImageDimensions(data);
                break;
                
            case 'CALCULATE_PAINTING_POSITIONS':
                result = calculatePaintingPositions(data);
                break;
                
            case 'GENERATE_FLOOR_TEXTURE_DATA':
                result = generateFloorTextureData(data);
                break;
                
            case 'GENERATE_CEILING_TEXTURE_DATA':
                result = generateCeilingTextureData(data);
                break;
                
            case 'OPTIMIZE_IMAGE_PATHS':
                result = await optimizeImagePaths(data);
                break;
                
            case 'BATCH_PROCESS_GALLERY_DATA':
                result = await batchProcessGalleryData(data);
                break;
                
            default:
                throw new Error(`Unknown task type: ${type}`);
        }
        
        // 发送成功结果
        self.postMessage({
            id,
            type: `${type}_COMPLETE`,
            success: true,
            result
        });
        
    } catch (error) {
        // 发送错误结果
        self.postMessage({
            id,
            type: `${type}_ERROR`,
            success: false,
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }
};

/**
 * 图片尺寸分析 - 批量处理图片元数据
 */
async function analyzeImageDimensions(galleryData) {
    const maxPaintings = Math.min(galleryData.length, 22);
    const imageAnalysis = [];
    
    for (let i = 0; i < maxPaintings; i++) {
        const item = galleryData[i];
        if (item.src || item.thumbnail) {
            try {
                let aspectRatio, dimensions;
                
                // 优先使用预计算的尺寸
                if (item.aspectRatio && item.dimensions) {
                    aspectRatio = item.aspectRatio;
                    dimensions = item.dimensions;
                } else {
                    // 在Worker中无法直接操作Image对象，返回待处理标记
                    dimensions = { width: 300, height: 200, needsAnalysis: true };
                    aspectRatio = 1.5;
                }
                
                imageAnalysis.push({
                    index: i,
                    item: item,
                    aspectRatio: aspectRatio,
                    isPortrait: aspectRatio < 0.8,
                    isLandscape: aspectRatio > 1.3,
                    isSquare: aspectRatio >= 0.8 && aspectRatio <= 1.3,
                    dimensions: dimensions,
                    isPrecomputed: !!(item.aspectRatio && item.dimensions),
                    needsMainThreadAnalysis: !item.aspectRatio || !item.dimensions
                });
            } catch {
                imageAnalysis.push({
                    index: i,
                    item: item,
                    aspectRatio: 1.0,
                    isPortrait: false,
                    isLandscape: false,
                    isSquare: true,
                    dimensions: { width: 300, height: 200 },
                    isPrecomputed: false,
                    needsMainThreadAnalysis: true
                });
            }
        }
    }
    
    return {
        imageAnalysis,
        statistics: {
            total: imageAnalysis.length,
            precomputed: imageAnalysis.filter(item => item.isPrecomputed).length,
            needsAnalysis: imageAnalysis.filter(item => item.needsMainThreadAnalysis).length
        }
    };
}

/**
 * 画作位置计算 - 复杂的3D布局算法
 */
function calculatePaintingPositions(data) {
    const { wallAssignments } = data;
    const positions = new Map();
    
    // 墙面配置
    const wallConfig = {
        backWallOffset: 35.5,
        frontWallOffset: 35.5,
        rightWallOffset: 15.5,
        leftWallOffset: -15.5,
        paintingCenterHeight: 1.8,
        wallStart: -36,
        intervalWidth: 8
    };
    
    // 计算后墙位置（3张竖图）
    wallAssignments.backWall?.forEach((imageData, index) => {
        const position = {
            x: -10 + index * 10,
            y: 2.4,
            z: -wallConfig.backWallOffset,
            rotation: { x: 0, y: 0, z: 0 }
        };
        positions.set(imageData.item.id, position);
    });
    
    // 计算右墙位置（8张画双层）
    wallAssignments.rightWall?.forEach((imageData) => {
        const position = getRightWallPosition(imageData.item, wallAssignments.rightWall, wallConfig);
        positions.set(imageData.item.id, position);
    });
    
    // 计算左墙位置（8张画双层）
    wallAssignments.leftWall?.forEach((imageData) => {
        const position = getLeftWallPosition(imageData.item, wallAssignments.leftWall, wallConfig);
        positions.set(imageData.item.id, position);
    });
    
    // 计算前墙位置（2张竖图）
    wallAssignments.frontWall?.forEach((imageData, index) => {
        const position = {
            x: index === 0 ? -10 : 10,
            y: 2.4,
            z: wallConfig.frontWallOffset,
            rotation: { x: 0, y: Math.PI, z: 0 }
        };
        positions.set(imageData.item.id, position);
    });
    
    return {
        positions: Object.fromEntries(positions),
        statistics: {
            totalPositions: positions.size,
            wallDistribution: {
                back: wallAssignments.backWall?.length || 0,
                right: wallAssignments.rightWall?.length || 0,
                left: wallAssignments.leftWall?.length || 0,
                front: wallAssignments.frontWall?.length || 0
            }
        }
    };
}

/**
 * 右墙位置计算
 */
function getRightWallPosition(item, rightWallImages, config) {
    const lowerPositions = [
        config.wallStart + config.intervalWidth,
        config.wallStart + 3 * config.intervalWidth,
        config.wallStart + 5 * config.intervalWidth,
        config.wallStart + 7 * config.intervalWidth
    ];
    
    const upperPositions = [
        config.wallStart + 2 * config.intervalWidth,
        config.wallStart + 4 * config.intervalWidth,
        config.wallStart + 6 * config.intervalWidth,
        config.wallStart + 8 * config.intervalWidth
    ];
    
    if (item.layer === 'upper') {
        const upperIndex = rightWallImages.filter(img => img.item.layer === 'upper')
            .findIndex(img => img.item.id === item.id);
        return {
            x: config.rightWallOffset,
            y: config.paintingCenterHeight + 1.2,
            z: upperPositions[upperIndex] || 0,
            rotation: { x: 0, y: -Math.PI / 2, z: 0 }
        };
    } else {
        const lowerIndex = rightWallImages.filter(img => img.item.layer === 'lower')
            .findIndex(img => img.item.id === item.id);
        return {
            x: config.rightWallOffset,
            y: config.paintingCenterHeight,
            z: lowerPositions[lowerIndex] || 0,
            rotation: { x: 0, y: -Math.PI / 2, z: 0 }
        };
    }
}

/**
 * 左墙位置计算
 */
function getLeftWallPosition(item, leftWallImages, config) {
    const rightPos = getRightWallPosition(item, leftWallImages, config);
    return {
        x: config.leftWallOffset,
        y: rightPos.y,
        z: -rightPos.z,
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    };
}

/**
 * 地板纹理数据生成
 */
function generateFloorTextureData(config) {
    const { canvasSize = 1024 } = config;
    
    // 生成纹理数据而不是Canvas对象
    const textureData = {
        size: canvasSize,
        baseColor: '#1a1a1a',
        accentColors: ['#262626', '#2a2a2a', '#1e1e1e', '#333333', '#2d2d2d'],
        spots: [],
        cracks: [],
        gradient: {
            center: { x: canvasSize / 2, y: canvasSize / 2 },
            radius: canvasSize / 2,
            stops: [
                { offset: 0, color: 'rgba(80, 80, 80, 0.15)' },
                { offset: 0.5, color: 'rgba(60, 60, 60, 0.08)' },
                { offset: 1, color: 'rgba(40, 40, 40, 0.02)' }
            ]
        },
        themeAccents: []
    };
    
    // 生成斑点数据
    for (let i = 0; i < 2000; i++) {
        textureData.spots.push({
            x: Math.random() * canvasSize,
            y: Math.random() * canvasSize,
            size: Math.random() * 8 + 2,
            opacity: Math.random() * 0.3 + 0.1,
            colorIndex: Math.floor(Math.random() * textureData.accentColors.length)
        });
    }
    
    // 生成裂纹数据
    for (let i = 0; i < 50; i++) {
        const startX = Math.random() * canvasSize;
        const startY = Math.random() * canvasSize;
        const length = Math.random() * 100 + 50;
        const angle = Math.random() * Math.PI * 2;
        
        textureData.cracks.push({
            startX,
            startY,
            endX: startX + Math.cos(angle) * length,
            endY: startY + Math.sin(angle) * length
        });
    }
    
    // 生成主题色点缀
    for (let i = 0; i < 15; i++) {
        textureData.themeAccents.push({
            x: Math.random() * canvasSize,
            y: Math.random() * canvasSize,
            size: Math.random() * 2 + 1
        });
    }
    
    return textureData;
}

/**
 * 天花板纹理数据生成
 */
function generateCeilingTextureData(config) {
    const { canvasSize = 1024, gridSize = 64 } = config;
    
    const textureData = {
        size: canvasSize,
        gridSize,
        baseColor: '#f8f8f8',
        lineColor: '#e0e0e0',
        lineWidth: 2,
        verticalLines: [],
        horizontalLines: []
    };
    
    // 生成垂直线数据
    for (let x = 0; x <= canvasSize; x += gridSize) {
        textureData.verticalLines.push({
            x,
            startY: 0,
            endY: canvasSize
        });
    }
    
    // 生成水平线数据
    for (let y = 0; y <= canvasSize; y += gridSize) {
        textureData.horizontalLines.push({
            y,
            startX: 0,
            endX: canvasSize
        });
    }
    
    return textureData;
}

/**
 * 图片路径优化
 */
async function optimizeImagePaths(imageList) {
    const optimizedPaths = [];
    
    for (const imagePath of imageList) {
        // 在Worker中进行路径解析和格式检测逻辑
        const pathInfo = parseImagePath(imagePath);
        const optimizedPath = await getOptimizedPath(pathInfo);
        optimizedPaths.push({
            original: imagePath,
            optimized: optimizedPath,
            pathInfo
        });
    }
    
    return optimizedPaths;
}

/**
 * 解析图片路径
 */
function parseImagePath(path) {
    try {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        const parts = cleanPath.split('/');
        const filename = parts[parts.length - 1];
        const folder = parts.length > 1 ? parts.slice(0, -1).join('/') : null;
        const extension = filename.split('.').pop().toLowerCase();
        const basename = filename.replace(/\.[^/.]+$/, '');
        
        return {
            originalPath: path,
            cleanPath,
            folder,
            filename,
            basename,
            extension,
            hasFolder: !!folder
        };
    } catch (error) {
        return {
            originalPath: path,
            error: error.message
        };
    }
}

/**
 * 获取优化路径（Worker版本 - 基于启发式规则）
 */
async function getOptimizedPath(pathInfo) {
    if (pathInfo.error) {
        return pathInfo.originalPath;
    }
    
    const { folder, basename, extension } = pathInfo;
    
    // 基于浏览器支持的启发式格式优先级
    const formatPriority = ['avif', 'webp', extension];
    const folderMappings = folder ? {
        'avif': `${folder}-avif`,
        'webp': `${folder}-webp`,
        [extension]: folder
    } : null;
    
    // 返回格式检测结果，主线程将进行实际的文件存在检查
    return {
        formatOptions: formatPriority.map(format => ({
            format,
            path: folderMappings ? 
                `/${folderMappings[format]}/${basename}.${format}` : 
                `/${basename}.${format}`,
            priority: formatPriority.indexOf(format)
        })),
        fallbackPath: pathInfo.originalPath
    };
}

/**
 * 批量处理画廊数据
 */
async function batchProcessGalleryData(data) {
    const { galleryData, maxPaintings = 22 } = data;
    
    console.log('🔄 Worker: 开始批量处理画廊数据...');
    
    // 1. 分析图片尺寸
    const dimensionAnalysis = await analyzeImageDimensions(galleryData.slice(0, maxPaintings));
    
    // 2. 分配墙面
    const wallAssignments = assignPaintingsToWalls(dimensionAnalysis.imageAnalysis);
    
    // 3. 计算位置
    const positionData = calculatePaintingPositions({
        imageAnalysis: dimensionAnalysis.imageAnalysis,
        wallAssignments
    });
    
    // 4. 生成纹理数据
    const floorTextureData = generateFloorTextureData({ canvasSize: 1024 });
    const ceilingTextureData = generateCeilingTextureData({ canvasSize: 1024 });
    
    // 5. 优化图片路径
    const imagePaths = galleryData
        .slice(0, maxPaintings)
        .map(item => item.src || item.thumbnail)
        .filter(Boolean);
    
    const pathOptimizations = await optimizeImagePaths(imagePaths);
    
    console.log('✅ Worker: 批量处理完成');
    
    return {
        dimensionAnalysis,
        wallAssignments,
        positionData,
        textureData: {
            floor: floorTextureData,
            ceiling: ceilingTextureData
        },
        pathOptimizations,
        statistics: {
            processedImages: dimensionAnalysis.imageAnalysis.length,
            totalPositions: Object.keys(positionData.positions).length,
            optimizedPaths: pathOptimizations.length,
            processingTime: Date.now()
        }
    };
}

/**
 * 墙面分配算法（Worker版本）
 */
function assignPaintingsToWalls(imageAnalysis) {
    const wallAssignments = {
        backWall: [],
        rightWall: [],
        leftWall: [],
        frontWall: []
    };

    // 排除灯箱使用的图片
    const filteredAnalysis = imageAnalysis.filter(img => 
        img.item.position !== 'lightbox'
    );

    // 按store中预设的wall属性分组
    const verticalWallImages = filteredAnalysis.filter(img => 
        img.item.wall === 'vertical_wall_32m'
    );
    const horizontalWallImages = filteredAnalysis.filter(img => 
        img.item.wall === 'horizontal_wall_64m'
    );

    // 按layer分组
    const upperLayerImages = horizontalWallImages.filter(img => img.item.layer === 'upper');
    const lowerLayerImages = horizontalWallImages.filter(img => img.item.layer === 'lower');

    // 分配墙面
    wallAssignments.backWall = verticalWallImages.slice(0, 3);
    wallAssignments.frontWall = verticalWallImages.slice(3, 5);
    wallAssignments.rightWall = [
        ...upperLayerImages.slice(0, 4),
        ...lowerLayerImages.slice(0, 4)
    ];
    wallAssignments.leftWall = [
        ...upperLayerImages.slice(4, 8),
        ...lowerLayerImages.slice(4, 8)
    ];

    return wallAssignments;
}

console.log('🚀 Gallery Web Worker 已就绪');
