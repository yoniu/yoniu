/**
 * 合并类名
 * @param {...string} classes 类名
 * @returns {string} 合并后的类名
 */
export default function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
