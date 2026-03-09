/**
 * TTS 语音引擎封装
 * 使用浏览器原生 Web Speech API (speechSynthesis)
 */
import { showToast } from '../src/components/toast.js';

let isVoiceReady = false;
let hasChineseVoice = false;

/**
 * 检查当前浏览器是否有可用的发音人（尤其是中文）
 */
function checkVoices() {
  if (!('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    isVoiceReady = true;
    hasChineseVoice = !!voices.find(v => v.lang.includes('zh'));
  }
}

// 监听 voices 加载（部分浏览器异步加载 voice 列表）
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  checkVoices();
  window.speechSynthesis.addEventListener('voiceschanged', checkVoices);
}

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
 * @param {Function} options.onBoundary - 字/词边界事件回调 (charIndex => void)
 * @returns {SpeechSynthesisUtterance|null}
 */
export function speak(text, options = {}) {
  if (!('speechSynthesis' in window)) {
    showToast('当前浏览器不支持语音朗读换个浏览器试试吧');
    options.onError?.();
    return null;
  }

  // 若语言包已加载完毕却没找到中文，给出轻微提示（仅提示一次或不打断，这里作为日志）
  if (isVoiceReady && !hasChineseVoice) {
    console.warn('未检测到原生中文语音包，发音可能极其生硬或无法发音');
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
  utterance.onerror = (e) => {
    console.error('语音朗读错误:', e);
    // 过滤掉 cancel 引起的预期内 error
    if (e.error !== 'canceled' && e.error !== 'interrupted') {
      showToast('语音请求失败，请检查设备音量或稍后再试');
    }
    options.onError?.();
  };

  if (options.onBoundary) {
    utterance.onboundary = (e) => {
      // e.charIndex 即为当前发音字符在原文本 text 中的索引
      options.onBoundary(e.charIndex);
    };
  }

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('speak 调用异常:', err);
    showToast('系统语音引擎初始化失败');
    options.onError?.();
  }
  
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
 * @param {Object} options - 配置项（如 onBoundary）
 */
export function speakPoem(poem, options = {}) {
  const dynasty = poem.dynasty ? `${poem.dynasty}，` : '';
  const metaText = `${poem.title}，${dynasty}${poem.author}。`;
  // 用空格把句子连在一起，方便计算相对偏移
  const fullText = metaText + poem.content.join('');
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
