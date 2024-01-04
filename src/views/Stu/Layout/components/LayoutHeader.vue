<script setup>
import { SwitchButton, User, SetUp } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import avatar from '@/assets/imgs/default.png'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const routerWord = ref('')

const handleCommand = async (key) => {
  if (key === 'logout') {
    // 退出操作
    await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).catch(() => {
      return
    })

    // 清除本地的数据 (token + user信息)
    userStore.resetInfo()
    router.push('/login')
  } else {
    // 跳转操作
    router.push(`/stu/${key}`)
  }
}

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
  <div class="ptsc-page-header">
    <div class="container">
      <div class="header-left">
        <h1 class="logo">
          <RouterLink to="/">成信招聘</RouterLink>
        </h1>

        <ul class="app-header-nav">
          <li :id="routerWord === '/' ? 'current-menu' : ''">
            <RouterLink to="/">
              <span class="highlight-font"> 首 页 </span>
            </RouterLink>
          </li>
          <li :id="routerWord === '/stu/jobs' ? 'current-menu' : ''">
            <RouterLink to="/stu/jobs">
              <span class="highlight-font"> 职位推荐 </span>
            </RouterLink>
          </li>
          <li :id="routerWord === '/stu/mercs' ? 'current-menu' : ''">
            <RouterLink to="/stu/mercs">
              <span class="highlight-font"> 找公司 </span>
            </RouterLink>
          </li>
          <li :id="routerWord === '/stu/search' ? 'current-menu' : ''">
            <RouterLink to="/stu/search">
              <span class="highlight-font"> 搜 索 </span>
            </RouterLink>
          </li>
          <li :id="routerWord === '/stu/news' ? 'current-menu' : ''">
            <RouterLink to="/stu/news">
              <span class="highlight-font"> 资 讯 </span>
            </RouterLink>
          </li>
          <li :id="routerWord === '/stu/circle' ? 'current-menu' : ''">
            <RouterLink to="/stu/circle">
              <span class="highlight-font"> 聘 圈 </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/">
              <span class="highlight-font" style="font-weight: bolder">···</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="header-right">
        <div class="not-login" v-if="userStore.user.userId === 0">
          <ul class="app-header-nav">
            <li>
              <RouterLink :to="{ path: '/login', query: { user: '2', reg: '2' } }">
                <span class="highlight-font">我要招聘</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ path: '/login', query: { user: '1', reg: '2' } }">
                <span class="highlight-font">我要求职</span>
              </RouterLink>
            </li>
          </ul>
          <RouterLink to="/login" class="user-personal">
            <el-button type="primary">登录/注册</el-button>
          </RouterLink>
        </div>
        <div class="have-login" v-else>
          <ul class="app-header-nav">
            <li :id="routerWord === '/stu/resume' ? 'current-menu' : ''">
              <RouterLink to="/stu/resume">
                <span class="highlight-font"> 我的简历 </span>
              </RouterLink>
            </li>
            <!-- <li>
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
            </li> -->
          </ul>

          <RouterLink to="/stu/personal" class="user-personal">
            <span class="highlight-font" style="font-weight: bold; margin-left: 20px">
              {{ userStore.user.username || '用户名未知' }}
            </span>
            <el-dropdown placement="bottom-end" @command="handleCommand">
              <span class="el-dropdown__box">
                <el-avatar :src="userStore.user.avatar || avatar" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="personal" :icon="User">个人中心</el-dropdown-item>
                  <el-dropdown-item command="account" :icon="SetUp"> 账号与安全 </el-dropdown-item>
                  <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ptsc-page-header {
  height: 60px;
  background-color: $ptscCColor;

  .container {
    justify-content: space-between;
    white-space: nowrap; /* 将文本处理为单行 */

    .header-left {
      display: flex;
      align-items: center;
      height: 60px;
      .logo {
        width: 120px;
        margin-right: 20px;

        a {
          display: block;
          height: 60px;
          width: 100%;
          text-indent: -9999px;
          background: url('@/assets/imgs/logo.png') no-repeat center 8px / contain;
        }
      }
    }

    .header-right {
      .not-login,
      .have-login {
        display: flex;
        align-items: center;
      }

      .el-dropdown__box {
        display: flex;
        align-items: center;
        &:active,
        &:focus {
          outline: none;
        }
      }

      .user-personal {
        display: flex;
        align-items: center;

        span {
          font-size: 16px;
          margin: 0 8px;
        }
      }
    }

    .app-header-nav {
      display: flex;
      height: 60px;
      align-items: center;

      li {
        font-size: 16px;
        height: 100%;

        a {
          padding: 0 20px;
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
      box-shadow: inset 0 -3px 0 0 #409eff;

      span {
        color: #409eff;
      }
    }
  }
}
</style>
