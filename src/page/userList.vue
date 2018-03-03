<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <div class="table-container">
      <el-table
        :data="tableData"
        highlight-current-row
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
          background  
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
   </div>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {getUserCount, getUserList} from '@/api/getData'
export default {
  data () {
    return {
      tableData:[],
      limit:20,
      currentPage: 1,
      count:0,
      offset:0,
      pageSize:20
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
      };
      this.getUserList();
    },
    async getUserList(){
      this.tableData = [];
      const userList = await getUserList({offset:this.offset,limit:this.limit});
      userList.forEach((item,index) => {
        const tableData = {};
        tableData.username = item.username;
        tableData.registe_city = item.city;
        tableData.registe_time = item.registe_time;
        this.tableData.push(tableData);
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val-1)*this.limit;
      this.getUserList();
    },
  },
}
</script>
<style lang="less">
  .table-container{
    padding:10px;
  }
  .pagination{
    margin-left: 10px;
    margin-bottom: 10px;
  }
</style>
