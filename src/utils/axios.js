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
        }else if(tip.code == 401){
          var gobackUrl = window.location.href
          gobackUrl = gobackUrl.split("#")[0]
          var resUrl = response.data.data.redirect+'&goback='+gobackUrl
          window.location.href = resUrl;
        }else if(tip.code == 500){
          //禁止提示
          if(data.forbidden) return false;
          Toast({message: response.data.msg})
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