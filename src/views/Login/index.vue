<script setup>
import LoginBox from './components/LoginBox.vue'
</script>

<template>
  <div class="backgrand">
    <LoginBox />
  </div>
</template>

<style lang="scss" scoped>
.backgrand {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: $ptscCColor;
}
</style>
