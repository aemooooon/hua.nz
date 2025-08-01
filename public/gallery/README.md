# Gallery Images Setup Guide

## 文件夹结构

```
public/gallery/
├── personal/           # 个人生活照片
├── presentations/      # 演讲和分享相关
├── events/            # 活动和聚会
└── development/       # 开发工作相关
```

## 图片命名规范

每个图片都应该有两个版本：
- **原图**: `filename.jpg` (高分辨率，用于PhotoSwipe查看)
- **缩略图**: `filename_thumb.jpg` (小尺寸，用于3D画廊显示)

### 建议的图片尺寸：
- **原图**: 1200x800px 或更高 (保持16:10或4:3比例)
- **缩略图**: 300x200px (用于快速加载)

## 添加新图片的步骤

1. **将图片文件复制到对应文件夹**
   ```bash
   # 例如添加个人照片
   cp your_photo.jpg public/gallery/personal/
   cp your_photo_thumb.jpg public/gallery/personal/
   ```

2. **更新 `src/store/galleryData.js`**
   ```javascript
   // 在对应的category.items数组中添加新项目
   {
       id: 'unique_id',
       type: 'image', // 或 'video'
       src: '/gallery/category/filename.jpg',
       thumbnail: '/gallery/category/filename_thumb.jpg',
       title: {
           en: 'English Title',
           zh: '中文标题'
       },
       description: {
           en: 'English Description',
           zh: '中文描述'
       },
       date: '2024-08-01',
       tags: ['tag1', 'tag2']
   }
   ```

## 当前占位符文件

以下文件是空的占位符，请替换为真实图片：

### Personal (个人生活)
- `personal/photo_1.jpg` + `personal/photo_1_thumb.jpg`
- `personal/photo_2.jpg` + `personal/photo_2_thumb.jpg`

### Presentations (演讲分享)
- `presentations/presentation_1.jpg` + `presentations/presentation_1_thumb.jpg`
- `presentations/presentation_2.mp4` + `presentations/presentation_2_thumb.jpg`

### Events (活动聚会)
- `events/event_1.jpg` + `events/event_1_thumb.jpg`
- `events/event_2.jpg` + `events/event_2_thumb.jpg`

### Development (开发工作)
- `development/dev_1.jpg` + `development/dev_1_thumb.jpg`
- `development/dev_2.jpg` + `development/dev_2_thumb.jpg`

## 优化建议

1. **图片压缩**: 使用工具如 TinyPNG 或 ImageOptim 压缩图片
2. **格式选择**: 
   - 照片使用 `.jpg`
   - 图标/简单图形使用 `.png`
   - 考虑使用 `.webp` 格式以获得更好的压缩率
3. **懒加载**: 3D画廊已实现懒加载，无需担心性能问题

## 视频支持

对于视频文件：
- 支持 `.mp4`, `.webm`, `.mov` 格式
- 建议使用 H.264 编码的 MP4 文件以获得最佳兼容性
- 视频缩略图应该是视频的第一帧或关键帧截图

## 故障排除

如果图片没有显示：
1. 检查文件路径是否正确
2. 确保图片文件存在且可访问
3. 查看浏览器控制台是否有加载错误
4. 确认 `galleryData.js` 中的配置正确
