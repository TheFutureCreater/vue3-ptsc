<script setup>
import { inject } from 'vue'

const jobNote = inject('jobNote')
</script>

<template>
  <div class="job-note">
    <div class="job-note-title">职位详情</div>
    <span class="job-note-message">{{ jobNote }}</span>
  </div>
</template>

<style lang="scss" scoped>
.job-note {
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 24px;
  margin-bottom: 20px;

  .job-note-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 25px;
  }

  .job-note-message {
    line-height: 200%;
    white-space: pre-wrap;
  }
}
</style>
