// ========================================================================================
// 数据迁移适配器 - 保证向后兼容性
// ========================================================================================

import { newContentData, educationData } from './index.js';

/**
 * 创建向后兼容的内容数据访问器
 * 将新的标准化结构转换为旧的 en/zh 分层结构
 */
export function createLegacyContentData() {
    const legacyData = {
        en: {},
        zh: {},
    };

    // 递归转换数据结构
    function transformToLegacy(obj, enTarget, zhTarget) {
        for (const [key, value] of Object.entries(obj)) {
            if (value && typeof value === 'object') {
                if (value.en && value.zh) {
                    // 这是多语言对象
                    enTarget[key] = value.en;
                    zhTarget[key] = value.zh;
                } else {
                    // 这是嵌套对象，需要递归处理
                    enTarget[key] = {};
                    zhTarget[key] = {};
                    transformToLegacy(value, enTarget[key], zhTarget[key]);
                }
            } else {
                // 非对象值，直接复制
                enTarget[key] = value;
                zhTarget[key] = value;
            }
        }
    }

    transformToLegacy(newContentData, legacyData.en, legacyData.zh);

    // 合并教育数据
    if (educationData) {
        transformToLegacy({ education: educationData }, legacyData.en, legacyData.zh);
    }

    return legacyData;
}

/**
 * 标准化的文本获取方法
 * @param {string} path - 文本路径，如 'home.title'
 * @param {string} language - 语言代码
 * @param {object} dataSource - 数据源，默认为 newContentData
 * @returns {string} 文本内容
 */
export function getText(path, language = 'en', dataSource = newContentData) {
    const pathArray = path.split('.');
    let current = dataSource;

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
}

/**
 * 获取教育数据中的文本
 * @param {string} path - 教育数据路径
 * @param {string} language - 语言代码
 * @returns {string} 文本内容
 */
export function getEducationText(path, language = 'en') {
    return getText(path, language, educationData);
}

/**
 * 兼容性检查：确保所有必要的数据都存在
 */
export function validateDataStructure() {
    const issues = [];

    // 检查必要的内容数据
    const requiredPaths = [
        'home.title',
        'home.name',
        'about.pages',
        'projects.title',
        'gallery.mobile.title',
        'contact.title',
        'ui.language',
    ];

    for (const path of requiredPaths) {
        const enText = getText(path, 'en');
        const zhText = getText(path, 'zh');

        if (!enText) {
            issues.push(`Missing English text for: ${path}`);
        }
        if (!zhText) {
            issues.push(`Missing Chinese text for: ${path}`);
        }
    }

    // 检查教育数据
    if (!educationData.degrees || educationData.degrees.length === 0) {
        issues.push('No education degrees data found');
    }

    return {
        isValid: issues.length === 0,
        issues,
    };
}

/**
 * 创建渐进式迁移计划
 */
export function createMigrationPlan() {
    return {
        phase1: {
            description: '创建新数据结构，保持旧接口',
            actions: [
                '创建 education.js',
                '创建 content-new.js',
                '添加兼容性适配器',
                '保持现有 getContent() 方法工作',
            ],
        },
        phase2: {
            description: '逐步更新组件使用新接口',
            actions: [
                '更新 ThemeLanguageToggle 使用 getText()',
                '更新 AboutSection 使用新结构',
                '更新 EducationSection 使用 getEducationData()',
                '添加新的 getText() 和 getEducationText() 方法',
            ],
        },
        phase3: {
            description: '完全切换到新结构',
            actions: [
                '替换 content.js',
                '移除旧的 getContent() 方法',
                '清理兼容性代码',
                '更新所有剩余的组件',
            ],
        },
    };
}
