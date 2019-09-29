<template>
<div class='vip-wrap'>
  <ul>
      <li>
        <span>姓名</span>
        <input type='text' placeholder='请输入姓名'/>
      </li>
      <li>
        <span>电话号码</span>
        <input type='tel' placeholder='请输入手机号'/>
      </li>
      <li>
        <span>公司名称</span>
        <input type='text' placeholder='请输入公司名称'/>
      </li>
      <li>
        <span>办理张数</span>
        <input type='tel' placeholder='请输入办理张数'/>
      </li>
      <li>
        <span>会员费用</span>
        <span class='red-color'>0元</span>
      </li>
  </ul>
  <div class='tip-wrap blue-color'>
    <div>办理会员卡说明：办理会员需支付15元会员费</div>
    <div>企业办卡大于等于100张时免费办理！</div>
    <div>充值5000或以上，免除会员费</div>
  </div>
  <div class='btn-wrap'>
      <button class='com-btn'>确定办理</button>
  </div>
</div>
</template>
<script>
export default {
    methods: {
        goTeam(){
            this.$router.push("/news")
        },
        goVipCenter(){
            this.$router.push("/vipCenter")
        }
    },    
}
</script>
<style lang="scss" scoped>
    .vip-wrap{
        width: 100%;
    }
    .vip-wrap ul{
        display: block;
        width: 100%;
        padding: .34rem .34rem 0;
        box-sizing: border-box;
    }
    .vip-wrap li{
        display: flex;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        background: #fff;
        border-radius: 8px;
        padding: .2rem .34rem;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .34rem;
    }
    .vip-wrap li input{
        text-align: right;
    }
    .tip-wrap{
        width: 100%;
        padding: 0 .34rem;
        box-sizing: border-box;
        font-size: .24rem;
        line-height: .38rem;
    }
    .blue-color{
        color: #2D5DC2;
    }
    .btn-wrap{
        width: 100%;
        height: .8rem;
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: 0;
    }
    .btn-wrap button{
        display: inline-block;
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        color: #fff;
        border-radius: 0;
        font-size: .28rem;
    }
    .get-btn{
        background: #FFA401;
    }
    .com-btn{
        background: #FE0000;
    }
</style>