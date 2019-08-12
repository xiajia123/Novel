const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    active: 0,
    arr: [],
    list: [],
    list1: [], // 随机数
    bookshelf: [], //书架
    flag: true,
    book: "加入书架"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let arr = wx.getStorageSync('key')
    if (arr) {
      arr.map(item => {
        if (item._id === options.id) {
          this.setData({
            book: "已加入书架",
          })
        }
      })
    }
    // 书籍详情
    app.globalData.fly.get('/book/' + options.id)
      .then(res => {
        this.setData({
          obj: res.data,
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
      }).catch(e => {
        console.log(e)
      })
    // 评论
    app.globalData.fly.get(`/post/review/by-book?book=${options.id}`)
      .then(res => {
        this.setData({
          arr: res.data.reviews
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        // console.log(res.data.reviews)
      }).catch(e => {
        console.log(e)
      })
    // 相关推荐
    app.globalData.fly.get(`/book/${options.id}/recommend`)
      .then(res => {
        this.setData({
          list1: res.data.books
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        let testArray = res.data.books;
        if (!Array.prototype.derangedArray) {
          Array.prototype.derangedArray = function() {
            for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
            return this;
          };
        }
        let arr = testArray.derangedArray().slice(0, 3)
        // console.log(testArray.derangedArray()); //结果不唯一
        this.setData({
          list: arr
        })
        // console.log(res.data)
      }).catch(e => {
        console.log(e)
      })
  },
  // 换一换
  change() {
    let testArray = this.data.list1;
    if (!Array.prototype.derangedArray) {
      Array.prototype.derangedArray = function() {
        for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
      };
    }
    let arr1 = testArray.derangedArray().slice(0, 3)
    console.log(testArray.derangedArray()); //结果不唯一
    this.setData({
      list: arr1
    })
  },
  // 开始阅读
  Read(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `../read/read?item=${item}`,
    })
    console.log(e)
  },
  // 加入书架
  join() {
    this.setData({
      book: "已加入书架",
    })
    if (!wx.getStorageSync('key')) {
      wx.setStorageSync('key', this.data.bookshelf)
    }
    let arr = wx.getStorageSync('key')
    arr.map(item => {
      if (JSON.stringify(item) === JSON.stringify(this.data.obj)) {
        this.setData({
          flag: false
        })
      }
    })
    if (this.data.flag === true) {
      this.data.obj.num = 1
      arr.push(this.data.obj)
    }
    this.setData({
      flag: true
    })
    wx.setStorageSync('key', arr)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 2000
    })
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