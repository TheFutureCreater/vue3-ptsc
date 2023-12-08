<script setup>
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)

import { Search, ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchTypeName = ['职位', '公司']
const searchType = ref(0)
const searchWord = ref('')
const selectShow = ref(false)
</script>

<template>
  <div class="home-search-sticky" :class="{ show: y > 100 }">
    <div class="container">
      <div class="input-with-select">
        <div @mouseenter="selectShow = true" @mouseleave="selectShow = false">
          <div class="search-type">
            <span>{{ searchTypeName[searchType] }}</span>
            <el-icon><ArrowDown /></el-icon>
          </div>
          <div class="search-type-fixed" v-if="selectShow" @click="searchType = searchType ? 0 : 1">
            <span>{{ searchTypeName[searchType ? 0 : 1] }}</span>
          </div>
        </div>
        <span class="middle-separate"></span>

        <input type="text" placeholder="搜索职位、公司" v-model="searchWord" />

        <el-button :icon="Search" type="primary" size="large" round>
          <span>搜索</span>
        </el-button>
      </div>
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
  z-index: 999;
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

    .input-with-select {
      display: flex;
      align-items: center;
      width: 800px;
      height: 50px;
      border: 3px solid #409eff;
      border-radius: 50px;
      position: relative;

      .search-type {
        width: 85px;
        height: 46px;
        line-height: 46px;
        cursor: pointer;

        span {
          padding: 0 10px 0 20px;
        }
      }

      .search-type-fixed {
        width: 80px;
        height: 46px;
        line-height: 40px;
        cursor: pointer;
        position: absolute;
        top: 100%;

        span {
          display: block;
          width: 100%;
          height: 100%;
          border: 3px solid #409eff;
          border-radius: 50px;
          padding: 0 10px 0 20px;
          margin-top: 10px;
          background-color: #fff;
        }
      }

      .middle-separate {
        height: 30px;
        border-right: 2px solid #edeff2;
        margin-right: 10px;
      }

      input {
        height: 43px;
        width: 605px;
      }
    }
  }
}
</style>
