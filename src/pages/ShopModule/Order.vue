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
                var sT = contentWrap.scrollTop;//对象滚动的高度
                var wH = contentWrap.clientHeight;//对象高度
                var bH = contentWrap.scrollHeight;//对象的滚动高度+对象本身的高度
                if(sT+wH == bH&&this.page<=this.totalPage){
                    this.init()
                }    
            }
        },
        init(){
            var _this = this;
            this.$http.get("do=myorder&m=score_shop&page="+this.page+"&status="+this.status)
            .then(function(res){
                _this.listData = _this.listData.concat(res.list);
                _this.totalPage = res.allpage;
                _this.page++;
            })
        },
        checkTab: function(item){
            this.status = item.id;
            this.goods = item;
            this.page = 1;
            this.listData = []
            this.init()
        },
        goOrderDetail(item){
            var data = JSON.stringify({qrcode:item.qrcode});
            this.$router.push({name: 'ShopQrcode',params:{'code': data}})
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
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
    }
    .tab>div{
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