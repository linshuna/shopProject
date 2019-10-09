<template>
    <div class="con-wrap">
        <div class="con-inner" v-html="content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            id: '',
            content: ''
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        var _this = this;
        this.$http.get("do=notice_detail&m=vipcard&id="+this.id)
        .then(function(res){
            _this.content = res.content;
        })
    },
}
</script>
<style lang="scss" scoped>
    .marsk-wrap{
        width:100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0,0,0,.5);
    }
    .marsk-con{
        width: 70%;
        background: #fff;
        border-radius: 8px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 0 .2rem;
        box-sizing: border-box;
        ul{
            padding-top: .34rem;
        }
        li{
            padding-bottom: .34rem;
        }
    }
    .title{
        font-weight: 500;
        font-size: .32rem;
        text-align: center;
        height: .68rem;
        line-height: .68rem;
        border-bottom: 1px solid #efefef;
    }
    .name{
        display: inline-block;
        width: 1.2rem;
        text-align: right;
        color: #333;
    }
    input{
        display: inline-block;
        width: 70%;
        height: .62rem;
        line-height: .62rem;
        border: 1px solid #efefef;
    }
    .marsk-btn-wrap{
        width: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: .72rem;
        line-height: .72rem;
        border-top: 1px solid #efefef;
    }
    .cancel-btn{
        color: #333;
    }

    .con-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .con-inner{
        width: 100%;
        padding: .2rem;
        box-sizing: border-box;
    }
    .con-inner .fu-title{
        font-size: .22rem;
        margin: .1rem 0;
    }
    .con-inner img{
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        margin: 0 auto;
    }
    .duan{
        text-indent: .42rem;
        margin-top: .2rem;
    }
</style>