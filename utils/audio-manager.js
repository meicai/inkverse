/**
 * 音频播放管理器
 * 负责磨耳朵模式的连续自动播放逻辑
 */
import { speakPoem, stopSpeaking } from './tts.js';

// 播放模式
export const PlayMode = {
  SEQUENCE: 'SEQUENCE',  // 列表循环
  SINGLE: 'SINGLE',      // 单曲循环
  RANDOM: 'RANDOM',      // 随机播放
};

/**
 * 创建音频管理器实例
 */
export function createAudioManager() {
  let state = {
    isPlaying: false,
    currentPoem: null,
    currentIndex: 0,
    playlist: [],
    playMode: PlayMode.SEQUENCE,
    pauseDuration: 3, // 秒
    speed: 1.0,
  };

  let pauseTimer = null;
  let listeners = [];

  // 通知所有监听器状态已变更
  function notify() {
    listeners.forEach(fn => fn({ ...state }));
  }

  // 注册状态变化监听
  function subscribe(fn) {
    listeners.push(fn);
    return () => { listeners = listeners.filter(l => l !== fn); };
  }

  // 播放指定诗词
  function playPoem(poem, playlist, index, options = {}) {
    stop();
    state.currentPoem = poem;
    state.playlist = playlist || state.playlist || [];
    state.currentIndex = index >= 0 ? index : state.currentIndex;
    state.isPlaying = true;
    notify();

    speakPoem(poem, {
      speed: state.speed,
      onBoundary: (charIndex) => {
        if (options.onBoundary) {
          options.onBoundary(charIndex);
        }
      },
      onEnd: () => {
        // 朗读结束后，根据播放模式决定下一首
        if (!state.isPlaying) return;
        
        // 如果是从古诗详情页点进来的 (playlist 为空或强制阻断)，则播完单曲就不再继续列表
        if (!state.playlist || state.playlist.length === 0) {
           stop();
           return;
        }

        pauseTimer = setTimeout(() => {
          if (!state.isPlaying) return;
          playNextAuto();
        }, state.pauseDuration * 1000);
      },
      onError: () => {
        state.isPlaying = false;
        notify();
      },
    });
  }

  // 根据模式自动播放下一首
  function playNextAuto() {
    if (!state.playlist.length) return;

    let nextIndex;
    if (state.playMode === PlayMode.SINGLE) {
      nextIndex = state.currentIndex;
    } else if (state.playMode === PlayMode.RANDOM) {
      nextIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
      nextIndex = (state.currentIndex + 1) % state.playlist.length;
    }

    const nextPoem = state.playlist[nextIndex];
    if (nextPoem) {
      playPoem(nextPoem, state.playlist, nextIndex);
    }
  }

  // 手动播放下一首
  function playNext() {
    if (!state.playlist.length) return;
    const nextIndex = (state.currentIndex + 1) % state.playlist.length;
    playPoem(state.playlist[nextIndex], state.playlist, nextIndex);
  }

  // 手动播放上一首
  function playPrev() {
    if (!state.playlist.length) return;
    const prevIndex = (state.currentIndex - 1 + state.playlist.length) % state.playlist.length;
    playPoem(state.playlist[prevIndex], state.playlist, prevIndex);
  }

  // 暂停/继续
  function togglePlay() {
    if (state.isPlaying) {
      stop();
    } else if (state.currentPoem) {
      playPoem(state.currentPoem, state.playlist, state.currentIndex);
    }
  }

  // 停止播放
  function stop() {
    clearTimeout(pauseTimer);
    pauseTimer = null;
    stopSpeaking();
    state.isPlaying = false;
    notify();
  }

  // 设置播放模式
  function setPlayMode(mode) {
    state.playMode = mode;
    notify();
  }

  // 更新配置
  function updateConfig(config) {
    if (config.pauseDuration !== undefined) state.pauseDuration = config.pauseDuration;
    if (config.speed !== undefined) state.speed = config.speed;
  }

  // 获取当前状态
  function getState() {
    return { ...state };
  }

  return {
    subscribe,
    playPoem,
    playNext,
    playPrev,
    togglePlay,
    stop,
    setPlayMode,
    updateConfig,
    getState,
  };
}
