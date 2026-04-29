/**
 * Phone Info Card - Home Assistant Lovelace Custom Card
 * Version: 1.1.0
 * Description: Display phone balance, data, and voice usage
 */

console.info(
  '%c PHONE-INFO-CARD %c v1.1.0 ',
  'color: #3b82f6; font-weight: bold; background: #e0e7ff; padding: 2px 6px; border-radius: 3px 0 0 3px;',
  'color: white; background: #3b82f6; padding: 2px 6px; border-radius: 0 3px 3px 0;'
);

class PhoneInfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    this.config = { ...config };
    this._updateCard();
  }

  set hass(hass) {
    this._hass = hass;
    this._updateCard();
  }

  connectedCallback() {
    this._updateCard();
  }

  _getValue(key, entityKey) {
    // 优先使用 entity 配置获取实时值
    if (this.config[entityKey] && this._hass) {
      const entity = this._hass.states[this.config[entityKey]];
      if (entity) {
        return entity.state;
      }
    }
    // 其次使用直接配置的值
    return this.config[key] ?? this._getDefault(key);
  }

  _getDefault(key) {
    const defaults = {
      balance: '711.99',
      dataRemaining: '20.29',
      dataUsed: '2.07',
      voiceRemaining: '92',
      voiceUsed: '8',
      costUsed: '43.22',
      operator: '中国联通',
      phoneNumber: '176****8888',
      cycleDay: 28,
      cycleTotal: 30,
    };
    return defaults[key] ?? '';
  }

  _updateCard() {
    if (!this.config) return;

    // 从配置或实体获取数据
    const data = {
      balance: this._getValue('balance', 'balance_entity'),
      dataRemaining: this._getValue('data_remaining', 'data_remaining_entity'),
      dataUsed: this._getValue('data_used', 'data_used_entity'),
      voiceRemaining: this._getValue('voice_remaining', 'voice_remaining_entity'),
      voiceUsed: this._getValue('voice_used', 'voice_used_entity'),
      costUsed: this._getValue('cost_used', 'cost_used_entity'),
      operator: this.config.operator ?? this._getDefault('operator'),
      phoneNumber: this.config.phone_number ?? this._getDefault('phoneNumber'),
      cycleDay: this.config.cycle_day ?? this._getDefault('cycleDay'),
      cycleTotal: this.config.cycle_total ?? this._getDefault('cycleTotal'),
    };

    // 计算进度条百分比
    const dataTotal = parseFloat(data.dataRemaining) + parseFloat(data.dataUsed) || 22.36;
    const voiceTotal = parseFloat(data.voiceRemaining) + parseFloat(data.voiceUsed) || 100;
    const costTotal = parseFloat(data.balance) + parseFloat(data.costUsed) || 755.21;

    // 样式配置
    const styles = {
      bg: this.config.background_color || '#ffffff',
      text: this.config.text_color || '#1e293b',
      secondary: this.config.secondary_color || '#64748b',
      accent: this.config.accent_color || '#3b82f6',
      cardBg: this.config.card_background || '#f8fafc',
      headerBg: this.config.header_background || 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        ha-card {
          background: ${styles.bg};
          border-radius: var(--ha-card-border-radius, 16px);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          position: relative;
        }
        
        .card-content {
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          color: ${styles.text};
        }
        
        /* 顶部装饰线 */
        .top-gradient {
          height: 4px;
          background: ${styles.headerBg};
        }
        
        /* 头部 */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        
        .operator-badge {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .operator-icon {
          width: 46px;
          height: 46px;
          background: ${styles.headerBg};
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }
        
        .operator-info h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: ${styles.text};
        }
        
        .operator-info span {
          font-size: 13px;
          color: ${styles.secondary};
        }
        
        /* 主余额 */
        .balance-section {
          background: ${styles.cardBg};
          border-radius: 14px;
          padding: 20px;
          margin-bottom: 16px;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        
        .balance-label {
          font-size: 13px;
          color: ${styles.secondary};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .balance-value {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        
        .balance-currency {
          font-size: 24px;
          color: ${styles.accent};
          font-weight: 600;
        }
        
        .balance-amount {
          font-size: 44px;
          font-weight: 800;
          color: ${styles.text};
        }
        
        /* 数据网格 */
        .data-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .data-item {
          background: ${styles.cardBg};
          border-radius: 12px;
          padding: 14px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
        }
        
        .data-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
        }
        
        .data-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .data-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        
        .data-label {
          font-size: 12px;
          color: ${styles.secondary};
          font-weight: 600;
        }
        
        .data-value {
          font-size: 22px;
          font-weight: 700;
          color: ${styles.text};
        }
        
        .data-unit {
          font-size: 12px;
          color: ${styles.secondary};
          margin-left: 2px;
          font-weight: 500;
        }
        
        .progress-bar {
          margin-top: 8px;
          height: 4px;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }
        
        /* 颜色主题 */
        .icon-blue { background: rgba(59, 130, 246, 0.15); }
        .icon-purple { background: rgba(168, 85, 247, 0.15); }
        .icon-green { background: rgba(16, 185, 129, 0.15); }
        .icon-orange { background: rgba(245, 158, 11, 0.15); }
        .icon-cyan { background: rgba(6, 182, 212, 0.15); }
        .icon-pink { background: rgba(236, 72, 153, 0.15); }
        
        .fill-blue { background: #3b82f6; }
        .fill-purple { background: #a855f7; }
        .fill-green { background: #10b981; }
        .fill-orange { background: #f59e0b; }
        .fill-cyan { background: #06b6d4; }
        .fill-pink { background: #ec4899; }
        
        /* 底部 */
        .footer {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        
        .update-time {
          display: flex;
          align-items: center;
          gap: 6px;
          color: ${styles.secondary};
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }
        
        @media (max-width: 400px) {
          .data-grid {
            grid-template-columns: 1fr;
          }
          .balance-amount {
            font-size: 36px;
          }
        }
      </style>
      
      <ha-card>
        <div class="top-gradient"></div>
        <div class="card-content">
          <div class="header">
            <div class="operator-badge">
              <div class="operator-icon">176</div>
              <div class="operator-info">
                <h3>${data.operator}</h3>
                <span>${data.phoneNumber}</span>
              </div>
            </div>
          </div>
          
          <div class="balance-section">
            <div class="balance-label">剩余话费</div>
            <div class="balance-value">
              <span class="balance-currency">¥</span>
              <span class="balance-amount">${data.balance}</span>
            </div>
          </div>
          
          <div class="data-grid">
            <div class="data-item">
              <div class="data-header">
                <div class="data-icon icon-blue">📊</div>
                <span class="data-label">剩余流量</span>
              </div>
              <div>
                <span class="data-value">${data.dataRemaining}</span>
                <span class="data-unit">GB</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-blue" style="width: ${this._calcPercent(data.dataRemaining, dataTotal)}%"></div>
              </div>
            </div>
            
            <div class="data-item">
              <div class="data-header">
                <div class="data-icon icon-purple">📞</div>
                <span class="data-label">剩余语音</span>
              </div>
              <div>
                <span class="data-value">${data.voiceRemaining}</span>
                <span class="data-unit">分钟</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-purple" style="width: ${this._calcPercent(data.voiceRemaining, voiceTotal)}%"></div>
              </div>
            </div>
            
            <div class="data-item">
              <div class="data-header">
                <div class="data-icon icon-green">💰</div>
                <span class="data-label">已用话费</span>
              </div>
              <div>
                <span class="data-value">${data.costUsed}</span>
                <span class="data-unit">元</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-green" style="width: ${this._calcPercent(data.costUsed, costTotal)}%"></div>
              </div>
            </div>
            
            <div class="data-item">
              <div class="data-header">
                <div class="data-icon icon-orange">📈</div>
                <span class="data-label">已用流量</span>
              </div>
              <div>
                <span class="data-value">${data.dataUsed}</span>
                <span class="data-unit">GB</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-orange" style="width: ${this._calcPercent(data.dataUsed, dataTotal)}%"></div>
              </div>
            </div>
            
            <div class="data-item">
              <div class="data-header">
                <div class="data-icon icon-cyan">⏱️</div>
                <span class="data-label">已用语音</span>
              </div>
              <div>
                <span class="data-value">${data.voiceUsed}</span>
                <span class="data-unit">分钟</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-cyan" style="width: ${this._calcPercent(data.voiceUsed, voiceTotal)}%"></div>
              </div>
            </div>
            
            <div class="data-item">
              <div class="data-header">
                <div class="data-icon icon-pink">📅</div>
                <span class="data-label">套餐周期</span>
              </div>
              <div>
                <span class="data-value">${data.cycleDay}</span>
                <span class="data-unit">/${data.cycleTotal}天</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill fill-pink" style="width: ${this._calcPercent(data.cycleDay, data.cycleTotal)}%"></div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="update-time">
              <span class="status-dot"></span>
              <span>实时更新</span>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  _calcPercent(value, total) {
    const v = parseFloat(value);
    const t = parseFloat(total);
    if (isNaN(v) || isNaN(t) || t === 0) return 0;
    return Math.min(100, Math.max(0, (v / t) * 100));
  }

  getCardSize() {
    return 3;
  }

  static getStubConfig() {
    return {
      operator: '中国联通',
      phone_number: '176****8888',
      balance: '711.99',
      data_remaining: '20.29',
      data_used: '2.07',
      voice_remaining: '92',
      voice_used: '8',
      cost_used: '43.22',
      cycle_day: 28,
      cycle_total: 30,
    };
  }
}

// 注册自定义元素
if (!customElements.get('phone-info-card')) {
  customElements.define('phone-info-card', PhoneInfoCard);
}

// 注册到 Home Assistant 卡片选择器
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'phone-info-card',
  name: '话费信息卡片',
  description: '显示手机话费、流量、语音使用情况的卡片',
  documentationURL: 'https://github.com/your-repo/phone-info-card',
});
