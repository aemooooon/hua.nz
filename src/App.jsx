import SmartScrollManager from "./components/features/SmartScrollManager";
import SmartDirectionalCursor from "./components/features/SmartDirectionalCursor";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import DeveloperPanel from "./components/performancepanel/DeveloperPanel";
import { useDeveloperPanel } from "./hooks/useDeveloperPanel";
import { useTheme } from "./hooks/useTheme";

const App = () => {
    const developerPanel = useDeveloperPanel();
    
    // 初始化主题系统
    useTheme();

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
