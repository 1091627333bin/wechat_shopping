import request from "../../util/request"

// pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[]
  },
  priceOrder:true,
  commentOrder:true,
  /**
   * 生命周期函数--监听页面加载
   */
  handlePrice(){
   
    this.setData({
      goodList:this.priceOrder?this.data.goodList.sort((item1,item2)=>item2.price-item1.price):this.data.goodList.sort((item1,item2)=>item1.price-item2.price)
    })
    this.priceOrder = !this.priceOrder
  },
  handleComment(){
    this.setData({
      goodList:this.commentOrder?this.data.goodList.sort((item1,item2)=>parseInt(item2.goodcomment) -parseInt(item1.goodcomment)):this.data.goodList.sort((item1,item2)=>parseInt(item1.goodcomment)-parseInt(item2.goodcomment))
    })
    this.commentOrder = !this.commentOrder
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getlist(options.id)
  },
  getlist(id){
    request({url:`/categories/${id}?_embed=goods`}).then((res)=>{
      console.log(res);
      this.setData({
        goodList:res.goods
      })
    })
  },
  handleChangePage(event){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${event.currentTarget.dataset.id}&name=${event.currentTarget.dataset.name}`,
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