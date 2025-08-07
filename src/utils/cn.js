/**
 * 类名合并工具函数
 * 简化版的 clsx/classnames 替代品
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}
