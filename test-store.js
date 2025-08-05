// 测试store数据整合
import useAppStore from './src/store/useAppStore.js';

// 创建临时测试实例
const testStore = useAppStore.getState();

console.log('=== 测试项目数据 ===');
console.log('所有项目数量:', testStore.getAllProjects().length);
console.log('项目类型项目数量:', testStore.getProjectsByType('project').length);
console.log('工作类型项目数量:', testStore.getProjectsByType('work').length);
console.log('教育类型项目数量:', testStore.getProjectsByType('education').length);

console.log('\n=== 测试Gallery数据 ===');
console.log('Gallery分类数量:', testStore.gallery.categories.length);
console.log('所有Gallery项目数量:', testStore.getAllGalleryItems().length);
console.log('个人分类图片数量:', testStore.getGalleryItemsByCategory('personal').length);

console.log('\n=== 测试内容配置 ===');
console.log('英文内容:', testStore.getContent().home.name);
testStore.setLanguage('zh');
console.log('中文内容:', testStore.getContent().home.name);

console.log('\n✅ 数据整合测试完成');
