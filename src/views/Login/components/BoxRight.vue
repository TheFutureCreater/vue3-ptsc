<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'

const userType = ref(1) // 1-学生，2-商家，3-管理员
const isRegister = ref(false) // 是否为注册
const isMessageLogin = ref(false) // 是否为登录验证登录

// 用户表单数据容器
const formModel = ref({
  phoneNum: '',
  password: '',
  confirmPassword: ''
})
</script>

<template>
  <div class="box-right">
    <span class="title-bold">
      <h2 class="title" v-if="userType === 1 && !isRegister">大学生登录</h2>
      <h2 class="title" v-if="userType === 1 && isRegister">大学生注册</h2>
      <h2 class="title" v-if="userType === 2 && !isRegister">商家登录</h2>
      <h2 class="title" v-if="userType === 2 && isRegister">商家注册</h2>
    </span>

    <el-form :model="formModel" :rules="rules" ref="form" class="right-form">
      <el-form-item prop="username">
        <el-input
          v-model="formModel.username"
          :prefix-icon="User"
          placeholder="请输入手机号"
          size="large"
          @keydown.enter="handleEnter"
        >
          <el-icon name="user"></el-icon>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formModel.password"
          :prefix-icon="Lock"
          placeholder="请输入密码"
          type="password"
          size="large"
          @keydown.enter="handleEnter"
          show-password
        >
          <el-icon name="lock"></el-icon>
        </el-input>
      </el-form-item>
      <el-form-item v-if="isRegister" prop="confirmPassword">
        <el-input
          v-model="formModel.confirmPassword"
          :prefix-icon="Lock"
          placeholder="请输入确认密码"
          type="password"
          size="large"
          @keydown.enter="handleEnter"
          show-password
        >
          <el-icon name="lock"></el-icon>
        </el-input>
      </el-form-item>
      <el-form-item v-else>
        <div class="flex">
          <el-checkbox v-model="rememberMe" :checked="true">记住我</el-checkbox>
          <el-link class="forget-password" type="primary" :underline="false"> 忘记密码？ </el-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          size="large"
          type="primary"
          :loading="isloading"
          @click="handleLoginOrRegister"
          style="width: 100%; height: 42px; font-size: 20px"
        >
          {{ isRegister ? '注册' : '登录' }}
        </el-button>
      </el-form-item>
    </el-form>

    <div class="right-bottem">
      <el-link type="info" :underline="false" class="switch-form" @click="isRegister = !isRegister">
        {{ isRegister ? '←登录' : '注册→' }}
      </el-link>
      <div class="userType">
        <el-button type="primary" v-if="isRegister === false" @click="isMessageLogin = true">
          短信登录
        </el-button>
        <el-button type="primary" v-if="userType === 2" @click="userType = 1"> 我是大学生 </el-button>
        <el-button type="primary" v-else @click="userType = 2"> 我是商家 </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-right {
  display: flex;
  flex-direction: column;
  justify-self: start;
  align-items: center;
  width: 510px;
  height: 550px;
  border-radius: 0 20px 20px 0;
  background-color: #fff;

  .title-bold {
    font-size: 20px;
  }

  .right-form {
    width: 100%;
    padding: 0 80px;

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .right-bottem {
    display: flex;
    padding: 0 80px;
    width: 100%;
    justify-content: space-between;
    margin: auto 0 25px 0;
  }
}
</style>
