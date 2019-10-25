import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//全局显示底部导航栏
var showNav = true;
export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      meta: { title: '首页', showNav: showNav},
      component: resolve => require(['@/pages/Index'], resolve)
    },{
      path: '/shop',
      name: 'Shop',
      meta: { title: '积分商城', showNav: showNav},
      component: resolve => require(['@/pages/Shop'], resolve)
    },{
      path: '/me',
      name: 'Me',
      meta: { title: '我的', showNav: showNav},
      component: resolve => require(['@/pages/Me'], resolve)
    },{
      path: '/news/:id',
      name: 'News',
      meta: { title: '最新资讯'},
      component: resolve => require(['@/pages/IndexModule/News'], resolve)
    },{
      path: '/shopNav',
      name: 'ShopNav',
      meta: { title: '商户导航'},
      component: resolve => require(['@/pages/IndexModule/ShopNav'], resolve)
    },{
      path: "/shopStore",
      name: "ShopStore",
      meta: {title: "商户中心"},
      component: resolve => require(['@/pages/IndexModule/ShopStore'], resolve)
    },{
      path: "/assistantCenter",
      name: "AssistantCenter",
      meta: {title: "店员中心"},
      component: resolve => require(['@/pages/IndexModule/AssistantCenter'], resolve)
    },{
      path: "/assistant",
      name: "Assistant",
      meta: {title: "店员管理"},
      component: resolve => require(['@/pages/IndexModule/Assistant'], resolve)
    },{
      path: "/financeCenter",
      name: "FinanceCenter",
      meta: {title: "财务中心"},
      component: resolve => require(['@/pages/IndexModule/FinanceCenter'], resolve)
    },{
      path: "/shopNameList",
      name: "ShopNameList",
      meta: {title: "店员列表"},
      component: resolve => require(['@/pages/IndexModule/ShopNameList'], resolve)
    },{
      path: '/shopMsg',
      name: "ShopMsg",
      meta: {title: "店铺信息"},
      component: resolve => require(['@/pages/IndexModule/ShopMsg'], resolve)
    },{
      path: "/verificationList/:id",
      name: "VerificationList",
      meta: {title: "核销记录"},
      component: resolve => require(['@/pages/IndexModule/VerificationList'], resolve)
    },{
      path: "/verOrder/:ordersn?",
      name: "VerOrder",
      meta: {title: "核销订单"},
      component: resolve => require(['@/pages/IndexModule/verOrder'], resolve)
    },{
      path: "/record",
      name: "Record",
      meta: {title: "数据记录"},
      component: resolve => require(['@/pages/IndexModule/Record'], resolve)
    },{
      path: "/recordBack",
      name: "RecordBack",
      meta: {title:"订单"},
      component: resolve => require(['@/pages/IndexModule/RecordBack'], resolve)
    },{
      path: '/shopDetail/:id',
      name: 'ShopDetail',
      meta: { title: '商品详情'},
      component: resolve => require(['@/pages/IndexModule/ShopDetail'], resolve)
    },{
      path: '/shopConfirmOrder/:id',
      name: 'ShopConfirmOrder',
      meta: { title: '订单确定'},
      component: resolve => require(['@/pages/IndexModule/ShopConfirmOrder'], resolve)
    },{
      path: '/parking',
      name: 'Parking',
      meta: { title: '车辆'},
      component: resolve => require(['@/pages/IndexModule/Parking/Parking'], resolve)
    },{//parkingList
      path: '/parkingList/:bol?',
      name: 'ParkingList',
      meta: { title: '我的'},
      component: resolve => require(['@/pages/IndexModule/Parking/ParkingList'], resolve)
    },{//ParkingAdd
      path: '/parkingAdd',
      name: 'ParkingAdd',
      meta: { title: '新增车辆'},
      component: resolve => require(['@/pages/IndexModule/Parking/ParkingAdd'], resolve)
    },{//ParkingOrder
      path: '/parkingOrder',
      name: 'ParkingOrder',
      meta: { title: '缴费记录'},
      component: resolve => require(['@/pages/IndexModule/Parking/ParkingOrder'], resolve)
    },{
      path: '/parkingDetial',
      name: 'ParkingDetial',
      meta: { title: '交易详情'},
      component: resolve => require(['@/pages/IndexModule/Parking/ParkingDetial'], resolve)
    },{
      path: "/order",
      name: "Order",
      meta: {title: "兑换记录"},
      component: resolve => require(['@/pages/ShopModule/Order'], resolve)
    },{
      path: '/jfDetail',
      name: 'JfDetial',
      meta: {title: "积分列表"},
      component: resolve => require(['@/pages/ShopModule/JfDetail'], resolve)
    },{
      path: '/explain',
      name: 'Explain',
      meta: {title: "积分规则说明"},
      component: resolve => require(['@/pages/ShopModule/explain'], resolve)
    },{
      path: '/jfExplain',
      name: 'JfExplain',
      meta: {title: "商家积分说明"},
      component: resolve => require(['@/pages/ShopModule/jfExplain'], resolve)
    },{
      path: '/card/:id?',
      name: 'Card',
      meta: {title: "会员卡"},
      component: resolve => require(['@/pages/MeModule/Card'], resolve)
    },{
      path: '/cardCom',
      name: 'CardCom',
      meta: {title: ''},
      component: resolve => require(['@/pages/MeModule/CardCom'], resolve)
    },{
      path: '/vipCenter',
      name: 'VipCenter',
      meta: {title: "会员中心"},
      component: resolve => require(['@/pages/MeModule/VipCenter'], resolve)
    },{
      path: '/myMsg',
      name: 'MyMsg',
      meta: {title: "资料"},
      component: resolve => require(['@/pages/MeModule/MyMsg'], resolve)
    },{
      path: '/vipPay/:id?',
      name: 'VipPay',
      meta: {title: "会员支付"},
      component: resolve => require(['@/pages/MeModule/VipPay'], resolve)
    },{
      path: '/vipChong',
      name: 'VipChong',
      meta: {title: "会员充值"},
      component: resolve => require(['@/pages/MeModule/VipChong'], resolve)
    },{
      path: '/jfList/:type',
      name: 'JfList',
      meta: {title: "积分明细"},
      component: resolve => require(['@/pages/MeModule/JfList'], resolve)
    },{
      path: '/consumeList',
      name: 'ConsumeList',
      meta: {title: "消费明细"},
      component: resolve => require(['@/pages/MeModule/ConsumeList'], resolve)
    },{
      path: '/coupon',
      name: 'Coupon',
      meta: {title: "优惠券"},
      component: resolve => require(['@/pages/MeModule/Coupon'], resolve)
    },{
      path: "/teamCenter",
      name: "TeamCenter",
      meta: {title: "团队中心"},
      component: resolve => require(['@/pages/MeModule/TeamCenter'], resolve)
    },{
      path: '/message',
      name: 'Message',
      meta: {title: "消息中心"},
      component: resolve => require(['@/pages/MeModule/Message'], resolve)
    },{
      path: '/messageDetail/:id',
      name: 'MessageDetail',
      meta: {title: '消息'},
      component: resolve => require(['@/pages/MeModule/MessageDetail'], resolve)
    },{
      path: '/myTeam',
      name: 'MyTeam',
      meta: {title: '我的团队'},
      component: resolve => require(['@/pages/MeModule/MyTeam'], resolve)
    },{
      path: "/myTeamDetail/:id",
      name: "MyTeamDetail",
      meta: {title: "成员信息"},
      component: resolve => require(['@/pages/MeModule/MyTeamDetail'], resolve)
    },{
      path: "/shopQrcode/:code?/:status?/:qrcode?/:ordersn?",
      name: "ShopQrcode",
      meta: {title: "二维码"},
      component: resolve => require(['@/pages/IndexModule/ShopQrcode'], resolve)
    },{
      path: "/shopBill",
      name: "ShopBill",
      meta: {title: "发票"},
      component: resolve => require(['@/pages/IndexModule/ShopBill'], resolve)
    },{
      path: "/parkList",
      name: "ParkList",
      meta: {title: "停车缴费标准"},
      component: resolve => require(['@/pages/IndexModule/ParkList'], resolve)
    }
  ]
})
