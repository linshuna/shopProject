<template>
    <div class='vip-pay-wrap'>
        <div class="shop-info-wrap">
            <img :src="shopInfo.logo"/>
            <div class="shop-con">
                <p>店铺名称：{{shopInfo.branch_name}}</p>
                <p>店铺电话：{{shopInfo.telephone}}</p>
                <p>当前余额：{{shopInfo.credit2}}</p>
            </div>
        </div>
        <div class="main-inner">
            <div class='title'>支付金额：</div>
            <div class='money red-color'>
                <span class='font-34'>￥</span>
                <input type="text" v-model="realMoney" placeholder='请输入支付金额'/>
                <span class='font-34'>元</span>
            </div>
            <div class="coupon-wrap" @click="checkCoupe">
                <span>优惠券：</span>
                <com-select 
                    selectType="coupon"
                    :selectData="list"
                    @checkedSelect="checkNum"></com-select>
            </div>
        </div>
        <div class='btn-wrap'>
            <button class='order-btn' @click="chongFn">确定支付</button>   
        </div>
    </div>

</template>
<script>
import ComSelect from "@/components/selectCom"
export default {
    data(){
        return {
            sid: '',
            shopInfo: '',
            realMoney: '',
            originMoney: null,
            cList: [],//获取所有的数据
            list: [{name:"请选择",card_money:0,cardid:''}],//根据输入筛选
            cardid: ''//使用的优惠券id
        }
    },
    components:{
        "com-select": ComSelect
    },
    mounted() {
        this.sid = this.$route.params.id;
        if(this.sid){
            this.init();//获取所有未使用的优惠券
            var _this = this;
            this.$http.get("do=repay&m=vipcard&sid="+this.sid)
            .then(function(res){
                _this.shopInfo = res;
            })
        }
    },
    watch: {
        realMoney(newVal){
            if(!newVal) return false;
            if(this.cList.length==0) return false;
            var cList = JSON.parse(JSON.stringify(this.cList))
            var filters = cList.filter(ele => {
                return ele.card_money-0<newVal-0;
            })
            this.list = filters;
        }
    },
    methods: {
        init(){
            var _this = this;
            //对应店铺能获取到未使用的优惠
            this.$http.get("do=user_coupon&m=vipcard&page="+this.page+"&psize=0&is_used=2&sid="+this.sid)
            .then(function(res){ 
                var list = res.list;
                list.forEach(ele => {
                    ele.name = ele.card_title+"(优惠"+ele.card_money+"元)"
                })
                _this.cList = JSON.parse(JSON.stringify(res.list));
            })
            _this.list = _this.cList = [{
                name:"请选择",
                cardid: ''
            }]
        },
        checkCoupe(){//存储原价
            this.originMoney = this.originMoney?this.originMoney:this.realMoney;
            return false;
        },
        checkNum(data){
            this.cardid = data.value.cardid;
            // var credit2 = this.shopInfo.credit2||0
            // if(this.realMoney&&this.realMoney<=credit2-0){}
            //要原价处理
            var m = this.originMoney - (data.value.card_money-0);
            this.realMoney = m>0?m:0;
            
        },
        chongFn(){
            if(!this.realMoney){
                this.$toast({message: "请输入支付金额"})
                return false;
            }else if(this.realMoney>this.shopInfo.credit2-0){
                this.$message.confirm('',{
                    title: '余额不足，是否确定充值',
                    message: ' ',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'  
                })
                .then((res) => {
                    if (res === 'confirm') {
                        var _this = this;
                        this.$nextTick(() => {
                            _this.$router.push("/vipChong");
                        })
                    }
                })
                return false;
            }
            //再次确认
            this.$message.confirm('',{
                title: '是否确定支付',
                message: ' ',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'  
            })
            .then((res) => {
                if (res === 'confirm') {
                    var _this = this;
                    this.$nextTick(() => {
                        _this.$http.get("do=pay&m=vipcard&sid="+_this.sid+"&money="+_this.realMoney+"&cardid="+_this.cardid)
                        .then(function(mRes){
                            _this.$toast({message: '支付成功'})
                            setTimeout(function(){
                                _this.$router.push("/index")
                            },800)
                            
                        })
                    })
                }
            })

            
        }
    },
}
</script>
<style lang="scss" scoped>
    .vip-pay-wrap{
        width: 100%;
        padding: .2rem .2rem 0;
        box-sizing: border-box;
        .main-inner{
            width: 100%;
            padding: 0 .56rem;
            box-sizing: border-box;
        }
    }
    .shop-info-wrap{
        text-align: center;
        .shop-con{
            width: 50%;
            text-align: left;
            margin: .2rem auto;
        }
        img{
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 100px;
        }
    }
    .vip-pay-wrap .title{
        margin: 0 0 .6rem;
    }
    .money{
        font-size: .32rem;
        font-weight: 600;
        text-align: center;
    }
    .money input{
        display: inline-block;
        width: 60%;
        border-bottom: 1px solid #E5E5E5;
        margin: 0 .2rem;
        text-align: center;
        background: transparent;
        line-height: .4rem;
        font-size: .4rem;
        color: red;
    }

    .btn-wrap{
        width: 100%;
        position: absolute;
        bottom: 20%;
        left: 0;
        text-align: center;
    }
    .btn-wrap button{
        width: 80%;
        height: .8rem;
        line-height: .8rem;
        border-radius: 100px;
        color: #fff;
        background: red;
        font-size: .28rem;
    }
    .coupon-wrap{
        margin-top: .34rem;
        display: flex;
        >*{
            vertical-align: middle;
        }
        .select_box{
            width: 100%;
            flex: 1;
        }
    }
    
</style>