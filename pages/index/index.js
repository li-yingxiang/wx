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
    // console.log(this.data.swiperList)
  },
  getSwiperList() {
    request({
      url: '/home/swiperdata'
    }).then((result) => {
      this.setData({
        swiperList: result
      })
    })
  },
  getCateList() {
    request({
      url: '/home/catitems'
    }).then((result) => {
      this.setData({
        cateList: result
      })
    })
  },
  getFloorList() {
    request({
      url: '/home/floordata'
    }).then((result) => {
      console.log(result)
      this.setData({
        floorList: result
      })
    })
  }
})