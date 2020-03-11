<template>
    <div class="main-con">
        <div class="date-wrap">
            <date-com :date="dateStr" @listenToChild="getTime"></date-com>
            <img src="../../assets/images/store/date-icon.png" class="date-icon"/>
        </div>
        <div class="shop-inner">
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
            list: [],
            check: true,
            page: 1,
            totalPage: 0,
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
        this.init();
        window.addEventListener('scroll', this.handleScroll, true); 
    },    
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll    : function(){//滚动监听
            var sT = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;//对象滚动的高度
            var wH = document.documentElement.clientHeight || document.body.clientHeight;//对象滚动的高度
            var bH = document.documentElement.scrollHeight || document.body.scrollHeight;//对象滚动的高度
            if(sT+wH == bH&&this.page<=this.totalPage){
                if(!this.check) return false;
                this.check = !this.check;
                this.init()
            }  
        },
        init(){
            var _this = this;
            this.$http.get("do=get_used_order_list&m=vipcard&ddate="+this.date+"&adminid="+this.id+"&page="+this.page)
            .then(function(res){
                _this.list = _this.list.concat(res.list);
                _this.totalPage = res.allpage;
                _this.check = true;
                _this.page++;
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
            width: .46rem;
            position: absolute;
            top: 50%;
            right: 10%;
            margin-top: -.26rem;
        }
    }
    
</style>