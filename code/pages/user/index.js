// pages/user/index.js
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
    let oldData = wx.getStorageSync('plan')
    if (oldData) {
      this.setData({
        userList: JSON.parse(oldData)
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