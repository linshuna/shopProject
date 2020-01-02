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
        <div class='title'>请输入支付金额</div>
        <div class='money red-color'>
            <span class='font-34'>￥</span>
            <input type="text" v-model="money"/>
            <span class='font-34'>元</span>
        </div>
        <div class="coupon-wrap">
            <span>优惠券：</span>
            <com-select 
                selectType="coupon"
                :selectData="list"
                @checkedSelect="checkNum"></com-select>
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
            money: '',
            cList: [],//获取所有的数据
            list: [{name:"请选择",cardid:''}],//根据输入筛选
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
        money(newVal){
            if(!newVal) return false;
            var cList = JSON.parse(JSON.stringify(this.cList))
            var filters = cList.filter(ele => {
                return ele.card_money-0<newVal-0;
            })
            this.list = this.list.concat(filters);
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
                    ele.name = ele.card_title
                })
                _this.cList = JSON.parse(JSON.stringify(res.list));
            })
            // _this.list = _this.cList = [{
            //     name:"请选择",
            //     cardid: ''
            // },{
            //     branch_name: "空勤灶三号湾店",
            //     card_money: "50.00",
            //     card_title: "星巴克50元抵扣券",
            //     name: "星巴克50元抵扣券",
            //     cardid: "1",
            //     ctime: "2019-11-12 16:59",
            //     sid: "1",
            // }]
        },
        checkNum(value){
            this.cardid = value.cardid;
        },
        chongFn(){
            if(!this.money){
                this.$toast({message: "请输入支付金额"})
                return false;
            }else if(this.money>this.shopInfo.credit2-0){
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
            var _this = this;
            this.$http.get("do=pay&m=vipcard&sid="+this.sid+"&money="+this.money+"&cardid="+this.cardid)
            .then(function(res){
                _this.$toast({message: '支付成功'})
                setTimeout(function(){
                    _this.$router.push("/index")
                },1000)
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
        width: 40%;
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
        margin-top: .2rem;
        >*{
            vertical-align: middle;
        }
    }
    .select_box{
        width: 3.5rem!important;
        padding-left: .34rem;
    }
</style>