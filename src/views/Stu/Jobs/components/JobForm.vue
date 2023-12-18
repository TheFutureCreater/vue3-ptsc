<script setup>
import { ref, onMounted } from 'vue'
import { useSearchStore } from '@/stores'
import jobFrom from '@/assets/json/jobFrom'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const searchStore = useSearchStore()
const form = ref({})
const mousePass = ref([])
// 初始化表单数据
onMounted(() => {
  form.value.degree = searchStore.degree
  form.value.jobNature = searchStore.jobNature
  form.value.workAge = searchStore.workAge
  form.value.jobType = searchStore.jobType
  form.value.business = searchStore.business
  form.value.mercNature = searchStore.mercNature
  form.value.mercScale = searchStore.mercScale
  form.value.degree = searchStore.degree
  form.value.wageRange = searchStore.wageRange
})
</script>

<template>
  <div class="job-form">
    <span class="form-title">其他筛选</span>
    <div
      v-for="(item, index) in jobFrom"
      :key="index"
      class="form-item"
      @mouseenter="mousePass[index] = true"
      @mouseleave="mousePass[index] = false"
    >
      <span>{{ item.title }}</span>
      <el-icon style="margin-left: 5px">
        <ArrowDown v-if="!mousePass[index]" />
        <ArrowUp v-else />
      </el-icon>
      <div class="down-infos-box" v-if="mousePass[index]">
        <div class="down-info-item" v-for="(info, index) in item.info" :key="index">
          <span>{{ info.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.job-form {
  display: flex;
  align-items: center;

  .form-title {
    font-weight: bolder;
    font-size: large;
  }

  .form-item {
    width: 120px;
    height: 40px;
    font-size: 15px;
    border-radius: 20px;
    color: #222222;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    background-color: #f5f6f7;
    position: relative;
    cursor: pointer;

    .down-infos-box {
      position: absolute;
      transform-origin: top left;
      top: 115%;
      // left: -50%;
      z-index: 997;
      max-height: 302px;
      background-color: #fff;
      border: 1px solid #ebebeb;
      border-radius: 10px;
      overflow: auto;
      padding: 10px;

      .down-info-item {
        min-width: 160px;
        height: 40px;
        border-radius: 10px;
        line-height: 40px;
        white-space: nowrap; /* 将文本处理为单行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */

        span {
          margin-left: 10px;
          margin-right: 10px;
        }
      }

      .down-info-item:hover {
        background-color: #f5f6f7;
      }
    }

    .down-infos-box::-webkit-scrollbar {
      width: 0px; /* 隐藏滚动条的宽度 */
    }
  }
}
</style>
