//index.js
const api = require('../../utils/api') ;
import { md5 } from "../../utils/md5.js"
//获取应用实例
var app = getApp()
Page({
  data: {
    //当前语言
    currentLang: '中文',
    //翻译后文本显示
    translationText: '',
    //历史记录
    translationHistory: [],
    //回显历史记录
    seletHistory: ''
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
    let that = this 
    //百度翻译的option
    let beforeTranslationText = e.detail.value
    let salt = Math.floor(Math.random() * 100000 )
    let currentLangIndex = app.globalData.langIndex
    let currentLangAlias = app.globalData.langsArry[currentLangIndex]
    let option = {
      q : beforeTranslationText,
      from : 'auto',
      to : currentLangAlias,
      appid : api.BTAPPID,
      salt,
      sign: md5(api.BTAPPID + beforeTranslationText + salt + api.BTKey)
    }
    console.log(option)
    wx.request({
        url:api.apiBaiduURL.baiduTranslate,
        data:option,
        success(res){
          that.setData({ translationText: res.data.trans_result[0].dst })
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
    //记录每一次翻译之后的原文本
    this.data.seletHistory = beforeTranslationText
    app.globalData.seletHistory = beforeTranslationText
    this.setData({ seletHistory: app.globalData.seletHistory })
  },
  onShow: function () {
    this.setData({ currentLang: app.globalData.currentLang })
    this.setData({ seletHistory: app.globalData.seletHistory })
  }
})
