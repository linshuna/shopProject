<template>
<div>
    <div class="me-main-wrap">
        <div class='bg'>
            <img src='../assets/images/bg.png'/>
        </div> 
        <div class="me-wrap">
            <div class='card' @click='goCard'>
                <div class='car-main'>
                    <div class='car-main-inner'>
                        <div class='shop-card'>
                            <img :src="info.avatar"/>
                        </div>
                        <!--<div class='vip-name'>会员卡</div>-->
                    </div>
                </div>
                <div class='right-now' v-if="iscard!=1">点击立即领取</div>
            </div>
            <div class='adv'>
                <img src='../assets/images/adv-banner.png' @click="goShop"/>
            </div>
            <ul class="diamond-wrap">
                <li>
                    <div class="set-border-r set-border-b" @click="goUrl('/news/18')">
                        <p><img src="../assets/images/act-center-icon.png"/></p>
                        <p>会员福利</p>
                    </div>
                    <div class="set-border-b" @click="goUrl('/news/17')">
                        <p><img src="../assets/images/parking-icon.png"/></p>
                        <p>停车缴费</p>
                    </div>
                </li>
                <li>
                    <div class="set-border-r" @click="goUrl('/news/15')">
                        <p><img src="../assets/images/vip-card-icon.png"/></p>
                        <p>会员卡介绍</p>
                    </div>
                    <div @click="goUrl('/news/15')">
                        <p><img src="../assets/images/vip-pay.png"/></p>
                        <p>会员充值</p>
                    </div>
                </li>
            </ul>
            <!--<div class='working-wrap'>
                <ul>
                    <li class='padding-r' @click="goChong">
                        <div class='working-card'>
                            <div class='pic'>
                                <img src='../assets/images/work-cz.png'/>
                            </div>
                            <div class='working-name'>线上充值</div>
                        </div>
                    </li>
                    <li class='padding-l' @click="goShop">
                        <div class='working-card'>
                            <div class='pic'>
                                <img src='../assets/images/work-fl.png'/>
                            </div>
                            <div class='working-name'>活动福利</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class='jf-adv'>
                <img src='../assets/images/jf-adv.png' @click="goShop"/>
            </div>
            <div class='center-wrap'>
                <ul>
                    <li class='first-card' @click="goJfDetail">
                        <div>
                            <div class='con'>
                                <div>签就送</div>
                                <img src="../assets/images/icon/money-icon.png"/>
                                <div class='s-font'>签到就送积分</div>
                            </div>
                            <div class='card-name'>去签到</div>
                        </div>
                    </li>
                    <li class='second-card' @click="goVipChong">
                        <div>
                            <div class='con'>
                                <div>充就送</div>
                                <img src='../assets/images/icon/jf-icon.png'/>
                                <div class='s-font'>充值就送积分</div>
                            </div>
                            <div class='card-name'>去充值</div>
                        </div>
                    </li>
                    <li class='third-card' @click="goShop">
                        <div>
                            <div class='con'>
                                <div>去兑换</div>
                                <img src='../assets/images/icon/bar-icon.png' class="bar-icon"/>
                                <div class='s-font'>线下消费送积分</div>
                            </div>
                            <div class='card-name'>去兑换</div>
                        </div>
                    </li>
                </ul>
            </div>-->
        </div>
    </div>
    <bar-footer idx="2"></bar-footer>
