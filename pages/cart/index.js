// pages/cart/index.js
/*
 1、获取收获地址
      调用内置api 获取地址
 2、 获取本地地址 设置地址
 3、onShow 渲染
 4  全选
*/
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        allChecked:false,
        totalPrice:0,
        totalNum:0
        
    },
    // 点击获取收货地址
    handleChooseAddress(){
        wx.chooseAddress({
          success: (address) => {
            address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
            wx.setStorageSync("address", address);  
            address
          },
        })
    },
    // 商品的选中
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
       const address = wx.getStorageSync("address");
       const cart = wx.getStorageSync("cart")||[];
        // 计算全选
    //    const allChecked = cart.length ? cart.every(v=>v.checked) : false;
       let allChecked =true;
       let totalPrice = 0;
       let totalNum = 0;
       cart.forEach(v=>{
           if(v.checked){
               totalPrice += v.num*v.goods_price;
               totalNum+=v.num
           }else{
               allChecked=false
           }
       })
       allChecked = cart.length!=0 ? allChecked : false
       this.setData({
           address,
           cart,
           allChecked,
           totalPrice,
           totalNum
       })
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