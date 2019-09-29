<template>
    <div class="mune-wrap">
        <div v-for="(item,index) in initList" @click="$router.push(item.push)" 
            :class="{'active': types=='index'&&index==idx,'footer-act': types!='index'&&index==idx}">
            <img  :src="idx==index?item.iconSelected:item.icon"/>
            <p>{{item.name}}</p>
        </div>
    
    </div>
    
</template>
<script>
export default {
    props:{
        types:{type: String,default: 'index'},
        idx: {type: String,default: 0}
    },
    data(){
        return {
            list: [{
                name: '首页',
                icon: require("../assets/images/mune/home.png"),
                iconSelected: require("../assets/images/mune/home-act.png"),
                push: "/index"
            },{
                name: '积分商城',
                icon: require("../assets/images/mune/shop.png"),
                iconSelected: require("../assets/images/mune/shop-act.png"),
                push: "/shop"
            },{
                name: '我的',
                icon: require("../assets/images/mune/me.png"),
                iconSelected: require("../assets/images/mune/me-act.png"),
                push: "/me"
            }],
            carList: [{
                name: '停车缴费',
                icon: require("../assets/images/car-fee.png"),
                iconSelected: require("../assets/images/car-fee-act.png"),
                push: "/index"
            },{
                name: '缴费记录',
                icon: require("../assets/images/car-order.png"),
                iconSelected: require("../assets/images/car-order-act.png"),
                push: "/parkingOrder"
            },{
                name: '我的',
                icon: require("../assets/images/car.png"),
                iconSelected: require("../assets/images/car-act.png"),
                push: "/parkingList"
            }],
            initList: []
        }
    },
    mounted() {
        this.$nextTick(function(){
            this.initList = this.types=='car'?this.carList:this.list;
        })
    },
}
</script>
<style lang="scss" scoped>
    .mune-wrap{
        display: flex;
        align-items: center;
        color: gray;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: .24rem;
        background: #fff;
        padding: .1rem 0;
        border-top: 1px solid #ccc;
        z-index: 10;
    }
    .mune-wrap>div{
        flex: 1;
        text-align: center;
    }
    .active{
        color: #333;
    }
    .footer-act{
        color: red;
    }
    img{
        width: .42rem;
        padding-bottom: .06rem;
    }
</style>