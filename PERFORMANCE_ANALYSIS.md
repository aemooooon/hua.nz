# 性能分析报告与优化方案

## 🔍 当前性能问题分析

### 内存使用情况 (250MB+)
1. **3D着色器效果**: 多个复杂的WebGL着色器同时运行
2. **粒子系统**: 大量Float32Array数据结构
3. **纹理缓存**: 高分辨率图片和视频
4. **状态管理**: Zustand store保存大量数据
5. **动画库**: GSAP时间线和Three.js场景对象

### 主要性能瓶颈

#### 1. WebGL渲染瓶颈
- **EffectGalaxy.js**: 大量粒子渲染 (`particleCount * 3` Float32Array)
- **EffectLorenz.js**: 复杂数学计算的轨迹渲染
- **BackgroundCanvas.jsx**: 动态canvas尺寸导致重复渲染

#### 2. 内存分配问题
- 每次effect切换都会创建新的WebGL context
- Float32Array频繁分配但缺乏有效清理
- 图片和视频资源没有懒加载

#### 3. 渲染循环优化空间
- requestAnimationFrame回调过多
- 没有基于可见性的渲染暂停
- 缺乏帧率自适应机制

## 🚀 不降低质量的优化方案

### 1. 内存池技术 (Memory Pooling)

#### 实现WebGL资源池
```javascript
// src/utils/WebGLResourcePool.js
class WebGLResourcePool {
  constructor() {
    this.bufferPool = new Map();
    this.texturePool = new Map();
    this.programPool = new Map();
  }

  getBuffer(size, type = 'ARRAY_BUFFER') {
    const key = `${size}_${type}`;
    if (!this.bufferPool.has(key)) {
      this.bufferPool.set(key, []);
    }
    const pool = this.bufferPool.get(key);
    return pool.pop() || this.createBuffer(size, type);
  }

  releaseBuffer(buffer, size, type = 'ARRAY_BUFFER') {
    const key = `${size}_${type}`;
    const pool = this.bufferPool.get(key) || [];
    if (pool.length < 10) { // 限制池大小
      pool.push(buffer);
    }
  }
}
```

#### Float32Array对象池
```javascript
// src/utils/ArrayPool.js
class Float32ArrayPool {
  constructor() {
    this.pools = new Map();
  }

  get(size) {
    if (!this.pools.has(size)) {
      this.pools.set(size, []);
    }
    const pool = this.pools.get(size);
    return pool.pop() || new Float32Array(size);
  }

  release(array) {
    const size = array.length;
    const pool = this.pools.get(size) || [];
    if (pool.length < 5) { // 限制每个大小的池容量
      array.fill(0); // 清空数据
      pool.push(array);
    }
  }
}
```

### 2. 智能渲染优化

#### 可见性驱动渲染
```javascript
// src/utils/VisibilityRenderer.js
class VisibilityRenderer {
  constructor() {
    this.isVisible = true;
    this.renderCallbacks = new Set();
    this.lastRenderTime = 0;
    this.targetFPS = 60;
    this.adaptiveFPS = 60;
    
    this.setupVisibilityDetection();
    this.setupPerformanceMonitoring();
  }

  setupVisibilityDetection() {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (this.isVisible) {
        this.resumeRendering();
      } else {
        this.pauseRendering();
      }
    });
  }

  setupPerformanceMonitoring() {
    let frameCount = 0;
    let lastCheck = performance.now();
    
    const checkPerformance = () => {
      frameCount++;
      const now = performance.now();
      
      if (now - lastCheck > 1000) {
        const currentFPS = (frameCount * 1000) / (now - lastCheck);
        this.adaptiveFPS = Math.max(30, Math.min(60, currentFPS * 0.9));
        frameCount = 0;
        lastCheck = now;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    checkPerformance();
  }

  addRenderCallback(callback) {
    this.renderCallbacks.add(callback);
  }

  removeRenderCallback(callback) {
    this.renderCallbacks.delete(callback);
  }

  startRenderLoop() {
    const render = (currentTime) => {
      if (!this.isVisible) {
        requestAnimationFrame(render);
        return;
      }

      const deltaTime = currentTime - this.lastRenderTime;
      const frameTime = 1000 / this.adaptiveFPS;

      if (deltaTime >= frameTime) {
        this.renderCallbacks.forEach(callback => {
          try {
            callback(deltaTime, currentTime);
          } catch (error) {
            console.warn('Render callback error:', error);
          }
        });
        this.lastRenderTime = currentTime;
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }
}
```

### 3. 资源管理优化

#### 智能资源加载器
```javascript
// src/utils/SmartResourceLoader.js
class SmartResourceLoader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
    this.maxCacheSize = 50 * 1024 * 1024; // 50MB
    this.currentCacheSize = 0;
  }

  async loadImage(src, priority = 0) {
    if (this.cache.has(src)) {
      return this.cache.get(src);
    }

    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    const promise = this.createImageLoadPromise(src);
    this.loadingPromises.set(src, promise);

    try {
      const result = await promise;
      this.loadingPromises.delete(src);
      this.addToCache(src, result);
      return result;
    } catch (error) {
      this.loadingPromises.delete(src);
      throw error;
    }
  }

  createImageLoadPromise(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // 创建离屏canvas进行预处理
        const canvas = new OffscreenCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        resolve({
          element: img,
          canvas: canvas,
          width: img.width,
          height: img.height,
          size: img.width * img.height * 4 // 估算大小
        });
      };
      
      img.onerror = reject;
      img.src = src;
    });
  }

  addToCache(key, resource) {
    // 检查缓存大小限制
    while (this.currentCacheSize + resource.size > this.maxCacheSize && this.cache.size > 0) {
      const firstKey = this.cache.keys().next().value;
      const firstResource = this.cache.get(firstKey);
      this.currentCacheSize -= firstResource.size;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, resource);
    this.currentCacheSize += resource.size;
  }
}
```

