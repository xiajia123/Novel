const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    wx.hideLoading()
    let list = wx.getStorageSync('key')
    this.setData({
      arr : list
    })
  },
  details (e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `../read/read?item=${item}`,
    })
  },
  help() {
    wx.navigateTo({
      url: `../../pages/help/help`,
    })
  },
  edit () {
    this.setData({
      flag:true
    })
  },
  ok() {
    this.setData({
      flag: false
    })
  },
  delete (e) {
    console.log(e)
    let arr = wx.getStorageSync('key')
     arr = arr.filter(item=>{
      return JSON.stringify(item) !== JSON.stringify(e.currentTarget.dataset.item)
    })
    wx.setStorageSync('key',arr)
    let arr1 = wx.getStorageSync('key')
    this.setData({
      arr:arr1
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
    let list = wx.getStorageSync('key')
    this.setData({
      arr: list
    })
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