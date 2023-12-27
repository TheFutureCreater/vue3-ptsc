<script setup>
import JobNote from './JobNote.vue'
import MercDetail from './MercDetail.vue'
import MercNote from './MercNote.vue'
import StuNotice from './StuNotice.vue'
</script>

<template>
  <div class="detail-body">
    <div class="container">
      <div style="width: 800px; margin-right: 20px">
        <JobNote />
        <MercNote />
        <StuNotice />
      </div>

      <div style="width: 300px">
        <MercDetail />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-body {
  .container {
    height: auto;
    justify-content: start;
    align-items: start;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
