const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    arr: [],// 搜索数据
    num: 0,
    list: [],// 换一换
    flag: true,
    history: "",
    list1: [], // 搜索历史
    iconColor: [
      'red', 'orange', 'pink', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ], // 换一换颜色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.globalData.fly.get('/book/hot-word')
      .then(res => {
        let testArray = res.data.hotWords;
        if (!Array.prototype.derangedArray) {
          Array.prototype.derangedArray = function () {
            for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
            return this;
          };
        }
        let arr = testArray.derangedArray().slice(0, 6)
        // console.log(testArray.derangedArray());//结果不唯一
        this.setData({
          list: arr
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    this.setData({
      list1: wx.getStorageSync('History')
    })
  },
  // 换一换
  change() {
    // 换热搜
    let testArray = this.data.list;
    if (!Array.prototype.derangedArray) {
      Array.prototype.derangedArray = function () {
        for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
      };
    }
    let arr1 = testArray.derangedArray().slice(0, 6)
    // console.log(testArray.derangedArray());//结果不唯一
    this.setData({
      list: arr1
    })
    // 换字体颜色
    let color = this.data.iconColor;
    if (!Array.prototype.derangedArray) {
      Array.prototype.derangedArray = function () {
        for (let j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
      };
    }
    let arr2 = color.derangedArray()
    // console.log(testArray.derangedArray());//结果不唯一
    this.setData({
      iconColor: arr2
    })
  },
  inp(e) {
    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${e.detail}`)
      .then(res => {
        this.setData({
          arr: res.data.books,
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        // console.log(res.data.books)
      }).catch(e => {
        console.log(e)
      })
    if (e.detail === '') {
      this.setData({
        num: 0
      })
    } else {
      this.setData({
        num: 1
      })
    }
    if (e.detail !== '') {
      this.setData({
        history: e.detail
      })
    }
  },
  details(e) {
    if (this.data.list1 === '') {
      this.setData({
        list1:[]
      })
    }
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../../pages/details/details?id=${id}`,
    })
    if (!wx.getStorageSync('History')) {
      wx.setStorageSync('History', this.data.list1)
    }
    let arr = wx.getStorageSync('History')
    arr.map(item => {
      if (item === this.data.history) {
        this.setData({
          flag: false
        })
      }
    })
    if (this.data.flag === true) {
      arr.push(this.data.history)
    }
    this.setData({
      list1:arr
    })
    wx.setStorageSync('History', arr)
  },
  dele() {
    let arr = []
    this.setData({
      list1:arr
    })
    wx.setStorageSync('History', arr)
  },
  // 换一换搜索
  value (e) {
    let item = e.currentTarget.dataset.item
    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${item}`)
      .then(res => {
        this.setData({
          arr: res.data.books,
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        // console.log(res.data.books)
      }).catch(e => {
        console.log(e)
      })
    this.setData({
      num: 1,
      value: item
    })
  },
  // 历史记录搜索
  History (e) {
    let item = e.currentTarget.dataset.item
    console.log(item)
    app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${item}`)
      .then(res => {
        this.setData({
          arr: res.data.books,
        })
        wx.showLoading({
          title: '加载中'
        })
        wx.hideLoading()
        // console.log(res.data.books)
      }).catch(e => {
        console.log(e)
      })
    this.setData({
      num: 1,
      value: item
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
    let arr = wx.getStorageSync('History', arr)
    this.setData({
      list1:arr
    })
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