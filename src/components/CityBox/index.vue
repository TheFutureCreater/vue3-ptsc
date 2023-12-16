<script setup>
import { Select, CaretLeft } from '@element-plus/icons-vue'
import cityBase from '@/assets/json/cityChar.json'
import { ref, watch, computed } from 'vue'

// 组件显示
const props = defineProps({
  selectShow: Boolean
})
const isShow = computed(() => {
  return props.selectShow
})
const dialogVisible = ref(true)
watch(isShow, () => {
  dialogVisible.value = true
})

const slicePiece = [
  [0, 2],
  [2, 5],
  [5, 8],
  [8, 11],
  [11, 14],
  [14, 17],
  [17, 20],
  [20, 22],
  [22, 24],
  [24, 25]
]
const slicelocate = ref(0)
const characterSelect = [
  '热门城市',
  'A B C',
  'D E F',
  'G H J',
  'K L M',
  'N P Q',
  'R S T',
  'W X',
  'Y Z',
  '全国'
]

const citySelectedID = ref(0)
const citySelectedName = ref('全国')

// 点击相应地区逻辑
const clickCity = (id, name) => {
  console.log(id + name)
  citySelectedName.value = name
  citySelectedID.value = id
}
</script>

<template>
  <!-- <client-only> -->
  <el-dialog v-model="dialogVisible" title="请选择城市" width="850px">
    <div class="city-contianer">
      <div class="char-select">
        <div
          class="select-type"
          v-for="(item, index) in characterSelect"
          :key="index"
          @click="slicelocate = index"
          :id="slicelocate === index ? 'current-type' : ''"
        >
          <span style="display: flex; justify-content: space-between; align-items: center">
            <span>
              {{ item }}
            </span>
            <el-icon v-if="slicelocate === index" size="26" color="#409eff">
              <CaretLeft />
            </el-icon>
          </span>
        </div>
      </div>

      <div class="city-show">
        <div
          class="city-array"
          v-for="(item, index) in cityBase.slice(slicePiece[slicelocate][0], slicePiece[slicelocate][1])"
          :key="index"
        >
          <div class="city-title">{{ item.sign }}</div>
          <div class="city-items">
            <div
              class="city-item"
              v-for="(city, index) in item.city"
              :key="index"
              @click="clickCity(city.id, city.district)"
              :id="citySelectedID === city.id ? 'selected-item' : ''"
            >
              <span style="display: flex; justify-content: space-between">
                <span>
                  {{ city.district }}
                </span>
                <el-icon v-if="citySelectedID === city.id" size="20" color="#409eff">
                  <Select />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- </client-only> -->
</template>

<style lang="scss" scoped>
.city-contianer {
  display: flex;

  .char-select {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 20%;
    border-right: 3px solid #409eff;

    // background-color: #f5f5f5;

    .select-type {
      width: 100%;
      color: #222;
      padding: 10px 0 10px 20px;
      cursor: pointer;
    }

    .select-type:hover {
      background-color: #ebecee;
    }

    #current-type {
      color: #409eff;
      font-weight: bolder;
    }
  }

  .city-show {
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 80%;
    overflow: auto;

    .city-array {
      margin: 0 0 20px 10px;

      .city-title {
        font-size: large;
        font-weight: bolder;
        padding: 10px;
      }

      .city-items {
        display: flex;
        flex-wrap: wrap;

        .city-item {
          display: block;
          width: 20%;
          padding: 12px;
          cursor: pointer;
        }

        .city-item:hover {
          background-color: #ebecee;
        }

        #selected-item {
          color: #409eff;
          background-color: #f2fbff;
          font-weight: bold;
        }
      }
    }
  }

  .city-show::-webkit-scrollbar {
    width: 0px; /* 隐藏滚动条的宽度 */
  }
}
</style>
