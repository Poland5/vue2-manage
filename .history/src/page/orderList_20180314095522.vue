<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-table
      :data="tableData"
      style="width:100%">
      <el-table-column type="expand">
        <template slot-scope="props" inline class="table-expand">
          <el-form :model="orderForm">
            <el-form-item label="用户名称">
              <span>{{props.row.user_name}}</span>
            </el-form-item>
            <el-form-item label="商铺名称">
              <span>{{props.row.restaurant_name}}</span>
            </el-form-item> 
            <el-form-item label="收货地址">
              <span>{{props.row.shipping_address}}</span>
            </el-form-item>
            <el-form-item label="商铺ID">
              <span>{{props.row.restaurant_name}}</span>
            </el-form-item>
            <el-form-item label="商铺地址">
              <span>{{props.row.restaurant_address}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="order_id"></el-table-column>
      <el-table-column label="总价格" prop="total_price"></el-table-column>
      <el-table-column label="订单状态" prop="order_status"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      tableData:[{
        order_id:'',
        total_price:'',
        order_status:''
      }],
      orderForm:{},
    }
  },
  components: {
    headTop
  }
}
</script>
<style lang="less" scoped>

</style>

