//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    lang: 'xibanya',
    translationText: '',
    translationHistory: []
  },
  onLoad: function () {
    app.globalData.lang = this.data.lang
    let that = this
    //获取本地的信息
    wx.getStorage({
      key: 'translationHistory',
      success(res) {
        that.setData({ translationHistory: res.data })
      },
      fail() {
        wx.setStorage({
          key: 'translationHistory',
          data: '[]'
        })
      }
    })
  },
  //事件处理函数
  bindTextAreaBlur: function (e) {
    this.setData({ translationText: e.detail.value })
    this.data.translationHistory.push(e.detail.value)
    let translationHistory = this.data.translationHistory
    this.setData({translationHistory})
    console.log(translationHistory)
    wx.setStorage({
      key: 'translationHistory',
      data: translationHistory
    })
  },
  onShow: function () {
    this.setData({ lang: app.globalData.lang })
  }
})
