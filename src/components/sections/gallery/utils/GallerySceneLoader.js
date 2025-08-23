/**
 * Gallery场景加载管理器
 * 按顺序加载Gallery场景的各个组件，防止闪烁和跳动
 */

import galleryTextureManager from './GalleryTextureManager.js';

export class GallerySceneLoader {
    constructor() {
        this.loadingSteps = [];
        this.currentStep = 0;
        this.isLoading = false;
        this.onProgress = null;
        this.onComplete = null;
        this.onStepComplete = null;
    }

    /**
     * 配置加载步骤
     */
    configureLoadingSteps() {
        this.loadingSteps = [
            {
                name: '初始化纹理系统',
                weight: 5,
                task: async () => {
                    await galleryTextureManager.initialize();
                    console.log('✅ 纹理系统初始化完成');
                }
            },
            {
                name: '预加载Gallery纹理',
                weight: 20,
                task: async () => {
                    // 获取所有gallery图片名称
                    const imageNames = this.getGalleryImageNames();
                    if (imageNames.length > 0) {
                        await galleryTextureManager.preloadGalleryImages(imageNames);
                    }
                    console.log('✅ Gallery纹理预加载完成');
                }
            },
            {
                name: '创建基础场景结构',
                weight: 15,
                task: async () => {
                    // 创建房间几何体（地板、墙壁、天花板）
                    // 这里通过回调来执行实际的场景创建
                    if (this.sceneCreators.createRoom) {
                        await this.sceneCreators.createRoom();
                    }
                    console.log('✅ 基础场景结构创建完成');
                }
            },
            {
                name: '初始化光柱系统',
                weight: 20,
                task: async () => {
                    if (this.sceneCreators.createLightPillars) {
                        await this.sceneCreators.createLightPillars();
                    }
                    console.log('✅ 光柱系统初始化完成');
                }
            },
            {
                name: '配置环境照明',
                weight: 15,
                task: async () => {
                    if (this.sceneCreators.setupLighting) {
                        await this.sceneCreators.setupLighting();
                    }
                    console.log('✅ 环境照明配置完成');
                }
            },
            {
                name: '初始化IES聚光灯',
                weight: 15,
                task: async () => {
                    if (this.sceneCreators.createIESLights) {
                        await this.sceneCreators.createIESLights();
                    }
                    console.log('✅ IES聚光灯初始化完成');
                }
            },
            {
                name: '启动动画系统',
                weight: 10,
                task: async () => {
                    if (this.sceneCreators.startAnimations) {
                        await this.sceneCreators.startAnimations();
                    }
                    console.log('✅ 动画系统启动完成');
                }
            }
        ];
    }

    /**
     * 设置场景创建器
     */
    setSceneCreators(creators) {
        this.sceneCreators = creators;
    }

    /**
     * 设置进度回调
     */
    onProgressUpdate(callback) {
        this.onProgress = callback;
    }

    /**
     * 设置完成回调
     */
    onLoadComplete(callback) {
        this.onComplete = callback;
    }

    /**
     * 设置步骤完成回调
     */
    onStepCompleted(callback) {
        this.onStepComplete = callback;
    }

    /**
     * 开始加载
     */
    async startLoading() {
        if (this.isLoading) {
            console.warn('场景正在加载中...');
            return;
        }

        this.isLoading = true;
        this.currentStep = 0;
        
        console.log('🚀 开始Gallery场景加载...');
        this.configureLoadingSteps();

        try {
            let totalWeight = this.loadingSteps.reduce((sum, step) => sum + step.weight, 0);
            let completedWeight = 0;

            for (let i = 0; i < this.loadingSteps.length; i++) {
                const step = this.loadingSteps[i];
                this.currentStep = i;

                console.log(`📋 执行步骤 ${i + 1}/${this.loadingSteps.length}: ${step.name}`);

                try {
                    // 执行加载步骤
                    await step.task();
                    
                    completedWeight += step.weight;
                    const progress = Math.round((completedWeight / totalWeight) * 100);

                    // 通知步骤完成
                    if (this.onStepComplete) {
                        this.onStepComplete(i + 1, step.name, progress);
                    }

                    // 通知进度更新
                    if (this.onProgress) {
                        this.onProgress(progress, step.name);
                    }

                    // 短暂延迟，防止闪烁
                    await new Promise(resolve => setTimeout(resolve, 100));

                } catch (stepError) {
                    console.error(`❌ 步骤失败: ${step.name}`, stepError);
                    // 继续执行下一步，不中断整个加载过程
                }
            }

            this.isLoading = false;
            console.log('🎉 Gallery场景加载完成!');

            // 通知加载完成
            if (this.onComplete) {
                this.onComplete();
            }

        } catch (error) {
            this.isLoading = false;
            console.error('❌ Gallery场景加载失败:', error);
            throw error;
        }
    }

    /**
     * 获取Gallery图片名称列表
     */
    getGalleryImageNames() {
        // 返回所有需要预加载的gallery图片名称
        return [
            'gallery-horizontal-1',
            'gallery-horizontal-2',
            'gallery-horizontal-3',
            'gallery-horizontal-4',
            'gallery-horizontal-5',
            'gallery-horizontal-6',
            'gallery-horizontal-7',
            'gallery-horizontal-8',
            'gallery-horizontal-9',
            'gallery-horizontal-10',
            'gallery-horizontal-11',
            'gallery-horizontal-12',
            'gallery-horizontal-13',
            'gallery-horizontal-14',
            'gallery-horizontal-15',
            'gallery-horizontal-16',
            'gallery-vertical-0',
            'gallery-vertical-1',
            'gallery-vertical-2',
            'gallery-vertical-3',
            'gallery-vertical-4',
            'gallery-vertical-5'
        ];
    }

    /**
     * 获取当前加载状态
     */
    getLoadingStatus() {
        return {
            isLoading: this.isLoading,
            currentStep: this.currentStep,
            totalSteps: this.loadingSteps.length,
            currentStepName: this.loadingSteps[this.currentStep]?.name || '',
            progress: this.currentStep / this.loadingSteps.length * 100
        };
    }

    /**
     * 重置加载器
     */
    reset() {
        this.isLoading = false;
        this.currentStep = 0;
        this.loadingSteps = [];
    }
}

// 创建单例实例
export const gallerySceneLoader = new GallerySceneLoader();
export default gallerySceneLoader;
