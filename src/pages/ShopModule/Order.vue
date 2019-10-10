<template>
<div class="order-wrap">
    <div class="tab">
        <div v-for="(item,index) in tabData" :class="{'active': status==item.id}" 
          @click='checkTab(item)'>{{item.name}}</div>
    </div>
    <div class='shop-wrap' v-if="listData.length>0" ref="contentWrap">
      <div v-for="item in listData" class='shop-inner' @click="goOrderDetail(item)">
          <list :item="item"></list>
      </div>
    </div>
    <no-order v-else></no-order>
    
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
                {name: '全部',id: ''},
                {name:'已兑换',id: 1},
                {name:'已核销',id: 3}],//'活动订单'
            listData:[],
            status: '',
            page: 1,
            check: true,
            goods: {}
        }
    },
    components: {
        "list": List,
        "no-order": NoOrder
    },
    mounted() {
        this.$nextTick(function(){
            this.init()
            window.addEventListener('scroll', this.handleScroll, true); 
        })
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll    : function(){//滚动监听
            var contentWrap = this.$refs.contentWrap;
            if(contentWrap){
                var sT = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;//对象滚动的高度
                var wH = document.documentElement.clientHeight || document.body.clientHeight;//对象滚动的高度
                var bH = document.documentElement.scrollHeight || document.body.scrollHeight;//对象滚动的高度
                if(sT+wH == bH&&this.page<=this.totalPage){
                    if(!this.check) return false;
                    this.check = !this.check;
                    this.init(true)
                }    
            }
        },
        init(isPan){
            var _this = this;
            this.$http.get("do=myorder&m=score_shop&page="+this.page+"&status="+this.status)
            .then(function(res){
                if(isPan == true){
                   _this.check = true;
                   _this.page++;
                }
                var data= _this.listData.concat(res.list);
                _this.listData = _this.unique(data);
                _this.totalPage = res.allpage;
                
            })
        },
        unique(arr) {//去重
            let res = new Map();
            return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
        },
        checkTab: function(item){
            this.status = item.id;
            this.goods = item;
            this.page = 1;
            this.listData = []
            this.init()
        },
        goOrderDetail(item){
            // var data = JSON.stringify({qrcode:item.qrcode});
            this.$router.push({name: 'ShopQrcode',params:{'qrcode': item.qrcode}})
        }
    },
}
</script>
<style lang="scss" scoped>
    .order-wrap,.shop-wrap{
        width: 100%;
        min-height: 100%;
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
        top: 1rem;
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

    /* 商品 */
    .shop-inner{
        margin: .2rem 0;
    }
</style>