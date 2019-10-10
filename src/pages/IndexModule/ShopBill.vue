<template>
    <div class='detail-wrap' ref="contentWrap">
        <div class='list' v-for="item in list">
            <div class='set-padding set-flex'>
                <span>单号：{{item.tid}}</span>
                <span class='red-color'>￥{{item.fee}}</span>
            </div>
            <div class='gray-color set-flex'>
                <span>{{item.createtime}}</span>
                <button @click="goBill(item)" class="bill-btn">发票</button>
            </div>
        </div>
        <p class="gray-color not-data-tip" v-if="!list||list.length==0">暂无发票记录</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            type: 2,//默认是积分明细
            page: 1,
            totalPage: 0,
            check: true,
            list: []
        }
    },
    mounted(){
        this.type = this.$route.params.type;
        this.init();
        window.addEventListener('scroll', this.handleScroll, true); 
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
        handleScroll    : function(){//滚动监听
            var contentWrap = this.$refs.contentWrap;
            if(contentWrap){
                // var sT = contentWrap.scrollTop;//对象滚动的高度
                // var wH = contentWrap.clientHeight;//对象高度
                // var bH = contentWrap.scrollHeight;//对象的滚动高度+对象本身的高度
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
            this.$http.get("do=recharge_log&m=vipcard&page="+this.page)
            .then(function(res){
                if(isPan == true){
                   _this.check = true;
                   _this.page++;
                }
                _this.list = _this.list.concat(res.list);
                _this.totalPage = res.allpage;
            })
        },
        goBill(item){
            window.location.href = "http://shw.mxiaoxin.com/app/index.php?i=1&c=entry&do=invoice&m=vipcard&id="+item.id
        }
    }
}
</script>
<style lang="scss" scoped>
    .detail-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 0 .34rem;
        box-sizing: border-box;
        background: #fff;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch; 
    }
    .detail-wrap .list{
        padding: .22rem 0;
        border-bottom: 1px solid #efefef;
    }
    .list>div{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .set-padding{
        padding-bottom: .2rem;
    }
    .set-flex{
        display: flex;
        justify-content: space-between;
    }
    .bill-btn{
        background: red;
        color: white;
        font-size: .24rem;
        border-radius: 4px;
        padding: .1rem .2rem;
        border: none;
    }
    .not-data-tip{
        text-align: center;
        padding: .2rem 0;
        background: transparent;
    }
</style>