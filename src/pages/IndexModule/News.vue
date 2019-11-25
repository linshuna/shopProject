<template>
    <div class="con-wrap">
        <div class="con-inner" v-html="content">
            
        </div>
        <div class="btn-wrap" ng-if="isbm==1">
            <button class="btn" @click="showMarsk=true">报名</button>
        </div>
        <div class="marsk-wrap"  v-show="showMarsk">
            <div class="marsk-con">
                <div class="title">报名</div>
                <ul>
                    <li>
                        <span class="name">姓名：</span>
                        <input type="text" v-model="realname" placeholder="请输入姓名"/>
                    </li>
                    <li>
                        <span class="name">手机号：</span>
                        <input type="tel" v-model="mobile" placeholder="请输入手机号" maxlength="11"/>
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
            showMarsk: false,
            content: '',
            realname: '',
            mobile: '',
            isbm: 0
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        var _this = this;
        this.$http.get("do=detail&m=webhome&id="+this.id)
        .then(function(res){
            _this.content = res.detail.content;
            _this.isbm = res.detail.isbm;
        })
    },
    methods:{
        submit(){
            if(!this.realname){
                this.$toast({message: '请输入姓名'});
                return false;
            }
            var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if(!reg.test(this.mobile)){
                this.$toast({message: '电话号码格式错误'});
                return false;
            }
            var _this = this;
            this.$http.get("do=bm&m=webhome&id="+this.id+"&realname="+this.realname+"&mobile="+this.mobile)
            .then(function(res){ 
                _this.$toast({message: '报名成功'})
                _this.showMarsk = false    
            })
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .btn-wrap{
        width: 100%;
        text-align: center;
        margin: 2.2rem auto 0;
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
        border: 1px solid #efefef;
        padding-left: .1rem;
        box-sizing: border-box;
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
        left: 0;
        background: #fff;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding-top: .86rem;
        padding-bottom: .4rem;
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