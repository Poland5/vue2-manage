<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <el-row style="margin-top:20px">
      <el-col :span="14" :offset="4">
        <el-form :model="formData" :rules="formRules" ref="formRules" label-width="100px">
          <el-form-item label="商铺名称" prop="name" >
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address" >
            <el-autocomplete
             style="width:100%"
              v-model="formData.address"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelectAddress">
            </el-autocomplete>
            <span>当前城市:{{city.name}}</span>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone" >
            <el-input v-model.number="formData.phone"></el-input>
          </el-form-item>
          <el-form-item label="商铺简介" prop="description" >
            <el-input v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="商店标语" prop="promotion_info" >
            <el-input v-model="formData.promotion_info"></el-input>
          </el-form-item>
          <el-form-item label="商铺分类">
            <el-cascader
              :options="categoryOptions"
              v-model="selectCategoryOptions"
              @change="handleChange"
              change-on-select>
            </el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点">
            <el-switch 
              v-model="formData.pinpai"
              active-text="品牌保证">
            </el-switch>
            <el-switch 
              v-model="formData.delivery_mode"
              active-text="蜂鸟专送">
            </el-switch>
            <el-switch 
              v-model="formData.new"
              active-text="新开店铺">
            </el-switch>
            <el-switch 
              v-model="formData.bao"
              active-text="外卖保">
            </el-switch>
            <el-switch 
              v-model="formData.zhun"
              active-text="准时达">
            </el-switch>
            <el-switch 
              v-model="formData.pao"
              active-text="开发票">
            </el-switch>
          </el-form-item>
          <el-form-item label="配送费">
            <el-input-number v-model="formData.float_delivery_fee" @change="deliveryChange" :min="5" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价">
            <el-input-number v-model="formData.float_minimum_order_amount" @change="minimumOrderChange" :min="20" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间">
            <el-time-select
              v-model="formData.startTime"
              placeholder="开始时间"
              :picker-options="{
                start:'8:00',
                step:'00:15',
                end:'23:30'
              }">
            </el-time-select>
            <el-time-select
              v-model="formData.endTime"
              placeholder="结束时间"
              :picker-options="{
                start:'8:00',
                step:'00:15',
                end:'23:30',
                minTime:formData.startTime
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleShopAvatarSuccess"
              :before-upload="beforeShopAvatarUpload">
              <img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传营业执照">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleBusinessAvatarSuccess"
              :before-upload="beforeShopAvatarUpload">
              <img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传餐饮服务许可证">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleServiceAvatarSuccess"
              :before-upload="beforeShopAvatarUpload">
              <img v-if="formData.catering_service_license_image" :src="baseImgPath + formData.catering_service_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="activityOptions" :placeholder="activityOptions" @change="handleActivityChange">
              <el-option 
                v-for="item in selectActivityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-table 
              border
              :data="activityTableData"
              style="width:100%">
              <el-table-column label="活动标题" prop="icon_name" align="center"></el-table-column>
              <el-table-column label="活动名称" prop="name" align="center"></el-table-column>
              <el-table-column label="活动详情" prop="description" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="addShopes('formRules')">立即创建</el-button>
          </el-form-item>
          <!-- <el-dialog title="提示" :visible.sync="dialogFormVisible">
            <el-form :model="dialogForm">
                <el-form-item label="请输入活动详情">
                  <el-input v-model="dialogForm.description" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitActivityForm">确 定</el-button>
            </div>
          </el-dialog> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {baseUrl, baseImgPath} from '@/config/env'
