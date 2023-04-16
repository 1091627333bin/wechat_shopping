// pages/detail/detail.js
import request from "../../util/request"
import checkAuth from "../../util/checkAuth"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    current: 0,
    commentList: []
  },
  handleTap(event) {
    wx.previewImage({
      current: event.target.dataset.current,
      urls: this.data.info.slides.map(function (item) {
        return "http://localhost:5000" + item
      }),
    })
  },
  handleActive(event) {
    console.log(event.target.dataset.index);
    this.setData({
      current: event.target.dataset.index
    })
  },
  handleAdd() {
    checkAuth(() => {
      const {
        nickName
      } = wx.getStorageSync('token')
      const tel = wx.getStorageSync('tel')
      const id = this.data.info.id
      request({
        url: "/carts",
        data: {
          tel,
          goodId: id,
          username: nickName
        }
      }).then((res) => {
        console.log(res);
        if (res.length === 0) {
          return request({
            url: "/carts",
            method: "POST",
            data: {
              tel,
              goodId: id,
              username: nickName,
              checked: false,
              number: 1
            }
          })
        }
        else{
          return request({
            url:`/carts/${res[0].id}`,
            method:"PUT",
            data:{
              ...res[0],
              number:res[0].number+1
            }
          })
        }
      }).then(res=>{
        wx.showToast({
          title: '加入购物车成功',
        })
      })
    })
  },
  handleJump(){
    wx.switchTab({
      url: '/pages/shopcart/shopcart',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    request({
      url: `/goods/${options.id}`
    }).then((res) => {
      this.setData({
        info: res
      })
    })
    this.getCommentInfo()
  },
  getCommentInfo() {
    request({
      url: `/comments`
    }).then((res) => {
      this.setData({
        commentList: res
      })
    })
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