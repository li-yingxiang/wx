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
        rightContent: [],
        // 左侧标签索引
        currentIndex:0,
        // 右侧滚动条距离顶部距离
        scrollTop:0
    },
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 请求前判断本地有没有缓存 小程序本地存储
        const cates = wx.getStorageSync("cates");
        if(!cates){
            this.getCass()
        }else{
            // 判断有没有过期
            if(Date.now()-cates.time>1000*10){
                this.getCass()
            }else{
                this.Cates = cates.data;
                let leftMenuList = this.Cates.map(v=>v.cat_name)
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    async getCass() {
        // request({
        //     url: "/categories"
        // }).then((res) => {
        //     // console.log(res.data.mess)
        //     this.Cates = res.data.message;
        //      // 存入缓存
        //      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
        //     let leftMenuList = this.Cates.map(v=>v.cat_name)
        //     let rightContent = this.Cates[0].children
        //     this.setData({
        //         leftMenuList,
        //         rightContent
        //     })
        // })
        const res = await request({url: "/categories"})
            this.Cates = res;
             // 存入缓存
             wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
            let leftMenuList = this.Cates.map(v=>v.cat_name)
            let rightContent = this.Cates[0].children
            this.setData({
                leftMenuList,
                rightContent
            })
    },
    handleItemTap(e){
        const index =  e.currentTarget.dataset.index
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex : index,
            rightContent,
            scrollTop:0
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