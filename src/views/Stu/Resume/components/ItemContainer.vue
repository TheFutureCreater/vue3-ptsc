<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'

const addButtonShow = ref(false)

defineProps({
  title: {
    required: true,
    type: String
  },
  addItemNum: {
    required: true,
    type: Number
  }
})

const emit = defineEmits(['getAddNum'])
const sendAddNum = (num) => {
  emit('getAddNum', num)
}
</script>

<template>
  <div class="item-container" @mouseenter="addButtonShow = true" @mouseleave="addButtonShow = false">
    <div class="item-head">
      <div class="head-left">
        <span class="head-point"></span>
        <span class="head-title">{{ title }}</span>
      </div>

      <div class="head-right">
        <el-button
          @click="sendAddNum(addItemNum)"
          v-if="addItemNum != 0 && addButtonShow"
          type="primary"
          plain
        >
          <el-icon><Plus /></el-icon>
          <span> 添加 </span>
        </el-button>
      </div>
    </div>

    <div class="item-con">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-container {
  width: 100%;
  margin-top: 18px;
  padding: 0 24px;

  .item-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    height: 44px;

    .head-left {
      display: flex;
      align-items: center;

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
  }

  .item-con {
    white-space: pre-wrap;
    line-height: 1.6;
  }
}
</style>
