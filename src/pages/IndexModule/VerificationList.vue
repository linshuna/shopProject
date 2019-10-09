<template>
    <div>
        <div class="date-wrap">
            <date-com :date="dateStr" @listenToChild="getTime"></date-com>
            <img src="../../assets/images/store/date-icon.png" class="date-icon"/>
        </div>
        <div class="shop-inner">
            <p class="title">
                <span>***店员</span>
                <span>***商户</span>
            </p>
            <ul>
                <li v-for="item in list">
                    <div>
                        <p>{{item.nickname}}</p>
                        <p class="gray-color">{{item.used_time}}</p>
                    </div>
                    <span>{{item.goods_name}}</span>
                    <span class="blue-color">{{item.price}}</span>
                </li>
            </ul>
            <p class="gray-color no-data-tip" v-show="!list||list.length==0">暂无核销记录</p>
        </div>
    </div>
</template>
<script>
import DateCom from "@/components/dateCom"
export default {
    data(){
        return{
            date: '',
            dateStr: '',
            list: ''
        }
    },
    components:{
        "date-com": DateCom
    },
    mounted(){
        this.id = this.$route.params.id;
        var date = new Date()
        this.dateStr = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        this.date = this.dateStr
        this.init()
    },    
    methods: {
        init(){
            var _this = this;
            this.$http.get("do=get_used_order_list&m=vipcard&ddate="+this.date+"&adminid="+this.id)
            .then(function(res){
                _this.list = res;
            })
        },
        goExport(){
            window.location.href = this.info.export_url
        },
        getTime(value){//获取时间
            this.date = value.date;
            this.dateStr = value.dateStr;
            this.init()
        }
    }
}
</script>
<style lang="scss" scoped>
    .gray-color{
        color: gray;
    }
    .blue-color{
        color: skyblue;
    }
    .no-data-tip{
        text-align: center;
        padding: .2rem 0;
    }
    .title{
        width: 100%;
        height: .72rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        display:flex;
        align-items: center;
        justify-content: space-between;
        background: #FAFAFA;
        border-top: 1px solid #F0F0F0;
        border-bottom: 1px solid #F0F0F0;
    }
    ul{
        li{
            display: flex;
            width: 100%;
            padding: .2rem;
            box-sizing: border-box;
            background: #fff;
            >*{
                flex: 1;
                text-align: center;
            }
            >div{
                text-align: left;
            }
            .blue-color{
                text-align: right;
            }
            .gray-color{
                margin-top: .2rem;
            }
        }
        li:nth-child(2n){
            background: #F5FAFE;
        }
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