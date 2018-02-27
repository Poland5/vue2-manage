<<<<<<< HEAD
<template>
  <div class="loginPage">
    <transition name="form-fade">
      <section class="form-container">
        <div class="manage-title">
          <p>系统管理</p>
        </div>
        <el-form>
          <el-form-item prop="username">
            <el-input placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    }
  }
</script>
<style scoped>
.loginPage{
  background: #324057;
  width:100%;
  height: 100%;
}
.manage-title{
  margin-top: -100px;
  color: #fff;
  font-size: 24px;
}
.form-container{
  background: #fff;
  width: 320px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

=======
<template>
  <div class="loginPage">
    <transition name="form-fade">
      <section class="form-container">
        <div class="manage-title">
          <p>系统管理</p>
        </div>
        <el-form>
          <el-form-item prop="username">
            <el-input placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    }
  }
</script>
<style scoped>
.loginPage{
  background: #324057;
  width:100%;
  height: 100%;
}
.manage-title{
  margin-top: -100px;
  color: #fff;
  font-size: 24px;
}
.form-container{
  background: #fff;
  width: 320px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>

>>>>>>> version 1.0.0
