/**
 * 格式化内容
 * @param {string} content 内容
 * @returns {string} 格式化后的内容
 */
export default function formatContent(content) {
  // 清除html 标签
  let text = content.replace(/<[^>]*>?/g, '');
  // 去除换行符
  text = text.replace(/\n/g, '');
  // 截取前 100 个字符
  text = text.slice(0, 100);
  return text;
}
