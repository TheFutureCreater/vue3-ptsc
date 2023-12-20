<script setup>
import { ref, watch } from 'vue'
import { useSearchStore } from '@/stores'
import jobForm from '@/assets/json/jobForm'
import { ArrowUp, ArrowDown, Select, CloseBold } from '@element-plus/icons-vue'

const searchStore = useSearchStore()
const form = ref([])
const mousePass = ref([])
// 初始化表单数据
// 0职位性质 1学历要求 2工作年限 3薪资范围 4职位类别 5公司行业 6公司性质 7公司规模
form.value = searchStore.jobForm

// 点击筛选项事件
const clickInfo = (index1, valueNum) => {
  console.log('index1: ' + index1 + '///valueNum: ' + valueNum)
  if (Array.isArray(form.value[index1])) {
    if (valueNum === 1) {
      form.value[index1] = []
      return
    }
    if (!form.value[index1].includes(valueNum)) {
      if (form.value[index1].length === jobForm[index1].info.length - 2) {
        form.value[index1] = []
        return
      }
      if (form.value[index1].length === 6) {
        ElMessage.error('条件不能超过6个')
        return
      }
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

// 清空所有表单
const clearAllForm = () => {
  searchStore.reset()
  form.value = searchStore.jobForm
}

// 表单一经修改就重新请求
watch(form.value, () => {
  searchStore.startQuery()
})
</script>

<template>
  <div class="job-form">
    <span class="form-title">其他筛选</span>
    <div
      v-for="(item, index1) in jobForm"
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
        <span>{{
          Array.isArray(form[index1])
            ? form[index1].length === 0
              ? item.title
              : item.title + '(' + form[index1].length + ')'
            : form[index1] === 0
              ? item.title
              : jobForm[index1].info[form[index1] - 1].label
        }}</span>
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
            :id="
              (
                info.value === 1
                  ? Array.isArray(form[index1])
                    ? form[index1].length === 0
                    : form[index1] === 0
                  : Array.isArray(form[index1])
                    ? form[index1].includes(info.value)
                    : form[index1] === info.value
              )
                ? 'info-have-been-selected'
                : ''
            "
          >
            <span>
              {{ info.label }}
            </span>
            <el-icon size="20" color="#409eff" style="margin: 0 5px">
              <Select
                v-if="
                  info.value === 1
                    ? Array.isArray(form[index1])
                      ? form[index1].length === 0
                      : form[index1] === 0
                    : Array.isArray(form[index1])
                      ? form[index1].includes(info.value)
                      : form[index1] === info.value
                "
              />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
    <el-tooltip class="box-item" effect="light" content="清空选项" placement="bottom-end">
      <div class="clear-all-form" @click="clearAllForm">
        <el-icon>
          <CloseBold />
        </el-icon>
      </div>
    </el-tooltip>
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
      border-radius: 10px;
      background-color: #f5f6f7;

      span {
        text-align: center;
        width: 80px;
        white-space: nowrap; /* 将文本处理为单行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */
      }
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
          display: flex;
          align-items: center;
          justify-content: space-between;
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

        #info-have-been-selected {
          color: #409eff;
          background-color: #f2fbff;
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

  .clear-all-form {
    width: 40px;
    height: 40px;
    color: #222222;
    margin-left: 5px;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #f5f6f7;
  }
}
</style>
