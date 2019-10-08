<template>
    <div>
        <div v-show="!showMa">
            <div class="header">
                <span class="red-color">队员</span>
                <router-link :to="{ name:'ShopQrcode',params:{'code': JSON.stringify({qrcode:erweima.qrcode})} }">邀请</router-link>
            </div>
            <ul class="team-list">
                <li @click="goTeamDetail(item.bid)" v-for="item in list">
                    <div>
                        <img :src="item.avatar"/>
                        <span>{{item.mobile}}</span>
                    </div>
                    <div>
                        <button @click="settingTeam($event,item)">设置</button>
                        <button @click="settingTeamDel($event,item)">删除</button>
                    </div>
                </li>
            </ul>
            <button class="btn-wrap" @click="showAdd=true;">添加</button>
        </div>
        <!--添加成员-->
        <div class="marsk-wrap" v-show="showAdd">
            <div class="marsk-inner">
                <p class="title">添加队员</p>
                <div class="tel-wrap">
                    手机号：<input type="tel" placeholder="请输入手机号" v-model="mobile" maxlength="11"/>
                </div>
                <div class="marsk-btn-wrap">
                    <span @click="showAdd=false;">取消</span>
                    <span class="red-color" @click="saveTeam">保存</span>
                </div>
            </div>
        </div>
        <!--修改规则-->
        <div class="marsk-wrap" v-show="show">
            <div class="marsk-inner">
                <p class="title">修改规则</p>
                <div class="img-wrap">
                    <img :src="info.avatar"/>
                    <p>{{info.realname}}</p>
                </div>
                <ul class="detail-wrap">
                    <li>
                        <span class="det-title">每日限额：</span>
                        <input type="text" v-model="info.day_limit"/>
                        <span>元</span>
                    </li>
                    <li>
                        <span class="det-title">总限额：</span>
                        <input type="text" v-model="info.all_limit"/>
                        <span>元</span>
                    </li>
                </ul>
                <div class="marsk-btn-wrap">
                    <span @click="cancel">取消</span>
                    <span class="red-color" @click="saveRule">保存</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                list: [],
                info: {},//个人得信息
                mobile: '',
                showAdd: false,
                show: false,
                showMa: false,
                erweima: {
                    goods_name: "xx",
                    qrcode: "erweima"
                }
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){//数据初始化
                var _this = this;
                this.$http.get("do=team_data&m=vipcard")
                .then(function(res){
                    _this.list = res.list;
                    _this.erweima = res
                })
            },
            settingTeam(ev,item){//设置
                this.show = true;
                this.info = item;
                ev.stopPropagation()
            },
            settingTeamDel(ev,item){//删除
                this.$message.confirm('',{
                    title: '是否确定删除该成员',
                    message: ' ',
                    showCancelButton: true,
                    confirmButtonText: '删除',
                    cancelButtonText: '取消'  
                })
                .then((res) => {
                    if (res === 'confirm') {
                        var _this = this;
                        this.$nextTick(() => {
                            this.$http.get("do=team_del&m=vipcard&bid="+item.bid)
                            .then(function(res){
                                _this.$toast({message:"删除成功"})
                                _this.init();
                            })
                        })
                    }
                })
                ev.stopPropagation()
            },
            cancel(){//取消
                this.show = false;
            },
            save(){//保存
                this.show = false;
            },
            goTeamDetail(id){
                this.$router.push("/myTeamDetail/"+id)
            },
            saveTeam(){//添加成员
                var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                if(!reg.test(this.mobile)){
                    this.$toast({message: '电话号码格式错误'});
                    return false;
                }
                var _this = this;
                this.$http.get("do=team_add&m=vipcard&mobile="+this.mobile)
                .then(function(res){
                    _this.showAdd = false;
                    _this.$toast({message: "设置成功"})
                    _this.init();
                })
            },
            saveRule(){//设置修改规则
                var _this = this;
                this.$http.get("do=team_set&m=vipcard&bid="+this.info.bid+"&day_limit="+this.info.day_limit+"&all_limit="+this.info.all_limit)
                .then(function(res){
                    _this.show = false;
                    _this.$toast({
                        message: "设置成功"
                    })

                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .red-color{
        color: red;
    }
    .header{
        width: 100%;
        height: .96rem;
        background: #fff;
        margin-bottom: .2rem;
        font-size: 0;
        padding: .34rem 0;
        box-sizing: border-box;
        span,a{
            font-size: .24rem;
            display: inline-block;
            width: 50%;
            text-align: center;
        }
        span:first-child{
            border-right: 1px solid #efefef;
        }
    }
    .active{
        color: red;
    }
    .team-list{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        background: #fff;
        color: #7D7D7D;
        li{
            width: 100%;
            padding: .42rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #efefef;
            img{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 100px;
            }
        }
        button{
            border-radius: 4px;
            border: 1px solid #3A3085;
            color: #3A3085;
            background: transparent;
            margin-left: .2rem;
            padding: .04rem .2rem;
        }
    }
    .btn-wrap{
        width: 100%;
        height: .96rem;
        line-height: .96rem;
        border: none;
        color: #fff;
        background: red;
        position: absolute;
        left: 0;
        bottom: 0;
    }
     // 规则
    .marsk-wrap{
        width: 100%;
        height: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.4);
        z-index: 2;
        .marsk-inner{
            width: 70%;
            border-radius: 4px;
            background: #fff;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                display: inline-block;
                width: 1rem;
                height: 1rem;
                border-radius: 100px;
            }
            p{
                text-align: center;
            }
            .title{
                height: .96rem;
                line-height: .96rem;
                text-align: center;
                border-bottom: 1px solid #efefef;
            }
            .img-wrap{
                margin: .34rem auto;
            }
        }   
        li{
            width: 100%;
            padding-left: .2rem;
            box-sizing: border-box;
            text-align: left;
            margin-bottom: .4rem;
        }
        .detail-wrap{
            width: 100%;
            padding: 0 .2rem;
            box-sizing: border-box;
            .det-title{
                display: inline-block;
                width: 1.4rem;
                text-align: left;
            }
            input{
                width: 2rem;
                height: .65rem;
                border: 1px solid #efefef;
            }
        }
        .tel-wrap{
            input{
                height: .65rem;
                border: 1px solid #efefef;
                padding-left: .1rem;
                box-sizing: border-box;
            }
        }
        .marsk-btn-wrap{
            width: 100%;
            height: .96rem;
            padding: 0 .34rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: gray;
            border-top: 1px solid #efefef;

        }
    }
    .tel-wrap{
        padding: .2rem 0;
    }
</style> 