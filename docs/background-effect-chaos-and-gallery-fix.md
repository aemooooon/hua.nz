# Background Effect Refactoring and Gallery Fix

## 目标

1. 将首页背景效果从"background"重命名为"chaos"以避免混淆
2. 修复gallery背景粒子不旋转的问题

## 实施的更改

### 1. 创建新的EffectChaos背景效果

**文件**: `src/components/background/EffectChaos.js`

- 基于EffectGalaxy创建了全新的混乱粒子效果
- 特点：
  - 更多粒子数量 (5000个)
  - 更多分支 (5个) 增加混乱感
  - 更大的显示范围 (半径12)
  - 红青色渐变配色方案
  - 更复杂的混乱运动算法
  - 每个粒子有独立的混乱相位和速度
  - 整体旋转和波动效果

### 2. 更新BackgroundCanvas支持

**文件**: `src/components/background/BackgroundCanvas.jsx`

- 导入新的EffectChaos类
- 在switch语句中添加'effectchaos'案例
- 配置了chaos效果的参数

### 3. 更新首页配置

**文件**: `src/store/useAppStore.js`

- 将首页(home)的backgroundEffect从"effectgalaxy"改为"effectchaos"
- 现在首页使用混乱效果，与其他页面的背景效果区分开来

### 4. 修复Gallery粒子旋转问题

**文件**: `src/components/background/EffectGalaxy.js`

- **问题**：animate方法中位置更新被限制为每4帧执行一次，导致旋转不平滑
- **解决方案**：
  - 移除帧率限制，每帧都更新粒子位置
  - 稍微提高动画速度 (从0.005改为0.008)
  - 确保gallery背景粒子能够平滑旋转

## 技术细节

### EffectChaos算法特点

1. **多层混乱运动**：
   ```javascript
   // 基础螺旋 + 正弦波扰动
   const chaosX = Math.sin(this.time * data.chaosSpeed + data.chaosPhase) * this.chaosIntensity;
   const chaosY = Math.cos(this.time * data.chaosSpeed * 1.3 + data.chaosPhase) * this.chaosIntensity * 0.3;
   const chaosZ = Math.sin(this.time * data.chaosSpeed * 0.7 + data.chaosPhase) * this.chaosIntensity;
   ```

2. **动态颜色系统**：
   - 内圈：红色 (#ff6b6b)
   - 外圈：青色 (#4ecdc4)
   - 随机颜色分布增加视觉复杂度

3. **自适应性能**：
   - 使用低功耗WebGL设置
   - 限制像素比避免高DPI设备性能问题
   - 中等精度着色器

### Galaxy旋转修复

- **原因**：性能优化过度，导致视觉效果受损
- **平衡**：保持合理性能的同时确保视觉连贯性
- **结果**：gallery背景粒子现在平滑旋转

## 测试建议

1. **首页效果**：确认显示chaos混乱粒子效果而非galaxy
2. **Gallery旋转**：确认gallery背景粒子平滑旋转
3. **性能**：确认新效果不会显著影响页面性能
4. **视觉一致性**：确认各页面背景效果协调统一

## 文件结构

```
src/components/background/
├── BackgroundCanvas.jsx (已更新)
├── EffectChaos.js (新增)
├── EffectGalaxy.js (已修复)
├── EffectFuse.js
├── EffectHeartBeats.js
├── EffectLorenzAttractor.js
├── EffectMonjori.js
└── EffectPixelDistortion.jsx

src/store/
└── useAppStore.js (首页配置已更新)
```

这次重构成功地将首页背景重命名为更具描述性的"chaos"效果，同时修复了gallery背景粒子的旋转问题，提升了整体用户体验。
