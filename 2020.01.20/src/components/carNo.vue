<template>
    <div class='page wrapper' v-show='!licensePlateShowHidden'>
        <div class='licensePlateShow'>
            <!-- 遮罩层 -->
            <div class='licensePlate_Bg' @click='licensePlate_close'>
            </div>

            <!-- 省份 -->
            <div class='licensePlate_provinces_Box' v-show='!provincesBox'>
                <div class='licensePlate_provincesTist' v-for='item in licensePlate_provinces' @click='get_licensePlate_provinces(item)'>{{item}}</div>
                <div class='licensePlate_but' @click='licensePlate_close'>关闭</div>
            </div>

            <!-- 字母 -->
            <div class='licensePlate_letter_Box' v-show='!letterBox'>
                <div class='licensePlate_letterTist' v-for='item in licensePlate_letter' @click='get_licensePlate_letter(item)'>{{item}}</div>
                <div class='licensePlate_letterTist_but'>
                    <div class='licensePlate_but'  @click='licensePlate_switchDigital'>数字</div>
                    <div class='licensePlate_but'  @click='licensePlate_delete'>删除</div>
                    <div class='licensePlate_but'  @click='licensePlate_empty'>清空</div>
                    <div class='licensePlate_but'  @click='licensePlate_close'>关闭</div>
                </div>
            </div>

            <!-- 数字 -->
            <div class='licensePlate_digital_Box' v-show='!digitalBox'>
                <div class='licensePlate_digitalTist' v-for='item in licensePlate_digital' @click='get_licensePlate_digital(item)'>{{item}}</div>
                <div class='licensePlate_digital_but'>
                    <div class='licensePlate_but' @click='licensePlate_switchLetter'>字母</div>
                    <div class='licensePlate_but' @click='licensePlate_delete'>删除</div>
                    <div class='licensePlate_but' @click='licensePlate_empty'>清空</div>
                    <div class='licensePlate_but' @click='licensePlate_close'>关闭</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        licensePlateShowHidden:{
            type: Boolean,
            default: true
        },
        provincesBox: {
            type: Boolean,
            default: true
        },
        letterBox:{
            type: Boolean,
            default: true
        },
        digitalBox:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            licensePlate_provinces: [
                "京", "沪", "浙", "苏", "粤", "鲁",
                "晋", "冀", "豫", "川", "渝", "辽",
                "吉", "黑", "皖", "鄂", "津", "贵",
                "云", "桂", "琼", "青", "新", "藏",
                "蒙", "宁", "甘", "陕", "闽", "赣",
                "湘"
            ],
            licensePlate_letter: [
                "A", "B", "C", "D", "E", "F",
                "G", "H", "L", "J", "K", "L",
                "M", "N", "O", "P", "Q", "R",
                "S", "T", "U", "V", "W", "X",
                "Y", "Z"
            ],
            licensePlate_digital: [
                "1", "2", "3",
                "4", "5", "6",
                "7", "8", "9",
                "0"
            ],
            LicensePlateNumber: '',
        }
    },
    methods: {
        // 显示模拟键盘
        getLicensePlateNumber: function () {
            var that = this;
            var LicensePlateNumber = this.LicensePlateNumber;
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

        // 切换成字母
        licensePlate_switchLetter: function () {
            this.$emit("update:provincesBox",true)
            this.$emit("update:letterBox",false)
            this.$emit("update:digitalBox",true)
        },

        // 切换成数字
        licensePlate_switchDigital: function () {
            var LicensePlateNumber = this.LicensePlateNumber;
            var LicensePlateNumberLen = LicensePlateNumber.length;
            if (LicensePlateNumberLen == 1) {
                this.$message('车牌号码第二位必须是字母')
            } else {
                this.$emit("update:provincesBox",true)
                this.$emit("update:letterBox",true)
                this.$emit("update:digitalBox",false)
            }
        },


        // 删除
        licensePlate_delete: function (e) {
            var LicensePlateNumber = this.LicensePlateNumber;
            var LicensePlateNumberLen = LicensePlateNumber.length;
            var LicensePlateNumberDelete = LicensePlateNumber.split('');
            var NewLicensePlateNumber = LicensePlateNumberDelete.join('').slice(0, -1)
            if (LicensePlateNumberDelete.slice(0, -1).length == 1) {
                this.$emit("update:provincesBox",true)
                this.$emit("update:letterBox",false)
                this.$emit("update:digitalBox",true)
            } else if (LicensePlateNumberLen == 0 || LicensePlateNumber == '' || LicensePlateNumberDelete.slice(0, -1).length == 0) {
                this.$emit("update:provincesBox",false)
                this.$emit("update:letterBox",true)
                this.$emit("update:digitalBox",true)
            }
            this.LicensePlateNumber = NewLicensePlateNumber
            this.$emit("LicensePlateNumber", { carno: NewLicensePlateNumber })
        },

        // 清空
        licensePlate_empty: function (e) {
            this.LicensePlateNumber = ''
            this.$emit("update:provincesBox",false)
            this.$emit("update:letterBox",true)
            this.$emit("update:digitalBox",true)
            this.$emit("LicensePlateNumber", { carno: '' })
        },

        // 关闭模拟键盘
        licensePlate_close: function () {
            this.$emit("update:licensePlateShowHidden",true)
        },

        // 点击获取省份
        get_licensePlate_provinces: function (item) {
            var carno = item;
            this.LicensePlateNumber = item;
            this.$emit("update:provincesBox",true)
            this.$emit("update:letterBox",false)
            this.$emit("update:digitalBox",true)
            this.$emit("LicensePlateNumber", { carno: carno})
        },

        // 点击获取字母
        get_licensePlate_letter: function (item) {
            var LicensePlateNumber = this.LicensePlateNumber;
            var LicensePlateNumberLen = LicensePlateNumber.length;
            if (LicensePlateNumberLen != 8) {
                this.LicensePlateNumber = LicensePlateNumber + item
                var carno = LicensePlateNumber + item
                this.$emit("LicensePlateNumber", { carno: carno })
            } else {
                this.$message({
                    title: '车牌号码最多不能超过8位',
                    icon: 'none',
                    duration: 1500,
                })
            }
        },

        // 点击获取数字
        get_licensePlate_digital: function (item) {
            var LicensePlateNumber = this.LicensePlateNumber;
            var LicensePlateNumberLen = LicensePlateNumber.length;
            if (LicensePlateNumberLen != 8) {
                this.LicensePlateNumber = LicensePlateNumber + item
                var carno = LicensePlateNumber + item
                this.$emit("LicensePlateNumber", { carno: carno })
            } else {
                this.$message({
                    title: '车牌号码最多不能超过8位',
                    icon: 'none',
                    duration: 1500,
                })
            }
        }
  }
}
</script>
<style lang="scss" scoped>
    .wrapper{
        width: 100%; 
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .licensePlateShow{
        width: 100%; 
        height: 100%;
        /* position: absolute;
        bottom: 0; */
    }

    .licensePlate_Bg{
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 40;
        overflow: hidden;
    }

    .licensePlate_provinces_Box{
        width: 100%; 
        background-color: #d0d4da;
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        /* border-top: 1px solid #abb2bd; */
        z-index: 55;
    }

    .licensePlate_provincesTist{
        flex:15%;
        height: 1rem;
        line-height: 1rem;
        margin: 0 auto;
        text-align: center;
        background-color:#ffffff; 
        border-top: 1px solid #abb2bd;
        border-left: 1px solid #abb2bd;
    }

    .licensePlate_provincesTist:nth-child(6n){
        border-right: 1px solid #abb2bd;
    }

    .licensePlate_letter_Box{
        width: 100%; 
        background-color: #d0d4da;
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        /* border-top: 1px solid #abb2bd; */
        z-index: 55;
    }

    .licensePlate_letterTist{
        flex:15%;
        height: 1rem;
        line-height: 1rem;
        margin: 0 auto;
        text-align: center;
        background-color:#ffffff; 
        border-top: 1px solid #abb2bd;
        border-left: 1px solid #abb2bd;
    }

    .licensePlate_letterTist:nth-child(6n){
        border-right: 1px solid #abb2bd;
    } 

    .licensePlate_letterTist:nth-child(26){
        border-right: 1px solid #abb2bd;
    }

    .licensePlate_letterTist_but{
        width: 100%;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .licensePlate_digital_Box{
        width: 100%; 
        background-color: #d0d4da;
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        /* border-top: 1px solid #abb2bd; */
        z-index: 55;
    }

    .licensePlate_digitalTist{
        flex:25%;
        height: 1.25rem;
        line-height: 1.25rem;
        margin: 0 auto;
        text-align: center;
        background-color:#ffffff; 
        border-top: 1px solid #abb2bd;
        border-left: 1px solid #abb2bd;
    }

    .licensePlate_digital_but{
        width: 100%;
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .licensePlate_but{
        flex: 1;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #ffffff;
        background-color:#ff6600; 
        border-top: 1px solid #abb2bd;
        border-left: 1px solid #abb2bd;
    }

    .licensePlate_but:last-child{
        border-right: 1px solid #abb2bd;
    }

    .LicensePlateNumber{
        width: 100%;
        height: 2rem;
        border-bottom: 1rpx solid #abb2bd
    }
</style>