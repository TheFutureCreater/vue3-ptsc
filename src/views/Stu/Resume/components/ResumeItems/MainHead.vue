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
  Edit
} from '@element-plus/icons-vue'
import { ref } from 'vue'
// import ItemContainer from '../ItemContainer.vue'
import FromContainer from '../FromContainer.vue'
import { calculateAge } from '@/utils/calculateAge'
import resumeStatic from '@/assets/json/resumeStatic.json'
defineProps({
  resumeData: {
    required: true,
    type: Object
  }
})

const modFromNum = ref(false)
const modDelButton = ref(false)
const modFromData = ref({}) // 表单绑定变量

const startModify = (data) => {
  modFromNum.value = true
  modFromData.value = data
}

// 取消添加或修改操作
const cancelEdit = () => {
  modFromNum.value = false
  modDelButton.value = false
  console.log('cancelEdit')
}

// 完成添加或修改操作
const overEdit = () => {
  modFromNum.value = false
  modDelButton.value = false
  console.log('overEdit')
}
</script>

<template>
  <FromContainer
    title="编辑个人资料"
    v-if="modFromNum === true"
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
          <el-input size="large" v-model="modFromData.email" clearable />
        </el-form-item>
      </div>
    </el-form>
  </FromContainer>
  <div class="main-head" v-else>
    <div class="head-left" @mouseenter="modDelButton = true" @mouseleave="modDelButton = false">
      <div class="head-name">{{ resumeData.realName }}</div>
      <br />
      <div class="head-label">
        <span class="label-age">
          <el-icon size="16"><Sunrise /></el-icon>
          <span>{{ calculateAge(resumeData.birthday) + '岁' }}</span>
        </span>
        <span class="label-sex">
          <el-icon><Female v-if="1" /><Male v-else /></el-icon>
          <span>{{ resumeData.sex === 1 ? '男' : '女' }}</span>
        </span>
        <span class="label-address">
          <el-icon><MapLocation /></el-icon>
          <span>{{ resumeData.address }}</span>
        </span>
        <span class="label-jobseek">
          <el-icon><Compass /></el-icon>
          <span>{{ resumeStatic.jobSeek[resumeData.jobSeek] }}</span>
        </span>
        <span class="label-politics">
          <el-icon><Star /></el-icon>
          <span>{{ resumeStatic.politics[resumeData.politics] }}</span>
        </span>
        <br />
        <br />
        <span class="label-phone">
          <el-icon><Phone /></el-icon>
          <span>{{ resumeData.phoneNum }}</span>
        </span>
        <span class="label-email">
          <el-icon><Message /></el-icon>
          <span> {{ resumeData.email }} </span>
        </span>
      </div>

      <el-button
        v-if="modDelButton === true"
        class="modify-button-only"
        @click="startModify(resumeData)"
        type="primary"
        text
        bg
      >
        <el-icon><Edit /></el-icon>
        <span>修改</span>
      </el-button>
    </div>

    <div class="head-right">
      <el-avatar :size="100" :src="resumeData.realAvatar" @error="true">
        <img />
      </el-avatar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
