# 内容滚动弹回问题修复

## 问题
在Project页面等有内容滚动的页面中，轻微滚动会导致内容弹回到页面顶部，无法正常查看页面内容。

## 根本原因
原来的滚动逻辑存在混淆：
1. 内容滚动模式下仍然在进行滚动累积计算
2. 滚动累积器的重置和预览动画逻辑干扰了正常的内容滚动
3. 边界检测逻辑在处理顺序上有问题

## 修复策略

### 1. 优先处理内容滚动
将内容滚动模式的处理提前到函数开始，避免被其他逻辑干扰：

```javascript
// 内容滚动模式下，优先处理内容滚动，不进行累积计算
if (scrollMode === 'content' && isContentOverflowing && !isHomePage) {
    // 直接处理内容滚动逻辑
    // 只在到达边界时才累积滚动值
}
```

### 2. 分离累积逻辑
- **内容滚动模式**：只在边界时才累积滚动值
- **幻灯片模式**：继续使用原有的累积逻辑

### 3. 边界检测优化
```javascript
if (currentScrollTop >= maxScrollTop - SCROLL_BOUNDARY_THRESHOLD) {
    // 到达底部边界时才开始累积
    scrollAccumulatorRef.current += Math.abs(event.deltaY);
} else {
    // 在内容中间时，重置累积器，让浏览器自然滚动
    scrollAccumulatorRef.current = 0;
    return; // 不干预浏览器的默认滚动行为
}
```

### 4. 增加调试信息
添加详细的控制台日志，帮助识别滚动状态：
```javascript
console.log(`[ScrollManager] 在 ${currentSectionConfig?.id} 向下滚动，ScrollTop: ${currentScrollTop}/${maxScrollTop}`);
```

## 预期效果

修复后的行为应该是：
1. ✅ 在Project/Education页面内容区域正常滚动
2. ✅ 滚动时内容不会弹回到顶部
3. ✅ 只有到达真正边界时才切换页面
4. ✅ 需要足够的滚动力度才能切换页面（防止误触）
5. ✅ Home页面等非内容页面的滚动行为保持不变

## 测试建议

1. 打开Project页面，轻微滚动查看是否能正常浏览内容
2. 在Education页面测试内容滚动
3. 测试到达页面底部时是否能正确切换到下一页
4. 观察控制台日志确认滚动状态检测正确
