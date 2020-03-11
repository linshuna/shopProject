<template>
    <div>
        <div class="showTime">
            <span @click="selectData">{{stime | formatDate}}</span> - 
            <span @click="selectEndData">{{etime | formatDate}}</span>
        </div>
        <div  @touchmove.prevent>
            <mt-datetime-picker 
                lockScroll="true" 
                ref="datePicker"
                v-model="sdateVal" 
                type="date"               
                year-format="{value} 年"  
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="setStartDate"
                :endDate="endDate"
                @confirm="handleConfirm()"></mt-datetime-picker>
            <mt-datetime-picker 
                lockScroll="true" 
                ref="eDatePicker"
                v-model="edateVal" 
                type="date"               
                year-format="{value} 年"  
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate"
                :endDate="setEndDate"
                @confirm="ehandleConfirm()"></mt-datetime-picker>
        </div>
    </div>
</template>
<script>
import { DatetimePicker } from 'mint-ui';
import { formatDate } from '@/utils/date.js';
export default {
    filters: {
        formatDate(time,type=0){
            var date = '';
            if(typeof time=='string'&&time!=''&&time.indexOf("-")>-1){
                time = time.split("-").join("/")
                date = new Date(time);
            }else{
                date = time;
            }
            return formatDate(date,type)
        }
    },
    props:["date","eDate"],  //接受父组件中请求json得到的日期值
    data(){
        var newDate = new Date();
        var year = newDate.getFullYear();
        var month = newDate.getMonth()+1;
        return{
            setStartDate: new Date(year-1,0,1),//设置固定的开始时间
            setEndDate: new Date(year+1,0,1),//设置固定的结束时间
            sdateVal: '',
            edateVal: '',
            selectedValue: this.date,
            selectedEData: this.eDate,
            startDate: new Date(year-1,0,1),
            endDate: newDate,
            stime: this.date,
            etime: this.eDate
        }
    },
    mounted() {

    },
    methods:{
    //打开时间选择器
        selectData() { 
        //如果已经选过日期，则再次打开时间选择器时，日期回显
            if(this.selectedValue){
                this.sdateVal = this.selectedValue
            }else{
                this.sdateVal = this.date
            }
            this.$refs['datePicker'].open()
        },
        selectEndData(){
            if(this.selectedEData){
                this.edateVal = this.selectedEData
            }else{
                this.edateVal = this.eDate
            }
            this.$refs['eDatePicker'].open()
        },
        handleConfirm(){   //时间选择器点击确定触发confirm方法 
            this.selectedValue = this.sdateVal;            
            var te = this.$options.filters['formatDate'];
            //调用本地过滤器
            var date = te(this.sdateVal,1);
            this.stime = date;
            this.startDate = new Date(date.split("-").join("/"));
            this.$emit("stime-event",date)
        },
        ehandleConfirm(){
            var te = this.$options.filters['formatDate'];
            var date = te(this.edateVal,1);
            this.etime = date;
            this.endDate = new Date(date.split("-").join("/"));
            this.$emit("etime-event",date)
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