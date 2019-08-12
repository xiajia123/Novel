const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typelist: [{
        id: "hot",
        name: "热门"
      },
      {
        id: "new",
        name: "新书"
      },
      {
        id: "reputation",
        name: '好评'
      },
      {
        id: "over",
        name: '完结'
      },
      {
        id: "monthly",
        name: "VIP"
      }
    ],
    active: 0,
    arr: [],
    list: [],
    cla: "hot",
    arr1: [],
    name: "",
    type: "",
    name1: "",
    start: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 分类传过来的name
  onLoad: function(options) {
    this.setData({
      name: options.name,
      type: options.type
    })
    // console.log(options)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    app.globalData.fly.get('/cats/lv2')
      .then(res => {
        this.setData({
          arr: res.data[options.type]
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        this.data.arr.map(item => {
          if (item.major === options.name) {
            item.mins.unshift("全部")
            this.setData({
              list: item.mins
            })
            // console.log(this.data.list)
          }
        })
        // console.log(this.data.arr)
      }).catch(e => {
        console.log(e)
      })
    app.globalData.fly.get(`/book/by-categories?gender=${options.type}&type=${this.data.cla}&major=${options.name}&start=${this.data.start}&limit=20`)
      .then(res => {
        this.setData({
          arr1: res.data.books
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
      }).catch(e => {
        console.log(e)
      })
  },
  click(e) {
    this.setData({
      cla: this.data.typelist[e.detail.index].id
    })
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.type}&type=${this.data.cla}&major=${this.data.name}&start=${this.data.start}&limit=20`)
      .then(res => {
        this.setData({
          arr1: res.data.books
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        // console.log(this.data.arr1)
      }).catch(e => {
        console.log(e)
      })
    // console.log(this.data.cla)
  },
  clickItem(e) {
    console.log(e)
    this.setData({
      name1: e.detail.title,
    })
    if (this.data.name1 === "全部") {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.type}&type=${this.data.cla}&major=${this.data.name}&start=${this.data.start}&limit=20`)
        .then(res => {
          this.setData({
            arr1: res.data.books
          })
          wx.showLoading({
            title: '加载中'
          })
          wx.hideLoading()
          // console.log(this.data.arr1)
        }).catch(e => {
          console.log(e)
        })
    } else {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.type}&type=${this.data.cla}&major=${this.data.name}&minor=${this.data.name1}&start=${this.data.start}&limit=20`)
        .then(res => {
          this.setData({
            arr1: res.data.books
          })
          wx.showLoading({
            title: '加载中'
          })
          wx.hideLoading()
          // console.log(this.data.arr1)
        }).catch(e => {
          console.log(e)
        })
      // console.log(this.data.name1)
    }
  },
  details(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/details/details?id=${id}`,
    })
    // console.log(e.currentTarget.dataset.id)
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
    this.setData({
      start:this.data.start+20
    })
    app.globalData.fly.get(`/book/by-categories?gender=${this.data.type}&type=${this.data.cla}&major=${this.data.name}&start=${this.data.start}&limit=20`)
      .then(res => {
        let arr = this.data.arr1.concat(res.data.books)
        this.setData({
          arr1: arr
        })
        // console.log(arr)
      }).catch(e => {
        console.log(e)
      })
    if (this.data.name1 === "全部") {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.type}&type=${this.data.cla}&major=${this.data.name}&start=${this.data.start}&limit=20`)
        .then(res => {
          let arr = this.data.arr1.concat(res.data.books)
          this.setData({
            arr1: arr
          })
          // console.log(this.data.arr1)
        }).catch(e => {
          console.log(e)
        })
    } else {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.type}&type=${this.data.cla}&major=${this.data.name}&minor=${this.data.name1}&start=${this.data.start}&limit=20`)
        .then(res => {
          let arr = this.data.arr1.concat(res.data.books)
          this.setData({
            arr1: arr
          })
          // console.log(this.data.arr1)
        }).catch(e => {
          console.log(e)
        })
      // console.log(this.data.name1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})