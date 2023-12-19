import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户搜索信息，包括大学生用户信息、商家用户信息、管理员用户信息
export const useSearchStore = defineStore('ptsc-search-condition', () => {
  const cityId = ref(0)
  const cityName = ref('全国')
  const searchWord = ref('')

  const jobFrom = ref([])

  jobFrom.value[0] = 0 // 0学历要求 degree
  jobFrom.value[1] = [] // 1职位性质 jobNature
  jobFrom.value[2] = 0 // 2工作年限 workAge
  jobFrom.value[3] = 0 // 3薪资范围 wageRange
  jobFrom.value[4] = [] // 4职位类别 jobType
  jobFrom.value[5] = [] // 5公司行业 business
  jobFrom.value[6] = [] // 6公司性质 mercNature
  jobFrom.value[7] = 0 // 7公司规模 mercScale

  const setSearchWord = (obj) => {
    searchWord.value = obj
  }

  // 重设表单条件
  const reset = () => {
    jobFrom.value = []
  }

  return {
    cityId,
    cityName,
    searchWord,
    jobFrom,
    setSearchWord,
    reset
  }
})
