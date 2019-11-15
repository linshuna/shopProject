// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//移动端的适应
import './assets/js/flexible.min';
//********** 全局样式 **********
import './assets/css/base.scss';
import './assets/css/border-1px.css';
//mint-ui的框架
import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui';
Vue.use(MintUI)
import { MessageBox, Popup, DatetimePicker, Picker, Navbar, TabItem,Swipe, SwipeItem,Switch, TabContainer, TabContainerItem, Toast  } from 'mint-ui';
Vue.component(Popup.name,Popup);
Vue.component(DatetimePicker.name,DatetimePicker);
Vue.component(Picker.name,Picker);
Vue.component(Navbar.name,Navbar);
Vue.component(TabItem.name,TabItem);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Switch.name,Switch);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Toast)
Vue.prototype.$toast = Toast;
Vue.prototype.$message = MessageBox;
//本地存储
import * as apis from './utils/utils';
Vue.prototype.$api = apis;
//二次封装请求
import http from './utils/axios';
Vue.prototype.$http = http;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//全局过滤
import filters from './utils/filters';
for (let key in filters) { 
  Vue.filter(key,filters[key])
}
//获取公共变量
let config = require('../static/config');
//图片显示的拼接
if(config.isPing){//生产环境的拼接
    var uploadUrl = 'http://'+window.location.host+ filters.dealHttp(config.uploadUrl);
    var oUrl = 'http://'+window.location.host + filters.dealHttp(config.oUrl);  
}else{//本地服务请求路径
    var uploadUrl = config.uploadUrl;
    var oUrl      = config.oUrl;
}
Vue.prototype.httpUrl = uploadUrl;
Vue.prototype.globalIsPing = config.isPing;

//wx的api授权
Vue.prototype.getJsapi = function () {  
  let url = window.location.href
  url = url.split("#")[0]
  this.$http.get('do=get_jsapi&m=vipcard&url='+url)
    .then(res => {
      let appId = res.appId
      let timestamp = res.timestamp
      let nonceStr = res.nonceStr
      let signature = res.signature
      wx.config({
        debug: false,
        appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名，见附录1
        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          'checkJsApi',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard',
          'error',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
        ]
      });
    })
}

router.afterEach(function (to, from, next) {
  var name = to.meta.title,pName = to.name;
  document.title = name;
  if(pName!='ShopNav'&&pName!='ShopStore'&&pName!='ShopStoreDetail'){
    window.localStorage.clear('stopIdx')
  }
})

// var gobackUrl = window.location.href;
// if(gobackUrl.indexOf("?#")>-1){//重定向
//     var arr = gobackUrl.split("?#");
//     window.location.href = "http://shw.mxiaoxin.com/h5/?#"+arr[1];
// }else{}
var backUrl = window.localStorage.getItem("backUrl")
if(backUrl&&backUrl!=''){
  window.location.href = backUrl;
}else{
  var url = window.location.href;
  if(url.indexOf("?")<0){
    var arr = url.split("#")
    window.location.href = arr[0]+"?#"+arr[1]
  }
}
