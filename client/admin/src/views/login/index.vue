<template>
  <div>
    <div class="login-ctn">
      <input type="password" class="hidden-psss-input"/>
      <h1 class="title">某某某管理系统</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-if="!isLogin">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-radio v-model="type" label="1">登录</el-radio>
        <el-radio v-model="type" label="2">注册</el-radio>
        <el-checkbox v-model="isRemember" v-if="isLogin" class="is-remember">记住密码</el-checkbox>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确认</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
