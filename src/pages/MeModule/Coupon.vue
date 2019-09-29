<template>
    <div>
        <div class='card-wrap'>
            <div class='card-list' @click='clickMarskShow'>
                <div>
                    <div class='card-con'>
                        <div class='card-money'>
                            <span class='font-20'>￥</span>
                            <span>10</span>
                        </div>
                        <div>
                            <div>优惠券</div>
                            <div class='font-20'>*****可用</div>
                        </div> 
                    </div>
                    <div class='font-20 useful-date'>有效日期：2018.02.12-2019.01.01</div>
                </div>
                <div class='right-new-wrap'>立即使用</div>
            </div>
            <div class='card-list' @click='clickMarskShow'>
                <div>
                    <div class='card-con'>
                        <div class='card-money'>
                            <span class='font-20'>￥</span>
                            <span>20</span>
                        </div>
                        <div>
                            <div>优惠券</div>
                            <div class='font-20'>*****可用</div>
                        </div> 
                    </div>
                    <div class='font-20 useful-date'>有效日期：2018.02.12-2019.01.01</div>
                </div>
                <div class='right-new-wrap'>立即使用</div>
            </div>
        </div>

        <!-- 点击使用的阴影 -->
        <div v-show='show' class='marsk' @click='clickMarskHide'>
            <div class='toast-bg'>
                <div class='toast-inner'>
                    <div class='title'>恭喜您</div>
                    <div class='title'>获得优惠券</div>
                    <div class='card-con'>
                        <div class='card-money'><span class='font-20'>￥</span><span>10</span></div>
                        <div>优惠券</div>
                    </div>
                </div>
                <div class='button' @click='rightNowUse'>
                    <button>立即使用</button>
                </div>
            </div>

        </div>
    </div>
</template> 
<script>
export default {
    data(){
        return{
            show: false
        }
    },
    methods: {
        clickMarskShow(){
            this.show = true;
        },
        clickMarskHide(){
            this.show = false;
        },
        rightNowUse(){
            this.show = false;
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../../assets/css/style';
    .card-wrap{
        width: 100%;
        padding: .4rem .34rem;
        box-sizing: border-box;
    }
    .card-list{
        width: 100%;
        height: 1.8rem;
        border-radius: 8px;
        box-shadow: 0 0 10px 0 red;
        padding:.2rem .34rem .2rem .4rem;
        box-sizing: border-box;
        color: #fff;
        font-size: $font-38;
        margin-bottom: .34rem;
        background: url(../../assets/images/c-card-bg.png) no-repeat;
        background-size: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .card-con>div{
        display: inline-block;
        vertical-align: middle;
    }
    .card-money{
        font-size: $font-38;
        padding-right: .34rem;
    }
    .card-money span{
        display: inline-block;
        vertical-align: top;
    }
    .useful-date{
        margin-top: .16rem;
    }
    .right-new-wrap{
        width: 20%;
        letter-spacing: .1rem;
        padding-left: .1rem;
        box-sizing: border-box;
    }

    /* 阴影 */
    .marsk{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
        position: absolute;
        top: 0;
        left: 0;
    }
    .marsk .toast-bg{
        width: 4rem;
        height: 6rem;
        color: red;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-46%,-50%);
        background:url(../../assets/images/toast-bg.png) no-repeat;
        background-size: 100%;
    }
    .toast-inner{
        width: 100%;
        height: 4rem;
        padding: 1.2rem .2rem 0 0;
        box-sizing: border-box;
    }
    .marsk .title{
        color: #F5D591;
        font-weight: 600;
        font-family: serif;
        font-size: $font-38;
        text-align: center;
    }
    .marsk .card-con{
        width: 70%;
        height: 1rem;
        line-height: 1rem;
        margin: .2rem auto;
        background: #FCF0C8;
        border-radius: 8px;
        font-size: $font-38;
        font-weight: 500;
        color: red;
        text-align: center;
    }
    .marsk .card-con div{
        display: inline-block;
    }
    .mask .card-money span{
        display: inline-block;
        vertical-align: top;
    }

    .button button{
        width: 3.8rem;
        background: transparent;
        color: red;
        border-radius: 100px;
        border: none;
        font-size: $def-font-size;
        outline: none;
        margin-top: .36rem;
        padding: 0;
    }
    .button button::after{ border: none; }
</style>