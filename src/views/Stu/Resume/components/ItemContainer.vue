<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <div class="item-container">
    <div class="item-head">
      <span class="head-point"></span>
      <span class="head-title">{{ title }}</span>
    </div>

    <div class="item-con">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-container {
  width: 100%;
  margin-top: 36px;

  .item-head {
    display: flex;
    align-items: center;
    margin-bottom: 18px;

    .head-point {
      width: 5px;
      height: 20px;
      margin-right: 10px;
      margin-top: 2px;
      border-radius: 2px;
      background-color: #409eff;
    }

    .head-title {
      font-size: 20px;
    }
  }

  .item-con {
    white-space: pre-wrap;
    line-height: 1.6;
  }
}
</style>
