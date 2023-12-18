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
      <div class="down-infos-box" v-if="mousePass[index]"></div>
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

    .down-infos-box {
      position: absolute;
      transform-origin: top left;
      top: 110%;
      z-index: 997;
      height: 300px;
      width: 200px;
      background-color: #fff;
      border: 1px solid #f5f6f7;
      border-radius: 5%;
      overflow: auto;
    }
  }
}
</style>
