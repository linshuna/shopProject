<template>
    <div class="team-wrap">
        <!--<div class="header-wrap"></div>
        <div class="img-wrap">
            <div class="img-inner">
                <img :src="shopInfo.logo"/>
                <p class="name">{{shopInfo.branch_name}}</p> 
            </div>
        </div>-->
        <ul class="shop-add-wrap">
            <li @click="addType(2)">
                <div>
                    <img src=""/>
                    <span class="consume-title">添加店员</span>
                </div>
                <span class="gray-color">+</span>
            </li>
            <li @click="addType(3)">
                <div>
                    <img src=""/>
                    <span class="consume-title">添加财务</span>
                </div>
                <span class="gray-color">+</span>
            </li>
        </ul>
        <div class="consume-list-wrap">
            <div class="title"><span class="line"></span><span>店员列表</span></div>
            <ul class="consume-list">
                <li v-for="(item,index) in cumList">
                    <img :src="item.headimgurl" class="head-img" v-if="item.headimgurl"/>
                    <img src="../../assets/images/def-icon.png" class="head-img" v-else/>
                    <span>{{index+1}}</span>
                    <span>{{item.realname}}</span>
                    <span>{{item.utype==1?'店长':item.utype==2?'店员':'财务'}}</span>
                    <div>
                        <button class="red-color" v-if="item.isbind==0" @click="bindWeixin(item)">绑定</button>
                        <button class="red-color" v-else @click="unbindWeixin(item)">解绑</button>
                        <button class="red-color" @click="cumItemDel($event,item)">移除</button>
                    </div>
                </li>
                <p class="gray-color no-data-tip" v-if="!cumList||cumList.length==0">暂无成员</p>
            </ul>
            
        </div>
        <!--添加对象-->
        <!--修改规则-->
        <div class="marsk-wrap" v-show="show">
            <div class="marsk-inner">
                <!--<p class="title">添加成员</p>
                <div class="img-wrap">
                    <img :src="info.avatar"/>
                    <p>{{info.realname}}</p>
                </div>-->
                <ul class="detail-wrap">
                    <li>
                        <span class="det-title">姓名：</span>
                        <input type="text" v-model="info.realname" placeholder="请输入姓名"/>
                    </li>
                    <li>
                        <span class="det-title">手机号码：</span>
                        <input type="tel" v-model="info.mobile" placeholder="请输入手机号" maxlength="11"/>
                    </li>
                   <!-- <li>
                        <span class="det-title">用户类型：</span>
                        <div class="select" @click="popupVisible = true" >
                            <mt-cell is-link>
                                <p :class="{'black-color': currentTags}">{{currentTags?currentTags.name: '选择用户类型'}}</p>
                            </mt-cell>
                        </div>
                    </li>-->
                </ul>
                <div class="marsk-btn-wrap">
                    <span @click="cancel">取消</span>
                    <span class="red-color" @click="saveMember">保存</span>
                </div>
            </div>
        </div>
        <!--选择-->
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
            <div class="btn-wrap">
                <button @click="popupVisible=false;" class="cancel">取消</button>
                <button @click="handleConfirm" class="sure">确认</button>
            </div>
            <!--@change="onValuesChange"-->
            <mt-picker ref="picker" :slots="pickerList" value-key="name"></mt-picker>
        </mt-popup>
        <div class="marsk-wrap" v-show="shoBindMa" @click="shoBindMa=false">
            <div class="vip-erweima-wrap" >
                <div class="erweima-inner">
                    <div class="square">
                        <img :src="shoBindMaCode"/>
                    </div>
                    <p class="tip">请将二维码展示给店员</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Picker,Popup,Cell } from 'mint-ui';
