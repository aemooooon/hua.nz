import { useEffect } from "react";
import SmartScrollManager from "./components/SmartScrollManager";
import ThemeLanguageToggle from "./components/ThemeLanguageToggle";
import SmartDirectionalCursor from "./components/SmartDirectionalCursor";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAppStore } from "./store/useAppStore";

const App = () => {
    const { theme, getCurrentSection } = useAppStore();
    const currentSection = getCurrentSection();
    
    // 只在首页显示控制按钮
    const isHomePage = currentSection?.id === 'home';

    // 应用主题类到body
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ErrorBoundary>
            <div className="App min-h-screen">
                {/* 智能方向光标 */}
                <SmartDirectionalCursor />
                
                {/* 智能滚动管理器（已优化：降低敏感度，禁止轮播） */}
                <SmartScrollManager />

                {/* 主题和语言切换 - 只在首页显示，有自己的显示时机控制 */}
                {isHomePage && <ThemeLanguageToggle />}
            </div>
        </ErrorBoundary>
    );
};

export default App;
