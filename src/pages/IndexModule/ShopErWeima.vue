<template>
    <div class="erweima-wrap">
        <div class="erweima-inner">
            <div class="square">二维码</div>
            <p class="gray-color">你已成功使用积分兑换星巴克杯，请到相应门店扫描确认核销</p>
            <p class="change-ma">兑换码：841112144</p>
        </div>
        <p class="tip">请将二维码展示给店员</p>
    </div>
</template>
<style lang="scss" scoped>
    @import '../../assets/css/style';
    .erweima-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url(../../assets/images/verification-icon.png) no-repeat;
        background-size: 100%;
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
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        color:#fff;
        background: #efefef;
        margin-bottom: .34rem;
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