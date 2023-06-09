// pages/home/home.js
import request from '../../util/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    goodList:[]
  },
  current:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.renderSwiper()
    this.renderGoods()
  },
  renderSwiper(){
    request({url:"/recommends"}).then((res)=>{
      this.setData({
        swiperList:res
      })
    })
  },
  renderGoods(){
    request({url:`/goods?_page=${this.current}&_limit=5`},true).then((res)=>{
      this.setData({
        goodList:[...this.data.goodList,...res.list],
        total:res.total
      })
    })
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
      setTimeout(() => {
          wx.stopPullDownRefresh()
      }, 500);
  },
  handleEvent(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  handleChangePage(event){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}&name=${event.currentTarget.dataset.name}`,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.goodList.length == this.data.total){
      return
    }
    this.current ++ 
    this.renderGoods()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})