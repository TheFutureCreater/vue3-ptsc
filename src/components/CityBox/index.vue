<script setup>
import cityBase from '@/assets/json/city.json'
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
</script>

<template>
  <!-- <client-only> -->
  <el-dialog v-model="dialogVisible" title="请选择城市" width="800px">
    <div class="city-contianer">
      <span>This is a message</span>
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
  border-top: 3px solid #409eff;
  border-bottom: 3px solid #409eff;
}
</style>
