<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ItemContainer from '../ItemContainer.vue'
import FromContainer from '../FromContainer.vue'
import { setResumeDesireService, addResumeDesireService } from '@/api/resume'
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
  modFromData.value = data
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
  if (isModify.value) {
    const rs = await setResumeDesireService(modFromData.value)
    if (rs.data.code === 1) ElMessage.success('修改成功')
  } else {
    const rs = await addResumeDesireService(modFromData.value)
    if (rs.data.code === 1) ElMessage.success('添加成功')
  }

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
    :title="(isModify ? '编辑' : '添加') + '期望职位'"
    v-if="modFromNum === true"
    @cancel-edit="cancelEdit"
    @over-edit="overEdit"
  >
    <el-form :model="modFromData" label-position="top">
      <div class="from-input">
        <div class="from-left">
          <el-form-item label="期望职位">
            <el-input size="large" v-model="modFromData.desireJob" clearable />
          </el-form-item>
          <el-form-item label="最低薪资（单位：千）">
            <el-input-number v-model="modFromData.minWages" />
          </el-form-item>
        </div>
        <div class="from-right">
          <el-form-item label="期望城市">
            <el-input size="large" v-model="modFromData.address" />
          </el-form-item>
          <el-form-item label="最高薪资（单位：千）">
            <el-input-number v-model="modFromData.maxWages" />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </FromContainer>
  <ItemContainer title="期望职位" :addItemNum="2" @getAddNum="startAdd" v-else>
    <div
      class="show-box"
      v-for="(item, index) in resumeData"
      :key="index"
      @mouseenter="modDelButton[index] = true"
      @mouseleave="modDelButton[index] = false"
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
</template>

<style lang="scss" scoped>
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
