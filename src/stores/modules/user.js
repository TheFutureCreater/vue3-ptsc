import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户登录注册信息管理模块，包括大学生用户信息、商家用户信息、管理员用户信息
export const useUserStore = defineStore(
  'ptsc-user-information',
  () => {
    const token = ref([])
    const setToken = (newToken, userType) => {
      token.value[userType] = newToken
    }
    const resetInfo = () => {
      user.value = {
        userType: 0,
        userId: 0,
        username: '',
        avatar: ''
      }
      token.value = ''
    }

    // 定义用户信息
    const user = ref({
      userType: 0,
      userId: 0,
      username: '',
      avatar: ''
    })

    return {
      token,
      setToken,
      user,
      resetInfo
    }
  },
  {
    persist: true
  }
)
