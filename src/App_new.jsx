import { useState, useEffect } from "react";
import { AppProvider } from "./contexts/AppContext";
import FullPageScrollManager from "./components/FullPageScrollManager";
import AudioController from "./components/AudioController";
import ThemeLanguageToggle from "./components/ThemeLanguageToggle";
import portfolioMusic from "./assets/audio.mp3";

const AppContent = () => {
    const [controlsVisible, setControlsVisible] = useState(false);

    // 控制按钮显示时机
    useEffect(() => {
        const timer = setTimeout(() => {
            setControlsVisible(true);
        }, 3000); // 3秒后显示控制按钮

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App min-h-screen">
            {/* 全屏滚动管理器 */}
            <FullPageScrollManager />

            {/* 控制按钮组 */}
            <div className={`fixed bottom-6 right-6 z-50 transition-opacity duration-1000 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col space-y-4">
                    {/* 音频控制器 */}
                    <AudioController audioSrc={portfolioMusic} />
                    
                    {/* 主题和语言切换 */}
                    <ThemeLanguageToggle />
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

export default App;
