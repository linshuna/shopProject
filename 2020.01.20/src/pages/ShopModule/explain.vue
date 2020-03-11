<template>
    <div>
        <div class="con-inner" v-html="content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            content: ''
        }
    },
    mounted(){
        this.$nextTick(function(){
            var rule = localStorage.getItem('rule')
            this.content = rule&&rule!="undefined"?rule:''
        })
    }
}
</script>
<style lang="scss" scoped>
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