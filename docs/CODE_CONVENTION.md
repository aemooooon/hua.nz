# 📋 代码规范 (Code Convention)

## 🏗️ 项目概述

这是一个现代化的React + Three.js个人作品集网站，采用以下技术栈：

- **React 18** - 用户界面框架
- **Three.js** - 3D图形渲染
- **Vite** - 构建工具
- **Zustand** - 状态管理
- **Tailwind CSS** - 样式框架
- **GSAP** - 动画库

### 🎯 项目特性

- 3D交互式背景效果
- 响应式设计
- 多语言支持 (中文/英文)
- 主题切换 (明亮/暗黑)
- 智能滚动管理
- 性能监控和优化
- Web Workers 支持

## 📁 文件结构规范

### 🎯 整体架构原则
- **按功能分组**，而非按文件类型分组
- **单一职责**：每个文件夹有明确的用途
- **易于维护**：相关功能聚集在一起
- **符合React最佳实践**

### 📂 完整文件夹结构

```text
src/
├── components/          # React组件
│   ├── ui/             # 通用UI组件 (ErrorBoundary, GlobalLoadingIndicator, ThemeLanguageToggle)
│   ├── features/       # 特殊功能组件 (SmartDirectionalCursor, SmartScrollManager)
│   ├── sections/       # 页面区块组件 (home/, about/, gallery/, project/, education/, contact/)
│   ├── background/     # 背景效果组件 (BackgroundCanvas, EffectAvatar)
│   └── performancepanel/ # 性能监控面板组件 (DeveloperPanel)
├── data/               # 静态数据文件 (hua_icon_base64.js, 配置文件)
├── hooks/              # 自定义React Hooks (useImagePreloader, useDeveloperPanel)
├── store/              # 状态管理 (useAppStore, galleryData, locations)
├── utils/              # 工具函数和调试工具 (WebGLResourceManager, performance, PerformanceOptimizer)
├── styles/             # 样式文件 (index.css, OpeningAnimations.css, SmartScroll.css)
├── workers/            # Web Workers (particleWorker.js)
└── assets/             # 静态资源 (images/, fonts/)

docs/                   # 📚 项目文档
├── CODE_CONVENTION.md  # 代码规范 (本文件)
└── ...                 # 其他项目文档

public/                 # 静态资源
├── *.jpg, *.png        # 图片资源
├── favicon.ico         # 网站图标
├── particleWorker.js   # Public Worker 文件
└── ...                 # 其他静态文件
```

## 📚 文档管理规范

### 📍 文档存储位置

- **所有项目文档必须存储在 `docs/` 文件夹下**
- `README.md` 保留在项目根目录作为主入口文档
- 技术文档、API文档、设计文档等都应放在 `docs/` 下

### 📝 文档类型和命名

- `CODE_CONVENTION.md` - 代码规范文档
- `API_REFERENCE.md` - API参考文档
- `DEPLOYMENT.md` - 部署说明文档
- `CHANGELOG.md` - 更新日志
- `TROUBLESHOOTING.md` - 问题排查指南

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

### 🛠️ `components/performancepanel/`
**用途**: 性能监控面板组件
**特点**:
- 仅在开发模式下可用
- 用于调试和性能监控
- 不会打包到生产版本中

**包含文件**:
- `DeveloperPanel.jsx` - 统一性能监控面板

**功能说明**:
- **内存监控**: JS堆内存使用情况、内存限制等
- **WebGL监控**: WebGL资源状态、上下文状态等  
- **性能监控**: FPS、性能模式、加载时间等
- **系统信息**: CPU核心数、设备内存、网络类型等

**使用方式**:
- 按 `Ctrl+M` (Windows) 或 `Cmd+M` (Mac) 切换显示
- 按 `Escape` 键关闭面板
- 支持面板折叠/展开
- 支持多标签页切换

**命名规范**: 功能名称 + `Panel` 后缀
**示例**: `DebugPanel.jsx`, `PerformancePanel.jsx`

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

## 📚 文档管理规范

### 📍 文档存储位置
- **所有项目文档必须存储在 `docs/` 文件夹下**
- `README.md` 保留在项目根目录作为主入口文档
- 技术文档、API文档、设计文档等都应放在 `docs/` 下

### 📝 文档类型和命名
- `CODE_CONVENTION.md` - 代码规范文档
- `API_REFERENCE.md` - API参考文档
- `DEPLOYMENT.md` - 部署说明文档
- `CHANGELOG.md` - 更新日志
- `TROUBLESHOOTING.md` - 问题排查指南

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
