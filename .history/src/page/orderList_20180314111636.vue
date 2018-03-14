<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-table
      :data="tableData"
      style="width:100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form :model="orderForm" inline class="table-expand">
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
import {getOrderList} from '@/api/getData'
export default {
  data () {
    return {
      tableData:[{
        order_id:'1',
        total_price:'1',
        order_status:'1'
      }],
      orderForm:{},
      limit:0,  //单次数据条数
      offset:20,  //跳过数据条数
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
      //获取订单列表
      try{
        const orderList = await getOrderList({offset:this.offset,limit:this.limit});
        
      }catch(err){
        console.log("订单获取失败", err);
      }
    }
  }
}
</script>
<style lang="less" scoped>
 .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

