import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useAppStore } from '../store/useAppStore';

/**
 * PWA 安装提示和更新通知组件
 *
 * 功能：
 * - 检测 PWA 可安装性并显示安装提示
 * - 检测 Service Worker 更新并通知用户
 * - 支持中英文多语言切换
 * - 主题色毛玻璃卡片效果 + 霓虹灯发光边框
 * - 智能显示逻辑：仅在已安装后显示离线缓存提示
 */
export default function PWAPrompt() {
    const { language } = useAppStore();
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    // 多语言文本配置
    const texts = {
        install: {
            title: language === 'zh' ? '安装应用到桌面' : 'Install App',
            description:
                language === 'zh'
                    ? '快速访问，离线可用，获得更好的体验！'
                    : 'Quick access, offline ready, better experience!',
            button: language === 'zh' ? '立即安装' : 'Install',
            later: language === 'zh' ? '稍后' : 'Later',
        },
        offline: {
            title: language === 'zh' ? '已准备好离线使用' : 'Ready for Offline',
            description:
                language === 'zh'
                    ? '应用已缓存，现在可以离线访问！'
                    : 'App cached, now available offline!',
            button: language === 'zh' ? '知道了' : 'Got it',
        },
        update: {
            title: language === 'zh' ? '发现新版本' : 'New Version Available',
            description:
                language === 'zh'
                    ? '有新内容可用，点击刷新获取最新版本'
                    : 'New content available, click to refresh',
            button: language === 'zh' ? '立即刷新' : 'Refresh',
            later: language === 'zh' ? '稍后' : 'Later',
        },
    };

    // Service Worker 更新检测
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('✅ PWA: Service Worker registered');
            // 每小时检查更新
            r &&
                setInterval(
                    () => {
                        r.update();
                    },
                    60 * 60 * 1000
                );
        },
        onRegisterError(error) {
            console.error('❌ PWA: Service Worker registration failed', error);
        },
    });

    // 监听 PWA 安装提示事件
    useEffect(() => {
        const checkInstalled = window.matchMedia('(display-mode: standalone)').matches;
        setIsInstalled(checkInstalled);

        if (checkInstalled) {
            console.log('✅ PWA: App already installed');
            setShowInstallPrompt(false);
            return;
        }

        const handler = e => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
            console.log('📱 PWA: App can be installed');
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    // 处理安装
    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('✅ PWA: User accepted installation');
            setIsInstalled(true);
        } else {
            console.log('❌ PWA: User declined installation');
        }

        setDeferredPrompt(null);
        setShowInstallPrompt(false);
    };

    // 处理更新
    const handleUpdate = () => {
        updateServiceWorker(true);
    };

    // 关闭提示
    const closeInstallPrompt = () => {
        setShowInstallPrompt(false);
    };

    const closeUpdatePrompt = () => {
        setNeedRefresh(false);
    };

    const closeOfflineReady = () => {
        setOfflineReady(false);
    };

    return (
        <>
            {/* 安装提示 */}
            {showInstallPrompt && (
                <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-slide-up">
                    <div className="relative rounded-2xl p-[2px]">
                        <div
                            className="relative rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(var(--theme-primary-rgb), 0.08)',
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(var(--theme-primary-rgb), 0.15), rgba(var(--theme-secondary-rgb), 0.15), rgba(var(--theme-primary-rgb), 0.05))',
                                }}
                            ></div>

                            {/* 内容区域 */}
                            <div className="relative p-5">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                                        }}
                                    >
                                        <span className="text-2xl">📱</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold text-base mb-1.5">
                                            {texts.install.title}
                                        </h3>
                                        <p className="text-white/80 text-sm leading-relaxed mb-4">
                                            {texts.install.description}
                                        </p>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleInstall}
                                                className="flex-1 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                                style={{
                                                    background:
                                                        'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))',
                                                }}
                                            >
                                                {texts.install.button}
                                            </button>
                                            <button
                                                onClick={closeInstallPrompt}
                                                className="px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all duration-200"
                                            >
                                                {texts.install.later}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 离线就绪提示 - 仅在已安装后显示 */}
            {offlineReady && isInstalled && (
                <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-slide-up">
                    <div
                        className="relative rounded-2xl p-[2px]"
                        style={{
                            background:
                                'linear-gradient(135deg, var(--theme-secondary), var(--theme-accent))',
                            boxShadow: `
                            0 0 20px rgba(var(--theme-secondary-rgb), 0.6),
                            0 0 40px rgba(var(--theme-secondary-rgb), 0.4),
                            0 0 60px rgba(var(--theme-secondary-rgb), 0.2),
                            inset 0 0 20px rgba(var(--theme-secondary-rgb), 0.1)
                        `,
                        }}
                    >
                        <div
                            className="relative rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(var(--theme-secondary-rgb), 0.08)',
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(var(--theme-secondary-rgb), 0.15), rgba(var(--theme-primary-rgb), 0.05))',
                                }}
                            ></div>

                            <div className="relative p-5">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, var(--theme-secondary), var(--theme-accent))',
                                        }}
                                    >
                                        <span className="text-2xl">✅</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold text-base mb-1.5">
                                            {texts.offline.title}
                                        </h3>
                                        <p className="text-white/80 text-sm leading-relaxed mb-3">
                                            {texts.offline.description}
                                        </p>
                                        <button
                                            onClick={closeOfflineReady}
                                            className="text-sm font-medium transition-colors"
                                            style={{ color: 'var(--theme-primary)' }}
                                        >
                                            {texts.offline.button}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 版本更新提示 */}
            {needRefresh && (
                <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-slide-up">
                    <div
                        className="relative rounded-2xl p-[2px]"
                        style={{
                            background:
                                'linear-gradient(135deg, var(--theme-accent), var(--theme-primary))',
                            boxShadow: `
                            0 0 20px rgba(var(--theme-primary-rgb), 0.6),
                            0 0 40px rgba(var(--theme-primary-rgb), 0.4),
                            0 0 60px rgba(var(--theme-accent-rgb), 0.3),
                            inset 0 0 20px rgba(var(--theme-primary-rgb), 0.1)
                        `,
                        }}
                    >
                        <div
                            className="relative rounded-2xl backdrop-blur-xl border border-white/10 overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(var(--theme-primary-rgb), 0.08)',
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(135deg, rgba(var(--theme-accent-rgb), 0.15), rgba(var(--theme-primary-rgb), 0.05))',
                                }}
                            ></div>

                            <div className="relative p-5">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg animate-spin-slow"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, var(--theme-accent), var(--theme-primary))',
                                        }}
                                    >
                                        <span className="text-2xl">🔄</span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold text-base mb-1.5">
                                            {texts.update.title}
                                        </h3>
                                        <p className="text-white/80 text-sm leading-relaxed mb-4">
                                            {texts.update.description}
                                        </p>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleUpdate}
                                                className="flex-1 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                                style={{
                                                    background:
                                                        'linear-gradient(135deg, var(--theme-accent), var(--theme-primary))',
                                                }}
                                            >
                                                {texts.update.button}
                                            </button>
                                            <button
                                                onClick={closeUpdatePrompt}
                                                className="px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-all duration-200"
                                            >
                                                {texts.update.later}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
