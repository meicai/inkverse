/**
 * TTS 语音引擎封装
 * 使用浏览器原生 Web Speech API (speechSynthesis)
 */

/**
 * 获取中文语音
 */
function getChineseVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const zh = voices.find(v => v.lang.includes('zh'));
  return zh || voices[0] || null;
}

/**
 * 朗读文本
 * @param {string} text - 要朗读的文本
 * @param {Object} options - 配置项
 * @param {number} options.speed - 语速（0.5 ~ 2.0）
 * @param {Function} options.onEnd - 朗读结束回调
 * @param {Function} options.onError - 错误回调
 * @returns {SpeechSynthesisUtterance|null}
 */
export function speak(text, options = {}) {
  if (!('speechSynthesis' in window)) {
    options.onError?.();
    return null;
  }

  // 先取消正在进行的朗读
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = options.speed || 1.0;
  utterance.volume = 1;

  const voice = getChineseVoice();
  if (voice) utterance.voice = voice;

  utterance.onend = () => options.onEnd?.();
  utterance.onerror = () => options.onError?.();

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * 停止朗读
 */
export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * 朗读整首诗（标题 + 作者 + 内容）
 * @param {Object} poem - 诗词对象
 * @param {Object} options - 配置项
 */
export function speakPoem(poem, options = {}) {
  const dynasty = poem.dynasty ? `${poem.dynasty}，` : '';
  const fullText = `${poem.title}，${dynasty}${poem.author}。${poem.content.join('')}`;
  return speak(fullText, options);
}

/**
 * 鼓励语音集合
 */
const encouragements = [
  '你太棒啦！这首古诗已经记在脑子里咯！',
  '好厉害呀，这么快就背下来了，再接再厉！',
  '你真聪明！简直是个背诗小达人！',
  '太出色了！为你点赞，我们继续挑战下一首吧！',
  '真了不起！你的记忆力真是惊人呢！',
];

/**
 * 播放随机鼓励语
 */
export function speakEncouragement(speed = 1.0) {
  const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
  return speak(msg, { speed });
}
