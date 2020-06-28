<template>
  <div class="header">
    <el-dropdown @command="handleCommand">
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{ name }}</span>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
