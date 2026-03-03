/**
 * LocalStorage 持久化工具
 * 管理学习进度和用户设置的存储/读取
 */

const STORAGE_KEYS = {
  POEM_STATUS: 'moyu_poem_status',
  SETTINGS: 'moyu_settings',
};

// 默认设置
const DEFAULT_SETTINGS = {
  speed: 1.0,
  pauseDuration: 3,
  enableEncouragement: true,
};

/**
 * 获取所有诗词的学习状态
 * @returns {Object} { poemId: status }
 */
export function loadPoemStatuses() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POEM_STATUS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * 保存单首诗的学习状态
 */
export function savePoemStatus(poemId, status) {
  const statuses = loadPoemStatuses();
  statuses[poemId] = status;
  try {
    localStorage.setItem(STORAGE_KEYS.POEM_STATUS, JSON.stringify(statuses));
  } catch (e) {
    console.warn('保存学习状态失败:', e);
  }
}

/**
 * 获取用户设置
 */
export function loadSettings() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * 保存用户设置
 */
export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('保存设置失败:', e);
  }
}
