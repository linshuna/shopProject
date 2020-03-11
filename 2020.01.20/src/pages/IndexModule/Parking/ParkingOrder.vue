<template>
    <div class='order-list-wrap'>
        <div class="tab">
            <div v-for="(item,index) in tabData" :class="{'active':currenIdx==index}" 
                @click='checkTab(index)'>{{item}}</div>
            </div>
            <div class='shop-wrap' v-if="listData.length>0">
            <div v-for="item in listData" class='shop-inner' @click="parkDetail">
                <car-list :item="item"></car-list>
            </div>
        </div>
        <no-order v-else></no-order>
        <bar-footer types="car" idx="1"></bar-footer>
    </div>
</template>
<script>
import BarFooter from "@/components/footer"
import CarList from "@/components/carList"
import NoOrder from "@/components/noOrder"
export default {
    data(){
        return{
            tabData: ['全部', '待缴费', '已完成'],
            currenIdx: 0,
            listData: [{
                status: 1,
                name: '******',
                orderno: '6645110000'
            }, {
                status: 0,
                name: '******',
                orderno: '6645110000'
            }]
        }
    },
    components:{
        "bar-footer": BarFooter,
        "car-list": CarList,
        "no-order":　NoOrder
    },
    mounted() {
    
    },
    methods: {
        checkTab: function (index) {
            this.currenIdx = index
            if(index == 1){
                this.listData = []
            }else{
                this.listData = [{
                    status: 1,
                    name: '******',
                    orderno: '6645110000'
                }, {
                    status: 0,
                    name: '******',
                    orderno: '6645110000'
                }]
            }
        },
        parkDetail(){
            this.$router.push("/parkingDetial")
        }
    },
}
</script>

<style lang="scss" scoped>
    .order-list-wrap{
        padding-bottom: 1rem;
    }
    .tab{
        width: 100%;
        background: #fff;
        display: flex;
    }
    .tab>div{
        width: 33.3%;
        text-align: center;
        padding: .2rem 0;
        box-sizing: border-box;
        font-size: .3rem;
    }
    .tab .active{
        color: #DC3E56;
        border-bottom: 1px solid #DC3E56;
    }

    /* 商品 */
    .shop-inner{
        margin: .2rem 0;
    }
    .shop-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        padding-bottom: 2rem;
        overflow-y: auto;
        -webkit-overflow-scrolling : touch;
    }

</style>