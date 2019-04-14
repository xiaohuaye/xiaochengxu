//index.js
const api = require('../../utils/api') ;
import { md5 } from "../../utils/md5.js"
//获取应用实例
var app = getApp()
Page({
  data: {
    currentLang: '中文',
    translationText: '',
    translationHistory: []
  },
  onLoad: function () {
    let that = this
    //获取本地的信息
    wx.getStorage({
      key: 'currentLang',
      success(res) {
        that.setData({ currentLang: res.data })
      },
      fail() {
        wx.setStorage({
          key: 'currentLang',
          data: '中文'
        })
      }
    })
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
    //百度翻译的option
    let beforeTranslationText = e.detail.value
    let salt = Math.floor(Math.random() * 100000 )
    let currentLangIndex = app.globalData.langIndex
    let currentLangAlias = app.globalData.langsArry[currentLangIndex]
    let option = {
      q : beforeTranslationText,
      from : 'auto',
      to : currentLangAlias,
      appid : new Number(api.BTAPPID) - 1,
      salt,
      sign: md5(api.BTAPPID + beforeTranslationText + salt + api.BTKey)
    }
    console.log(option)
    wx.request({
        url:api.apiBaiduURL.baiduTranslate,
        data:option,
        success(res){
          console.log(res)
        },
        fail(res){
          console.log(res)
        }
      })
    //本地持久化历史记录
    this.data.translationHistory.push(beforeTranslationText)
    let translationHistory = this.data.translationHistory
    this.setData({translationHistory})
    wx.setStorage({
      key: 'translationHistory',
      data: translationHistory
    })
  },
  onShow: function () {
    this.setData({ currentLang: app.globalData.currentLang })
  }
})
