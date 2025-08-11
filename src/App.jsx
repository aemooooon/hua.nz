import SmartScrollManager from "./components/features/SmartScrollManager";
import SmartDirectionalCursor from "./components/features/SmartDirectionalCursor";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import DeveloperPanel from "./components/performancepanel/DeveloperPanel";
import LoadingTest from "./components/test/LoadingTest";
import { useDeveloperPanel } from "./hooks/useDeveloperPanel";
import { useTheme } from "./hooks/useTheme";
import { useState, useEffect } from "react";

const App = () => {
    const developerPanel = useDeveloperPanel();
    const [showLoadingTest, setShowLoadingTest] = useState(false);
    
    // 初始化主题系统
    useTheme();

    // 开发模式下的快捷键监听
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl+L 切换加载测试页面
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                setShowLoadingTest(prev => !prev);
            }
        };

        if (import.meta.env.DEV) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    // 如果是测试模式，显示测试页面
    if (showLoadingTest) {
        return (
            <ErrorBoundary>
                <LoadingTest />
                <div className="fixed top-4 right-4 text-white z-50">
                    <p className="text-sm bg-black/50 p-2 rounded">
                        按 Ctrl+L 返回主页
                    </p>
                </div>
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary>
            <div className="App min-h-screen">
                {/* 智能方向光标 */}
                <SmartDirectionalCursor />
                
                {/* 智能滚动管理器（已优化：降低敏感度，禁止轮播） */}
                <SmartScrollManager />

                {/* 统一开发者面板 - 仅在开发模式下可用，通过 Ctrl+M 切换 */}
                {developerPanel.isDev && (
                    <DeveloperPanel 
                        visible={developerPanel.isVisible}
                        onToggle={developerPanel.toggle}
                    />
                )}
            </div>
        </ErrorBoundary>
    );
};

export default App;
