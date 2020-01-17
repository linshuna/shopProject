<template>
    <div class='shop-wrap'>
        <!-- 商品的轮播图 -->
        <div class='slider-wrap'>
            <div class='slider-inner' v-show="imgUrls.length>0">
                <mt-swipe :show-indicators="false" :auto="0" @change="handleChange">
                    <mt-swipe-item v-for="item in imgUrls">
                        <img :src="item"/>
                    </mt-swipe-item>
                </mt-swipe>
                <div class="dots"> 
                    <div class='dot'>{{swiperCurrent+1}}/{{imgUrls.length}}</div> 
                </div>
            </div>
        </div>
        <!--钱  -->
        <div class="money-wrap">
            <div class='border-right'>
                <span class='set-padding font-22'>积分：</span>
                <span class="red-color font-34">{{goods.marketprice}}</span>
            </div>
            <div>
                <span class='set-padding font-22'>兑换期限:</span>
                <span class="red-color font-34" v-if="goods.timestart||goods.timeend">
                    {{goods.timestart.split(" ")[0]}}到{{goods.timeend.split(" ")[0]}}
                </span>
            </div>
        </div>
        <!-- 物品详情 -->
        <div class='shop-detail'>
            <div>物品详情：</div>
            <div>产品：{{goods.title}}。</div>
            <div>每个用户兑换数：{{goods.usermaxbuy}}{{goods.unit}}</div>
            <div v-html="goods.content"></div>
        </div>
        <!-- 使用规则 
        <div class='shop-rule'>
            <div>使用规则：</div>
            <div>1.凭此电子券到兑换处兑换商品；</div>
            <div>2.此券仅限积分兑换礼使用，不做其他使用；</div>
        </div>-->
        <!-- 图片详情 -->
        <div class='shop-img-wrap'>
            <img :src='goods.thumb'/>
        </div>
        <!-- 购买按钮 -->
        <div class='btn-wrap'>
            <button class='btn-detail'>
            <span>积分：</span>
            <span class="red-color font-30">{{goods.marketprice}}</span>
            </button>
            <button class='immediateBtn' @click='goChangeShop'>立即兑换</button>
        </div>
    </div>


</template>
<script>
export default {
    data(){
        return{
            id: '',
            swiperCurrent: 0,
            imgUrls:[],
            goods: {}
        }
    },
    mounted() {
        this.$nextTick(function(){
            var _this = this;
            this.id = this.$route.params.id;
            this.$http.get("do=detail&m=score_shop&id="+this.id)
            .then(function(res){
                _this.imgUrls = res.goods.thumb_url.length==0?[res.goods.thumb]:res.goods.thumb_url;
                _this.goods = res.goods;
                console.log(res)
            })
        })
    },
    methods: {
        goChangeShop(){
            this.$router.push("/shopConfirmOrder/"+this.id)
        },
        handleChange(index){
            this.swiperCurrent = index;
        }
    },
}
</script>
<style>
    .mint-swipe-indicator{
        opacity: 1;
        background: gray;
    }
</style>
<style lang="scss" scoped>
    @import '../../assets/css/style';
    .font-30{
        font-size: .3rem;
        font-weight: 600;
    }
    .shop-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        padding-bottom: 1.2rem;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .slider-wrap{
        position: relative;
        width: 100%;
        height: 4.2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
    }
    .slider-inner,.slider-inner img{
        width: 100%;
        height: 100%;
        overflow: hidden;  
    }
    .dots{ 
        width: .88rem;
        height: .4rem;
        line-height: .4rem;
        position: absolute; 
        right: .2rem; 
        bottom: .2rem;
        background: rgba(0,0,0,.5);
        border-radius: 100px;
        text-align: center;
        z-index: 10;
        font-size: .24rem;
    } 
    .dot{
        color: #fff;
    }
    /*积分  */
    .money-wrap{
        width: 100%;
        background: #fff;
        color: #333;
        border-bottom: 1px solid #efefef;
    }
    .money-wrap>div{
        display: inline-block;
        padding: .34rem .20rem .34rem 0;
        box-sizing: border-box;
    }
    .money-wrap .border-right{
        border-right: 1px solid #efefef;
        min-width: 30%;
    }
    .money-wrap .set-padding{
        padding:0 .2rem 0 .34rem;
    }

    /*物品详情  */
    .shop-detail,.shop-rule{
        width: 100%;
        padding: .2rem .34rem;
        box-sizing: border-box;
        color: #333;
        line-height: .4rem;
        background: #F5F8FF;
    }
    .shop-rule{
        background: #fff;
        margin: .2rem auto;
    }

    /*商品详情图片  */
    .shop-img-wrap{
        width: 100%;
    }
    .shop-img-wrap img{
        width: 100%;
    }

    /*按钮  */
    .btn-wrap{
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        height: 1rem;
        font-size: 0;
        z-index: 3;
    }
    .btn-wrap button{
        display: inline-block;
        width: 50%;
        height: 1rem;
        line-height: 1rem;
        color: #000;
        border-radius: 0;
        font-size: $font-24;
        background: #efefef;
    }
    .btn-detail .red-color{
        font-weight: 600;
    }
    .btn-wrap .immediateBtn{
        background: red;
        color: #fff;
        font-size: $font-30;
    }
</style>