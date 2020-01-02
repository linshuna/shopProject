<template>
    <div class="main-con">
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
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                clerk: ''
            }
        },
        mounted() {
            var _this = this;
            this.$nextTick(function(){
                this.$http.get("do=clerk_index&m=vipcard")
                .then(function(res){
                    _this.clerk = res;
                })
            })
        },
        methods: {
            goUrl(url){
                this.$router.push(url)
            },
            goExport(){
                window.location.href = this.info.export_url
            }
        },
    }
</script>
<style lang="scss" scoped>
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
            // display: flex;
            // justify-content: space-between;
            // text-align: center;
            margin-top: .8rem;
            div{
                // flex: 1;
                display: inline-block;
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