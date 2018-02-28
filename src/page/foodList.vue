<template>
  <div class="fillcontainer">
    <headTop></headTop>
    <div class="table-container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="食品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="餐馆名称">
                <span>{{ props.row.restaurant_name }}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{ props.row.item_id }}</span>
              </el-form-item>
              <el-form-item label="餐馆 ID">
                <span>{{ props.row.restaurant_id }}</span>
              </el-form-item>
              <el-form-item label="食物评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="食物分类">
                <span>{{ props.row.food_category }}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{ props.row.mouth_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="食品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="食品介绍"
          prop="description">
        </el-table-column>
        <el-table-column
          label="评分"
          prop="rating">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="20"
        layout="total,prev, pager, next"
        :total="count" style="margin-top:20px; margin-left:20px;">
      </el-pagination>

      <!--食物更新-->
      <el-dialog title="修改食物信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectFoodsInfo">
          <el-form-item label="食品名称" :label-width="formLabelWidth">
            <el-input v-model="selectFoodsInfo.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" :label-width="formLabelWidth">
            <el-input v-model="selectFoodsInfo.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品分类" :label-width="formLabelWidth">
            <el-select v-model="selectIndex" placeholder="请选择活动区域">
              <el-option label="区域1" value="1"></el-option>
              <el-option label="区域2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食物图片" :label-width="formLabelWidth">
            <el-upload
              class="img-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="selectFoodsInfo.image_path" :src="baseImgPath + selectFoodsInfo.image_path" class="avatar">
              <i v-else class="el-icon-plus img-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
          <el-row style="text-align:center">
            <el-table
              :data="specsTable"
              style="width: 100%; border:1px solid #eee; border-bottom:none"
              >
              <el-table-column
                prop="specs"
                label="规格"
                >
              </el-table-column>
              <el-table-column
                prop="packing_fee"
                label="包装费"
                >
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="specDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" style="margin-top:10px" @click="specsFormVisible = true">添加规格</el-button>
          </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="添加规格" :visible.sync="specsFormVisible">
        <el-form :model="specsForm" :rules="specsRules">
          <el-form-item label="规格" prop="specs" :label-width="formLabelWidth">
            <el-input v-model="specsForm.specs" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="包装费" :label-width="formLabelWidth">
            <el-input-number v-model="specsForm.packing_fee" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input-number v-model="specsForm.price" :min="20" :max="100"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specsFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addspecs">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>

import headTop from '@/components/headTop'
import {getFoodCount,getFoodList,getRestaurantDetail} from '@/api/getData'
import {baseImgPath} from '@/config/env'
export default {
  data () {
    return {
      dialogFormVisible:false,
      restaurant_id: null,
      count: 0,
      offset: 0,
      limit: 20,
      currentPage: 1,
      tableData: [],
      selectFoodsInfo:{},
      formLabelWidth:'100px',
      imageUrl:null,
      selectIndex:1,
      baseImgPath,
      specsFormVisible:false,
      specsForm:{
        specs: '',
        packing_fee: 0,
        price:0
      },
      specsRules:{
        specs:[
          { required: true, message: '规格不能为空', trigger: 'blur'},
        ]
      }
    }
  },
  components: {
    headTop
  },
  created () {
    this.restaurant_id = this.$route.query.restaurant_id;
    this.initData();
  },
  computed: {
    specsTable:function(){
      let specs = [];
      if(this.selectFoodsInfo.specfoods){
        this.selectFoodsInfo.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          })
        })
      }
      return specs;
    }
  },
  methods: {
    //获取食物数量
    async initData(){
      try{
        const countData = await getFoodCount({restaurant_id:this.restaurant_id});
        if(countData.status == 1){
          this.count = countData.count;
        }else{
          throw new Error("数据读取失败");
        }
        this.getFoods();
      }
      catch(err){
        console.log("数据读取失败", err);
      }
    },
    //获取食物列表
    async getFoods(){
      try{
        const foods = await getFoodList({offset:this.offset, limit: this.limit, restaurant_id:this.restaurant_id});
        this.tableData = [];
        if(foods){
          foods.forEach((item, index) => {
            const tableData = {};
            tableData.name = item.name;
            tableData.item_id = item.item_id;
            tableData.restaurant_id = item.restaurant_id;
            tableData.rating = item.rating;
            tableData.month_sales = item.mouth_sales;
            tableData.description = item.description;
            tableData.image_path = item.image_path;
            tableData.specfoods = item.specfoods;
            this.tableData.push(tableData);
          });
        }else{
          throw new Error("数据读取失败")
        }
      }catch(err){
        console.log("数据读取失败", err);
      }
    },
    //编辑
    handleEdit(index,row){
      this.getSelecteItemData(row,'edit');
      this.dialogFormVisible = true;
    },
    async getSelecteItemData(row,type){
      const restaurant = await getRestaurantDetail(row.restaurant_id);
      this.selectFoodsInfo = {...row,...{description:restaurant.description}};      
    },

    //删除食物列表
    handleDelete(index,row){

    },
    handleSizeChange(val){
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val){
      this.currentPage = val;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //添加规格
    addspecs(){
      this.specsTable.push({...this.specsForm});
      this.specsFormVisible = false;
    }
  }
}
</script>
<style lang="less">
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
   .img-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .img-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .img-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
