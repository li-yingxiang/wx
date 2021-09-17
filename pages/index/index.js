// index.js
// 获取应用实例
import {
  request
} from "../../request/index.js";
const app = getApp()
Page({
  data: {
    // 轮播
    swiperList: [],
    // 导航
    cateList: [],
    floorList: []
  },
  onLoad() {
    // 获取轮播图
    this.getSwiperList()
    // 获取轮播
    this.getCateList()
    this.getFloorList()
  },
  onShow() {
    console.log(this.data.swiperList)
  },
  getSwiperList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
    }).then((result) => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  getCateList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'
    }).then((result) => {
      this.setData({
        cateList: result.data.message
      })
    })
  },
  getFloorList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'
    }).then((result) => {
      console.log(result)
      this.setData({
        floorList: result.data.message
      })
    })
  }
})