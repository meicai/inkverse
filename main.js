/**
 * 墨韵诗林 — 主程序入口
 * 管理 Tab 路由、全局状态、组件渲染
 */
import { allPoems, Status, GradeLabels, StatusLabels } from './poems.js';
import { loadPoemStatuses, savePoemStatus, loadSettings, saveSettings } from './utils/storage.js';
import { speak, stopSpeaking, speakPoem, speakEncouragement } from './utils/tts.js';
import { createAudioManager, PlayMode } from './utils/audio-manager.js';
import { getPoemBgImage } from './utils/poem-bg.js';

// ========== 全局状态 ==========
const state = {
  currentTab: 'poems',       // 'poems' | 'listen'
  selectedGrade: 'ALL',
  selectedStatuses: new Set(['ALL']),
  poemStatuses: {},           // { poemId: status }
  settings: {},
  detailPoem: null,           // 当前查看的诗词
  speakingLineIndex: null,    // 当前正在朗读的行索引（-1 = 标题/作者）
};

// 音频管理器
const audioManager = createAudioManager();

// ========== 初始化 ==========
function init() {
  // 从 LocalStorage 恢复数据
  state.poemStatuses = loadPoemStatuses();
  state.settings = loadSettings();
  audioManager.updateConfig(state.settings);

  // 设置视口高度（移动端兼容）
  setAppHeight();
  window.addEventListener('resize', setAppHeight);

  // 绑定底部导航
  document.getElementById('navPoems').addEventListener('click', () => switchTab('poems'));
  document.getElementById('navListen').addEventListener('click', () => switchTab('listen'));

  // 绑定设置按钮
  document.getElementById('settingsBtn').addEventListener('click', openSettings);

  // 初始渲染
  renderPoemList();
  renderListenPlayer();

  // 监听音频管理器状态变化，刷新磨耳朵 UI
  audioManager.subscribe(() => {
    renderListenPlayer();
  });
}

function setAppHeight() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
}

// ========== Tab 切换 ==========
function switchTab(tab) {
  state.currentTab = tab;

  document.querySelectorAll('.tab-view').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  if (tab === 'poems') {
    document.getElementById('poemListView').classList.add('active');
    document.getElementById('navPoems').classList.add('active');
  } else {
    document.getElementById('listenView').classList.add('active');
    document.getElementById('navListen').classList.add('active');
  }
}

// ========== 获取诗词状态 ==========
function getPoemStatus(poemId) {
  return state.poemStatuses[poemId] || Status.UNLEARNED;
}

function getStatusClass(status) {
  switch (status) {
    case Status.MASTERED: return 'mastered';
    case Status.PARTIAL: return 'partial';
    case Status.REVIEW: return 'review';
    default: return 'unlearned';
  }
}

function getStatusText(status) {
  switch (status) {
    case Status.MASTERED: return '已记';
    case Status.PARTIAL: return '一半';
    case Status.REVIEW: return '再练';
    default: return '未学';
  }
}

// ========== 获取筛选后的诗词列表 ==========
function getFilteredPoems() {
  let poems = allPoems;
  if (state.selectedGrade !== 'ALL') {
    poems = poems.filter(p => p.grade === state.selectedGrade);
  }
  if (!state.selectedStatuses.has('ALL')) {
    poems = poems.filter(p => state.selectedStatuses.has(getPoemStatus(p.id)));
  }
  return poems;
}

