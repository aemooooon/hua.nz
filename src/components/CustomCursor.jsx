import { useEffect, useState, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';

const CustomCursor = () => {
    const [cursorType, setCursorType] = useState('default');
    const [isVisible, setIsVisible] = useState(false);
    
    const { currentSection, getCurrentSection } = useAppStore();
    const currentSectionConfig = getCurrentSection();

    // 创建自定义cursor canvas
    const createCursorCanvas = (type, color = '#afcc8f', animationFrame = 0) => {
        const canvas = document.createElement('canvas');
        const size = 32;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, size, size);
        
        switch (type) {
            case 'cube':
                // 绘制旋转的小立方体
                ctx.save();
                ctx.translate(size / 2, size / 2);
                ctx.rotate(animationFrame * 0.1); // 缓慢旋转
                
                // 立方体的三个面
                ctx.fillStyle = color;
                ctx.fillRect(-6, -6, 12, 12); // 正面
                
                ctx.fillStyle = `${color}cc`;
                ctx.beginPath();
                ctx.moveTo(6, -6);
                ctx.lineTo(12, -12);
                ctx.lineTo(12, 0);
                ctx.lineTo(6, 6);
                ctx.closePath();
                ctx.fill(); // 右面
                
                ctx.fillStyle = `${color}88`;
                ctx.beginPath();
                ctx.moveTo(-6, -6);
                ctx.lineTo(0, -12);
                ctx.lineTo(12, -12);
                ctx.lineTo(6, -6);
                ctx.closePath();
                ctx.fill(); // 顶面
                
                // 边框
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.strokeRect(-6, -6, 12, 12);
                ctx.restore();
                break;
                
            case 'galaxy': {
                // 绘制动态星系效果
                ctx.save();
                ctx.translate(size / 2, size / 2);
                ctx.rotate(animationFrame * 0.05); // 缓慢旋转
                
                // 中心亮点
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 12);
                gradient.addColorStop(0, color);
                gradient.addColorStop(0.5, `${color}66`);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(-12, -12, 24, 24);
                
                // 旋转的星点
                for (let i = 0; i < 12; i++) {
                    const angle = (i / 12) * Math.PI * 2 + animationFrame * 0.03;
                    const distance = 6 + Math.sin(animationFrame * 0.1 + i) * 2;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    
                    const alpha = Math.floor((Math.sin(animationFrame * 0.1 + i) + 1) * 127);
                    ctx.fillStyle = `${color}${alpha.toString(16).padStart(2, '0')}`;
                    ctx.beginPath();
                    ctx.arc(x, y, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
                break;
            }
                
            case 'arrow': {
                // 绘制脉冲箭头
                ctx.save();
                ctx.translate(size / 2, size / 2);
                const scale = 1 + Math.sin(animationFrame * 0.2) * 0.1;
                ctx.scale(scale, scale);
                
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(-8, -4);
                ctx.lineTo(4, -4);
                ctx.lineTo(4, -8);
                ctx.lineTo(12, 0);
                ctx.lineTo(4, 8);
                ctx.lineTo(4, 4);
                ctx.lineTo(-8, 4);
                ctx.closePath();
                ctx.fill();
                
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
                break;
            }
                
            case 'drag': {
                // 绘制动态拖拽手势
                ctx.save();
                ctx.translate(size / 2, size / 2);
                
                // 四个方向的箭头，带动画效果
                for (let i = 0; i < 4; i++) {
                    ctx.save();
                    ctx.rotate((i * Math.PI) / 2);
                    const offset = Math.sin(animationFrame * 0.3 + i) * 2;
                    ctx.translate(0, offset);
                    
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(0, -10);
                    ctx.lineTo(-3, -7);
                    ctx.lineTo(-1, -7);
                    ctx.lineTo(-1, -3);
                    ctx.lineTo(1, -3);
                    ctx.lineTo(1, -7);
                    ctx.lineTo(3, -7);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
                
                // 脉冲中心圆点
                const centerScale = 1 + Math.sin(animationFrame * 0.4) * 0.3;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(0, 0, 2 * centerScale, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                break;
            }
                
            case 'portal':
                // 绘制传送门效果
                ctx.save();
                ctx.translate(size / 2, size / 2);
                
                // 多层旋转环
                for (let ring = 0; ring < 3; ring++) {
                    const radius = 4 + ring * 3;
                    const segments = 8 + ring * 4;
                    const rotation = animationFrame * (0.1 + ring * 0.05) * (ring % 2 === 0 ? 1 : -1);
                    
                    for (let i = 0; i < segments; i++) {
                        const angle = (i / segments) * Math.PI * 2 + rotation;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        
                        const alpha = Math.floor(((Math.sin(animationFrame * 0.2 + i + ring) + 1) / 2) * 255);
                        ctx.fillStyle = `${color}${alpha.toString(16).padStart(2, '0')}`;
                        ctx.beginPath();
                        ctx.arc(x, y, 1, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
                ctx.restore();
                break;
                
            default: {
                // 默认脉冲圆形cursor
                ctx.save();
                ctx.translate(size / 2, size / 2);
                const pulseScale = 1 + Math.sin(animationFrame * 0.15) * 0.2;
                const defaultGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 8 * pulseScale);
                defaultGradient.addColorStop(0, color);
                defaultGradient.addColorStop(1, 'transparent');
                ctx.fillStyle = defaultGradient;
                ctx.beginPath();
                ctx.arc(0, 0, 8 * pulseScale, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
                break;
            }
        }
        
        return `url(${canvas.toDataURL()}) ${size/2} ${size/2}, auto`;
    };

    // 更新cursor样式
    const updateCursor = useCallback((type, force = false) => {
        if (type !== cursorType || force) {
            setCursorType(type);
        }
    }, [cursorType]);

    // 鼠标移动处理
    useEffect(() => {
        const handleMouseMove = (e) => {
            setIsVisible(true);
            
            // 根据元素类型决定cursor样式
            const target = e.target;
            const isOnCube = target.tagName === 'CANVAS' && target.parentElement?.querySelector('canvas');
            const isOnButton = target.tagName === 'BUTTON' || target.closest('button');
            const isOnNavigation = target.closest('[class*="navigation"]') || target.closest('[class*="indicator"]');
            const isOnProject = target.closest('[class*="project"]') || target.closest('[class*="card"]');
            
            if (isOnCube) {
                updateCursor('drag');
            } else if (isOnButton || isOnNavigation) {
                updateCursor('arrow');
            } else if (isOnProject) {
                updateCursor('portal');
            } else if (currentSectionConfig?.id === 'home') {
                updateCursor('galaxy');
            } else {
                updateCursor('cube');
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
            document.body.style.cursor = 'auto';
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.body.style.cursor = 'auto';
        };
    }, [updateCursor, currentSectionConfig]);

    // 根据当前页面更新cursor
    useEffect(() => {
        if (currentSectionConfig?.id === 'home') {
            updateCursor('galaxy');
        } else {
            updateCursor('cube');
        }
    }, [currentSection, currentSectionConfig, updateCursor]);

    // 动画循环 - 让cursor有动态效果
    useEffect(() => {
        let animationFrame = 0;
        let animationId;
        
        const animate = () => {
            const color = currentSectionConfig?.color || '#afcc8f';
            const cursorStyle = createCursorCanvas(cursorType, color, animationFrame);
            document.body.style.cursor = cursorStyle;
            
            animationFrame += 1;
            animationId = requestAnimationFrame(animate);
        };
        
        if (isVisible) {
            animationId = requestAnimationFrame(animate);
        }

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [cursorType, currentSectionConfig, isVisible]);

    return null; // 这个组件不需要渲染任何DOM
};

export default CustomCursor;
