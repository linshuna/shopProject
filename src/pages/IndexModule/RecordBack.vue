<template>
<div>
    <div class="tab">
        <div v-for="(item,index) in tabData" :class="{'active': status==item.id}" 
        @click='checkTab(item)'>{{item.name}}</div>
    </div>
    <div class="shop-wrap">
        <div class="date-wrap">
            <date-com :date="dateStr" @listenToChild="getTime"></date-com>
            <img src="../../assets/images/store/date-icon.png" class="date-icon"/>
        </div>
        <div class="shop-inner" v-show="status==1">
            <p class="title">
                <span>总收入：{{info.credit2_total_m}}</span>
                <span>本周：{{info.credit2_total_w}}</span>
                <span>今日：{{info.credit2_total_d}}</span>
            </p>
            <p class="gray-color no-data-tip" v-show="!dlist||dlist.length==0">暂无数据</p>
            <ul v-show="dlist.length>0" class="list">
                <li v-for="item in dlist">
                    <div>
                        <p>{{item.nickname}}</p>
                        <p class="gray-color">{{item.used_time}}</p>
                    </div>
                    <span>{{item.goods_name}}</span>
                    <div>
                        <p class="blue-color">{{item.price}}</p>
                        <button class="reback" @click="rebackMoney(item)">退款</button>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 核销订单 -->
        <div class="shop-inner" v-show="status==2">
            <p class="title">
                <span>总收入：{{info.credit2_total_m}}</span>
                <span>本周：{{info.credit2_total_w}}</span>
                <span>今日：{{info.credit2_total_d}}</span>
            </p>
            <p class="gray-color no-data-tip" v-show="!hlist||hlist.length==0">暂无数据</p>
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
        <!-- 退款订单 -->
        <div class="shop-inner" v-show="status==3">
            <p class="title">
                <span>总收入：{{info.credit2_total_m}}</span>
                <span>本周：{{info.credit2_total_w}}</span>
                <span>今日：{{info.credit2_total_d}}</span>
            </p>
            <!--<ul class="list">
                <li>
                    <div>
                        <p>xxxx</p>
                        <p class="gray-color">xxxx.xx.xx</p>
                        <p class="gray-color">已退款时间：xxxx.xx.xx</p>
                    </div>
                    <span class="blue-color">1</span>
                </li>
            </ul>-->
            <p class="gray-color no-data-tip">暂无数据</p>
        </div>
        <div class='btn-wrap'>
            <button class='get-btn' @click='goExport'>对账导出</button>
        </div>
    </div>
    
</div>
</template>
<script>
import DateCom from "@/components/dateCom"
export default {
    data(){
        return{
            date: '',
            dateStr: '',
            hlist: '',//核销列表
            dlist: '',//当天消费
            info: '',
            status: 1,
            tabData: [
                {name: '会员支付订单',id: 1},
                {name: '核销订单',id: 2},
                {name: '退款订单',id: 3},
            ]
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
        },
        checkTab: function(item){
            this.status = item.id;
        },
        rebackMoney(item){//退款
            var _this = this;
            this.$message.confirm('',{
                title: '会员号xx,支付金额x,确定退款!',
                message: ' ',
                showCancelButton: true,
                confirmButtonText: '确定退款',
                cancelButtonText: '取消'  
            })
            .then((res) => {
                if (res === 'confirm') {
                    this.$http.get("do=refund&m=vipcard&id="+item.id)
                    .then(function(res){
                        _this.$toast({message:"退款成功"})
                    })
                }
            })
            
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
    .tab{
        width: 100%;
        background: #fff;
        position: fixed;
        left: 0;
        top: .82rem;
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
    .shop-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-top: 1rem;
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
            }
            >div{
                text-align: left;
            }
            .blue-color{
                text-align: right;
            }
            .gray-color{
                margin-top: .2rem;
                font-size: .22rem;
                text-align: left!important;
            }
            .reback{
                background: #00c800;
                color: #fff;
                padding: .1rem .2rem;
                border-radius: 4px;
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