import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 简化的sections配置，直接在store中定义
const simpleSections = [
  {
    id: "home",
    index: 0,
    name: { en: "Home", zh: "首页" },
    description: { en: "Welcome to my portfolio", zh: "欢迎来到我的作品集" },
    backgroundEffect: "effectfuse",
    cubeImage: "/hua.jpeg",
    icon: "home"
  },
  {
    id: "project",
    index: 1,
    name: { en: "Projects", zh: "项目" },
    description: { en: "My development projects", zh: "我的开发项目" },
    backgroundEffect: "effectmonjori",
    cubeImage: "/jsjxmm.jpg",
    icon: "project"
  },
  {
    id: "gallery",
    index: 2,
    name: { en: "Gallery", zh: "作品展示" },
    description: { en: "Visual showcase", zh: "视觉作品展示" },
    backgroundEffect: "effectheartbeats",
    cubeImage: "/fitsgo-team.jpg",
    icon: "gallery"
  },
  {
    id: "contact",
    index: 3,
    name: { en: "Contact", zh: "联系我" },
    description: { en: "Get in touch", zh: "联系方式" },
    backgroundEffect: "effectlorenz",
    cubeImage: "/hua_presentation.jpg",
    icon: "contact"
  },
  {
    id: "about",
    index: 4,
    name: { en: "About", zh: "关于我" },
    description: { en: "About myself", zh: "个人介绍" },
    backgroundEffect: "effectfuse",
    cubeImage: "/awared-best-programmer.jpeg",
    icon: "about"
  },
  {
    id: "blog",
    index: 5,
    name: { en: "Blog", zh: "博客" },
    description: { en: "Thoughts and insights", zh: "思考与见解" },
    backgroundEffect: "effectmonjori",
    cubeImage: "/stone.jpg",
    icon: "blog"
  }
];

// 简化的内容配置
const simpleContent = {
  en: {
    navigation: {
      home: "Home",
      projects: "Projects",
      gallery: "Gallery",
      contact: "Contact",
      about: "About",
      blog: "Blog"
    },
    home: {
      name: "Hua Wang",
      title: "Full Stack Engineer",
      description: "Passionate developer creating innovative web applications."
    },
    ui: {
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark"
    }
  },
  zh: {
    navigation: {
      home: "首页",
      projects: "项目",
      gallery: "画廊",
      contact: "联系",
      about: "关于",
      blog: "博客"
    },
    home: {
      name: "王华",
      title: "全栈工程师",
      description: "热衷于创建创新Web应用程序的开发者。"
    },
    ui: {
      language: "语言",
      theme: "主题",
      light: "浅色",
      dark: "深色"
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
      
      // 滚动状态
      isScrolling: false,
      setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),

      // 配置数据
      sections: simpleSections,
      
      // 获取当前语言的内容
      getContent: () => {
        const { language } = get();
        return simpleContent[language];
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
        theme: state.theme
      })
    }
  )
);

export default useAppStore;
