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
          <div class="datalist">{{orderCount}}新增订单</div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">{{adminCount}}新增管理员</div>
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
          <div class="datalist">{{allOrderCount}}订单</div>
        </el-col>
        <el-col :span="4">
          <div class="datalist">{{allAdminCount}}管理员</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>
<script>
import headTop from "@/components/headTop";
import dtime from "time-formater";
import { userCount, orderCount, adminCount, getUserCount, getOrderCount, getAdminCount} from "@/api/getData";
export default {
  data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null
    };
  },
  components: {
    headTop
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const today = dtime().format("YYYY-MM-DD");
      Promise.all([userCount(today), orderCount(today), adminCount(today), getUserCount(), getOrderCount(), getAdminCount()])
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
