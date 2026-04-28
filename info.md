# 话费信息卡片

![预览](https://via.placeholder.com/400x300/1a1f2e/06b6d4?text=Phone+Info+Card)

显示手机话费、流量、语音使用情况的 Home Assistant Lovelace 卡片。

## 安装

点击右上角 "下载" 按钮后，重启 Home Assistant。

## 配置

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
```

更多配置选项请查看 [README.md](README.md)
