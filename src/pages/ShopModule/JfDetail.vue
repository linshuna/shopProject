<template>
    <div class='jifen-wrap'>
        <div class='jifen-top'>
            <div class='title'>积分余额</div>
            <div class='money'>25900</div>
            <div class='btn-wrap'>
                <div><button @click="goTip">{{is_signed==1?'已签到':'签到'}}</button></div>
                <div><button @click='goShop'>使用积分</button></div>
                <div><button @click='goJfList'>积分明细</button></div>
            </div>
            <div class='remind' @click="goExplain">积分规则说明</div>
        </div>
        <div class='calendar-wrap'>
            <div class='calendar-inner'>
                <calendar　@checkOneDate="getCheckDate"></calendar>
            </div>
        </div>
        <!--<div class='list-wrap'>
            <div class='list' @click="goJfExplain">
                <span>去x线下消费赚钱积分</span>
                <img src='../../assets/images/right-icon.png' />
            </div>
            <div class='list'>
                <span>领取积分!</span>
                <img src='../../assets/images/right-icon.png' />
            </div>
        </div>-->
    </div>
</template>
<script>
import calendar from "@/components/calendar"
export default {
    data(){
        return{
            year: '',
            month: '',
            is_signed: 1,
            list: []
        }
    },
    components:{
        "calendar":　calendar
    },
    mounted() {
        this.$nextTick(function(){
            var date = new Date()
            this.year = date.getFullYear();
            this.month = date.getMonth();
            this.init()
        })
    },
    methods: {
        init(){
            var _this = this;
            this.$http.get("do=sign&m=vipcard&op=display&year="+this.year+"&month="+this.month)
            .then(function(res){
                _this.is_signed = res.is_signed
                _this.rule = res.rule
                _this.list = res
            })
        },
        goExplain(){
            localStorage.setItem('rule',this.rule);
            this.$router.push("/explain")
        },
        goJfExplain(){
            this.$router.push("/jfExplain")
        },
        goTip(){
            var _this = this;
            if(this.is_signed==1) return false;//已签到
            this.$http.get("do=sign&m=vipcard&op=sign")
            .then(function(res){
                _this.$message({ 
                    title: '签到成功,+'+res.credit1
                })
                _this.init();//重新调用
            })
        },
        goShop(){
            this.$router.push("/shop")
        },
        goJfList(){
            localStorage.setItem('vipcardList',this.list);
            this.$router.push("/jfList/2")
        },
        getCheckDate(value){
            this.year = value.year;
            this.month = value.month;
            this.init()
        }
    },
}
</script>
<style lang="scss" scoped>
    @import "../../assets/css/style";
    .rule-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .jifen-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    /* 头部 */
    .jifen-top{
        width: 100%;
        height: 4.2rem;
        background: #FE0000;
        text-align: center;
        color: #fff;
        position: relative;
        padding-top: .6rem;
        box-sizing: border-box;
    }
    .jifen-top .money{
        font-size: .6rem;
        color: #fff;
        font-weight: 500;
        margin: .2rem 0 .4rem;
    }
    .jifen-top .btn-wrap{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        display: flex;
    }
    .btn-wrap>div{
        flex: 1;
    }
    .jifen-top button{
        display: inline-block;
        width: 80%;
        height: .78rem;
        line-height: .78rem;
        margin: 0 auto;
        color: #fff;
        border-radius: 8px;
        border: 1px solid #F40509;
        background: transparent;
        font-size: $font-24;
    }
    .remind{
        width: 2rem;
        height: .56rem;
        line-height: .56rem;
        border-radius: 100px 0 0 100px;
        color: #fff;
        background: #FE6A6A;
        position: absolute;
        top: .2rem;
        right: 0;
        font-size: $font-24;
    }

    /* 日历 */
    .calendar-wrap{
        width: 100%;
        padding: 0 .6rem;
        box-sizing: border-box;
        position: relative;
        z-index: 10;
    }
    .calendar-inner{
        width: 100%;
        height: 6rem;
        padding-top: .1rem;
        box-sizing: border-box;
        margin-top: -.8rem;
        background: url('../../assets/images/calendar-bg.png') no-repeat;
        background-size: 100%;
    }

    /* 底部列表 */
    .list-wrap{
        width: 100%;
        padding: 0 .6rem;
        box-sizing: border-box;
    }
    .list{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        position: relative;
        background: #fff;
        border-radius: 8px;
        margin: .2rem auto;
        padding: 0 .2rem;
        box-sizing: border-box;
    }
    .list img{
        width: .2rem;
        height: .32rem;
        position: absolute;
        top: 50%;
        right: .2rem;
        transform: translate(0,-50%);
    }
</style>