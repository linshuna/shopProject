<template>
    <div class='select_box'>
        <div class='select' @click='selectTap'>
            <span class='select_text'>{{selectData&&selectData[index].name?selectData[index].name:selectData[index]}}</span>
            <img class='select_img' :class="{'select_img_rotate': selectShow}" 
                src='../assets/images/square-icon.png'  
                background-size="contain"/> 
        </div>
        <div class='option_box' v-show="selectShow">
            <span class='option' v-for='(item,index) in selectData' @click='optionTap(index,item)'>{{item.name?item.name:item}}</span>
        </div>
    </div>

</template>
<script>
export default {
    props:{
        selectType:{
            type: String,
            default: ''
        },
        selectData:{
            type: Array,
            default: []
        },
    },
    data(){
        return{
            selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示 
            index: 0,//选择的下拉列表下标
            list: []
        }
    },
    mounted(){
        this.$nextTick(function(){
            var data = this.selectData;
            data.forEach(ele => {
                ele.check = false;
            })
            this.list = data;
        })
    },
    methods: {
        // 点击下拉显示框
        selectTap() {
            this.selectShow = !this.selectShow;
        },
        // 点击下拉列表
        optionTap(_index,item) {
            this.index = _index;
            this.selectShow = !this.selectShow;

            this.$emit('checkedSelect', { _type: this.selectType,idx: _index,value: item})
        }
    }
}
</script>
<style lang="scss" scoped>
    @import "../assets/css/style";
    .select_box{
        display: inline-block;
        width: 1.8rem;
        height: .54rem;
        border-radius: 100px;
        position: relative;
        background: #2c90ee;
        color: #fff;
        text-align: center;
    }
    .select_box .select{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0 .16rem;
    }
    .select_box .select .select_text{
        font-size: $font-26;
        color: #fff;
        line-height: .28rem;
        flex: 1;
    }
    .select_box .select .select_img{
        width: .2rem;
        height: .2rem;
        display: block;
        transition:transform 0.3s;
    }
    .select_box .select .select_img_rotate{
        transform:rotate(180deg); 
    }
    .select_box .option_box{
        position: absolute;
        top: calc(100% - 1px);
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        background: #fff;
        transition: height 0.3s;
        border-left:1px solid #efefef;
        border-right:1px solid #efefef;
    }
    .select_box .option_box .option{
        display: block;
        line-height: .3rem; 
        font-size: $font-26;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        padding: .1rem;
        color: #777777;
    }
</style>