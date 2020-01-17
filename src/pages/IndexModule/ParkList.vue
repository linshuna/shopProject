<template>
    <div class="main-wrap">
        <div class='main-con'>
            <div class='shop-wrap' v-for="item in activelist">
                <div class='title-header'>
                    <span class='title'>商户活动</span>
                </div>
                <div class='shop-con' @click="goNews(item)">
                    <div class='pic'>
                        <img :src="item.thumb"/>
                    </div>
                    <div class='shop-title'>{{item.title}}</div>
                    <div class='shop-detail'>{{item.description}}
                    </div>
                    <button class='detail-btn'>查看详情</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activelist: []
        }
    },
    mounted() {
        this.$nextTick(function(){
            var _this = this;
            this.$http.get("do=index&m=webhome")
            .then(function(res){ 
                _this.activelist = res.activelist;            
            })
        })
    },
    methods: {
        goNews(item){
            this.$router.push('/news/'+item.id)
        }
    },
}
</script>
<style lang="scss" scoped>
    .main-wrap{
        width: 100%;
        height: calc(100%);
        position: absolute;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        z-index:1;
    }
    .main-con{
        width: 100%;
    }
    /*恭喜广告  */
    .lucky-tip{
        width: 100%;
        padding: .18rem .32rem;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
    }
    .louder-icon{
        width: .32rem;
        height: .32rem;
        padding-right: 8px;
        vertical-align: middle;
    }
    .lucky-tip text{
        vertical-align: middle;
    }
    /*商品样式  */
    .shop-wrap{
        width: 100%;
        padding: .2rem .3rem;
        box-sizing: border-box;
        margin-bottom: .2rem;
        background: #fff;
        position: relative;
    }
    .title-header{
        position: relative;
    }
    .title{
    font-size: .32rem;
    color: #000;
    font-weight: 500;
    }
    .more{
        color:#f55d54;
        font-size: .24rem;
        position: absolute;
        right: 0;
        top: 0;
    }
    .shop-con{
        width: 100%;
        padding: .2rem;
        box-sizing: border-box;
    }
    .pic{
        width: 100%;
        height: 3rem;
        margin-bottom: .2rem;
    }
    .pic img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
    .shop-title{
        color: #333;
        font-size: .28rem;
    }
    .shop-detail{
        padding: .1rem 0;
        margin-bottom: 0.34rem;
    }
    .shop-detail span.name{
        display: inline-block;
        padding-left: .1rem;
        color:gray;
        vertical-align: middle;
        margin-right: .2rem;
    }
    .shop-detail .ring{
        display: inline-block;
        width: .1rem;
        height: .1rem;
        border-radius: 50%;
        background: gray;
        vertical-align: middle;
        margin-right: 10rpx;
    }
    .shop-money span{
        font-size: .2rem;
        color: gray;
    }
    .shop-money .red-color{
        font-size: .28rem;
        color: #f55d54;
        font-weight: 400;
    }
    .set-padding{
        padding-left: .2rem;
    }
    .detail-btn{
        width: 1.8rem;
        height: .48rem;
        border: none;
        color: #fff;
        background: #f55d54;
        border-radius: 1rem 0 0 1rem;
        font-size: .28rem;
        position: absolute;
        right: .2rem;
        bottom: .32rem;
    }
</style>