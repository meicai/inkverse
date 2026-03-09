/**
 * 设置面板视图
 * 渲染应用设置：播放间隔、语速、鼓励语音
 */
import { getState, getAudioManager } from '../state/app-state.js';
import { saveSettings } from '../../utils/storage.js';
import { showToast } from '../components/toast.js';

/**
 * 打开设置面板
 */
export function openSettings() {
  const state = getState();
  const audioManager = getAudioManager();
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
