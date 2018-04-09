//index.js
//获取应用实例
const app = getApp()
let utils = require('../../utils/util.js')
let music = require('../../utils/music.js')
Page({
  data: {
    surplusTimeMin: '00',
    surplusTimeSec: '00',
    name: '',
    needTime: '',
    url: app.globalData.url
  },
  onLoad: function () {
  },
  // 设定时间和名称
  setName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  setTime: function (e) {
    this.setData({
      needTime: e.detail.value
    })
  },
  // 计时开始
  timeStart: function () {
        if (this.data.name == '' || !Number.isInteger(Number(this.data.needTime))){
      wx.showLoading({
        title: '输入格式错误',
        duration:2000
      })
    }else{
      let that=this
    // 取消本地备份改为上传保存至服务器.
    app.getUserOpenId(function(openId){
      wx.request({
        url: app.globalData.url + 'api/savePlan',
        data: {
          name: that.data.name,
          needTime: that.data.needTime,
          startTime: new Date().getTime()/1000,
          openId:openId
        },
        method: 'post',
        success: res1 => {
          if (res1.data.code === 0) {
            that.timing(that.data.needTime)
          }else{
            wx.showLoading({
              title: res1.data.message,
              duration:1000
            })
          }
        }
      })
    })
    }
  },
  // 时间加减
  timing: function (time) {
    let min = time
    let sec = 0
    let self = this
    let showMin='00'
    let showSec='00'
    let timer=setInterval( () =>{
      console.log("倒计时" + min + ':' + sec)
      if (min == 0&&sec==0) {
        // 倒计时到
        wx.vibrateLong()
        music.innerAudioContext.play()
        wx.showModal({
          title: '时间到',
          content: '您任务的时间已经到了哦~请开始下一个任务',
          showCancel:false,
          success: (res)=>{
            if (res.confirm) {
              music.innerAudioContext.stop()
            }
          }
        })
        clearInterval(timer)
      } else if (sec == 0) {
        min = min - 1
        sec = 59
      } else {
        sec = sec - 1
      }
      // 格式化下，更好看
      if (min < 10) {
        showMin = '0' + min
      } else {
        showMin = min
      }
      if (sec < 10) {
        showSec = '0' + sec
      } else {
        showSec = sec
      }
      self.setData({
        surplusTimeSec: showSec,
        surplusTimeMin: showMin
      })
    }, 1000)
  }
})