### 4. 状态管理优化

#### 优化Zustand Store
```javascript
// src/store/useOptimizedAppStore.js
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useOptimizedAppStore = create(
  subscribeWithSelector((set, get) => ({
    // 基础状态
    currentSection: 0,
    isTransitioning: false,
    
    // 性能相关状态
    performanceMode: 'auto',
    renderQuality: 'high',
    
    // 选择性更新函数
    updateSection: (sectionIndex) => {
      set((state) => {
        if (state.currentSection === sectionIndex) return state;
        return { 
          currentSection: sectionIndex,
          isTransitioning: true 
        };
      });
    },

    // 批量更新
    batchUpdate: (updates) => {
      set((state) => ({ ...state, ...updates }));
    },

    // 性能模式切换
    setPerformanceMode: (mode) => {
      set({ performanceMode: mode });
    }
  }))
);

// 选择器优化
export const selectCurrentSection = (state) => state.currentSection;
export const selectPerformanceMode = (state) => state.performanceMode;
export const selectIsTransitioning = (state) => state.isTransitioning;
```

### 5. WebGL着色器优化

#### 着色器预编译
```javascript
// src/utils/ShaderManager.js
class ShaderManager {
  constructor() {
    this.compiledShaders = new Map();
    this.programs = new Map();
  }

  precompileShaders(gl, shaderDefinitions) {
    const promises = shaderDefinitions.map(async (def) => {
      const vertexShader = this.compileShader(gl, def.vertex, gl.VERTEX_SHADER);
      const fragmentShader = this.compileShader(gl, def.fragment, gl.FRAGMENT_SHADER);
      
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error('Shader program link failed: ' + gl.getProgramInfoLog(program));
      }

      this.programs.set(def.name, {
        program,
        uniforms: this.getUniformLocations(gl, program, def.uniforms),
        attributes: this.getAttributeLocations(gl, program, def.attributes)
      });
    });

    return Promise.all(promises);
  }

  compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Shader compilation failed: ' + error);
    }

    return shader;
  }

  getProgram(name) {
    return this.programs.get(name);
  }
}
```

### 6. 动画性能优化

#### GSAP时间线管理
```javascript
// src/utils/AnimationManager.js
class AnimationManager {
  constructor() {
    this.timelines = new Map();
    this.activeAnimations = new Set();
    this.pausedAnimations = new Set();
  }

  createTimeline(id, config = {}) {
    if (this.timelines.has(id)) {
      this.timelines.get(id).kill();
    }

    const timeline = gsap.timeline({
      ...config,
      onComplete: () => {
        this.activeAnimations.delete(id);
        config.onComplete?.();
      },
      onStart: () => {
        this.activeAnimations.add(id);
        config.onStart?.();
      }
    });

    this.timelines.set(id, timeline);
    return timeline;
  }

  pauseAll() {
    this.activeAnimations.forEach(id => {
      const timeline = this.timelines.get(id);
      if (timeline && timeline.isActive()) {
        timeline.pause();
        this.pausedAnimations.add(id);
      }
    });
  }

  resumeAll() {
    this.pausedAnimations.forEach(id => {
      const timeline = this.timelines.get(id);
      if (timeline) {
        timeline.resume();
      }
    });
    this.pausedAnimations.clear();
  }

  cleanup() {
    this.timelines.forEach(timeline => timeline.kill());
    this.timelines.clear();
    this.activeAnimations.clear();
    this.pausedAnimations.clear();
  }
}
```

## 📊 预期优化效果

### 内存使用优化
- **内存池技术**: 减少40-60%的Float32Array分配
- **资源缓存**: 智能LRU缓存减少重复加载
- **预期内存占用**: 150-180MB (降低30-40%)

### 渲染性能提升
- **自适应帧率**: 根据设备性能调整渲染频率
- **可见性检测**: 后台时停止渲染，节省CPU
- **着色器预编译**: 减少运行时编译开销

### 用户体验改善
- **更流畅的动画**: 稳定60FPS或自适应帧率
- **更快的页面切换**: 资源预加载和缓存
- **更好的响应性**: 优化事件处理和状态更新

## 🔧 实施计划

### 第一阶段 (立即实施)
1. 实施VisibilityRenderer可见性渲染
2. 添加Float32ArrayPool内存池
3. 优化Zustand store选择器

### 第二阶段 (中期优化)
1. 实施SmartResourceLoader
2. 添加ShaderManager预编译
3. 优化BackgroundCanvas渲染逻辑

### 第三阶段 (深度优化)
1. 实施完整的WebGL资源池
2. 添加性能监控仪表板
3. 实施自适应质量系统

这些优化方案可以在保持现有3D效果和视觉质量的前提下，显著降低内存使用和提升性能表现。
