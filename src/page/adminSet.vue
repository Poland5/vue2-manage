<template>
  <div class="fillcontainer">
    <head-top></head-top>
    <div class="adminSet-content">
      <h3 class="title">管理员信息</h3>
      <ul class="admin-ui">
        <li><span>姓名: </span>{{adminInfo.user_name}}</li>
        <li><span>注册时间: </span>{{adminInfo.create_time}}</li>
        <li><span>管理员权限: </span>{{adminInfo.admin}}</li>
        <li><span>管理员ID: </span>{{adminInfo.id}}</li>
        <li>
          <el-upload
            class="avatar-uploader"
            :action="baseUrl + '/admin/update/avatar/' + adminInfo.id"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="baseImgPath + adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import headTop from '@/components/headTop'
import {baseUrl,baseImgPath} from '@/config/env'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      baseUrl,
      baseImgPath,
    }
  },
  components: {
    headTop
  },
  computed: {
    ...mapState([
      'adminInfo'
    ])
  },
  methods: {
    beforeAvatarUpload(file){
      const isRightType = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isRightType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isRightType && isLt2M;
    },
    handleAvatarSuccess(res,file){
      if (res.status == 1) {
        this.adminInfo.image_path = res.image_path;
      } else {
        this.$message.error("上传图片失败");
      }
    }
  }
}
</script>
<style lang="less">
@import "../style/mixin.less";
.adminSet-content{
  padding:10px;
  .title{
    text-align: center;
  }
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
.title{
  line-height: 50px;
}
.admin-ui{
  width: 300px;
  margin: 10px auto;
  background-color: #F9FAFC;
  border-radius: 3px;
  padding:20px;
  li{
    line-height: 30px;
  }
}
</style>
