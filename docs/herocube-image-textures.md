# HeroCube高质量图片贴图集成文档

## 更新概述

为HeroCube添加了高质量图片贴图支持，使用public/cube-textures文件夹下的专用图片资源。

## 贴图资源映射

### 文件对应关系
```
public/cube-textures/
├── home.mp4      → home面 (视频贴图)
├── about.jpg     → about面 (图片贴图)
├── projects.jpg  → projects面 (图片贴图)
├── gallery.jpg   → gallery面 (图片贴图)
├── education.jpg → education面 (图片贴图)
└── contact.jpg   → contact面 (图片贴图)
```

### faces配置更新
```jsx
const faces = useMemo(() => [
    { 
        name: 'home', 
        label: 'Home', 
        color: '#afcc8f', 
        effect: 'effectchaos', 
        video: '/cube-textures/home.mp4' 
    },
    { 
        name: 'about', 
        label: 'About', 
        color: '#7ca65c', 
        effect: 'effectlorenz', 
        image: '/cube-textures/about.jpg' 
    },
    { 
        name: 'projects', 
        label: 'Projects', 
        color: '#5d7d4b', 
        effect: 'effectmonjori', 
        image: '/cube-textures/projects.jpg' 
    },
    { 
        name: 'gallery', 
        label: 'Gallery', 
        color: '#768e90', 
        effect: 'effectheartbeats', 
        image: '/cube-textures/gallery.jpg' 
    },
    { 
        name: 'education', 
        label: 'Education', 
        color: '#1d2012', 
        effect: 'effectfuse', 
        image: '/cube-textures/education.jpg' 
    },
    { 
        name: 'contact', 
        label: 'Contact', 
        color: '#94a3b8', 
        effect: 'effectpixeldistortion', 
        image: '/cube-textures/contact.jpg' 
    }
], [content.navigation]);
```

## 技术实现

### 1. 图片贴图处理逻辑
```jsx
// 如果是图片贴图
if (face.image) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    // 创建高质量物理材质
    const material = new THREE.MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.9,
        transmission: 0.2,
        roughness: 0.1,
        metalness: 0.05,
        reflectivity: 0.8,
        clearcoat: 0.8,
        clearcoatRoughness: 0.1,
        ior: 1.52,
        thickness: 1.0,
        side: THREE.DoubleSide,
        iridescence: 0.1,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 400],
        envMapIntensity: 1.5,
        specularIntensity: 1.0,
        specularColor: new THREE.Color(0xffffff)
    });
    
    // 图片加载完成后创建高质量纹理
    img.onload = () => {
        const imageTexture = new THREE.Texture(img);
        imageTexture.needsUpdate = true;
        imageTexture.generateMipmaps = true;
        imageTexture.minFilter = THREE.LinearMipmapLinearFilter;
        imageTexture.magFilter = THREE.LinearFilter;
        imageTexture.wrapS = THREE.ClampToEdgeWrapping;
        imageTexture.wrapT = THREE.ClampToEdgeWrapping;
        imageTexture.colorSpace = THREE.SRGBColorSpace;
        
        material.map = imageTexture;
        material.needsUpdate = true;
    };
    
    img.src = face.image;
    return material;
}
```

### 2. 高质量渲染特性

#### 物理材质属性
- **透明度**: `opacity: 0.9` - 轻微透明感
- **透射**: `transmission: 0.2` - 光线透射效果
- **粗糙度**: `roughness: 0.1` - 低粗糙度，高反射
- **金属度**: `metalness: 0.05` - 轻微金属感
- **反射率**: `reflectivity: 0.8` - 高反射率
- **清漆**: `clearcoat: 0.8` - 清漆层效果
- **彩虹效果**: `iridescence: 0.1` - 轻微彩虹反射

#### 纹理优化
- **Mipmap生成**: `generateMipmaps: true` - 自动生成多级纹理
- **高质量过滤**: `LinearMipmapLinearFilter` - 最佳质量过滤
- **边缘处理**: `ClampToEdgeWrapping` - 防止纹理边缘重复
- **色彩空间**: `SRGBColorSpace` - 正确的色彩空间

### 3. 渲染优先级
1. **视频贴图** (home面) - 最高优先级，动态内容
2. **图片贴图** (其他5个面) - 高质量静态图片
3. **Canvas纹理** (备用方案) - 程序生成的纹理

### 4. 错误处理
- 图片加载失败时的错误日志
- 异步加载不影响立方体基础渲染
- 渐进式加载，先显示基础材质，再应用纹理

## 性能优化

### 1. 异步加载
- 所有图片都是异步加载，不阻塞渲染
- 支持渐进式显示效果

### 2. 内存管理
- 正确的纹理清理机制
- 避免内存泄漏

### 3. 质量平衡
- 使用适中的纹理尺寸
- 高质量过滤算法
- 合理的材质参数

## 视觉效果提升

### 1. 材质升级
- 从Canvas纹理升级到真实图片纹理
- 更丰富的视觉细节
- 更真实的光照反射

### 2. 立体感增强
- 高质量的物理材质
- 真实的光照交互
- 彩虹反射和清漆效果

### 3. 品质提升
- 专业级的视觉呈现
- 符合现代Web3D标准
- 更具吸引力的用户体验

## 使用建议

### 1. 图片规格
- **推荐尺寸**: 512x512 或 1024x1024
- **格式**: JPG (压缩) 或 PNG (透明)
- **质量**: 中高质量，平衡文件大小和视觉效果

### 2. 命名规范
- 使用描述性文件名
- 保持与faces配置中的name对应
- 统一的文件扩展名

### 3. 维护
- 定期检查图片资源
- 监控加载性能
- 根据需要优化图片质量和大小

## 总结

这次更新将HeroCube从程序生成的Canvas纹理升级为高质量的真实图片贴图，显著提升了视觉效果和用户体验。每个面现在都有专门的视觉内容，使立方体更具吸引力和专业性。
