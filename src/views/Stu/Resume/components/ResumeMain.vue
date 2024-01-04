<script setup>
import {
  Sunrise,
  Female,
  Male,
  MapLocation,
  Compass,
  Star,
  Phone,
  Message,
  Edit,
  Delete
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

const addItemNum = ref(-1)
const startAdd = (num) => {
  addItemNum.value = num
}
const overAdd = () => {
  addItemNum.value = 0
}

watch(addItemNum, (newValue) => {
  console.log(newValue)
})

const modFromNum = ref([
  [false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false]
])
const modFromData = ref()
const startModify = (num1, num2, data) => {
  modFromNum.value[num1][num2] = true
  modFromData.value = data
}
const startDelete = async (id) => {
  console.log(id)
  await ElMessageBox.confirm('你确认要删除该信息么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).catch(() => {
    return
  })
}

// 每个子盒子中修改和删除按钮显示与否
const modDelButton = ref([
  [false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false]
])
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

    <div class="from-input" v-if="modFromNum[0][0] === true"></div>
    <ItemContainer title="个人优势" :addItemNum="-1" v-else>
      <div
        class="show-box"
        @mouseenter="modDelButton[0][0] = true"
        @mouseleave="modDelButton[0][0] = false"
      >
        <span>{{ resumeInfo.resume.note }}</span>
        <el-button
          v-if="modDelButton[0][0] === true"
          class="modify-button-only"
          @click="startModify(0, 0, resumeInfo.resume.note)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="期望职位" :addItemNum="1" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.desire"
        :key="index"
        @mouseenter="modDelButton[1][index] = true"
        @mouseleave="modDelButton[1][index] = false"
      >
        <span>{{ item.desireJob }}</span>
        <el-divider direction="vertical" />
        <span>{{
          (item.minWages > 10 ? item.minWages / 10.0 + '万' : item.minWages + '千') +
          '-' +
          (item.maxWages > 10 ? item.maxWages / 10.0 + '万' : item.maxWages + '千')
        }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.address }}</span>
        <el-button
          v-if="modDelButton[1][index] === true"
          class="modify-button"
          @click="startModify(1, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[1][index] === true"
          class="delete-button"
          @click="startDelete(item.desireId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="教育经历" :addItemNum="2" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.education"
        :key="index"
        @mouseenter="modDelButton[2][index] = true"
        @mouseleave="modDelButton[2][index] = false"
      >
        <span>{{ item.schoolName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.majorName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.enrollName + ' 至 ' + item.graduateName }}</span>
        <span v-if="item.studyAbroad === 1">
          <el-divider direction="vertical" />
          <span>{{ '留学' }}</span>
        </span>
        <div>{{ item.note }}</div>
        <el-button
          v-if="modDelButton[2][index] === true"
          class="modify-button"
          @click="startModify(2, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[2][index] === true"
          class="delete-button"
          @click="startDelete(item.educationId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="实习/工作经历" :addItemNum="3" @getAddNum="startAdd">
      <div class="show-box"></div>
    </ItemContainer>

    <ItemContainer title="社团/组织经历" :addItemNum="4" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="项目经历" :addItemNum="5" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="个人作品" :addItemNum="6" @getAddNum="startAdd"></ItemContainer>

    <ItemContainer title="资格证书" :addItemNum="7" @getAddNum="startAdd"></ItemContainer>
  </div>
</template>

<style lang="scss" scoped>
.resume-main {
  display: flex;
  flex-direction: column;

  .main-head {
    display: flex;
    justify-content: space-between;
    padding: 20px 36px 0 36px;

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

  // .from-input {
  // }

  .show-box {
    padding: 10px 12px;
    border-radius: 10px;
    position: relative;

    .modify-button-only {
      position: absolute;
      top: 5px;
      right: 12px;
    }

    .modify-button {
      position: absolute;
      top: 5px;
      right: 95px;
    }

    .delete-button {
      position: absolute;
      top: 5px;
      right: 12px;
    }
  }

  .show-box:hover {
    background-color: #f8f8f8;
  }
}
</style>
