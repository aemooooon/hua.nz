# 📋 代码规范 (Code Convention)

## 📁 文件结构规范

### 🎯 整体架构原则
- **按功能分组**，而非按文件类型分组
- **单一职责**：每个文件夹有明确的用途
- **易于维护**：相关功能聚集在一起
- **符合React最佳实践**

### 📂 文件夹结构

```
src/
├── components/          # React组件
│   ├── ui/             # 通用UI组件
│   ├── features/       # 特殊功能组件
│   ├── sections/       # 页面区块组件
│   └── background/     # 背景效果组件
├── data/               # 静态数据文件
├── hooks/              # 自定义React Hooks
├── store/              # 状态管理
├── utils/              # 工具函数和调试工具
├── styles/             # 样式文件
├── workers/            # Web Workers
└── assets/             # 静态资源
```

## 🧩 组件分类规范

### 📦 `components/ui/`
**用途**: 可复用的通用UI组件
**特点**: 
- 无业务逻辑，只关注展示和交互
- 高度可复用
- 可以在不同项目中使用

**包含文件**:
- `ErrorBoundary.jsx` - 错误边界组件
- `GlobalLoadingIndicator.jsx` - 全局加载指示器
- `ThemeLanguageToggle.jsx` - 主题语言切换器

**命名规范**: PascalCase, 描述性名称
**示例**: `LoadingSpinner.jsx`, `Modal.jsx`, `Button.jsx`

### ⚡ `components/features/`
**用途**: 特殊功能组件
**特点**:
- 包含复杂的业务逻辑
- 通常是独立的功能模块
- 可能包含自己的状态管理

**包含文件**:
- `SmartDirectionalCursor.jsx` - 智能方向光标
- `SmartScrollManager.jsx` - 智能滚动管理器

**命名规范**: PascalCase, 功能描述性名称
**示例**: `AudioPlayer.jsx`, `FileUploader.jsx`, `ChatWidget.jsx`

### 📄 `components/sections/`
**用途**: 页面区块组件
**特点**:
- 对应网站的不同页面或区块
- 包含页面特定的业务逻辑
- 通常是较大的组件，组合其他小组件

**文件夹结构**:
```
sections/
├── home/          # 首页相关组件
├── about/         # 关于页面组件
├── gallery/       # 画廊页面组件
├── project/       # 项目页面组件
├── education/     # 教育经历组件
└── contact/       # 联系页面组件
```

**命名规范**: PascalCase + "Section" 后缀
**示例**: `HomeSection.jsx`, `AboutSection.jsx`

### 🎨 `components/background/`
**用途**: 背景视觉效果组件
**特点**:
- 主要用于视觉效果
- 通常使用Canvas、WebGL等技术
- 可能包含复杂的动画逻辑

**包含文件**:
- `BackgroundCanvas.jsx` - 背景画布管理器
- `EffectAvatar.jsx` - 粒子头像效果
- `Effect*.js` - 各种背景效果

**命名规范**: 
- 效果组件: `Effect` + 功能名称
- 管理组件: 功能名称 + `Canvas` 或 `Manager`

## 📊 其他文件夹规范

### 💾 `data/`
**用途**: 静态数据文件
**包含**: 配置文件、常量定义、Base64数据等
**格式**: `.js`, `.json`, `.ts`
**示例**: `hua_icon_base64.js`, `config.js`, `constants.js`

### 🔧 `utils/`
**用途**: 工具函数和调试工具
**包含**: 纯函数、工具类、调试组件
**特点**: 无副作用、可复用、独立功能
**示例**: `texturePreloader.js`, `MemoryMonitor.jsx`, `performance.js`

### 🪝 `hooks/`
**用途**: 自定义React Hooks
**命名规范**: `use` + 功能名称
**示例**: `useImagePreloader.js`, `usePerformanceMonitor.js`

### 🏪 `store/`
**用途**: 状态管理
**包含**: Zustand stores, 全局状态定义
**示例**: `useAppStore.js`, `galleryData.js`

## 📝 命名规范

### 文件命名
- **组件文件**: PascalCase `.jsx`
- **工具文件**: camelCase `.js`
- **Hook文件**: camelCase, `use` 前缀 `.js`
- **样式文件**: camelCase `.css`
- **数据文件**: camelCase 或 snake_case `.js`

### 导入规范
```jsx
// ✅ 推荐: 按分类分组导入
import React, { useState, useEffect } from 'react';

import ErrorBoundary from '../ui/ErrorBoundary';
import LoadingSpinner from '../ui/LoadingSpinner';

import { useAppStore } from '../../store/useAppStore';
import { texturePreloader } from '../../utils/texturePreloader';

// ❌ 避免: 混乱的导入顺序
import { useAppStore } from '../../store/useAppStore';
import React, { useState } from 'react';
import ErrorBoundary from '../ui/ErrorBoundary';
```

### 相对路径规范
- 同级文件: `./filename`
- 上级文件夹: `../foldername/filename`
- 跨多级: 建议使用绝对路径或路径别名

## 🔄 文件移动规范

### 移动文件时必须做的事情:
1. ✅ **更新所有导入路径**
2. ✅ **检查编译错误**
3. ✅ **测试功能是否正常**
4. ✅ **更新相关文档**

### 新增文件时的规范:
1. 📁 **选择正确的文件夹**
2. 📝 **使用规范的命名**
3. 📤 **正确设置导出**
4. 📚 **添加必要的注释**

## 📚 注释规范

### 组件注释
```jsx
/**
 * GlobalLoadingIndicator - 全局资源加载指示器组件
 * 统一的加载样式，支持多种变体和位置
 * 
 * @param {boolean} isVisible - 是否显示
 * @param {number} loadedCount - 已加载数量
 * @param {number} totalCount - 总数量
 * @param {string} variant - 显示变体 ('default'|'minimal'|'corner')
 */
const GlobalLoadingIndicator = ({ isVisible, loadedCount, totalCount, variant }) => {
    // 组件实现
};
```

### 工具函数注释
```javascript
/**
 * 纹理预加载器 - 专门用于THREE.js纹理的预加载
 * 解决首页Cube刚出现时的卡顿问题
 * 
 * @param {string} url - 纹理URL
 * @param {Object} options - 纹理设置选项
 * @returns {Promise<THREE.Texture>}
 */
async function preloadTexture(url, options = {}) {
    // 函数实现
}
```

## 🚀 最佳实践

### Do's ✅
- 按功能分组文件
- 使用描述性的文件名
- 保持导入路径的一致性
- 定期清理未使用的文件
- 为复杂组件添加注释

### Don'ts ❌
- 不要按文件类型分组 (如: components/, utils/, styles/ 混在一起)
- 不要使用过于简短的文件名
- 不要留下未使用的导入
- 不要在UI组件中包含业务逻辑
- 不要忘记更新导入路径

---

**更新日期**: 2024年8月
**维护者**: 开发团队

此规范会根据项目发展不断完善，请在修改代码结构时参考此文档。
