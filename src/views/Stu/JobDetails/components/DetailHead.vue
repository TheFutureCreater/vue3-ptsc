<script setup>
import jobForm from '@/assets/json/jobForm.json'
import { inject } from 'vue'
import {
  Star,
  Message,
  Location,
  Suitcase,
  Grid,
  Coffee,
  School,
  UserFilled
} from '@element-plus/icons-vue'

const jobDetail = inject('jobDetail')

// 点击收藏职位按钮事件
const subscribeJob = () => {
  console.log('subscribeJob' + jobDetail.value.jobId)
}
</script>

<template>
  <div class="detail-head">
    <div class="container">
      <div class="job-info-main">
        <div class="job-info-detail">
          <span class="job-detail-title">
            <span class="job-title">{{ jobDetail.title }}</span>
            <span class="job-wage">
              {{
                (jobDetail.minWages > 10
                  ? jobDetail.minWages / 10.0 + '万'
                  : jobDetail.minWages + '千') +
                '-' +
                (jobDetail.maxWages > 10 ? jobDetail.maxWages / 10.0 + '万' : jobDetail.maxWages + '千')
              }}
            </span>
          </span>
          <div class="job-detail-labels">
            <span class="job-label">
              <el-icon size="18px"><Location /></el-icon>
              <span>{{ jobDetail.address }}</span>
            </span>
            <span class="job-label">
              <el-icon size="18px"><Suitcase /></el-icon>
              <span>{{ jobForm[0].info[jobDetail.nature] }}</span>
            </span>
            <span class="job-label">
              <el-icon size="18px"><Grid /></el-icon>
              <span>{{ jobForm[4].info[jobDetail.category] }}</span>
            </span>
            <span class="job-label">
              <el-icon size="18px"><Coffee /></el-icon>
              <span>{{ jobForm[2].info[jobDetail.workAge] }}</span>
            </span>
            <span class="job-label">
              <el-icon size="18px"><School /></el-icon>
              <span>{{ jobForm[1].info[jobDetail.degree] }}</span>
            </span>
            <span class="job-label">
              <el-icon size="18px"><UserFilled /></el-icon>
              <span>{{ '招聘' + jobDetail.recruitNum + '人' }}</span>
            </span>
          </div>
        </div>
        <div class="job-info-button">
          <el-button size="large" type="primary" :plain="true" @click.stop="subscribeJob()">
            <el-icon size="15"><Star /></el-icon>
            <span style="margin-left: 5px; font-size: 16px">收藏职位</span>
          </el-button>
          <el-button
            size="large"
            style="padding: 0 50px"
            type="primary"
            @click.stop="subscribeJob(item.jobId)"
          >
            <el-icon size="15"><Message /></el-icon>
            <span style="margin-left: 5px; font-size: 16px">投递简历</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-head {
  background-color: #fff;

  .container {
    .job-info-main {
      display: flex;
      margin: 30px 0;
      justify-content: space-between;
      width: 100%;

      .job-info-detail {
        width: 70%;

        .job-detail-title {
          font-weight: bold;
          font-size: 36px;
          display: flex;
          width: 100%;
          justify-content: space-between;

          .job-title {
            max-width: 550px;
          }

          .job-wage {
            color: #ff9900;
            width: 200px;
            text-align: end;
            white-space: nowrap; /* 将文本处理为单行 */
          }
        }

        .job-detail-labels {
          margin-top: 10px;
          display: flex;

          .job-label {
            display: flex;
            align-items: center;
            height: 30px;
            line-height: 30px;
            padding: 0px 8px;
            border-radius: 5px;
            background-color: #f5f6f7;
            color: #7c8087;
            font-size: 16px;
            margin-right: 10px;

            span {
              margin-left: 4px;
            }
          }
        }
      }

      .job-info-button {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
