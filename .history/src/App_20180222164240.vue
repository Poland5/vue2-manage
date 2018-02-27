<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  //CSS loader 会把把非根路径的url解释为相对路径， 加~前缀才会解释成模块路径
  @import '~@/style/common.less';
  #app{
    width:100%;
    height: 100%;
  }
</style>
