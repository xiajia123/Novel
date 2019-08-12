const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    arr: [], // 接收大类接口数据
    list:[], // 接收排行接口
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 大类接口
  onLoad: function (options) {
    app.globalData.fly.get('/cats/lv2/statistics')
      .then(res => {
        this.setData({
          arr: res.data
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        // console.log(this.data.arr)
      }).catch(e => {
        console.log(e)
      })
    // 排行接口
    app.globalData.fly.get(`/ranking/gender`)
      .then(res => {
        this.setData({
          list: res.data
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
      }).catch(e => {
        console.log(e)
      })
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