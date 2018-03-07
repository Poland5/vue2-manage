<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-row style="margin-top:20px">
      <el-col :span="14" :offset="4">
        <header class="form-heaer">选择食物种类</header>
        <el-form ref="categoryForm" :model="categoryForm" class="form" label-width="110px">
          <el-row class="categoryForm">
            <el-form-item label="食物种类">
              <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue.label" style="width:100%">
                <el-option 
                  v-for="item in categoryForm.categoryList" 
                  :key="item.value" 
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="add-category-row" :class="showAddCategory ? 'showEdit' : ''">
            <div class="add-category">
              <el-form-item label="食物种类" prop="name">
                <el-input v-model="categoryForm.name"></el-input>
              </el-form-item>
              <el-form-item label="种类描述" prop="description">
                <el-input v-model="categoryForm.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitCategoryForm('categoryForm')">提交</el-button>
              </el-form-item>
            </div>
          </el-row>
          <div class="add-category-button" @click="addCategoryFun">
            <i v-if="showAddCategory" class="el-icon-caret-top edit-icon"></i>
            <i v-else class="el-icon-caret-bottom edit-icon"></i>
            <span>添加食物种类</span>
          </div>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="4">
        <header class="form-heaer">添加食物</header>
        <el-form :model="foodForm" class="form" label-width="110px">
          <el-row class="foodForm">
            <el-form-item label="食品名称" prop="foodName">
              <el-input v-model="foodForm.foodName"></el-input>
            </el-form-item>
            <el-form-item label="食品活动" prop="activity">
              <el-input v-model="foodForm.activity"></el-input>
            </el-form-item>
            <el-form-item label="食品详情" prop="foodDetail">
              <el-input v-model="foodForm.foodDetail"></el-input>
            </el-form-item>
            <el-form-item label="上传食品图片">
              <el-upload
                class="avatar-uploader"
                :action="baseUrl + '/v1/addimg/shop'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="foodForm.image_path" :src="baseImgPath + foodForm.image_path" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="食品特点">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in foodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="食品规格">
              <el-radio v-model="radio" label="1">单规格</el-radio>
              <el-radio v-model="radio" label="2">多规格</el-radio>
            </el-form-item>
            <el-form-item label="包装费">
              <el-input-number v-model="selecteNum" :min="1" :max="20" @change="selecteNum"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
              <el-input-number v-model="selectePrice" :min="1" :max="20" @change="selectePrice"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">确认食物添加</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {baseUrl,baseImgPath} from '@/config/env'
import {getCategoryList,addCategory} from '@/api/getData'
export default {
  data () {
    return {
      labelWidth:'120px',
      restaurant_id:1,
      categoryForm:{
        categoryList:[],
        categorySelect:{},
      },
      foodForm:{},
      foodOptions:{},
      showAddCategory:false,
      radio:'1',
      selecteNum:1,
      selectePrice:20
    }
  },
  components: {
    headTop
  },
  computed: {
    selectValue:function(){
      return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {};
    },
  },
  created () {
    if(this.$route.query.restaurant_id){
      this.restaurant_id = this.$route.query.restaurant_id;
    }else{
      this.$confirm('添加食品需要选择一个商铺，先去就去选择商铺吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push('shopList');
        });
    }
    this.initData();
  },
  methods: {
    async initData(){
      try{
        const result = await getCategoryList(this.restaurant_id);
        if(result.status == 1){
          result.category_list.map((item,index) => {
            item.name = item.name;
            item.value = index;
          })
          this.categoryForm.categoryList = result.category_list;
        }else{
          console.log("食品分类获取失败");
        }
      }catch(err){
        console.log("食品分类获取失败",err);
      }
    },
    submitCategoryForm(categoryForm){
      this.$refs[categoryForm].validate(async (valid) => {
        if(valid){
          const params = {
            name: this.categoryForm.name,
            description: this.categoryForm.description,
            restaurant_id: this.restaurant_id
          }
          try{
            const result = await addCategory(params);
            if(result.status == 1){
              this.initData();
              this.categoryForm.name = '';
              this.categoryForm.description = '',
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            }else{
              this.$message({
                type: 'error',
                message: '必须填写食品类型名称'
              })
            }
            this.showAddCategory = false;
          }catch(err){
            console.log("添加食品分类失败",err);
          }
        }else{
          this.$notify({
            title: '错误',
            message: '检查是否输入错误',
            offset: 100
          })
        }
      })
    },
    addCategoryFun(){
      this.showAddCategory = !this.showAddCategory;
    },
    handleAvatarSuccess(){

    },
    beforeAvatarUpload(){

    }
  }
}
</script>
<style lang="less">
  @import "../style/mixin.less";
  .form-heaer{
    text-align: center;
  }
  .form{
    margin-bottom: 20px;
  }
  .categoryForm{
    margin-top: 10px;
    border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
  }
  .add-category-row{
    height: 0;
    background-color: #f9fafc;
    transition: all .4s;
    overflow: hidden;
  }
  .add-category{
    border: 1px solid #eaeefb;
    border-top: none;
    padding: 20px 30px 10px 10px;
  }
  .showEdit{
    height: 218px;
    transition: all .4s;
  }
  .add-category-button{
    line-height: 40px;
    border: 1px solid #eaeefb;
    border-top: none;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    text-align: center;
    &:hover{
      background: #f9fafc;
			span, .edit-icon{
        transition: all .4s;
				color: #20a0ff;
			}
    }
    span{
      .sc(14px,#ccc);
    }
    .edit-icon{
      .sc(16px, #ccc)
    }
  }
  .foodForm{
    border: 1px solid #eaeefb;
    border-radius: 6px;
    padding: 20px 30px 10px 10px;
    margin-top: 10px;
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

