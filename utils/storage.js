/**
 * LocalStorage 持久化工具
 * 管理学习进度和用户设置的存储/读取
 *
 * 学习状态数据格式（v2）：
 * {
 *   poemId: {
 *     status: 'MASTERED',          // 学习状态枚举
 *     lastReviewedAt: 1710000000,  // 上次复习时间戳
 *     reviewCount: 5,              // 复习次数
 *     masteryScore: 85,            // 掌握度 0-100
 *     firstLearnedAt: 1709500000,  // 首次学习时间
 *   }
 * }
 *
 * 向下兼容 v1 格式：{ poemId: 'MASTERED' }
 */

const STORAGE_KEYS = {
  POEM_STATUS: 'moyu_poem_status',
  SETTINGS: 'moyu_settings',
  LAST_VIEWED: 'moyu_last_viewed',
};

// 默认设置
const DEFAULT_SETTINGS = {
  speed: 1.0,
  pauseDuration: 3,
  enableEncouragement: true,
};

/**
 * 迁移旧格式状态数据（v1 → v2）
 * v1: { poemId: 'MASTERED' }
 * v2: { poemId: { status: 'MASTERED', ... } }
 */
function migrateStatus(value) {
  if (typeof value === 'string') {
    // v1 格式：纯字符串状态
    return {
      status: value,
      lastReviewedAt: Date.now(),
      reviewCount: 1,
      masteryScore: value === 'MASTERED' ? 100 : value === 'PARTIAL' ? 50 : 30,
      firstLearnedAt: Date.now(),
    };
  }
  // v2 格式：已经是对象
  return value;
}

/**
 * 获取所有诗词的学习状态（自动迁移旧格式）
 * @returns {Object} { poemId: { status, lastReviewedAt, ... } }
 */
export function loadPoemStatuses() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POEM_STATUS);
    if (!data) return {};

    const raw = JSON.parse(data);
    const result = {};
    let needsMigration = false;

    for (const [id, value] of Object.entries(raw)) {
      if (typeof value === 'string') {
        needsMigration = true;
      }
      result[id] = migrateStatus(value);
    }

    // 如果有旧格式数据，自动保存迁移后的版本
    if (needsMigration) {
      localStorage.setItem(STORAGE_KEYS.POEM_STATUS, JSON.stringify(result));
    }

    return result;
  } catch {
    return {};
  }
}

/**
 * 获取单首诗的学习状态字符串（兼容旧调用方式）
 * @returns {string} status 枚举值
 */
export function getPoemStatusValue(poemId) {
  const statuses = loadPoemStatuses();
  const entry = statuses[poemId];
  if (!entry) return 'UNLEARNED';
  return typeof entry === 'string' ? entry : entry.status;
}

/**
 * 获取单首诗的完整学习记录
 * @returns {Object|null} 学习记录对象
 */
export function getPoemLearningRecord(poemId) {
  const statuses = loadPoemStatuses();
  return statuses[poemId] || null;
}

/**
 * 保存单首诗的学习状态（写入完整记录）
 */
export function savePoemStatus(poemId, status) {
  const statuses = loadPoemStatuses();
  const existing = statuses[poemId];
  const now = Date.now();

  // 构建新的学习记录
  statuses[poemId] = {
    status: typeof status === 'string' ? status : status.status,
    lastReviewedAt: now,
    reviewCount: (existing?.reviewCount || 0) + 1,
    masteryScore: status === 'MASTERED' ? 100
                : status === 'PARTIAL' ? 50
                : status === 'REVIEW' ? 30
                : 0,
    firstLearnedAt: existing?.firstLearnedAt || now,
  };

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

/**
 * 保存最后查看的诗词 ID
 */
export function saveLastViewed(poemId) {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_VIEWED, String(poemId));
  } catch (e) {}
}

/**
 * 读取最后查看的诗词 ID
 */
export function loadLastViewed() {
  try {
    const id = localStorage.getItem(STORAGE_KEYS.LAST_VIEWED);
    return id ? parseInt(id, 10) : null;
  } catch {
    return null;
  }
}

/**
 * 获取需要复习的诗词 ID 列表
 * 规则：已学诗词中，距上次复习超过 intervalDays 天的
 * @param {number} intervalDays - 复习间隔天数（默认 3 天）
 * @returns {number[]} 需要复习的诗词 ID 列表
 */
export function getReviewDuePoems(intervalDays = 3) {
  const statuses = loadPoemStatuses();
  const now = Date.now();
  const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
  const dueIds = [];

  for (const [id, record] of Object.entries(statuses)) {
    if (!record || record.status === 'UNLEARNED') continue;
    const lastReview = record.lastReviewedAt || 0;
    if (now - lastReview > intervalMs) {
      dueIds.push(parseInt(id, 10));
    }
  }

  return dueIds;
}
