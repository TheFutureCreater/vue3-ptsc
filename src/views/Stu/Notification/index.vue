<script setup>
import { ref } from 'vue'

const currentItem = ref(0)
const stateLabel = ['全部', '未读', '已读']
</script>

<template>
  <div class="notification">
    <div class="notification-title">
      <ul class="app-header-nav">
        <li
          v-for="(item, index) in stateLabel"
          :key="index"
          :id="currentItem === index ? 'current-menu' : ''"
          @click="currentItem = index"
        >
          <span class="highlight-font">
            {{ item }}
          </span>
        </li>
        <li style="flex: 1"></li>
      </ul>
    </div>

    <div class="app-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  height: 1000px;
  background-color: #fff;
  border-radius: 10px;

  .notification-title {
    .app-header-nav {
      display: flex;
      height: 50px;
      align-items: center;

      li {
        display: flex;
        align-items: center;
        font-size: 16px;
        padding: 0 30px;
        border-bottom: 3px solid #f5f6f7;
        height: 100%;
      }
    }

    .highlight-font:hover {
      font-weight: bolder;
      color: $ptscColor;
    }

    #current-menu {
      border-bottom: 3px solid #409eff;
      font-weight: bolder;
      color: #409eff;
    }
  }
}
</style>
