// pages/user/index.js
let timeUtil = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[]
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 拿到plan
    let that =this
    let oldData = wx.getStorageSync('plan')
    if (oldData) {
      let tempList=JSON.parse(oldData)
      let newTempList=[]
      tempList.map((currentValue,index,arr)=>{
        let tempData={
          startTime: timeUtil.formatTime(currentValue.startTime),
          name: currentValue.name,
          // 这个是任务完成的状态
          status: that.setListStatus(currentValue.startTime, currentValue.needTime)
        }
        newTempList.push(tempData)
      })
      this.setData({
        userList: newTempList
      })
    }
  },
  // 清空所有缓存
  cleanList:function(){
    wx.clearStorage()
    this.setData({
      userList: []
    })
  },
  /**
   * 这个是设置于任务的状态
   */
  setListStatus(startTime,needTime){
    // 以s为基础
    startTime=Number(new Date(startTime))/1000
    needTime = needTime*60
    let nowTime =Number(new Date())/1000
    console.log(nowTime)
    console.log(startTime)
    if (startTime + needTime > nowTime){
      return "未完成"
    }else{
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