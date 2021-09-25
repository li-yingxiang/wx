// pages/goods_detail/index.js
// 图片点击预览调用wx api previweImage
import {
    request
} from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {}
    },
    //商品對象
    GoodsInfo:[],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.goods_id)
        const {
            goods_id
        } = options
        this.getGoodsDetail(goods_id)
    },
    // 获取商品详情数据
    async getGoodsDetail(goods_id) {
        const goodsObj = await request({
            url: "/goods/detail",
            data: {
                goods_id
            }
        })
        this.GoodsInfo = goodsObj
        this.setData({
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                // 可能存在webp格式 正则替换
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: goodsObj.pics
            }
        })
    },
    // 放大预览
    handlePrevewImage(e) {
        const current = e.currentTarget.dataset.url;
        const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
        wx.previewImage({
            current,
            urls
        });
    },
    // 点击加入购物车
    handleCart(){
        let cart = wx.getStorageSync("cart")||[];
        let index = -1
        for(let i = 0;i<cart.length;i++){
            if(cart[i].goods_id===this.GoodsInfo.goods_id){
                index = i
            }else{
                index = -1
            }
        }
        if(index == -1){
            this.GoodsInfo.num = 1;
            this.GoodsInfo.checked = true;
            cart.push(this.GoodsInfo)
        }else{
            console.log("已经tianjiaguo")
            cart[index].num++
        }
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '加入成功',
            icon:'success',
            mask:true
        });
    }


})