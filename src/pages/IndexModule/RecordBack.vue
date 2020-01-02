<template>
<div>
    <div class="tab">
        <div v-for="(item,index) in tabData" :class="{'active': status==item.id}" 
        @click='checkTab(item)'>{{item.name}}</div>
    </div>
    <div class="shop-wrap">
        <div class="date-wrap">
            <date-com :date="stime" :eDate="etime" @stime-event="getsTime" @etime-event="geteTime"></date-com>
            <img src="../../assets/images/store/date-icon.png" class="date-icon"/>
        </div>
        <!-- 会员支付 -->
        <div class="shop-inner" v-show="status==1">
            <p class="title">
                <span>总收入：{{info.credit2_total_m}}</span>
                <span>本周：{{info.credit2_total_w}}</span>
                <span>今日：{{info.credit2_total_d}}</span>
            </p>
            <p class="gray-color no-data-tip" v-show="!viplist||viplist.length==0">暂无数据</p>
            <ul v-show="viplist.length>0" class="list">
                <li v-for="item in viplist">
                    <img :src="item.avatar" class="header-icon"/>
                    <div>
                        <p>{{item.nickname}}</p>
                        <p>{{item.mobile}}</p>
                        <p class="gray-color">消费时间：{{item.createtime}}</p>
                    </div>
                    <div class="txt-r">
                        <p class="blue-color">{{item.num}}元</p>
                        <button class="reback" @click="rebackMoney(item)">退款</button>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 核销订单 -->
        <div class="shop-inner" v-show="status==2">
            <p class="title">
                <span>核销积分总额：{{info.credit2_total_m}}</span>
            </p>
            <p class="title">
                <span>今日核销积分总额：{{info.credit2_total_w}}</span>
            </p>
            <p class="title">
                <span>今日核销总额：{{info.credit2_total_d}}</span>
            </p>
            <p class="gray-color no-data-tip" v-show="!hlist||hlist.length==0">暂无数据</p>
            <ul v-show="hlist.length>0" class="list">
                <li v-for="item in hlist">
                    <div>
                        <p>{{item.admin_name}} ({{item.utype==1?'店长':item.utype==2?'店员':''}})</p>
                        <p>{{item.goods_name}} ({{item.total}}件)</p>
                        <p class="gray-color">兑换时间：{{item.used_time}}</p>
                    </div>
                    <div class="txt-r">
                        <p class="blue-color">{{item.price}}元</p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 退款订单 -->
        <div class="shop-inner" v-show="status==3">
            <p class="title">
                <span>退款总额：{{info.credit2_total_m}}</span>
            </p>
            <p class="title">
                <span>今日退款笔数：{{info.credit2_total_w}}</span>
            </p>
            <p class="title">
                <span>今日退款总额：{{info.credit2_total_d}}</span>
            </p>
            <ul v-show="rlist.length>0" class="list">
                <li v-for="item in rlist">
                    <img :src="item.avatar" class="header-icon"/>
                    <div>
                        <p>{{item.nickname}}</p>
                        <p>{{item.mobile}}</p>
                        <p class="gray-color">退款时间：{{item.createtime}}</p>
                    </div>
                    <div class="txt-r">
                        <p class="red-color">{{item.num}}元</p>
                    </div>
                </li>
            </ul>
            <p class="gray-color no-data-tip"  v-show="!rlist||rlist.length==0">暂无数据</p>
        </div>
    </div>
    <div class='btn-wrap'>
        <button class='get-btn' @click='goExport'>对账导出</button>
    </div>
