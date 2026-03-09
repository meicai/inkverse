/**
 * 拼音工具函数
 * 将诗句文本与拼音生成 HTML ruby 标注
 */

/**
 * 将一行诗句与对应拼音生成 HTML ruby 标注
 * @param {string} line - 诗句文本（如"离离原上草，"）
 * @param {string} pinyinLine - 空格分隔的拼音（如"lí lí yuán shàng cǎo ，"）
 * @returns {string} 带 ruby 标注的 HTML
 */
export function rubyLine(line, pinyinLine) {
  if (!pinyinLine) return line;

  const chars = [...line];
  const pinyins = pinyinLine.split(/\s+/);

  let html = '';
  let pIdx = 0;

  for (const ch of chars) {
    if (/[\u4e00-\u9fff]/.test(ch)) {
      const py = pIdx < pinyins.length ? pinyins[pIdx] : '';
      html += `<ruby>${ch}<rt>${py}</rt></ruby>`;
      pIdx++;
    } else {
      html += ch;
      if (pIdx < pinyins.length && /^[，。？！、；：""''《》（）\u3002\uff01\uff1f\uff0c]$/.test(pinyins[pIdx])) {
        pIdx++;
      }
    }
  }

  return html;
}
