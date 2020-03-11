<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    
  },
  methods: {
    shutWin(){
      wx.closeWindow()
    }
  },
}
</script>

<style lang="scss" scoped>
    .shut-wrap{
      width: 100%;
      height: .86rem;
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      img{
        width: 1.4rem;
        position: absolute;
        right: .1rem;
        top: 50%;
        margin-top: -.3rem;
      }
    }
</style>
