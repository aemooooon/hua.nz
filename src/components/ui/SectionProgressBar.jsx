import { useAppStore } from '../../store/useAppStore';

/**
 * SectionProgressBar - section浏览进度条
 * 
 * 功能特性：
 * - 基于当前section显示进度百分比
 * - home: 0% (不显示), about: 33.33%, projects: 50%, gallery: 66.67%, education: 83.33%, contact: 100%
 * - 6px高度，背景白色透明，进度部分使用主题色
 * - 首页全透明，其他section显示对应进度
 */
const SectionProgressBar = () => {
    const { currentSection } = useAppStore();
    
    // 计算当前section的进度百分比
    const getProgress = () => {
        // currentSection是索引值 (0-5)
        // 特殊处理：首页不显示进度，其他页面按实际进度显示
        if (currentSection === 0) return 0; // 首页0%，不显示进度
        
        // 其他section重新映射：about=1/3, projects=2/4, gallery=3/5, education=4/5, contact=5/5=100%
        // about(1): 33.33%, projects(2): 50%, gallery(3): 66.67%, education(4): 83.33%, contact(5): 100%
        return (currentSection / 5) * 100;
    };
    
    const progress = getProgress();
    
    return (
        <div className="fixed top-0 left-0 right-0 z-40 h-[6px]">
            {/* 进度条背景 - 首页全透明，其他section白色透明 */}
            <div className={`w-full h-full transition-opacity duration-300 ${
                currentSection === 0 ? 'bg-transparent' : 'bg-white/20'
            }`}>
                {/* 进度条填充 - 使用主题色 */}
                <div 
                    className="h-full transition-all duration-700 ease-out"
                    style={{ 
                        width: `${progress}%`,
                        backgroundColor: 'var(--theme-primary)'
                    }}
                />
            </div>
        </div>
    );
};

export default SectionProgressBar;
