<template>
  <div class="home">
    <div class="left">
      <navbar />
    </div>
    <div class="right">
      <top />
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script src="./script.js"></script>
