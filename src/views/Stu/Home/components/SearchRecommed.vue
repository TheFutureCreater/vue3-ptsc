<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores'

const searchStore = useSearchStore()
const router = useRouter()
const recommendItem = ref(['国企', '管培生', '软件测试工程师', 'Web前端开发', 'Java', 'C++'])

const clickItem = (index) => {
  const url = router.currentRoute.value.path
  console.log(url)
  if (url === '/stu/jobs') {
    console.log('is ' + url)
    searchStore.setSearchWord(recommendItem.value[index])
  } else {
    searchStore.setSearchWord(recommendItem.value[index]) // 跳转前获取搜索关键字
    router.push('/stu/jobs')
  }
}
</script>

<template>
  <div class="popular-recommend">
    <span>热门推荐：</span>

    <span
      class="recommend-item"
      v-for="(item, index) in recommendItem"
      :key="index"
      @click="clickItem(index)"
    >
      {{ item }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.popular-recommend {
  display: flex;
  width: 800px;
  margin: 10px 0 0 0;

  span {
    font-size: 15px;
    height: 25px;
    line-height: 25px;
  }

  > span {
    color: #afb3ba;
    margin-left: 15px;
  }

  .recommend-item {
    width: auto;
    cursor: pointer;
    padding: 0 10px;
    color: #898f98;
    border-radius: 50px;
    background-color: #f5f6f7;
  }

  .recommend-item:hover {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
