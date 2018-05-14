// pages/search/search.js
var mydata = require('../../data/search.js');

var app;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchKey: '',
        sBackgroundImg: {},
        clearFlag: true,
        resultFlag: true,
        result: ''
    },
    /**清空输入框 */
    clearSearch: function () {
        // console.log('clear key')
        this.setData({
            searchKey: "",
            clearFlag: true,
            resultFlag: true,
            result: ""
        })

        utils.showSuccess('清空');
    },
    /**监听文本输入 */
    keyInput: function (e) {
        var that = this;
        var searchKey = e.detail.value;


        //清空结果集
        that.setData({
            result: ""
        })

        // 请求关键字地图信息
        if (searchKey) {
            wx.request({
                url: app.globalData.prop.server.ip + '/api/lbs/place/suggestion',
                data: {
                    keywords: searchKey,
                    city: '南昌',
                    citylimit: true
                },
                success: function (res) {
                    // console.log(res)
                    that.setData({
                        result: res.data.tips
                    })
                }
            })
        }
        this.setData({
            clearFlag: e.detail.cursor == 0,
            resultFlag: e.detail.cursor == 0
        })

    },
    /**
     * 点击提示
     */
    touch: function (res) {
        // console.log(res)
        var item = res.currentTarget.dataset.packages;
        console.log(item)

        // 公交线路
        if (item.typecode == '999901') {
            console.log('公交')
        } else {
            console.log(item.location)

            // longitude,latitude解析成对象形式
            wx.redirectTo({
                url: '../nov-map/nov-map?location='+item.location,
            })

        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app = getApp();
        var that = this;

        this.setData({
            sBackgroundImg: mydata.data.images.search
        })
    },

})