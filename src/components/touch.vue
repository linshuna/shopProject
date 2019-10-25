<template>
<div class="delete">
    <div class="slider">
        <div class="content" 
            @touchstart='touchStart'
            @touchmove='touchMove'
            @touchend='touchEnd'
            :style="deleteSlider">
            <!-- 插槽中放具体项目中需要内容     -->  
            <slot></slot>
            <div class="remove-wrap" ref='remove'>
                <!--默认-->
                <template v-if="type == ''">
                    <span @click.stop="handleChongClick" class="yellow-bg">充值</span>
                    <span @click.stop="handleRecordClick" class="setting-bg">消费记录</span>
                    <span @click.stop="handlesettingClick" class="green-bg">设置</span>
                    <span @click.stop="handleDelClick" class="blue-bg">删除</span>
                </template>
            </div>
            
        </div>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
 export default {
    props:{
        type:{
            type: String,
            default: ''
        },
        propE: {
            type: Object,
            default: function () {}
        }
    },
    data() {
        return {
            startX:0,  //触摸位置
            endX:0,   //结束位置
            moveX: 0,  //滑动时的位置
            disX: 0,  //移动距离
            deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
        }
    },
    methods:{
        handleChongClick (v) {
            this.$emit('chong-event')
            this.deleteSlider = "transform:translateX(0px)";
        },
        handleRecordClick(v) {
            this.$emit('record-event')
            this.deleteSlider = "transform:translateX(0px)";
        },
        handlesettingClick (v) {
            this.$emit('setting-event')
            this.deleteSlider = "transform:translateX(0px)";
        },
        handleDelClick (v) {
            this.$emit('del-event')
            this.deleteSlider = "transform:translateX(0px)";
        },
        touchStart(ev){
            ev= ev || event
            //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if(ev.touches.length == 1){
                // 记录开始位置
                this.startX = ev.touches[0].clientX;
            }
        },
        touchMove(ev){
            ev = ev || event;
            //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
            let wd=this.$refs.remove.offsetWidth;
            if(ev.touches.length == 1) {
                // 滑动时距离浏览器左侧实时距离
                this.moveX = ev.touches[0].clientX
                //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                this.disX = this.startX - this.moveX;
                // 如果是向右滑动或者不滑动，不改变滑块的位置
                if(this.disX < 0 || this.disX == 0) {
                    this.deleteSlider = "transform:translateX(0px)";
                // 大于0，表示左滑了，此时滑块开始滑动 
                }else if (this.disX > 0) {
                    //具体滑动距离我取的是 手指偏移距离*5。
                    this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
                    
                    // 最大也只能等于删除按钮宽度 
                    if (this.disX*5 >=wd) {
                    this.deleteSlider = "transform:translateX(-" +wd+ "px)";
                    
                    }
                }
            }
        },
        touchEnd(ev){
            ev = ev || event;
            let wd=this.$refs.remove.offsetWidth;
            if (ev.changedTouches.length == 1) {
                let endX = ev.changedTouches[0].clientX;
                this.disX = this.startX - endX;
                //如果距离小于删除按钮一半,强行回到起点
                if ((this.disX*5) < (wd/2)) {
                    this.deleteSlider = "transform:translateX(0px);";
                }else{//大于一半 滑动到最大值
                    this.deleteSlider = "transform:translateX(-"+wd+ "px);";
                }
            }
        }   
    }
}
</script>
<style scoped lang="scss" scoped>
    @import "../assets/css/style";
    .delete{
        width: 100%;
    }
    .slider{
        width: 100%;
        height: 1rem;
        position: relative;
        user-select: none;
        .content{
            position: absolute;
            left: 0;
            right: -3.6rem;
            top: 0;
            bottom: 0;
            z-index: 2;
            //  设置过渡动画
            transition: 0.3s;
            text-align: left;
        }
        .remove-wrap{
            position: absolute;
            // width: 100%;
            width: 3.6rem;
            height: 1.2rem;
            right: 0;
            top: 0;
            z-index: 2;
            color: #fff;
            line-height: 1.2rem;
            // padding-right: .2rem;
            font-size: 0;
            box-sizing: border-box;
            text-align: right;
            img{
                width: .3rem;
            }
            .set-padding-l{
                padding-right: .2rem;
            }
            .save-icon{
                width: .38rem;
            }
            .reject-icon{
                width: .4rem;
            }
            >span{
                display: inline-block;
                // min-width: .5rem;
                width: 22%;
                height: 100%;
                color: $white;
                font-size: .24rem;
                text-align: center;
            }
            .setting-bg{
                width: 30%;
                background: #333;
            }
            .green-bg{
                background: #00c800;
            }
            .yellow-bg{
                background: yellow;
            }
            .red-bg{
                background: red;
            }
            .blue-bg{
                background: skyblue;
            }
            .del-bg{
                background: $gray-bd;
                color: $white;
            }
        }
    }
 
</style>