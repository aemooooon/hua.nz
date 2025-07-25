import { useState, useEffect } from "react";
import FullPageScrollManager from "./components/FullPageScrollManager";
import AudioController from "./components/AudioController";
import ThemeLanguageToggle from "./components/ThemeLanguageToggle";
import CustomCursor from "./components/CustomCursor";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAppStore } from "./store/useAppStore";

const App = () => {
    const [controlsVisible, setControlsVisible] = useState(false);
    const theme = useAppStore((state) => state.theme);

    // 控制按钮显示时机
    useEffect(() => {
        const timer = setTimeout(() => {
            setControlsVisible(true);
        }, 3000); // 3秒后显示控制按钮

        return () => clearTimeout(timer);
    }, []);

    // 应用主题类到body
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ErrorBoundary>
            <div className="App min-h-screen">
                {/* 自定义鼠标cursor */}
                <CustomCursor />
                
                {/* 全屏滚动管理器 */}
                <FullPageScrollManager />

                {/* 控制按钮组 - 移动到右边，与主题语言切换按钮相邻 */}
                <div className={`fixed bottom-6 right-20 z-50 transition-opacity duration-1000 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center space-x-4">
                        {/* 音频控制器 */}
                        <AudioController />
                    </div>
                </div>

                {/* 主题和语言切换 */}
                <ThemeLanguageToggle />
            </div>
        </ErrorBoundary>
    );
};

export default App;
