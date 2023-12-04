<script setup>
import BoxRight from './BoxRight.vue'
</script>

<template>
  <div class="login-box">
    <div class="box-left">
      <div class="left-title">
        <div>找工作上成信招聘</div>
        <div>做最诚信的招聘网站</div>
      </div>
    </div>

    <BoxRight />
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  display: flex;
  align-items: center;
  width: 750px;
  height: 550px;
  border-radius: 20px;
  background-color: #fff;

  .box-left {
    width: 240px;
    height: 100%;
    // border-radius: 20px 0 0 20px;
    border-radius: 20px;
    background: #409eff url('@/assets/imgs/loginBox.png') no-repeat center 8px / contain;

    .left-title {
      margin-top: 450px;
      text-align: center;
      font-size: 20px;
      color: #fafafa;

      div {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
