<template>
    <div></div>
</template>
<script>
export default {
    mounted(){
        //获取微信支付
        this.getJsapi();
        var _this = this;
        setTimeout(function(){
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    _this.verification(result)
                }
            });
        })
    },
    methods: {
        verification(str){
            this.$http.get("do=set_used&m=vipcard&sn="+str,{forbidden:true}) 
            .then(function(res){
            })
        }
    },
}