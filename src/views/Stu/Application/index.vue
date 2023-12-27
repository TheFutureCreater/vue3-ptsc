<script setup>
import { ref } from 'vue'

const currentItem = ref(0)
const stateLabel = ['全部', '待查看', '已查看', '待沟通', '邀请面试', '待录用']
</script>

<template>
  <div class="application">
    <div class="application-title">
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
.application {
  height: 1000px;
  background-color: #fff;
  border-radius: 10px;

  .application-title {
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
