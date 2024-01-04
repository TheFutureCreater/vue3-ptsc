import { defineStore } from 'pinia'
import { ref } from 'vue'

// 学生用户个人页面信息管理模块
export const useStuPersonalStore = defineStore('ptsc-stu-personal', () => {
  const stateIndex = ref([0, 0, 0])
  const resumeIdArray = ref([])
  const resumeNameArray = ref([])

  return {
    stateIndex,
    resumeIdArray,
    resumeNameArray
  }
})
