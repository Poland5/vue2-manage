<template>
  <div class="header-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path:'/manage'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <img :src="baseImgPath + adminInfo.avatar" class="avatar">
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {baseImgPath} from '@/config/env.js'
import {mapState} from 'vuex'
import {signout} from '@/api/getData'
export default {
  name: 'headTop',
  data () {
    return {
      baseImgPath,
    }
  },
  computed: {
    ...mapState([
      'adminInfo'
    ])
  },
  methods: {
    async handleCommand(command){
      if(command == 'home'){
        this.$router.push('/manage');
      }else if(command == 'signout'){
        const res = await signout();
        if(res.status == 1){
          this.$message({
            type:'success',
            message: res.success
          });
          this.$router.push('/');
        }else{
          this.$message({
            type:'error',
            message: res.message
          })
        }
      }
    }
  }
}
</script>

<style lang="less">
  @import '~@/style/mixin.less';
  .header-container{
    background-color: #eff2f7;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    justify-content: space-between;
  }
  .avatar{
    .wh(36px,36px);
    border-radius: 50%;
    margin-right: 36px;
  }
</style>
