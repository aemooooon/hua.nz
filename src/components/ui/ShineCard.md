# ShineCard Component

一个通用的卡片光影效果组件，提供酷炫的hover动画效果。

## 特性

- 🌟 **顶部光条跑动效果** - hover时从左到右的光影跑动
- ✨ **内容区域光影扫描** - 内容区域的微妙光影效果  
- 🎨 **多种颜色主题** - 支持蓝色、绿色、紫色、黄色主题
- 📱 **响应式设计** - 在移动设备上优化的动画效果
- ♿ **无障碍友好** - 支持减少动画的无障碍选项
- 🔧 **高度可定制** - 支持自定义类名、样式和内容

## 使用方法

### 基础用法

```jsx
import ShineCard from './components/ui/ShineCard';

<ShineCard shineColor="blue">
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</ShineCard>
```

### 高级用法

```jsx
<ShineCard 
  shineColor="green"
  className="custom-card-class"
  enableContentShine={true}
  onClick={handleClick}
>
  <div>自定义内容</div>
</ShineCard>
```

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | ReactNode | 必需 | 卡片内容 |
| `className` | string | `''` | 额外的CSS类名 |
| `shineColor` | string | `'blue'` | 光影颜色主题: 'blue', 'green', 'purple', 'yellow' |
| `enableContentShine` | boolean | `true` | 是否启用内容区域的光影扫描效果 |
| `style` | object | `{}` | 内联样式 |

## 颜色主题

- **blue** - 蓝色光影（默认）
- **green** - 绿色光影  
- **purple** - 紫色光影
- **yellow** - 黄色光影

## 动画效果

1. **顶部光条** - hover时从左(-100%)滑动到右(100%)
2. **背景渐变** - 透明度从0变为1的白色渐变叠加
3. **整体变换** - 向上移动8px并轻微缩放(1.02)
4. **阴影效果** - 增强的阴影和边框发光效果
5. **内容扫描**（可选）- 内容区域的光影扫描效果

## 示例场景

### Contact卡片
```jsx
<ShineCard shineColor="blue" className="contact-card">
  <div className="text-center">
    <div className="text-4xl mb-4">📧</div>
    <h3>邮箱</h3>
    <p>example@email.com</p>
  </div>
</ShineCard>
```

### Project卡片
```jsx
<ShineCard shineColor="purple" className="project-card">
  <img src="project.jpg" alt="项目" />
  <div>
    <h3>项目名称</h3>
    <p>项目描述</p>
  </div>
</ShineCard>
```

## CSS 自定义

你可以通过CSS变量来自定义更多效果：

```css
.custom-shine-card {
  --shine-duration: 1.2s; /* 光条跑动时长 */
  --shine-delay: 0.3s;     /* 内容扫描延迟 */
  --hover-scale: 1.05;     /* hover缩放比例 */
  --hover-translate: -12px; /* hover垂直移动距离 */
}
```

## 无障碍支持

组件自动检测用户的`prefers-reduced-motion`设置，在用户设置减少动画时会禁用所有动画效果。
