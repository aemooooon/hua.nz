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
        level: "Level",
        credits: "Credits"
      },
      degrees: [
        {
          id: "masters",
          degree: "Master of Applied Data Science with Distinction",
          institution: "University of Canterbury",
          location: "Christchurch, New Zealand",
          period: "February 2024 - February 2025",
          gpa: "A avg",
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
              year: "2025",
              semester: "Semester 1",
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
          gpa: "A- Average",
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
                { code: "IN617001", name: "Linux Operating Systems", credits: 15, grade: "A+", level: 6 }
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
      liveDemo: "在线演示"
    },
    gallery: {
      title: "照片画廊",
      subtitle: "通过视觉展示我的工作和经历",
      description: "精心策划的视觉项目和创意作品集合。",
      viewImage: "查看图片"
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
        level: "等级",
        credits: "学分"
      },
      degrees: [
        {
          id: "masters",
          degree: "应用数据科学硕士学位",
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

      // 项目数据 (原locations.js，重命名为projects)
      projects: [
        {
          "type": "Full Stack",
          "title": "Software Engineer",
          "name": "Zespri International",
          "description": "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.",
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
          "description": "Developed a real-time Air Quality Index dashboard for a population of 5 million, involving an ETL workflow to extract XML data from a third-party Web service on schedule, transform it into structured objects, and load it into a MySQL database. The backend, built with Java Spring Boot, provided RESTful APIs for data access, while the front end, developed using React and EChart, visualized AQI trends and geographic distributions through interactive and dynamic charts.",
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
          "description": "Developed a comprehensive 360° virtual tour platform for real estate marketing, serving 18+ property developments across China. Built using JavaScript and WebGL-based 3D libraries, enabling immersive panoramic exploration of buildings, rooms, and outdoor spaces. Implemented advanced features including clickable hotspots, scene transitions, interactive floor plans, and cross-platform compatibility for web and mobile devices. The platform helped property developers showcase their projects remotely, significantly reducing on-site visits while maintaining high engagement rates.",
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
          "description": "Comprehensive corporate website development solution serving government agencies, healthcare institutions, tourism bureaus, and private enterprises. Built using CMS platforms with custom database architecture, responsive UI implementation from design mockups, and full deployment management across multiple production servers.",
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
          "description": "This is a mobile application that aims to help get people to start exercising. This App is a cross-platform application which runs both of Android and IOS. It is built using React-Native and Google Firebase real-time database.",
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

      // 项目数据 for map view
      locations: [
        {
          "type": "work",
          "title": "Software Engineer",
          "name": "Zespri International",
          "description": "Built ETL pipelines and developed an interactive GIS-based web application for orchard sampling optimization.",
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
          "description": "Develop H5 micro-apps on the WeChat platform, which include front-end page implementation, 3D scene tour and transition in panorama, and App deployment.",
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
          "description": "Focus on Data Engineer, Visualisation and Deep Learning.",
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
          "description": "Graduated with distinction, focuse on Web Development, full stack, and awarded Academic Excellence and Best Programmer.",
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
