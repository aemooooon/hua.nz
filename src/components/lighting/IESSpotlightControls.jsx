/**
 * IES Spotlight Controls
 * 用于调试和控制IES聚光灯系统的简单面板
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './IESSpotlightControls.css';

const IESSpotlightControls = ({ iesSpotlightSystem }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [config, setConfig] = useState({
        intensity: 600,
        animationSpeed: 0.3,
        enableAnimation: true,
        showHelpers: false
    });

    // 同步状态
    useEffect(() => {
        if (iesSpotlightSystem && iesSpotlightSystem.getStatus) {
            const status = iesSpotlightSystem.getStatus();
            setConfig(prev => ({
                ...prev,
                ...status
            }));
        }
    }, [iesSpotlightSystem]);

    // 处理强度变化
    const handleIntensityChange = (value) => {
        const intensity = parseFloat(value);
        setConfig(prev => ({ ...prev, intensity }));
        if (iesSpotlightSystem) {
            iesSpotlightSystem.setIntensity(intensity);
        }
    };

    // 处理动画速度变化
    const handleAnimationSpeedChange = (value) => {
        const speed = parseFloat(value);
        setConfig(prev => ({ ...prev, animationSpeed: speed }));
        if (iesSpotlightSystem) {
            iesSpotlightSystem.setAnimationSpeed(speed);
        }
    };

    // 切换动画
    const toggleAnimation = () => {
        setConfig(prev => ({ ...prev, enableAnimation: !prev.enableAnimation }));
        if (iesSpotlightSystem) {
            iesSpotlightSystem.toggleAnimation();
        }
    };

    // 切换辅助线
    const toggleHelpers = () => {
        setConfig(prev => ({ ...prev, showHelpers: !prev.showHelpers }));
        if (iesSpotlightSystem) {
            iesSpotlightSystem.toggleHelpers();
        }
    };

    if (!iesSpotlightSystem) {
        return null;
    }

    return (
        <div className="ies-spotlight-controls">
            <button 
                className="toggle-btn"
                onClick={() => setIsVisible(!isVisible)}
                title="IES聚光灯控制"
            >
                💡
            </button>
            
            {isVisible && (
                <div className="controls-panel">
                    <h3>IES聚光灯控制</h3>
                    
                    <div className="control-group">
                        <label>强度: {config.intensity}</label>
                        <input
                            type="range"
                            min="0"
                            max="1200"
                            step="50"
                            value={config.intensity}
                            onChange={(e) => handleIntensityChange(e.target.value)}
                        />
                    </div>
                    
                    <div className="control-group">
                        <label>动画速度: {config.animationSpeed.toFixed(1)}</label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={config.animationSpeed}
                            onChange={(e) => handleAnimationSpeedChange(e.target.value)}
                        />
                    </div>
                    
                    <div className="control-group">
                        <button
                            className={`toggle-button ${config.enableAnimation ? 'active' : ''}`}
                            onClick={toggleAnimation}
                        >
                            {config.enableAnimation ? '停止动画' : '启动动画'}
                        </button>
                    </div>
                    
                    <div className="control-group">
                        <button
                            className={`toggle-button ${config.showHelpers ? 'active' : ''}`}
                            onClick={toggleHelpers}
                        >
                            {config.showHelpers ? '隐藏辅助线' : '显示辅助线'}
                        </button>
                    </div>
                    
                    <div className="status-info">
                        <small>
                            聚光灯数量: {config.lightCount || 4}<br/>
                            状态: {config.enableAnimation ? '动画中' : '静态'}
                        </small>
                    </div>
                </div>
            )}
        </div>
    );
};

IESSpotlightControls.propTypes = {
    iesSpotlightSystem: PropTypes.object
};

export default IESSpotlightControls;
