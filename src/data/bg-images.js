/**
 * 背景图路径映射
 * 12 种水墨画主题对应的图片路径
 */

// 使用 Vite 的 BASE_URL 确保路径在不同部署环境下都正确
const BASE = import.meta.env?.BASE_URL || '/';

export const BG_IMAGES = {
  spring: `${BASE}bg/spring.png`,      // 春景：桃花柳树、春风
  summer: `${BASE}bg/summer.png`,      // 夏景：荷花池塘
  autumn: `${BASE}bg/autumn.png`,      // 秋景：枫叶、秋风
  winter: `${BASE}bg/winter.png`,      // 冬景：雪景、寒江
  mountains: `${BASE}bg/mountains.png`, // 山水：高山瀑布、江河
  pastoral: `${BASE}bg/pastoral.png`,  // 田园：农村、田野
  moonlight: `${BASE}bg/moonlight.png`, // 月夜：明月、夜空
  farewell: `${BASE}bg/farewell.png`,  // 送别：离别、舟行
  frontier: `${BASE}bg/frontier.png`,  // 边塞：大漠、关城
  birds: `${BASE}bg/birds.png`,        // 花鸟：花开鸟鸣
  grassland: `${BASE}bg/grassland.png`, // 草原：野草、牧童
  study: `${BASE}bg/study.png`,        // 书房：笔墨纸砚
};

/**
 * 获取指定诗词的背景图路径
 * @param {Object} poem - 包含 background 字段的诗词对象
 * @returns {string} 背景图路径
 */
export function getPoemBgImage(poem) {
  const theme = poem?.background || 'study';
  return BG_IMAGES[theme] || BG_IMAGES.study;
}
