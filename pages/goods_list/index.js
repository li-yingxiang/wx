// pages/goods_list/index.js
import {
    request
} from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[
            {
                id:0,
                value:"综合",
                isActive:true
            },
            {
                id:1,
                value:"销量",
                isActive:false
            },
            {
                id:2,
                value:"价格",
                isActive:false
            },
        ],
        goodsList:[]
    },
    QueryParams:{
        cid:"",
        query:"",
        pagenum:1,
        pagesize:10
    },
    // 总页数
    totalPages:1,
    // tabs 标题点击事件 
    handleTabsItemChange(e){
        const {index} = e.detail;
        // 修改原数组
        let {tabs} = this.data
        tabs.forEach((v,i)=>{
            i===index?v.isActive=true:v.isActive = false
        })
        this.setData({
            tabs
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        setTimeout(function(){
            wx.hideLoading()
        },5000)
        console.log(options)
        this.QueryParams.cid = options.cid
        console.log(this.QueryParams.cid)
        this.getGoodsList()
    },
    // 获取上商品列表数据
    async getGoodsList(){
       const res = await request({url:"/goods/search",data:this.QueryParams})
       //   获取总条数
       console.log('res:',res)
       const total = res.total
       this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
        // 关闭下拉刷新窗口
       this.setData({
           goodsList: [...this.data.goodsList,...res.goods]  
       })
       wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // 重置数据
       this.setData({
           goodsList:[]
       })
        // 重置页码
        this.QueryParams.pagenum = 1;
        // 重新发送请求
        this.getGoodsList()
        // 数据请求成功 手动关闭等待效果
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    console.log("页面到底")
    // 判断有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
    // 没有
    wx.showToast({
      title: '没有下一页数据量',
    })
    }else{
        this.QueryParams.pagenum++
        this.getGoodsList()
    }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})