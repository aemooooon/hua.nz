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
    description: { en: "Welcome to my portfolio", zh: "欢迎来到我的个人主页" },
    backgroundEffect: "effectchaos", // Chaos 效果
    cubeImage: "/hua.jpeg",
    cubeVideo: "/cube-textures/home.mp4", // 立方体视频
    icon: "🏠"
  },
  {
    id: "about",
    index: 1,
    name: { en: "About", zh: "关于" },
    description: { en: "About myself", zh: "个人介绍" },
    backgroundEffect: "effectlorenz", // Lorenz 背景
    cubeImage: "/cube-textures/about.jpg", // 修正立方体图片路径
    icon: "👤"
  },
  {
    id: "projects", 
    index: 2,
    name: { en: "Projects", zh: "项目" },
    description: { en: "My development projects", zh: "我的开发项目" },
    backgroundEffect: "effectmonjori", // Monjori 背景
    cubeImage: "/cube-textures/projects.jpg", // 修正立方体图片路径
    icon: "💼"
  },
  {
    id: "gallery",
    index: 3,
    name: { en: "GallerySection", zh: "作品展示" },
    description: { en: "Visual showcase", zh: "视觉作品展示" },
    backgroundEffect: null, // GallerySection 内部自己管理背景加载时机
    cubeImage: "/cube-textures/gallery.jpg", // 修正立方体图片路径
    icon: "🖼️"
  },
  {
    id: "education",
    index: 4,
    name: { en: "Education", zh: "教育背景" },
    description: { en: "Academic background", zh: "学术背景" },
    backgroundEffect: "effectfuse", // Fuse 背景
    cubeImage: "/cube-textures/education.jpg", // 修正立方体图片路径
    icon: "🎓"
  },
  {
    id: "contact",
    index: 5,
    name: { en: "Contact", zh: "联系我" },
    description: { en: "Get in touch", zh: "联系方式" },
    backgroundEffect: "effectpixeldistortion", // PixelDistortion 背景
    cubeImage: "/cube-textures/contact.jpg", // 修正立方体图片路径
    icon: "📧"
  }
];



