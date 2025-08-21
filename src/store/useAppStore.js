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
  },
  {
    id: "about",
    index: 1,
    name: { en: "About", zh: "关于" },
    description: { en: "About myself", zh: "个人介绍" },
    backgroundEffect: "effectlorenz", // Lorenz 背景
    cubeImage: "/cube-textures/about.jpg", // 修正立方体图片路径
  },
  {
    id: "projects",
    index: 2,
    name: { en: "Projects", zh: "项目" },
    description: { en: "My development projects", zh: "我的开发项目" },
    backgroundEffect: "effectmonjori", // Monjori 背景
    cubeImage: "/cube-textures/projects.jpg", // 修正立方体图片路径
  },
  {
    id: "gallery",
    index: 3,
    name: { en: "Corridor of Light and Shadow", zh: "浮生长廊" },
    description: { en: "Immersive 3D art experience", zh: "沉浸式3D艺术体验" },
    backgroundEffect: "", // 清空背景效果，因为Gallery section有自己的3D场景
    cubeImage: "/cube-textures/gallery.jpg", // 修正立方体图片路径
  },
  {
    id: "education",
    index: 4,
    name: { en: "Education", zh: "教育背景" },
    description: { en: "Academic background", zh: "学术背景" },
    backgroundEffect: "effectfuse", // Fuse 背景
    cubeImage: "/cube-textures/education.jpg", // 修正立方体图片路径
  },
  {
    id: "contact",
    index: 5,
    name: { en: "Contact", zh: "联系我" },
    description: { en: "Get in touch", zh: "联系方式" },
    backgroundEffect: "effectripple", // Ripple Waves 背景 - 波纹传播效果
    cubeImage: "/cube-textures/contact.jpg", // 修正立方体图片路径
  }
];

