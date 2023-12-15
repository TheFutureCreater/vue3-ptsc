<script setup>
import SearchBox from './SearchBox.vue'
import { ref } from 'vue'

// const searchType = ref(0)

const recommendItem = ref(['国企', '管培生', '软件测试工程师', 'Web前端开发', 'Java', 'C++'])
</script>

<template>
  <div class="home-search">
    <div class="container">
      <SearchBox />

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
