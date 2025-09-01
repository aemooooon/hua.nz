import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * NetworkStatus - 网络连接状态检测组件
 *
 * 功能特性：
 * - 实时检测网络连接状态
 * - 仅在网络异常时显示毛玻璃卡片
 * - 自动隐藏/显示逻辑
 */
const NetworkStatus = ({ language = 'en' }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showStatus, setShowStatus] = useState(false);

    // 网络状态检测
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowStatus(true);
            // 2秒后自动隐藏"已连接"状态
            setTimeout(() => setShowStatus(false), 2000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowStatus(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // 初始状态检查 - 只在网络异常时显示
        if (!navigator.onLine) {
            setShowStatus(true);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const getText = () => {
        if (!isOnline) {
            return {
                title: language === 'zh' ? '网络连接中断' : 'Network Disconnected',
                message:
                    language === 'zh'
                        ? '部分功能可能无法正常使用，请检查网络连接'
                        : 'Some features may not work properly. Please check your connection.',
                icon: (
                    <svg
                        className="w-6 h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                        />
                    </svg>
                ),
            };
        }

        return {
            title: language === 'zh' ? '网络连接已恢复' : 'Network Reconnected',
            message: language === 'zh' ? '所有功能恢复正常' : 'All features are now working',
            icon: (
                <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        };
    };

    // 网络状态改变时显示提示
    if (!showStatus) {
        return null;
    }

    const { title, message, icon } = getText();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div
                className={`transition-all duration-300 transform ${
                    showStatus ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                } pointer-events-auto`}
            >
                <div className="bg-zinc-800/90 backdrop-blur-md border border-zinc-700/50 rounded-lg p-4 shadow-2xl">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">{icon}</div>
                        <div className="text-white">
                            <div className="font-medium text-sm">{title}</div>
                            <div className="text-zinc-300 text-xs mt-1">{message}</div>
                        </div>
                        <button
                            onClick={() => setShowStatus(false)}
                            className="text-zinc-400 hover:text-zinc-200 text-sm ml-4 transition-colors"
                            aria-label="关闭"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

NetworkStatus.propTypes = {
    language: PropTypes.string,
};

export default NetworkStatus;
