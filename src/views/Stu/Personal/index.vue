<script setup>
import PersonalHead from './components/PersonalHead.vue'
import PersonalSide from './components/PersonalSide.vue'
</script>

<template>
  <div class="personal">
    <div class="container">
      <div class="personal-left" style="">
        <PersonalHead />
        <div class="personal-body">
          <RouterView />
        </div>
      </div>
      <div class="personal-right" style="width: 300px; margin-left: 20px">
        <PersonalSide />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal {
  padding: 20px 0;

  .container {
    align-items: start;

    .personal-left {
      width: 800px;

      * {
        margin-bottom: 20px;
      }

      .personal-body {
        width: 100%;
      }
    }
  }
}
</style>
