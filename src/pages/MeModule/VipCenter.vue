<template>
<div>
    <div class='vip-center-wrap'>
        <div class='list-top'>
            <div class='msg-main'>
                <img :src='info.avatar'/>
                <div class='msg-con'>
                    <div>{{info.realname}}</div>
                    <div class='font-22'>绑定手机：<span class='no-ban'>{{info.cardsn}}</span></div>
                </div>
                <!--<button class='my-msg-btn' @click='goMyMsg'>修改资料</button>-->
            </div>
        </div>
        <div class='my-money'>
            <div class='my-money-inner'>
                <div class='border-l' @click='goJfDetail(1)'>
                    <img src='../../assets/images/vip-money.png'/>
                    <span>我的余额：</span>
                    <span>￥{{info.credit2}}</span>
                    <!--<div class='xian-btn'>提现</div>-->
                </div>
                <div @click='goJfDetail(2)'>
                    <img src='../../assets/images/vip-jf.png'/>
                    <span>可用积分</span>
                    <span>{{info.credit1}}</span>
                </div>
            </div>
        </div>

        <div class='title'>
            <img src='../../assets/images/serice-icon.png'/>
            <span class='gray-color font-30'>{{shopInfo.branch_name}}会员服务</span>
        </div>
        <div class='list-con'>
            <!--<div class='square' @click='goVipPay'>
                <img src='../../assets/images/vip-pay.png'/>
                <div>会员支付</div>
            </div>
            <div class='square' @click='saoFn'>
                <img src='../../assets/images/store/sao-icon.png' style='width:.46rem;height: .42rem;'/>
                <div>会员支付</div>
            </div>-->
            <div class='square' @click='goVipChong'>
                <img src='../../assets/images/vip-chong-icon.png' style='width:.5rem;'></image>
                <div>会员充值</div>
            </div>
            <div class='square' @click='goShop'>
                <img src='../../assets/images/jf-shop-icon.png'  style='width:.5rem;'/>
                <div>积分商城</div>
            </div>
            <div class='square' @click='goOrder'>
                <img src='../../assets/images/order-icon.png'  style='width:.48rem;'/>
                <div>我的订单</div>
            </div>
            <div class='square' @click='goBill'>
                <img src='../../assets/images/vip-pay.png' style='width:.5rem;'></image>
                <div>发票申请</div>
            </div>
            <div class='square' @click='goShop'>
                <img src='../../assets/images/act-center-icon.png'  style='width:.5rem;'/>
                <div>活动中心</div>
            </div>
            <div class='square' @click='goJfDetail(2)'>
                <img src='../../assets/images/jf-detail-icon.png'  style='width:.5rem;'/>
                <div>积分明细</div>
            </div>
            <div class='square' @click='goJfDetail(1)'>
                <img src='../../assets/images/list-icon.png' style='width:.5rem;'/>
                <div>消费明细</div>
            </div>
            <div class='square' @click='goMyTeam'>
                <img src='../../assets/images/team-icon.png' style='width:.5rem;'/>
                <div>我的团队</div>
            </div>
            <div class='square' @click='goMsgCenter'>
                <img src='../../assets/images/msg-center-icon.png'/>
                <div>消息中心</div>
            </div>
            <div class='square' @click='goCoupon'>
                <img src='../../assets/images/card-icon.png'/>
                <div>优惠券</div>
            </div>
            <!--<div class='square' @click='goTeamCenter'>
                <img src='../../assets/images/tem-center-icon.png' style='height:.5rem;width:.5rem;'/>
                <div>团队中心</div>
            </div>-->
        </div>
    </div>
    <bar-footer idx="2"></bar-footer>
