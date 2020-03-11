<template>
    <div class="main-con">
        <template v-if="utype==1">
            <!--店长-->
            <div class="header-wrap shop-store-wrap">
                <div class="header-msg">
                    <img :src="info.avatar" class="my-icon"/>
                    <p>{{utype==1?'店长':utype==2?'店员':utype==3?'财务':''}}</p>
                    <p>{{info.realname}}</p>
                </div>
                <div class="money-wrap"> 
                    <div>
                        <p class="money">{{clerk.income}}</p>
                        <p>今日收款{{clerk.orders}}笔</p>
                    </div>
                    <div @click="goUrl('/recordBack')" class="right-inner">
                        <img src="../../assets/images/store/note-icon.png" class="record-icon"/>
                        <p>数据记录</p>
                    </div>
                </div>
            </div>
            <ul>
                <li @click="goUrl('/shopMsg')">
                    <div class="list-con">
                        <img src="../../assets/images/store/mg-store-icon.png" class="icon"/>
                        <span>我的门店</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>
                <li @click="goUrl('/shopNameList')">
                    <div class="list-con">
                        <img src="../../assets/images/store/assistant-icon.png" class="icon"/>
                        <span>店员管理</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>
                <li @click="goUrl('/verOrder')">
                    <div class="list-con">
                        <img src="../../assets/images/store/sao-icon.png" class="icon"/>
                        <span>核销订单</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>
                <!--/financeCenter-->
                <li @click="goUrl('/recordBackLook')">
                    <div class="list-con">
                        <img src="../../assets/images/store/finance-center-icon.png" class="icon"/>
                        <span>退款</span>
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
                <!--<li @click="goUrl('/message')">
                    <div class="list-con">
                        <img src="../../assets/images/store/msg-icon.png" class="icon"/>
                        <span>退款</span>
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
                <li @click="goUrl('/verificationList/0')">
                    <div class="list-con">
                        <img src="../../assets/images/store/leader-out-icon.png" class="icon"/>
                        <span>核销记录</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>-->
                <!--<li @click="goUrl('/shopQrcode')"> 
                    <div class="list-con">
                        <img src="../../assets/images/store/assistant-icon.png" class="icon"/>
                        <span>店铺收款</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>-->
            </ul>
        </template>
        <template v-else-if="utype==2">
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
                        <p>{{info.realname}} 店员</p>
                    </div>
                    
                </div>
            </div>
            <ul>
                <li @click="goUrl('/verificationList/'+info.id)">
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
                <!--shopQrcode-->
                <li @click="goUrl('/verOrder')">
                    <div class="list-con">
                        <img src="../../assets/images/store/assistant-icon.png" class="icon"/>
                        <span>店铺收款</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>
                <!--/vipCenter-->
                <li @click="goUrl('/shopMsg')">
                    <div class="list-con">
                        <img src="../../assets/images/store/assistant-icon.png" class="icon"/>
                        <span>店铺信息</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>
            </ul>
        </template>
        <template v-else-if="utype==3">
            <!--财务中心-->
            <div class="header-wrap">
                <div class="bill-wrap">
                    <p>
                        <span>今日收款{{clerk.orders}}笔</span>
                    </p>
                    <p class="money">{{clerk.income}}</p>
                </div>
                <div class="money-wrap"> 
                    <div @click="goUrl('/record')">
                        <img src="../../assets/images/store/note-icon.png"/>
                        <p>数据记录</p>
                    </div>
                </div>
            </div>
            <ul>
                <li @click='goUrl("/record")'> 
                    <div class="list-con">
                        <img src="../../assets/images/store/leader-out-icon.png" class="icon"/>
                        <span>对账导出</span>
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
                <li @click="goUrl('/shopMsg')">
                    <div class="list-con">
                        <img src="../../assets/images/store/assistant-icon.png" class="icon"/>
                        <span>店铺信息</span>
                    </div>
                    <span><img src="../../assets/images/right-icon.png" class="right-arrow"/></span>
                </li>
            </ul>
        </template>
    </div>
</template>
<script>
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
                    var utype = res.utype;
                    _this.utype = utype;
                    var str = utype==1||utype==2?'店员中心':utype==3?'财务中心':'';
                    document.title = str;
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
            goExport(){
                window.location.href = this.info.export_url
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
                    alert(res)
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .fixed-wrap{
        display: flex;
        align-items: center;
        justify-content: space-between;
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
            .money{
                font-size: .42rem;
            }
        }
    }
    .shop-store-wrap{
        .header-msg{
           text-align:center;
           color: #fff;
           img{
               width: 1rem;
               border-radius: 50%;
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