export default {
    data(){
        return{
            cumList: '',//店员列表
            show: false,
            popupVisible: false,
            pickerList:[{
                flex: 1,
                values: [{name: '店员',value: 2},{name: '财务',value: 3}],
            }],
            currentTags: null,
            info:{
                realname: '',
                mobile: '',
                utype: ''
            },
            shopInfo: '',
            shoBindMa: false,
            shoBindMaCode: ''
        }
    },
    mounted(){
        //获取店铺详情
        var _this = this;
        this.$http.get("do=get_storeinfo&m=vipcard")
        .then(function(res){
            _this.shopInfo = res;
        })
        this.init()
    },    
    methods: {
        init(){
            var _this = this;
            this.$http.get("do=clerk_list&m=vipcard")
            .then(function(res){
                _this.cumList = res;
            })
        },
        cumItemDel(ev,item){//删除
            this.$message.confirm('',{
                title: '是否确定移除该成员',
                message: ' ',
                showCancelButton: true,
                confirmButtonText: '移除',
                cancelButtonText: '取消'  
            })
            .then((res) => {
                if (res === 'confirm') {
                    var _this = this;
                    this.$nextTick(() => {
                        this.$http.get("do=clerk_del&m=vipcard&id="+item.id)
                        .then(function(res){
                            _this.$toast({message:"移除成功"})
                            _this.init();
                        })
                    })
                }
            })
            ev.stopPropagation()
        },
        onValuesChange(value){
            this.currentTags = value;
            console.log(value)
        },
        cancel(){
            this.show = false;
        },
        handleConfirm(){
            var data = this.$refs.picker.getValues();
            this.info.utype = data[0].value;
            this.currentTags = data[0];
            this.popupVisible = false;
        },
        addType(value){
            this.info.utype = value;
            this.show = true;
        },
        saveMember(){//添加成员
            var _this = this;
            var data = this.info;
            if(!data.realname){
                this.$toast({message: '请输入姓名'});
                return false;
            }
            var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if(!reg.test(data.mobile)){
                this.$toast({message: '电话号码格式错误'});
                return false;
            }
            this.$http.get("do=clerk_save&m=vipcard&realname="+data.realname+"&mobile="+data.mobile+"&utype="+data.utype)
            .then(function(res){
                _this.show = false;
                _this.$toast({message: "设置成功"})
                _this.init()
            })
        },
        bindWeixin(item){//绑定微信
           var _this = this;
           this.$message.confirm('',{
                title: '是否确定绑定该成员',
                message: ' ',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'  
            })
            .then((res) => {
                if (res === 'confirm') {
                    var _this = this;
                    this.$nextTick(() => {
                        this.$http.get("do=clerk_qrcode&m=vipcard&id="+item.id)
                        .then(function(res){
                            _this.shoBindMa = true;
                            _this.shoBindMaCode = res.qrcode;
                        })
                    })
                }
            })
        },
        unbindWeixin(item){//解绑微信
           var _this = this;
           this.$message.confirm('',{
                title: '是否确定解除绑定该成员',
                message: ' ',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'  
            })
            .then((res) => {
                if (res === 'confirm') {
                    var _this = this;
                    this.$nextTick(() => {
                        this.$http.get("do=clerk_unbind&m=vipcard&id="+item.id)
                        .then(function(res){
                            _this.$toast({message: "解绑成功"});
                            _this.init();
                        })
                    })
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .team-wrap{
        width: 100%;
        height: 100%;
        padding-top: .86rem;
        // position: absolute;
        // top: 0;
        // left: 0;
        // overflow-y: auto;
        // -webkit-overflow-scrolling: touch;
    }
    .black-color{
        color: #000;
    }
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
        padding: 0 .2rem;
        .img-inner{
            height: 2.8rem;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 0 10px 0 #ccc;
            margin-top: -1rem;
            text-align: center;
            img{
                display: inline-block;
                width: 1.6rem;
                height: 1.6rem;
                border-radius: 100px;
                border: 2px solid #fff;
                margin-top: -.5rem;
            }
            .name{
                margin: .1rem 0;
            }
            .consume-wrap{
                width: 100%;
                text-align: center;
                .shopMa{
                    display: block;
                    width: .6rem;
                    height: .6rem;
                    margin: .1rem auto;
                    margin-bottom: .2rem;
                }
                .shopMaBtn{
                    padding: .06rem .2rem;
                    border: none;
                    border-radius: 2px;
                    color: #fff;
                    background: #6AB6E2;
                }
            }
        }
    }
    .shop-add-wrap{
        width: 100%;
        padding: .2rem .2rem 0;
        box-sizing: border-box;
        li{
            width: 100%;
            height: .86rem;
            padding: 0 .2rem;
            box-sizing: border-box;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            margin-bottom: .2rem;
        }
        li:last-child{
            border-bottom: none;
        }
        .consume-title,img{
            vertical-align: middle;
        }
    }

    .consume-list-wrap{
        width: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .title{
        height: .72rem;
        padding: .2rem;
        box-sizing: border-box;
        background: #fff;
        border-radius: 4px 4px 0 0;
        justify-content: flex-start;
        border-bottom: 1px solid #efefef;
        .line{
            display: inline-block;
            width: 2px;
            height: 100%;
            background: #FD3333;
            border-radius: 100px;
            margin-right: .1rem;
        }
    }
    .consume-list{
        width: 100%;
        height: calc(100vh - 3.4rem);
        overflow-y: auto;
        padding: 0 .2rem;
        box-sizing: border-box;
        background: #fff;
        border-radius: 2px;
        li{
            padding: .2rem 0;
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
        .head-img{
            width: 1.2rem;
            height: 1.2rem;
        }
        button{
            background: transparent;
            border: 1px solid #FD3333;
        }
    }
    .marsk-wrap{
        width: 100%;
        height: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
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
            padding: .34rem .2rem 0;
            box-sizing: border-box;
            .det-title{
                display: inline-block;
                width: 1.4rem;
                text-align: right;
            }
            input{
                display: inline-block;
                width: 3rem;
                height: .65rem;
                padding-left: .1rem;
                box-sizing: border-box;
                border: 1px solid #efefef;
            }
            span,.select{
                display: inline-block;
                vertical-align: middle;
            }
            .select{
                width: 3rem;
                p{
                    line-height: .65rem;
                }
            }
        }
        .tel-wrap{
            input{
                height: .65rem;
                border: 1px solid #efefef;
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
        .mint-cell{
            height: .65rem;
            line-height: .65rem;
            min-height: auto;
            border: 1px solid #efefef;
        }
    }
    .btn-wrap{
        width: 100%;
        height: .82rem;
        padding: 0 .34rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #efefef;
        button{
            background: transparent;
        }
        .cancel{
            color: gray;
        }
        .sure{
            color: red;
        }
    }
    .vip-erweima-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size: 100%;
        z-index: 2;
        .erweima-inner{
            background: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            text-align: center;
            padding-bottom: .2rem;
        }
        .tip{
            color: #000;
            margin-top: 0;
        }
        .square{
            display: inline-block;
            width: 75%;
            text-align: center;
            color:#fff;
            background: #efefef;
            margin-top: 10%;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    
</style>
<style lang="">
    .mint-cell-wrapper{
        height: .65rem;
        background: transparent;
    }
    .mint-cell-allow-right::after{
        right: 10px!important;
    }
    .mint-cell-value{
        width: 80%;
    }
    
</style>