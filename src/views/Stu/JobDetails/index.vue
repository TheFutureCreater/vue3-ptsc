<script setup>
import DetailHead from './components/DetailHead.vue'
import DetailBody from './components/DetailBody.vue'
import { getJobDetailsService } from '@/api/jobInfo'
import { getMercProfileService } from '@/api/merc'
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jobDetail = ref({
  nature: 0,
  category: 0,
  workAge: 0,
  degree: 0,
  recruitNum: 0,
  maxWages: 0,
  minWages: 0,
  addjobRess: '北京'
})
const jobNote = ref('')

const mercDetail = ref({
  phoneNum: '',
  userAvatar: '',
  mercName: '',
  mercNature: 0,
  mercBusiness: 0,
  mercScale: 0,
  mercAddress: '',
  mercEmail: ''
})
const mercNote = ref('')

provide('jobDetail', jobDetail) // 向子层传递
provide('jobNote', jobNote) // 向子层传递
provide('mercDetail', mercDetail) // 向子层传递
provide('mercNote', mercNote) // 向子层传递

const getJobDetails = async () => {
  const loadingInstance = ElLoading.service()
  // 获取url请求参数
  const urlParams = new URLSearchParams(window.location.search)
  const jobId = parseInt(urlParams.get('job') || 0)
  const mercId = parseInt(urlParams.get('merc') || 0)
  // ======================需增加id不存在的逻辑
  if (jobId === 0) {
    ElMessage.error('错误请求，请求的职位id不存在')
    router.push('/')
  }
  if (mercId === 0) {
    ElMessage.error('错误请求，请求的公司id不存在')
    router.push('/')
  }
  const mercRes = await getMercProfileService(mercId)
  mercDetail.value = mercRes.data.data
  mercNote.value = mercRes.data.data.mercNote

  const jobRes = await getJobDetailsService(jobId)
  jobDetail.value = jobRes.data.data
  jobNote.value = jobRes.data.data.note
  loadingInstance.close()
}
getJobDetails()
</script>

<template>
  <DetailHead />
  <DetailBody />
</template>

<style lang="scss" scoped></style>
