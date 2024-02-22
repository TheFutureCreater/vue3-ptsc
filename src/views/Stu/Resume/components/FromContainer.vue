<script setup>
// import { Plus } from '@element-plus/icons-vue'
// import { ref } from 'vue'

defineProps({
  title: {
    required: true,
    type: String
  }
})

const emit = defineEmits(['cancel-edit', 'over-edit'])
const cancelEdit = () => {
  emit('cancel-edit')
}
const overEdit = () => {
  emit('over-edit')
}
</script>

<template>
  <div class="from-container">
    <div class="from-head">
      <div class="head-left">
        <!-- <span class="head-point"></span> -->
        <span class="head-title">{{ title }}</span>
      </div>

      <div class="head-right"></div>
    </div>

    <div class="from-con">
      <slot></slot>
    </div>

    <div class="from-bottem">
      <el-button @click="cancelEdit" plain>
        <span> &nbsp;&nbsp;取消&nbsp;&nbsp; </span>
      </el-button>

      <el-button @click="overEdit" type="primary" plain>
        <span> &nbsp;&nbsp;完成&nbsp;&nbsp; </span>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.from-container {
  margin: 28px 24px 10px 24px;
  padding: 0 12px;
  border-radius: 10px;
  background-color: #f8f8f8;

  .from-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    height: 44px;
    margin: 3px 0;

    .head-left {
      display: flex;
      align-items: center;

      .head-title {
        font-size: 18px;
      }
    }
  }

  .from-con {
    white-space: pre-wrap;
    line-height: 1.6;
  }

  .from-bottem {
    margin: 12px 12px;
    display: flex;
    justify-content: end;
  }
}
</style>
