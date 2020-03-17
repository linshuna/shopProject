<template>
    <div class="shop-wrap">
        <div class="date-wrap">
            <date-com :date="dateStr" @listenToChild="getTime"></date-com>
            <img src="../../assets/images/store/date-icon.png" class="date-icon"/>
        </div>
        <div class="shop-inner">
            <p class="title">
                <span>总收入：{{info.credit2_total_m}}</span>
                <span>本周：{{info.credit2_total_w}}</span>
                <span>今日：{{info.credit2_total_d}}</span>
            </p>
            <!-- 会员支付订单 -->
            <p class="title-inner">
                <span>会员支付订单</span>
                <span>{{info.credit2_nums}}</span>
            </p>
            <p class="gray-color" v-show="!dlist||dlist.length==0">暂无数据</p>
            <ul v-show="dlist.length>0" class="list">
                <li v-for="item in dlist">
                    <div>
                        <p>{{item.nickname}}</p>
                        <p class="gray-color">{{item.used_time}}</p>
                    </div>
                    <span>{{item.goods_name}}</span>
                    <span class="blue-color">{{item.price}}</span>
                </li>
            </ul>
            <!-- 核销订单 -->
            <p class="title-inner">
                <span>核销订单</span>
                <span>{{info.credit1_nums}}</span>
            </p>
            <p class="gray-color" v-show="!hlist||hlist.length==0">暂无数据</p>
            <ul v-show="hlist.length>0" class="list">
                <li v-for="item in hlist">
                    <div>
                        <p>{{item.nickname}}</p>
                        <p class="gray-color">{{item.createtime}}</p>
                    </div>
                    <span class="blue-color">{{item.num}}</span>
                </li>
            </ul>
        </div>
        <div class='btn-wrap'>
            <button class='get-btn' @click='goExport' v-if="utype!=2">对账导出</button>
        </div>
    </div>
</template>
<script>
import DateCom from "@/components/dateCom"
export default {
    data(){
        var info = JSON.parse(window.localStorage.getItem('info'));
        return{
            date: '',
            dateStr: '',
            hlist: '',//核销列表
            dlist: '',//当天消费
            info: '',
            utype: info.utype
        }
    },
    components:{
        "date-com": DateCom
    },
    mounted(){
        var date = new Date()
        this.dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.date = this.dateStr
        this.init()
    },    
    methods: {
        init(){
            var _this = this;
            this.$http.get("do=stat&m=vipcard&ddate="+this.date)
            .then(function(res){
                _this.info = res;
                _this.hlist = res.credit1_list;//核销列表
                _this.dlist = res.credit2_list;//当天消费列表
            })
        },
        goExport(){
            window.location.href = this.info.export_url
        },
        getTime(value){//获取时间
            this.dateStr = value.dateStr;
            this.date = value.date;
            this.init();
        }
    }
}
</script>
<style lang="scss" scoped>
    .gray-color{
        color: gray;
        text-align: center;
    }
    .blue-color{
        color: skyblue;
    }
    .shop-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .shop-inner{
        background: #fff;
        padding-bottom: .2rem;
        .gray-color{
            text-align: center;
        }
    }
    .title,.title-inner{
        width: 100%;
        height: .72rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        display:flex;
        align-items: center;
        justify-content: space-between;
        background: #FAFAFA;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
    }
    .title{
        flex: 1;
    }
    .title-inner{
        width: 80%;
        height: .86rem;
        margin: .2rem auto;
        box-shadow: 0 0 10px 0 #ccc;
        background: #fff;
        border-radius: 4px;
    }
    ul{
        li{
            display: flex;
            width: 100%;
            padding: .2rem;
            box-sizing: border-box;
            background: #fff;
            >*{
                flex: 1;
                text-align: center;
            }
            >div{
                text-align: left;
            }
            .blue-color{
                text-align: right;
            }
            .gray-color{
                margin-top: .2rem;
            }
        }
        li:nth-child(2n){
            background: #F5FAFE;
        }
    }
    .btn-wrap{
        width: 100%;
        height: .8rem;
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: 0;
        button{
            display: inline-block;
            width: 100%;
            height: .8rem;
            line-height: .8rem;
            color: #fff;
            background: #FE0000;
            border-radius: 0;
            font-size: .28rem;
        }
    }
    .date-wrap{
        position: relative;
        height: .96rem;
        .date-icon{
            width: .46rem;
            position: absolute;
            top: 50%;
            right: 10%;
            margin-top: -.26rem;
        }
    }
</style>