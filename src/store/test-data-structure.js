// ========================================================================================
// 数据重构测试脚本
// ========================================================================================

import { newContentData, educationData } from './index.js';

// 测试新的内容数据结构
function testNewContentStructure() {
    console.log('=== 测试新的内容数据结构 ===');

    // 测试 home 数据
    console.log('Home title (en):', newContentData.home.title.en);
    console.log('Home title (zh):', newContentData.home.title.zh);

    // 测试 UI 数据
    console.log('UI language (en):', newContentData.ui.language.en);
    console.log('UI language (zh):', newContentData.ui.language.zh);

    // 测试嵌套数据
    console.log('Projects title (en):', newContentData.projects.title.en);
    console.log('Projects title (zh):', newContentData.projects.title.zh);

    return true;
}

// 测试教育数据结构
function testEducationStructure() {
    console.log('=== 测试教育数据结构 ===');

    // 测试标签
    console.log('Academic Records (en):', educationData.labels.academicRecords.en);
    console.log('Academic Records (zh):', educationData.labels.academicRecords.zh);

    // 测试学位数据
    const mastersDegree = educationData.degrees.find(d => d.id === 'masters');
    console.log('Masters degree (en):', mastersDegree?.degree.en);
    console.log('Masters degree (zh):', mastersDegree?.degree.zh);

    return true;
}

// 模拟新的 getText 方法
function simulateGetText(path, language = 'en') {
    const pathArray = path.split('.');
    let current = newContentData;

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

// 测试 getText 方法
function testGetTextMethod() {
    console.log('=== 测试 getText 方法 ===');

    // 测试简单路径
    console.log('home.title (en):', simulateGetText('home.title', 'en'));
    console.log('home.title (zh):', simulateGetText('home.title', 'zh'));

    // 测试深层路径
    console.log('projects.detail.technologyStack (en):', simulateGetText('projects.detail.technologyStack', 'en'));
    console.log('projects.detail.technologyStack (zh):', simulateGetText('projects.detail.technologyStack', 'zh'));

    // 测试不存在的路径
    console.log('nonexistent.path:', simulateGetText('nonexistent.path', 'en'));

    return true;
}

// 运行所有测试
export function runDataStructureTests() {
    try {
        testNewContentStructure();
        testEducationStructure();
        testGetTextMethod();
        console.log('✅ 所有测试通过！');
        return true;
    } catch (error) {
        console.error('❌ 测试失败:', error);
        return false;
    }
}

// 如果直接运行此文件，执行测试
if (typeof window === 'undefined') {
    runDataStructureTests();
}