// 国际化内容配置 - 完整的多语言文本内容
const contentConfig = {
  en: {
    home: {
      name: "Hua Wang",
      title: "Full Stack Developer",
      slogan: "Order from Chaos. Innovation through Tradeoffs..."
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
              "I am a full-stack developer with over a decade of experience, from early work with PHP to today’s modern React ecosystems. My journey spans enterprise websites, CMS platforms, internal systems, and data-driven apps, enriched by a passion for computer graphics, where I blend shaders, lighting, and generative effects into the web.",
              "What drives me is the process: turning scattered user stories into clarity, navigating complexity with an agnostic mindset toward languages and frameworks, and building solutions that balance logic with creativity. To me, code is not just function but also expression, where design, implementation, and narrative converge.",
              "Beyond frontend and backend development, I explore DevOps, containerization, and cloud platforms, while my Master’s in Data Science deepens my grasp of algorithms and data pipelines. To me, development is about seeking order in chaos and finding innovation in every trade-off."
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
    projects: {
      title: "My Projects",
      subtitle: "Showcases",
      bottomSubtitle: "Each project represents a unique challenge and learning journey",
      description: "From Full Stack Web Development to 3D immersive experiences, from computer science to data science, to computer graphics — explore the diverse technology and solutions. Language, platform, framework agnostic.",
      viewProject: "View Project",
      viewAction: "View",
      technologies: "Technologies",
      totalProjects: "Total Projects",
      exploreMap: "Map View",
      exploreMapTooltip: "Explore Projects on Interactive Map",
      showing: "Showing",
      viewDetails: "View Details",
      liveDemo: "Live Demo",
      officialSite: "Official",
      githubRepo: "GitHub",
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
    education: {
      title: "Education",
      subtitle: "Academic Background",
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
          logo: "/unicanterburylogo.png",
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
              image: "/swapbytes.jpg"
            },
            {
              name: "Digital Pet",
              description: "A blockchain-based virtual pet dApp on Secret Network. Built a CosmWasm smart contract using Rust and a React frontend.",
              technologies: ["Rust", "CosmWasm", "React", "Secret Network"],
              githubUrl: "https://github.com/aemooooon/digital-pet",
              image: "/digitalpet.jpg"
            },
            {
              name: "ECAN Data Pipeline",
              description: "A collaborative cloud-based automation system for collecting and processing environmental data from 17 different sources.",
              technologies: ["Apache Airflow", "Python", "GraphQL", "AWS"],
              githubUrl: "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
              image: "/ecan.jpg"
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
          logo: "/otago-polytechnic-vertical-blue.svg",
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
              image: "/travelassistant/ta02.jpg"
            },
            {
              name: "FitsGo",
              description: "A Fitness tracker app built with React Native and Firebase, supporting location tracking and workout history.",
              technologies: ["React Native", "Firebase"],
              githubUrl: "https://github.com/aemooooon/fitsgo",
              image: "/fitsgo/fitsgo.02.png"
            }
          ]
        }
      ]
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Looking forward to hearing from you",
      description: "Get in touch for opportunities, collaborations, or just to say hello.",
      location: "Christchurch, New Zealand",
      emailAddress: "aemooooon@gmail.com",
      phone: "+64 21 037 0520",
      connectWithMe: "Connect with me",
      lookingForward: "Copyright © 2025 Hua Wang",
      contactMethods: {
        email: {
          title: "Email",
          description: "Send me an email"
        },
        phone: {
          title: "Phone",
          description: "Give me a call"
        },
        wechat: {
          title: "WeChat",
          description: "Connect via WeChat",
          id: "Aemooooon"
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
      toggleTheme: "Toggle Theme",
      mobileScrollHint: "scroll down to explore..."
    }
  },
  zh: {
    home: {
      name: "王华",
      title: "全栈工程师",
      slogan: "观混沌之纷，立秩序之象；守中庸之衡，启创新之变……"
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
              "夫天地演数，阴阳化爻，臣以一介码农，躬耕于比特之野十载有余。初习PHP古法，今研React新道，历经诸侯之网站，掌CMS之枢机，筑内廷之系统，驭数据于方寸。然臣心向星辰，每涉图形之术，便穷Shader之变，究光影之妙，合生成之艺于万维网中，此皆臣技之所寄也。",
              "臣闻《易》云：“形而上者谓之道，形而下者谓之器。”臣之所驱，正在道器相融：散落之用户故事，臣析为清明；纷杂之技术桎梏，臣破以无执之心。语言框架，不过器物；逻辑创造，方见精神。是故代码非止于功用，亦载文心，融设计、实现与叙事于一炉，犹《诗》之兴观群怨，皆可托于数行之间。",
              "臣虽主营前后二端，然未尝忘怀DevOps之策、容器之术与云之平台。更兼修数据科学之硕业，深研算法之微、管道之幽。盖《道德经》有言：“图难于其易，为大于其细”，臣每日所行，皆在混沌中求秩序，于权衡处创新篇——此乃臣平生之志也。",
              "今效诸葛出师之表，托心于代码，寄志于云端，惟愿以技术立命，以创造安身，虽世变时移，此心不易。"
            ]
          }
        },
        {
          id: 'experience',
          title: '职业历程',
          experiences: [
            {
              company: "佳沛国际",
              position: "全栈开发工程师（实习）",
              period: "2024年11月 - 2025年2月",
              color: "blue",
              icon: "ZI"
            },
            {
              company: "引力波，广州",
              position: "前端开发工程师",
              period: "2021年8月 - 2023年2月",
              color: "purple",
              icon: "RB"
            },
            {
              company: "核石数字，重庆",
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
    projects: {
      title: "项目集锦",
      subtitle: "Showcases",
      bottomSubtitle: "每个项目都代表着独特的挑战和学习之旅",
      description: "从全栈Web开发到3D沉浸式体验，从计算机科学，计算机图形学，到数据科学 — 探索多样的技术与解决方案。语言无关，平台独立，框架灵活。",
      viewProject: "查看项目",
      viewAction: "查看",
      technologies: "技术栈",
      totalProjects: "总项目数",
      exploreMap: "地图",
      exploreMapTooltip: "在交互地图上探索项目",
      showing: "显示",
      viewDetails: "查看详情",
      liveDemo: "在线演示",
      officialSite: "官方",
      githubRepo: "源码",
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
          clickToStart: "点击进入",
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
          location: "基督城",
          period: "2024年2月 - 2025年2月",
          logo: "/unicanterburylogo.png",
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
              image: "/swapbytes.jpg"
            },
            {
              name: "数字宠物",
              description: "基于Secret Network的区块链虚拟宠物dApp。使用Rust构建CosmWasm智能合约，React前端。",
              technologies: ["Rust", "CosmWasm", "React", "Secret Network"],
              githubUrl: "https://github.com/aemooooon/digital-pet",
              image: "/digitalpet.jpg"
            },
            {
              name: "坎特伯雷环境部数据管线",
              description: "协作式云端自动化系统，用于从17个不同来源收集和处理环境数据。",
              technologies: ["Apache Airflow", "Python", "GraphQL", "AWS"],
              githubUrl: "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
              image: "/ecan.jpg"
            }
          ]
        },
        {
          id: "bachelors",
          degree: "信息技术学士学位",
          degreeHonor: true,
          institution: "奥塔哥理工学院",
          location: "达尼丁",
          period: "2017年7月 - 2021年6月",
          logo: "/otago-polytechnic-vertical-blue.svg",
          gpa: "A",
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
              image: "/travelassistant/ta02.jpg"
            },
            {
              name: "FitsGo",
              description: "使用React Native和Firebase构建的健身追踪应用，支持位置跟踪和锻炼历史。",
              technologies: ["React Native", "Firebase"],
              githubUrl: "https://github.com/aemooooon/fitsgo",
              image: "/fitsgo/fitsgo.02.png"
            }
          ]
        }
      ]
    },
    contact: {
      title: "青鸟殷勤，共商鸿猷",
      subtitle: "翘盼汝之玉音！",
      description: "倘蒙垂询，或谋事，或叙契，一函可达。",
      location: "新西兰",
      emailAddress: "aemooooon@gmail.com",
      phone: "+64 21 *** 0520",
      connectWithMe: "社交媒体",
      lookingForward: "版权所有 © 2025 王华",
      contactMethods: {
        email: {
          title: "邮箱",
          description: "发送邮件"
        },
        phone: {
          title: "电话",
          description: "电话联系"
        },
        wechat: {
          title: "微信",
          description: "微信联系",
          id: "Aemooooon"
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
      toggleTheme: "切换主题",
      mobileScrollHint: "向下滑动探索更多..."
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

      // 3D Gallery 模式状态
      isPointerLocked: false,
      setIsPointerLocked: (locked) => set({ isPointerLocked: locked }),

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
          "type": "Front End",
          "title": "Front End Developer",
          "name": "Corridor of Light and Shadow",
          "company": "Hua Wang",
          "description": {
            "en": "A sophisticated personal portfolio website built with cutting-edge web technologies to showcase professional experience and technical expertise. Developed using React 18 with modern hooks, Vite for optimized build performance, and Zustand for efficient state management. Features an immersive 3D animated cube opening sequence using GSAP timeline animations, dynamic theme switching system with CSS custom properties, and multilingual support (English/Chinese) with persistent user preferences. The site includes interactive background effects, smooth section navigation with scroll animations, responsive design optimized for all devices, and comprehensive project showcases with detailed modal views. Implements modern development practices including component-based architecture, custom hooks for business logic, and optimized performance with code splitting and lazy loading.",
            "zh": "一个使用前沿网络技术构建的精致个人作品集网站，用于展示专业经验和技术专长。使用React 18和现代hooks开发，Vite优化构建性能，Zustand进行高效状态管理。特色功能包括使用GSAP时间轴动画的沉浸式3D立方体开场序列、使用CSS自定义属性的动态主题切换系统，以及支持持久化用户偏好的多语言支持（英文/中文）。网站包含交互式背景效果、带滚动动画的平滑区块导航、针对所有设备优化的响应式设计，以及带有详细模态视图的综合项目展示。实现了现代开发实践，包括基于组件的架构、用于业务逻辑的自定义hooks，以及通过代码分割和懒加载优化的性能。"
          },
          "coordinates": [-43.5224316, 172.5943064],
          "location": "Christchurch, New Zealand",
          "year": "2025",
          "links": {
            "live": "https://www.hua.nz/",
            "github": "https://github.com/aemooooon/hua.nz"
          },
          "img": ["/hua.nz/hua.nz.1.png", "/hua.nz/hua.nz.2.jpg", "/hua.nz/hua.nz.3.jpg", "/hua.nz/hua.nz.4.jpg"]
        },
        {
          "type": "Full Stack",
          "title": "Full Stack Developer",
          "name": "Orchard Sampling Scheduler",
          "company": "Zespri International",
          "description": {
            "en": [
              "This project involved the end-to-end design and implementation of an orchard sampling optimization platform for Zespri International, New Zealand’s leading kiwifruit company. The primary goal was to create a system capable of scheduling and optimizing sampling tasks for hundreds of orchards across the Bay of Plenty region, while addressing challenges of time constraints, geographic distribution, and efficiency in field operations.",
              "From a technical standpoint, the system was designed with a modern full-stack architecture. The frontend was built with React and TailwindCSS, providing a responsive, intuitive interface for managers to interact with orchard data and adjust schedules dynamically. For mapping and geospatial visualization, Leaflet and Folium were integrated to enable interactive exploration of orchard locations and routes, while OpenRouteService (with a locally deployed instance) powered multi-waypoint route optimization.",
              "The backend was developed using Flask, exposing RESTful APIs to handle data processing, business logic, and communication with the frontend. A lightweight SQLite database was chosen to ensure portability and offline usability, enabling the system to function even in rural areas with limited connectivity. ETL pipelines were developed in Python to process diverse agricultural datasets, including orchard GPS coordinates, sampling windows, and priority rules. These pipelines automated the transformation of raw datasets into optimized scheduling inputs.",
              "At the algorithmic level, the project tackled a variant of the Travelling Salesman Problem (TSP). Pre-computed pairwise distance matrices (generated via OpenRouteService) served as the foundation for optimization. Multiple TSP algorithms were evaluated for their balance of efficiency, scalability, and explainability, ensuring that the methodology could be communicated clearly to both technical and non-technical stakeholders. This data-driven approach was critical, given the project’s research orientation as part of a Master of Applied Data Science.",
              "The system incorporated best practices not only in code but also in process. Agile-inspired iteration cycles guided development, with regular feedback loops from the client to validate usability and responsiveness. CI/CD pipelines were configured via GitHub Actions to automate deployment to an Azure VM, ensuring a reliable and reproducible release process. Containerization with Docker was used for environment consistency, while Nginx was deployed as a reverse proxy for secure hosting.",
              "Beyond technical implementation, the project emphasized architectural clarity and trade-off analysis. Decisions such as choosing SQLite over heavier databases, deploying OpenRouteService locally for offline reliability, and designing an interface tailored to field managers’ workflows all reflected a thoughtful, context-driven approach. The result was not only a functional product but also a research contribution, demonstrating how data science and software engineering can be combined to address real-world agricultural challenges.",
              "Ultimately, the Orchard Sampling Scheduler improved efficiency by enabling intelligent workload allocation, minimizing travel times, and aligning sampling tasks with operational constraints. It stands as both a professional-grade software system and a demonstration of applying algorithms, geospatial analysis, and system design principles to practical, industry-scale problems."
            ],
            "zh": [
              "本项目是为新西兰领先的奇异果企业 Zespri International 设计与实现的一套果园采样优化平台，旨在解决 Bay of Plenty 地区数百个果园的采样调度问题。系统的核心目标是应对时间窗口、地理分布与作业效率等多重挑战，在保障果实品质评估的同时提高整体采样效率。",
              "在技术架构上，平台采用现代全栈方案构建。前端基于 React 与 TailwindCSS，实现了响应式、直观的交互界面，便于管理人员实时查看果园数据与动态调整任务。地图与地理可视化方面，系统集成了 Leaflet 与 Folium，以支持果园分布与路线的交互式展示，同时结合本地部署的 OpenRouteService 实现多点路径优化。",
              "后端采用 Flask 构建 RESTful API，负责数据处理、业务逻辑与前端交互。数据库选择轻量级 SQLite，以确保系统的可移植性与离线可用性，适用于乡村地区的弱网环境。Python 编写的 ETL 数据管道用于处理多样化的农业数据集，包括果园坐标、采样时间窗口与优先级规则，实现了从原始数据到优化调度输入的全自动转换。",
              "在算法层面，项目研究并实现了旅行商问题 (TSP) 的变体。通过 OpenRouteService 预计算的两两距离矩阵作为优化基础，比较并选取了多种 TSP 算法，以平衡效率、可扩展性与可解释性，确保方法论既科学可靠又便于行业用户理解。作为应用数据科学硕士的研究性项目，这种数据驱动的思路尤为关键。",
              "项目在代码与过程上都注重最佳实践。开发过程采用敏捷式迭代，与客户保持定期反馈循环，以确保系统的易用性与实际契合度。CI/CD 管道基于 GitHub Actions 构建，自动化部署至 Azure VM，实现了稳定可重复的上线流程。Docker 容器化确保了环境一致性，Nginx 则作为反向代理提供安全的服务托管。",
              "除技术实现外，本项目还强调架构清晰度与取舍分析。例如：选择 SQLite 而非重量级数据库以提升便携性，在本地部署 OpenRouteService 保证离线可用性，以及针对田间管理者需求定制交互界面，这些都体现了以场景为导向的工程判断。成果不仅是一套可投入使用的系统，更是一份研究探索，展现了数据科学与软件工程结合解决农业行业实际问题的可能性。",
              "最终，该果园采样调度平台通过智能化任务分配、出行时间最小化和调度自动化，使采样效率显著提升。它既是一款专业级的软件系统，也是一份将算法、地理空间分析与系统设计应用于产业实践的案例。"
            ]
          },
          "coordinates": [-37.7866, 176.4416],
          "location": "Bay of Plenty, New Zealand",
          "year": "2024-2025",
          "links": {
            "official": "https://www.zespri.com"
          },
          "img": [
            "/zespri/zespri-ors.jpg",
            "/zespri/zespri_poster.png",
            "/zespri/zespri.1.jpg",
            "/zespri/zespri.2.jpg"
          ]
        },
        {
          "type": "Front End",
          "title": "Front End Developer",
          "name": "Realibox Portal",
          "company": "Realibox",
          "description": "Developed and maintained the central hub for Realibox’s 3D assets, using React with a WebGL-based library for the frontend and Node.js/Python for the backend. Implemented CI/CD pipelines using GitLab for code integration and deployment. Worked in an Agile environment, collaborating closely with PMs, QAs, and Designers to ensure feature delivery aligned with requirements.",
          "coordinates": [22.9951158, 113.3335372],
          "location": "Guangzhou, China",
          "year": "2021-2023",
          "links": {
            "live": "https://hub.realibox.com/",
          },
          "img": ["/realibox/official/official.01.jpg", "/realibox/official/official.02.jpg", "/realibox/official/official.03.jpg"]
        },
        {
          "type": "Front End",
          "title": "Front End Developer",
          "name": "Realibox 3D Editor",
          "company": "Realibox",
          "description": "Developed and maintained the central hub for Realibox’s 3D assets, using React with a WebGL-based library for the frontend and Node.js/Python for the backend. Implemented CI/CD pipelines using GitLab for code integration and deployment. Worked in an Agile environment, collaborating closely with PMs, QAs, and Designers to ensure feature delivery aligned with requirements.",
          "coordinates": [22.9951158, 113.3335372],
          "location": "Guangzhou, China",
          "year": "2021-2023",
          "links": {
            "live": "https://hub.realibox.com/",
          },
          "img": ["/realibox/editor/editor.01.jpg", "/realibox/editor/editor.02.jpg", "/realibox/editor/editor.03.jpg", "/realibox/editor/editor.04.jpg", "/realibox/editor/editor.05.jpg", "/realibox/editor/editor.06.jpg"]
        },
        {
          "type": "Full Stack",
          "title": "Full Stack Developer",
          "name": "Real-time AQI Platform",
          "company": "Enshi Environmental Agency",
          "description": {
            "en": "Developed a real-time Air Quality Index dashboard for a population of 5 million, involving an ETL workflow to extract XML data from a third-party Web service on schedule, transform it into structured objects, and load it into a MySQL database. The backend, built with Java Spring Boot, provided RESTful APIs for data access, while the front end, developed using React and EChart, visualized AQI trends and geographic distributions through interactive and dynamic charts.",
            "zh": "为500万人口开发实时空气质量指数仪表板，构建ETL工作流程，定期从第三方Web服务提取XML数据，将其转换为结构化对象并加载到MySQL数据库中。后端使用Java Spring Boot构建，提供RESTful API进行数据访问，前端使用React和EChart开发，通过交互式动态图表可视化AQI趋势和地理分布。"
          },
          "coordinates": [30.311395, 109.4795951],
          "location": "Enshi, Hubei, China",
          "year": "2020",
          "links": {
            "live": "https://aqi.eseemc.cn/",
          },
          "img": ["/aqi/aqi01.jpg", "/aqi/aqi02.png", "/aqi/aqi03.png", "/aqi/aqi04.jpg", "/aqi/aqi05.jpg", "/aqi/aqi06.jpg", "/aqi/aqi07.png", "/aqi/aqi08.jpg", "/aqi/aqi09.jpg", "/aqi/aqi10.png", "/aqi/aqi11.png", "/aqi/aqi12.png", "/aqi/aqi13.png"],
        },
        {
          "type": "WebGL",
          "title": "Interactive 360° Virtual Tour Platform",
          "name": "Real Estate VR Collections",
          "company": "Neuclear Stone Digital",
          "description": {
            "en": "Developed a comprehensive 360° virtual tour platform for real estate marketing, serving 18+ property developments across China. Built using JavaScript and WebGL-based 3D libraries, enabling immersive panoramic exploration of buildings, rooms, and outdoor spaces. Implemented advanced features including clickable hotspots, scene transitions, interactive floor plans, and cross-platform compatibility for web and mobile devices. The platform helped property developers showcase their projects remotely, significantly reducing on-site visits while maintaining high engagement rates.",
            "zh": "开发了全面的360°虚拟看房平台，为中国18+个房地产项目提供营销服务。使用JavaScript和基于WebGL的3D库构建，实现对建筑、房间和户外空间的沉浸式全景探索。实现了先进功能，包括可点击热点、场景切换、交互式户型图以及Web和移动设备的跨平台兼容性。该平台帮助房地产开发商远程展示项目，大大减少了实地看房，同时保持高参与度。"
          },
          "coordinates": [30.2888597, 109.4846285],
          "location": "Chongqing, China",
          "year": "2020-2021",
          "img": ["/vr/fhjy.jpg", "/vr/changpingli.jpg", "/vr/dalincheng.jpg", "/vr/gyyh.jpg", "/vr/htfxj.jpg", "/vr/jhhy.jpg", "/vr/jlw.jpg", "/vr/jxmm.jpg", "/vr/jsjxmm.jpg", "/vr/pzf.jpg", "/vr/tf.jpg", "/vr/wjsf.jpg", "/vr/xcsd.jpg", "/vr/ybhf.jpg", "/vr/ysxc.jpg", "/vr/zyyc.jpg", "/vr/tsyhy.jpg"],
          "tech": ["JavaScript", "WebGL", "3D Libraries", "HTML5", "CSS3", "Responsive Design"],
          "stats": {
            "projects": 18,
            "locations": "8 provinces",
            "clients": "12 real estate developers"
          },
          "projects": [
            {
              "name": "Changpingli VR Tour",
              "nameZh": "常平里虚拟看房",
              "description": "Interactive 360° virtual tour for luxury residential development featuring multiple building views and interior spaces.",
              "links": {
                "live": ""
              },
              "img": "/vr/changpingli.jpg"
            },
            {
              "name": "Dalincheng Virtual Experience",
              "nameZh": "大林城虚拟体验",
              "description": "Comprehensive virtual tour system with interactive hotspots and seamless scene transitions for residential complex.",
              "links": {
                "live": ""
              },
              "img": "/vr/dalincheng.jpg"
            },
            {
              "name": "Guanyin Lakeside VR",
              "nameZh": "观音湖畔虚拟现实",
              "description": "Premium lakeside property virtual tour with outdoor landscape and interior showcase capabilities.",
              "links": {
                "live": ""
              },
              "img": "/vr/gyyh.jpg"
            },
            {
              "name": "Huatian International",
              "nameZh": "华天国际",
              "description": "High-end commercial and residential complex virtual tour with advanced navigation features.",
              "links": {
                "live": ""
              },
              "img": "/vr/htfxj.jpg"
            },
            {
              "name": "Jinhai Bay Villa",
              "nameZh": "金海湾别墅",
              "description": "Luxury villa development virtual tour featuring detailed room-by-room exploration and exterior views.",
              "links": {
                "live": ""
              },
              "img": "/vr/jhhy.jpg"
            }
          ]
        },
        {
          "type": "Website",
          "title": "Corporate Website Development Platform",
          "name": "Enterprises Portal Collections",
          "company": "Day Digital",
          "description": {
            "en": "Comprehensive corporate website development solution serving government agencies, healthcare institutions, tourism bureaus, and private enterprises. Built using CMS platforms with custom database architecture, responsive UI implementation from design mockups, and full deployment management across multiple production servers.",
            "zh": "为政府机构、医疗机构、旅游局和私营企业提供的综合性企业网站开发解决方案。使用CMS平台构建，具有定制数据库架构，从设计稿实现响应式UI，并在多个生产服务器上进行全面的部署管理。"
          },
          "coordinates": [30.297884, 109.4955927],
          "location": "Enshi, Hubei, China",
          "year": "2019",
          "link": "https://www.es9e.cn/",
          "img": ["/website/tenglongdong.jpg", "/website/enshitusicheng01.jpg", "/website/enshitusicheng02.jpg", "/website/yangshegnhefeng.jpg", "/website/es9e.jpg", "/website/enshizhoubowuguan.jpg", "/website/enshizhousheyingjiaxiehui.jpg"],
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
              "links": {
                "official": "https://www.es9e.cn/"
              },
              "img": "/es9e.jpg",
              "features": ["Patient Management", "Online Appointments", "Medical Departments", "News System", "Health Education", "Doctor Profiles"]
            },
            {
              "name": "Tenglong Cave Official Website",
              "nameZh": "腾龙洞官方网站",
              "description": "Tourism attraction website featuring virtual tours, visitor information, booking system, and multilingual support. Integrated with payment gateways and visitor management systems. Includes interactive maps, weather information, and cultural heritage content.",
              "links": {
                "official": "http://tenglongdong.net.cn/"
              },
              "img": "/tld.jpg",
              "features": ["Virtual Tours", "Online Booking", "Multilingual Support", "Payment Integration", "Interactive Maps", "Weather Info"]
            },
            {
              "name": "Badong Tourism Bureau",
              "nameZh": "巴东县旅游局",
              "description": "Government tourism portal showcasing local attractions, travel guides, cultural information, and tourism statistics. Built with content management system for easy updates by bureau staff. Features comprehensive destination guides and event management system.",
              "links": {},
              "img": "",
              "features": ["Tourism Information", "Cultural Heritage", "Travel Guides", "Event Management", "Statistics Dashboard", "Photo Gallery"]
            },
            {
              "name": "Jinguo Tea Corporate Site",
              "nameZh": "金果茶叶企业网站",
              "description": "Corporate website for tea manufacturer featuring product catalog, company history, quality certifications, and e-commerce integration. Included inventory management and order processing systems with real-time stock updates and customer portal.",
              "links": {},
              "img": "",
              "features": ["Product Catalog", "E-commerce", "Quality Certificates", "Order Management", "Inventory System", "Customer Portal"]
            }
          ]
        },
        {
          "type": "Mobile Apps",
          "title": "FitsGo",
          "name": "FitsGo",
          "company": "Otago Polytechnic",
          "description": {
            "en": "A comprehensive fitness tracking mobile application designed to encourage people to start exercising by providing interactive map-based workout experiences. Built as a cross-platform app using React Native and Firebase, FitsGo allows users to select exercise routes from nearby points of interest, track their workouts (running, walking, cycling) with real-time GPS monitoring, and earn badges for visiting locations. Features include user authentication, profile management with weight/age tracking, real-time calorie calculation based on MET values, workout history with detailed statistics, and social elements for future friend connectivity and weekly challenges.",
            "zh": "一个综合性健身追踪移动应用程序，旨在通过提供基于地图的交互式锻炼体验来鼓励人们开始锻炼。使用React Native和Firebase构建的跨平台应用，FitsGo允许用户从附近的兴趣点选择锻炼路线，通过实时GPS监控跟踪锻炼（跑步、步行、骑行），并通过访问位置获得徽章。功能包括用户认证、带有体重/年龄跟踪的个人资料管理、基于MET值的实时卡路里计算、带有详细统计的锻炼历史，以及未来朋友连接和每周挑战的社交元素。"
          },
          "coordinates": [-45.8750186, 170.4973482],
          "location": "Dunedin, New Zealand",
          "year": "2019",
          "links": {
            "github": "https://github.com/aemooooon/FitsGo"
          },
          "img": ["/fitsgo/fitsgo.01.gif", "/fitsgo/fitsgo.02.png", "/fitsgo/fitsgo.03.jpg", "/fitsgo/fitsgo.04.jpg", "/fitsgo/fitsgo.05.jpg", "/fitsgo/fitsgo.06.jpg", "/fitsgo/fitsgo.07.jpg", "/fitsgo/fitsgo.08.jpg", "/fitsgo/fitsgo.09.jpg", "/fitsgo/fitsgo.10.jpg"]
        },
        {
          "type": "Mobile Apps",
          "title": "Travel Assistant",
          "name": "Travel Assistant",
          "company": "Otago Polytechnic",
          "description": {
            "en": "An Android-based travel companion application built with Kotlin and Room Database, designed to help travelers explore unfamiliar countries with confidence. The app features interactive Google Maps integration with clustered location markers, country selection dropdown, real-time location services, and multilingual phrase translation using Yandex API. Built using modern Android architecture components including ViewModel, LiveData, Coroutines, and View/Data Binding, with comprehensive documentation generated using Dokka and UI testing implemented with Espresso. The application provides curated lists of top-rated attractions and landmarks for each country, complete with coordinates and detailed information.",
            "zh": "一个基于Android的旅行伴侣应用程序，使用Kotlin和Room数据库构建，旨在帮助旅行者自信地探索陌生的国家。该应用程序具有与聚类位置标记的交互式Google Maps集成、国家选择下拉菜单、实时位置服务，以及使用Yandex API的多语言短语翻译功能。使用现代Android架构组件构建，包括ViewModel、LiveData、协程和视图/数据绑定，使用Dokka生成全面的文档，并使用Espresso实现UI测试。该应用程序为每个国家提供精选的顶级景点和地标列表，包含坐标和详细信息。"
          },
          "coordinates": [-45.8750186, 170.4973482],
          "location": "Dunedin, New Zealand",
          "year": "2019",
          "links": {
            "github": "https://github.com/aemooooon/Travel-Assistant"
          },
          "img": ["/travelassistant/ta01.jpg", "/travelassistant/ta02.jpg", "/travelassistant/ta03.jpg", "/travelassistant/ta04.jpg", "/travelassistant/ta05.jpg", "/travelassistant/ta06.jpg", "/travelassistant/ta07.jpg", "/travelassistant/ta08.jpg"]
        },
        {
          "type": "Full Stack",
          "title": "ECAN Data Pipeline",
          "name": "ECAN Data Pipeline",
          "company": "University of Canterbury",
          "description": {
            "en": "A comprehensive data engineering project that demonstrates advanced ETL pipeline architecture and microservices design. As a key contributor to the DATA472 Central Collection Team, developed multiple interconnected systems including: a central data collection service using Apache Airflow with automated CRON job scheduling to aggregate data from over 20 student sources; a Node.js/Express Web API service with Swagger documentation providing endpoints for data visualization; PostgreSQL database deployment on AWS RDS for centralized data storage; and interactive dashboards using Python Streamlit and R Shiny for data analysis. The project showcases modern data engineering practices including DAGs (Directed Acyclic Graphs), microservice architecture, cloud deployment on AWS EC2, and collaborative team-based data collection workflows.",
            "zh": "一个综合性数据工程项目，展示了先进的ETL管道架构和微服务设计。作为DATA472中央收集团队的关键贡献者，开发了多个相互连接的系统，包括：使用Apache Airflow的中央数据收集服务，具有自动化CRON作业调度，聚合来自20多个学生数据源的数据；带有Swagger文档的Node.js/Express Web API服务，提供数据可视化端点；在AWS RDS上部署PostgreSQL数据库进行集中数据存储；以及使用Python Streamlit和R Shiny的交互式仪表板进行数据分析。该项目展示了现代数据工程实践，包括DAGs（有向无环图）、微服务架构、AWS EC2云部署和基于团队的协作数据收集工作流程。"
          },
          "coordinates": [-43.5357406, 172.6358119],
          "location": "Christchurch, New Zealand",
          "year": "2024",
          "links": {
            "github": "https://github.com/aemooooon/DATA472-Individual-Project-Submission"
          },
          "img": ["/data472/v1.gif", "/data472/v2.gif", "/data472/472.png", "/data472/af01.jpg", "/data472/datapipeline.png", "/data472/FuelPriceData.jpg", "/data472/GasStationData.jpg", "/data472/ProjectManagement.jpg", "/data472/services.png", "/data472/WebApiResponse.jpg",]
        },
        {
          "type": "Activity",
          "title": "Assisted IT Meetups",
          "company": "CITANZ",
          "name": "CITANZ CHCH Events",
          "description": {
            "en": "Active volunteer contributor to CITANZ (Computing and Information Technology Association of New Zealand) Christchurch chapter, facilitating monthly IT community meetups that bring together professionals, students, and technology enthusiasts. Serve as both speaker and engaged listener, sharing technical expertise on software development, data engineering, and emerging technologies while learning from diverse industry perspectives. Actively mentor newcomers to the tech industry, providing guidance on career development, technical skills, and industry best practices. Foster collaborative learning environments through organizing workshops, panel discussions, and networking sessions that strengthen the local tech community. Contribute to knowledge exchange initiatives by facilitating discussions on current technology trends, helping members solve technical challenges, and connecting professionals across different specializations. This volunteer work exemplifies the spirit of giving back to the community while continuously growing through peer learning and mentorship opportunities.",
            "zh": "作为新西兰计算机和信息技术协会(CITANZ)基督城分会的积极志愿者贡献者，协助举办月度IT社区聚会，汇聚专业人士、学生和技术爱好者。既担任演讲者又是积极的倾听者，分享软件开发、数据工程和新兴技术方面的专业知识，同时从多元化的行业视角中学习。积极指导技术行业新人，在职业发展、技术技能和行业最佳实践方面提供指导。通过组织研讨会、小组讨论和网络交流会，营造协作学习环境，加强本地技术社区建设。通过促进当前技术趋势讨论、帮助成员解决技术挑战、连接不同专业领域的专业人士，为知识交流倡议做出贡献。这项志愿工作体现了回馈社区的精神，同时通过同伴学习和导师机会持续成长。"
          },
          "coordinates": [-43.5828903, 172.5695089],
          "location": "Halswell Library, Christchurch",
          "year": "2024-2025",
          "links": {
            "official": "https://www.cita.org.nz/"
          },
          "img": ["/citanz/cita-00.jpg", "/citanz/cita-01.jpg", "/citanz/cita-02.jpg", "/citanz/cita-03.jpg", "/citanz/cita-04.jpg", "/citanz/cita-04.5.jpg", "/citanz/cita-05.jpg", "/citanz/cita-06.jpg", "/citanz/cita-07.jpg", "/citanz/cita-08.jpg", "/citanz/cita-09.jpg"]
        },
        {
          "type": "Activity",
          "title": "Save Kiwi",
          "name": "AI Hackathon 2024",
          "company": "University of Canterbury",
          "description": {
            "en": "Design an AI solution to help existing organizations improve maintenance and analysis efficiency to better protect kiwi birds. It uses advanced tech to protect kiwi birds by combining smart cages, edge computing, and cloud analytics. Smart cages with RGB cameras monitor wildlife, while edge computing processes images in real-time using a vision-transformer model. This model distinguishes between kiwi birds, predators, and non-threatening animals. Predators are captured; others are released. Data is sent to a cloud platform for monitoring and alerts, enabling quick conservation responses.",
            "zh": "设计一个AI解决方案，帮助现有组织提高维护和分析效率，更好地保护奇异鸟。它通过结合智能笼子、边缘计算和云分析等先进技术来保护奇异鸟。带有RGB摄像头的智能笼子监控野生动物，边缘计算使用视觉变换器模型实时处理图像。该模型区分奇异鸟、捕食者和非威胁动物。捕食者被捕获，其他动物被释放。数据发送到云平台进行监控和警报，实现快速保护响应。"
          },
          "coordinates": [-43.5218726, 172.5674936],
          "location": "University of Canterbury",
          "year": "2024",
          "links": {
            "official": "https://aihackathon.nz/ai-hackathon-2024/"
          },
          "img": ["/f4/f4.3.jpeg", "/f4/f4.jpg", "/f4/f4.1.jpg", "/f4/f4.2.jpg", "/f4/f4.4.jpeg", "/f4/f4.5.jpg"]
        }
      ],

      // 项目数据 for map view
      locations: [
        {
          "type": "work",
          "name": "Orchard Sampling Scheduler",
          "client": "Zespri International",
          "coordinates": [-37.7866, 176.4416],
          "location": "Bay of Plenty, New Zealand",
          "year": "2024-2025",
          "link": "https://www.zespri.com",
          "img": "/zespri/zespri.1.jpg"
        },
        {
          "type": "work",
          "name": "3D Saas Platform",
          "client": "Realibox",
          "coordinates": [22.9951158, 113.3335372],
          "location": "Guangzhou, China",
          "year": "2021-2023",
          "link": "https://hub.realibox.com/",
          "img": ["/realibox/official/official.01.jpg"]
        },
        {
          "type": "work",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Chongqing Nuclear Stone Technology",
          "coordinates": [29.5638, 106.5505],
          "location": "Chongqing, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/htfxj.jpg"
        },
        {
          "type": "project",
          "name": "Real-time Air Quality Index Publish Platform",
          "client": "Enshi Environmental Agency",
          "coordinates": [30.311395, 109.4795951],
          "location": "Enshi, Hubei, China",
          "year": "2020",
          "links": {
            "live": "https://aqi.eseemc.cn/"
          },
          "img": "/aqi/aqi06.jpg"
        },
        {
          "type": "education",
          "name": "Master of Applied Data Science",
          "client": "University of Canterbury",
          "coordinates": [-43.5232, 172.5835],
          "location": "Christchurch, New Zealand",
          "year": "2024-2025",
          "link": "https://www.canterbury.ac.nz",
          "img": "uc-ds-all.jpg",
        },
        {
          "type": "education",
          "name": "Bachelor of Information Technology",
          "client": "Otago Polytechnic",
          "coordinates": [-45.8664633, 170.5182829],
          "location": "Dunedin, New Zealand",
          "year": "2017-2021",
          "link": "https://www.op.ac.nz",
          "img": "awared-best-programmer.jpeg",
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Changpingli · 常平里",
          "coordinates": [26.564722, 104.858717],
          "location": "Liupanshui, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/changpingli.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Dalincheng · 大林城",
          "coordinates": [25.725958, 104.449007],
          "location": "Liupanshui, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/dalincheng.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Fenghuangjiayuan · 凤凰嘉苑",
          "coordinates": [30.2788597, 109.4846285],
          "location": "Enshi, Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/fhjy.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Number 1 Parking · 公园①号",
          "coordinates": [27.326395, 105.280762],
          "location": "Bijie, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/gyyh.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Hengtianfengxijun · 恒天枫溪郡",
          "coordinates": [39.163164, 116.354244],
          "location": "Langfang, Hebei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/htfxj.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Jiahe Garden in Sky · 家和空中花园",
          "coordinates": [29.475417, 109.406526],
          "location": "Enshi, Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/jhhy.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Jinnanwan · 金澜湾",
          "coordinates": [27.502244, 106.234353],
          "location": "Bijie, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/jlw.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Jiangnanyipin · 江南一品",
          "coordinates": [27.754975, 107.461993],
          "location": "Zunyi, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/jnyp.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Jiangxiangmingmen · 将相名门",
          "coordinates": [28.175622, 109.185229],
          "location": "Tongren, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/jxmm.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Jinsha · 金沙将相名门",
          "coordinates": [27.497812, 106.233872],
          "location": "Jinsha, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/jsjxmm.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Guiyuan · 盘州府壹号",
          "coordinates": [25.692363, 104.485536],
          "location": "Liupanshui, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/pzf.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Taifu Wutongxi · 泰府梧桐栖",
          "coordinates": [36.568705, 111.742927],
          "location": "Huozhou, Shanxi, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/tf.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Yuheyuan · 通盛御河园",
          "coordinates": [28.309843, 106.225531],
          "location": "Zaozhuang, Shandong, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/tsyhy.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Yuheyuan · 文璟上府",
          "coordinates": [26.24033, 109.140568],
          "location": "Liping, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/wjsf.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Dongsheng - 芯宸时代",
          "coordinates": [29.681751, 109.162283],
          "location": "Enshi，Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/xcsd.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Lvcheng · 迎宾华府",
          "coordinates": [39.122386, 116.415274],
          "location": "Langfang, Hebei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/ybhf.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Jiahe · 雲尚星城",
          "coordinates": [29.688752, 109.149443],
          "location": "Enshi, Hubei, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/ysxc.jpg"
        },
        {
          "type": "project",
          "name": "Interactive 360° Virtual Tour Application",
          "client": "Yuecheng · 悦城",
          "coordinates": [27.579996, 106.864341],
          "location": "Zunyi, Guizhou, China",
          "year": "2020-2021",
          "link": "",
          "img": "/vr/zyyc.jpg"
        },
        {
          "type": "project",
          "name": "Tenglong Cave",
          "client": "腾龙洞",
          "coordinates": [30.3335111, 108.98434],
          "location": "Lichuan, Hubei, China",
          "year": "2019",
          "link": "http://tenglongdong.net.cn/",
          "img": "/website/tenglongdong.jpg"
        },
        {
          "type": "project",
          "name": "Badong Tourism Bureau",
          "client": "巴东县旅游局",
          "coordinates": [31.0419753, 110.3386598],
          "location": "Badong, Hubei, China",
          "year": "2019",
          "link": "",
          "img": ""
        },
        {
          "type": "project",
          "name": "Jinguo Tea",
          "client": "金果茶叶",
          "coordinates": [30.2889132, 110.2148372],
          "location": "Badong, Hubei, China",
          "year": "2019",
          "link": "",
          "img": ""
        },
        {
          "type": "project",
          "name": "Enshi Central Hospital",
          "client": "恩施州中心医院",
          "coordinates": [30.297884, 109.4955927],
          "location": "Enshi, Hubei, China",
          "year": "2019",
          "link": "https://www.es9e.cn/",
          "img": "/website/es9e.jpg"
        },
        {
          "type": "project",
          "name": "FitsGo",
          "client": "Mobile App",
          "coordinates": [-45.8750186, 170.4973482],
          "location": "Dunedin, New Zealand",
          "year": "2019",
          "link": "https://github.com/aemooooon/FitsGo",
          "img": "/fitsgo/fitsgo.02.png"
        },
        {
          "type": "project",
          "name": "Travel Assistant",
          "client": "Mobile App",
          "coordinates": [-45.8710403, 170.4855276],
          "location": "Dunedin, New Zealand",
          "year": "2019",
          "link": "https://github.com/aemooooon/travel-assistant",
          "img": "/travelassistant/ta02.jpg"
        },
        {
          "type": "project",
          "name": "ECAN Data Pipeline",
          "client": "University of Canterbury",
          "coordinates": [-43.5357406, 172.6358119],
          "location": "Christchurch, New Zealand",
          "year": "2024",
          "link": "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
          "img": "/data472/v1.gif",
        },
        {
          "type": "activity",
          "name": "CITANZ CHCH Events",
          "client": "Chinese IT Association New Zealand",
          "coordinates": [-43.5828903, 172.5695089],
          "location": "Halswell Library, Christchurch",
          "year": "2024-2025",
          "link": "https://www.cita.org.nz/",
          "img": "/citanz/cita-04.5.jpg"
        },
        {
          "type": "activity",
          "name": "Save Kiwi",
          "client": "AI Hackathon 2024",
          "coordinates": [-43.5218726, 172.5674936],
          "location": "University of Canterbury",
          "year": "2024",
          "link": "https://www.cita.org.nz/",
          "img": "/f4/f4.jpg"
        }
      ],

      // Gallery数据配置 - 使用真实照片数据 (17张图片，每面墙6张，共12张在主墙，其余5张在其他位置)
      gallery: [
        {
          id: 'gallery_1',
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
          date: '2025-08-11',
          tags: ['data', 'engineering', 'technology']
        },
        {
          id: 'gallery_2',
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
          date: '2025-08-11',
          tags: ['project', 'development', 'showcase']
        },
        {
          id: 'gallery_3',
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
          date: '2025-08-11',
          tags: ['innovation', 'technology', 'solution']
        },
        {
          id: 'gallery_4',
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
          date: '2025-08-11',
          tags: ['landscape', 'nature', 'vista']
        },
        {
          id: 'gallery_5',
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
          date: '2025-08-11',
          tags: ['creative', 'composition', 'artistic']
        },
        {
          id: 'gallery_6',
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
          date: '2025-08-11',
          tags: ['design', 'elements', 'fundamental']
        },
        {
          id: 'gallery_7',
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
          date: '2025-08-11',
          tags: ['color', 'theory', 'demonstration']
        },
        {
          id: 'gallery_8',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154055_640.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154055_640.jpg',
          title: {
            en: 'Artistic Vision',
            zh: '艺术视野'
          },
          description: {
            en: 'Contemporary artistic vision exploration',
            zh: '当代艺术视野探索'
          },
          date: '2025-08-11',
          tags: ['artistic', 'vision', 'contemporary']
        },
        {
          id: 'gallery_9',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154130_992.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154130_992.jpg',
          title: {
            en: 'Visual Harmony',
            zh: '视觉和谐'
          },
          description: {
            en: 'Perfect visual harmony in composition',
            zh: '构图中的完美视觉和谐'
          },
          date: '2025-08-11',
          tags: ['visual', 'harmony', 'composition']
        },
        {
          id: 'gallery_10',
          type: 'image',
          src: '/gallery/hua.nz.1.png',
          thumbnail: '/gallery/hua.nz.1.png',
          title: {
            en: 'Creative Expression',
            zh: '创意表达'
          },
          description: {
            en: 'Innovative creative expression in digital art',
            zh: '数字艺术中的创新创意表达'
          },
          date: '2025-08-11',
          tags: ['creative', 'expression', 'digital']
        },
        {
          id: 'gallery_11',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154149_254.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154149_254.jpg',
          title: {
            en: 'Modern Aesthetics',
            zh: '现代美学'
          },
          description: {
            en: 'Modern aesthetic principles demonstration',
            zh: '现代美学原理演示'
          },
          date: '2025-08-11',
          tags: ['modern', 'aesthetics', 'principles']
        },
        {
          id: 'gallery_12',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154154_737.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154154_737.jpg',
          title: {
            en: 'Pattern Innovation',
            zh: '图案创新'
          },
          description: {
            en: 'Innovative pattern design exploration',
            zh: '创新图案设计探索'
          },
          date: '2025-08-11',
          tags: ['pattern', 'innovation', 'design']
        },
        {
          id: 'gallery_13',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154159_687.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154159_687.jpg',
          title: {
            en: 'Digital Artistry',
            zh: '数字艺术性'
          },
          description: {
            en: 'Advanced digital artistry techniques',
            zh: '先进的数字艺术技巧'
          },
          date: '2025-08-11',
          tags: ['digital', 'artistry', 'techniques']
        },
        {
          id: 'gallery_14',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154210_322.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154210_322.jpg',
          title: {
            en: 'Visual Synthesis',
            zh: '视觉合成'
          },
          description: {
            en: 'Complex visual synthesis and composition',
            zh: '复杂的视觉合成与构图'
          },
          date: '2025-08-11',
          tags: ['visual', 'synthesis', 'composition']
        },
        {
          id: 'gallery_15',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154217_372.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154217_372.jpg',
          title: {
            en: 'Abstract Beauty',
            zh: '抽象之美'
          },
          description: {
            en: 'Pure abstract beauty in visual form',
            zh: '纯粹的视觉抽象之美'
          },
          date: '2025-08-11',
          tags: ['abstract', 'beauty', 'visual']
        },
        {
          id: 'gallery_16',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154236_734.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154236_734.jpg',
          title: {
            en: 'Geometric Perfection',
            zh: '几何完美'
          },
          description: {
            en: 'Perfect geometric patterns and structures',
            zh: '完美的几何图案与结构'
          },
          date: '2025-08-11',
          tags: ['geometric', 'perfection', 'patterns']
        },
        {
          id: 'gallery_17',
          type: 'image',
          src: '/gallery/Image_2025-08-11_154240_669.jpg',
          thumbnail: '/gallery/Image_2025-08-11_154240_669.jpg',
          title: {
            en: 'Artistic Mastery',
            zh: '艺术精通'
          },
          description: {
            en: 'Demonstration of complete artistic mastery',
            zh: '完整艺术精通的演示'
          },
          date: '2025-08-11',
          tags: ['artistic', 'mastery', 'demonstration']
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
        const { locations } = get();
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

      // 获取项目描述（支持多语言和多段落）
      getProjectDescription: (project, language) => {
        if (!project?.description) return '';
        if (typeof project.description === 'object' && project.description !== null) {
          const description = project.description[language] || project.description.en || project.description.zh || '';
          // 如果是数组，返回数组；如果是字符串，返回字符串
          return description;
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
