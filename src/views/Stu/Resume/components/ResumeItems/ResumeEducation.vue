<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ItemContainer from '../ItemContainer.vue'
import FromContainer from '../FromContainer.vue'
defineProps({
  resumeData: {
    required: true,
    type: Array
  }
})

const modFromNum = ref(false)
const modDelButton = ref([false, false, false])
const modFromData = ref([]) // 表单绑定变量

const startModify = (data) => {
  modFromNum.value = true
  modFromData.value = data
}

// 取消添加或修改操作
const cancelEdit = () => {
  modFromNum.value = false
  modDelButton.value = [false, false, false]
  console.log('cancelEdit')
}

// 完成添加或修改操作
const overEdit = () => {
  modFromNum.value = false
  modDelButton.value = [false, false, false]
  console.log('overEdit')
}

// 点击删除按钮
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
</script>

<template>
  <FromContainer
    :title="(isModify ? '编辑' : '添加') + '教育经历'"
    v-if="modFromNum === true"
    @cancel-edit="cancelEdit"
    @over-edit="overEdit"
  >
    <el-form :model="modFromData" label-position="top">
      <div class="from-input">
        <div class="from-left">
          <el-form-item label="期望职位">
            <el-input size="large" v-model="modFromData.realName" clearable />
          </el-form-item>
        </div>
        <div class="from-right">
          <el-form-item label="期望城市">
            <el-input size="large" v-model="modFromData.email" />
          </el-form-item>
        </div>
      </div>
      <div class="from-input">
        <el-form-item label="薪资范围">
          <el-col :span="13">
            <el-input-number v-model="modFromData.minWages" />
            <span>k-</span>
          </el-col>
          <el-col :span="13">
            <span>
              <el-input-number v-model="modFromData.maxWages" />
            </span>
            <span>k</span>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
  </FromContainer>
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
</template>

<style lang="scss" scoped>
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
</style>
