<template>
    <div class='vip-pay-wrap'>
        <div class="shop-info-wrap">
            <img :src="shopInfo.logo"/>
            <div class="shop-con">
                <p>店铺名称：{{shopInfo.branch_name}}</p>
                <p>店铺电话：{{shopInfo.telephone}}</p>
                <p>当前余额：{{shopInfo.credit2}}</p>
            </div>
        </div>
        <div class='title'>请输入支付金额</div>
        <div class='money red-color'>
            <span class='font-34'>￥</span>
            <input type="text" v-model="money"/>
            <span class='font-34'>元</span>
        </div>
        <div class='btn-wrap'>
            <button class='order-btn' @click="chongFn">确定支付</button>   
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return {
            sid: '',
            shopInfo: '',
            money: ''
        }
    },
    mounted() {
        this.sid = this.$route.params.id;
        if(this.sid){
            var _this = this;
            this.$http.get("do=repay&m=vipcard&sid="+this.sid)
            .then(function(res){
                _this.shopInfo = res;
            })
        }
    },
    methods: {
        chongFn(){
            if(!this.money){
                this.$toast({message: "请输入支付金额"})
                return false;
            }else if(this.money>this.shopInfo.credit2-0){
                this.$message.confirm('',{
                    title: '余额不足，是否确定充值',
                    message: ' ',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'  
                })
                .then((res) => {
                    if (res === 'confirm') {
                        var _this = this;
                        this.$nextTick(() => {
                            _this.$router.push("/vipChong");
                        })
                    }
                })
                return false;
            }
            var _this = this;
            this.$http.get("do=pay&m=vipcard&sid="+this.sid+"&money="+this.money)
            .then(function(res){
                _this.$toast({message: '支付成功'})
                setTimeout(function(){
                    _this.$router.push("/shop")
                },1000)
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .vip-pay-wrap{
        width: 100%;
        padding: .2rem .2rem 0;
        box-sizing: border-box;
    }
    .shop-info-wrap{
        text-align: center;
        .shop-con{
            width: 50%;
            text-align: left;
            margin: .2rem auto;
        }
        img{
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 100px;
        }
    }
    .vip-pay-wrap .title{
        margin: 0 0 .6rem;
    }
    .money{
        font-size: .32rem;
        font-weight: 600;
        text-align: center;
    }
    .money input{
        display: inline-block;
        width: 40%;
        border-bottom: 1px solid #E5E5E5;
        margin: 0 .2rem;
        text-align: center;
        background: transparent;
        line-height: .4rem;
        font-size: .4rem;
        color: red;
    }

    .btn-wrap{
        width: 100%;
        position: absolute;
        bottom: 20%;
        left: 0;
        text-align: center;
    }
    .btn-wrap button{
        width: 80%;
        height: .8rem;
        line-height: .8rem;
        border-radius: 100px;
        color: #fff;
        background: red;
        font-size: .28rem;
    }
</style>