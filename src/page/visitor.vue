<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <visitor-pie :visitorData='visitorData'></visitor-pie>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import visitorPie from '@/components/visitorPie'
import {getUserCityCount} from '@/api/getData'
export default {
  data () {
    return {
      visitorData:{}
    }
  },
  components: {
    headTop,visitorPie
  },
  created () {
    this.initData();
  },
  methods: {
    async initData(){
      try{
        const res = await getUserCityCount();
        if(res.status == 1){
          this.visitorData = res.user_city;
        }else{
          console.log(res.message);
        }
      }catch(err){
        throw new Error("获取用户分布信息失败",err)
      }
    }
  }
}
</script>
<style lang="less">
@import "../style/mixin.less";
</style>
