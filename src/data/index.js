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

// 重新导出工具函数
export { getPoemBgImage, BG_IMAGES } from './bg-images.js';
export { rubyLine } from './pinyin-utils.js';
