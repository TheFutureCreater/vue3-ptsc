<script setup>
import JobList from './JobList.vue'
import JobRecommed from './JobRecommed.vue'
</script>

<template>
  <div class="job-body">
    <div class="container">
      <div style="width: 800px; margin-right: 20px">
        <JobList />
      </div>
      <div style="width: 300px">
        <JobRecommed />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.job-body {
  .container {
    height: auto;
    justify-content: start;
    align-items: start;
    margin-top: 20px;
  }
}
</style>
