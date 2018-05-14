// pages/voice/voice.js

const options = {
    duration: 5000,
    sampleRate: 16000,  //采样率，有效值 8000/16000/44100
    numberOfChannels: 2, //录音通道数，有效值 1/2
    encodeBitRate: 96000, //编码码率，有效值见下表格
    format: 'mp3',  //音频格式，有效值 aac/mp3
    frameSize: 50 //指定帧大小，单位 KB。传入 frameSize 后，每录制指定帧大小的内容后，会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
};

var app;

var page = Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: []
    },
    /**
     * 录音
     */
    startVoice: function (event) {
        this.recorderManager.start(options);
    },
    endVoice: function (event) {
        this.recorderManager.stop();
    },
    play: function (event) {
        wx.playVoice({
            filePath: tempFilePath,
            complete: function () {
            }
        })
    },
    onLoad() {
        app = getApp();
        var that = this;

        // 定义录音管理器
        this.recorderManager = wx.getRecorderManager();
        this.recorderManager.onStart((res) => {
            console.log('recorder start')
        });

        this.recorderManager.onStop((res) => {

            const tempFilePath = res.tempFilePath;
            console.log(tempFilePath);

            wx.uploadFile({

                // url: 'http://115.159.84.194/voice/resolve',
                url: app.globalData.prop.server.ip + '/resolve?dev_pid=1536',
                filePath: tempFilePath,
                name: 'file',
                success: function (res) {
                    var data = JSON.parse(res.data).data;
                    var locs = []
                    var needed = ['LOC','n'];
                    for(let i in data){
                        if( data[i].pos in needed) { //地名
                            locs.push(data[i].item)
                        }
                    }
                    console.log(locs)
                    that.setData({
                        result: locs
                    })
                    // try {
                    //     var rt = JSON.parse(res.data)
                    //     console.log(rt['data'])
                    //     var for_msg = "";
                    //     for (var i in rt['data']) {
                    //         for_msg += rt['data'][i];
                    //     }
                    //     that.setData({
                    //         msg: for_msg
                    //     })
                    // } catch (e) {
                    // }
                }
            })
            console.log('recorder end')
        });
// end--录音管理器
    }
})