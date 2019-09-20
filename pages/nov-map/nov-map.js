// pages/nov/nov-map.js
var util = require('../../utils/util.js');
var wxApi = require('../../utils/wxApi');
var app;
var myMap;
var arch_id = {}
var rawMarks = {}
// 简介 ==> 7
const info =
    {
        id: 7,
        // iconPath: '/static/img/图书馆底部.png',
        iconPath: '',
        position: {
            left: 0,
            top: 487,
            width: 375,
            height: 120
        },
        clickable: true
    }

var page = Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentLatitude: 28.7405983728,
        currentLongitude: 115.8755385876,
        scale: 19,
        marks: {},
        controls: [
            // 搜索 ==> 0
            // {
            //     id: 0,
            //     iconPath: '/static/img/search.gif',
            //     position: {
            //         left: 13,
            //         top: 5,
            //         width: 350,
            //         height: 45
            //     },
            //     clickable: true
            // },
            // 放大 ==> 1
            // {
            //     id: 1,
            //     iconPath: '/static/img/放大.png',
            //     position: {
            //         left: 300,
            //         top: 200,
            //         width: 50,
            //         height: 50
            //     },
            //     clickable: true
            // },
            // // 缩小 ==> 2
            // {
            //     id: 2,
            //     iconPath: '/static/img/缩小.png',
            //     position: {
            //         left: 300,
            //         top: 250,
            //         width: 50,
            //         height: 50
            //     },
            //     clickable: true
            // },
            // 路线 ==> 3
            {
                id: 3,
                iconPath: '/static/img/路线.png',
                position: {
                    left: 300,
                    top: 300,
                    width: 50,
                    height: 50
                },
                clickable: true
            },
            // 当前位置 ==> 4
            {
                id: 4,
                iconPath: '/static/img/位置.png',
                position: {
                    left: 300,
                    top: 400,
                    width: 50,
                    height: 50
                },
                clickable: true
            },
            // 语音 ==> 5
            {
                id: 5,
                iconPath: '/static/img/语音.png',
                position: {
                    left: 150,
                    top: 500,
                    width: 80,
                    height: 80
                },
                clickable: true
            },
            // 用户 ==> 6
            // {
            //     id: 6,
            //     iconPath: '/static/img/用户.png',
            //     position: {
            //         left: 20,
            //         top: 450,
            //         width: 50,
            //         height: 50
            //     },
            //     clickable: true
            // },

        ],

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        app = getApp();

        // 获取marks
        wx.request({
            url: app.globalData.prop.server.ip + "/mark/all",
            success: function (res) {
                var data = res.data.data;
                console.log(data);
                for (let i in data) {
                    // 获取infoiconPath

                    var imgurl = app.globalData.prop.server.ip + "/mark/info.img?text=" + data[i].markInfoContent;

                    wxApi.wxDownloadFile(encodeURI(imgurl)).then(res => {
                        // console.log(" i= " + i + " then.. 1")
                        // console.log(res)
                        if (res.statusCode === 200) {
                            data[i]['infoIconPath'] = res.tempFilePath;
                        }
                    })
                }
                // console.log(data);
                rawMarks = data
                that.setData({
                    'marks': util.marksFormat(data)
                })
            }
        })

        // 跳转过来时指定了坐标
        if (options.location) {
            var location = util.strToLocation(options.location);
            console.log(location)

            // 地图定位
            this.setData({
                currentLongitude: location.longitude,
                currentLatitude: location.latitude,
                'marks[0].longitude': location.longitude,
                'marks[0].latitude': location.latitude,

            })

        } else {    //默认获取当前定位
            wx.getLocation({
                type: 'gcj02',
                success: function (res) {
                    console.log(res)
                    that.setData({
                        /*currentLongitude: res.longitude,
                        currentLatitude: res.latitude*/
                        currentLatitude: 28.7405983728,
                        currentLongitude: 115.8755385876,

                    })
                }
            })

        }
        // 默认缩放级别
        this.scale = getApp().globalData.prop.map.scale;
    },
    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        myMap = wx.createMapContext('myMap')
    },
    /*
    *点击事件
    */
    controltap(e) {
        var that = this;
        switch (e.controlId) {
            // 搜索 ==> 0
            case 0:
                console.log('搜索')
                wx.navigateTo({
                    url: '../search/search',
                })
                break;
            // 路线
            case 3:
                console.log(arch_id)
                if (arch_id != {}) {
                    wx.openLocation({
                        latitude: archs[arch_id].latitude,
                        longitude: archs[arch_id].longitude,
                        scale: 20,
                        name: archs[arch_id].label.content,
                        address: '江西理工大学卫生所'
                    })
                }
                break;
            // 放大 ==> 1
            // case 1:
            //     console.log('放大' + this.scale)
            //     this.scale = Math.min(++this.scale, 18);
            //     this.setData({
            //         scale: this.scale
            //     });
            //     break;
            // // 缩小 ==> 2
            // case 2:
            //     console.log('缩小' + this.scale)
            //     this.scale = Math.max(--this.scale, 5)
            //     this.setData({
            //         scale: this.scale
            //     });
            //     break;
            // 当前位置 ==> 4
            case 4:
                var that = this;
                wx.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                        // console.log(res)
                        that.setData({
                            currentLongitude: res.longitude,
                            currentLatitude: res.latitude
                        })
                    }
                });
                break;
            case 5:
                wx.navigateTo({
                    'url': '../voice/voice'
                })
                break;
            // 建筑信息 ==> 7
            case 7:
                wx.navigateTo({
                    'url': '../architecture/architecture?arch_id=' + arch_id
                })
                break;
        }
    },
    markertap(e) {

        // console.log(e);
        // 获取mark的id
        // var id = e.markerId;
        var old = arch_id;
        arch_id = e.markerId;
        // 获取当前的控件
        var controls = this.data.controls;
        // 判断是否有第7控件
        for (var i in controls) {
            if (controls[i].id == 7) {// 有

                // 判断点击为同一个mark
                if (arch_id != old) { // 否
                    controls[i]['iconPath'] = rawMarks[arch_id].infoIconPath
                    this.setData({
                        'controls': controls
                    })
                }
                return;
            }
            // 移动语音-5的位置及大小
            else if (controls[i].id == 5) {
                controls[i].position = {
                    left: 20,
                    top: 400,
                    width: 50,
                    height: 50
                }
            }
        }
        // 添加控件
        // console.log(rawMarks[arch_id].infoIconPath)
        info['iconPath'] = rawMarks[arch_id].infoIconPath

        controls.push(info)

        // console.log(controls);
        this.setData({
            'controls': controls
        })
    },
    // 点击地图
    maptap(e) {
        // 获取当前的控件
        var controls = this.data.controls;
        console.log('map tap...')

        // console.log(controls)
        if (controls) {
            for (var i in controls) {
                // 判断是否有第7控件
                if (controls[i].id == 7) {
                    // 删除该控件
                    controls.pop();
                }
                // 移动语音-5的位置及大小
                else if (controls[i].id == 5) {
                    controls[i].position = {
                        left: 150,
                        top: 500,
                        width: 80,
                        height: 80
                    }
                }
            }
            this.setData({
                'controls': controls
            })
        }
    },
    // 视野发生变化
    regionchange(e) {
        // console.log(e)
        var that = this;
        myMap.getScale({
            success: function (res) {
                var oldScale = that.data.scale
                var currentScale = (2 + res.scale).toFixed(9);
                console.log("old:" + oldScale)
                if (that.data.scale == currentScale) {
                    console.log("一样,do nothing...")
                } else {
                    console.log("不同: " + currentScale)
                    var marks = that.data.marks;
                    // marks图标缩放
                    var ratio = currentScale / oldScale
                    if (ratio == 0) ratio = 1
                    if(ratio <= 0.00001) ratio = 1
                    console.log("ratios:" + ratio)
                    for (let i in marks) {
                        marks[i].width *= ratio;
                        marks[i].height *= ratio;
                    }
                    that.setData({
                        'marks': marks,
                        // 'scale': res.scale
                    })
                }
            }
        })
    }
})