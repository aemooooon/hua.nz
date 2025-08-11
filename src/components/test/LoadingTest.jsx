import { useState, useEffect } from 'react';
import CircularLoadingIndicator from '../ui/CircularLoadingIndicator';

/**
 * 测试页面 - 展示增强后的CircularLoadingIndicator光影效果
 */
const LoadingTest = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setIsLoading(false);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const resetTest = () => {
        setProgress(0);
        setIsLoading(true);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
                增强后的 CircularLoadingIndicator 测试
            </h1>
            
            <div className="space-y-8">
                {/* 模拟加载过程 */}
                <div className="text-center">
                    <p className="text-white mb-4">模拟加载进度: {progress}%</p>
                    <button 
                        onClick={resetTest}
                        className="px-6 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors"
                    >
                        重新开始测试
                    </button>
                </div>

                {/* 全屏加载指示器 */}
                {isLoading && (
                    <CircularLoadingIndicator
                        size={160}
                        strokeWidth={12}
                        showMask={true}
                    />
                )}

                {/* 不带遮罩的展示区域 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-white mb-4">小圆环 (80px)</h3>
                        <div className="flex justify-center">
                            <CircularLoadingIndicator
                                size={80}
                                strokeWidth={6}
                                showMask={false}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-white mb-4">中圆环 (120px)</h3>
                        <div className="flex justify-center">
                            <CircularLoadingIndicator
                                size={120}
                                strokeWidth={8}
                                showMask={false}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-white mb-4">大圆环 (160px)</h3>
                        <div className="flex justify-center">
                            <CircularLoadingIndicator
                                size={160}
                                strokeWidth={12}
                                showMask={false}
                            />
                        </div>
                    </div>
                </div>

                {/* 效果说明 */}
                <div className="max-w-2xl mx-auto text-center text-white/80 text-sm">
                    <h3 className="text-lg font-semibold mb-4">新增的光影效果包括：</h3>
                    <ul className="space-y-2 text-left">
                        <li>• <strong>旋转背光效果</strong>：圆环外围的锥形渐变背光，4秒旋转一周</li>
                        <li>• <strong>静态内层光晕</strong>：圆环内侧的径向渐变光晕</li>
                        <li>• <strong>增强圆环光影</strong>：圆环本身的阴影呼吸效果，3秒周期</li>
                        <li>• <strong>主题色适配</strong>：所有光效都使用CSS变量，支持主题切换</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoadingTest;
