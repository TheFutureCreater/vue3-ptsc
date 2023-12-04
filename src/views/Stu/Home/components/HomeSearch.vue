<script setup>
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

const searchTypeName = ['职位', '公司']
const searchType = ref(0)
const searchWord = ref('')
const selectShow = ref(false)

const recommendItem = ref(['国企', '管培生', '软件测试工程师', 'Web前端开发', 'Java', 'C++'])
</script>

<template>
  <div class="home-search">
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

      <div class="popular-recommend">
        <span>热门推荐：</span>

        <span class="recommend-item" v-for="(item, index) in recommendItem" :key="index">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-search {
  height: 140px;
  background-color: #fff;

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

    .popular-recommend {
      display: flex;
      width: 800px;
      margin: 10px 0 0 0;

      span {
        font-size: 15px;
        height: 25px;
        line-height: 25px;
      }

      > span {
        color: #afb3ba;
        margin-left: 15px;
      }

      .recommend-item {
        width: auto;
        cursor: pointer;
        padding: 0 10px;
        color: #898f98;
        border-radius: 50px;
        background-color: #f5f6f7;
      }

      .recommend-item:hover {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
</style>
