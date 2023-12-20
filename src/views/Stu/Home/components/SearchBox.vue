<script setup>
import { Search, Location, CloseBold } from '@element-plus/icons-vue'
import { ref, computed, watch, onMounted } from 'vue'
import { useSearchStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchStore = useSearchStore()
const selectShow = ref(false)
const inputMessage = ref('')

// 接收城市盒子的信息
const cityId = computed(() => {
  return searchStore.cityId
})
console.log(cityId.value)
const cityName = computed(() => {
  return searchStore.cityName
})

onMounted(() => {
  inputMessage.value = searchStore.searchWord
})

watch(
  computed(() => {
    return searchStore.searchWord
  }),
  (newValue) => {
    console.log('watch+computed')
    inputMessage.value = newValue
  }
)

// 搜索按钮点击事件
const clickSearchButton = () => {
  const url = router.currentRoute.value.path
  console.log(url)
  if (url === '/stu/jobs') {
    console.log('is ' + url)
    searchStore.setSearchWord(inputMessage.value)
    searchStore.startQuery()
  } else {
    searchStore.setSearchWord(inputMessage.value) // 跳转前获取搜索关键字
    router.push('/stu/jobs')
  }
}

// 清除输入框事件
const clearInput = () => {
  searchStore.setSearchWord('')
}
</script>

<template>
  <CityBox :selectShow="selectShow" />
  <div class="input-with-select">
    <div @click="selectShow = !selectShow">
      <div class="search-locate">
        <span>{{ cityName || '全国' }}</span>
        <el-icon><Location /></el-icon>
      </div>
    </div>

    <span class="middle-separate" />

    <input type="text" placeholder="搜索职位、公司" v-model="inputMessage" />
    <el-icon size="20" color="#afb3ba" style="margin-right: 10px" @click="clearInput">
      <CloseBold v-if="inputMessage !== ''" style="cursor: pointer" />
    </el-icon>
    <el-button
      @click="clickSearchButton"
      :icon="Search"
      type="primary"
      size="large"
      round
      style="margin: 0 3px 0 auto"
    >
      <span>搜索</span>
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.input-with-select {
  display: flex;
  align-items: center;
  height: 50px;
  border: 3px solid #409eff;
  border-radius: 50px;
  position: relative;

  .search-locate {
    height: 46px;
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      padding: 0 10px 0 20px;
    }
  }

  .middle-separate {
    height: 30px;
    border-right: 2px solid #edeff2;
    margin: 0 10px 0 10px;
  }

  input {
    height: 43px;
    width: 605px;
  }
}
</style>
