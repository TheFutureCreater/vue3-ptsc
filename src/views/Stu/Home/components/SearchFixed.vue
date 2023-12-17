<script setup>
import SearchBox from './SearchBox.vue'
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)
</script>

<template>
  <div class="home-search-sticky" :class="{ show: y > 100 }">
    <div class="container">
      <SearchBox />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-search-sticky {
  width: 100%;
  height: 90px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 998;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    top: 60px;
    opacity: 1;
  }

  .container {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
