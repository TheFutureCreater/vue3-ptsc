<script setup>
import { Search, Location } from '@element-plus/icons-vue'
import { ref } from 'vue'
const searchWord = ref('')
const cityName = ref('')
// const cityId = ref(0)
const selectShow = ref(false)
</script>

<template>
  <CityBox :selectShow="selectShow" />
  <div class="input-with-select">
    <div @click="selectShow = !selectShow">
      <div class="search-locate">
        <span>{{ cityName || '全国' }}</span>
        <el-icon><Location /></el-icon>
      </div>
    </div>

    <span class="middle-separate" />

    <input type="text" placeholder="搜索职位、公司" v-model="searchWord" />

    <el-button :icon="Search" type="primary" size="large" round style="margin-right: 3px">
      <span>搜索</span>
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.input-with-select {
  display: flex;
  align-items: center;
  height: 50px;
  border: 3px solid #409eff;
  border-radius: 50px;
  position: relative;

  .search-locate {
    height: 46px;
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      padding: 0 10px 0 20px;
    }
  }

  .middle-separate {
    height: 30px;
    border-right: 2px solid #edeff2;
    margin: 0 10px 0 10px;
  }

  input {
    height: 43px;
    width: 605px;
  }
}
</style>
