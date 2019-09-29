<template>
    <div class="con-wrap">
        <div class="con-inner">
            <h3>标题内容</h3>
            <p class="gray-color fu-title">2019.08.15 12:00:00</p>
            <img src="../../assets/images/swiper/banner1.jpg"/>
            <div class="duan">
                互联网出现的前三十年里，人们对在线问答这种内容形式毫无概念。直到20世纪末，几家搜索引擎出现，信息随之裂变式的增长，丰富的内容世界增加了用户的筛选成本，这时候，人们才开始意识到自己对精准信息的需求。
            </div>
            <div class="duan">
                正如华兴资本投资银行事业群负责人、董事总经理王力行所言，中国处在历史性的发展拐点，背靠知识升级的人口机遇，知乎抓住了，站在了新一代内容消费与高价值信息需求爆发的起点。
            </div>
        </div>
        <div class="btn-wrap">
            <button class="btn" @click="showMarsk = true">报名</button>
        </div>
        <div class="marsk-wrap"  v-show="showMarsk">
            <div class="marsk-con">
                <div class="title">报名</div>
                <ul>
                    <li>
                        <span class="name">姓名：</span>
                        <input type="text"/>
                    </li>
                    <li>
                        <span class="name">手机号：</span>
                        <input type="tel"/>
                    </li>
                </ul>
                <div class="marsk-btn-wrap">
                    <span class="cancel-btn" @click="showMarsk = false">取消</span>
                    <span class="red-color" @click="submit">提交</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showMarsk: false
        }
    },
    methods:{
        submit(){
            this.showMarsk = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .btn-wrap{
        width: 100%;
        text-align: center;
        margin: 2.6rem auto 0;
        color: #333;
    }
    .btn{
        display: inline-block;
        width: 30%;
        height: .6rem;
        background: red;
        color: #fff;
        font-size: .24rem;
        border: none;
        border-radius: 100px;
        box-shadow: 0 0px 10px 2px #ccc;
    }
    .marsk-wrap{
        width:100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
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