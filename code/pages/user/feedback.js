// pages/user/feedback.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
// 表单提交方法e.detail.value.textarea
  bindFormSubmit:function(e){
    let that = this
    app.getUserOpenId(function (openId) {
      wx.request({
        url: app.globalData.url + 'wx_api/userFeedback',
        data: {
          openId: openId,
          text: e.detail.value.text,
          email: e.detail.value.email
        },
        method: 'post',
        success: res1 => {
          wx.showLoading({
            title: res1.data.message,
            duration: 1000,
            complete: () => {
              wx.switchTab({
                url: '/pages/user/index'
              })
            }
          })

        }
      })
    })
  }
})