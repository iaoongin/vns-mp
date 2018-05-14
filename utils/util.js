const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

var strToLocation = (str) => {

    var strs= str.split(',');
    return {
        longitude: strs[0],
        latitude: strs[1]
    }
}

var marksFormat = (rawMarks) => {
    var marks = []
    for (let i in rawMarks){
        var rawMark = rawMarks[i];
        marks[i] = {
            iconPath: rawMark.markIconPath,
            id: rawMark.id,
            latitude: rawMark.latitude,
            longitude: rawMark.longitude,
            width: rawMark.markWidth,
            height: rawMark.markHeight,
            label: {
                content: rawMark.markLabelContent
            },
            callout: {
                content: rawMark.markCalloutContent,
                fontSize: 14,
                color: '#000000',
                bgColor: '#EDECE8',
                padding: 8,
                borderRadius: 4,
                boxShadow: '4px 8px 16px 0 rgba(0)',
            }
        }
    }

    return marks;
}

module.exports = { formatTime, showBusy, showSuccess, showModel, strToLocation, marksFormat}
