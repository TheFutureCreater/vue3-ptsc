<script setup>
// import { useUserStore } from '@/stores'
</script>

<template>
  <div class="ptsc-page-header">
    <div class="container">
      <div class="header-left">
        <h1 class="logo">
          <RouterLink to="/">成信招聘</RouterLink>
        </h1>
      </div>
      <div class="header-right">
        <span>切换城市</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ptsc-page-header {
  height: 60px;
  background-color: $ptscCColor;

  .logo {
    width: 120px;
    margin-right: 20px;

    a {
      display: block;
      height: 60px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/imgs/logo.png') no-repeat center 8px / contain;
    }
  }

  .header-right {
    justify-self: end;
  }
}
</style>
