<template>
<div>
    <div class="jifen-wrap" ref="contentWrap">
        <div class='main-header'>
            <div class='banner'>
                <!--<img src='../assets/images/jfBanner.png'/>-->
                <div class='slider-wrap'>
                    <div class='slider-inner'>
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="item in banner">
                                <img :src="item.thumb" @click="goUrl(item.link)"/>
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                </div>    
            </div>
            
            <div class='tab-wrap'>
                <ul>
                    <li @click="goJfList">
                        <p class="square"><img src='../assets/images/jf-icon.png' /></p>
                        <p>{{credit1.name}}<span class='orange-color'>{{credit1.val}}</span></p>
                    </li>
                    <li @click="goOrder">
                        <p class="square"><img src='../assets/images/dhjl-icon.png'/></p>
                        <p>兑换记录</p>
                    </li>
                    <li @click="goJifenList">
                        <p class="square"><img src='../assets/images/hdjf-icon.png'/></p>
                        <p>积分签到</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class='main-con'>
            <div class='main-banner'>
                <img src='../assets/images/tj-banner.png' /> 
                <!-- <view class='shop-title'>新品推荐</view>
                <view class='gray-color'>量身打造，只为特别的你</view>  -->
            </div>
            <ul class="select-wrap">
                <li>
                    <com-select 
                        selectType="tag"
                        :selectData="tagData"
                        @checkedSelect="checkNum"></com-select>
                </li>
                <li>
                    <com-select
                        selectType="classify"
                        :selectData="catlist"
                        @checkedSelect="checkNum"></com-select>
                </li>
                <li>
                    <com-select 
                        selectType="rank"
                        :selectData="rankData"
                        @checkedSelect="checkNum"></com-select>
                </li>
            </ul>
            <div class='shop-list' v-if="show">
                <ul>
                    <li @click="goShopDetail(item)" v-for="item in goodslist">
                        <div class='shop-square'>
                            <img :src="item.thumb"/>
                        </div>
                        <div class='shop-title'>{{item.title}}</div>
                        <div class='strong-blue-color'>积分：{{item.marketprice}}</div>
                        <button class='dui-btn'>兑换</button>
                    </li>
                </ul>
            </div>
            <p class="gray-color not-data-tip" v-else>暂无商品，请更换筛选条件</p>
        </div>
    </div>
    <bar-footer idx="1"></bar-footer>
