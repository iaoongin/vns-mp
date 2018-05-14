// pages/search/search.js
var mydata = require('../../data/search.js');
// 引入SDK核心类
var QQMapWX = require('../../static/js/qqmap-wx-jssdk.min.js');
var qqmapsdk;
// 引入工具类
var utils = require('../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    sBackgroundImg:{},
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

    // 请求关键字地图信息 http://lbs.qq.com/qqmap_wx_jssdk/index.html
    if (searchKey){
      qqmapsdk.getSuggestion({
        keyword: searchKey,
        policy: 1,
        region_fix: 1,
        success: function (res) {
          
          var data = res.data;
          // 当前位置
           current = {};
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              var current = res;
              console.log(current)
              // 搜索返回结果地点坐标
              var tos = [];
              for (var i in data) {
                tos.push({
                  'location': data[i].location
                })
              }
              console.log(tos)
              
              // 距离计算
              qqmapsdk.calculateDistance({
                'from':current,
                'to': tos,
                success: function (res) {
                  console.log(res)
                  console.log(res.result.elements)
                  for (var i in data)
                    data[i]['distance'] = res.result.elements[i];
                },
                fail: function (res) {
                  console.log(res);
                },
              })

              that.setData({
                result: res.data
              })
            }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'Q4GBZ-FAOK5-PUOIM-QXSX6-V6CUV-XYB7P'
    });

    var that = this;
    
    this.setData({
      sBackgroundImg: mydata.data.images.search
    })
  },
  
})