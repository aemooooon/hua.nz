import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <div className="min-h-screen flex items-center justify-center bg-theme-background">
                    <div className="max-w-md w-full bg-theme-surface shadow-lg rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.102 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    应用程序遇到错误
                                </h3>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            抱歉，应用程序遇到了一个意外错误。请刷新页面重试。
                        </div>
                        {import.meta.env.DEV && this.state.error && (
                            <details className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                                <summary className="cursor-pointer mb-2">错误详情（开发模式）</summary>
                                <pre className="whitespace-pre-wrap bg-theme-muted p-2 rounded">
                                    {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                        <div className="mt-6">
                            <button 
                                onClick={() => window.location.reload()}
                                className="w-full bg-theme-primary hover:bg-theme-primary/80 text-theme-background font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                            >
                                刷新页面
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;
