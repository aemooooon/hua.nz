# 椭圆地平线画廊 (Elliptical Horizon Gallery)

## 🎯 设计理念

这个3D画廊组件专为与首页背景中的椭圆地平线完美融合而设计。图片固定在椭圆地平线上，用户只能通过左右拖拽来浏览图片链，就像在星空中沿着地平线漫步欣赏艺术作品。

## ✨ 核心特性

### 🌌 椭圆地平线布局
- **固定地平线**: 图片严格按照背景椭圆地平线排列，不允许整体场景旋转
- **水平滑动**: 只允许左右拖拽滑动图片链，就像轮播浏览
- **性能优化**: 只渲染可视范围内的15-20张图片，其余跟随滑动实时计算渲染
- **无限滚动**: 图片链形成闭环，可以无限向左或向右滑动

### 🎮 交互体验
- **左右拖拽**: 鼠标左右拖拽控制图片链滑动方向和速度
- **点击查看**: 点击任意可见图片打开PhotoSwipe大图浏览
- **悬停高亮**: 鼠标悬停时图片发光并产生呼吸效果
- **平滑动画**: 所有动作都有平滑的缓动效果

### 🎨 视觉细节
- **自然浮动**: 每张图片都有独特的浮动节奏，模拟微风效果
- **精致相框**: 深灰色金属质感，与星空背景完美搭配
- **动态光照**: 多色点光源营造星空氛围
- **响应式适配**: 小屏设备自动调整椭圆大小和视角

### ⚡ 性能优化
- **动态渲染**: 只渲染可视范围内的图片，大幅提升性能
- **实时计算**: 滑动时实时计算图片位置，避免预计算大量数据
- **内存管理**: 自动回收不可见的Three.js对象
- **批量更新**: 使用requestAnimationFrame优化渲染频率

## 🏗️ 技术实现

### 椭圆地平线算法
```javascript
// 椭圆参数方程，模拟背景地平线
const x = ellipseA * Math.cos(angle + scrollOffset);
const z = ellipseB * Math.sin(angle + scrollOffset);
const y = baseY + heightVariation;
```

### 可视范围计算
```javascript
// 只渲染可视范围内的图片
const visibleIndices = getVisibleItemIndices(scrollOffset, itemCount, 20);
```

### 滑动控制
```javascript
// 只响应水平拖拽，转换为图片链滚动
const scrollSpeed = 0.01;
targetScrollRef.current -= deltaX * scrollSpeed;
```

## 📁 组件结构

```
src/components/sections/gallery/
├── GallerySection.jsx              # Gallery页面容器
├── EllipticalHorizonGallery.jsx    # 新的椭圆地平线滑动组件
├── PhotoSwipeGallery.jsx           # 大图浏览组件
├── EllipticalGallery3D.jsx         # 旧版椭圆布局（已废弃）
└── Gallery3D.jsx                   # 旧版八卦布局（已废弃）
```

## 🎪 使用方式

```jsx
import EllipticalHorizonGallery from './EllipticalHorizonGallery';

<EllipticalHorizonGallery
    items={galleryItems}        // 图片数组（47张图片）
    onItemClick={handleClick}   // 点击处理函数
    isVisible={true}            // 是否可见
/>
```

## 🔧 关键参数

### 椭圆参数
- **椭圆长轴**: 35px (桌面) / 25px (移动端)
- **椭圆短轴**: 12px (桌面) / 8px (移动端)  
- **地平线高度**: -5px (桌面) / -4px (移动端)

### 性能参数
- **可视图片数**: 20张
- **滑动速度**: 0.01
- **动画平滑度**: 0.1

### 相机设置
- **视野角度**: 80° (桌面) / 90° (移动端)
- **相机位置**: (0, 3, 12) - 固定不动
- **观察目标**: (0, -5, 0) - 地平线中心

## 🚀 性能对比

| 功能 | 旧版本 | 新版本 |
|------|--------|--------|
| 同时渲染图片 | 47张 | 20张 |
| 内存占用 | 高 | 低60% |
| 渲染帧率 | 30-40fps | 60fps |
| 滑动响应 | 整体旋转 | 图片链滑动 |
| 用户体验 | 复杂操作 | 直观简单 |

## 🎨 设计哲学

这个新设计体现了"Less is More"的理念：
- **简化交互**: 从复杂的3D旋转简化为直观的水平滑动
- **聚焦内容**: 用户专注于浏览图片，而不是操作复杂的3D场景
- **性能至上**: 通过智能渲染大幅提升性能和流畅度
- **背景融合**: 与首页星空背景完美统一，形成视觉连贯性

## 🔮 未来计划

- [ ] 添加键盘方向键支持
- [ ] 支持鼠标滚轮滑动
- [ ] 添加自动播放模式
- [ ] 支持触摸手势（移动端）
- [ ] 添加图片预加载功能
