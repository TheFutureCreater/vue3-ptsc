import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '../stores'

import LoginPage from '@/views/Login/index.vue'
import StuLayout from '@/views/Stu/Layout/index.vue'
import StuHome from '@/views/Stu/Home/index.vue'
import StuJobs from '@/views/Stu/Jobs/index.vue'
import StuJobDetails from '@/views/Stu/JobDetails/index.vue'
import StuMerc from '@/views/Stu/Merc/index.vue'
import StuSearch from '@/views/Stu/Search/index.vue'
import StuNews from '@/views/Stu/News/index.vue'
import StuCircle from '@/views/Stu/Circle/index.vue'
import StuPersonal from '@/views/Stu/Personal/index.vue'
import StuApplication from '@/views/Stu/Application/index.vue'
import StuFavorite from '@/views/Stu/Favorite/index.vue'
import StuNotification from '@/views/Stu/Notification/index.vue'
import StuResume from '@/views/Stu/Resume/index.vue'
import TestVue from '@/views/Test/index.vue'

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
          path: '/stu/jobdetails',
          component: StuJobDetails
        },
        {
          path: '/stu/mercs',
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
        },
        {
          path: '/stu/mercdetails',
          component: StuCircle
        },
        {
          path: '/stu/resume',
          component: StuResume
        },
        {
          path: '/stu/personal',
          component: StuPersonal,
          redirect: '/stu/personal/application',
          children: [
            {
              path: '/stu/personal/application',
              component: StuApplication
            },
            {
              path: '/stu/personal/favorite',
              component: StuFavorite
            },
            {
              path: '/stu/personal/notification',
              component: StuNotification
            }
          ]
        }
      ]
    },
    { path: '/test', component: TestVue }
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
