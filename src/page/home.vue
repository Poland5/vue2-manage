<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <section class="data-section">
      <header class="data-title">数据统计</header>
      <el-row :gutter="20" style="margin-bottom:10px;">
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
          <div class="datalist">
            <span class="data-num">{{orderCount}}</span>新增订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">
            <span class="data-num">{{adminCount}}</span>新增管理员
            </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="datalist todaydata">
            <span class="head">总数据</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">
            <span class="data-num">{{allUserCount}}</span>注册用户
          </div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">
            <span class="data-num">{{allOrderCount}}</span>订单
          </div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">
            <span class="data-num">{{allAdminCount}}</span>管理员
          </div>
        </el-col>
      </el-row>
    </section>
    <tendency :sevenDay="sevenDay" :sevenData="sevenData"></tendency>
  </div>
</template>
<script>
import headTop from "@/components/headTop";
import dtime from "time-formater";
import tendency from "@/components/tendency";
import { userCount, orderCount, adminCount, getUserCount, getOrderCount, getAdminCount} from "@/api/getData";
export default {
  data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenData:[],
      sevenDay:[[],[],[]],
    };
  },
  components: {
    headTop,tendency
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const today = dtime().format("YYYY-MM-DD");
      Promise.all([userCount(today), orderCount(today), adminCount(today), getUserCount(today), getOrderCount(), getAdminCount()])
        .then(res => {
          this.userCount = res[0].count;
          this.orderCount = res[1].count;
          this.adminCount = res[2].count;
          this.allUserCount = res[3].count;
          this.allOrderCount = res[4].count;
          this.allAdminCount = res[5].count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin.less";
.data-section {
  padding: 20px;
  .data-title {
    font-size: 30px;
    margin-bottom: 20px;
    text-align: center;
  }
  .datalist {
    background: #e5e9f2;
    border-radius: 6px;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    align-items: center;
    .head {
      display: inline-block;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
    }
    .data-num {
      font-size: 24px;
      color: #333;
    }
  }
  .todaydata {
    background: #ff9800;
  }
}
</style>
