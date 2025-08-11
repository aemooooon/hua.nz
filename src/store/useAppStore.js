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
    name: { en: "Corridor of Light and Shadow", zh: "浮生长廊" },
    description: { en: "Immersive 3D art experience", zh: "沉浸式3D艺术体验" },
    backgroundEffect: "effectmonjori", // 使用与 Projects 相同的 Monjori 背景
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
      subtitle: "Each project represents a unique challenge and learning journey",
      description: "From Full Stack Web Development to 3D immersive experiences, from computer science to data science, to computer graphics — explore the diverse technology and solutions. Language-agnostic, platform-independent, framework-flexible.",
      viewProject: "View Project",
      learnMore: "Learn more →",
      technologies: "Technologies",
      totalProjects: "Total Projects",
      exploreMap: "Map View",
      exploreMapTooltip: "Explore Projects on Interactive Map",
      showing: "Showing",
      viewDetails: "View Details",
      liveDemo: "Live Demo",
      // 项目详情相关文本
      detail: {
        technologyStack: "Technology Stack",
        projectStatistics: "Project Statistics", 
        subProjects: "Sub Projects",
        visitSite: "Visit Site",
        closeModal: "Close modal"
      },
      // 项目过滤相关文本
      filter: {
        allProjects: "All Projects"
      },
      // 地图相关文本
      map: {
        resetToDefaultView: "Reset to default view",
        closeMap: "Close map",
        title: "Project Geo Distribution"
      }
    },
    gallery: {
      title: "Photo Gallery",
      subtitle: "Visual journey through my work and experiences",
      description: "A curated collection of visual projects and creative works.",
      viewImage: "View Image",
      // 3D Gallery 配置
      gallery3D: {
        title: "Corridor of Light and Shadow",
        subtitle: "Immersive 3D Art Experience",
        description: "Enter a professionally curated virtual gallery space showcasing visual works in an interactive 3D environment.",
        instructions: {
          clickToStart: "Click to enter the gallery",
          navigation: {
            movement: "Movement Navigation",
            wasd: "WASD / Arrow Keys - Move through the gallery",
            mouse: "Mouse - Look around and explore",
            esc: "ESC - Exit pointer lock mode"
          },
          experience: {
            title: "Gallery Features",
            lighting: "Professional museum lighting system",
            layout: "Curated artwork placement and spacing",
            interaction: "First-person exploration experience"
          }
        }
      }
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's discuss your next project",
      description: "Get in touch for opportunities, collaborations, or just to say hello.",
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
      subtitle: "academic background",
      labels: {
        academicRecords: "Academic Records",
        totalCredits: "Total Credits",
        gpa: "GPA",
        totalCourses: "Total Courses",
        capstoneProjects: "Capstone Projects",
        academicAwards: "Academic Awards",
        academicExcellenceAward: "Academic Excellence Award",
        withDistinction: "with Distinction",
        level: "Level",
        credits: "Credits"
      },
      degrees: [
        {
          id: "masters",
          degree: "Master of Applied Data Science",
          degreeHonor: true,
          institution: "University of Canterbury",
          location: "Christchurch, New Zealand",
          period: "Feb 2024 - Feb 2025",
          gpa: "A average",
          totalCredits: 180,
          courses: [
            {
              year: "2024",
              semester: "Semester 1",
              courses: [
                
                { code: "DATA401", name: "Introduction to Data Science", credits: 15, grade: "A", level: 4 },
                { code: "DIGI405", name: "Texts, Discourses and Data: the Humanities and Data Science", credits: 15, grade: "A-", level: 4 },
                { code: "DATA472", name: "Based cloud computing and infrastructure data engineering", credits: 15, grade: "A+", level: 4 },
                { code: "DATA416", name: "Contemporary Issues in Data Science", credits: 15, grade: "A+", level: 4 }
              ]
            },
            {
              year: "2024",
              semester: "Semester 2", 
              courses: [
                { code: "COSC473", name: "Decentralised Applications on the Web", credits: 15, grade: "A-", level: 4 },
                { code: "COSC440", name: "Deep Learning", credits: 15, grade: "A+", level: 4 },
                { code: "DATA420", name: "Scalable Data Science", credits: 15, grade: "A-", level: 4 },
                { code: "DATA415", name: "Computational Social Choice", credits: 15, grade: "A", level: 4 },
                { code: "GISC412", name: "Spatial Data Science", credits: 15, grade: "A", level: 4 }
              ]
            },
            {
              year: "2024 - 2025",
              semester: "Summer",
              courses: [
                { code: "DATA605", name: "Applied Data Science Industry Research Project · Zespri International", credits: 45, grade: "A+", level: 6 },
              ]
            }
          ],
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
              name: "ECAN Data Pipeline",
              description: "A collaborative cloud-based automation system for collecting and processing environmental data from 17 different sources.",
              technologies: ["Apache Airflow", "Python", "GraphQL", "AWS"],
              githubUrl: "https://github.com/aemooooon/data-pipeline",
              image: "/aqi/Overview.png"
            }
          ]
        },
        {
          id: "bachelors",
          degree: "Bachelor of Information Technology",
          degreeHonor: true,
          institution: "Otago Polytechnic", 
          location: "Dunedin, New Zealand",
          period: "July 2017 - June 2021",
          gpa: "A average",
          totalCredits: 360,
          courses: [
            {
              year: "2017",
              semester: "Year 1",
              courses: [
                { code: "IN501001", name: "Professional Practice for Information Technology", credits: 15, grade: "B+", level: 5 },
                { code: "IN510001", name: "Programming 1", credits: 15, grade: "A+", level: 5 },
                { code: "IN520001", name: "PC Maintenance", credits: 15, grade: "A+", level: 5 },
                { code: "IN521001", name: "Maths For IT", credits: 15, grade: "A+", level: 5 }
              ]
            },
            {
              year: "2018", 
              semester: "Year 2",
              courses: [
                { code: "IN505001", name: "Introduction to Systems Analysis", credits: 15, grade: "A+", level: 5 },
                { code: "IN511001", name: "Programming 2", credits: 15, grade: "A+", level: 5 },
                { code: "IN512001", name: "Web 1 - Technology and Development", credits: 15, grade: "A+", level: 5 },
                { code: "IN515001", name: "Introduction to Networks", credits: 15, grade: "A+", level: 5 },
                { code: "IN605001", name: "Databases 2", credits: 15, grade: "A+", level: 6 },
                { code: "IN610001", name: "Programming 3", credits: 15, grade: "A+", level: 6 },
                { code: "IN612001", name: "Web 2 - Programming", credits: 15, grade: "A+", level: 6 },
                { code: "IN617001", name: "Linux Operating Systems - Ubuntu", credits: 15, grade: "A+", level: 6 }
              ]
            },
            {
              year: "2019",
              semester: "Year 3", 
              courses: [
                { code: "IN602001", name: "Software Engineering", credits: 15, grade: "A-", level: 6 },
                { code: "IN628002", name: "Programming 4", credits: 15, grade: "A+", level: 6 },
                { code: "IN700001", name: "Project 1", credits: 15, grade: "A+", level: 7 },
                { code: "IN705002", name: "Databases 3", credits: 15, grade: "A+", level: 7 },
                { code: "IN711001", name: "Algorithms and Data Structures", credits: 15, grade: "A", level: 7 },
                { code: "IN712001", name: "Web 3 - Enterprise Development", credits: 15, grade: "A-", level: 7 },
                { code: "IN719001", name: "Systems Administration", credits: 15, grade: "A", level: 7 },
                { code: "IN720001", name: "Administering a Virtual Infrastructure", credits: 15, grade: "A", level: 7 }
              ]
            },
            {
              year: "2021",
              semester: "Year 4",
              courses: [
                { code: "IN608001", name: "Intermediate Application Development Concepts", credits: 15, grade: "A+", level: 6 },
                { code: "IN721001", name: "Mobile Application Development", credits: 15, grade: "A+", level: 7 },
                { code: "IN730151", name: "Year Three Special Topic", credits: 15, grade: "A+", level: 7 },
                { code: "IN732001", name: "Studio 6", credits: 15, grade: "Passed", level: 7 }
              ]
            }
          ],
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
              image: "/TravelAssistant.jpg"
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
      subtitle: "每个项目都代表着独特的挑战和学习之旅",
      description: "从全栈Web开发到3D沉浸式体验，从计算机科学到数据科学，到计算机图形学——探索多样的技术与解决方案。语言无关，平台独立，框架灵活。",
      viewProject: "查看项目",
      learnMore: "了解更多 →",
      technologies: "技术栈",
      totalProjects: "总项目数",
      exploreMap: "地图",
      exploreMapTooltip: "在交互地图上探索项目",
      showing: "显示",
      viewDetails: "查看详情",
      liveDemo: "在线演示",
      // 项目详情相关文本
      detail: {
        technologyStack: "技术栈",
        projectStatistics: "项目统计", 
        subProjects: "子项目",
        visitSite: "访问网站",
        closeModal: "关闭弹窗"
      },
      // 项目过滤相关文本
      filter: {
        allProjects: "全部项目"
      },
      // 地图相关文本
      map: {
        resetToDefaultView: "重置到默认视图",
        closeMap: "关闭地图",
        title: "项目地理分布"
      }
    },
    gallery: {
      title: "照片画廊",
      subtitle: "通过视觉展示我的工作和经历",
      description: "精心策划的视觉项目和创意作品集合。",
      viewImage: "查看图片",
      // 3D Gallery 配置
      gallery3D: {
        title: "浮生长廊",
        subtitle: "沉浸式3D艺术体验",
        description: "步入专业策展的虚拟画廊空间，在交互式3D环境中欣赏视觉作品。",
        instructions: {
          clickToStart: "点击进入画廊",
          navigation: {
            movement: "移动导航",
            wasd: "WASD / 方向键 - 在画廊中移动",
            mouse: "鼠标 - 环视和探索",
            esc: "ESC - 退出指针锁定模式"
          },
          experience: {
            title: "画廊特色",
            lighting: "专业美术馆照明系统",
            layout: "精心策划的艺术品布局",
            interaction: "第一人称沉浸式体验"
          }
        }
      }
    },
    contact: {
      title: "青鸟殷勤",
      subtitle: "共商鸿猷",
      description: "倘蒙垂询，或谋事，或叙契，一函可达。",
      location: "新西兰",
      emailAddress: "aemooooon@gmail.com",
      phone: "+64 21 037 0520",
      connectWithMe: "社交媒体",
      lookingForward: "翘盼汝之玉音！",
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
          description: "基督之城"
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
      title: "修业之路",
      subtitle: "杏坛踪迹",
      labels: {
        academicRecords: "学术记录",
        totalCredits: "总学分",
        gpa: "平均成绩",
        totalCourses: "课程总数",
        capstoneProjects: "毕业项目",
        academicAwards: "学术奖项",
        academicExcellenceAward: "学术优秀奖",
        withDistinction: "优等荣誉",
        level: "等级",
        credits: "学分"
      },
      degrees: [
        {
          id: "masters",
          degree: "应用数据科学硕士学位",
          degreeHonor: true,
          institution: "坎特伯雷大学",
          location: "新西兰基督城",
          period: "2024年2月 - 2025年2月",
          gpa: "A",
          totalCredits: 180,
          courses: [
            {
              year: "2024",
              semester: "第一学期",
              courses: [
                
                { code: "DATA401", name: "数据科学导论", credits: 15, grade: "A", level: 4 },
                { code: "DATA416", name: "数据科学当代问题", credits: 15, grade: "A+", level: 4 },
                { code: "DIGI405", name: "人文学科与数据科学", credits: 15, grade: "A-", level: 4 },
                { code: "DATA472", name: "基于云基础架构的数据工程", credits: 15, grade: "A+", level: 4 },
              ]
            },
            {
              year: "2024",
              semester: "第二学期", 
              courses: [
                { code: "COSC473", name: "Web3，区块链及去中心化应用", credits: 15, grade: "A-", level: 4 },
                { code: "DATA420", name: "可扩展数据科学", credits: 15, grade: "A-", level: 4 },
                { code: "COSC440", name: "深度学习", credits: 15, grade: "A+", level: 4 },
                { code: "DATA415", name: "计算社会选择", credits: 15, grade: "A", level: 4 },
                { code: "GISC412", name: "空间数据科学", credits: 15, grade: "A", level: 4 }
              ]
            },
            {
              year: "2024 Summer",
              semester: "2024-2025 暑假",
              courses: [
                { code: "DATA605", name: "应用数据科学行业研究项目 · 佳沛国际", credits: 45, grade: "A+", level: 6 },
              ]
            }
          ],
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
          degree: "信息技术学士学位",
          degreeHonor: true,
          institution: "奥塔哥理工学院",
          location: "新西兰达尼丁", 
          period: "2017年7月 - 2021年6月",
          gpa: "A-平均成绩",
          totalCredits: 360,
          courses: [
            {
              year: "2017",
              semester: "第一年",
              courses: [
                { code: "IN501001", name: "信息技术专业实践", credits: 15, grade: "B+", level: 5 },
                { code: "IN510001", name: "程序设计 1", credits: 15, grade: "A+", level: 5 },
                { code: "IN520001", name: "计算机维护", credits: 15, grade: "A+", level: 5 },
                { code: "IN521001", name: "IT数学", credits: 15, grade: "A+", level: 5 }
              ]
            },
            {
              year: "2018", 
              semester: "第二年",
              courses: [
                { code: "IN505001", name: "系统分析导论", credits: 15, grade: "A+", level: 5 },
                { code: "IN511001", name: "程序设计 2", credits: 15, grade: "A+", level: 5 },
                { code: "IN512001", name: "Web技术与开发", credits: 15, grade: "A+", level: 5 },
                { code: "IN515001", name: "网络导论", credits: 15, grade: "A+", level: 5 },
                { code: "IN605001", name: "数据库 2", credits: 15, grade: "A+", level: 6 },
                { code: "IN610001", name: "程序设计 3", credits: 15, grade: "A+", level: 6 },
                { code: "IN612001", name: "Web程序设计", credits: 15, grade: "A+", level: 6 },
                { code: "IN617001", name: "Linux操作系统", credits: 15, grade: "A+", level: 6 }
              ]
            },
            {
              year: "2019",
              semester: "第三年", 
              courses: [
                { code: "IN602001", name: "软件工程", credits: 15, grade: "A-", level: 6 },
                { code: "IN628002", name: "程序设计 4", credits: 15, grade: "A+", level: 6 },
                { code: "IN700001", name: "项目 1", credits: 15, grade: "A+", level: 7 },
                { code: "IN705002", name: "数据库 3", credits: 15, grade: "A+", level: 7 },
                { code: "IN711001", name: "算法与数据结构", credits: 15, grade: "A", level: 7 },
                { code: "IN712001", name: "企业Web开发", credits: 15, grade: "A-", level: 7 },
                { code: "IN719001", name: "系统管理", credits: 15, grade: "A", level: 7 },
                { code: "IN720001", name: "虚拟基础设施管理", credits: 15, grade: "A", level: 7 }
              ]
            },
            {
              year: "2021",
              semester: "第四年",
              courses: [
                { code: "IN608001", name: "中级应用开发概念", credits: 15, grade: "A+", level: 6 },
                { code: "IN721001", name: "移动应用开发", credits: 15, grade: "A+", level: 7 },
                { code: "IN730151", name: "三年级特殊主题", credits: 15, grade: "A+", level: 7 },
                { code: "IN732001", name: "工作室 6", credits: 15, grade: "通过", level: 7 }
              ]
            }
          ],
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

      // 主题状态 - 使用新的主题名称
      theme: 'nz-blue',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const themes = ['nz-blue', 'si-green'];
        return set((state) => {
          const currentIndex = themes.indexOf(state.theme);
          const nextIndex = (currentIndex + 1) % themes.length;
          return { theme: themes[nextIndex] };
        });
      },

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

      // Modal 状态管理
      selectedProject: null,
      isProjectModalOpen: false,
      setSelectedProject: (project) => set({
        selectedProject: project,
        isProjectModalOpen: !!project
      }),
      closeProjectModal: () => set({
        selectedProject: null,
        isProjectModalOpen: false
      }),

      // 配置数据
      sections: sectionsConfig,

      // 多语言文本内容
      texts: contentConfig,

      // 项目数据 for card view
      projects: [
        {
          "type": "Full Stack",
          "title": "Software Engineer",
          "name": "Zespri International",
          "description": {
            "en": "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.",
            "zh": "构建了ETL数据管道并开发了基于GIS的交互式Web应用程序，用于果园采样优化。"
          },
          "coordinates": [-37.7866, 176.4416],
          "location": "Bay of Plenty, New Zealand",
          "year": "2024-2025",
          "link": "https://www.zespri.com",
          "img": "/zespri_poster.png"
        },
        {
          "type": "Full Stack",
          "title": "Software Engineer",
          "name": "Realibox",
          "description": "Developed and maintained the central hub for Realibox’s 3D assets, using React with a WebGL-based library for the frontend and Node.js/Python for the backend. Implemented CI/CD pipelines using GitLab for code integration and deployment. Worked in an Agile environment, collaborating closely with PMs, QAs, and Designers to ensure feature delivery aligned with requirements.",
          "coordinates": [22.9951158, 113.3335372],
          "location": "Guangzhou, China",
          "year": "2021-2023",
          "link": "https://hub.realibox.com/",
          "img": ["/realibox-00.jpg", "realibox-01.jpeg"]
        },
        {
          "type": "Full Stack",
          "title": "Full Stack Developer",  
          "name": "Real-time Air Quality Index Publish Platform",
          "description": {
            "en": "Developed a real-time Air Quality Index dashboard for a population of 5 million, involving an ETL workflow to extract XML data from a third-party Web service on schedule, transform it into structured objects, and load it into a MySQL database. The backend, built with Java Spring Boot, provided RESTful APIs for data access, while the front end, developed using React and EChart, visualized AQI trends and geographic distributions through interactive and dynamic charts.",
            "zh": "为500万人口开发实时空气质量指数仪表板，构建ETL工作流程，定期从第三方Web服务提取XML数据，将其转换为结构化对象并加载到MySQL数据库中。后端使用Java Spring Boot构建，提供RESTful API进行数据访问，前端使用React和EChart开发，通过交互式动态图表可视化AQI趋势和地理分布。"
          },
          "coordinates": [30.311395, 109.4795951],
          "location": "Enshi, Hubei, China",
          "year": "2020",
          "link": "https://aqi.eseemc.cn/",
          "img": ["/aqi.jpg", "AQI1.webp", "AQI2.webp", "AQI3.jpg", "AQI4.jpg", "AQI5.jpg"]
        },
        {
          "type": "VR/360°",
          "title": "Interactive 360° Virtual Tour Platform",
          "name": "Real Estate VR Solutions",
          "description": {
            "en": "Developed a comprehensive 360° virtual tour platform for real estate marketing, serving 18+ property developments across China. Built using JavaScript and WebGL-based 3D libraries, enabling immersive panoramic exploration of buildings, rooms, and outdoor spaces. Implemented advanced features including clickable hotspots, scene transitions, interactive floor plans, and cross-platform compatibility for web and mobile devices. The platform helped property developers showcase their projects remotely, significantly reducing on-site visits while maintaining high engagement rates.",
            "zh": "开发了全面的360°虚拟看房平台，为中国18+个房地产项目提供营销服务。使用JavaScript和基于WebGL的3D库构建，实现对建筑、房间和户外空间的沉浸式全景探索。实现了先进功能，包括可点击热点、场景切换、交互式户型图以及Web和移动设备的跨平台兼容性。该平台帮助房地产开发商远程展示项目，大大减少了实地看房，同时保持高参与度。"
          },
          "coordinates": [30.2888597, 109.4846285],
          "location": "Multiple locations across China",
          "year": "2020-2021",
          "link": "",
          "img": ["/fhjy.jpg", "/changpingli.jpg", "/dalincheng.jpg", "/gyyh.jpg", "/htfxj.jpg", "/jhhy.jpg", "/jlw.jpg", "/jnyp.jpg", "/jxmm.jpg", "/jsjxmm.jpg", "/pzf.jpg", "/tf.jpg", "/tsyhy.jpg", "/wjsf.jpg", "/xcsd.jpg", "/ybhf.jpg", "/ysxc.jpg", "/zyyc.jpg"],
          "tech": ["JavaScript", "WebGL", "3D Libraries", "HTML5", "CSS3", "Responsive Design"],
          "stats": {
            "projects": 18,
            "locations": "8 provinces",
            "clients": "12 real estate developers"
          }
        },
        {
          "type": "Website",
          "title": "Corporate Website Development Platform",
          "name": "企业网站开发平台",
          "description": {
            "en": "Comprehensive corporate website development solution serving government agencies, healthcare institutions, tourism bureaus, and private enterprises. Built using CMS platforms with custom database architecture, responsive UI implementation from design mockups, and full deployment management across multiple production servers.",
            "zh": "为政府机构、医疗机构、旅游局和私营企业提供的综合性企业网站开发解决方案。使用CMS平台构建，具有定制数据库架构，从设计稿实现响应式UI，并在多个生产服务器上进行全面的部署管理。"
          },
          "coordinates": [30.297884, 109.4955927],
          "location": "Multiple locations across Hubei Province, China",
          "year": "2019",
          "link": "https://www.es9e.cn/",
          "img": ["/es9e.jpg", "/tld.jpg"],
          "tech": ["CMS Platform", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Responsive Design", "Apache", "Linux"],
          "stats": {
            "clients": "6+ organizations",
            "sectors": "Healthcare, Tourism, Government, Corporate",
            "features": "Custom CMS, Database Design, Responsive UI",
            "uptime": "99.8%",
            "pages": "200+ pages total"
          },
          "projects": [
            {
              "name": "Enshi Central Hospital",
              "nameZh": "恩施州中心医院",
              "description": "Comprehensive healthcare website with patient information management, appointment booking system, and medical department showcase. Implemented complex database structure for patient records and integrated with hospital management systems. Features include online registration, doctor profiles, medical news, and health education resources.",
              "link": "https://www.es9e.cn/",
              "img": "/es9e.jpg",
              "features": ["Patient Management", "Online Appointments", "Medical Departments", "News System", "Health Education", "Doctor Profiles"]
            },
            {
              "name": "Tenglong Cave Official Website",
              "nameZh": "腾龙洞官方网站",
              "description": "Tourism attraction website featuring virtual tours, visitor information, booking system, and multilingual support. Integrated with payment gateways and visitor management systems. Includes interactive maps, weather information, and cultural heritage content.",
              "link": "http://tenglongdong.net.cn/",
              "img": "/tld.jpg",
              "features": ["Virtual Tours", "Online Booking", "Multilingual Support", "Payment Integration", "Interactive Maps", "Weather Info"]
            },
            {
              "name": "Badong Tourism Bureau",
              "nameZh": "巴东县旅游局",
              "description": "Government tourism portal showcasing local attractions, travel guides, cultural information, and tourism statistics. Built with content management system for easy updates by bureau staff. Features comprehensive destination guides and event management system.",
              "link": "",
              "img": "",
              "features": ["Tourism Information", "Cultural Heritage", "Travel Guides", "Event Management", "Statistics Dashboard", "Photo Gallery"]
            },
            {
              "name": "Jinguo Tea Corporate Site",
              "nameZh": "金果茶叶企业网站",
              "description": "Corporate website for tea manufacturer featuring product catalog, company history, quality certifications, and e-commerce integration. Included inventory management and order processing systems with real-time stock updates and customer portal.",
              "link": "",
              "img": "",
              "features": ["Product Catalog", "E-commerce", "Quality Certificates", "Order Management", "Inventory System", "Customer Portal"]
            }
          ]
        },
        {
          "type": "Mobile App",
          "title": "FitsGo",
          "name": "Mobile App",
          "description": {
            "en": "This is a mobile application that aims to help get people to start exercising. This App is a cross-platform application which runs both of Android and IOS. It is built using React-Native and Google Firebase real-time database.",
            "zh": "这是一个旨在帮助人们开始锻炼的移动应用程序。这个应用是一个跨平台应用，可以在Android和iOS上运行。使用React-Native和Google Firebase实时数据库构建。"
          },
          "coordinates": [-45.8750186, 170.4973482],
          "location": "Dunedin, New Zealand",
          "year": "2019",
          "link": "https://github.com/aemooooon/FitsGo",
          "img": ["/fitsgo.gif", "fitsgo-team.jpg"]
        },
        {
          "type": "Full Stack",
          "title": "ECAN Data Pipeline",
          "name": "University of Canterbury",
          "description": {
            "en": "Developed a system to aggregate data from over 20 sources, then centralized it into a central database. Web API is provided to the front end, enabling analyses and visualizations: Collect more than 20 people's data from the AWS EC2. Built data pipelines using Apache Airfow to automate ETL processes. Stored data in a PostgreSQL database on AWS RDS. Developed a Node.js API with Swagger documentation to serve endpoints. Implemented Python Streamlit and R Shiny dashboard to visualise data.",
            "zh": "开发了一个系统，用于聚合来自20多个数据源的数据，然后将其集中到中央数据库中。为前端提供Web API，支持分析和可视化：从AWS EC2收集20多人的数据。使用Apache Airflow构建数据管道以自动化ETL流程。在AWS RDS上的PostgreSQL数据库中存储数据。开发了带有Swagger文档的Node.js API来提供端点服务。实现了Python Streamlit和R Shiny仪表板以可视化数据。"
          },
          "coordinates": [-43.5357406, 172.6358119],
          "location": "Christchurch, New Zealand",
          "year": "2024",
          "link": "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
          "img": ["/data472/472.png", "/data472/af01.jpg", "/data472/datapipeline.png", "/data472/FuelPriceData.jpg", "/data472/GasStationData.jpg", "/data472/ProjectManagement.jpg", "/data472/services.png", "/data472/v1.gif", "/data472/v2.gif", "/data472/", "/data472/WebApiResponse.jpg",]
        },
        {
          "type": "activity",
          "title": "Assisted IT Meetups",
          "name": "CITANZ CHCH Volunteer",
          "description": "Assisted in planning and managing IT community meetups once a month.",
          "coordinates": [-43.5828903, 172.5695089],
          "location": "Halswell Library, Christchurch",
          "year": "2024-2025",
          "link": "https://www.cita.org.nz/",
          "img": ["cita-02.jpg", "cita-01.jpg", "cita-04.jpg", "cita-03.jpg", "cita-05.jpg"]
        },
        {
          "type": "activity",
          "title": "Save Kiwi",
          "name": "AI Hackathon 2024",
          "description": {
            "en": "Design an AI solution to help existing organizations improve maintenance and analysis efficiency to better protect kiwi birds. It uses advanced tech to protect kiwi birds by combining smart cages, edge computing, and cloud analytics. Smart cages with RGB cameras monitor wildlife, while edge computing processes images in real-time using a vision-transformer model. This model distinguishes between kiwi birds, predators, and non-threatening animals. Predators are captured; others are released. Data is sent to a cloud platform for monitoring and alerts, enabling quick conservation responses.",
            "zh": "设计一个AI解决方案，帮助现有组织提高维护和分析效率，更好地保护奇异鸟。它通过结合智能笼子、边缘计算和云分析等先进技术来保护奇异鸟。带有RGB摄像头的智能笼子监控野生动物，边缘计算使用视觉变换器模型实时处理图像。该模型区分奇异鸟、捕食者和非威胁动物。捕食者被捕获，其他动物被释放。数据发送到云平台进行监控和警报，实现快速保护响应。"
          },
          "coordinates": [-43.5218726, 172.5674936],
          "location": "University of Canterbury, Christchurch",
          "year": "2024",
          "link": "https://www.cita.org.nz/",
          "img": ["/UC_F4.001.jpeg", "/UC_F4.002.jpeg", "f4.jpg"]
        }
      ],

      // 项目数据 for map view
      locations: [
        {
          "type": "work",
          "title": "Software Engineer",
          "name": "Zespri International",
          "description": {
            "en": "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.",
            "zh": "构建ETL管道并开发了一个基于GIS的交互式Web应用程序用于果园采样优化。"
          },
          "coordinates": [-37.7866, 176.4416],
          "location": "Bay of Plenty, New Zealand",
          "year": "2024-2025",
          "link": "https://www.zespri.com",
          "img": "/zespri_poster.png"
        },
        {
          "type": "work",
          "title": "Software Engineer",
          "name": "Realibox",
          "description": "Developed and maintained the central hub for Realibox’s 3D assets, using React with a WebGL-based library for the frontend and Node.js/Python for the backend. Implemented CI/CD pipelines using GitLab for code integration and deployment. Worked in an Agile environment, collaborating closely with PMs, QAs, and Designers to ensure feature delivery aligned with requirements.",
          "coordinates": [22.9951158, 113.3335372],
          "location": "Guangzhou, China",
          "year": "2021-2023",
          "link": "https://hub.realibox.com/",
          "img": ["/realibox-00.jpg", "realibox-01.jpeg"]
        },
        {
          "type": "work",
          "title": "Frontend Developer",
          "name": "Chongqing Nuclear Stone Technology",
          "description": {
            "en": "Develop H5 micro-apps on the WeChat platform, which include front-end page implementation, 3D scene tour and transition in panorama, and App deployment.",
            "zh": "在微信平台上开发H5微应用，包括前端页面实现、3D场景游览和全景转换以及应用部署。"
          },
          "coordinates": [29.5638, 106.5505],
          "location": "Chongqing, China",
          "year": "2020-2021",
          "link": "",
          "img": "/stone.jpg"
        },
        {
          "type": "project",
          "title": "Full Stack Developer",
          "name": "Real-time Air Quality Index Publish Platform",
          "description": "Developed a real-time Air Quality Index dashboard for a population of 5 million, involving an ETL workflow to extract XML data from a third-party Web service on schedule, transform it into structured objects, and load it into a MySQL database. The backend, built with Java Spring Boot, provided RESTful APIs for data access, while the front end, developed using React and EChart, visualized AQI trends and geographic distributions through interactive and dynamic charts.",
          "coordinates": [30.311395, 109.4795951],
          "location": "Enshi, Hubei, China",
          "year": "2020",
          "link": "https://aqi.eseemc.cn/",
          "img": ["/aqi.jpg", "AQI1.webp", "AQI2.webp", "AQI3.jpg", "AQI4.jpg", "AQI5.jpg"]
        },
        {
          "type": "education",
          "title": "Master of Applied Data Science",
          name: "University of Canterbury",
          "description": {
            "en": "Focus on Data Engineer, Visualisation and Deep Learning.",
            "zh": "专注于数据工程、可视化和深度学习。"
          },
          "coordinates": [-43.5232, 172.5835],
          "location": "Christchurch, New Zealand",
          "year": "2024-2025",
          "link": "https://www.canterbury.ac.nz",
          "img": ["uc-ds-all.jpg", "/hua_presentation.jpg"]
        },
        {
          "type": "education",
          "title": "Bachelor of Information Technology",
          "name": "Otago Polytechnic",
          "description": {
            "en": "Graduated with distinction, focuse on Web Development, full stack, and awarded Academic Excellence and Best Programmer.",
            "zh": "以优异成绩毕业，专注于Web开发、全栈技术，获得学术优秀奖和最佳程序员奖。"
          },
          "coordinates": [-45.8664633, 170.5182829],
          "location": "Dunedin, New Zealand",
          "year": "2017-2021",
          "link": "https://www.op.ac.nz",
          "img": ["awared-best-programmer.jpeg", "awared-excellence.jpeg"]
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Changpingli · 常平里",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [26.564722, 104.858717],
          "location": "Liupanshui, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/changpingli.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Dalincheng · 大林城",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [25.725958, 104.449007],
          "location": "Liupanshui, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/dalincheng.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Fenghuangjiayuan · 凤凰嘉苑",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [30.2788597, 109.4846285],
          "location": "Enshi, Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/fhjy.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Number 1 Parking · 公园①号",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [27.326395, 105.280762],
          "location": "Bijie, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/gyyh.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Hengtianfengxijun · 恒天枫溪郡",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [39.163164, 116.354244],
          "location": "Langfang, Hebei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/htfxj.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Jiahe Garden in Sky · 家和空中花园",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [29.475417, 109.406526],
          "location": "Enshi, Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/jhhy.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Jinnanwan · 金澜湾",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [27.502244, 106.234353],
          "location": "Bijie, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/jlw.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Jiangnanyipin · 江南一品",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [27.754975, 107.461993],
          "location": "Zunyi, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/jnyp.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Jiangxiangmingmen · 将相名门",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [28.175622, 109.185229],
          "location": "Tongren, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/jxmm.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Jinsha · 金沙将相名门",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [27.497812, 106.233872],
          "location": "Jinsha, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/jsjxmm.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Guiyuan · 盘州府壹号",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [25.692363, 104.485536],
          "location": "Liupanshui, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/pzf.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Taifu Wutongxi · 泰府梧桐栖",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [36.568705, 111.742927],
          "location": "Huozhou, Shanxi, China",
          "year": "2020-2021",
          "link": "",
          "img": "/tf.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Yuheyuan · 通盛御河园",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [28.309843, 106.225531],
          "location": "Zaozhuang, Shandong, China",
          "year": "2020-2021",
          "link": "",
          "img": "/tsyhy.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Yuheyuan · 文璟上府",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [26.24033, 109.140568],
          "location": "Liping, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/wjsf.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Dongsheng - 芯宸时代",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [29.681751, 109.162283],
          "location": "Enshi，Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/xcsd.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Lvcheng · 迎宾华府",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [39.122386, 116.415274],
          "location": "Langfang, Hebei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/ybhf.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Jiahe · 雲尚星城",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [29.688752, 109.149443],
          "location": "Enshi, Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/ysxc.jpg"
        },
        {
          "type": "project",
          "title": "Interactive 360° Virtual Tour Application",
          "name": "Yuecheng · 悦城",
          "description": "Developed an interactive 360° virtual tour application using JavaScript and 3D libraries, enabling users to explore panoramic views of buildings, rooms, and outdoor spaces with 720-degree navigation. Implemented clickable markers and hyperlinks to facilitate seamless transitions between multiple scenes, such as moving between rooms or buildings, while providing an immersive experience optimised for both web and mobile platforms.",
          "coordinates": [27.579996, 106.864341],
          "location": "Zunyi, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/zyyc.jpg"
        },
        {
          "type": "project",
          "title": "Tenglong Cave",
          "name": "腾龙洞",
          "description": "Official Website",
          "coordinates": [30.3335111, 108.98434],
          "location": "Lichuan, Hubei, China",
          "year": "2019",
          "link": "http://tenglongdong.net.cn/",
          "img": "/tld.jpg"
        },
        {
          "type": "project",
          "title": "Badong Tourism Bureau",
          "name": "巴东县旅游局",
          "description": "Official Website",
          "coordinates": [31.0419753, 110.3386598],
          "location": "Badong, Hubei, China",
          "year": "2019",
          "link": "",
          "img": ""
        },
        {
          "type": "project",
          "title": "Jinguo Tea",
          "name": "金果茶叶",
          "description": "Official Website",
          "coordinates": [30.2889132, 110.2148372],
          "location": "Badong, Hubei, China",
          "year": "2019",
          "link": "",
          "img": ""
        },
        {
          "type": "project",
          "title": "Enshi Central Hospital",
          "name": "恩施州中心医院",
          "description": "Official Website",
          "coordinates": [30.297884, 109.4955927],
          "location": "Enshi, Hubei, China",
          "year": "2019",
          "link": "https://www.es9e.cn/",
          "img": "/es9e.jpg"
        },
        {
          "type": "project",
          "title": "FitsGo",
          "name": "Mobile App",
          "description": "This is a mobile application that aims to help get people to start exercising. This App is a cross-platform application which runs both of Android and IOS. It is built using React-Native and Google Firebase real-time database.",
          "coordinates": [-45.8750186, 170.4973482],
          "location": "Dunedin, New Zealand",
          "year": "2019",
          "link": "https://github.com/aemooooon/FitsGo",
          "img": ["/fitsgo.gif", "fitsgo-team.jpg"]
        },
        {
          "type": "project",
          "title": "ECAN Data Pipeline",
          "name": "University of Canterbury",
          "description": "Developed a system to aggregate data from over 20 sources, then centralized it into a central database. Web API is provided to the front end, enabling analyses and visualizations: Collect more than 20 people's data from the AWS EC2. Built data pipelines using Apache Airfow to automate ETL processes. Stored data in a PostgreSQL database on AWS RDS. Developed a Node.js API with Swagger documentation to serve endpoints. Implemented Python Streamlit and R Shiny dashboard to visualise data.",
          "coordinates": [-43.5357406, 172.6358119],
          "location": "Christchurch, New Zealand",
          "year": "2024",
          "link": "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
          "img": ["/data472/472.png", "/data472/af01.jpg", "/data472/datapipeline.png", "/data472/FuelPriceData.jpg", "/data472/GasStationData.jpg", "/data472/ProjectManagement.jpg", "/data472/services.png", "/data472/v1.gif", "/data472/v2.gif", "/data472/", "/data472/WebApiResponse.jpg",]
        },
        {
          "type": "activity",
          "title": "Assisted IT Meetups",
          "name": "CITANZ CHCH Volunteer",
          "description": "Assisted in planning and managing IT community meetups once a month.",
          "coordinates": [-43.5828903, 172.5695089],
          "location": "Halswell Library, Christchurch",
          "year": "2024-2025",
          "link": "https://www.cita.org.nz/",
          "img": ["cita-02.jpg", "cita-01.jpg", "cita-04.jpg", "cita-03.jpg", "cita-05.jpg"]
        },
        {
          "type": "activity",
          "title": "Save Kiwi",
          "name": "AI Hackathon 2024",
          "description": "Design an AI solution to help existing organizations improve maintenance and analysis efficiency to better protect kiwi birds. It uses advanced tech to protect kiwi birds by combining smart cages, edge computing, and cloud analytics. Smart cages with RGB cameras monitor wildlife, while edge computing processes images in real-time using a vision-transformer model. This model distinguishes between kiwi birds, predators, and non-threatening animals. Predators are captured; others are released. Data is sent to a cloud platform for monitoring and alerts, enabling quick conservation responses.",
          "coordinates": [-43.5218726, 172.5674936],
          "location": "University of Canterbury, Christchurch",
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
            en: 'Abstract Digital Art',
            zh: '抽象数字艺术'
          },
          description: {
            en: 'Creative abstract visual expression with geometric patterns',
            zh: '具有几何图案的创意抽象视觉表达'
          },
          date: '2024-08-05',
          tags: ['abstract', 'digital', 'geometric']
        },
        {
          id: 'gallery_2',
          type: 'image',
          src: '/gallery/96648350e2b38f1e2fd63d0428c1bb.jpg',
          thumbnail: '/gallery/96648350e2b38f1e2fd63d0428c1bb.jpg',
          title: {
            en: 'Vibrant Digital Design',
            zh: '鲜艳数字设计'
          },
          description: {
            en: 'Modern colorful digital design composition',
            zh: '现代彩色数字设计构图'
          },
          date: '2024-08-05',
          tags: ['digital', 'colorful', 'modern']
        },
        {
          id: 'gallery_3',
          type: 'image',
          src: '/gallery/Day.jpg',
          thumbnail: '/gallery/Day.jpg',
          title: {
            en: 'Beautiful Daylight',
            zh: '美丽白昼'
          },
          description: {
            en: 'Magnificent natural daylight scene captured',
            zh: '捕捉的壮丽自然白昼风景'
          },
          date: '2024-08-05',
          tags: ['nature', 'daylight', 'landscape']
        },
        {
          id: 'gallery_4',
          type: 'image',
          src: '/gallery/dataengineering.jpeg',
          thumbnail: '/gallery/dataengineering.jpeg',
          title: {
            en: 'Data Engineering',
            zh: '数据工程'
          },
          description: {
            en: 'Professional data engineering visualization',
            zh: '专业数据工程可视化'
          },
          date: '2024-08-11',
          tags: ['data', 'engineering', 'technology']
        },
        {
          id: 'gallery_5',
          type: 'image',
          src: '/gallery/f4.jpg',
          thumbnail: '/gallery/f4.jpg',
          title: {
            en: 'Project F4',
            zh: 'F4 项目'
          },
          description: {
            en: 'Advanced project development showcase',
            zh: '高级项目开发展示'
          },
          date: '2024-08-11',
          tags: ['project', 'development', 'showcase']
        },
        {
          id: 'gallery_6',
          type: 'image',
          src: '/gallery/realibox-01.jpeg',
          thumbnail: '/gallery/realibox-01.jpeg',
          title: {
            en: 'Realibox Innovation',
            zh: 'Realibox 创新'
          },
          description: {
            en: 'Innovative technology solution presentation',
            zh: '创新技术解决方案展示'
          },
          date: '2024-08-11',
          tags: ['innovation', 'technology', 'solution']
        },
        {
          id: 'gallery_7',
          type: 'image',
          src: '/gallery/WechatIMG1115.jpg',
          thumbnail: '/gallery/WechatIMG1115.jpg',
          title: {
            en: 'Urban Architecture',
            zh: '城市建筑'
          },
          description: {
            en: 'Modern urban architectural photography',
            zh: '现代城市建筑摄影'
          },
          date: '2024-08-11',
          tags: ['architecture', 'urban', 'photography']
        },
        {
          id: 'gallery_8',
          type: 'image',
          src: '/gallery/WechatIMG485.jpg',
          thumbnail: '/gallery/WechatIMG485.jpg',
          title: {
            en: 'Landscape Vista',
            zh: '风景远眺'
          },
          description: {
            en: 'Breathtaking natural landscape view',
            zh: '令人叹为观止的自然风景'
          },
          date: '2024-08-11',
          tags: ['landscape', 'nature', 'vista']
        },
        {
          id: 'gallery_9',
          type: 'image',
          src: '/gallery/Image_2025-08-11_001936_130.jpg',
          thumbnail: '/gallery/Image_2025-08-11_001936_130.jpg',
          title: {
            en: 'Creative Composition',
            zh: '创意构图'
          },
          description: {
            en: 'Artistic creative visual composition',
            zh: '艺术创意视觉构图'
          },
          date: '2024-08-11',
          tags: ['creative', 'composition', 'artistic']
        },
        {
          id: 'gallery_10',
          type: 'image',
          src: '/gallery/Image_2025-08-11_002003_795.jpg',
          thumbnail: '/gallery/Image_2025-08-11_002003_795.jpg',
          title: {
            en: 'Visual Art Study',
            zh: '视觉艺术研究'
          },
          description: {
            en: 'Contemporary visual art exploration',
            zh: '当代视觉艺术探索'
          },
          date: '2024-08-11',
          tags: ['visual', 'art', 'contemporary']
        },
        {
          id: 'gallery_11',
          type: 'image',
          src: '/gallery/Image_2025-08-11_002010_271.jpg',
          thumbnail: '/gallery/Image_2025-08-11_002010_271.jpg',
          title: {
            en: 'Design Elements',
            zh: '设计元素'
          },
          description: {
            en: 'Fundamental design elements showcase',
            zh: '基本设计元素展示'
          },
          date: '2024-08-11',
          tags: ['design', 'elements', 'fundamental']
        },
        {
          id: 'gallery_12',
          type: 'image',
          src: '/gallery/Image_2025-08-11_002019_688.jpg',
          thumbnail: '/gallery/Image_2025-08-11_002019_688.jpg',
          title: {
            en: 'Color Theory',
            zh: '色彩理论'
          },
          description: {
            en: 'Practical color theory demonstration',
            zh: '实用色彩理论演示'
          },
          date: '2024-08-11',
          tags: ['color', 'theory', 'demonstration']
        },
        {
          id: 'gallery_13',
          type: 'image',
          src: '/gallery/Image_2025-08-11_002025_975.jpg',
          thumbnail: '/gallery/Image_2025-08-11_002025_975.jpg',
          title: {
            en: 'Pattern Design',
            zh: '图案设计'
          },
          description: {
            en: 'Intricate pattern design exploration',
            zh: '复杂图案设计探索'
          },
          date: '2024-08-11',
          tags: ['pattern', 'design', 'intricate']
        },
        {
          id: 'gallery_14',
          type: 'image',
          src: '/gallery/Image_2025-08-11_002032_575.jpg',
          thumbnail: '/gallery/Image_2025-08-11_002032_575.jpg',
          title: {
            en: 'Artistic Expression',
            zh: '艺术表达'
          },
          description: {
            en: 'Pure artistic expression in visual form',
            zh: '纯粹的视觉艺术表达'
          },
          date: '2024-08-11',
          tags: ['artistic', 'expression', 'visual']
        },
        {
          id: 'gallery_15',
          type: 'image',
          src: '/gallery/Image_2025-08-11_002041_104.png',
          thumbnail: '/gallery/Image_2025-08-11_002041_104.png',
          title: {
            en: 'Digital Innovation',
            zh: '数字创新'
          },
          description: {
            en: 'Cutting-edge digital innovation showcase',
            zh: '前沿数字创新展示'
          },
          date: '2024-08-11',
          tags: ['digital', 'innovation', 'cutting-edge']
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

      getAllLocations: () => {
        const {locations} = get();
        return locations;
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

      // 获取当前语言的项目文本
      getProjectsText: () => {
        const { language } = get();
        return contentConfig[language]?.projects || contentConfig['en'].projects;
      },

      // 获取项目描述（支持多语言）
      getProjectDescription: (project, language) => {
        if (!project?.description) return '';
        if (typeof project.description === 'object' && project.description !== null) {
          return project.description[language] || project.description.en || project.description.zh || '';
        }
        return project.description;
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

      // 导航到指定区块 - 增加方向跟踪，优化时序
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
        // 减少延迟时间，防止视觉故障
        setTimeout(() => set({ isScrolling: false }), 600);
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
