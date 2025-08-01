// 八卦位置分析器 - 从图片中获取精确的36爻位置信息
export class BaguaPositionAnalyzer {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.imageData = null;
        this.positions = [];
    }

    // 分析八卦图片并提取所有36爻的位置信息
    async analyzeBaguaImage(imagePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                try {
                    // 创建canvas
                    this.canvas = document.createElement('canvas');
                    this.ctx = this.canvas.getContext('2d');
                    
                    // 设置canvas尺寸
                    this.canvas.width = img.width;
                    this.canvas.height = img.height;
                    
                    // 绘制图片到canvas
                    this.ctx.drawImage(img, 0, 0);
                    
                    // 获取图像数据
                    this.imageData = this.ctx.getImageData(0, 0, img.width, img.height);
                    
                    // 分析并提取所有36爻位置
                    const positions = this.extractAll36YaoPositions();
                    
                    resolve(positions);
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => {
                reject(new Error('Failed to load bagua image'));
            };
            
            img.src = imagePath;
        });
    }

    // 提取所有36爻的位置 - 8个卦象，每个卦象3-6个爻不等
    extractAll36YaoPositions() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        // 优化后的八卦配置 - 基于真实八卦图分析
        const trigrams = [
            { name: '乾', element: '天', angle: 0, yaoCount: 6, radius: 0.35 },       // 乾卦 - 6爻，顶部
            { name: '兑', element: '泽', angle: 45, yaoCount: 4, radius: 0.37 },      // 兑卦 - 4爻，右上
            { name: '离', element: '火', angle: 90, yaoCount: 5, radius: 0.35 },      // 离卦 - 5爻，右侧
            { name: '震', element: '雷', angle: 135, yaoCount: 4, radius: 0.37 },     // 震卦 - 4爻，右下
            { name: '巽', element: '风', angle: 180, yaoCount: 4, radius: 0.35 },     // 巽卦 - 4爻，底部
            { name: '坎', element: '水', angle: 225, yaoCount: 5, radius: 0.37 },     // 坎卦 - 5爻，左下
            { name: '艮', element: '山', angle: 270, yaoCount: 4, radius: 0.35 },     // 艮卦 - 4爻，左侧
            { name: '坤', element: '地', angle: 315, yaoCount: 4, radius: 0.37 }      // 坤卦 - 4爻，左上
        ];

        const allYaoPositions = [];
        let yaoIndex = 0;
        
        // 分析每个卦象的爻位置
        trigrams.forEach((trigram, trigramIndex) => {
            const baseAngle = (trigram.angle * Math.PI) / 180;
            
            // 计算该卦象的精确位置
            const yaoPositionsInTrigram = this.calculateTrigramYaoPositions(
                centerX, centerY, baseAngle, trigram.yaoCount, trigram, width, height
            );
            
            yaoPositionsInTrigram.forEach((yaoPos, localIndex) => {
                allYaoPositions.push({
                    globalIndex: yaoIndex++,
                    trigramIndex: trigramIndex,
                    localIndex: localIndex,
                    trigram: trigram.name,
                    element: trigram.element,
                    baseAngle: trigram.angle,
                    position2D: yaoPos.position2D,
                    position3D: this.convert2DTo3D(yaoPos.position2D, centerX, centerY),
                    isYang: yaoPos.isYang,
                    size: this.calculateYaoSize(yaoPos.isYang, yaoPos.intensity || 0.8),
                    color: this.getTrigramColor(trigram.name),
                    rotation: baseAngle + (yaoPos.localRotation || 0)
                });
            });
        });

        console.log(`Generated ${allYaoPositions.length} yao positions for Bagua 3D layout`);
        return allYaoPositions;
    }

    // 计算特定卦象的爻位置 - 平面八卦布局
    calculateTrigramYaoPositions(centerX, centerY, baseAngle, yaoCount, trigram, width, height) {
        const yaoPositions = [];
        const baseRadius = Math.min(width, height) * 0.25; // 内圈半径
        const ringWidth = Math.min(width, height) * 0.15;  // 每个环的宽度
        
        // 每个卦象的爻在对应方向形成一条线
        for (let i = 0; i < yaoCount; i++) {
            // 从内到外排列爻，形成径向线条
            const yaoRadius = baseRadius + (i * ringWidth / yaoCount);
            
            // 计算该爻的位置
            const x = centerX + Math.cos(baseAngle) * yaoRadius;
            const y = centerY + Math.sin(baseAngle) * yaoRadius;
            
            // 确定阴阳 - 基于传统八卦爻象规律
            const isYang = this.determineYaoType(trigram.name, i);
            
            yaoPositions.push({
                position2D: { x, y },
                isYang: isYang,
                intensity: 0.8 + (i * 0.05),
                localRotation: baseAngle + Math.PI / 2, // 爻垂直于径向方向
                yaoIndex: i
            });
        }
        
        return yaoPositions;
    }

    // 根据卦象和位置确定爻的阴阳属性
    determineYaoType(trigramName, yaoIndex) {
        // 传统八卦的爻象模式
        const trigramPatterns = {
            '乾': [true, true, true, true, true, true],     // 纯阳卦
            '兑': [false, true, true, true],                // 兑卦：上缺
            '离': [true, false, true, false, true],         // 离卦：中虚
            '震': [false, false, true, true],               // 震卦：下实
            '巽': [true, true, false, false],               // 巽卦：下虚
            '坎': [false, true, false, true, false],        // 坎卦：中实
            '艮': [true, false, false, true],               // 艮卦：上实
            '坤': [false, false, false, false]              // 纯阴卦
        };
        
        const pattern = trigramPatterns[trigramName];
        return pattern ? pattern[yaoIndex % pattern.length] : (yaoIndex % 2 === 0);
    }

    // 计算爻的旋转角度
    calculateYaoRotation(baseAngle, isYang) {
        // 阳爻水平，阴爻可能有断裂效果
        return baseAngle + (isYang ? 0 : Math.PI / 2 * 0.1);
    }

    // 扫描特定卦象方向的爻位置
    scanTrigramForYao(centerX, centerY, baseAngle, expectedYaoCount) {
        const yaoPositions = [];
        
        // 定义扫描范围 - 从中心向外扫描
        const minRadius = Math.min(this.canvas.width, this.canvas.height) * 0.2;
        const maxRadius = Math.min(this.canvas.width, this.canvas.height) * 0.45;
        const angleSpread = Math.PI / 16; // 扫描角度范围
        
        // 在该方向扫描黑色块
        const blackRegions = this.findBlackRegionsInSector(
            centerX, centerY, baseAngle, angleSpread, minRadius, maxRadius
        );
        
        // 将黑色区域转换为爻位置
        blackRegions.forEach((region, index) => {
            if (index < expectedYaoCount) {
                const { isYang, intensity } = this.analyzeRegionType(region);
                
                yaoPositions.push({
                    position2D: region.center,
                    isYang: isYang,
                    intensity: intensity,
                    localRotation: this.calculateLocalRotation(region),
                    area: region.area
                });
            }
        });
        
        // 如果找到的爻数量不足，使用计算位置填充
        while (yaoPositions.length < expectedYaoCount) {
            const radius = minRadius + (maxRadius - minRadius) * (yaoPositions.length / (expectedYaoCount - 1));
            const x = centerX + Math.cos(baseAngle) * radius;
            const y = centerY + Math.sin(baseAngle) * radius;
            
            yaoPositions.push({
                position2D: { x, y },
                isYang: yaoPositions.length % 2 === 0,
                intensity: 0.5,
                localRotation: 0,
                area: 100
            });
        }
        
        return yaoPositions.slice(0, expectedYaoCount);
    }

    // 在扇形区域内寻找黑色区域
    findBlackRegionsInSector(centerX, centerY, baseAngle, angleSpread, minRadius, maxRadius) {
        const blackRegions = [];
        const visited = new Set();
        const data = this.imageData.data;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // 扫描扇形区域
        for (let radius = minRadius; radius <= maxRadius; radius += 5) {
            for (let angle = baseAngle - angleSpread; angle <= baseAngle + angleSpread; angle += 0.05) {
                const x = Math.round(centerX + Math.cos(angle) * radius);
                const y = Math.round(centerY + Math.sin(angle) * radius);
                
                if (x >= 0 && x < width && y >= 0 && y < height) {
                    const pixelKey = `${x},${y}`;
                    if (!visited.has(pixelKey)) {
                        visited.add(pixelKey);
                        
                        const index = (y * width + x) * 4;
                        const r = data[index];
                        const g = data[index + 1];
                        const b = data[index + 2];
                        const brightness = (r + g + b) / 3;
                        
                        // 检测黑色像素
                        if (brightness < 50) {
                            const region = this.expandBlackRegion(x, y, visited);
                            if (region.area > 20) { // 过滤太小的区域
                                blackRegions.push(region);
                            }
                        }
                    }
                }
            }
        }
        
        // 按距离中心排序
        return blackRegions.sort((a, b) => {
            const distA = Math.sqrt(Math.pow(a.center.x - centerX, 2) + Math.pow(a.center.y - centerY, 2));
            const distB = Math.sqrt(Math.pow(b.center.x - centerX, 2) + Math.pow(b.center.y - centerY, 2));
            return distA - distB;
        });
    }

    // 扩展黑色区域，使用洪水填充算法
    expandBlackRegion(startX, startY, globalVisited) {
        const region = {
            pixels: [],
            minX: startX, maxX: startX,
            minY: startY, maxY: startY,
            area: 0
        };
        
        const stack = [{x: startX, y: startY}];
        const localVisited = new Set();
        const data = this.imageData.data;
        const width = this.canvas.width;
        
        while (stack.length > 0) {
            const {x, y} = stack.pop();
            const pixelKey = `${x},${y}`;
            
            if (localVisited.has(pixelKey) || globalVisited.has(pixelKey)) continue;
            
            localVisited.add(pixelKey);
            globalVisited.add(pixelKey);
            
            const index = (y * width + x) * 4;
            const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3;
            
            if (brightness < 50) { // 黑色像素
                region.pixels.push({x, y});
                region.area++;
                
                region.minX = Math.min(region.minX, x);
                region.maxX = Math.max(region.maxX, x);
                region.minY = Math.min(region.minY, y);
                region.maxY = Math.max(region.maxY, y);
                
                // 检查4个邻居
                const neighbors = [
                    {x: x-1, y}, {x: x+1, y}, {x, y: y-1}, {x, y: y+1}
                ];
                
                neighbors.forEach(neighbor => {
                    if (neighbor.x >= 0 && neighbor.x < width && 
                        neighbor.y >= 0 && neighbor.y < this.canvas.height &&
                        !localVisited.has(`${neighbor.x},${neighbor.y}`)) {
                        stack.push(neighbor);
                    }
                });
            }
        }
        
        // 计算中心点
        region.center = {
            x: (region.minX + region.maxX) / 2,
            y: (region.minY + region.maxY) / 2
        };
        
        return region;
    }

    // 分析区域类型（阴阳爻）
    analyzeRegionType(region) {
        const width = region.maxX - region.minX;
        const height = region.maxY - region.minY;
        const aspectRatio = width / height;
        
        // 阳爻通常更宽，阴爻通常更高或有断裂
        const isYang = aspectRatio > 1.2 || region.area > 150;
        const intensity = Math.min(region.area / 200, 1);
        
        return { isYang, intensity };
    }

    // 计算局部旋转
    calculateLocalRotation(region) {
        const width = region.maxX - region.minX;
        const height = region.maxY - region.minY;
        
        // 根据形状计算旋转角度
        return width > height ? 0 : Math.PI / 2;
    }

    // 将2D位置转换为3D位置 - 平面八卦布局
    convert2DTo3D(position2D, centerX, centerY) {
        // 将图片坐标系转换为3D世界坐标系，保持在Z=0平面上
        const normalizedX = (position2D.x - centerX) / centerX;
        const normalizedY = -(position2D.y - centerY) / centerY; // Y轴翻转，因为3D中Y向上
        
        // 缩放到合适的3D空间大小，但保持平面
        const scale = 8; // 控制整体大小
        
        return {
            x: normalizedX * scale,
            y: normalizedY * scale, 
            z: 0 // 所有爻都在同一个平面上
        };
    }

    // 根据阴阳爻计算尺寸 - 平面八卦布局，保持宽度比例
    calculateYaoSize(isYang, intensity) {
        if (isYang) {
            // 阳爻 - 较宽的长条形，代表连续不断
            return {
                width: 3.0 + intensity * 0.5,  // 阳爻较宽
                height: 1.8 + intensity * 0.3,
                depth: 0.08 // 很薄，因为是平面布局
            };
        } else {
            // 阴爻 - 较窄，代表中断或分离
            return {
                width: 2.0 + intensity * 0.3,  // 阴爻较窄
                height: 1.8 + intensity * 0.3, // 保持相同高度
                depth: 0.08 // 很薄，因为是平面布局
            };
        }
    }

    // 获取卦象颜色
    getTrigramColor(trigramName) {
        const colors = {
            '乾': '#FFD700', // 金色 - 天
            '兑': '#C0C0C0', // 银色 - 泽
            '离': '#FF4500', // 火红 - 火
            '震': '#32CD32', // 绿色 - 雷
            '巽': '#87CEEB', // 天蓝 - 风
            '坎': '#191970', // 深蓝 - 水
            '艮': '#8B4513', // 棕色 - 山
            '坤': '#8B4513'  // 土褐 - 地
        };
        return colors[trigramName] || '#FFFFFF';
    }

    // 获取太极位置 (图片中心)
    getTaijiPosition() {
        return {
            x: 0,
            y: 0,
            z: 0,
            size: 2.0
        };
    }
}

export default BaguaPositionAnalyzer;
