<template>
    <div class="team-wrap">
        <div class="header-wrap"></div>
        <div class="img-wrap" @click="goUrl">
            <div class="img-inner">
                <span class="user-type">{{utype}}</span>
                <img :src="shopInfo.logo" class="logo"/>
                <p class="name">{{shopInfo.branch_name}}</p> 
                <div class="erweima-wrap">
                    <img :src="shopInfo.qrcode" class="shopMa"/>
                </div>
                <p class="tip">店铺收款二维码</p>
            </div>
        </div>

    </div>
</template>
<script>
import { Picker,Popup,Cell } from 'mint-ui'; 
export default {
    data(){
        return{
            shopInfo: '',//店铺信息
            utype: ''//身份
        }
    },
    mounted(){
        //获取店铺信息
        var _this = this;
        this.$nextTick(function(){
            this.$http.get("do=clerk_index&m=vipcard")
            .then(function(res){
                var utype = res.utype;
                _this.utype = utype==1?'店长':utype==2?'店员':utype==3?'财务':'用户';
                document.title = utype==1?'我的门店':'店铺信息'
            })
        })
        //获取店铺详情
        var _this = this;
        this.$http.get("do=get_storeinfo&m=vipcard")
        .then(function(res){
            _this.shopInfo = res;
        })
        this.init()
    },    
    methods: {
        init(){
            var _this = this;
            this.$http.get("do=clerk_list&m=vipcard")
            .then(function(res){
                _this.cumList = res;
            })
        },
        goUrl(){
            this.$router.push("/shopQrcode/shopPay")
        }
    },
}
</script>
<style lang="scss" scoped>
    .team-wrap{
        width: 100%;
        height: 100%;
        // position: absolute;
        // top: 0;
        // left: 0;
        // overflow-y: auto;
        // -webkit-overflow-scrolling: touch;
    }
    .black-color{
        color: #000;
    }
    .gray-color{
        color: gray;
    }
    .red-color{
        color: red;
        font-size: .28rem;
        font-weight: 560;
        margin-bottom: .1rem;
    }
    .erweima-wrap{
        display: inline-block;
        width: 54%;
        text-align: center;
        color:#fff;
        background: #efefef;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .header-wrap{
        width: 100%;
        height: 2rem;
        background: red;
    }
    .img-wrap{
        width: 100%;
        padding: 0 .2rem;
        .img-inner{
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 0 10px 0 #ccc;
            margin-top: -1rem;
            text-align: center;
            position: relative;
            padding-bottom: .4rem;
            .user-type{
                position: absolute;
                right: .2rem;
                top: .2rem;
                background: skyblue;
                color: #fff;
                border-radius: 4px;
                padding: .1rem .2rem;
            }
            img.logo{
                display: inline-block;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 100px;
                border: 2px solid #fff;
                margin-top: -.5rem;
            }
            .name{
                margin: .1rem 0;
            }
            .tip{
                margin-top: .2rem;
            }
        }
    }


</style>
<style lang="">
    .mint-cell-wrapper{
        height: .65rem;
        background: transparent;
    }
    .mint-cell-allow-right::after{
        right: 10px!important;
    }
    .mint-cell-value{
        width: 80%;
    }
</style>