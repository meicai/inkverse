/**
 * 磨耳朵播放器视图
 * 渲染黑胶唱片播放器 UI 和播放控制
 */
import { GradeLabels } from '../data/index.js';
import { getState, getFilteredPoems, getAudioManager } from '../state/app-state.js';
import { PlayMode } from '../../utils/audio-manager.js';
import { showToast } from '../components/toast.js';
import { renderPoemList } from './poem-list-view.js';

/**
 * 渲染磨耳朵播放器
 */
export function renderListenPlayer() {
  const state = getState();
  const audioManager = getAudioManager();
  const container = document.getElementById('listenView');
  const filtered = getFilteredPoems();
  const amState = audioManager.getState();

  // 判断当前播放列表是否匹配
  const isCurrentPlaylist = amState.playlist === filtered || (
    amState.playlist.length === filtered.length &&
    amState.playlist.every((p, i) => p.id === filtered[i]?.id)
  );
  const currentPoem = isCurrentPlaylist && amState.currentPoem ? amState.currentPoem : filtered[0] || null;
  const isPlaying = isCurrentPlaylist && amState.isPlaying;
  const currentIndex = isCurrentPlaylist ? amState.currentIndex : 0;
  const playMode = amState.playMode;

  // 播放模式图标
  const modeIcons = {
    SEQUENCE: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
    </svg>`,
    SINGLE: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <text x="12" y="17" text-anchor="middle" font-size="9" font-weight="bold" fill="currentColor" stroke="none">1</text>
    </svg>`,
    RANDOM: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 3h5v5"/><path d="M4 20 21 3"/>
      <path d="M21 16v5h-5"/><path d="M15 15 20 20"/><path d="M4 4l5 5"/>
    </svg>`,
  };

  container.innerHTML = `
    <div class="listen-container">
      <!-- 年级筛选 -->
      <div class="listen-filters">
        ${Object.entries(GradeLabels).map(([key, label]) => `
          <button class="filter-btn grade-btn ${state.selectedGrade === key ? 'active' : ''}"
                  data-grade="${key}">${label}</button>
        `).join('')}
      </div>

      <!-- 黑胶唱片 -->
      <div class="vinyl-wrapper">
        <div class="vinyl-disc ${isPlaying ? 'spinning' : ''}">
          <div class="vinyl-grooves"></div>
        </div>
        <div class="vinyl-center">
          ${currentPoem ? `
            <div class="vc-title">${currentPoem.title}</div>
            <div class="vc-divider"></div>
            <div class="vc-author">${currentPoem.author}</div>
          ` : `
            <div class="vc-empty">选择播放</div>
          `}
        </div>
      </div>

      <!-- 播放进度 -->
      <div class="listen-progress-info">
        ${isCurrentPlaylist && amState.currentPoem
          ? `第 ${currentIndex + 1} 首 / 共 ${filtered.length} 首`
          : `共 ${filtered.length} 首`
        }
      </div>

      <!-- 播放控制 -->
      <div class="player-controls">
        <button class="ctrl-btn mode-btn" id="modeBtn" title="播放模式">
          ${modeIcons[playMode]}
        </button>

        <button class="ctrl-btn" id="prevBtn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button class="ctrl-btn play-btn-main ${isPlaying ? 'playing' : ''}" id="playBtn"
                ${filtered.length === 0 ? 'disabled' : ''}>
          ${isPlaying ? `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <rect x="6" y="4" width="4" height="16" rx="1"/>
              <rect x="14" y="4" width="4" height="16" rx="1"/>
            </svg>
          ` : `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M8 5v14l11-7z"/>
            </svg>
          `}
        </button>

        <button class="ctrl-btn" id="nextBtn">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // 绑定事件
  container.querySelectorAll('.grade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      audioManager.stop();
      state.selectedGrade = btn.dataset.grade;
      renderPoemList();
      renderListenPlayer();
    });
  });

  container.querySelector('#modeBtn').addEventListener('click', () => {
    const modes = [PlayMode.SEQUENCE, PlayMode.SINGLE, PlayMode.RANDOM];
    const idx = modes.indexOf(playMode);
    const next = modes[(idx + 1) % modes.length];
    audioManager.setPlayMode(next);
    const labels = { SEQUENCE: '列表循环', SINGLE: '单曲循环', RANDOM: '随机播放' };
    showToast(labels[next]);
  });

  container.querySelector('#playBtn').addEventListener('click', () => {
    if (isCurrentPlaylist && amState.currentPoem) {
      audioManager.togglePlay();
    } else if (currentPoem) {
      const startIdx = filtered.findIndex(p => p.id === currentPoem.id);
      audioManager.playPoem(currentPoem, filtered, startIdx >= 0 ? startIdx : 0);
    }
  });

  container.querySelector('#prevBtn').addEventListener('click', () => {
    if (isCurrentPlaylist) {
      audioManager.playPrev();
    } else if (currentPoem) {
      const idx = filtered.findIndex(p => p.id === currentPoem.id);
      const prevIdx = (idx - 1 + filtered.length) % filtered.length;
      audioManager.playPoem(filtered[prevIdx], filtered, prevIdx);
    }
  });

  container.querySelector('#nextBtn').addEventListener('click', () => {
    if (isCurrentPlaylist) {
      audioManager.playNext();
    } else if (currentPoem) {
      const idx = filtered.findIndex(p => p.id === currentPoem.id);
      const nextIdx = (idx + 1) % filtered.length;
      audioManager.playPoem(filtered[nextIdx], filtered, nextIdx);
    }
  });
}
