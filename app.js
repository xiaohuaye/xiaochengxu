//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null,
    langsArry:["zh","en","yue",'wyw','jp','kor','fra','spa','th','ara',"ru","pt","de",'it','el','nl','pl','bul','est','dan','fin','cs','rom','slo','swe','hu','cht','vie'],
    langsArryChinese:['中文',"英语","粤语",'文言文','日语','韩语','法语','西班牙','泰语',"阿拉伯语","俄语","葡萄牙语",'德语','意大利语','希腊语','荷兰语','波兰语','保加利亚语','爱沙尼亚语','丹麦语','芬兰语','捷克语','罗马尼亚语','斯洛文尼亚语','瑞典语','匈牙利语','繁体中文','越南语'],
    langIndex:0,
    currentLang: '中文',
    seletHistory : null
  }
})



