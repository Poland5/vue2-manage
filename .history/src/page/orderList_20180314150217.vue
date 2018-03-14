<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-table
      :data="tableData"
      @expand-change='expand'
      :expand-row-keys='expendRow'
      :row-key="row => row.index"
      style="width:100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form :model="orderForm" label-position="left" inline class="table-expand">
            <el-form-item label="用户名称">
              <span>{{props.row.user_name}}</span>
            </el-form-item>
            <el-form-item label="商铺名称">
              <span>{{props.row.restaurant_name}}</span>
            </el-form-item> 
            <el-form-item label="收货地址">
              <span>{{props.row.address}}</span>
            </el-form-item>
            <el-form-item label="商铺ID">
              <span>{{props.row.restaurant_id}}</span>
            </el-form-item>
            <el-form-item label="商铺地址">
              <span>{{props.row.restaurant_address}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单ID" prop="order_id"></el-table-column>
      <el-table-column label="总价格" prop="total_amount"></el-table-column>
      <el-table-column label="订单状态" prop="order_status"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="total,prev,pager,next"
        :total="count">
      </el-pagination>
    </div>
    
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {getOrderList,getRestaurantDetail,getShoppingAddress, getOrderCount} from '@/api/getData'
export default {
  data () {
    return {
      tableData:[],
      orderForm:{},
      limit:20,  //单次数据条数
      offset:0,  //跳过数据条数
      flag:false,
      expendRow:[],
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
      const countData = await getOrderCount();
      if(count.status == 1){
        this.count = countData.;
        this.getOrderList();
      }else{
        console.log("订单数量获取失败");
      }
    },
    async orderList(){
    try{
        const orderList = await getOrderList({offset:this.offset,limit:this.limit});//获取订单列表
        this.tableData = [];
        orderList.forEach((item,index) => {
          const tableData = {};
          tableData.order_id = item.id;
          tableData.total_amount = item.total_amount;
          tableData.order_status = item.status_bar.title;
          tableData.restaurant_id = item.restaurant_id;
          tableData.user_id = item.user_id;
          tableData.index = index;
          this.tableData.push(tableData);
        });
      }catch(err){
        console.log("订单获取失败", err);
      }
    },
    handleCurrentChange(){

    },
    handleSizeChange(){

    },
    expand(row){
      this.flag = !this.flag;
      if(this.flag){
        this.orderDetail(row);
      } else {
        const index = this.expendRow.indexOf(row.index);
        this.expendRow.splice(index, 1);
      }
    },
    async orderDetail(row){
      const restaurant = await getRestaurantDetail(row.restaurant_id); //获取商铺信息
      const userAddress = await getShoppingAddress(row.user_id);//获取收货地址列表
      const itemData = {
        ...row,
        ...{
          restaurant_address:restaurant.address,
          restaurant_name:restaurant.name,
          user_name:userAddress[0].name,
          address:userAddress[0].address
        }
      };
      this.tableData.splice(row.index, 1, itemData);
      //等待DOM更新循环结束延时执行
      this.$nextTick(() => {
        this.expendRow.push(row.index);
      });
    },
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
  .page{
    margin: 10px;
    margin-bottom:20px;
  }
</style>

