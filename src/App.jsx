import SmartScrollManager from './components/features/SmartScrollManager';
import SmartDirectionalCursor from './components/features/SmartDirectionalCursor';
import NetworkStatus from './components/ui/NetworkStatus';
import SectionProgressBar from './components/ui/SectionProgressBar';
import ErrorBoundary from './components/ui/ErrorBoundary';
import DeveloperPanel from './components/performancepanel/DeveloperPanel';
import { PhotoSwipeProvider } from './components/ui/PhotoSwipe';
import { useDeveloperPanel } from './hooks/useDeveloperPanel';
import { useTheme } from './hooks/useTheme';
import { useAppStore } from './store/useAppStore';

const App = () => {
    const developerPanel = useDeveloperPanel();
    const { language } = useAppStore();

    // 初始化主题系统
    useTheme();

    return (
        <ErrorBoundary>
            <PhotoSwipeProvider>
                <div className="App min-h-screen">
                    {/* Section进度条 */}
                    <SectionProgressBar />

                    {/* 网络状态检测 */}
                    <NetworkStatus language={language} />

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
            </PhotoSwipeProvider>
        </ErrorBoundary>
    );
};

export default App;
