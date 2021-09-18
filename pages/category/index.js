// pages/category/index.js
import {
    request
} from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 左侧菜单数据
        leftMenuList: [],
        // 右侧菜单数据
        rightContent: []
    },
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCass()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    getCass() {
        request({
            url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
        }).then((res) => {
            console.log(res.data.mess)
            this.Cates = res.data.message;
            console.log(this.Cates)
            let leftMenuList = this.Cates.map(v=>v.cat_name)
            let rightContent = this.Cates[0].children
            this.setData({
                leftMenuList,
                rightContent
            })
        })
    },
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})