<template>
    <div>
        <div class="showTime"><p @click="selectData">{{this.date | formatDate}}</p></div>
        <div  @touchmove.prevent>
            <mt-datetime-picker 
                lockScroll="true" 
                ref="datePicker"
                v-model="dateVal" 
                type="date"               
                year-format="{value} 年"  
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm()"></mt-datetime-picker>
        </div>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import { formatDate } from '@/utils/date.js';
export default {
    filters: {
        formatDate(time,type=0){
            if(typeof time=='string'&&time!=''&&time.indexOf("-")>-1){
                time = time.split("-").join("/")
            }
            var date = new Date(time);
            return formatDate(date,type)
        }
    },
    props:["date"],  //接受父组件中请求json得到的日期值
    data(){
        return{
            dateVal: '', 
            selectedValue: this.date
        }
    },
    mounted() {
        // this.date
    },
    methods:{
    //打开时间选择器
        selectData() { 
        //如果已经选过日期，则再次打开时间选择器时，日期回显
            if(this.selectedValue){
                this.dateVal = this.selectedValue
            }else{
                this.dateVal = this.date
            }
            this.$refs['datePicker'].open()
        },
        handleConfirm(){   //时间选择器点击确定触发confirm方法 
            this.selectedValue = this.dateVal;            
            var te = this.$options.filters['formatDate'];
            //调用本地过滤器
            var date = te(this.dateVal,1);
            console.log(this.selectedValue)
            this.$emit("listenToChild",{dateStr: this.selectedValue,date: date}) //子组件向父组件传值，选择的时间传到父组件，父组件去请求json中这个时间的文章列表显示在页面上
        }
    }
}

</script>
<style lang="scss" scoped>
    .showTime{
        text-align: center;
        line-height: .96rem;
        position: relative;
        z-index: 2;
    }
</style>