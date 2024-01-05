<script setup>
import ResumeMain from './components/ResumeMain.vue'
import ResumeNav from './components/ResumeNav.vue'
import ResumeHead from './components/ResumeHead.vue'
</script>

<template>
  <div class="resume">
    <div class="container">
      <div class="resume-main">
        <ResumeHead />
        <ResumeMain />
      </div>
      <div class="resume-nav">
        <ResumeNav />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume {
  // min-height: 1600px;

  .container {
    margin-top: 20px;
    align-items: start;

    .resume-main {
      background-color: #fff;
      width: 800px;
      border-radius: 10px;
      margin: 0 20px 20px 0;
      min-height: 1200px;
    }

    .resume-nav {
      background-color: #fff;
      width: 300px;
      border-radius: 10px;
      height: 600px;
    }
  }
}
</style>
