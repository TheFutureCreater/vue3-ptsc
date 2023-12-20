<script setup>
import { ref, watch, computed } from 'vue'
import { getJobListService } from '@/api/jobInfo'
import { useSearchStore } from '@/stores'
import jobForm from '@/assets/json/jobForm'

const searchStore = useSearchStore()
const jobList = ref([])
const jobTotal = ref(0)
const isloading = ref(false)

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
  (newValue) => {
    console.log('queryStart' + newValue)
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
</script>

<template>
  <div class="job-list">
    <el-container v-loading="isloading" class="job-list-container">
      <div class="job-info-box" v-for="(item, index) in jobList" :key="index">
        <div class="info-for-job">
          <span class="job-title">{{ item.title }}</span>

          <span class="job-wage">{{
            (item.minWages > 10 ? item.minWages / 10.0 + '万' : item.minWages + '千') +
            '-' +
            (item.maxWages > 10 ? item.maxWages / 10.0 + '万' : item.maxWages + '千')
          }}</span>
        </div>
        <div class="label-for-job">
          <span v-if="item.nature !== 1">
            {{ jobForm[0].info[item.nature].label }}
          </span>
          <span>{{ jobForm[4].info[item.category].label }}</span>
          <span>{{ jobForm[2].info[item.workAge].label }}</span>
          <span>{{ jobForm[1].info[item.degree].label }}</span>
          <span>{{ '招聘' + item.recruitNum + '人' }}</span>
        </div>
        <div class="merchant-title">
          <el-avatar shape="square" :size="30" :src="item.userAvatar" />
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
    </el-container>
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

    .job-info-box {
      width: 100%;
      height: 160px;
      background-color: #fff;
      border-radius: 10px;
      margin-bottom: 20px;
      transition: box-shadow 0.3s ease-in-out;
      padding: 10px 20px;
      cursor: pointer;

      .info-for-job {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .job-title {
          font-weight: bold;
          font-size: 20px;
        }

        .job-wage {
          font-weight: bold;
          font-size: 20px;
          color: #ff9900;
        }
      }

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
        margin-top: 5px;
      }
    }

    .job-info-box:hover {
      box-shadow: 0 0 10px rgba(150, 150, 150, 0.5);
    }
  }
}
</style>
