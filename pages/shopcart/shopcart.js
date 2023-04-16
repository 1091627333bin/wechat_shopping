// pages/shopcart/shopcart.js
import request from "../../util/request"
import checkAuth from "../../util/checkAuth"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      type: 'warn',
      text: '删除'
    }],
    cartslist: [],
  },
  //删除商品
  slideButtonTap(event) {
    // this.setData({
    //   cartslist:this.data.cartslist.filter((item)=>item.id!==event.target.dataset.id)
    // })
    request({
      url: `/carts/${event.target.dataset.id}`,
      method: 'DELETE'
    })
  },
  //选中
  handleCheck(event) {
    let item = event.target.dataset.item
    item.checked = !item.checked
    this.handleUpdate(item)
  },
  handlereduce(event) {
    let item = event.target.dataset.item
    if (item.number > 0) {
      item.number--
      this.handleUpdate(item)
    }


  },
  handleadd(event) {
    let item = event.target.dataset.item
    item.number++
    this.handleUpdate(item)
  },

  handleUpdate(item) {
    request({
      url: `/carts/${item.id}`,
      method: 'PUT',
      data: {
        "username": item.username,
        "number": item.number,
        "tel": item.tel,
        "goodId": item.goodId,
        "checked": item.checked
      }
    })
  },
  handleAllCheck(event) {

    if (event.detail.value.length === 0) {
      this.setData({
        cartslist: this.data.cartslist.map((item) => {
          return {
            ...item,
            checked: false
          }
        })
      })
      this.data.cartslist.forEach(element => {
        request({
          url: `/carts/${element.id}`,
          method: 'PUT',
          data: {
            "username": element.username,
            "number": element.number,
            "tel": element.tel,
            "goodId": element.goodId,
            "checked": false
          }
        })
      });
    } else {
      this.setData({
        cartslist: this.data.cartslist.map((item) => {
          return {
            ...item,
            checked: true
          }
        })
      })
      this.data.cartslist.forEach(element => {
        request({
          url: `/carts/${element.id}`,
          method: 'PUT',
          data: {
            "username": element.username,
            "number": element.number,
            "tel": element.tel,
            "goodId": element.goodId,
            "checked": true
          }
        })
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    checkAuth(() => {
      const {
        nickName
      } = wx.getStorageSync('token')
      const tel = wx.getStorageSync('tel')
      request({
        url: `/carts?username=${nickName}&tel=${tel}&_expand=good`
      }).then((res) => {
        console.log(res);
        this.setData({
          cartslist: res
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})