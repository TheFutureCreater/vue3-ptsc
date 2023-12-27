<script setup>
import { inject } from 'vue'

const mercNote = inject('mercNote')
</script>

<template>
  <div class="merc-detail">
    <div class="merc-detail-title">公司详情</div>
    <span class="merc-detail-message">{{ mercNote }}</span>
  </div>
</template>

<style lang="scss" scoped>
.merc-detail {
  width: 100%;
  min-height: 200px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 24px;

  .merc-detail-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 25px;
  }

  .merc-detail-message {
    white-space: pre-wrap;
  }
}
</style>
