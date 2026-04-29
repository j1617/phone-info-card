# Home Assistant 话费信息卡片

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://hacs.xyz/)
[![version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/your-repo/phone-info-card)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

一个漂亮的 Home Assistant Lovelace 自定义卡片，用于显示手机话费、流量、语音使用情况。

**当前版本: v1.1.0**

## 预览效果

![预览](卡片展示深色主题，包含余额、流量、语音等信息)

## 安装方法

### 方法一：HACS 安装（推荐）

1. 打开 HACS → 前端
2. 点击右下角 "+" 按钮
3. 选择 "自定义仓库"
4. 输入仓库地址并选择类别为 "Lovelace"
5. 点击安装

### 方法二：手动安装

1. 将 `phone-info-card.js` 文件下载到 Home Assistant 配置目录：
   ```
   /config/www/phone-info-card.js
   ```

2. 在 Home Assistant 中，进入 **设置 → 仪表板 → 资源**
   或编辑 `configuration.yaml`：
   ```yaml
   lovelace:
     resources:
       - url: /local/phone-info-card.js
         type: module
   ```

3. 重启 Home Assistant 或刷新浏览器缓存（Ctrl+F5）

## 使用方法

### 在 Lovelace 仪表板中添加卡片

1. 进入仪表板编辑模式
2. 点击 "添加卡片"
3. 选择 "话费信息卡片"
4. 配置卡片参数

### YAML 配置示例

#### 基础配置（直接指定数值）

```yaml
type: custom:phone-info-card
operator: 中国联通
phone_number: 176****8888
balance: '711.99'
data_remaining: '20.29'
data_used: '2.07'
voice_remaining: '92'
voice_used: '8'
cost_used: '43.22'
cycle_day: 28
cycle_total: 30
```

#### 绑定传感器实体（推荐，实时更新）

Lovelace YAML **不支持** `{{ states('sensor.xxx') }}` 模板语法。
使用 `xxx_entity` 配置项绑定传感器实体即可实时显示值：

```yaml
type: custom:phone-info-card
operator: 中国联通
phone_number: 176****8888
balance_entity: sensor.176sheng_yu_hua_fei
data_remaining_entity: sensor.176sheng_yu_liu_liang
data_used_entity: sensor.176yi_yong_liu_liang
voice_remaining_entity: sensor.176sheng_yu_yu_yin
voice_used_entity: sensor.176yi_yong_yu_yin
cost_used_entity: sensor.176yi_yong_hua_fei
cycle_day: 28
cycle_total: 30
```

也可以混合使用（部分绑定实体，部分写死）：

```yaml
type: custom:phone-info-card
operator: 中国联通
phone_number: 176****8888
balance_entity: sensor.176sheng_yu_hua_fei
voice_remaining: '92'
voice_used: '8'
```

#### 自定义颜色

```yaml
type: custom:phone-info-card
operator: 中国联通
phone_number: 176****8888
balance_entity: sensor.176sheng_yu_hua_fei
# 样式自定义
background_color: '#ffffff'        # 卡片主背景
text_color: '#1e293b'              # 主文字颜色
secondary_color: '#64748b'        # 次要文字颜色
accent_color: '#3b82f6'            # 强调色（货币符号等）
card_background: '#f1f5f9'        # 子卡片/余额区背景
header_background: 'linear-gradient(135deg, #3b82f6, #06b6d4)'  # 顶部渐变
```

深色主题示例：

```yaml
type: custom:phone-info-card
operator: 中国联通
phone_number: 176****8888
balance_entity: sensor.176sheng_yu_hua_fei
background_color: '#1a1f2e'
text_color: '#f1f5f9'
secondary_color: '#94a3b8'
accent_color: '#06b6d4'
card_background: '#232b3a'
header_background: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
```

## 配置选项

### 数据配置

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `operator` | string | 否 | 中国联通 | 运营商名称 |
| `phone_number` | string | 否 | 176****8888 | 手机号码（脱敏显示） |
| `balance` | string | 否 | 711.99 | 剩余话费（元） |
| `balance_entity` | string | 否 | - | 剩余话费传感器实体 ID |
| `data_remaining` | string | 否 | 20.29 | 剩余流量（GB） |
| `data_remaining_entity` | string | 否 | - | 剩余流量传感器实体 ID |
| `data_used` | string | 否 | 2.07 | 已用流量（GB） |
| `data_used_entity` | string | 否 | - | 已用流量传感器实体 ID |
| `voice_remaining` | string | 否 | 92 | 剩余语音（分钟） |
| `voice_remaining_entity` | string | 否 | - | 剩余语音传感器实体 ID |
| `voice_used` | string | 否 | 8 | 已用语音（分钟） |
| `voice_used_entity` | string | 否 | - | 已用语音传感器实体 ID |
| `cost_used` | string | 否 | 43.22 | 已用话费（元） |
| `cost_used_entity` | string | 否 | - | 已用话费传感器实体 ID |
| `cycle_day` | number | 否 | 28 | 套餐周期已用天数 |
| `cycle_total` | number | 否 | 30 | 套餐周期总天数 |

> 💡 **提示**: 优先使用 `xxx_entity` 绑定传感器，数据会实时同步。直接写值则显示固定内容。

### 样式配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `background_color` | string | #ffffff | 卡片主背景色 |
| `text_color` | string | #1e293b | 主文字颜色 |
| `secondary_color` | string | #64748b | 次要文字颜色（标签等） |
| `accent_color` | string | #3b82f6 | 强调色（货币符号） |
| `card_background` | string | #f8fafc | 子卡片背景（余额区、数据卡片） |
| `header_background` | string | linear-gradient(135deg, #3b82f6, #06b6d4) | 顶部渐变/CSS 渐变 |

## 创建传感器示例

如果你需要通过 API 获取话费数据，可以创建一个传感器：

### 方法一：REST Sensor

```yaml
# configuration.yaml
sensor:
  - platform: rest
    name: phone_balance
    resource: https://api.example.com/phone/balance
    json_attributes:
      - balance
      - data_remaining
      - data_used
      - voice_remaining
      - voice_used
      - cost_used
    value_template: '{{ value_json.balance }}'
    unit_of_measurement: "元"
```

### 方法二：Command Line Sensor

```yaml
# configuration.yaml
sensor:
  - platform: command_line
    name: phone_balance
    command: "python3 /config/scripts/get_phone_balance.py"
    json_attributes:
      - balance
      - data_remaining
      - data_used
      - voice_remaining
      - voice_used
      - cost_used
    value_template: '{{ value_json.balance }}'
    unit_of_measurement: "元"
```

### 方法三：Template Sensor（组合多个传感器）

```yaml
# configuration.yaml
sensor:
  - platform: template
    sensors:
      phone_balance:
        friendly_name: "话费余额"
        value_template: "{{ states('sensor.phone_balance_raw') }}"
        attribute_templates:
          balance: "{{ states('sensor.phone_balance_raw') }}"
          data_remaining: "{{ states('sensor.data_remaining_raw') }}"
          data_used: "{{ states('sensor.data_used_raw') }}"
          voice_remaining: "{{ states('sensor.voice_remaining_raw') }}"
          voice_used: "{{ states('sensor.voice_used_raw') }}"
          cost_used: "{{ states('sensor.cost_used_raw') }}"
```

## 自动化更新示例

```yaml
automation:
  - alias: "更新话费信息"
    trigger:
      - platform: time
        at: "08:00:00"
      - platform: time
        at: "20:00:00"
    action:
      - service: homeassistant.update_entity
        target:
          entity_id: sensor.phone_balance
```

## 特性

- 🎨 现代设计，默认浅色主题
- 🌈 渐变色彩系统
- 📊 进度条可视化
- 📱 响应式布局
- 🔌 支持传感器实体绑定（实时更新）
- ⚙️ 支持手动配置
- 🎨 支持自定义背景/文字颜色

## 故障排除

### 卡片不显示

1. 确认 `phone-info-card.js` 已正确放置在 `/config/www/` 目录
2. 检查资源是否正确注册：设置 → 仪表板 → 资源
3. 清除浏览器缓存（Ctrl+Shift+Delete）
4. 检查浏览器控制台是否有错误（F12）

### 数据不更新

1. 检查传感器状态：开发者工具 → 状态
2. 确认传感器属性名称匹配
3. 查看传感器是否正常更新

## 许可证

MIT License
