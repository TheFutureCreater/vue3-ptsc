import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户搜索信息
export const useSearchStore = defineStore('ptsc-search-condition', () => {
  const queryStart = ref(0)
  const cityId = ref(0)
  const cityName = ref('全国')
  const searchWord = ref('')

  const jobForm = ref([])

  const setSearchWord = (obj) => {
    searchWord.value = obj
  }

  const startQuery = () => {
    ++queryStart.value
  }

  // 重设表单条件
  const reset = () => {
    jobForm.value[0] = 0 // 0职位性质 jobNature
    jobForm.value[1] = 0 // 1学历要求 degree
    jobForm.value[2] = [] // 2工作年限 workAge
    jobForm.value[3] = [] // 3薪资范围 wageRange
    jobForm.value[4] = [] // 4职位类别 jobType
    jobForm.value[5] = [] // 5公司行业 business
    jobForm.value[6] = [] // 6公司性质 mercNature
    jobForm.value[7] = [] // 7公司规模 mercScale
  }
  reset()

  return {
    queryStart,
    cityId,
    cityName,
    searchWord,
    jobForm,
    setSearchWord,
    reset,
    startQuery
  }
})
