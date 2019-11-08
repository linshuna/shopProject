<template>
    <div class="floor-wrap">
        <div class="header-wrap">
            <div class="header-inner">
                <div>
                    <img src="../../assets/images/floor-icon.png"/>
                    <p class="shop-title">三号湾广场</p>
                </div>
                <div @click="goStore">
                    <img src="../../assets/images/store/store-icon.png" class="store-icon"/>
                </div>
                <div>
                    <p>入驻店家</p>
                    <p class="big-font">{{shopNum}}家</p>
                </div>
            </div>
            <div class="floor-num-wrap">
                <img src="../../assets/images/floor-active-icon.png" class="floor-active"/>
                <div class="floor-num-inner">
                    <img src="../../assets/images/left-white-icon.png" @click="lookFloor(1)" class="left-icon"/>    
                    <ul class="floor-num" :style="{'left': -((idx-3)*48)+'px'}">
                        <li v-for="(item,index) in floorData" :class="{'active': index==idx}">{{item}}F</li>
                    </ul>
                    <img src="../../assets/images/right-white-icon.png" @click="lookFloor(-1)" class="right-icon"/>
                </div>
                <p class="floor-line"></p>
            </div>
        </div>
        <ul class="floor-list" v-if="shopList[idx]">
            <li v-for="item in shopList[idx]">
                <p class="shop-name">{{item.branch_name}}</p>
                <p class="gray-color">
                    <img src="../../assets/images/address-icon.png">
                    <span>{{item.floor_no}}</span>
                </p>
            </li>
        </ul>
        <p class="gray-color no-data-tip" v-else>该楼层暂无店铺介绍</p>
    </div>

</template>
<script>
export default {
    data(){
        return{
            idx: 0,
            floorData: 0,//获取楼层 层数
            checkedNum: 0,//楼层的总数
            shopNum: 0,//入驻的楼层总数
            shopList: [],
            utype: ''
        }
    },
    mounted() {
        var _this = this;
        this.$nextTick(function(){
            this.$http.get("do=nav&m=vipcard")
            .then(function(res){
                _this.shopNum = res.countStore;
                var arr = [];
                for(var key in res.stores) {
                    arr.push(key)
                    _this.shopList.push(res.stores[key])
                }
                _this.floorData = arr;
                _this.checkedNum = _this.floorData.length;
            })
            //根据身份跳转
            this.$nextTick(function(){
                this.$http.get("do=clerk_index&m=vipcard")
                .then(function(res){
                    _this.utype = res.utype;
                })
            })
        })
    },
    methods: {
        lookFloor(num){
            var index = this.idx;
            if(num>0){
                --index;
            }else{
                ++index;
            }
            if(index<0||index>=this.checkedNum) return false;
            this.idx = index;
        },
        goStore(){
            this.$router.push("/assistantCenter")
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../../assets/css/style';
    .no-data-tip{
        text-align: center;
    }
    .floor-wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background: #fff;
    }
    .header-wrap{
        width: 100%;
        height: 2.8rem;
        background: url(../../assets/images/floor-bg.png) no-repeat;
        background-size: 100% 100%;
        color: #fff;
        padding: .34rem;
        box-sizing: border-box;
    }
    .header-inner{
        display: flex;
        justify-content: space-between;
        text-align: center;
        font-size: .22rem;
        img{
            width: .42rem;
            height: .42rem;
            display: inline-block;
        }
        .store-icon{
            width: .6rem;
            height: auto;
        }
        .shop-title{
            margin-top: .1rem;
        }
        .big-font{
            font-size: .28rem;
            text-align: right;
            margin-top: .1rem;
        }
    }
    .floor-num-wrap{
        width: 100%;
        margin-top: .34rem;
        position: relative;
        .slider-inner{
            width: 100%;
            height: 1rem;
        }
        .floor-num-inner{
            width: 93%;
            overflow-x: hidden;
        }
        img{
            width: .14rem;
            height: .24rem;
            vertical-align: middle;
            position: absolute;
            z-index: 2;
            top: .1rem;
        }
        .left-icon{
            left: 0;
        }
        .right-icon{
            right: 0;
        }
        .active{
            font-size: .28rem;
        }
        .floor-active{
            position: absolute;
            left: 50%;
            transform: translate(-46%,0);
            top: -.2rem;
            width: .24rem;
            height: .18rem;
        }
        .floor-line{
            width: 100%;
            border-top: 1px solid #fff;
            margin-top: .34rem;
        }
    }
    .floor-num{
        display: inline-block;
        min-width: 100%;
        width: auto;
        white-space: nowrap;
        overflow-x: hidden;
        vertical-align: middle;
        position: relative;
        li{
            display: inline-block;
            width: 48px;
            text-align: center;
            font-size: .22rem;
            color: #fff;
        }
    }
    .floor-list{
        width: 100%;
        padding: 0 .4rem;
        box-sizing: border-box;
        font-size: .22rem;
        margin-top: .2rem;
        li{
            border-bottom: 1px solid #efefef;
            padding: .2rem 0;
            .shop-name{
                margin-bottom: .1rem;
            }
            span,img{
                vertical-align: middle;
            }
            img{
                width: .24rem;
                height: .24rem;
            }
        }
    }
</style>