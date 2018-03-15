<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-table
      :data="tableData"
      style="width:100%; margin:10px; margin-bottom:none">
      <el-table-column label="姓名" prop="user_name" width="180"></el-table-column>
      <el-table-column label="注册日期" prop="create_time" width="250"></el-table-column>
      <el-table-column label="地址" prop="city" width="300"></el-table-column>
      <el-table-column label="权限" prop="authority"></el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="total,prev,pager,next"
      :total="count"
      style="margin:10px;">
    </el-pagination>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {getAdminList, getAdminCount} from '@/api/getData'
export default {
  data () {
    return {
      tableData:[],
      offset:0,
      limit:20,
      currentPage:1,
      count:0
    }
  },
  components: {
    headTop
  },
  created () {
    this.initData();
  },
  methods: {
    async initData(){
      try{
        const result = await getAdminCount();
        if(result.status == 1){
          this.count = result.count;
        }else{
          throw new Error("获取数据失败")
        }
        this.adminList();
      }catch(err){
        console.log("获取数据失败");
      }
    },
    async adminList(){
      const res = await getAdminList({offset:this.offset, limit: this.limit});
        this.tableData = [];
        if(res.status == 1){
          res.data.forEach((item,index) => {
            const tableData = {
              user_name: item.user_name,
              create_time: item.create_time,
              city: item.city,
              authority: item.admin
            };
            this.tableData.push(tableData);
          })
      }else{
        console.log("数据获取失败");
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = this.limit * (val - 1);
      this.adminList();
    }
  }
}
</script>
<style lang="less" scoped>

</style>

