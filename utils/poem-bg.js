/**
 * 古诗背景图映射
 * 根据每首诗的意境/主题，映射到对应的水墨画背景图
 */

// 12 张主题水墨画背景图
const BG_IMAGES = {
  spring: '/bg/spring.png',      // 春景：桃花柳树、春风
  summer: '/bg/summer.png',      // 夏景：荷花池塘
  autumn: '/bg/autumn.png',      // 秋景：枫叶、秋风
  winter: '/bg/winter.png',      // 冬景：雪景、寒江
  mountains: '/bg/mountains.png', // 山水：高山瀑布、江河
  pastoral: '/bg/pastoral.png',  // 田园：农村、田野
  moonlight: '/bg/moonlight.png', // 月夜：明月、夜空
  farewell: '/bg/farewell.png',  // 送别：离别、舟行
  frontier: '/bg/frontier.png',  // 边塞：大漠、关城
  birds: '/bg/birds.png',        // 花鸟：花开鸟鸣
  grassland: '/bg/grassland.png', // 草原：野草、牧童
  study: '/bg/study.png',        // 书房：笔墨纸砚
};

/**
 * 每首古诗的背景图映射
 * key = poem.id, value = 背景图主题
 */
const POEM_BG_MAP = {
  // === 学前 ===
  1: 'grassland',    // 草 - 离离原上草
  2: 'spring',       // 春晓 - 春眠不觉晓
  3: 'autumn',       // 乐游原 - 夕阳无限好
  4: 'mountains',    // 独坐敬亭山 - 众鸟高飞尽
  5: 'pastoral',     // 悯农二首 - 春种一粒粟
  6: 'summer',       // 池上 - 小娃撑小艇
  7: 'spring',       // 题都城南庄 - 人面桃花
  8: 'frontier',     // 从军行 - 黄沙百战
  9: 'study',        // 墨梅 - 吾家洗砚池
  10: 'spring',      // 咏柳 - 碧玉妆成一树高
  11: 'autumn',      // 风 - 解落三秋叶
  12: 'mountains',   // 夜宿山寺 - 危楼高百尺
  13: 'spring',      // 绝句二首 - 泥融飞燕子
  14: 'mountains',   // 寻隐者不遇 - 云深不知处
  15: 'birds',       // 辛夷坞 - 木末芙蓉花
  16: 'moonlight',   // 古别离 - 暂借明月光
  17: 'study',       // 游子吟 - 慈母手中线
  18: 'spring',      // 柳溪 - 十里柳花香
  19: 'birds',       // 画鸡 - 头上红冠不用裁
  20: 'moonlight',   // 古朗月行 - 小时不识月
  21: 'farewell',    // 劳劳亭 - 送客亭
  22: 'birds',       // 五岁吟花 - 花开满树红
  23: 'spring',      // 泊船瓜洲 - 春风又绿江南岸
  24: 'mountains',   // 登幽州台歌 - 念天地之悠悠
  25: 'moonlight',   // 中秋夜 - 圆魄上寒空
  26: 'moonlight',   // 月下独酌 - 举杯邀明月
  27: 'spring',      // 惠崇春江晚景 - 竹外桃花
  28: 'spring',      // 滁州西涧 - 春潮带雨
  29: 'frontier',    // 凉州词 - 黄河远上白云间
  30: 'birds',       // 花非花 - 花非花雾非雾
  31: 'mountains',   // 登鹳雀楼 - 白日依山尽
  32: 'study',       // 弟子规 - 弟子规圣人训

  // === 一年级 ===
  101: 'summer',     // 咏鹅 - 白毛浮绿水
  102: 'moonlight',  // 静夜思 - 床前明月光
  103: 'spring',     // 春晓 - 春眠不觉晓
  104: 'spring',     // 村居 - 草长莺飞二月天
  105: 'grassland',  // 所见 - 牧童骑黄牛
  106: 'summer',     // 小池 - 小荷才露尖尖角
  107: 'mountains',  // 画 - 远看山有色
  108: 'pastoral',   // 一去二三里 - 烟村四五家

  // === 二年级 ===
  201: 'autumn',     // 山行 - 霜叶红于二月花
  202: 'autumn',     // 赠刘景文 - 橙黄橘绿时
  203: 'farewell',   // 回乡偶书 - 少小离家老大回
  204: 'farewell',   // 赠汪伦 - 桃花潭水深千尺
  205: 'grassland',  // 草 - 离离原上草
  206: 'spring',     // 宿新市徐公店 - 儿童急走追黄蝶
  207: 'mountains',  // 望庐山瀑布 - 飞流直下三千尺
  208: 'spring',     // 绝句 - 两个黄鹂鸣翠柳

  // === 三年级 ===
  301: 'autumn',     // 九月九日忆山东兄弟 - 遍插茱萸
  302: 'autumn',     // 夜书所见 - 萧萧梧叶
  303: 'mountains',  // 饮湖上初晴后雨 - 西湖
  304: 'mountains',  // 望天门山 - 碧水东流
  305: 'mountains',  // 早发白帝城 - 轻舟已过万重山
  306: 'summer',     // 采莲曲 - 荷叶罗裙
  307: 'spring',     // 绝句 - 泥融飞燕子
  308: 'spring',     // 惠崇春江晚景 - 春江水暖

  // === 四年级 ===
  401: 'mountains',  // 独坐敬亭山 - 众鸟高飞尽
  402: 'moonlight',  // 望洞庭 - 湖光秋月
  403: 'mountains',  // 忆江南 - 日出江花红胜火
  404: 'pastoral',   // 乡村四月 - 子规声里雨如烟
  405: 'pastoral',   // 四时田园杂兴 - 昼出耘田
  406: 'summer',     // 渔歌子 - 桃花流水鳜鱼肥
  407: 'farewell',   // 送元二使安西 - 西出阳关
  408: 'frontier',   // 凉州词 - 春风不度玉门关
  409: 'mountains',  // 登鹳雀楼 - 黄河入海流
  410: 'winter',     // 江雪 - 独钓寒江雪

  // === 五年级 ===
  501: 'spring',     // 泊船瓜洲 - 春风又绿江南岸
  502: 'frontier',   // 秋夜将晓出篱门迎凉有感 - 五千仞岳
  503: 'study',      // 示儿 - 王师北定中原日
  504: 'mountains',  // 己亥杂诗 - 九州生气恃风雷
  505: 'moonlight',  // 枫桥夜泊 - 月落乌啼霜满天
  506: 'winter',     // 长相思 - 风一更雪一更
};

/**
 * 获取指定诗词的背景图路径
 * @param {number} poemId - 诗词 ID
 * @returns {string} 背景图路径
 */
export function getPoemBgImage(poemId) {
  const theme = POEM_BG_MAP[poemId] || 'study';
  return BG_IMAGES[theme] || BG_IMAGES.study;
}
