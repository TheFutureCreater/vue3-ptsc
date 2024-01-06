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
import FromContainer from './FromContainer.vue'
import { ref, watch } from 'vue'
import { getStuResumeService } from '@/api/resume'
import { calculateAge } from '@/utils/calculateAge'
import resumeStatic from '@/assets/json/resumeStatic.json'

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
  const res = await getStuResumeService(resumeId)
  resumeInfo.value = res.data.data
  console.log(resumeInfo.value)
}
getStuResume()

const addItemNum = ref(-1)
const startAdd = (num) => {
  isModify.value = false
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

// 取消添加或修改操作
const cancelEdit = () => {
  modFromNum.value = [
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
  ]
  console.log('cancelEdit')
}

// 完成添加或修改操作
const overEdit = () => {
  modFromNum.value = [
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
  ]
  console.log('overEdit')
}
</script>

<template>
  <div class="resume-main">
    <FromContainer
      title="编辑个人资料"
      v-if="modFromNum[0][0] === true"
      @cancel-edit="cancelEdit"
      @over-edit="overEdit"
    >
      <el-form :model="modFromData" label-position="top" class="from-input">
        <div class="from-left">
          <el-form-item label="姓名">
            <el-input size="large" v-model="modFromData.realName" clearable />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="modFromData.sex">
              <el-radio :label="1" size="large" border>&nbsp;&nbsp;男&nbsp;&nbsp;</el-radio>
              <el-radio :label="0" size="large" border>&nbsp;&nbsp;女&nbsp;&nbsp;</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-date-picker
              size="large"
              v-model="modFromData.birthday"
              type="month"
              placeholder="选择出生年月"
            />
          </el-form-item>
          <el-form-item label="出生地">
            <el-input size="large" v-model="modFromData.address" />
          </el-form-item>
        </div>
        <div class="from-right">
          <el-form-item label="当前求职状态">
            <el-select v-model="modFromData.jobSeek" placeholder="Select" size="large">
              <el-option
                v-for="(item, index) in resumeStatic.jobSeek"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select v-model="modFromData.politics" placeholder="Select" size="large">
              <el-option
                v-for="(item, index) in resumeStatic.politics"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input size="large" v-model="modFromData.phoneNum" disabled />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input size="large" v-model="modFromData.email" />
          </el-form-item>
        </div>
      </el-form>
    </FromContainer>
    <div class="main-head" v-else>
      <div
        class="head-left"
        @mouseenter="modDelButton[0][0] = true"
        @mouseleave="modDelButton[0][0] = false"
      >
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

        <el-button
          v-if="modDelButton[0][0] === true"
          class="modify-button-only"
          @click="startModify(0, 0, resumeInfo.resume)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
      </div>

      <div class="head-right">
        <el-avatar :size="100" :src="resumeInfo.resume.realAvatar" @error="true">
          <img />
        </el-avatar>
      </div>
    </div>

    <!-- <FromContainer
      :title="(1 ? '添加' : '编辑') + '个人优势'"
      v-if="modFromNum[0][0] === true"
      @cancelEdit="cancelEdit"
    ></FromContainer> -->
    <FromContainer
      title="编辑个人优势"
      v-if="modFromNum[1][0] === true"
      @cancel-edit="cancelEdit"
      @over-edit="overEdit"
    >
      <el-form :model="modFromData">
        <el-form-item>
          <el-input size="large" v-model="modFromData.note" type="textarea" :rows="6" />
        </el-form-item>
      </el-form>
    </FromContainer>
    <ItemContainer title="个人优势" :addItemNum="-1" v-else>
      <div
        class="show-box"
        @mouseenter="modDelButton[1][0] = true"
        @mouseleave="modDelButton[1][0] = false"
      >
        <span>{{ resumeInfo.resume.note }}</span>

        <el-button
          v-if="modDelButton[1][0] === true"
          class="modify-button-only"
          @click="startModify(1, 0, resumeInfo.resume)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
      </div>
    </ItemContainer>

    <FromContainer
      :title="(isModify ? '编辑' : '添加') + 期望职位"
      v-if="modFromNum[2][0] === true"
      @cancel-edit="cancelEdit"
      @over-edit="overEdit"
    >
      <el-form :model="modFromData" label-position="top" class="from-input">
        <div class="from-left">
          <el-form-item label="期望职位">
            <el-input size="large" v-model="modFromData.realName" clearable />
          </el-form-item>
          <el-form-item label="薪资范围">
            <el-row justify="space-between">
              <el-col :span="13">
                <el-input-number v-model="modFromData.minWages" /><span>k-</span>
              </el-col>
              <el-col :span="11">
                <span>
                  <el-input-number v-model="modFromData.maxWages" />
                </span>
                <span>k</span></el-col
              >
            </el-row>
          </el-form-item>
        </div>
        <div class="from-right">
          <el-form-item label="期望城市">
            <el-input size="large" v-model="modFromData.email" />
          </el-form-item>
        </div>
      </el-form>
    </FromContainer>
    <ItemContainer title="期望职位" :addItemNum="2" @getAddNum="startAdd" v-else>
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.desire"
        :key="index"
        @mouseenter="modDelButton[2][index] = true"
        @mouseleave="modDelButton[2][index] = false"
      >
        <span class="title-word">{{ item.desireJob }}</span>
        <el-divider direction="vertical" />
        <span>{{
          (item.minWages > 10 ? item.minWages / 10.0 + '万' : item.minWages + '千') +
          '-' +
          (item.maxWages > 10 ? item.maxWages / 10.0 + '万' : item.maxWages + '千')
        }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.address }}</span>

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

    <ItemContainer title="教育经历" :addItemNum="3" @getAddNum="startAdd">
      <div
        class="show-box"
        v-for="(item, index) in resumeInfo.education"
        :key="index"
        @mouseenter="modDelButton[3][index] = true"
        @mouseleave="modDelButton[3][index] = false"
      >
        <span class="title-word">{{ item.schoolName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.majorName }}</span>
        <el-divider direction="vertical" />
        <span>{{ item.enrollTime + ' 至 ' + item.graduateTime }}</span>
        <span v-if="item.studyAbroad === 1">
          <el-divider direction="vertical" />
          <span>{{ '留学' }}</span>
        </span>
        <div class="note-title-box">
          <span>经历描述：</span>
          <span>{{ item.note }}</span>
        </div>

        <el-button
          v-if="modDelButton[3][index] === true"
          class="modify-button"
          @click="startModify(3, index, item)"
          type="primary"
          text
          bg
        >
          <el-icon><Edit /></el-icon>
          <span>修改</span>
        </el-button>
        <el-button
          v-if="modDelButton[3][index] === true"
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

  .main-head {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    margin-top: 10px;

    .head-left {
      padding: 12px;
      margin-right: 10px;
      border-radius: 10px;
      position: relative;
      width: 100%;

      .modify-button-only {
        position: absolute;
        top: 5px;
        right: 12px;
      }

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

    .head-left:hover {
      background-color: #f8f8f8;
    }

    .head-right {
      display: flex;
      align-items: center;
    }
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

    .from-left {
      width: 50%;
      padding: 0 12px;
    }

    .from-right {
      width: 50%;
      padding: 0 12px;
    }
  }
}
</style>
