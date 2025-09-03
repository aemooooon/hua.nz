// ========================================================================================
// 国际化内容数据 - 标准化的多语言文本内容
// ========================================================================================

export const contentData = {
    home: {
        name: { en: 'Hua Wang', zh: '王华' },
        title: { en: 'Full Stack Developer', zh: '全栈工程师' },
        slogan: {
            en: 'Order from Chaos. Innovation through Tradeoffs...',
            zh: '驭混沌而立秩序；执中庸以启新象。',
        },
        // 首页滚动提示
        mobileScrollHint: { en: 'Swipe down to explore more...', zh: '向下滑动探索更多...' },
        desktopScrollHint: { en: 'Scroll down to explore...', zh: '向下滚动探索更多...' },
    },

    about: {
        greeting: { en: "Kia ora, I'm Hua Wang", zh: '你好，我是王华' },
        // About页面Resume链接
        resume: { en: 'Resume', zh: '简历' },
        paragraphs: {
            en: [
                "I am a full-stack developer with over a decade of experience, from early work with PHP to today's modern React ecosystems. My journey spans enterprise websites, CMS platforms, internal systems, and data-driven apps, enriched by a passion for computer graphics, where I blend shaders, lighting, and generative effects into the web.",
                'What drives me is the process: turning scattered user stories into clarity, navigating complexity with an agnostic mindset toward languages and frameworks, and building solutions that balance logic with creativity. To me, code is not just function but also expression, where design, implementation, and narrative converge.',
                "Beyond frontend and backend development, I explore DevOps, containerization, and cloud platforms, while my Master's in Data Science deepens my grasp of algorithms and data pipelines. To me, development is about seeking order in chaos and finding innovation in every trade-off.",
            ],
            zh: [
                '夫天地演数，阴阳化爻，臣以一介码农，躬耕于比特之野十载有余。初习jQuery古法，今研React新道，历经诸侯之网站，掌CMS之枢机，筑内廷之系统，驭数据于方寸。然臣心向星辰，醉心图形之域，每有涉猎，必穷Shader之变，究光影之妙，合生成之艺于万维网中，此臣技之所寄也。',
                '臣闻《易》云："形而上者谓之道，形而下者谓之器。"臣之所驱，正在道器相融：散落之用户故事，臣析为清明；纷杂之技术桎梏，臣以无执之心破之。盖语言框架，不过器物；逻辑创造，方见精神。是故代码非止于功用，亦载文心，融设计、实现与叙事于一炉，犹《诗》之兴观群怨，皆可托于数行之间。',
                '臣虽主营前后二端，然未尝忘怀运维之策、容器之术与云之平台。更修数据科学之硕学，深研算法之精微，管道之纤畅。诚如《道德经》所言："图难于其易，为大于其细"，臣每日所行，皆在混沌中求秩序，于权衡处创新篇——此乃臣平生之志也。',
                '今托心于代码，寄志于云端，惟愿以技术立命，以创造安身，虽世变时移，此心不易。',
            ],
        },
    },

    projects: {
        title: { en: 'My Projects', zh: '累岁所成' },
        subtitle: { en: 'Showcases', zh: '列艺斯观' },
        bottomSubtitle: {
            en: 'Each project represents a unique challenge and learning journey',
            zh: '每个项目都代表独特的挑战和学习历程',
        },
        description: {
            en: 'From Full Stack Web Development to 3D immersive experiences, from computer science to data science, to computer graphics — explore the diverse technology and solutions. Language, platform, framework agnostic.',
            zh: '从全栈Web开发到3D沉浸式体验，从计算机科学到数据科学，再到计算机图形学——探索多元化的技术和解决方案。',
        },
        exploreMap: { en: 'Footprints', zh: '足迹' },
        liveDemo: { en: 'Live Demo', zh: '在线演示' },
        officialSite: { en: 'Official', zh: '官方网站' },
        githubRepo: { en: 'GitHub', zh: 'GitHub' },
        learnMore: { en: 'Learn more', zh: '了解更多' },

        // 项目过滤相关文本
        filter: {
            allProjects: { en: 'All Projects', zh: '所有项目' },
            all: { en: 'All', zh: '全部' },
            other: { en: 'Other', zh: '其他' },
        },

        // 地图相关文本
        map: {
            resetToDefaultView: { en: 'Reset to default view', zh: '重置视图' },
            closeMap: { en: 'Close map', zh: '关闭地图' },
            title: { en: 'My Footprints', zh: '我的足迹' },
            zoomIn: { en: 'Zoom in', zh: '放大' },
            zoomOut: { en: 'Zoom out', zh: '缩小' },
            locateMe: { en: 'Locate me', zh: '我的位置' },
            categories: { en: 'Categories', zh: '分类' },
        },

        // 项目详情页面相关文本
        detail: {
            closeModal: { en: 'Close project details', zh: '关闭项目详情' },
            technologyStack: { en: 'Technology Stack', zh: '技术栈' },
            projectStatistics: { en: 'Project Statistics', zh: '项目统计' },
            subProjects: { en: 'Sub Projects', zh: '子项目' },
        },
    },

    gallery: {
        // 移动端画廊配置
        mobile: {
            title: { en: 'Gallery', zh: '浮生长廊' },
            subtitle: {
                en: 'Each photo carries unique stories.',
                zh: '每张照片都承载着独特的故事。',
            },
            tapHint: { en: 'Tap images to view full size', zh: '点击图片查看全尺寸' },
            loadingMore: { en: 'Loading more...', zh: '加载更多...' },
            showing: { en: 'Showing', zh: '显示' },
            images: { en: 'images', zh: '张图片' },
            tapToView: { en: 'Tap to view full size', zh: '点击查看全尺寸' },
            noContent: { en: 'No gallery items available', zh: '暂无画廊内容' },
            tryAgain: { en: 'Please try again later', zh: '请稍后重试' },
            mobileNotice: {
                title: { en: 'Mobile Experience Notice', zh: '移动端体验提示' },
                description: {
                    en: 'The 3D gallery uses first-person navigation technology requiring keyboard and mouse controls. For the best experience, we recommend using a desktop device.',
                    zh: '3D画廊使用第一人称导航技术，需要键盘和鼠标控制。为获得最佳体验，我们建议使用桌面设备。',
                },
                viewGallery: { en: 'View Image Gallery', zh: '查看图片画廊' },
                desktopHint: {
                    en: 'Or visit on desktop for the full 3D gallery experience',
                    zh: '或在桌面端访问获得完整的3D画廊体验',
                },
            },
        },

        // 3D Gallery 配置
        gallery3D: {
            title: { en: 'Corridor of Light and Shadow', zh: '浮生长廊' },
            subtitle: { en: 'Immersive 3D Art Experience', zh: '沉浸式3D艺术体验' },
            description: {
                en: 'Enter a professionally curated virtual gallery space showcasing visual works in an interactive 3D environment.',
                zh: '进入专业策划的虚拟画廊空间，在交互式3D环境中展示视觉作品。',
            },
            instructions: {
                clickToStart: { en: 'Click to enter the gallery', zh: '点击进入画廊' },
                howToPlay: { en: 'How to Play?', zh: '如何操作？' },
                clickToEnter: { en: 'Click to enter the gallery', zh: '点击进入画廊' },
                mouseControl: {
                    en: 'Mouse - Look around and explore',
                    zh: '鼠标 - 环顾四周和探索',
                },
                keyboardControl: { en: 'Move through the gallery', zh: '在画廊中移动' },
                escapeControl: { en: 'Exit pointer lock mode', zh: '退出鼠标锁定模式' },
                navigation: {
                    movement: { en: 'Movement Navigation', zh: '移动导航' },
                    wasd: {
                        en: 'WASD / Arrow Keys - Move through the gallery',
                        zh: 'WASD / 方向键 - 在画廊中移动',
                    },
                    mouse: { en: 'Mouse - Look around and explore', zh: '鼠标 - 环顾四周和探索' },
                    esc: { en: 'ESC - Exit pointer lock mode', zh: 'ESC - 退出鼠标锁定模式' },
                },
                experience: {
                    title: { en: 'Gallery Features', zh: '画廊特色' },
                    lighting: {
                        en: 'Professional museum lighting system',
                        zh: '专业博物馆照明系统',
                    },
                    layout: {
                        en: 'Curated artwork placement and spacing',
                        zh: '精心策划的艺术品陈列和间距',
                    },
                    interaction: {
                        en: 'First-person exploration experience',
                        zh: '第一人称探索体验',
                    },
                },
            },
        },
    },

    education: {
        title: { en: 'Education', zh: '修业之路' },
        subtitle: { en: 'Academic Background', zh: '杏坛踪迹' },
        labels: {
            academicRecords: { en: 'Academic Records', zh: '学术记录' },
            totalCredits: { en: 'Total Credits', zh: '总学分' },
            gpa: { en: 'GPA', zh: '平均成绩' },
            totalCourses: { en: 'Total Courses', zh: '课程总数' },
            capstoneProjects: { en: 'Capstone Projects', zh: '毕业项目' },
            academicAwards: { en: 'Academic Awards', zh: '学术奖项' },
            academicExcellenceAward: { en: 'Academic Excellence Award', zh: '学术优秀奖' },
            withDistinction: { en: 'with Distinction', zh: '优等荣誉' },
            level: { en: 'Level', zh: '等级' },
            credits: { en: 'Credits', zh: '学分' },
        },
    },

    contact: {
        title: { en: 'Get In Touch', zh: '联系我' },
        subtitle: { en: 'Looking forward to hearing from you', zh: '期待您的联系' },
        description: {
            en: 'Connect for opportunities, collaborations, or just to say hello.',
            zh: '联系我寻求机会、合作，或只是打个招呼。',
        },
        location: { en: 'Christchurch, New Zealand', zh: '新西兰基督城' },
        emailAddress: 'aemooooon@gmail.com',
        phone: '+64 21 *** 0520',
        connectWithMe: { en: 'Connect with me', zh: '与我联系' },
        lookingForward: { en: 'Copyright © 2025 Hua Wang', zh: '版权所有 © 2025 王华' },
        contactMethods: {
            email: {
                title: { en: 'Email', zh: '邮箱' },
                description: { en: 'Send me an email', zh: '发送邮件' },
            },
            phone: {
                title: { en: 'Phone', zh: '电话' },
                description: { en: 'Give me a call', zh: '给我打电话' },
            },
            wechat: {
                title: { en: 'WeChat', zh: '微信' },
                description: { en: 'Connect via WeChat', zh: '通过微信联系' },
                id: 'Aemooooon',
            },
            location: {
                title: { en: 'Location', zh: '位置' },
                description: { en: 'Based in Christchurch', zh: '位于基督城' },
            },
        },
        social: {
            github: {
                url: 'https://github.com/aemooooon',
                label: { en: 'GitHub', zh: 'GitHub' },
            },
            linkedin: {
                url: 'https://www.linkedin.com/in/aemonwang',
                label: { en: 'LinkedIn', zh: 'LinkedIn' },
            },
            email: {
                url: 'mailto:aemooooon@gmail.com',
                label: { en: 'Email', zh: '邮箱' },
            },
        },
    },

    ui: {
        // 全局UI组件通用文本
        language: { en: 'Language', zh: '语言' },
        theme: { en: 'Theme', zh: '主题' },
        toggleTheme: { en: 'Toggle Theme', zh: '切换主题' },
        loading: { en: 'Loading...', zh: '加载中...' },
    },
};
