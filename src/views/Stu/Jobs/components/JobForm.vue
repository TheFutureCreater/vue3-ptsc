<script setup>
import { ref, onMounted } from 'vue'
import { useSearchStore } from '@/stores'
import jobFrom from '@/assets/json/jobFrom'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const searchStore = useSearchStore()
const form = ref([])
const mousePass = ref([])
// 初始化表单数据
onMounted(() => {
  // 0学历要求1职位性质2工作年限3薪资范围4职位类别5公司行业6公司性质7公司规模
  form.value = searchStore.jobFrom
})

// 点击筛选项事件
const clickInfo = (index1, valueNum) => {
  console.log('index1: ' + index1 + '///valueNum: ' + valueNum)
  if (Array.isArray(form.value[index1])) {
    if (valueNum === 1) {
      form.value[index1] = []
      return
    }
    if (!form.value[index1].includes(valueNum)) {
      form.value[index1].push(valueNum)
    } else {
      form.value[index1] = form.value[index1].filter((item) => item !== valueNum)
    }
  } else {
    if (valueNum === 1) {
      form.value[index1] = 0
    } else {
      form.value[index1] = valueNum
    }
  }
  console.log('form.value[' + index1 + ']: ' + form.value[index1])
}
</script>

<template>
  <div class="job-form">
    <span class="form-title">其他筛选</span>
    <div
      v-for="(item, index1) in jobFrom"
      :key="index1"
      class="form-item"
      @mouseenter="mousePass[index1] = true"
      @mouseleave="mousePass[index1] = false"
    >
      <div
        class="from-item-title"
        :id="
          Array.isArray(form[index1])
            ? form[index1].length === 0
              ? ''
              : 'have-been-selected'
            : form[index1] === 0
              ? ''
              : 'have-been-selected'
        "
      >
        <span>{{ item.title }}</span>
        <el-icon style="margin-left: 5px">
          <ArrowDown v-if="!mousePass[index1]" />
          <ArrowUp v-else />
        </el-icon>
      </div>
      <div class="down-all-box">
        <div class="down-infos-box" v-if="mousePass[index1]">
          <div
            class="down-info-item"
            v-for="(info, index2) in item.info"
            :key="index2"
            @click="clickInfo(index1, info.value)"
          >
            <span>{{ info.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.job-form {
  display: flex;
  align-items: center;

  .form-title {
    font-weight: bolder;
    font-size: large;
  }

  .form-item {
    width: 120px;
    height: 40px;
    color: #222222;
    margin-left: 5px;
    position: relative;
    font-size: 15px;
    cursor: pointer;

    .from-item-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      border-radius: 20px;
      background-color: #f5f6f7;
    }

    .down-all-box {
      position: absolute;
      transform-origin: top left;
      top: 100%;
      z-index: 997;
      // left: -50%;
      padding-top: 10px;
      cursor: auto;

      .down-infos-box {
        max-height: 302px;
        background-color: #fff;
        border: 1px solid #ebebeb;
        border-radius: 10px;
        overflow: auto;
        padding: 10px;

        .down-info-item {
          min-width: 160px;
          height: 40px;
          border-radius: 10px;
          line-height: 40px;
          cursor: pointer;
          white-space: nowrap; /* 将文本处理为单行 */
          overflow: hidden; /* 超出部分隐藏 */
          text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */

          span {
            margin-left: 10px;
            margin-right: 10px;
          }
        }

        .down-info-item:hover {
          background-color: #f5f6f7;
        }
      }
    }

    .down-infos-box::-webkit-scrollbar {
      width: 0px; /* 隐藏滚动条的宽度 */
    }
  }

  #have-been-selected:not(.down-all-box) {
    color: #409eff;
    background-color: #f2fbff;
  }
}
</style>
