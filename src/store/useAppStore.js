import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ========================================================================================
// 统一数据存储配置 - 集中管理所有数据、语言、文本配置
// ========================================================================================

// 栏目配置 - 定义网站的主要栏目结构
const sectionsConfig = [
  {
    id: "home",
    index: 0,
    name: { en: "Home", zh: "首页" },
    description: { en: "Welcome to my portfolio", zh: "欢迎来到我的作品集" },
    backgroundEffect: "effectgalaxy", // Galaxy 效果
    cubeImage: "/hua.jpeg",
    icon: "🏠"
  },
  {
    id: "about",
    index: 1,
    name: { en: "About", zh: "关于我" },
    description: { en: "About myself", zh: "个人介绍" },
    backgroundEffect: "effectlorenz", // Lorenz 背景
    cubeImage: "/awared-best-programmer.jpeg",
    icon: "👤"
  },
  {
    id: "projects", 
    index: 2,
    name: { en: "Projects", zh: "项目" },
    description: { en: "My development projects", zh: "我的开发项目" },
    backgroundEffect: "effectmonjori", // Monjori 背景
    cubeImage: "/jsjxmm.jpg", 
    icon: "💼"
  },
  {
    id: "gallery",
    index: 3,
    name: { en: "Gallery", zh: "作品展示" },
    description: { en: "Visual showcase", zh: "视觉作品展示" },
    backgroundEffect: "effectheartbeats", // HeartBeats 背景
    cubeImage: "/fitsgo-team.jpg",
    icon: "🖼️"
  },
  {
    id: "education",
    index: 4,
    name: { en: "Education", zh: "教育背景" },
    description: { en: "Academic background", zh: "学术背景" },
    backgroundEffect: "effectfuse", // Fuse 背景
    cubeImage: "/UC_F4.001.jpeg",
    icon: "🎓"
  },
  {
    id: "contact",
    index: 5,
    name: { en: "Contact", zh: "联系我" },
    description: { en: "Get in touch", zh: "联系方式" },
    backgroundEffect: "effectpixeldistortion", // PixelDistortion 背景
    cubeImage: "/hua_presentation.jpg",
    icon: "📧"
  }
];

