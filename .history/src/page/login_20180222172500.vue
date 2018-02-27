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
            <el-button type="primary" class="btn-submit">登陆</el-button>
          </el-form-item>
        </el-form>
        <p class="tips">温馨提示：</p>
        <p class="tips">未登录过的新用户，自动注册</p>
        <p class="tips">注册过的用户可凭账号密码登录</p>
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
<style lang="less" scoped>
.loginPage{
  background: #324057;
  width:100%;
  height: 100%;
}
.manage-title{
  position: absolute;
  top: -50px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  width: 100%;
  p{
    text-align: center;
  }
}
.form-container{
  background: #fff;
  width: 320px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding:20px;
  border-radius: 5px;
  .btn-submit{
    width: 100%;
  }
  .tips{
    color: red;
    font-size: 12px;
    text-align: center;
  }
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
            <el-button type="primary" class="btn-submit">登陆</el-button>
          </el-form-item>
        </el-form>
        <p class="tips">温馨提示：</p>
        <p class="tips">未登录过的新用户，自动注册</p>
        <p class="tips">注册过的用户可凭账号密码登录</p>
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
<style lang="less" scoped>
.loginPage{
  background: #324057;
  width:100%;
  height: 100%;
}
.manage-title{
  position: absolute;
  top: -50px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  width: 100%;
  p{
    text-align: center;
  }
}
.form-container{
  background: #fff;
  width: 320px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding:20px;
  border-radius: 5px;
  .btn-submit{
    width: 100%;
  }
  .tips{
    color: red;
    font-size: 12px;
    text-align: center;
  }
}

</style>

>>>>>>> version 1.0.0
