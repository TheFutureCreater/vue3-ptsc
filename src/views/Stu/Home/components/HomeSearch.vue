<script setup>
import { Search } from '@element-plus/icons-vue'
</script>

<template>
  <div class="home-search">
    <div class="container">
      <div class="mt-4">
        <el-input v-model="input3" placeholder="Please input" class="input-with-select">
          <template #prepend>
            <el-select v-model="select" placeholder="Select" style="width: 115px">
              <el-option label="职位" value="1" />
              <el-option label="公司" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-search {
  height: 140px;
  background-color: #fff;
}
</style>