// 国际化内容配置 - 完整的多语言文本内容
const contentConfig = {
  en: {
    navigation: {
      home: "Home",
      about: "About",
      projects: "Projects",
      gallery: "Gallery",
      education: "Education",
      contact: "Contact"
    },
    home: {
      name: "Hua Wang",
      title: "Full Stack Developer",
      shortBio: "Passionate developer creating innovative web applications with cutting-edge technology and exceptional user experiences.",
      description: "I'm a full-stack developer with a strong focus on frontend, especially building interactive web applications and visualisation dashboards. I have experience with modern frontend frameworks such as React, Next.js, and TypeScript, as well as working with libraries such as Three.js and ECharts.",
      location: "New Zealand",
      slogan: {
        chinese: "观混沌之纷，立秩序之象；守中庸之衡，启创新之变！",
        english: "Order from Chaos. Innovation through Tradeoffs."
      }
    },
    projects: {
      title: "My Projects",
      subtitle: "Explore my portfolio of innovative applications",
      description: "A collection of web applications and development projects showcasing modern technologies and creative solutions.",
      viewProject: "View Project",
      learnMore: "Learn more →",
      technologies: "Technologies",
      totalProjects: "Total Projects",
      exploreMap: "Explore Map",
      exploreMapTooltip: "Explore Projects on Interactive Map",
      showing: "Showing",
      viewDetails: "View Details",
      liveDemo: "Live Demo"
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
      location: "Christchurch, New Zealand",
      emailAddress: "aemooooon@gmail.com",
      phone: "+64 21 037 0520",
      connectWithMe: "Connect with me",
      lookingForward: "Looking forward to hearing from you!",
      contactMethods: {
        email: {
          title: "Email",
          description: "Send me an email"
        },
        phone: {
          title: "Phone",
          description: "Give me a call"
        },
        location: {
          title: "Location",
          description: "Based in Christchurch"
        }
      },
      social: {
        github: {
          url: "https://github.com/aemooooon",
          label: "GitHub"
        },
        linkedin: {
          url: "https://www.linkedin.com/in/aemonwang",
          label: "LinkedIn"
        },
        email: {
          url: "mailto:aemooooon@gmail.com",
          label: "Email"
        }
      }
    },
    about: {
      title: "About Me",
      subtitle: "My journey as a developer",
      description: "Learn more about my background, skills, and passion for technology.",
      background: "Background", 
      education: "Education",
      interests: "Interests",
      pages: [
        {
          id: 'statement',
          title: 'Personal Statement',
          content: {
            greeting: "Kia ora, I'm Hua Wang",
            paragraphs: [
              "I am a versatile full-stack developer with expertise in computer/data science, building and integrating interactive web applications, data pipelines and visualisation dashboards.",
              "I have experience with modern frontend frameworks such as React, Next.js, and TypeScript, as well as working with libraries such as Three.js and ECharts. On the backend side, I am skilled in developing RESTful APIs and data-driven apps using Java, Python, Node.js, and C# ASP.NET.",
              "I have also been working with containerised environments (Docker, Kubernetes), GitHub Actions, GitLab CI/CD pipelines, and cloud platforms such as AWS and Azure."
            ]
          }
        },
        {
          id: 'experience',
          title: 'Professional Experience',
          experiences: [
            {
              company: "Zespri International",
              position: "Full Stack Developer (Internship)",
              period: "Nov 2024 - Feb 2025",
              color: "blue",
              icon: "ZI"
            },
            {
              company: "Realibox, GuangZhou", 
              position: "Frontend Developer",
              period: "Aug 2021 - Feb 2023",
              color: "purple",
              icon: "RB"
            },
            {
              company: "Nuclear Stone Technology",
              position: "Frontend Developer", 
              period: "Aug 2020 - Jul 2021",
              color: "green",
              icon: "NS"
            },
            {
              company: "Enshi Environmental Agency",
              position: "Full Stack Developer (Contract)",
              period: "Feb 2020 - Jul 2021",
              color: "orange", 
              icon: "ES"
            }
          ]
        }
      ]
    },
    education: {
      title: "Education",
      degrees: [
        {
          id: "masters",
          degree: "Master of Applied Data Science with Distinction",
          institution: "University of Canterbury",
          location: "Christchurch, New Zealand",
          period: "February 2024 - February 2025",
          capstoneProjects: [
            {
              name: "SwapBytes",
              description: "A P2P file-sharing and messaging app built using Rust (backend) and React with Tauri (frontend). Integrated libp2p for decentralised networking.",
              technologies: ["Rust", "React", "Tauri", "libp2p"],
              githubUrl: "https://github.com/aemooooon/swapbytes",
              image: "/jsjxmm.jpg"
            },
            {
              name: "Digital Pet",
              description: "A blockchain-based virtual pet dApp on Secret Network. Built a CosmWasm smart contract using Rust and a React frontend.",
              technologies: ["Rust", "CosmWasm", "React", "Secret Network"],
              githubUrl: "https://github.com/aemooooon/digital-pet",
              image: "/jlw.jpg"
            },
            {
              name: "Data Pipeline Project",
              description: "A collaborative cloud-based automation system for collecting and processing environmental data from 17 different sources.",
              technologies: ["Apache Airflow", "Python", "GraphQL", "AWS"],
              githubUrl: "https://github.com/aemooooon/data-pipeline",
              image: "/aqi/Overview.png"
            }
          ]
        },
        {
          id: "bachelors",
          degree: "Bachelor of Information Technology with Distinction",
          institution: "Otago Polytechnic",
          location: "Dunedin, New Zealand",
          period: "July 2017 - June 2021",
          awards: [
            {
              title: "Academic Excellence & Best Programmer",
              year: "2021",
              image: "/awared-best-programmer.jpeg"
            },
            {
              title: "Excellence in the Bachelor of Information Technology",
              year: "2019",
              image: "/awared-excellence.jpeg"
            }
          ],
          capstoneProjects: [
            {
              name: "Travel Assistant",
              description: "An Android app using Kotlin, Jetpack, Google Maps, and Room DB for trip planning.",
              technologies: ["Kotlin", "Android", "Google Maps"],
              githubUrl: "https://github.com/aemooooon/travel-assistant",
              image: "/dalincheng.jpg"
            },
            {
              name: "FitsGo",
              description: "A Fitness tracker app built with React Native and Firebase, supporting location tracking and workout history.",
              technologies: ["React Native", "Firebase"],
              githubUrl: "https://github.com/aemooooon/fitsgo",
              image: "/fitsgo-team.jpg"
            }
          ]
        }
      ]
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
      contact: "联系"
    },
    home: {
      name: "王华",
      title: "全栈工程师",
      shortBio: "热衷于使用前沿技术创建创新Web应用程序，提供卓越用户体验的开发者。",
      description: "我是一名全栈开发者，专注于前端开发，特别是构建交互式Web应用程序和可视化仪表板。我有使用现代前端框架如React、Next.js和TypeScript的经验，以及使用Three.js和ECharts等库的经验。",
      location: "新西兰",
      slogan: {
        chinese: "观混沌之纷，立秩序之象；守中庸之衡，启创新之变！",
        english: "Order from Chaos. Innovation through Tradeoffs..."
      }
    },
    projects: {
      title: "我的项目",
      subtitle: "探索我的创新应用程序作品集",
      description: "展示现代技术和创意解决方案的Web应用程序和开发项目集合。",
      viewProject: "查看项目",
      learnMore: "了解更多 →",
      technologies: "技术栈",
      totalProjects: "总项目数",
      exploreMap: "探索地图",
      exploreMapTooltip: "在交互地图上探索项目",
      showing: "显示",
      viewDetails: "查看详情",
      liveDemo: "在线演示"
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
      location: "新西兰基督城",
      emailAddress: "aemooooon@gmail.com",
      phone: "+64 21 037 0520",
      connectWithMe: "社交媒体",
      lookingForward: "期待您的联系！",
      contactMethods: {
        email: {
          title: "邮箱",
          description: "发送邮件"
        },
        phone: {
          title: "电话",
          description: "电话联系"
        },
        location: {
          title: "位置",
          description: "位于基督城"
        }
      },
      social: {
        github: {
          url: "https://github.com/aemooooon",
          label: "GitHub"
        },
        linkedin: {
          url: "https://www.linkedin.com/in/aemonwang",
          label: "LinkedIn"
        },
        email: {
          url: "mailto:aemooooon@gmail.com",
          label: "邮箱"
        }
      }
    },
    about: {
      title: "关于我",
      subtitle: "我的开发者之路",
      description: "了解更多关于我的背景、技能和对技术的热情。",
      background: "背景",
      education: "教育经历", 
      interests: "兴趣爱好",
      pages: [
        {
          id: 'statement',
          title: '个人陈述',
          content: {
            greeting: "你好，我是王华",
            paragraphs: [
              "一名充满创意的全栈开发者，专注于通过技术与设计的完美融合创造创新的数字体验。",
              "专精于使用 React、Next.js 和 AI 驱动的数据解决方案构建现代化 Web 应用。最近完成应用数据科学硕士学位，为每个项目带来前沿洞察。"
            ]
          }
        },
        {
          id: 'experience',
          title: '职业历程',
          experiences: [
            {
              company: "Zespri International",
              position: "全栈开发工程师（实习）",
              period: "2024年11月 - 2025年2月",
              color: "blue",
              icon: "ZI"
            },
            {
              company: "Realibox，广州",
              position: "前端开发工程师", 
              period: "2021年8月 - 2023年2月",
              color: "purple",
              icon: "RB"
            },
            {
              company: "Nuclear Stone Technology，重庆",
              position: "前端开发工程师",
              period: "2020年8月 - 2021年7月", 
              color: "green",
              icon: "NS"
            },
            {
              company: "恩施环境保护局",
              position: "全栈开发工程师（合同）",
              period: "2020年2月 - 2021年7月",
              color: "orange",
              icon: "ES"
            }
          ]
        }
      ]
    },
    education: {
      title: "教育背景",
      degrees: [
        {
          id: "masters",
          degree: "应用数据科学硕士（优秀毕业）",
          institution: "坎特伯雷大学",
          location: "新西兰基督城",
          period: "2024年2月 - 2025年2月",
          capstoneProjects: [
            {
              name: "SwapBytes",
              description: "使用Rust（后端）和React与Tauri（前端）构建的P2P文件共享和消息应用。集成libp2p进行去中心化网络。",
              technologies: ["Rust", "React", "Tauri", "libp2p"],
              githubUrl: "https://github.com/aemooooon/swapbytes",
              image: "/jsjxmm.jpg"
            },
            {
              name: "数字宠物",
              description: "基于Secret Network的区块链虚拟宠物dApp。使用Rust构建CosmWasm智能合约，React前端。",
              technologies: ["Rust", "CosmWasm", "React", "Secret Network"],
              githubUrl: "https://github.com/aemooooon/digital-pet",
              image: "/jlw.jpg"
            },
            {
              name: "数据管道项目",
              description: "协作式云端自动化系统，用于从17个不同来源收集和处理环境数据。",
              technologies: ["Apache Airflow", "Python", "GraphQL", "AWS"],
              githubUrl: "https://github.com/aemooooon/data-pipeline",
              image: "/aqi/Overview.png"
            }
          ]
        },
        {
          id: "bachelors",
          degree: "信息技术学士（优秀毕业）",
          institution: "奥塔哥理工学院",
          location: "新西兰达尼丁",
          period: "2017年7月 - 2021年6月",
          awards: [
            {
              title: "学术卓越与最佳程序员奖",
              year: "2021",
              image: "/awared-best-programmer.jpeg"
            },
            {
              title: "信息技术学士优秀奖",
              year: "2019",
              image: "/awared-excellence.jpeg"
            }
          ],
          capstoneProjects: [
            {
              name: "旅行助手",
              description: "使用Kotlin、Jetpack、Google Maps和Room DB开发的Android旅行规划应用。",
              technologies: ["Kotlin", "Android", "Google Maps"],
              githubUrl: "https://github.com/aemooooon/travel-assistant",
              image: "/TravelAssistant.jpg"
            },
            {
              name: "FitsGo",
              description: "使用React Native和Firebase构建的健身追踪应用，支持位置跟踪和锻炼历史。",
              technologies: ["React Native", "Firebase"],
              githubUrl: "https://github.com/aemooooon/fitsgo",
              image: "/fitsgo-team.jpg"
            }
          ]
        }
      ]
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
      currentEffect: 'effectchaos',
      setCurrentEffect: (effect) => set({ currentEffect: effect }),
      
      // 滚动状态
      isScrolling: false,
      setIsScrolling: (scrolling) => set({ isScrolling: scrolling }),

      // 开场动画状态
      enableOpeningAnimation: true,
      setEnableOpeningAnimation: (enabled) => set({ enableOpeningAnimation: enabled }),

      // 配置数据
      sections: sectionsConfig,
      
      // 多语言文本内容
      texts: contentConfig,
      
      // 项目数据 (原locations.js，重命名为projects)
      projects: [
        {
          "type": "work",
          "title": { en: "Software Engineer", zh: "软件工程师" },
          "name": { en: "Zespri International", zh: "佳沛国际" },
          "description": { en: "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.", zh: "构建ETL管道，开发交互式GIS网络应用，优化果园采样" },
          "coordinates": [-37.7866, 176.4416],
          "location": { en: "Bay of Plenty, New Zealand", zh: "新西兰丰盛湾" },
          "year": "2024-2025",
          "link": "https://www.zespri.com",
          "img": "/zespri_poster.png"
        },
          {
            "type": "work",
            "title": { en: "Software Engineer", zh: "软件工程师" },
            "name": { en: "Realibox", zh: "Realibox" },
            "description": { en: "Developed and maintained the central hub for Realibox's 3D assets, using React with a WebGL-based library for the frontend and Node.js/Python for the backend. Implemented CI/CD pipelines using GitLab for code integration and deployment. Worked in an Agile environment, collaborating closely with PMs, QAs, and Designers to ensure feature delivery aligned with requirements.", zh: "开发维护Realibox 3D资产中心，前端使用React和WebGL库，后端使用Node.js/Python。使用GitLab实现CI/CD流水线，在敏捷环境中协同工作" },
            "coordinates": [22.9951158, 113.3335372],
            "location": { en: "Guangzhou, China", zh: "中国广州" },
            "year": "2021-2023",
            "link": "https://hub.realibox.com/",
            "img": ["/realibox-00.jpg", "realibox-01.jpeg"]
          },
          {
            "type": "work",
            "title": { en: "Frontend Developer", zh: "前端开发工程师" },
            "name": { en: "Chongqing Nuclear Stone Technology", zh: "重庆核石科技" },
            "description": { en: "Develop H5 micro-apps on the WeChat platform, which include front-end page implementation, 3D scene tour and transition in panorama, and App deployment.", zh: "在微信平台开发H5微应用，包括前端页面实现、3D场景巡游、全景过渡和应用部署" },
            "coordinates": [29.5638, 106.5505],
            "location": { en: "Chongqing, China", zh: "中国重庆" },
            "year": "2020-2021",
            "link": "",
            "img": "/stone.jpg"
          },
          {
            "type": "project",
            "title": { en: "Full Stack Developer", zh: "全栈开发者" },
            "name": { en: "Real-time Air Quality Index Publish Platform", zh: "实时空气质量指数发布平台" },
            "description": { en: "Developed a real-time Air Quality Index dashboard for a population of 5 million, involving an ETL workflow to extract XML data from a third-party Web service on schedule, transform it into structured objects, and load it into a MySQL database. The backend, built with Java Spring Boot, provided RESTful APIs for data access, while the front end, developed using React and EChart, visualized AQI trends and geographic distributions through interactive and dynamic charts.", zh: "为500万人口开发实时空气质量指数仪表板，构建ETL工作流从第三方Web服务提取XML数据，转换为结构化对象并加载到MySQL数据库。使用Java Spring Boot构建后端RESTful API，React和EChart开发前端可视化图表" },
            "coordinates": [30.311395, 109.4795951],
            "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
            "year": "2020",
            "link": "https://aqi.eseemc.cn/",
            "img": ["/aqi.jpg", "AQI1.webp", "AQI2.webp", "AQI3.jpg", "AQI4.jpg", "AQI5.jpg"]
          },
          {
            "type": "education",
            "title": { en: "Master of Applied Data Science", zh: "应用数据科学硕士" },
            "name": { en: "University of Canterbury", zh: "坎特伯雷大学" },
            "description": { en: "Focus on Data Engineer, Visualisation and Deep Learning.", zh: "专注数据工程、可视化和深度学习" },
            "coordinates": [-43.5232, 172.5835],
            "location": { en: "Christchurch, New Zealand", zh: "新西兰基督城" },
            "year": "2024-2025",
            "link": "https://www.canterbury.ac.nz",
            "img": ["uc-ds-all.jpg", "/hua_presentation.jpg"]
          },
          {
            "type": "education", 
            "title": { en: "Bachelor of Information Technology", zh: "信息技术学士" },
            "name": { en: "Otago Polytechnic", zh: "奥塔哥理工学院" },
            "description": { en: "Graduated with distinction, focuse on Web Development, full stack, and awarded Academic Excellence and Best Programmer.", zh: "优异成绩毕业，专注Web开发和全栈技术，获得学术卓越奖和最佳程序员奖" },
            "coordinates": [-45.8664633, 170.5182829],
            "location": { en: "Dunedin, New Zealand", zh: "新西兰但尼丁" },
            "year": "2017-2021",
            "link": "https://www.op.ac.nz",
            "img": ["awared-best-programmer.jpeg", "awared-excellence.jpeg"]
          },
          {
            "type": "project",
            "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
            "name": { en: "Fenghuangjiayuan", zh: "凤凰嘉苑" },
            "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "使用JavaScript和3D库开发互动360°虚拟漫游应用，支持720度导航探索建筑、房间和户外空间。实现可点击标记和超链接，提供无缝场景切换体验，适配网页和移动平台" },
            "coordinates": [30.2788597, 109.4846285],
            "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
            "year": "2020-2021",
            "link": "",
            "img": "/fhjy.jpg"
          },
          {
            "type": "project",
            "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
            "name": { en: "Lvcheng", zh: "迎宾华府" },
            "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "使用JavaScript和3D库开发互动360°虚拟漫游应用，支持720度导航探索建筑、房间和户外空间。实现可点击标记和超链接，提供无缝场景切换体验，适配网页和移动平台" },
            "coordinates": [39.122386, 116.415274],
            "location": { en: "Langfang, Hebei, China", zh: "中国河北廊坊" },
            "year": "2020-2021",
            "link": "",
            "img": "/ybhf.jpg"
          },
          {
            "type": "project",
            "title": { en: "Interactive 360° Virtual Tour Application", zh: "互动360°虚拟漫游应用" },
            "name": { en: "Jiahe", zh: "雲尚星城" },
            "description": { en: "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.", zh: "使用JavaScript和3D库开发互动360°虚拟漫游应用，支持720度导航探索建筑、房间和户外空间。实现可点击标记和超链接，提供无缝场景切换体验，适配网页和移动平台" },
            "coordinates": [29.688752, 109.149443],
            "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
            "year": "2020-2021",
            "link": "",
            "img": "/ysxc.jpg"
          },
          {
            "type": "project",
            "title": { en: "Tenglong Cave", zh: "腾龙洞" },
            "name": { en: "Tenglong Cave", zh: "腾龙洞" },
            "description": { en: "Official Website", zh: "官方网站" },
            "coordinates": [30.3335111, 108.98434],
            "location": { en: "Lichuan, Hubei, China", zh: "中国湖北利川" },
            "year": "2019",
            "link": "http://tenglongdong.net.cn/",
            "img": "/tld.jpg"
          },
          {
            "type": "project",
            "title": { en: "Badong Tourism Bureau", zh: "巴东县旅游局" },
            "name": { en: "Badong Tourism Bureau", zh: "巴东县旅游局" },
            "description": { en: "Official Website", zh: "官方网站" },
            "coordinates": [31.0419753, 110.3386598],
            "location": { en: "Badong, Hubei, China", zh: "中国湖北巴东" },
            "year": "2019",
            "link": "",
            "img": ""
          },
          {
            "type": "project",
            "title": { en: "Jinguo Tea", zh: "金果茶叶" },
            "name": { en: "Jinguo Tea", zh: "金果茶叶" },
            "description": { en: "Official Website", zh: "官方网站" },
            "coordinates": [30.2889132, 110.2148372],
            "location": { en: "Badong, Hubei, China", zh: "中国湖北巴东" },
            "year": "2019",
            "link": "",
            "img": ""
          },
          {
            "type": "project",
            "title": { en: "Enshi Central Hospital", zh: "恩施州中心医院" },
            "name": { en: "Enshi Central Hospital", zh: "恩施州中心医院" },
            "description": { en: "Official Website", zh: "官方网站" },  
            "coordinates": [30.297884, 109.4955927],
            "location": { en: "Enshi, Hubei, China", zh: "中国湖北恩施" },
            "year": "2019",
            "link": "https://www.es9e.cn/",
            "img": "/es9e.jpg"
          },
          {
            "type": "project",
            "title": { en: "FitsGo", zh: "FitsGo" },
            "name": { en: "Mobile App", zh: "移动应用" },
            "description": { en: "This is a mobile application that aims to help get people to start exercising. This App is a cross-platform application which runs both of Android and IOS. It is built using React-Native and Google Firebase real-time database.", zh: "帮助人们开始锻炼的移动应用。这是一个跨平台应用，支持Android和iOS，使用React-Native和Google Firebase实时数据库构建" },
            "coordinates": [-45.8750186, 170.4973482], 
            "location": { en: "Dunedin, New Zealand", zh: "新西兰但尼丁" },
            "year": "2019",
            "link": "https://github.com/aemooooon/FitsGo",
            "img": ["/fitsgo.gif", "fitsgo-team.jpg"]
          },
          {
            "type": "project",
            "title": { en: "ECAN Data Pipeline", zh: "ECAN数据管道" },
            "name": { en: "University of Canterbury", zh: "坎特伯雷大学" },
            "description": { en: "Developed a system to aggregate data from over 20 sources, then centralized it into a central database. Web API is provided to the front end, enabling analyses and visualizations: Collect more than 20 people's data from the AWS EC2. Built data pipelines using Apache Airfow to automate ETL processes. Stored data in a PostgreSQL database on AWS RDS. Developed a Node.js API with Swagger documentation to serve endpoints. Implemented Python Streamlit and R Shiny dashboard to visualise data.", zh: "开发系统聚合超过20个数据源，集中到中央数据库。提供Web API支持前端分析和可视化。从AWS EC2收集20多人的数据，使用Apache Airflow构建ETL管道，存储到AWS RDS PostgreSQL数据库，开发Node.js API，实现Python Streamlit和R Shiny仪表板" },
            "coordinates": [-43.5357406, 172.6358119],
            "location": { en: "Christchurch, New Zealand", zh: "新西兰基督城" },
            "year": "2024",
            "link": "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
            "img": ["/data472/472.png", "/data472/af01.jpg", "/data472/datapipeline.png", "/data472/FuelPriceData.jpg", "/data472/GasStationData.jpg", "/data472/ProjectManagement.jpg", "/data472/services.png", "/data472/v1.gif", "/data472/v2.gif", "/data472/WebApiResponse.jpg"]
          },
          {
            "type": "activity",
            "title": { en: "Assisted IT Meetups", zh: "协助IT聚会" },
            "name": { en: "CITANZ CHCH Volunteer", zh: "CITANZ基督城志愿者" },
            "description": { en: "Assisted in planning and managing IT community meetups once a month.", zh: "协助规划和管理每月一次的IT社区聚会" },
            "coordinates": [-43.5828903, 172.5695089],
            "location": { en: "Halswell Library, Christchurch", zh: "新西兰基督城Halswell图书馆" },
            "year": "2024-2025",
            "link": "https://www.cita.org.nz/",
            "img": ["cita-02.jpg", "cita-01.jpg", "cita-04.jpg", "cita-03.jpg", "cita-05.jpg"]
          },
          {
            "type": "activity",
            "title": { en: "Save Kiwi", zh: "拯救奇异鸟" },
            "name": { en: "AI Hackathon 2024", zh: "AI黑客松2024" },
            "description": { en: "Design an AI solution to help existing organizations improve maintenance and analysis efficiency to better protect kiwi birds. It uses advanced tech to protect kiwi birds by combining smart cages, edge computing, and cloud analytics. Smart cages with RGB cameras monitor wildlife, while edge computing processes images in real-time using a vision-transformer model. This model distinguishes between kiwi birds, predators, and non-threatening animals. Predators are captured; others are released. Data is sent to a cloud platform for monitoring and alerts, enabling quick conservation responses.", zh: "设计AI解决方案帮助现有组织提高维护和分析效率，更好地保护奇异鸟。结合智能笼子、边缘计算和云分析的先进技术。智能笼子配备RGB摄像头监控野生动物，边缘计算使用视觉变换器模型实时处理图像，区分奇异鸟、捕食者和无害动物。捕获捕食者，释放其他动物。数据发送到云平台进行监控和告警" },
            "coordinates": [-43.5218726, 172.5674936],
            "location": { en: "University of Canterbury, Christchurch", zh: "新西兰基督城坎特伯雷大学" },
            "year": "2024",
            "link": "https://www.cita.org.nz/",
            "img": ["/UC_F4.001.jpeg", "/UC_F4.002.jpeg", "f4.jpg"]
          }
        ],
      
      // Gallery数据配置 - 使用真实照片数据
      gallery: [
        {
          id: 'gallery_1',
          type: 'image',
          src: '/gallery/7dcb188081747fc5b81384021b971f.jpg',
          thumbnail: '/gallery/7dcb188081747fc5b81384021b971f.jpg',
          title: {
            en: 'Abstract Art',
            zh: '抽象艺术'
          },
          description: {
            en: 'Creative abstract visual expression',
            zh: '创意抽象视觉表达'
          },
          date: '2024-01-10',
          tags: ['abstract', 'art']
        },
        {
          id: 'gallery_2',
          type: 'image',
          src: '/gallery/96648350e2b38f1e2fd63d0428c1bb.jpg',
          thumbnail: '/gallery/96648350e2b38f1e2fd63d0428c1bb.jpg',
          title: {
            en: 'Digital Design',
            zh: '数字设计'
          },
          description: {
            en: 'Modern digital design composition',
            zh: '现代数字设计构图'
          },
          date: '2024-01-15',
          tags: ['digital', 'design']
        },
        {
          id: 'gallery_3',
          type: 'image',
          src: '/gallery/Day.jpg',
          thumbnail: '/gallery/Day.jpg',
          title: {
            en: 'Daylight',
            zh: '白昼时光'
          },
          description: {
            en: 'Beautiful day captured in time',
            zh: '时光中捕捉的美好白昼'
          },
          date: '2024-01-20',
          tags: ['day', 'light']
        },
        {
          id: 'gallery_4',
          type: 'image',
          src: '/gallery/andres-iga-7XKkJVw1d8c-unsplash.jpg',
          thumbnail: '/gallery/andres-iga-7XKkJVw1d8c-unsplash.jpg',
          title: {
            en: 'Architectural Beauty',
            zh: '建筑之美'
          },
          description: {
            en: 'Stunning architectural photography',
            zh: '令人惊叹的建筑摄影'
          },
          date: '2024-01-25',
          tags: ['architecture', 'photography']
        },
        {
          id: 'gallery_5',
          type: 'image',
          src: '/gallery/aneta-foubikova-ph-ldDJS6vc-unsplash.jpg',
          thumbnail: '/gallery/aneta-foubikova-ph-ldDJS6vc-unsplash.jpg',
          title: {
            en: 'Nature Portrait',
            zh: '自然写真'
          },
          description: {
            en: 'Beautiful nature composition',
            zh: '美丽的自然构图'
          },
          date: '2024-02-01',
          tags: ['nature', 'portrait']
        },
        {
          id: 'gallery_6',
          type: 'image',
          src: '/gallery/anil-kumar-dBkT44qZD6M-unsplash.jpg',
          thumbnail: '/gallery/anil-kumar-dBkT44qZD6M-unsplash.jpg',
          title: {
            en: 'Landscape Vista',
            zh: '风景远眺'
          },
          description: {
            en: 'Breathtaking landscape view',
            zh: '令人屏息的风景景观'
          },
          date: '2024-02-05',
          tags: ['landscape', 'vista']
        },
        {
          id: 'gallery_7',
          type: 'image',
          src: '/gallery/anugrah-j-3uDPEKGhnOc-unsplash.jpg',
          thumbnail: '/gallery/anugrah-j-3uDPEKGhnOc-unsplash.jpg',
          title: {
            en: 'Creative Perspective',
            zh: '创意视角'
          },
          description: {
            en: 'Unique creative perspective captured',
            zh: '捕捉独特的创意视角'
          },
          date: '2024-02-10',
          tags: ['creative', 'perspective']
        },
        {
          id: 'gallery_8',
          type: 'image',
          src: '/gallery/arno-smit-fwtXC2sP7Tg-unsplash.jpg',
          thumbnail: '/gallery/arno-smit-fwtXC2sP7Tg-unsplash.jpg',
          title: {
            en: 'Urban Scene',
            zh: '城市场景'
          },
          description: {
            en: 'Dynamic urban life captured',
            zh: '捕捉动态的城市生活'
          },
          date: '2024-02-15',
          tags: ['urban', 'scene']
        },
        {
          id: 'gallery_9',
          type: 'image',
          src: '/gallery/behrouz-sasani-XYY5KE1NH84-unsplash.jpg',
          thumbnail: '/gallery/behrouz-sasani-XYY5KE1NH84-unsplash.jpg',
          title: {
            en: 'Artistic Expression',
            zh: '艺术表达'
          },
          description: {
            en: 'Pure artistic expression in visual form',
            zh: '纯粹的视觉艺术表达'
          },
          date: '2024-02-20',
          tags: ['artistic', 'expression']
        },
        {
          id: 'gallery_10',
          type: 'image',
          src: '/gallery/bobbi-wu-bG2rugxelIE-unsplash.jpg',
          thumbnail: '/gallery/bobbi-wu-bG2rugxelIE-unsplash.jpg',
          title: {
            en: 'Modern Aesthetics',
            zh: '现代美学'
          },
          description: {
            en: 'Contemporary aesthetic composition',
            zh: '当代美学构图'
          },
          date: '2024-02-25',
          tags: ['modern', 'aesthetics']
        },
        {
          id: 'gallery_11',
          type: 'image',
          src: '/gallery/casey-horner-O_wC7v1Jh8A-unsplash.jpg',
          thumbnail: '/gallery/casey-horner-O_wC7v1Jh8A-unsplash.jpg',
          title: {
            en: 'Sky Dreams',
            zh: '天空之梦'
          },
          description: {
            en: 'Dreamy sky composition',
            zh: '梦幻般的天空构图'
          },
          date: '2024-03-01',
          tags: ['sky', 'dreams']
        },
        {
          id: 'gallery_12',
          type: 'image',
          src: '/gallery/dan-freeman-hIKVSVKH7No-unsplash.jpg',
          thumbnail: '/gallery/dan-freeman-hIKVSVKH7No-unsplash.jpg',
          title: {
            en: 'Light Study',
            zh: '光影研究'
          },
          description: {
            en: 'Study of light and shadow',
            zh: '光影的研究探索'
          },
          date: '2024-03-05',
          tags: ['light', 'study']
        },
        {
          id: 'gallery_13',
          type: 'image',
          src: '/gallery/daniel-olah-idednB9qCrA-unsplash.jpg',
          thumbnail: '/gallery/daniel-olah-idednB9qCrA-unsplash.jpg',
          title: {
            en: 'Geometric Harmony',
            zh: '几何和谐'
          },
          description: {
            en: 'Perfect geometric composition',
            zh: '完美的几何构图'
          },
          date: '2024-03-10',
          tags: ['geometric', 'harmony']
        },
        {
          id: 'gallery_14',
          type: 'image',
          src: '/gallery/enzo-tommasi-wlxJ4idMTUk-unsplash.jpg',
          thumbnail: '/gallery/enzo-tommasi-wlxJ4idMTUk-unsplash.jpg',
          title: {
            en: 'Minimalist Beauty',
            zh: '极简之美'
          },
          description: {
            en: 'Beauty in minimalist design',
            zh: '极简设计中的美感'
          },
          date: '2024-03-15',
          tags: ['minimalist', 'beauty']
        },
        {
          id: 'gallery_15',
          type: 'image',
          src: '/gallery/fakurian-design-T9coXSt9Qfw-unsplash.jpg',
          thumbnail: '/gallery/fakurian-design-T9coXSt9Qfw-unsplash.jpg',
          title: {
            en: 'Digital Art',
            zh: '数字艺术'
          },
          description: {
            en: 'Innovative digital art creation',
            zh: '创新数字艺术创作'
          },
          date: '2024-03-20',
          tags: ['digital', 'art']
        },
        {
          id: 'gallery_16',
          type: 'image',
          src: '/gallery/fakurian-design-bMSA5-tLFao-unsplash.jpg',
          thumbnail: '/gallery/fakurian-design-bMSA5-tLFao-unsplash.jpg',
          title: {
            en: 'Abstract Vision',
            zh: '抽象视觉'
          },
          description: {
            en: 'Unique abstract visual interpretation',
            zh: '独特的抽象视觉诠释'
          },
          date: '2024-03-25',
          tags: ['abstract', 'vision']
        },
        {
          id: 'gallery_17',
          type: 'image',
          src: '/gallery/felix-dubois-robert-CuEvrPd3NYc-unsplash.jpg',
          thumbnail: '/gallery/felix-dubois-robert-CuEvrPd3NYc-unsplash.jpg',
          title: {
            en: 'Color Symphony',
            zh: '色彩交响'
          },
          description: {
            en: 'Beautiful symphony of colors',
            zh: '美丽的色彩交响曲'
          },
          date: '2024-03-30',
          tags: ['color', 'symphony']
        },
        {
          id: 'gallery_18',
          type: 'image',
          src: '/gallery/howard-follas-vNyakcotFHc-unsplash.jpg',
          thumbnail: '/gallery/howard-follas-vNyakcotFHc-unsplash.jpg',
          title: {
            en: 'Texture Study',
            zh: '纹理研究'
          },
          description: {
            en: 'Detailed texture exploration',
            zh: '详细的纹理探索'
          },
          date: '2024-04-01',
          tags: ['texture', 'study']
        },
        {
          id: 'gallery_19',
          type: 'image',
          src: '/gallery/james-coleman-48Ex3a6HXVA-unsplash.jpg',
          thumbnail: '/gallery/james-coleman-48Ex3a6HXVA-unsplash.jpg',
          title: {
            en: 'Natural Wonder',
            zh: '自然奇观'
          },
          description: {
            en: 'Amazing natural phenomenon',
            zh: '令人惊叹的自然现象'
          },
          date: '2024-04-05',
          tags: ['natural', 'wonder']
        },
        {
          id: 'gallery_20',
          type: 'image',
          src: '/gallery/javier-miranda-usTxwR91WLw-unsplash.jpg',
          thumbnail: '/gallery/javier-miranda-usTxwR91WLw-unsplash.jpg',
          title: {
            en: 'Dynamic Flow',
            zh: '动态流动'
          },
          description: {
            en: 'Capturing dynamic movement',
            zh: '捕捉动态的流动'
          },
          date: '2024-04-10',
          tags: ['dynamic', 'flow']
        },
        {
          id: 'gallery_21',
          type: 'image',
          src: '/gallery/jennifer-chen-Pnc2Uxb7PG0-unsplash.jpg',
          thumbnail: '/gallery/jennifer-chen-Pnc2Uxb7PG0-unsplash.jpg',
          title: {
            en: 'Serene Moment',
            zh: '宁静时刻'
          },
          description: {
            en: 'Peaceful and serene composition',
            zh: '平静祥和的构图'
          },
          date: '2024-04-15',
          tags: ['serene', 'peaceful']
        },
        {
          id: 'gallery_22',
          type: 'image',
          src: '/gallery/jesse-rohr-DSgtLct3fvg-unsplash.jpg',
          thumbnail: '/gallery/jesse-rohr-DSgtLct3fvg-unsplash.jpg',
          title: {
            en: 'Atmospheric Mood',
            zh: '氛围情调'
          },
          description: {
            en: 'Capturing atmospheric mood',
            zh: '捕捉氛围情调'
          },
          date: '2024-04-20',
          tags: ['atmospheric', 'mood']
        },
        {
          id: 'gallery_23',
          type: 'image',
          src: '/gallery/joel-muniz-6YuZGpp1l1s-unsplash.jpg',
          thumbnail: '/gallery/joel-muniz-6YuZGpp1l1s-unsplash.jpg',
          title: {
            en: 'Visual Rhythm',
            zh: '视觉韵律'
          },
          description: {
            en: 'Rhythmic visual composition',
            zh: '富有韵律的视觉构图'
          },
          date: '2024-04-25',
          tags: ['visual', 'rhythm']
        },
        {
          id: 'gallery_24',
          type: 'image',
          src: '/gallery/ken-cheung-KonWFWUaAuk-unsplash.jpg',
          thumbnail: '/gallery/ken-cheung-KonWFWUaAuk-unsplash.jpg',
          title: {
            en: 'Street Photography',
            zh: '街头摄影'
          },
          description: {
            en: 'Candid street photography moment',
            zh: '真实的街头摄影瞬间'
          },
          date: '2024-04-30',
          tags: ['street', 'photography']
        },
        {
          id: 'gallery_25',
          type: 'image',
          src: '/gallery/kevin-grieve-7hnYSWgXmrs-unsplash.jpg',
          thumbnail: '/gallery/kevin-grieve-7hnYSWgXmrs-unsplash.jpg',
          title: {
            en: 'Ocean Waves',
            zh: '海浪波涛'
          },
          description: {
            en: 'Powerful ocean wave capture',
            zh: '强劲海浪的捕捉'
          },
          date: '2024-05-01',
          tags: ['ocean', 'waves']
        },
        {
          id: 'gallery_26',
          type: 'image',
          src: '/gallery/kino-vn-vGpwUjqRHYo-unsplash.jpg',
          thumbnail: '/gallery/kino-vn-vGpwUjqRHYo-unsplash.jpg',
          title: {
            en: 'Peaceful Moment',
            zh: '宁静时光'
          },
          description: {
            en: 'Serenity in nature',
            zh: '自然中的宁静'
          },
          date: '2024-05-05',
          tags: ['nature', 'peaceful']
        },
        {
          id: 'gallery_27',
          type: 'image',
          src: '/gallery/li-yang-5h_dMuX_7RE-unsplash.jpg',
          thumbnail: '/gallery/li-yang-5h_dMuX_7RE-unsplash.jpg',
          title: {
            en: 'Mountain Peak',
            zh: '山峰高耸'
          },
          description: {
            en: 'Majestic mountain peak view',
            zh: '雄伟的山峰景观'
          },
          date: '2024-05-10',
          tags: ['mountain', 'peak']
        },
        {
          id: 'gallery_28',
          type: 'image',
          src: '/gallery/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg',
          thumbnail: '/gallery/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg',
          title: {
            en: 'Forest Path',
            zh: '森林小径'
          },
          description: {
            en: 'Mysterious forest pathway',
            zh: '神秘的森林小径'
          },
          date: '2024-05-15',
          tags: ['forest', 'path']
        },
        {
          id: 'gallery_29',
          type: 'image',
          src: '/gallery/martin-katler-UQb5qyQflRc-unsplash.jpg',
          thumbnail: '/gallery/martin-katler-UQb5qyQflRc-unsplash.jpg',
          title: {
            en: 'Pattern Study',
            zh: '图案研究'
          },
          description: {
            en: 'Intricate pattern exploration',
            zh: '复杂图案的探索'
          },
          date: '2024-05-20',
          tags: ['pattern', 'study']
        },
        {
          id: 'gallery_30',
          type: 'image',
          src: '/gallery/martin-katler-mrv5zYCBRs4-unsplash.jpg',
          thumbnail: '/gallery/martin-katler-mrv5zYCBRs4-unsplash.jpg',
          title: {
            en: 'Structural Design',
            zh: '结构设计'
          },
          description: {
            en: 'Elegant structural composition',
            zh: '优雅的结构构图'
          },
          date: '2024-05-25',
          tags: ['structural', 'design']
        },
        {
          id: 'gallery_31',
          type: 'image',
          src: '/gallery/martin-katler-zwmP9_b5HCs-unsplash.jpg',
          thumbnail: '/gallery/martin-katler-zwmP9_b5HCs-unsplash.jpg',
          title: {
            en: 'Geometric Beauty',
            zh: '几何之美'
          },
          description: {
            en: 'Beautiful geometric patterns',
            zh: '美丽的几何图案'
          },
          date: '2024-05-30',
          tags: ['geometric', 'beauty']
        },
        {
          id: 'gallery_32',
          type: 'image',
          src: '/gallery/nate-johnston-6ajf6BAyYt4-unsplash.jpg',
          thumbnail: '/gallery/nate-johnston-6ajf6BAyYt4-unsplash.jpg',
          title: {
            en: 'Sunset Glow',
            zh: '日落余晖'
          },
          description: {
            en: 'Beautiful sunset reflection',
            zh: '美丽的日落倒影'
          },
          date: '2024-06-01',
          tags: ['sunset', 'glow']
        },
        {
          id: 'gallery_33',
          type: 'image',
          src: '/gallery/olga-zabegina-A3MleA0jtoE-unsplash.jpg',
          thumbnail: '/gallery/olga-zabegina-A3MleA0jtoE-unsplash.jpg',
          title: {
            en: 'Golden Hour',
            zh: '黄金时光'
          },
          description: {
            en: 'Beauty in the golden light',
            zh: '金色光芒中的美丽'
          },
          date: '2024-06-05',
          tags: ['light', 'beauty']
        },
        {
          id: 'gallery_34',
          type: 'image',
          src: '/gallery/partha-narasimhan-x0NvSdPk404-unsplash.jpg',
          thumbnail: '/gallery/partha-narasimhan-x0NvSdPk404-unsplash.jpg',
          title: {
            en: 'Cosmic Wonder',
            zh: '宇宙奇观'
          },
          description: {
            en: 'Mesmerizing cosmic view',
            zh: '迷人的宇宙景观'
          },
          date: '2024-06-10',
          tags: ['cosmic', 'wonder']
        },
        {
          id: 'gallery_35',
          type: 'image',
          src: '/gallery/peter-hammer-v2lJbPVMqr8-unsplash.jpg',
          thumbnail: '/gallery/peter-hammer-v2lJbPVMqr8-unsplash.jpg',
          title: {
            en: 'Industrial Beauty',
            zh: '工业之美'
          },
          description: {
            en: 'Beauty in industrial design',
            zh: '工业设计中的美感'
          },
          date: '2024-06-15',
          tags: ['industrial', 'beauty']
        },
        {
          id: 'gallery_36',
          type: 'image',
          src: '/gallery/scott-webb--hvTUoiWuNg-unsplash.jpg',
          thumbnail: '/gallery/scott-webb--hvTUoiWuNg-unsplash.jpg',
          title: {
            en: 'Water Reflection',
            zh: '水中倒影'
          },
          description: {
            en: 'Perfect water reflection capture',
            zh: '完美的水中倒影捕捉'
          },
          date: '2024-06-20',
          tags: ['water', 'reflection']
        },
        {
          id: 'gallery_37',
          type: 'image',
          src: '/gallery/serjan-midili-0dZ9uZo3EPo-unsplash.jpg',
          thumbnail: '/gallery/serjan-midili-0dZ9uZo3EPo-unsplash.jpg',
          title: {
            en: 'Atmospheric Light',
            zh: '大气光线'
          },
          description: {
            en: 'Stunning atmospheric lighting',
            zh: '令人惊叹的大气光线'
          },
          date: '2024-06-25',
          tags: ['atmospheric', 'light']
        },
        {
          id: 'gallery_38',
          type: 'image',
          src: '/gallery/shubham-dhage-80FNtdZ6L98-unsplash.jpg',
          thumbnail: '/gallery/shubham-dhage-80FNtdZ6L98-unsplash.jpg',
          title: {
            en: 'Space Art',
            zh: '太空艺术'
          },
          description: {
            en: 'Artistic space composition',
            zh: '艺术化的太空构图'
          },
          date: '2024-06-30',
          tags: ['space', 'art']
        },
        {
          id: 'gallery_39',
          type: 'image',
          src: '/gallery/shubham-dhage-CWTaWrjd1c8-unsplash.jpg',
          thumbnail: '/gallery/shubham-dhage-CWTaWrjd1c8-unsplash.jpg',
          title: {
            en: 'Digital Universe',
            zh: '数字宇宙'
          },
          description: {
            en: 'Digital interpretation of universe',
            zh: '宇宙的数字化诠释'
          },
          date: '2024-07-01',
          tags: ['digital', 'universe']
        },
        {
          id: 'gallery_40',
          type: 'image',
          src: '/gallery/shubham-dhage-OB-V7HM4wds-unsplash.jpg',
          thumbnail: '/gallery/shubham-dhage-OB-V7HM4wds-unsplash.jpg',
          title: {
            en: 'Cosmic Energy',
            zh: '宇宙能量'
          },
          description: {
            en: 'Dynamic cosmic energy visualization',
            zh: '动态宇宙能量可视化'
          },
          date: '2024-07-05',
          tags: ['cosmic', 'energy']
        },
        {
          id: 'gallery_41',
          type: 'image',
          src: '/gallery/tobias-keller-73F4pKoUkM0-unsplash.jpg',
          thumbnail: '/gallery/tobias-keller-73F4pKoUkM0-unsplash.jpg',
          title: {
            en: 'Nature Abstract',
            zh: '自然抽象'
          },
          description: {
            en: 'Abstract interpretation of nature',
            zh: '自然的抽象诠释'
          },
          date: '2024-07-10',
          tags: ['nature', 'abstract']
        },
        {
          id: 'gallery_42',
          type: 'image',
          src: '/gallery/vadim-bogulov-krgb_3HIkME-unsplash.jpg',
          thumbnail: '/gallery/vadim-bogulov-krgb_3HIkME-unsplash.jpg',
          title: {
            en: 'Adventure Spirit',
            zh: '冒险精神'
          },
          description: {
            en: 'Embracing new challenges',
            zh: '拥抱新挑战'
          },
          date: '2024-07-15',
          tags: ['adventure', 'spirit']
        },
        {
          id: 'gallery_43',
          type: 'image',
          src: '/gallery/zhang-kaiyv-97VDbiTKEQk-unsplash.jpg',
          thumbnail: '/gallery/zhang-kaiyv-97VDbiTKEQk-unsplash.jpg',
          title: {
            en: 'Urban Exploration',
            zh: '城市探索'
          },
          description: {
            en: 'Discovering city secrets',
            zh: '发现城市秘密'
          },
          date: '2024-07-20',
          tags: ['urban', 'exploration']
        },
        {
          id: 'gallery_44',
          type: 'image',
          src: '/gallery/zhou-xuan-5ZE7szQ0hqc-unsplash.jpg',
          thumbnail: '/gallery/zhou-xuan-5ZE7szQ0hqc-unsplash.jpg',
          title: {
            en: 'Zen Moment',
            zh: '禅意时刻'
          },
          description: {
            en: 'Peaceful zen-like composition',
            zh: '宁静禅意的构图'
          },
          date: '2024-07-25',
          tags: ['zen', 'peaceful']
        }
      ],
      
      // 项目数据访问方法
      getProjectsByType: (type) => {
        const { projects } = get();
        return projects.filter(project => project.type === type);
      },
      
      getAllProjects: () => {
        const { projects } = get();
        return projects;
      },
      
      // Gallery数据访问方法
      getAllGalleryItems: () => {
        const { gallery } = get();
        return gallery;
      },
      
      getGalleryItemsByTag: (tag) => {
        const { gallery } = get();
        return gallery.filter(item => 
          item.tags && item.tags.includes(tag)
        );
      },
      
      getGalleryItemsByType: (type) => {
        const { gallery } = get();
        return gallery.filter(item => item.type === type);
      },
      
      searchGalleryItems: (query, language = 'en') => {
        const { gallery } = get();
        const lowercaseQuery = query.toLowerCase();
        return gallery.filter(item => 
          item.title[language].toLowerCase().includes(lowercaseQuery) ||
          item.description[language].toLowerCase().includes(lowercaseQuery) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
        );
      },
      
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

      // 导航到指定区块 - 增加方向跟踪
      navigateToSection: (index) => {
        const { currentSection, sections } = get();
        const direction = index > currentSection ? 'from-prev' : 'from-next';
        
        // 更新当前section的配置，包含导航方向信息
        const updatedSections = sections.map((section, i) => 
          i === index ? { ...section, previousDirection: direction } : section
        );
        
        set({ 
          currentSection: index,
          isScrolling: true,
          sections: updatedSections
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
