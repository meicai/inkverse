/**
 * 诗词数据统一入口
 * 合并所有年级数据，导出 allPoems 和相关常量
 */
import { preschoolPoems } from './preschool.js';
import { grade1Poems } from './grade1.js';
import { grade2Poems } from './grade2.js';
import { grade3Poems } from './grade3.js';
import { grade4Poems } from './grade4.js';
import { grade5Poems } from './grade5.js';
import { grade6Poems } from './grade6.js';

// 学习状态枚举
export const Status = {
  UNLEARNED: 'UNLEARNED',
  PARTIAL: 'PARTIAL',
  REVIEW: 'REVIEW',
  MASTERED: 'MASTERED',
};

// 年级标签映射
export const GradeLabels = {
  ALL: '全部',
  PRESCHOOL: '学前',
  GRADE_1: '一年级',
  GRADE_2: '二年级',
  GRADE_3: '三年级',
  GRADE_4: '四年级',
  GRADE_5: '五年级',
  GRADE_6: '六年级',
};

// 状态标签映射
export const StatusLabels = {
  ALL: '全部',
  UNLEARNED: '未背',
  PARTIAL: '一半',
  REVIEW: '再练',
  MASTERED: '已记',
};

// 导出全部诗词
export const allPoems = [
  ...preschoolPoems,
  ...grade1Poems,
  ...grade2Poems,
  ...grade3Poems,
  ...grade4Poems,
  ...grade5Poems,
  ...grade6Poems,
];

// 专题/节气推荐集列表
export const THEMES = [
  {
    id: 'theme_spring',
    title: '春意盎然',
    desc: '正是江南好风景，落花时节又逢君。',
    cover: 'spring', 
    tags: ['春景']
  },
  {
    id: 'theme_moon',
    title: '明月清辉',
    desc: '举杯邀明月，对影成三人。',
    cover: 'moon',
    tags: ['月', '秋思']
  },
  {
    id: 'theme_frontier',
    title: '大漠孤烟',
    desc: '黄沙百战穿金甲，不破楼兰终不还。',
    cover: 'frontier',
    tags: ['边塞', '爱国']
  },
  {
    id: 'theme_pastoral',
    title: '田园风光',
    desc: '采菊东篱下，悠然见南山。',
    cover: 'village',
    tags: ['田园', '自然', '隐逸']
  }
];

/**
 * 随机或者按具体日期获取一个推荐专题
 */
export function getRecommendedTheme() {
  // 当前简单实现：每次进入随机推一个，或者按月份计算
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return THEMES[0]; // 春天放“春意盎然”
  return THEMES[Math.floor(Math.random() * THEMES.length)];
}

// 重新导出工具函数
export { getPoemBgImage, BG_IMAGES } from './bg-images.js';
export { rubyLine } from './pinyin-utils.js';
