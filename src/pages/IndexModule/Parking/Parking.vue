<template>
<div class='carno-wrap'>
    <div class="carno-main" :style="{'top': !licensePlateShowHidden?'-200px':'0'}">
        <div class='carno-top'>
            <div class='floor-pic'>
            <img src="../../../assets/images/floor-icon.png" />
            </div>
            <div class='title'>杨浦三号湾</div>
        </div>
        <div class='floor-banner'>
            <img src='../../../assets/images/jf-banner.png'/>
        </div>
        <!-- 输入车牌号 -->
        <div class='carno-inner'>
            <div class='title'>请输入您的车牌</div>
            <div @click='LicensePlateNumber' class='LicensePlateNumber'>
                <div class='square' v-for="item in carnoArr">{{item}}</div>
                <div class='dotted'>
                <div class='add-carno'><img src='../../../assets/images/add-carno.png'/></div>
                <div class='font-20'>新能源</div>
                </div>
            </div>
        </div>
        <button class='jifei-btn'>查缴停车费</button>
    </div>
    <bar-footer idx="0" types="car"></bar-footer>

    <car-com :licensePlateShowHidden.sync="licensePlateShowHidden"
        :provincesBox.sync="provincesBox"
        :letterBox.sync="letterBox"
        :digitalBox.sync="digitalBox"
        @LicensePlateNumber="getCarno"></car-com>
</div>
</template>
<script>
import BarFooter from "@/components/footer"
import CarNo from "@/components/carNo"
export default {
    data(){
        return{
            licensePlateShowHidden: true,
            provincesBox: true,
            letterBox: true,
            digitalBox: true,
            carno: '',
            carnoArr: ['', '', '', '', '', '', '', '']
        }
    },
    components:{
        "bar-footer": BarFooter,
        "car-com": CarNo
    },
    mounted() {
        this.$nextTick(function(){
            var carno = localStorage.getItem("defCarno");
            console.log(typeof carno)
            this.carno = carno=='undefined'?'':carno
            this.carnoArr = carno=='undefined'?this.carnoArr:this.carno.split("")
        })
    },
    methods: {
        getCarno(value){
            this.carno = value.carno;
            var carnoArr = value.carno.split("")
            if (carnoArr.length < 8) {
                for (var i = 0, len = 8 - carnoArr.length; i < len; i++) {
                    carnoArr.push('')
                }
            }
            this.carnoArr = carnoArr;
        },
        LicensePlateNumber: function(){
            var LicensePlateNumber = this.carno;
            var LicensePlateNumberLen = LicensePlateNumber.length;

            if (LicensePlateNumberLen == 0) {
                this.licensePlateShowHidden = false;
                this.provincesBox = false;
            } else if (LicensePlateNumberLen == 1) {
                this.licensePlateShowHidden = false;
                this.letterBox = false;
            } else {
                this.licensePlateShowHidden = false;
                this.letterBox = true;
                this.digitalBox = false;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/style';
    .carno-main{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    /* 头部样式 */
    .carno-top{
        width: 100%;
        height: 2.8rem;
        padding: .34rem 0 .4rem;
        box-sizing: border-box;
        background: #E83C30;
        text-align: center;
        color: #fff;
        font-size: $font-30;
    }
    .floor-pic{
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
    }
    .floor-pic img{
        width: 100%;
        height: 100%;
    }
    .carno-top .title{
        margin-top: .3rem;
    }
    .floor-banner{
        width: 100%;
        height: 1.86rem;
        margin-bottom: .34rem;
        padding: 0 .2rem;
        box-sizing: border-box;
    }
    .floor-banner img{
        width: 100%;
        height: 100%;
    }
    /* 车牌样式 */
    .carno-inner .title{
        margin-bottom: .4rem;
        text-align: center;
        font-size: $def-font-size;
        letter-spacing: .06rem;
        color: #CC444B;
    }
    .LicensePlateNumber{
        margin: .2rem auto;
        position: relative;
        z-index: 10;
        text-align: center;
    }
    .square,.dotted{
        display: inline-block;
        width: .86rem;
        height: .86rem;
        line-height: .86rem;
        border: 1px solid gray;
        border-right: none;
        vertical-align: middle;
        text-align: center;
    }
    .square{
        width: .72rem;
        height: .72rem;
        line-height: .72rem;
    }
    .square:nth-child(2){
        margin-right: .2rem;
        border-right: 1px solid gray;
    }
    .square:nth-child(8){
        border-right: 1px solid gray;
    }
    .dotted{
        border:1px dotted gray;
        margin-left: .2rem;
        text-align: center;
        line-height: .24rem;
        padding: .1rem 0;
        box-sizing: border-box;
    }
    .add-carno{
        display: inline-block;
        width: .26rem;
        height: .26rem;
        margin-bottom: .06rem;
    }
    .add-carno img{
        width: 100%;
        height: 100%;
    }

    /* 缴费按钮 */
    .jifei-btn{
        display: block;
        width: 70%;
        height: .8rem;
        line-height: .8rem;
        color: #fff;
        font-size: 0.28rem;
        background: #FE0000;
        border-radius: 100px;
        margin: 0 auto;
        margin-top: .6rem;
    }


</style>