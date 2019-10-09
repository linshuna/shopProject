<template>
    <div>
        <!--二维码 :item
        <erweima :show="show" :item="erweima"></erweima>-->
        <div :class="{'erweima-wrap': !code,'vip-erweima-wrap':code}">
            <div class="erweima-inner">
                <div class="square">
                    <img :src="erweima.qrcode"/>
                </div>
                <p class="tip" v-if="code">请将二维码展示给店员</p>
            </div>
            <p class="tip" v-if="!code">请将二维码展示给店员</p>
        </div>
    </div>
</template>
<script>
import ShopErWeima from "../../components/ShopErWeima"; 
export default {
    data(){
        return{
            code: '',
            erweima: {}
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
            if(code){//带参数的 是邀请会员
                // this.$http.get("do=info&m=vipcard")
                // .then(function(res){
                //    _this.$http.get("do=clerk_qrcode&m=vipcard&id="+res.id)
                //     .then(function(result){
                //         _this.erweima = result;
                //     })
                // })
                this.$http.get("do=team_data&m=vipcard")
                .then(function(res){
                    _this.erweima = res
                })
            }else{
                this.$http.get("do=get_storeinfo&m=vipcard")
                .then(function(res){
                    _this.erweima = res;
                }) 
            }
        })
        
    },
}
</script>

<style lang="scss" scoped>
    @import '../../assets/css/style';
    .erweima-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../../assets/images/verification-icon.png) #E40000 no-repeat;
        background-size: 100%;
        z-index: 2;
    }
    .vip-erweima-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100%;
        z-index: 2;
        .erweima-inner{
            background: #fff;
        }
        .tip{
            color: #000;
            margin-top: 0;
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
        // height: 2rem;
        // line-height: 2rem;
        text-align: center;
        color:#fff;
        background: #efefef;
        margin-top: 10%;
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
    .tip{
        text-align: center;
        color: #fff;
        font-size: .22rem;
        margin-top: .34rem;
    }
</style>

