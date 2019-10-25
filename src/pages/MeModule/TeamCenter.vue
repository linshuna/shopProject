<template>
<div>
    <div class="tab">
        <div v-for="(item,index) in tabData" :class="{'active': status==item.id}" 
        @click='checkTab(item)'>{{item.name}}</div>
    </div>
    <div class='team-center-wrap' v-show="status==1">
        <div class='team-top'>
            <div>
                <span>可用金额</span>
            </div>
            <div class='money'>{{infoMsg.credit2}}元</div>
            <button class='pay-btn' @click="goUrl('/vipChong')">充值</button>
        </div>
        <div class='add-people'>
            <div class='chong-list' @click="showAdd=true;">
                <span>添加成员</span>
                <img src='../../assets/images/add-carno.png' class='add-icon'/>
            </div>
            <ul class='people-list'>
                <li class='list' v-for="item in list">
                    <v-touch
                        @chong-event="settingChong(item)" 
                        @setting-event="settingTeam($event,item)" 
                        @record-event="goUrl('/record')"
                        @del-event="settingTeamDel($event,item)">
                        <div class="list-inner">
                            <div>
                                <img :src="item.avatar" @click="goTeamDetail(item.bid)"/>
                                <span>{{item.mobile}}</span>
                            </div>
                        </div>
                    </v-touch>
                </li>
            </ul>
            <!--<div class='simall-money'>
                <span>统一充值金额</span>
                <input type='text' />
                <button class='pay-btn'>充值</button>
            </div>-->
        </div>
        <!--<div class='another-chong-wrap'>
            <div class='title'>分别充值</div>
            <div class='table-header'>
                <div class='set-w10'>勾选</div>
                <div class='set-w12'>头像</div>
                <div class='set-w10'>姓名</div>
                <div class='set-w22 phone'>手机号/会员号</div>
                <div>充值金额</div>
            </div>
            <div class='table-con'>
                <div class='list' @click="check">
                    <div class='set-w10'><input type="radio" :checked="bol"/></div>
                    <div class='set-w12'><img src='../../assets/images/my-icon.png' class='header-icon'/></div>
                    <div class='set-w10'>张三</div>
                    <div class='set-w22'>15214541111</div>
                    <input type='text' />
                    <div class='btn-wrap'><button class='pay-btn'>充值</button></div>
                </div>

            </div>
        </div>-->
    </div>
    <div v-show="status==2" class="team-center-wrap">
        
    </div>
    <div v-show="status==3" class="team-center-wrap">
        <div class="date-wrap">
            <date-com :date="stime" @listenToChild="getTime"></date-com>
            <img src="../../assets/images/store/date-icon.png" class="date-icon"/>
        </div>
        <ul class="record-list" v-if="recordList&&recordList.length>0">
            <li v-for="item in recordList">
                <div class="header-wrap">
                    <img :src="item.avatar" class="header-icon"/>
                </div>
                <div class="middle-wrap">
                    <p>
                        <span>{{item.realname}}</span>
                    </p>
                    <p>卡号：{{item.mobile}}</p>
                    <p class="gray-color">充值时间：{{item.ctime}}</p>
                </div>
                <span class="blue-color">￥{{item.credit2}}</span>
            </li>
        </ul>
        <p class="gray-color no-date-tip" v-else>暂无数据</p>
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
    <!--给队员充值-->
    <div class="marsk-wrap" v-show="showChong">
        <div class="marsk-inner">
            <p class="title">队员充值</p>
            <div class="img-wrap">
                <img :src="info.avatar"/>
                <p>{{info.realname}}</p>
            </div>
            <ul class="detail-wrap">
                <li>
                    <span class="det-title">充值金额：</span>
                    <input type="number" v-model="info.money"/>
                    <span>元</span>
                </li>
            </ul>
            <p class="red-color tip">提示：充值金额无法撤回，请确认后充值!</p>
            <div class="marsk-btn-wrap">
                <span @click="cancel">取消</span>
                <span class="red-color" @click="saveChong">确认充值</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
