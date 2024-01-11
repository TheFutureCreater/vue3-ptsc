<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import ItemContainer from './ItemContainer.vue'
import { ref, watch } from 'vue'
import { getStuResumeService } from '@/api/resume'
// import resumeStatic from '@/assets/json/resumeStatic.json'
import MainHead from './ResumeItems/MainHead.vue'
import MainNote from './ResumeItems/MainNote.vue'
import ResumeDesire from './ResumeItems/ResumeDesire.vue'

const businessStatic = [
  '不限',
  '互联网/通信/电子',
  '金融',
  '生产/加工/制造',
  '制药/医疗',
  '广告/传媒/文化/体育',
  '教育',
  '房地产/建筑业',
  '贸易/工艺/消费品',
  '能源/矿产',
  '物流/运输',
  '服务业',
  '政府/非盈利机构/其他'
]

const skillMasterStatic = ['一般', '良好', '熟练', '精通']

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
const startAdd = (num) => {
  isModify.value = false
  addItemNum.value = num
}

watch(addItemNum, (newValue) => {
  console.log(newValue)
})

const modFromNum = ref([
  [false],
  [false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false],
  [false, false, false]
])

const isModify = ref(true) // 判断当前编辑是否为修改信息，否则为添加信息
const modFromData = ref({}) // 表单绑定变量
const startModify = (num1, num2, data) => {
  isModify.value = true
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
  [false],
  [false, false, false],
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
    <MainHead :resumeData="resumeInfo.resume" @refresh-info="getStuResume" />
    <MainNote :resumeData="{ note: resumeInfo.resume.note }" @refresh-info="getStuResume" />
    <ResumeDesire :resumeData="resumeInfo.desire" @refresh-info="getStuResume" />

    <!-- <FromContainer
      :title="(1 ? '添加' : '编辑') + '个人优势'"
      v-if="modFromNum[0][0] === true"
      @cancelEdit="cancelEdit"
    ></FromContainer> -->

    <ItemContainer title="实习/工作经历" :addItemNum="4" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.occupation"
        :key="index"
        @mouseenter="modDelButton[4][index] = true"
        @mouseleave="modDelButton[4][index] = false"
      >
        <span class="title-word">{{ item.mercName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.job }}</span>
        <el-divider direction="vertical" />
        <span>{{ businessStatic[item.business] }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.entryTime + ' 至 ' + item.quitTime }}</span>
        <div class="note-title-box">
          <span>经历描述：</span>
          <span>{{ item.note }}</span>
        </div>

        <el-button
          v-if="modDelButton[4][index] === true"
          class="modify-button"
          @click="startModify(4, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[4][index] === true"
          class="delete-button"
          @click="startDelete(item.occupationId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="社团/组织经历" :addItemNum="5" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.organization"
        :key="index"
        @mouseenter="modDelButton[5][index] = true"
        @mouseleave="modDelButton[5][index] = false"
      >
        <span class="title-word">{{ item.orgName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.role }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.entryTime + ' 至 ' + item.quitTime }}</span>
        <div class="note-title-box">
          <span>经历描述：</span>
          <span>{{ item.note }}</span>
        </div>

        <el-button
          v-if="modDelButton[5][index] === true"
          class="modify-button"
          @click="startModify(5, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[5][index] === true"
          class="delete-button"
          @click="startDelete(item.organizationId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="项目经验" :addItemNum="6" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.project"
        :key="index"
        @mouseenter="modDelButton[6][index] = true"
        @mouseleave="modDelButton[6][index] = false"
      >
        <span class="title-word">{{ item.proName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.entryTime + ' 至 ' + item.quitTime }}</span>
        <div class="note-title-box">
          <span>项目描述：</span>
          <span>{{ item.note }}</span>
        </div>

        <el-button
          v-if="modDelButton[6][index] === true"
          class="modify-button"
          @click="startModify(6, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[6][index] === true"
          class="delete-button"
          @click="startDelete(item.projectId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="技能/语言能力" :addItemNum="7" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.skill"
        :key="index"
        @mouseenter="modDelButton[7][index] = true"
        @mouseleave="modDelButton[7][index] = false"
      >
        <span class="title-word">{{ item.skill }}</span>
        <el-divider direction="vertical" />
        <span>{{ skillMasterStatic[item.mastery] }}</span>

        <el-button
          v-if="modDelButton[7][index] === true"
          class="modify-button"
          @click="startModify(7, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[7][index] === true"
          class="delete-button"
          @click="startDelete(item.organizationId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="个人作品" :addItemNum="8" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.work"
        :key="index"
        @mouseenter="modDelButton[8][index] = true"
        @mouseleave="modDelButton[8][index] = false"
      >
        <span class="title-word">{{ item.workName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.url }}</span>
        <div class="note-title-box">
          <span>作品描述：</span>
          <span>{{ item.note }}</span>
        </div>

        <el-button
          v-if="modDelButton[8][index] === true"
          class="modify-button"
          @click="startModify(8, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[8][index] === true"
          class="delete-button"
          @click="startDelete(item.organizationId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>

    <ItemContainer title="资格证书" :addItemNum="9" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.credential"
        :key="index"
        @mouseenter="modDelButton[9][index] = true"
        @mouseleave="modDelButton[9][index] = false"
      >
        <span class="title-word">{{ item.creName }}</span>

        <el-button
          v-if="modDelButton[9][index] === true"
          class="modify-button"
          @click="startModify(9, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[9][index] === true"
          class="delete-button"
          @click="startDelete(item.credentialId)"
          type="primary"
          text
          bg
        >
          <el-icon><Delete /></el-icon>
          <span>删除</span>
        </el-button>
      </div>
    </ItemContainer>
  </div>
</template>

<style lang="scss" scoped>
.resume-main {
  display: flex;
  flex-direction: column;

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
