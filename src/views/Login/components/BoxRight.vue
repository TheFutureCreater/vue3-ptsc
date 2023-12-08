<script setup>
import { ref } from 'vue'
import { User, Lock, Message } from '@element-plus/icons-vue'

const userType = ref(1) // 1-学生，2-商家，3-管理员
const isRegister = ref(false) // 是否为注册
const isMessageLogin = ref(false) // 是否为登录验证登录
const isSending = ref(false) // 等待短信发送状态，一般为 1 分钟
const countTime = ref(60) // 倒计时

//  开始倒计时
const startCountdown = () => {
  isSending.value = true
  const timer = setInterval(() => {
    if (countTime.value > 0) {
      countTime.value--
    } else {
      clearInterval(timer)
      countTime.value = 60
      isSending.value = false
    }
  }, 1000)
}

// 用户表单数据容器
const formModel = ref({
  phoneNum: '',
  messageNum: '',
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
      <el-form-item prop="phoneNum">
        <el-input
          v-model="formModel.phoneNum"
          :prefix-icon="User"
          placeholder="请输入手机号"
          size="large"
          @keydown.enter="handleEnter"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="messageNum" v-if="isMessageLogin || isRegister">
        <el-input
          v-model="formModel.messageNum"
          :prefix-icon="Message"
          placeholder="请输入短信验证码"
          size="large"
          @keydown.enter="handleEnter"
        >
          <template #append>
            <el-link
              type="primary"
              class="send-message"
              v-if="!isSending"
              :underline="false"
              @click="startCountdown()"
            >
              发送验证码
            </el-link>
            <span v-else>{{ countTime + 's' }}</span>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password" v-if="!isMessageLogin || isRegister">
        <el-input
          v-model="formModel.password"
          :prefix-icon="Lock"
          placeholder="请输入密码"
          type="password"
          size="large"
          @keydown.enter="handleEnter"
          show-password
        >
        </el-input>
      </el-form-item>

      <el-form-item v-if="isRegister" prop="confirmPassword">
        <el-input
          v-model="formModel.confirmPassword"
          :prefix-icon="Lock"
          placeholder="请确认密码"
          type="password"
          size="large"
          @keydown.enter="handleEnter"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item v-else>
        <div class="flex">
          <el-checkbox v-model="rememberMe" :checked="true">记住我</el-checkbox>
          <el-link
            class="forget-password"
            type="primary"
            :underline="false"
            v-if="!isMessageLogin"
            @click="isMessageLogin = true"
          >
            忘记密码？
          </el-link>
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

      <el-form-item>
        <div style="width: 100%; text-align: center">
          <el-checkbox v-model="rememberMe" :checked="true" v-if="!isRegister">
            已阅读并同意成信招聘 《用户协议》《隐私政策》
          </el-checkbox>
        </div>
      </el-form-item>
    </el-form>

    <div class="right-bottem">
      <el-link type="info" :underline="false" class="switch-form" @click="isRegister = !isRegister">
        {{ isRegister ? '←登录' : '注册→' }}
      </el-link>
      <div class="userType">
        <span v-if="!isRegister" style="margin-right: 10px">
          <el-button type="primary" v-if="!isMessageLogin" @click="isMessageLogin = true">
            短信验证登录
          </el-button>
          <el-button type="primary" v-else @click="isMessageLogin = false"> 密码登录 </el-button>
        </span>
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

  .el-input {
    height: 45px;
  }

  .title-bold {
    font-size: 20px;
  }

  .right-form {
    width: 100%;
    padding: 0 80px;

    .flex {
      width: 100%;
      display: flex;
      height: 45px;
      justify-content: space-between;
      align-items: center;
    }
  }

  .right-bottem {
    display: flex;
    padding: 0 80px;
    width: 100%;
    justify-content: space-between;
    margin: auto 0 30px 0;

    .switch-form {
      font-size: 16px;
    }
  }
}
</style>
