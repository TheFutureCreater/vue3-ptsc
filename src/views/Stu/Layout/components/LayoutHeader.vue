<script setup>
import { SwitchButton } from '@element-plus/icons-vue'
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
          <li>
            <RouterLink to="/">
              <span class="highlight-font" :id="routerWord === '/' ? 'current-menu' : ''"> 首页 </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/stu/jobs">
              <span class="highlight-font" :id="routerWord === '/stu/jobs' ? 'current-menu' : ''">
                职位推荐
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/stu/merc">
              <span class="highlight-font" :id="routerWord === '/stu/merc' ? 'current-menu' : ''">
                找公司
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/stu/search">
              <span class="highlight-font" :id="routerWord === '/stu/search' ? 'current-menu' : ''">
                搜 索
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/stu/message">
              <span class="highlight-font" :id="routerWord === '/stu/message' ? 'current-menu' : ''">
                资讯
              </span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/stu/circle">
              <span class="highlight-font" :id="routerWord === '/stu/circle' ? 'current-menu' : ''">
                聘圈
              </span>
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
              <RouterLink to="/login">
                <span class="highlight-font">我要招聘</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/login">
                <span class="highlight-font">我要求职</span>
              </RouterLink>
            </li>
          </ul>
          <RouterLink to="/login" class="user-personal">
            <el-button type="primary">登录/注册</el-button>
          </RouterLink>
        </div>
        <div class="have-login" v-else>
          <span style="margin: 0 20px">
            <span class="highlight-font">切换城市</span>
          </span>

          <ul class="app-header-nav">
            <li>
              <RouterLink to="/stu/resume">
                <span class="highlight-font">简历</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/stu/personal/notification">
                <span class="highlight-font">通知</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/stu/personal/application">
                <span class="highlight-font">投递反馈</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/stu/favorite">
                <span class="highlight-font">收藏</span>
              </RouterLink>
            </li>
          </ul>

          <RouterLink to="/stu/personal" class="user-personal">
            <span class="highlight-font">{{ userStore.user.username || '用户名未知' }}</span>
            <el-dropdown placement="bottom-end" @command="handleCommand">
              <span class="el-dropdown__box">
                <el-avatar :src="userStore.user.avatar || avatar" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="personal" :icon="SwitchButton">个人中心</el-dropdown-item>
                  <el-dropdown-item command="account" :icon="SwitchButton"> 账号与安全 </el-dropdown-item>
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
          margin-right: 8px;
        }
      }
    }

    .app-header-nav {
      display: flex;
      height: 60px;
      align-items: center;

      li {
        font-size: 16px;
        margin-right: 20px;
      }
    }

    .highlight-font:hover {
      font-weight: bolder;
      color: $ptscColor;
    }

    #current-menu {
      font-weight: bolder;
      border-bottom: 4px solid #409eff;
      border-radius: 0 0 5px 5px;
      color: #409eff;
    }
  }
}
</style>