const VTouch = ()=>import('@/components/touch'); 
import DateRangeCom from "@/components/dateRangeCom"
export default {
    data(){
        return{
            bol: false,
            status: 1,
            tabData: [
                {name: '团队充值',id: 1},
                {name: '队员邀请',id: 2},
                {name: '充值记录',id: 3},
            ],
            recordList: [],
            showAdd: false,
            show: false,
            list: [],
            erweima: '',
            info: {},//选中的个人得信息
            mobile: '',
            showChong: false,
            infoMsg:{},//个人信息
            rollCheck: true,
            totalPage: 0,
            page: 1,
            stime:'',
            etime: ''
        }
    },
    mounted() {
        // var date = new Date();
        // var year = date.getFullYear();
        // var month = date.getMonth()+1;
        // this.stime = year+"-"+month+"-"+1;
        // this.etime = year+"-"+month+"-"+date.getDate();
        var _this = this;
        this.$http.get("do=info&m=vipcard")
        .then(function(res){
            _this.infoMsg = res;
            //获取队员信息
            _this.init();
        })
        //获取充值记录
        window.addEventListener('scroll', this.handleScroll, true); 
    },
    components:{
        "v-touch": VTouch,
        "date-com": DateRangeCom
    },
    methods:{
        handleScroll    : function(){//滚动监听
            var sT = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;//对象滚动的高度
            var wH = document.documentElement.clientHeight || document.body.clientHeight;//对象滚动的高度
            var bH = document.documentElement.scrollHeight || document.body.scrollHeight;//对象滚动的高度
            if(sT+wH == bH&&this.page<=this.totalPage){
                if(!this.rollCheck) return false;
                this.rollCheck = !this.rollCheck;
                this.initRecord()
            }  
        },
        init(){//数据初始化
            var _this = this;
            this.$http.get("do=team_data&m=vipcard")
            .then(function(res){
                _this.list = res.list;
                _this.erweima = res
            })
        },
        check: function(){
            this.bol = !this.bol
        },
        checkTab: function(item){
            if(item.id == 2){
                this.$router.push("/shopQrcode/vip")
            }else if(item.id==3){
                this.initRecord();
            }
            this.status = item.id;
        },
        initRecord(){
            var _this = this;
            this.$http.get("do=team_recharge_log&m=vipcard&bid="+this.infoMsg.id+"&page="+this.page+"&stime="+this.stime+"&etime="+this.etime)
            .then(function(res){
                _this.recordList = res.list;
                _this.totalPage = res.allpage;
                _this.rollCheck = true;
                _this.page++;
            })
        },
        getTime(value){//获取时间
            console.log(value)
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
        },
        settingChong(item){//给队员充值
            this.info = item;
            this.showChong = true;
        },
        saveChong(){//确认给队员充值
            this.showChong = false;
            if(!this.info.money){
                this.$toast({message:"请输入充值金额"});
                return false;
            }
            var _this = this;
            this.$http.get("do=team_recharge&m=vipcard&bid="+this.info.bid+"&money="+this.info.money)
            .then(function(res){
                _this.$toast({message:"充值成功"});
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
        goUrl(url){
            this.$router.push(url)
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/css/style';
    .tab{
        width: 100%;
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2;
    }
    .tab>div{
        display: inline-block;
        width: 33.3%;
        text-align: center;
        padding: .3rem 0;
        box-sizing: border-box;
        font-size: .3rem;
    }
    .tab .active{
        color: #DC3E56;
        border-bottom: 1px solid #DC3E56;
    }
    .team-center-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        padding-top: 1.2rem;
    }
    .team-top{
        width: 100%;
        height: .96rem;
        line-height: .96rem;
        padding: 0 .34rem;
        box-sizing: border-box;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: $def-font-size;
    }
    .team-top img{
        width: .6rem;
        height: .6rem;
        vertical-align: middle;
    }
    .team-top .money{
        color: #F1C272;
        width: 64%;
        text-align: center;
    }
    .pay-btn{
        width: 1.2rem;
        height: .48rem;
        line-height: .48rem;
        color: #fff;
        background: red;
        font-size: $def-font-size;
    }

    .chong-list{
        width: 100%;
        margin: .34rem auto;
        background: #fff;
        height: .96rem;
        line-height: .96rem;
        padding: 0 .34rem;
        box-sizing: border-box;
        position: relative;
        font-size: $def-font-size;
    }
    .chong-list img{
        position: absolute;
        right: .34rem;
        top: 50%;
        margin-top: -.15rem;
    }
    .right-icon{
        width: .2rem;
    }
    .add-icon{
        width: .36rem;
    }
    .people-list{
        width: 100%;
        background: #F7F7F7;
    }
    .people-list .list{
        width: 100%;
        height: 1.2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #DEDEDE;
        position: relative;
        img{
            width: 1rem;
            border-radius: 50%;
        }
        .list-inner{
            width: 100%;
            height: 1.2rem;
            padding: .1rem 0 .1rem .34rem;
            box-sizing: border-box;
            text-align: left;
            >*{
                vertical-align:middle;
            }
        }
    }
    .add-people{
        margin-top: .2rem;
    }
    .add-people .chong-list{
        margin: 0;
    }
    input[type=radio]{
        display: inline-block;
        width: .3rem;
        height: .3rem;
        border-radius: 50%;
        border:1px solid #DEDEDE;
        padding: 0;
        min-height: auto;
        vertical-align: middle;
        margin-right: .2rem;
    }
    input[type=radio]{
        display: inline-block;
        width: .3rem;
        height: .3rem;
        border-radius: 50%;
        border:1px solid #DEDEDE;
        padding: 0;
        min-height: auto;
        vertical-align: middle;
        margin-right: .2rem;
    }
    input[type=radio]:checked{
        width: .3rem;
        height: .3rem;
        background: url("../../assets/images/weixin-right-icon.png") no-repeat;
        background-size: 100%;
    }
    .del-btn{
        width: 1rem;
        background: transparent;
        border: 1px solid #8789C2;
        border-radius: 4px;
        height: .48rem;
        /* line-height: .48rem; */
        font-size: 0.24rem;
        color: #8789C2;
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -.24rem;
    }

    .simall-money{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        height: .96rem;
        line-height: .96rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;  
        background: #F7F7F7;
    }
    .simall-money input[type=text]{
        width: 46%;
        height: .6rem;
        border: 1px solid #DEDEDE;
        border-radius: 4px;
        margin: 0 .6rem 0 .2rem;
    }


    .another-chong-wrap{
        width: 100%;
        background: #F7F7F7;
    }
    .another-chong-wrap .title{
        width: 100%;
        height: .96rem;
        line-height: .96rem;
        font-size: $def-font-size;
        background: #fff;
        margin-top: .34rem;
        padding-left: .34rem;
        box-sizing: border-box;
    }
    .set-w10{
        width: 10%;
    }
    .set-w12{
        width: 11%;
    }
    .set-w22{
        width: 30%;
    }
    .table-header{
        width: 100%;
        padding: .2rem .34rem .1rem;
        box-sizing: border-box;
    }
    .table-header>div{
        display: inline-block;
        text-align: center;
        vertical-align: top;
    }
    .table-con{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
    }
    .another-chong-wrap .list:first-child{
        border-top: 1px solid #DEDEDE;
    }
    .another-chong-wrap .list{
        height: 1rem;
        border-bottom: 1px solid #DEDEDE;
        padding:.2rem 0;
    }
    .list div{
        display: inline-block;
        text-align: center;
        vertical-align: middle;
    }
    .header-icon{
        width: .52rem;
        height: .52rem;
        border-radius: 100px;
        vertical-align: middle;
    }
    .phone{
        // padding: 0 .5rem;
        box-sizing: border-box;
        vertical-align: middle;
    }
    .table-con input[type=text]{
        width: 15%;
        height: .48rem;
        display: inline-block;
        border: 1px solid #DEDEDE;
        border-radius: 4px;
        vertical-align: middle;
    }
    .list .btn-wrap{
        text-align: right;
    }
    .list .pay-btn{
        display: inline-block;
        vertical-align: middle;
    }

    ul.record-list{
        width: 100%;
        height: 100%;
        li{
            width: 100%;
            padding: .2rem;
            box-sizing: border-box;
            background: #fff;
            border-bottom: #efefef;
            position: relative;
            >div{
                display: inline-block;
                text-align: left;
                vertical-align: middle;
            }
            .blue-color{
                text-align: right;
                position: absolute;
                right: .2rem;
                top: .2rem;
            }
            .gray-color{
                margin-top: .2rem;
                font-size: .22rem;
                text-align: left!important;
            }
            .header-wrap{
                width: 1rem;
                margin-right: .1rem;
            }
            .header-icon{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
        }
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
            .tip{
                margin-bottom: .2rem;
                font-size: .22rem;
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
    .date-wrap{
        position: relative;
        height: .96rem;
        .date-icon{
            width: .6rem;
            position: absolute;
            top: 50%;
            right: 10%;
            margin-top: -.3rem;
        }
    }
</style>