/**
 * 古诗拼音 + 译文注释数据
 * pinyin: 每行拼音，与 content 数组一一对应（逐字空格分隔）
 * translation: 白话译文
 */
const annotations = {
  // ===== 学前 =====
  3: {
    pinyin: [
      'xiàng wǎn yì bù shì ，',
      'qū chē dēng gǔ yuán 。',
      'xī yáng wú xiàn hǎo ，',
      'zhǐ shì jìn huáng hūn 。',
    ],
    translation: '傍晚时心情不好，便驾着车登上古原。夕阳多么美好，只是已接近黄昏。',
  },

  // 注：id 4 已移除（与四年级 401 重复）

  5: {
    pinyin: [
      'chūn zhǒng yī lì sù ，',
      'qiū shōu wàn kē zǐ 。',
      'sì hǎi wú xián tián ，',
      'nóng fū yóu è sǐ 。',
    ],
    translation: '春天种下一粒种子，秋天就能收获万颗粮食。天下没有闲置的田地，可是农民还是饿死了。',
  },
  6: {
    pinyin: [
      'xiǎo wá chēng xiǎo tǐng ，',
      'tōu cǎi bái lián huí 。',
      'bù jiě cáng zōng jì ，',
      'fú píng yī dào kāi 。',
    ],
    translation: '小孩撑着小船，偷偷地采了白莲花回来。他不懂得隐藏自己的踪迹，水面上浮萍被船划开了一条线。',
  },
  7: {
    pinyin: [
      'qù nián jīn rì cǐ mén zhōng ，',
      'rén miàn táo huā xiāng yìng hóng 。',
      'rén miàn bù zhī hé chù qù ，',
      'táo huā yī jiù xiào chūn fēng 。',
    ],
    translation: '去年今天在这扇门里，姑娘的脸庞与桃花相映红。今天姑娘不知去了哪里，只有桃花依然在春风中盛开。',
  },
  8: {
    pinyin: [
      'qīng hǎi cháng yún àn xuě shān ，',
      'gū chéng yáo wàng yù mén guān 。',
      'huáng shā bǎi zhàn chuān jīn jiǎ ，',
      'bù pò lóu lán zhōng bù huán 。',
    ],
    translation: '青海湖上的浓云遮暗了雪山，在孤城上远远望着玉门关。在黄沙中经历百战铠甲都磨穿了，不攻破楼兰誓不回还。',
  },
  9: {
    pinyin: [
      'wú jiā xǐ yàn chí tóu shù ，',
      'duǒ duǒ huā kāi dàn mò hén 。',
      'bù yào rén kuā hǎo yán sè ，',
      'zhǐ liú qīng qì mǎn qián kūn 。',
    ],
    translation: '我家洗砚台旁边有棵梅树，朵朵花开好像是用淡墨画成的。不需要别人来称赞颜色好不好，只希望留下清香之气充满天地之间。',
  },
  10: {
    pinyin: [
      'bì yù zhuāng chéng yī shù gāo ，',
      'wàn tiáo chuí xià lǜ sī tāo 。',
      'bù zhī xì yè shuí cái chū ，',
      'èr yuè chūn fēng sì jiǎn dāo 。',
    ],
    translation: '如同碧玉装扮成的柳树高高矗立，万千条柳枝像绿色的丝带垂下来。不知道这细小的柳叶是谁裁出来的，原来是二月的春风像剪刀一样裁剪的。',
  },
  11: {
    pinyin: [
      'jiě luò sān qiū yè ，',
      'néng kāi èr yuè huā 。',
      'guò jiāng qiān chǐ làng ，',
      'rù zhú wàn gān xié 。',
    ],
    translation: '风能吹落秋天的树叶，能催开春天的鲜花。经过江面能掀起千尺巨浪，吹进竹林能让万根竹子倾斜。',
  },
  12: {
    pinyin: [
      'wēi lóu gāo bǎi chǐ ，',
      'shǒu kě zhāi xīng chén 。',
      'bù gǎn gāo shēng yǔ ，',
      'kǒng jīng tiān shàng rén 。',
    ],
    translation: '山上寺院里的高楼真高啊，好像有一百尺的样子，人在楼上好像一伸手就可以摘下天上的星星。站在这里不敢大声说话，怕惊扰了天上的仙人。',
  },

  // 注：id 13 已移除（与三年级 307 重复）

  14: {
    pinyin: [
      'sōng xià wèn tóng zǐ ，',
      'yán shī cǎi yào qù 。',
      'zhǐ zài cǐ shān zhōng ，',
      'yún shēn bù zhī chù 。',
    ],
    translation: '在松树下问一个小孩子，他说师父到山上采药去了。只知道就在这座大山里，但山中云雾缭绕不知道具体在哪里。',
  },
  15: {
    pinyin: [
      'mù mò fú róng huā ，',
      'shān zhōng fā hóng è 。',
      'jiàn hù jì wú rén ，',
      'fēn fēn kāi qiě luò 。',
    ],
    translation: '枝条顶端的辛夷花，在山中绽放红色的花萼。山涧口寂静无人，花儿纷纷地开了又落了。',
  },
  16: {
    pinyin: [
      'yù zhǎn qīng xuān dào ，',
      'zàn jiè míng yuè guāng 。',
      'bù rú chí shàng shuǐ ，',
      'yóu jiě liǎng xiāng wàng 。',
    ],
    translation: '想要展开远行的道路，暂借明月的光芒照亮。不如池塘上的流水，它们还能够彼此相忘。',
  },
  17: {
    pinyin: [
      'cí mǔ shǒu zhōng xiàn ，',
      'yóu zǐ shēn shàng yī 。',
      'lín xíng mì mì féng ，',
      'yì kǒng chí chí guī 。',
    ],
    translation: '慈爱的母亲手中拿着针线，为即将远行的儿子缝制衣裳。临行前一针一针密密地缝着，担心儿子很晚很晚才能回来。',
  },
  18: {
    pinyin: [
      'yī xī liú shuǐ mǎn ，',
      'shí lǐ liǔ huā xiāng 。',
      'bù dào guān xián shì ，',
      'wéi kàn shuǐ sè guāng 。',
    ],
    translation: '一条小溪流水满满的，十里之内柳花飘香。不谈论公事闲事，只顾着看水面的光影。',
  },
  19: {
    pinyin: [
      'tóu shàng hóng guān bù yòng cái ，',
      'mǎn shēn xuě bái zǒu jiāng lái 。',
      'píng shēng bù gǎn qīng yán yǔ ，',
      'yī jiào qiān mén wàn hù kāi 。',
    ],
    translation: '头上的红冠不用裁剪就天然长成，满身雪白地走过来。平时不敢轻易出声，一叫就让千家万户都打开了门。',
  },
  20: {
    pinyin: [
      'xiǎo shí bù shí yuè ，',
      'hū zuò bái yù pán 。',
      'yòu yí yáo tái jìng ，',
      'fēi zài qīng yún duān 。',
    ],
    translation: '小时候不认识月亮，把它叫做白玉盘。又怀疑是瑶台上的仙镜，飞挂在青云的上面。',
  },
  21: {
    pinyin: [
      'tiān xià shāng xīn chù ，',
      'láo láo sòng kè tíng 。',
      'chūn fēng zhī bié kǔ ，',
      'bù qiǎn liǔ tiáo qīng 。',
    ],
    translation: '天下最令人伤心的地方，就是这送别客人的劳劳亭。春风好像也知道离别的痛苦，所以不让柳条变绿。',
  },
  22: {
    pinyin: [
      'huā kāi mǎn shù hóng ，',
      'huā luò mǎn zhī kōng 。',
      'wéi yú huā lǐ ruǐ ，',
      'yán sè bù céng tóng 。',
    ],
    translation: '花开满树一片红艳，花落之后满枝空荡。只剩下花中的花蕊，颜色和之前不一样了。',
  },

  // 注：id 23 已移除（与五年级 501 重复）

  24: {
    pinyin: [
      'qián bù jiàn gǔ rén ，',
      'hòu bù jiàn lái zhě 。',
      'niàn tiān dì zhī yōu yōu ，',
      'dú chuàng rán ér tì xià 。',
    ],
    translation: '向前看不到古代的圣贤，向后看不到将来的英雄。想到天地是这样无穷无尽，独自一人悲伤地流下眼泪。',
  },
  25: {
    pinyin: [
      'yuán pò shàng hán kōng ，',
      'jiē yán sì hǎi tóng 。',
      'ān zhī qiān lǐ wài ，',
      'bù yǒu yǔ jiān fēng 。',
    ],
    translation: '圆圆的月亮升上了寒冷的天空，人们都说四面八方的月光是一样的。谁知道千里之外，也许正刮风下雨呢。',
  },
  26: {
    pinyin: [
      'huā jiān yī hú jiǔ ，',
      'dú zhuó wú xiāng qīn 。',
      'jǔ bēi yāo míng yuè ，',
      'duì yǐng chéng sān rén 。',
    ],
    translation: '在花丛中摆上一壶美酒，独自一人饮酒没有人陪伴。举起酒杯邀请明月来共饮，对着月光下的影子就成了三个人。',
  },

  // 注：id 27 已移除（与三年级 308 重复）

  28: {
    pinyin: [
      'dú lián yōu cǎo jiàn biān shēng ，',
      'shàng yǒu huáng lì shēn shù míng 。',
      'chūn cháo dài yǔ wǎn lái jí ，',
      'yě dù wú rén zhōu zì héng 。',
    ],
    translation: '我最喜欢那幽静的小草在溪涧边生长，上面有黄莺在树丛深处鸣叫。春潮带着雨水傍晚来得很急，荒野的渡口没有人渡河，小船独自横在水面上。',
  },

  // 注：id 29 已移除（与四年级 408 重复）

  30: {
    pinyin: [
      'huā fēi huā ， wù fēi wù 。',
      'yè bàn lái ， tiān míng qù 。',
      'lái rú chūn mèng jǐ duō shí ？',
      'qù sì zhāo yún wú mì chù 。',
    ],
    translation: '像花又不是花，像雾又不是雾。半夜到来，天亮就离去。来的时候像春梦一样能有多少时间？去的时候像朝云一样无处寻觅。',
  },

  // 注：id 31 已移除（与四年级 409 重复）

  32: {
    pinyin: [
      'dì zǐ guī ， shèng rén xùn 。',
      'shǒu xiào tì ， cì jǐn xìn 。',
      'fàn ài zhòng ， ér qīn rén 。',
      'yǒu yú lì ， zé xué wén 。',
    ],
    translation: '弟子规是圣人的教训。首先要孝顺父母、尊敬兄长，其次要谨慎和诚信。广泛地爱护众人，亲近有仁德的人。如果还有余力就去学习知识。',
  },

  // ===== 一年级 =====
  101: {
    pinyin: [
      'é ， é ， é ，',
      'qū xiàng xiàng tiān gē 。',
      'bái máo fú lǜ shuǐ ，',
      'hóng zhǎng bō qīng bō 。',
    ],
    translation: '鹅鹅鹅，弯曲着脖子对着天空唱歌。白色的羽毛浮在绿色的水面上，红色的脚掌拨动着清澈的水波。',
  },
  102: {
    pinyin: [
      'chuáng qián míng yuè guāng ，',
      'yí shì dì shàng shuāng 。',
      'jǔ tóu wàng míng yuè ，',
      'dī tóu sī gù xiāng 。',
    ],
    translation: '床前有明亮的月光，好像是地上结了一层白霜。抬起头来看天上的明月，低下头来思念自己的家乡。',
  },
  103: {
    pinyin: [
      'chūn mián bù jué xiǎo ，',
      'chù chù wén tí niǎo 。',
      'yè lái fēng yǔ shēng ，',
      'huā luò zhī duō shǎo 。',
    ],
    translation: '春天睡得真香不知不觉天已亮了，到处能听到鸟儿啼叫。昨夜又刮风又下雨，不知花被吹落了多少。',
  },
  104: {
    pinyin: [
      'cǎo zhǎng yīng fēi èr yuè tiān ，',
      'fú dī yáng liǔ zuì chūn yān 。',
      'ér tóng sàn xué guī lái zǎo ，',
      'máng chèn dōng fēng fàng zhǐ yuān 。',
    ],
    translation: '农历二月草木生长莺鸟飞翔，堤边的杨柳飘摇在如烟的春色中。小孩子放学回来得早，赶快趁着东风放起了风筝。',
  },
  105: {
    pinyin: [
      'mù tóng qí huáng niú ，',
      'gē shēng zhèn lín yuè 。',
      'yì yù bǔ míng chán ，',
      'hū rán bì kǒu lì 。',
    ],
    translation: '牧童骑在黄牛背上，嘹亮的歌声在林中回荡。忽然想要捕捉树上叫着的知了，就马上停下来闭上嘴巴站在那里。',
  },
  106: {
    pinyin: [
      'quán yǎn wú shēng xī xì liú ，',
      'shù yīn zhào shuǐ ài qíng róu 。',
      'xiǎo hé cái lù jiān jiān jiǎo ，',
      'zǎo yǒu qīng tíng lì shàng tóu 。',
    ],
    translation: '泉眼悄悄无声是因爱惜细细的水流，树荫映在水面是因为喜欢晴天柔和的风光。小荷叶才露出水面尖尖的角，早有一只蜻蜓站在了上头。',
  },
  107: {
    pinyin: [
      'yuǎn kàn shān yǒu sè ，',
      'jìn tīng shuǐ wú shēng 。',
      'chūn qù huā hái zài ，',
      'rén lái niǎo bù jīng 。',
    ],
    translation: '远看高山色彩明亮，走近一听水却没有声音。春天过去了花还在盛开着，人走过来鸟也不受惊吓。原来这是一幅画。',
  },
  108: {
    pinyin: [
      'yī qù èr sān lǐ ，',
      'yān cūn sì wǔ jiā 。',
      'tíng tái liù qī zuò ，',
      'bā jiǔ shí zhī huā 。',
    ],
    translation: '走出去两三里路，看到一个小村庄有四五户人家。村庄里有六七座亭台，还有许许多多的花。',
  },

  // ===== 二年级 =====
  201: {
    pinyin: [
      'yuǎn shàng hán shān shí jìng xié ，',
      'bái yún shēng chù yǒu rén jiā 。',
      'tíng chē zuò ài fēng lín wǎn ，',
      'shuāng yè hóng yú èr yuè huā 。',
    ],
    translation: '沿着弯弯曲曲的小路上山，白云升腾的地方还住着几户人家。停下车来是因为喜欢这傍晚的枫林，经过霜打的枫叶比二月的花还要红。',
  },
  202: {
    pinyin: [
      'hé jìn yǐ wú qíng yǔ gài ，',
      'jú cán yóu yǒu ào shuāng zhī 。',
      'yī nián hǎo jǐng jūn xū jì ，',
      'zhèng shì chéng huáng jú lǜ shí 。',
    ],
    translation: '荷花凋谢了连那擎雨的荷叶也枯了，菊花虽已残败但还有傲霜的枝条。一年中最好的景致你一定要记住，就是橙子金黄、橘子翠绿的秋末好时节。',
  },
  203: {
    pinyin: [
      'shào xiǎo lí jiā lǎo dà huí ，',
      'xiāng yīn wú gǎi bìn máo shuāi 。',
      'ér tóng xiāng jiàn bù xiāng shí ，',
      'xiào wèn kè cóng hé chù lái 。',
    ],
    translation: '年少时就离开了家乡，到老了才回来。说的还是家乡话，但两鬓的头发已经花白了。小孩子看见我却不认识我，笑着问我是从哪里来的客人。',
  },
  204: {
    pinyin: [
      'lǐ bái chéng zhōu jiāng yù xíng ，',
      'hū wén àn shàng tà gē shēng 。',
      'táo huā tán shuǐ shēn qiān chǐ ，',
      'bù jí wāng lún sòng wǒ qíng 。',
    ],
    translation: '李白坐上小船正要出发，忽然听到岸上有人一边走一边唱歌。桃花潭的水即使有千尺深，也比不上汪伦送我的深情啊。',
  },
  205: {
    pinyin: [
      'lí lí yuán shàng cǎo ，',
      'yī suì yī kū róng 。',
      'yě huǒ shāo bú jìn ，',
      'chūn fēng chuī yòu shēng 。',
    ],
    translation: '原野上的草长得很茂盛，每年都会枯萎和重新生长。野火也烧不完它，春风一吹它又重新长了出来。',
  },
  206: {
    pinyin: [
      'lí luò shū shū yī jìng shēn ，',
      'shù tóu xīn lǜ wèi chéng yīn 。',
      'ér tóng jí zǒu zhuī huáng dié ，',
      'fēi rù cài huā wú chù xún 。',
    ],
    translation: '稀疏的篱笆旁一条小路伸向远方，树上的新芽还没有长成浓密的树荫。小孩子急忙去追赶黄色的蝴蝶，蝴蝶却飞入菜花丛中，再也找不到了。',
  },
  207: {
    pinyin: [
      'rì zhào xiāng lú shēng zǐ yān ，',
      'yáo kàn pù bù guà qián chuān 。',
      'fēi liú zhí xià sān qiān chǐ ，',
      'yí shì yín hé luò jiǔ tiān 。',
    ],
    translation: '阳光照着香炉峰升起紫色的烟雾，远远望去瀑布好像挂在山前的河流。飞一样流下来的水有三千尺那么长，让人以为是银河从天上落了下来。',
  },
  208: {
    pinyin: [
      'liǎng gè huáng lí míng cuì liǔ ，',
      'yī háng bái lù shàng qīng tiān 。',
      'chuāng hán xī lǐng qiān qiū xuě ，',
      'mén bó dōng wú wàn lǐ chuán 。',
    ],
    translation: '两只黄鹂在翠绿的柳枝间鸣叫，一行白鹭飞向蓝蓝的天空。窗户里可以看到西岭千年不化的积雪，门前停泊着从东吴万里开来的船只。',
  },

  // ===== 三年级 =====
  301: {
    pinyin: [
      'dú zài yì xiāng wéi yì kè ，',
      'měi féng jiā jié bèi sī qīn 。',
      'yáo zhī xiōng dì dēng gāo chù ，',
      'biàn chā zhū yú shǎo yī rén 。',
    ],
    translation: '独自一人在他乡做外来的客人，每当到了过节的时候格外思念家乡的亲人。遥想兄弟们在登高的地方，都插上了茱萸就少了我一个人。',
  },
  302: {
    pinyin: [
      'xiāo xiāo wú yè sòng hán shēng ，',
      'jiāng shàng qiū fēng dòng kè qíng 。',
      'zhī yǒu ér tóng tiāo cù zhī ，',
      'yè shēn lí luò yī dēng míng 。',
    ],
    translation: '萧萧的秋风吹动梧桐树叶送来阵阵寒意，江上的秋风触动了游子的思乡之情。知道有小孩在挑逗蟋蟀玩，因为深夜篱笆旁还有一盏灯亮着。',
  },
  303: {
    pinyin: [
      'shuǐ guāng liàn yàn qíng fāng hǎo ，',
      'shān sè kōng méng yǔ yì qí 。',
      'yù bǎ xī hú bǐ xī zǐ ，',
      'dàn zhuāng nóng mǒ zǒng xiāng yí 。',
    ],
    translation: '晴天时西湖水面波光粼粼非常好看，雨天时山色朦胧也很奇妙。如果把西湖比作美女西施的话，不管是淡妆还是浓抹都很合适。',
  },
  304: {
    pinyin: [
      'tiān mén zhōng duàn chǔ jiāng kāi ，',
      'bì shuǐ dōng liú zhì cǐ huí 。',
      'liǎng àn qīng shān xiāng duì chū ，',
      'gū fān yī piàn rì biān lái 。',
    ],
    translation: '天门山从中间断裂是楚江把它冲开的，碧绿的江水向东流到这里开始转弯。两岸的青山相互对峙，一叶孤帆从太阳升起的方向驶来。',
  },
  305: {
    pinyin: [
      'zhāo cí bái dì cǎi yún jiān ，',
      'qiān lǐ jiāng líng yī rì huán 。',
      'liǎng àn yuán shēng tí bù zhù ，',
      'qīng zhōu yǐ guò wàn chóng shān 。',
    ],
    translation: '清晨告别白帝城那彩云缭绕的地方，千里之遥的江陵一天就到了。两岸猿猴的叫声不断，轻快的小船已经驶过了万重青山。',
  },
  306: {
    pinyin: [
      'hé yè luó qún yī sè cái ，',
      'fú róng xiàng liǎn liǎng biān kāi 。',
      'luàn rù chí zhōng kàn bù jiàn ，',
      'wén gē shǐ jué yǒu rén lái 。',
    ],
    translation: '采莲少女的罗裙和荷叶一个颜色，荷花正好映照着少女的脸庞两边开放。混入池塘中看不见她们的身影，听到歌声才发觉有人来了。',
  },
  307: {
    pinyin: [
      'chí rì jiāng shān lì ，',
      'chūn fēng huā cǎo xiāng 。',
      'ní róng fēi yàn zi ，',
      'shā nuǎn shuì yuān yāng 。',
    ],
    translation: '春天的阳光照耀着江山多么秀丽，春风送来花草的芳香。泥土湿润了燕子飞来飞去，沙滩温暖了鸳鸯在上面睡觉。',
  },
  308: {
    pinyin: [
      'zhú wài táo huā sān liǎng zhī ，',
      'chūn jiāng shuǐ nuǎn yā xiān zhī 。',
      'lóu hāo mǎn dì lú yá duǎn ，',
      'zhèng shì hé tún yù shàng shí 。',
    ],
    translation: '竹林外两三枝桃花初放，鸭子在水中最先知道春天来了江水变暖了。蒌蒿满地芦芽刚刚长出来，正是河豚要逆流而上的季节。',
  },

  // ===== 四年级 =====
  401: {
    pinyin: [
      'zhòng niǎo gāo fēi jìn ，',
      'gū yún dú qù xián 。',
      'xiāng kàn liǎng bù yàn ，',
      'zhǐ yǒu jìng tíng shān 。',
    ],
    translation: '群鸟已经飞得看不见了，一朵孤云也悠闲地飘走了。只有我和敬亭山互相对望，怎么看也看不够。',
  },
  402: {
    pinyin: [
      'hú guāng qiū yuè liǎng xiāng hé ，',
      'tán miàn wú fēng jìng wèi mó 。',
      'yáo wàng dòng tíng shān shuǐ cuì ，',
      'bái yín pán lǐ yī qīng luó 。',
    ],
    translation: '洞庭湖的水光与秋月交相辉映，湖面上风平浪静就像没有磨过的铜镜。远远望去洞庭湖山水一片翠绿，就像白银盘中放着一只小巧的青螺。',
  },
  403: {
    pinyin: [
      'jiāng nán hǎo ，',
      'fēng jǐng jiù céng ān 。',
      'rì chū jiāng huā hóng shèng huǒ ，',
      'chūn lái jiāng shuǐ lǜ rú lán 。',
      'néng bù yì jiāng nán ？',
    ],
    translation: '江南的风景多么好啊，如画的风景以前就很熟悉。太阳出来后江边的花儿红得胜过火焰，春天来了江水绿得仿佛蓝草。怎能叫人不怀念江南？',
  },
  404: {
    pinyin: [
      'lǜ biàn shān yuán bái mǎn chuān ，',
      'zǐ guī shēng lǐ yǔ rú yān 。',
      'xiāng cūn sì yuè xián rén shǎo ，',
      'cái liǎo cán sāng yòu chā tián 。',
    ],
    translation: '山坡原野长满了绿色，河水映着天光白茫茫一片。杜鹃声里细雨如烟。乡村四月里闲着的人很少，刚采完蚕桑就又要插秧了。',
  },
  405: {
    pinyin: [
      'zhòu chū yún tián yè jì má ，',
      'cūn zhuāng ér nǚ gè dāng jiā 。',
      'tóng sūn wèi jiě gōng gēng zhī ，',
      'yě bàng sāng yīn xué zhòng guā 。',
    ],
    translation: '白天出去种田晚上在家搓麻线，村庄里的男男女女各有各的家务。小孩子虽然不会耕田织布，也在桑树阴下学着种瓜。',
  },
  406: {
    pinyin: [
      'xī sài shān qián bái lù fēi ，',
      'táo huā liú shuǐ guì yú féi 。',
      'qīng ruò lì ， lǜ suō yī ，',
      'xié fēng xì yǔ bù xū guī 。',
    ],
    translation: '西塞山前白鹭在飞翔，桃花开了河水里鳜鱼正肥。戴着青色的箬笠，穿着绿色的蓑衣，在细风斜雨中钓鱼不想回家。',
  },
  407: {
    pinyin: [
      'wèi chéng zhāo yǔ yì qīng chén ，',
      'kè shè qīng qīng liǔ sè xīn 。',
      'quàn jūn gèng jìn yī bēi jiǔ ，',
      'xī chū yáng guān wú gù rén 。',
    ],
    translation: '渭城早晨的细雨湿润了路上的灰尘，客舍旁的柳树显得更加青翠。劝你再多喝一杯酒，向西出了阳关就再也没有老朋友了。',
  },
  408: {
    pinyin: [
      'huáng hé yuǎn shàng bái yún jiān ，',
      'yī piàn gū chéng wàn rèn shān 。',
      'qiāng dí hé xū yuàn yáng liǔ ，',
      'chūn fēng bù dù yù mén guān 。',
    ],
    translation: '黄河远远流去好像流到了白云之间，一座孤城耸立在万仞高山之中。何必用羌笛吹奏哀怨的折杨柳呢，春风本来就吹不到玉门关外。',
  },
  409: {
    pinyin: [
      'bái rì yī shān jìn ，',
      'huáng hé rù hǎi liú 。',
      'yù qióng qiān lǐ mù ，',
      'gèng shàng yī céng lóu 。',
    ],
    translation: '太阳依傍着山峰慢慢落下，黄河向着大海奔流而去。想要看到千里之外的景色，就要再登上一层楼。',
  },
  410: {
    pinyin: [
      'qiān shān niǎo fēi jué ，',
      'wàn jìng rén zōng miè 。',
      'gū zhōu suō lì wēng ，',
      'dú diào hán jiāng xuě 。',
    ],
    translation: '所有的山上都看不见鸟的踪影，所有的小路上都没有人的足迹。只有一条小船上一位穿着蓑衣戴着斗笠的老翁，独自在寒冷的江面上钓鱼。',
  },

  // ===== 五年级 =====
  501: {
    pinyin: [
      'jīng kǒu guā zhōu yī shuǐ jiān ，',
      'zhōng shān zhǐ gé shù chóng shān 。',
      'chūn fēng yòu lǜ jiāng nán àn ，',
      'míng yuè hé shí zhào wǒ huán 。',
    ],
    translation: '京口和瓜洲之间只隔一条长江，从京口到钟山也只隔几座山。春风又吹绿了长江南岸，明月什么时候才能照着我回到家乡。',
  },
  502: {
    pinyin: [
      'sān wàn lǐ hé dōng rù hǎi ，',
      'wǔ qiān rèn yuè shàng mó tiān 。',
      'yí mín lèi jìn hú chén lǐ ，',
      'nán wàng wáng shī yòu yī nián 。',
    ],
    translation: '三万里长的黄河向东流入大海，五千仞高的华山高耸入云。沦陷区的百姓在敌人的统治下眼泪都流尽了，向南盼望朝廷的军队来解救又过了一年。',
  },
  503: {
    pinyin: [
      'sǐ qù yuán zhī wàn shì kōng ，',
      'dàn bēi bù jiàn jiǔ zhōu tóng 。',
      'wáng shī běi dìng zhōng yuán rì ，',
      'jiā jì wú wàng gào nǎi wēng 。',
    ],
    translation: '我原本就知道死后什么都没有了，只是悲伤看不到国家统一。当朝廷的军队收复中原的那一天，在家里祭祀祖先的时候不要忘了告诉我啊。',
  },
  504: {
    pinyin: [
      'jiǔ zhōu shēng qì shì fēng léi ，',
      'wàn mǎ qí yīn jiū kě āi 。',
      'wǒ quàn tiān gōng chóng dǒu sǒu ，',
      'bù jū yī gé jiàng rén cái 。',
    ],
    translation: '中国大地的生机要靠风雷般的变革，万马齐喑的局面实在令人悲哀。我劝天公重新振作精神，不要拘泥于一种规格降下各种人才。',
  },
  505: {
    pinyin: [
      'yuè luò wū tí shuāng mǎn tiān ，',
      'jiāng fēng yú huǒ duì chóu mián 。',
      'gū sū chéng wài hán shān sì ，',
      'yè bàn zhōng shēng dào kè chuán 。',
    ],
    translation: '月亮落下去乌鸦啼叫满天都是寒霜，面对着江边的枫树和渔船上的灯火满怀忧愁难以入眠。苏州城外的寒山寺，半夜里敲响的钟声传到了客船上。',
  },
  506: {
    pinyin: [
      'shān yī chéng shuǐ yī chéng ，',
      'shēn xiàng yú guān nà pàn xíng 。',
      'yè shēn qiān zhàng dēng 。',
      'fēng yī gēng xuě yī gēng ，',
    ],
    translation: '跋山涉水一路前行，将士们向山海关的方向进发。夜深了营帐中千盏灯还亮着。风雪交加整夜不停，嘈杂的声音打碎了思乡的梦，故乡没有这样的风雪之声啊。',
  },
};

