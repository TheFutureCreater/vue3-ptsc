<script setup>
import cityBase from '@/assets/json/cityChar.json'
import { ref, watch, computed } from 'vue'

const props = defineProps({
  selectShow: Boolean
})
const isShow = computed(() => {
  return props.selectShow
})
const dialogVisible = ref(true)
watch(isShow, () => {
  dialogVisible.value = true
})

// 获取了本地json城市数据
console.log(cityBase.charA[1])
// const currentLocation = {
//   id: 0,
//   district: ''
// }
</script>

<template>
  <!-- <client-only> -->
  <el-dialog v-model="dialogVisible" title="请选择城市" width="800px">
    <div class="city-contianer">
      <div class="char-select">
        <el-button type="primary" text>Primary</el-button>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- </client-only> -->
</template>

<style lang="scss" scoped>
.city-contianer {
  border: 1px solid #409eff;
  display: flex;

  .char-select {
    display: flex;
    flex-direction: column;
  }
}
</style>
