//app.js
var prop = require('./prop.js');
// log
//重写console.log方法，判断是否开启日志调试模式，否则就不输出
console.log = (function(oriLogFunc){
    return function(str){
      if (prop.logDebug){//判断配置文件是否开启日志调试
        oriLogFunc.call(console, str);
      }
    }
  })(console.log);

App({
    globalData:{
        prop:prop
    },
    onLaunch: function () {
       
    }
})