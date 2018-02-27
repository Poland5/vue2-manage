<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <div class="table-container">
      <el-table border
        :data="tableData"
        style="width:100%">
        <el-table-column 
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="registe_time"
          label="注册日期"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户名称"
          width="220">
        </el-table-column>
        <el-table-column
          prop="registe_city"
          label="注册地址">
        </el-table-column>
      </el-table>
    </div>
   <div class="pagination">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
   </div>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {getUserCount} from '@/api/getData'
export default {
  data () {
    return {
      tableData:[{
        registe_time:'200',
        username:'王晓红',
        registe_city:'广州市哪里'
      },],
      limit:20,
      currentPage: 1,
      count:0,
      offset:0,
    }
  },
  components: {
    headTop
  },
  created () {
    this.initData();
  },
  methods: {
    //初始化获取用户数量
    async initData(){
      try{
        let countData = await getUserCount();
        if(countData.status == 1){
          this.count = countData.count;      
        }else{
          throw new Error("获取数据失败")
        }
      }catch(err){
        console.log("获取数据失败",err);
      }
    },
    //获取用户列表
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>
<style lang="less">
  .table-container{
    padding:20px;
  }
  .pagination{
    margin-left: 20px;
  }
</style>
