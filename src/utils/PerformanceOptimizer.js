// 可见性驱动渲染管理器
class VisibilityRenderer {
  constructor() {
    this.isVisible = true;
    this.renderCallbacks = new Set();
    this.lastRenderTime = 0;
    this.targetFPS = 60;
    this.adaptiveFPS = 60;
    this.frameCount = 0;
    this.lastCheck = performance.now();
    
    this.setupVisibilityDetection();
    this.setupPerformanceMonitoring();
    this.startRenderLoop();
  }

  setupVisibilityDetection() {
    // 页面可见性检测
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (this.isVisible) {
        console.log('🎬 恢复渲染');
      } else {
        console.log('⏸️ 暂停渲染 - 节省资源');
      }
    });

    // 窗口焦点检测
    window.addEventListener('blur', () => {
      this.isVisible = false;
    });

    window.addEventListener('focus', () => {
      this.isVisible = true;
    });
  }

  setupPerformanceMonitoring() {
    const checkPerformance = () => {
      this.frameCount++;
      const now = performance.now();
      
      if (now - this.lastCheck > 1000) {
        const currentFPS = (this.frameCount * 1000) / (now - this.lastCheck);
        // 自适应帧率：如果性能不足，降低目标帧率
        this.adaptiveFPS = Math.max(30, Math.min(60, currentFPS * 0.85));
        
        // 内存监控
        if (performance.memory) {
          const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
          if (memoryMB > 200) {
            console.warn(`⚠️ 内存使用较高: ${memoryMB}MB`);
          }
        }
        
        this.frameCount = 0;
        this.lastCheck = now;
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    checkPerformance();
  }

  addRenderCallback(callback, priority = 0) {
    this.renderCallbacks.add({ callback, priority });
  }

  removeRenderCallback(callback) {
    for (const item of this.renderCallbacks) {
      if (item.callback === callback) {
        this.renderCallbacks.delete(item);
        break;
      }
    }
  }

  startRenderLoop() {
    const render = (currentTime) => {
      // 如果页面不可见，降低渲染频率
      if (!this.isVisible) {
        // 每秒只渲染一次以保持最小活动
        setTimeout(() => requestAnimationFrame(render), 1000);
        return;
      }

      const deltaTime = currentTime - this.lastRenderTime;
      const frameTime = 1000 / this.adaptiveFPS;

      if (deltaTime >= frameTime) {
        // 按优先级排序执行渲染回调
        const sortedCallbacks = Array.from(this.renderCallbacks)
          .sort((a, b) => b.priority - a.priority);

        sortedCallbacks.forEach(({ callback }) => {
          try {
            callback(deltaTime, currentTime);
          } catch (error) {
            console.warn('🚨 渲染回调错误:', error);
          }
        });
        
        this.lastRenderTime = currentTime;
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }

  // 获取当前性能状态
  getPerformanceStatus() {
    return {
      isVisible: this.isVisible,
      currentFPS: this.adaptiveFPS,
      callbackCount: this.renderCallbacks.size
    };
  }
}

// Float32Array内存池
class Float32ArrayPool {
  constructor() {
    this.pools = new Map();
    this.maxPoolSize = 5; // 每个大小最多缓存5个数组
    this.totalArrays = 0;
    this.maxTotalArrays = 50; // 总数限制
  }

  get(size) {
    if (!this.pools.has(size)) {
      this.pools.set(size, []);
    }
    
    const pool = this.pools.get(size);
    if (pool.length > 0) {
      const array = pool.pop();
      console.log(`♻️ 重用 Float32Array[${size}], 池中剩余: ${pool.length}`);
      return array;
    }
    
    // 检查总数限制
    if (this.totalArrays >= this.maxTotalArrays) {
      this.cleanup();
    }
    
    this.totalArrays++;
    console.log(`🆕 创建新 Float32Array[${size}], 总计: ${this.totalArrays}`);
    return new Float32Array(size);
  }

  release(array) {
    if (!array || !(array instanceof Float32Array)) {
      return;
    }
    
    const size = array.length;
    if (!this.pools.has(size)) {
      this.pools.set(size, []);
    }
    
    const pool = this.pools.get(size);
    if (pool.length < this.maxPoolSize) {
      // 清空数组数据
      array.fill(0);
      pool.push(array);
      console.log(`🔄 归还 Float32Array[${size}], 池中现有: ${pool.length}`);
    } else {
      // 池满了，直接丢弃
      this.totalArrays--;
      console.log(`🗑️ 丢弃 Float32Array[${size}], 池已满`);
    }
  }

  cleanup() {
    // 清理最大的池
    let maxSize = 0;
    let maxPool = null;
    
    for (const [, pool] of this.pools) {
      if (pool.length > maxSize) {
        maxSize = pool.length;
        maxPool = pool;
      }
    }
    
    if (maxPool) {
      const removed = maxPool.splice(0, Math.floor(maxSize / 2));
      this.totalArrays -= removed.length;
      console.log(`🧹 清理内存池，释放 ${removed.length} 个数组`);
    }
  }

  getStats() {
    const stats = {
      totalArrays: this.totalArrays,
      poolSizes: {}
    };
    
    for (const [size, pool] of this.pools) {
      stats.poolSizes[size] = pool.length;
    }
    
    return stats;
  }
}

// 创建全局实例
window.visibilityRenderer = new VisibilityRenderer();
window.float32ArrayPool = new Float32ArrayPool();

// 导出为ES模块
export const visibilityRenderer = window.visibilityRenderer;
export const float32ArrayPool = window.float32ArrayPool;

// 添加性能监控面板（开发环境）
if (import.meta.env && import.meta.env.DEV) {
  const createPerformancePanel = () => {
    const panel = document.createElement('div');
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      min-width: 200px;
    `;
    
    const updatePanel = () => {
      const perfStatus = visibilityRenderer.getPerformanceStatus();
      const poolStats = float32ArrayPool.getStats();
      const memory = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 'N/A';
      
      panel.innerHTML = `
        <div><strong>🎯 性能监控</strong></div>
        <div>📺 可见性: ${perfStatus.isVisible ? '✅' : '❌'}</div>
        <div>🎬 FPS: ${Math.round(perfStatus.currentFPS)}</div>
        <div>🔄 渲染回调: ${perfStatus.callbackCount}</div>
        <div>💾 内存: ${memory}MB</div>
        <div>🎱 Float32Array总数: ${poolStats.totalArrays}</div>
        <div>📦 内存池状态:</div>
        ${Object.entries(poolStats.poolSizes)
          .map(([size, count]) => `<div style="margin-left: 10px;">${size}: ${count}</div>`)
          .join('')}
      `;
    };
    
    updatePanel();
    setInterval(updatePanel, 1000);
    document.body.appendChild(panel);
  };
  
  // 页面加载完成后创建面板
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createPerformancePanel);
  } else {
    createPerformancePanel();
  }
}

export default { visibilityRenderer, float32ArrayPool };
