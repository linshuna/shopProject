<template>
<div class='vip-wrap'>
    <ul>
        <li>
            <span>姓名</span>
            <input type='text' placeholder='请输入姓名' v-model="realname"/>
        </li>
        <li>
            <span>手机号</span>
            <input type='tel' placeholder='请输入手机号' v-model="mobile"/>
        </li>
        <li class="yzm-wrap">
            <div class="yzm-inner">
                <span>验证码</span>
                <input type='tel' placeholder='请输入验证码' v-model="smscode"/>
            </div>
            <span class="send-yzm" :class="{'gray-color': showYzm}" @click="sendYzm">{{showYzm?m+' s':'发送验证码'}}</span>
        </li>
        <li v-show="cardMsg.card_fee&&cardMsg.card_fee!=''&&cardMsg.card_fee>0">
            <span>会员费用</span>
            <span class='red-color'>{{cardMsg.card_fee}}元</span>
        </li>
  </ul>
    <div class='tip-wrap blue-color'>
        <div>办理会员卡说明：办理会员需支付15元会员费</div>
        <div>企业办卡大于等于100张时免费办理！</div>
        <div>充值5000或以上，免除会员费</div>
    </div>
    <div class='btn-wrap'>
        <button class='get-btn' @click='getCard'>领取</button>
        <!--<button class='com-btn' @click="goTeam">企业/团队办理点击</button>-->
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            m: 59,
            mobile: '',
            realname: '',
            smscode:　'',
            pid: 4,
            showYzm: false,
            cardMsg: ''
        }
    },
    mounted(){
        // var info = JSON.parse(window.localStorage.getItem("info"))
        this.pid = this.$route.params.id;
        if(this.pid){
            document.title = "团队会员卡";
        }
        var _this = this;
        this.$http.get("do=get_setting&m=vipcard")
        .then(function(res){
            _this.cardMsg = res;
        })
        
        
    },
    methods: {
        sendYzm(){//点击验证码
            var _this = this;
            if(this.showYzm) return false;//已经点击验证码
            this.$http.get("do=verifycode&m=vipcard&mobile="+this.mobile)
            .then(function(res){
                _this.showYzm = true;
                var m = _this.m;
                var timer = setInterval(function(){
                    if(m<=1){
                        clearInterval(timer);
                        _this.showYzm = false;
                        _this.m = 59;
                        return false;
                    }
                    m--;
                    _this.m = m
                },1000)
            })
        },
        goTeam(){
            this.$router.push("/cardCom")
        },
        getCard(){//领卡
            var fee = this.cardMsg.card_fee
            if(!fee||fee==''){//不用支付的领取
                this.goVipCenter()
            }else{
                this.jsApiCall()
            }
        },
        goVipCenter(){
            var _this = this;
            this.$http.get("do=get_card&m=vipcard&mobile="+this.mobile+"&realname="+this.realname+"&smscode="+this.smscode+"&pid="+this.pid)
            .then(function(res){
                _this.$toast({message:'领卡成功'});
                setTimeout(function(){
                    _this.$router.push("/vipCenter")
                },1000)
            })
        },
        jsApiCall: function(result){
            // var ii = eval('('+result+')');
            self = this;
            WeixinJSBridge.invoke('getBrandWCPayRequest',result.packages,function(res){
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    self.$toast({message:'支付成功'});
                    self.goVipCenter()
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
    .vip-wrap{
        width: 100%;
        padding-top: .86rem;
    }
    .vip-wrap ul{
        display: block;
        width: 100%;
        padding: .34rem .34rem 0;
        box-sizing: border-box;
    }
    .vip-wrap li{
        display: flex;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        background: #fff;
        border-radius: 8px;
        padding: .2rem .34rem;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .34rem;
    }
    .vip-wrap li input{
        text-align: right;
    }
    .tip-wrap{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        font-size: .24rem;
        line-height: .38rem;
    }
    .blue-color{
        color: #2D5DC2;
    }
    .btn-wrap{
        width: 100%;
        height: .8rem;
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: 0;
    }
    .btn-wrap button{
        display: inline-block;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        color: #fff;
        border-radius: 0;
        font-size: .28rem;
    }
    .get-btn{
        background: #FFA401;
    }
    .com-btn{
        background: #FE0000;
    }
    .vip-wrap li.yzm-wrap{
        background: transparent;
        padding: 0;
    }
    .yzm-inner{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        height: .8rem;
        line-height: .8rem;
        background: #fff;
        border-radius: 8px;
        padding: .2rem .34rem;
        box-sizing: border-box;
        input{
            width: 60%;
        }
        span{
            vertical-align: middle;
        }
    }
    .send-yzm{
        display: inline-block;
        width: 1.8rem;
        padding-right: .34rem;
        text-align: center;
        box-sizing: border-box;
    }
</style>