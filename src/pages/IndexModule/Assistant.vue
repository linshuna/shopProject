<template>
    <div class="main-con">
        <!--店员-->
        <div class="header-wrap">
            <div class="bill-wrap">
                <p>
                    <span>今日收款{{clerk.orders}}笔</span>
                </p>
                <p class="money">{{clerk.income}}</p>
            </div>
            <div class="money-wrap"> 
                <div>
                    <img :src="info.avatar" class="my-icon"/>
                    <p>{{info.realname}}</p>
                </div>
                <div @click="goUrl('/record')" class="right-inner">
                    <img src="../../assets/images/store/note-icon.png" class="record-icon"/>
                    <p>数据记录</p>
                </div>
            </div>
        </div>
        <ul>
            <li @click="goUrl('/verificationList')">
                <div class="list-con">
                    <img src="../../assets/images/store/leader-out-icon.png" class="icon"/>
                    <span>核销记录</span>
                </div>
                <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
            </li>
            <li @click="goUrl('/message')">
                <div class="list-con">
                    <img src="../../assets/images/store/msg-icon.png" class="icon"/>
                    <span>消息通知</span>
                </div>
                <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
            </li>
            <li @click="saoFn">
                <div class="list-con">
                    <img src="../../assets/images/store/sao-icon.png" class="icon"/>
                    <span>核销订单</span>
                </div>
                <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
            </li>
            <li @click="goUrl('/shopQrcode')">
                <div class="list-con">
                    <img src="../../assets/images/store/assistant-icon.png" class="icon"/>
                    <span>店铺收款</span>
                </div>
                <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
            </li>
        </ul>
    </div>
</template>
<script>
    // import wx from 'weixin-js-sdk';
    export default {
        data(){
            return{
                clerk: '',
                utype: '',
                info: ''
            }
        },
        mounted() {
            //获取店铺信息
            var _this = this;
            this.$nextTick(function(){
                this.$http.get("do=clerk_index&m=vipcard")
                .then(function(res){
                    _this.clerk = res;
                    _this.utype = res.utype;
                })
            })
            //获取个人信息
            this.$http.get("do=info&m=vipcard")
            .then(function(res){
                _this.info = res;
            })
            this.getJsapi()
        },
        methods: {
            goUrl(url){
                this.$router.push(url)
            },
            saoFn(){//扫一扫
                var _this = this;
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function (res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        _this.verification(result)
                    }
                });
            },
            verification(str){
                this.$http.get("do=set_used&m=vipcard&sn="+str,{forbidden:true}) 
                .then(function(res){
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .main-con{
        padding-top: .86rem;
    }
    .header-wrap{
        width: 100%;
        height: 3.6rem;
        background: url(../../assets/images/store/store-bg.png) no-repeat;
        background-size: 100%;
        padding: .34rem;
        box-sizing: border-box;
        .bill-wrap{
            color: #fff;
            .money{
                font-size: .48rem;
                font-weight: 500;
                margin-top: .2rem;
            }
        }
        .money-wrap{
            font-size: 0;
            margin-top: .4rem;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            >div{
                display: inline-block;
                vertical-align: bottom;
                font-size: .24rem;
            }
            .right-inner{
                padding-right: .46rem;
                box-sizing: border-box;
            }
            .my-icon{
                width: 1rem;
                height: 1rem;
                border-radius: 100%;
            }
            .record-icon{
                width: .42rem;
                height: .42rem;
            }
            div{
                text-align: center;
                color: #fff;
                img{
                    width: .46rem;
                    height: .46rem;
                    margin-bottom: .1rem;
                }
            }
        }
    }
    .shop-store-wrap{
        .money-wrap{
            >div{
                display: inline-block;
                width: auto;
                vertical-align: bottom;
                font-size: .24rem;
            }
        }
    }
    ul{
        li{
            width: 100%;
            height: .86rem;
            background: #fff;
            padding: 0 .34rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: .2rem;
            .list-con{
                span,img{
                    vertical-align: middle;
                }
            }
            .icon{
                width: .32rem;
                padding-right: .1rem;
            }
            .right-arrow{
                width: .16rem;
            }
        }
    }
</style>