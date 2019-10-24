<template>
<div class="order-wrap">
    <div class="tab">
        <div v-for="(item,index) in tabData" :class="{'active': status==item.id}" 
          @click='checkTab(item)'>{{item.name}}</div>
    </div>
    <div v-if="status == 1" class="mainCon">
        <input type="text" placeholder="请输入订单号" v-model="orderSn" />
        <img src="../../assets/images/store/sao-icon.png" @click="saoFn" class="icon"/>
        <div class="btn-wrap">
            <button @click="sureOrder">确认订单</button>
        </div>
    </div>
    <div class='shop-wrap' v-if="status == 2" ref="contentWrap">
        <template v-if="list&&list.length>0">
            <ul v-show="list">
                <li v-for="item in list">
                    <p class="lr-msg">
                        <span>{{item.goods_name}}</span>
                        <span class="r-msg">数量 {{item.total}}</span>
                    </p>
                    <p>{{item.nickname}}</p>
                    <p class="gray-color">{{item.used_time}}</p>
                </li>
            </ul>
        </template>
        <template v-else-if="list&&list.length==0">
            <p class="gray-color no-tip-data">暂无数据</p>
        </template>
        <template v-else>
            <p class="no-tip-data">数据加载中...</p>
        </template>
    </div>
    
</div>
</template>
<script>
import NoOrder from '@/components/noOrder'
import List from "@/components/list"
import Erweima from "@/components/ShopErWeima"
export default {
    data(){
        return {
            currenIdx: 0,
            tabData: [
                {name: '核销订单',id: 1},
                {name:'核销记录',id: 2}],
            list: null,
            status: 1,
            orderSn: ""
        }
    },
    components: {
        "list": List,
        "no-order": NoOrder
    },
    watch: {
        orderSn(newVal,oldVal){
            this.orderSn=this.orderSn.replace(/[\W]/g,'');
        }
    },
    mounted() {
        this.$nextTick(function(){ 
            this.getJsapi()
            this.orderSn = this.$route.params.ordersn;//获取当前的订单号
            var date = new Date()
            this.dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            this.date = this.dateStr;
        })
    },
    methods: {
        init(){
            var _this = this;
            this.$http.get("do=clerk_index&m=vipcard")
            .then(function(res){
                var utype = res.utype;
                if(utype == 1){
                    _this.shopInit(0)
                }else{
                    _this.$http.get("do=info&m=vipcard")
                    .then(function(res){
                        _this.shopInit(res.id)
                    })
                }
                
            })

            
        },
        shopInit(adminid){
            var _this = this;
            this.$http.get("do=get_used_order_list&m=vipcard&ddate="+this.date+"&adminid="+adminid)
            .then(function(res){
                _this.list = res;
            })
        },
        checkTab: function(item){
            this.status = item.id;
            this.init()
        },
        sureOrder(){//确认订单
            if(!this.orderSn){
                this.$toast({message: "请输入核销订单号"});
                return false;
            }
            this.$message.confirm('',{
                title: '是否确定核销该订单',
                message: ' ',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'  
            })
            .then((res) => {
                if (res === 'confirm') {//确定核销
                    this.verification()
                }
            })
            
        },
        saoFn(){//扫一扫
            var _this = this;
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    _this.orderSn = result;
                    _this.$router.push("/verOrder/"+result)
                }
            });
        },
        verification(){
            var _this = this;
            this.$http.get("do=set_used&m=vipcard&sn="+this.orderSn,{forbidden:true}) 
            .then(function(res){
                _this.$toast({
                    message: "核销订单成功"
                })
                _this.orderSn = ''
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .order-wrap,.shop-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .order-wrap{
        padding-bottom: 1rem;
    }
    .shop-wrap{
        padding-top: 1.2rem;
        li{
            width: 100%;
            padding: .2rem;
            box-sizing: border-box;
            border-bottom: 1px solid #efefef;
            background: #fff;
            >p{
                margin: .1rem 0;
            }
        }
        .lr-msg{
            width: 100%;
            position: relative;
            box-sizing: border-box;
            .r-msg{
                position: absolute;
                top: 0;
                right: 0;
                color: #1AB168;
            }
        }
    }
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
        width: 50%;
        text-align: center;
        padding: .3rem 0;
        box-sizing: border-box;
        font-size: .3rem;
    }
    .tab .active{
        color: #DC3E56;
        border-bottom: 1px solid #DC3E56;
    }

    /* 商品 */
    .shop-inner{
        margin: .2rem 0;
    }
    .mainCon{
        width: 100%;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%,0);
        text-align: center;
        input{
            display: inline-block;
            width: 60%;
            height: .72rem;
            padding-left: .2rem;
            box-sizing: border-box;
            border-radius: 4px;
            border: 1px solid #ddd;
            vertical-align: middle;
        }
        .icon{
            width: .42rem;
            padding: 0 .1rem;
            vertical-align: middle;
        }
        .btn-wrap{
            button{
                width: 30%;
                padding: .12rem .2rem;
                background: skyblue;
                border-radius: 2px;
                margin-top: .42rem;
                font-size: .24rem;
            }
        }
    }
    .no-tip-data{
        text-align: center;
        margin-top: .42rem;
    }
</style>