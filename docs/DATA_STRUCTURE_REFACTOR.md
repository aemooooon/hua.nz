# 数据结构重构总结

## 重构概述

本次重构的目标是统一命名规范，将hardcoded的数据配置分离到独立文件中，并创建了标准化的数据管理体系。

## 重构内容

### 1. 文件重命名和数据分离

#### 命名统一标准
- **旧命名**: 混合使用 `Config` 和 `Data` 后缀
- **新命名**: 统一使用 `Data` 后缀来表示数据文件

#### 文件变更

| 旧文件名 | 新文件名 | 导出变量名 | 用途 |
|---------|---------|-----------|-----|
| `config.js` | `sections.js` | `sectionsData` | 栏目结构配置 |
| `content.js` | `content.js` | `contentData` | 国际化文本内容 |
| `projects.js` | `projects.js` | `projectsData` | 项目数据 |
| `locations.js` | `footprints.js` | `footprintsData` | 足迹数据 |
| ❌ 无 | `gallery.js` | `galleryData` | 3D画廊数据 |

### 2. 新建文件

#### `src/store/gallery.js`
- **目的**: 专门存储3D画廊的展示内容
- **内容**: 22张图片（1张灯箱 + 5张竖向墙 + 16张横向墙）
- **数据结构**: 
  ```javascript
  {
    id: string,
    type: 'image' | 'video',
    src: string,
    thumbnail: string,
    title: { en: string, zh: string },
    description: { en: string, zh: string },
    orientation: 'vertical' | 'horizontal',
    position: 'lightbox' | 'wall',
    wall: string,
    // ... 其他配置
  }
  ```

### 3. Store层面的变更

#### `src/store/useAppStore.js`
- **导入更新**: 统一从 `index.js` 导入所有数据
- **方法重命名**:
  - `getSectionsConfig()` → `getSectionsData()`
  - `getCurrentSectionConfig()` → `getCurrentSectionData()`
- **状态添加**: 
  - `projects: projectsData`
  - `locations: locationsData`
  - `gallery: galleryData`

#### `src/store/index.js`
- **统一导出**: 作为barrel文件统一导出所有数据配置
- **新增导出**: `galleryData`

### 4. 组件层面的更新

#### `src/components/sections/home/HeroCube.jsx`
- 更新方法调用: `getSectionsConfig()` → `getSectionsData()`
- 更新变量名: `sectionsConfig` → `sectionsData`

#### `src/components/features/SmartScrollManager.jsx`
- 更新方法调用: `getCurrentSectionConfig()` → `getCurrentSectionData()`
- 批量替换变量名: `currentSectionConfig` → `currentSectionData`

### 5. 数据迁移

从 `useAppStore.js` 中提取的硬编码gallery数据已完全迁移到 `gallery.js` 文件中，包括：
- 灯箱展示位置（1张特殊展示图片）
- 竖向墙展示（5张竖版图片，包含1个视频）
- 横向墙展示（16张横版图片，分上下两层）

## 数据架构设计

### 分类标准

1. **静态配置数据** (`sectionsData`)
   - 不需要国际化的配置项
   - 栏目结构、背景效果、立方体配置等

2. **国际化内容数据** (`contentData`)
   - 需要多语言支持的文本内容
   - UI标签、描述、提示信息等

3. **业务数据**
   - `projectsData`: 项目作品数据（含国际化）
   - `footprintsData`: 足迹数据（我的人生轨迹和地理位置）
   - `galleryData`: 3D画廊展示数据（含国际化）

### 命名约定

- **文件名**: 使用复数形式 + `.js` 后缀
- **导出变量**: 使用驼峰命名 + `Data` 后缀
- **方法名**: 保持get + 复数名称 + Data格式

## 效果与优势

### 1. 代码组织
- ✅ 数据与逻辑分离，提高可维护性
- ✅ 统一命名规范，减少混淆
- ✅ 模块化结构，便于扩展

### 2. 开发体验
- ✅ 数据修改无需深入业务逻辑
- ✅ 国际化内容集中管理
- ✅ 类型安全和IDE智能提示

### 3. 性能优化
- ✅ 按需导入，减少bundle大小
- ✅ 数据预处理，运行时计算减少
- ✅ 缓存友好的模块化结构

## 验证结果

- ✅ 编译无错误
- ✅ 开发服务器正常运行
- ✅ 数据结构保持完整性
- ✅ 组件功能正常
- ✅ 国际化功能正常

## 后续建议

1. **类型定义**: 考虑添加TypeScript类型定义文件
2. **数据验证**: 添加runtime数据验证逻辑
3. **自动化**: 创建数据格式检查的CI流程
4. **文档**: 为每个数据文件添加详细的数据结构说明

---

*重构完成日期: 2025年1月*
*重构人员: GitHub Copilot*
