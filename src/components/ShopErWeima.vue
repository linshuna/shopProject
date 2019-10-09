<template>
    <div :class="{'erweima-wrap': !erwei.type,'vip-erweima-wrap':erwei.type}" @click="check" v-show="show">
        <div class="erweima-inner">
            <div class="square">
                <img :src="erwei.qrcode"/>
            </div>
            <!--<p class="gray-color">你已成功使用积分兑换，请到相应门店扫描确认核销</p>
            {{item.goods_name}} <p class="change-ma">兑换码：841112144</p>-->
            <p class="tip" v-if="erwei.type">请将二维码展示给店员</p>
        </div>
        <p class="tip" v-if="!erwei.type">请将二维码展示给店员</p>
    </div>
</template>
<script>
export default {
    props:{
        item: {
            type: Object,
            default: {}
        },
        show:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            erwei: ''
        }
    },
    watch: {
        item:{
            handler(newVal,oldVal){
                this.erwei = newVal;
                console.log(newVal)
            },
            immediate: true
            
        }
    },
    methods: {
        check(){
            this.$emit("update:show", !this.show)
            console.log(!this.show)
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../assets/css/style';
    .erweima-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../assets/images/verification-icon.png) #E40000 no-repeat;
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