</div>
</template>
<script>
import BarFooter from "@/components/footer"
export default {
    data(){
        return{
            iscard: 1,//判断是否领卡 1是已领 非1未领
            info: ''
        }
    },
    components:{
        "bar-footer": BarFooter
    },
    mounted() {
        //获取个人信息
        var _this = this;
        this.$http.get("do=info&m=vipcard")
        .then(function(res){
            _this.iscard = res.iscard;
            _this.info = res;
            window.localStorage.setItem('info', JSON.stringify(res));
        })
    },
    methods: {
        goJfDetail(){
            this.$router.push("/jfDetail")
        },
        goChong(){
            this.$router.push("/vipChong")
        },
        goShop(){
            this.$router.push("/shop")
        },
        goCard(){
            if(this.iscard==1){//已领卡
                this.$router.push("/vipCenter")
            }else{//领卡
                this.$router.push("/card")
            }
        },
        goVipChong(){
            this.$router.push("/vipChong")
        },
        goShop(){
            this.$router.push("/shop")
        },
        goUrl(url){
            this.$router.push(url)
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../assets/css/style';
    .me-main-wrap{
        width: 100%;
        height: 100%;
        background: #fff;
        position: absolute;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 1rem;
    }
    .bg{
        width: 100%;
        height: 1.8rem;
        position: absolute;
        top: 0;
    }
    .bg img{
        width: 100%;
        height: 100%;
    }
    .me-wrap{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
    }
    .me-top{
        width: 100%;
    }
    .card{
        width: 84%;
        height: 3rem;
        border-radius: 8px;
        margin: 0 auto; 
        margin-top: 1rem;
        position: relative;
        z-index: 2;
        padding-top: .34rem;
        box-sizing: border-box;
        background: url(../assets/images/vip-card-bg.png) no-repeat;
        background-size: 100%;
    }
    .car-main{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        color: #fff;
    }
    .shop-card{
        width: .8rem;
        height: .8rem;
        background: #fff;
        border-radius: 100px;
        text-align: center;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .vip-name img{
        width: 100%;
        height: 100%;
    }
    .vip-name{
        padding-top: .1rem;
        opacity: .5;
    }
    .erweima{
        width: .8rem;
        height: .8rem;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .right-now{
        width: 100%;
        position: absolute;
        bottom: .34rem;
        left: 0;
        color: #fff;
        text-align: center;
        font-size: .36rem;
    }

    .diamond-wrap{
        width: 100%;
        li{
            font-size: 0;
            >div{
                font-size: .24rem;
                color: #333;
                display: inline-block;
                width: 50%;
                text-align: center;
                padding: .42rem 0;
                img{
                    width: .46rem;
                }
            }
            .set-border-r{
                border-right: 1px solid #efefef;
            }
            .set-border-b{
                border-bottom: 1px solid #efefef;
            }
        }
    }

    .adv{
        width: 100%;
        height: 1.4rem;
        margin: .34rem auto;
    }
    .adv img{
        width: 100%;
        height: 100%;
    }
    .working-wrap ul{
        display: block;
        width: 100%;
        font-size: 0;
    }
    .working-wrap li{
        display: inline-block;
        width: 50%;
        font-size: $font-24;
    }
    .working-wrap .padding-r{
        padding-right: .16rem;
        box-sizing: border-box;
    }
    .working-wrap .padding-l{
        padding-left: .16rem;
        box-sizing: border-box;
    }
    .working-card{
        width: 100%;
        height: 2.4rem;  
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, .3);
        border-radius: 8px;
        position: relative;
    }
    .working-card .pic{
        width: 60%;
        height: 50%;
        margin: 0 auto;
        text-align: center;
    }
    .working-card .pic img{
        width: 100%;
        height: 100%;
        margin-top: .4rem;
    }
    .working-name{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        color: #f71e1f;
        background: #ff9f9f;
        border-radius: 0 0 8px 8px;
        padding: .14rem 0;
        font-size: $font-30;
        font-weight: 500;
    }

    .jf-adv{
        width: 100%;
        height: 2.4rem;
        margin: .34rem auto;
    }
    .jf-adv img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }

    .center-wrap{
        width: 100%;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, .3);
        padding: .2rem;
        box-sizing: border-box;
        border-radius: 8px;
        margin-bottom: .34rem;
    }
    .center-wrap ul{
        display: block;
        width: 100%;
    }
    .center-wrap li{
        display: inline-block;
        width: 33.3%;
        height: 2.8rem;
    }
    .center-wrap li>div{
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
    .card-name{
        text-align: center;
        font-size: $def-font-size;
        height: .6rem;
        line-height: .6rem;
    }
    .s-font{
        width: 100%;
        font-size: $font-20;
        position: absolute;
        bottom: .2rem;
        left: 50%;
        margin-left: -50%;
    }
    .center-wrap{
        font-size: 0;
    }
    .center-wrap li{
        font-size: $font-24;
    }
    .center-wrap li div.con{
        height: 80%;
        background: linear-gradient(to bottom, skyblue , #00A4FD);
        border-radius: 6px 6px 0 0;
        color: #fff;
        text-align: center;
        padding: .1rem;
        box-sizing: border-box;
        position: relative;
    }
    .center-wrap li.first-card{
        padding-right: .1rem;
        box-sizing: border-box;
        color: #00A4FD; 
    }
    .center-wrap li.first-card>div{
        width: 100%;
        border: 1px solid #00A4FD; 
        box-sizing: border-box;
        border-radius: 6px;
    }
    li.first-card div.con{
        background: linear-gradient(to bottom, skyblue , #00A4FD);
    }
    .center-wrap li.second-card{
        padding: 0 .1rem;
        box-sizing: border-box;
        color: #FE357B;
    }
    .center-wrap li.second-card>div{
        width: 100%;
        border: 1px solid #FE357B; 
        box-sizing: border-box;
        border-radius: 6px;
    }
    li.second-card div.con{
        background: linear-gradient(to bottom, #FF82CE , #FE357B);
    }
    .center-wrap li.third-card{
        padding-left: .1rem;
        box-sizing: border-box;
        color: #FF9A2B;
    }
    .center-wrap li.third-card>div{
        width: 100%;
        border: 1px solid #FF9A2B; 
        box-sizing: border-box;
        border-radius: 6px;
    }
    li.third-card div.con{
        background: linear-gradient(to bottom, #FAC902 , #FF9A2B);
    }
    .center-wrap img{
        width: .68rem;
        height: .68rem;
        padding: .2rem 0 .36rem 0;
    }
    .center-wrap .bar-icon{
        width: .6rem;
        height: .6rem;
    }
</style>