<script setup>
import { ref, watch } from 'vue'
import { getStuResumeService } from '@/api/resume'
import MainHead from './ResumeItems/MainHead.vue'
import MainNote from './ResumeItems/MainNote.vue'
import ResumeDesire from './ResumeItems/ResumeDesire.vue'
import ResumeEducation from './ResumeItems/ResumeEducation.vue'
import ResumeOccupation from './ResumeItems/ResumeOccupation.vue'
import ResumeOrganization from './ResumeItems/ResumeOrganization.vue'
import ResumeProject from './ResumeItems/ResumeProject.vue'

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
  const loadingInstance = ElLoading.service()
  const res = await getStuResumeService(resumeId)
  resumeInfo.value = res.data.data
  console.log(res.data)
  loadingInstance.close()
}
getStuResume()

const addItemNum = ref(-1)

watch(addItemNum, (newValue) => {
  console.log(newValue)
})

// const isModify = ref(true) // 判断当前编辑是否为修改信息，否则为添加信息
// const modFromData = ref({}) // 表单绑定变量
// const startModify = (num1, num2, data) => {
//   isModify.value = true
//   modFromNum.value[num1][num2] = true
//   modFromData.value = data
// }
// const startDelete = async (id) => {
//   console.log(id)
//   await ElMessageBox.confirm('你确认要删除该信息么', '温馨提示', {
//     type: 'warning',
//     confirmButtonText: '确认',
//     cancelButtonText: '取消'
//   }).catch(() => {
//     return
//   })
// }
</script>

<template>
  <div class="resume-main">
    <MainHead :resumeData="resumeInfo.resume" @refresh-info="getStuResume" />
    <MainNote :resumeData="{ note: resumeInfo.resume.note }" @refresh-info="getStuResume" />
    <ResumeDesire :resumeData="resumeInfo.desire" @refresh-info="getStuResume" />
    <ResumeEducation :resumeData="resumeInfo.education" @refresh-info="getStuResume" />
    <ResumeOccupation :resumeData="resumeInfo.occupation" @refresh-info="getStuResume" />
    <ResumeOrganization :resumeData="resumeInfo.organization" @refresh-info="getStuResume" />
    <ResumeProject :resumeData="resumeInfo.project" @refresh-info="getStuResume" />
  </div>
</template>

<style lang="scss" scoped>
.resume-main {
  display: flex;
  flex-direction: column;
  padding: 10px 0;

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

  .title-word {
    font-weight: bold;
  }

  .note-title-box {
    display: flex;

    span:first-child {
      white-space: nowrap;
    }
  }

  .from-input {
    display: flex;
    padding: 0 12px;

    .from-left {
      width: 50%;
      margin-right: 12px;
    }

    .from-right {
      width: 50%;
      margin-left: 12px;
    }
  }
}
</style>
