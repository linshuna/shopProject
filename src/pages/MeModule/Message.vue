<template>
    <div class='message-wrap'>
        <div class='msg-list' @click="goDetail">
            <div class='title'>
                <img src='../../assets/images/msg-icon.png' />
                <span>系统信息</span>
            </div>
            <div class='msg-btm'>
                <div class='msg-con'>欢迎，成为变美APP的一份子</div>
                <div class='font-20 gray-color'>2019-03-13 10:00</div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    methods:{
        goDetail(){
            this.$router.push("/messageDetail")
        }
    }
}
</script>
<style lang="scss" scoped>
    .message-wrap{
        width: 100%;
        padding: .34rem .2rem;
        box-sizing: border-box;
    }
    .msg-list{
        width: 100%;
        padding: .38rem .34rem;
        box-sizing: border-box;
        background: #fff;
        border-radius: 8px;
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
        padding-bottom: .1rem;
    }
</style>