import {guessCity,getCategory,searchPlacs, addShop} from '@/api/getData'
export default {
  data () {
    return {
      city:{},
      formData:{
        name:'',
        address:'',
        phone:'',
        longitude:'',
        latitude:'',
        description:'',
        promotion_info:'',
        category:'',
        pinpai:true,
        delivery_mode:true,
        new:true,
        bao:true,
        zhun:true,
        pao:true,
        float_delivery_fee:5,
        float_minimum_order_amount:20,
        startTime:'',
        endTime:'',
        image_path:'',
        business_license_image:'',
        catering_service_license_image:''
      },
      activityTableData:[],
      categoryOptions:[],
      selectCategoryOptions:['异国料理','日韩料理'],
      activityOptions:'满减优惠',
      selectActivityOptions:[{
        value:'满减优惠',
        label:'满减优惠'
      },{
        value:'优惠大酬宾',
        label:'优惠大酬宾'
      },{
        value:'新用户立减',
        label:'新用户立减'
      },{
        value:'进店领券',
        label:'进店领券'
      },],
      formRules:{
        name:[
          {required: true, message:'请输入商铺名称'}
        ],
        address:[
          {required: true, message:'请输入详细地址'}
        ],
        phone:[
          { required: true, message:'请输入手机号码'},
          { type: 'number', message: '手机号码必须为数字'}
        ]
      },
      dialogForm:{},
      dialogFormVisible:false,
      allAddress:'',
      baseUrl,
      baseImgPath,
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
      this.formData.category = this.selectCategoryOptions.join('/');
      const allCategory = await getCategory();
      allCategory.forEach((item, index) => {
        if(item.sub_categories.length){
          const addnew = {
            value: item.name,
            label: item.name,
            children: []
          }
          item.sub_categories.forEach((subitem,index) => {
            if(index == 0){
              return;
            }else{
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              })
            }
          })
          this.categoryOptions.push(addnew);
        }
      })
    },
    handleChange(value){
      if(value){
        this.formData.category = value.join('/');
      }
    },
    deliveryChange(){

    },
    minimumOrderChange(){

    },
    handleActivityChange(){
      this.$prompt('请输入活动详情','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
         if(value == null){
           this.$message({
             type:'info',
             message:'请输入活动详情'
           })
         }
        let newObj = {};
        switch(this.activityOptions)
        {
          case '满减优惠':
          newObj = {
            icon_name:'减',
            name:'满减优惠',
            description: value
          }
          break;
          case '优惠大酬宾':
          newObj = {
            icon_name:'减',
            name:'优惠大酬宾',
            description: value
          }
          break;
          case '新用户立减':
          newObj = {
            icon_name:'减',
            name:'新用户立减',
            description: value
          }
          break;
          case '进店领券':
          newObj = {
            icon_name:'减',
            name:'进店领券',
            description: value
          }
          break;
        }
        this.activityTableData.push(newObj);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
      // this.activityData.name = val;
      
    },
    // submitActivityForm(){
    //   this.activityData.description = this.dialogForm.description;
    //   this.activityTableData.push(this.activityData);
    //   this.dialogFormVisible = false;
    // },
    handleDelete(index,row){
      this.activityTableData.splice(index,1);
    },
    async querySearchAsync(queryString,cb){
      if(queryString){
        try{
          const cityList = await searchPlacs(this.city.id, queryString);
          if(cityList instanceof Array){
            cityList.map(item => {
              item.value = item.address;
              return item
            })
          }
          cb(cityList);
        }catch(err){
          console.log(err);
        }
      }
    },
    handleSelectAddress(item){
      this.formData.longitude = item.longitude;
      this.formData.latitude = item.latitude;
      this.formData.address = item.value;
    },
    handleShopAvatarSuccess(res,file){
      if(res.status == 1){
        this.formData.image_path = res.image_path;
      }else{
        this.$message({
          type:'error',
          message:res.message
        })
      }
    },
    handleBusinessAvatarSuccess(res,file){
      if(res.status == 1){
        this.formData.business_license_image = res.image_path;
      }else{
        this.$message({
          type:'error',
          message:res.message
        })
      }
    },
    handleServiceAvatarSuccess(res,file){
      if(res.status == 1){
        this.formData.catering_service_license_image = res.image_path;
      }else{
        this.$message({
          type:'error',
          message:res.message
        })
      }
    },
    beforeShopAvatarUpload(file){
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isRightType && isLt2M;
    },
    addShopes(formRules){
      //获取需要添加的商铺数据
      const activities = this.activityTableData;
      const shopes = {activities, ...this.formData}

      this.$refs[formRules].validate(async (valid) => {
        if(valid){
          if(this.formData.image_path == ''){
            this.$message({
              type: 'error',
              message: '请上传店铺头像'
            });
            return;
          }
          try{
            const res = await addShop(shopes);
            if(res.status == 1){
              this.$message({
                type:'success',
                message: '添加餐馆成功'
              })
            }else{
              this.$message({
                type:'error',
                message: res.message
              })
            }
          }catch(err){
            console.log("数据获取失败");
          }
        }else{
          this.$notify.error({
            title:'错误',
            message:'检查是否输入有误'
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
  @import "../style/mixin.less";
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
  .header-row{
    background-color:#409EFF;
  }
</style>
