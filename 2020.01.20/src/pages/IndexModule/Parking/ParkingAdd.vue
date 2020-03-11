<template>
    <div class='add-car-wrap'>
        <div class='carno-inner'>
            <div class='title'>请输入您的车牌</div>
            <div @click='LicensePlateNumber' class='LicensePlateNumber'>
                <div class='square' v-for="item in carnoArr">{{item}}</div>
                <div class='dotted'>
                    <div class='add-carno'><img src='../../../assets/images/add-carno.png'/></div>
                    <div class='font-20'>新能源</div>
                </div>
            </div>
            <car-com :licensePlateShowHidden.sync="licensePlateShowHidden"
                :provincesBox.sync="provincesBox"
                :letterBox.sync="letterBox"
                :digitalBox.sync="digitalBox"
                @LicensePlateNumber="getCarno"></car-com>
        </div>
        <div class='btn-wrap'>
            <button @click='goCarList'>确定</button>
        </div>
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
                this.digitalBox = false;
            }
        },
        goCarList(){
            this.$router.push("/parkingList/"+this.carno)
        }
    },
}
</script>
<style lang="scss" scoped>
    .add-car-wrap{
        padding-top: .6rem;
    }
    /* 车牌样式 */
    .carno-inner .title{
        margin-bottom: .4rem;
        text-align: center;
        font-size: .28rem;
        letter-spacing: 6px;
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
        width: .72rem;
        height: .72rem;
        line-height: .72rem;
        border: 1px solid gray;
        border-right: none;
        vertical-align: middle;
        text-align: center;
    }
    .square:nth-child(2){
        margin-right: .2rem;
        border-right: 1px solid gray;
    }
    .square:nth-child(8){
    border-right: 1px solid gray;
    }
    .dotted{
        width: .86rem;
        height: .86rem;
        line-height: .86rem;
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

    .btn-wrap{
        width: 100%;
        position: absolute;
        bottom: 2.6rem;
        left: 0;
    }
    .btn-wrap button{
        display: block;
        width: 70%;
        height: .8rem;
        line-height: .8rem;
        background: red;
        color: #fff;
        font-size: .28rem;
        border-radius: 100px;
        margin: 0 auto;
    }
</style>