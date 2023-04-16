function request(params,isHeader=false) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      ...params,
      url: "http://localhost:5000" + params.url,
      success: (result) => {
        if(isHeader){
          resolve({
            list:result.data,
            total:result.header["X-Total-Count"]
          })
        }
        else{
          resolve(result.data)
        }
        
      },
      fail: (res) => {
        reject(res)
      },
      complete: () => {
        wx.hideLoading({
        })
      }
    })
  })
}

export default request