import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '../stores'

import StuLayout from '@/views/Stu/Layout/index.vue'
import StuHome from '@/views/Stu/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: StuLayout,
      children: [{ path: '', component: StuHome }]
    },
    {}
  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

// 登录访问拦截
// router.beforeEach((to) => {
//   const userStore = useUserStore()
//   const userType = userStore.user.userType
//   if (!userStore.token[userType] && to.path !== '/login') return '/login'
// })

export default router
