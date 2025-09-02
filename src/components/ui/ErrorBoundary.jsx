import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppStore } from '../../store/useAppStore';
import * as THREE from 'three';

// 简化的3D波纹背景效果组件
const ErrorBoundaryBackground = () => {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // 创建3D场景
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0.3); // 半透明黑色背景

        camera.position.z = 400;

        // 创建波纹几何体
        const createRipple = (x, y) => {
            const geometry = new THREE.RingGeometry(10, 300, 32);
            const material = new THREE.MeshBasicMaterial({
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.3,
                side: THREE.DoubleSide
            });

            const ripple = new THREE.Mesh(geometry, material);
            ripple.position.set(x, y, 0);
            ripple.userData = {
                startTime: Date.now(),
                initialScale: 0.1,
                targetScale: 2,
                duration: 3000
            };

            scene.add(ripple);
            return ripple;
        };

        // 创建多个波纹
        const ripples = [];
        for (let i = 0; i < 5; i++) {
            const x = (Math.random() - 0.5) * 800;
            const y = (Math.random() - 0.5) * 600;
            ripples.push(createRipple(x, y));
        }

        // 动画循环
        const animate = () => {
            const currentTime = Date.now();

            ripples.forEach((ripple) => {
                const elapsed = currentTime - ripple.userData.startTime;
                const progress = elapsed / ripple.userData.duration;

                if (progress < 1) {
                    // 缩放动画
                    const scale = ripple.userData.initialScale +
                        (ripple.userData.targetScale - ripple.userData.initialScale) * progress;
                    ripple.scale.set(scale, scale, 1);

                    // 透明度动画
                    ripple.material.opacity = 0.3 * (1 - progress);
                } else {
                    // 重置波纹
                    ripple.userData.startTime = currentTime;
                    ripple.scale.set(0.1, 0.1, 1);

                    // 随机新位置
                    ripple.position.x = (Math.random() - 0.5) * 800;
                    ripple.position.y = (Math.random() - 0.5) * 600;
                }

                // 添加旋转
                ripple.rotation.z += 0.01;
            });

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // 处理窗口大小变化
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        sceneRef.current = { scene, camera, renderer, ripples };

        // 清理函数
        return () => {
            window.removeEventListener('resize', handleResize);
            if (sceneRef.current) {
                const { scene, renderer } = sceneRef.current;
                scene.clear();
                renderer.dispose();
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

// 错误边界UI组件
const ErrorBoundaryUI = ({ error, resetError, hasError }) => {
    const { language, getNewContent } = useAppStore();
    const [showDetails, setShowDetails] = React.useState(false);

    if (!hasError) return null;

    const content = getNewContent();
    const contactEmail = content?.contact?.emailAddress || 'aemooooon@gmail.com';

    const handleReportError = () => {
        const errorInfo = {
            message: error?.message || 'Unknown error',
            stack: error?.stack || 'No stack trace available',
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            language: language
        };

        const subject = encodeURIComponent(`Error Report from ${window.location.hostname}`);
        const body = encodeURIComponent(`
Error Details:
- Message: ${errorInfo.message}
- Timestamp: ${errorInfo.timestamp}
- URL: ${errorInfo.url}
- Language: ${errorInfo.language}
- User Agent: ${errorInfo.userAgent}

Stack Trace:
${errorInfo.stack}

Please describe what you were doing when this error occurred:
[Please describe your actions here]
        `);

        window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`);
    };

    const texts = {
        en: {
            title: 'Oops! Something went wrong',
            subtitle: 'We encountered an unexpected error. Don\'t worry, we\'re here to help!',
            refresh: 'Refresh Page',
            report: 'Report Error',
            details: 'Error Details',
            showDetails: 'Show Details',
            hideDetails: 'Hide Details'
        },
        zh: {
            title: '哎呀！出了点问题',
            subtitle: '我们遇到了一个意外错误。别担心，我们会帮您解决！',
            refresh: '刷新页面',
            report: '报告错误',
            details: '错误详情',
            showDetails: '显示详情',
            hideDetails: '隐藏详情'
        }
    };

    const t = texts[language] || texts.en;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            {/* 3D波纹背景效果 */}
            <ErrorBoundaryBackground />

            <div className="glass-card max-w-md w-full p-8 text-center relative" style={{ zIndex: 10 }}>
                {/* 错误图标 */}
                <div className="mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-3xl shadow-lg animate-pulse">
                    ⚠️
                </div>

                {/* 标题 */}
                <h2 className="text-2xl font-bold text-white mb-3">
                    {t.title}
                </h2>

                {/* 副标题 */}
                <p className="text-gray-300 mb-8 leading-relaxed">
                    {t.subtitle}
                </p>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <button
                        onClick={resetError}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        🔄 {t.refresh}
                    </button>

                    <button
                        onClick={handleReportError}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        📧 {t.report}
                    </button>
                </div>

                {/* 错误详情切换 */}
                {import.meta.env.DEV && (
                    <div className="border-t border-white/20 pt-6">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                        >
                            {showDetails ? '📄' : '📋'} {showDetails ? t.hideDetails : t.showDetails}
                        </button>

                        {showDetails && (
                            <div className="mt-4 p-4 bg-black/30 rounded-lg text-left">
                                <div className="text-xs text-gray-300 space-y-2">
                                    <div><strong className="text-white">Message:</strong> {error?.message}</div>
                                    {error?.stack && (
                                        <details className="mt-3">
                                            <summary className="cursor-pointer text-blue-400 hover:text-blue-300">
                                                Stack Trace
                                            </summary>
                                            <pre className="mt-2 text-xs overflow-auto max-h-32 bg-black/40 p-3 rounded border border-gray-600">
                                                {error.stack}
                                            </pre>
                                        </details>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

ErrorBoundaryUI.propTypes = {
    error: PropTypes.object,
    resetError: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired
};

// 错误边界类组件
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorBoundaryUI
                    error={this.state.error}
                    resetError={this.resetError}
                    hasError={this.state.hasError}
                />
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;
