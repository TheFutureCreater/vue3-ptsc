<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useStuPersonalStore } from '@/stores'

const stuPersonalStore = useStuPersonalStore()
const router = useRouter()
const routerWord = ref('')
const stateLabel = [
  ['全部', '待查看', '已查看', '待沟通', '邀请面试', '待录用'],
  ['全部', '未读', '已读'],
  ['职位收藏', '公司收藏']
]
const navigationLabel = [
  { url: '/stu/personal/application', label: '投递反馈' },
  { url: '/stu/personal/notification', label: '通 知' },
  { url: '/stu/personal/favorite', label: '收 藏' }
]
// 导入路由，获取当前路由参数，经过处理保留二级路由，保证当前路由页面高亮
onMounted(() => {
  routerWord.value = router.currentRoute.value.path
})
router.beforeEach((to, from, next) => {
  routerWord.value = to.path
  next()
})

const navigationIndex = computed(() => {
  if (routerWord.value === '/stu/personal/application') {
    return 0
  } else if (routerWord.value === '/stu/personal/notification') {
    return 1
  } else {
    return 2
  }
})

const clickTonavigation = (index) => {
  router.push(navigationLabel[index].url)
}
</script>

<template>
  <div class="personal-head">
    <div class="navigation-head">
      <ul class="app-header-nav">
        <li
          v-for="(item, index) in navigationLabel"
          :key="index"
          :id="navigationIndex === index ? 'current-menu' : ''"
          @click="clickTonavigation(index)"
        >
          <RouterLink to="/stu/personal/application">
            <span class="highlight-font"> {{ item.label }} </span>
          </RouterLink>
        </li>
        <li style="flex: 1; cursor: auto"></li>
      </ul>
      <ul class="app-header-nav2">
        <li
          v-for="(item, index) in stateLabel[navigationIndex]"
          :key="index"
          :id="stuPersonalStore.stateIndex[navigationIndex] === index ? 'current-menu2' : ''"
          @click="stuPersonalStore.stateIndex[navigationIndex] = index"
        >
          <span class="highlight-font2">
            {{ item }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-head {
  .navigation-head {
    width: 100%;
    height: 100px;
    border-radius: 10px;
    background-color: #fff;

    .app-header-nav {
      display: flex;
      height: 50px;
      align-items: center;

      li {
        font-size: 16px;
        padding: 0 30px;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding: 0 30px;
        border-bottom: 3px solid #f5f6f7;
        cursor: pointer;

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
      border-bottom: 3px solid #409eff;
      font-weight: bolder;

      a {
        color: #409eff;
      }
    }

    .app-header-nav2 {
      display: flex;
      height: 50px;
      align-items: center;

      li {
        display: flex;
        align-items: center;
        font-size: 16px;
        padding: 0 30px;
        height: 100%;
        cursor: pointer;
      }

      li:hover {
        color: $ptscColor;
      }
    }

    #current-menu2 {
      font-weight: bolder;
      color: #409eff;
    }
  }
}
</style>
