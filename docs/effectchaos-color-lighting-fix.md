# EffectChaos 颜色和光照修复

## 问题描述
在参考早期EffectGalaxy代码增强EffectChaos时，遗漏了重要的：
1. **颜色配置**：紫色材质颜色未正确应用
2. **光照系统**：重要的灯光和光照配置丢失

## 修复内容

### 1. 颜色配置修复
```javascript
// 修复前（错误的颜色）
this.colorInside = new THREE.Color('#ffffff'); // 简单的白色
this.colorOutside = new THREE.Color('#cccccc'); // 简单的灰色

// 修复后（EffectGalaxy的正确颜色）
this.colorInside = new THREE.Color('#ffa575'); // EffectGalaxy的橙色
this.colorOutside = new THREE.Color('#311599'); // EffectGalaxy的紫色
```

### 2. 光照系统修复
```javascript
// 修复后 - 完全参考EffectGalaxy的光照配置
this.centralLight = new THREE.PointLight(new THREE.Color('#ffffff'), 1.5, 30);
this.centralLight.position.set(0, -1, 0);
this.scene.add(this.centralLight);

// EffectGalaxy的橙色光源
const orangeLight = new THREE.PointLight(this.colorInside, 1.0, 25);
orangeLight.position.set(0, -1, 0);
this.scene.add(orangeLight);

// EffectGalaxy的环境光配置
this.ambientLight = new THREE.AmbientLight(0x404040, 0.2);
this.scene.add(this.ambientLight);
```

### 3. 粒子分布算法修复
```javascript
// 完全参考EffectGalaxy的粒子分布算法
const radiusRatio = Math.random();
const radius = Math.pow(radiusRatio, 1.5) * this.radius;

// EffectGalaxy的连续分布算法 - 关键修正
const branchRatio = Math.random(); // 0到1的连续值
const branchAngle = branchRatio * Math.PI * 2; // 完整的圆周分布

// EffectGalaxy的随机偏移算法
const randomX = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.2;
const randomY = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.05;
const randomZ = Math.pow(Math.random() * 2 - 1, 3) * radiusRatio * 0.2;
```

### 4. 颜色混合算法修复
```javascript
// EffectGalaxy的颜色混合算法
const colorRatio = Math.pow(1 - radiusRatio, 2);
const mixedColor = this.colorInside.clone();
mixedColor.lerp(this.colorOutside, 1 - colorRatio);
```

### 5. 材质配置修复
```javascript
// 完全参考EffectGalaxy的设置
const material = new THREE.PointsMaterial({
    size: this.size * 1.5, // EffectGalaxy的尺寸补偿
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    opacity: 0.6, // EffectGalaxy的透明度设置
    map: texture,
    alphaTest: 0.1 // EffectGalaxy的alpha测试设置
});
```

### 6. 位置更新算法修复
```javascript
// EffectGalaxy的基础位置算法 - 下半部分显示
const x = Math.cos(angle) * particle.radius;
const z = Math.sin(angle) * particle.radius;
const y = -Math.abs(particle.radius * 0.3); // EffectGalaxy的Y轴偏移

// EffectGalaxy的随机偏移应用
this.positions[i3] = x + particle.randomX;
this.positions[i3 + 1] = y + particle.randomY - 2; // EffectGalaxy的整体下移
this.positions[i3 + 2] = z + particle.randomZ;
```

## 预期效果
修复后的EffectChaos现在应该具有：
- ✅ **橙色到紫色的渐变**：从中心的橙色 `#ffa575` 渐变到外围的紫色 `#311599`
- ✅ **完整的光照系统**：中央白光 + 橙色光源 + 环境光
- ✅ **EffectGalaxy的视觉质量**：相同的粒子分布、颜色混合和动画效果
- ✅ **下半圆效果**：粒子主要显示在视窗下半部分，形成半圆效果

## 技术要点
1. 使用 `Math.pow()` 函数创建非线性的径向分布和颜色混合
2. 连续的圆周分布而非离散的分支
3. 三次方随机偏移创建自然的粒子散布
4. 多层光照系统增强视觉深度
5. Alpha测试和适当的透明度优化性能
