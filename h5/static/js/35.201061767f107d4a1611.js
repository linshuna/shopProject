webpackJsonp([35],{javs:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={data:function(){return{show:!1,page:1,totalPage:0,check:!0,list:[],checkMsg:{},status:2,tabData:[{name:"未使用",id:2},{name:"已使用",id:1}]}},mounted:function(){this.$nextTick(function(){this.init(),window.addEventListener("scroll",this.handleScroll,!0)})},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){if((document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset)+(document.documentElement.clientHeight||document.body.clientHeight)==(document.documentElement.scrollHeight||document.body.scrollHeight)&&this.page<=this.totalPage){if(!this.check)return!1;this.check=!this.check,this.init()}},init:function(){var t=this;this.$http.get("do=user_coupon&m=vipcard&page="+this.page+"&psize=10&is_used="+this.status+"&sid=1").then(function(s){t.check=!0,t.page++,t.totalPage=s.allpage,t.list=t.list.concat(s.list)})},checkTab:function(t){this.status=t.id,this.list=[],this.page=1,this.init()},clickMarskShow:function(t){if(1==t.is_used)return!1;this.show=!0,this.checkMsg=t},clickMarskHide:function(){this.show=!1},rightNowUse:function(){this.show=!1}}},e={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"main-con"},[i("div",{staticClass:"tab"},t._l(t.tabData,function(s,a){return i("div",{class:{active:t.status==s.id},on:{click:function(i){return t.checkTab(s)}}},[t._v(t._s(s.name))])}),0),t._v(" "),t.list.length>0?i("div",{staticClass:"card-wrap"},t._l(t.list,function(s){return i("div",{staticClass:"card-list",class:{"card-gray-bg":2!=s.is_used},on:{click:function(i){return t.clickMarskShow(s)}}},[i("div",[i("div",{staticClass:"card-con"},[i("div",{staticClass:"card-money"},[i("span",{staticClass:"font-20"},[t._v("￥")]),t._v(" "),i("span",[t._v(t._s(s.card_money))])]),t._v(" "),i("div",[i("div",[t._v("优惠券")]),t._v(" "),i("div",{staticClass:"font-20"},[t._v(t._s(s.branch_name)+"可用")])])]),t._v(" "),i("div",{staticClass:"font-20 useful-date"},[t._v("领取日期："+t._s(s.ctime))])]),t._v(" "),2==s.is_used?i("div",{staticClass:"right-new-wrap"},[t._v("立即使用")]):i("div",{staticClass:"right-new-wrap"},[t._v("已经使用")])])}),0):t._e(),t._v(" "),0==t.list.length&&2==t.status?i("div",{staticClass:"no-data-tip"},[t._v("暂无未使用的优惠券")]):t._e(),t._v(" "),0==t.list.length&&1==t.status?i("div",{staticClass:"no-data-tip"},[t._v("暂无使用记录")]):t._e(),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"marsk",on:{click:t.clickMarskHide}},[i("div",{staticClass:"toast-bg"},[i("div",{staticClass:"toast-inner"},[i("div",{staticClass:"title"},[t._v("恭喜您")]),t._v(" "),i("div",{staticClass:"title"},[t._v("获得优惠券")]),t._v(" "),i("div",{staticClass:"card-con"},[i("div",{staticClass:"card-money"},[i("span",{staticClass:"font-20"},[t._v("￥")]),i("span",[t._v(t._s(t.checkMsg.card_money))])]),t._v(" "),i("div",[t._v("优惠券")])])])])])])},staticRenderFns:[]};var c=i("Mz/3")(a,e,!1,function(t){i("rfd7")},"data-v-e52160b6",null);s.default=c.exports},rfd7:function(t,s){}});
//# sourceMappingURL=35.201061767f107d4a1611.js.map