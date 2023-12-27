<script setup>
import DetailHead from './components/DetailHead.vue'
import { getJobDetailsService } from '@/api/jobInfo'
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const jobId = ref(0)
const jobDetail = ref({
  nature: 0,
  category: 0,
  workAge: 0,
  degree: 0,
  recruitNum: 0,
  maxWages: 0,
  minWages: 0,
  address: '北京'
})
const jobNote = ref('')

provide('jobDetail', jobDetail) // 向子层传递
provide('jobNote', jobNote) // 向子层传递

const getJobDetails = async () => {
  const loadingInstance = ElLoading.service()
  // 获取url请求参数
  const urlParams = new URLSearchParams(window.location.search)
  jobId.value = parseInt(urlParams.get('id') || 0)
  // ======================需增加id不存在的逻辑
  if (jobId.value === 0) {
    ElMessage.error('错误请求，请求id不存在')
    router.push('/')
  }
  const res = await getJobDetailsService(jobId.value)
  jobDetail.value = res.data.data
  jobNote.value = res.data.data.note
  console.log('jobDetail: ' + jobDetail.value + '===note: ' + jobNote.value)
  loadingInstance.close()
}
getJobDetails()
</script>

<template>
  <DetailHead />
  <div class="text001"></div>
</template>

<style lang="scss" scoped>
.text001 {
  height: 1500px;
}
</style>
