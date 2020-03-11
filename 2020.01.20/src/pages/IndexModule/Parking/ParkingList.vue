<template>
    <div class='parking-list'>
        <div class='parking-top'>
            <span class='red-color'>我的爱车</span>
            <span>1</span>
        </div>
        <div class='car-list-wrap' v-if='carList.length'>
            <div class='car-list'>
                <span>车牌号：{{carList[0]}}</span>
            </div>
        </div>
        <div class='none-car' v-if='carList.length==0'>
            <div class='car-con'>
                <img src='../../../assets/images/car-icon.png'/>
                <div class='tip gray-color'>暂无车辆信息</div>
            </div>
            <div class='btn-wrap'>
                <button @click='goAddCar'>+ 添加爱车</button>
            </div>
        </div>
        <bar-footer types="car" idx="2"></bar-footer>
    </div>

</template>
<script>
import BarFooter from "@/components/footer"
export default {
    data(){
        return{
            carList: []
        }
    },
    components:{
        "bar-footer": BarFooter,
    },
    mounted() {
        this.carList = this.$route.params.bol?[this.$route.params.bol]:[];
        localStorage.setItem('defCarno',this.$route.params.bol);
    },
    methods: {
        goAddCar(){
            this.$router.push("/parkingAdd")
        }
    },
}
</script>
<style lang="scss" scoped>
    .parking-top,.car-list{
        width: 100%;
        height: .96rem;
        line-height: .96rem;
        padding: 0 .34rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
    }
    .car-list{
        margin-top: .2rem;
    }
    .car-list-wrap{
        padding-bottom: 1rem;
    }
    /* 暂无车辆 */
    .none-car{
        width: 100%;
        text-align: center; 
    }
    .car-con{
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
        margin-top: 1.8rem;
    }
    .car-con img{
        width: 100%;
        height: 100%;
    }
    .car-con .tip{
        margin-top: .2rem;
    }
    .btn-wrap{
        width: 100%;
        position: absolute;
        bottom: 2.6rem;
        left: 0;
    }
    .btn-wrap button{
        width: 70%;
        height: .8rem;
        line-height: .8rem;
        background: red;
        color: #fff;
        font-size: .28rem;
        border-radius: 100px;
    }
</style>