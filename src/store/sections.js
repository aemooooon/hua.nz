// ========================================================================================
// 栏目数据配置 - 不需要国际化的栏目结构数据
// ========================================================================================

// 栏目配置 - 定义网站的主要栏目结构
export const sectionsData = [
    {
        id: 'home',
        index: 0,
        backgroundEffect: 'effectchaos', // Chaos 效果
        cubeImage: '/gallery/gallery-horizontal-12.jpg',
        cubeVideo: '/cube-textures/home.mp4', // 立方体视频
        // HeroCube faces 配置
        faces: {
            name: 'home',
            label: 'Home', // 这个会被国际化内容覆盖
            color: '#afcc8f',
            effect: 'effectchaos',
            video: '/cube-textures/home.mp4',
        },
    },
    {
        id: 'about',
        index: 1,
        backgroundEffect: 'effectlorenz', // Lorenz 背景
        cubeImage: '/cube-textures/about.jpg',
        faces: {
            name: 'about',
            label: 'About',
            color: '#7ca65c',
            effect: 'effectlorenz',
            texture: 'about',
        },
    },
    {
        id: 'projects',
        index: 2,
        backgroundEffect: 'effectmonjori', // Monjori 背景
        cubeImage: '/cube-textures/projects.jpg',
        faces: {
            name: 'projects',
            label: 'Projects',
            color: '#5d7d4b',
            effect: 'effectmonjori',
            texture: 'projects',
        },
    },
    {
        id: 'gallery',
        index: 3,
        backgroundEffect: '', // 清空背景效果，因为Gallery section有自己的3D场景
        cubeImage: '/cube-textures/gallery.jpg',
        faces: {
            name: 'gallery',
            label: 'Gallery',
            color: '#768e90',
            effect: 'effectheartbeats',
            texture: 'gallery',
        },
    },
    {
        id: 'education',
        index: 4,
        backgroundEffect: 'effectfuse', // Fuse 背景
        cubeImage: '/cube-textures/education.jpg',
        faces: {
            name: 'education',
            label: 'Education',
            color: '#4a636a',
            effect: 'effectfuse',
            texture: 'education',
        },
    },
    {
        id: 'contact',
        index: 5,
        backgroundEffect: 'effectripple', // Ripple Waves 背景 - 波纹传播效果
        cubeImage: '/cube-textures/contact.jpg',
        faces: {
            name: 'contact',
            label: 'Contact',
            color: '#3a4e55',
            effect: 'effectpixeldistortion',
            texture: 'contact',
        },
    },
];
