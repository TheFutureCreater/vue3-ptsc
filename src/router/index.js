import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '../stores'

import LoginPage from '@/views/Login/index.vue'
import StuLayout from '@/views/Stu/Layout/index.vue'
import StuHome from '@/views/Stu/Home/index.vue'
import StuJobs from '@/views/Stu/Jobs/index.vue'
import StuMerc from '@/views/Stu/Merc/index.vue'
import StuSearch from '@/views/Stu/Search/index.vue'
import StuNews from '@/views/Stu/News/index.vue'
import StuCircle from '@/views/Stu/Circle/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/',
      component: StuLayout,
      children: [
        {
          path: '',
          component: StuHome
        },
        {
          path: '/stu/jobs',
          component: StuJobs
        },
        {
          path: '/stu/merc',
          component: StuMerc
        },
        {
          path: '/stu/search',
          component: StuSearch
        },
        {
          path: '/stu/news',
          component: StuNews
        },
        {
          path: '/stu/circle',
          component: StuCircle
        }
      ]
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
