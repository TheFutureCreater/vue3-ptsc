<script setup>
import { ref } from 'vue'

const stateData = ref([])
</script>

<template>
  <div class="favorite">
    <div class="content-empty" v-if="stateData.length === 0">
      <el-empty description="无收藏数据" style="height: 600px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favorite {
  min-height: 600px;
  .content-empty {
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
