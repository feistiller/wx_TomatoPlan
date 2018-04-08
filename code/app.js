//app.js
App({
  onLaunch: function () {
    let that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.getUserAllData(function () {
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序
              that.getUserAllData(function () {
              })
            },
            fail(err) {
              wx.showModal({
                title: '不授权可正常使用',
                content:'不需要授权啦~但可能造成显示问题，如果一次看到这个提示，那是因为tx一段时间不允许获取该权限'
              })
              that.getUserAllData(function(){
              })
            }
          })
        }
      }
    })
  },
  // 获取openid
  getUserOpenId: function (cb) {
    let that = this
    if (this.globalData.userOpenId) {
      typeof cb == "function" && cb(this.globalData.userOpenId)
    } else {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发起网络请求
            wx.request({
              url: that.globalData.url + 'wx_api/saveCode',
              data: {
                code: res.code
              },
              success: res1 => {
                if (res1.data.code === 0) {
                         // that.globalData.userOpenId = 'o8_Ec0QbeBoRoJxsVHRUrtWODUUo'
                  that.globalData.userOpenId = res1.data.data.openId
                  typeof cb == "function" && cb(that.globalData.userOpenId)
                } else {
                  wx.showLoading({
                    title: res1.data.message,
                  })
                }
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  // 获得用户的资料
  getUserAllData(cb) {
    let that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      that.getUserOpenId(function(openId){
        console.log(openId)
        //调用后台接口
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            wx.request({
              url: that.globalData.url + 'wx_api/saveUserData',
              data: {
                userOpenId: openId,
                status: 1,
                userInfo: res.userInfo
              },
              method: 'post',
              success: res1 => {
                if (res1.data.code === 0) {
                  that.globalData.userInfo = res.userInfo
                } else {
                  wx.showLoading({
                    title: res1.data.message,
                  })
                }
              }
            })
            typeof cb == "function" && cb(that.globalData.userInfo)
          },
          // 用户不同意时,创建一个空的用户
          fail(err) {
            wx.request({
              url: that.globalData.url + 'wx_api/saveUserData',
              data: {
                userOpenId: openId,
                status: 2,
                userInfo: null
              },
              method: 'post',
              success: res1 => {
                if (res1.data.code === 0) {
    
                }
              }
            })
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      })
     
    }
  },
  globalData: {
    userInfo: null,
    url: 'http://localhost:899/',
    // url:''
    userOpenId: ''
  }
})