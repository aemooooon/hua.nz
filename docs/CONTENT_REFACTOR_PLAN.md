# Content 数据结构重构计划

## 问题分析

### 1. 结构不一致
- `content.js`: 采用 `en/zh` 顶层分离的结构
- `projects.js` & `gallery.js`: 采用每字段包含 `{en, zh}` 的结构

### 2. 数据职责混合
- `education` 包含详细学术数据（课程、成绩等）应该独立
- `ui` 部分包含界面文本，应该保留
- 内容数据与结构数据混合

### 3. 扩展性问题
- 当前 `en/zh` 顶层分离不利于添加新语言
- 文件过大，维护困难

## 重构方案

### Phase 1: 创建新的数据结构文件

1. **创建 `education.js`** - 独立的教育数据
2. **重构 `content.js`** - 标准化为字段级多语言结构
3. **创建数据验证和迁移脚本**

### Phase 2: 更新数据使用方式

1. **更新 `useAppStore.js`** - 新的数据访问方法
2. **更新所有引用** - 逐个文件更新
3. **测试验证** - 确保功能正常

### Phase 3: 清理和优化

1. **删除旧的数据结构**
2. **优化性能**
3. **文档更新**

## 详细实施步骤

### Step 1: 分析数据引用
- 查找所有使用 `contentData` 的文件
- 分析每个使用场景
- 制定兼容性策略

### Step 2: 创建新的 education.js
```javascript
export const educationData = {
  labels: {
    academicRecords: { en: "Academic Records", zh: "学术记录" },
    // ... 其他字段
  },
  degrees: [
    {
      id: 'masters',
      degree: { en: "Master of Applied Data Science", zh: "应用数据科学硕士" },
      // ... 其他字段
    }
  ]
}
```

### Step 3: 重构 content.js
将现有的 `en/zh` 顶层结构转换为字段级结构：

```javascript
// 从这个结构：
{
  en: { home: { title: "Full Stack Developer" } },
  zh: { home: { title: "全栈工程师" } }
}

// 转换为：
{
  home: { 
    title: { en: "Full Stack Developer", zh: "全栈工程师" } 
  }
}
```

### Step 4: 更新访问方法
在 `useAppStore.js` 中创建新的访问方法，保持向后兼容。

## 风险评估

### 高风险区域
1. **多处引用** - content 数据被多个组件使用
2. **类型依赖** - TypeScript 类型定义需要更新
3. **运行时错误** - 数据结构变化可能导致未捕获的错误

### 缓解策略
1. **渐进式迁移** - 保持旧接口，逐步迁移
2. **全面测试** - 每个步骤后进行功能测试
3. **回滚计划** - 保留备份文件

## 预期收益

1. **一致性** - 所有数据文件采用相同的多语言结构
2. **可维护性** - 数据分离，职责单一
3. **扩展性** - 易于添加新语言
4. **性能** - 减少不必要的数据加载
