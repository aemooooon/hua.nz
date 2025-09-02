import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    sectionsData,
    contentData,
    educationData,
    projectsData,
    footprintsData,
    galleryData,
} from './index.js';

export const useAppStore = create(
    persist(
        (set, get) => ({
            // 语言状态
            language: 'en',
            setLanguage: language => set({ language }),
            toggleLanguage: () =>
                set(state => ({ language: state.language === 'en' ? 'zh' : 'en' })),

            // 主题状态 - 使用新的主题名称
            theme: 'nz-blue',
            setTheme: theme => set({ theme }),
            toggleTheme: () => {
                const themes = ['nz-blue', 'si-green'];
                return set(state => {
                    const currentIndex = themes.indexOf(state.theme);
                    const nextIndex = (currentIndex + 1) % themes.length;
                    return { theme: themes[nextIndex] };
                });
            },

            // 当前活动区块
            currentSection: 0,
            setCurrentSection: index => set({ currentSection: index }),

            // 当前背景效果
            currentEffect: 'effectchaos',
            setCurrentEffect: effect => set({ currentEffect: effect }),

            // 3D Gallery 模式状态
            isPointerLocked: false,
            setIsPointerLocked: locked => set({ isPointerLocked: locked }),

            // 滚动状态
            isScrolling: false,
            setIsScrolling: scrolling => set({ isScrolling: scrolling }),

            // 开场动画状态
            enableOpeningAnimation: true,
            setEnableOpeningAnimation: enabled => set({ enableOpeningAnimation: enabled }),

            // Modal 状态管理
            selectedProject: null,
            isProjectModalOpen: false,
            setSelectedProject: project =>
                set({
                    selectedProject: project,
                    isProjectModalOpen: !!project,
                }),
            closeProjectModal: () =>
                set({
                    selectedProject: null,
                    isProjectModalOpen: false,
                }),

            // 配置数据
            sections: sectionsData,

            // 多语言文本内容
            texts: contentData,

            // 项目数据
            projects: projectsData,

            // 足迹数据
            footprints: footprintsData,

            // Gallery数据配置 - 从单独文件导入
            gallery: galleryData,

            // 项目数据访问方法
            getProjectsByType: type => {
                const { projects } = get();
                return projects.filter(project => project.type === type);
            },

            getAllProjects: () => {
                const { projects } = get();
                return projects;
            },

            getAllFootprints: () => {
                const { footprints } = get();
                return footprints;
            },

            // Gallery数据访问方法
            getAllGalleryItems: () => {
                const { gallery } = get();
                return gallery;
            },

            getGalleryItemsByTag: tag => {
                const { gallery } = get();
                return gallery.filter(item => item.tags && item.tags.includes(tag));
            },

            getGalleryItemsByType: type => {
                const { gallery } = get();
                return gallery.filter(item => item.type === type);
            },

            searchGalleryItems: (query, language = 'en') => {
                const { gallery } = get();
                const lowercaseQuery = query.toLowerCase();
                return gallery.filter(
                    item =>
                        item.title[language].toLowerCase().includes(lowercaseQuery) ||
                        item.description[language].toLowerCase().includes(lowercaseQuery) ||
                        (item.tags &&
                            item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
                );
            },

            // 获取当前语言的内容
            getContent: () => {
                const { language } = get();
                return contentData[language];
            },

            // 新的内容访问方法 - 支持标准化多语言结构
            getNewContent: () => {
                return contentData;
            },

            // 获取标准化多语言文本
            getText: path => {
                const { language } = get();
                const pathArray = path.split('.');
                let current = contentData;

                for (const key of pathArray) {
                    if (current && current[key]) {
                        current = current[key];
                    } else {
                        return '';
                    }
                }

                // 如果最终结果是多语言对象，返回当前语言的文本
                if (current && typeof current === 'object' && current[language]) {
                    return current[language];
                }

                // 如果没有当前语言，尝试英文
                if (current && typeof current === 'object' && current.en) {
                    return current.en;
                }

                return current || '';
            },

            // 获取教育数据
            getEducationData: () => {
                // 从 content.js 获取界面文本
                const educationTexts = contentData.education;

                // 从 education.js 获取学历数据
                const degrees = educationData;

                // 合并数据
                return {
                    title: educationTexts.title,
                    subtitle: educationTexts.subtitle,
                    labels: educationTexts.labels,
                    degrees: degrees
                };
            },

            // 获取当前语言的项目文本
            getProjectsText: () => {
                const { language } = get();
                return contentData[language]?.projects || contentData['en'].projects;
            },

            // 获取项目描述（支持多语言和多段落）
            getProjectDescription: (project, language) => {
                if (!project?.description) return '';
                if (typeof project.description === 'object' && project.description !== null) {
                    const description =
                        project.description[language] ||
                        project.description.en ||
                        project.description.zh ||
                        '';
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

            // 配置数据访问方法
            getSectionsData: () => sectionsData,

            getSectionConfig: sectionId => {
                return sectionsData.find(section => section.id === sectionId);
            },

            getSectionConfigByIndex: index => {
                return sectionsData[index];
            },

            getCurrentSectionData: () => {
                const { currentSection } = get();
                return sectionsData[currentSection];
            },

            // 获取当前区块的背景效果
            getCurrentBackgroundEffect: () => {
                const { currentSection } = get();
                return sectionsData[currentSection]?.backgroundEffect || '';
            },

            // 获取当前区块的立方体材质配置
            getCurrentCubeFaces: () => {
                const { currentSection } = get();
                return sectionsData[currentSection]?.faces || {};
            },

            // 获取区块名称（多语言）
            getSectionName: sectionId => {
                const { language, sections } = get();
                const section = sections.find(s => s.id === sectionId);
                return section ? section.name[language] : '';
            },

            // 获取区块描述（多语言）
            getSectionDescription: sectionId => {
                const { language, sections } = get();
                const section = sections.find(s => s.id === sectionId);
                return section ? section.description[language] : '';
            },

            // 导航到指定区块 - 增加方向跟踪，优化时序，同时更新背景效果
            navigateToSection: index => {
                const { currentSection, sections } = get();
                const direction = index > currentSection ? 'from-prev' : 'from-next';
                const newBackgroundEffect = sectionsData[index]?.backgroundEffect || '';

                // 更新当前section的配置，包含导航方向信息
                const updatedSections = sections.map((section, i) =>
                    i === index ? { ...section, previousDirection: direction } : section
                );

                set({
                    currentSection: index,
                    currentEffect: newBackgroundEffect,
                    isScrolling: true,
                    sections: updatedSections,
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
            },
        }),
        {
            name: 'hua-portfolio-store',
            partialize: state => ({
                language: state.language,
                theme: state.theme,
            }),
        }
    )
);

export default useAppStore;
