<template>
  <div class="nav">
    <div class="title">管理系统</div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
      :router="true"
      active-text-color="#409eff"
    >
      <el-menu-item index="/product_list">
        <i class="el-icon-menu"></i>
        <span slot="title">器材管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
