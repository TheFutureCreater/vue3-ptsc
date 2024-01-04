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
import { ref, watch } from 'vue'
import { getStuResumeService } from '@/api/resume'
import { calculateAge } from '@/utils/calculateAge'
import resumeStatic from '@/assets/json/resumeStatic.json'

// 简历信息
const resumeInfo = ref({
  resume: {},
  desire: [],
  education: [],
  occupation: [],
  organization: [],
  project: [],
  skill: [],
  work: [],
  credential: []
})

const getStuResume = async (resumeId) => {
  const res = await getStuResumeService(resumeId)
  resumeInfo.value = res.data.data
  console.log(resumeInfo.value)
}
getStuResume()

const addItemNum = ref(0)
const startAdd = (num) => {
  addItemNum.value = num
}
const overAdd = () => {
  addItemNum.value = 0
}

watch(addItemNum, (newValue) => {
  console.log(newValue)
})

const modifyFromNum = ref(0)
const modifyFromData = ref()
const startModify = (num, data) => {
  modifyFromNum.value = num
  modifyFromData.value = data
}
</script>

<template>
  <div class="resume-main">
    <div class="main-head">
      <div class="head-left">
        <div class="head-name">{{ resumeInfo.resume.realName }}</div>
        <br />
        <div class="head-label">
          <span class="label-age">
            <el-icon size="16"><Sunrise /></el-icon>
            <span>{{ calculateAge(resumeInfo.resume.birthday) + '岁' }}</span>
          </span>
          <span class="label-sex">
            <el-icon><Female v-if="1" /><Male v-else /></el-icon>
            <span>{{ resumeInfo.resume.sex === 1 ? '男' : '女' }}</span>
          </span>
          <span class="label-address">
            <el-icon><MapLocation /></el-icon>
            <span>{{ resumeInfo.resume.address }}</span>
          </span>
          <span class="label-jobseek">
            <el-icon><Compass /></el-icon>
            <span>{{ resumeStatic.jobSeek[resumeInfo.resume.jobSeek] }}</span>
          </span>
          <span class="label-politics">
            <el-icon><Star /></el-icon>
            <span>{{ resumeStatic.politics[resumeInfo.resume.politics] }}</span>
          </span>
          <br />
          <br />
          <span class="label-phone">
            <el-icon><Phone /></el-icon>
            <span>{{ resumeInfo.resume.phoneNum }}</span>
          </span>
          <span class="label-email">
            <el-icon><Message /></el-icon>
            <span> {{ resumeInfo.resume.email }} </span>
          </span>
        </div>
      </div>

      <div class="head-right">
        <el-avatar :size="100" :src="resumeInfo.resume.realAvatar" @error="true">
          <img />
        </el-avatar>
      </div>
    </div>

    <div class="from-input" v-if="modifyFromNum === 1"></div>
    <ItemContainer title="个人优势" :addItemNum="0" v-else>
      <div class="content-show">
        {{ '擅长领域：动手能力强\n教育背景：嵌入式软件开发\n专业技能：电子产品\n相关经验：通信协议' }}
      </div>
    </ItemContainer>

    <ItemContainer title="期望职位" :addItemNum="2" @getAddNum="startAdd">
      <div class="content-show">
        {{ '擅长领域：动手能力强\n教育背景：嵌入式软件开发\n专业技能：电子产品\n相关经验：通信协议' }}
      </div>
    </ItemContainer>

    <ItemContainer title="教育经历" :addItemNum="3" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="实习/工作经历" :addItemNum="4" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="社团/组织经历" :addItemNum="5" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="项目经历" :addItemNum="6" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="个人作品" :addItemNum="7" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="资格证书" :addItemNum="8" @getAddNum="startAdd"></ItemContainer>
  </div>
</template>

<style lang="scss" scoped>
.resume-main {
  display: flex;
  flex-direction: column;
  // padding: 20px 30px;

  .main-head {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px 0 30px;

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

    // .head-right {
    // }
  }

  .from-input {
  }
}
</style>
