<script setup>
import JobsHeader from './components/JobsHeader.vue'
import JobBody from './components/JobBody.vue'
import FromFixed from './components/FromFixed.vue'
</script>

<template>
  <FromFixed />
  <JobsHeader />
  <JobBody />
  <div class="text001"></div>
</template>

<style lang="scss" scoped>
.text001 {
  height: 100px;
}
</style>
