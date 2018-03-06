<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-row style="margin-top:20px">
      <el-col :span="14" :offset="4">
        <header class="form-heaer">选择食物种类</header>
        <el-form :model="categoryForm"  class="form" label-width="110px">
          <el-row class="categoryForm">
            <el-form-item label="食物种类">
              <el-select v-model="categoryForm.categorySelect" :placeholder="selectValue">
                <el-option 
                  v-for="item in categoryForm.categoryList" 
                  :key="item.value" 
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {getCategoryList} from '@/api/getData'
export default {
  data () {
    return {
      labelWidth:'120px',
      restaurant_id:1,
      categoryForm:{
        categoryList:[],
        selectValue:{}
      }
    }
  },
  components: {
    headTop
  },
  computed: {
    selectValue:function(){
      
    }
  },
  created () {
    this.restaurant_id = this.$route.query.restaurant_id;
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
   
    }
  }
}
</script>
<style lang="less">
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
</style>

