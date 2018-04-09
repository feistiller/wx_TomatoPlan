// pages/user/index.js
const app = getApp()
let util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    url: app.globalData.url
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let newTempList = []
    let that =this
    // 拿到plan
    app.getUserOpenId(function (openId) {
      wx.request({
        url: app.globalData.url + 'api/showPlans',
        data: {
          openId: openId
        },
        method: 'post',
        success: res1 => {
          if (res1.data.code === 0) {
            res1.data.data.map(function (item) {
              let temp_array = {
                startTime: util.formatTime(item.startTime*1000),
                name: item.eventTitle,
                status: that.setListStatus(item.status)
              }
              newTempList.push(temp_array)
            })
            that.setData({
              userList: newTempList
            })
            console.log(newTempList)
          } else {
            wx.showLoading({
              title: res1.data.message,
              duration: 1000
            })
          }
        }
      })
    })
  },
  // 清空所有缓存
  cleanList: function () {
    let that=this
    app.getUserOpenId(function (openId) {
      wx.request({
        url: app.globalData.url + 'api/delPlans',
        data: {
          openId: openId
        },
        method: 'post',
        success: res1 => {
          wx.showLoading({
            title: res1.data.message,
            duration: 1000,
            complete:()=>{
              that.setData({
                userList: []
              })
            }
          })
          
        }
      })

    })
  },
  /**
   * 这个是设置于任务的状态
   */
  setListStatus(s) {
    if (s == 1) {
      return "未完成"
    } else {
      return "已到期"
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})