/**
 * 获取指定诗词的注释（拼音+译文）
 */
export function getAnnotation(poemId) {
  return annotations[poemId] || null;
}

/**
 * 将一行诗句与对应拼音生成 HTML ruby 标注
 * @param {string} line - 诗句文本（如"离离原上草，"）
 * @param {string} pinyinLine - 空格分隔的拼音（如"lí lí yuán shàng cǎo ，"）
 * @returns {string} 带 ruby 标注的 HTML
 */
export function rubyLine(line, pinyinLine) {
  if (!pinyinLine) return line;

  // 拆分：汉字和标点分开
  const chars = [...line];
  const pinyins = pinyinLine.split(/\s+/);

  let html = '';
  let pIdx = 0;

  for (const ch of chars) {
    // 判断是否为汉字
    if (/[\u4e00-\u9fff]/.test(ch)) {
      const py = pIdx < pinyins.length ? pinyins[pIdx] : '';
      // 跳过标点类 pinyin
      if (py && !/^[，。？！、；：""''《》（）\u3002\uff01\uff1f\uff0c]$/.test(py)) {
        html += `<ruby>${ch}<rt>${py}</rt></ruby>`;
      } else {
        html += `<ruby>${ch}<rt>${py}</rt></ruby>`;
      }
      pIdx++;
    } else {
      // 标点直接输出，拼音中的标点也跳过
      html += ch;
      // 标点在拼音中也占位，跳过
      if (pIdx < pinyins.length && /^[，。？！、；：""''《》（）\u3002\uff01\uff1f\uff0c]$/.test(pinyins[pIdx])) {
        pIdx++;
      }
    }
  }

  return html;
}
