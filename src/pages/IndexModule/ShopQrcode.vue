<template>
    <div>
        <!--二维码 :item-->
        <erweima :show="show" :item="erweima"></erweima>
    </div>
</template>
<script>
import ShopErWeima from "../../components/ShopErWeima";
export default {
    data(){
        return{
            show: false,
            erweima: {}
        }
    },
    components:{
        "erweima": ShopErWeima
    },
    mounted() {
        var data = this.$route.params.code
        if(data){//带参数的
            this.erweima = JSON.parse(data);
            this.show = true;
        }else{
            var _this = this;
            var data = JSON.parse(localStorage.getItem("info"))
            this.$http.get("do=clerk_qrcode&m=vipcard&id="+data.id)
            .then(function(res){
                _this.erweima = res;
                _this.show = true;
            })
    
        }
        
    },
}
</script>