// ========== 诗单列表渲染 ==========
function renderPoemList() {
  const container = document.getElementById('poemListView');
  const filtered = getFilteredPoems();

  // 统计进度
  const masteredCount = allPoems.filter(p => getPoemStatus(p.id) === Status.MASTERED).length;
  const totalCount = allPoems.length;
  const percent = totalCount > 0 ? (masteredCount / totalCount * 100) : 0;

  container.innerHTML = `
    <!-- 进度卡片 -->
    <div class="progress-banner">
      <div class="progress-label">已记下古诗</div>
      <div class="progress-nums">
        <span class="progress-current">${masteredCount}</span>
        <span class="progress-total">/ ${totalCount}</span>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width: ${percent}%"></div>
      </div>
    </div>

    <!-- 筛选器 -->
    <div class="filters-section">
      <div class="filter-row">
        ${Object.entries(GradeLabels).map(([key, label]) => `
          <button class="filter-btn grade-btn ${state.selectedGrade === key ? 'active' : ''}"
                  data-grade="${key}">${label}</button>
        `).join('')}
      </div>
      <div class="filter-row">
        ${Object.entries(StatusLabels).map(([key, label]) => `
          <button class="filter-btn status-btn ${state.selectedStatuses.has(key) ? 'active' : ''}"
                  data-status="${key}">${label}</button>
        `).join('')}
      </div>
    </div>

    <!-- 诗歌卡片网格 -->
    ${filtered.length > 0 ? `
      <div class="poem-grid">
        ${filtered.map(poem => {
          const status = getPoemStatus(poem.id);
          const bgUrl = getPoemBgImage(poem.id);
          return `
            <div class="poem-card fade-in" data-poem-id="${poem.id}">
              <div class="card-bg" style="background-image: url('${bgUrl}')"></div>
              ${status === Status.MASTERED ? `
                <div class="mastered-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              ` : ''}
              <span class="status-tag ${getStatusClass(status)}">${getStatusText(status)}</span>
              <div class="card-title">${poem.title}</div>
              <div class="card-author">${poem.dynasty ? poem.dynasty + ' · ' : ''}${poem.author}</div>
              <div class="card-preview">${poem.content[0]}</div>
            </div>
          `;
        }).join('')}
      </div>
    ` : `
      <div class="empty-state">
        <div class="empty-icon">📜</div>
        <p>没有找到符合条件的古诗</p>
      </div>
    `}
  `;

  // 绑定事件
  container.querySelectorAll('.grade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedGrade = btn.dataset.grade;
      renderPoemList();
    });
  });

  container.querySelectorAll('.status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.status;
      if (key === 'ALL') {
        state.selectedStatuses.clear();
        state.selectedStatuses.add('ALL');
      } else {
        state.selectedStatuses.delete('ALL');
        if (state.selectedStatuses.has(key)) {
          state.selectedStatuses.delete(key);
          if (state.selectedStatuses.size === 0) state.selectedStatuses.add('ALL');
        } else {
          state.selectedStatuses.add(key);
        }
      }
      renderPoemList();
    });
  });

  container.querySelectorAll('.poem-card').forEach(card => {
    card.addEventListener('click', () => {
      const poemId = parseInt(card.dataset.poemId);
      const poem = allPoems.find(p => p.id === poemId);
      if (poem) openDetail(poem);
    });
  });
}

// ========== 诗歌详情模态框 ==========
function openDetail(poem) {
  state.detailPoem = poem;
  state.speakingLineIndex = null;
  const modal = document.getElementById('poemDetailModal');
  renderDetailContent(modal, poem);
  modal.classList.remove('hidden');
  modal.classList.add('visible');
}

function closeDetail() {
  stopSpeaking();
  state.speakingLineIndex = null;
  const modal = document.getElementById('poemDetailModal');
  modal.classList.remove('visible');
  modal.classList.add('hidden');
  state.detailPoem = null;
  renderPoemList();
}

function renderDetailContent(modal, poem) {
  const filtered = getFilteredPoems();
  const index = filtered.findIndex(p => p.id === poem.id);
  const hasPrev = index > 0;
  const hasNext = index < filtered.length - 1;
  const status = getPoemStatus(poem.id);
  const amState = audioManager.getState();
  const isPlaying = amState.isPlaying && amState.currentPoem?.id === poem.id;

  // 根据诗句数量决定字号
  const lineCount = poem.content.length;
  let fontSize;
  if (lineCount <= 4) fontSize = '28px';
  else if (lineCount <= 6) fontSize = '24px';
  else fontSize = '20px';

  const detailBgUrl = getPoemBgImage(poem.id);

  modal.innerHTML = `
    <div class="detail-header">
      <button class="btn-back" id="detailClose">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      <div class="detail-counter">第 ${index + 1} 首 / 共 ${filtered.length} 首</div>
      <button class="btn-play ${isPlaying ? 'playing' : ''}" id="detailPlay">
        ${isPlaying ? `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        ` : `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        `}
      </button>
    </div>

    <div class="detail-body">
      <div class="detail-bg" style="background-image: url('${detailBgUrl}')"></div>
      <button class="detail-nav-btn prev ${hasPrev ? '' : 'invisible'}" id="detailPrev">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>

      <h2 class="detail-title ${state.speakingLineIndex === -1 ? 'speaking' : ''}" id="detailTitle">${poem.title}</h2>
      <div class="detail-meta" id="detailMeta">
        <div class="divider-line"></div>
        <div class="meta-text ${state.speakingLineIndex === -1 ? 'speaking' : ''}">
          ${poem.dynasty ? poem.dynasty + ' · ' : ''}${poem.author}
        </div>
        <div class="divider-line"></div>
      </div>

      <div class="detail-content">
        ${poem.content.map((line, i) => `
          <p class="detail-line ${state.speakingLineIndex === i ? 'speaking' : ''}"
             style="font-size: ${fontSize}"
             data-line-index="${i}">${line}</p>
        `).join('')}
      </div>

      <button class="detail-nav-btn next ${hasNext ? '' : 'invisible'}" id="detailNext">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>
    </div>

    <div class="detail-actions">
      <button class="action-btn ${status === Status.REVIEW ? 'selected' : ''}" data-action="${Status.REVIEW}">再练练</button>
      <button class="action-btn ${status === Status.PARTIAL ? 'selected' : ''}" data-action="${Status.PARTIAL}">一半了</button>
      <button class="action-btn ${status === Status.MASTERED ? 'selected' : ''}" data-action="${Status.MASTERED}">记住啦</button>
    </div>
  `;

  // 绑定事件
  modal.querySelector('#detailClose').addEventListener('click', closeDetail);

  modal.querySelector('#detailPlay').addEventListener('click', () => {
    const amSt = audioManager.getState();
    if (amSt.isPlaying && amSt.currentPoem?.id === poem.id) {
      audioManager.stop();
    } else {
      stopSpeaking();
      audioManager.playPoem(poem, filtered, index);
    }
    renderDetailContent(modal, poem);
  });

  // 标题/作者点读
  const titleEl = modal.querySelector('#detailTitle');
  const metaEl = modal.querySelector('#detailMeta');
  const speakTitle = () => {
    stopSpeaking();
    audioManager.stop();
    state.speakingLineIndex = -1;
    renderDetailContent(modal, poem);
    const text = `${poem.title}，${poem.dynasty ? poem.dynasty + '，' : ''}${poem.author}。`;
    speak(text, {
      speed: state.settings.speed,
      onEnd: () => { state.speakingLineIndex = null; renderDetailContent(modal, poem); },
      onError: () => { state.speakingLineIndex = null; renderDetailContent(modal, poem); },
    });
  };
  titleEl.addEventListener('click', speakTitle);
  metaEl.addEventListener('click', speakTitle);

  // 逐句点读
  modal.querySelectorAll('.detail-line').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.lineIndex);
      stopSpeaking();
      audioManager.stop();
      state.speakingLineIndex = idx;
      renderDetailContent(modal, poem);
      speak(poem.content[idx], {
        speed: state.settings.speed,
        onEnd: () => { state.speakingLineIndex = null; renderDetailContent(modal, poem); },
        onError: () => { state.speakingLineIndex = null; renderDetailContent(modal, poem); },
      });
    });
  });

  // 上下首切换
  if (hasPrev) {
    modal.querySelector('#detailPrev').addEventListener('click', () => {
      stopSpeaking();
      state.speakingLineIndex = null;
      const prev = filtered[index - 1];
      state.detailPoem = prev;
      renderDetailContent(modal, prev);
    });
  }
  if (hasNext) {
    modal.querySelector('#detailNext').addEventListener('click', () => {
      stopSpeaking();
      state.speakingLineIndex = null;
      const next = filtered[index + 1];
      state.detailPoem = next;
      renderDetailContent(modal, next);
    });
  }

  // 学习状态标记
  modal.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newStatus = btn.dataset.action;
      state.poemStatuses[poem.id] = newStatus;
      savePoemStatus(poem.id, newStatus);

      if (newStatus === Status.MASTERED && state.settings.enableEncouragement) {
        stopSpeaking();
        audioManager.stop();
        speakEncouragement(state.settings.speed);
      }

      showToast(newStatus === Status.MASTERED ? '太棒了！已记住 🎉' : '继续加油！💪');
      renderDetailContent(modal, poem);
    });
  });
}

// ========== 磨耳朵播放器渲染 ==========
function renderListenPlayer() {
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

// ========== 设置面板 ==========
function openSettings() {
  const modal = document.getElementById('settingsModal');
  const cfg = { ...state.settings };

  modal.innerHTML = `
    <div class="settings-panel">
      <div class="settings-header">
        <button class="icon-btn" id="settingsClose">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <h3>应用设置</h3>
        <div style="width:40px"></div>
      </div>

      <div class="settings-body">
        <!-- 播放间隔 -->
        <div class="setting-section">
          <div class="setting-section-title">播放间隔</div>
          <div class="setting-card">
            <div class="setting-row">
              <span style="font-size:13px;color:var(--text-secondary)">诗句之间的停顿时长</span>
              <span class="setting-value" id="pauseVal">${cfg.pauseDuration} 秒</span>
            </div>
            <input type="range" class="range-slider" id="pauseSlider"
                   min="0.5" max="10" step="0.5" value="${cfg.pauseDuration}" />
            <div class="range-labels">
              <span>快节奏</span><span>慢节奏</span>
            </div>
          </div>
        </div>

        <!-- 语速 -->
        <div class="setting-section">
          <div class="setting-section-title">朗读语速</div>
          <div class="setting-card">
            <div class="setting-row">
              <span style="font-size:13px;color:var(--text-secondary)">TTS 语音播放速度</span>
              <span class="setting-value" id="speedVal">${cfg.speed}x</span>
            </div>
            <input type="range" class="range-slider" id="speedSlider"
                   min="0.5" max="2.0" step="0.1" value="${cfg.speed}" />
            <div class="range-labels">
              <span>较慢</span><span>较快</span>
            </div>
          </div>
        </div>

        <!-- 鼓励语音 -->
        <div class="setting-section">
          <div class="setting-section-title">学习反馈</div>
          <div class="setting-card">
            <div class="setting-row">
              <div class="setting-label">
                <h5>鼓励语音</h5>
                <p>记完一首诗后播放鼓励话语</p>
              </div>
              <button class="toggle-switch ${cfg.enableEncouragement ? 'on' : ''}" id="encourageToggle">
                <div class="toggle-thumb"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-footer">
        <button class="save-btn" id="settingsSave">保存所有设置</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('visible');

  // 绑定事件
  modal.querySelector('#settingsClose').addEventListener('click', () => {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
  });

  const pauseSlider = modal.querySelector('#pauseSlider');
  pauseSlider.addEventListener('input', () => {
    cfg.pauseDuration = parseFloat(pauseSlider.value);
    modal.querySelector('#pauseVal').textContent = `${cfg.pauseDuration} 秒`;
  });

  const speedSlider = modal.querySelector('#speedSlider');
  speedSlider.addEventListener('input', () => {
    cfg.speed = parseFloat(speedSlider.value);
    modal.querySelector('#speedVal').textContent = `${cfg.speed}x`;
  });

  modal.querySelector('#encourageToggle').addEventListener('click', () => {
    cfg.enableEncouragement = !cfg.enableEncouragement;
    const toggle = modal.querySelector('#encourageToggle');
    toggle.classList.toggle('on', cfg.enableEncouragement);
  });

  modal.querySelector('#settingsSave').addEventListener('click', () => {
    state.settings = cfg;
    saveSettings(cfg);
    audioManager.updateConfig(cfg);
    showToast('设置已保存 ✓');
    modal.classList.remove('visible');
    modal.classList.add('hidden');
  });
}

// ========== Toast 提示 ==========
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('visible');
    toast.classList.add('hidden');
  }, 1800);
}

// ========== 启动 ==========
document.addEventListener('DOMContentLoaded', init);
