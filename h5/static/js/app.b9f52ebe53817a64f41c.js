webpackJsonp([48],{"1Oa9":function(e,t){},IuJc:function(e,t){e.exports={isDev:!1,devUrl:"/index.php?debug=1&i=1&c=entry&",oUrl:"/app/index.php?i=1&c=entry&"}},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={};n.d(a,"setStore",function(){return g}),n.d(a,"getStore",function(){return w}),n.d(a,"removeStore",function(){return v}),n.d(a,"clearStore",function(){return y}),n.d(a,"setCookie",function(){return k}),n.d(a,"getCookie",function(){return b}),n.d(a,"delCookie",function(){return _}),n.d(a,"clearCookie",function(){return x}),n.d(a,"format",function(){return S}),n.d(a,"formatDateTime",function(){return C}),n.d(a,"SliceArrPublic",function(){return D}),n.d(a,"getDays",function(){return P}),n.d(a,"getHoursCha",function(){return M}),n.d(a,"getWeekDay",function(){return T}),n.d(a,"GetQueryString",function(){return I}),n.d(a,"sliceArr",function(){return H}),n.d(a,"isLookInMic",function(){return O}),n.d(a,"checkFileType",function(){return L}),n.d(a,"watermark",function(){return E}),n.d(a,"compare",function(){return A});var r=n("wHeh"),o={name:"App",mounted:function(){},methods:{shutWin:function(){wx.closeWindow()}}},i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var c=n("Mz/3")(o,i,!1,function(e){n("vkAd")},"data-v-3457757a",null).exports,l=n("f4UP");r.default.use(l.a);var u=new l.a({routes:[{path:"/index",name:"Index",meta:{title:"首页",showNav:!0},component:function(e){return Promise.all([n.e(0),n.e(6)]).then(function(){var t=[n("eerB")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shop",name:"Shop",meta:{title:"积分商城",showNav:!0},component:function(e){return Promise.all([n.e(0),n.e(1)]).then(function(){var t=[n("uia/")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/me",name:"Me",meta:{title:"我的",showNav:!0},component:function(e){return Promise.all([n.e(0),n.e(4)]).then(function(){var t=[n("yCND")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/news/:id",name:"News",meta:{title:"最新资讯"},component:function(e){return n.e(45).then(function(){var t=[n("tDds")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopNav",name:"ShopNav",meta:{title:"商户导航"},component:function(e){return n.e(5).then(function(){var t=[n("j1wO")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopStore",name:"ShopStore",meta:{title:"商户中心"},component:function(e){return Promise.all([n.e(0),n.e(17)]).then(function(){var t=[n("s5uD")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopStoreDetail/:id",name:"ShopStoreDetail",meta:{title:"商户详情"},component:function(e){return n.e(39).then(function(){var t=[n("klCd")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/assistantCenter",name:"AssistantCenter",meta:{title:"店员中心"},component:function(e){return Promise.all([n.e(0),n.e(16)]).then(function(){var t=[n("clEn")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/assistant",name:"Assistant",meta:{title:"店员管理"},component:function(e){return Promise.all([n.e(0),n.e(24)]).then(function(){var t=[n("cC5a")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/financeCenter",name:"FinanceCenter",meta:{title:"财务中心"},component:function(e){return Promise.all([n.e(0),n.e(46)]).then(function(){var t=[n("vpCY")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopNameList",name:"ShopNameList",meta:{title:"店员列表"},component:function(e){return n.e(18).then(function(){var t=[n("TYZi")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopMsg",name:"ShopMsg",meta:{title:"店铺信息"},component:function(e){return n.e(20).then(function(){var t=[n("nOsc")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/verificationList/:id",name:"VerificationList",meta:{title:"核销记录"},component:function(e){return Promise.all([n.e(0),n.e(11)]).then(function(){var t=[n("7ZHz")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/verOrder/:ordersn?",name:"VerOrder",meta:{title:"核销订单"},component:function(e){return Promise.all([n.e(0),n.e(10)]).then(function(){var t=[n("dVLI")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/record",name:"Record",meta:{title:"数据记录"},component:function(e){return Promise.all([n.e(0),n.e(12)]).then(function(){var t=[n("EEGs")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/recordBack",name:"RecordBack",meta:{title:"订单"},component:function(e){return Promise.all([n.e(0),n.e(22)]).then(function(){var t=[n("VCrL")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/recordBackLook",name:"recordBackLook",meta:{title:"数据记录"},component:function(e){return Promise.all([n.e(0),n.e(19)]).then(function(){var t=[n("x+aF")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopDetail/:id",name:"ShopDetail",meta:{title:"商品详情"},component:function(e){return n.e(21).then(function(){var t=[n("BvBA")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopConfirmOrder/:id",name:"ShopConfirmOrder",meta:{title:"订单确定"},component:function(e){return n.e(41).then(function(){var t=[n("dOoX")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/parking",name:"Parking",meta:{title:"车辆"},component:function(e){return Promise.all([n.e(0),n.e(7)]).then(function(){var t=[n("S4sg")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/parkingList/:bol?",name:"ParkingList",meta:{title:"我的"},component:function(e){return Promise.all([n.e(0),n.e(27)]).then(function(){var t=[n("XQWZ")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/parkingAdd",name:"ParkingAdd",meta:{title:"新增车辆"},component:function(e){return Promise.all([n.e(0),n.e(13)]).then(function(){var t=[n("4oqP")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/parkingOrder",name:"ParkingOrder",meta:{title:"缴费记录"},component:function(e){return Promise.all([n.e(0),n.e(23)]).then(function(){var t=[n("xYzj")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/parkingDetial",name:"ParkingDetial",meta:{title:"交易详情"},component:function(e){return n.e(43).then(function(){var t=[n("eE6A")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/order",name:"Order",meta:{title:"兑换记录"},component:function(e){return Promise.all([n.e(0),n.e(2)]).then(function(){var t=[n("WTYN")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/jfDetail",name:"JfDetial",meta:{title:"积分列表"},component:function(e){return n.e(9).then(function(){var t=[n("BFy4")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/explain",name:"Explain",meta:{title:"积分规则说明"},component:function(e){return n.e(28).then(function(){var t=[n("dmsq")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/jfExplain",name:"JfExplain",meta:{title:"商家积分说明"},component:function(e){return n.e(15).then(function(){var t=[n("rMLV")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/card/:id?",name:"Card",meta:{title:"会员卡"},component:function(e){return n.e(38).then(function(){var t=[n("50WE")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/cardCom",name:"CardCom",meta:{title:""},component:function(e){return n.e(37).then(function(){var t=[n("DgHH")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/vipCenter",name:"VipCenter",meta:{title:"会员中心"},component:function(e){return Promise.all([n.e(0),n.e(3)]).then(function(){var t=[n("nqkS")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/myMsg",name:"MyMsg",meta:{title:"资料"},component:function(e){return n.e(32).then(function(){var t=[n("3wRd")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/vipPay/:id?",name:"VipPay",meta:{title:"会员支付"},component:function(e){return n.e(8).then(function(){var t=[n("0WBp")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/vipChong",name:"VipChong",meta:{title:"会员充值"},component:function(e){return n.e(14).then(function(){var t=[n("GsJe")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/jfList/:type",name:"JfList",meta:{title:"积分明细"},component:function(e){return n.e(34).then(function(){var t=[n("0nfG")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/consumeList",name:"ConsumeList",meta:{title:"消费明细"},component:function(e){return n.e(36).then(function(){var t=[n("8wSt")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/coupon",name:"Coupon",meta:{title:"优惠券"},component:function(e){return n.e(35).then(function(){var t=[n("javs")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/teamCenter",name:"TeamCenter",meta:{title:"团队中心"},component:function(e){return Promise.all([n.e(0),n.e(29)]).then(function(){var t=[n("lqMJ")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/message",name:"Message",meta:{title:"消息中心"},component:function(e){return n.e(26).then(function(){var t=[n("E1Xy")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/messageDetail/:id",name:"MessageDetail",meta:{title:"消息"},component:function(e){return n.e(33).then(function(){var t=[n("PQ+y")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/myTeam",name:"MyTeam",meta:{title:"我的团队"},component:function(e){return n.e(31).then(function(){var t=[n("HMDI")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/myTeamDetail/:id",name:"MyTeamDetail",meta:{title:"成员信息"},component:function(e){return n.e(25).then(function(){var t=[n("u04o")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopQrcode/:code?/:status?/:qrcode?/:ordersn?",name:"ShopQrcode",meta:{title:"二维码"},component:function(e){return Promise.all([n.e(0),n.e(40)]).then(function(){var t=[n("OKhi")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/shopBill",name:"ShopBill",meta:{title:"发票"},component:function(e){return n.e(42).then(function(){var t=[n("jbsa")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/parkList",name:"ParkList",meta:{title:"停车缴费标准"},component:function(e){return n.e(44).then(function(){var t=[n("8JpP")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/selfConsume/:id",name:"SelfConsume",meta:{title:"个人消费信息"},component:function(e){return n.e(30).then(function(){var t=[n("19wI")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]}),p=(n("mc8w"),n("eSy0"),n("i1of"),n("1Oa9"),n("NtYf")),s=n.n(p),m=n("GxZn"),d=n.n(m),h=n("3SZ7"),f=n.n(h),g=function(e,t){e&&("string"!=typeof t&&(t=f()(t)),window.localStorage.setItem(e,t))},w=function(e){if(e)return window.localStorage.getItem(e)},v=function(e){e&&window.localStorage.removeItem(e)},y=function(){window.localStorage.clear()},k=function(e,t,n){var a=new Date;a.setTime(a.getTime()+24*n*60*60*1e3);var r="expires="+a.toUTCString();document.cookie=e+"="+t+"; "+r},b=function(e){for(var t=e+"=",n=document.cookie.split(";"),a=0;a<n.length;a++){for(var r=n[a];" "==r.charAt(0);)r=r.substring(1);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return""},_=function(e){var t=new Date;t.setTime(t.getTime()-1);var n=b(e);null!=n&&(document.cookie=e+"="+n+";expires="+t.toGMTString()+";path=/;")},x=function(){var e=new Date;e.setTime(e.getTime()-1e4);var t=document.cookie.match(/[^ =;]+(?=\=)/g);if(t)for(var n=t.length;n--;)document.cookie=t[n]+"=0; expire="+e.toGMTString()+"; path=/"},S=function(e,t){var n=new Date(e),a=function(e){return(e<10?"0":"")+e};return t.replace(/yyyy|MM|dd|HH|mm|ss/g,function(e){switch(e){case"yyyy":return a(n.getFullYear());case"MM":return a(n.getMonth()+1);case"mm":return a(n.getMinutes());case"dd":return a(n.getDate());case"HH":return a(n.getHours());case"ss":return a(n.getSeconds())}})},C=function(e){var t=(e=new Date(e)).getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var a=e.getDate();a=a<10?"0"+a:a;var r=e.getHours();r=r<10?"0"+r:r;var o=e.getMinutes();o=o<10?"0"+o:o;var i=e.getSeconds();return i=i<10?"0"+i:i,t+"-"+n+"-"+a};function D(e,t){for(var n={},a=[],r=0;r<t.length;r++){var o=t[r];if(n[o[e]])for(var i=0;i<a.length;i++){var c=a[i];c.sameE==o[e]&&c.data.push(o)}else a.push({sameE:o[e],data:[o]}),n[o[e]]=o}return a}function P(e,t){var n,a;n=e.split("-"),a=t.split("-");var r=new Date(n[0],n[1]-1,n[2]),o=new Date(a[0],a[1]-1,a[2]);return parseInt(Math.abs(r-o)/1e3/60/60/24)}function M(e){var t=new Date,n=(new Date(e.split("-").join("/")).getTime()-t.getTime())%864e5;return Math.floor(n/36e5)}function T(e){var t=new Date(e).getDay();if(t==(new Date).getDay())return"今天";switch(t){case 0:return"星期日";case 1:return"星期一";case 2:return"星期二";case 3:return"星期三";case 4:return"星期四";case 5:return"星期五";case 6:return"星期六"}}function I(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!==n?n[2]:null}function H(e,t){for(var n=[],a=0;a<e.length;a+=t)n.push(e.slice(a,a+t));return n}function O(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)}function L(e,t,n){var a=arguments;3!=a.length&&n(0);e=a[0],t=a[1],n="function"==typeof a[2]?a[2]:function(){};if(""==t.type){var r=["ef bb bf 3c 3f 78 6d 6c 20 76 65 72","50 4b 3 4 a 0 0 0 0 0 87 4e","25 50 44 46 2d 31 2e 35 d a 25 b5","3d 3d 3d 3d 3d 3d 3d 3d 3d 3d 3d 3d","d0 cf 11 e0 a1 b1 1a e1 0 0 0 0","ff d8 ff","89 50 4e"],o=[".doc",".docx",".pdf",".txt",".xls",".jpg",".png"],i=/png|jpg|jpeg/.test(e)?3:12,c=new FileReader;c.readAsArrayBuffer(t),c.addEventListener("load",function(e){var t=e.target.result.slice(0,i);if(c=null,t&&t.byteLength==i){var a=new Uint8Array(t),l=[];a.forEach(function(e){l.push(e.toString(16))}),a=null;var u=r.indexOf(l.join(" "));n(u>-1&&o[u])}else n(!1)})}else{e=t.name.match(/\.(\w+)$/)[1];n(e)}}function E(e){var t={watermark_txt:"数字人事+智税人才",watermark_x:-28,watermark_y:0,watermark_rows:10,watermark_cols:12,watermark_x_space:0,watermark_y_space:0,watermark_color:"#000000",watermark_alpha:.1,watermark_fontsize:"12px",watermark_fontWeight:"bold",watermark_font:"微软雅黑",watermark_width:68,watermark_height:68,watermark_angle:25};if(1===arguments.length&&"object"===d()(arguments[0])){var n=arguments[0]||{};for(var a in n)n[a]&&t[a]&&n[a]===t[a]||n[a]&&(t[a]=n[a])}var r=document.createElement("div");r.style.position="fixed",r.style.width="100%",r.style.height="100%",r.style.top=0,r.style.left=0,r.style.background="#f5f5f5";var o,i,c=Math.max(document.body.scrollWidth,document.body.clientWidth),l=Math.max(document.body.scrollHeight,document.body.clientHeight);(0==t.watermark_cols||parseInt(t.watermark_x+t.watermark_width*t.watermark_cols+t.watermark_x_space*(t.watermark_cols-1))>c)&&(t.watermark_cols=parseInt((c-t.watermark_x+t.watermark_x_space)/(t.watermark_width+t.watermark_x_space)),t.watermark_x_space=parseInt((c-t.watermark_x-t.watermark_width*t.watermark_cols)/(t.watermark_cols-1))),(0==t.watermark_rows||parseInt(t.watermark_y+t.watermark_height*t.watermark_rows+t.watermark_y_space*(t.watermark_rows-1))>l)&&(t.watermark_rows=parseInt((t.watermark_y_space+l-t.watermark_y)/(t.watermark_height+t.watermark_y_space)),t.watermark_y_space=parseInt((l-t.watermark_y-t.watermark_height*t.watermark_rows)/(t.watermark_rows-1)));for(var u=0;u<t.watermark_rows;u++){i=t.watermark_y+(t.watermark_y_space+t.watermark_height)*u;for(var p=0;p<t.watermark_cols;p++){o=t.watermark_x+(t.watermark_width+t.watermark_x_space)*p;var s=document.createElement("div");s.id="mask_div"+u+p,s.appendChild(document.createTextNode(t.watermark_txt)),s.style.webkitTransform="rotate(-"+t.watermark_angle+"deg)",s.style.MozTransform="rotate(-"+t.watermark_angle+"deg)",s.style.msTransform="rotate(-"+t.watermark_angle+"deg)",s.style.OTransform="rotate(-"+t.watermark_angle+"deg)",s.style.transform="rotate(-"+t.watermark_angle+"deg)",s.style.visibility="",s.style.position="absolute",s.style.left=o+"px",s.style.top=i+"px",s.style.overflow="hidden",s.style.zIndex="9999",s.style.opacity=t.watermark_alpha,s.style.fontSize=t.watermark_fontsize,s.style.fontWeight=t.watermark_fontWeight,s.style.fontFamily=t.watermark_font,s.style.color=t.watermark_color,s.style.textAlign="center",s.style.width=t.watermark_width+"px",s.style.height=t.watermark_height+"px",s.style.lineHeight=t.watermark_height+"px",s.style.textAlign="right",s.style.display="block",r.appendChild(s)}}document.getElementById("app").appendChild(r)}function A(e){return function(t,n){return t[e]-n[e]}}var j=n("UIuv"),N=n.n(j),U=n("aCJm"),W=n.n(U),B=n("IuJc"),J=n.n(B);if(r.default.use(s.a),J.a.isDev)var F=J.a.devUrl;else F=J.a.oUrl;var z=W.a.create();W.a.interceptors.response.use(function(e){return e},function(e){return N.a.reject(e)}),W.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",z.get=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};arguments[2];return new N.a(function(n,a){W.a.get(F+e,{headers:{"Content-Type":"application/json"},params:t}).then(function(e){var a;if(200==(a=e.data).code){var r=e.data.data;n(r=r&&"null"!=r&&void 0!=r?r:[]),window.localStorage.setItem("backUrl","")}else if(401==a.code){var o=window.location.href,i=o.split("#");o=i[0]+"?#"+i[1];var c=e.data.data.redirect+"&goback="+o;window.location.href=c,window.localStorage.setItem("backUrl",o)}else if(500==a.code){var l=u.currentRoute.path,s=window.localStorage.getItem("info");if(s){var m=(s=JSON.parse(s)).utype;if(1==m||2==m||3==m)return!1}if(e.data.msg.indexOf("没有权限")>-1&&"/assistantCenter"==l)Object(p.Toast)({message:e.data.msg}),wx.closeWindow();else if(e.data.msg.indexOf("没有权限")>-1)u.push({path:"/me"});else{if(t.forbidden)return!1;Object(p.Toast)({message:e.data.msg})}e.data.msg.indexOf("没有开通会员卡")>-1&&"/me"!=l&&u.push({path:"/card"})}},function(e){a(e)})})};var R=z;var V={noDataTip:function(e){return e||"暂无"},noAssessTip:function(e){return e&&""!=e?e:"此用户没有填写评价"},unescape:function(e){return e.replace(e?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'")},formatDateTimeFilter:function(e){return e&&""!=e?function(e){"string"==typeof e&&e.indexOf("-")>-1&&(e=e.split("-").join("/"));var t=(e=new Date(e)).getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;var a=e.getDate();a=a<10?"0"+a:a;var r=e.getHours();r=r<10?"0"+r:r;var o=e.getMinutes();o=o<10?"0"+o:o;var i=e.getSeconds();return i=i<10?"0"+i:i,t+"-"+n+"-"+a}(e):""},formatFilter:function(e,t){return e&&""!=e?(n=t,a=new Date(e),r=function(e){return(e<10?"0":"")+e},n.replace(/yyyy|MM|dd|HH|mm|ss/g,function(e){switch(e){case"yyyy":return r(a.getFullYear());case"MM":return r(a.getMonth()+1);case"mm":return r(a.getMinutes());case"dd":return r(a.getDate());case"HH":return r(a.getHours());case"ss":return r(a.getSeconds())}})):"";var n,a,r},filterHotTag:function(e){return 0==e?"重要紧急":1==e?"重要":2==e?"紧急":3==e?"常规":""},filterSecretTask:function(e){return 0==e?"普通任务":"私密任务"},uploadTag:function(e){var t,n=e.lastIndexOf(".");return"image"==(t="jpg"==(e=e.substring(n+1))||"png"==e||"jpeg"==e?"image":"pdf"==e?"upload-pdf-icon.png":"doc"==e||"docx"==e?"upload-doc-icon.png":"md"==e?"upload-md-icon.png":"ppt"==e||"pptx"==e?"upload-ppt-icon.png":"xls"==e||"xlsx"==e?"upload-xlsx-icon.png":"upload-txt-icon.png")||t},isNotAmount:function(e){return e||0},dealHttp:function(e){if(e.indexOf(":")>-1){var t=e.split(":"),n=(e=t[t.length-1]).indexOf("/");e=e.substring(n)}return e},compareSort:function(e){return function(t,n){return t[e]-n[e]}}};for(var Y in r.default.use(s.a),r.default.component(p.Popup.name,p.Popup),r.default.component(p.DatetimePicker.name,p.DatetimePicker),r.default.component(p.Picker.name,p.Picker),r.default.component(p.Navbar.name,p.Navbar),r.default.component(p.TabItem.name,p.TabItem),r.default.component(p.Swipe.name,p.Swipe),r.default.component(p.SwipeItem.name,p.SwipeItem),r.default.component(p.Switch.name,p.Switch),r.default.component(p.TabContainer.name,p.TabContainer),r.default.component(p.TabContainerItem.name,p.TabContainerItem),r.default.component(p.Toast),r.default.prototype.$toast=p.Toast,r.default.prototype.$message=p.MessageBox,r.default.prototype.$api=a,r.default.prototype.$http=R,r.default.config.productionTip=!1,new r.default({el:"#app",router:u,components:{App:c},template:"<App/>"}),V)r.default.filter(Y,V[Y]);var q=n("IuJc");if(q.isPing){var $="http://"+window.location.host+V.dealHttp(q.uploadUrl);window.location.host,V.dealHttp(q.oUrl)}else $=q.uploadUrl,q.oUrl;r.default.prototype.httpUrl=$,r.default.prototype.globalIsPing=q.isPing,r.default.prototype.getJsapi=function(){var e=window.location.href;e=e.split("#")[0],this.$http.get("do=get_jsapi&m=vipcard&url="+e).then(function(e){var t=e.appId,n=e.timestamp,a=e.nonceStr,r=e.signature;wx.config({debug:!1,appId:t,timestamp:n,nonceStr:a,signature:r,jsApiList:["checkJsApi","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard","error","chooseImage","previewImage","uploadImage","downloadImage"]})})},u.afterEach(function(e,t,n){var a=e.meta.title,r=e.name;document.title=a,"ShopNav"!=r&&"ShopStore"!=r&&"ShopStoreDetail"!=r&&window.localStorage.removeItem("stopIdx")});var G=window.localStorage.getItem("backUrl");if(G&&""!=G)window.location.href=G;else{var Q=window.location.href;if(Q.indexOf("?")<0){var X=Q.split("#");window.location.href=X[0]+"?#"+X[1]}}},eSy0:function(e,t){},i1of:function(e,t){},mc8w:function(e,t){!function(e,t){function n(){var e=a.clientWidth/7.5;a.style.fontSize=e+"px"}var a=t.documentElement,r=e.devicePixelRatio||1;if(function e(){t.body?t.body.style.fontSize=12*r+"px":t.addEventListener("DOMContentLoaded",e)}(),n(),e.addEventListener("resize",n),e.addEventListener("pageshow",function(e){e.persisted&&n()}),r>=2){var o=t.createElement("body"),i=t.createElement("div");i.style.border=".5px solid transparent",o.appendChild(i),a.appendChild(o),1===i.offsetHeight&&a.classList.add("hairlines"),a.removeChild(o)}}(window,document)},vkAd:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.b9f52ebe53817a64f41c.js.map