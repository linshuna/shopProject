<template>
    <div>
        <!--二维码 :item
        <erweima :show="show" :item="erweima"></erweima>-->
        <!--邀请会员-->
        <div class="vip-erweima-wrap" v-if="code=='vip'">
            <div class="erweima-inner">
                <div class="square">
                    <img :src="erweima.qrcode"/>
                </div>
                <p class="tip">请将二维码展示给店员</p>
            </div>
        </div>
        <div class="shop-erweima-wrap" v-else-if="code=='shopPay'">
            <div class="shop-inner">
                <div class="shop-con">
                    <p class="title">三号湾会员支付</p>
                    <div class="shop-erweima-inner">
                        <div class="shop-erweima-con">
                            <img :src="erweima.qrcode"/>
                        </div>
                    </div>
                    <div class="shop-name-wrap">{{shopName}}</div>
                </div>
                <div class="btn-wrap">
                    <button @click="goBack">返回</button>
                </div>
                <p class="tip">提示：长按二维码即可保存图片和识别二维码</p>
            </div>
        </div>
        <!--二维码核销用得-->
        <div class="erweima-wrap" v-else>
            <div class="erweima-inner">
                <div class="square">
                    <img :src="erweima"/>
                    <p class="orderSn">订单号：{{orderSn}}</p>
                </div>
            </div>
            <p class="tip">请将二维码展示给店员</p>
            <div class="detail-msg">
                <p>名称：{{shop.goods_name}}</p>
                <p>单价：{{shop.price}}元</p>
                <p>最多核销数量：{{shop.total}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import ShopErWeima from "../../components/ShopErWeima"; 
export default {
    data(){
        return{
            code: '',
            erweima: {},
            shopName: '',
            orderSn: '',
            shop: ''
        }
    },
    components:{
        "erweima": ShopErWeima
    },
    mounted() {
        this.$nextTick(function(){
            var code = this.$route.params.code;
            this.code = code;
            var _this = this;
            if(code=='vip'){//带参数的 是邀请会员
                this.$http.get("do=team_data&m=vipcard")
                .then(function(res){
                    _this.erweima = res
                })
            }else if(code == 'shopPay'){//付款二维码
                this.$http.get("do=get_storeinfo&m=vipcard")
                .then(function(res){
                    _this.erweima = res;
                    _this.shopName = res.branch_name;
                })
                document.title = "付款码"
            }else{//核销订单二维码
                this.orderSn = this.$route.params.ordersn;
                var data = JSON.parse(decodeURIComponent(this.$route.params.qrcode));
                this.shop = data;
                this.erweima = data.qrcode;
            }
        })
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        }        
    },
}
</script>

<style lang="scss" scoped>
    @import '../../assets/css/style';
    .erweima-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        background: url(../../assets/images/verification-icon.png) #E40000 no-repeat;
        background-size: 100%;
        z-index: 2;
        .orderSn{
            background: transparent;
            font-size: .24rem;
            color: #000;
        }
    }
    .vip-erweima-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100%;
        z-index: 2;
        padding-top: .86rem;
        .erweima-inner{
            background: #fff;
        }
        .tip{
            color: #000;
            margin-top: 0;
        }
    }
    .shop-erweima-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 1rem .2rem;
        box-sizing: border-box;
        background: #529562;
        .shop-inner{
            background: #fff;
            width: 100%;
            height: 100%;
            padding: .42rem;
            box-sizing: border-box;
        }
        .shop-con{
            height: 86%;
            background: #299F3E;
            border:1px solid #299F3E;
            position: relative;
            .title{
                color: #fff;
                font-weight: 500;
                font-size: 22px;
                text-align: center;
                padding: .6rem 0;
            }
            .shop-erweima-inner{
                width: 3.4rem;
                height: 3.4rem;
                margin: 0 auto;
                background: #fff;
                border-radius: 4px;
                overflow: hidden;
                .shop-erweima-con{
                    width: 100%;
                    height: 100%;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .shop-name-wrap{
                background: #fff;
                width: 100%;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                font-size: 18px;
                margin-top: .6rem;
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
        .btn-wrap{
            width: 100%;
            margin-top: .42rem;
            text-align: center;
            button{
                display: inline-block;
                width: 70%;
                height: .8rem;
                font-size: .26rem;
                background: transparent;
                border: 1px solid #299F3E;
                color: #299F3E;
                border-radius: 4px;
            }
        }
        .tip{
            color: red;
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: .24rem;
            left: 50%;
            transform: translate(-50%,0);
        }
    }
    .erweima-inner{
        width: 65%;
        height: 5rem;
        margin: 1.6rem auto 0;
        text-align: center;
        position: relative;
    }
    .square{
        display: inline-block;
        width: 75%;
        text-align: center;
        color:#fff;
        margin-top: 10%;
        // background: #efefef;
        // height: 2rem;
        // line-height: 2rem;
        // margin-bottom: .34rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .change-ma{
        position: absolute;
        color: #333;
        font-size: .22rem;
        left: 50%;
        transform: translate(-50%,0);
        bottom: .34rem;
    }
    .detail-msg{
        width: 65%;
        text-align: left;
        color: #fff;
        font-size: .24rem;
        margin: 0 auto;
        padding-top: .4rem;
    }
    .tip{
        text-align: center;
        color: #fff;
        font-size: .22rem;
        margin-top: .34rem;
    }
</style>

