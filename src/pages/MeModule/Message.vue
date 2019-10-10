<template>
    <div class='message-wrap' ref="contentWrap">
        <div class='msg-list' v-for="item in list" @click="goDetail(item)">
            <div class='title'>
                <img src='../../assets/images/msg-icon.png' />
                <span>{{item.title}}</span>
            </div>
            <div class='msg-btm'>
                <div class='msg-con'>{{item.description}}</div>
                <div class='font-20 gray-color'>{{item.createtime}}</div>
            </div>
        </div>
        <p class="gray-color not-data-tip" v-if="!list||list.length==0">暂无数据</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            page: 1,
            totalPage: 0,
            list: [],
            check: true,
        }
    },
    mounted(){
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
            this.$http.get("do=notice_list&m=vipcard&page="+this.page)
            .then(function(res){
                if(isPan == true){
                   _this.check = true;
                   _this.page++;
                }
                _this.list = _this.list.concat(res.list);
                _this.totalPage = res.allpage;
            })
        },
        goDetail(item){
            this.$router.push("/messageDetail/"+item.id)
        }
    }
}
</script>
<style lang="scss" scoped>
    .message-wrap{
        width: 100%;   
        height: 100%;     
        position: absolute;
        top: 0;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling:touch;
        padding: .34rem .2rem;
        box-sizing: border-box; 
    }
    .msg-list{
        width: 100%;
        padding: .38rem .34rem;
        box-sizing: border-box;
        background: #fff;
        border-radius: 8px;
        margin-bottom: .2rem;
    }
    .title{
        margin-bottom: .4rem;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .title img{
        width: .3rem;
        height: .3rem;
        vertical-align: middle;
    }
    .title text{
        padding-left: .2rem;
        vertical-align: middle;
    }
    .msg-con{
        margin-bottom: .1rem;
        display: -webkit-box;
        -webkit-line-clamp:2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }
    .not-data-tip{
        text-align: center;
        padding: .2rem 0;
        background: transparent;
        color: gray;
    }
</style>