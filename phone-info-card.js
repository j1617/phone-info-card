!function(t){const e=document.createElement("style");e.textContent='/* Version: 1.0.0 */',document.head.appendChild(e)}(),console.info("%c PHONE-INFO-CARD %c v1.0.0 ","color: #06b6d4; font-weight: bold; background: #1a1f2e","color: white; background: #3b82f6"),class PhoneInfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('你需要指定一个实体');
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    this._updateCard();
  }

  _updateCard() {
    if (!this._hass || !this.config) return;

    const entity = this._hass.states[this.config.entity];
    const attributes = entity ? entity.attributes : {};

    // 从配置或实体属性获取数据
    const data = {
      balance: this.config.balance || attributes.balance || '711.99',
      dataRemaining: this.config.data_remaining || attributes.data_remaining || '20.29',
      dataUsed: this.config.data_used || attributes.data_used || '2.07',
      voiceRemaining: this.config.voice_remaining || attributes.voice_remaining || '92',
      voiceUsed: this.config.voice_used || attributes.voice_used || '8',
      costUsed: this.config.cost_used || attributes.cost_used || '43.22',
      operator: this.config.operator || attributes.operator || '中国联通',
      phoneNumber: this.config.phone_number || attributes.phone_number || '176****8888',
      cycleDay: this.config.cycle_day || attributes.cycle_day || 28,
      cycleTotal: this.config.cycle_total || attributes.cycle_total || 30,
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        ha-card {
          background: var(--ha-card-background, var(--paper-card-background-color, #1a1f2e));
          border-radius: var(--ha-card-border-radius, 16px);
          box-shadow: var(--ha-card-box-shadow, 0 4px 20px rgba(0,0,0,0.3));
          overflow: hidden;
          position: relative;
        }
        
        .card-content {
          padding: 20px;
          font-family: var(--paper-font-body1_-_font-family), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        /* 顶部装饰线 */
        .top-gradient {
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #06b6d4, #a855f7);
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
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .operator-info h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: var(--primary-text-color, #f1f5f9);
        }
        
        .operator-info span {
          font-size: 12px;
          color: var(--secondary-text-color, #94a3b8);
        }
        
        /* 主余额 */
        .balance-section {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.08));
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 16px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
        
        .balance-label {
          font-size: 12px;
          color: var(--secondary-text-color, #94a3b8);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }
        
        .balance-value {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        
        .balance-currency {
          font-size: 22px;
          color: #06b6d4;
          font-weight: 500;
        }
        
        .balance-amount {
          font-size: 42px;
          font-weight: 700;
          color: var(--primary-text-color, #f1f5f9);
          background: linear-gradient(135deg, var(--primary-text-color, #f1f5f9), #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* 数据网格 */
        .data-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        
        .data-item {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 14px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        
        .data-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }
        
        .data-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        
        .data-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
        
        .data-label {
          font-size: 11px;
          color: var(--secondary-text-color, #94a3b8);
          font-weight: 500;
        }
        
        .data-value {
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-text-color, #f1f5f9);
        }
        
        .data-unit {
          font-size: 12px;
          color: var(--secondary-text-color, #94a3b8);
          margin-left: 2px;
        }
        
        .progress-bar {
          margin-top: 8px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.8s ease;
        }
        
        /* 颜色主题 */
        .icon-blue { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .icon-purple { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
        .icon-green { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .icon-orange { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .icon-cyan { background: rgba(6, 182, 212, 0.2); color: #06b6d4; }
        .icon-pink { background: rgba(236, 72, 153, 0.2); color: #ec4899; }
        
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
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }
        
        .update-time {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--secondary-text-color, #94a3b8);
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
          <!-- 头部 -->
          <div class="header">
            <div class="operator-badge">
              <div class="operator-icon">176</div>
              <div class="operator-info">
                <h3>${data.operator}</h3>
                <span>${data.phoneNumber}</span>
              </div>
            </div>
          </div>
          
          <!-- 主余额 -->
          <div class="balance-section">
            <div class="balance-label">剩余话费</div>
            <div class="balance-value">
              <span class="balance-currency">¥</span>
              <span class="balance-amount">${data.balance}</span>
            </div>
          </div>
          
          <!-- 数据网格 -->
          <div class="data-grid">
            <!-- 剩余流量 -->
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
                <div class="progress-fill fill-blue" style="width: ${this._calcPercent(data.dataRemaining, 22.36)}%"></div>
              </div>
            </div>
            
            <!-- 剩余语音 -->
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
                <div class="progress-fill fill-purple" style="width: ${this._calcPercent(data.voiceRemaining, 100)}%"></div>
              </div>
            </div>
            
            <!-- 已用话费 -->
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
                <div class="progress-fill fill-green" style="width: ${this._calcPercent(data.costUsed, 755.21)}%"></div>
              </div>
            </div>
            
            <!-- 已用流量 -->
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
                <div class="progress-fill fill-orange" style="width: ${this._calcPercent(data.dataUsed, 22.36)}%"></div>
              </div>
            </div>
            
            <!-- 已用语音 -->
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
                <div class="progress-fill fill-cyan" style="width: ${this._calcPercent(data.voiceUsed, 100)}%"></div>
              </div>
            </div>
            
            <!-- 套餐周期 -->
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
          
          <!-- 底部 -->
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
      entity: 'sensor.phone_balance',
      operator: '中国联通',
      phone_number: '176****8888',
      balance: '711.99',
      data_remaining: '20.29',
      data_used: '2.07',
      voice_remaining: '92',
      voice_used: '8',
      cost_used: '43.22',
    };
  }
}

customElements.define('phone-info-card', PhoneInfoCard);

// 注册到卡片选择器
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'phone-info-card',
  name: '话费信息卡片',
  description: '显示手机话费、流量、语音使用情况的卡片',
});
