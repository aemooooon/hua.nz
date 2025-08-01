// Gallery数据配置
export const galleryData = {
    categories: [
        {
            id: 'personal',
            name: {
                en: 'Personal Life',
                zh: '个人生活'
            },
            description: {
                en: 'Personal moments and life experiences',
                zh: '个人时光与生活体验'
            },
            color: '#667eea',
            items: [
                {
                    id: 'personal_1',
                    type: 'image',
                    src: '/gallery/personal/hua.jpeg',
                    thumbnail: '/gallery/personal/hua.jpeg',
                    title: {
                        en: 'Personal Portrait',
                        zh: '个人写真'
                    },
                    description: {
                        en: 'A beautiful moment captured in time',
                        zh: '时光中美好的瞬间'
                    },
                    date: '2024-01-15',
                    tags: ['portrait', 'personal'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_2',
                    type: 'image',
                    src: '/gallery/personal/kino-vn-vGpwUjqRHYo-unsplash.jpg',
                    thumbnail: '/gallery/personal/kino-vn-vGpwUjqRHYo-unsplash.jpg',
                    title: {
                        en: 'Peaceful Moment',
                        zh: '宁静时光'
                    },
                    description: {
                        en: 'Serenity in nature',
                        zh: '自然中的宁静'
                    },
                    date: '2024-02-20',
                    tags: ['nature', 'peaceful'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_3',
                    type: 'image',
                    src: '/gallery/personal/olga-zabegina-A3MleA0jtoE-unsplash.jpg',
                    thumbnail: '/gallery/personal/olga-zabegina-A3MleA0jtoE-unsplash.jpg',
                    title: {
                        en: 'Golden Hour',
                        zh: '黄金时光'
                    },
                    description: {
                        en: 'Beauty in the golden light',
                        zh: '金色光芒中的美丽'
                    },
                    date: '2024-03-10',
                    tags: ['light', 'beauty'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_4',
                    type: 'image',
                    src: '/gallery/personal/vadim-bogulov-krgb_3HIkME-unsplash.jpg',
                    thumbnail: '/gallery/personal/vadim-bogulov-krgb_3HIkME-unsplash.jpg',
                    title: {
                        en: 'Adventure Spirit',
                        zh: '冒险精神'
                    },
                    description: {
                        en: 'Embracing new challenges',
                        zh: '拥抱新挑战'
                    },
                    date: '2024-04-05',
                    tags: ['adventure', 'spirit'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_5',
                    type: 'image',
                    src: '/gallery/personal/zhang-kaiyv-97VDbiTKEQk-unsplash.jpg',
                    thumbnail: '/gallery/personal/zhang-kaiyv-97VDbiTKEQk-unsplash.jpg',
                    title: {
                        en: 'Urban Exploration',
                        zh: '城市探索'
                    },
                    description: {
                        en: 'Discovering city secrets',
                        zh: '发现城市秘密'
                    },
                    date: '2024-05-12',
                    tags: ['urban', 'exploration'],
                    categoryColor: '#667eea'
                },
                // Additional personal images for 36-position Bagua layout
                {
                    id: 'personal_6',
                    type: 'image',
                    src: '/gallery/personal/aqi.jpg',
                    thumbnail: '/gallery/personal/aqi.jpg',
                    title: { en: 'AQI Project', zh: 'AQI项目' },
                    description: { en: 'Air Quality Index monitoring', zh: '空气质量指数监控' },
                    date: '2024-03-01',
                    tags: ['project', 'environment'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_7',
                    type: 'image',
                    src: '/gallery/personal/AQI1.jpg',
                    thumbnail: '/gallery/personal/AQI1.jpg',
                    title: { en: 'AQI Dashboard', zh: 'AQI仪表板' },
                    description: { en: 'Real-time air quality data', zh: '实时空气质量数据' },
                    date: '2024-03-02',
                    tags: ['dashboard', 'data'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_8',
                    type: 'image',
                    src: '/gallery/personal/AQI2.jpg',
                    thumbnail: '/gallery/personal/AQI2.jpg',
                    title: { en: 'AQI Analysis', zh: 'AQI分析' },
                    description: { en: 'Environmental data analysis', zh: '环境数据分析' },
                    date: '2024-03-03',
                    tags: ['analysis', 'environment'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_9',
                    type: 'image',
                    src: '/gallery/personal/AQI3.jpg',
                    thumbnail: '/gallery/personal/AQI3.jpg',
                    title: { en: 'AQI Visualization', zh: 'AQI可视化' },
                    description: { en: 'Data visualization charts', zh: '数据可视化图表' },
                    date: '2024-03-04',
                    tags: ['visualization', 'charts'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_10',
                    type: 'image',
                    src: '/gallery/personal/AQI4.jpg',
                    thumbnail: '/gallery/personal/AQI4.jpg',
                    title: { en: 'AQI Report', zh: 'AQI报告' },
                    description: { en: 'Environmental monitoring report', zh: '环境监测报告' },
                    date: '2024-03-05',
                    tags: ['report', 'monitoring'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_11',
                    type: 'image',
                    src: '/gallery/personal/AQI5.jpg',
                    thumbnail: '/gallery/personal/AQI5.jpg',
                    title: { en: 'AQI Summary', zh: 'AQI总结' },
                    description: { en: 'Project summary and results', zh: '项目总结和结果' },
                    date: '2024-03-06',
                    tags: ['summary', 'results'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_12',
                    type: 'image',
                    src: '/gallery/personal/awared-best-programmer.jpeg',
                    thumbnail: '/gallery/personal/awared-best-programmer.jpeg',
                    title: { en: 'Best Programmer Award', zh: '最佳程序员奖' },
                    description: { en: 'Recognition for excellence in programming', zh: '编程卓越表现的认可' },
                    date: '2024-04-01',
                    tags: ['award', 'programming'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_13',
                    type: 'image',
                    src: '/gallery/personal/awared-excellence.jpeg',
                    thumbnail: '/gallery/personal/awared-excellence.jpeg',
                    title: { en: 'Excellence Award', zh: '卓越奖' },
                    description: { en: 'Award for outstanding performance', zh: '杰出表现奖' },
                    date: '2024-04-02',
                    tags: ['award', 'excellence'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_14',
                    type: 'image',
                    src: '/gallery/personal/changpingli.jpg',
                    thumbnail: '/gallery/personal/changpingli.jpg',
                    title: { en: 'Team Work', zh: '团队协作' },
                    description: { en: 'Collaborative project work', zh: '协作项目工作' },
                    date: '2024-04-03',
                    tags: ['team', 'collaboration'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_15',
                    type: 'image',
                    src: '/gallery/personal/cita-01.jpg',
                    thumbnail: '/gallery/personal/cita-01.jpg',
                    title: { en: 'CITA Project', zh: 'CITA项目' },
                    description: { en: 'Construction industry technology', zh: '建筑行业技术' },
                    date: '2024-04-04',
                    tags: ['construction', 'technology'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_16',
                    type: 'image',
                    src: '/gallery/personal/cita-02.jpg',
                    thumbnail: '/gallery/personal/cita-02.jpg',
                    title: { en: 'CITA Analysis', zh: 'CITA分析' },
                    description: { en: 'Industry data analysis', zh: '行业数据分析' },
                    date: '2024-04-05',
                    tags: ['analysis', 'industry'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_17',
                    type: 'image',
                    src: '/gallery/personal/cita-03.jpg',
                    thumbnail: '/gallery/personal/cita-03.jpg',
                    title: { en: 'CITA Dashboard', zh: 'CITA仪表板' },
                    description: { en: 'Real-time industry metrics', zh: '实时行业指标' },
                    date: '2024-04-06',
                    tags: ['dashboard', 'metrics'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_18',
                    type: 'image',
                    src: '/gallery/personal/cita-04.jpg',
                    thumbnail: '/gallery/personal/cita-04.jpg',
                    title: { en: 'CITA Visualization', zh: 'CITA可视化' },
                    description: { en: 'Construction data visualization', zh: '建筑数据可视化' },
                    date: '2024-04-07',
                    tags: ['visualization', 'construction'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_19',
                    type: 'image',
                    src: '/gallery/personal/cita-05.jpg',
                    thumbnail: '/gallery/personal/cita-05.jpg',
                    title: { en: 'CITA Report', zh: 'CITA报告' },
                    description: { en: 'Construction industry report', zh: '建筑行业报告' },
                    date: '2024-04-08',
                    tags: ['report', 'industry'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_20',
                    type: 'image',
                    src: '/gallery/personal/dalincheng.jpg',
                    thumbnail: '/gallery/personal/dalincheng.jpg',
                    title: { en: 'Presentation', zh: '演示' },
                    description: { en: 'Project presentation moment', zh: '项目演示时刻' },
                    date: '2024-04-09',
                    tags: ['presentation', 'project'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_21',
                    type: 'image',
                    src: '/gallery/personal/es9e.jpg',
                    thumbnail: '/gallery/personal/es9e.jpg',
                    title: { en: 'ES9E Project', zh: 'ES9E项目' },
                    description: { en: 'Enterprise solution development', zh: '企业解决方案开发' },
                    date: '2024-04-10',
                    tags: ['enterprise', 'solution'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_22',
                    type: 'image',
                    src: '/gallery/personal/f4.jpg',
                    thumbnail: '/gallery/personal/f4.jpg',
                    title: { en: 'F4 Project', zh: 'F4项目' },
                    description: { en: 'Advanced technology implementation', zh: '先进技术实施' },
                    date: '2024-04-11',
                    tags: ['technology', 'implementation'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_23',
                    type: 'image',
                    src: '/gallery/personal/fhjy.jpg',
                    thumbnail: '/gallery/personal/fhjy.jpg',
                    title: { en: 'Development Work', zh: '开发工作' },
                    description: { en: 'Software development process', zh: '软件开发过程' },
                    date: '2024-04-12',
                    tags: ['development', 'software'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_24',
                    type: 'image',
                    src: '/gallery/personal/fitsgo-team.jpg',
                    thumbnail: '/gallery/personal/fitsgo-team.jpg',
                    title: { en: 'FitsGo Team', zh: 'FitsGo团队' },
                    description: { en: 'Team collaboration and development', zh: '团队协作与开发' },
                    date: '2024-04-13',
                    tags: ['team', 'fitsgo'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_25',
                    type: 'image',
                    src: '/gallery/personal/gyyh.jpg',
                    thumbnail: '/gallery/personal/gyyh.jpg',
                    title: { en: 'Project Documentation', zh: '项目文档' },
                    description: { en: 'Technical documentation and planning', zh: '技术文档和规划' },
                    date: '2024-04-14',
                    tags: ['documentation', 'planning'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_26',
                    type: 'image',
                    src: '/gallery/personal/htfxj.jpg',
                    thumbnail: '/gallery/personal/htfxj.jpg',
                    title: { en: 'System Architecture', zh: '系统架构' },
                    description: { en: 'Technical system design and architecture', zh: '技术系统设计和架构' },
                    date: '2024-04-15',
                    tags: ['architecture', 'system'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_27',
                    type: 'image',
                    src: '/gallery/personal/hua_presentation.jpg',
                    thumbnail: '/gallery/personal/hua_presentation.jpg',
                    title: { en: 'Technical Presentation', zh: '技术演示' },
                    description: { en: 'Presenting technical solutions', zh: '展示技术解决方案' },
                    date: '2024-04-16',
                    tags: ['presentation', 'technical'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_28',
                    type: 'image',
                    src: '/gallery/personal/jhhy.jpg',
                    thumbnail: '/gallery/personal/jhhy.jpg',
                    title: { en: 'Innovation Lab', zh: '创新实验室' },
                    description: { en: 'Research and innovation work', zh: '研究和创新工作' },
                    date: '2024-04-17',
                    tags: ['innovation', 'research'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_29',
                    type: 'image',
                    src: '/gallery/personal/jlw.jpg',
                    thumbnail: '/gallery/personal/jlw.jpg',
                    title: { en: 'Algorithm Development', zh: '算法开发' },
                    description: { en: 'Advanced algorithm design and implementation', zh: '先进算法设计和实现' },
                    date: '2024-04-18',
                    tags: ['algorithm', 'development'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_30',
                    type: 'image',
                    src: '/gallery/personal/jnyp.jpg',
                    thumbnail: '/gallery/personal/jnyp.jpg',
                    title: { en: 'Data Science', zh: '数据科学' },
                    description: { en: 'Data analysis and machine learning', zh: '数据分析和机器学习' },
                    date: '2024-04-19',
                    tags: ['data-science', 'ml'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_31',
                    type: 'image',
                    src: '/gallery/personal/jsjxmm.jpg',
                    thumbnail: '/gallery/personal/jsjxmm.jpg',
                    title: { en: 'Code Review', zh: '代码审查' },
                    description: { en: 'Collaborative code review process', zh: '协作代码审查过程' },
                    date: '2024-04-20',
                    tags: ['code-review', 'collaboration'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_32',
                    type: 'image',
                    src: '/gallery/personal/jxmm.jpg',
                    thumbnail: '/gallery/personal/jxmm.jpg',
                    title: { en: 'Technical Workshop', zh: '技术工作坊' },
                    description: { en: 'Knowledge sharing and learning', zh: '知识分享和学习' },
                    date: '2024-04-21',
                    tags: ['workshop', 'learning'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_33',
                    type: 'image',
                    src: '/gallery/personal/photo_1.jpg',
                    thumbnail: '/gallery/personal/photo_1.jpg',
                    title: { en: 'Professional Moment', zh: '专业时刻' },
                    description: { en: 'Capturing professional excellence', zh: '捕捉专业卓越' },
                    date: '2024-04-22',
                    tags: ['professional', 'moment'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_34',
                    type: 'image',
                    src: '/gallery/personal/photo_2.jpg',
                    thumbnail: '/gallery/personal/photo_2.jpg',
                    title: { en: 'Creative Process', zh: '创作过程' },
                    description: { en: 'The creative side of development', zh: '开发的创意面' },
                    date: '2024-04-23',
                    tags: ['creative', 'process'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_35',
                    type: 'image',
                    src: '/gallery/personal/pzf.jpg',
                    thumbnail: '/gallery/personal/pzf.jpg',
                    title: { en: 'Problem Solving', zh: '问题解决' },
                    description: { en: 'Analytical thinking and problem resolution', zh: '分析思维和问题解决' },
                    date: '2024-04-24',
                    tags: ['problem-solving', 'analysis'],
                    categoryColor: '#667eea'
                },
                {
                    id: 'personal_36',
                    type: 'image',
                    src: '/gallery/personal/realibox-00.jpg',
                    thumbnail: '/gallery/personal/realibox-00.jpg',
                    title: { en: 'RealiBox Project', zh: 'RealiBox项目' },
                    description: { en: 'Innovative box solution development', zh: '创新盒子解决方案开发' },
                    date: '2024-04-25',
                    tags: ['realibox', 'innovation'],
                    categoryColor: '#667eea'
                }
            ]
        },
        {
            id: 'presentations',
            name: {
                en: 'Presentations & Talks',
                zh: '演讲与分享'
            },
            description: {
                en: 'Speaking engagements and knowledge sharing',
                zh: '演讲活动与知识分享'
            },
            color: '#f093fb',
            items: [
                {
                    id: 'presentation_1',
                    type: 'image',
                    src: '/gallery/presentations/hua_presentation.jpg',
                    thumbnail: '/gallery/presentations/hua_presentation.jpg',
                    title: {
                        en: 'Tech Conference Keynote',
                        zh: '技术大会主题演讲'
                    },
                    description: {
                        en: 'Sharing insights on modern web development',
                        zh: '分享现代Web开发的见解'
                    },
                    date: '2024-03-10',
                    tags: ['speaking', 'technology', 'conference'],
                    categoryColor: '#f093fb'
                },
                {
                    id: 'presentation_2',
                    type: 'image',
                    src: '/gallery/presentations/UC_F4.001.jpeg',
                    thumbnail: '/gallery/presentations/UC_F4.001.jpeg',
                    title: {
                        en: 'University Achievement',
                        zh: '大学成就'
                    },
                    description: {
                        en: 'Academic excellence recognition',
                        zh: '学术卓越认可'
                    },
                    date: '2024-04-15',
                    tags: ['achievement', 'education', 'university'],
                    categoryColor: '#f093fb'
                },
                {
                    id: 'presentation_3',
                    type: 'image',
                    src: '/gallery/presentations/awared-best-programmer.jpeg',
                    thumbnail: '/gallery/presentations/awared-best-programmer.jpeg',
                    title: {
                        en: 'Best Programmer Award',
                        zh: '最佳程序员奖'
                    },
                    description: {
                        en: 'Recognition for programming excellence',
                        zh: '编程卓越表现认可'
                    },
                    date: '2024-05-20',
                    tags: ['award', 'programming', 'excellence'],
                    categoryColor: '#f093fb'
                }
            ]
        },
        {
            id: 'events',
            name: {
                en: 'Events & Activities',
                zh: '活动与聚会'
            },
            description: {
                en: 'Community events and networking activities',
                zh: '社区活动与社交聚会'
            },
            color: '#48cae4',
            items: [
                {
                    id: 'event_1',
                    type: 'image',
                    src: '/gallery/events/event_1.jpg',
                    thumbnail: '/gallery/events/event_1_thumb.jpg',
                    title: {
                        en: 'Developer Meetup',
                        zh: '开发者聚会'
                    },
                    description: {
                        en: 'Networking with fellow developers',
                        zh: '与开发者同行交流'
                    },
                    date: '2024-05-20',
                    tags: ['meetup', 'networking', 'community']
                },
                {
                    id: 'event_2',
                    type: 'image',
                    src: '/gallery/events/event_2.jpg',
                    thumbnail: '/gallery/events/event_2_thumb.jpg',
                    title: {
                        en: 'Award Ceremony',
                        zh: '颁奖典礼'
                    },
                    description: {
                        en: 'Recognition for outstanding contribution',
                        zh: '杰出贡献表彰'
                    },
                    date: '2024-06-25',
                    tags: ['award', 'recognition', 'achievement']
                }
            ]
        },
        {
            id: 'development',
            name: {
                en: 'Development Work',
                zh: '开发工作'
            },
            description: {
                en: 'Behind-the-scenes development moments',
                zh: '开发工作的幕后时光'
            },
            color: '#06ffa5',
            items: [
                {
                    id: 'dev_1',
                    type: 'image',
                    src: '/gallery/development/dev_1.jpg',
                    thumbnail: '/gallery/development/dev_1_thumb.jpg',
                    title: {
                        en: 'Coding Session',
                        zh: '编程时光'
                    },
                    description: {
                        en: 'Deep in the code zone',
                        zh: '专注编程状态'
                    },
                    date: '2024-07-10',
                    tags: ['coding', 'workspace', 'focus']
                },
                {
                    id: 'dev_2',
                    type: 'image',
                    src: '/gallery/development/dev_2.jpg',
                    thumbnail: '/gallery/development/dev_2_thumb.jpg',
                    title: {
                        en: 'Team Collaboration',
                        zh: '团队协作'
                    },
                    description: {
                        en: 'Working together on innovative solutions',
                        zh: '共同打造创新解决方案'
                    },
                    date: '2024-08-01',
                    tags: ['teamwork', 'collaboration', 'innovation']
                }
            ]
        }
    ],
    
    // 获取所有媒体项
    getAllItems() {
        return this.categories.flatMap(category => 
            category.items.map(item => ({
                ...item,
                category: category.id,
                categoryName: category.name,
                categoryColor: category.color
            }))
        );
    },
    
    // 按分类获取项目
    getItemsByCategory(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.items : [];
    },
    
    // 按标签过滤
    getItemsByTag(tag) {
        return this.getAllItems().filter(item => 
            item.tags && item.tags.includes(tag)
        );
    },
    
    // 按类型过滤
    getItemsByType(type) {
        return this.getAllItems().filter(item => item.type === type);
    },
    
    // 搜索项目
    searchItems(query, language = 'en') {
        const lowercaseQuery = query.toLowerCase();
        return this.getAllItems().filter(item => 
            item.title[language].toLowerCase().includes(lowercaseQuery) ||
            item.description[language].toLowerCase().includes(lowercaseQuery) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
        );
    }
};

export default galleryData;
