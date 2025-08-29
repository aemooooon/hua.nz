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
    cubeImage: "/gallery/gallery-horizontal-12.jpg",
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
      learnMore: "Learn more",
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
        allProjects: "All Projects",
        all: "All",
        other: "Other"
      },
      // 地图相关文本
      map: {
        resetToDefaultView: "Reset to default view",
        closeMap: "Close map",
        title: "Project Geo Distribution",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        locateMe: "Locate me",
        categories: "Categories"
      }
    },
    gallery: {
      title: "Photo Gallery",
      subtitle: "Visual journey through my work and experiences",
      description: "A curated collection of visual projects and creative works.",
      viewImage: "View Image",
      // 移动端画廊配置
      mobile: {
        title: "Gallery",
        subtitle: "Each photo carries unique stories.",
        tapHint: "Tap images to view full size",
        loadingMore: "Loading more...",
        showing: "Showing",
        images: "images",
        tapToView: "Tap to view full size",
        noContent: "No gallery items available",
        tryAgain: "Please try again later",
        mobileNotice: {
          title: "Mobile Experience Notice",
          description: "The 3D gallery uses first-person navigation technology requiring keyboard and mouse controls. For the best experience, we recommend using a desktop device.",
          viewGallery: "View Image Gallery",
          desktopHint: "Or visit on desktop for the full 3D gallery experience"
        }
      },
      // 3D Gallery 配置
      gallery3D: {
        title: "Corridor of Light and Shadow",
        subtitle: "Immersive 3D Art Experience",
        description: "Enter a professionally curated virtual gallery space showcasing visual works in an interactive 3D environment.",
        instructions: {
          clickToStart: "Click to enter the gallery",
          howToPlay: "How to Play?",
          clickToEnter: "Click to enter the gallery",
          mouseControl: "Mouse - Look around and explore",
          keyboardControl: "Move through the gallery",
          escapeControl: "Exit pointer lock mode",
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
          logo: "/education/unicanterburylogo.png",
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
              image: "/education/swapbytes.jpg"
            },
            {
              name: "Digital Pet",
              description: "A blockchain-based virtual pet dApp on Secret Network. Built a CosmWasm smart contract using Rust and a React frontend.",
              technologies: ["Rust", "CosmWasm", "React", "Secret Network"],
              githubUrl: "https://github.com/aemooooon/digital-pet",
              image: "/education/digitalpet.jpg"
            },
            {
              name: "ECAN Data Pipeline",
              description: "A collaborative cloud-based automation system for collecting and processing environmental data from 17 different sources.",
              technologies: ["Apache Airflow", "Python", "GraphQL", "AWS"],
              githubUrl: "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
              image: "/education/ecan.jpg"
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
          logo: "/education/otago-polytechnic-vertical-blue.svg",
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
              image: "/education//awared-best-programmer.jpg"
            },
            {
              title: "Excellence in the Bachelor of Information Technology",
              year: "2019",
              image: "/education/awared-excellence.jpg"
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
              image: "/fitsgo/fitsgo.02.jpg"
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
      phone: "+64 21 *** 0520",
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
      slogan: "驭混沌而立秩序；执中庸以启新象。"
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
              "夫天地演数，阴阳化爻，臣以一介码农，躬耕于比特之野十载有余。初习jQuery古法，今研React新道，历经诸侯之网站，掌CMS之枢机，筑内廷之系统，驭数据于方寸。然臣心向星辰，醉心图形之域，每有涉猎，必穷Shader之变，究光影之妙，合生成之艺于万维网中，此臣技之所寄也。",
              "臣闻《易》云：“形而上者谓之道，形而下者谓之器。”臣之所驱，正在道器相融：散落之用户故事，臣析为清明；纷杂之技术桎梏，臣以无执之心破之。盖语言框架，不过器物；逻辑创造，方见精神。是故代码非止于功用，亦载文心，融设计、实现与叙事于一炉，犹《诗》之兴观群怨，皆可托于数行之间。",
              "臣虽主营前后二端，然未尝忘怀运维之策、容器之术与云之平台。更修数据科学之硕学，深研算法之精微，管道之纤畅。诚如《道德经》所言：“图难于其易，为大于其细”，臣每日所行，皆在混沌中求秩序，于权衡处创新篇——此乃臣平生之志也。",
              "今托心于代码，寄志于云端，惟愿以技术立命，以创造安身，虽世变时移，此心不易。"
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
      title: "累岁所成",
      subtitle: "列艺斯观",
      bottomSubtitle: "每个项目都代表着独特的挑战和学习之旅",
      description: "从全栈Web开发到3D沉浸式体验，从计算机科学，图形学，到数据科学 — 探索多样的技术与解决方案。",
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
      learnMore: "了解更多",
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
        allProjects: "全部项目",
        all: "全部",
        other: "其他"
      },
      // 地图相关文本
      map: {
        resetToDefaultView: "重置到默认视图",
        closeMap: "关闭地图",
        title: "项目地理分布",
        zoomIn: "放大",
        zoomOut: "缩小",
        locateMe: "定位我的位置",
        categories: "项目类别"
      }
    },
    gallery: {
      title: "照片画廊",
      subtitle: "通过视觉展示我的工作和经历",
      description: "精心策划的视觉项目和创意作品集合。",
      viewImage: "查看图片",
      // 移动端画廊配置
      mobile: {
        title: "作品集",
        subtitle: "记录生活中的美好瞬间，每一张照片都承载着独特的故事与回忆。",
        tapHint: "点击图片查看大图",
        loadingMore: "加载更多图片...",
        showing: "已显示",
        images: "张图片",
        tapToView: "点击查看大图",
        noContent: "暂无图片内容",
        tryAgain: "请稍后再试",
        mobileNotice: {
          title: "移动端体验提示",
          description: "3D 画廊采用第一人称漫游技术，需要键盘和鼠标操作，移动端体验可能不佳。建议使用桌面设备以获得最佳浏览效果。",
          viewGallery: "继续浏览图片集",
          desktopHint: "或在桌面设备上体验完整的 3D 画廊"
        }
      },
      // 3D Gallery 配置
      gallery3D: {
        title: "浮生长廊",
        subtitle: "沉浸式3D艺术体验",
        description: "步入专业策展的虚拟画廊空间，在交互式3D环境中欣赏视觉作品。",
        instructions: {
          clickToStart: "点击进入",
          howToPlay: "如何操作？",
          clickToEnter: "点击进入长廊",
          mouseControl: "鼠标 - 环视周围，探索画作",
          keyboardControl: "移动穿行长廊",
          escapeControl: "退出指针锁定模式",
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
          logo: "/education/unicanterburylogo.png",
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
              image: "/education/swapbytes.jpg"
            },
            {
              name: "数字宠物",
              description: "基于Secret Network的区块链虚拟宠物dApp。使用Rust构建CosmWasm智能合约，React前端。",
              technologies: ["Rust", "CosmWasm", "React", "Secret Network"],
              githubUrl: "https://github.com/aemooooon/digital-pet",
              image: "/education/digitalpet.jpg"
            },
            {
              name: "坎特伯雷环境部数据管线",
              description: "协作式云端自动化系统，用于从17个不同来源收集和处理环境数据。",
              technologies: ["Apache Airflow", "Python", "GraphQL", "AWS"],
              githubUrl: "https://github.com/aemooooon/DATA472-Individual-Project-Submission",
              image: "/education/ecan.jpg"
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
          logo: "/education/otago-polytechnic-vertical-blue.svg",
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
              image: "/education/awared-best-programmer.jpg"
            },
            {
              title: "信息技术学士优秀奖",
              year: "2019",
              image: "/education/awared-excellence.jpg"
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
              image: "/fitsgo/fitsgo.02.jpg"
            }
          ]
        }
      ]
    },
    contact: {
      title: "青鸟殷勤",
      subtitle: "翘盼汝之玉音",
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
          "type": {
            "en": "Front End",
            "zh": "前端开发"
          },
          "title": {
            "en": "Front End Developer",
            "zh": "前端开发工程师"
          },
          "name": {
            "en": "Corridor of Light and Shadow",
            "zh": "浮生长廊"
          },
          "company": "Hua Wang",
          "description": {
            "en": [
              "As I actively pursue web development opportunities and prepare for technical interviews, I created this personal portfolio to dynamically showcase my skills and demonstrate my expertise in modern web development. This immersive digital experience serves as a living testament to my capabilities, presenting both my professional journey and technical mastery through interactive storytelling and cutting-edge implementation.",
              "The application leverages React 18 with modern hooks architecture, utilizing useState, useEffect, useCallback, and useMemo for efficient state management and component optimization. Vite serves as the build tool with custom configuration for ES modules, tree-shaking, and optimized chunk splitting. Advanced state management is implemented through Zustand with persistence middleware, featuring centralized store patterns, reactive state updates, and immutable state transformations for predictable data flow. Comprehensive internationalization (i18n) system supports English and Chinese with dynamic language switching, persistent user preferences, and culturally appropriate content adaptation.",
              "The standout feature is an immersive 3D animated cube opening sequence powered by GSAP timeline animations and Three.js WebGL rendering. Advanced WebGL performance optimization includes geometry instancing, texture atlasing, and efficient memory management to maintain 60fps across devices. Multiple dynamic themes are supported through a sophisticated CSS custom properties system with runtime switching, CSS-in-JS integration, and blend mode effects for visual harmony.",
              "Complex SPA architecture employs custom routing logic with section-based navigation, implementing smooth scrolling algorithms with intersection observers and momentum-based transitions. Advanced scroll management includes scroll hijacking, directional detection, and synchronized animation systems. The intelligent cursor system features context-aware hover effects, directional tracking, and smooth interpolation between interaction states using custom mouse tracking algorithms. Comprehensive responsive design ensures optimal user experience across desktop, tablet, and mobile devices with fluid layouts, adaptive typography scaling, and touch-optimized interactions.",
              "Performance optimization includes strategic code splitting with React.lazy and dynamic imports, WebGL resource pooling, texture compression, and efficient animation frame management. The application implements comprehensive error boundaries, progressive enhancement patterns, and accessibility features including ARIA labels, keyboard navigation support, and semantic HTML structure. Advanced CSS techniques include mix-blend-mode compositions, backdrop-filter effects, and GPU-accelerated animations.",
              "The project showcases modern development workflows including ESLint and Prettier integration, component-driven development with atomic design principles, and comprehensive DevOps practices. Automated CI/CD pipeline is implemented through GitHub Actions, featuring automated testing, code quality checks, and seamless deployment to GitHub Pages with zero-downtime releases. The architecture demonstrates clean separation of concerns with custom hooks abstraction, utility-first CSS methodology, and maintainable code patterns suitable for enterprise-scale applications."
            ],
            "zh": [
              "在我积极寻找web开发机会并为技术面试做准备的过程中，我创建了这个个人作品集来动态展示我的技能，并展现我在现代web开发方面的专业能力。这个沉浸式数字体验作为我能力的生动证明，通过交互式叙述和前沿技术实现，展现了我的职业历程和技术精通。",
              "应用程序采用React 18现代hooks架构，利用useState、useEffect、useCallback和useMemo实现高效的状态管理和组件优化。Vite作为构建工具，配置了ES模块、树摇优化和优化的代码块分割。高级状态管理通过Zustand持久化中间件实现，具有集中式存储模式、响应式状态更新和不可变状态转换，确保可预测的数据流。全面的国际化(i18n)系统支持中英文动态语言切换、持久化用户偏好和文化适应性内容调整。",
              "突出特色是由GSAP时间轴动画和Three.js WebGL渲染驱动的沉浸式3D立方体开场序列。先进的WebGL性能优化包括几何体实例化、纹理图集和高效内存管理，在各种设备上保持60fps。通过复杂的CSS自定义属性系统支持多种动态主题，具有运行时切换、CSS-in-JS集成和用于视觉和谐的混合模式效果。",
              "复杂的SPA架构采用基于章节导航的自定义路由逻辑，实现带有交叉观察器和基于动量转换的平滑滚动算法。高级滚动管理包括滚动劫持、方向检测和同步动画系统。智能光标系统具有上下文感知的悬停效果、方向跟踪，以及使用自定义鼠标跟踪算法在交互状态间的平滑插值。全面的响应式设计确保在桌面、平板和移动设备上的最佳用户体验，具有流式布局、自适应字体缩放和触控优化交互。",
              "性能优化包括使用React.lazy和动态导入的策略性代码分割、WebGL资源池、纹理压缩和高效的动画帧管理。应用程序实现了全面的错误边界、渐进增强模式和无障碍功能，包括ARIA标签、键盘导航支持和语义HTML结构。高级CSS技术包括混合模式合成、背景滤镜效果和GPU加速动画。",
              "项目展示了现代开发工作流程，包括ESLint和Prettier集成、基于原子设计原则的组件驱动开发和全面的DevOps实践。通过GitHub Actions实现自动化CI/CD流水线，具有自动化测试、代码质量检查和零停机部署到GitHub Pages的无缝发布。架构展示了关注点的清晰分离，具有自定义hooks抽象、实用优先的CSS方法论和适合企业级应用程序的可维护代码模式。"
            ]
          },
          "coordinates": [-43.5224316, 172.5943064],
          "location": "Christchurch, New Zealand",
          "year": "2025",
          "links": {
            "live": "https://www.hua.nz/",
            "github": "https://github.com/aemooooon/hua.nz"
          },
          "img": ["/hua.nz/hua.nz.1.jpg", "/hua.nz/hua.nz.2.jpg", "/hua.nz/hua.nz.3.jpg", "/hua.nz/hua.nz.4.jpg", "/hua.nz/hua.nz.5.jpg", "/hua.nz/hua.nz.6.jpg", "/hua.nz/hua.nz.7.jpg", "/hua.nz/hua.nz.8.jpg", "/hua.nz/hua.nz.9.jpg", "/hua.nz/hua.nz.10.jpg", "/hua.nz/hua.nz.11.jpg", "/hua.nz/hua.nz.12.jpg", "/hua.nz/hua.nz.13.jpg", "/hua.nz/hua.nz.14.jpg", "/hua.nz/hua.nz.15.jpg", "/hua.nz/hua.nz.16.jpg", "/hua.nz/hua.nz.17.jpg" ]
        },
        {
          "type": {
            "en": "Full Stack",
            "zh": "全栈开发"
          },
          "title": {
            "en": "Full Stack Developer",
            "zh": "全栈开发工程师"
          },
          "name": {
            "en": "Orchard Sampling Scheduler",
            "zh": "果园采样调度系统"
          },
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
              "本项目是为新西兰领先的奇异果企业佳沛（Zespri International）设计与实现的一套果园采样优化平台，旨在解决丰盛湾地区数百个果园的采样调度问题。系统的核心目标是应对时间窗口、地理分布与作业效率等多重挑战，在保障果实品质评估的同时提高整体采样效率。",
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
          "type": {
            "en": "Front End",
            "zh": "前端开发"
          },
          "title": {
            "en": "Front End Developer",
            "zh": "前端开发工程师"
          },
          "name": {
            "en": "Realibox Portal",
            "zh": "引力波官方门户"
          },
          "company": "Realibox",
          "description": {
            "en": [
              "As a Senior Frontend Developer at Realibox, I led the development of the official website and marketing portal for a cutting-edge 3D cloud collaboration platform. This enterprise-level project showcased advanced frontend architecture and served as the primary marketing gateway for Realibox's comprehensive 3D design ecosystem, targeting professional designers, architects, and enterprise clients across multiple industries.",
              "The application was built with Next.js 12 featuring server-side rendering (SSR) for optimal SEO performance and lightning-fast page loads. Implemented sophisticated device detection and adaptive rendering, providing separate optimized experiences for desktop and mobile clients through dynamic component loading. Advanced state management was achieved using MobX with reactive patterns, enabling real-time UI updates and efficient cross-component data synchronization across complex user workflows.",
              "Architected a sophisticated multi-theme CSS system using CSS modules, LESS preprocessor, and runtime theme switching capabilities. Implemented advanced responsive design patterns supporting seamless transitions between desktop and mobile layouts with fluid typography scaling, touch-optimized interactions, and adaptive navigation structures. The design system featured custom CSS blend modes, GPU-accelerated animations, and sophisticated visual effects that enhanced user engagement while maintaining optimal performance.",
              "Complex single-page application (SPA) architecture employed custom routing logic with smooth section-based navigation, implementing intersection observers for scroll-triggered animations and dynamic content loading. Advanced scroll management included momentum-based transitions, directional detection, and synchronized animation sequences that created an immersive storytelling experience. Integrated Swiper.js for touch-enabled carousels and interactive content presentation.",
              "Performance optimization strategies included strategic code splitting with dynamic imports, image optimization supporting WebP and modern formats, lazy loading implementations, and efficient bundle management. Implemented comprehensive error boundaries, progressive loading states, and robust exception handling. Advanced DevOps practices included GitLab CI/CD pipeline automation with multi-environment deployments, automated testing workflows, and zero-downtime production releases.",
              "The project demonstrated enterprise-scale frontend development capabilities including component-driven architecture with atomic design principles, comprehensive TypeScript integration, and maintainable code patterns suitable for large development teams. Collaborated extensively with UX/UI designers, product managers, and backend engineers in an Agile environment, ensuring pixel-perfect implementation and seamless API integration for dynamic content management."
            ],
            "zh": [
              "作为Realibox的高级前端开发工程师，我主导开发了前沿3D云协作平台的官方网站和营销门户。这个企业级项目展示了先进的前端架构，作为Realibox综合3D设计生态系统的主要营销门户，面向多个行业的专业设计师、建筑师和企业客户。",
              "应用程序使用Next.js 12构建，具有服务器端渲染(SSR)功能，实现最佳SEO性能和闪电般的页面加载速度。实现了复杂的设备检测和自适应渲染，通过动态组件加载为桌面和移动客户端提供单独优化的体验。使用MobX的响应式模式实现高级状态管理，在复杂用户工作流程中实现实时UI更新和高效的跨组件数据同步。",
              "架构了复杂的多主题CSS系统，使用CSS模块、LESS预处理器和运行时主题切换功能。实现了先进的响应式设计模式，支持桌面和移动布局之间的无缝转换，具有流式字体缩放、触控优化交互和自适应导航结构。设计系统具有自定义CSS混合模式、GPU加速动画和复杂视觉效果，在保持最佳性能的同时增强用户参与度。",
              "复杂的单页应用程序(SPA)架构采用自定义路由逻辑和平滑的基于章节的导航，实现交叉观察器进行滚动触发动画和动态内容加载。高级滚动管理包括基于动量的转换、方向检测和同步动画序列，创造沉浸式叙述体验。集成Swiper.js实现触控轮播和交互式内容展示。",
              "性能优化策略包括使用动态导入的策略性代码分割、支持WebP和现代格式的图像优化、懒加载实现和高效的包管理。实现了全面的错误边界、渐进加载状态和健壮的异常处理。先进的DevOps实践包括GitLab CI/CD流水线自动化、多环境部署、自动化测试工作流程和零停机生产发布。",
              "项目展示了企业级前端开发能力，包括基于原子设计原则的组件驱动架构、全面的TypeScript集成，以及适合大型开发团队的可维护代码模式。在敏捷环境中与UX/UI设计师、产品经理和后端工程师广泛协作，确保像素完美的实现和动态内容管理的无缝API集成。"
            ]
          },
          "coordinates": [22.9951158, 113.3335372],
          "location": "Guangzhou, China",
          "year": "2021-2023",
          "links": {
            "live": "https://www.realibox.com/",
          },
          "img": ["/realibox/official/official.01.jpg", "/realibox/official/official.02.jpg", "/realibox/official/official.03.jpg"]
        },
        {
          "type": {
            "en": "Front End",
            "zh": "前端开发"
          },
          "title": {
            "en": "Front End Developer",
            "zh": "前端开发工程师"
          },
          "name": {
            "en": "Realibox Hub & 3D Editor",
            "zh": "引力波3D编辑器"
          },
          "company": "Realibox",
          "description": {
            "en": [
              "As a Senior Frontend Developer at Realibox, I architected and developed a comprehensive cloud-based 3D design platform comprising five interconnected microservice repositories. This sophisticated system provided professional designers and enterprises with advanced 3D modeling, rendering, and collaboration capabilities through a modular, scalable architecture that demonstrated mastery of modern web development and distributed system design.",
              "The platform was built using cutting-edge technologies including React 18, Vite as the build tool for lightning-fast development experience, and MobX 6 for reactive state management across complex application workflows. Implemented comprehensive TypeScript integration throughout all microservices, ensuring type safety and maintainable code architecture. The system utilized advanced WebGL-based 3D rendering engines with custom canvas implementations for real-time 3D scene manipulation and high-performance visualization.",
              "Architected a sophisticated microservice ecosystem with five specialized repositories: designhub-accounts-web for user authentication and account management, designhub-common-core containing shared utilities and business logic, designhub-common-ui housing reusable UI components, designhub-hub-web serving as the main platform dashboard, and ishot-editor-web providing the core 3D editing capabilities. Each service was designed with clear separation of concerns and robust API integrations.",
              "The core 3D editor featured advanced WebGL rendering capabilities with real-time scene manipulation, material editing systems, collaborative editing features, and cloud-based project synchronization. Implemented sophisticated state management using MobX stores for editor, scene, render, material, and user management. The system supported complex 3D workflows including model importing, texture management, lighting control, and high-quality rendering pipelines with performance optimization for handling large 3D assets.",
              "Implemented comprehensive DevOps practices including automated CI/CD pipelines using GitLab, multi-environment deployment strategies, and advanced package management with pnpm workspaces and Turbo for efficient monorepo operations. Utilized Changesets for version management and automated npm package publishing to private registries. The system featured robust error handling, comprehensive testing with Vitest and Cypress, and progressive loading strategies for optimal user experience.",
              "The project demonstrated enterprise-scale frontend development capabilities including component-driven architecture with atomic design principles, advanced internationalization support, theme management systems, and accessibility features. Collaborated extensively with backend engineers, 3D graphics specialists, and product teams in an Agile environment, ensuring seamless integration of complex 3D workflows with intuitive user interfaces and robust cloud infrastructure."
            ],
            "zh": [
              "作为Realibox的高级前端开发工程师，我参与架构并开发了一个全面的云端3D设计平台，包含五个相互连接的微服务代码库。这个复杂的系统为专业设计师和企业提供了先进的3D建模、渲染和协作功能，通过模块化、可扩展的架构展示了现代web开发和分布式系统设计的精通。",
              "平台采用前沿技术构建，包括React 18、Vite作为构建工具提供闪电般的开发体验，以及MobX 6用于复杂应用程序工作流程的响应式状态管理。在所有微服务中实现了全面的TypeScript集成，确保类型安全和可维护的代码架构。系统利用先进的基于WebGL的3D渲染引擎和自定义canvas实现，实现实时3D场景操作和高性能可视化。",
              "架构了复杂的微服务生态系统，包含五个专门的代码库：designhub-accounts-web用于用户认证和账户管理，designhub-common-core包含共享工具和业务逻辑，designhub-common-ui存放可重用UI组件，designhub-hub-web作为主要平台仪表板，ishot-editor-web提供核心3D编辑功能。每个服务都设计了清晰的关注点分离和健壮的API集成。",
              "核心3D编辑器具有先进的WebGL渲染功能，包括实时场景操作、材质编辑系统、协作编辑功能和云端项目同步。使用MobX存储实现了复杂的状态管理，包括编辑器、场景、渲染、材质和用户管理。系统支持复杂的3D工作流程，包括模型导入、纹理管理、光照控制和高质量渲染管道，并对处理大型3D资产进行了性能优化。",
              "实现了全面的DevOps实践，包括使用GitLab的自动化CI/CD流水线、多环境部署策略，以及使用pnpm工作空间和Turbo进行高效monorepo操作的先进包管理。利用Changesets进行版本管理和自动化npm包发布到私有注册表。系统具有健壮的错误处理、使用Vitest和Cypress的全面测试，以及用于最佳用户体验的渐进加载策略。",
              "项目展示了企业级前端开发能力，包括基于原子设计原则的组件驱动架构、先进的国际化支持、主题管理系统和无障碍功能。在敏捷环境中与后端工程师、3D图形专家和产品团队广泛协作，确保复杂3D工作流程与直观用户界面和健壮云基础设施的无缝集成。"
            ]
          },
          "coordinates": [22.9951158, 113.3335372],
          "location": "Guangzhou, China",
          "year": "2021-2023",
          "links": {
            "live": "https://hub.realibox.com/",
          },
          "img": ["/realibox/editor/editor.01.jpg", "/realibox/editor/editor.02.jpg", "/realibox/editor/editor.03.jpg", "/realibox/editor/realibox.00.jpg", "/realibox/editor/editor.04.jpg", "/realibox/editor/editor.05.jpg", "/realibox/editor/editor.06.jpg"]
        },
        {
          "type": {
            "en": "Full Stack",
            "zh": "全栈开发"
          },
          "tags": ["Data Engineer"],
          "title": {
            "en": "Full Stack Developer",
            "zh": "全栈开发工程师"
          },
          "name": {
            "en": "Real-time AQI Platform",
            "zh": "实时空气质量发布（大数据）平台"
          },
          "company": "Enshi Environmental Agency",
          "description": {
            "en": [
              "Real-time AQI Platform is a comprehensive air quality monitoring system that I developed for environmental health awareness. The platform combines advanced data engineering with modern web technologies to provide real-time air quality insights to the public. This full-stack application demonstrates my ability to build complex systems that handle real-time data processing, web scraping, and interactive visualizations.",
              "The backend is built with Spring Boot 2.4 and follows a robust microservices architecture. I implemented scheduled data collection tasks that automatically fetch XML data from government environmental APIs every 30 minutes for hourly data and daily at 10 AM for daily summaries. The system uses JDOM2 for XML parsing, cleaning and transforming raw environmental data into structured objects. MyBatis Plus handles database operations with MySQL 5.7 for persistent storage, while Redis provides caching and session management.",
              "The data pipeline is a key component that showcases my data engineering skills. XML web services provide data for multiple monitoring stations, measuring PM2.5, PM10, SO2, NO2, CO, and O3 levels. My custom data cleaning algorithms filter out invalid readings, handle missing values, and perform unit conversions. The system calculates AQI values, determines health risk levels, and generates multilingual health recommendations. All processed data is automatically stored with proper indexing for fast retrieval.",
              "I developed three different frontend applications to serve different user needs. The main public interface uses vanilla JavaScript with ECharts for data visualization, featuring real-time gauge charts, trend analysis, heatmaps, and geographical mapping. The admin panel is built with React 17 and Ant Design, providing comprehensive system management, user authentication with JWT tokens, operation logging, and statistical dashboards. I also created a Vue.js version for enhanced interactivity.",
              "The platform includes innovative health awareness features that set it apart from basic monitoring systems. I implemented real-time health alerts that change color coding based on AQI levels, from green for good air quality to maroon for hazardous conditions. The Web Speech API integration provides voice announcements in English, reading current AQI values, health implications, and cautionary statements. Users receive contextual health advice like 'suitable for outdoor activities' or 'sensitive groups should limit outdoor exposure'.",
              "The technical architecture demonstrates enterprise-level development practices. I used Swagger 2 for API documentation, implemented AES encryption for sensitive configuration data, and built comprehensive logging systems for monitoring data collection activities. The frontend uses Webpack for asset bundling, Axios for HTTP requests, and responsive CSS with AOS animations. The admin system features role-based access control, operation auditing, and real-time statistics. This project showcases my ability to build scalable, user-focused applications that combine technical complexity with practical public health benefits."
            ],
            "zh": [
              "实时AQI平台是我为环保健康意识开发的综合空气质量监测系统。该平台将先进的数据工程与现代网络技术相结合，为公众提供实时空气质量洞察。这个全栈应用展示了我构建复杂系统的能力，包括实时数据处理、网络爬虫和交互式可视化。",
              "后端使用Spring Boot 2.4构建，遵循稳健的微服务架构。我实现了定时数据收集任务，每30分钟自动从政府环保API获取XML数据进行小时数据更新，每日上午10点获取日度汇总。系统使用JDOM2进行XML解析，清洗和转换原始环境数据为结构化对象。MyBatis Plus处理MySQL 5.7的数据库操作，Redis提供缓存和会话管理。",
              "数据管道是展示我数据工程技能的关键组件。XML网络服务提供多个监测站点的数据，测量PM2.5、PM10、SO2、NO2、CO和O3等级。我的自定义数据清洗算法过滤无效读数，处理缺失值，执行单位转换。系统计算AQI值，确定健康风险等级，生成多语言健康建议。所有处理后的数据自动存储并建立适当索引以便快速检索。",
              "我开发了三个不同的前端应用来满足不同用户需求。主要公共界面使用原生JavaScript配合ECharts进行数据可视化，包含实时仪表盘图表、趋势分析、热力图和地理映射。管理面板使用React 17和Ant Design构建，提供全面的系统管理、JWT令牌用户认证、操作日志记录和统计仪表板。我还创建了Vue.js版本以增强交互性。",
              "平台包含创新的健康意识功能，使其区别于基础监测系统。我实现了基于AQI等级的实时健康警报，颜色编码从良好空气质量的绿色到危险状况的栗色。Web Speech API集成提供英语语音播报，朗读当前AQI值、健康影响和注意事项。用户收到上下文健康建议，如'适合户外活动'或'敏感人群应限制户外暴露'。",
              "技术架构展示了企业级开发实践。我使用Swagger 2进行API文档化，为敏感配置数据实现AES加密，构建全面的日志系统监控数据收集活动。前端使用Webpack进行资产打包，Axios处理HTTP请求，响应式CSS配合AOS动画。管理系统具有基于角色的访问控制、操作审计和实时统计。这个项目展示了我构建可扩展、以用户为中心的应用程序的能力，将技术复杂性与实际公共健康效益相结合。"
            ]
          },
          "coordinates": [30.311395, 109.4795951],
          "location": "Enshi, Hubei, China",
          "year": "2020",
          "links": {
            "live": "https://aqi.eseemc.cn/",
          },
          "img": ["/aqi/aqi01.jpg", "/aqi/aqi02.jpg", "/aqi/aqi03.jpg", "/aqi/aqi04.jpg", "/aqi/aqi05.jpg", "/aqi/aqi06.jpg", "/aqi/aqi07.jpg", "/aqi/aqi08.jpg", "/aqi/aqi09.jpg", "/aqi/aqi10.jpg", "/aqi/aqi11.jpg", "/aqi/aqi12.jpg", "/aqi/aqi13.jpg"],
        },
        {
          "type": {
            "en": "WebGL",
            "zh": "WebGL开发"
          },
          "title": {
            "en": "Interactive 360° Virtual Tour Platform",
            "zh": "交互式360°虚拟漫游平台"
          },
          "name": {
            "en": "Real Estate VR Collections",
            "zh": "房地产VR作品集"
          },
          "company": "Neuclear Stone Digital",
          "description": {
            "en": "During a 2-year contract period with Neuclear Stone Digital, a specialized 3D animation studio focused on architectural and interior design visualization, I developed comprehensive web-based virtual reality solutions for real estate marketing. As the lead web developer, I transformed their high-quality 3D renderings and HDR imagery into interactive, cross-platform virtual tour experiences accessible across all devices and browsers. Working closely with their design team, I converted Photoshop mockups into responsive HTML/CSS interfaces and integrated WebGL technology to showcase immersive 3D environments including residential apartments, luxury interiors, commercial buildings, and entire residential complexes. The platform features sophisticated 3D scene navigation with multiple camera positions, allowing users to explore different rooms and areas through intuitive click-based interactions. I implemented interactive hotspot systems with contextual popup information, seamless scene transitions, and dynamic viewpoint switching capabilities. Each virtual tour includes social media integration with API connectivity for sharing functionality, complete with JWT token authentication for secure access. The technical implementation encompasses responsive design principles ensuring optimal performance across desktop, tablet, and mobile devices, with specialized mobile features including click-to-call functionality and integrated navigation services. Additional multimedia capabilities include background music integration, video playback systems, and comprehensive cross-browser compatibility testing. All applications were deployed and maintained on Alibaba Cloud EC2 servers with custom domain configurations. Throughout this engagement, I successfully delivered 17+ individual virtual tour projects spanning multiple provinces across China, establishing a scalable development framework that significantly enhanced the company's service offerings and client engagement capabilities.",
            "zh": "在与专注于建筑和室内设计可视化的3D动画工作室Neuclear Stone Digital为期2年的合同期间，我开发了用于房地产营销的综合性网络虚拟现实解决方案。作为首席网络开发人员，我将他们的高质量3D渲染图和HDR图像转换为可在所有设备和浏览器上访问的交互式跨平台虚拟导览体验。与他们的设计团队密切合作，我将Photoshop模拟图转换为响应式HTML/CSS界面，并集成WebGL技术展示沉浸式3D环境，包括住宅公寓、豪华室内设计、商业建筑和整个住宅小区。该平台具有复杂的3D场景导航功能，支持多个摄像机位置，允许用户通过直观的点击交互探索不同的房间和区域。我实现了带有上下文弹出信息的交互式热点系统、无缝场景切换和动态视点切换功能。每个虚拟导览都包括社交媒体集成，具有用于分享功能的API连接，配备JWT令牌认证确保安全访问。技术实现涵盖响应式设计原则，确保在桌面、平板和移动设备上的最佳性能，包括专门的移动功能如点击拨号和集成导航服务。其他多媒体功能包括背景音乐集成、视频播放系统和全面的跨浏览器兼容性测试。所有应用程序都部署并维护在阿里云EC2服务器上，配有自定义域名配置。在整个合作期间，我成功交付了17+个跨越中国多个省份的个人虚拟导览项目，建立了可扩展的开发框架，显著增强了公司的服务产品和客户参与能力。"
          },
          "coordinates": [30.2888597, 109.4846285],
          "location": "Multiple Provinces, China",
          "year": "2020-2021",
          "img": ["/vr/fhjy.jpg", "/vr/changpingli.jpg", "/vr/dalincheng.jpg", "/vr/gyyh.jpg", "/vr/htfxj.jpg", "/vr/jhhy.jpg", "/vr/jlw.jpg", "/vr/jxmm.jpg", "/vr/jsjxmm.jpg", "/vr/pzf.jpg", "/vr/tf.jpg", "/vr/wjsf.jpg", "/vr/xcsd.jpg", "/vr/ybhf.jpg", "/vr/ysxc.jpg", "/vr/zyyc.jpg", "/vr/tsyhy.jpg"]
        },
        {
          "type": {
            "en": "Website",
            "zh": "网站开发"
          },
          "title": {
            "en": "Corporate Website Development Platform",
            "zh": "企业网站开发平台"
          },
          "name": {
            "en": "Enterprises Portal Collections",
            "zh": "企业门户作品集"
          },
          "company": "Day Digital",
          "description": {
            "en": "Comprehensive enterprise web development solution encompassing both public-facing corporate websites and sophisticated internal business systems across diverse industries. Working with Day Digital, I developed multi-faceted web applications serving government agencies, healthcare institutions, tourism bureaus, and private enterprises throughout the project lifecycle. The portfolio spans from traditional corporate websites built with CMS platforms to complex internal enterprise systems utilizing ASP.NET and PHP technologies. For healthcare sector clients, I implemented specialized systems including patient health examination report query platforms with secure database integration, comprehensive appointment scheduling systems with real-time availability management, and patient portal interfaces. Corporate clients received tailored internal office management systems featuring employee workflow automation, document management, and inter-departmental communication tools. Additionally, I developed specialized applications including auction platforms for numismatic collections with bidding mechanisms and payment gateway integration, and construction engineering measurement data query systems with GPS coordinate mapping and project tracking capabilities. Each project required custom database architecture design, responsive UI implementation from design mockups, user authentication and authorization systems, and comprehensive deployment management across multiple production servers. The technical implementation involved extensive work with content management systems, database optimization, API integrations, and cross-platform compatibility ensuring seamless operation across desktop and mobile environments. All systems included administrative dashboards, data export capabilities, and robust security measures including role-based access control and data encryption protocols.",
            "zh": "涵盖面向公众的企业网站和复杂内部业务系统的综合性企业网络开发解决方案，服务于各个行业。与Day Digital合作期间，我为政府机构、医疗机构、旅游局和私营企业开发了多方面的网络应用程序，覆盖项目全生命周期。项目组合从使用CMS平台构建的传统企业网站扩展到使用ASP.NET和PHP技术的复杂内部企业系统。为医疗行业客户，我实施了专门的系统，包括带有安全数据库集成的患者健康体检报告查询平台、具有实时可用性管理的综合预约挂号系统，以及患者门户界面。企业客户获得了定制的内部办公管理系统，具有员工工作流程自动化、文档管理和部门间沟通工具。此外，我还开发了专门的应用程序，包括具有竞价机制和支付网关集成的钱币收藏品拍卖平台，以及具有GPS坐标映射和项目跟踪功能的建筑工程测量数据查询系统。每个项目都需要自定义数据库架构设计、从设计稿实现响应式UI、用户认证和授权系统，以及跨多个生产服务器的全面部署管理。技术实现涉及内容管理系统的大量工作、数据库优化、API集成和跨平台兼容性，确保在桌面和移动环境中的无缝操作。所有系统都包括管理仪表板、数据导出功能和强大的安全措施，包括基于角色的访问控制和数据加密协议。"
          },
          "coordinates": [30.297884, 109.4955927],
          "location": "Enshi, Hubei, China",
          "year": "2019",
          "link": "https://www.es9e.cn/",
          "img": ["/website/tenglongdong.jpg", "/website/enshitusicheng01.jpg", "/website/enshitusicheng02.jpg", "/website/yangshegnhefeng.jpg", "/website/es9e.jpg", "/website/enshizhoubowuguan.jpg", "/website/enshizhousheyingjiaxiehui.jpg"]
        },
        {
          "type": {
            "en": "Mobile Apps",
            "zh": "移动应用"
          },
          "title": {
            "en": "FitsGo",
            "zh": "FitsGo"
          },
          "name": {
            "en": "FitsGo",
            "zh": "FitsGo 健身追踪"
          },
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
          "img": ["/fitsgo/fitsgo.01.gif", "/fitsgo/fitsgo.02.jpg", "/fitsgo/fitsgo.03.jpg", "/fitsgo/fitsgo.04.jpg", "/fitsgo/fitsgo.05.jpg", "/fitsgo/fitsgo.06.jpg", "/fitsgo/fitsgo.07.jpg", "/fitsgo/fitsgo.08.jpg", "/fitsgo/fitsgo.09.jpg", "/fitsgo/fitsgo.10.jpg"]
        },
        {
          "type": {
            "en": "Mobile Apps",
            "zh": "移动应用"
          },
          "title": {
            "en": "Travel Assistant",
            "zh": "旅行助手"
          },
          "name": {
            "en": "Travel Assistant",
            "zh": "智能旅行助手"
          },
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
          "type": {
            "en": "Full Stack",
            "zh": "全栈开发"
          },
          "tags": ["Data Engineer"],
          "title": {
            "en": "ECAN Data Pipeline",
            "zh": "ECAN数据管道"
          },
          "name": {
            "en": "ECAN Data Pipeline",
            "zh": "坎特伯雷环境数据管道"
          },
          "company": "University of Canterbury",
          "description": {
            "en": [
              "ECAN Data Pipeline represents a large-scale collaborative data engineering project involving 22 students from the DATA472 course (Cloud Computing and Infrastructure Data Engineering) at University of Canterbury. I served as one of three core volunteer developers responsible for architecting and implementing the central data collection infrastructure. The project was initiated by a requirement from an ECAN (Environment Canterbury) employee who was also a student in our instructor's program, creating a real-world data engineering challenge for environmental monitoring in Canterbury.",
              "As the technical lead for backend infrastructure, I designed and implemented a comprehensive Apache Airflow-based data collection service that orchestrates automated ETL pipelines for over 20 individual student datasets. Each student sourced their own environmental data from ECAN's open data portal, and I created standardized data ingestion processors that handle diverse data formats including CSV, JSON, and XML. The Airflow DAGs run on scheduled intervals using CRON expressions, with daily and hourly collection patterns depending on data source requirements.",
              "The architecture utilizes AWS cloud infrastructure extensively, with PostgreSQL databases deployed on AWS RDS for centralized data storage and Express.js API services running on EC2 instances. I developed a Node.js Web API service with comprehensive Swagger documentation that provides RESTful endpoints for each student's dataset. The API implements proper error handling, Winston logging, and CORS configuration to support multiple frontend applications. Each student has their own dedicated route and processor, allowing for modular data management while maintaining system cohesion.",
              "My role extended beyond technical implementation to include mentoring non-IT background students in data engineering concepts and best practices. I provided guidance on data cleaning techniques, database schema design, and API development while ensuring all contributions followed standardized patterns. The PostgreSQL database schema accommodates various environmental data types including air quality measurements, water quality indicators, and meteorological data, with proper indexing and foreign key relationships for optimal query performance.",
              "The system demonstrates advanced DevOps practices with automated deployment pipelines, environment configuration management using dotenv, and comprehensive logging across all services. I implemented data validation layers that ensure data quality and consistency across diverse student contributions. The Airflow web interface provides monitoring capabilities for all DAG executions, with detailed logs and error tracking. The project successfully aggregated environmental data from Canterbury region, enabling comprehensive analysis of air quality, water quality, and climate patterns.",
              "Beyond the core infrastructure, I contributed to multiple visualization components including Python Streamlit dashboards and GraphQL APIs for flexible data querying. The project showcases enterprise-level data engineering skills including microservices architecture, cloud deployment, automated testing, and collaborative development workflows. This experience demonstrates my ability to lead technical teams, architect scalable data systems, and deliver complex projects that bridge academic learning with real-world environmental monitoring requirements."
            ],
            "zh": [
              "ECAN数据管道代表了一个大规模协作数据工程项目，涉及坎特伯雷大学DATA472课程（云计算和基础设施数据工程）的22名学生。我担任三名核心志愿开发者之一，负责架构和实施中央数据收集基础设施。该项目由ECAN（坎特伯雷环境局）员工发起，他也是我们导师项目的学生，为坎特伯雷环境监测创造了真实世界的数据工程挑战。",
              "作为后端基础设施的技术负责人，我设计并实施了基于Apache Airflow的综合数据收集服务，为超过20个学生个人数据集编排自动化ETL管道。每个学生从ECAN开放数据门户获取自己的环境数据，我创建了处理多样化数据格式（包括CSV、JSON和XML）的标准化数据摄取处理器。Airflow DAGs使用CRON表达式按计划间隔运行，根据数据源要求采用每日和每小时收集模式。",
              "架构广泛使用AWS云基础设施，PostgreSQL数据库部署在AWS RDS上进行集中数据存储，Express.js API服务运行在EC2实例上。我开发了带有完整Swagger文档的Node.js Web API服务，为每个学生的数据集提供RESTful端点。API实现了适当的错误处理、Winston日志记录和CORS配置，以支持多个前端应用程序。每个学生都有自己专用的路由和处理器，允许模块化数据管理同时保持系统凝聚力。",
              "我的角色超越了技术实施，还包括指导非IT背景学生学习数据工程概念和最佳实践。我在数据清洗技术、数据库架构设计和API开发方面提供指导，同时确保所有贡献遵循标准化模式。PostgreSQL数据库架构适应各种环境数据类型，包括空气质量测量、水质指标和气象数据，具有适当的索引和外键关系以优化查询性能。",
              "系统展示了先进的DevOps实践，包括自动化部署管道、使用dotenv的环境配置管理和所有服务的全面日志记录。我实现了数据验证层，确保多样化学生贡献的数据质量和一致性。Airflow网络界面为所有DAG执行提供监控功能，具有详细日志和错误跟踪。该项目成功聚合了坎特伯雷地区的环境数据，实现了空气质量、水质和气候模式的综合分析。",
              "除了核心基础设施，我还为多个可视化组件做出贡献，包括Python Streamlit仪表板和用于灵活数据查询的GraphQL API。该项目展示了企业级数据工程技能，包括微服务架构、云部署、自动化测试和协作开发工作流程。这一经验展示了我领导技术团队、架构可扩展数据系统以及交付连接学术学习与真实世界环境监测要求的复杂项目的能力。"
            ]
          },
          "coordinates": [-43.5357406, 172.6358119],
          "location": "Christchurch, New Zealand",
          "year": "2024",
          "links": {
            "github": "https://github.com/aemooooon/DATA472-Individual-Project-Submission"
          },
          "img": ["/data472/v1.gif", "/data472/v2.gif", "/data472/472.jpg", "/data472/af01.jpg", "/data472/datapipeline.jpg", "/data472/FuelPriceData.jpg", "/data472/GasStationData.jpg", "/data472/ProjectManagement.jpg", "/data472/services.jpg", "/data472/WebApiResponse.jpg",]
        },
        {
          "type": {
            "en": "Activity",
            "zh": "社区活动"
          },
          "title": {
            "en": "Assisted IT Meetups",
            "zh": "协会志愿者"
          },
          "company": "CITANZ",
          "name": {
            "en": "CITANZ CHCH Events",
            "zh": "CITANZ基督城活动"
          },
          "description": {
            "en": "Active volunteer contributor to CITANZ (Chinese Information Technology Association of New Zealand) Christchurch chapter, facilitating monthly IT community meetups that bring together professionals, students, and technology enthusiasts. Serve as both speaker and engaged listener, sharing technical expertise on software development, data engineering, and emerging technologies while learning from diverse industry perspectives. Actively mentor newcomers to the tech industry, providing guidance on career development, technical skills, and industry best practices. Foster collaborative learning environments through organizing workshops, panel discussions, and networking sessions that strengthen the local tech community. Contribute to knowledge exchange initiatives by facilitating discussions on current technology trends, helping members solve technical challenges, and connecting professionals across different specializations. This volunteer work exemplifies the spirit of giving back to the community while continuously growing through peer learning and mentorship opportunities.",
            "zh": "作为新西兰计算机和信息技术协会(CITANZ)基督城分会的积极志愿者，协助举办月度IT社区聚会，汇聚专业人士、学生和技术爱好者。既担任演讲者又是积极的倾听者，分享软件开发、数据工程和新兴技术方面的专业知识，同时从多元化的行业视角中学习。积极指导技术行业新人，在职业发展、技术技能和行业最佳实践方面提供指导。通过组织研讨会、小组讨论和网络交流会，营造协作学习环境，加强本地技术社区建设。通过促进当前技术趋势讨论、帮助成员解决技术挑战、连接不同专业领域的专业人士，为知识交流倡议做出贡献。这项志愿工作体现了回馈社区的精神，同时通过同伴学习和导师机会持续成长。"
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
          "type": {
            "en": "Activity",
            "zh": "社区活动"
          },
          "title": {
            "en": "Save Kiwi",
            "zh": "拯救奇异鸟"
          },
          "name": {
            "en": "AI Hackathon 2024",
            "zh": "2024年AI黑客松"
          },
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
          "img": ["/f4/f4.3.jpg", "/f4/f4.jpg", "/f4/f4.1.jpg", "/f4/f4.2.jpg", "/f4/f4.4.jpg", "/f4/f4.5.jpg", "/f4/f4.6.jpg"]
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
          "img": "/education/uc-ds-all.jpg",
        },
        {
          "type": "education",
          "name": "Bachelor of Information Technology",
          "client": "Otago Polytechnic",
          "coordinates": [-45.8664633, 170.5182829],
          "location": "Dunedin, New Zealand",
          "year": "2017-2021",
          "link": "https://www.op.ac.nz",
          "img": "/education/awared-best-programmer.jpg",
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
          "img": "/fitsgo/fitsgo.02.jpg"
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

      // Gallery数据配置 - 重新安排摆放位置 (22张图片：1张灯箱 + 5张竖向墙 + 16张横向墙)
      gallery: [
        // 灯箱位置 (Special Lightbox Position)
        {
          id: 'gallery_lightbox',
          type: 'image',
          src: '/gallery/gallery-vertical-0.jpg',
          thumbnail: '/gallery/gallery-vertical-0.jpg',
          dimensions: { width: 800, height: 1200 }, // 预计算尺寸
          aspectRatio: 0.67, // 预计算宽高比 (竖版)
          title: {
            en: 'Featured Showcase',
            zh: '精选展示'
          },
          description: {
            en: 'Special lightbox display piece',
            zh: '特殊灯箱展示作品'
          },
          date: '2025-08-22',
          tags: ['lightbox', 'featured', 'special'],
          orientation: 'vertical',
          position: 'lightbox',
          wall: 'lightbox'
        },
        // 竖向墙展示 (32米墙，5张图片)
        {
          id: 'gallery_vertical_1',
          type: 'image',
          src: '/gallery/gallery-vertical-1.jpg',
          thumbnail: '/gallery/gallery-vertical-1.jpg',
          dimensions: { width: 800, height: 1200 }, // 预计算尺寸
          aspectRatio: 0.67, // 预计算宽高比 (竖版)
          title: {
            en: 'Portrait Excellence',
            zh: '肖像卓越'
          },
          description: {
            en: 'Professional portrait photography excellence',
            zh: '专业肖像摄影卓越表现'
          },
          date: '2025-08-22',
          tags: ['portrait', 'excellence', 'professional'],
          orientation: 'vertical',
          position: 'wall',
          wall: 'vertical_wall_32m'
        },
        // {
        //   id: 'gallery_vertical_2',
        //   type: 'image',
        //   src: '/gallery/gallery-vertical-2.jpg',
        //   thumbnail: '/gallery/gallery-vertical-2.jpg',
        //   title: {
        //     en: 'Artistic Vision',
        //     zh: '艺术视野'
        //   },
        //   description: {
        //     en: 'Contemporary artistic vision exploration',
        //     zh: '当代艺术视野探索'
        //   },
        //   date: '2025-08-22',
        //   tags: ['artistic', 'vision', 'contemporary'],
        //   orientation: 'vertical',
        //   position: 'wall',
        //   wall: 'vertical_wall_32m'
        // },
        {
          id: 'gallery_vertical_2_video',
          type: 'video',
          src: '/cube-textures/home.mp4',
          thumbnail: '/cube-textures/home.mp4', // 视频文件作为缩略图
          title: {
            en: 'Home Vision',
            zh: '家园视界'
          },
          description: {
            en: 'Interactive home environment visualization',
            zh: '交互式家园环境可视化'
          },
          date: '2025-08-22',
          tags: ['video', 'home', 'interactive'],
          orientation: 'vertical',
          position: 'wall',
          wall: 'vertical_wall_32m',
          // 视频特定配置
          autoplay: true,
          loop: true,
          muted: true, // 默认静音以符合浏览器政策
          controls: false // 在画廊中不显示控制器
        },
        {
          id: 'gallery_vertical_3',
          type: 'image',
          src: '/gallery/gallery-vertical-3.jpg',
          thumbnail: '/gallery/gallery-vertical-3.jpg',
          dimensions: { width: 800, height: 1200 }, // 预计算尺寸
          aspectRatio: 0.67, // 预计算宽高比 (竖版)
          title: {
            en: 'Visual Harmony',
            zh: '视觉和谐'
          },
          description: {
            en: 'Perfect visual harmony in composition',
            zh: '构图中的完美视觉和谐'
          },
          date: '2025-08-22',
          tags: ['visual', 'harmony', 'composition'],
          orientation: 'vertical',
          position: 'wall',
          wall: 'vertical_wall_32m'
        },
        {
          id: 'gallery_vertical_4',
          type: 'image',
          src: '/gallery/gallery-vertical-4.jpg',
          thumbnail: '/gallery/gallery-vertical-4.jpg',
          title: {
            en: 'Creative Expression',
            zh: '创意表达'
          },
          description: {
            en: 'Innovative creative expression in digital art',
            zh: '数字艺术中的创新创意表达'
          },
          date: '2025-08-22',
          tags: ['creative', 'expression', 'digital'],
          orientation: 'vertical',
          position: 'wall',
          wall: 'vertical_wall_32m'
        },
        {
          id: 'gallery_vertical_5',
          type: 'image',
          src: '/gallery/gallery-vertical-5.jpg',
          thumbnail: '/gallery/gallery-vertical-5.jpg',
          title: {
            en: 'Modern Aesthetics',
            zh: '现代美学'
          },
          description: {
            en: 'Modern aesthetic principles demonstration',
            zh: '现代美学原理演示'
          },
          date: '2025-08-22',
          tags: ['modern', 'aesthetics', 'principles'],
          orientation: 'vertical',
          position: 'wall',
          wall: 'vertical_wall_32m'
        },
        // 横向墙展示 (64米墙，16张图片，可能上下2层)
        {
          id: 'gallery_horizontal_1',
          type: 'image',
          src: '/gallery/gallery-horizontal-1.jpg',
          thumbnail: '/gallery/gallery-horizontal-1.jpg',
          dimensions: { width: 1600, height: 900 }, // 预计算尺寸
          aspectRatio: 1.78, // 预计算宽高比 (横版 16:9)
          title: {
            en: 'Landscape Panorama 1',
            zh: '全景风光 1'
          },
          description: {
            en: 'Wide panoramic view capturing natural beauty',
            zh: '捕捉自然美景的宽幅全景视图'
          },
          date: '2025-08-22',
          tags: ['landscape', 'panorama', 'nature'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 1, y: 1 }
        },
        {
          id: 'gallery_horizontal_2',
          type: 'image',
          src: '/gallery/gallery-horizontal-2.jpg',
          thumbnail: '/gallery/gallery-horizontal-2.jpg',
          dimensions: { width: 1600, height: 900 }, // 预计算尺寸
          aspectRatio: 1.78, // 预计算宽高比 (横版 16:9)
          title: {
            en: 'Landscape Panorama 2',
            zh: '全景风光 2'
          },
          description: {
            en: 'Contemporary artistic vision exploration',
            zh: '当代艺术视野探索'
          },
          date: '2025-08-22',
          tags: ['artistic', 'vision', 'contemporary'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 2, y: 1 }
        },
        {
          id: 'gallery_horizontal_3',
          type: 'image',
          src: '/gallery/gallery-horizontal-3.jpg',
          thumbnail: '/gallery/gallery-horizontal-3.jpg',
          title: {
            en: 'Visual Harmony',
            zh: '视觉和谐'
          },
          description: {
            en: 'Perfect visual harmony in composition',
            zh: '构图中的完美视觉和谐'
          },
          date: '2025-08-22',
          tags: ['visual', 'harmony', 'composition'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 3, y: 1 }
        },
        {
          id: 'gallery_horizontal_4',
          type: 'image',
          src: '/gallery/gallery-horizontal-4.jpg',
          thumbnail: '/gallery/gallery-horizontal-4.jpg',
          title: {
            en: 'Creative Expression',
            zh: '创意表达'
          },
          description: {
            en: 'Innovative creative expression in digital art',
            zh: '数字艺术中的创新创意表达'
          },
          date: '2025-08-22',
          tags: ['creative', 'expression', 'digital'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 4, y: 1 }
        },
        {
          id: 'gallery_horizontal_5',
          type: 'image',
          src: '/gallery/gallery-horizontal-5.jpg',
          thumbnail: '/gallery/gallery-horizontal-5.jpg',
          title: {
            en: 'Modern Aesthetics',
            zh: '现代美学'
          },
          description: {
            en: 'Modern aesthetic principles demonstration',
            zh: '现代美学原理演示'
          },
          date: '2025-08-22',
          tags: ['modern', 'aesthetics', 'principles'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 5, y: 1 }
        },
        {
          id: 'gallery_horizontal_6',
          type: 'image',
          src: '/gallery/gallery-horizontal-6.jpg',
          thumbnail: '/gallery/gallery-horizontal-6.jpg',
          title: {
            en: 'Pattern Innovation',
            zh: '图案创新'
          },
          description: {
            en: 'Innovative pattern design exploration',
            zh: '创新图案设计探索'
          },
          date: '2025-08-22',
          tags: ['pattern', 'innovation', 'design'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 6, y: 1 }
        },
        {
          id: 'gallery_horizontal_7',
          type: 'image',
          src: '/gallery/gallery-horizontal-7.jpg',
          thumbnail: '/gallery/gallery-horizontal-7.jpg',
          title: {
            en: 'Digital Artistry',
            zh: '数字艺术性'
          },
          description: {
            en: 'Advanced digital artistry techniques',
            zh: '先进的数字艺术技巧'
          },
          date: '2025-08-22',
          tags: ['digital', 'artistry', 'techniques'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 7, y: 1 }
        },
        {
          id: 'gallery_horizontal_8',
          type: 'image',
          src: '/gallery/gallery-horizontal-8.jpg',
          thumbnail: '/gallery/gallery-horizontal-8.jpg',
          title: {
            en: 'Visual Synthesis',
            zh: '视觉合成'
          },
          description: {
            en: 'Complex visual synthesis and composition',
            zh: '复杂的视觉合成与构图'
          },
          date: '2025-08-22',
          tags: ['visual', 'synthesis', 'composition'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'upper',
          gridPosition: { x: 8, y: 1 }
        },
        {
          id: 'gallery_horizontal_9',
          type: 'image',
          src: '/gallery/gallery-horizontal-9.jpg',
          thumbnail: '/gallery/gallery-horizontal-9.jpg',
          title: {
            en: 'Abstract Beauty',
            zh: '抽象之美'
          },
          description: {
            en: 'Pure abstract beauty in visual form',
            zh: '纯粹的视觉抽象之美'
          },
          date: '2025-08-22',
          tags: ['abstract', 'beauty', 'visual'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 1, y: 2 }
        },
        {
          id: 'gallery_horizontal_10',
          type: 'image',
          src: '/gallery/gallery-horizontal-10.jpg',
          thumbnail: '/gallery/gallery-horizontal-10.jpg',
          title: {
            en: 'Geometric Perfection',
            zh: '几何完美'
          },
          description: {
            en: 'Perfect geometric patterns and structures',
            zh: '完美的几何图案与结构'
          },
          date: '2025-08-22',
          tags: ['geometric', 'perfection', 'patterns'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 2, y: 2 }
        },
        {
          id: 'gallery_horizontal_11',
          type: 'image',
          src: '/gallery/gallery-horizontal-11.jpg',
          thumbnail: '/gallery/gallery-horizontal-11.jpg',
          title: {
            en: 'Artistic Mastery',
            zh: '艺术精通'
          },
          description: {
            en: 'Demonstration of complete artistic mastery',
            zh: '完整艺术精通的演示'
          },
          date: '2025-08-22',
          tags: ['artistic', 'mastery', 'demonstration'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 3, y: 2 }
        },
        {
          id: 'gallery_horizontal_12',
          type: 'image',
          src: '/gallery/gallery-horizontal-12.jpg',
          thumbnail: '/gallery/gallery-horizontal-12.jpg',
          title: {
            en: 'Technical Excellence',
            zh: '技术卓越'
          },
          description: {
            en: 'Superior technical execution and precision',
            zh: '卓越的技术执行与精确度'
          },
          date: '2025-08-22',
          tags: ['technical', 'excellence', 'precision'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 4, y: 2 }
        },
        {
          id: 'gallery_horizontal_13',
          type: 'image',
          src: '/gallery/gallery-horizontal-13.jpg',
          thumbnail: '/gallery/gallery-horizontal-13.jpg',
          title: {
            en: 'Design Innovation',
            zh: '设计创新'
          },
          description: {
            en: 'Breakthrough design innovation concepts',
            zh: '突破性设计创新理念'
          },
          date: '2025-08-22',
          tags: ['design', 'innovation', 'breakthrough'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 5, y: 2 }
        },
        {
          id: 'gallery_horizontal_14',
          type: 'image',
          src: '/gallery/gallery-horizontal-14.jpg',
          thumbnail: '/gallery/gallery-horizontal-14.jpg',
          title: {
            en: 'Visual Impact',
            zh: '视觉冲击'
          },
          description: {
            en: 'Strong visual impact and emotional resonance',
            zh: '强烈的视觉冲击与情感共鸣'
          },
          date: '2025-08-22',
          tags: ['visual', 'impact', 'emotion'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 6, y: 2 }
        },
        {
          id: 'gallery_horizontal_15',
          type: 'image',
          src: '/gallery/gallery-horizontal-15.jpg',
          thumbnail: '/gallery/gallery-horizontal-15.jpg',
          title: {
            en: 'Portfolio Culmination',
            zh: '作品集巅峰'
          },
          description: {
            en: 'The culmination of artistic and technical journey',
            zh: '艺术与技术旅程的巅峰之作'
          },
          date: '2025-08-22',
          tags: ['portfolio', 'culmination', 'journey'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 7, y: 2 }
        },
        {
          id: 'gallery_horizontal_16',
          type: 'image',
          src: '/gallery/gallery-horizontal-16.jpg',
          thumbnail: '/gallery/gallery-horizontal-16.jpg',
          title: {
            en: 'Final Masterpiece',
            zh: '终极杰作'
          },
          description: {
            en: 'The final masterpiece completing the gallery collection',
            zh: '完成画廊收藏的终极杰作'
          },
          date: '2025-08-22',
          tags: ['masterpiece', 'final', 'completion'],
          orientation: 'horizontal',
          position: 'wall',
          wall: 'horizontal_wall_64m',
          layer: 'lower',
          gridPosition: { x: 8, y: 2 }
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
