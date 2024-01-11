<script setup>
import { Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ItemContainer from '../ItemContainer.vue'
import FromContainer from '../FromContainer.vue'
defineProps({
  resumeData: {
    required: true,
    type: String
  }
})

const modFromNum = ref(false)
const modDelButton = ref(false)
const modFromData = ref('') // 表单绑定变量

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
    title="编辑个人优势"
    v-if="modFromNum === true"
    @cancel-edit="cancelEdit"
    @over-edit="overEdit"
  >
    <el-form :model="modFromData">
      <el-form-item>
        <el-input size="large" v-model="modFromData" type="textarea" :rows="6" />
      </el-form-item>
    </el-form>
  </FromContainer>
  <ItemContainer title="个人优势" :addItemNum="-1" v-else>
    <div class="show-box" @mouseenter="modDelButton = true" @mouseleave="modDelButton = false">
      <span>{{ resumeData }}</span>

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