// 项目数据配置 - 项目地理位置和详细信息
const projectsData = {
  locations: [
    {
      id: 1,
      name: "AQI Monitoring System",
      description: "Real-time air quality monitoring dashboard with data visualization",
      location: [-43.5321, 172.6362], // Christchurch
      category: "Data Science",
      technologies: ["Python", "React", "D3.js", "PostgreSQL"],
      image: "/aqi/Overview.png",
      status: "completed"
    },
    {
      id: 2,
      name: "DATA472 Fuel Price Analysis",
      description: "Comprehensive fuel price analysis and prediction system",
      location: [-43.5321, 172.6362], // Christchurch
      category: "Analytics",
      technologies: ["Python", "Pandas", "Scikit-learn", "Plotly"],
      image: "/data472/472.png",
      status: "completed"
    },
    {
      id: 3,
      name: "UC Programming Competition",
      description: "Algorithmic problem solving and competitive programming",
      location: [-43.5321, 172.6362], // Christchurch
      category: "Algorithm",
      technologies: ["C++", "Python", "Algorithms"],
      image: "/UC_F4.001.jpeg",
      status: "completed"
    },
    {
      id: 4,
      name: "FitsGo Fitness Platform",
      description: "Full-stack fitness tracking and social platform",
      location: [-36.8485, 174.7633], // Auckland
      category: "Full Stack",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      image: "/fitsgo.gif",
      status: "in-progress"
    },
    {
      id: 5,
      name: "Zespri Digital Solutions",
      description: "Agricultural technology and supply chain optimization",
      location: [-37.7870, 176.0677], // Tauranga
      category: "AgTech",
      technologies: ["Vue.js", "Python", "AWS", "IoT"],
      image: "/zespri.png",
      status: "completed"
    }
  ],
  mapConfig: {
    center: [-41.2865, 174.7762], // New Zealand center
    zoom: 6,
    minZoom: 5,
    maxZoom: 15,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  categoryColors: {
    "Data Science": "#3b82f6", // Blue
    "Analytics": "#8b5cf6",    // Purple
    "Algorithm": "#f59e0b",    // Amber
    "Full Stack": "#10b981",   // Emerald
    "AgTech": "#ef4444"        // Red
  }
};

// 国际化内容配置 - 完整的多语言文本内容
const contentConfig = {
  en: {
    navigation: {
      home: "Home",
      about: "About",
      projects: "Projects",
      gallery: "Gallery",
      education: "Education",
      contact: "Contact",
      blog: "Blog"
    },
    home: {
      name: "Hua Wang",
      title: "Full Stack Software Engineer",
      shortBio: "Passionate developer creating innovative web applications with cutting-edge technology and exceptional user experiences.",
      description: "I'm a full-stack developer with a strong focus on frontend, especially building interactive web applications and visualisation dashboards. I have experience with modern frontend frameworks such as React, Next.js, and TypeScript, as well as working with libraries such as Three.js and ECharts.",
      location: "New Zealand",
      slogan: {
        chinese: "观混沌之纷，立秩序之象；权诸技之衡，启创新之变！",
        english: "Order from Chaos. Innovation through Tradeoffs."
      }
    },
    projects: {
      title: "My Projects",
      subtitle: "Explore my portfolio of innovative applications",
      description: "A collection of web applications and development projects showcasing modern technologies and creative solutions.",
      viewProject: "View Project",
      learnMore: "Learn more →",
      technologies: "Technologies"
    },
    gallery: {
      title: "Photo Gallery",
      subtitle: "Visual journey through my work and experiences",
      description: "A curated collection of visual projects and creative works.",
      viewImage: "View Image"
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's discuss your next project",
      description: "Get in touch for opportunities, collaborations, or just to say hello.",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      info: "Contact Information",
      location: "Auckland, New Zealand",
      emailAddress: "contact@example.com",
      phone: "+64 xxx xxx xxx"
    },
    about: {
      title: "About Me",
      subtitle: "My journey as a developer",
      description: "Learn more about my background, skills, and passion for technology.",
      background: "Background",
      education: "Education",
      interests: "Interests"
    },
    education: {
      title: "Education",
      subtitle: "Academic journey and achievements",
      description: "My educational background and continuous learning path."
    },
    blog: {
      title: "Blog & Insights",
      subtitle: "Sharing thoughts on technology and development",
      description: "Articles and thoughts on technology, development, and innovation.",
      readMore: "Read More",
      comingSoon: "Coming Soon"
    },
    ui: {
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      audio: "Audio",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      loading: "Loading...",
      backToHome: "Back to Home",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      toggleTheme: "Toggle Theme"
    }
  },
  zh: {
    navigation: {
      home: "首页",
      about: "关于",
      projects: "项目",
      gallery: "画廊",
      education: "教育",
      contact: "联系",
      blog: "博客"
    },
    home: {
      name: "王华",
      title: "全栈软件工程师",
      shortBio: "热衷于使用前沿技术创建创新Web应用程序，提供卓越用户体验的开发者。",
      description: "我是一名全栈开发者，专注于前端开发，特别是构建交互式Web应用程序和可视化仪表板。我有使用现代前端框架如React、Next.js和TypeScript的经验，以及使用Three.js和ECharts等库的经验。",
      location: "新西兰",
      slogan: {
        chinese: "观混沌之纷，立秩序之象；权诸技之衡，启创新之变！",
        english: "Order from Chaos. Innovation through Tradeoffs..."
      }
    },
    projects: {
      title: "我的项目",
      subtitle: "探索我的创新应用程序作品集",
      description: "展示现代技术和创意解决方案的Web应用程序和开发项目集合。",
      viewProject: "查看项目",
      learnMore: "了解更多 →",
      technologies: "技术栈"
    },
    gallery: {
      title: "照片画廊",
      subtitle: "通过视觉展示我的工作和经历",
      description: "精心策划的视觉项目和创意作品集合。",
      viewImage: "查看图片"
    },
    contact: {
      title: "联系我",
      subtitle: "让我们讨论您的下一个项目",
      description: "如有机会、合作或只是想打个招呼，请与我联系。",
      name: "您的姓名",
      email: "您的邮箱",
      message: "您的信息",
      send: "发送信息",
      info: "联系信息",
      location: "新西兰奥克兰",
      emailAddress: "contact@example.com",
      phone: "+64 xxx xxx xxx"
    },
    about: {
      title: "关于我",
      subtitle: "我的开发者之路",
      description: "了解更多关于我的背景、技能和对技术的热情。",
      background: "背景",
      education: "教育经历",
      interests: "兴趣爱好"
    },
    education: {
      title: "教育背景",
      subtitle: "学术历程与成就",
      description: "我的教育背景和持续学习之路。"
    },
    blog: {
      title: "博客与见解",
      subtitle: "分享技术和开发思考",
      description: "关于技术、开发和创新的文章和思考。",
      readMore: "阅读更多",
      comingSoon: "敬请期待"
    },
    ui: {
      language: "语言",
      theme: "主题",
      light: "浅色",
      dark: "深色",
      audio: "音频",
      play: "播放",
      pause: "暂停",
      mute: "静音",
      unmute: "取消静音",
      loading: "加载中...",
      backToHome: "返回首页",
      darkMode: "深色模式",
      lightMode: "浅色模式",
      toggleTheme: "切换主题"
    }
  }
};

export const useAppStore = create(
  persist(
    (set, get) => ({
      // 语言状态
      language: 'en',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => 
        set((state) => ({ language: state.language === 'en' ? 'zh' : 'en' })),

      // 主题状态
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => 
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // 当前活动区块
      currentSection: 0,
      setCurrentSection: (index) => set({ currentSection: index }),
      
      // 当前背景效果
      currentEffect: 'effectgalaxy',
      setCurrentEffect: (effect) => set({ currentEffect: effect }),
      
      // 音频状态
      audioEnabled: false,
      setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),

      // 滚动状态
      isScrolling: false,
      setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),

      // 配置数据
      sections: sectionsConfig,
      
      // 项目数据
      projects: projectsData,
      
      // 获取当前语言的内容
      getContent: () => {
        const { language } = get();
        return contentConfig[language];
      },

      // 获取当前区块配置
      getCurrentSection: () => {
        const { currentSection, sections } = get();
        return sections[currentSection];
      },

      // 获取区块名称（多语言）
      getSectionName: (sectionId) => {
        const { language, sections } = get();
        const section = sections.find(s => s.id === sectionId);
        return section ? section.name[language] : '';
      },

      // 获取区块描述（多语言）
      getSectionDescription: (sectionId) => {
        const { language, sections } = get();
        const section = sections.find(s => s.id === sectionId);
        return section ? section.description[language] : '';
      },

      // 获取项目位置数据
      getProjectLocations: () => {
        return get().projects.locations;
      },

      // 获取地图配置
      getMapConfig: () => {
        return get().projects.mapConfig;
      },

      // 获取项目类别颜色
      getCategoryColors: () => {
        return get().projects.categoryColors;
      },

      // 根据类别获取项目
      getProjectsByCategory: (category) => {
        return get().projects.locations.filter(project => project.category === category);
      },

      // 根据状态获取项目
      getProjectsByStatus: (status) => {
        return get().projects.locations.filter(project => project.status === status);
      },

      // 导航到指定区块
      navigateToSection: (index) => {
        set({ 
          currentSection: index,
          isScrolling: true 
        });
        // 设置延迟重置滚动状态
        setTimeout(() => set({ isScrolling: false }), 1000);
      },

      // 导航到下一个区块
      navigateNext: () => {
        const { currentSection, sections } = get();
        const nextIndex = (currentSection + 1) % sections.length;
        get().navigateToSection(nextIndex);
      },

      // 导航到上一个区块
      navigatePrev: () => {
        const { currentSection, sections } = get();
        const prevIndex = currentSection === 0 ? sections.length - 1 : currentSection - 1;
        get().navigateToSection(prevIndex);
      }
    }),
    {
      name: 'hua-portfolio-store',
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
        audioEnabled: state.audioEnabled
      })
    }
  )
);

export default useAppStore;
