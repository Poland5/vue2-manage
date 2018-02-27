<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <section class="data-section">
      <header class="data-title">数据统计</header>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="datalist todaydata">
            <span class="head">当日数据</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">
            <span class="data-num">{{userCount}}</span>新增用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">新增订单</div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">新增管理员</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import dtime from 'time-formater'
import {userCount} from '@/api/getData'
export default {
  data(){
    return{
      userCount:null
    }
  },
  components: {
    headTop
  },
  mounted () {
    this.initData();
  },
  methods: {
    async initData(){
      const today = dtime().format('YYYY-MM-DD');
      Promise.all([userCount(today)])
      .then(res => {
        this.userCount = res[0].count;
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style lang="less">
  @import '../style/mixin.less';
  .data-section{
    padding:20px;
    .data-title{
      font-size: 30px;
      margin-bottom: 20px;
      text-align: center;
    }
    .datalist{
      background: #E5E9F2;
      border-radius: 6px;
      text-align: center;
      font-size: 14px;
      .head{
        display: inline-block;  
        font-size: 22px;
        padding: 4px 0;
        color: #fff;
      }
      .data-num{
        font-size: 24px;
        color: #333;
      }
    }
      .todaydata{
        background: #FF9800;
      }
  }
</style>
