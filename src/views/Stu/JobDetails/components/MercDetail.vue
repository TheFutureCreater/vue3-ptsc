<script setup>
import { inject } from 'vue'
import jobForm from '@/assets/json/jobForm.json'
import {
  OfficeBuilding,
  LocationInformation,
  Menu,
  Van,
  UserFilled,
  Phone,
  Message
} from '@element-plus/icons-vue'

const mercDetail = inject('mercDetail')

const clickToMercDetail = () => {
  // 获取url请求参数
  const urlParams = new URLSearchParams(window.location.search)
  const mercId = parseInt(urlParams.get('merc') || 0)
  console.log('mercId' + mercId)
}
</script>

<template>
  <div class="merc-detail">
    <div class="merc-detail-title">公司信息</div>
    <div style="text-align: center">
      <el-avatar shape="square" :size="80" :src="mercDetail.userAvatar" @error="true">
        <img />
      </el-avatar>
    </div>
    <span class="merc-detail-message">
      <div>
        <el-icon color="#7c8087" size="20"><OfficeBuilding /></el-icon>
        <span style="font-weight: bold">{{ mercDetail.mercName }}</span>
      </div>
      <div>
        <el-icon color="#7c8087" size="20"><LocationInformation /></el-icon>
        <span>{{ mercDetail.mercAddress }}</span>
      </div>
      <div>
        <el-icon color="#7c8087" size="20"><Menu /></el-icon>
        <span>{{ jobForm[6].info[mercDetail.mercNature].label }}</span>
      </div>
      <div>
        <el-icon color="#7c8087" size="20"><Van /></el-icon>
        <span>{{ jobForm[5].info[mercDetail.mercBusiness].label }}</span>
      </div>
      <div>
        <el-icon color="#7c8087" size="20"><UserFilled /></el-icon>
        <span>{{ jobForm[7].info[mercDetail.mercScale].label }}</span>
      </div>
      <div>
        <el-icon color="#7c8087" size="20"><Phone /></el-icon>
        <span>{{ mercDetail.phoneNum }}</span>
      </div>
      <div>
        <el-icon color="#7c8087" size="20"><Message /></el-icon>
        <span>{{ mercDetail.mercEmail }}</span>
      </div>
    </span>
    <div style="text-align: center; margin-top: 20px">
      <el-button
        style="font-weight: bold; width: 100%"
        size="large"
        type="primary"
        @click="clickToMercDetail"
      >
        查看更多职位
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.merc-detail {
  width: 100%;
  // min-height: 600px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 24px;
  white-space: pre-wrap;

  .merc-detail-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 25px;
  }

  .merc-detail-message {
    div {
      font-size: 16px;
      margin-top: 16px;
      display: flex;
      align-items: center;
      color: #222222;

      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
