webpackJsonp([42],{hEE0:function(t,e){},jbsa:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{type:2,page:1,totalPage:0,check:!0,list:[]}},mounted:function(){this.type=this.$route.params.type,this.init(),window.addEventListener("scroll",this.handleScroll,!0)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},methods:{handleScroll:function(){if(this.$refs.contentWrap&&((document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset)+(document.documentElement.clientHeight||document.body.clientHeight)==(document.documentElement.scrollHeight||document.body.scrollHeight)&&this.page<=this.totalPage)){if(!this.check)return!1;this.check=!this.check,this.init(!0)}},init:function(t){var e=this;this.$http.get("do=recharge_log&m=vipcard&page="+this.page).then(function(i){1==t&&(e.check=!0,e.page++),e.list=e.list.concat(i.list),e.totalPage=i.allpage})},goBill:function(t){window.location.href="http://www.chjisw.com/app/index.php?i=1&c=entry&do=invoice&m=vipcard&id="+t.id}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"contentWrap",staticClass:"detail-wrap"},[t._l(t.list,function(e){return i("div",{staticClass:"list"},[i("div",{staticClass:"set-padding set-flex"},[i("span",[t._v("单号："+t._s(e.tid))]),t._v(" "),i("span",{staticClass:"red-color"},[t._v("￥"+t._s(e.fee))])]),t._v(" "),i("div",{staticClass:"gray-color set-flex"},[i("span",[t._v(t._s(e.createtime))]),t._v(" "),i("button",{staticClass:"bill-btn",on:{click:function(i){return t.goBill(e)}}},[t._v("发票")])])])}),t._v(" "),t.list&&0!=t.list.length?t._e():i("p",{staticClass:"gray-color not-data-tip"},[t._v("暂无发票记录")])],2)},staticRenderFns:[]};var c=i("Mz/3")(n,s,!1,function(t){i("hEE0")},"data-v-5764c800",null);e.default=c.exports}});
//# sourceMappingURL=42.489a9e1afd3750a04681.js.map