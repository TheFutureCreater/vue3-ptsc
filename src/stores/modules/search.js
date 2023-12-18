import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户搜索信息，包括大学生用户信息、商家用户信息、管理员用户信息
export const useSearchStore = defineStore('ptsc-search-condition', () => {
  const cityId = ref(0)
  const cityName = ref('全国')
  const searchWord = ref('')

  const jobNature = ref([])
  const jobType = ref([])
  const business = ref([])
  const mercNature = ref([])
  const workAge = ref(0)
  const mercScale = ref(0)
  const degree = ref(0)
  const wageRange = ref(0)

  const setSearchWord = (obj) => {
    searchWord.value = obj
  }

  // 重设表单条件
  const reset = () => {
    jobNature.value = []
    workAge.value = 0
    jobType.value = []
    business.value = []
    mercNature.value = []
    mercScale.value = 0
    degree.value = 0
    wageRange.value = 0
  }

  return {
    cityId,
    cityName,
    searchWord,
    jobNature,
    workAge,
    jobType,
    business,
    mercNature,
    mercScale,
    degree,
    wageRange,
    setSearchWord,
    reset
  }
})
