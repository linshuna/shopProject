<template>
    <div class='vip-chong-wrap'>
        <div class='vip-top'>
            <div class='vip-inner'>
                <div class='header-icon'>
                    <img :src='info.avatar'/>
                </div>
                <div class='vip-msg' v-show="info">
                    <div>{{info.realname}}</div>
                    <div>会员卡：{{info.cardsn}}</div>
                    <div>余额：{{info.credit2}}</div>
                </div>
            </div>
        </div>
        <div class='vip-money'>
            <div class='vip-title'>充值金额</div>
            <div class='vip-square-wrap'>
                <div class='vip-square-inner'>
                    <div class='vip-square'
                        v-for="item in moneyArr" @click="check(item)">
                        <div class="square-inner" :class="{'square-active': checkedMoney==item.num}" v-if="!item.def">
                            <span class='font-28'>￥</span>{{item.num}}
                        </div>
                        <div class="square-inner" :class="{'square-active': defShow}" v-else>
                            <input placeholder='自定金额' type="number" v-model="defMoney" @keyup.enter="chongFn" @blur="chongFn"/>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class='vip-title'>充值方式</div>
        <div class='vip-pay-type'>
            <div class='vip-pay-inner'>
                <img src='../../assets/images/weixin-icon.png' class='weixin-icon'/>
                <span>微信支付</span>
                <img src='../../assets/images/weixin-right-icon.png' class='right-icon'/>
            </div>
        </div>
        <!--<div class='vip-title'>
            <span>团队充值</span>
            <img src='../../assets/images/right-icon.png'/>
        </div>-->
        <div class='btn-wrap'>
            <button @click="chongFn">充值</button>
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return {
            checkedMoney: 50,
            moneyArr: [{num: 50},{num: 100},{num: 200},{num: 300},{num: 1000},{def: true}],
            defMoney: '',
            defShow: false,
            info: ''
        }
    },
    mounted() {
        this.getJsapi()
        //获取个人信息
        var _this = this;
        this.$http.get("do=info&m=vipcard")
        .then(function(res){
            _this.info = res;
        })
    },
    methods: {
        check(item){
            if(item.def == true){
                this.checkedMoney = ''
                this.defShow = true;
            }else{
                this.checkedMoney = item.num;
                this.defShow = false;
            }
        },
        chongFn(){
            var _this = this;
            var money = (this.defShow?this.defMoney:this.checkedMoney) - 0;
            this.$http.get("do=recharge&m=vipcard&fee="+money)
            .then(function(res){
                _this.jsApiCall(res)
            })
        },
        jsApiCall: function(result){
            // var ii = eval('('+result+')');
            self = this;
            WeixinJSBridge.invoke('getBrandWCPayRequest',result,function(res){
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    self.$toast({message:'支付成功'});
                    self.checkedMoney = 50;
                    self.defMoney = '';
                    self.defShow = false;
                    return false;
                }else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
                    // alert('已取消支付');
                    self.$toast({message:'已取消支付'});
                    return false;
                }else if(res.err_msg == 'get_brand_wcpay_request:fail'){
                    // alert('支付失败');
                    self.$toast({message:'支付失败'});
                    return false;
                }
            })
        },
        callpay: function(result){
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            }else{
                this.jsApiCall(result)
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .vip-chong-wrap{
        width: 100%;
        padding-top: .86rem;
    }
    .vip-top{
        width: 100%;
        padding: .34rem;
        box-sizing: border-box;
    }
    .vip-top .vip-inner{
        width: 100%;
        height: 2rem;
        background: #5A57DA;
        border-radius: 8px;
        color: #fff;
        padding-left: .8rem;
        box-sizing: border-box;
    }
    .vip-top .vip-inner{
        display: flex;
        align-items: center;
        justify-content:flex-start;
    }
    .vip-top .header-icon{
        width: 1rem;
        height: 1rem;
    }
    .header-icon img{
        width: 100%;
        height: 100%;
        border-radius: 100px;
    }
    .vip-msg{
        width: 80%;
        text-align: left;
        padding-left: .6rem;
        box-sizing: border-box;
    }
    .vip-msg view{
        padding: .6rem 0;
    }

    .vip-money{
        width: 100%;
    }
    .vip-title{
        width: 100%;
        background: #fff;
        padding: .2rem .34rem;
        box-sizing: border-box;
        font-size: .28rem;
        position: relative;
    }
    .vip-title text,.vip-title img{
        vertical-align: middle;
    }
    .vip-title img{
        width: .18rem;
        height: .3rem;
        position: absolute;
        right: .2rem;
        top: 50%;
        margin-top: -.15rem;
    }
    .vip-square-inner{
        width: 100%;
        padding: 0 .1rem;
        box-sizing: border-box;
        margin: .2rem auto;
        font-size: 0;
    }
    .vip-square-wrap{
        margin-bottom: .4rem;
    }
    
    .vip-square-wrap .vip-square{
        display: inline-block;
        width: 33.3%;
        font-size: .4rem;
        color: #6559D1;
        font-weight: 500;
        padding: 0 .1rem .2rem;
        box-sizing: border-box;
        text-align: center;
        height: 1.2rem;
        line-height: 1rem;
    }
    .square-inner{
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 6px;
    }
    .square-active{
        background: #41B035;
        color: #fff;
    }
    .square-active input{
        color: #fff;
        background: #41B035;
    }
    .vip-square-wrap .vip-square input{
        font-size: .28rem;
        margin-top: .26rem;
        width: 100%;
        text-align:center;
    }
    .vip-square-wrap .vip-square:last-child{
        margin-right: 0;
    }

    .vip-pay-type{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        margin: .2rem auto .4rem;
    }
    .vip-pay-inner{
        width: 100%;
        border-radius: 8px;
        background: #fff;
        padding: .34rem;
        position: relative;
        box-sizing: border-box;
    }
    .vip-pay-inner img,.vip-pay-inner span{
        vertical-align: middle;
        padding-right: .2rem;
    }
    .weixin-icon{
        width: .4rem;
        height: .4rem;
    }
    .right-icon{
        width: .4rem;
        height: .4rem;
        position: absolute;
        right: .2rem;
    }
    .btn-wrap{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .btn-wrap button{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        background: red;
        color: #fff;
        font-size: .28rem;
        border-radius: 0;
    }
    .square-active input::-webkit-input-placeholder { /* WebKit browsers */
        color:    #fff;
    }
    .square-active input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #fff;
    }
    .square-active input::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #fff;
    }
    .square-active input:-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #fff;
    }
</style>