//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    surplusTimeMin: 0,
    surplusTimeSec: 0,
    name: '',
    needTime: ''
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
    let tempData={
      name:this.data.name,
      needTime: this.data.needTime
    }
    let allData=[]
    let oldData = wx.getStorageSync('plan')
    if (oldData){
      allData = JSON.parse(oldData)
    }
    allData.push(tempData)
    wx.setStorage({
      key:"plan",
      data: JSON.stringify(allData),
    })
    this.timing(this.data.needTime)
  },
  // 时间加减
  timing: function (time) {
    let min = time
    let sec = 0
    let self = this
    let timer=setInterval( () =>{
      console.log("倒计时" + min + ':' + sec)
      if (min == 0&&sec==0) {
        // 倒计时到
        wx.showModal({
          title: '时间到',
          content: '',
        })
        clearInterval(timer)
      } else if (sec == 0) {
        min = min - 1
        sec = 59
      } else {
        sec = sec - 1
      }
      self.setData({
        surplusTimeSec: sec,
        surplusTimeMin: min
      })
    }, 1000)
  }
})
