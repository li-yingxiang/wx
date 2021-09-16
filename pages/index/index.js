// index.js
// 获取应用实例
const app = getApp()

Page({
  data:{
    swiperList:[]
  },
  onLoad(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
          console.log(result.data.message)
        this.setData({
            swiperList:result.data.message
        }) 
      },
    });
  },
  onShow(){
    console.log(this.data.swiperList)
  }
})
