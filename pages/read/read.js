const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    list: [],
    list1: [],
    num: 0,
    item: "",
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.item = JSON.parse(options.item)
    wx.setNavigationBarTitle({
      title: this.data.item.title,
    })
    this.setData({
      id: this.data.item._id,
      num: this.data.item.num - 1
    })
    console.log(this.data.id)
    app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`)
      .then(res => {
        this.setData({
          arr: res.data.mixToc.chapters,
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        let link = this.data.arr[0].link
        app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
          .then(res => {
            this.data.list.push(res.data.chapter)
            this.setData({
              list1: this.data.list
            })
            wx.showLoading({
              title: '加载中'
            })
            wx.hideLoading()
          }).catch(e => {
            console.log(e)
          })
        // console.log(res.data)
      }).catch(e => {
        console.log(e)
      })
  },
  bottom() {
    if (this.data.num < this.data.arr.length - 1) {
      if (this.data.num >= this.data.arr.length - 1) {
        wx.showToast({
          title: '已是最后一章',
          icon: 'success',
          duration: 2000
        })
      }
      this.setData({
        num: this.data.num + 1
      })
      let link = this.data.arr[this.data.num].link
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
        .then(res => {
          this.data.list.push(res.data.chapter)
          wx.showLoading({
            title: '加载中'
          })
          wx.hideLoading()
        }).catch(e => {
          console.log(e)
        })
      let arr = wx.getStorageSync('key')
      if (arr) {
        arr.map(item => {
          if (item._id === this.data.id) {
            item.num = this.data.num + 1
          }
        })
        wx.setStorageSync('key', arr)
      }
    }  
  },
  top() {
    if (this.data.num > 0) {
      if (this.data.num <= 1) {
        wx.showToast({
          title: '已是第一章',
          icon: 'success',
          duration: 2000
        })
      }
      this.setData({
        num: this.data.num - 1
      })
      let link = this.data.arr[this.data.num].link
      app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
        .then(res => {
          this.data.list.push(res.data.chapter)
          wx.showLoading({
            title: '加载中'
          })
          wx.hideLoading()
        }).catch(e => {
          console.log(e)
        })
      let arr = wx.getStorageSync('key')
      if (arr) {
        arr.map(item => {
          if (item._id === this.data.id) {
            item.num =  this.data.num + 1
          }
        })
        wx.setStorageSync('key', arr)
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})