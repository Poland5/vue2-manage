<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <div class="content-text">
    <p class="explain-text">node-elm后台管理系统</p>
    <p class="explain-text">第一次登录的用户自动注册成为普通管理员</p>
    <p class="explain-text">普通管理员可以添加，修改信息</p>
    <p class="explain-text">超级管理员可以删除信息</p>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      
    }
  },
  components: {
    headTop
  }
}
</script>
<style lang="less" scoped>
@import "../style/mixin.less";
.content-text{
  text-align: center;
  margin-top: 30px;
  p{
    line-height: 40px;
    .sc(20px,#000);
  }
}
</style>
