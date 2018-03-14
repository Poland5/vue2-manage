<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-table>
      <el-table-column type="expand">
        <template></template>
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

