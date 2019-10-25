<template>
<div>
    <div class="tab">
        <div v-for="(item,index) in tabData" :class="{'active': status==item.id}" 
        @click='checkTab(item)'>{{item.name}}</div>
    </div>
    <div class='team-center-wrap' v-show="status==1">
        <div class='team-top'>
            <div>
            <!-- <image src='/images/money-icon.png'></image> -->
                <span>可用金额</span>
            </div>
            <div class='money'>8000元</div>
            <button class='pay-btn'>充值</button>
        </div>
        <div class='chong-list'>
            <span>充值记录</span>
            <img src='../../assets/images/right-icon.png' class='right-icon' />
        </div>
        <div class='add-people'>
            <div class='chong-list'>
                <span>添加成员</span>
                <img src='../../assets/images/add-carno.png' class='add-icon'/>
            </div>
            <div class='people-list'>
                <div class='list'>
                    <i class="checkbox"></i>
                    <span>张三</span>
                    <button class='del-btn'>删除</button>
                </div>
                <div class='list'>
                    <i class="checkbox"></i>
                    <span>李四</span>
                    <button class='del-btn'>删除</button>
                </div>
            </div>
            <div class='simall-money'>
                <span>统一充值金额</span>
                <input type='text' />
                <button class='pay-btn'>充值</button>
            </div>
        </div>
        <div class='another-chong-wrap'>
            <div class='title'>分别充值</div>
            <div class='table-header'>
                <div class='set-w10'>勾选</div>
                <div class='set-w12'>头像</div>
                <div class='set-w10'>姓名</div>
                <div class='set-w22 phone'>手机号/会员号</div>
                <div>充值金额</div>
            </div>
            <div class='table-con'>
                <div class='list' @click="check">
                    <div class='set-w10'><input type="radio" :checked="bol"/></div>
                    <div class='set-w12'><img src='../../assets/images/my-icon.png' class='header-icon'/></div>
                    <div class='set-w10'>张三</div>
                    <div class='set-w22'>15214541111</div>
                    <input type='text' />
                    <div class='btn-wrap'><button class='pay-btn'>充值</button></div>
                </div>

            </div>
        </div>
    </div>
    <div v-show="status==2" class="team-center-wrap">
        
    </div>
    <div v-show="status==3" class="team-center-wrap">
        <ul class="record-list">
            <li v-for="item in recordList">
                <div class="header-wrap">
                    <img :src="item.avatar" class="header-icon"/>
                </div>
                <div class="middle-wrap">
                    <p>
                        <span>{{item.realname}}</span>
                    </p>
                    <p>卡号：{{item.mobile}}</p>
                    <p class="gray-color">充值时间：{{item.ctime}}</p>
                </div>
                <span class="blue-color">￥{{item.credit2}}</span>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            bol: false,
            status: 1,
            tabData: [
                {name: '团队充值',id: 1},
                {name: '队员邀请',id: 2},
                {name: '充值记录',id: 3},
            ],
            recordList: []
        }
    },
    mounted() {
        //获取充值记录
        this.initRecord();
    },
    methods:{
        check: function(){
            this.bol = !this.bol
        },
        checkTab: function(item){
            this.status = item.id;
        },
        initRecord(){
            var _this = this;
            this.$http.get("do=team_recharge_log&m=vipcard&bid=")
            .then(function(res){
                _this.recordList = res.list;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/css/style';
    .tab{
        width: 100%;
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
    }
    .tab>div{
        display: inline-block;
        width: 33.3%;
        text-align: center;
        padding: .3rem 0;
        box-sizing: border-box;
        font-size: .3rem;
    }
    .tab .active{
        color: #DC3E56;
        border-bottom: 1px solid #DC3E56;
    }
    .team-center-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-top: 1rem;
    }
    .team-top{
        width: 100%;
        height: .96rem;
        line-height: .96rem;
        padding: 0 .34rem;
        box-sizing: border-box;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: $def-font-size;
    }
    .team-top img{
        width: .6rem;
        height: .6rem;
        vertical-align: middle;
    }
    .team-top .money{
        color: #F1C272;
        width: 64%;
        text-align: center;
    }
    .pay-btn{
        width: 1.2rem;
        height: .48rem;
        line-height: .48rem;
        color: #fff;
        background: red;
        font-size: $def-font-size;
    }

    .chong-list{
        width: 100%;
        margin: .34rem auto;
        background: #fff;
        height: .96rem;
        line-height: .96rem;
        padding: 0 .34rem;
        box-sizing: border-box;
        position: relative;
        font-size: $def-font-size;
    }
    .chong-list img{
        position: absolute;
        right: .34rem;
        top: 50%;
        margin-top: -.15rem;
    }
    .right-icon{
        width: .2rem;
    }
    .add-icon{
        width: .36rem;
    }
    .people-list{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        background: #F7F7F7;
    }
    .people-list .list{
        width: 100%;
        height: .86rem;
        line-height: .86rem;
        border-bottom: 1px solid #DEDEDE;
        position: relative;
    }
    .add-people .chong-list{
        margin: 0;
    }
    input[type=radio]{
        display: inline-block;
        width: .3rem;
        height: .3rem;
        border-radius: 50%;
        border:1px solid #DEDEDE;
        padding: 0;
        min-height: auto;
        vertical-align: middle;
        margin-right: .2rem;
    }
    input[type=radio]{
        display: inline-block;
        width: .3rem;
        height: .3rem;
        border-radius: 50%;
        border:1px solid #DEDEDE;
        padding: 0;
        min-height: auto;
        vertical-align: middle;
        margin-right: .2rem;
    }
    input[type=radio]:checked{
        width: .3rem;
        height: .3rem;
        background: url("../../assets/images/weixin-right-icon.png") no-repeat;
        background-size: 100%;
    }
    .del-btn{
        width: 1rem;
        background: transparent;
        border: 1px solid #8789C2;
        border-radius: 4px;
        height: .48rem;
        /* line-height: .48rem; */
        font-size: 0.24rem;
        color: #8789C2;
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -.24rem;
    }

    .simall-money{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        height: .96rem;
        line-height: .96rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;  
        background: #F7F7F7;
    }
    .simall-money input[type=text]{
        width: 46%;
        height: .6rem;
        border: 1px solid #DEDEDE;
        border-radius: 4px;
        margin: 0 .6rem 0 .2rem;
    }


    .another-chong-wrap{
        width: 100%;
        background: #F7F7F7;
    }
    .another-chong-wrap .title{
        width: 100%;
        height: .96rem;
        line-height: .96rem;
        font-size: $def-font-size;
        background: #fff;
        margin-top: .34rem;
        padding-left: .34rem;
        box-sizing: border-box;
    }
    .set-w10{
        width: 10%;
    }
    .set-w12{
        width: 11%;
    }
    .set-w22{
        width: 30%;
    }
    .table-header{
        width: 100%;
        padding: .2rem .34rem .1rem;
        box-sizing: border-box;
    }
    .table-header>div{
        display: inline-block;
        text-align: center;
        vertical-align: top;
    }
    .table-con{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
    }
    .another-chong-wrap .list:first-child{
        border-top: 1px solid #DEDEDE;
    }
    .another-chong-wrap .list{
        border-bottom: 1px solid #DEDEDE;
        padding:.2rem 0;
    }
    .list div{
        display: inline-block;
        text-align: center;
        vertical-align: middle;
    }
    .header-icon{
        width: .52rem;
        height: .52rem;
        border-radius: 100px;
        vertical-align: middle;
    }
    .phone{
        // padding: 0 .5rem;
        box-sizing: border-box;
        vertical-align: middle;
    }
    .table-con input[type=text]{
        width: 15%;
        height: .48rem;
        display: inline-block;
        border: 1px solid #DEDEDE;
        border-radius: 4px;
        vertical-align: middle;
    }
    .list .btn-wrap{
        text-align: right;
    }
    .list .pay-btn{
        display: inline-block;
        vertical-align: middle;
    }

    ul.record-list{
        width: 100%;
        height: 100%;
        li{
            width: 100%;
            padding: .2rem;
            box-sizing: border-box;
            background: #fff;
            border-bottom: #efefef;
            position: relative;
            >div{
                display: inline-block;
                text-align: left;
                vertical-align: middle;
            }
            .blue-color{
                text-align: right;
                position: absolute;
                right: .2rem;
                top: .2rem;
            }
            .gray-color{
                margin-top: .2rem;
                font-size: .22rem;
                text-align: left!important;
            }
            .header-wrap{
                width: 1rem;
                margin-right: .1rem;
            }
            .header-icon{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
        }
    }
</style>