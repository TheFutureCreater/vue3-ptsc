<script setup>
import { ref, watch, computed } from 'vue'
import { getJobListService } from '@/api/jobInfo'
import { useSearchStore } from '@/stores'
import jobForm from '@/assets/json/jobForm.json'
import { Star, Message } from '@element-plus/icons-vue'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const searchStore = useSearchStore()
const jobList = ref([])
const jobTotal = ref(0)
const isloading = ref(false)
const hoverJobBox = ref(-1)

// 分页查找数据
const pageData = ref({
  pageNum: 1,
  pageSize: 10,
  mercId: '',
  searchWord: '',
  cityId: 0,
  jobForm: []
})
pageData.value.searchWord = computed(() => {
  return searchStore.searchWord
})
pageData.value.cityId = computed(() => {
  return searchStore.cityId
})
pageData.value.jobForm = computed(() => {
  return searchStore.jobForm
})

// 重新请求
watch(
  computed(() => {
    return searchStore.queryStart
  }),
  () => {
    getJobList()
  }
)

// 请求数据
const getJobList = async () => {
  isloading.value = true
  const res = await getJobListService(pageData.value)
  jobList.value = res.data.data.records
  jobTotal.value = res.data.data.total
  isloading.value = false
}
getJobList()

// 每页显示数量改变
const handleSizeChange = () => {
  console.log(pageData.value.pageSize)
  getJobList()
}

// 页码发生变化
const handleCurrentChange = () => {
  console.log(pageData.value.pageNum)
  getJobList()
}

//点击相应职位盒子事件
const clickJobBox = (jobId) => {
  window.open(window.location.origin + `/stu/jobdetails?id=${jobId}`)
}

// 点击收藏职位按钮事件
const subscribeJob = (jobId) => {
  console.log('subscribeJob' + jobId)
}
</script>

<template>
  <div class="job-list">
    <div class="job-list-container">
      <div v-if="isloading" class="job-info-skeleton">
        <el-skeleton :rows="5" animated /><br /><br />
        <el-skeleton :rows="5" animated /><br /><br />
        <el-skeleton :rows="5" animated />
      </div>
      <div
        v-else
        class="job-info-box"
        v-for="(item, index) in jobList"
        :key="index"
        @mouseover="hoverJobBox = index"
        @mouseleave="hoverJobBox = -1"
        @click="clickJobBox(item.jobId)"
      >
        <div class="info-for-job">
          <span class="job-title">{{ item.title }}</span>

          <span class="job-wage">{{
            (item.minWages > 10 ? item.minWages / 10.0 + '万' : item.minWages + '千') +
            '-' +
            (item.maxWages > 10 ? item.maxWages / 10.0 + '万' : item.maxWages + '千')
          }}</span>
        </div>
        <div class="info-bottom">
          <div class="info-bottom-left">
            <div class="label-for-job">
              <span>{{ item.address }}</span>
              <span v-if="item.nature !== 1">
                {{ jobForm[0].info[item.nature].label }}
              </span>
              <span>{{ jobForm[4].info[item.category].label }}</span>
              <span>{{ jobForm[2].info[item.workAge].label }}</span>
              <span>{{ jobForm[1].info[item.degree].label }}</span>
              <span>{{ '招聘' + item.recruitNum + '人' }}</span>
            </div>
            <div class="merchant-title">
              <el-avatar shape="square" :size="32" :src="item.userAvatar" />
              <span class="merc-name">{{ item.mercName }}</span>
              <span class="merc-label">{{ jobForm[6].info[item.mercNature].label }}</span>
              <span style="color: #d5d5d5">|</span>
              <span class="merc-label">{{ jobForm[5].info[item.mercBusiness].label }}</span>
              <span style="color: #d5d5d5">|</span>
              <span class="merc-label">{{ jobForm[7].info[item.mercScale].label }}</span>
            </div>
          </div>
          <div class="info-bottom-right-button" v-if="hoverJobBox === index">
            <el-button type="primary" :text="true" @click.stop="subscribeJob(item.jobId)">
              <el-icon size="12"><Star /></el-icon>
              <span style="margin-left: 5px; font-size: 15px">收藏职位</span>
            </el-button>
            <el-button style="margin-top: 8px" type="primary" @click.stop="subscribeJob(item.jobId)">
              <el-icon size="12"><Message /></el-icon>
              <span style="margin-left: 5px; font-size: 15px">投递简历</span>
            </el-button>
          </div>
        </div>
      </div>

      <el-pagination
        v-model:current-page="pageData.pageNum"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[10, 15, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="jobTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.job-list {
  width: 100%;

  .job-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 600px;

    .job-info-skeleton {
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 20px;
      transition: box-shadow 0.3s ease-in-out;
      padding: 20px 30px;
    }

    .job-info-box {
      width: 100%;
      min-height: 160px;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 20px;
      transition: box-shadow 0.3s ease-in-out;
      padding: 20px 30px;
      cursor: pointer;

      .info-for-job {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 30px;

        .job-title {
          font-weight: bold;
          font-size: 20px;
          max-width: 600px;
          white-space: nowrap; /* 将文本处理为单行 */
          overflow: hidden; /* 超出部分隐藏 */
          text-overflow: ellipsis; /* 使用省略号表示被截断的文本 */
        }

        .job-wage {
          font-weight: bold;
          font-size: 20px;
          color: #ff9900;
        }
      }

      .info-bottom {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 90px;

        .info-bottom-left {
          .label-for-job {
            margin-top: 5px;

            span {
              display: inline-block;
              height: 30px;
              line-height: 30px;
              padding: 0px 8px;
              border-radius: 5px;
              background-color: #f5f6f7;
              color: #7c8087;
              font-size: 16px;
              margin-right: 8px;
            }
          }

          .merchant-title {
            display: flex;
            align-items: center;
            margin-top: 20px;

            .merc-name {
              font-weight: bold;
              font-size: 16px;
              margin: 0 0 0 10px;
              max-width: 240px;
            }

            .merc-label {
              display: inline-block;
              height: 30px;
              line-height: 30px;
              border-radius: 5px;
              font-size: 14px;
              margin: 0 8px;
            }
          }
        }

        .info-bottom-right-button {
          display: flex;
          flex-direction: column;
          align-items: end;
          justify-content: end;
          width: 100px;
          height: 100%;
          padding-top: 5px;
        }
      }
    }

    .job-info-box:hover {
      box-shadow: 0 0 10px rgba(150, 150, 150, 0.5);
    }
  }
}
</style>
