<script setup>
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchTypeName = ['职位', '公司']
const searchType = ref(0)
const searchWord = ref('')
const selectShow = ref(true)
</script>

<template>
  <div class="home-search">
    <div class="container">
      <!-- <el-input v-model="searchWord" placeholder="搜索职位、公司" class="input-with-select" size="large">
        <template #prepend>
          <el-select v-model="searchSelect" placeholder="Select" style="width: 80px" size="large">
            <el-option label="职位" value="1" />
            <el-option label="公司" value="2" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" type="primary">
            <span>搜索</span>
          </el-button>
        </template>
      </el-input> -->
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

<style lang="scss" scoped>
.home-search {
  height: 140px;
  background-color: #fff;

  .container {
    justify-content: center;

    .input-with-select {
      display: flex;
      align-items: center;
      width: 600px;
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
        }
      }

      .middle-separate {
        height: 30px;
        border-right: 2px solid #edeff2;
        margin-right: 10px;
      }

      input {
        height: 43px;
        width: 403px;
      }
    }
  }
}
</style>
