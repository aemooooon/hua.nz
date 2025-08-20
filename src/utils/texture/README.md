# 现代纹理系统

## 简介

统一的纹理管理系统，支持AVIF、WebP和JPEG格式的智能选择和自动回退。

## 快速开始

```javascript
import textureSystem from '../utils/texture';

// 加载单个纹理
const texture = await textureSystem.loadTexture('about');

// 批量预加载
await textureSystem.preloadTextures(['about', 'projects', 'gallery']);

// 获取格式信息
const info = await textureSystem.getCompressionInfo();
console.log(`使用格式: ${info.format}, 节省: ${info.savings}%`);
```

## 主要特性

- **智能格式选择**: 自动检测浏览器支持，优先使用AVIF → WebP → JPEG
- **自动回退**: 加载失败时自动回退到兼容格式
- **内存管理**: 智能缓存和内存监控
- **性能优化**: 并发控制和加载统计
- **简单易用**: 统一的API接口

## API 参考

### 基础方法

```javascript
// 加载纹理
await textureSystem.loadTexture(name, options)

// 预加载纹理
await textureSystem.preloadTextures(names, options)

// 获取最佳格式
const format = await textureSystem.getBestFormat()

// 获取压缩信息
const info = await textureSystem.getCompressionInfo()

// 清理缓存
textureSystem.clearCache()

// 获取统计信息
const stats = textureSystem.getStats()
```

### 高级功能

```javascript
import { textureManager } from '../utils/texture';

// 按优先级预加载
await textureManager.preloadByPriority({
  critical: { 
    textures: ['home', 'about'], 
    priority: 10 
  },
  normal: { 
    textures: ['projects', 'gallery'], 
    priority: 5 
  }
});

// 加载Cube纹理集合
const textures = await textureManager.loadCubeTextures(
  ['about', 'projects', 'gallery'], 
  { 
    onProgress: (progress) => console.log(`${Math.round(progress * 100)}%`) 
  }
);
```

## 文件组织

新系统需要以下目录结构：

```
public/
├── cube-textures/          # 原始JPEG格式
│   ├── about.jpg
│   ├── projects.jpg
│   └── ...
├── cube-textures-webp/     # WebP格式
│   ├── about.webp
│   ├── projects.webp
│   └── ...
└── cube-textures-avif/     # AVIF格式
    ├── about.avif
    ├── projects.avif
    └── ...
```

## 格式支持

| 格式 | 压缩比 | 兼容性 | 说明 |
|------|--------|--------|------|
| AVIF | ~55%节省 | 现代浏览器 | 最新AV1编码，最佳压缩比 |
| WebP | ~35%节省 | 广泛支持 | 高效有损/无损压缩 |
| JPEG | 基准 | 通用支持 | 回退格式 |

## 迁移指南

从旧系统迁移只需要几个简单步骤：

1. **更新导入**
   ```javascript
   // 旧的
   import smartTextureLoader from '../utils/SmartTextureLoader';
   
   // 新的
   import textureSystem from '../utils/texture';
   ```

2. **简化配置**
   ```javascript
   // 旧的
   image: `/${directory}/about.${format}`
   
   // 新的
   texture: 'about'
   ```

3. **更新加载代码**
   ```javascript
   // 旧的
   const texture = texturePreloader.getTexture(url);
   
   // 新的
   const texture = await textureSystem.loadTexture(name);
   ```

详细迁移指南请参考 [TEXTURE_SYSTEM_MIGRATION.md](./TEXTURE_SYSTEM_MIGRATION.md)
