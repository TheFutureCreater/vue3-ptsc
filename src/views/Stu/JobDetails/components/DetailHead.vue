<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const jobId = ref(0)

// 获取url请求参数
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  jobId.value = parseInt(urlParams.get('id') || 0)
  // ======================需增加id不存在的逻辑
  if (jobId.value === 0) {
    ElMessage.error('错误请求，请求id不存在')
    router.push('/')
  }
})
</script>

<template>
  <div class="detail-head">
    <div class="container">
      <div style="background-color: #4997cf; height: 100%; width: 100%"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-head {
  height: 400px;
  background-color: #fff;
}
</style>
