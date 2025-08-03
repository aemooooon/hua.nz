# iOS式回弹动画实现

## 功能特性

### 1. 边界回弹动画
- ✅ 当用户在页面/内容边界继续滚动时，触发iOS式回弹动画
- ✅ 回弹强度根据滚动力度动态调整
- ✅ 流畅的弹性回归动画，带有轻微的反弹效果

### 2. 智能边界检测
- ✅ 检测内容滚动的真实边界（scrollTop = 0 或 maxScrollTop）
- ✅ 检测页面切换的边界（第一页/最后一页）
- ✅ 区分不同类型的边界状态

### 3. 光标视觉反馈
- ✅ 在边界状态下，光标圆圈和箭头根据滚动力度变为红色
- ✅ 红色强度与滚动力度成正比
- ✅ 实时反映用户的滚动意图和边界状态

## 技术实现

### 回弹动画逻辑
```javascript
const triggerBounceAnimation = useCallback((direction, intensity = 0.5) => {
    setBounceDirection(direction);
    setIsBouncing(true);
    
    // 根据强度计算回弹偏移
    const maxBounceOffset = 30;
    const bounceOffset = Math.min(intensity * maxBounceOffset, maxBounceOffset);
    const offset = direction === 'up' ? -bounceOffset : bounceOffset;
    
    setPreviewOffset(offset);
    setIsPreviewingScroll(true);
    
    // 150ms后开始回弹归位
    setTimeout(() => {
        setIsPreviewingScroll(false);
        setPreviewOffset(0);
        // 300ms后完全结束回弹状态
        setTimeout(() => {
            setIsBouncing(false);
            setBounceDirection('none');
        }, 300);
    }, 150);
}, []);
```

### CSS动画曲线
```css
/* iOS式回弹曲线 */
transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

/* 回弹动画关键帧 */
@keyframes bounceBack {
    0% { transform: translateY(var(--bounce-offset, 0)); }
    60% { transform: translateY(0); }
    80% { transform: translateY(calc(var(--bounce-offset, 0) * -0.1)); }
    100% { transform: translateY(0); }
}
```

### 边界检测
```javascript
// 检测真实滚动边界
const isAtRealBoundary = (atContentTop && currentContainer.scrollTop === 0) || 
                        (atContentBottom && currentContainer.scrollTop >= maxScrollTop);

// 触发条件
if (currentScrollTop <= 5) {
    const intensity = Math.min(scrollAccumulatorRef.current / SCROLL_THRESHOLD, 1);
    triggerBounceAnimation('up', intensity);
}
```

### 光标状态同步
```javascript
// 自定义事件通信
const bounceEvent = new CustomEvent('scrollBounce', {
    detail: { 
        isBouncing, 
        direction: bounceDirection,
        intensity: scrollAccumulatorRef.current / SCROLL_THRESHOLD
    }
});
window.dispatchEvent(bounceEvent);

// 光标组件监听
window.addEventListener('scrollBounce', handleBounceEvent);
```

## 用户体验

### 视觉反馈
1. **回弹动画**：页面向滚动方向轻微移动后弹回，表明已到达边界
2. **红色光标**：滚动力度越大，红色越深，清晰传达边界状态
3. **流畅过渡**：使用专业的贝塞尔曲线，提供自然的物理感受

### 交互逻辑
1. **内容滚动模式**：在内容边界处触发回弹
2. **页面切换模式**：在页面边界处触发回弹
3. **力度感应**：回弹强度反映用户的滚动意图

### 边界类型
- **内容顶部/底部**：内容已无法进一步滚动
- **页面边界**：已是第一页或最后一页
- **混合边界**：既是内容边界又是页面边界

## 测试场景

1. 在Project页面滚动到底部，继续向下滚动
2. 在Education页面滚动到顶部，继续向上滚动
3. 在第一页（Home）向上滚动
4. 在最后一页（Contact）向下滚动
5. 观察光标颜色变化和回弹动画效果

## 兼容性

- ✅ 支持鼠标滚轮
- ✅ 支持触控板手势
- ✅ 支持键盘导航
- ✅ 响应式设计适配
