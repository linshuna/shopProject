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
        <!--<div class='list'>
            <div class='set-padding set-flex'>
                <span>换购**产品</span>
                <span class='blue-color'>-200</span>
            </div>
            <div class='gray-color set-flex'>
                <span>2018-09-10 13:22</span> 
                <span>积分：200</span>
            </div>
        </div>-->
    </div>
</template>
<script>
export default {
    data(){
        return{
            type: 2,//默认是积分明细
            page: 1,
            totalPage: 0,
            list: []
        }
    },
    mounted(){
        this.type = this.$route.params.type;
        this.init();
        window.addEventListener('scroll', this.handleScroll, true); 
        // var list = localStorage.getItem('vipcardList');
        // var data = []
        // if(list.data&&list.data.length>0){
        //     data = list.data.filter(ele => {
        //         return ele.sign == 1;//1是已签到
        //     })
        //     this.year = list.year;
        //     this.month = list.month;
        // }
        // this.list = data;
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
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
            var type = this.type,url = '';
            if(type == 1){//余额明细
                url = "do=balance_log&m=vipcard&page="+this.page;
            }else if(type == 2){//积分明细
                url = "do=score_log&m=vipcard&page="+this.page;
            }
            this.$http.get(url)
            .then(function(res){
                _this.list = _this.list.concat(res.list);
                _this.totalPage = res.allpage;
                ++_this.page;
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
    .gray-color{
        font-size: .22rem;
    }
    .not-data-tip{
        font-size: .24rem;
        text-align: center;
        padding: .2rem 0;
        background: transparent;
    }
</style>