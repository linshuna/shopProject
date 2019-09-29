<template>
    <div class='list-wrap'>
        <!-- 中间  -->
        <div class='list-con'>
            <div class='img-wrap'>
                <img :src='thumb'/>
            </div>
            <div class='con'>
                <p class='shop-title'>{{goods.title}}</p>
                <p class='gray-color'>最多可兑换{{goods.usermaxbuy}}{{goods.unit}}</p>
                <p class='gray-color'>(季度限定，售完即止)</p>
                <div class='jifen-wrap'>
                    <p class='jifen-title'>
                        <span class='gray-color'>积分：</span>
                        <span class='red-color money'>{{dan}}</span>
                    </p>
                    <div class="operate-wrap">
                        <span class='reduce-btn' @click='reduce'>-</span>
                        <div class='num-inp'><input readonly type="number" v-model="num" @input="num = Number($event.target.value.replace(/\D+/, ''));num<goods.usermaxbuy" pattern="[0-9]*"/></div>
                        <span class='add-btn' @click='add'>+</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class='list-bottom'>
            <span class='gray-color'>商品编号：{{goods.goodssn}}</span>
        </div>
        <div class='btn-wrap'>
            <button class='get-btn'>
                <span class='gray-color'>积分：</span>
                <span class='red-color font-30'>{{money}}</span>
            </button>
            <button class='com-btn' @click="goBuy">确定兑换</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            thumb:'',//主图
            goods: '',//商品详情
            dan: 0,
            num: 1,
            show: false
        }
    },
    computed: {
        money(){
            return this.num*this.dan;
        }
    },
    mounted() {
        this.$nextTick(function(){
            var _this = this;
            this.id = this.$route.params.id;
            this.$http.get("do=detail&m=score_shop&id="+this.id)
            .then(function(res){
                //主图
                _this.thumb = res.goods.thumb;
                //积分
                _this.dan = res.goods.marketprice;
                _this.goods = {qrcode:res.goods.qrcode};
            })
        })
    },
    methods: {
        reduce: function () {
            var num = this.num;
            num--;
            num = num <= 1 ? 1 : num;
            this.num = num;
        },
        add: function(){
            var num = this.num;
            num++;
            if(num>this.goods.usermaxbuy) return false;
            this.num = num;
        },
        goBuy(){
            var _this = this;
            this.$http.get("do=exchange&m=score_shop&id="+this.id+"&num="+this.num)
            .then(function(res){
                _this.$toast({message: "兑换成功"})
                setTimeout(function(){
                    _this.$router.push("/order")
                },1000)
            })
        }
    },
}
</script>   
<style lang="scss" scoped>
    @import '../../assets/css/style';
    .font-30{
        font-size: .3rem;
        font-weight: 600;
    }
    .red-color{
        color: #f55d54;
    }
    .gray-color{
        color: gray;
    }
    .list-wrap{
        width: 100%;
        background: #fff;
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
        border-radius: 4px;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, .6);
    }
    .img-wrap img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
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
        font-size: .24rem;
        margin-bottom: .1rem;
    }
    .con .gray-color{
        font-size: .22rem;
    }
    .jifen-wrap{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .2rem;
    }
    .jifen-wrap .money{
        font-weight: 500;
        font-size: .3rem;
    }
    .jifen-title span{
        vertical-align: bottom;
    }
    .operate-wrap{
        font-size: 0;
    }
    .add-btn,.reduce-btn{
        display: inline-block;
        width: .4rem;
        height: .4rem;
        line-height: .4rem;
        vertical-align: middle;
        background: #ccc;
        color: #fff;
        text-align: center;
        font-size: $font-24;
    }
    input{
        // min-height: .4rem;
        // height: .4rem;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: $font-24;
    }
    .num-inp{
        display: inline-block;
        width: .6rem;
        height: .4rem!important;
        line-height: .4rem;
        vertical-align: middle;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }


    /*底部  */
    .list-bottom{
        width: 100%;
        padding: .18rem .34rem;
        box-sizing: border-box;
    }

    /* 按钮 */
    .btn-wrap{
        width: 100%;
        height: .8rem;
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: 0;
    }
    .btn-wrap button{
        display: inline-block;
        height: .8rem;
        line-height: .8rem;
        color: #fff;
        border-radius: 0;
        font-size: .24rem;
    }
    .get-btn{
        background: #fff;
        width: 60%;
    }
    .com-btn{
        background: #FE0000;
        width: 40%;
    }
</style>