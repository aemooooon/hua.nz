# Gallery 3D 聚光灯照明系统

## 改进概述

本次更新实现了戏剧性的照明改进，从复杂的环境光照系统转换为聚焦的聚光灯系统，营造更专业的展示效果。

## 照明系统重构

### 1. 移除的照明元素
- ❌ HDR天空盒子背景
- ❌ 强环境光 (AmbientLight)
- ❌ 方向光 (DirectionalLight)

### 2. 新增的照明系统

#### 主聚光灯 (Primary SpotLight)
```javascript
const spotLight = new THREE.SpotLight(0xffffff, 30);
spotLight.position.set(0, 6, 4);
spotLight.angle = Math.PI / 4;     // 45度照射角
spotLight.penumbra = 0.3;          // 柔和边缘
spotLight.decay = 1.5;             // 自然衰减
spotLight.distance = 15;           // 照射距离
```

#### 辅助填充光 (Fill Light)
```javascript
const fillLight = new THREE.SpotLight(0xffffff, 8);
fillLight.position.set(-3, 4, -2);
fillLight.angle = Math.PI / 3;     // 60度照射角
fillLight.penumbra = 0.5;          // 更柔和的边缘
```

#### 基础半球光 (Hemisphere Light)
```javascript
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x404040, 0.2);
```

## 3. 动态照明效果

### 聚光灯轨道运动
```javascript
const time = performance.now() / 4000;
spotLight.position.x = Math.cos(time) * 5;
spotLight.position.z = Math.sin(time) * 5;
spotLight.position.y = 6 + Math.sin(time * 0.5) * 1; // 上下浮动
```

### 运动特性
- **水平环绕**：以球体为中心的圆形轨道
- **垂直浮动**：轻微的上下移动增加动态感
- **渐变照射**：创造移动的高光和阴影区域
- **周期性变化**：4秒完成一个完整周期

## 4. 材质优化

### 外层玻璃球体材质调整
```javascript
const sphereMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.0,
    roughness: 0.1,              // 增加粗糙度接受光照
    envMapIntensity: 0.6,        // 降低环境反射
    transmission: 0.8,           // 平衡透射率
    opacity: 0.9,               // 适中不透明度
    reflectivity: 0.3           // 增强反射性
});
```

### 内层纹理球体材质
```javascript
const innerSphereMaterial = new THREE.MeshLambertMaterial({
    map: compositeTexture,
    transparent: true,
    opacity: 0.7,
    side: THREE.FrontSide
});
```

## 5. 视觉效果

### 实现的戏剧效果
1. **聚焦照明**：强调当前被照亮的区域
2. **动态高光**：随聚光灯移动的反射亮点
3. **渐变阴影**：未被直接照射区域的柔和阴影
4. **纹理突出**：聚光灯照射下的图片更加清晰
5. **玻璃质感**：在定向光源下的真实玻璃效果

### 与原版对比
- **原版**：均匀的环境光 + HDR背景
- **新版**：聚焦的聚光灯 + 黑色背景
- **视觉提升**：从平面展示到戏剧性舞台效果

## 6. 阴影系统

### 阴影配置
```javascript
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 2048;
spotLight.shadow.mapSize.height = 2048;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 15;
spotLight.shadow.focus = 0.8;
```

### 阴影特性
- **高质量阴影**：2048x2048 阴影贴图
- **柔和边缘**：PCFSoftShadowMap 类型
- **精确投射**：聚焦的阴影范围
- **性能平衡**：合理的阴影距离设置

## 7. 环境设置

### 背景设置
```javascript
scene.background = new THREE.Color(0x000000); // 纯黑背景
scene.environment = hdrTexture; // 保留环境反射
```

### 设计理念
- **戏剧对比**：黑色背景突出被照亮的对象
- **专业展示**：类似博物馆或画廊的展示效果
- **视觉聚焦**：引导观众注意力到核心内容

## 8. 性能考虑

### 优化措施
- **减少光源数量**：从多个光源简化为关键照明
- **合理阴影范围**：限制阴影计算范围
- **适中更新频率**：平衡动画流畅度和性能
- **保留环境反射**：维持材质质感的同时优化性能

## 9. 用户体验

### 视觉吸引力
- **动态变化**：持续变化的光影效果保持新鲜感
- **层次丰富**：明暗对比创造立体层次
- **细节突出**：聚光灯强调纹理细节
- **氛围营造**：专业的展示氛围

### 交互体验
- **直观理解**：清晰的光影变化易于理解
- **视觉引导**：光线引导用户关注点
- **沉浸感强**：戏剧性效果增强沉浸体验

## 技术亮点

1. **专业照明设计**：参考真实展示空间的照明方案
2. **动态光影系统**：程序化控制的光源运动
3. **材质光照交互**：优化材质参数适配新照明
4. **性能与效果平衡**：在视觉质量和渲染性能间找到最佳点
5. **渐进式增强**：保持核心功能同时提升视觉效果

## 未来扩展

1. **交互控制**：用户可控制聚光灯位置和强度
2. **多光源模式**：不同的照明预设方案
3. **色彩变化**：聚光灯颜色的动态变化
4. **音响联动**：根据音频节拍调整光线
5. **季节主题**：不同时期的主题照明效果

---

*文档更新时间：2025-08-05*
*涉及文件：/src/components/sections/about/Gallery.jsx*
*参考示例：three.js webgl_lights_spotlight*
