import Vue from 'vue';
import router from '../router';
import axios from 'axios';
import MintUI from 'mint-ui';
Vue.use(MintUI)
import {Toast} from 'mint-ui';
import config from '../../static/config.json';
if(config.isDev){//判断是否是测试环境
  var oUrl = config.devUrl;
}else{
  var oUrl = config.oUrl;
}
// var oUrl = '/index.php?debug=1&i=1&c=entry&'

let service = axios.create();
//添加响应拦截器
axios.interceptors.response.use(function(response){
  return response;
},function(error){
 return Promise.reject(error);
});
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

service.get = (url, data = {}, config) => {
  return new Promise((resolve, reject) => {
    axios.get(oUrl + url, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: data
      })
      .then(response => {
        var tip = '';
        tip = response.data;
        if (tip.code == 200) { 
            var rData = response.data.data;
            rData = !rData||rData=='null'||rData==undefined?[]:rData;
            resolve(rData);
            window.localStorage.setItem("backUrl",'')
        }else if(tip.code == 401){
          var gobackUrl = window.location.href;
          var arr = gobackUrl.split("#");
          gobackUrl = arr[0]+"?#"+arr[1];
          var resUrl = response.data.data.redirect+'&goback='+gobackUrl
          window.location.href = resUrl;
          window.localStorage.setItem("backUrl",gobackUrl)
        }else if(tip.code == 500){
          var path = router.currentRoute.path;
          //如果是有身份 下面的可以不判断
          var info = window.localStorage.getItem('info');
          if(info){
            info = JSON.parse(info);
            var utype = info.utype;
            if(utype==1||utype==2||utype==3) return false;
          }
          //没有身份权限的 关闭窗口
          if((response.data.msg).indexOf("没有权限")>-1&&path=='/assistantCenter'){
            Toast({message: response.data.msg}) 
            wx.closeWindow();
          }else if((response.data.msg).indexOf("没有权限")>-1){
            router.push({
              path: '/me'
            })
          }else{
            //禁止提示
            if(data.forbidden) return false;
            Toast({message: response.data.msg}) 
          }
          if((response.data.msg).indexOf("没有开通会员卡")>-1&&path!='/me'){
            router.push({
              path: '/card'
            })
          }
        }
        
      }, err => {
        // message.wrong({message: '网络出错,请稍后重试'})
        reject(err)
      })
  })
}

export default service

function GetQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
	let r = window.location.search.substr(1).match(reg); //真实环境请用这句
	if (r!==null) return (r[2]); return null;
}