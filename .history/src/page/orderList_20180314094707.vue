<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-table
      :data="tableData"
      style="width:100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form>
            <el-form-item label="用户名称">
              <span>{{props.row.name}}</span>
            </el-form-item>
            <el-form-item label="商铺名称">
              <span>{{props.row.name}}</span>
            </el-form-item> 
            <el-form-item label="收货地址">
              <span>{{props.row.name}}</span>
            </el-form-item>
            <el-form-item label="商铺ID">
              <span>{{props.row.name}}</span>
            </el-form-item>
            <el-form-item label="商铺地址">
              <span>{{props.row.name}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单ID"></el-table-column>
      <el-table-column label="总价格"></el-table-column>
      <el-table-column label="订单状态"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  components: {
    headTop
  }
}
</script>
<style lang="less" scoped>

</style>

