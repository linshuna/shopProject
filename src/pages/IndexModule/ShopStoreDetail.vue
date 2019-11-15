<template>
    <div class="main-wrap">
        <p>位置示意图：</p>
        <img :src="msg.place_pic" class="place_pic" @click="proxyImage(msg.place_pic)"/>
        <p>电话：<a :href="'tel:'+msg.mobile" class="phone">{{msg.mobile}}</a></p>
        <p>图片列表：</p>
        <div class='slider-wrap'>
            <div class='slider-inner'>
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in msg.photo_list">
                        <img :src="item.thumb"/>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <p>人均价格：{{msg.avg_price}}</p>
        <p>营业时间：{{msg.telephone}}</p>
        <p>简介：{{msg.introduction}}</p>
    </div>
</template>
<script>
export default {
    data(){
        var msg = decodeURIComponent(this.$route.params.msg);
        msg = JSON.parse(msg)
        document.title = msg.branch_name;
        return {
            msg: msg
        }
    },
    mounted() {
        this.getJsapi()
    },
    methods: {
        proxyImage(url){
            wx.previewImage({
                current: url,
                urls: [url]
            });
        }
    },
}
</script>
<style lang="scss" scoped>
    .main-wrap{
        width: 100%;
        height: calc(100%);
        position: absolute;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        z-index:1;
        background: #fff;
        padding: 0 .34rem 1rem;
        box-sizing: border-box; 
        p{
            margin-top: .2rem;
        }
        p:first-child{
            margin-top: 0;
        }
    }
    .slider-wrap{
        position: relative;
        width: 100%;
        height: 4.2rem;
        padding: .4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #efefef;
    }
    .slider-inner,.slider-inner img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;  
    }
    .place_pic{
        width: 100%;
    }
    .phone{
        font-weight: 550;
    }
</style>