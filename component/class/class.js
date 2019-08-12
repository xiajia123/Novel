// component/class/class.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arr: {
      type: Array // 分类传过来的数组
    },
    list:{
      type:Array // 排行传过来的数组
    },
    type:{
      type:String // 分类传过来的类型
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 分类传name
      click(e){
        let type = this.data.type
        let name = e.currentTarget.dataset.item.name
        wx.navigateTo({
          url: `../../pages/minclass/minclass?name=${name}&type=${type}`,
        })
      },
      // 排行榜传id
      Ranking(e) {
        let item = JSON.stringify(e.currentTarget.dataset.item)
        wx.navigateTo({
          url: `../../pages/ranking/ranking?name=${item}`,
        })
      }
  }
})
