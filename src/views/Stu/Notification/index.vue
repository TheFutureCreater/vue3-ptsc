<script setup>
import { ref } from 'vue'

const stateData = ref([])
</script>

<template>
  <div class="notification">
    <div class="content-empty" v-if="stateData.length === 0">
      <el-empty description="无通知数据" style="height: 600px" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  // height: 1000px;
  .content-empty {
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
