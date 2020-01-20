<template>

<div class='list-wrap'>
    <!-- 头部 -->
    <div class='list-top'>
        <span class='red-color'>{{item.status==1?'已兑换':item.status==3?'已核销':'待核销'}}</span>
        <span class='gray-color'>{{item.createtime}}</span>
    </div>
    <!-- 中间  -->
    <div class='list-con'>
        <div class='img-wrap'>
            <img :src='item.goods_img' />
        </div>
        <div class='con'>
            <div class='shop-title'>{{item.goods_name}}</div>
            <div class='gray-color'>{{item.total}}</div>
        </div>
    </div>
    <!-- 底部 -->
    <div class='list-bottom'>
<<<<<<< HEAD
        <p class='gray-color'>核销店铺：{{item.store_name}}</p>
        <p class='gray-color'>订单编号：{{item.ordersn}}</p>
=======
        <span class='gray-color'>订单编号：{{item.ordersn}}</span>
>>>>>>> 17cb45d54eae77952cd652a7f5acaad4da1400da
    </div>
</div>

</template>
<script>
export default {
    props:{
        item: {type: Object,default: {}}
    },
    
}
</script>
<style lang="scss" scoped>
    .red-color{
        color: #f55d54;
    }
    .gray-color{
        color: gray;
        font-size: .24rem;
    }
    .list-wrap{
        width: 100%;
        background: #fff;
    }
    /* 头部 */
    .list-top{
        width: 100%;
        padding: .16rem .34rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .list-top .red-color{
        font-weight: 600;
        font-size: .3rem;
    }

    /*中间内容  */
    .list-con{
        width: 100%;
        padding: .2rem .34rem;
        box-sizing: border-box;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        display: flex;
    }
    .img-wrap{
        width: 2rem;
        height: 2rem;
        border-radius: 8px;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, .6);
    }
    .img-wrap img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
    .con{
        width: 70%;
        padding: .2rem 0  0 .4rem;
        box-sizing: border-box;
    }
    .con .shop-title{
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: .28rem;
    }
    .con .gray-color{
        font-size: .22rem;
    }

    /*底部  */
    .list-bottom{
        width: 100%;
        padding: .18rem .34rem;
        box-sizing: border-box;
    }
</style>