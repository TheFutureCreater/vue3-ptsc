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
const emit = defineEmits(['refresh-info'])

const modFromNum = ref(false)
const modDelButton = ref([false, false, false])
const modFromData = ref([]) // 表单绑定变量
const isModify = ref(true) // 判断当前编辑是否为修改信息，否则为添加信息

const startModify = (data) => {
  isModify.value = true
  modFromNum.value = true
  modFromData.value = JSON.parse(JSON.stringify(data))
}

// 取消添加或修改操作
const cancelEdit = () => {
  modFromNum.value = false
  modDelButton.value = [false, false, false]
  console.log('cancelEdit')
}

// 完成添加或修改操作
const overEdit = async () => {
  modFromNum.value = false
  modDelButton.value = [false, false, false]
  console.log('overEdit is' + (isModify.value ? '修改' : '添加'))
  // if (isModify.value) {
  //   const rs = await setResumeDesireService(modFromData.value)
  //   if (rs.data.code === 1) ElMessage.success('修改成功')
  // } else {
  //   const rs = await addResumeDesireService(modFromData.value)
  //   if (rs.data.code === 1) ElMessage.success('添加成功')
  // }

  emit('refresh-info')
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

// 添加项目逻辑
const startAdd = () => {
  isModify.value = false
  modFromNum.value = true
  modFromData.value = {}
  console.log('startAdd')
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
          <el-form-item label="学校名称">
            <el-input size="large" v-model="modFromData.schoolName" clearable />
          </el-form-item>
          <el-form-item label="入学年月">
            <el-date-picker
              size="large"
              v-model="modFromData.enrollTime"
              type="month"
              placeholder="选择毕业年月"
            />
          </el-form-item>
        </div>
        <div class="from-right">
          <el-form-item label="专业名称">
            <el-input size="large" v-model="modFromData.majorName" clearable />
          </el-form-item>
          <el-form-item label="毕业年月">
            <el-date-picker
              size="large"
              v-model="modFromData.graduateTime"
              type="month"
              placeholder="选择毕业年月"
            />
          </el-form-item>
        </div>
      </div>
      <div style="padding: 0 12px">
        <el-form-item label="经历描述">
          <el-input size="large" v-model="modFromData.note" type="textarea" :rows="6" />
        </el-form-item>
      </div>
    </el-form>
  </FromContainer>
  <ItemContainer title="教育经历" :addItemNum="3" @getAddNum="startAdd">
    <div
      class="show-box"
      v-for="(item, index) in resumeData"
      :key="index"
      @mouseenter="modDelButton[index] = true"
      @mouseleave="modDelButton[index] = false"
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
        v-if="modDelButton[index] === true"
        class="modify-button"
        @click="startModify(item)"
        type="primary"
        text
        bg
      >
        <el-icon><Edit /></el-icon>
        <span>修改</span>
      </el-button>
      <el-button
        v-if="modDelButton[index] === true"
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

.title-word {
  font-weight: bold;
}

.show-box:hover {
  background-color: #f8f8f8;
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
