<template>
    <div class="parking-wrap">
        <div class="top-wrap">
            <div class="title-wrap">
                <span class="ring">P</span>
                <span class="name">临时停车费</span>
            </div>
            <div class="money-wrap"><span class="strong-font">12</span>元</div>
            <div>待缴费</div>
        </div>
        <div class="list-wrap">
            <ul class="set-border-b">
                <li>
                    <span>车牌号</span>
                    <span>浙*******</span>
                </li>
                <li>
                    <span>车牌位置</span>
                    <span>上海******</span>
                </li>
                <li>
                    <span>入场时间</span>
                    <span>2019.08.15 18:54:00</span>
                </li>
                <li>
                    <span>停车时长</span>
                    <span>3小时</span>
                </li>
                <li>
                    <span>订单编号</span>
                    <span>121454555544121</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span>停车费总额</span>
                    <span>12元</span>
                </li>
                <li>
                    <span>优免金额</span>
                    <span>0元</span>
                </li>
                <li>
                    <span>支付（微信支付）</span>
                    <span>12元</span>
                </li>
                <li>
                    <span>停车时长</span>
                    <span>2019.08.15 21：00</span>
                </li>
            </ul>
        </div>
        <div class="btn-wrap">
            <button class="btn">支付</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .parking-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        background: #fff;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .top-wrap{
        text-align: center;
        margin: .4rem auto;
    }
    .ring{
        display: inline-block;
        width: .42rem;
        height: .42rem;
        line-height: .42rem;
        color: #fff;
        background: blue;
        border-radius: 100px;
    }
    .title-wrap{
        span{
            vertical-align: middle;
        }
        .name{
            padding-left: .2rem;
        }
    }
    .money-wrap{
        margin: .34rem 0 .16rem 0;
    }
    .strong-font{
        font-size: 32px;
        font-weight: 600;
    }
    .list-wrap{
        width:100%;
        padding: 0 .2rem;
        box-sizing: border-box;
    }
    ul{
        width:100%;
        li{
            display: flex;
            justify-content: space-between;
            line-height: .72rem;
        }
    }
    .set-border-b{
        border-bottom: 1px solid #efefef;
    }
    .btn-wrap{
        width: 100%;
        text-align: center;
        margin: 1rem auto .34rem;
        color: #333;
    }
    .btn{
        display: inline-block;
        width: 30%;
        height: .6rem;
        background: #41B035;
        color: #fff;
        font-size: .24rem;
        border: none;
        border-radius: 100px;
        box-shadow: 0 0px 10px 2px #ccc;
    }
</style>