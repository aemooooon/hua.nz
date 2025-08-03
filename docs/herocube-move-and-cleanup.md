# HeroCube移动和组件清理文档

## 变更概述

1. **HeroCube组件移动**: 将HeroCube从`src/components/`移动到`src/components/sections/home/`
2. **faces配置简化**: 移除`icon`字段，只保留文字显示
3. **冗余组件清理**: 删除未使用的HomePage.jsx和PageManager.jsx

## 详细变更

### 1. HeroCube组件移动

**移动路径:**
- 从: `src/components/HeroCube.jsx`
- 到: `src/components/sections/home/HeroCube.jsx`

**import路径更新:**
- HomeSection.jsx: `import HeroCube from './HeroCube';`

### 2. faces配置简化

**移除字段:**
```jsx
// 旧配置
{ name: 'home', label: 'Home', color: '#afcc8f', icon: '🏠', video: '/video.mp4' }

// 新配置  
{ name: 'home', label: 'Home', color: '#afcc8f', video: '/video.mp4' }
```

**渲染变更:**
- 移除图标渲染逻辑
- 文字居中显示，不再偏移位置
- 简化Canvas纹理绘制代码

### 3. 冗余组件分析和清理

#### 发现的冗余组件:
1. **HomePage.jsx** (已删除)
   - 位置: `src/components/HomePage.jsx`
   - 问题: 功能与HomeSection.jsx重叠
   - 使用情况: 只在PageManager.jsx中被引用

2. **PageManager.jsx** (已删除)
   - 位置: `src/components/PageManager.jsx`
   - 问题: 整个文件未被使用
   - 现状: App.jsx使用SmartScrollManager架构

#### 保留的组件:
- **HomeSection.jsx** - 在SmartScrollManager中使用，是当前架构的一部分

### 4. 项目架构确认

**当前使用的架构:**
```
App.jsx
├── SmartScrollManager.jsx
│   ├── HomeSection.jsx (home页面)
│   │   └── HeroCube.jsx
│   ├── AboutSection.jsx
│   ├── ProjectSection.jsx
│   ├── GallerySection.jsx
│   ├── EducationSection.jsx
│   └── ContactSection.jsx
├── ThemeLanguageToggle.jsx
├── SmartDirectionalCursor.jsx
└── MemoryMonitor.jsx
```

**删除的未使用架构:**
```
PageManager.jsx (已删除)
├── HomePage.jsx (已删除)
├── AboutSection.jsx
├── Project.jsx  
├── Gallery.jsx
├── EducationSection.jsx
├── ContactPage.jsx
└── BlogPage.jsx
```

## 文件变更清单

### 删除的文件
- `src/components/HeroCube.jsx`
- `src/components/HomePage.jsx`
- `src/components/PageManager.jsx`

### 新增的文件
- `src/components/sections/home/HeroCube.jsx`

### 修改的文件
- `src/components/sections/home/HomeSection.jsx` (更新import路径)

## 代码优化

### HeroCube faces配置简化
```jsx
// 新的简化配置
const faces = useMemo(() => [
    { name: 'home', label: 'Home', color: '#afcc8f', video: '/video.mp4' },
    { name: 'about', label: 'About', color: '#7ca65c' },
    { name: 'projects', label: 'Projects', color: '#5d7d4b' },
    { name: 'gallery', label: 'Gallery', color: '#768e90' },
    { name: 'education', label: 'Education', color: '#1d2012' },
    { name: 'contact', label: 'Contact', color: '#94a3b8' }
], [content.navigation]);
```

### Canvas纹理渲染优化
- 移除图标绘制逻辑
- 文字居中显示
- 简化绘制代码，提高性能

## 好处

1. **更清晰的文件组织**: HeroCube现在位于home文件夹下，更符合模块化结构
2. **减少代码冗余**: 删除了未使用的组件，减少维护负担
3. **简化界面**: 移除图标后，立方体面更加简洁美观
4. **性能提升**: 减少了Canvas绘制的复杂度

## 注意事项

1. 确保所有引用HeroCube的地方都更新了import路径
2. 如果将来需要图标，可以重新添加icon字段和相关渲染逻辑
3. 项目现在使用单一的SmartScrollManager架构，PageManager系统已完全移除
