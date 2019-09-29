<template>
    <div class='list-wrap'>
        <!-- 头部 -->
        <div class='list-top'>
            <span class='red-color'>{{item.status==0?'待缴费':'已完成'}}</span>
            <span class='gray-color'>14:00</span>
        </div>
        <!-- 中间  -->
        <div class='list-con'>
            车牌号： *******
        </div>
        <!-- 底部 -->
        <div class='list-bottom'>
            <span class='gray-color'>运单编号：{{item.orderno}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        item: {
            type: Object,
            default: {}
        }
    }
}
</script>
<style lang="scss" scoped>
    .red-color{
        color: #f55d54;
    }
    .gray-color{
        color: gray;
        font-size: .2rem;
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
        font-size: .2rem;
    }
    
</style>