<template>
    <div class='not-order-tip'>
        <img src='../assets/images/order.png'/>
        <div class='gray-color'>暂无订单记录，快去<span class="title" @click="goShop">商场</span>看看吧</div>
    </div>
</template>
<script>
export default {
    methods: {
        goShop(){
            this.$router.push("/shop")
        }
    },    
}
</script>
<style lang="scss" scoped>
    .title{
        color: skyblue;
        text-decoration: underline;
    }
    .not-order-tip{
        width: 100%;
        position: absolute;
        top: 50%;
        text-align: center;
        margin-top: -1.8rem;
    }
    .not-order-tip img{
        width: 1.8rem;
        height: 1.8rem;
        margin-bottom: .2rem;
    }
    .gray-color{
        color: gray;
    }
</style>