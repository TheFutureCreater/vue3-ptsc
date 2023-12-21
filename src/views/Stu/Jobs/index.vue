<script setup>
import JobsHeader from './components/JobsHeader.vue'
import JobBody from './components/JobBody.vue'
import FormFixed from './components/FormFixed.vue'
</script>

<template>
  <FormFixed />
  <JobsHeader />
  <JobBody />
  <div class="text001"></div>
</template>

<style lang="scss" scoped>
.text001 {
  height: 100px;
}
</style>
