webpackJsonp([21],{"9B64":function(s,t){},BvBA:function(s,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={data:function(){return{id:"",swiperCurrent:0,imgUrls:[],goods:{}}},mounted:function(){this.$nextTick(function(){var s=this;this.id=this.$route.params.id,this.$http.get("do=detail&m=score_shop&id="+this.id).then(function(t){s.imgUrls=0==t.goods.thumb_url.length?[t.goods.thumb]:t.goods.thumb_url,s.goods=t.goods,console.log(t)})})},methods:{goChangeShop:function(){this.$router.push("/shopConfirmOrder/"+this.id)},handleChange:function(s){this.swiperCurrent=s}}},e={render:function(){var s=this,t=s.$createElement,i=s._self._c||t;return i("div",{staticClass:"shop-wrap"},[i("div",{staticClass:"slider-wrap"},[i("div",{directives:[{name:"show",rawName:"v-show",value:s.imgUrls.length>0,expression:"imgUrls.length>0"}],staticClass:"slider-inner"},[i("mt-swipe",{attrs:{"show-indicators":!1,auto:0},on:{change:s.handleChange}},s._l(s.imgUrls,function(s){return i("mt-swipe-item",[i("img",{attrs:{src:s}})])}),1),s._v(" "),i("div",{staticClass:"dots"},[i("div",{staticClass:"dot"},[s._v(s._s(s.swiperCurrent+1)+"/"+s._s(s.imgUrls.length))])])],1)]),s._v(" "),i("div",{staticClass:"money-wrap"},[i("div",{staticClass:"border-right"},[i("span",{staticClass:"set-padding font-22"},[s._v("积分：")]),s._v(" "),i("span",{staticClass:"red-color font-34"},[s._v(s._s(s.goods.marketprice))])]),s._v(" "),i("div",[i("span",{staticClass:"set-padding font-22"},[s._v("兑换期限:")]),s._v(" "),s.goods.timestart||s.goods.timeend?i("span",{staticClass:"red-color font-34"},[s._v("\n                "+s._s(s.goods.timestart.split(" ")[0])+"到"+s._s(s.goods.timeend.split(" ")[0])+"\n            ")]):s._e()])]),s._v(" "),i("div",{staticClass:"shop-detail"},[i("div",[s._v("物品详情：")]),s._v(" "),i("div",[s._v("产品："+s._s(s.goods.title)+"。")]),s._v(" "),i("div",[s._v("每个用户兑换数："+s._s(s.goods.usermaxbuy)+s._s(s.goods.unit))]),s._v(" "),i("div",{domProps:{innerHTML:s._s(s.goods.content)}})]),s._v(" "),i("div",{staticClass:"shop-img-wrap"},[i("img",{attrs:{src:s.goods.thumb}})]),s._v(" "),i("div",{staticClass:"btn-wrap"},[i("button",{staticClass:"btn-detail"},[i("span",[s._v("积分：")]),s._v(" "),i("span",{staticClass:"red-color font-30"},[s._v(s._s(s.goods.marketprice))])]),s._v(" "),i("button",{staticClass:"immediateBtn",on:{click:s.goChangeShop}},[s._v("立即兑换")])])])},staticRenderFns:[]};var a=i("Mz/3")(o,e,!1,function(s){i("b4IJ"),i("9B64")},"data-v-4acb0dec",null);t.default=a.exports},b4IJ:function(s,t){}});
//# sourceMappingURL=21.fa1c88dda4f8e146218d.js.map