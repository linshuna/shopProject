<template>
<div>
    <div class="main-wrap">
        <div class='main-top'>
            <div class='slider-wrap'>
                <div class='slider-inner'>
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="item in imgUrls">
                            <img :src="item.thumb" @click="goLink(item.link)"/>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
            <div class='tab-wrap'>
                <ul>
                    <li @click='goUrl("/shopNav")'>
                        <p class="square"><img src='../assets/images/zxzx-icon.png'/></p>
                        <span>商户导航</span>
                    </li>
                    <li @click='goUrl("/parkList")'>
                        <p class="square"><img src='../assets/images/jfsc-icon.png'/></p>
                        <span>停车收费</span>
                    </li>
                    <li @click="goUrl('/shopBill')">
                        <p class="square"><img src='../assets/images/fpsq-icon.png'/></p>
                        <span>发票申请</span>
                    </li>
                    <!--<li @click="goUrl('/parking')">
                        <p class="square"><img src='../assets/images/tcjf-icon.png'/></p>
                        <span>停车缴费</span>
                    </li>-->
                </ul>
            </div>
        </div>
        <div class='main-con'>
            <!--<div class='blue-color lucky-tip'>
                <img src='../assets/images/louder-icon.png' class="louder-icon" />
                <span>小喇叭：恭喜***获得***</span>
            </div>-->
            <div class='shop-wrap' v-for="item in activelist">
                <div class='title-header'>
                    <span class='title'>商户活动</span>
                    <!--<span class="more">更多></span>-->
                </div>
                <div class='shop-con' @click="goNews(item)">
                    <div class='pic'>
                        <img :src="item.thumb"/>
                    </div>
                    <div class='shop-title'>{{item.title}}</div>
                    <div class='shop-detail'>{{item.description}}
                        <!--<span class="ring"></span><span class="name">限量抢购</span>
                        <span class="ring"></span><span class="name">限量抢购</span>-->
                    </div>
                    <button class='detail-btn'>查看详情</button>
                </div>
            </div>
        </div>
    </div>
    <bar-footer idx="0"></bar-footer>
</div>
</template>
<script>
import BarFooter from "@/components/footer"
export default {
    data(){
        return{
            imgUrls:[],
            activelist: []
        }
    },
    components:{
        "bar-footer": BarFooter
    },
    mounted() {
        this.$nextTick(function(){
            var _this = this;
            this.$http.get("do=index&m=webhome")
            .then(function(res){ 
                _this.imgUrls = res.banner;
                _this.activelist = res.activelist;            
            })
        })
    },
    methods: {
        goLink(url){
            window.location.href = url
        },
        goUrl(url){
            this.$router.push(url)
        },
        goNews(item){
            this.$router.push('/news/'+item.id)
        }
    },
}
</script>
<style>
    .mint-swipe-indicator{
        width: 6px;
        height: 6px;
        opacity: 1!important;
        background: gray!important;
    }
    .mint-swipe-indicator.is-active{
        background: #fff!important;
    }
</style>
<style lang="scss" scoped>
    @import '../assets/css/style';
    .main-wrap{
        width: 100%;
        height: calc(100%);
        position: absolute;
        left: 0;
        top: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 1rem;
        z-index:1;
    }
    .main-top{
        width: 100%;
        background: #fff;
    }
    .slider-wrap{
        position: relative;
        width: 100%;
        height: 4.2rem;
        padding: .4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
    }
    .slider-inner,.slider-inner img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;  
    }
    
    .tab-wrap{
        width: 100%;
        font-size: $def-font-size;
        color: #333;
        padding: .2rem 0;
        font-size: 0;
    }
    .tab-wrap ul{
        min-width: 100%;
        width: auto;
        overflow-x: auto;
        white-space: nowrap;
    }
    .tab-wrap li{
        display: inline-block;
        width: 33%;
        text-align: center;
        font-size: $def-font-size;
    }
    .tab-wrap .square{
        display: inline-block;
        width: .8rem;
        height: .8rem;
        border-radius: 8px;
        margin-bottom: .2rem;
    }
    .square img{
        width: 100%;
        height: 100%;
    }
    .tab-wrap span{
        display: block;
    }


.main-con{
  width: 100%;
  margin-top: .2rem;
//   background: #fff;
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
    position: relative;
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