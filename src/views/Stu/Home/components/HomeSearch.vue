<script setup>
import { Search, Location } from '@element-plus/icons-vue'
import { ref } from 'vue'

// const searchType = ref(0)
const searchWord = ref('')
const selectShow = ref(false)
// const cityId = ref(0)
const cityName = ref('')
const recommendItem = ref(['国企', '管培生', '软件测试工程师', 'Web前端开发', 'Java', 'C++'])
</script>

<template>
  <CityBox :selectShow="selectShow" />
  <div class="home-search">
    <div class="container">
      <div class="input-with-select">
        <div @click="selectShow = !selectShow">
          <div class="search-locate">
            <span>{{ cityName || '全国' }}</span>
            <el-icon><Location /></el-icon>
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

      .search-locate {
        width: 85px;
        height: 46px;
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          padding: 0 10px 0 20px;
        }
      }

      // .search-locate-fixed {
      //   width: 80px;
      //   height: 46px;
      //   line-height: 40px;
      //   cursor: pointer;
      //   position: absolute;
      //   top: 100%;

      //   span {
      //     display: block;
      //     width: 100%;
      //     height: 100%;
      //     border: 3px solid #409eff;
      //     border-radius: 50px;
      //     padding: 0 10px 0 20px;
      //     margin-top: 10px;
      //     background-color: #fff;
      //   }
      // }

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
