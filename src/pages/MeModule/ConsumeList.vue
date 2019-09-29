<template>
    <div class='detail-wrap'>
        <div class='list'>
            <div class='set-padding set-flex'>
                <span>充值</span>
                <span class='red-color'>+200</span>
            </div>
            <div class='gray-color set-flex'>
                <span>2018-09-10 13:22</span>
                <span>积分：200</span>
            </div>
        </div>
        <div class='list'>
            <div class='set-padding set-flex'>
                <span>购买**商品</span>
                <span class='blue-color'>-200</span>
            </div>
            <div class='gray-color set-flex'>
                <span>2018-09-10 13:22</span>
                <span>积分：200</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .detail-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 0 .34rem;
        box-sizing: border-box;
        background: #fff;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch; 
    }
    .detail-wrap .list{
        padding: .2rem 0;
        border-bottom: 1px solid #efefef;
    }
    .list>view{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .set-padding{
        padding-bottom: .2rem;
    }
    .set-flex{
        display: flex;
        justify-content: space-between;
    }
    .gray-color{
        font-size: .22rem;
    }
</style>