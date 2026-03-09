/**
 * Toast 全局提示组件
 * 短暂显示消息再自动隐藏
 */

/**
 * 显示 Toast 提示
 * @param {string} message - 提示信息
 */
export function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.classList.add('hidden');
  }, 1800);
}
