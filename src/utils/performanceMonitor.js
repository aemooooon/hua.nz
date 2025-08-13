import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * Web Vitals 性能监控工具
 * 用于监控和优化 Core Web Vitals 指标
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.isEnabled = import.meta.env.DEV;
        this.init();
    }

    init() {
        if (!this.isEnabled) return;

        // 监控 CLS (Cumulative Layout Shift)
        getCLS((metric) => {
            this.metrics.CLS = metric.value;
            this.logMetric('CLS', metric);
            
            // CLS 警告阈值
            if (metric.value > 0.1) {
                console.warn(`⚠️ CLS 指标较高: ${metric.value.toFixed(4)} (建议 ≤ 0.1)`);
                this.suggestCLSOptimizations();
            }
        });

        // 监控 LCP (Largest Contentful Paint)
        getLCP((metric) => {
            this.metrics.LCP = metric.value;
            this.logMetric('LCP', metric);
        });

        // 监控 FID (First Input Delay)
        getFID((metric) => {
            this.metrics.FID = metric.value;
            this.logMetric('FID', metric);
        });

        // 监控 FCP (First Contentful Paint)
        getFCP((metric) => {
            this.metrics.FCP = metric.value;
            this.logMetric('FCP', metric);
        });

        // 监控 TTFB (Time to First Byte)
        getTTFB((metric) => {
            this.metrics.TTFB = metric.value;
            this.logMetric('TTFB', metric);
        });

        // 页面卸载时发送数据
        window.addEventListener('beforeunload', () => {
            this.sendMetrics();
        });
    }

    logMetric(name, metric) {
        const value = metric.value;
        const rating = metric.rating;
        
        let color = 'green';
        let emoji = '✅';
        
        if (rating === 'needs-improvement') {
            color = 'orange';
            emoji = '⚠️';
        } else if (rating === 'poor') {
            color = 'red';
            emoji = '❌';
        }

        console.log(
            `%c${emoji} ${name}: ${name === 'CLS' ? value.toFixed(4) : Math.round(value)}${name === 'CLS' ? '' : 'ms'} (${rating})`,
            `color: ${color}; font-weight: bold;`
        );
    }

    suggestCLSOptimizations() {
        console.group('🔧 CLS 优化建议:');
        console.log('1. 检查 hover 效果是否使用了 3D 变换 (translate3d, scale3d)');
        console.log('2. 确保元素设置了 contain: layout style paint');
        console.log('3. 为变换元素预留足够的空间');
        console.log('4. 使用 transform-origin: center center');
        console.log('5. 避免在文档流中的元素上使用 translateY/translateX');
        console.groupEnd();
    }

    // 发送指标到分析服务（示例）
    sendMetrics() {
        if (Object.keys(this.metrics).length === 0) return;

        // 这里可以集成你的分析服务，如 Google Analytics
        console.log('📊 性能指标汇总:', this.metrics);
        
        // 示例：发送到 Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     Object.entries(this.metrics).forEach(([name, value]) => {
        //         gtag('event', 'performance_metric', {
        //             metric_name: name,
        //             metric_value: Math.round(value),
        //             custom_map: { metric_rating: this.getRating(name, value) }
        //         });
        //     });
        // }
    }

    getRating(metricName, value) {
        const thresholds = {
            CLS: { good: 0.1, poor: 0.25 },
            LCP: { good: 2500, poor: 4000 },
            FID: { good: 100, poor: 300 },
            FCP: { good: 1800, poor: 3000 },
            TTFB: { good: 800, poor: 1800 }
        };

        const threshold = thresholds[metricName];
        if (!threshold) return 'unknown';

        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    }

    // 手动获取当前指标
    getCurrentMetrics() {
        return { ...this.metrics };
    }

    // 生成性能报告
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            metrics: this.getCurrentMetrics(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null
        };

        console.log('📋 性能报告:', report);
        return report;
    }
}

// 导出单例实例
export const performanceMonitor = new PerformanceMonitor();

// 为开发者提供全局访问
if (typeof window !== 'undefined' && import.meta.env.DEV) {
    window.performanceMonitor = performanceMonitor;
}

export default performanceMonitor;
