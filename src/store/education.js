// 教育数据
export const educationData = [
    {
        id: 'masters',
        degree: {
            en: 'Master of Applied Data Science',
            zh: '应用数据科学硕士学位'
        },
        degreeHonor: true,
        institution: {
            en: 'University of Canterbury',
            zh: '坎特伯雷大学'
        },
        location: {
            en: 'Christchurch, New Zealand',
            zh: '基督城'
        },
        period: {
            en: 'Feb 2024 - Feb 2025',
            zh: '2024年2月 - 2025年2月'
        },
        logo: '/education/unicanterburylogo.png',
        gpa: {
            en: 'A average',
            zh: 'A'
        },
        totalCredits: 180,
        courses: [
            {
                year: '2024',
                semester: {
                    en: 'Semester 1',
                    zh: '第一学期'
                },
                courses: [
                    {
                        code: 'DATA401',
                        name: {
                            en: 'Introduction to Data Science',
                            zh: '数据科学导论'
                        },
                        credits: 15,
                        grade: 'A',
                        level: 4,
                    },
                    {
                        code: 'DIGI405',
                        name: {
                            en: 'Texts, Discourses and Data: the Humanities and Data Science',
                            zh: '人文学科与数据科学'
                        },
                        credits: 15,
                        grade: 'A-',
                        level: 4,
                    },
                    {
                        code: 'DATA472',
                        name: {
                            en: 'Based cloud computing and infrastructure data engineering',
                            zh: '基于云基础架构的数据工程'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 4,
                    },
                    {
                        code: 'DATA416',
                        name: {
                            en: 'Contemporary Issues in Data Science',
                            zh: '数据科学当代问题'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 4,
                    },
                ],
            },
            {
                year: '2024',
                semester: {
                    en: 'Semester 2',
                    zh: '第二学期'
                },
                courses: [
                    {
                        code: 'COSC473',
                        name: {
                            en: 'Decentralised Applications on the Web',
                            zh: 'Web3，区块链及去中心化应用'
                        },
                        credits: 15,
                        grade: 'A-',
                        level: 4,
                    },
                    {
                        code: 'COSC440',
                        name: {
                            en: 'Deep Learning',
                            zh: '深度学习'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 4,
                    },
                    {
                        code: 'DATA420',
                        name: {
                            en: 'Scalable Data Science',
                            zh: '可扩展数据科学'
                        },
                        credits: 15,
                        grade: 'A-',
                        level: 4,
                    },
                    {
                        code: 'DATA415',
                        name: {
                            en: 'Computational Social Choice',
                            zh: '计算社会选择'
                        },
                        credits: 15,
                        grade: 'A',
                        level: 4,
                    },
                    {
                        code: 'GISC412',
                        name: {
                            en: 'Spatial Data Science',
                            zh: '空间数据科学'
                        },
                        credits: 15,
                        grade: 'A',
                        level: 4,
                    },
                ],
            },
            {
                year: '2024 - 2025',
                semester: {
                    en: 'Summer',
                    zh: '2024-2025 暑假'
                },
                courses: [
                    {
                        code: 'DATA605',
                        name: {
                            en: 'Applied Data Science Industry Research Project · Zespri International',
                            zh: '应用数据科学行业研究项目 · 佳沛国际'
                        },
                        credits: 45,
                        grade: 'A+',
                        level: 6,
                    },
                ],
            },
        ],
        capstoneProjects: [
            {
                name: 'SwapBytes',
                description: {
                    en: 'A P2P file-sharing and messaging app built using Rust (backend) and React with Tauri (frontend). Integrated libp2p for decentralised networking.',
                    zh: '使用Rust（后端）和React与Tauri（前端）构建的P2P文件共享和消息应用。集成libp2p进行去中心化网络。'
                },
                technologies: ['Rust', 'React', 'Tauri', 'libp2p'],
                githubUrl: 'https://github.com/aemooooon/swapbytes',
                image: '/education/swapbytes.jpg',
            },
            {
                name: {
                    en: 'Digital Pet',
                    zh: '数字宠物'
                },
                description: {
                    en: 'A blockchain-based virtual pet dApp on Secret Network. Built a CosmWasm smart contract using Rust and a React frontend.',
                    zh: '基于Secret Network的区块链虚拟宠物dApp。使用Rust构建CosmWasm智能合约，React前端。'
                },
                technologies: ['Rust', 'CosmWasm', 'React', 'Secret Network'],
                githubUrl: 'https://github.com/aemooooon/digital-pet',
                image: '/education/digitalpet.jpg',
            },
            {
                name: {
                    en: 'ECAN Data Pipeline',
                    zh: '坎特伯雷环境部数据管线'
                },
                description: {
                    en: 'A collaborative cloud-based automation system for collecting and processing environmental data from 17 different sources.',
                    zh: '协作式云端自动化系统，用于从17个不同来源收集和处理环境数据。'
                },
                technologies: ['Apache Airflow', 'Python', 'GraphQL', 'AWS'],
                githubUrl:
                    'https://github.com/aemooooon/DATA472-Individual-Project-Submission',
                image: '/education/ecan.jpg',
            },
        ],
    },
    {
        id: 'bachelors',
        degree: {
            en: 'Bachelor of Information Technology',
            zh: '信息技术学士学位'
        },
        degreeHonor: true,
        institution: {
            en: 'Otago Polytechnic',
            zh: '奥塔哥理工学院'
        },
        location: {
            en: 'Dunedin, New Zealand',
            zh: '达尼丁'
        },
        period: {
            en: 'July 2017 - June 2021',
            zh: '2017年7月 - 2021年6月'
        },
        logo: '/education/otago-polytechnic-vertical-blue.svg',
        gpa: {
            en: 'A average',
            zh: 'A'
        },
        totalCredits: 360,
        courses: [
            {
                year: '2017',
                semester: {
                    en: 'Year 1',
                    zh: '第一年'
                },
                courses: [
                    {
                        code: 'IN501001',
                        name: {
                            en: 'Professional Practice for Information Technology',
                            zh: '信息技术专业实践'
                        },
                        credits: 15,
                        grade: 'B+',
                        level: 5,
                    },
                    {
                        code: 'IN510001',
                        name: {
                            en: 'Programming 1',
                            zh: '编程 1'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 5,
                    },
                    {
                        code: 'IN520001',
                        name: {
                            en: 'PC Maintenance',
                            zh: '计算机维护'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 5,
                    },
                    {
                        code: 'IN521001',
                        name: {
                            en: 'Maths For IT',
                            zh: 'IT数学'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 5,
                    },
                ],
            },
            {
                year: '2018',
                semester: {
                    en: 'Year 2',
                    zh: '第二年'
                },
                courses: [
                    {
                        code: 'IN505001',
                        name: {
                            en: 'Introduction to Systems Analysis',
                            zh: '系统分析入门'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 5,
                    },
                    {
                        code: 'IN511001',
                        name: {
                            en: 'Programming 2',
                            zh: '编程 2'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 5,
                    },
                    {
                        code: 'IN512001',
                        name: {
                            en: 'Web 1 - Technology and Development',
                            zh: 'Web 1 - 技术与开发'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 5,
                    },
                    {
                        code: 'IN515001',
                        name: {
                            en: 'Introduction to Networks',
                            zh: '网络入门'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 5,
                    },
                    {
                        code: 'IN605001',
                        name: {
                            en: 'Databases 2',
                            zh: '数据库 2'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 6,
                    },
                    {
                        code: 'IN610001',
                        name: {
                            en: 'Programming 3',
                            zh: '编程 3'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 6,
                    },
                    {
                        code: 'IN612001',
                        name: {
                            en: 'Web 2 - Programming',
                            zh: 'Web 2 - 编程'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 6,
                    },
                    {
                        code: 'IN617001',
                        name: {
                            en: 'Linux Operating Systems - Ubuntu',
                            zh: 'Linux操作系统 - Ubuntu'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 6,
                    },
                ],
            },
            {
                year: '2019',
                semester: {
                    en: 'Year 3',
                    zh: '第三年'
                },
                courses: [
                    {
                        code: 'IN602001',
                        name: {
                            en: 'Software Engineering',
                            zh: '软件工程'
                        },
                        credits: 15,
                        grade: 'A-',
                        level: 6,
                    },
                    {
                        code: 'IN628002',
                        name: {
                            en: 'Programming 4',
                            zh: '编程 4'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 6,
                    },
                    {
                        code: 'IN700001',
                        name: {
                            en: 'Project 1',
                            zh: '项目 1'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 7,
                    },
                    {
                        code: 'IN705002',
                        name: {
                            en: 'Databases 3',
                            zh: '数据库 3'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 7,
                    },
                    {
                        code: 'IN711001',
                        name: {
                            en: 'Algorithms and Data Structures',
                            zh: '算法与数据结构'
                        },
                        credits: 15,
                        grade: 'A',
                        level: 7,
                    },
                    {
                        code: 'IN712001',
                        name: {
                            en: 'Web 3 - Enterprise Development',
                            zh: 'Web 3 - 企业级开发'
                        },
                        credits: 15,
                        grade: 'A-',
                        level: 7,
                    },
                    {
                        code: 'IN719001',
                        name: {
                            en: 'Systems Administration',
                            zh: '系统管理'
                        },
                        credits: 15,
                        grade: 'A',
                        level: 7,
                    },
                    {
                        code: 'IN720001',
                        name: {
                            en: 'Administering a Virtual Infrastructure',
                            zh: '虚拟基础设施管理'
                        },
                        credits: 15,
                        grade: 'A',
                        level: 7,
                    },
                ],
            },
            {
                year: '2021',
                semester: {
                    en: 'Year 4',
                    zh: '第四年'
                },
                courses: [
                    {
                        code: 'IN608001',
                        name: {
                            en: 'Intermediate Application Development Concepts',
                            zh: '中级应用开发概念'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 6,
                    },
                    {
                        code: 'IN721001',
                        name: {
                            en: 'Mobile Application Development',
                            zh: '移动应用开发'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 7,
                    },
                    {
                        code: 'IN730151',
                        name: {
                            en: 'Year Three Special Topic',
                            zh: '第三年专题研究'
                        },
                        credits: 15,
                        grade: 'A+',
                        level: 7,
                    },
                    {
                        code: 'IN732001',
                        name: {
                            en: 'Studio 6',
                            zh: '工作室 6'
                        },
                        credits: 15,
                        grade: 'Passed',
                        level: 7,
                    },
                ],
            },
        ],
        awards: [
            {
                title: {
                    en: 'Academic Excellence & Best Programmer',
                    zh: '学术卓越与最佳程序员奖'
                },
                year: '2021',
                image: '/education//awared-best-programmer.jpg',
            },
            {
                title: {
                    en: 'Excellence in the Bachelor of Information Technology',
                    zh: '信息技术学士优秀奖'
                },
                year: '2019',
                image: '/education/awared-excellence.jpg',
            },
        ],
        capstoneProjects: [
            {
                name: {
                    en: 'Travel Assistant',
                    zh: '旅行助手'
                },
                description: {
                    en: 'An Android app using Kotlin, Jetpack, Google Maps, and Room DB for trip planning.',
                    zh: '使用Kotlin、Jetpack、Google Maps和Room DB开发的Android旅行规划应用。'
                },
                technologies: ['Kotlin', 'Android', 'Google Maps'],
                githubUrl: 'https://github.com/aemooooon/travel-assistant',
                image: '/travelassistant/ta02.jpg',
            },
            {
                name: 'FitsGo',
                description: {
                    en: 'A Fitness tracker app built with React Native and Firebase, supporting location tracking and workout history.',
                    zh: '使用React Native和Firebase构建的健身追踪应用，支持位置跟踪和锻炼历史。'
                },
                technologies: ['React Native', 'Firebase'],
                githubUrl: 'https://github.com/aemooooon/fitsgo',
                image: '/fitsgo/fitsgo.02.jpg',
            },
        ],
    },
];
