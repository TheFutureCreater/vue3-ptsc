<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const routerWord = ref('')
// 导入路由，获取当前路由参数，经过处理保留二级路由，保证当前路由页面高亮
onMounted(() => {
  routerWord.value = router.currentRoute.value.path
})
router.beforeEach((to, from, next) => {
  routerWord.value = to.path
  next()
})
</script>

<template>
  <div class="personal-head">
    <div class="navigation-head">
      <ul class="app-header-nav">
        <li>
          <RouterLink to="/stu/personal/application">
            <span
              class="highlight-font"
              :id="routerWord === '/stu/personal/application' ? 'current-menu' : ''"
            >
              投递反馈
            </span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/stu/personal/notification">
            <span
              class="highlight-font"
              :id="routerWord === '/stu/personal/notification' ? 'current-menu' : ''"
            >
              通知
            </span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/stu/personal/favorite">
            <span
              class="highlight-font"
              :id="routerWord === '/stu/personal/favorite' ? 'current-menu' : ''"
            >
              收藏
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-head {
  .navigation-head {
    width: 100%;
    height: 60px;
    border-radius: 10px;
    background-color: #fff;

    .app-header-nav {
      display: flex;
      height: 60px;
      align-items: center;

      li {
        font-size: 16px;
        padding: 0 30px;
        height: 100%;

        a {
          display: flex;
          align-items: center;
          height: 100%;
          width: 100%;
        }
      }
    }

    .highlight-font:hover {
      font-weight: bolder;
      color: $ptscColor;
    }

    #current-menu {
      font-weight: bolder;
      border-radius: 0 0 3px 3px;
      color: #409eff;
    }
  }
}
</style>
