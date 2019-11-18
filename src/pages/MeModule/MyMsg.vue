<template>
    <div class='my-msg-wrap'>
        <div class='list header-list'>
            <span>用户头像</span>
            <img :src='info.avatar'/>
        </div>
        <div class='list'>
            <span>昵称</span>
            <input placeholder='请输入昵称' v-model="info.nickname"></input>
        </div>
        <div class='list'>
            <span>绑定手机</span>
            <span class='gray-color'>{{info.cardsn}}</span>
        </div>
        <div class='btn-wrap'>
            <button @click='goCarList'>确定修改</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            info: {}
        }
    },
    mounted(){
        this.info = JSON.parse(window.localStorage.getItem('info'));
        console.log(this.info)
    },
    methods: {
        goCarList(){}
    },
}
</script>
<style lang="scss" scoped>
    .my-msg-wrap{
        width: 100%;
        padding-top: .86rem;
    }
    .list{
        width: 100%;
        height: .96rem;
        line-height: .96rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .34rem;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
        color: #333;
        background: #fff;
    }
    .header-list{
        height: 1.2rem;
        line-height: 1.2rem;
    }
    .list img{
        width: .8rem;
        height: .8rem;
    }
    .list input{
        text-align: right;
    }

    .btn-wrap{
        width: 100%;
        margin-top: .8rem;
        text-align: center;
    }
    .btn-wrap button{
        width: 70%;
        height: .8rem;
        line-height: .8rem;
        background: red;
        color: #fff;
        font-size: .28rem;
        border-radius: 100px;
    }
</style>