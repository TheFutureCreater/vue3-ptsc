<script setup>
import { ref } from 'vue'

const stateData = ref([])
</script>

<template>
  <div class="application">
    <div class="content-empty" v-if="stateData.length === 0">
      <el-empty description="无投递状态数据" style="height: 600px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.application {
  min-height: 600px;
  .content-empty {
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
