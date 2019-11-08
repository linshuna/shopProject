<template>
    <div class='detail-wrap' ref="contentWrap">
        <div class='list' v-for="item in list">
            <div class='set-padding set-flex'>
                <span>{{item.remark}}</span>
                <span :class='{"red-color": item.num-0>0,"blue-color": item.num-0<0}'>{{item.num}}</span>
            </div>
            <div class='gray-color set-flex'>
                <span>{{item.createtime}}</span>
                <span>积分：{{item.cur_num}}</span>
            </div>
        </div>
        <p class="gray-color not-data-tip" v-if="!list||list.length==0">暂无数据</p>
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
        document.title = this.type==1?"消费明细":"积分明细";//设置表头
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
            var type = this.type,url = '';
            if(type == 1){//余额明细
                url = "do=balance_log&m=vipcard&page="+this.page;
            }else if(type == 2){//积分明细
                url = "do=score_log&m=vipcard&page="+this.page;
            }
            this.$http.get(url)
            .then(function(res){
                if(isPan == true){
                   _this.check = true;
                   _this.page++;
                }
                _this.list = _this.list.concat(res.list);
                _this.totalPage = res.allpage;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .detail-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
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
    .not-data-tip{
        text-align: center;
        padding: .2rem 0;
        background: transparent;
    }
</style>