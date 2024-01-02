<script setup>
import {
  Sunrise,
  Female,
  Male,
  MapLocation,
  Compass,
  Star,
  Phone,
  Message
} from '@element-plus/icons-vue'
import ItemContainer from './ItemContainer.vue'
</script>

<template>
  <div class="resume-main">
    <div class="main-head">
      <div class="head-left">
        <div class="head-name">程艾影</div>
        <br />
        <div class="head-label">
          <span class="label-age">
            <el-icon size="16"><Sunrise /></el-icon>
            <span>{{ '18岁' }}</span>
          </span>
          <span class="label-sex">
            <el-icon><Female v-if="1" /><Male v-else /></el-icon>
            <span>{{ 1 ? '男' : '女' }}</span>
          </span>
          <span class="label-address">
            <el-icon><MapLocation /></el-icon>
            <span>{{ '成都市' }}</span>
          </span>
          <span class="label-jobseek">
            <el-icon><Compass /></el-icon>
            <span>{{ '在校-暂不考虑' }}</span>
          </span>
          <span class="label-politics">
            <el-icon><Star /></el-icon>
            <span>{{ '普通民众' }}</span>
          </span>
          <br />
          <br />
          <span class="label-phone">
            <el-icon><Phone /></el-icon>
            <span>{{ '18354795461' }}</span>
          </span>
          <span class="label-email">
            <el-icon><Message /></el-icon>
            <span> {{ 'futurecreaterlan@foxmail.com' }} </span>
          </span>
        </div>
      </div>

      <div class="head-right">
        <el-avatar :size="100" :src="circleUrl" @error="true">
          <img />
        </el-avatar>
      </div>
    </div>

    <ItemContainer title="个人优势">
      <div class="item-note">
        {{ '擅长领域：动手能力强\n教育背景：嵌入式软件开发\n专业技能：电子产品\n相关经验：通信协议' }}
      </div>
    </ItemContainer>
    <ItemContainer title="期望职位"></ItemContainer>
  </div>
</template>

<style lang="scss" scoped>
.resume-main {
  height: 1600px;
  display: flex;
  flex-direction: column;
  padding: 20px 30px;

  .main-head {
    display: flex;
    justify-content: space-between;
    .head-left {
      width: 640px;
      .head-name {
        font-weight: bold;
        font-size: 26px;
      }

      .head-label {
        span {
          position: relative;
          font-size: 15px;
          margin-right: 10px;
          white-space: nowrap; /* 将文本处理为单行 */
          overflow: hidden; /* 超出部分隐藏 */
          text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */

          i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }

          span {
            margin-left: 20px;
          }
        }
      }
    }

    .head-right {
    }
  }
}
</style>
