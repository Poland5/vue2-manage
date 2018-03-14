<template>
  <div class="fillcontianer">
    <head-top></head-top>
    <div class="table-contaner">
      <el-table 
        :data="tableData"
        style="width:100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="店铺名称">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{props.row.address}}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{props.row.description}}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{props.row.id}}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{props.row.phone}}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{props.row.rating}}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{props.row.sale_num}}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{props.row.category}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="店铺名称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="店铺地址">
        </el-table-column>
        <el-table-column
          prop="description"
          label="店铺介绍">
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            @click="addGoods(scope.$index, scope.row)">添加食品</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
        <el-form :model="shopDialogForm">
          <el-form-item label="店铺名称" :label-width="formLabelWidth">
            <el-input v-model="shopDialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-autocomplete
              style="width:100%"
              v-model="address.address"
              :fetch-suggestions="querySearch"
              placeholder="请输入地址"
              @select="addressSelect">
            </el-autocomplete>
            <span>当前城市：{{city.name}}</span>
          </el-form-item>
          <el-form-item label="店铺介绍" :label-width="formLabelWidth">
            <el-input v-model="shopDialogForm.description"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="shopDialogForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类" :label-width="formLabelWidth">
            <el-cascader
              :options="categoryOptions"
              v-model="selecteShopOptions"
              change-on-select>
            </el-cascader>
          </el-form-item>
          <el-form-item label="店铺分类" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="shopDialogForm.image_path" :src="baseImgPath + shopDialogForm.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="updateShop">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {guessCity, getShopList, deleteRestaurant, getCategory, updateShop, queryCity} from '@/api/getData'
import {baseUrl,baseImgPath} from '@/config/env'
import headTop from '@/components/headTop'
export default {
  data () {
    return {
      tableData:[],
      shopDialogForm:{},
      categoryOptions: [],
      selecteShopOptions:[],
      formLabelWidth:'120px',
      limit:20,
      offset:0,
      city:{},
      dialogFormVisible:false, 
      address:{},
      baseUrl,
      baseImgPath
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
      this.city = await guessCity();
      this.shopList();
    },
    async shopList(){
      this.tableData = [];
      const shopList = await getShopList({limit:this.limit,offset:this.offset,latitude:this.city.latitude,longitude:this.city.longitude});
      shopList.forEach(item => {
        let tableData = {};
        tableData.id = item.id;
        tableData.name = item.name;
        tableData.address = item.address;
        tableData.description = item.description;
        tableData.phone = item.phone;
        tableData.rating = item.rating;
        tableData.sale_num = item.recent_order_num;
        tableData.category = item.category;
        tableData.image_path = item.image_path;
        this.tableData.push(tableData);
      })
    },
    handleEdit(index,row){
      this.shopDialogForm = row;
      this.address.address = row.address;
      this.selecteShopOptions = row.category.split('/');
      if(this.selecteShopOptions.length){
        this.getCategory();
      }
      this.dialogFormVisible = true;
    },
    async getCategory(){
      const res = await getCategory();
      res.forEach(item => {
        const addnew = {
          value:item.name,
          label:item.name,
          children:[]
        }
        item.sub_categories.forEach((subItem,index) => {
          if(index == 0){
            return
          }else{
            addnew.children.push({
              value:subItem.name,
              label:subItem.name
            })
          }
        })
        this.categoryOptions.push(addnew);
      })
    },
    beforeAvatarUpload(file){
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;
      
      if(!isRightType){
        this.$message.error('上传图片只能是jpg、png格式!');
      }
      if(!isLt2M){
        this.$message.error('上传图片大小不能超过2M!');
      }
      return isRightType && isLt2M;
    },
    handleAvatarSuccess(res, file){
     if(res.status == 1){
       this.shopDialogForm.image_path = res.image_path;
     }else{
       this.$message.error("上传图片失败！");
     }
    },
    async handleDelete(index,row){
      const res = await deleteRestaurant(row.id);
      try{
        if(res.status == 1){
          this.$message({
            message:"删除成功",
            type:"success"
          });
          this.tableData.splice(index,1);
        }else{
          throw new Error(res.message)
        }
      }catch(err){
        this.$message({
          message:err.message,
          type:"error"
        })
        console.log("删除失败");
      }
    },
    addressSelect(item){
      const {address,longitude,latitude} = item;
      this.address = {address,longitude,latitude};
    },
    addGoods(index,row){
      this.$router.push({path:'addGoods',query:{restaurant_id:row.id}});
    },
    async querySearch(queryString, cb){
      if(queryString){
        try{
          const cityList = await queryCity(this.city.id, queryString);
          if(cityList instanceof Array){
            cityList.map(item => {
              item.value = item.address;
              return item;
            })
            //绑定value值，数据准备好时通过 cb(data) 返回到 autocomplete 组件中
            cb(cityList);
          }
        }catch(err){
          console.log("搜索地址失败",err);
        }
      }
    },
    async updateShop(){
      Object.assign(this.shopDialogForm,this.address)
      this.shopDialogForm.category = this.selecteShopOptions.join("/");
      console.log(this.shopDialogForm);
      
      const res = await updateShop(this.shopDialogForm);
      try{
        if(res.status == 1){
          this.$message({
            message:"更新成功",
            type:"success"
          });
          this.dialogFormVisible = false;
        }else{
          this.$message({
            message:error.message,
            type:"error"
          });
        }
      }catch(err){
        console.log("数据更新失败", err);
      }
    }
  }
}
</script>
<style lang="less">
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
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


