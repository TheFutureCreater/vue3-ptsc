import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户搜索信息，包括大学生用户信息、商家用户信息、管理员用户信息
export const useSearchStore = defineStore('ptsc-search-condition', () => {
  const cityId = ref(0)
  const cityName = ref('全国')
  const searchWord = ref('')

  return {
    cityId,
    cityName,
    searchWord
  }
})
