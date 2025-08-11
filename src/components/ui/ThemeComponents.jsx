import { cn } from '../../utils/cn';

/**
 * 主题化标题组件
 */
export const ThemeTitle = ({ children, className, level = 1, ...props }) => {
  const baseClasses = "text-theme-text-primary transition-colors duration-300";
  const levelClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-semibold", 
    3: "text-2xl font-medium",
    4: "text-xl font-medium",
    5: "text-lg font-medium",
    6: "text-base font-medium"
  };

  const Tag = `h${level}`;
  
  return (
    <Tag 
      className={cn(baseClasses, levelClasses[level], className)} 
      {...props}
    >
      {children}
    </Tag>
  );
};

/**
 * 主题化副标题组件
 */
export const ThemeSubtitle = ({ children, className, ...props }) => {
  return (
    <p 
      className={cn(
        "text-theme-text-secondary text-lg transition-colors duration-300",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
};

/**
 * 主题化描述文本组件
 */
export const ThemeDescription = ({ children, className, ...props }) => {
  return (
    <p 
      className={cn(
        "text-theme-text-muted transition-colors duration-300",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  );
};

/**
 * 主题化卡片组件
 */
export const ThemeCard = ({ children, className, hover = true, ...props }) => {
  const baseClasses = "theme-card p-4";
  const hoverClasses = hover ? "hover:transform hover:scale-105" : "";
  
  return (
    <div 
      className={cn(baseClasses, hoverClasses, className)} 
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * 主题化按钮组件
 */
export const ThemeButton = ({ children, className, variant = "primary", size = "md", ...props }) => {
  const baseClasses = "theme-button font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary/50 backdrop-blur-sm";
  
  const variantClasses = {
    primary: "bg-theme-button-primary text-white hover:bg-theme-button-hover border border-theme-primary/30",
    secondary: "bg-theme-surface border border-theme-border text-theme-text-primary hover:bg-theme-surface-elevated",
    outline: "border-2 border-theme-button-border text-theme-text-primary hover:bg-theme-button-hover bg-theme-button",
    ghost: "text-theme-primary hover:bg-theme-button-hover bg-transparent"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base", 
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button 
      className={cn(
        baseClasses, 
        variantClasses[variant], 
        sizeClasses[size], 
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * 主题化图标组件
 */
export const ThemeIcon = ({ children, className, ...props }) => {
  return (
    <span 
      className={cn(
        "theme-icon inline-flex items-center justify-center",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
};

/**
 * 主题化分割线组件
 */
export const ThemeDivider = ({ className, vertical = false, ...props }) => {
  const baseClasses = "theme-divider";
  const orientationClasses = vertical ? "w-px h-full" : "h-px w-full";
  
  return (
    <div 
      className={cn(baseClasses, orientationClasses, className)} 
      {...props} 
    />
  );
};

/**
 * 数字显示组件（使用格鲁吉亚字体）
 */
export const ThemeNumber = ({ children, className, ...props }) => {
  return (
    <span 
      className={cn(
        "numeric font-georgia text-theme-text-primary transition-colors duration-300",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  );
};