</div>
</template>
<script>
import BarFooter from "@/components/footer"
export default {
    data(){
        return{
            shopInfo: '',//获取店铺信息
            info: {}
        }
    },
    components:{
        "bar-footer": BarFooter
    },
    mounted(){
        //获取微信支付
        this.getJsapi()
        //获取店铺信息
        var shopInfo = window.localStorage.getItem("shopInfo")
        this.shopInfo = shopInfo?JSON.parse(shopInfo):''
        var _this = this;
        this.$http.get("do=info&m=vipcard")
        .then(function(res){
            _this.info = res;
            var iscard = res.iscard;
            if(iscard!=1){//未领卡
                _this.$router.push("/card")
            }
        })
    },
    methods: {
        goMyMsg(){//资料
            this.$router.push("/myMsg")
        },
        goJfDetail(type){//1: 余额明细 2：积分明细
            this.$router.push("/JfList/"+type)
        },
        goVipPay(){//会员支付
            this.$router.push("/vipPay")
        },
        goVipChong(){//会员充值
            this.$router.push("/vipChong")
        },
        goBill(){
            this.$router.push("/shopBill")
        },
        goOrder(){//我的订单
            this.$router.push("/order")
        },
        goShop(){//积分商城
            this.$router.push("/shop")
        },
        goCoupon(){//优惠券
            this.$router.push("/coupon")
        },
        goTeamCenter(){//团队中心
            this.$router.push("/teamCenter")
        },
        goMsgCenter(){//消息中心
            this.$router.push("/message")
        },
        goConsumeList(){
            this.$router.push("/consumeList")
        },
        goMyTeam(){
            this.$router.push("/teamCenter")///myTeam
        },
        saoFn(){//扫一扫
            var _this = this;
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: ['scanQRCode'],
                    success: function (res) {
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                _this.verification(result)
                            }
                        });
                    }
                });
                
            })
        },
        verification(str){
            this.$http.get("do=set_used&m=vipcard&sn="+str,{forbidden:true}) 
            .then(function(res){
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .vip-center-wrap{
        width: 100%;
        height: 100%;
        padding-bottom: .86rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .list-top{
        width: 100%;
        height: 2.6rem;
        color: #fff;
        background: url(../../assets/images/vip-center-bg.png) no-repeat; 
        background-size: 100% 100%;
    }
    .msg-main{
        width: 100%;
        height: 2rem;
        position: relative;
        padding: .6rem .4rem;
        box-sizing: border-box;
    }
    .msg-main img{
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(0, 0, 0, .5);
        border-radius: 100px;
        vertical-align: top;
    }
    .msg-con{
        display: inline-block;
        margin-left: .4rem;
        vertical-align: top;
    }
    .msg-con .font-22{
        margin-top: .1rem;
    }
    .no-ban{
        opacity: .8;
    }
    .my-msg-btn{
        width: 1.4rem;
        height: .42rem;
        line-height: .42rem;
        padding: 0;
        position: absolute;
        right: .34rem;
        bottom: .2rem;
        border-radius: 100px;
        background: #fff;
        color: #71C4C7;
        font-size: .24rem;
    }

    .my-money{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        margin-top: -.3rem;
        color: #333;
        margin-bottom: .3rem;
    }
    .my-money-inner{
        width: 100%;
        height: .96rem;
        padding: .3rem 0;
        border-radius: 8px;
        background: #fff;
        box-sizing: border-box;
        font-size: 0;
    }
    .my-money-inner>div{
        display: inline-block;
        width: 50%;
        padding: 0 .2rem;
        box-sizing: border-box;
        vertical-align: middle;
        font-size: .24rem;
    }
    .my-money-inner .border-l{
        border-right: 1px solid #efefef;
        position: relative;
    }
    .my-money-inner img{
        display: inline-block;
        width: .4rem;
        height: .4rem;
        margin-right: .1rem;
        vertical-align: middle;
    }
    .xian-btn{
        width: .72rem;
        height: .32rem;
        line-height: .32rem;
        text-align: center;
        border-radius: 9px;
        color: red;
        border: 1px solid red;
        position: absolute;
        top: -.26rem;
        right: .11rem;
        font-size: .22rem;
    }


    .title{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        color: gray;
        background: #fff;
        border-bottom: 1px solid #efefef;
        padding: 0 .34rem;
        box-sizing: border-box;
    }
    .title img{
        width: .4rem;
        height: .4rem;
        vertical-align: middle;
    }
    .title span{
        display: inline-block;
        margin-left: .1rem;
        vertical-align: middle;
    }
    .list-con{
        width: 100%;
        background: #fff;
        font-size: 0;
    }
    .list-con .square{
        display: inline-block;
        width: 33.3%;
        text-align: center;
        color: gray;
        padding: .34rem 0;
        box-sizing: border-box;
        font-size: .24rem;
    }
    .square img{
        display: inline-block;
        width: .56rem;
        height: .46rem;
        padding-bottom: .1rem;
    }

</style>