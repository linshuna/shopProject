<template>
    <div class="team-wrap">
        <div class="header-wrap"></div>
        <div class="img-wrap">
            <div class="img-inner">
                <img src="../../assets/images/my-icon.png"/>
                <p class="name">张三</p> 
                <div class="consume-wrap">
                    <div>
                        <p class="red-color">80</p>
                        <p>今日消费</p>
                    </div>
                    <div>
                        <p class="red-color">500</p>
                        <p>总消费</p>
                    </div>
                </div>
            </div>
        </div>
        <ul class="consume-list">
            <li>
                <div>
                    <p class="consume-title">******消费</p>
                    <p class="gray-color">2019-09-10 00:00:00</p>
                </div>
                <span class="red-color">200</span>
            </li>
            <li>
                <div>
                    <p class="consume-title">******消费</p>
                    <p class="gray-color">2019-09-10 00:00:00</p>
                </div>
                <span class="red-color">200</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list: ''//消费记录
        }
    },
    mounted(){
        var _this = this;
        var bid = this.$route.params.id;
        this.$http.get("do=team_pay_log&m=vipcard&bid="+bid)
        .then(function(res){
            _this.list = res.list;
        })
    },    
}
</script>
<style lang="scss" scoped>
    .gray-color{
        color: gray;
    }
    .red-color{
        color: red;
        font-size: .28rem;
        font-weight: 560;
        margin-bottom: .1rem;
    }
    .header-wrap{
        width: 100%;
        height: 2rem;
        background: red;
    }
    .img-wrap{
        width: 100%;
        padding: 0 .34rem;
        .img-inner{
            height: 2.8rem;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 0 10px 0 #ccc;
            margin-top: -1rem;
            text-align: center;
            img{
                display: inline-block;
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 100px;
                border: 2px solid #fff;
                margin-top: -.5rem;
            }
            .name{
                margin: .2rem 0;
            }
            .consume-wrap{
                width: 100%;
                padding: 0 .8rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: gray;
            }
        }
    }
    .consume-list{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        background: #fff;
        margin-top: .34rem;
        li{
            padding: .34rem 0;
            border-bottom: 1px solid #efefef;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        li:last-child{
            border-bottom: none;
        }
        .consume-title{
            margin-bottom: .2rem;
        }
    }
</style>