</div>
</template>
<script>
import BarFooter from "@/components/footer"
import ComSelect from "@/components/selectCom"
export default {
    data(){
        return {
            banner: '',
            credit1: [],
            catlist: [{name:'全部分类',id:''}],
            goodslist: [],
            tagData: [
                {name: '全部商品',id: ''},
                {name: '新品推荐',id: 'isnew'},
                {name: '爆款推荐',id: 'ishot'},
                {name: "折扣商品",id: 'isdiscount'},
                {name: '店长推荐',id: 'isrecommand'}],
            rankData: [{name: "综合升序", id:'asc'},{name: "综合降序",id:'desc'}],
            page: 1,
            totalPage: 0,
            check: true,
            checkJson: {pcate: '',tag: '',sortfield: 'marketprice',sort: 'asc'},
            show: true,
        }
    },
    components:{
        "bar-footer": BarFooter,
        "com-select": ComSelect
    },
    mounted() {
        this.$nextTick(function(){
            this.init()
            window.addEventListener('scroll', this.handleScroll, true); 
        })
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll    : function(){//滚动监听
            var contentWrap = this.$refs.contentWrap;
            if(contentWrap){
                var sT = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;//对象滚动的高度
                var wH = document.documentElement.clientHeight || document.body.clientHeight;//对象滚动的高度
                var bH = document.documentElement.scrollHeight || document.body.scrollHeight;//对象滚动的高度
                if(sT+wH == bH&&this.page<=this.totalPage){
                    if(!this.check) return false;
                    this.check = !this.check;
                    this.init(true)
                }  
            }
        },
        init(isPan){
            var _this = this;
            var data = this.checkJson;
            this.$http.get("do=list&m=score_shop&page="+this.page+"&pcate="+data.pcate+"&tag="+data.tag+"&sortfield="+data.sortfield+"&sort="+data.sort)
            .then(function(res){ 
                //总页码
                _this.totalPage = res.allpage;
                if(isPan == true){
                   _this.check = true;
                   _this.page++;
                }
                //banner
                _this.banner = res.banner;
                //积分
                _this.credit1 = res.credit1;
                if(_this.catlist.length==1){
                    _this.catlist = _this.catlist.concat(res.catlist);
                }
                var data = _this.goodslist.concat(res.goodslist)
                _this.goodslist = _this.unique(data);
                _this.show = _this.goodslist.length>0?true:false;
            })
        },
        unique(arr) {//去重
            let res = new Map();
            return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
        },
        goUrl(url){
            window.location.href = url;
        },
        checkNum(data){
            var value = data.value.id;
            if(data._type == 'tag'){//根据推荐类型排序
                this.checkJson.tag = value;
            }else if(data._type == 'classify'){//商品分类
                this.checkJson.pcate = value;
            }else if(data._type == 'rank'){//商品升降排序
                this.checkJson.sort = value;
            }
            this.page = 1;
            this.goodslist = [];
            this.init()
        },
        goShopDetail(item){
            this.$router.push("/shopDetail/"+item.id)
        },
        goOrder(){
            this.$router.push("/order")
        },
        goJifenList(){
            this.$router.push("/jfDetail")
        },
        goJfList(){
            this.$router.push("/jfList/2")
        }
    },
}
</script>
<style lang="scss" scoped>
    @import "../assets/css/style";
    .not-data-tip{
        font-size: .24rem;
        text-align: center;
        padding: .2rem 0;
        background: transparent;
    }
    .jifen-wrap{
        width: 100%;
        height: calc(100%);
        position: absolute;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 1rem;
        z-index:1;
        padding-top: .86rem;
    }
    .main-header{
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #efefef;
    }
    .banner{
        width: 100%;
        height: 2.6rem;
    }
    .slider-wrap,.slider-inner{
        width: 100%;
        height: 100%;
    }
    .banner img{
        width: 100%;
        height: 100%;
    }
    .tab-wrap{
        width: 100%;
        color: #333;
        padding: .2rem 0;
        font-size: 0;
    }
    .tab-wrap li{
        display: inline-block;
        width: 33.3%;
        text-align: center;
        font-size: $font-24;
    }
    .tab-wrap .square{
        display: inline-block;
        width: .8rem;
        height: .8rem;
        border-radius: 8px;
    }
    .square img{
        width: 100%;
        height: 100%;
    }

    /*下面的样式  */
    .main-con{
        width: 100%;
        margin-top: .2rem;
        background: #fff;
    }
    .main-header{
        width: 100%;
        text-align: center;
        padding-bottom: .1rem;
    }
    .shop-title{
        font-size: $font-32;
        color: #000;
        font-weight: 500;
    }
    .main-banner{
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #efefef;
    }
    .main-banner img{
        width: 100%;
        height: 100%;
    }

    .select-wrap{
        width: 100%;
        padding: .3rem .2rem;
        box-sizing: border-box;
        font-size: 0;
    }
    /*下拉框样式  */
    .select_box {
        display: inline-block;
        background: #fff;
        width: 1.6rem;
        margin: 0 .38rem;
        height: .6rem;
        line-height: .6rem;
        text-align: left;
        position: relative;
        font-size: $font-24;
    }
    .select {
        box-sizing: border-box;
        width: 1.6rem;
        height: .6rem;
        display: inline-block;
        align-items: center;
        padding: 0 .2rem;
        background: #3385ff;
        border-radius: 100px;
        color: #fff;
    }

    .select_text {
        font-size: $def-font-size;
        color: #fff;
        line-height: .86rem;
        height: .86rem;
    }

    .select_img {
        width: .4rem;
        height: .4rem;
        display: block;
        transition: transform 0.3s;
    }

    .select_img_rotate {
        transform: rotate(180deg);
    }

    .option_box {
        position: absolute;
        top: .6rem;
        width: 1.6rem;
        border: 1px solid #efefef;
        box-sizing: border-box;
        height: 0;
        overflow-y: auto;
        border-top: 0;
        background: #fff;
        transition: height 0.3s;
    }

    .option {
        display: block;
        line-height: .4rem;
        border-bottom: 1px solid #efefef;
        padding: .1rem;
        color: rgb(102, 102, 102);
        font-size: $def-font-size;
    }
    /*兑换商品样式  */
    .shop-list{
        width: 100%;
        font-size: 0;
    }
    .shop-list li{
        display: inline-block;
        width: 50%;
        padding: 0 .2rem .2rem;
        box-sizing: border-box;
        text-align: center; 
        font-size: $font-24;
    }
    .shop-list .shop-square{
        display: inline-block;
        width: 2.6rem;
        height: 2.6rem;
        background: #efefef;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .shop-list .shop-title{
        font-size: $font-30;
        margin: .1rem 0 .08rem;
    }
    .dui-btn{
        width: 1.6rem;
        line-height: .48rem;
        font-size: $font-24;
        border: 1px solid #333;
        border-radius: 100px;
        color: #333;
        margin-top: .1rem;
    }

    /*下拉框  */
    .select-wrap{
        display: block;
        width: 100%;
    }
    .select-wrap li{
        display: inline-block;
        width: 33.3%;
        text-align: center;
    }
</style>