// pages/architecture/architecture.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    desc: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("需要查询的id="+options.arch_id);
    wx.setNavigationBarTitle({
      title: '这是一条奇怪的标题',
    })

    var that = this;
    wx.request({
     
      // url: 'http://192.168.43.31:6001/voice/a/test',
      url: 'http://115.159.84.194/voice/a/test',
      success: function(res){
        var article = res.data; 
        // var article = "res.data"; 
        that.setData({
          desc: article
        })
      }
    })
    
  }

})