</div>
</template>
<script>
import DateRangeCom from "@/components/dateRangeCom"
export default {
    data(){
        var nDate = new Date();
        var nYear = nDate.getFullYear();
        var etime = nYear+"-"+(nDate.getMonth()+1)+"-"+nDate.getDate();
        var stimeDate = new Date(nYear,0,1);
        var stime = stimeDate.getFullYear()+"-"+(stimeDate.getMonth()+1)+"-"+stimeDate.getDate();
        return{
            info: '',
            status: 1,
            tabData: [
                {name: '会员支付订单',id: 1},
                {name: '核销订单',id: 2},
                {name: '退款订单',id: 3},
            ],
            stime: etime,
            etime: etime,
            page: 1,
            totalPage: 0,
            viplist: [],//会员支付列表
            hlist: [],//核销列表
            rlist: [],//退款列表
            rollCheck: false
        }
    },
    components:{
        "date-com": DateRangeCom
    },
    mounted(){
        this.init();
        window.addEventListener('scroll', this.handleScroll, true); 
    },    
    methods: {
        handleScroll    : function(){//滚动监听
            var sT = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;//对象滚动的高度
            var wH = document.documentElement.clientHeight || document.body.clientHeight;//对象滚动的高度
            var bH = document.documentElement.scrollHeight || document.body.scrollHeight;//对象滚动的高度
            if(sT+wH == bH&&this.page<=this.totalPage){
                if(!this.rollCheck) return false;
                this.rollCheck = !this.rollCheck;
                var status = this.status;
                if(status==1){//会员支付的切换
                    this.init()
                }else if(status == 2){//核销订单的切换
                    this.getHlistInit()
                }else{//退款订单的切换
                    this.getRebackInit()
                }
            }  
        },
        init(){//会员支付
            var _this = this;
            this.$http.get("do=get_credit2_log_list&m=vipcard&stime="+this.stime+"&etime="+this.etime+"&page="+this.page)
            .then(function(res){
                _this.info = res;
                _this.viplist = _this.viplist.concat(res.list);
                _this.totalPage = res.allpage;
                _this.page++;
                _this.rollCheck = true;
            })
        },
        getHlistInit(){//核销订单
            var _this = this;
            this.$http.get("do=get_used_order_list&m=vipcard&stime="+this.stime+"&etime="+this.etime+"&page="+this.page)
            .then(function(res){
                _this.info = res;
                _this.hlist = _this.list.concat(res.list);
                _this.totalPage = res.allpage;
                _this.page++;
                _this.rollCheck = true;
            })
        },
        getRebackInit(){//会员退款
            var _this = this;
            this.$http.get("do=get_refund_log_list&m=vipcard&stime="+this.stime+"&etime="+this.etime+"&page="+this.page)
            .then(function(res){
                _this.info = res;
                _this.rlist = _this.rlist.concat(res.list);
                _this.totalPage = res.allpage;
                _this.page++;
                _this.rollCheck = true;
            })
        },
        getsTime(value){//获取开始时间
            this.stime = value;
            this.page = 1;
            if(status==1){//会员支付的切换
                this.viplist = [];
                this.init()
            }else if(status == 2){//核销订单的切换
                this.hlist = [];
                this.getHlistInit()
            }else{//退款订单的切换
                this.rlist = [];
                this.getRebackInit()
            }
            this.getRebackInit();
        },
        geteTime(value){//获取开始时间
            this.etime = value;
            this.page = 1;
            if(status==1){//会员支付的切换
                this.viplist = [];
                this.init()
            }else if(status == 2){//核销订单的切换
                this.hlist = [];
                this.getHlistInit()
            }else{//退款订单的切换
                this.rlist = [];
                this.getRebackInit()
            }
            this.getRebackInit();
        },
        goExport(){
            window.location.href = this.info.export_url
        },
        checkTab: function(item){
            var status = item.id;
            this.status = item.id;
            this.page = 1;
            if(status==1){//会员支付的切换
                this.viplist = [];
                this.init()
            }else if(status == 2){//核销订单的切换
                this.hlist = [];
                this.getHlistInit()
            }else{//退款订单的切换
                this.rlist = [];
                this.getRebackInit()
            }
        },
        rebackMoney(item){//退款
            var _this = this;
            this.$message.confirm('',{
                title: '会员号'+item.mobile,
                message: '支付金额'+item.num+',是否确定退款?',
                showCancelButton: true,
                confirmButtonText: '确定退款',
                cancelButtonText: '取消'  
            })
            .then((res) => {
                if (res === 'confirm') {
                    this.$http.get("do=refund&m=vipcard&id="+item.id)
                    .then(function(res){
                        _this.$toast({message:"退款成功"})
                        var filters = _this.viplist.filter(ele => {
                            return ele.id!=item.id;
                        })
                        _this.viplist = filters;
                    })
                }
            })
            
        }
    }
}
</script>
<style>
.mint-msgbox-message{
    color: #333333;
}
</style>
<style lang="scss" scoped>
    .gray-color{
        color: gray;
        text-align: center;
    }
    .blue-color{
        color: skyblue;
    }
    .red-color{
        color: red;
    }
    .tab{
        width: 100%;
        background: #fff;
        position: fixed;
        left: 0;
        top: .82rem;
        z-index: 10
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
            width: 100%;
            padding: .2rem;
            box-sizing: border-box;
            background: #fff;
            position: relative;
            >div{
                display:inline-block;
                text-align: left;
                vertical-align: middle;
            }
            .txt-r{
                text-align: right;
                position: absolute;
                right: .2rem;
                top: 50%;
                margin-top: -.5rem;
            }
            .header-icon{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                vertical-align: middle;
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
                padding: .08rem .2rem;
                border-radius: 4px;
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