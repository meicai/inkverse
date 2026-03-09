#!/usr/bin/env node
/**
 * 诗词数据校验脚本
 * 检查 src/data/ 下所有年级文件的数据完整性
 *
 * 校验项：
 * 1. id 是否重复
 * 2. 必填字段（title、author、content）是否缺失
 * 3. content 与 pinyin 行数是否一致
 * 4. background 是否为合法主题 key
 * 5. grade 是否为合法枚举值
 */
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 动态导入所有年级数据
const dataDir = join(__dirname, '..', 'src', 'data');

// 合法的背景主题列表
const VALID_BACKGROUNDS = [
  'spring', 'summer', 'autumn', 'winter',
  'mountains', 'pastoral', 'moonlight', 'farewell',
  'frontier', 'birds', 'grassland', 'study',
];

// 合法的年级枚举
const VALID_GRADES = [
  'PRESCHOOL', 'GRADE_1', 'GRADE_2', 'GRADE_3',
  'GRADE_4', 'GRADE_5', 'GRADE_6',
];

// 统计
let totalPoems = 0;
let totalErrors = 0;
let totalWarnings = 0;

function error(msg) {
  totalErrors++;
  console.error(`  ❌ ${msg}`);
}

function warn(msg) {
  totalWarnings++;
  console.warn(`  ⚠️  ${msg}`);
}

async function main() {
  console.log('🔍 开始校验诗词数据...\n');

  // 导入统一入口（含所有诗词数据）
  const { allPoems, GradeLabels, StatusLabels } = await import(
    pathToFileURL(join(dataDir, 'index.js')).href
  );

  totalPoems = allPoems.length;
  console.log(`📊 共加载 ${totalPoems} 首诗词\n`);

  // ===== 1. 检查 id 重复 =====
  console.log('── 检查 ID 唯一性 ──');
  const idMap = new Map();
  for (const poem of allPoems) {
    if (idMap.has(poem.id)) {
      error(`ID ${poem.id} 重复：「${poem.title}」与「${idMap.get(poem.id)}」`);
    } else {
      idMap.set(poem.id, poem.title);
    }
  }
  if (!totalErrors) console.log('  ✅ 所有 ID 唯一');

  // ===== 2. 检查必填字段 =====
  console.log('\n── 检查必填字段 ──');
  const requiredFields = ['id', 'title', 'author', 'content', 'grade'];
  let fieldErrors = 0;
  for (const poem of allPoems) {
    for (const field of requiredFields) {
      if (!poem[field]) {
        error(`ID ${poem.id}「${poem.title || '未知'}」缺少必填字段: ${field}`);
        fieldErrors++;
      }
    }
    if (poem.content && !Array.isArray(poem.content)) {
      error(`ID ${poem.id}「${poem.title}」content 不是数组`);
      fieldErrors++;
    }
    if (poem.content && poem.content.length === 0) {
      error(`ID ${poem.id}「${poem.title}」content 为空数组`);
      fieldErrors++;
    }
  }
  if (!fieldErrors) console.log('  ✅ 所有必填字段完整');

  // ===== 3. 检查 pinyin 行数匹配 =====
  console.log('\n── 检查拼音行数匹配 ──');
  let pinyinMissing = 0;
  let pinyinMismatch = 0;
  for (const poem of allPoems) {
    if (!poem.pinyin || !Array.isArray(poem.pinyin) || poem.pinyin.length === 0) {
      warn(`ID ${poem.id}「${poem.title}」缺少拼音数据`);
      pinyinMissing++;
    } else if (poem.content && poem.pinyin.length !== poem.content.length) {
      error(`ID ${poem.id}「${poem.title}」拼音行数(${poem.pinyin.length}) ≠ 正文行数(${poem.content.length})`);
      pinyinMismatch++;
    }
  }
  if (!pinyinMissing && !pinyinMismatch) {
    console.log('  ✅ 所有拼音行数匹配');
  } else {
    if (pinyinMissing) console.log(`  ℹ️  ${pinyinMissing} 首缺少拼音`);
    if (pinyinMismatch) console.log(`  ❌ ${pinyinMismatch} 首拼音行数不匹配`);
  }

  // ===== 4. 检查 background 合法性 =====
  console.log('\n── 检查背景主题 ──');
  let bgErrors = 0;
  for (const poem of allPoems) {
    if (poem.background && !VALID_BACKGROUNDS.includes(poem.background)) {
      error(`ID ${poem.id}「${poem.title}」背景主题非法: "${poem.background}"`);
      bgErrors++;
    }
  }
  const noBg = allPoems.filter(p => !p.background).length;
  if (noBg) warn(`${noBg} 首缺少背景主题（将使用默认 study）`);
  if (!bgErrors) console.log('  ✅ 所有背景主题合法');

  // ===== 5. 检查 grade 合法性 =====
  console.log('\n── 检查年级枚举 ──');
  let gradeErrors = 0;
  for (const poem of allPoems) {
    if (poem.grade && !VALID_GRADES.includes(poem.grade)) {
      error(`ID ${poem.id}「${poem.title}」年级值非法: "${poem.grade}"`);
      gradeErrors++;
    }
  }
  if (!gradeErrors) console.log('  ✅ 所有年级值合法');

  // ===== 6. 检查 translation =====
  console.log('\n── 检查译文覆盖 ──');
  const noTranslation = allPoems.filter(p => !p.translation);
  if (noTranslation.length) {
    warn(`${noTranslation.length} 首缺少译文`);
  } else {
    console.log('  ✅ 所有诗词都有译文');
  }

  // ===== 7. 年级分布统计 =====
  console.log('\n── 年级分布 ──');
  const gradeDist = {};
  for (const poem of allPoems) {
    gradeDist[poem.grade] = (gradeDist[poem.grade] || 0) + 1;
  }
  for (const [grade, count] of Object.entries(gradeDist)) {
    const label = GradeLabels[grade] || grade;
    console.log(`  ${label}: ${count} 首`);
  }

  // ===== 汇总 =====
  console.log('\n══════════════════════════════');
  console.log(`📊 校验完成：${totalPoems} 首诗词`);
  console.log(`   ❌ 错误: ${totalErrors}`);
  console.log(`   ⚠️  警告: ${totalWarnings}`);
  console.log('══════════════════════════════\n');

  if (totalErrors > 0) {
    console.error('🚫 校验失败，请修复以上错误后重试');
    process.exit(1);
  } else {
    console.log('✅ 校验全部通过！');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('脚本执行失败:', err);
  process.exit(1);
});
