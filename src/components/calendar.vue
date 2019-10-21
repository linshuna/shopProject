<template>
    <div class='wrap'>
        <div>
            <div class='date-show'>
                <img src='../assets/images/last-month.png' class='lt-arrow' @click='lastMonth'/>
                <div class='date-title'>{{year}}年{{month}}月</div>
                <img src='../assets/images/next-month.png' class='rt-arrow' @click='nextMonth'/>
            </div>
        </div>
        <div class='header'>
            <span v-for='(item,index) in date' class='{"weekMark": (index == todayIndex) && isTodayWeek}'>
                {{item}}
            </span>
        </div>
        <div class='date-box'>
            <div v-for='item in dateArr' :class='{"checked-date": checkedDate==item.isToday,"nowDay": isToday == item.isToday}' 
                @click='checkDate(item)'>			
                <div class='date-head'>
                    <div>{{item.dateNum}}</div>
                    <p class="ring-wrap" v-if="item.sign==1"><span class="ring"></span></p>
                </div>
                
                <!-- <view class='date-weight'>{{item.weight}}</view> -->
            </div>
        </div>
    </div>

</template>
<script>
export default {
    props:{
        signList: {typeof: Object,default: {}}
    },
    data(){
        return {
            year: 0,
            month: 0,
            // date: ['日', '一', '二', '三', '四', '五', '六'],
            date: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            dateArr: [],
            isToday: 0,
            isTodayWeek: false,
            todayIndex: 0,
            checkedDate: '',//选中的日期
            list: {}
        }
    },
    watch: {
        signList:{
            handler(newVal,oldVal){
                if(newVal.length==0) return;
                this.list = newVal;
                this.dateInit();
                var dateArr = this.dateArr;
                var signArr = this.signList.day;
                if(this.signList.year == this.year&&this.signList.month==this.month){
                    dateArr.forEach(ele =>{
                        if(ele.day==undefined) return;
                        var filters = signArr.filter(fEle =>{
                            return ele.day == fEle.day;
                        })
                        ele.sign = filters.length>0?filters[0].sign:0;
                    })
                    this.dateArr = dateArr; 
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.$nextTick(function(){
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            this.dateInit();
            this.year = year;
            this.month = month;
            this.isToday = '' + year + month + now.getDate();

        })
    },
    methods: {
        dateInit: function (setYear, setMonth) {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let dateArr = [];						//需要遍历的日历数组数据
            let arrLen = 0;							//dateArr的数组长度
            let now = setYear ? new Date(setYear, setMonth) : new Date();
            let year = setYear || now.getFullYear();
            let nextYear = 0;
            let month = setMonth || now.getMonth();					//没有+1方便后面计算当月总天数
            let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
            let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay();							//目标月1号对应的星期
            let dayNums = new Date(year, nextMonth, 0).getDate();				//获取目标月有多少天
            let obj = {};
            let num = 0;

            if (month + 1 > 11) {
                nextYear = year + 1;
                dayNums = new Date(nextYear, nextMonth, 0).getDate();
            }
            arrLen = startWeek + dayNums;
            for (let i = 0; i < arrLen; i++) {
                if (i >= startWeek) {
                num = i - startWeek + 1;
                obj = {
                    isToday: '' + year + (month + 1) + num,
                    dateNum: num,
                    year: year,
                    month: month+1,
                    day: num
                    // weight: 5
                }
                } else {
                obj = {};
                }
                dateArr[i] = obj;
            }
            this.dateArr = dateArr;
            let nowDate = new Date();
            let nowYear = nowDate.getFullYear();
            let nowMonth = nowDate.getMonth() + 1;
            let nowWeek = nowDate.getDay();
            let getYear = setYear || nowYear;
            let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

            if (nowYear == getYear && nowMonth == getMonth) {
                this.isTodayWeek = true;
                this.todayIndex = nowWeek;
            } else {
                this.isTodayWeek = false;
                this.todayIndex = -1
            }
        },
        lastMonth: function () {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let year = this.month - 2 < 0 ? this.year - 1 : this.year;
            let month = this.month - 2 < 0 ? 11 : this.month - 2;
            this.year = year;
            this.month = month+1;
            this.dateInit(year, month);
        },
        nextMonth: function () {
            //全部时间的月份都是按0~11基准，显示月份才+1
            let year = this.month > 11 ? this.year + 1 : this.year;
            let month = this.month > 11 ? 0 : this.month;
            this.year = year;
            this.month = month+1;
            this.dateInit(year, month);
        },
        checkDate: function(item){
            this.checkedDate = item.isToday
            this.$emit("checkOneDate",item)
        }
    },
}
</script>   
<style lang="scss" scoped>
    .date-show{
        position: relative;
        width: 100%;
        font-family: PingFang-SC-Regular;
        font-size: .3rem;
        color: #282828;
        text-align: center;
        padding: 0 .2rem;
        box-sizing: border-box;
        margin: .34rem auto .2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .date-show view.date-title{
        width: 80%;
        text-align: center;
    }
    .lt-arrow,.rt-arrow{
        width: .14rem;
        height: .28rem;
    }
    .lt-arrow img,.rt-arrow img{
        width: 100%;
        height: 100%;
    }

    .header{
        font-size: 0;
        /* padding: 0 24rpx; */
    }
    .header>span{
        display: inline-block;
        width: 14.285%;
        color: gray;
        font-size: .3rem;
        text-align: center;
        /* border-bottom: 1px solid #D0D0D0; */
        padding: .2rem 0;
    }
    .weekMark{
        position: relative;
    }
    .weekMark view{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        /* border-bottom: 1px solid #22A7F6; */
    }
    .date-box{
        font-size: 0;
        padding: .1rem 0;
    }
    .date-box>div{
        position: relative;
        display: inline-block;
        width: 14.285%;
        color: #020202;
        font-size: .4rem;
        text-align: center;
        vertical-align: middle;
        margin: .15rem 0;
    }
    .date-head{
        width: .48rem;
        height: .48rem;
        line-height: .48rem;
        border-radius: 50%;
        text-align: center;
        font-size: .26rem;
        margin: 0 auto;
    }
    .checked-date .date-head{
        color: red;
        background: #f97e7e;
    }
    .nowDay .date-head{
        color: #fff;
        background-color: red;
    }
    .ring-wrap{
        text-align: center;
        margin-top: -.2rem;
    }
    .ring{
        display: inline-block;
        width: .1rem;
        height: .1rem;
        background: #00c800;
        border-radius: 100px;
    }
    .date-weight{
        font-size: .22rem;
        padding: .15rem 0;
    }
    .nowDay .date-weight{
        color: #22A7F6;
    }
    .one{
        position: absolute;
        bottom: 0;
        right: .5rem;
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        background-color: red;
    }
    .two{
        position: absolute;
        bottom: .3rem;
        right: .05rem;
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        background-color: blue;
    }    
</style>