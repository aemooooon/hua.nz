# HeroCube重构文档

## 重构概述

将原来的`NavigationCube`组件重构为`HeroCube`组件，去掉所有非主页的导航功能，只保留首页的展示功能。

## 主要变更

### 1. 组件重命名
- `NavigationCube.jsx` → `HeroCube.jsx`
- 移除所有导航相关功能
- 专注于首页展示效果

### 2. 功能简化
- **移除**: 非主页的导航立方体显示
- **移除**: 页面切换时的3D旋转动画
- **移除**: 拖拽交互功能（设置为`pointerEvents: 'none'`）
- **保留**: 首页的震撼开场动画
- **保留**: 鼠标悬停的物理晃动效果
- **保留**: 视频纹理和Canvas纹理

### 3. Props简化
**旧Props (NavigationCube):**
```jsx
{
    isLandingPage = false,
    onSectionChange,
    sections = [],
    currentSectionId,
    enableOpeningAnimation = false,
    onAnimationComplete
}
```

**新Props (HeroCube):**
```jsx
{
    enableOpeningAnimation = false,
    onAnimationComplete
}
```

### 4. 相关文件更新

#### 更新的组件引用
- `HomePage.jsx`: 更新import和组件使用
- `HomeSection.jsx`: 更新import和props
- `PageManager.jsx`: 移除NavigationCube相关代码
- `GallerySection.jsx`: 更新注释

#### 移除的功能
- 非主页的右上角小立方体
- 页面切换动画
- section切换时的3D旋转
- 拖拽旋转交互

### 5. 技术实现细节

#### 保留的核心功能
1. **震撼开场动画**: 完整的23.5秒开场动画序列
2. **物理效果**: 鼠标移动的弹簧物理系统
3. **高质量渲染**: MeshPhysicalMaterial + 抗锯齿
4. **视频纹理**: home面的video.mp4支持
5. **Canvas纹理**: 其他面的图标和文字渲染

#### 移除的功能
1. **非主页显示**: 不再在其他页面显示立方体
2. **交互功能**: 完全移除拖拽和点击交互
3. **导航逻辑**: 移除section切换相关代码
4. **响应式尺寸**: 统一使用全屏尺寸

### 6. 性能优化

- 减少组件复杂度，提高渲染性能
- 移除不必要的状态管理
- 简化事件监听器
- 专注于首页体验

## 使用方式

### 在HomePage中使用
```jsx
import HeroCube from "./HeroCube";

<HeroCube 
    enableOpeningAnimation={true}
    onAnimationComplete={() => console.log('Animation complete')}
/>
```

### 在HomeSection中使用
```jsx
import HeroCube from '../../HeroCube';

<HeroCube 
    enableOpeningAnimation={enableOpeningAnimation}
/>
```

## 文件结构变更

### 删除的文件
- `src/components/NavigationCube.jsx`

### 新增的文件
- `src/components/HeroCube.jsx`

### 修改的文件
- `src/components/HomePage.jsx`
- `src/components/PageManager.jsx`
- `src/components/sections/home/HomeSection.jsx`
- `src/components/sections/gallery/GallerySection.jsx`

## 未来扩展

如果将来需要恢复导航功能，可以考虑：
1. 创建单独的NavigationComponent
2. 使用不同的UI模式（如导航栏、侧边栏等）
3. HeroCube专注于首页视觉效果，其他导航功能独立实现

## 测试建议

1. 验证首页HeroCube正常显示
2. 测试开场动画完整播放
3. 验证鼠标悬停物理效果
4. 确认其他页面不显示立方体
5. 检查所有页面切换正常工作
