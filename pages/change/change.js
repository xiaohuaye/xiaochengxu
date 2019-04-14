// pages/change/change.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    langsArry:[],
    langsArryChinese:[],
    currentLang: '',
    currentLangIndex: null
  },
  selectLang :function(e){
    console.log(e)
    this.setData({currentLang : e.currentTarget.dataset.lang})
    this.setData({currentLangIndex : e.currentTarget.dataset.index})
    app.globalData.currentLang = this.data.currentLang
    app.globalData.langIndex = this.data.currentLangIndex
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({langsArry : app.globalData.langsArry})
    this.setData({langsArryChinese : app.globalData.langsArryChinese})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({currentLang : app.globalData.currentLang})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})